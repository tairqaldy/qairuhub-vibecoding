import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { q } from './db.js';
import { migrate } from './migrate.js';
import { checkPassword, hashPassword, isAdmin, normEmail, readToken, signToken, validateCredentials, TOKEN_DAYS } from './auth.js';
import { CAPSTONE, TRACKS, capstoneEligibility, eligibility, isTrack, newCredentialId } from './tracks.js';

const app = new Hono();

// ---------------------------------------------------------------- CORS
// Only the site and local development may call this API with credentials.
const ALLOWED = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultAllowed = [
  'https://vibecoding.qairuhub.com',
  'http://localhost:4321',
  'http://localhost:4331',
];

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return undefined;
      if (ALLOWED.includes(origin) || defaultAllowed.includes(origin)) return origin;
      // any preview deployment of this Pages project
      if (/^https:\/\/[a-z0-9-]+\.vibecoding-1vl\.pages\.dev$/.test(origin)) return origin;
      return undefined;
    },
    allowHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
    allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    maxAge: 86400,
  }),
);

app.use('*', async (c, next) => {
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('Referrer-Policy', 'no-referrer');
  await next();
});

// ---------------------------------------------------------------- helpers
const clientIp = (c) =>
  (c.req.header('x-forwarded-for') ?? '').split(',')[0].trim() || c.req.header('x-real-ip') || 'unknown';

/**
 * Crude but effective throttle: count failures for this identifier in the last
 * 15 minutes. Keeps password guessing expensive without needing Redis.
 */
async function tooManyAttempts(ident, limit = 10) {
  const { rows } = await q(
    `SELECT count(*)::int AS n FROM auth_attempts
      WHERE ident = $1 AND ok = false AND created_at > now() - interval '15 minutes'`,
    [ident],
  );
  return (rows[0]?.n ?? 0) >= limit;
}
const noteAttempt = (ident, ok) =>
  q('INSERT INTO auth_attempts (ident, ok) VALUES ($1, $2)', [ident, ok]).catch(() => {});

const publicUser = (u) => ({ id: String(u.id), email: u.email, name: u.name, lang: u.lang, createdAt: u.created_at, admin: isAdmin(u.email) });

async function requireUser(c) {
  const header = c.req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;
  const payload = await readToken(token);
  if (!payload?.sub) return null;
  const { rows } = await q('SELECT * FROM users WHERE id = $1', [payload.sub]);
  const user = rows[0];
  if (!user) return null;
  // a bumped token_version invalidates every token issued before it
  if ((payload.v ?? 0) !== user.token_version) return null;
  return user;
}

const logEvent = (userId, kind, ref, lang) =>
  q('INSERT INTO events (user_id, kind, ref, lang) VALUES ($1, $2, $3, $4)', [userId, kind, ref ?? null, lang ?? null]).catch(
    () => {},
  );

// ---------------------------------------------------------------- routes
app.get('/health', async (c) => {
  try {
    await q('SELECT 1');
    return c.json({ ok: true });
  } catch (e) {
    return c.json({ ok: false, error: 'db' }, 503);
  }
});

app.post('/auth/signup', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const problems = validateCredentials(body);
  if (problems.length) return c.json({ error: 'invalid', fields: problems }, 400);

  const ip = clientIp(c);
  if (await tooManyAttempts(`ip:${ip}`, 20)) return c.json({ error: 'rate_limited' }, 429);

  const email = normEmail(body.email);
  const name = String(body.name ?? '').trim().slice(0, 80);
  const lang = body.lang === 'kk' ? 'kk' : 'en';

  const exists = await q('SELECT 1 FROM users WHERE email_norm = $1', [email]);
  if (exists.rowCount) {
    await noteAttempt(`ip:${ip}`, false);
    return c.json({ error: 'email_taken' }, 409);
  }

  const password_hash = await hashPassword(body.password);
  const { rows } = await q(
    `INSERT INTO users (email, email_norm, password_hash, name, lang)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [String(body.email).trim().slice(0, 254), email, password_hash, name, lang],
  );
  const user = rows[0];
  await q('INSERT INTO progress (user_id) VALUES ($1) ON CONFLICT DO NOTHING', [user.id]);
  await noteAttempt(`ip:${ip}`, true);
  await logEvent(user.id, 'signup', null, lang);

  return c.json({ token: await signToken(user), user: publicUser(user), expiresInDays: TOKEN_DAYS }, 201);
});

app.post('/auth/login', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const email = normEmail(body.email);
  const ip = clientIp(c);

  if ((await tooManyAttempts(`email:${email}`)) || (await tooManyAttempts(`ip:${ip}`, 30))) {
    return c.json({ error: 'rate_limited' }, 429);
  }

  const { rows } = await q('SELECT * FROM users WHERE email_norm = $1', [email]);
  const user = rows[0];
  const ok = user ? await checkPassword(String(body.password ?? ''), user.password_hash) : false;

  await noteAttempt(`email:${email}`, ok);
  await noteAttempt(`ip:${ip}`, ok);
  // Same response either way, so the endpoint does not reveal which emails exist.
  if (!ok) return c.json({ error: 'bad_credentials' }, 401);

  await q('UPDATE users SET last_seen_at = now() WHERE id = $1', [user.id]);
  await logEvent(user.id, 'login', null, user.lang);
  return c.json({ token: await signToken(user), user: publicUser(user), expiresInDays: TOKEN_DAYS });
});

app.get('/me', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  const { rows } = await q('SELECT earned, xp, last_page, updated_at FROM progress WHERE user_id = $1', [user.id]);
  await q('UPDATE users SET last_seen_at = now() WHERE id = $1', [user.id]);
  return c.json({
    user: publicUser(user),
    progress: rows[0] ?? { earned: {}, xp: 0, last_page: null, updated_at: null },
  });
});

/**
 * Progress is merged, never replaced: a learner may have earned XP on another
 * device, and losing it because an older tab synced would be unforgivable.
 * Highest value per id wins.
 */
app.put('/progress', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);

  const body = await c.req.json().catch(() => ({}));
  const incoming = body.earned && typeof body.earned === 'object' ? body.earned : {};
  const clean = {};
  for (const [k, v] of Object.entries(incoming).slice(0, 500)) {
    if (typeof k === 'string' && k.length <= 80 && Number.isFinite(v) && v >= 0 && v <= 1000) {
      clean[k] = Math.round(v);
    }
  }

  const { rows: cur } = await q('SELECT earned FROM progress WHERE user_id = $1', [user.id]);
  const merged = { ...(cur[0]?.earned ?? {}) };
  for (const [k, v] of Object.entries(clean)) merged[k] = Math.max(merged[k] ?? 0, v);
  const xp = Object.values(merged).reduce((a, b) => a + b, 0);

  const lastPage = typeof body.lastPage === 'string' ? body.lastPage.slice(0, 200) : null;
  await q(
    `INSERT INTO progress (user_id, earned, xp, last_page, updated_at)
     VALUES ($1, $2::jsonb, $3, $4, now())
     ON CONFLICT (user_id) DO UPDATE
       SET earned = $2::jsonb, xp = $3,
           last_page = COALESCE($4, progress.last_page), updated_at = now()`,
    [user.id, JSON.stringify(merged), xp, lastPage],
  );

  if (body.name && String(body.name).length <= 80) {
    await q('UPDATE users SET name = $1 WHERE id = $2', [String(body.name).trim(), user.id]);
  }
  return c.json({ earned: merged, xp });
});

/** One row per meaningful action, for the statistics. */
app.post('/event', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  const body = await c.req.json().catch(() => ({}));
  const kind = String(body.kind ?? '').slice(0, 40);
  if (!/^[a-z_:.-]{2,40}$/.test(kind)) return c.json({ error: 'invalid' }, 400);
  await logEvent(user.id, kind, String(body.ref ?? '').slice(0, 120) || null, body.lang === 'kk' ? 'kk' : 'en');
  return c.json({ ok: true });
});

/* -------------------------------------------------------------- workbench */

// The in-browser workbench calls a real model on the project's own account, so
// it needs a ceiling per person per day. Generous enough to build something,
// small enough that one enthusiastic afternoon cannot empty the account.
const AI_DAILY_LIMIT = Number(process.env.AI_DAILY_LIMIT ?? 40);

/** Read the caller's remaining allowance without spending any of it. */
app.get('/ai/quota', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  const { rows } = await q('SELECT calls FROM ai_usage WHERE user_id = $1 AND day = current_date', [user.id]);
  const used = rows[0]?.calls ?? 0;
  return c.json({ used, limit: AI_DAILY_LIMIT, remaining: Math.max(0, AI_DAILY_LIMIT - used) });
});

/**
 * Spend one call. The increment and the check happen in a single statement, so
 * two tabs cannot both squeeze through on the last remaining call.
 */
app.post('/ai/quota', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);

  const { rows } = await q(
    `INSERT INTO ai_usage (user_id, day, calls) VALUES ($1, current_date, 1)
     ON CONFLICT (user_id, day) DO UPDATE
       SET calls = ai_usage.calls + 1
       WHERE ai_usage.calls < $2
     RETURNING calls`,
    [user.id, AI_DAILY_LIMIT],
  );

  // No row back means the WHERE blocked the update: they are at the ceiling.
  if (!rows.length) {
    return c.json({ allowed: false, used: AI_DAILY_LIMIT, limit: AI_DAILY_LIMIT, remaining: 0 }, 429);
  }
  const used = rows[0].calls;
  return c.json({ allowed: true, used, limit: AI_DAILY_LIMIT, remaining: Math.max(0, AI_DAILY_LIMIT - used) });
});

/* ---------------------------------------------------------- certificates */

/** The learner's own credentials. */
app.get('/certificates', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  const { rows } = await q(
    `SELECT id, track, holder_name, score, issued_at
       FROM certificates WHERE user_id = $1 AND NOT revoked ORDER BY issued_at`,
    [user.id],
  );
  return c.json({ certificates: rows });
});

/**
 * Issue a credential.
 *
 * The eligibility check runs HERE, against the progress row this server stores,
 * not against whatever the browser claims. Issuing is idempotent: asking twice
 * returns the same id, so a link someone already shared keeps working.
 */
app.post('/certificate', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);

  const body = await c.req.json().catch(() => ({}));
  const track = String(body.track ?? '');
  if (track !== 'capstone' && !isTrack(track)) return c.json({ error: 'unknown_track' }, 400);

  const existing = await q('SELECT id, track, holder_name, score, issued_at FROM certificates WHERE user_id = $1 AND track = $2 AND NOT revoked', [user.id, track]);
  if (existing.rowCount) return c.json({ certificate: existing.rows[0], issued: false });

  let check;
  if (track === 'capstone') {
    const held = await q('SELECT track FROM certificates WHERE user_id = $1 AND NOT revoked', [user.id]);
    check = capstoneEligibility(held.rows.map((r) => r.track));
  } else {
    const { rows } = await q('SELECT earned FROM progress WHERE user_id = $1', [user.id]);
    check = eligibility(track, rows[0]?.earned ?? {});
  }
  if (!check.ok) return c.json({ error: 'not_eligible', missing: check.missing }, 409);

  // The printed name is whatever the learner typed. It is a display name on a
  // course certificate, not an identity claim, and the verify page says so.
  const holder = String(body.name ?? user.name ?? '').trim().slice(0, 80);

  // Retry on the astronomically unlikely id collision rather than 500.
  for (let attempt = 0; attempt < 5; attempt++) {
    const id = newCredentialId(track);
    try {
      const { rows } = await q(
        `INSERT INTO certificates (id, user_id, track, holder_name, score)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, track, holder_name, score, issued_at`,
        [id, user.id, track, holder, check.score],
      );
      await logEvent(user.id, 'certificate', track, user.lang);
      return c.json({ certificate: rows[0], issued: true }, 201);
    } catch (e) {
      // 23505 is a unique violation: either the id clashed, or this user raced
      // themselves from two tabs. The second case must return the winner.
      if (e?.code !== '23505') throw e;
      const again = await q('SELECT id, track, holder_name, score, issued_at FROM certificates WHERE user_id = $1 AND track = $2', [user.id, track]);
      if (again.rowCount) return c.json({ certificate: again.rows[0], issued: false });
    }
  }
  return c.json({ error: 'server_error' }, 500);
});

/** Update the printed name on a credential the learner already holds. */
app.put('/certificate/:id', async (c) => {
  const user = await requireUser(c);
  if (!user) return c.json({ error: 'unauthorized' }, 401);
  const body = await c.req.json().catch(() => ({}));
  const holder = String(body.name ?? '').trim().slice(0, 80);
  if (!holder) return c.json({ error: 'invalid' }, 400);
  const { rows } = await q(
    `UPDATE certificates SET holder_name = $1 WHERE id = $2 AND user_id = $3 AND NOT revoked
     RETURNING id, track, holder_name, score, issued_at`,
    [holder, c.req.param('id'), user.id],
  );
  if (!rows.length) return c.json({ error: 'not_found' }, 404);
  return c.json({ certificate: rows[0] });
});

/**
 * Public verification. No auth: the whole point is that a stranger holding the
 * link can check it. It returns the credential and the holder's display name,
 * and nothing else — no email, no user id, no progress.
 */
app.get('/verify/:id', async (c) => {
  const id = String(c.req.param('id') ?? '').toUpperCase().slice(0, 40);
  if (!/^VC-[A-Z]{3}-[A-Z0-9]{4,16}$/.test(id)) return c.json({ valid: false }, 404);
  const { rows } = await q(
    `SELECT c.id, c.track, c.holder_name, c.score, c.issued_at
       FROM certificates c WHERE c.id = $1 AND NOT c.revoked`,
    [id],
  );
  if (!rows.length) return c.json({ valid: false }, 404);
  const r = rows[0];
  const credential = r.track === 'capstone' ? CAPSTONE.credential : (TRACKS[r.track]?.credential ?? r.track);
  return c.json({
    valid: true,
    id: r.id,
    track: r.track,
    credential,
    name: r.holder_name,
    score: r.score,
    issuedAt: r.issued_at,
    issuer: 'QairuHub',
  });
});

/** Aggregate statistics. Requires the owner token, and returns no personal data. */
/**
 * Admin access, two ways in: the shared ADMIN_KEY header, which keeps scripts
 * and curl working, or a Bearer token belonging to an address on the admin
 * list, so the dashboard just works once the organiser is signed in.
 */
async function requireAdmin(c) {
  const key = c.req.header('x-admin-key');
  if (process.env.ADMIN_KEY && key && key === process.env.ADMIN_KEY) return true;
  const user = await requireUser(c);
  return Boolean(user && isAdmin(user.email));
}

/**
 * Per-person rows for running a live session: who signed up, how far they got,
 * when they were last seen. This is personal data — it is why the endpoint is
 * behind the admin check and why nothing else on the API ever returns it.
 */
app.get('/admin/users', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'unauthorized' }, 401);

  const { rows } = await q(`
    SELECT u.id::text                                                   AS id,
           u.name,
           u.email,
           u.lang,
           u.created_at,
           u.last_seen_at,
           coalesce(p.xp, 0)::int                                       AS xp,
           p.last_page,
           (SELECT count(*)::int FROM jsonb_object_keys(coalesce(p.earned, '{}'::jsonb)) k
             WHERE k LIKE 'module:%')                                   AS modules,
           (SELECT count(*)::int FROM jsonb_object_keys(coalesce(p.earned, '{}'::jsonb)) k
             WHERE k LIKE 'lab:%')                                      AS labs,
           (SELECT count(*)::int FROM jsonb_object_keys(coalesce(p.earned, '{}'::jsonb)) k
             WHERE k LIKE 'quiz:%')                                     AS quizzes
      FROM users u
      LEFT JOIN progress p ON p.user_id = u.id
     ORDER BY coalesce(p.xp, 0) DESC, u.created_at DESC
     LIMIT 500`);

  return c.json({ users: rows, total: rows.length });
});

app.get('/stats', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'unauthorized' }, 401);

  const [users, active, lang, xp, modules, signupsByDay] = await Promise.all([
    q('SELECT count(*)::int n FROM users'),
    q("SELECT count(*)::int n FROM users WHERE last_seen_at > now() - interval '7 days'"),
    q('SELECT lang, count(*)::int n FROM users GROUP BY lang'),
    q('SELECT coalesce(round(avg(xp)),0)::int avg_xp, coalesce(max(xp),0)::int max_xp FROM progress'),
    q(`SELECT key AS id, count(*)::int n
         FROM progress, jsonb_object_keys(earned) AS key
        WHERE key LIKE 'module:%' OR key LIKE 'lab:%'
        GROUP BY key ORDER BY n DESC LIMIT 40`),
    q(`SELECT to_char(created_at::date,'YYYY-MM-DD') d, count(*)::int n
         FROM users WHERE created_at > now() - interval '60 days'
        GROUP BY 1 ORDER BY 1`),
  ]);

  return c.json({
    users: users.rows[0].n,
    activeLast7Days: active.rows[0].n,
    byLanguage: Object.fromEntries(lang.rows.map((r) => [r.lang, r.n])),
    avgXp: xp.rows[0].avg_xp,
    maxXp: xp.rows[0].max_xp,
    completions: modules.rows,
    signupsByDay: signupsByDay.rows,
  });
});

app.notFound((c) => c.json({ error: 'not_found' }, 404));
app.onError((err, c) => {
  console.error('[error]', err?.message ?? err);
  return c.json({ error: 'server_error' }, 500);
});

// ---------------------------------------------------------------- boot
const port = Number(process.env.PORT ?? 8080);
await migrate();
serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) =>
  console.log(`[api] listening on ${info.port}`),
);
