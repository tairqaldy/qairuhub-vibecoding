# vibecoding.qairuhub.com

**Everything about vibecoding, in one place.** A free, interactive masterclass in English and
Kazakh, by [QairuHub](https://qairuhub.com) — from your first prompt to running a team of AI agents.

→ **https://vibecoding-1vl.pages.dev** (custom domain pending a DNS record)

---

## What is in it

| | |
|---|---|
| **Try it** | Three 10-minute tracks to get anyone from zero to a working thing — browser, laptop, or a live URL |
| **Learn** | 16 modules in 3 acts: the story and the evidence, the 9-step workflow, then multi-agent |
| **Labs** | 9 hands-on sessions on your own machine, with exact commands and prompts |
| **Tools** | 32 AI coding environments and 31 models compared — free tiers, honest weaknesses |
| **Materials** | 167 curated resources in 18 categories, plus 4 reading paths |
| **Glossary** | 473 English↔Kazakh technical terms with definitions and usage rules |
| **Workshop** | A minute-by-minute run-of-show for teaching it live, with demo fallbacks |
| **Slides** | Keyboard-driven presentation mode |

**12 interactive widgets** — a token counter, a Claude Code simulator, a fake terminal, a git
simulator, spot-the-security-bug, a deploy simulator and more. All scripted and offline: no API
keys, no network calls, works on stage with no wifi.

Progress and XP live in `localStorage`. No accounts, no server, nothing leaves the browser.

---

## Running it

```bash
npm ci
npm run dev
```

```bash
npm run verify   # frontmatter → i18n + no-Russian gate → typecheck → build → link check
npm run deploy   # build and push to Cloudflare Pages
```

Stack: Astro 7 + MDX + Tailwind v4 + React islands, static output, Cloudflare Pages.

---

## Contributing

Read [`docs/CONTENT_AUTHORING.md`](docs/CONTENT_AUTHORING.md) before editing lessons — it is the
contract for frontmatter, components and voice. Two rules matter most:

1. **English and Kazakh only, no Russian.** The build fails on Russian function words and on
   Russian-flavoured loan spellings. Kazakh loanwords like `файл` and `сервер` are correct.
2. **Every English page needs a Kazakh counterpart** with identical components, quiz answers,
   links and code. `npm run verify` enforces it.

Facts come from `research/`, which is fact-checked and carries source URLs. Never invent a
number, date, quote or link.

---

## How it was built

Overnight on 21–22 September 2026, by roughly 130 AI agents directed by one person:
20 research and fact-check agents, 50 content agents, 45 translation agents, and a handful for
data and evidence. About 22 million tokens.

Module 15 of the course tells that story honestly, including the parts that went wrong.

---

Content is free to use for learning and teaching.
