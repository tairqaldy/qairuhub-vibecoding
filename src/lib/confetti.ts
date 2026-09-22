/**
 * Confetti, in about forty lines and no dependency.
 *
 * Everything interactive on this site is offline by design — it has to work on
 * stage with no wifi and for a student who cannot pay for anything. A canvas
 * and some arithmetic is cheaper than a package, and it cannot break at the one
 * moment that is supposed to feel good.
 */

const COLORS = ['#2b7fff', '#6aa6ff', '#beeb50', '#ff78d2', '#ffb547', '#ffffff'];

export function confetti(durationMs = 2600) {
  if (typeof document === 'undefined') return;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:200';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);

  const pieces = Array.from({ length: 140 }, () => ({
    x: w * (0.15 + Math.random() * 0.7),
    y: -20 - Math.random() * h * 0.4,
    vx: (Math.random() - 0.5) * 3.2,
    vy: 2.6 + Math.random() * 3.6,
    size: 5 + Math.random() * 7,
    rot: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.28,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    tilt: Math.random() * Math.PI,
  }));

  const start = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    const elapsed = now - start;
    // fade the last half second instead of cutting mid-fall
    const fade = Math.max(0, Math.min(1, (durationMs - elapsed) / 500));
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = fade;

    for (const p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.spin;
      p.tilt += 0.1;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      // squash on the tilt axis so the pieces read as paper, not dots
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, (p.size / 2) * Math.abs(Math.cos(p.tilt)));
      ctx.restore();
    }

    if (elapsed < durationMs) raf = requestAnimationFrame(frame);
    else {
      cancelAnimationFrame(raf);
      canvas.remove();
    }
  };

  raf = requestAnimationFrame(frame);
}
