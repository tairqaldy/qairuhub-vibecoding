# Content authoring spec

Every lesson and lab is one MDX file. This document is the contract: the frontmatter, the
components you may use, and the voice. Read it before writing a single line.

## File layout

```
src/content/lessons/en/NN-slug.mdx     ← module, English
src/content/lessons/kk/NN-slug.mdx     ← same module, Kazakh
src/content/labs/en/NN-slug.mdx        ← lab, English
src/content/labs/kk/NN-slug.mdx        ← same lab, Kazakh
```

`NN` and `slug` must match `src/data/curriculum.ts` exactly. A missing `kk` file silently
falls back to English with a banner, so a wrong filename is a silent failure — double-check it.

## Frontmatter

Lessons:

```yaml
---
title: The Tweet That Named a Movement
subtitle: One sentence of hook. Optional but almost always worth it.
objective: explain what vibe coding means and where it stops being safe
description: Max 200 chars. This is the SEO and social description.
artifact: Name of the takeaway (optional)
---
```

Labs add two required fields:

```yaml
prerequisites:
  - Node 20+ installed (Lab 00)
  - A GitHub account
doneWhen: You can open your own URL on your phone and see the page you built.
```

`objective` starts with a verb, lowercase, no trailing period — it is rendered after
"After this module you can…".

## Components

All of these are available with no import. Do not import anything at the top of an MDX file.

### Text

- `<Lead>…</Lead>` — the opening paragraph. Exactly one per page, at the top, before any `##`.
  `*italic*` inside a Lead renders as the handwritten accent font — use it once, on 1–3 words.
- `<Callout type="tip|warn|danger|info|live" title="optional">…</Callout>` —
  `live` is for notes aimed at someone teaching from the page, not a solo reader.
- `<Deeper title="optional">…</Deeper>` — collapsible. Put the detail that would otherwise
  bloat the page here: history, edge cases, the deeper why. Use 1–3 per module.

### Evidence and story

- `<Story title="…" date="2 Feb 2025" place="X">…</Story>` — a narrative block.
- `<Post author="Andrej Karpathy" handle="@karpathy" date="2 Feb 2025" href="…" platform="x|reddit|hn|blog|youtube|linkedin" stat="4.5M views">…</Post>` —
  renders a post card. **Paraphrase inside, or quote at most 14 words in quotation marks.**
  Never reproduce a whole post.
- `<Evidence src="/img/evidence/x.png" alt="…" href="https://original" source="X · @karpathy" date="Feb 2025">caption</Evidence>` —
  only use when the screenshot file actually exists in `public/img/evidence/`. If you are not
  certain it exists, use `<Post>` instead.
- `<Stat value="19%" label="slower, not faster" source="METR, Jul 2025" href="…" tone="good|warn|info|neutral" />`
  and `<StatRow>` to put 2–4 of them in a row.

### Teaching

- `<Myth n={2} myth="AI will replace engineers." source="…" href="…">the reality</Myth>`
- `<Compare a="What people do" b="What works"><div slot="a">…</div><div slot="b">…</div></Compare>`
- `<Quiz id="m3-q1" question="…" options={['a','b','c','d']} answer={1} explain="why, in one or two sentences" xp={10} />`
  — `id` must be globally unique: use the module number. `answer` is the 0-based index.
  Exactly one quiz per module, placed after the concept it tests. Wrong options must be
  plausible; explain teaches rather than scolds.
- `<Checklist id="sec-preship" title="Before you ship" items={['…','…']} xp={15} />`
- `<Figure caption="…">` wrapping inline `<svg>` — only if you can write clean, correct SVG.
- `<Chart title="…" source="Veracode, Jul 2025" unit="%" bars={[{ label: '…', value: 45, tone: 'signal|good|bad|warn|quiet', note: '…' }]} />`
  — the figures you already cited in the prose, as bars. **Every value must appear in the
  surrounding text with its source**; a chart is a second view of a fact, never a new one.
  `unit=""` for plain counts. `max` overrides the scale when bars should not fill the row.
- `<Meme art="ship|fire|loop|wall" topLabel="What you picture" top="…" bottomLabel="What happens" bottom="…" />`
  — the two-panel expectation-versus-reality card. The art is drawn in the component, so
  **never** point it at a borrowed image. `art` must be identical in the English and Kazakh
  copies; only the four strings are translated. Use it to land a point the reader already
  half-suspects, not to fill space — at most one or two per lesson.

### Hands-on

- `<Steps>` containing `<Step title="…">…</Step>` — numbered steps with a connecting rail.
  This is the backbone of every lab.
- `<Terminal title="bash">` wrapping a fenced code block — for commands and session output.
- `<Prompt title="Plan prompt" where="Claude Code · plan mode">` wrapping a fenced ```text
  block — for anything the learner copies into an agent. This is the highest-value component
  on the site; every module should hand the reader at least one prompt they can actually use.
- `<ProjectStep n={4} title="…">` — advances the running project (QAIRU Event Sign-up).
  Modules 4–13 each get exactly one, numbered in order.
- `<Artifact title="…" kind="template|checklist|cheatsheet|prompt-pack">one line</Artifact>` —
  the takeaway, at the end of the module.
- `<Widget name="…" />` — mounts an interactive tool. Valid names only:
  `tokenizer`, `context-meter`, `prd-wizard`, `agents-md-builder`, `fake-terminal`, `git-sim`,
  `spot-the-bug`, `deploy-sim`, `claude-code-sim`, `guess-the-number`, `prompt-lab`,
  `orchestrator`. Use the one assigned to your module; never invent a name.

### Markdown

Normal markdown works: `##` headings (these become the table of contents — write them as
real sentences a reader would scan), `###`, lists, tables, `**bold**`, links, and fenced code
blocks with a language tag.

## Voice

- Write to one specific person: a student in Astana with a laptop, some curiosity, and no
  patience for filler. Second person. Present tense.
- Short sentences beat long ones. Concrete beats abstract. A real number beats an adjective.
- Never write "In today's fast-paced world", "Let's dive in", "game-changer", "revolutionize",
  "unleash", "leverage" (as a verb), "seamless", "robust", or a heading that is a single noun
  like "Overview". Never open a module with "In this module, we will…".
- No emoji in body copy. The components carry the visual weight.
- Teach the failure alongside the feature. Every claim about what AI can do gets a sentence
  about where it breaks.
- When you state a fact, number, date or quote, it must come from the research file you were
  given, and it must carry its source link. If the research marks something UNVERIFIED, either
  leave it out or write it without the specific number.
- Length: a module is 900–1,600 words of prose plus components. A lab is 700–1,200 words but
  heavier on `<Step>`. Do not pad to hit a number.

## Kazakh translation rules

Read `research/kk-glossary.md` first — it is the authority and it overrides your instincts.
The essentials:

- Kazakh Cyrillic only. **No Russian anywhere**, including Russian-flavoured loan spellings
  (бэкенд, деплой, фича). The site's no-Russian check will fail the build on those.
- Keep tool words in Latin: git, commit, push, deploy, prompt, agent, MCP, API, Docker, LLM,
  token, repo, frontend, backend, Claude Code, GitHub, pull request.
- Attach endings to Latin words with a hyphen: `Claude Code-ты`, `GitHub-қа`, `git-те`, `API-ге`.
  Never attach a suffix to inline code: write `` `git push` пәрменін орында``.
- Address the learner as **сен**. Buttons and menu items use the -у verbal noun (Бастау, Сақтау).
  Error and failure text uses no second person at all.
- Translate meaning, not words. A sentence that reads like translated English is a bug. Rewrite
  it as something a Kazakh-speaking developer would actually say out loud.
- Keep every component, prop, `id`, `answer` index, `href`, code block and command **identical**
  to the English file. Translate only the prose, the `title`/`subtitle`/`objective`/`description`
  frontmatter, and the human-readable strings inside props (`question`, `options`, `explain`,
  `label`, `items`, `myth`, caption text).
- Quotes from named people stay in their original language, with a Kazakh gloss after them if
  the meaning is not obvious.

## Hard rules

1. Never invent a URL. Every link must come from the research files.
2. Never invent a statistic, a date, or a quote.
3. Never write lorem ipsum or "TODO" or "coming soon".
4. Keep `id` props unique across the whole site.
5. Do not use a component or prop that is not in this document.
