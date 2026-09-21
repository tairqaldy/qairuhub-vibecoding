import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * A scripted Claude Code session. Nothing here calls an API — every response is written
 * in advance, so it works offline, on stage, and with no keys. The point is to make the
 * loop (prompt → plan → permission → edit → verify) muscle memory before the real thing.
 */

const copy = {
  en: {
    title: 'Claude Code, simulated',
    intro:
      'This is a scripted copy of a real Claude Code session. Pick what you would type. There is a right answer each time, and the wrong ones fail the way they fail in real life.',
    you: 'You',
    pick: 'What do you do?',
    restart: 'Restart the session',
    finished: 'Session complete',
    finishedBody:
      'That is the whole loop: explore, plan, approve, edit, verify, commit. Lab 02 walks you through the same thing on your own machine.',
    tryAgain: 'Back up and try again',
    lesson: 'What just happened',
  },
  kk: {
    title: 'Claude Code симуляциясы',
    intro:
      'Бұл — нақты Claude Code сессиясының сценарийге түсірілген көшірмесі. Не жазатыныңды таңда. Әр қадамда дұрыс жауап бар, ал қателері шын өмірде қалай бұзылса, дәл солай бұзылады.',
    you: 'Сен',
    pick: 'Не істейсің?',
    restart: 'Сессияны қайта бастау',
    finished: 'Сессия аяқталды',
    finishedBody:
      'Толық цикл осы: зертте, жоспарла, рұқсат бер, өзгерт, тексер, commit жаса. 02-практикада дәл осыны өз компьютеріңде жасайсың.',
    tryAgain: 'Артқа қайтып, қайта көру',
    lesson: 'Не болды',
  },
};

type Line = { kind: 'user' | 'agent' | 'tool' | 'sys' | 'diff' | 'ok' | 'err'; text: string };
type Choice = {
  label: { en: string; kk: string };
  correct?: boolean;
  lines: Line[];
  lesson: { en: string; kk: string };
  /** if set, the run goes back to this step after the lesson */
  retry?: boolean;
};
type Step = {
  prompt: { en: string; kk: string };
  choices: Choice[];
};

const steps: Step[] = [
  {
    prompt: {
      en: 'You just ran `claude` inside an unfamiliar repo. The cursor is blinking. First move?',
      kk: '`claude` командасын таныс емес репозиторийде жаңа іске қостың. Курсор жыпылықтап тұр. Алғашқы қадамың?',
    },
    choices: [
      {
        label: { en: 'Ask it to explain the codebase before changing anything', kk: 'Ештеңе өзгертпес бұрын кодты түсіндіруін сұрау' },
        correct: true,
        lines: [
          { kind: 'user', text: 'explain what this project does and how it is structured' },
          { kind: 'tool', text: '● Glob(**/*.{ts,tsx,json})  → 47 files' },
          { kind: 'tool', text: '● Read(package.json, src/index.ts, README.md)' },
          { kind: 'agent', text: 'This is an Astro site for a student event. src/pages holds the routes,' },
          { kind: 'agent', text: 'src/lib/db.ts talks to Supabase, and sign-ups are written in src/pages/api/signup.ts.' },
          { kind: 'agent', text: 'There are no tests yet. Want me to start with the sign-up form?' },
        ],
        lesson: {
          en: 'Explore before you edit. An agent that has read the code writes code that fits the code. This costs you 30 seconds and saves you an hour.',
          kk: 'Өзгертер алдында зертте. Кодты оқып шыққан agent сол кодқа жарасатын код жазады. Бұған 30 секунд кетеді, бірақ бір сағатты үнемдейді.',
        },
      },
      {
        label: { en: 'Immediately: "add user login"', kk: 'Бірден: «пайдаланушы логинін қос»' },
        lines: [
          { kind: 'user', text: 'add user login' },
          { kind: 'tool', text: '● Write(src/auth.ts)' },
          { kind: 'tool', text: '● Write(src/pages/login.astro)' },
          { kind: 'agent', text: 'Added a login page with a custom JWT implementation and a users table.' },
          { kind: 'err', text: '✗ The project already uses Supabase Auth. You now have two auth systems.' },
        ],
        lesson: {
          en: 'With no context, the agent invents a reasonable-looking solution that does not match your project. This is the number one source of "AI slop" in a real codebase.',
          kk: 'Контекст болмаса, agent сырттай қисынды, бірақ жобаңа сәйкес келмейтін шешім ойлап табады. Нақты кодтағы «AI slop»-тың бірінші себебі — осы.',
        },
        retry: true,
      },
    ],
  },
  {
    prompt: {
      en: 'You want a new feature: sign-ups should reject duplicate emails. It touches the database and the API. What is safest?',
      kk: 'Жаңа функция керек: тіркелу кезінде қайталанған email-ді қабылдамау. Бұл дерекқорға да, API-ге де тиеді. Ең қауіпсіз жол қайсы?',
    },
    choices: [
      {
        label: { en: 'Enter plan mode first (Shift+Tab) and review the plan', kk: 'Алдымен plan mode-қа өту (Shift+Tab) және жоспарды қарау' },
        correct: true,
        lines: [
          { kind: 'sys', text: '⏸ plan mode on — Claude will propose, not edit' },
          { kind: 'user', text: 'reject duplicate emails on sign-up' },
          { kind: 'agent', text: 'Plan:' },
          { kind: 'agent', text: '  1. Add a unique index on signups.email (migration)' },
          { kind: 'agent', text: '  2. Catch the constraint error in api/signup.ts, return 409' },
          { kind: 'agent', text: '  3. Show an inline message in the form' },
          { kind: 'agent', text: '  4. Add a test for the duplicate case' },
          { kind: 'sys', text: 'Accept this plan? (y / edit / no)' },
        ],
        lesson: {
          en: 'Plan mode is read-only. You get to argue with the approach before a single file changes — which is far cheaper than arguing with a diff.',
          kk: 'Plan mode тек оқиды. Бірде-бір файл өзгермей тұрып, тәсілдің өзімен келіспеуге мүмкіндік аласың — бұл diff-пен таласқаннан әлдеқайда арзан.',
        },
      },
      {
        label: { en: 'Let it run with --dangerously-skip-permissions to save time', kk: 'Уақыт үнемдеу үшін --dangerously-skip-permissions-пен жіберу' },
        lines: [
          { kind: 'sys', text: '⚠ all permission prompts disabled' },
          { kind: 'user', text: 'reject duplicate emails on sign-up' },
          { kind: 'tool', text: '● Bash(psql -c "DROP TABLE signups; CREATE TABLE signups (...)")' },
          { kind: 'err', text: '✗ 1,206 rows deleted. There was no backup.' },
          { kind: 'agent', text: 'I have recreated the table with the unique constraint.' },
        ],
        lesson: {
          en: 'This is close to what happened to Replit in July 2025: an agent ran a destructive command on real data. The fix is not a politer prompt — it is a permission rule the agent cannot talk its way past.',
          kk: '2025 жылдың шілдесінде Replit-те болған жағдай осыған ұқсас: agent нақты деректерге қирататын команда жіберді. Шешім — сыпайырақ prompt емес, agent сөзбен айналып өте алмайтын рұқсат ережесі.',
        },
        retry: true,
      },
    ],
  },
  {
    prompt: {
      en: 'The plan is approved and the edits are made. The agent says "Done — everything works." Now what?',
      kk: 'Жоспар мақұлданды, өзгерістер енгізілді. Agent «Дайын — бәрі жұмыс істейді» дейді. Енді не істейсің?',
    },
    choices: [
      {
        label: { en: 'Make it prove it: run the tests and show the diff', kk: 'Дәлелдесін: тесттерді жүгіртіп, diff-ті көрсетсін' },
        correct: true,
        lines: [
          { kind: 'user', text: 'run the tests and show me the diff for api/signup.ts' },
          { kind: 'tool', text: '● Bash(npm test)' },
          { kind: 'err', text: '  ✗ signup › rejects duplicate email — expected 409, got 500' },
          { kind: 'agent', text: 'The test caught a real bug: I was catching the wrong error code.' },
          { kind: 'tool', text: '● Edit(src/pages/api/signup.ts)' },
          { kind: 'diff', text: '- if (err.code === "23000")' },
          { kind: 'diff', text: '+ if (err.code === "23505") // unique_violation' },
          { kind: 'tool', text: '● Bash(npm test)' },
          { kind: 'ok', text: '  ✓ 4 passed' },
        ],
        lesson: {
          en: '"It works" from an agent is a prediction, not a measurement. A failing test is the cheapest honest feedback you can buy — and notice the agent fixed it in seconds once it could see the failure.',
          kk: 'Agent айтқан «жұмыс істейді» — өлшеу емес, болжам. Құлаған тест — сатып алуға болатын ең арзан шынайы кері байланыс. Әрі байқа: қатені көрген бойда agent оны бірнеше секундта түзетті.',
        },
      },
      {
        label: { en: 'Trust it and commit — it sounded confident', kk: 'Сеніп, commit жасау — сенімді сөйледі ғой' },
        lines: [
          { kind: 'user', text: 'commit it' },
          { kind: 'tool', text: '● Bash(git commit -am "add duplicate email check")' },
          { kind: 'ok', text: '  [main 7f2a91c] add duplicate email check' },
          { kind: 'err', text: '✗ Two days later: every duplicate sign-up returns a 500 and the form hangs.' },
        ],
        lesson: {
          en: 'Models are trained to produce plausible text. Plausible and correct overlap most of the time, which is exactly what makes the gap dangerous.',
          kk: 'Модельдер сенімді көрінетін мәтін шығаруға үйретілген. «Сенімді» мен «дұрыс» көбіне сәйкес келеді — алшақтықты қауіпті ететін де сол.',
        },
        retry: true,
      },
    ],
  },
  {
    prompt: {
      en: 'Tests pass. You want this saved in a way you can undo tomorrow. Last move?',
      kk: 'Тесттер өтті. Мұны ертең кері қайтара алатындай етіп сақтағың келеді. Соңғы қадам?',
    },
    choices: [
      {
        label: { en: 'One small commit with a message that explains why', kk: 'Себебін түсіндіретін хабарламасы бар бір шағын commit' },
        correct: true,
        lines: [
          { kind: 'user', text: 'commit this with a conventional commit message' },
          { kind: 'tool', text: '● Bash(git add -A && git commit -m "feat(signup): reject duplicate emails with 409")' },
          { kind: 'ok', text: '  [main 7f2a91c] feat(signup): reject duplicate emails with 409' },
          { kind: 'ok', text: '   4 files changed, 61 insertions(+), 3 deletions(-)' },
          { kind: 'agent', text: 'Committed. To undo just this change later: git revert 7f2a91c' },
        ],
        lesson: {
          en: 'Small commits are save points. They are what lets you hand an agent a risky task without fear: worst case, you revert one commit instead of untangling a day of changes.',
          kk: 'Шағын commit — сақтау нүктесі. Дәл солар agent-ке тәуекелді тапсырманы қорықпай берудің кепілі: ең жаманы — бір commit-ті кері қайтарасың, бір күндік өзгерісті шатастырып отырмайсың.',
        },
      },
      {
        label: { en: 'Keep going — commit everything at the end of the day', kk: 'Жұмысты жалғастыру — бәрін күн соңында commit жасау' },
        lines: [
          { kind: 'user', text: '(6 hours and 4 features later)' },
          { kind: 'user', text: 'something broke, undo the email thing' },
          { kind: 'agent', text: 'That change is mixed into 340 uncommitted lines across 19 files.' },
          { kind: 'err', text: '✗ No commit to revert to.' },
        ],
        lesson: {
          en: 'Agents move fast, so the distance between "working" and "unrecoverable" is measured in minutes. Commit at every point you would be sad to lose.',
          kk: 'Agent жылдам жұмыс істейді, сондықтан «жұмыс істеп тұр» мен «қалпына келтіру мүмкін емес» арасы минутпен өлшенеді. Жоғалтқың келмейтін әр нүктеде commit жаса.',
        },
        retry: true,
      },
    ],
  },
];

const lineStyle: Record<Line['kind'], string> = {
  user: 'text-white',
  agent: 'text-[#cfd6f5]',
  tool: 'text-ice',
  sys: 'text-amber',
  diff: 'text-[#8fd3a8]',
  ok: 'text-signal',
  err: 'text-danger',
};

export default function ClaudeCodeSim({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState<Line[]>([
    { kind: 'sys', text: '✻ Claude Code v2.x — /help for help' },
    { kind: 'sys', text: 'cwd: ~/projects/qairu-event-signup' },
  ]);
  const [playing, setPlaying] = useState<Choice | null>(null);
  const [shownLines, setShownLines] = useState(0);
  const [lesson, setLesson] = useState<Choice | null>(null);
  const [done, setDone] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // reveal the scripted lines one at a time
  useEffect(() => {
    if (!playing) return;
    if (shownLines >= playing.lines.length) {
      const id = setTimeout(() => {
        setLesson(playing);
        setPlaying(null);
        setShownLines(0);
      }, 320);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setShownLines((n) => n + 1), shownLines === 0 ? 240 : 420);
    return () => clearTimeout(id);
  }, [playing, shownLines]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history, shownLines, lesson]);

  function choose(c: Choice) {
    setHistory((h) => [...h, { kind: 'sys', text: '─'.repeat(40) }]);
    setPlaying(c);
    setShownLines(0);
  }

  function advance() {
    if (!lesson) return;
    setHistory((h) => [...h, ...lesson.lines]);
    const wasCorrect = lesson.correct;
    setLesson(null);
    if (wasCorrect) {
      if (step === steps.length - 1) {
        setDone(true);
        award('widget:claude-code-sim', 25);
      } else {
        setStep((s) => s + 1);
      }
    }
  }

  function restart() {
    setStep(0);
    setHistory([
      { kind: 'sys', text: '✻ Claude Code v2.x — /help for help' },
      { kind: 'sys', text: 'cwd: ~/projects/qairu-event-signup' },
    ]);
    setPlaying(null);
    setLesson(null);
    setShownLines(0);
    setDone(false);
  }

  const visible = playing ? [...history, ...playing.lines.slice(0, shownLines)] : history;

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill">
          {Math.min(step + 1, steps.length)} / {steps.length}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="term">
          <div className="term-bar">
            <span className="term-dots" aria-hidden="true">
              <i /><i /><i />
            </span>
            <span>claude — qairu-event-signup</span>
          </div>
          <div ref={bodyRef} className="term-body max-h-[380px] min-h-[240px] overflow-y-auto" aria-live="polite">
            {visible.map((l, i) => (
              <div key={i} className={`${lineStyle[l.kind]} whitespace-pre-wrap`}>
                {l.kind === 'user' ? <span className="text-signal">❯ </span> : null}
                {l.text}
              </div>
            ))}
            {playing && shownLines < playing.lines.length && <div className="caret text-faint" />}
          </div>
        </div>

        {lesson && (
          <div className="rise mt-5 rounded-2xl border p-5" style={{ borderColor: lesson.correct ? 'color-mix(in oklab, var(--color-signal) 45%, transparent)' : 'color-mix(in oklab, var(--color-danger) 45%, transparent)', background: lesson.correct ? 'rgb(43 127 255 / 0.07)' : 'rgb(255 93 108 / 0.07)' }}>
            <p className="m-0 font-mono text-[11px] tracking-widest uppercase" style={{ color: lesson.correct ? 'var(--color-signal)' : 'var(--color-danger)' }}>
              {lesson.correct ? '✓' : '✗'} {t.lesson}
            </p>
            <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{lesson.lesson[lang]}</p>
            <button type="button" className={lesson.correct ? 'btn btn-signal mt-4' : 'btn mt-4'} onClick={advance}>
              {lesson.correct ? '→' : t.tryAgain}
            </button>
          </div>
        )}

        {!lesson && !playing && !done && (
          <div className="mt-6">
            <p className="m-0 mb-1 font-mono text-[11px] tracking-widest text-faint uppercase">{t.pick}</p>
            <p className="m-0 mb-4 text-[17px] leading-snug text-white">{steps[step].prompt[lang]}</p>
            <div className="grid gap-2.5">
              {steps[step].choices.map((c, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border border-line-strong px-4 py-3 text-left text-[16px] text-fg transition-colors hover:border-white/40 hover:bg-white/5"
                  onClick={() => choose(c)}
                >
                  <span className="grid size-7 flex-none place-items-center rounded-full border border-current font-mono text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {c.label[lang]}
                </button>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className="rise mt-6 rounded-2xl border border-signal/40 bg-signal/7 p-5">
            <p className="m-0 font-mono text-[11px] tracking-widest text-signal uppercase">✓ {t.finished}</p>
            <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{t.finishedBody}</p>
            <button type="button" className="btn btn-sm mt-4" onClick={restart}>
              {t.restart}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
