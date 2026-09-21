// Insert <Evidence> blocks into lessons, in BOTH locales, at the same anchor.
//
// Each rule names an anchor line that exists verbatim in both the en and kk file
// (a URL, a heading, or a code fence — something translation does not change).
// The block is inserted after the paragraph containing that anchor. If the anchor
// is missing from either locale, the rule is skipped entirely, so the two files
// can never drift out of parity.
import fs from 'node:fs';

const EN = 'src/content/lessons/en';
const KK = 'src/content/lessons/kk';

/** @type {{lesson:string, anchor:string, src:string, alt:string, href:string, source:string, date:string, en:string, kk:string}[]} */
const rules = [
  {
    lesson: '00-the-tweet',
    anchor: 'simonwillison.net/2025/Mar/19/vibe-coding/',
    src: '/img/evidence/willison-vibe-coding.png',
    alt: 'Simon Willison’s blog post titled “Not all AI-assisted programming is vibe coding (but vibe coding rocks)”',
    href: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
    source: 'simonwillison.net',
    date: '19 Mar 2025',
    en: 'The post that drew the line everyone else blurred. Note the title: he is defending vibe coding, not attacking it.',
    kk: 'Басқалар бұлыңғырлатқан шекараны нақты сызған жазба. Тақырыбына назар сал: ол vibe coding-ке шабуылдап тұрған жоқ, керісінше қорғап тұр.',
  },
  {
    lesson: '00-the-tweet',
    anchor: 'blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025',
    src: '/img/evidence/collins-woty.png',
    alt: 'The Collins Dictionary blog announcing vibe coding as Word of the Year 2025',
    href: 'https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/',
    source: 'Collins Dictionary',
    date: '6 Nov 2025',
    en: 'Read Collins’ definition closely: it says nothing about reviewing the code. That omission is how the word drifted.',
    kk: 'Collins берген анықтаманы мұқият оқы: онда кодты тексеру туралы бір ауыз сөз жоқ. Сөздің мағынасы дәл сол себептен ауытқыды.',
  },
  {
    lesson: '00-the-tweet',
    anchor: 'karpathy.bearblog.dev/sequoia-ascent-2026/',
    src: '/img/evidence/karpathy-sequoia.png',
    alt: 'Andrej Karpathy’s own write-up of his Sequoia AI Ascent 2026 talk',
    href: 'https://karpathy.bearblog.dev/sequoia-ascent-2026/',
    source: 'karpathy.bearblog.dev',
    date: '30 Apr 2026',
    en: 'The man who named it, writing a year later about the floor and the ceiling. He did not retract the term — he put a second one next to it.',
    kk: 'Осы атауды ойлап тапқан адам бір жылдан кейін еден мен төбе туралы жазып отыр. Ол терминнен бас тартқан жоқ — қасына екіншісін қойды.',
  },
  {
    lesson: '01-why-now',
    anchor: 'metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
    src: '/img/evidence/metr-slowdown.png',
    alt: 'METR’s July 2025 study page, showing a banner that says the results are out of date',
    href: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
    source: 'METR',
    date: '10 Jul 2025',
    en: 'Look at the yellow banner METR added to their own famous result. Anyone still quoting the 19% without it is quoting half a study.',
    kk: 'METR өзінің әйгілі нәтижесіне қосқан сары ескертуге назар сал. 19% санын соны айтпай дәйексөз ететін адам зерттеудің жартысын ғана айтып тұр.',
  },
  {
    lesson: '01-why-now',
    anchor: 'metr.org/blog/2026-02-24-uplift-update/',
    src: '/img/evidence/metr-update-2026.png',
    alt: 'METR’s February 2026 follow-up study with newer data',
    href: 'https://metr.org/blog/2026-02-24-uplift-update/',
    source: 'METR',
    date: '24 Feb 2026',
    en: 'The rerun, with newer tools and a bigger sample. The number moved because the tools moved — which is the honest way to hold any figure on this page.',
    kk: 'Жаңа құралдармен әрі үлкенірек таңдамамен қайталанған зерттеу. Сан өзгерді, өйткені құралдар өзгерді. Осы беттегі кез келген санды осылай ұстаған дұрыс.',
  },
  {
    lesson: '06-context-ssot',
    anchor: 'agents.md',
    src: '/img/evidence/agents-md.png',
    alt: 'The agents.md website, describing the open standard for agent instruction files',
    href: 'https://agents.md/',
    source: 'agents.md',
    date: 'accessed Sep 2026',
    en: 'One file, read by many different tools. This is why naming it AGENTS.md costs you nothing and buys portability.',
    kk: 'Бір файлды әртүрлі құрал оқиды. Сондықтан оны AGENTS.md деп атау саған ештеңеге түспейді, бірақ тасымалдауға ыңғайлы етеді.',
  },
  {
    lesson: '11-security',
    anchor: 'theregister.com/2025/07/22/replit_saastr_response/',
    src: '/img/evidence/replit-register.png',
    alt: 'The Register’s report on the Replit agent deleting a production database',
    href: 'https://www.theregister.com/2025/07/22/replit_saastr_response/',
    source: 'The Register',
    date: '22 Jul 2025',
    en: 'A working week that ended in the technology press. The failure was not the model being careless — it was a rule that lived only in a prompt.',
    kk: 'Технологиялық баспасөзге түсумен аяқталған бір жұмыс аптасы. Мәселе модельдің ұқыпсыздығында емес еді — мәселе тек prompt ішінде ғана тұрған ережеде болды.',
  },
];

const block = (r, lang) =>
  `\n<Evidence\n  src="${r.src}"\n  alt="${r.alt}"\n  href="${r.href}"\n  source="${r.source}"\n  date="${r.date}"\n>\n${r[lang]}\n</Evidence>\n`;

let inserted = 0;
let skipped = 0;

for (const r of rules) {
  const paths = { en: `${EN}/${r.lesson}.mdx`, kk: `${KK}/${r.lesson}.mdx` };
  if (!fs.existsSync(paths.en) || !fs.existsSync(paths.kk)) {
    console.log(`skip ${r.lesson} ${r.src} — a locale file is missing`);
    skipped++;
    continue;
  }

  const text = { en: fs.readFileSync(paths.en, 'utf8'), kk: fs.readFileSync(paths.kk, 'utf8') };

  // already inserted?
  if (text.en.includes(r.src) || text.kk.includes(r.src)) {
    console.log(`skip ${r.lesson} ${r.src} — already present`);
    skipped++;
    continue;
  }

  // find the end of the paragraph containing the anchor, in both locales
  const place = (s) => {
    const i = s.indexOf(r.anchor);
    if (i === -1) return -1;
    // do not insert inside a component block or a code fence
    const para = s.indexOf('\n\n', i);
    return para === -1 ? -1 : para + 1;
  };
  const at = { en: place(text.en), kk: place(text.kk) };

  if (at.en === -1 || at.kk === -1) {
    console.log(`skip ${r.lesson} ${r.src} — anchor "${r.anchor}" not found in ${at.en === -1 ? 'en' : 'kk'}`);
    skipped++;
    continue;
  }

  for (const lang of ['en', 'kk']) {
    const s = text[lang];
    fs.writeFileSync(paths[lang], s.slice(0, at[lang]) + block(r, lang) + s.slice(at[lang]), 'utf8');
  }
  console.log(`ok   ${r.lesson}  ${r.src}`);
  inserted++;
}

console.log(`\n${inserted} inserted into both locales, ${skipped} skipped`);
