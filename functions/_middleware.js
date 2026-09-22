/**
 * Route gate, running on Cloudflare's edge before any HTML is served.
 *
 * Public:  /            /{lang}/            /{lang}/try/      /{lang}/glossary/
 *          /{lang}/login/   and every static asset
 * Gated:   /{lang}/learn/  /labs/  /tools/  /materials/  /workshop/  /present/
 *
 * The session cookie holds the same JWT the API issues. We verify its signature
 * here with the shared secret, so a hand-written cookie does not open the course.
 * If JWT_SECRET is not configured we check structure and expiry only, and log a
 * warning — a misconfigured deploy should degrade, not lock everyone out.
 */

const GATED = /^\/(en|kk)\/(learn|labs|tools|materials|workshop|present|admin)(\/|$)/;
const COOKIE = 'vc_session';

function readCookie(header, name) {
  if (!header) return null;
  for (const part of header.split(';')) {
    const i = part.indexOf('=');
    if (i === -1) continue;
    if (part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

const b64urlToBytes = (s) => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};

async function verify(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [h, p, s] = parts;

  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
  } catch {
    return false;
  }
  if (!payload?.exp || payload.exp * 1000 < Date.now()) return false;
  if (payload.iss && payload.iss !== 'vibecoding.qairuhub.com') return false;

  // Structure and expiry are valid. Without a secret we stop here.
  if (!secret) {
    console.warn('[gate] JWT_SECRET is not set — signature not verified');
    return true;
  }

  try {
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify'],
    );
    return await crypto.subtle.verify('HMAC', key, b64urlToBytes(s), new TextEncoder().encode(`${h}.${p}`));
  } catch {
    return false;
  }
}

export async function onRequest(context) {
  const { request, next, env } = context;
  const url = new URL(request.url);

  // the assistant endpoint is not a page and handles its own access
  if (url.pathname.startsWith('/api/')) return next();

  if (!GATED.test(url.pathname)) return next();

  const token = readCookie(request.headers.get('Cookie'), COOKIE);
  if (token && (await verify(token, env.JWT_SECRET))) return next();

  const lang = url.pathname.startsWith('/kk/') ? 'kk' : 'en';
  const to = new URL(`/${lang}/login/`, url.origin);
  to.searchParams.set('next', url.pathname + url.search);

  return new Response(null, {
    status: 302,
    headers: {
      Location: to.toString(),
      // never let a CDN or browser cache the redirect for a signed-in visitor
      'Cache-Control': 'no-store, private',
      Vary: 'Cookie',
    },
  });
}
