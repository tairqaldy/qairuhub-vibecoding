import { useEffect, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { totalXp } from '@/data/curriculum';
import { allTrackStates, capstone, capstoneEarned, nextTrack, tracks } from '@/data/tracks';
import { totalEarned, useProgress } from '@/lib/store';
import { getUser } from '@/lib/api';
import { href } from '@/i18n/ui';

/**
 * Where you stand.
 *
 * The course is one long road; this is the map. Four levels, what is left in
 * each, and the one thing to do next — because "16 modules" is a number and
 * "three modules from your first certificate" is a reason to sit down.
 */

const START_KEY = 'vc:start';

const copy = {
  en: {
    hi: 'Your progress',
    xp: 'XP earned',
    certs: 'certificates held',
    pickK: 'Where are you starting from?',
    pickBody: 'Pick the one that sounds like you. It only changes what we suggest first — every level stays open.',
    pickSkip: 'Show me everything instead',
    suggested: 'Suggested for you',
    next: 'Do this next',
    open: 'Open the level',
    continue: 'Continue',
    left: 'left',
    items: 'items',
    minutes: 'min',
    done: 'Done',
    examDue: 'Exam not passed yet',
    examScore: 'Exam',
    held: 'Certificate held',
    ready: 'Certificate ready to claim',
    nothingLeft: 'Everything read',
    allDone: 'All four levels done',
    capstoneBody: 'Every module, every lab, every exam.',
    viewCapstone: 'Claim the full-programme certificate',
    level: 'Level',
  },
  kk: {
    hi: 'Сенің ілгерілеуің',
    xp: 'жиналған XP',
    certs: 'сертификат',
    pickK: 'Неден бастап жатырсың?',
    pickBody: 'Өзіңе ұқсағанын таңда. Бұл тек не ұсынатынымызды өзгертеді — деңгейдің бәрі ашық тұрады.',
    pickSkip: 'Бәрін көрсет',
    suggested: 'Саған ұсынамыз',
    next: 'Келесі қадам',
    open: 'Деңгейді ашу',
    continue: 'Жалғастыру',
    left: 'қалды',
    items: 'бөлім',
    minutes: 'мин',
    done: 'Бітті',
    examDue: 'Емтихан әлі тапсырылмаған',
    examScore: 'Емтихан',
    held: 'Сертификат алынған',
    ready: 'Сертификатты алуға болады',
    nothingLeft: 'Бәрі оқылды',
    allDone: 'Төрт деңгейдің бәрі бітті',
    capstoneBody: 'Әр модуль, әр практика, әр емтихан.',
    viewCapstone: 'Толық бағдарлама сертификатын алу',
    level: 'Деңгей',
  },
};

export default function Profile({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const progress = useProgress();
  const [picked, setPicked] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setPicked(localStorage.getItem(START_KEY));
    } catch {}
    setReady(true);
  }, []);

  function choose(id: string) {
    try {
      localStorage.setItem(START_KEY, id);
    } catch {}
    setPicked(id);
  }

  const states = allTrackStates(progress.earned);
  const xp = totalEarned();
  const held = states.filter((s) => s.holdsCert).length;
  const suggestion = picked ? states.find((s) => s.track.id === picked) : nextTrack(progress.earned);
  const user = getUser();
  const allDone = capstoneEarned(progress.earned);

  // Nothing chosen and nothing started: ask once, then never again.
  const askFirst = ready && !picked && states.every((s) => s.done.length === 0);

  return (
    <div className="prof">
      <div className="prof-top">
        <div>
          <p className="prof-k">{t.hi}</p>
          <h1 className="prof-name">{user?.name || ''}</h1>
        </div>
        <div className="prof-nums">
          <span>
            <b>{xp}</b>
            <i>
              / {totalXp} {t.xp}
            </i>
          </span>
          <span>
            <b>{held}</b>
            <i>
              / {tracks.length} {t.certs}
            </i>
          </span>
        </div>
      </div>

      {askFirst && (
        <section className="prof-pick">
          <p className="prof-k">{t.pickK}</p>
          <p className="prof-lead">{t.pickBody}</p>
          <div className="pick-grid">
            {tracks.map((tr) => (
              <button key={tr.id} type="button" className="pick" onClick={() => choose(tr.id)}>
                <span className="pick-n" style={{ color: tr.accent }}>
                  {tr.n}
                </span>
                <span className="pick-t">{tr.title[lang]}</span>
                <span className="pick-d">{tr.forWho[lang]}</span>
              </button>
            ))}
          </div>
          <button type="button" className="prof-skip" onClick={() => choose('')}>
            {t.pickSkip}
          </button>
        </section>
      )}

      {suggestion && !suggestion.holdsCert && (
        <a className="prof-next" href={href(lang, suggestion.left[0]?.path ?? `tracks/${suggestion.track.id}`)}>
          <span className="pn-k">{t.next}</span>
          <span className="pn-t">{suggestion.left[0]?.title[lang] ?? suggestion.track.title[lang]}</span>
          <span className="pn-m">
            {suggestion.track.title[lang]} · {suggestion.pct}%
          </span>
        </a>
      )}

      <div className="prof-tracks">
        {states.map((s) => (
          <article key={s.track.id} className="lvl" style={{ ['--accent' as string]: s.track.accent }}>
            <header>
              <span className="lvl-n">{s.track.n}</span>
              <div>
                <h2>{s.track.title[lang]}</h2>
                <p>{s.track.tagline[lang]}</p>
              </div>
              <span className="lvl-pct">{s.pct}%</span>
            </header>

            <div className="lvl-bar">
              <span style={{ width: `${s.pct}%` }} />
            </div>

            <p className="lvl-meta">
              {s.done.length}/{s.items.length} {t.items}
              {s.left.length > 0 && ` · ${s.minutesLeft} ${t.minutes} ${t.left}`}
              {s.score !== null && ` · ${t.examScore} ${s.score}%`}
            </p>

            {s.left.length > 0 ? (
              <ul className="lvl-left">
                {s.left.slice(0, 4).map((i) => (
                  <li key={i.key}>
                    <a href={href(lang, i.path)}>{i.title[lang]}</a>
                  </li>
                ))}
                {s.left.length > 4 && <li className="more">+{s.left.length - 4}</li>}
              </ul>
            ) : (
              <p className="lvl-ok">{t.nothingLeft}</p>
            )}

            <div className="lvl-foot">
              <span className={`lvl-state ${s.holdsCert ? 'ok' : s.earnedCert ? 'ready' : ''}`}>
                {s.holdsCert ? t.held : s.earnedCert ? t.ready : s.examPassed ? t.done : t.examDue}
              </span>
              <a className="btn btn-sm" href={href(lang, `tracks/${s.track.id}`)}>
                {s.done.length ? t.continue : t.open} →
              </a>
            </div>
          </article>
        ))}
      </div>

      {allDone && (
        <a className="prof-capstone" href={href(lang, 'tracks/all')}>
          <span className="pn-k">{t.allDone}</span>
          <span className="pn-t">{capstone.credential[lang]}</span>
          <span className="pn-m">{t.capstoneBody}</span>
          <span className="pn-cta">{t.viewCapstone} →</span>
        </a>
      )}
    </div>
  );
}
