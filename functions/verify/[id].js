/**
 * Public credential verification.
 *
 * /verify/VC-FND-K3M9QP2T — no account, no cookie, no JavaScript. This is the
 * URL that goes on a LinkedIn certification entry, so it has to load for a
 * stranger on a phone and say plainly what it does and does not prove.
 *
 * The API returns only the credential and the holder's display name. It never
 * returns an email, a user id or a progress map.
 */

const API = (env) => env.API_URL || 'https://vibecoding-api-production.up.railway.app';

const COPY = {
  en: {
    valid: 'Verified credential',
    invalid: 'No such credential',
    invalidBody:
      'We have no record of that credential id. Check for a typo, or ask the holder for the link again.',
    issuedTo: 'Issued to',
    issuedOn: 'Issued on',
    id: 'Credential ID',
    score: 'Exam score',
    issuer: 'Issued by',
    note: 'This page confirms that QairuHub issued this credential on this date. The name shown is the one the holder entered when claiming it.',
    about: 'About this course',
    cta: 'vibecoding.qairuhub.com',
  },
  kk: {
    valid: 'Расталған сертификат',
    invalid: 'Мұндай сертификат жоқ',
    invalidBody: 'Бұл нөмір бізде тіркелмеген. Қате терілген болуы мүмкін — сілтемені қайта сұра.',
    issuedTo: 'Кімге берілді',
    issuedOn: 'Берілген күні',
    id: 'Сертификат нөмірі',
    score: 'Емтихан нәтижесі',
    issuer: 'Кім берді',
    note: 'Бұл бет QairuHub осы сертификатты көрсетілген күні бергенін растайды. Аты-жөні — иесінің өзі енгізген ат.',
    about: 'Курс туралы',
    cta: 'vibecoding.qairuhub.com',
  },
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const fmtDate = (iso, lang) => {
  try {
    return new Date(iso).toLocaleDateString(lang === 'kk' ? 'kk-KZ' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return String(iso ?? '').slice(0, 10);
  }
};

export async function onRequestGet(context) {
  const { params, request, env } = context;
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') === 'kk' ? 'kk' : 'en';
  const t = COPY[lang];
  const id = String(params.id ?? '').toUpperCase().slice(0, 40);

  let data = null;
  try {
    const res = await fetch(`${API(env)}/verify/${encodeURIComponent(id)}`, {
      headers: { Accept: 'application/json' },
    });
    if (res.ok) data = await res.json();
  } catch {
    data = null;
  }

  const ok = Boolean(data?.valid);
  const status = ok ? 200 : 404;

  const body = ok
    ? `
      <p class="badge"><span class="tick" aria-hidden="true">✓</span> ${esc(t.valid)}</p>
      <h1>${esc(data.credential)}</h1>
      <dl>
        <div><dt>${esc(t.issuedTo)}</dt><dd class="big">${esc(data.name) || '—'}</dd></div>
        <div><dt>${esc(t.issuedOn)}</dt><dd>${esc(fmtDate(data.issuedAt, lang))}</dd></div>
        ${data.score != null ? `<div><dt>${esc(t.score)}</dt><dd>${esc(data.score)}%</dd></div>` : ''}
        <div><dt>${esc(t.issuer)}</dt><dd>${esc(data.issuer)}</dd></div>
        <div><dt>${esc(t.id)}</dt><dd class="mono">${esc(data.id)}</dd></div>
      </dl>
      <p class="note">${esc(t.note)}</p>`
    : `
      <p class="badge bad"><span class="tick" aria-hidden="true">✕</span> ${esc(t.invalid)}</p>
      <h1 class="mono small">${esc(id) || '—'}</h1>
      <p class="note">${esc(t.invalidBody)}</p>`;

  const html = `<!doctype html>
<html lang="${lang === 'kk' ? 'kk' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(ok ? `${data.credential} — ${t.valid}` : t.invalid)}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root { --ink:#03040c; --signal:#2b7fff; --soft:#6aa6ff; --ok:#57d9a3; --pink:#ff78d2;
          --line:rgb(255 255 255 / .12); --muted:rgb(255 255 255 / .68); --faint:rgb(255 255 255 / .44); }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100dvh; display:grid; place-items:center; padding:24px;
         background: linear-gradient(160deg,#03040c,#070c24); color:#fff;
         font:400 16px/1.6 Inter, system-ui, sans-serif; -webkit-font-smoothing:antialiased; }
  .card { width:min(620px,100%); border:1px solid var(--line); border-radius:24px; padding:clamp(24px,5vw,40px);
          background:rgb(255 255 255 / .035); }
  .badge { display:inline-flex; align-items:center; gap:9px; margin:0; padding:6px 13px 6px 7px; border-radius:999px;
           border:1px solid rgb(87 217 163 / .4); background:rgb(87 217 163 / .1); color:var(--ok);
           font:500 12px/1 'IBM Plex Mono', monospace; letter-spacing:.1em; text-transform:uppercase; }
  .badge.bad { border-color:rgb(255 120 210 / .4); background:rgb(255 120 210 / .1); color:var(--pink); }
  .tick { display:grid; place-items:center; width:20px; height:20px; border-radius:50%;
          background:currentColor; color:var(--ink); font-size:11px; font-weight:700; }
  h1 { margin:22px 0 0; font-size:clamp(27px,5vw,40px); font-weight:300; letter-spacing:-.03em; line-height:1.1; }
  h1.small { font-size:clamp(19px,3.4vw,26px); }
  dl { margin:30px 0 0; display:grid; gap:1px; border-radius:14px; overflow:hidden; border:1px solid var(--line); }
  dl > div { display:flex; flex-wrap:wrap; gap:4px 16px; justify-content:space-between; align-items:baseline;
             padding:13px 16px; background:rgb(255 255 255 / .03); }
  dt { margin:0; font:500 11px/1.4 'IBM Plex Mono', monospace; letter-spacing:.1em; text-transform:uppercase; color:var(--faint); }
  dd { margin:0; font-size:16px; color:#fff; text-align:right; }
  dd.big { font-size:21px; font-weight:500; }
  .mono { font-family:'IBM Plex Mono', monospace; letter-spacing:.02em; }
  .note { margin:24px 0 0; font-size:14px; line-height:1.55; color:var(--faint); }
  .foot { margin:26px 0 0; padding-top:20px; border-top:1px solid var(--line); display:flex; flex-wrap:wrap;
          gap:10px; align-items:center; justify-content:space-between; }
  .foot span { font-size:13.5px; color:var(--muted); }
  .foot a { display:inline-block; padding:9px 16px; border-radius:999px; background:var(--signal); color:#fff;
            text-decoration:none; font:500 13.5px/1 Inter, sans-serif; }
  .foot a:hover { background:#4a92ff; }
</style>
</head>
<body>
  <main class="card">
    ${body}
    <div class="foot">
      <span>${esc(t.about)}</span>
      <a href="https://vibecoding.qairuhub.com/${lang}/">${esc(t.cta)} →</a>
    </div>
  </main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      // A credential is stable once issued, but a name can be corrected.
      'Cache-Control': ok ? 'public, max-age=300' : 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
