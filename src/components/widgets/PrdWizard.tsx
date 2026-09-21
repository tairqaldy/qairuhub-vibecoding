import { useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Turns five plain answers into a one-page PRD the learner can paste straight into an agent.
 * The output is deliberately short: a PRD an agent will actually read beats a PRD nobody reads.
 */

const copy = {
  en: {
    title: 'Build your PRD',
    intro:
      'Answer five questions in plain language. You get back a one-page brief that an agent can build from — and that you can argue with before any code exists.',
    output: 'Your PRD',
    copy: 'Copy',
    copied: 'Copied',
    download: 'Download .md',
    example: 'Fill with the example',
    clear: 'Clear',
    empty: 'Answer the questions and your PRD appears here, live.',
    tip: 'Paste this into your agent with: "Read this PRD. Ask me 3 questions about anything ambiguous, then write a plan. Do not write code yet."',
    fields: [
      { k: 'problem', label: 'What problem are you solving?', ph: 'QairuHub events fill up over Telegram and nobody knows who is actually coming.', hint: 'One sentence. Describe the pain, not the feature.' },
      { k: 'users', label: 'Who is it for?', ph: 'Students in Astana who follow the QairuHub Telegram channel.', hint: 'Be specific enough to picture one real person.' },
      { k: 'job', label: 'What must they be able to do?', ph: 'See the next event and reserve a seat with their name and email in under a minute.', hint: 'The one job. Not five jobs.' },
      { k: 'done', label: 'How do you know it works?', ph: 'A stranger on a phone can sign up, and I can see the list of names.', hint: 'Your definition of done — something you could test on stage.' },
      { k: 'not', label: 'What are you NOT building?', ph: 'No accounts, no payments, no admin panel, no email reminders.', hint: 'This section saves you more time than all the others combined.' },
    ],
  },
  kk: {
    title: 'Өз PRD-іңді құрастыр',
    intro:
      'Бес сұраққа қарапайым тілмен жауап бер. Нәтижесінде agent құрастыра алатын әрі код жазылмай тұрып өзіңмен талқылай алатын бір беттік құжат аласың.',
    output: 'Сенің PRD-ің',
    copy: 'Көшіру',
    copied: 'Көшірілді',
    download: '.md жүктеп алу',
    example: 'Мысалмен толтыру',
    clear: 'Тазалау',
    empty: 'Сұрақтарға жауап бер — PRD осы жерде бірден пайда болады.',
    tip: 'Мұны agent-ке мына сөзбен жібер: «Осы PRD-ді оқы. Түсініксіз жерлері бойынша маған 3 сұрақ қой, содан кейін жоспар жаз. Әзірге код жазба.»',
    fields: [
      { k: 'problem', label: 'Қандай мәселені шешіп отырсың?', ph: 'QairuHub іс-шараларына орын Telegram арқылы толады да, кім келетінін ешкім нақты білмейді.', hint: 'Бір сөйлем. Функцияны емес, ауыртпалықты сипатта.' },
      { k: 'users', label: 'Бұл кімге арналған?', ph: 'QairuHub Telegram арнасын оқитын астаналық студенттер.', hint: 'Нақты бір адамды көз алдыңа елестете алатындай нақтыла.' },
      { k: 'job', label: 'Олар не істей алуы керек?', ph: 'Келесі іс-шараны көріп, бір минуттан аз уақытта аты мен email-ін жазып орын брондау.', hint: 'Бір ғана міндет. Бес емес.' },
      { k: 'done', label: 'Жұмыс істеп тұрғанын қалай білесің?', ph: 'Бөгде адам телефоннан тіркеле алады, ал мен тізімді көремін.', hint: 'Дайындық анықтамасы — сахнада тексере алатындай нәрсе.' },
      { k: 'not', label: 'Нені жасамайсың?', ph: 'Аккаунт жоқ, төлем жоқ, админ панелі жоқ, email еске салғыш жоқ.', hint: 'Бұл бөлім қалған бәрінен көп уақыт үнемдейді.' },
    ],
  },
};

const example = {
  en: {
    problem: 'QairuHub events fill up over Telegram and nobody knows who is actually coming.',
    users: 'Students in Astana who follow the QairuHub Telegram channel.',
    job: 'See the next event and reserve a seat with their name and email in under a minute.',
    done: 'A stranger on a phone can sign up, and I can see the list of names.',
    not: 'No accounts, no payments, no admin panel, no email reminders.',
  },
  kk: {
    problem: 'QairuHub іс-шараларына орын Telegram арқылы толады да, кім келетінін ешкім нақты білмейді.',
    users: 'QairuHub Telegram арнасын оқитын астаналық студенттер.',
    job: 'Келесі іс-шараны көріп, бір минуттан аз уақытта аты мен email-ін жазып орын брондау.',
    done: 'Бөгде адам телефоннан тіркеле алады, ал мен тізімді көремін.',
    not: 'Аккаунт жоқ, төлем жоқ, админ панелі жоқ, email еске салғыш жоқ.',
  },
};

type Key = 'problem' | 'users' | 'job' | 'done' | 'not';

export default function PrdWizard({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [v, setV] = useState<Record<Key, string>>({ problem: '', users: '', job: '', done: '', not: '' });
  const [copied, setCopied] = useState(false);

  const filled = Object.values(v).filter((x) => x.trim()).length;

  const md = `# PRD — ${v.job.trim() ? v.job.trim().slice(0, 48) : 'Untitled'}

## Problem
${v.problem.trim() || '_—_'}

## Users
${v.users.trim() || '_—_'}

## The one job
${v.job.trim() || '_—_'}

## Definition of done
${v.done.trim() || '_—_'}

## Out of scope
${v.not.trim() || '_—_'}

## Constraints
- Ship something that works end to end before adding anything.
- Free tier only. No paid services.
- If a decision is ambiguous, ask me instead of guessing.
`;

  function set(k: Key, value: string) {
    setV((p) => {
      const next = { ...p, [k]: value };
      if (Object.values(next).every((x) => x.trim())) award('widget:prd-wizard', 25);
      return next;
    });
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
    a.download = 'PRD.md';
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">{filled}/5</span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="grid gap-5 lg:grid-cols-2">
          <div className="grid gap-4">
            {t.fields.map((f, i) => (
              <div key={f.k}>
                <label className="label flex items-baseline gap-2" htmlFor={`prd-${f.k}`}>
                  <span className="font-mono text-[11px] text-signal">{String(i + 1).padStart(2, '0')}</span>
                  {f.label}
                </label>
                <textarea
                  id={`prd-${f.k}`}
                  className="textarea !min-h-[68px] text-[15px]"
                  value={v[f.k as Key]}
                  placeholder={f.ph}
                  onChange={(e) => set(f.k as Key, e.target.value)}
                  rows={2}
                />
                <p className="m-0 mt-1 text-[12.5px] text-faint">{f.hint}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-sm" onClick={() => setV(example[lang])}>
                {t.example}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setV({ problem: '', users: '', job: '', done: '', not: '' })}
              >
                {t.clear}
              </button>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="term">
              <div className="term-bar">
                <span className="term-dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
                <span>PRD.md</span>
                <button type="button" className="btn btn-sm ml-auto !min-h-7 !px-2.5 !text-[11px]" onClick={copyMd}>
                  {copied ? t.copied : t.copy}
                </button>
              </div>
              <div className="term-body max-h-[420px] overflow-y-auto">
                {filled === 0 ? (
                  <p className="m-0 text-faint">{t.empty}</p>
                ) : (
                  <pre className="m-0 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-[#dbe2f7]">{md}</pre>
                )}
              </div>
            </div>
            {filled === 5 && (
              <div className="rise mt-4">
                <button type="button" className="btn btn-signal w-full" onClick={download}>
                  ↓ {t.download}
                </button>
                <p className="mt-3 mb-0 rounded-xl border border-line bg-white/3 p-3 text-[14px] leading-relaxed text-muted">
                  {t.tip}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
