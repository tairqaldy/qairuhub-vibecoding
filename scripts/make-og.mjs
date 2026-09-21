// Render the Open Graph card set with Playwright, using the site's own tokens.
// Usage: node scripts/make-og.mjs
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const OUT = 'public/og';
await fs.mkdir(OUT, { recursive: true });

const cards = [
  { name: 'default', kicker: 'A QairuHub project · EN / ҚАЗ', title: 'vibecoding', sub: 'Everything about vibecoding, in one place', act: '#2b7fff' },
  { name: 'learn', kicker: '16 modules · free', title: 'The path', sub: 'From your first prompt to a team of agents', act: '#2b7fff' },
  { name: 'labs', kicker: '9 hands-on labs', title: 'Do it for real', sub: 'Exact commands, exact prompts, on your own machine', act: '#48d597' },
  { name: 'try', kicker: 'Start here · 10 minutes', title: 'Stop reading.', sub: 'Start typing.', act: '#2b7fff' },
  { name: 'tools', kicker: '18+ tools compared', title: 'Pick a tool', sub: 'Free tiers, real weaknesses, and what to start with', act: '#7cd4ff' },
  { name: 'materials', kicker: '160+ resources', title: 'Everything worth reading', sub: 'Sorted by what you are trying to do', act: '#ff78d2' },
  { name: 'workshop', kicker: 'Live · 2h + 1h', title: 'The workshop', sub: 'Run-of-show, demos, and 10 projects to build together', act: '#ffb547' },
];

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;600&family=Courgette&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#03040c;font-family:Inter,sans-serif;color:#fff;overflow:hidden;position:relative}
  .bg{position:absolute;inset:0;background:
    radial-gradient(900px 520px at 88% -8%, ${c.act}33, transparent 62%),
    radial-gradient(700px 460px at -6% 30%, ${c.act}1a, transparent 62%),
    linear-gradient(180deg,#03040c 0%,#050818 45%,#070c24 100%)}
  .grain{position:absolute;inset:0;opacity:.05;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  .in{position:relative;padding:72px 76px;height:100%;display:flex;flex-direction:column;justify-content:space-between}
  .k{font-family:'IBM Plex Mono',monospace;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:${c.act}}
  h1{font-size:${c.title === 'vibecoding' ? '128px' : '92px'};font-weight:300;letter-spacing:-.045em;line-height:.98;${c.title === 'vibecoding' ? `font-family:Courgette,cursive;font-weight:400;color:${c.act}` : ''}}
  p{margin-top:26px;font-size:32px;font-weight:300;line-height:1.3;color:rgba(255,255,255,.75);max-width:22ch}
  .foot{display:flex;align-items:center;justify-content:space-between}
  .brand{font-family:Courgette,cursive;font-size:34px}
  .brand span{font-family:'IBM Plex Mono',monospace;font-size:15px;color:rgba(255,255,255,.45);margin-left:10px;letter-spacing:.06em}
  .url{font-family:'IBM Plex Mono',monospace;font-size:19px;color:rgba(255,255,255,.55)}
  .bar{position:absolute;left:0;right:0;bottom:0;height:8px;background:linear-gradient(90deg,${c.act},${c.act}00)}
</style></head><body>
<div class="bg"></div><div class="grain"></div>
<div class="in">
  <div><div class="k">${c.kicker}</div></div>
  <div><h1>${c.title}</h1><p>${c.sub}</p></div>
  <div class="foot">
    <div class="brand">vibecoding<span>by qairuhub</span></div>
    <div class="url">vibecoding.qairuhub.com</div>
  </div>
</div>
<div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const c of cards) {
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${c.name}.png` });
  console.log(`og/${c.name}.png`);
}

await browser.close();
console.log(`\nwrote ${cards.length} cards to ${OUT}/`);
