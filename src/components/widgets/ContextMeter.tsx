import { useState } from 'react';
import type { Lang } from '@/data/curriculum';

/** Drag things into the context window and watch what you had to push out. */

const copy = {
  en: {
    title: 'Fill the context window',
    intro:
      'An agent has one desk, and everything it knows about your task has to fit on it. Add items and watch the space disappear. This is the whole craft of context engineering.',
    used: 'used',
    free: 'free',
    over: 'Over budget. The oldest content gets dropped or summarised — and that is when the agent "forgets" your instructions.',
    healthy: 'Comfortable. The agent can still reason about all of this.',
    tight: 'Tight. Quality starts to drop well before the window is full.',
    reset: 'Clear the desk',
    lesson: 'The move',
    lessonBody:
      'Do not dump everything in and hope. Put in the file you are changing, the rule that applies, and the error you are fixing. Send a subagent to read the rest and come back with two paragraphs.',
  },
  kk: {
    title: 'Контекст терезесін толтыр',
    intro:
      'Agent-те бір ғана үстел бар, тапсырма туралы білетінінің бәрі соған сыюы керек. Элементтер қосып, орынның қалай азаятынын көр. Контекст инженериясының бар мәні — осы.',
    used: 'қолданылды',
    free: 'бос',
    over: 'Шектен шықты. Ең ескі мазмұн алынып тасталады немесе қысқартылады — agent сенің нұсқауыңды дәл осы кезде «ұмытады».',
    healthy: 'Жайлы. Agent мұның бәрін әлі толық ойлай алады.',
    tight: 'Тығыз. Сапа терезе толмай тұрып-ақ төмендей бастайды.',
    reset: 'Үстелді тазалау',
    lesson: 'Не істеу керек',
    lessonBody:
      'Бәрін тықпалап, үміт күтпе. Өзгертіп жатқан файлды, қатысты ережені және түзетіп жатқан қатені ғана сал. Қалғанын оқып, екі абзацпен оралуға subagent жібер.',
  },
};

const WINDOW = 200_000;

const items = [
  { id: 'sys', label: { en: 'System prompt + tools', kk: 'Жүйелік prompt + құралдар' }, tokens: 12_000, fixed: true, color: '#6b7192' },
  { id: 'claude', label: { en: 'CLAUDE.md (a good one)', kk: 'CLAUDE.md (жақсысы)' }, tokens: 1_200, color: '#2b7fff' },
  { id: 'task', label: { en: 'Your actual request', kk: 'Сенің нақты сұрауың' }, tokens: 300, color: '#2b7fff' },
  { id: 'file', label: { en: 'The file you are changing', kk: 'Өзгертіп жатқан файлың' }, tokens: 3_400, color: '#7cd4ff' },
  { id: 'err', label: { en: 'The error message', kk: 'Қате хабарламасы' }, tokens: 600, color: '#7cd4ff' },
  { id: 'tests', label: { en: 'The test file', kk: 'Тест файлы' }, tokens: 2_100, color: '#7cd4ff' },
  { id: 'schema', label: { en: 'Database schema', kk: 'Дерекқор схемасы' }, tokens: 1_800, color: '#7cd4ff' },
  { id: 'docs', label: { en: 'Full framework docs, pasted', kk: 'Фреймворктің толық құжаттамасы, түгел' }, tokens: 90_000, color: '#ff5d6c' },
  { id: 'repo', label: { en: '"Read the whole repo first"', kk: '«Алдымен бүкіл репоны оқы»' }, tokens: 140_000, color: '#ff5d6c' },
  { id: 'chat', label: { en: '2 hours of chat history', kk: '2 сағаттық чат тарихы' }, tokens: 45_000, color: '#ffb547' },
  { id: 'log', label: { en: 'Raw build log (unfiltered)', kk: 'Өңделмеген build логы' }, tokens: 28_000, color: '#ffb547' },
  { id: 'sub', label: { en: 'Subagent summary of the repo', kk: 'Репо туралы subagent қысқаша есебі' }, tokens: 1_500, color: '#2b7fff' },
];

export default function ContextMeter({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [on, setOn] = useState<string[]>(['sys', 'claude', 'task', 'file']);

  const chosen = items.filter((x) => on.includes(x.id));
  const used = chosen.reduce((s, x) => s + x.tokens, 0);
  const pct = Math.min(100, (used / WINDOW) * 100);
  const over = used > WINDOW;
  const tight = pct > 55;

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className={`pill ${over ? 'text-danger' : tight ? 'text-amber' : 'pill-act'}`}>
          {(used / 1000).toFixed(1)}k / 200k
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="relative h-11 overflow-hidden rounded-xl border border-line bg-black/40">
          <div className="flex h-full">
            {chosen.map((x) => (
              <div
                key={x.id}
                className="h-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (x.tokens / WINDOW) * 100)}%`,
                  background: x.color,
                  opacity: 0.75,
                  borderRight: '1px solid rgba(0,0,0,.4)',
                }}
                title={`${x.label[lang]} — ${x.tokens.toLocaleString()}`}
              />
            ))}
          </div>
          {over && (
            <div className="absolute inset-y-0 right-0 flex w-px items-center bg-danger">
              <span className="absolute right-1 font-mono text-[10px] whitespace-nowrap text-danger">200k</span>
            </div>
          )}
        </div>

        <div className="mt-2 flex justify-between font-mono text-[11px]">
          <span className={over ? 'text-danger' : 'text-muted'}>
            {used.toLocaleString()} {t.used}
          </span>
          <span className="text-faint">
            {Math.max(0, WINDOW - used).toLocaleString()} {t.free}
          </span>
        </div>

        <p className={`mt-3 mb-0 text-[15px] leading-snug ${over ? 'text-danger' : tight ? 'text-amber' : 'text-signal'}`} aria-live="polite">
          {over ? t.over : tight ? t.tight : t.healthy}
        </p>

        <div className="mt-5 grid gap-1.5 sm:grid-cols-2">
          {items.map((x) => {
            const active = on.includes(x.id);
            return (
              <label
                key={x.id}
                className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                  x.fixed ? 'cursor-not-allowed border-line opacity-60' : active ? 'border-line-strong bg-white/6' : 'border-line bg-white/2 hover:border-line-strong'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={active}
                  disabled={x.fixed}
                  onChange={() => setOn((p) => (p.includes(x.id) ? p.filter((y) => y !== x.id) : [...p, x.id]))}
                />
                <span
                  className="size-3 flex-none rounded-sm transition-opacity"
                  style={{ background: x.color, opacity: active ? 1 : 0.25 }}
                />
                <span className={`min-w-0 flex-1 text-[14px] leading-snug ${active ? 'text-fg' : 'text-faint'}`}>{x.label[lang]}</span>
                <span className="flex-none font-mono text-[11px] text-faint">
                  {x.tokens >= 1000 ? `${Math.round(x.tokens / 1000)}k` : x.tokens}
                </span>
              </label>
            );
          })}
        </div>

        <button type="button" className="btn btn-sm mt-4" onClick={() => setOn(['sys'])}>
          {t.reset}
        </button>

        <div className="mt-5 rounded-2xl border-l-2 border-signal bg-signal/6 py-3 pr-4 pl-5">
          <p className="m-0 font-mono text-[11px] tracking-widest text-signal uppercase">{t.lesson}</p>
          <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{t.lessonBody}</p>
        </div>
      </div>
    </section>
  );
}
