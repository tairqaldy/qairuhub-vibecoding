/**
 * The site assistant.
 *
 * Answers ONLY from this site's own material. The flow is: retrieve the most
 * relevant passages from the build-time index, then ask a model to answer using
 * just those passages and cite them. If no model is bound, it still returns the
 * passages and their links, so the feature degrades to a very good search rather
 * than breaking.
 *
 * POST /api/ask  { q, lang, page?, history? }
 *   -> { answer, sources: [{title, url, section}], grounded, model }
 */

import { clean } from './_clean.js';

const MAX_Q = 600;
const TOP_K = 6;
const CTX_CHARS = 7000;

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

/** Unicode-aware tokeniser: keeps Cyrillic and Latin words, drops punctuation. */
function tokenize(s) {
  return (s.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}+#._-]*/gu) ?? []).filter((w) => w.length > 1);
}

// Words too common in this corpus to carry signal.
const STOP = new Set(
  ('the a an and or but if then of to in on for with that this it is are was be you your i we they not no ' +
   'can will do does what how why when where which as at by from into about more most all any some other ' +
   'және бұл сол бір ол не үшін мен де да ма ме бар жоқ болады керек деп қалай неге сен сенің осы ' +
   'то что как это для при или же так вот').split(/\s+/),
);

function build(docs) {
  const N = docs.length;
  const df = new Map();
  const prepared = docs.map((d) => {
    const terms = tokenize(`${d.title ?? ''} ${d.section ?? ''} ${d.text ?? ''}`).filter((t) => !STOP.has(t));
    const tf = new Map();
    for (const t of terms) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    // title and section terms get extra weight, they describe the passage best
    const strong = new Set(tokenize(`${d.title ?? ''} ${d.section ?? ''}`).filter((t) => !STOP.has(t)));
    return { d, tf, len: terms.length || 1, strong };
  });
  const avg = prepared.reduce((s, p) => s + p.len, 0) / (N || 1);
  return { prepared, df, N, avg };
}

/** BM25 with a title boost. */
function search(index, query, lang, limit) {
  const { prepared, df, N, avg } = index;
  const qt = [...new Set(tokenize(query).filter((t) => !STOP.has(t)))];
  if (!qt.length) return [];
  const k1 = 1.5;
  const b = 0.75;

  const scored = [];
  for (const p of prepared) {
    if (p.d.lang !== lang) continue;
    let score = 0;
    for (const t of qt) {
      const f = p.tf.get(t);
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * p.len) / avg)));
      if (p.strong.has(t)) score += idf * 0.9;
    }
    if (score > 0) scored.push({ score, d: p.d });
  }

  scored.sort((x, y) => y.score - x.score);

  // at most two passages from the same page, so answers cite a spread of sources
  const perUrl = new Map();
  const out = [];
  for (const s of scored) {
    const n = perUrl.get(s.d.url) ?? 0;
    if (n >= 2) continue;
    perUrl.set(s.d.url, n + 1);
    out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}

/* ------------------------------------------------------------------ prompt */

const SYSTEM = {
  en: `You are the assistant for vibecoding.qairuhub.com, a free masterclass on vibecoding and AI coding agents, made by QairuHub in Kazakhstan.

Answer ONLY from the SOURCES below. They are the site's own material.
- If the sources answer the question, answer directly and briefly. Lead with the answer, not with preamble.
- If they only partly answer it, say what the site does cover, then say plainly what it does not.
- If they do not answer it at all, say so in one sentence and point at the closest page.
- Never invent a fact, number, price, command or URL that is not in the sources.
- Code is welcome when the sources contain it or when it is a direct, standard application of them. Keep it short and runnable.
- Write plainly, like a good teacher: short sentences, concrete nouns, no filler, no emoji, no "great question".
- Cite with [1], [2] matching the source numbers. Cite only what you used.
- 120 words or fewer unless the question genuinely needs code.
- Reply in English.`,
  kk: `Сен vibecoding.qairuhub.com сайтының көмекшісісің. Бұл — Қазақстандағы QairuHub жасаған, vibecoding пен ЖИ coding agent-тер туралы тегін мастер-класс.

ТЕК төмендегі ДЕРЕККӨЗДЕР негізінде жауап бер. Олар — сайттың өз материалы.
- Дереккөздер сұраққа жауап берсе, қысқа әрі тікелей жауап бер. Кіріспесіз, бірден мәніне көш.
- Жартылай ғана жауап берсе, сайтта нені бар екенін айт та, нені жоқ екенін ашық айт.
- Мүлде жауап бермесе, соны бір сөйлеммен айтып, ең жақын бетке сілте.
- Дереккөзде жоқ факті, сан, баға, команда немесе URL ойлап шығарма.
- Дереккөзде код болса немесе ол солардың тікелей қолданысы болса — код жаз. Қысқа әрі жұмыс істейтін болсын.
- Қарапайым жаз: қысқа сөйлем, нақты сөз, су жоқ, эмодзи жоқ.
- [1], [2] деп дереккөз нөмірімен сілте. Тек қолданғаныңды ғана сілте.
- Кодсыз жауап 120 сөзден аспасын.
- Қазақша жауап бер. Орысша жазба. git, prompt, agent, deploy, API, token сияқты сөздер латынша қалады, жалғау дефиспен жалғанады: API-ге, GitHub-қа.`,
};

const FALLBACK = {
  en: (hits) =>
    hits.length
      ? `I could not generate an answer just now, but the site covers this. Start here:\n\n` +
        hits.map((h, i) => `${i + 1}. ${h.d.title}${h.d.section ? ' — ' + h.d.section : ''}`).join('\n')
      : `I could not find anything about that on this site. Try the glossary, or ask in different words.`,
  kk: (hits) =>
    hits.length
      ? `Дәл қазір жауап құрастыра алмадым, бірақ сайтта бұл тақырып бар. Осыдан баста:\n\n` +
        hits.map((h, i) => `${i + 1}. ${h.d.title}${h.d.section ? ' — ' + h.d.section : ''}`).join('\n')
      : `Бұл туралы сайттан ештеңе таппадым. Глоссарийді қарап көр немесе сұрағыңды басқаша қойып көр.`,
};

const MODELS = ['@cf/meta/llama-3.3-70b-instruct-fp8-fast', '@cf/meta/llama-3.1-8b-instruct'];



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

  let hits = [];
  try {
    const index = await loadIndex(request, env);
    hits = search(index, q, lang, TOP_K);
  } catch (e) {
    return json({ error: 'index_unavailable' }, 503);
  }

  const sources = hits.map((h) => ({
    title: h.d.title,
    section: h.d.section ?? null,
    url: h.d.url,
    kind: h.d.kind,
  }));

  if (!env.AI) {
    return json({ answer: FALLBACK[lang](hits), sources, grounded: hits.length > 0, model: null });
  }

  // Build the grounded context, newest-first, capped so the prompt stays small.
  let used = 0;
  const ctx = hits
    .map((h, i) => {
      const block = `[${i + 1}] ${h.d.title}${h.d.section ? ' › ' + h.d.section : ''}\n${h.d.text}`;
      if (used + block.length > CTX_CHARS) return null;
      used += block.length;
      return block;
    })
    .filter(Boolean)
    .join('\n\n');

  const history = Array.isArray(body.history)
    ? body.history.slice(-4).map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: String(m.content ?? '').slice(0, 800),
      }))
    : [];

  const messages = [
    { role: 'system', content: SYSTEM[lang] },
    ...history,
    { role: 'user', content: `SOURCES\n\n${ctx || '(nothing relevant found)'}\n\nQUESTION: ${q}` },
  ];

  for (const model of MODELS) {
    try {
      const r = await env.AI.run(model, { messages, max_tokens: 700, temperature: 0.2 });
      const answer = clean(r?.response);
      if (answer) return json({ answer, sources, grounded: hits.length > 0, model });
    } catch {
      /* try the next model */
    }
  }

  return json({ answer: FALLBACK[lang](hits), sources, grounded: hits.length > 0, model: null });
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
