import { hash, verify } from '@node-rs/argon2';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 32) {
  console.error('JWT_SECRET must be set and at least 32 characters. Generate one with:');
  console.error('  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"');
  process.exit(1);
}
const key = new TextEncoder().encode(SECRET);

/** Tokens last 30 days; `v` lets us invalidate every token a user holds by bumping token_version. */
export const TOKEN_DAYS = 30;

// Who may see the workshop pack, the slides and the analytics. One address by
// default; ADMIN_EMAILS overrides it with a comma-separated list.
const ADMINS = new Set(
  (process.env.ADMIN_EMAILS ?? 'tairkaldybayev@gmail.com')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
);

export const isAdmin = (email) => ADMINS.has(String(email ?? '').trim().toLowerCase());

export async function signToken(user) {
  // `admin` is a signed claim so the Cloudflare edge can gate the workshop
  // routes without calling this API on every page view.
  return new SignJWT({ name: user.name, v: user.token_version ?? 0, admin: isAdmin(user.email) })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setIssuer('vibecoding.qairuhub.com')
    .setExpirationTime(`${TOKEN_DAYS}d`)
    .sign(key);
}

export async function readToken(token) {
  try {
    const { payload } = await jwtVerify(token, key, { issuer: 'vibecoding.qairuhub.com' });
    return payload;
  } catch {
    return null;
  }
}

// Argon2id with parameters that are comfortable on a small Railway instance.
const ARGON = { memoryCost: 19456, timeCost: 2, parallelism: 1 };

export const hashPassword = (plain) => hash(plain, ARGON);
export const checkPassword = async (plain, stored) => {
  try {
    return await verify(stored, plain, ARGON);
  } catch {
    return false;
  }
};

export const normEmail = (e) => String(e ?? '').trim().toLowerCase();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an array of human-readable problems; empty means the input is acceptable. */
export function validateCredentials({ email, password, name }) {
  const problems = [];
  const e = normEmail(email);
  if (!EMAIL_RE.test(e) || e.length > 254) problems.push('email');
  if (typeof password !== 'string' || password.length < 8 || password.length > 200) problems.push('password');
  if (name !== undefined && String(name).length > 80) problems.push('name');
  return problems;
}
