# Morning report — vibecoding.qairuhub.com

Built overnight, 21–22 September 2026.

---

## Where it is

| | |
|---|---|
| **Live now** | **https://vibecoding-1vl.pages.dev** |
| Intended domain | https://vibecoding.qairuhub.com — **needs one 2-minute step from you, see below** |
| Repo | https://github.com/tairqaldy/qairuhub-vibecoding |
| Cloudflare project | Pages → `vibecoding` (account: Tairkaldybayev@gmail.com) |

---

## The one thing I could not do

**Add the DNS record for `vibecoding.qairuhub.com`.**

The custom domain is already attached to the Pages project (I did that through the
Cloudflare API), and it is sitting at status `pending` waiting for a DNS record. My
Cloudflare token has `zone:read` but not `dns:edit`, and you were not signed in to the
Cloudflare dashboard in Chrome — I will not enter credentials on your behalf.

**Do this:**

1. Open https://dash.cloudflare.com → `qairuhub.com` → **DNS** → **Records** → **Add record**
2. Type `CNAME`, Name `vibecoding`, Target `vibecoding-1vl.pages.dev`, Proxy **on** (orange cloud)
3. Save. TLS is issued automatically, usually within a few minutes.

Then check:

```bash
curl -sI https://vibecoding.qairuhub.com/en/ | head -1
```

If you would rather I do it next time, create an API token with **Zone → DNS → Edit** on
qairuhub.com and put it in `.env` as `CLOUDFLARE_API_TOKEN`.

---

## What is there

**Nine sections, 70 pages, both languages.**

- `/en/` and `/kk/` — home
- `/try/` — **"Stop reading. Start typing."** Three 10-minute tracks (browser / laptop / ship it),
  each with the exact prompt to paste. This is the page to send anyone who asks "where do I start".
- `/learn/` — 16 modules in 3 acts, ~40,000 words of English and a full Kazakh translation
- `/labs/` — 9 hands-on labs, ~22,000 words, exact commands and prompts
- `/tools/` — 32 AI coding environments and 31 models compared, with free tiers and honest weaknesses
- `/materials/` — 167 curated resources in 18 categories, plus 4 reading paths
- `/glossary/` — 473 EN↔KK terms with definitions and usage rules
- `/workshop/` — the presenter's run-of-show: 27 segments, minute by minute, with fallbacks
- `/present/` — keyboard-driven slide mode (arrows, F for fullscreen)

**12 interactive widgets**, all working offline with no API keys:
token counter, context-window filler, Claude Code simulator, prompt lab, fake terminal,
git simulator, spot-the-security-bug, deploy simulator, PRD wizard, AGENTS.md builder,
orchestration comparison, guess-the-number.

**Progress and XP** are saved in `localStorage`. No accounts, no server, nothing leaves the browser.

---

## Things worth knowing before you teach from it

1. **The research corrected several things** that the original brief had wrong, and the site
   uses the corrected versions:
   - The famous Karpathy tweet is at **7.36M views**, not 4.5M.
   - The YC "95%" line is **Jared Friedman** (TechCrunch, 6 Mar 2025), not Garry Tan. I had this
     wrong in a widget at first; a review agent caught it.
   - **"Agentic engineering" was coined on 4 Feb 2026** in Karpathy's anniversary post, and
     popularised at Sequoia in April 2026. He never called vibe coding "passé" — that was a headline.
   - **METR added a banner to its own 19% study** saying the results are out of date, and published
     a Feb 2026 rerun. The site shows both, and makes the honesty itself a teaching point.
   - Karpathy **joined Anthropic** (19 May 2026). **SpaceX bought Cursor** for $60B (closed 15 Aug 2026).
     Windsurf is now **Devin Desktop**.

2. **Prices and free tiers move.** `src/data/models.ts` carries `pricesCheckedOn = '2026-09-21'`.
   Re-check the week of the talk.

3. **The Kazakh needs your eye, not a rewrite.** Every page passed an automated no-Russian and
   parity check, and a second agent reviewed each translation for naturalness. But you are the
   native speaker and this is your community — read `/kk/learn/the-tweet/` and `/kk/try/` first,
   since those set the tone for everything else. The terminology decisions are written down in
   `/kk/glossary/` so you can disagree with them in one place.

4. **Nothing on the site needs an API key.** Every simulator is scripted. That is deliberate:
   it works on stage with no wifi, and it works for a student who cannot pay for anything.

---

## Still open

| | |
|---|---|
| DNS record for the custom domain | **you, 2 minutes** — steps above |
| `src/data/workshop.ts` | run-of-show is complete; the Q&A bank, demo scripts and 10 project ideas were still generating when the run ended. The page renders only the sections that exist, so it is not broken — it will just grow when those land. |
| Kazakh review pass | ~30 minutes, you |
| OWASP LLM Top 10 screenshot | their site returns 403 to automated requests; the link is there, the image is not |

---

## Running it locally

```bash
npm ci
npm run dev
```

Checks, all of which must pass before a deploy:

```bash
npm run verify
```

That runs, in order: frontmatter normalisation → i18n and no-Russian gate → typecheck →
build → link check.

Deploy:

```bash
npm run build && wrangler pages deploy dist --project-name=vibecoding --branch=main
```

Regenerate the social cards or the source screenshots:

```bash
node scripts/make-og.mjs
node scripts/capture-evidence.mjs
```

---

## How it was actually built

Worth reading before the talk, because Module 15 tells this story and you will be asked about it.

- **20 research agents** (10 topics × research + adversarial fact-check) produced 1.1 MB of
  sourced notes in `research/`. The fact-checkers overturned a dozen claims, including several
  from the original brief.
- **50 content agents** (25 write + 25 review) produced the English lessons and labs.
- **45 translation agents** (25 translate + 20 check) produced the Kazakh.
- **4 data agents** built the tools, models, materials and glossary datasets.
- Roughly **22 million tokens** across ~130 agents.
- The parts that went wrong: a YAML colon broke three builds, wrangler silently injected a
  Cloudflare adapter that turned the static site into a server build, my first Russian-language
  checker flagged legitimate Kazakh loanwords, and the run hit a usage limit partway through.
  All of that is in Module 15, because the failures are the useful part.
