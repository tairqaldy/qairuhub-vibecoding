import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Same job, three shapes: one agent, a parallel fan-out, and an orchestrator with
 * verification. Run each and compare wall-clock, token cost and what actually ships.
 * The honest answer — sometimes one agent wins — is the point.
 */

const copy = {
  en: {
    title: 'One agent, or many?',
    intro:
      'The job: review a 40-file pull request for bugs. Run each shape and compare. There is no universally right answer, which is exactly what people get wrong about multi-agent.',
    run: 'Run',
    running: 'Running…',
    time: 'Wall clock',
    cost: 'Tokens',
    found: 'Real bugs found',
    false: 'False alarms',
    verdict: 'Verdict',
    reset: 'Reset',
    compare: 'Run all three to compare',
  },
  kk: {
    title: 'Бір agent пе, әлде көп пе?',
    intro:
      'Тапсырма: 40 файлдан тұратын pull request-ті қателерге тексеру. Әр пішінді іске қосып, салыстыр. Бәріне бірдей дұрыс жауап жоқ — көп агентті жүйелер туралы ең жиі қателесетін тұс осы.',
    run: 'Іске қосу',
    running: 'Жүріп жатыр…',
    time: 'Нақты уақыт',
    cost: 'Token',
    found: 'Шын қателер',
    false: 'Жалған дабыл',
    verdict: 'Қорытынды',
    reset: 'Қайта бастау',
    compare: 'Салыстыру үшін үшеуін де іске қос',
  },
};

interface Shape {
  id: string;
  name: { en: string; kk: string };
  nodes: { label: string; lane: number; at: number; dur: number }[];
  time: string;
  tokens: string;
  found: number;
  falsePos: number;
  verdict: { en: string; kk: string };
  tone: 'ok' | 'good' | 'warn';
}

const shapes: Shape[] = [
  {
    id: 'single',
    name: { en: 'One agent, one pass', kk: 'Бір agent, бір өтім' },
    nodes: [
      { label: 'read 40 files', lane: 0, at: 0, dur: 30 },
      { label: 'review', lane: 0, at: 30, dur: 45 },
      { label: 'report', lane: 0, at: 75, dur: 25 },
    ],
    time: '6 min',
    tokens: '180k',
    found: 4,
    falsePos: 1,
    verdict: {
      en: 'Cheapest and simplest. By file 30 the earlier files have fallen out of focus, so it misses things — but for a small PR this is the right default, and most teams should stop here.',
      kk: 'Ең арзан әрі қарапайым. 30-файлға жеткенде алдыңғы файлдар назардан шығып қалады, сондықтан бірдеңені жібереді — бірақ шағын PR үшін бұл дұрыс әдепкі нұсқа, әрі көп команда осымен шектелуі керек.',
    },
    tone: 'ok',
  },
  {
    id: 'parallel',
    name: { en: 'Five agents in parallel', kk: 'Қатар жүретін бес agent' },
    nodes: [
      { label: 'security', lane: 0, at: 0, dur: 42 },
      { label: 'correctness', lane: 1, at: 0, dur: 50 },
      { label: 'performance', lane: 2, at: 0, dur: 38 },
      { label: 'tests', lane: 3, at: 0, dur: 45 },
      { label: 'a11y', lane: 4, at: 0, dur: 35 },
      { label: 'merge', lane: 2, at: 52, dur: 20 },
    ],
    time: '3 min',
    tokens: '640k',
    found: 9,
    falsePos: 6,
    verdict: {
      en: 'Faster and far more thorough — five narrow lenses beat one wide one. But nobody checked the findings, so a third of them are wrong, and you now have to read all 15 to find the 9 that matter.',
      kk: 'Жылдамырақ әрі әлдеқайда мұқият — бес тар көзқарас бір кең көзқарастан артық. Бірақ табылғанды ешкім тексермеді, сондықтан үштен бірі қате, әрі маңызды 9-ын табу үшін 15-ін түгел оқып шығуың керек.',
    },
    tone: 'warn',
  },
  {
    id: 'orchestrated',
    name: { en: 'Fan out, then verify', kk: 'Тарат, содан соң тексер' },
    nodes: [
      { label: 'security', lane: 0, at: 0, dur: 42 },
      { label: 'correctness', lane: 1, at: 0, dur: 50 },
      { label: 'performance', lane: 2, at: 0, dur: 38 },
      { label: 'tests', lane: 3, at: 0, dur: 45 },
      { label: 'a11y', lane: 4, at: 0, dur: 35 },
      { label: 'verify ✕15', lane: 1, at: 52, dur: 30 },
      { label: 'report', lane: 2, at: 84, dur: 16 },
    ],
    time: '4 min',
    tokens: '890k',
    found: 9,
    falsePos: 1,
    verdict: {
      en: 'Each finding gets a second agent whose only job is to disprove it. Costs the most tokens and produces the only output a human can act on without re-checking everything. Worth it for a release; overkill for a typo fix.',
      kk: 'Әр табылған мәселеге оны теріске шығаруды ғана мақсат еткен екінші agent тағайындалады. Token-ді ең көп жейді, бірақ адам бәрін қайта тексермей-ақ әрекет ете алатын жалғыз нәтиже береді. Релиз үшін тұрарлық, ал қате әріпті түзету үшін артық.',
    },
    tone: 'good',
  },
];

const laneColors = ['#2b7fff', '#7cd4ff', '#ffb547', '#ff78d2', '#8fd3a8'];

export default function Orchestrator({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [ran, setRan] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const raf = useRef<number>(undefined);

  useEffect(() => () => cancelAnimationFrame(raf.current!), []);

  useEffect(() => {
    if (ran.length === shapes.length) award('widget:orchestrator', 25);
  }, [ran.length]);

  function run(id: string) {
    setActive(id);
    setProgress((p) => ({ ...p, [id]: 0 }));
    const startedAt = performance.now();
    const DURATION = 2600;
    const tick = () => {
      const pct = Math.min(100, ((performance.now() - startedAt) / DURATION) * 100);
      setProgress((p) => ({ ...p, [id]: pct }));
      if (pct < 100) raf.current = requestAnimationFrame(tick);
      else {
        setActive(null);
        setRan((r) => (r.includes(id) ? r : [...r, id]));
      }
    };
    raf.current = requestAnimationFrame(tick);
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill">
          {ran.length}/{shapes.length}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="grid gap-4">
          {shapes.map((s) => {
            const pct = progress[s.id] ?? 0;
            const done = ran.includes(s.id);
            const busy = active === s.id;
            const lanes = Math.max(...s.nodes.map((n) => n.lane)) + 1;

            return (
              <div key={s.id} className={`rounded-2xl border p-4 transition-colors ${done ? 'border-line-strong' : 'border-line'}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-display text-[19px] font-light text-white">{s.name[lang]}</span>
                  <button
                    type="button"
                    className={done ? 'btn btn-sm ml-auto' : 'btn btn-signal btn-sm ml-auto'}
                    onClick={() => run(s.id)}
                    disabled={busy}
                  >
                    {busy ? t.running : done ? '↻' : t.run}
                  </button>
                </div>

                {/* gantt */}
                <div className="relative mt-4 grid gap-1.5" style={{ minHeight: lanes * 26 }}>
                  {Array.from({ length: lanes }).map((_, lane) => (
                    <div key={lane} className="relative h-5 rounded bg-white/4">
                      {s.nodes
                        .filter((n) => n.lane === lane)
                        .map((n, i) => {
                          const visible = pct >= n.at;
                          const grow = Math.max(0, Math.min(1, (pct - n.at) / n.dur));
                          return (
                            <div
                              key={i}
                              className="absolute top-0 flex h-full items-center overflow-hidden rounded px-2 font-mono text-[10px] whitespace-nowrap text-black/80 transition-opacity"
                              style={{
                                left: `${n.at}%`,
                                width: `${n.dur * (done ? 1 : grow)}%`,
                                background: laneColors[lane % laneColors.length],
                                opacity: visible ? 0.9 : 0,
                              }}
                            >
                              {n.label}
                            </div>
                          );
                        })}
                    </div>
                  ))}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-px bg-white/60 transition-opacity"
                    style={{ left: `${pct}%`, opacity: busy ? 1 : 0 }}
                  />
                </div>

                {done && (
                  <div className="rise mt-4">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { k: t.time, v: s.time, c: '#fff' },
                        { k: t.cost, v: s.tokens, c: 'var(--color-amber)' },
                        { k: t.found, v: String(s.found), c: 'var(--color-signal)' },
                        { k: t.false, v: String(s.falsePos), c: s.falsePos > 2 ? 'var(--color-danger)' : '#fff' },
                      ].map((m) => (
                        <div key={m.k} className="rounded-xl border border-line bg-black/25 px-3 py-2">
                          <div className="font-display text-[22px] leading-none font-light" style={{ color: m.c }}>
                            {m.v}
                          </div>
                          <div className="mt-1 font-mono text-[10px] tracking-wide text-faint uppercase">{m.k}</div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="mt-3 rounded-xl border-l-2 py-2.5 pr-3 pl-4"
                      style={{
                        borderColor: s.tone === 'good' ? 'var(--color-signal)' : s.tone === 'warn' ? 'var(--color-amber)' : 'var(--color-ice)',
                        background: 'rgb(255 255 255 / 0.03)',
                      }}
                    >
                      <p className="m-0 font-mono text-[10px] tracking-widest text-faint uppercase">{t.verdict}</p>
                      <p className="m-0 mt-1.5 text-[15px] leading-relaxed text-[#dfe3f7]">{s.verdict[lang]}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {ran.length < shapes.length && <p className="mt-4 mb-0 text-[14px] text-faint">{t.compare}</p>}
        {ran.length > 0 && (
          <button type="button" className="btn btn-sm mt-4" onClick={() => { setRan([]); setProgress({}); }}>
            {t.reset}
          </button>
        )}
      </div>
    </section>
  );
}
