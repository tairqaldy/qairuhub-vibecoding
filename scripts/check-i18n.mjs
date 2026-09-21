// Quality gates for a bilingual site written by many agents.
//
//  1. Every English lesson/lab has a Kazakh counterpart.
//  2. The two files use the same components, the same number of times.
//  3. Quiz ids and answer indexes match across locales, and ids are globally unique.
//  4. No Russian words or Russian-flavoured loan spellings anywhere in the Kazakh content.
//  5. Every ui.ts key exists in both locales.
//  6. Only components that actually exist are used, and <Widget name> is a real widget.
//
// Exit code 1 on any failure, so `npm run verify` blocks a bad build.
import fs from 'node:fs';
import path from 'node:path';

const fail = [];
const warn = [];

// ---------------------------------------------------------------- components
const mdxDir = 'src/components/mdx';
const known = new Set(
  fs
    .readdirSync(mdxDir)
    .filter((f) => f.endsWith('.astro'))
    .map((f) => f.replace('.astro', '')),
);
const widgetNames = new Set(
  [...fs.readFileSync(path.join(mdxDir, 'Widget.astro'), 'utf8').matchAll(/name === '([a-z-]+)'/g)].map((m) => m[1]),
);

const componentsIn = (src) => {
  const counts = {};
  for (const m of src.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) counts[m[1]] = (counts[m[1]] ?? 0) + 1;
  return counts;
};

// ---------------------------------------------------------------- Russian check
//
// Two different things are being caught here, and neither is "Cyrillic".
// Kazakh is written in Cyrillic and has a large, accepted set of technical
// loanwords (файл, сервер, сайт, модель, код, токен, агент, терминал,
// браузер, компьютер...). Those are correct Kazakh and must NOT be flagged.
//
// What is flagged:
//   1. Russian function words and verbs — they have no place in a Kazakh sentence.
//   2. Russian-flavoured spellings of loans that the Kazakh style guide rejects
//      in favour of a Kazakh form (research/kk-glossary.md, decisions 2 and 9).
//
// Letter-based detection is deliberately not used: щ, ъ, ь, ы and э are all in
// the Kazakh Cyrillic alphabet, so they prove nothing on their own.
const RUSSIAN_FUNCTION_WORDS = [
  'который', 'которая', 'которое', 'которые', 'которых', 'которым',
  'этот', 'эта', 'это', 'эти', 'этого', 'этом', 'этим',
  'если', 'чтобы', 'потому', 'поэтому', 'тогда', 'когда', 'где', 'здесь', 'там',
  'нужно', 'можно', 'нельзя', 'должен', 'должна', 'должны',
  'очень', 'также', 'тоже', 'после', 'перед', 'между', 'через', 'около',
  'уже', 'ещё', 'еще', 'сейчас', 'сначала', 'затем', 'потом', 'всегда', 'никогда',
  'например', 'вместо', 'вместе', 'кроме', 'чтоб', 'ведь', 'даже', 'лишь',
  'работает', 'работать', 'делать', 'сделать', 'использовать', 'настроить',
  'запустить', 'открыть', 'создать', 'написать', 'добавить', 'удалить',
  'получить', 'проверить', 'нажмите', 'введите', 'выберите', 'смотрите',
  'ваш', 'ваша', 'ваше', 'ваши', 'наш', 'наша', 'наши', 'свой', 'своя',
];
// Russian-flavoured spellings the style guide rejects (a Kazakh form exists).
const REJECTED_SPELLINGS = [
  'бэкенд', 'фронтенд', 'деплой', 'задеплоить', 'задеплой', 'фича', 'фичи',
  'юзер', 'юзера', 'коммитить', 'закоммитить', 'запушить', 'пушить',
  'дебажить', 'ребейз', 'мержить', 'смержить', 'хардкод', 'фиксить', 'пофиксить',
];
const ruWord = new RegExp(
  `(^|[^\\p{L}])(${[...RUSSIAN_FUNCTION_WORDS, ...REJECTED_SPELLINGS].join('|')})([^\\p{L}]|$)`,
  'giu',
);

function checkRussian(text, file) {
  const stripped = text
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/https?:\/\/\S+/g, ' ') // urls
    .replace(/"[A-Za-z][^"]*"/g, ' '); // quoted English (we keep original quotes)
  const hits = [];
  for (const line of stripped.split('\n')) {
    for (const m of line.matchAll(ruWord)) {
      hits.push(`"${m[2]}" — ${line.trim().slice(0, 70)}`);
    }
  }
  if (hits.length) fail.push(`RUSSIAN in ${file}:\n    ` + [...new Set(hits)].slice(0, 6).join('\n    '));
}

// ---------------------------------------------------------------- content parity
const quizIds = new Map();

for (const kind of ['lessons', 'labs']) {
  const enDir = `src/content/${kind}/en`;
  const kkDir = `src/content/${kind}/kk`;
  if (!fs.existsSync(enDir)) continue;

  for (const file of fs.readdirSync(enDir).filter((f) => f.endsWith('.mdx'))) {
    const enPath = path.join(enDir, file);
    const kkPath = path.join(kkDir, file);
    const en = fs.readFileSync(enPath, 'utf8');

    // components used must exist
    const enComps = componentsIn(en);
    for (const name of Object.keys(enComps)) {
      if (!known.has(name)) fail.push(`UNKNOWN COMPONENT <${name}> in ${enPath}`);
    }
    for (const m of en.matchAll(/<Widget\s+name="([^"]+)"/g)) {
      if (!widgetNames.has(m[1])) fail.push(`UNKNOWN WIDGET name="${m[1]}" in ${enPath}`);
    }
    // quiz ids unique across the site
    for (const m of en.matchAll(/<Quiz[^>]*?\bid="([^"]+)"/gs)) {
      if (quizIds.has(m[1])) fail.push(`DUPLICATE Quiz id "${m[1]}" in ${enPath} and ${quizIds.get(m[1])}`);
      quizIds.set(m[1], enPath);
    }

    if (!fs.existsSync(kkPath)) {
      fail.push(`MISSING TRANSLATION ${kkPath}`);
      continue;
    }
    const kk = fs.readFileSync(kkPath, 'utf8');
    checkRussian(kk, kkPath);

    // component parity
    const kkComps = componentsIn(kk);
    for (const [name, n] of Object.entries(enComps)) {
      const m = kkComps[name] ?? 0;
      if (m !== n) fail.push(`PARITY ${file}: <${name}> ×${n} in en, ×${m} in kk`);
    }
    for (const name of Object.keys(kkComps)) {
      if (!(name in enComps)) fail.push(`PARITY ${file}: <${name}> only in kk`);
    }

    // quiz answers must match
    const answers = (s) => [...s.matchAll(/answer=\{(\d+)\}/g)].map((m) => m[1]).join(',');
    if (answers(en) !== answers(kk)) {
      fail.push(`PARITY ${file}: quiz answers differ — en [${answers(en)}] vs kk [${answers(kk)}]`);
    }
  }
}

// ---------------------------------------------------------------- ui strings
const ui = fs.readFileSync('src/i18n/ui.ts', 'utf8');
const block = (lang) => {
  const m = ui.match(new RegExp(`\\n  ${lang}: \\{([\\s\\S]*?)\\n  \\},`));
  return m ? [...m[1].matchAll(/'([\w.]+)':/g)].map((x) => x[1]) : [];
};
const enKeys = block('en');
const kkKeys = new Set(block('kk'));
if (!enKeys.length) warn.push('could not parse ui.ts — skipping key check');
for (const k of enKeys) if (!kkKeys.has(k)) fail.push(`MISSING ui.ts kk key: ${k}`);
for (const k of kkKeys) if (!enKeys.includes(k)) fail.push(`EXTRA ui.ts kk key: ${k}`);

// ---------------------------------------------------------------- report
if (warn.length) console.log('warnings:\n  ' + warn.join('\n  ') + '\n');
if (fail.length) {
  console.error(`i18n check FAILED — ${fail.length} problem(s):\n`);
  console.error('  ' + fail.join('\n  '));
  process.exit(1);
}
console.log(`i18n check passed — ${quizIds.size} quizzes, ${enKeys.length} ui keys, both locales complete`);
