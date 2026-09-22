/**
 * BM25 retrieval over the build-time site index.
 *
 * Split out from ask.js so the ranking can be exercised without a Workers
 * runtime: `node scripts/try-search.mjs "<query>" kk`.
 *
 * The interesting part is the tokeniser. Kazakh is agglutinative: орнат,
 * орнату and орнатамын are the same idea and three different strings, so exact
 * matching loses almost every real question. Latin terms also take Kazakh
 * endings through a hyphen — Claude Code-ты, API-ге, git-те — which hides the
 * base word. Both are handled below by emitting extra, lower-weighted terms
 * alongside the exact one.
 */

/** Unicode-aware tokeniser: keeps Cyrillic and Latin words, drops punctuation. */
export function tokenize(s) {
  return (s.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}+#._-]*/gu) ?? []).filter((w) => w.length > 1);
}

// Words too common in this corpus to carry signal.
const STOP = new Set(
  ('the a an and or but if then of to in on for with that this it is are was be you your i we they not no ' +
   'can will do does what how why when where which as at by from into about more most all any some other ' +
   'және бұл сол бір ол не үшін мен де да ма ме бар жоқ болады керек деп қалай неге сен сенің осы ' +
   'то что как это для при или же так вот').split(/\s+/),
);

// Kazakh endings, longest first, so the longest match is stripped first.
// Case, plural, possessive and the common verbal forms — enough to collapse
// the shapes a learner actually types into the shape the lessons use.
const KK_SUFFIX = [
  'ларымыз', 'леріміз', 'дарымыз', 'деріміз',
  'атындай', 'етіндей', 'аймын', 'еймін', 'амыз', 'еміз',
  'амын', 'емін', 'ймын', 'ймін', 'атын', 'етін',
  'дардың', 'дердің', 'лардың', 'лердің', 'тардың', 'тердің',
  'дан', 'ден', 'тан', 'тен', 'нан', 'нен',
  'дың', 'дің', 'тың', 'тің', 'ның', 'нің',
  'мен', 'бен', 'пен', 'ады', 'еді', 'йды', 'йді',
  'ған', 'ген', 'қан', 'кен', 'мыз', 'міз', 'ңыз', 'ңіз',
  'лар', 'лер', 'дар', 'дер', 'тар', 'тер',
  'ып', 'іп', 'ыл', 'іл', 'ын', 'ін', 'ым', 'ім', 'ың', 'ің',
  'ды', 'ді', 'ты', 'ті', 'ны', 'ні', 'ға', 'ге', 'қа', 'ке',
  'да', 'де', 'та', 'те', 'на', 'не', 'са', 'се',
  'у', 'ы', 'і', 'ю', 'п',
];

const MIN_STEM = 4;

/** Strip up to two Kazakh endings, never below MIN_STEM characters. */
function kkStem(w) {
  let out = w;
  for (let round = 0; round < 2; round++) {
    let cut = '';
    for (const s of KK_SUFFIX) {
      if (out.length - s.length >= MIN_STEM && out.endsWith(s)) {
        cut = s;
        break;
      }
    }
    if (!cut) break;
    out = out.slice(0, -cut.length);
  }
  return out;
}

const EN_SUFFIX = ['ing', 'ies', 'ed', 'es', 's'];

function enStem(w) {
  for (const s of EN_SUFFIX) {
    if (w.length - s.length >= MIN_STEM && w.endsWith(s)) return w.slice(0, -s.length);
  }
  return w;
}

const CYR = /[Ѐ-ӿ]/;

/**
 * One token in, its exact form plus any extra forms out. Extra forms carry a
 * '~' so they stay distinct terms and can be scored lower than an exact hit.
 */
function expand(w, into) {
  into.push(w);

  // "code-ты" also counts as "code": the base is what the lessons write
  const dash = w.indexOf('-');
  if (dash >= 2 && !CYR.test(w.slice(0, dash))) into.push('~' + w.slice(0, dash));

  const base = dash >= 2 ? w.slice(0, dash) : w;
  const stem = CYR.test(base) ? kkStem(base) : enStem(base);
  if (stem !== w && stem.length >= MIN_STEM) into.push('~' + stem);
}

/** Tokenise, drop stop words, and add the extra forms. */
export function terms(s) {
  const out = [];
  for (const w of tokenize(s)) {
    if (STOP.has(w)) continue;
    expand(w, out);
  }
  return out;
}

// An inexact match is real signal, but it should never outrank the exact word.
const SOFT = 0.55;

export function build(docs) {
  const N = docs.length;
  const df = new Map();
  const prepared = docs.map((d) => {
    const all = terms(`${d.title ?? ''} ${d.section ?? ''} ${d.text ?? ''}`);
    const tf = new Map();
    for (const t of all) tf.set(t, (tf.get(t) ?? 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) ?? 0) + 1);
    // title and section terms get extra weight, they describe the passage best
    const strong = new Set(terms(`${d.title ?? ''} ${d.section ?? ''}`));
    return { d, tf, len: all.length || 1, strong };
  });
  const avg = prepared.reduce((s, p) => s + p.len, 0) / (N || 1);
  return { prepared, df, N, avg };
}

/** BM25 with a title boost. */
export function search(index, query, lang, limit) {
  const { prepared, df, N, avg } = index;
  const qt = [...new Set(terms(query))];
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
      const w = t.startsWith('~') ? SOFT : 1;
      score += w * idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * p.len) / avg)));
      if (p.strong.has(t)) score += w * idf * 0.9;
    }
    if (score > 0) scored.push({ score, d: p.d });
  }

  scored.sort((x, y) => y.score - x.score);

  // One passage per page. Two strong passages from the same lesson used to eat
  // the whole window, pushing the page that actually answered the question out
  // of range — "how do I install Claude Code" lost to the lesson that merely
  // mentions it most often. Breadth beats depth when a model does the reading.
  const perUrl = new Map();
  const out = [];
  for (const s of scored) {
    const n = perUrl.get(s.d.url) ?? 0;
    if (n >= 1) continue;
    perUrl.set(s.d.url, n + 1);
    out.push(s);
    if (out.length >= limit) break;
  }
  return out;
}
