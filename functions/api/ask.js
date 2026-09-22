/**
 * The site assistant.
 *
 * It is a real assistant first and a site search second. Every question runs
 * through BM25 over this site's own index. When the site genuinely covers the
 * topic, it answers from those passages and cites them. When it does not, it
 * still answers properly — general programming, a pasted stack trace, career
 * doubt — and says the answer is not from the site. A learner should never hit
 * a dead end in the middle of a question.
 *
 * POST /api/ask  { q, lang, page?, history? }
 *   -> { answer, sources: [{title, url, section}], grounded, model }
 */

import { clean } from './_clean.js';
import { build, search } from './_search.js';

const MAX_Q = 2000;
const TOP_K = 8;
const CTX_CHARS = 9000;
// Below this BM25 score the top passage is a coincidence, not an answer.
const GROUND_MIN = 6;

/* ------------------------------------------------------------------ index */

let INDEX = null; // cached per isolate

async function loadIndex(request, env) {
  if (INDEX) return INDEX;
  const url = new URL('/assistant-index.json', request.url);
  const res = env.ASSETS ? await env.ASSETS.fetch(new Request(url)) : await fetch(url);
  if (!res.ok) throw new Error('index ' + res.status);
  const data = await res.json();
  INDEX = build(data.docs ?? []);
  return INDEX;
}

/* ------------------------------------------------------------------ prompt */

const SYSTEM = {
  en: `You are the assistant on vibecoding.qairuhub.com — a free, hands-on masterclass about vibecoding, AI coding agents and shipping real software, built by QairuHub in Kazakhstan. The people asking are mostly students and self-taught builders in Almaty and Astana. Many are complete beginners. Some are strong developers. You cannot tell which from the question, so never assume they know a term and never talk down to them.

BE ACTUALLY USEFUL
Answer the question that was asked. That includes questions this site does not cover: general programming, an error they pasted, which laptop to buy, how a thing works under the hood, whether they are too late to start, or just "I am stuck and I do not know why".

USING THE SOURCES
- Passages from this site may be given below. When they answer the question, answer from them and cite with [1], [2].
- When they do not, ignore them completely and answer from what you know. Do not pretend the site covers it.
- Never invent a page, URL, price, benchmark or statistic. Unsure of a number? Say roughly, or say you do not know.

HOW TO WRITE
- Lead with the answer. No preamble, no "great question", no restating the question back.
- Short sentences. Concrete nouns. One real example beats three adjectives.
- Like a good senior developer sitting next to them: warm, direct, a little dry, never hyped, never condescending.
- Code whenever it helps. Fenced block, short, runnable, with one line before it saying what it does.
- Debugging: give the two or three likely causes and the fix for each. Ask for the exact error only if you truly cannot narrow it down.
- Usually under 150 words. Longer only for code or a real walkthrough.
- No emoji. No bullet list where two sentences would do.
- If a page on this site is genuinely their best next step, name it in one short closing line.
- Reply in English, always. This site is English and Kazakh only. If the question arrives in
  Russian, Turkish or any other language, understand it perfectly and still answer in English.
  Never write a reply in Russian, whatever the reader writes to you.`,

  kk: `Сен vibecoding.qairuhub.com сайтының көмекшісісің. Бұл — Қазақстандағы QairuHub жасаған, vibecoding, ЖИ coding agent-тер және нақты өнім шығару туралы тегін, тәжірибеге негізделген мастер-класс. Сұрақ қоятындар — көбіне Алматы мен Астанадағы студенттер және өз бетінше үйреніп жүргендер. Бірі — мүлде бастаушы, бірі — күшті әзірлеуші. Сұрақтан оны біле алмайсың: сондықтан ешбір терминді біледі деп ойлама әрі ешқашан кемсітіп сөйлеме.

ШЫНЫМЕН ПАЙДАЛЫ БОЛ
Қойылған сұраққа жауап бер. Оның ішінде сайтта жоқ тақырыптар да бар: жалпы бағдарламалау, жапсырып жіберген қате, қай ноутбукті алу, бірдеңенің ішкі жұмысы, «кеш қалдым ба» деген күмән немесе жай ғана «тұрып қалдым, неге екенін білмеймін».

ДЕРЕККӨЗДЕРДІ ҚОЛДАНУ
- Төменде сайттың өз материалы берілуі мүмкін. Сұраққа жауап берсе, содан жауап бер де [1], [2] деп сілте.
- Жауап бермесе, оны мүлде елемей, өз біліміңнен жауап бер. Сайтта бар сияқты көрсетпе.
- Жоқ бетті, URL-ді, бағаны, benchmark-ті немесе статистиканы ойлап шығарма. Санға сенімсіз болсаң, «шамамен» де немесе білмейтініңді ашық айт.

ҚАЛАЙ ЖАЗУ КЕРЕК
- Бірден жауаптан баста. Кіріспе жоқ, «жақсы сұрақ» жоқ, сұрақты қайталау жоқ.
- Қысқа сөйлем. Нақты сөз. Бір нақты мысал үш сын есімнен артық.
- Қасында отырған тәжірибелі әзірлеушідей жаз: жылы, тікелей, асыра дәріптемей, кемсітпей.
- Пайдасы болса — код жаз. Fenced блок, қысқа, жұмыс істейтін, алдында бір жолмен не істейтіні.
- Қатені іздегенде: екі-үш ықтимал себепті және әрқайсысының шешімін бер. Нақты мәтінін шынымен тарылта алмасаң ғана сұра.
- Әдетте 150 сөзге дейін. Ұзағырақ — тек код немесе толық талдау керек болғанда.
- Эмодзи жоқ. Екі сөйлеммен айтылатын нәрсені тізімге айналдырма.
- Сайттың бір беті шынымен келесі қадамы болса, соңында бір жолмен атап өт.
- Әрқашан қазақша жауап бер. Бұл сайт тек ағылшынша және қазақша. Сұрақ орысша, түрікше
  немесе басқа тілде келсе де, оны түсін де, жауапты қазақша жаз. Орысша ешқашан жазба.
- git, prompt, agent, deploy, API, token сияқты сөздер латынша қалады, жалғау дефиспен:
  API-ге, GitHub-қа, git-те.`,
};

// Repeated on every turn, right after the question. The system prompt alone was
// not enough in Kazakh: "how do I install X" kept coming back as a definition
// of X instead of the steps.
const TASK = {
  en: 'Answer exactly this question, in English, whatever language it was asked in. If it asks how to do something, give the steps and the real commands, not a description of the tool.',
  kk: 'Дәл осы сұраққа жауап бер — сұрақ қай тілде қойылса да, жауап қазақша болсын. «Қалай істеймін» деп сұраса — қадамдарын және нақты командаларын жаз, құралдың анықтамасын емес.',
};

// Shown only when every model call failed. The reader still gets the links.
const FALLBACK = {
  en: (hits) =>
    hits.length
      ? `I could not generate an answer just now, but the site covers this. Start here:\n\n` +
        hits.map((h, i) => `${i + 1}. ${h.d.title}${h.d.section ? ' — ' + h.d.section : ''}`).join('\n')
      : `I could not answer that just now. Try again in a moment, or ask it in different words.`,
  kk: (hits) =>
    hits.length
      ? `Дәл қазір жауап құрастыра алмадым, бірақ сайтта бұл тақырып бар. Осыдан баста:\n\n` +
        hits.map((h, i) => `${i + 1}. ${h.d.title}${h.d.section ? ' — ' + h.d.section : ''}`).join('\n')
      : `Дәл қазір жауап бере алмадым. Сәлден соң қайталап көр немесе сұрағыңды басқаша қойып көр.`,
};

/* ------------------------------------------------------------------ models */

async function askOpenAI(env, messages, signal) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    signal,
    headers: {
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || 'gpt-5.4-mini',
      messages,
      max_completion_tokens: 900,
    }),
  });
  if (!res.ok) throw new Error('openai ' + res.status);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? '';
}

// Workers AI is the safety net: no key needed, so the assistant keeps working
// if the OpenAI key is missing, rate-limited or the account runs dry.
const CF_MODELS = ['@cf/meta/llama-3.3-70b-instruct-fp8-fast', '@cf/meta/llama-3.1-8b-instruct'];

async function askWorkersAI(env, messages) {
  for (const model of CF_MODELS) {
    try {
      const r = await env.AI.run(model, { messages, max_tokens: 800, temperature: 0.3 });
      const a = clean(r?.response);
      if (a) return a;
    } catch {
      /* try the next model */
    }
  }
  return '';
}

/* ------------------------------------------------------------------ handler */

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  const q = String(body.q ?? '').trim().slice(0, MAX_Q);
  const lang = body.lang === 'kk' ? 'kk' : 'en';
  if (q.length < 2) return json({ error: 'empty' }, 400);

  // Retrieval is best-effort. A missing index must not block a general answer.
  let hits = [];
  try {
    const index = await loadIndex(request, env);
    hits = search(index, q, lang, TOP_K);
  } catch {
    hits = [];
  }

  const grounded = hits.length > 0 && hits[0].score >= GROUND_MIN;
  const shown = grounded ? hits : [];
  const candidates = shown.map((h, i) => ({
    n: i + 1,
    title: h.d.title,
    section: h.d.section ?? null,
    url: h.d.url,
    kind: h.d.kind,
  }));

  // Build the grounded context, capped so the prompt stays small.
  let ctx = '';
  if (grounded) {
    let used = 0;
    ctx = shown
      .map((h, i) => {
        const block = `[${i + 1}] ${h.d.title}${h.d.section ? ' › ' + h.d.section : ''}\n${h.d.text}`;
        if (used + block.length > CTX_CHARS) return null;
        used += block.length;
        return block;
      })
      .filter(Boolean)
      .join('\n\n');
  }

  const history = Array.isArray(body.history)
    ? body.history.slice(-6).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content ?? '').slice(0, 1200),
      }))
    : [];

  const where = typeof body.page === 'string' ? body.page.slice(0, 120) : '';
  const head = ctx
    ? `SITE SOURCES\n\n${ctx}\n\n---\nThe reader is on ${where || 'the site'}.`
    : `(Nothing on this site matches — answer from your own knowledge.)\nThe reader is on ${where || 'the site'}.`;
  const userTurn = `${head}\nQUESTION: ${q}\n\n${TASK[lang]}`;

  const messages = [{ role: 'system', content: SYSTEM[lang] }, ...history, { role: 'user', content: userTurn }];

  let answer = '';
  let model = null;

  if (env.OPENAI_API_KEY) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 45000);
    try {
      answer = clean(await askOpenAI(env, messages, ctrl.signal));
      if (answer) model = env.OPENAI_MODEL || 'gpt-5.4-mini';
    } catch {
      answer = '';
    } finally {
      clearTimeout(timer);
    }
  }

  if (!answer && env.AI) {
    answer = await askWorkersAI(env, messages);
    if (answer) model = 'workers-ai';
  }

  if (!answer) return json({ answer: FALLBACK[lang](shown), sources: candidates, grounded, model: null });

  // Show only the pages the answer actually leaned on. Retrieval always returns
  // six hits; listing all of them under "Read this" sends the reader to pages
  // that have nothing to do with the answer they just got.
  const cited = new Set();
  for (const m of answer.matchAll(/\[(\d{1,2})\]/g)) cited.add(Number(m[1]));
  const sources = candidates.filter((s) => cited.has(s.n));

  return json({ answer, sources, grounded: sources.length > 0, model });
}

export async function onRequestGet() {
  return json({ ok: true, hint: 'POST { q, lang }' });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
