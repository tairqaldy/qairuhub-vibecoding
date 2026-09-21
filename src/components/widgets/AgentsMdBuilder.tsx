import { useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Builds a real CLAUDE.md / AGENTS.md. The teaching move is the anti-pattern toggle:
 * bad lines are offered next to good ones so the learner sees why vague rules fail.
 */

const copy = {
  en: {
    title: 'AGENTS.md builder',
    intro:
      'Your agent starts every session with no memory of your project. This file is the memory. Pick what goes in it — and notice which lines are traps.',
    project: 'Project name',
    stack: 'One line about the stack',
    output: 'CLAUDE.md / AGENTS.md',
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download',
    sections: 'What to include',
    good: 'Good rules',
    bad: 'Tempting, but useless',
    badWhy: 'Why it fails',
    tip: 'Save this as CLAUDE.md in your project root. Claude Code loads it automatically every session. Name it AGENTS.md and Codex, Cursor, Gemini CLI and others read it too.',
    score: 'rules',
  },
  kk: {
    title: 'AGENTS.md құрастырғыш',
    intro:
      'Agent әр сессияны жобаң туралы еш нәрсе білмей бастайды. Осы файл — сол жад. Не кіретінін таңда, әрі қай жолдардың тұзақ екенін байқа.',
    project: 'Жоба атауы',
    stack: 'Стек туралы бір жол',
    output: 'CLAUDE.md / AGENTS.md',
    copy: 'Көшіру',
    copied: 'Көшірілді',
    download: 'Жүктеп алу',
    sections: 'Нені қосу керек',
    good: 'Жақсы ережелер',
    bad: 'Тартымды, бірақ пайдасыз',
    badWhy: 'Неге жұмыс істемейді',
    tip: 'Мұны жобаңның түбіріне CLAUDE.md деп сақта. Claude Code оны әр сессияда өзі жүктейді. AGENTS.md деп атасаң, оны Codex, Cursor, Gemini CLI және басқалары да оқиды.',
    score: 'ереже',
  },
};

interface Rule {
  id: string;
  text: string;
  section: 'commands' | 'conventions' | 'guardrails';
  bad?: { en: string; kk: string };
}

const rules: Rule[] = [
  { id: 'install', text: 'Install: `npm ci`', section: 'commands' },
  { id: 'dev', text: 'Dev server: `npm run dev` (port 4321)', section: 'commands' },
  { id: 'build', text: 'Build: `npm run build` — must pass before every commit', section: 'commands' },
  { id: 'test', text: 'Test: `npm test` (Playwright). Run it after changing anything under src/pages.', section: 'commands' },
  { id: 'fast', text: 'Make the code fast and high quality', section: 'commands', bad: { en: 'Every model already believes it is doing this. It changes no decision, so it costs tokens and buys nothing.', kk: 'Кез келген модель мұны әлдеқашан істеп жатырмын деп санайды. Бұл жол бірде-бір шешімді өзгертпейді — token жейді, пайда бермейді.' } },
  { id: 'style', text: 'Components in src/components, one per file, named exports only', section: 'conventions' },
  { id: 'commits', text: 'Conventional Commits (feat:, fix:, docs:). Small and atomic.', section: 'conventions' },
  { id: 'i18n', text: 'Every English string needs a Kazakh counterpart in src/i18n/ui.ts', section: 'conventions' },
  { id: 'clean', text: 'Write clean, readable, maintainable code following best practices', section: 'conventions', bad: { en: 'A style manifesto with no verifiable rule inside it. Compare: "named exports only" — you can check that in one grep.', kk: 'Ішінде тексеруге келетін бірде-бір ереже жоқ стиль манифесі. Салыстыр: «тек named export» — оны бір grep-пен тексересің.' } },
  { id: 'secrets', text: 'Never commit .env or any key. Secrets live in the host dashboard.', section: 'guardrails' },
  { id: 'prod', text: 'Never run migrations or destructive SQL against production', section: 'guardrails' },
  { id: 'ask', text: 'If a requirement is ambiguous, ask instead of guessing', section: 'guardrails' },
  { id: 'key', text: 'Deploy token: CF_API_TOKEN=v1.0-a83f...', section: 'guardrails', bad: { en: 'Never. This file gets committed to git. A secret in here is a published secret.', kk: 'Ешқашан. Бұл файл git-ке түседі. Мұндағы құпия — жарияланған құпия.' } },
  { id: 'everything', text: 'Read all the documentation in /docs before doing anything', section: 'guardrails', bad: { en: 'This burns the context window on every single task, including "fix a typo". Point at the one doc that matters for the task instead.', kk: 'Бұл әр тапсырмада, тіпті «қатені түзет» дегенде де, контекст терезесін сарқады. Оның орнына сол тапсырмаға қажет бір құжатқа ғана сілте.' } },
];

const headings = {
  commands: { en: 'Commands', kk: 'Командалар' },
  conventions: { en: 'Conventions', kk: 'Келісімдер' },
  guardrails: { en: 'Guardrails', kk: 'Шектеулер' },
};

export default function AgentsMdBuilder({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [name, setName] = useState('qairu-event-signup');
  const [stack, setStack] = useState('Astro + Tailwind, Supabase for data, deployed to Cloudflare Pages.');
  const [on, setOn] = useState<string[]>(rules.filter((r) => !r.bad).map((r) => r.id));
  const [copied, setCopied] = useState(false);
  const [openBad, setOpenBad] = useState<string | null>(null);

  const chosen = rules.filter((r) => on.includes(r.id));
  const goodCount = chosen.filter((r) => !r.bad).length;
  const badCount = chosen.filter((r) => r.bad).length;

  const section = (k: Rule['section']) => {
    const list = chosen.filter((r) => r.section === k);
    return list.length ? `\n## ${headings[k].en}\n${list.map((r) => `- ${r.text}`).join('\n')}\n` : '';
  };

  const md = `# ${name || 'project'}

${stack}
${section('commands')}${section('conventions')}${section('guardrails')}
## Definition of done
Build passes, tests pass, no secrets committed, and the change is described in one commit message.
`;

  function toggle(r: Rule) {
    setOn((p) => (p.includes(r.id) ? p.filter((x) => x !== r.id) : [...p, r.id]));
    if (r.bad) setOpenBad(r.id);
    award('widget:agents-md', 25);
  }

  async function copyMd() {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  function download() {
    const blob = new Blob([md], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'CLAUDE.md';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">
          {goodCount} {t.score}
          {badCount > 0 && <span className="text-danger"> · {badCount} ⚠</span>}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <div className="mb-4 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="am-name">{t.project}</label>
                <input id="am-name" className="input font-mono text-[14px]" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="label" htmlFor="am-stack">{t.stack}</label>
                <input id="am-stack" className="input text-[14px]" value={stack} onChange={(e) => setStack(e.target.value)} />
              </div>
            </div>

            <p className="m-0 mb-2 font-mono text-[11px] tracking-widest text-faint uppercase">{t.sections}</p>
            <div className="grid gap-1.5">
              {rules.map((r) => {
                const checked = on.includes(r.id);
                return (
                  <div key={r.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                        checked && r.bad
                          ? 'border-danger/50 bg-danger/8'
                          : checked
                            ? 'border-signal/40 bg-signal/6'
                            : 'border-line bg-white/2 hover:border-line-strong'
                      }`}
                    >
                      <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(r)} />
                      <span
                        className={`mt-0.5 grid size-5 flex-none place-items-center rounded-md border text-[12px] ${
                          checked && r.bad
                            ? 'border-danger bg-danger text-white'
                            : checked
                              ? 'border-signal bg-signal text-signal-ink'
                              : 'border-line-strong text-transparent'
                        }`}
                      >
                        {checked && r.bad ? '!' : '✓'}
                      </span>
                      <span className="min-w-0 font-mono text-[13px] leading-snug text-fg">{r.text}</span>
                      {r.bad && <span className="ml-auto flex-none font-mono text-[10px] text-danger">{t.bad}</span>}
                    </label>
                    {r.bad && checked && openBad === r.id && (
                      <p className="rise m-0 mt-1 rounded-xl border border-danger/30 bg-danger/6 px-3 py-2 text-[13.5px] leading-snug text-[#f0d5d8]">
                        <b className="text-danger">{t.badWhy}: </b>
                        {r.bad[lang]}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="term">
              <div className="term-bar">
                <span className="term-dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
                <span>CLAUDE.md</span>
                <button type="button" className="btn btn-sm ml-auto !min-h-7 !px-2.5 !text-[11px]" onClick={copyMd}>
                  {copied ? t.copied : t.copy}
                </button>
              </div>
              <div className="term-body max-h-[440px] overflow-y-auto">
                <pre className="m-0 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-[#dbe2f7]">{md}</pre>
              </div>
            </div>
            <button type="button" className="btn btn-signal mt-4 w-full" onClick={download}>
              ↓ {t.download}
            </button>
            <p className="mt-3 mb-0 rounded-xl border border-line bg-white/3 p-3 text-[14px] leading-relaxed text-muted">{t.tip}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
