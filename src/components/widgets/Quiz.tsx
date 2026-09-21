import { useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

const copy = {
  en: { title: 'Quick check', correct: 'Correct.', wrong: 'Not quite.', again: 'Try again', xp: 'XP' },
  kk: { title: 'Жылдам тексеру', correct: 'Дұрыс.', wrong: 'Дәл емес.', again: 'Қайталап көру', xp: 'XP' },
};

export interface QuizProps {
  lang: Lang;
  id: string;
  question: string;
  options: string[];
  /** index of the correct option */
  answer: number;
  /** shown after answering, explains WHY */
  explain: string;
  xp?: number;
}

export default function Quiz({ lang, id, question, options, answer, explain, xp = 10 }: QuizProps) {
  const t = copy[lang];
  const [picked, setPicked] = useState<number | null>(null);
  const [gained, setGained] = useState(false);
  const answered = picked !== null;
  const right = picked === answer;

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === answer) setGained(award(`quiz:${id}`, xp));
  }

  return (
    <section className="widget" aria-labelledby={`q-${id}`}>
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        {gained && <span className="pill pill-act">+{xp} {t.xp}</span>}
      </div>
      <div className="widget-body">
        <p id={`q-${id}`} className="m-0 font-display text-[22px] leading-snug font-light text-white sm:text-[26px]">
          {question}
        </p>
        <div className="mt-5 grid gap-2.5" role="group" aria-labelledby={`q-${id}`}>
          {options.map((opt, i) => {
            const isPicked = picked === i;
            const isAnswer = answered && i === answer;
            const state = isAnswer
              ? 'border-signal bg-signal/10 text-white'
              : isPicked
                ? 'border-danger bg-danger/10 text-white'
                : answered
                  ? 'border-line text-faint'
                  : 'border-line-strong text-fg hover:border-white/40 hover:bg-white/5 cursor-pointer';
            return (
              <button
                key={i}
                type="button"
                onClick={() => pick(i)}
                disabled={answered}
                aria-pressed={isPicked}
                className={`flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-3 text-left text-[16px] transition-colors duration-200 ${state}`}
              >
                <span className="grid size-7 flex-none place-items-center rounded-full border border-current font-mono text-xs">
                  {isAnswer ? '✓' : isPicked ? '✕' : String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
        <div aria-live="polite">
          {answered && (
            <div className="rise mt-5 rounded-2xl border border-line bg-black/30 p-4 text-[16px] leading-relaxed text-[#dfe3f7]">
              <b className={right ? 'text-signal' : 'text-amber'}>{right ? t.correct : t.wrong}</b> {explain}
              {!right && (
                <button type="button" className="btn btn-sm mt-3 block" onClick={() => setPicked(null)}>
                  {t.again}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
