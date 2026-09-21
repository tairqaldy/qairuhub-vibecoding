import { useEffect, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

const copy = {
  en: { done: 'done', all: 'All done. Nice.', reset: 'Reset' },
  kk: { done: 'дайын', all: 'Бәрі дайын. Жарайсың.', reset: 'Қайта бастау' },
};

export interface ChecklistProps {
  lang: Lang;
  id: string;
  title: string;
  items: string[];
  xp?: number;
}

export default function Checklist({ lang, id, title, items, xp = 15 }: ChecklistProps) {
  const t = copy[lang];
  const key = `vc:checklist:${id}`;
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw) as boolean[];
        setChecked(items.map((_, i) => Boolean(saved[i])));
      }
    } catch {}
  }, [key, items.length]);

  function save(next: boolean[]) {
    setChecked(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
    if (next.every(Boolean)) award(`checklist:${id}`, xp);
  }

  const count = checked.filter(Boolean).length;
  const all = count === items.length;

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{title}</span>
        <span className="pill">{count}/{items.length} {t.done}</span>
      </div>
      <div className="widget-body">
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-signal transition-[width] duration-500" style={{ width: `${(count / items.length) * 100}%` }} />
        </div>
        <ul className="m-0 grid list-none gap-1 p-0">
          {items.map((item, i) => (
            <li key={i} className="m-0">
              <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/5">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={checked[i]}
                  onChange={() => save(checked.map((c, j) => (j === i ? !c : c)))}
                />
                <span className="mt-0.5 grid size-5.5 flex-none place-items-center rounded-md border border-line-strong text-[13px] text-transparent transition-colors peer-checked:border-signal peer-checked:bg-signal peer-checked:text-signal-ink peer-focus-visible:outline-2 peer-focus-visible:outline-signal">
                  ✓
                </span>
                <span className={`text-[16px] leading-snug transition-colors ${checked[i] ? 'text-faint line-through' : 'text-fg'}`}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between gap-3" aria-live="polite">
          <span className="text-[15px] text-signal">{all ? t.all : ''}</span>
          {count > 0 && (
            <button type="button" className="btn btn-sm" onClick={() => save(items.map(() => false))}>
              {t.reset}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
