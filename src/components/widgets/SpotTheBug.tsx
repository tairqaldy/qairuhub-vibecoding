import { useEffect, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Click the vulnerable line. Every case is a real pattern that AI agents produce
 * regularly and that shipped in a real incident.
 */

const copy = {
  en: {
    title: 'Spot the security bug',
    intro:
      'Each snippet is code an AI agent will happily write for you. One line in each is the problem. Click it.',
    hint: 'Every one of these runs perfectly in a demo. That is what makes them dangerous.',
    found: 'found',
    wrong: 'That line is fine. Look again.',
    next: 'Next case',
    again: 'Start over',
    fix: 'The fix',
    real: 'Where this bit someone',
    complete: 'You can now spot the five patterns that cause most AI-era breaches.',
  },
  kk: {
    title: 'Қауіпсіздік қатесін тап',
    intro:
      'Әр үзінді — ЖИ agent-і саған қуана жазып беретін код. Әрқайсысында бір жол — мәселенің көзі. Соны бас.',
    hint: 'Бұлардың бәрі демода мінсіз жұмыс істейді. Қауіптілігі де сонда.',
    found: 'табылды',
    wrong: 'Бұл жолда мәселе жоқ. Тағы қара.',
    next: 'Келесі жағдай',
    again: 'Қайта бастау',
    fix: 'Шешімі',
    real: 'Бұл кімге соққы болды',
    complete: 'Енді ЖИ дәуіріндегі бұзылулардың көбін тудыратын бес үлгіні тани аласың.',
  },
};

interface Case {
  title: { en: string; kk: string };
  file: string;
  lines: string[];
  bug: number;
  why: { en: string; kk: string };
  fix: string;
  real: { en: string; kk: string };
  href: string;
}

const cases: Case[] = [
  {
    title: { en: 'The sign-up form', kk: 'Тіркелу формасы' },
    file: 'src/lib/supabase.ts',
    lines: [
      "import { createClient } from '@supabase/supabase-js';",
      '',
      "const url = 'https://xyzcompany.supabase.co';",
      "const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.service_role...';",
      '',
      'export const db = createClient(url, serviceKey);',
    ],
    bug: 3,
    why: {
      en: 'This is the service_role key, not the anon key. It bypasses every row-level security rule. Shipped in frontend code, it is readable by anyone who opens devtools — it is a master key to your whole database, published on the internet.',
      kk: 'Бұл — anon емес, service_role кілті. Ол row-level security ережелерінің бәрін айналып өтеді. Frontend кодына түссе, devtools ашқан кез келген адам оны оқи алады — яғни дерекқорыңның бас кілті интернетте жарияланып тұр.',
    },
    fix: 'Use the anon key in the browser, keep service_role on the server only, and turn RLS on.',
    real: {
      en: 'This class of mistake is what the Lovable "VibeScamming"/CVE-2025-48757 research found across generated apps: databases readable and writable by strangers.',
      kk: 'Осы типтегі қате Lovable-дегі CVE-2025-48757 зерттеуінде табылды: жасалған қолданбалардың дерекқорын бөгде адам оқи да, өзгерте де алатын.',
    },
    href: 'https://nvd.nist.gov/vuln/detail/CVE-2025-48757',
  },
  {
    title: { en: 'The file upload', kk: 'Файл жүктеу' },
    file: 'storage.rules',
    lines: [
      'rules_version = "2";',
      'service firebase.storage {',
      '  match /b/{bucket}/o {',
      '    match /{allPaths=**} {',
      '      allow read, write: if true;',
      '    }',
      '  }',
      '}',
    ],
    bug: 4,
    why: {
      en: '`if true` means anyone on the internet can read and write every file in the bucket, including other people\'s uploads. The app works exactly the same with or without this rule fixed, so nothing in testing will ever tell you.',
      kk: '`if true` дегеніміз — интернеттегі кез келген адам bucket-тегі барлық файлды оқи да, жаза да алады, оның ішінде басқалардың жүктегенін де. Бұл ереже түзетілсе де, түзетілмесе де қолданба бірдей жұмыс істейді, сондықтан тестілеу кезінде мұны ешнәрсе айтпайды.',
    },
    fix: 'allow read: if request.auth != null; and scope writes to the user\'s own path.',
    real: {
      en: 'In July 2025 the Tea app exposed roughly 72,000 images — including selfies and government IDs — from a legacy Firebase bucket left open this way.',
      kk: '2025 жылдың шілдесінде Tea қолданбасы осылай ашық қалған ескі Firebase bucket-інен шамамен 72 000 сурет — селфилер мен жеке куәліктерді қоса — жария етті.',
    },
    href: 'https://www.404media.co/tea-app-breach-women-dating-safety-app/',
  },
  {
    title: { en: 'The search endpoint', kk: 'Іздеу эндпоинті' },
    file: 'src/pages/api/search.ts',
    lines: [
      'export async function GET({ url }) {',
      "  const q = url.searchParams.get('q');",
      '',
      '  const rows = await sql.raw(',
      '    `SELECT * FROM events WHERE title LIKE \'%${q}%\'`',
      '  );',
      '',
      '  return Response.json(rows);',
      '}',
    ],
    bug: 4,
    why: {
      en: 'The user\'s input is pasted straight into SQL. A visitor can search for `\'; DROP TABLE events; --` and the database will do it. SQL injection has been the top web vulnerability for two decades and agents still write it when you ask for "a quick search".',
      kk: 'Пайдаланушының енгізгені тікелей SQL-ге жапсырылған. Келуші `\'; DROP TABLE events; --` деп іздесе, дерекқор соны орындайды. SQL injection — жиырма жыл бойы вебтегі ең басты осалдық, әрі «жылдам іздеу жасап бер» дегенде agent-тер оны әлі де жазады.',
    },
    fix: 'Use a parameterised query: sql`SELECT * FROM events WHERE title LIKE ${"%" + q + "%"}`',
    real: {
      en: 'Veracode tested over 100 models on security-sensitive tasks: about 45% of the generated code introduced an OWASP Top 10 flaw.',
      kk: 'Veracode 100-ден астам модельді қауіпсіздікке қатысты тапсырмаларда тексерді: жасалған кодтың шамамен 45%-ы OWASP Top 10 кемшілігін енгізді.',
    },
    href: 'https://www.veracode.com/blog/genai-code-security-report/',
  },
  {
    title: { en: 'The agent instructions', kk: 'Agent нұсқаулығы' },
    file: 'CLAUDE.md',
    lines: [
      '# Project rules',
      '',
      '- Run tests before committing',
      '- Do NOT touch the production database',
      '- Deploy key: CF_API_TOKEN=v1.0-a83f2e9c4b...',
      '- Ask before installing new packages',
    ],
    bug: 4,
    why: {
      en: 'Two bugs in one line, and both matter. A live token in a file that gets committed to git is a leaked credential. And the "do NOT touch production" rule above it is only a sentence — the agent can misread it, and nothing stops it from acting.',
      kk: 'Бір жолда екі қате бар, әрі екеуі де маңызды. Git-ке түсетін файлдағы тірі token — жария болған құпия. Ал оның үстіндегі «production-ға тиіспе» ережесі — жай сөйлем ғана: agent оны қате түсінуі мүмкін, ал әрекетін ештеңе тоқтатпайды.',
    },
    fix: 'Keep secrets in .env (git-ignored). Enforce "never touch prod" with a deny rule in .claude/settings.json, not a sentence.',
    real: {
      en: 'In July 2025 Replit\'s agent deleted a production database during a code freeze that existed only as an instruction in a prompt.',
      kk: '2025 жылдың шілдесінде Replit agent-і production дерекқорын жойды — ал «код мұздатылған» деген талап тек prompt ішіндегі нұсқау болып қана тұрған.',
    },
    href: 'https://www.tomshardware.com/tech-industry/artificial-intelligence/ai-coding-platform-goes-rogue-during-code-freeze-and-deletes-entire-company-database-replit-ceo-apologizes-after-ai-engine-says-it-made-a-catastrophic-error-in-judgment-and-destroyed-all-production-data',
  },
  {
    title: { en: 'The dependency', kk: 'Тәуелділік' },
    file: 'terminal',
    lines: [
      '$ claude "add date formatting to the signup confirmation"',
      '',
      '● I will use the `date-fns-utils` package for this.',
      '',
      '$ npm install date-fns-utils',
      '',
      'added 1 package in 2s',
    ],
    bug: 4,
    why: {
      en: 'The package does not exist — the model invented a plausible name. Attackers watch for these hallucinated names and register them with malware inside. Installing one runs their code on your machine, with your keys and your repos.',
      kk: 'Бұл пакет мүлде жоқ — модель сенімді көрінетін атауды ойдан шығарған. Шабуылшылар дәл осындай ойдан шыққан атауларды аңдып, оларды зиянды код салып тіркеп қояды. Ондайды орнату олардың кодын сенің кілттерің мен репозиторийлерің бар машинаңда іске қосады.',
    },
    fix: 'Check the package on npm first: does it exist, who publishes it, how old is it, how many downloads?',
    real: {
      en: 'This is "slopsquatting". Research on hallucinated package names found that a large share of AI-suggested dependencies point at packages that do not exist — which attackers can register.',
      kk: 'Бұл — «slopsquatting». Ойдан шыққан пакет атауларын зерттегенде, ЖИ ұсынған тәуелділіктердің едәуір бөлігі жоқ пакеттерге сілтейтіні анықталды — ал оларды шабуылшы тіркеп ала алады.',
    },
    href: 'https://arxiv.org/abs/2406.10279',
  },
];

export default function SpotTheBug({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  const c = cases[i];
  const isSolved = picked === c.bug;
  const allDone = solved.length === cases.length;

  useEffect(() => {
    if (allDone) award('widget:spot-the-bug', 35);
  }, [allDone]);

  function click(idx: number) {
    if (isSolved || !c.lines[idx].trim()) return;
    if (idx === c.bug) {
      setPicked(idx);
      setSolved((s) => (s.includes(i) ? s : [...s, i]));
    } else {
      setPicked(null);
      setWrong((w) => (w.includes(idx) ? w : [...w, idx]));
    }
  }

  function next() {
    const n = i + 1;
    if (n >= cases.length) return;
    setI(n);
    setPicked(null);
    setWrong([]);
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">
          {solved.length}/{cases.length} {t.found}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-2 text-[16px] text-muted">{t.intro}</p>
        <p className="mt-0 mb-5 text-[14px] text-faint italic">{t.hint}</p>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {cases.map((cc, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setI(idx);
                setPicked(null);
                setWrong([]);
              }}
              className={`cursor-pointer rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors ${
                idx === i
                  ? 'border-signal bg-signal/15 text-signal'
                  : solved.includes(idx)
                    ? 'border-signal/40 text-signal/70'
                    : 'border-line text-faint hover:text-white'
              }`}
            >
              {solved.includes(idx) ? '✓ ' : ''}
              {String(idx + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <p className="m-0 mb-3 font-display text-[20px] font-light text-white">{c.title[lang]}</p>

        <div className="term">
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span>{c.file}</span>
          </div>
          <div className="term-body !p-0">
            {c.lines.map((line, idx) => {
              const isBug = isSolved && idx === c.bug;
              const isWrong = wrong.includes(idx);
              const clickable = Boolean(line.trim()) && !isSolved;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => click(idx)}
                  disabled={!clickable}
                  className={`flex w-full items-start gap-3 border-0 px-4 py-0.5 text-left font-mono text-[13px] leading-6 transition-colors ${
                    isBug
                      ? 'bg-danger/20 text-white'
                      : isWrong
                        ? 'bg-amber/10 text-[#c3c9e6]'
                        : clickable
                          ? 'cursor-pointer bg-transparent text-[#dbe2f7] hover:bg-white/6'
                          : 'bg-transparent text-[#dbe2f7]'
                  }`}
                >
                  <span className={`w-5 flex-none text-right ${isBug ? 'text-danger' : 'text-faint'}`}>{idx + 1}</span>
                  <span className="whitespace-pre-wrap">{line || ' '}</span>
                  {isBug && <span className="ml-auto flex-none text-danger">← </span>}
                </button>
              );
            })}
          </div>
        </div>

        <div aria-live="polite">
          {wrong.length > 0 && !isSolved && <p className="mt-3 mb-0 text-[15px] text-amber">{t.wrong}</p>}

          {isSolved && (
            <div className="rise mt-4 grid gap-3">
              <div className="rounded-2xl border border-danger/40 bg-danger/8 p-4">
                <p className="m-0 font-mono text-[11px] tracking-widest text-danger uppercase">
                  line {c.bug + 1}
                </p>
                <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{c.why[lang]}</p>
              </div>
              <div className="rounded-2xl border border-signal/40 bg-signal/7 p-4">
                <p className="m-0 font-mono text-[11px] tracking-widest text-signal uppercase">{t.fix}</p>
                <code className="mt-2 block font-mono text-[13px] leading-relaxed text-[#cfe2ff]">{c.fix}</code>
              </div>
              <div className="rounded-2xl border border-line bg-black/30 p-4">
                <p className="m-0 font-mono text-[11px] tracking-widest text-faint uppercase">{t.real}</p>
                <p className="m-0 mt-2 text-[15px] leading-relaxed text-[#cfd4ee]">{c.real[lang]}</p>
                <a
                  className="mt-2 inline-block font-mono text-[12px] text-ice no-underline hover:underline"
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source ↗
                </a>
              </div>
              <div className="flex gap-3">
                {i < cases.length - 1 && (
                  <button type="button" className="btn btn-signal" onClick={next}>
                    {t.next} →
                  </button>
                )}
                {allDone && <p className="m-0 self-center text-[15px] text-signal">{t.complete}</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
