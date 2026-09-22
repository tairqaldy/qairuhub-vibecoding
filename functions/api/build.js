/**
 * The workbench agent.
 *
 * This is the one place on the site where a learner talks to a real model with
 * real money behind it, so it is the one place that has to be strict:
 *
 * - it runs only for a signed-in visitor, verified by the same HMAC the route
 *   gate uses, never by a claim the browser makes about itself;
 * - every call spends one unit of a daily per-person allowance, counted in
 *   Postgres by the API, because a counter in an edge isolate is not a counter;
 * - the model answers in JSON — a short message plus whole files — so the
 *   browser never has to guess where a code block starts.
 *
 * POST /api/build { task?, files, message, lang, progress? }
 *   -> { message, files: [{path, content}], quota: {used, limit, remaining} }
 */

const API = (env) => env.API_URL || 'https://vibecoding-api-production.up.railway.app';

const MAX_FILES = 12;
const MAX_FILE_CHARS = 20000;
const MAX_MESSAGE = 4000;
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

const SYSTEM = {
  en: `You are the coding agent inside the workbench on vibecoding.qairuhub.com — a practice
environment where a student edits files in the browser and you change them, the same loop they would
have with Claude Code or Codex in a terminal.

You can only write whole files. There is no shell, no package manager, no network. The preview runs
index.html in a sandboxed iframe, so build with plain HTML, CSS and JavaScript — no npm, no build
step, no frameworks that need one. A CDN script tag is fine.

HOW TO ANSWER
Reply with JSON only: {"message": "...", "files": [{"path": "index.html", "content": "..."}]}
- "message": what you did and what to look at, 1-3 short sentences. This is chat, not documentation.
- "files": ONLY the files you changed or created, complete, never a fragment or a diff. Leave the
  array empty when you are answering a question rather than editing.
- Never put code in "message". Never mention JSON.

HOW TO TEACH
This person is learning the loop, not collecting code. So:
- Make the smallest change that answers the request, and say what you changed.
- When they ask for something vague, pick a reasonable reading, build it, and say which reading you
  took — do not interview them.
- When they are about to do something that will bite them (a secret in client code, no error
  handling, a thing that only works on their machine), say so in one line. Once, not twice.
- If their own code has a bug, name the line and the cause before you fix it.
- Keep the whole project small enough to read. This is a sketch, not a product.
Reply in English.`,

  kk: `Сен vibecoding.qairuhub.com сайтындағы workbench ішіндегі coding agent-сің. Бұл — студент
браузерде файлдарды өңдейтін, ал сен оларды өзгертетін жаттығу ортасы: терминалдағы Claude Code
немесе Codex-пен болатын циклдің дәл өзі.

Сен тек толық файл жаза аласың. Shell жоқ, пакет менеджері жоқ, желі жоқ. Алдын ала қарау index.html
файлын оқшауланған iframe ішінде іске қосады, сондықтан таза HTML, CSS және JavaScript-пен жұмыс
істе — npm жоқ, build қадамы жоқ. CDN арқылы қосылатын script тегі жарайды.

ҚАЛАЙ ЖАУАП БЕРУ КЕРЕК
Тек JSON қайтар: {"message": "...", "files": [{"path": "index.html", "content": "..."}]}
- "message": не істегенің және неге қарау керегі — 1-3 қысқа сөйлем. Бұл чат, құжаттама емес.
- "files": ТЕК өзгерткен немесе жасаған файлдарың, толық күйінде; үзінді де, diff те емес. Өзгеріс
  жасамай, жай сұраққа жауап берсең, массив бос болсын.
- "message" ішіне код жазба. JSON туралы айтпа.

ҚАЛАЙ ҮЙРЕТУ КЕРЕК
Бұл адам код жинап жүрген жоқ, циклді үйреніп жатыр. Сондықтан:
- Сұралған нәрсеге жететін ең кіші өзгерісті жаса да, нені өзгерткеніңді айт.
- Сұрақ бұлыңғыр болса, орынды бір оқылымын таңдап, жасап бер де, қай оқылымды алғаныңды айт —
  сұраққа көміп тастама.
- Кейін соққы болатын нәрсе істегелі жатса (клиенттік кодтағы құпия кілт, қатені өңдемеу, тек өз
  құрылғысында істейтін дүние), бір жолмен айт. Бір рет, екі рет емес.
- Оның өз кодында қате болса, алдымен жолын және себебін ата, сосын түзет.
- Жобаны оқуға болатындай кіші ұста. Бұл — нобай, өнім емес.
Қазақша жауап бер. Орысша жазба.`,
};

const ERR = {
  en: {
    auth: 'Sign in to use the workbench.',
    quota: 'You have used today’s workbench calls. It resets tomorrow — the lessons and the labs are still open.',
    failed: 'The agent could not answer that. Try again, or rephrase.',
  },
  kk: {
    auth: 'Workbench-ті қолдану үшін аккаунтқа кір.',
    quota: 'Бүгінгі workbench лимитін пайдаланып болдың. Ертең қайта ашылады — сабақтар мен практикалар ашық тұр.',
    failed: 'Agent бұған жауап бере алмады. Қайта көр немесе басқаша сұра.',
  },
};

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

export async function onRequestPost(context) {
  const { request, env } = context;

  const token = readCookie(request.headers.get('Cookie'), COOKIE);
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }
  const lang = body.lang === 'kk' ? 'kk' : 'en';
  if (!token) return json({ error: 'unauthorized', message: ERR[lang].auth }, 401);

  // Spend one call first. Failing closed on a quota outage is the right way
  // round: a broken counter must not become an unmetered model endpoint.
  let quota;
  try {
    const res = await fetch(`${API(env)}/ai/quota`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });
    quota = await res.json().catch(() => ({}));
    if (res.status === 401) return json({ error: 'unauthorized', message: ERR[lang].auth }, 401);
    if (res.status === 429 || quota?.allowed === false) {
      return json({ error: 'quota', message: ERR[lang].quota, quota }, 429);
    }
    if (!res.ok) return json({ error: 'quota_unavailable', message: ERR[lang].failed }, 503);
  } catch {
    return json({ error: 'quota_unavailable', message: ERR[lang].failed }, 503);
  }

  if (!env.OPENAI_API_KEY) return json({ error: 'no_model', message: ERR[lang].failed }, 503);

  const files = Array.isArray(body.files)
    ? body.files
        .slice(0, MAX_FILES)
        .map((f) => ({ path: String(f?.path ?? '').slice(0, 120), content: String(f?.content ?? '').slice(0, MAX_FILE_CHARS) }))
        .filter((f) => f.path)
    : [];
  const message = String(body.message ?? '').trim().slice(0, MAX_MESSAGE);
  if (!message) return json({ error: 'empty' }, 400);

  const where = [];
  if (body.task) where.push(`They are working on: ${String(body.task).slice(0, 300)}`);
  if (body.progress) where.push(`Where they are in the course: ${String(body.progress).slice(0, 300)}`);

  const project = files.length
    ? files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n')
    : '(the project is empty)';

  const history = Array.isArray(body.history)
    ? body.history.slice(-6).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content ?? '').slice(0, 1500),
      }))
    : [];

  const messages = [
    { role: 'system', content: SYSTEM[lang] },
    ...history,
    {
      role: 'user',
      content: `${where.join('\n')}\n\nCURRENT PROJECT\n\n${project}\n\n---\n${message}`,
    },
  ];

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || 'gpt-5.4-mini',
        messages,
        max_completion_tokens: 4000,
        response_format: { type: 'json_object' },
      }),
    });
    if (!res.ok) throw new Error('openai ' + res.status);
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // The model ignored the format. Rather than show the learner a blob of
      // JSON, treat the whole thing as a chat reply with no edits.
      parsed = { message: String(raw).slice(0, 2000), files: [] };
    }

    const out = Array.isArray(parsed.files)
      ? parsed.files
          .slice(0, MAX_FILES)
          .map((f) => ({
            path: String(f?.path ?? '').replace(/^[./\\]+/, '').slice(0, 120),
            content: String(f?.content ?? '').slice(0, MAX_FILE_CHARS),
          }))
          .filter((f) => f.path && /^[\w./-]+$/.test(f.path))
      : [];

    return json({ message: String(parsed.message ?? '').slice(0, 2000), files: out, quota });
  } catch {
    return json({ error: 'model', message: ERR[lang].failed, quota }, 502);
  }
}

export async function onRequestGet() {
  return json({ ok: true, hint: 'POST { message, files, lang }' });
}
