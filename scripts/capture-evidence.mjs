// Capture screenshots of the public pages this course cites, so the site shows the
// actual source rather than just describing it.
//
// Only public pages that render without a login are captured. X/Twitter requires a
// session and blocks automated requests, so those stay as <Post> cards with a link.
//
// Usage: node scripts/capture-evidence.mjs [slug ...]
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = 'public/img/evidence';
fs.mkdirSync(OUT, { recursive: true });

/** clip: capture only this selector's box (keeps the shot readable and small) */
const targets = [
  {
    slug: 'metr-slowdown',
    url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
    wait: 2500,
    height: 1000,
  },
  {
    slug: 'metr-update-2026',
    url: 'https://metr.org/blog/2026-02-24-uplift-update/',
    wait: 2500,
    height: 1000,
  },
  {
    slug: 'collins-woty',
    url: 'https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/',
    wait: 3000,
    height: 1000,
  },
  {
    slug: 'willison-vibe-coding',
    url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
    wait: 1800,
    height: 900,
  },
  {
    slug: 'willison-vibe-engineering',
    url: 'https://simonwillison.net/2025/Oct/7/vibe-engineering/',
    wait: 1800,
    height: 900,
  },
  {
    slug: 'karpathy-sequoia',
    url: 'https://karpathy.bearblog.dev/sequoia-ascent-2026/',
    wait: 1800,
    height: 900,
  },
  {
    slug: 'replit-register',
    url: 'https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/',
    wait: 2500,
    height: 1000,
  },
  {
    slug: 'claude-code-docs',
    url: 'https://code.claude.com/docs/en/best-practices',
    wait: 2500,
    height: 900,
  },
  {
    slug: 'agents-md',
    url: 'https://agents.md/',
    wait: 2000,
    height: 900,
  },
  {
    slug: 'owasp-llm-top10',
    url: 'https://genai.owasp.org/llm-top-10/',
    wait: 2500,
    height: 950,
  },
  {
    slug: 'anthropic-context-engineering',
    url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
    wait: 3000,
    height: 950,
  },
  {
    slug: 'spec-kit',
    url: 'https://github.com/github/spec-kit',
    wait: 2500,
    height: 950,
  },
];

const only = process.argv.slice(2);
const list = only.length ? targets.filter((t) => only.includes(t.slug)) : targets;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 1.5,
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
});

const results = [];
for (const t of list) {
  const page = await ctx.newPage();
  try {
    const res = await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    const status = res?.status() ?? 0;
    if (status >= 400) {
      results.push(`${t.slug}  ✗ HTTP ${status}`);
      await page.close();
      continue;
    }
    await page.waitForTimeout(t.wait);
    // dismiss the usual cookie banners, choosing the most private option available
    for (const label of ['Reject all', 'Reject All', 'Decline', 'Only essential', 'Necessary only', 'Reject']) {
      const btn = page.getByRole('button', { name: label, exact: false }).first();
      if (await btn.isVisible().catch(() => false)) {
        await btn.click().catch(() => {});
        await page.waitForTimeout(600);
        break;
      }
    }
    await page.setViewportSize({ width: 1280, height: t.height });
    await page.screenshot({ path: `${OUT}/${t.slug}.png`, clip: { x: 0, y: 0, width: 1280, height: t.height } });
    results.push(`${t.slug}  ✓`);
  } catch (e) {
    results.push(`${t.slug}  ✗ ${String(e).split('\n')[0].slice(0, 70)}`);
  }
  await page.close();
}

await browser.close();
console.log(results.join('\n'));
console.log(`\n${results.filter((r) => r.includes('✓')).length}/${list.length} captured into ${OUT}/`);
