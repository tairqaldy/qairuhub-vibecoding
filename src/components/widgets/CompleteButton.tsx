import { useSyncExternalStore } from 'react';
import type { Lang } from '@/data/curriculum';
import { award, revoke, subscribe, has } from '@/lib/store';

const copy = {
  en: { mark: 'Mark complete', done: 'Completed', undo: 'Undo' },
  kk: { mark: 'Аяқталды деп белгілеу', done: 'Аяқталды', undo: 'Болдырмау' },
};

export default function CompleteButton({ lang, id, xp }: { lang: Lang; id: string; xp: number }) {
  const t = copy[lang];
  const done = useSyncExternalStore(
    subscribe,
    () => has(id),
    () => false,
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className={done ? 'btn' : 'btn btn-signal'}
        onClick={() => (done ? revoke(id) : award(id, xp))}
        aria-pressed={done}
      >
        {done ? `✓ ${t.done}` : `${t.mark} · +${xp} XP`}
      </button>
      {done && (
        <button type="button" className="btn btn-sm" onClick={() => revoke(id)}>
          {t.undo}
        </button>
      )}
    </div>
  );
}
