import { useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

const copy = {
  en: {
    title: 'Guess the number',
    intro: 'Before you read the answer, commit to a guess. Prediction first makes the real number stick.',
    guess: 'Your guess',
    reveal: 'Reveal',
    actual: 'Actual',
    yours: 'Yours',
    next: 'Next question',
    again: 'Start over',
    off: 'off',
    close: 'Close.',
    way: 'Not close.',
    exact: 'Spot on.',
    done: 'That is the whole point of this module.',
  },
  kk: {
    title: 'Санды тап',
    intro: 'Жауабын оқымай тұрып болжам жаса. Алдымен болжау — нақты санның жадта қалуының ең сенімді жолы.',
    guess: 'Сенің болжамың',
    reveal: 'Жауабын ашу',
    actual: 'Шын мәні',
    yours: 'Сенікі',
    next: 'Келесі сұрақ',
    again: 'Қайта бастау',
    off: 'айырма',
    close: 'Жақын.',
    way: 'Алыс.',
    exact: 'Дәл таптың.',
    done: 'Бұл модульдің бар мәні осында.',
  },
};

interface Q {
  q: { en: string; kk: string };
  min: number;
  max: number;
  answer: number;
  unit: string;
  start: number;
  fact: { en: string; kk: string };
  source: string;
  href: string;
}

const questions: Q[] = [
  {
    q: {
      en: 'In March 2025, Y Combinator said that for about a quarter of its Winter 2025 startups, what share of the code was written by AI?',
      kk: '2025 жылдың наурызында Y Combinator өзінің Winter 2025 стартаптарының шамамен төрттен бірінде кодтың қанша пайызын ЖИ жазғанын айтты?',
    },
    min: 0,
    max: 100,
    answer: 95,
    unit: '%',
    start: 50,
    fact: {
      en: 'Garry Tan told CNBC that for about 25% of W25 startups, 95% of the code was written by AI. Jared Friedman added the nuance that these founders are highly technical and could write it themselves.',
      kk: 'Garry Tan CNBC-ге W25 стартаптарының шамамен 25%-ында кодтың 95%-ын ЖИ жазғанын айтты. Jared Friedman бұл құрылтайшылардың өздері де жаза алатын, техникалық жағынан күшті адамдар екенін ескертті.',
    },
    source: 'CNBC / Y Combinator',
    href: 'https://www.cnbc.com/2025/03/15/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated.html',
  },
  {
    q: {
      en: 'METR ran a randomised trial with experienced open-source developers on their own repos. With AI tools, how much FASTER did they finish tasks?',
      kk: 'METR тәжірибелі ашық бастапқы кодты әзірлеушілермен өз репозиторийлерінде рандомизацияланған зерттеу жүргізді. ЖИ құралдарымен олар тапсырманы қанша пайызға ЖЫЛДАМ бітірді?',
    },
    min: -40,
    max: 60,
    answer: -19,
    unit: '%',
    start: 25,
    fact: {
      en: 'They were 19% SLOWER. The same developers predicted they would be 24% faster, and even after finishing they believed they had been 20% faster. The gap between feeling fast and being fast is the whole lesson.',
      kk: 'Олар 19%-ға БАЯУ болды. Сол әзірлеушілер өздерін 24%-ға жылдам болады деп болжаған, ал жұмысты бітіргеннен кейін де 20%-ға жылдам болдық деп сенген. Жылдам сезіну мен шынымен жылдам болудың арасындағы алшақтық — осы сабақтың негізгі ойы.',
    },
    source: 'METR, July 2025',
    href: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
  },
  {
    q: {
      en: 'Veracode tested over 100 large language models on security-sensitive coding tasks. What share of the generated code failed the security tests?',
      kk: 'Veracode 100-ден астам үлкен тіл моделін қауіпсіздікке қатысты тапсырмаларда тексерді. Жасалған кодтың қанша пайызы қауіпсіздік тестінен өте алмады?',
    },
    min: 0,
    max: 100,
    answer: 45,
    unit: '%',
    start: 20,
    fact: {
      en: 'About 45% introduced an OWASP Top 10 vulnerability. Newer and bigger models wrote code that compiles and runs more reliably — but they were not measurably more secure.',
      kk: 'Шамамен 45%-ы OWASP Top 10 осалдығын енгізді. Жаңа әрі үлкен модельдер компиляцияланатын және жұмыс істейтін кодты сенімдірек жазды — бірақ қауіпсіздік жағынан байқалатындай жақсармады.',
    },
    source: 'Veracode GenAI Code Security Report, 2025',
    href: 'https://www.veracode.com/blog/genai-code-security-report/',
  },
];

export default function GuessTheNumber({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [i, setI] = useState(0);
  const [value, setValue] = useState(questions[0].start);
  const [shown, setShown] = useState(false);

  const q = questions[i];
  const diff = Math.abs(value - q.answer);
  const span = q.max - q.min;
  const verdict = diff === 0 ? t.exact : diff <= span * 0.08 ? t.close : t.way;
  const pos = (v: number) => ((v - q.min) / span) * 100;

  function reveal() {
    setShown(true);
    award(`guess:${i}`, 10);
  }
  function next() {
    const n = i + 1;
    if (n >= questions.length) return;
    setI(n);
    setValue(questions[n].start);
    setShown(false);
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill">
          {i + 1} / {questions.length}
        </span>
      </div>
      <div className="widget-body">
        {i === 0 && !shown && <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>}

        <p className="m-0 font-display text-[21px] leading-snug font-light text-white sm:text-[25px]">{q.q[lang]}</p>

        <div className="mt-7">
          <div className="mb-2 flex items-baseline justify-between">
            <span className="label m-0">{t.guess}</span>
            <span className="font-display text-[32px] leading-none font-light text-signal">
              {value > 0 && q.min < 0 ? '+' : ''}
              {value}
              {q.unit}
            </span>
          </div>
          <input
            type="range"
            className="vc-range"
            min={q.min}
            max={q.max}
            value={value}
            disabled={shown}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label={t.guess}
          />
          <div className="mt-1 flex justify-between font-mono text-[11px] text-faint">
            <span>{q.min}{q.unit}</span>
            <span>{q.max}{q.unit}</span>
          </div>
        </div>

        {!shown ? (
          <button type="button" className="btn btn-signal mt-6" onClick={reveal}>
            {t.reveal}
          </button>
        ) : (
          <div className="rise mt-6">
            <div className="relative h-16">
              <div className="absolute top-7 right-0 left-0 h-0.5 rounded bg-white/12" />
              <div
                className="absolute top-2 -translate-x-1/2 text-center"
                style={{ left: `${Math.max(4, Math.min(96, pos(value)))}%` }}
              >
                <div className="mx-auto h-3 w-0.5 bg-white/40" />
                <div className="mt-1 font-mono text-[11px] whitespace-nowrap text-faint">
                  {t.yours} {value}
                  {q.unit}
                </div>
              </div>
              <div
                className="absolute top-0 -translate-x-1/2 text-center"
                style={{ left: `${Math.max(4, Math.min(96, pos(q.answer)))}%` }}
              >
                <div className="font-display text-[26px] leading-none font-light text-signal">
                  {q.answer}
                  {q.unit}
                </div>
                <div className="mx-auto mt-1 h-5 w-0.5 bg-signal" />
                <div className="font-mono text-[11px] whitespace-nowrap text-signal">{t.actual}</div>
              </div>
            </div>

            <p className="mt-4 mb-0 text-[15px]">
              <b className={diff <= span * 0.08 ? 'text-signal' : 'text-amber'}>{verdict}</b>{' '}
              <span className="text-faint font-mono text-[13px]">
                {diff}
                {q.unit} {t.off}
              </span>
            </p>

            <div className="mt-4 rounded-2xl border border-line bg-black/30 p-4">
              <p className="m-0 text-[16px] leading-relaxed text-[#dfe3f7]">{q.fact[lang]}</p>
              <a
                className="mt-3 inline-block font-mono text-[12px] text-ice no-underline hover:underline"
                href={q.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {q.source} ↗
              </a>
            </div>

            <div className="mt-5 flex gap-3">
              {i < questions.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={next}>
                  {t.next} →
                </button>
              ) : (
                <p className="m-0 text-[15px] text-signal">{t.done}</p>
              )}
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setI(0);
                  setValue(questions[0].start);
                  setShown(false);
                }}
              >
                {t.again}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
