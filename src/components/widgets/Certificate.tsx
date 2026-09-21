import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { labs, modules, totalXp } from '@/data/curriculum';
import { getProgress, setName, subscribe } from '@/lib/store';

/**
 * Draws a share card on a canvas from the learner's local progress, so it can be
 * downloaded as a PNG with no server and no account. Nothing is uploaded anywhere.
 */

const copy = {
  en: {
    title: 'Your card',
    intro: 'Finish modules and labs to fill this in. It is drawn in your browser from your own progress — nothing is uploaded.',
    yourName: 'Your name',
    placeholder: 'Write your name',
    download: 'Download PNG',
    modules: 'modules',
    labs: 'labs',
    complete: 'complete',
    locked: 'Finish at least one module to unlock the card.',
    done: 'Vibecoding masterclass',
    by: 'qairuhub.com',
    keep: 'Post it, print it, or keep it. It is yours.',
  },
  kk: {
    title: 'Сенің картаң',
    intro: 'Модульдер мен практикаларды бітірген сайын осы толады. Ол сенің браузеріңде, өз прогресің бойынша сызылады — ешқайда ештеңе жіберілмейді.',
    yourName: 'Атың',
    placeholder: 'Атыңды жаз',
    download: 'PNG жүктеп алу',
    modules: 'модуль',
    labs: 'практика',
    complete: 'аяқталды',
    locked: 'Картаны ашу үшін кемінде бір модульді бітір.',
    done: 'Vibecoding мастер-класы',
    by: 'qairuhub.com',
    keep: 'Жариялай да, басып шығара да, сақтай да аласың. Ол сенікі.',
  },
};

export default function Certificate({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [name, setNameLocal] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setNameLocal(getProgress().name ?? '');
    return subscribe(() => setTick((n) => n + 1));
  }, []);

  const earned = getProgress().earned;
  const doneModules = modules.filter((m) => `module:${m.slug}` in earned).length;
  const doneLabs = labs.filter((l) => `lab:${l.slug}` in earned).length;
  const xp = Object.values(earned).reduce((a, b) => a + b, 0);
  const pct = Math.round((xp / totalXp) * 100);
  const unlocked = doneModules > 0;

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const W = 1200;
    const H = 630;
    cv.width = W;
    cv.height = H;
    const g = cv.getContext('2d');
    if (!g) return;

    // background
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#03040c');
    bg.addColorStop(0.45, '#050818');
    bg.addColorStop(1, '#070c24');
    g.fillStyle = bg;
    g.fillRect(0, 0, W, H);

    const glow = g.createRadialGradient(W * 0.85, 0, 0, W * 0.85, 0, 640);
    glow.addColorStop(0, 'rgba(43,127,255,0.30)');
    glow.addColorStop(1, 'rgba(43,127,255,0)');
    g.fillStyle = glow;
    g.fillRect(0, 0, W, H);

    g.strokeStyle = 'rgba(255,255,255,0.14)';
    g.lineWidth = 2;
    g.strokeRect(28, 28, W - 56, H - 56);

    // header
    g.fillStyle = '#6aa6ff';
    g.font = '500 20px "IBM Plex Mono", monospace';
    g.fillText(t.done.toUpperCase(), 72, 104);

    // name
    g.fillStyle = '#ffffff';
    g.font = '300 82px Inter, system-ui, sans-serif';
    const shown = (name || t.placeholder).slice(0, 26);
    g.fillText(shown, 70, 210);

    // progress bar
    g.fillStyle = 'rgba(255,255,255,0.12)';
    g.fillRect(72, 268, W - 144, 8);
    g.fillStyle = '#2b7fff';
    g.fillRect(72, 268, Math.max(8, ((W - 144) * pct) / 100), 8);

    // stats
    const stats: [string, string][] = [
      [`${doneModules}/${modules.length}`, t.modules],
      [`${doneLabs}/${labs.length}`, t.labs],
      [`${xp}`, 'XP'],
      [`${pct}%`, t.complete],
    ];
    stats.forEach(([v, k], i) => {
      const x = 72 + i * 268;
      g.fillStyle = i === 3 ? '#6aa6ff' : '#ffffff';
      g.font = '300 62px Inter, system-ui, sans-serif';
      g.fillText(v, x, 386);
      g.fillStyle = 'rgba(255,255,255,0.45)';
      g.font = '500 17px "IBM Plex Mono", monospace';
      g.fillText(k.toUpperCase(), x, 418);
    });

    // footer
    g.fillStyle = '#ffffff';
    g.font = '400 40px Courgette, cursive';
    g.fillText('vibecoding', 72, 548);
    g.fillStyle = 'rgba(255,255,255,0.5)';
    g.font = '400 20px "IBM Plex Mono", monospace';
    g.fillText('vibecoding.qairuhub.com', W - 72 - g.measureText('vibecoding.qairuhub.com').width, 548);

    g.fillStyle = '#2b7fff';
    g.fillRect(28, H - 34, W - 56, 6);
  }, [name, doneModules, doneLabs, xp, pct, lang, tick, t]);

  function download() {
    const cv = canvasRef.current;
    if (!cv) return;
    const a = document.createElement('a');
    a.download = `vibecoding-${(name || 'card').toLowerCase().replace(/\s+/g, '-')}.png`;
    a.href = cv.toDataURL('image/png');
    a.click();
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">{pct}%</span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <label className="label" htmlFor="cert-name">
          {t.yourName}
        </label>
        <input
          id="cert-name"
          className="input max-w-[360px]"
          value={name}
          placeholder={t.placeholder}
          maxLength={26}
          onChange={(e) => {
            setNameLocal(e.target.value);
            setName(e.target.value);
          }}
        />

        <div className="mt-6 overflow-hidden rounded-2xl border border-line">
          <canvas ref={canvasRef} className="block h-auto w-full" />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-signal" onClick={download} disabled={!unlocked}>
            ↓ {t.download}
          </button>
          <span className="text-[14px] text-faint">{unlocked ? t.keep : t.locked}</span>
        </div>
      </div>
    </section>
  );
}
