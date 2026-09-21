import { useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Rewrite a weak prompt by toggling the six parts of a good one. No API: the "response"
 * is scripted per quality tier, which is honest and works on stage with no wifi.
 */

const copy = {
  en: {
    title: 'Prompt lab',
    intro:
      'Same request, six switches. Turn them on one at a time and watch what the agent does with it. The response shown is scripted — the difference between the tiers is not.',
    weak: 'The prompt',
    response: 'What you get back',
    score: 'Prompt strength',
    tiers: ['Vague', 'Thin', 'Workable', 'Good', 'Strong'],
    lesson: 'The pattern',
    lessonBody:
      'Role, goal, context, constraints, output shape, and a stop condition. You do not need all six every time — but when a result disappoints, the fix is almost always a missing one of these, not a bigger model.',
  },
  kk: {
    title: 'Prompt зертханасы',
    intro:
      'Бір сұрау, алты ауыстырғыш. Оларды бір-бірлеп қосып, agent нәтижені қалай өзгертетінін көр. Көрсетілген жауап сценарийге жазылған — ал деңгейлер арасындағы айырмашылық шынайы.',
    weak: 'Prompt',
    response: 'Қайтатын жауап',
    score: 'Prompt күші',
    tiers: ['Бұлыңғыр', 'Жұқа', 'Жарайды', 'Жақсы', 'Күшті'],
    lesson: 'Заңдылық',
    lessonBody:
      'Рөл, мақсат, контекст, шектеулер, нәтиже пішіні және тоқтау шарты. Алтауы бірдей әрқашан керек емес — бірақ нәтиже көңіліңнен шықпаса, себебі әдетте үлкенірек модель емес, осының бірінің жетіспеуі.',
  },
};

interface Part {
  id: string;
  label: { en: string; kk: string };
  text: string;
  why: { en: string; kk: string };
}

const parts: Part[] = [
  {
    id: 'role',
    label: { en: 'Role', kk: 'Рөл' },
    text: 'You are a senior frontend engineer who values boring, readable code.',
    why: { en: 'Sets the standard it judges its own work against.', kk: 'Өз жұмысын бағалайтын өлшемін белгілейді.' },
  },
  {
    id: 'goal',
    label: { en: 'Specific goal', kk: 'Нақты мақсат' },
    text: 'Add an email field to the sign-up form and reject addresses that are already registered.',
    why: { en: '"Make it better" has no finish line. This does.', kk: '«Жақсырақ қыл» дегеннің финиш сызығы жоқ. Мұның бар.' },
  },
  {
    id: 'context',
    label: { en: 'Context', kk: 'Контекст' },
    text: 'The form is src/components/SignupForm.astro. Data goes to Supabase via src/lib/db.ts. We use Zod for validation elsewhere.',
    why: { en: 'Without this the agent invents a stack that does not match yours.', kk: 'Бұл болмаса agent сенікіне сәйкес келмейтін стек ойлап табады.' },
  },
  {
    id: 'constraints',
    label: { en: 'Constraints', kk: 'Шектеулер' },
    text: 'Do not add new dependencies. Do not touch the database schema without telling me first.',
    why: { en: 'Names the specific things you do not want, before they happen.', kk: 'Қаламайтын нәрселеріңді болмай тұрып атап айтады.' },
  },
  {
    id: 'output',
    label: { en: 'Output shape', kk: 'Нәтиже пішіні' },
    text: 'Show me the diff for each file before applying it.',
    why: { en: 'Decides whether you review the work or just receive it.', kk: 'Жұмысты тексересің бе, әлде жай қабылдай саласың ба — соны шешеді.' },
  },
  {
    id: 'stop',
    label: { en: 'Stop condition', kk: 'Тоқтау шарты' },
    text: 'If anything is ambiguous, ask me instead of guessing. Stop after the tests pass.',
    why: { en: 'The single highest-value line in most prompts.', kk: 'Көп prompt-тағы ең пайдалы бір жол.' },
  },
];

const responses: { en: string[]; kk: string[] }[] = [
  {
    en: [
      '● Write(src/Form.jsx)',
      '',
      'I added a React form component with email validation using a regex,',
      'plus a new /api/register endpoint and a users table.',
      '',
      '⚠ Your project is Astro, not React. There was already a signup form.',
      '⚠ Nothing was connected to your database.',
    ],
    kk: [
      '● Write(src/Form.jsx)',
      '',
      'Regex арқылы email тексеретін React форма компонентін,',
      'жаңа /api/register эндпоинтін және users кестесін қостым.',
      '',
      '⚠ Сенің жобаң Astro, React емес. Тіркелу формасы әлдеқашан бар болатын.',
      '⚠ Дерекқорыңа ештеңе жалғанбады.',
    ],
  },
  {
    en: [
      '● Read(src/components/SignupForm.astro)',
      '● Edit(src/components/SignupForm.astro)',
      '',
      'Added an email input with a validation regex.',
      '',
      '⚠ Duplicate emails are still accepted — that part was not implemented.',
    ],
    kk: [
      '● Read(src/components/SignupForm.astro)',
      '● Edit(src/components/SignupForm.astro)',
      '',
      'Валидация regex-і бар email өрісін қостым.',
      '',
      '⚠ Қайталанған email әлі де қабылданады — ол бөлігі жасалмады.',
    ],
  },
  {
    en: [
      '● Read(SignupForm.astro, src/lib/db.ts)',
      '● Edit(src/components/SignupForm.astro)  +18 −2',
      '● Edit(src/lib/db.ts)  +9',
      '',
      'Email field added, duplicates rejected with a clear message.',
      'I installed `validator` for the email check.',
      '',
      '⚠ A new dependency was added without asking.',
    ],
    kk: [
      '● Read(SignupForm.astro, src/lib/db.ts)',
      '● Edit(src/components/SignupForm.astro)  +18 −2',
      '● Edit(src/lib/db.ts)  +9',
      '',
      'Email өрісі қосылды, қайталанғаны түсінікті хабарламамен қабылданбайды.',
      'Email тексеру үшін `validator` пакетін орнаттым.',
      '',
      '⚠ Жаңа тәуелділік сұраусыз қосылды.',
    ],
  },
  {
    en: [
      '● Read(SignupForm.astro, src/lib/db.ts, src/lib/schema.ts)',
      '',
      'Plan: extend the existing Zod schema with .email(), add a unique',
      'index on signups.email, catch 23505 and return a friendly message.',
      '',
      'Diff for SignupForm.astro:',
      '+ const schema = signupSchema.extend({ email: z.string().email() });',
      '',
      'Apply this? (y/n)',
    ],
    kk: [
      '● Read(SignupForm.astro, src/lib/db.ts, src/lib/schema.ts)',
      '',
      'Жоспар: бар Zod схемасын .email() арқылы кеңейту, signups.email-ге',
      'unique индекс қосу, 23505 қатесін ұстап, түсінікті хабарлама қайтару.',
      '',
      'SignupForm.astro үшін diff:',
      '+ const schema = signupSchema.extend({ email: z.string().email() });',
      '',
      'Қолданайық па? (y/n)',
    ],
  },
  {
    en: [
      '● Read(SignupForm.astro, src/lib/db.ts, src/lib/schema.ts)',
      '',
      'One question before I start: should a duplicate email show an error,',
      'or silently update the existing sign-up? The current code does neither.',
      '',
      '→ (you answer: show an error)',
      '',
      '● Edit(3 files)  ● Bash(npm test)',
      '  ✓ 5 passed — including "rejects duplicate email"',
      '',
      'Done. No new dependencies. Schema change is in a migration',
      'file for you to review before it runs anywhere real.',
    ],
    kk: [
      '● Read(SignupForm.astro, src/lib/db.ts, src/lib/schema.ts)',
      '',
      'Бастамас бұрын бір сұрақ: қайталанған email қате көрсетуі керек пе,',
      'әлде бар тіркелуді үнсіз жаңартуы керек пе? Қазіргі код екеуін де істемейді.',
      '',
      '→ (сен: қате көрсетсін)',
      '',
      '● Edit(3 файл)  ● Bash(npm test)',
      '  ✓ 5 тест өтті — оның ішінде «қайталанған email-ді қабылдамайды»',
      '',
      'Дайын. Жаңа тәуелділік жоқ. Схема өзгерісі — нақты жерде іске қосылмай',
      'тұрып қарап шығуың үшін бөлек migration файлында.',
    ],
  },
];

export default function PromptLab({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [on, setOn] = useState<string[]>([]);

  const n = on.length;
  const tier = n === 0 ? 0 : n <= 1 ? 1 : n <= 3 ? 2 : n <= 4 ? 3 : 4;
  const res = responses[tier];

  const promptText = [
    ...parts.filter((p) => on.includes(p.id)).map((p) => p.text),
    ...(on.includes('goal') ? [] : ['make the signup better']),
  ].join('\n\n');

  function toggle(id: string) {
    setOn((p) => {
      const next = p.includes(id) ? p.filter((x) => x !== id) : [...p, id];
      if (next.length >= 5) award('widget:prompt-lab', 20);
      return next;
    });
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className={`pill ${tier >= 3 ? 'pill-act' : ''}`}>{t.tiers[tier]}</span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="mb-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {parts.map((p) => {
            const active = on.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={`cursor-pointer rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  active ? 'border-signal/50 bg-signal/8' : 'border-line bg-white/2 hover:border-line-strong'
                }`}
                aria-pressed={active}
              >
                <span className="flex items-center gap-2">
                  <span className={`size-2 rounded-full transition-colors ${active ? 'bg-signal' : 'bg-white/20'}`} />
                  <span className={`font-mono text-[12px] tracking-wide uppercase ${active ? 'text-signal' : 'text-faint'}`}>
                    {p.label[lang]}
                  </span>
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-muted">{p.why[lang]}</span>
              </button>
            );
          })}
        </div>

        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-mono text-[11px] tracking-widest text-faint uppercase">{t.score}</span>
            <span className="font-mono text-[11px] text-faint">{n}/6</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-colors duration-500"
                style={{ background: i <= tier ? (tier >= 3 ? 'var(--color-signal)' : tier >= 2 ? 'var(--color-amber)' : 'var(--color-danger)') : 'rgb(255 255 255 / 0.1)' }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="term">
            <div className="term-bar">
              <span className="term-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>{t.weak}</span>
            </div>
            <div className="term-body min-h-[220px]">
              <pre className="m-0 font-mono text-[12.5px] leading-relaxed whitespace-pre-wrap text-[#cfe2ff]">{promptText}</pre>
            </div>
          </div>

          <div className="term">
            <div className="term-bar">
              <span className="term-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>{t.response}</span>
            </div>
            <div className="term-body min-h-[220px]" aria-live="polite">
              {res[lang].map((l, i) => (
                <div
                  key={i}
                  className={
                    l.startsWith('⚠') ? 'text-danger' : l.startsWith('●') ? 'text-ice' : l.includes('✓') ? 'text-signal' : l.startsWith('+') ? 'text-[#8fd3a8]' : 'text-[#dbe2f7]'
                  }
                >
                  {l || ' '}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border-l-2 border-signal bg-signal/6 py-3 pr-4 pl-5">
          <p className="m-0 font-mono text-[11px] tracking-widest text-signal uppercase">{t.lesson}</p>
          <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{t.lessonBody}</p>
        </div>
      </div>
    </section>
  );
}
