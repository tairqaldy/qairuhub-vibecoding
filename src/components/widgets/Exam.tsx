import { useMemo, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { examPool, shuffled, type ExamQuestion } from '@/data/exams';
import { trackById, examKey, type TrackId } from '@/data/tracks';
import { awardBest, useProgress } from '@/lib/store';
import { confetti } from '@/lib/confetti';
import { track as logEvent } from '@/lib/api';
import { href } from '@/i18n/ui';

/**
 * The exam that gates a certificate.
 *
 * Retakeable forever, and only the best score is kept — the point is that
 * someone who failed goes back, reads the two lessons they got wrong, and comes
 * back. Failing is a reading list, not a verdict.
 *
 * Each attempt draws a random subset of the pool and shuffles the four options,
 * so the answer key is never a position on screen. Two of the four pools were
 * written with every answer on the same index; without the shuffle they would
 * have been passable by picking B eight times.
 */

const copy = {
  en: {
    start: 'Start the exam',
    retake: 'Retake the exam',
    improve: 'Retake to improve',
    q: 'Question',
    of: 'of',
    next: 'Next',
    finish: 'See my score',
    passed: 'Passed',
    failed: 'Not this time',
    yourScore: 'Your score',
    best: 'Best so far',
    need: 'You need',
    toPass: 'to pass',
    review: 'What to look at again',
    correct: 'Correct',
    yourAnswer: 'You chose',
    theAnswer: 'The answer',
    read: 'Read it again',
    intro: (n: number, pass: number) =>
      `${n} questions, drawn from a larger pool and shuffled. ${pass}% to pass. Retake as often as you like — only your best score counts.`,
    locked: 'Finish the modules and labs above first. The exam unlocks when they are all done.',
    passedBody: 'The certificate is ready to claim below.',
    failedBody: 'Close. Read the pages listed below and come straight back.',
    noAnswer: 'Pick an answer',
  },
  kk: {
    start: 'Емтиханды бастау',
    retake: 'Емтиханды қайта тапсыру',
    improve: 'Нәтижені жақсарту',
    q: 'Сұрақ',
    of: '/',
    next: 'Келесі',
    finish: 'Нәтижемді көру',
    passed: 'Тапсырдың',
    failed: 'Бұл жолы болмады',
    yourScore: 'Нәтижең',
    best: 'Ең жақсы нәтиже',
    need: 'Қажет',
    toPass: 'өту үшін',
    review: 'Нені қайта қарау керек',
    correct: 'Дұрыс',
    yourAnswer: 'Сен таңдадың',
    theAnswer: 'Дұрыс жауап',
    read: 'Қайта оқы',
    intro: (n: number, pass: number) =>
      `${n} сұрақ — үлкен жиынтықтан кездейсоқ алынып, араластырылады. Өту үшін ${pass}% керек. Қалағаныңша қайта тапсыр: ең жақсы нәтижең ғана есептеледі.`,
    locked: 'Алдымен жоғарыдағы модульдер мен практикаларды бітір. Бәрі дайын болғанда емтихан ашылады.',
    passedBody: 'Сертификатты төменнен алуға болады.',
    failedBody: 'Аз-ақ қалды. Төменде аталған беттерді оқы да, бірден қайта кел.',
    noAnswer: 'Жауабын таңда',
  },
};

interface Drawn {
  question: ExamQuestion;
  /** Indexes into question.options, in the order shown. */
  order: number[];
}

export default function Exam({ lang, track: trackId }: { lang: Lang; track: TrackId }) {
  const t = copy[lang];
  const track = trackById(trackId);
  const progress = useProgress();

  const [paper, setPaper] = useState<Drawn[] | null>(null);
  const [at, setAt] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [done, setDone] = useState<{ score: number; passed: boolean } | null>(null);

  const pool = useMemo(() => examPool(trackId), [trackId]);
  if (!track) return null;

  const best = progress.earned[examKey(trackId)];
  const bestScore = typeof best === 'number' ? best : null;
  const held = bestScore !== null && bestScore >= track.passMark;

  function begin() {
    const n = Math.min(track!.ask, pool.length);
    const drawn = shuffled(pool)
      .slice(0, n)
      .map((question) => ({ question, order: shuffled(question.options.map((_, i) => i)) }));
    setPaper(drawn);
    setPicks(new Array(drawn.length).fill(null));
    setAt(0);
    setDone(null);
  }

  function submit(sheet: Drawn[], chosen: (number | null)[]) {
    const right = sheet.filter((d, i) => chosen[i] === d.question.answer).length;
    const score = Math.round((right / sheet.length) * 100);
    const passed = score >= track!.passMark;
    // Best-of, not first-of: a worse retake must never lower the record.
    awardBest(examKey(trackId), score);
    void logEvent('exam', `${trackId}:${score}`, lang);
    setDone({ score, passed });
    if (passed && (bestScore === null || bestScore < track!.passMark)) confetti();
  }

  /* ------------------------------------------------------------- results */
  if (done && paper) {
    const wrong = paper.filter((d, i) => picks[i] !== d.question.answer);
    return (
      <div className={`exam result ${done.passed ? 'ok' : 'no'}`}>
        <p className="verdict">{done.passed ? t.passed : t.failed}</p>
        <p className="score">
          {done.score}
          <span>%</span>
        </p>
        <p className="body">{done.passed ? t.passedBody : t.failedBody}</p>
        {bestScore !== null && bestScore > done.score && (
          <p className="sub">
            {t.best}: {bestScore}%
          </p>
        )}

        {wrong.length > 0 && (
          <div className="review">
            <p className="rev-h">{t.review}</p>
            <ol>
              {wrong.map((d, i) => {
                const mine = picks[paper.indexOf(d)];
                return (
                  <li key={d.question.id}>
                    <p className="rq">{d.question.q[lang]}</p>
                    {mine != null && (
                      <p className="ra bad">
                        <span>{t.yourAnswer}</span> {d.question.options[mine][lang]}
                      </p>
                    )}
                    <p className="ra good">
                      <span>{t.theAnswer}</span> {d.question.options[d.question.answer][lang]}
                    </p>
                    <p className="rw">{d.question.why[lang]}</p>
                    <a className="rl" href={href(lang, d.question.ref)}>
                      {t.read} →
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        )}

        <button type="button" className="btn btn-signal" onClick={begin}>
          {done.passed ? t.improve : t.retake}
        </button>
      </div>
    );
  }

  /* --------------------------------------------------------- in progress */
  if (paper) {
    const d = paper[at];
    const picked = picks[at];
    const last = at === paper.length - 1;
    return (
      <div className="exam run">
        <div className="bar">
          <span style={{ width: `${((at + 1) / paper.length) * 100}%` }} />
        </div>
        <p className="counter">
          {t.q} {at + 1} {t.of} {paper.length}
        </p>
        <p className="question">{d.question.q[lang]}</p>
        <div className="options">
          {d.order.map((optIndex) => (
            <button
              key={optIndex}
              type="button"
              className={`option ${picked === optIndex ? 'is-picked' : ''}`}
              onClick={() => setPicks((p) => p.map((v, i) => (i === at ? optIndex : v)))}
            >
              {d.question.options[optIndex][lang]}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-signal"
          disabled={picked == null}
          onClick={() => (last ? submit(paper, picks) : setAt(at + 1))}
        >
          {picked == null ? t.noAnswer : last ? t.finish : t.next}
        </button>
      </div>
    );
  }

  /* ----------------------------------------------------------- the front */
  return (
    <div className="exam intro">
      <p className="lead">{t.intro(Math.min(track.ask, pool.length), track.passMark)}</p>
      {bestScore !== null && (
        <p className={`sub ${held ? 'is-ok' : ''}`}>
          {t.best}: <b>{bestScore}%</b>
          {!held && (
            <>
              {' · '}
              {t.need} {track.passMark}% {t.toPass}
            </>
          )}
        </p>
      )}
      <button type="button" className="btn btn-signal" onClick={begin}>
        {bestScore === null ? t.start : held ? t.improve : t.retake}
      </button>
    </div>
  );
}
