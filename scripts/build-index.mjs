/**
 * Build the retrieval index the site assistant answers from.
 *
 * Reads the BUILT HTML in dist/, not the MDX source, so everything the reader can
 * actually see is searchable: lessons, labs, the try page, tools, models, the
 * glossary, materials and the workshop — including pages written as .astro that
 * have no MDX behind them at all.
 *
 * Run after `astro build`. Output: public/assistant-index.json
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const OUT = 'public/assistant-index.json';
const MAX_CHARS = 1100;
const MIN_CHARS = 60;

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run `astro build` first');
  process.exit(1);
}

/* ----------------------------------------------------------------- helpers */

const decode = (s) =>
  s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&[a-z]+;/gi, ' ');

const textOf = (html) => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

/** Drop everything that is chrome rather than content. */
function contentOf(html) {
  let s = html;
  s = s.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, ' ');
  s = s.replace(/<svg[\s\S]*?<\/svg>/gi, ' ');
  s = s.replace(/<header[\s\S]*?<\/header>/gi, ' ');
  s = s.replace(/<footer[\s\S]*?<\/footer>/gi, ' ');
  s = s.replace(/<nav[\s\S]*?<\/nav>/gi, ' ');
  const main = s.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  return main ? main[1] : s;
}

const titleOf = (html) => {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return textOf(h1[1]);
  const t = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return t ? textOf(t[1]).replace(/\s*·.*$/, '') : '';
};

/** Split the body on headings so a passage carries one idea. */
function sections(html) {
  const parts = [];
  const re = /<h([23])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let last = 0;
  let head = '';
  let m;
  const pushPart = (raw) => {
    const t = textOf(raw);
    if (t.length >= MIN_CHARS) parts.push({ head, text: t });
  };
  while ((m = re.exec(html))) {
    pushPart(html.slice(last, m.index));
    head = textOf(m[2]);
    last = re.lastIndex;
  }
  pushPart(html.slice(last));
  return parts;
}

const urlOf = (file) =>
  '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');

const SKIP = /^\/(404|_)|\/present\//; // slides duplicate the lessons; 404 is noise

/* -------------------------------------------------------------------- walk */

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
})(DIST);

const docs = [];
let id = 0;

for (const file of files) {
  const url = urlOf(file);
  if (SKIP.test(url)) continue;

  const raw = fs.readFileSync(file, 'utf8');
  const lang = /^\/kk\//.test(url) ? 'kk' : 'en';
  const title = titleOf(raw);
  if (!title) continue;

  const seg = url.split('/')[2] ?? 'home';
  const kind =
    seg === 'learn' ? 'module'
    : seg === 'labs' ? 'lab'
    : seg === 'glossary' ? 'glossary'
    : seg === 'tools' ? 'tools'
    : seg === 'materials' ? 'materials'
    : seg === 'workshop' ? 'workshop'
    : seg === 'try' ? 'try'
    : 'page';

  const body = contentOf(raw);

  // the lead paragraphs, so a whole-page question can match the page itself
  const lead = textOf(body).slice(0, 700);
  if (lead.length >= MIN_CHARS) docs.push({ i: id++, lang, url, title, kind, text: lead });

  for (const s of sections(body)) {
    for (let i = 0; i < s.text.length; i += MAX_CHARS) {
      const slice = s.text.slice(i, i + MAX_CHARS);
      if (slice.length < MIN_CHARS) continue;
      docs.push({ i: id++, lang, url, title, section: s.head || undefined, kind, text: slice });
    }
  }
}

const payload = JSON.stringify({ built: new Date().toISOString().slice(0, 10), docs });
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync(OUT, payload);
// also drop it straight into the finished build, so the deploy that follows this
// run already carries the fresh index instead of the previous one
fs.writeFileSync(path.join(DIST, 'assistant-index.json'), payload);

const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
const by = (k) => {
  const m = docs.reduce((a, d) => ((a[d[k]] = (a[d[k]] ?? 0) + 1), a), {});
  return JSON.stringify(m);
};
console.log(`${docs.length} passages from ${files.length} pages, ${kb} KB`);
console.log('by language:', by('lang'));
console.log('by kind:', by('kind'));

// a couple of spot checks so a silent coverage regression is visible
for (const probe of ['@anthropic-ai/claude-code', 'git worktree', 'row level security']) {
  const n = docs.filter((d) => d.text.toLowerCase().includes(probe.toLowerCase())).length;
  console.log(`  "${probe}" -> ${n} passage(s)${n === 0 ? '   <-- MISSING' : ''}`);
}
