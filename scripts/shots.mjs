// Screenshot the site for design review. Usage:
//   node scripts/shots.mjs [baseUrl] [outDir]
// Renders each route at desktop and mobile widths, full page.
import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://localhost:4321';
const out = process.argv[3] || 'shots';

const routes = [
  ['home-en', '/en/'],
  ['home-kk', '/kk/'],
  ['learn', '/en/learn/'],
  ['labs', '/en/labs/'],
  ['materials', '/en/materials/'],
  ['workshop', '/en/workshop/'],
  ['glossary', '/en/glossary/'],
  ['lesson-00', '/en/learn/the-tweet/'],
  ['lesson-02', '/en/learn/ai-in-plain-language/'],
  ['lesson-07', '/en/learn/the-agent/'],
  ['lesson-11', '/en/learn/security/'],
  ['lesson-kk', '/kk/learn/the-tweet/'],
  ['lab-01', '/en/labs/claude-code-first-session/'],
];

await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();

for (const [name, w, h] of [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
]) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));

  for (const [label, path] of routes) {
    const res = await page.goto(base + path, { waitUntil: 'networkidle' }).catch(() => null);
    if (!res || res.status() >= 400) {
      console.log(`${name}/${label}  ✗ ${res ? res.status() : 'no response'}  ${path}`);
      continue;
    }
    // walk the page so every reveal fires, then return to the top
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = 'auto';
      const step = window.innerHeight * 0.8;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });
    await page.screenshot({ path: `${out}/${name}-${label}.png`, fullPage: true });
    console.log(`${name}/${label}  ✓`);
  }
  if (errors.length) console.log(`\n[${name}] console errors:\n  ` + [...new Set(errors)].slice(0, 12).join('\n  '));
  await ctx.close();
}

await browser.close();
console.log(`\nwrote ${out}/`);
