# vibecoding.qairuhub.com

A free, interactive EN + Kazakh masterclass on vibecoding and hands-on work in AI dev
environments. A QairuHub project, for students and builders in Kazakhstan.

Astro + MDX + Tailwind v4 + React islands, static output, deployed to Cloudflare Pages.

## Commands

- Install: `npm ci`
- Dev: `npm run dev` (port 4321)
- Build: `npm run build` — static output to `dist/`
- Typecheck: `npm run typecheck` (`astro check`)
- **Verify (run before every deploy): `npm run verify`** — frontmatter → i18n → typecheck → build → links
- Deploy: `npm run build && wrangler pages deploy dist --project-name=vibecoding --branch=main`

## Hard rules

- **Site content is English and Kazakh only. No Russian, anywhere.** `scripts/check-i18n.mjs`
  fails the build on Russian function words and on Russian-flavoured loan spellings
  (бэкенд, деплой, фича, юзер). Legitimate Kazakh loanwords (файл, сервер, сайт, модель)
  are correct and are not flagged.
- **Every English lesson and lab needs a Kazakh counterpart** with the same components in the
  same order, the same quiz `answer` indexes, and identical `href`, `src`, `id` and code blocks.
  Only prose and human-readable prop strings are translated.
- **Never invent a fact, number, date, quote or URL.** Everything traceable to `research/`.
  If the research marks something UNVERIFIED, leave the figure out.
- **Never commit a secret.** No `.env` in git.
- Output must stay **static**. Do not add an Astro adapter — `wrangler` will try to inject
  `@astrojs/cloudflare` if you let it run its auto-config. Remove it if it reappears.

## Where things live

```
src/data/curriculum.ts   the 16 modules and 9 labs — single source of truth for structure
src/data/tools.ts        32 AI coding environments
src/data/models.ts       31 models + local options  (pricesCheckedOn is a real date — update it)
src/data/materials.ts    139 curated resources in 14 categories
src/data/glossary.ts     473 EN↔KK terms + the Kazakh writing rules
src/data/tracks.ts       the 4 levels + capstone — mirrored in api/src/tracks.js
src/data/exams.ts        49 exam questions, EN+KK, one pool per level
src/data/workshop.ts     the live run-of-show
src/content/{lessons,labs}/{en,kk}/NN-slug.mdx
src/components/mdx/      components available inside MDX with no import
src/components/widgets/  the 12 React islands
docs/CONTENT_AUTHORING.md   the contract for writing a lesson — read before editing content
research/                fact-checked source notes with URLs
scripts/                 checks, screenshot and data tooling
```

## Writing content

Read `docs/CONTENT_AUTHORING.md` first. It defines the frontmatter, every available component,
the voice, and the Kazakh rules. Do not use a component or prop that is not in that document.

Voice, in short: write to one student in Astana with a laptop and no patience for filler.
Short sentences. Concrete over abstract. A real number beats an adjective. Teach the failure
alongside the feature. No "dive in", no "game-changer", no emoji in body copy.

## Widgets

Every simulator is **scripted and offline**. No API keys, no network calls. This is deliberate:
it works on stage with no wifi, and for a student who cannot pay for anything. Keep it that way.

## Conventions

- Conventional Commits, small and atomic.
- Design tokens come from qairuhub.com: signal blue `#2b7fff`, ink `#03040c`, the
  `#03040c → #070c24` page gradient, `.08`/`.18` white fills and lines.
- Fonts: Inter (body and headings), Caveat (accents), Courgette (wordmark), IBM Plex Mono (code).
  **Courgette and Anton are Latin-only** — never use them for Kazakh text; they render
  Ә Ғ Қ Ң Ө Ұ Ү Һ І as tofu. Inter, Caveat and IBM Plex Mono all cover Kazakh in full.
- Reveal-on-scroll is opt-in via a `.reveal-armed` class set by JS. Content must stay visible
  when JS does not run.

## Accounts and the API

The course requires an account; the hook does not.

- **Public:** `/`, `/{lang}/`, `/{lang}/try/`, `/{lang}/glossary/`, `/{lang}/login/`, static assets
- **Signed in:** `/{lang}/learn|labs|tools|materials|profile|tracks|build`
- **Organiser only:** `/{lang}/workshop|present|admin` — the run-of-show, the slides and the
  analytics. The API puts a signed `admin` claim in the JWT for addresses in `ADMIN_EMAILS`
  (default: the project owner). The edge requires a *verified* signature for these, so a
  missing `JWT_SECRET` fails closed instead of opening the dashboard.

Gating is enforced at the edge in `functions/_middleware.js`, a Cloudflare Pages Function that
verifies the session JWT's HMAC signature before any HTML is served. It rejects `alg: none`,
forged signatures and expired tokens. Client-side checks alone would be decorative; do not
replace it with one.

**API** — `api/`, deployed to Railway (`vibecoding-api`) with a Railway Postgres:

- `POST /auth/signup`, `POST /auth/login` — argon2id hashes, JWT out, throttled per email and per IP
- `GET /me` · `PUT /progress` · `POST /event` — Bearer token
- `POST /certificate` · `GET /certificates` · `GET /verify/:id` (public) — credentials. Eligibility
  is re-checked server-side against `api/src/tracks.js`; `scripts/check-tracks.mjs` fails the build
  if that file and `src/data/tracks.ts` ever disagree.
- `GET|POST /ai/quota` — the workbench's daily per-person ceiling (`AI_DAILY_LIMIT`, default 40)
- `GET /stats` — aggregate counts · `GET /admin/users` — the roster: name, email, XP,
  modules and labs done, last seen. Both accept either the `X-Admin-Key` header or a Bearer
  token whose `admin` claim is true. The roster is personal data; no other endpoint returns it.

Deploy the API with `cd api && railway up --service vibecoding-api --ci`.

**Secrets** live in Railway variables and in Cloudflare Pages (`JWT_SECRET`), never in git.
`api/.env.railway.local` holds local copies and is git-ignored. The same `JWT_SECRET` must be set
in both places or the edge gate cannot verify what the API signs.

**Progress merging is one-way-safe.** Both the client and the server keep the HIGHER xp per id,
so syncing an old tab can never erase work done on another device. Keep it that way.
