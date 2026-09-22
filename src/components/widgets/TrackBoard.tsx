import type { Lang } from '@/data/curriculum';
import { trackById, trackState, type TrackId } from '@/data/tracks';
import { useProgress } from '@/lib/store';
import { href } from '@/i18n/ui';

/**
 * The checklist for one level: every module and lab, ticked as you go.
 *
 * It is a React island rather than static markup because the tick has to be
 * right the instant someone comes back from finishing a lesson, and because the
 * exam below it unlocks from the same state.
 */

const copy = {
  en: {
    module: 'Module',
    lab: 'Lab',
    min: 'min',
    done: 'done',
    left: 'to go',
    all: 'Everything read. The exam is open.',
    keepGoing: 'Finish these, then the exam opens.',
  },
  kk: {
    module: 'Модуль',
    lab: 'Практика',
    min: 'мин',
    done: 'бітті',
    left: 'қалды',
    all: 'Бәрі оқылды. Емтихан ашық.',
    keepGoing: 'Мыналарды бітір, сосын емтихан ашылады.',
  },
};

export default function TrackBoard({ lang, track: trackId }: { lang: Lang; track: TrackId }) {
  const t = copy[lang];
  const progress = useProgress();
  const track = trackById(trackId);
  if (!track) return null;
  const s = trackState(track, progress.earned);

  return (
    <div className="board" style={{ ['--accent' as string]: track.accent }}>
      <div className="board-head">
        <div className="board-bar">
          <span style={{ width: `${s.pct}%` }} />
        </div>
        <p className="board-meta">
          <b>{s.done.length}</b>/{s.items.length} {t.done}
          {s.left.length > 0 && ` · ${s.minutesLeft} ${t.min} ${t.left}`}
        </p>
      </div>

      <ol className="board-list">
        {s.items.map((i) => {
          const ok = i.key in progress.earned;
          return (
            <li key={i.key} className={ok ? 'is-done' : ''}>
              <a href={href(lang, i.path)}>
                <span className="tick" aria-hidden="true">
                  {ok ? '✓' : ''}
                </span>
                <span className="body">
                  <span className="t">{i.title[lang]}</span>
                  <span className="m">
                    {i.kind === 'module' ? t.module : t.lab} · {i.minutes} {t.min} · +{i.xp} XP
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <p className={`board-note ${s.left.length === 0 ? 'is-ok' : ''}`}>{s.left.length === 0 ? t.all : t.keepGoing}</p>
    </div>
  );
}
