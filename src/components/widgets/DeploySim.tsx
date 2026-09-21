import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/** A scripted deploy: localhost → GitHub → Cloudflare Pages → custom domain. */

const copy = {
  en: {
    title: 'Deploy, step by step',
    intro:
      'Press the button and watch a real deploy pipeline run, with the commands you would actually type. Each step explains what just happened and where it can break.',
    run: 'Run the deploy',
    running: 'Deploying…',
    again: 'Run it again',
    live: 'Your site is live',
    whatBroke: 'What breaks here',
  },
  kk: {
    title: 'Deploy қадам-қадаммен',
    intro:
      'Түймені бас та, шын жазатын командаларыңмен нағыз deploy құбырының жүрісін бақыла. Әр қадам не болғанын және қай жерде бұзылуы мүмкін екенін түсіндіреді.',
    run: 'Deploy-ды іске қосу',
    running: 'Жүріп жатыр…',
    again: 'Қайта іске қосу',
    live: 'Сайтың тірі',
    whatBroke: 'Мұнда не бұзылады',
  },
};

interface Stage {
  cmd: string;
  out: string[];
  ms: number;
  what: { en: string; kk: string };
  risk: { en: string; kk: string };
}

const stages: Stage[] = [
  {
    cmd: 'npm run build',
    out: ['building for production...', '✓ 38 pages built in 4.21s', 'dist/ ready (312 kB)'],
    ms: 1300,
    what: {
      en: 'Your source files become a folder of plain HTML, CSS and JS called dist/. That folder is the entire website — no server required.',
      kk: 'Бастапқы файлдарың dist/ деген қалтадағы қарапайым HTML, CSS және JS-ке айналады. Сол қалта — тұтас сайт, сервер керек емес.',
    },
    risk: {
      en: 'If it builds on your laptop but not in CI, it is almost always a missing dependency or a file whose name differs only by capital letters. Windows does not care about case; Linux does.',
      kk: 'Ноутбугыңда құрастырылып, CI-де құрастырылмаса — себебі әдетте жетіспейтін тәуелділік немесе тек бас әріппен ғана ерекшеленетін файл атауы. Windows әріп регистріне мән бермейді, Linux мән береді.',
    },
  },
  {
    cmd: 'git push origin main',
    out: ['Enumerating objects: 47, done.', 'Writing objects: 100% (31/31), 24.11 KiB', 'To github.com:you/qairu-event.git', '   a1b2c3d..7f2a91c  main -> main'],
    ms: 1100,
    what: {
      en: 'Your commits go to GitHub. This is your backup, your history, and the trigger for everything that follows.',
      kk: 'Commit-теріңді GitHub-қа жібереді. Бұл — сақтық көшірмең, тарихың әрі бұдан кейінгінің бәрін іске қосатын түйме.',
    },
    risk: {
      en: 'The classic failure: you committed .env. Add it to .gitignore before the first push, because a secret that reached GitHub must be rotated, not deleted.',
      kk: 'Классикалық қате: .env-ті commit жасап жіберу. Оны бірінші push-қа дейін .gitignore-ға қос, өйткені GitHub-қа жеткен құпияны жою жеткіліксіз — ауыстыру керек.',
    },
  },
  {
    cmd: 'wrangler pages deploy dist --project-name=qairu-event',
    out: ['Uploading... (38/38)', '✨ Deployment complete!', 'https://qairu-event.pages.dev'],
    ms: 1600,
    what: {
      en: 'Your dist/ folder is copied to Cloudflare\'s edge network. It is now served from data centres around the world, with HTTPS, for free.',
      kk: 'dist/ қалтаң Cloudflare-дің edge желісіне көшіріледі. Енді ол дүние жүзіндегі дата-орталықтардан HTTPS-пен, тегін таратылады.',
    },
    risk: {
      en: 'Nothing usually. This is the easy part in 2026 — which is exactly why "I cannot deploy it" is no longer a real excuse for not shipping.',
      kk: 'Әдетте ештеңе. 2026 жылы бұл — ең жеңіл бөлігі. Сондықтан «деплой жасай алмаймын» деген сылтау енді жарамайды.',
    },
  },
  {
    cmd: '# Cloudflare dashboard → Custom domains → add',
    out: ['vibecoding.qairuhub.com', 'CNAME created automatically', 'SSL certificate issued ✓'],
    ms: 1400,
    what: {
      en: 'A domain is a rented name that points at an address. The CNAME record says "this name means that server", and Cloudflare issues the certificate that turns http into https.',
      kk: 'Домен — мекенжайға сілтейтін жалға алынған атау. CNAME жазбасы «бұл атау анау серверді білдіреді» дейді, ал Cloudflare http-ны https-ке айналдыратын сертификат береді.',
    },
    risk: {
      en: 'DNS changes can take minutes to hours to reach everyone. If the site works for you and not your friend, you are usually looking at a cached old record, not a broken deploy.',
      kk: 'DNS өзгерістері бәріне жету үшін бірнеше минуттан сағатқа дейін уақыт алады. Сайт сенде ашылып, досыңда ашылмаса — әдетте бұл бұзылған deploy емес, кэштегі ескі жазба.',
    },
  },
];

export default function DeploySim({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [i, setI] = useState(-1);
  const [running, setRunning] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!running) return;
    if (i >= stages.length - 1) {
      setRunning(false);
      award('widget:deploy-sim', 25);
      return;
    }
    timer.current = setTimeout(() => setI((n) => n + 1), stages[Math.max(0, i)].ms);
    return () => clearTimeout(timer.current);
  }, [running, i]);

  function run() {
    setI(0);
    setOpen(null);
    setRunning(true);
  }

  const done = i >= stages.length - 1 && !running;

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        {done && <span className="pill pill-act">✓ live</span>}
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <button type="button" className="btn btn-signal" onClick={run} disabled={running}>
          {running ? t.running : i < 0 ? t.run : t.again}
        </button>

        <div className="mt-6 grid gap-2.5">
          {stages.map((s, idx) => {
            const state = idx < i || done ? 'done' : idx === i ? 'active' : 'idle';
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-500 ${
                  state === 'idle' ? 'border-line opacity-40' : state === 'active' ? 'border-signal/60 bg-signal/5' : 'border-line-strong'
                }`}
              >
                <div className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={`grid size-6 flex-none place-items-center rounded-full border font-mono text-[11px] ${
                      state === 'done' ? 'border-signal bg-signal text-signal-ink' : state === 'active' ? 'border-signal text-signal' : 'border-line-strong text-faint'
                    }`}
                  >
                    {state === 'done' ? '✓' : idx + 1}
                  </span>
                  <code className="min-w-0 truncate font-mono text-[13px] text-white">{s.cmd}</code>
                  {state !== 'idle' && (
                    <button
                      type="button"
                      className="ml-auto flex-none cursor-pointer border-0 bg-transparent font-mono text-[11px] text-ice"
                      onClick={() => setOpen(open === idx ? null : idx)}
                      aria-expanded={open === idx}
                    >
                      {open === idx ? '−' : 'ⓘ'}
                    </button>
                  )}
                </div>

                {state !== 'idle' && (
                  <div className="border-t border-line px-4 py-2.5 font-mono text-[12.5px] leading-relaxed text-[#8fd3a8]">
                    {s.out.map((o, j) => (
                      <div key={j} className={o.startsWith('http') ? 'text-ice underline' : ''}>
                        {o}
                      </div>
                    ))}
                  </div>
                )}

                {open === idx && (
                  <div className="rise grid gap-3 border-t border-line px-4 py-4">
                    <p className="m-0 text-[15px] leading-relaxed text-[#dfe3f7]">{s.what[lang]}</p>
                    <div className="rounded-xl border border-amber/30 bg-amber/6 p-3">
                      <p className="m-0 font-mono text-[10px] tracking-widest text-amber uppercase">{t.whatBroke}</p>
                      <p className="m-0 mt-1.5 text-[14px] leading-relaxed text-[#e8dcc4]">{s.risk[lang]}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {done && (
          <div className="rise mt-5 flex items-center gap-4 rounded-2xl border border-signal/40 bg-signal/7 p-5">
            <span className="grid size-11 flex-none place-items-center rounded-full bg-signal text-[20px] text-signal-ink">✓</span>
            <div>
              <p className="m-0 font-display text-[19px] font-light text-white">{t.live}</p>
              <code className="font-mono text-[13px] text-signal">https://vibecoding.qairuhub.com</code>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
