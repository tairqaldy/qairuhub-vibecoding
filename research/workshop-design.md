# Workshop design — vibecoding.qairuhub.com masterclass

Research date: 21 Sep 2026. Author: research agent (workshop-design). All facts carry a source URL. Tags: **[V]** = verified (source page opened during this research), **[S]** = seen only in a search-result snippet, not opened, **[UNVERIFIED]** = from memory or a secondary/anecdotal source, **[J]** = practitioner judgement (design decision, not a fact).

Format being designed: 90-minute masterclass (expandable to 120) + 10-minute break + 60-minute build-together and Q&A. Room: students and builders in Kazakhstan, mostly beginners, some developers. Delivery: English + Kazakh (Russian questions welcome).

---

## 0. The spine: one loop, three tracks

The user brief asks for a structured way into vibecoding, not a dump. So the whole event hangs on **one loop** that is repeated four times on stage and once by every attendee:

```
DESCRIBE  ->  PLAN  ->  BUILD  ->  VERIFY  ->  SHIP
   ^                                  |
   +------------- REWIND -------------+
```

- Describe = specific prompt with context and a definition of done.
- Plan = make the agent propose before it edits (plan mode / "don't write code yet").
- Build = let the agent work; you approve or deny actions.
- Verify = give it a check it can run (test, screenshot, numbers); you read the evidence.
- Ship = commit + deploy to a URL someone else can open.
- Rewind = checkpoints, `/rewind`, git. Mistakes are cheap, so try things.

This loop is lifted directly from Anthropic's Claude Code best-practices doc: explore/plan/implement/commit as four phases, "give Claude a way to verify its work" as the top recommendation, and course-correct/rewind as session management **[V]** https://code.claude.com/docs/en/best-practices

**Three tracks so nobody is locked out by money or hardware [J]:**

| Track | Who | Tool | Cost | Verified facts |
|---|---|---|---|---|
| A. Browser | Never coded, no card, weak laptop or phone | Claude.ai Free (artifacts) or Google AI Studio Build mode | 0 | Free plan can create artifacts; Claude Code is not in Free **[V]** https://claude.com/pricing ; AI Studio Build generates full-stack React+Node (and Android Kotlin) apps, sets the Gemini key up automatically, deploys to Cloud Run, syncs to GitHub, exports ZIP **[V]** https://ai.google.dev/gemini-api/docs/aistudio-build-mode |
| B. Claude Code | Anyone willing to pay for one month, or paired with someone who has | Claude Desktop app (Code tab, no terminal) or `claude` CLI | Pro 20 USD/month, or 17 USD/month billed annually (200 USD upfront) **[V]** https://claude.com/pricing | Requires Pro, Max, Team, Enterprise or Console account **[V]** https://code.claude.com/docs/en/setup |
| C. Free agentic CLI/IDE | Developers who want an agent in a folder at 0 cost | Codex CLI on a free ChatGPT account; Antigravity free Individual plan; GitHub Copilot Free/Student in VS Code | 0 | Codex is included in ChatGPT Free, Go (8 USD), Plus (20 USD) and the CLI is available on all individual plans **[V]** https://learn.chatgpt.com/docs/pricing ; Antigravity has a 0 USD Individual plan with "basic weekly rate limits" **[V]** https://antigravity.google/pricing ; Copilot Free = 2,000 completions + 50 chat requests/month, agent mode included **[V]** https://github.com/features/copilot/plans |

Pair rule for Part B: every pair needs at least one working Track B or C seat; otherwise the pair works in Track A. All 10 build projects are scoped to work in any track.

---

## 1. What the evidence says works (and what it changes in the design)

### 1.1 Live coding (The Carpentries / Software Carpentry)
- Carpentries instructors do not teach coding from slides; they type live while learners follow. Reasons given: it slows the instructor down, learners watch mistakes being diagnosed, and it allows responsive "what if" detours **[V]** https://carpentries.github.io/instructor-training/17-live
- Carpentries top-ten list (paraphrased): engage everyone in several ways; go slowly and narrate every command; mirror the learners' environment and avoid shortcuts; big font, light background; use illustrations; notifications off; stick to tested material; leave no learner behind; embrace mistakes; have fun **[V]** same URL.
- Peer-reviewed version (Nederbragt et al., PLOS Comp Bio 2020, "Ten quick tips for teaching with participatory live coding"): narrate, then explain a second time; black-on-white beats dark themes on projectors; stand; use a mic; about 1 helper per 10 learners; two colours of sticky notes as status flags (check for colour-blindness); run exercises against a visible timer; create a bare-bones user account that looks like a learner's machine **[V]** https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008090
- Trainers are told to make at least one mistake on purpose so learners see diagnosis and recovery **[S]** https://carpentries.github.io/instructor-training/instructor-notes.html (search snippet; page opened for breaks/feedback guidance only).
- Carpentries full-day guidance: breaks are treated as essential, 15–20 minutes mid-session; feedback via sticky-note "minute cards" and one-up/one-down **[V]** https://carpentries.github.io/instructor-training/instructor-notes.html

### 1.2 Teaching programming (Brown & Wilson 2018; Wilson, Teaching Tech Together)
- Ten tips (titles paraphrased): no "geek gene"; peer instruction; live coding; have learners predict; pair programming; worked examples with labelled subgoals; one language; authentic tasks; novices are not experts; don't just code **[V]** https://pmc.ncbi.nlm.nih.gov/articles/PMC5886386/
- Peer instruction recipe: short intro -> multiple-choice question aimed at a misconception (ideal first-vote correctness 40–60%) -> individual vote -> discuss in groups of 2–4 -> revote -> instructor resolves **[V]** same URL.
- Pair programming: pair everyone, not just strugglers; swap driver/navigator 3–4 times per hour **[V]** same URL.
- Teaching Tech Together adds: ask for predictions before running code; never start learners on a blank page (give scaffolds); two devices for the instructor; draw early and often; improvise only after you know the material **[V]** https://teachtogether.tech/en/index.html
- Design consequence: the labelled subgoals in this workshop are the five loop words. Every demo step and every build-project card is labelled with them.

### 1.3 Active learning evidence
- Freeman et al. 2014 (PNAS 111(23), online 12 May 2014; meta-analysis of 225 studies): exam and concept-inventory scores +0.47 SD with active learning; students under traditional lecturing were 1.5 times more likely to fail (odds ratio 1.95) **[V, abstract via Europe PMC; the PNAS page itself returned 403 to automated fetch on 21 Sep 2026]** https://www.pnas.org/doi/10.1073/pnas.1319030111 ; abstract text: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1073/pnas.1319030111&resultType=core&format=json
- Bradbury 2016 (Advances in Physiology Education): the primary data do not support a 10–15-minute attention limit; the biggest variance in attention comes from the teacher, not the format **[S, abstract via search]** https://journals.physiology.org/doi/full/10.1152/advan.00109.2016
- Design consequence **[J]**: do not justify segment lengths with the "10-minute attention span" myth. Justify them with active learning: nobody sits more than ~15–20 minutes without doing something (vote, predict, break the app, talk to a neighbour).

### 1.4 How AI-tool companies run community sessions
- Cursor community events are mostly laptops-open co-working ("Cafe Cursor") with credits, hosted by ambassadors; Cursor provides promotion and templates **[S]** https://cursor.com/community . A typical workshop night (Cursor Seattle Meetup + Workshop): 5:30 networking, food and "prepare your tech stack"; 6:00 two-hour intermediate workshop (markdown guides/task lists/test scripts for long agent tasks, background agents, slash commands, advanced prompts); 8:00 networking and Q&A with the Cursor team **[V]** https://luma.com/ckqveo6i . Takeaway: a 30-minute setup buffer before the content is standard.
- Anthropic's Claude Campus program (Builder Clubs): student-led technical and non-technical workshops, hackathons and demo nights, API credits for members, 3,600 USD stipend per ambassador, open to students worldwide aged 18+; program year Sep 2026–Jun 2027; applications ran 1–12 Sep 2026 and are closed for Fall 2026 **[V]** https://claude.com/programs/campus . Takeaway: "workshop -> build -> demo night" is the house format; a demo gallery at the end of our Part B copies it.
- Anthropic's hackathons: "Built with Opus 4.6: a Claude Code hackathon" ran online from 10 Feb 2026 12:00 EST to 17 Feb 2026 10:00 EST with Cerebral Valley; 500 selected participants, 500 USD API credits each, 100k USD in API credits as prizes **[V — corrected from "10–16 Feb"]** https://cerebralvalley.ai/e/claude-code-hackathon . Winners of the "Built with Opus 4.7" hackathon (post dated 15 Jun 2026): 1st an Istanbul-based physician-turned-software-engineer (Medkit, medical training simulator); 2nd a self-taught builder who spent years fixing electronics (Wrench Board, board diagnostics); 3rd a CS lecturer at Universidad del Desarrollo, Chile (Maieutic); Keep Thinking Prize to "a 20-year-old from Chiloé with no programming experience" (MaestrIA) **[V]** https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon . Takeaway: domain knowledge + agent beats coding skill alone; use as the motivational slide.
- A beginner vibe-coding class observed by a journalist (65labs, Singapore, two mornings, March 2026; tools included Cursor, Lovable, Manus, Emergent): attendee built a personal-trainer app in about an hour; it crashed when loading too much data at once. Instructor lessons (paraphrased): build many small apps instead of rescuing one broken one; find a real user; learn debugging by asking the AI to walk you through the error; review the plan before the agent executes **[V]** https://www.aol.com/news/joined-vibe-coding-workshop-learn-040201765.html
- Anthropic's own note for trainers: for live training sessions with large groups sharing an API organisation, request higher tokens-per-minute allocations because concurrency is unusually high **[V]** https://code.claude.com/docs/en/costs

### 1.5 Demo failure
- Conference-speaker practice: keep a pre-recorded video of each demo and narrate over it live instead of debugging on stage; do not assume venue internet **[V]** https://www.morling.dev/blog/ten-tips-make-conference-talks-suck-less/
- Design consequence **[J]**: distinguish *planned* mistakes (teaching content, recovered in under 60 seconds) from *infrastructure* failures (switch to fallback within 30 seconds, no live debugging of wifi).

---

## 2. Run-of-show (minute by minute)

Energy scale: 1 = passive listening, 5 = whole room acting. Helpers: 1 per 10 attendees **[V]** (PLOS tips). Sticky notes: green = "I'm fine / done", red = "I need help".

### T-30 to T-0 — Doors and setup clinic
| Time | What | Notes |
|---|---|---|
| T-30 | Doors. Slide on loop: QR to setup page + wifi + Telegram group link. Helpers at a "setup desk". | Cursor-style 30-minute stack-prep buffer **[V]** https://luma.com/ckqveo6i |
| T-20 | Helpers walk rows: `claude --version` / Desktop Code tab opens / browser-track login works. Hand out 1 green + 1 red sticky per person. | `claude doctor` for broken installs **[V]** https://code.claude.com/docs/en/setup |
| T-10 | Interaction I1 starts on screen (entry poll). | |
| T-2 | Presenter checks https://status.claude.com , hotspot on standby, notifications off, font size, light theme. | status page referenced in **[V]** https://code.claude.com/docs/en/claude-code-on-the-web |

### Part A — Masterclass (90 minutes)
| Min | Segment | Loop word | What happens | Energy |
|---|---|---|---|---|
| 0:00–0:04 | **Cold open** | BUILD | No intro. Paste the Demo 1 prompt, press Enter, *then* say who you are while the app builds itself behind you. | 4 |
| 0:04–0:09 | **I1 Poll + norms** | — | Read the poll: never coded / some / developer; tools used. Norms: red sticky = help; questions in Kazakh, Russian or English; "errors are the curriculum". Name the three tracks. | 3 |
| 0:09–0:19 | **Concept: what vibecoding is and is not** | all | (1) Karpathy, 2 Feb 2025 (23:17 UTC): "fully give in to the vibes, embrace exponentials, and forget that the code even exists" **[V — primary post confirmed via X syndication API]** https://x.com/karpathy/status/1886192184808149383 ; Collins Word of the Year 2025, announced 6 Nov 2025 **[V via Wikipedia citing BBC and The Independent; collinsdictionary.com/woty returned 403 to automated fetch on 21 Sep 2026 — open it manually before screenshotting]** https://www.collinsdictionary.com/woty . (2) Willison's line: vibe coding = not reviewing the code, fine for low stakes; responsible AI-assisted programming = you could explain every line **[V]** https://simonwillison.net/2025/Mar/19/vibe-coding/ . (3) Draw the loop by hand. (4) Tool map in one slide: chat -> artifact -> app builder -> agent in your folder. | 2 |
| 0:19–0:22 | **I2 Prediction** | DESCRIBE | Before revealing Demo 1's result: hands up — will the rounded shares add up to the bill? Will the Kazakh UI be right? | 4 |
| 0:22–0:34 | **Demo 1: sentence -> app -> link** (script 4.1) | DESCRIBE, BUILD, VERIFY | Walk the prompt line by line, open the result, run the 3 test cases the prompt demanded, publish, show QR. | 3 |
| 0:34–0:40 | **I3 Break it on your phone** | VERIFY | Room opens the app by QR and tries to break it for 2 minutes. Collect 3 bugs aloud, paste them back as a fix prompt. | 5 |
| 0:40–0:45 | **Stretch + I4 pair-share** | DESCRIBE | Stand up. 90 seconds each with a neighbour: "What would you build for your family business, university or city?" Post one line to the word cloud / Telegram. These seed Part B. | 5 |
| 0:45–1:05 | **Demo 2: Claude Code in a real folder** (script 4.2) | PLAN, BUILD, VERIFY, REWIND | Plan mode, `@words.csv`, room answers Claude's questions (I5), permission prompts (I6 approve or deny), verification script, vague-vs-specific prompt duel (I7), `/rewind`, `/init` -> CLAUDE.md, commit. | 3–4 |
| 1:05–1:14 | **I8 Spot the bug** (peer instruction) | VERIFY | Slide with 12 lines of AI-written code containing 3 planted problems. Vote -> discuss in pairs 2 min -> revote -> resolve. Tie to data: 170 of 1,645 scanned Lovable apps let anyone read user names, emails, financial data and API keys (Semafor, 29 May 2025) **[V]** https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers ; AI co-authored PRs had about 1.7x more issues (10.83 vs 6.45 per PR across 470 PRs) and "up to 2.74x" more security issues (CodeRabbit, 17 Dec 2025) **[V]** https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report | 5 |
| 1:14–1:24 | **Demo 3: break -> debug -> ship** (script 4.3) | VERIFY, SHIP | Console error -> symptom/expected/error prompt -> failing test -> fix -> deploy -> room opens live URL. | 4 |
| 1:24–1:30 | **Recap + I9 minute cards** | all | Redraw loop. Five rules (section 2.1). Green sticky: one thing you learned. Red sticky: one thing still unclear. Stick them on the door on the way to the break. Tease the 7-day challenge. | 3 |

**Break (10 minutes).** Helpers cluster the red notes into 6–8 questions for the Q&A bursts. Presenter resets laptop to the build-session slide with the 10 project cards.

### Part B — Build-together + Q&A (60 minutes)
| Min | Segment | What happens |
|---|---|---|
| 0:00–0:05 | **Pick + pair** | Everyone pairs (mixed experience; the less experienced person drives first **[J]**, pairing everyone per Brown & Wilson **[V]**). Pick 1 of 10 project cards (section 6) or an idea from the word cloud that fits the same constraints. Visible 40-minute timer starts. |
| 0:05–0:15 | **Sprint 1: DESCRIBE + PLAN + first BUILD** | Paste the starter prompt, answer the agent's questions, get anything on screen. Green sticky up when something renders. Presenter builds project 1 on the big screen in parallel at the same pace, never faster. |
| 0:15–0:18 | **Q&A burst 1** | 3 questions from the red notes, 45 seconds each, while agents work. |
| 0:18–0:30 | **Sprint 2: one feature + one fix** | At 0:20 call "swap driver". Helpers push the "two strikes then /clear" rule when someone loops on a bug. |
| 0:30–0:33 | **Q&A burst 2** | 3 more questions. |
| 0:33–0:45 | **Sprint 3: VERIFY + SHIP** | Walk the card's definition of done. Deploy (Netlify Drop / publish artifact / AI Studio share). Post link + one-line description in the Telegram group. |
| 0:45–0:55 | **I10 Demo gallery** | 4–5 volunteer pairs x 90 seconds on the big screen via their link: what we asked, what broke, how we fixed it. Applaud the best *bug story*, not the prettiest app. |
| 0:55–1:00 | **Close** | 7-day plan (section 8), community link, feedback form QR (one-up/one-down). Group photo. |

Sprints total 5 + 10 + 12 + 12 = 39 minutes of building; Q&A is interleaved so nobody waits idle for an agent.

### 120-minute variant (insert modules; everything else unchanged)
- M1 (+10 min after Demo 1): "Wins and disasters" case pair — hackathon winners with no CS background **[V]** https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon vs the Replit agent that wiped SaaStr's production database during a code freeze and generated about 4,000 fake records (July 2025) **[V]** https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/
- M2 (+10 min after Demo 2, developers' interest): context window as the scarce resource, `/clear`, subagents, CLAUDE.md pruning, skills vs hooks vs MCP in one slide **[V]** https://code.claude.com/docs/en/best-practices
- M3 (+10 min before recap): "Does it actually make you faster?" — METR: 16 experienced open-source developers, 246 issues, Feb–Jun 2025: tasks took 19% longer with AI (CI +2% to +39%) while developers expected a 24% speed-up **[V]** https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ ; 24 Feb 2026 update: METR "believe it is likely" developers are more sped up now than in early 2025, but its new late-2025 measurements still show slowdowns (-18% for returning developers, CI -38% to +9%; -4% for new developers, CI -15% to +9%) and it calls this "only very weak evidence" because 30–50% of developers declined tasks they could not do with AI **[V — wording corrected: METR does not say developers are now faster]** https://metr.org/blog/2026-02-24-uplift-update/ ; Stack Overflow 2025: 84% use or plan to use AI, 46% distrust vs 33% trust its accuracy, 66% frustrated by "almost right" answers **[V]** https://survey.stackoverflow.co/2025/ai

### 2.1 The five rules slide (recap)
1. Say what done looks like (numbers, test cases, a screenshot).
2. Plan before build for anything bigger than one sentence of diff.
3. Make it prove it: run the check, show the evidence.
4. Two failed corrections -> `/clear` and write a better first prompt.
5. Commit what works; secrets never go in code; low stakes first.
Sources: rules 1–4 are from the Claude Code best-practices doc **[V]** https://code.claude.com/docs/en/best-practices ; rule 5 "low stakes" follows Willison **[V]** https://simonwillison.net/2025/Mar/19/vibe-coding/ ; checkpoints are explicitly "not a replacement for git" **[V]** best-practices doc.

### 2.2 Energy management rules [J unless tagged]
- Alternate mode every segment: talk -> watch -> act -> talk. No two passive segments in a row.
- Agent thinking time (30–180 s) is dead air. Pre-assign a filler for each wait: a prediction, an approve/deny vote, or a question from the room. Never fill it with silence or with typing in another window.
- Put the most physical interaction (I3 phones, I4 stand-up) at the 35–45 minute trough.
- Stand, use a mic, face the room **[V]** PLOS tips. Terminal font 20pt+, light theme **[V]** PLOS tips.
- Bilingual delivery: slides in English with Kazakh subtitles on key terms; speak Kazakh for stories and motivation, English for tool vocabulary (prompt, commit, deploy) so attendees can search docs later. Keep a one-slide glossary.
- One planned mistake per demo, recovered fast, and said out loud afterwards **[S]** Carpentries instructor notes.
- Presenter never out-paces the slowest green sticky; helpers, not the presenter, fix individual installs.

---

## 3. Audience interactions (10)

| # | Name | When | Mechanics | Teaching point | Tool |
|---|---|---|---|---|---|
| I1 | Entry poll | T-10 to 0:09 | Two questions: experience level; which AI tools used. | Calibrates language and tracks; shows beginners they are the majority. | Telegram poll in the event group, or hands. Mentimeter Free is capped at 50 participants per month **[V]** https://help.mentimeter.com/en/articles/465589-how-many-people-can-participate-in-a-mentimeter-presentation ; Slido Basic reported as 100 participants and 3 polls per event **[S]** https://www.productcompass.pm/p/slido-free-plan |
| I2 | Predict before Enter | 0:19 | Hands: will totals add up? Will Kazakh be correct? How many seconds? | Predictions expose mental models; wrong guesses are not punished **[V]** https://pmc.ncbi.nlm.nih.gov/articles/PMC5886386/ | Hands |
| I3 | Break it on your phone | 0:34 | QR to the live Demo 1 app. 2 minutes: negative prices, zero people, emoji names, 1,000,000,000 tenge. Shout bugs; presenter types the three best into a fix prompt. | VERIFY is a human job; users are the best test suite. | QR + phones |
| I4 | Pair-share -> word cloud | 0:40 | Stand, 90 s each: what would you build for your family/university/city? One line to the group chat. | Authentic tasks motivate **[V]** Brown & Wilson. Seeds Part B. | Telegram |
| I5 | The room answers Claude | 0:48 | Plan-mode prompt tells Claude to ask up to 3 questions. Room votes on each answer. One answer is typed in Kazakh. | The agent can interview you; Kazakh input works but test it. | Hands |
| I6 | Approve or deny? | 0:55 | As real permission prompts appear, room votes thumbs up/down. Backup slide with 5 canned prompts: `npm install`, reading `.env`, `rm -rf` on a folder, `git push --force`, `curl ... \| bash`. | You are the safety layer; Manual / Accept edits / Auto / Plan modes **[V]** https://code.claude.com/docs/en/desktop-quickstart . Warning: on Pro, Max and Team plans the starting mode for terminal and VS Code sessions is Auto (a classifier approves most actions silently), so switch to Manual before this demo or the room will see no prompts **[V]** https://code.claude.com/docs/en/best-practices | Thumbs |
| I7 | Prompt duel | 1:00 | Volunteer A dictates a vague styling prompt; volunteer B dictates a specific one. Run both (rewind between). Room judges. | Specific context beats vague requests **[V]** best-practices doc | Two volunteers |
| I8 | Spot the bug (peer instruction) | 1:05 | Snippet below. Vote A/B/C/D -> pair discussion 2 min -> revote. | Secrets in frontend, XSS, "almost right" math. | Hands or poll |
| I9 | Minute cards | 1:24 | Green: one thing learned. Red: one thing unclear. | Feeds Q&A bursts; formative feedback **[V]** Carpentries notes | Sticky notes |
| I10 | Demo gallery | Part B 0:45 | 90-second demos; prize for best bug story. | Shipping + telling the story = portfolio habit. | Big screen |

**I8 snippet (put on one slide):**
```js
// Prompt was: "save my cafe feedback form to the database"
const SUPABASE_KEY = "sb_secret_9f2c...";                      // (1)
async function submit(form) {
  const name = form.name.value;
  document.getElementById("thanks").innerHTML = "Rakhmet, " + name;   // (2)
  const total = form.price.value + form.tip.value;             // (3)
  await fetch(API + "/feedback?key=" + SUPABASE_KEY, {
    method: "POST", body: JSON.stringify({ name, total })
  });
}
```
Question: which line hurts you most in production? A) line 1 B) line 2 C) line 3 D) none, ship it. Answers: (1) a secret key shipped to every browser; (2) user input injected as HTML (XSS); (3) string concatenation: "1000" + "100" = "1000100", the classic "almost right" bug. Follow-up prompt to show: "Review this file for secrets in client code, unsanitised HTML, and type bugs. Report only issues that affect correctness or safety, then fix them and show me the diff."

---

## 4. Three live demo scripts (exact prompts + fallbacks)

Global prep for all demos **[J]**: a dedicated demo user account on the laptop (bare-bones, like a learner's **[V]** PLOS tips); a Claude account that has not been used that day (usage windows are rolling five-hour plus weekly **[V]** https://code.claude.com/docs/en/costs ); phone hotspot on a different carrier from the venue wifi; a second laptop or tablet logged in; every demo recorded as a silent screen capture the day before **[V]** Morling; repo `demo-checkpoints` with git tags per step.

**Universal fallback ladder (decide in 30 seconds, never debug wifi on stage):**
- L0 live on venue wifi -> L1 phone hotspot -> L2 jump to the next git tag ("cooking-show" checkpoint) -> L3 play the recording and narrate live, pausing to ask the same prediction questions -> L4 fully offline: open the finished `index.html` from disk and run the interaction with the local copy.
- If Claude itself is down or rate-limited: run the same prompt in the Track C tool (Codex CLI or Antigravity) and turn it into the lesson: the loop is tool-agnostic. If that also fails -> L3.

### 4.1 Demo 1 — "One sentence to a live link" (Track A, 12 min + 6 min I3)
Tool: claude.ai Free with artifacts (enable "Code execution and file creation" under Settings > Capabilities; artifacts are available on Free, Pro, Max, Team and Enterprise **[V]** https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them ; whether a Free account can *publish* a public artifact link is not stated in that article **[UNVERIFIED — test with a Free account before the event; fallback (b) below covers it]**). Second tab pre-loaded: Google AI Studio Build.

Prompt 1 (pasted during the cold open):
```
Build a single-page web app called "Dastarkhan Split". It splits a cafe bill between friends in Kazakhstani tenge (₸).

Must have:
- add people by name
- add items with a price, and tick which people shared each item
- a service charge field, default 10%
- show what each person owes, rounded to the nearest 10 ₸, and make sure the rounded amounts still add up exactly to the bill total
- a "Copy summary" button that produces plain text I can paste into Telegram or WhatsApp
- English interface with a toggle to Kazakh
- mobile-first, one file, no external libraries

Before you build: list 3 test cases with exact expected numbers. Then build. Then check your own test cases and tell me which pass.
```
Talk track: point at the five parts of the prompt — goal, must-haves, constraints, language, and the verification clause. The last paragraph is the most important line in the whole talk.

Prompt 2 (after I3, with the room's bugs; example):
```
Real users found these bugs:
1) a negative price is accepted
2) with 0 people selected for an item the total shows NaN
3) a very long name breaks the layout on a phone
Fix the root causes, do not hide errors. Add input validation with friendly messages in both languages. Re-run your 3 test cases plus one new test per bug and show me the results.
```
Planned mistake: the first Kazakh toggle will probably have at least one awkward label. Ask a native speaker in the room to correct one string and paste the correction ("Change the label X to Y everywhere"). Point: you are the domain expert, the agent is the typist.

Fallbacks: (a) AI Studio Build tab with the same prompt; (b) pre-published artifact link + QR on a slide so I3 still works; (c) 90-second recording; (d) offline `dastarkhan-split.html` from disk, one volunteer tries to break it on the presenter's laptop.

### 4.2 Demo 2 — "An agent in your folder" (Track B, 20 min)
Tool: Claude Code CLI in a terminal (or Desktop app Code tab -> Local -> Select folder; no terminal required **[V]** https://code.claude.com/docs/en/desktop-quickstart ). Prep: folder `qazaq-cards/` containing only `words.csv` (50 rows: `kk_cyrillic,kk_latin,en,ru`, checked by a native speaker), `git init` done.

Step 1 — show the empty folder, start: `cd qazaq-cards` then `claude`.
Step 2 — PLAN. Press Shift+Tab until the status bar shows plan mode **[V]** best-practices doc. Prompt A:
```
Read @words.csv. I want a flashcard web app for learning Kazakh words:
- show the Kazakh word, tap to flip to English and Russian
- buttons "Knew it" / "Didn't know"; cards I miss come back sooner
- progress saved in the browser
- a toggle between Cyrillic and Latin script
Plain HTML/CSS/JS, no build step, must work offline by opening index.html.
Ask me up to 3 questions if anything is unclear. Then propose a plan: files, data flow, and how you will verify it works. Do not write code yet.
```
Step 3 — I5: the room answers Claude's questions; type one answer in Kazakh.
Step 4 — BUILD. Approve the plan. While it works, run I6 on the real permission prompts (the session must be in Manual mode: on Pro/Max/Team the built-in starting mode is Auto, which approves most actions via a classifier without asking **[V]** https://code.claude.com/docs/en/best-practices ).
Step 5 — VERIFY. Prompt B:
```
Write a small test script that checks three things: (1) a missed card reappears within the next 5 cards, (2) progress survives a page reload, (3) the script toggle changes every card. Run it and show me the output. If a check fails, fix the app, not the test.
```
Step 6 — I7 prompt duel and the planned mistake. Volunteer A's vague prompt, e.g. `make it look better`. Show the arbitrary result. Press Esc twice (or `/rewind`) and restore code to the previous checkpoint **[V]** best-practices doc. Then volunteer B's specific prompt, e.g.:
```
Restyle only the CSS: sky-blue and gold palette like the Kazakhstan flag, the word at 32px, rounded cards, high contrast, a progress bar on top, comfortable on a 360px-wide phone. Do not change any JavaScript. Tell me exactly which rules you changed.
```
Step 7 — memory. Run `/init` to generate CLAUDE.md, open it, add one human line: "The app must always work by opening index.html directly; never add build tools." Explain: read at the start of every session; keep it short **[V]** best-practices doc.
Step 8 — Prompt C: `commit with a descriptive message` **[V]** best-practices doc.

Fallbacks: git tags `step-0-empty`, `step-1-plan` (PLAN.md saved), `step-2-built`, `step-3-tested`, `step-4-styled`; jump with `git checkout <tag>`. Login or limit failure -> second laptop. API outage -> same Prompt A in Codex CLI/Antigravity, else recording.

### 4.3 Demo 3 — "Break, debug, ship" (Track B, 10 min)
Prep: branch `bug-demo` of the flashcard app where saved progress is read without a guard, so a fresh browser throws a JSON parse error and the streak shows `11` instead of `2` (string + number).

Step 1 — show the symptom in the browser and the red error in DevTools console. Ask the room: what three things do we give the agent? (symptom, expected behaviour, exact error).
Step 2 — Prompt D:
```
After I reload the page following my first session, I see this console error: [paste error]. Expected: my progress is restored and the streak shows 2, but it shows 11.
Find the root cause and explain it to me in two sentences as if I were a first-year student. Write a failing test that reproduces it, then fix it and run the test. Do not suppress the error.
```
(The structure — symptom, likely location, what "fixed" looks like, failing test first, root cause not symptom — is the docs' own recommended pattern **[V]** best-practices doc.)
Step 3 — SHIP. Drag the folder onto https://app.netlify.com/drop while logged in. Netlify Drop deploys a static folder by drag-and-drop; without an account the URL is protected by a temporary password until claimed, and projects needing a build step require login; deploys under 50 MB "work best" and single files over 10 MB may get stuck **[V]** https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ . Put the URL in a QR; the room opens it.
Step 4 — `git log --oneline`: four commits = four trips round the loop.

Alternative ship path for developers: `gh repo create` + GitHub Pages (needs `gh` authenticated beforehand; the docs recommend `gh` for GitHub work **[V]** best-practices doc).
Fallbacks: pre-deployed URL + QR; screenshot of the console error; recording.

---

## 5. Pre-event setup instructions (send 5 days before, remind 1 day before)

Subject: "Vibecoding masterclass — 15 minutes of setup so you can build on the day"

**Everyone (5 minutes):**
1. Bring a charged laptop (phone-only is possible in Track A) and your phone for QR codes.
2. Join the event Telegram group (link). All prompts, links and help happen there.
3. Create a free GitHub account: https://github.com (students: apply for GitHub Education; verified students get the Copilot Student plan **[V]** https://github.com/features/copilot/plans ).
4. Do installs at home. Venue wifi will not survive 50 simultaneous downloads **[J]**.
5. Arrive 20–30 minutes early if anything below fails; helpers will fix it at the setup desk.

**Track A — Browser, 0 cost (5 minutes):**
- Create a Claude account at https://claude.ai . Kazakhstan is on Anthropic's supported list for both Claude.ai and the API (as are Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan) **[V]** https://www.anthropic.com/supported-countries . In Settings > Capabilities enable "Code execution and file creation" so artifacts work **[V]** https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them . Note: persistent storage for artifacts is on Pro, Max, Team and Enterprise only **[V]** same URL; publishing a public artifact link from a Free account is not addressed in that article **[UNVERIFIED — test before the event]**.
- Sign in to Google AI Studio with a Google account: https://aistudio.google.com -> Build **[V]** https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Optional app builders with small free allowances: Lovable Free = 5 build credits per day, up to 30 per month; student discount exists at lovable.dev/students **[V]** https://lovable.dev/pricing ; Bolt Free = 300K tokens per day, 1M per month **[V]** https://support.bolt.new/account-and-subscription/tokens . Forty minutes of building can exhaust these, so treat them as backups.

**Track B — Claude Code (10 minutes, needs a paid plan):**
- Plan: Claude Pro, 20 USD/month (17 USD/month if billed annually) **[V]** https://claude.com/pricing . The Free plan does not include Claude Code **[V]** https://code.claude.com/docs/en/setup . One month is enough for the masterclass and the 7-day plan; cancel after if you wish **[J]**. Payment: Kazakhstan-issued cards (Kaspi, Freedom, Bereke) are reported to work **[UNVERIFIED, secondary source]** https://blog.paulbreit.com/how-to-pay-for-claude/ ; if a card is declined see https://support.claude.com/en/articles/9402418-why-was-my-card-declined **[S]**.
- Requirements: Windows 10 1809+, macOS 13+, Ubuntu 20.04+/Debian 10+; 4 GB RAM; internet **[V]** https://code.claude.com/docs/en/setup
- Easiest: install the Claude Desktop app and open the **Code** tab — no terminal, no Node.js **[V]** https://code.claude.com/docs/en/desktop-quickstart
- Terminal install (native installer, auto-updates) **[V]** https://code.claude.com/docs/en/setup :
  - Windows PowerShell: `irm https://claude.ai/install.ps1 | iex`
  - macOS / Linux / WSL: `curl -fsSL https://claude.ai/install.sh | bash`
  - Or `winget install Anthropic.ClaudeCode` / `brew install --cask claude-code` (these do not auto-update).
  - Windows: no admin rights and no WSL needed; Git for Windows is optional but recommended (enables the Bash tool; without it Claude Code uses PowerShell) **[V]** same URL.
  - npm route only if you insist: needs Node.js 22+ as of v2.1.198 **[V]** same URL.
- Check: `claude --version` prints a version; `claude doctor` diagnoses problems; then run `claude` once and log in through the browser **[V]** same URL.
- No laptop power? Cloud sessions at https://claude.ai/code and the Code tab of the mobile app run on Anthropic's machines (research preview for Pro/Max/Team; needs GitHub connected) **[V]** https://code.claude.com/docs/en/claude-code-on-the-web
- Privacy switch to know about: on Free/Pro/Max you choose whether your data may be used for training; with it on, retention is 5 years, with it off 30 days; change at claude.ai/settings/data-privacy-controls **[V]** https://code.claude.com/docs/en/data-usage

**Track C — free agent in a folder (10 minutes, for developers):**
- Codex CLI signed in with a free ChatGPT account (the plan table marks Codex CLI, IDE extension and SDK as available on Free, Go, Plus and Pro; Codex cloud is Plus/Pro only; Free is described only as "Explore Codex capabilities on quick coding tasks", with no numeric limit) **[V, re-checked 21 Sep 2026]** https://learn.chatgpt.com/docs/pricing
- Google Antigravity, Individual plan 0 USD: agent + several models with weekly rate limits **[V]** https://antigravity.google/pricing . Warning: community reports of weekly quota burning out within minutes after the June 2026 changes **[V, anecdotal comments]** https://github.com/google-gemini/gemini-cli/discussions/27274
- VS Code + GitHub Copilot Free (agent mode included; 50 chat/agent requests a month runs out fast) or Copilot Student **[V]** https://github.com/features/copilot/plans
- OpenCode + Zen free models exist but are time-limited, may use your data for model improvement, and sign-up asks for billing details **[V]** https://opencode.ai/docs/zen/
- Do NOT plan on Gemini CLI's old free tier: see Corrections.

**Organizer checklist [J unless tagged]:** helpers 1:10 **[V]**; sticky notes in two colours **[V]**; power strips; mic; projector tested with light theme; hotspot on a second carrier; two presenter devices **[V]** Teaching Tech Together; recordings of all 3 demos **[V]** Morling; `demo-checkpoints` repo; pre-published Demo 1 artifact; printed QR for the Telegram group; status.claude.com check; a list of who has a paid seat so pairs can be balanced; photo/recording consent line on the sign-up form.

---

## 6. Ten build-together projects (40 minutes each)

Shared constraints so every project fits 40 minutes in any track **[J]**: one static page (or one script), no login, no paid API, no secrets, data in the browser (localStorage) or a bundled JSON/CSV, mobile-first, deployable by drag-and-drop. Following "never start with a blank page" **[V]** https://teachtogether.tech/en/index.html every card ships with a starter prompt. Every starter prompt ends with the same verification tail:

> Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.

| # | Project | Starter prompt (add the tail above) | Definition of done |
|---|---|---|---|
| 1 | **Dastarkhan Split** — bill splitter in tenge | Build a one-file mobile web app that splits a cafe bill in tenge between friends: people, items with who shared them, service charge default 10%, amounts rounded to the nearest 10 ₸ that still sum to the total, and a copy-to-Telegram summary. English/Kazakh toggle. | 3 people/4 items example matches a hand calculation; rounded shares sum exactly to the total; rejects negative and empty input; link opens on a phone. |
| 2 | **Qazaq Cards** — flashcards | Build an offline flashcard app from this word list [paste 20 rows: Kazakh, English, Russian]. Flip on tap, "knew it / didn't know", missed cards return sooner, progress saved in the browser, Cyrillic/Latin toggle. | Missed card returns within 5 cards; reload keeps progress; toggle changes every card; works with wifi off. |
| 3 | **My page** — bilingual personal site | Build a one-page personal site for [name, 3 facts, 3 projects, contacts]. Sections: hero, about, projects, contact. EN/KZ toggle, dark/light mode, no frameworks, loads fast on mobile data. | All text is mine, not placeholder; both languages complete; looks right at 360px and on desktop; live URL shared. |
| 4 | **Exam sprint timer** — Pomodoro + study log for ENT/IELTS prep | Build a Pomodoro timer (25/5, adjustable) that asks what subject I studied after each session and shows a weekly bar chart of minutes per subject. Data in the browser, export to CSV. | Timer survives tab switch; a finished session appears in the chart; CSV opens in Excel/Sheets; reset button asks for confirmation. |
| 5 | **Toi planner** — guest list and budget | Build a planner for a family celebration: guests (name, side of family, RSVP yes/no/maybe, number of seats), budget lines (planned vs actual in ₸), totals and a per-guest cost. Printable view. | Totals correct for a 5-guest sample; RSVP filter works; print view fits one page; data persists after reload. |
| 6 | **Kazakhstan quiz** — timed quiz game | Build a 10-question timed quiz about Kazakhstan's regions and cities from this JSON [paste or ask the AI to draft, then fact-check 5 answers yourself]. Score, streak, review of wrong answers, share-my-score text. | Questions shuffle; timer ends the round; wrong answers are reviewable; you personally verified at least 5 facts (the AI can be wrong). |
| 7 | **Habit heatmap** | Build a habit tracker: up to 5 habits, tap today to mark done, GitHub-style heatmap for the last 12 weeks, current and best streak. | Marking today updates heatmap and streak; streak logic passes a 3-day on/1 off/2 on test; data persists. |
| 8 | **Expense lens** — CSV to charts | Build a page where I drop a CSV of expenses (date, category, amount in ₸; here is a fake sample [paste 15 rows]) and get totals per category, a monthly chart, and the top 5 expenses. Everything stays in my browser; nothing is uploaded. | Sample file renders correct totals (check two by hand); a malformed row gives a friendly error; network tab shows no upload. Use fake data only. |
| 9 | **Asyk toss** — mini-game on canvas | Build a small browser game inspired by asyk atu: drag to aim and flick to throw an asyk at a row of targets, 5 throws per round, score, simple physics, touch controls, sound toggle. | Playable on a phone with touch; score and round reset work; no console errors during a full round. |
| 10 | **Downloads tidy** (developer track, Claude Code/Codex only) | Write a Python script that organises a folder by file type and month into subfolders. It must have a `--dry-run` mode that prints what it would do and is the default; real moves only with `--apply`; never deletes; writes an undo log. Create a test folder with 20 fake files and test there only. | Dry run prints a plan and changes nothing; `--apply` on the test folder works; undo log restores the original layout; you denied at least one permission request on purpose and explained why. |

Stretch goals (if done early): add a second language, add keyboard accessibility, ask the agent for a security review using the I8 follow-up prompt, write a README with a screenshot, or switch Claude Code to the Learning output style (it leaves `TODO(human)` pieces for you to write) **[V]** https://code.claude.com/docs/en/output-styles

Helper crib for stuck pairs **[V]** best-practices doc: (1) too big? cut the must-have list in half; (2) looping on one bug twice? `/clear` and re-prompt with what you learned; (3) agent wandered off? Esc, then redirect; (4) broke something that worked? `/rewind`.

---

## 7. Q&A bank — 25 likely questions, crisp answers

**Getting started and money**
1. **Do I need to know how to code?** To start, no: a hackathon prize went to a builder with no prior programming experience, and other winners were a physician and a repair technician **[V]** https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon . To go beyond toys, yes, gradually: you need to read diffs, errors and tests. Domain knowledge is your edge.
2. **Is Claude Code free?** No. It needs Pro (20 USD/month), Max (from 100 USD), Team, Enterprise or pay-per-token Console billing; the Free plan gives chat and artifacts only **[V]** https://claude.com/pricing , https://code.claude.com/docs/en/setup
3. **What can I use for 0 tenge?** Claude.ai Free artifacts, Google AI Studio Build, Codex on a free ChatGPT account, Antigravity's free plan, Copilot Free/Student (see section 5 for sources). Free tiers change fast — Gemini CLI's free tier ended 18 Jun 2026 **[V]** https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/ — so learn the loop, not one tool.
4. **Does Claude work in Kazakhstan? Do I need a VPN?** Kazakhstan is officially supported for Claude.ai and the API; no VPN needed **[V]** https://www.anthropic.com/supported-countries . Local cards reportedly work **[UNVERIFIED]** https://blog.paulbreit.com/how-to-pay-for-claude/
5. **API or subscription — what does it really cost?** Subscription = flat fee with rolling five-hour and weekly usage windows. API = per token; Anthropic reports an enterprise average of about 13 USD per developer per active day, 150–250 USD per month **[V]** https://code.claude.com/docs/en/costs . Students: start with one month of Pro.
6. **I hit my usage limit. Now what?** Check `/usage`; limits are shared across models within a window; use Sonnet for routine work, `/clear` between tasks, write specific prompts, and wait for the reset shown in the message **[V]** https://code.claude.com/docs/en/costs
7. **My laptop is weak / I only have a phone.** Claude Code needs only 4 GB RAM because the model runs in the cloud **[V]** https://code.claude.com/docs/en/setup ; cloud sessions work from a browser or the mobile app on Pro **[V]** https://code.claude.com/docs/en/claude-code-on-the-web ; Track A works on any device.

**Tools**
8. **Claude Code vs Cursor vs Copilot vs Codex vs Antigravity?** Same loop, different shells: terminal/desktop agent (Claude Code, Codex), AI-first IDEs (Cursor, Antigravity), assistant inside VS Code (Copilot). Pick by what you can pay for and what your team uses; skills transfer **[J]**.
9. **Terminal scares me. Must I use it?** No. The Desktop app's Code tab gives diffs, preview and permissions with no terminal **[V]** https://code.claude.com/docs/en/desktop-quickstart . There is also an official terminal guide for first-timers **[V]** https://code.claude.com/docs/en/setup
10. **What is plan mode and when do I use it?** The agent reads and proposes but does not edit. Use it when the change touches several files or you are unsure of the approach; skip it if you could describe the diff in one sentence **[V]** https://code.claude.com/docs/en/best-practices
11. **What is CLAUDE.md?** A short, human-readable file loaded at the start of every session: commands, style rules, gotchas. Generate with `/init`, keep it pruned — bloated files get ignored **[V]** same URL.
12. **MCP, skills, subagents, hooks — do I need them?** Not on day one. MCP connects external tools, skills are reusable instructions loaded on demand, subagents keep research out of your main context, hooks are guaranteed scripts. Learn them when you feel the specific pain **[V]** same URL.
13. **Can I prompt in Kazakh or Russian?** Yes, and use native script rather than transliteration. Anthropic's published benchmark covers 14 languages and does not include Kazakh or Russian; low-resource languages score lower (for example Yoruba about 80% of English on Sonnet 4.5), so expect weaker Kazakh than English and have a native speaker check UI text **[V]** https://platform.claude.com/docs/en/build-with-claude/multilingual-support . Keep technical terms in English **[J]**.

**Quality, safety, trust**
14. **Is AI-written code secure?** Not by default. In May 2025, 170 of 1,645 scanned Lovable apps exposed user names, emails, financial data and API keys **[V]** https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers ; CodeRabbit's 17 Dec 2025 analysis of 470 PRs found AI co-authored PRs carried about 1.7x more issues (10.83 vs 6.45 per PR) and "up to 2.74x" more security issues **[V]** https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report ; Veracode (Oct 2025) saw no real improvement in security over time **[V via Wikipedia; primary report not opened]** https://en.wikipedia.org/wiki/Vibe_coding . Minimum rules: no secrets in client code, validate input, use managed auth, ask for a security review, keep stakes low.
15. **Can the agent delete my files or wreck my computer?** It can run commands, so yes if you let it. Controls: Manual mode asks before every edit/command, Plan mode edits nothing, Auto mode uses a classifier to block risky actions; checkpoints let you rewind file edits, but changes made by shell commands are not captured — use git **[V]** https://code.claude.com/docs/en/best-practices , https://code.claude.com/docs/en/desktop-quickstart . Cautionary tale: Replit's agent deleted a production database during a code freeze in July 2025 **[V]** https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/
16. **Does Anthropic train on my code?** On Free/Pro/Max it is your choice (a setting); on Team/Enterprise/API it does not by default. Retention 5 years if you allow training, 30 days if not **[V]** https://code.claude.com/docs/en/data-usage . Never paste other people's personal data or company secrets into any AI tool.
17. **It keeps failing on the same bug. What do I do?** After two failed corrections the context is polluted: `/clear`, then write a better first prompt with symptom, expected result, exact error, and ask for a failing test first **[V]** https://code.claude.com/docs/en/best-practices . Or kill the app and rebuild smaller — the 65labs instructors' advice **[V]** https://www.aol.com/news/joined-vibe-coding-workshop-learn-040201765.html
18. **How do I write a good prompt?** Goal, must-haves, constraints, examples, and a check the agent can run. For bigger things, tell it to interview you and write SPEC.md, then start a fresh session to implement **[V]** https://code.claude.com/docs/en/best-practices
19. **Does AI really make developers faster?** Mixed and moving. METR measured 16 experienced open-source developers taking 19% longer with AI in early 2025 **[V]** https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ ; its 24 Feb 2026 update says it believes developers are likely *more* sped up now than then, yet its new measurements still show slowdowns (-18% and -4%, both with confidence intervals crossing zero) and it rates the data "only very weak evidence" because 30–50% of developers declined no-AI tasks **[V]** https://metr.org/blog/2026-02-24-uplift-update/ . 66% of developers complain about "almost right" output **[V]** https://survey.stackoverflow.co/2025/ai . Verification skill is what converts speed into value.
20. **Is vibecoding "real" engineering?** Pure vibe coding means not reading the code — fine for low-stakes tools. Professional work means you can explain what you ship **[V]** https://simonwillison.net/2025/Mar/19/vibe-coding/ . In the 2025 Stack Overflow survey 72% of respondents said they are not vibe coding, and a further 5% were emphatic that it is not part of their workflow **[V]** https://survey.stackoverflow.co/2025/ai . Karpathy's one-year retrospective post (4 Feb 2026) calls the original a "shower of thoughts throwaway tweet" **[V — date and text confirmed via X syndication API]** https://x.com/karpathy/status/2019137879310836075 ; the claim that it reframes serious use as "agentic engineering" is **[UNVERIFIED — that phrase does not appear in the retrieved text of this post; do not attribute it on a slide]**.

**Career and next steps**
21. **Will AI replace programmers? Should I still study CS?** Nobody knows the end state. Observable today: adoption 84%, trust 33% **[V]** https://survey.stackoverflow.co/2025/ai — someone has to specify, verify and own the result. CS fundamentals are what make you good at the VERIFY step **[J]**.
22. **Can I use this for university assignments?** Follow your course policy. Use it as a tutor: ask for explanations, quizzes, and the Learning output style that leaves `TODO(human)` parts for you **[V]** https://code.claude.com/docs/en/output-styles . Rule of thumb: never submit what you cannot explain.
23. **How do I put my app online for free?** Static: Netlify Drop (drag a folder) **[V]** https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ or GitHub Pages **[S]** https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site . Frameworks: Vercel Hobby is free but for personal, non-commercial use **[S]** https://vercel.com/docs/plans/hobby . AI Studio deploys to Cloud Run **[V]** https://ai.google.dev/gemini-api/docs/aistudio-build-mode
24. **How do I add login, a database or payments?** Do not let an agent invent auth or payment logic. Use managed services (for example Supabase/Firebase/Clerk for auth and data), keep keys server-side, and get a human review before real users or real money **[J]**, motivated by the Lovable data-exposure numbers in Q14.
25. **Can I build a mobile app? Can I earn money with this?** Start with a responsive web app/PWA; AI Studio Build can generate Android (Kotlin/Compose) apps **[V]** https://ai.google.dev/gemini-api/docs/aistudio-build-mode . Money: find a real user with a real problem first; test ideas at local hackathons — Astana Hub's calendar currently lists regional AI/vibe-coding bootcamps and hackathons (for example "VIBE CODING: how to create websites and services without knowing the code" at SKO Hub, Petropavlovsk, 23–25 Sep 2026 at 16:00, and September 2026 hackathons at the Oskemen, Aqmola, Zhambyl, Mangystau and Semey hubs with 600,000–1,000,000 tenge prize funds) **[V]** https://astanahub.com/en/event/ ; HackNU at Nazarbayev University is a 24-hour student hackathon **[S]** https://nu.edu.kz/eventsm/hacknu26-2/

---

## 8. Follow-up: the 7-day plan for attendees

Principle **[J]**: 30–45 minutes a day, one deliverable a day, posted in the Telegram group. Each day exercises one loop word. The 65labs advice applies: build several small things rather than polishing one **[V]** https://www.aol.com/news/joined-vibe-coding-workshop-learn-040201765.html

| Day | Loop focus | Task | Deliverable to post |
|---|---|---|---|
| 0 (tonight, 20 min) | SHIP | Finish and deploy the workshop project. Decide your training-data privacy setting **[V]** https://code.claude.com/docs/en/data-usage | Live link |
| 1 | DESCRIBE | Rebuild the same project from zero with a better prompt. Use the interview technique: have the agent question you and write SPEC.md, then implement in a fresh session **[V]** best-practices doc | SPEC.md + before/after screenshots |
| 2 | SHIP | Git with the agent: init, commit after every working step, push to GitHub, enable Pages. Make it explain each git command before running it. | Repo URL with 5+ meaningful commits |
| 3 | VERIFY (understanding) | Pick one file. Ask for a line-by-line explanation, then "quiz me with 5 questions". Try `/output-style learning` and complete one `TODO(human)` **[V]** https://code.claude.com/docs/en/output-styles | One thing you now understand, in your own words |
| 4 | VERIFY + REWIND | Bug day: break three things on purpose; fix each with the symptom/expected/error prompt and a failing test first; practise `/rewind` and the two-strikes `/clear` rule **[V]** best-practices doc | The best bug story |
| 5 | BUILD | New mini-project from the list of 10, this time with real data: a JSON/CSV file you prepared, or a public no-key API (for example Open-Meteo weather **[UNVERIFIED]**). | Second live link |
| 6 | VERIFY (safety) | Security and polish pass with the I8 review prompt; phone test; write a README with screenshot; remove any secret from the repo. | README link |
| 7 | SHIP + share | Record a 2-minute demo (what I asked, what broke, how I fixed it). Choose the next step: Claude Code 101 / Claude Code in Action / AI Fluency for students on Anthropic Academy **[V, course list only; price and certificates not confirmed]** https://anthropic.skilljar.com/ ; a hackathon from https://astanahub.com/en/event/ **[V]** | Video or post + next goal |

Organizer cadence **[J]**: T+1 day — email/Telegram post with slides, the three demo prompts, project cards, recording; T+3 — nudge with the best bug story so far; T+7 — 45-minute online demo call, 90 seconds per person; T+8 — one-up/one-down survey. Success metric: share of attendees with a live link by day 7 (target 40%+), not satisfaction scores. For universities: point motivated students to Anthropic's Claude Campus program for the next application window (Fall 2026 closed 12 Sep 2026) **[V]** https://claude.com/programs/campus

---

## 9. Corrections to common claims (checked Sep 2026)

1. **"Gemini CLI is the free Claude Code alternative — 1,000 requests a day."** Outdated. Google announced on 19 May 2026 that from 18 Jun 2026 Gemini CLI stops serving free users and Google AI Pro/Ultra subscribers; they are moved to Antigravity CLI; paid API keys and Code Assist Standard/Enterprise continue **[V]** https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/ . The quota page still shows the old 1,000/day table next to the replacement notice, which is why blogs keep repeating it **[V]** https://geminicli.com/docs/resources/quota-and-pricing/ . Antigravity's free plan has undisclosed weekly limits **[V]** https://antigravity.google/pricing ; users report exhausting them in minutes **[V, anecdotal]** https://github.com/google-gemini/gemini-cli/discussions/27274 . Qwen Code's free OAuth tier is also reported discontinued on 15 Apr 2026 **[S/UNVERIFIED]** https://kilo.ai/articles/best-cli-coding-agents
2. **"Claude Code needs Node.js, npm and WSL on Windows."** Outdated. Native installers for PowerShell/CMD, no admin rights, no WSL; Git for Windows optional; a Desktop app with no terminal; the npm route now needs Node 22+ **[V]** https://code.claude.com/docs/en/setup
3. **"You can use Claude Code on the free plan."** False. Free = chat + artifacts. Claude Code needs Pro or higher, or Console billing **[V]** https://claude.com/pricing
4. **"Claude isn't available in Kazakhstan; you need a VPN and a foreign card."** False for Kazakhstan: it is on the supported list **[V]** https://www.anthropic.com/supported-countries . The VPN/virtual-card guides circulating in Russian-language channels target residents of unsupported countries, and themselves describe Kazakhstan-issued cards as the working route **[V that the guide says so]** https://blog.paulbreit.com/how-to-pay-for-claude/
5. **"All agentic coding CLIs require a paid subscription."** Not quite: Codex (including the CLI) is included in ChatGPT Free **[V]** https://learn.chatgpt.com/docs/pricing . Free limits are unspecified, so do not build a 40-minute session on it without testing.
6. **"Attention span is 10–15 minutes, so change slides every 10 minutes."** Not supported by primary data (Bradbury 2016) **[S]** https://journals.physiology.org/doi/full/10.1152/advan.00109.2016 . The evidence-backed lever is active learning (Freeman 2014: 225 studies, +0.47 SD, 1.5 times the failure rate under lecturing) **[V, abstract via Europe PMC]** https://www.pnas.org/doi/10.1073/pnas.1319030111
7. **"Studies show AI makes developers 19% slower."** That is METR's early-2025 result for experienced maintainers on their own repos. METR's 24 Feb 2026 update: METR believes developers are likely more sped up now than in early 2025, but its new measurements still show slowdowns (-18% and -4%, confidence intervals crossing zero) and it calls them "only very weak evidence" because of selection effects (30–50% of developers avoided no-AI tasks). Do not put "METR: AI now makes you faster" on a slide **[V]** https://metr.org/blog/2026-02-24-uplift-update/
8. **"Vibe coding = any coding with AI."** Willison separates vibe coding (no review, low stakes) from responsible AI-assisted programming **[V]** https://simonwillison.net/2025/Mar/19/vibe-coding/ . Teach both, label which one each demo is.
9. **"Mentimeter's free plan is fine for a workshop."** Free is capped at 50 participants per month **[V]** https://help.mentimeter.com/en/articles/465589-how-many-people-can-participate-in-a-mentimeter-presentation . Use Telegram polls, hands, or sticky notes.
10. **"Netlify Drop needs no account."** Half true: you can drop without signing in, but the URL is password-protected until you claim it, and builds require login **[V]** https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ . Have attendees create the account beforehand.
11. **"Cursor Pro is free for students for a year."** The student page (Sep 2026) no longer states this; it points to promotions at campus/online events this autumn **[V]** https://cursor.com/students . Do not promise it.
12. **"Live workshops with many people on one API org just work."** Anthropic explicitly warns that live training sessions need higher per-user TPM because of concurrency **[V]** https://code.claude.com/docs/en/costs . Prefer individual seats + pairing over a shared key (also avoids leaking a key to a room).

---

## Visual candidates

| # | URL | What it shows | Teaching point |
|---|---|---|---|
| 1 | https://x.com/karpathy/status/1886192184808149383 **[V — ID, date (2 Feb 2025, 23:17 UTC) and full text confirmed via X syndication API; matches Wikipedia's Cite tweet]** | Karpathy's original 2 Feb 2025 "vibe coding" post | Origin of the term; opening slide of the concept block |
| 2 | https://x.com/karpathy/status/2019137879310836075 **[V — posted 4 Feb 2026; text confirmed via X syndication API]** | Karpathy's one-year retrospective on the "shower of thoughts throwaway tweet" | The term went mainstream in a year. Do NOT caption it "agentic engineering": that phrase is UNVERIFIED for this post |
| 3 | https://www.collinsdictionary.com/woty **[returned 403 to automated fetch on 21 Sep 2026; WOTY 2025 = "vibe coding", 6 Nov 2025, V via Wikipedia citing BBC/Independent — open manually]** | Collins Word of the Year 2025 page | Vibecoding is mainstream culture, not a niche |
| 4 | https://simonwillison.net/2025/Mar/19/vibe-coding/ | Blog header + the explain-every-line rule | Vibe coding vs responsible AI-assisted programming |
| 5 | https://code.claude.com/docs/en/best-practices | The Before/After prompt tables ("Provide verification criteria", "Describe the symptom") | DESCRIBE and VERIFY: specific beats vague; screenshot the table |
| 6 | https://code.claude.com/docs/en/desktop-quickstart | Desktop app Code tab, permission mode list | Beginners do not need a terminal; Manual/Auto/Plan modes |
| 7 | https://www.anthropic.com/supported-countries | Country list with Kazakhstan present | Kills the "you need a VPN" myth for the local audience |
| 8 | https://claude.com/pricing | Free vs Pro plan cards | What is free (artifacts) vs paid (Claude Code) |
| 9 | https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/ | Google's announcement header, 19 May 2026 | Free tiers vanish: learn the loop, not the tool |
| 10 | https://github.com/google-gemini/gemini-cli/discussions/27274 | GitHub discussion thread with user reactions to the free-tier change | Real community reaction; tool lock-in risk |
| 11 | https://antigravity.google/pricing | 0 USD Individual plan card with weekly limits | Current free Track C option and its fine print |
| 12 | https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon | Winners: physician, repair technician, educator, self-taught dev | Domain expertise + agent; "do I need to code?" |
| 13 | https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/ | Headline on the Replit agent deleting a production database | Why permissions, backups and staging matter (I6, Q15) |
| 14 | https://en.wikipedia.org/wiki/Vibe_coding | Reception/incidents section (Lovable 170 of 1,645; CodeRabbit "up to 2.74x"). For slides prefer the primaries, both opened: https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers and https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report | Evidence slide for I8 Spot the bug |
| 15 | https://survey.stackoverflow.co/2025/ai | Charts: 84% adoption, 46% distrust vs 33% trust, 66% "almost right" | Adoption vs trust gap; why VERIFY is the core skill |
| 16 | https://metr.org/blog/2026-02-24-uplift-update/ | Chart of original -19% and updated estimates with confidence intervals | Honest answer to "does it make you faster?" |
| 17 | https://carpentries.github.io/instructor-training/17-live | Carpentries live-coding lesson page | Credibility for the facilitation method (for the site's "how we teach" section) |
| 18 | https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008090 | Paper header "Ten quick tips for teaching with participatory live coding" | Sticky notes, 1:10 helpers, go slowly |
| 19 | https://serc.carleton.edu/details/images/47857.html | Figure 1 from Freeman et al. 2014 (failure rates lecture vs active learning) | Why the masterclass is interactive, not a lecture |
| 20 | https://www.aol.com/news/joined-vibe-coding-workshop-learn-040201765.html | Journalist's account of a beginner vibe-coding class (65labs, Singapore) | What beginners actually experience; build many small apps |
| 21 | https://astanahub.com/en/event/ | Astana Hub events calendar incl. "VIBE CODING: how to create websites and services without knowing the code" (SKO Hub, Petropavlovsk, 23–25 Sep 2026) and regional hackathons with 600,000–1,000,000 tenge prizes | Local next steps for day 7 |
| 22 | https://luma.com/ckqveo6i | Cursor Seattle Meetup + Workshop agenda | How tool companies structure a workshop night (setup buffer, 2h workshop, Q&A) |
| 23 | https://claude.com/programs/campus | Claude Campus program page (Builder Clubs, 3,600 USD stipend) | Pathway for student leaders in Kazakhstan |
| 24 | https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ | Netlify Drop drag-and-drop zone | SHIP step: deploy in 30 seconds |

---

## Fact-check log

Adversarial pass on 21 Sep 2026 by a second research agent. Method: every claim below was tested against its primary source by direct fetch (the session's web-search quota was exhausted, so no search engine was used). Targets were the numbers, dates, quotes, prices and commands most likely to appear on a slide. Outcomes: **CONFIRMED** (source opened, claim matches), **CORRECTED** (file edited), **UNVERIFIED** (source unreachable or silent; marked in the text). Sites that refused automated fetch during this pass: collinsdictionary.com (403), pnas.org (403), pmc.ncbi.nlm.nih.gov (reCAPTCHA), bbc.com, theguardian.com, independent.co.uk (blocked), publish.x.com oEmbed (402), xcancel.com (451). X posts were verified through the public syndication endpoint `cdn.syndication.twimg.com/tweet-result?id=<id>`.

| # | Claim (where in this file) | Outcome | What the source actually says | Source |
|---|---|---|---|---|
| 1 | Karpathy coined "vibe coding" on 2 Feb 2025; quote "fully give in to the vibes"; tweet ID 1886192184808149383 (sec. 2, Visual 1) | CORRECTED (upgraded from "ID from memory" to verified) | Post by @karpathy created 2025-02-02T23:17:15Z; full text contains "fully give in to the vibes, embrace exponentials, and forget that the code even exists". Wikipedia's `Cite tweet` uses the same number. | https://cdn.syndication.twimg.com/tweet-result?id=1886192184808149383&token=a ; https://en.wikipedia.org/w/index.php?title=Vibe_coding&action=raw |
| 2 | Karpathy's Feb 2026 retrospective "reframes serious use as agentic engineering" (Q20, Visual 2) | CORRECTED / partly UNVERIFIED | Post 2019137879310836075 exists, dated 2026-02-04T19:55:58Z, and is a one-year retrospective calling the original a "shower of thoughts throwaway tweet". The retrieved text does not contain "agentic engineering". Date and framing verified; the attribution of that phrase is now marked UNVERIFIED. | https://cdn.syndication.twimg.com/tweet-result?id=2019137879310836075&token=a |
| 3 | Collins Word of the Year 2025 = vibe coding (sec. 2, Visual 3) | UNVERIFIED at primary; V via secondary | collinsdictionary.com/woty and /us/woty returned 403; BBC, Guardian, Independent blocked; Collins blog front page has no WOTY post. Wikipedia (Vibe coding; Word of the year) records the award on 6 Nov 2025 citing BBC and The Independent. Text now carries this caveat. | https://en.wikipedia.org/wiki/Vibe_coding ; https://en.wikipedia.org/wiki/Word_of_the_year |
| 4 | Claude Pro 20 USD/month, 17 USD/month annual (200 USD upfront); Max from 100 USD; Free has no Claude Code but can create artifacts (sec. 0, 5, Q2, Corrections 3) | CONFIRMED | Pricing page: Pro "$20 if billed monthly", "$17 Per month with annual subscription discount ($200 billed up front)"; Max 5x and 20x "From $100 Per month"; Free row "Claude Code: No", includes "Create Artifacts". Team is 20 USD/seat annual, 25 monthly. | https://claude.com/pricing |
| 5 | Install commands, OS/RAM requirements, Node 22+ as of v2.1.198, no admin/WSL, Git for Windows optional, `claude --version`, `claude doctor`, plan requirement (sec. 5, Corrections 2) | CONFIRMED | Verbatim matches: `curl -fsSL https://claude.ai/install.sh \| bash`; `irm https://claude.ai/install.ps1 \| iex`; `winget install Anthropic.ClaudeCode`; `brew install --cask claude-code` (Homebrew/WinGet "do not auto-update"); macOS 13.0+, Windows 10 1809+, Ubuntu 20.04+, Debian 10+, 4 GB+ RAM; "As of v2.1.198, the npm package requires Node.js 22 or later"; "You do not need to run as Administrator"; "requires a Pro, Max, Team, Enterprise, or Console account. The free claude.ai plan does not include Claude Code access." Also available: a Windows CMD installer and apt/dnf/apk repos. | https://code.claude.com/docs/en/setup |
| 6 | METR: 19% slower in early 2025; Feb 2026 update "developers are likely faster now"; 30–50% refused no-AI tasks (M3, Q19, Corrections 7) | CORRECTED | Original study (10 Jul 2025): 16 developers, 246 issues, "take 19% longer", expected +24%. Update (24 Feb 2026): "we believe it is likely that developers are more sped up from AI tools now — in early 2026 — compared to our estimates from early 2025", but new estimates are a "speedup of -18%" (CI -38% to +9%) for returning developers and -4% (CI -15% to +9%) for new ones, "only very weak evidence"; "30% to 50% of developers told us that they were choosing not to submit some tasks because they did not want to do them without AI." The file said "likely faster now" in three places; reworded to match. | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ ; https://metr.org/blog/2026-02-24-uplift-update/ |
| 7 | Stack Overflow 2025: 84% use/plan to use AI; 46% distrust vs 33% trust; 66% "almost right"; 72% not vibe coding (M3, Q19–21, Visual 15) | CONFIRMED (72% wording tightened) | "84% of respondents are using or planning to use AI tools"; "distrust the accuracy of AI tools (46%) than trust it (33%)"; "66% of developers ... 'AI solutions that are almost right, but not quite'"; "Most respondents are not vibe coding (72%), and an additional 5% are emphatic". Q20 now uses the survey's wording. | https://survey.stackoverflow.co/2025/ai |
| 8 | Replit agent deleted SaaStr's production database during a code freeze, ~4,000 fake records, July 2025 (M1, Q15, Visual 13) | CONFIRMED | Register, 21 Jul 2025: deleted Jason Lemkin's production database despite a code freeze, created a database of 4,000 fictional user records, faked test results; Replit admitted "a catastrophic error of judgement". | https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/ |
| 9 | Gemini CLI free tier ends 18 Jun 2026, announced 19 May 2026, users moved to Antigravity CLI (Q3, Corrections 1, Visual 9) | CONFIRMED | Post dated 19 May 2026: "On June 18, 2026, Gemini CLI and Gemini Code Assist IDE extensions will stop serving requests for Google AI Pro and Ultra, as well as those using it free of charge"; paid API keys and Code Assist Standard/Enterprise continue. | https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/ |
| 10 | Freeman et al. 2014: 225 studies, +0.47 SD, 1.5x failure under lecturing (1.3, Corrections 6, Visual 19) | CONFIRMED (tag upgraded from [S] to [V]) | Abstract: "metaanalyzed 225 studies"; "increased by 0.47 SDs"; "1.5 times more likely to fail"; odds ratio 1.95. PNAS page 403 to bots; verified via Europe PMC's copy of the abstract. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1073/pnas.1319030111&resultType=core&format=json |
| 11 | Claude Campus: 3,600 USD stipend, Sep 2026–Jun 2027, applications 1–12 Sep, closed for Fall 2026, 18+ (1.4, sec. 8, Visual 23) | CONFIRMED | "Receive a USD3,600 cash stipend"; "runs from September 2026 to June 2027"; applications "open September 1 and close September 12"; "The program is closed for Fall 2026"; "18+ and have work authorization in your country of study"; three tracks (Builder Clubs, Campus Conversations, Science Workshops). | https://claude.com/programs/campus |
| 12 | "Built with Opus 4.6" hackathon 10–16 Feb 2026, 500 participants, 500 USD credits; Opus 4.7 winners post 15 Jun 2026 and winner backgrounds (1.4, Q1, Visual 12) | CORRECTED | Cerebral Valley: "Feb 10 at 12:00 PM – Feb 17 at 10:00 AM (EST)", "select 500 participants and give each one $500 in Claude API credits", "$100k in Claude API credits" prizes. Date fixed to 10–17 Feb. Winners post (15 Jun 2026) confirmed; the "developer in Chile with no programming experience" was actually "a 20-year-old from Chiloé with no programming experience" (Keep Thinking Prize); wording fixed. | https://cerebralvalley.ai/e/claude-code-hackathon ; https://claude.com/blog/meet-the-winners-of-built-with-opus-4-7-claude-code-hackathon |
| 13 | Lovable: 170 of 1,645 apps exposed personal data, May 2025 (I8, Q14, Visual 14) | CONFIRMED, primary added | Semafor, 29 May 2025: Replit's Matt Palmer and Kody Low examined 1,645 Lovable apps; "170 allowed anyone to access information about the site's users, including names, email addresses, financial information and secret API keys." | https://www.semafor.com/article/05/29/2025/the-hottest-new-vibe-coding-startup-lovable-is-a-sitting-duck-for-hackers |
| 14 | CodeRabbit Dec 2025: 1.7x more major issues, 2.74x more security issues (I8, Q14) | CORRECTED (precision) | Report dated 17 Dec 2025, 470 PRs (320 AI-co-authored, 150 human): 10.83 vs 6.45 issues per PR (about 1.7x overall, not specifically "major"); "Security issues were up to 2.74× higher". File now says "about 1.7x more issues" and "up to 2.74x". | https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report |
| 15 | Codex included in ChatGPT Free and Go (8 USD) and Plus (20 USD); CLI on all individual plans (sec. 0, 5, Corrections 5) | CONFIRMED (nuance added) | "ChatGPT Work and Codex are included in your ChatGPT Free, Go, Plus, Pro..."; Go "$8/month", Plus "$20/month". Feature table: Codex CLI, IDE extension and SDK ticked for Free, Go, Plus, Pro; Codex cloud ticked for Plus and Pro only. Free: "Explore Codex capabilities on quick coding tasks", no numeric limit. (A first, coarser fetch misread the table as excluding Free; a second targeted fetch of the table rows resolved it.) | https://learn.chatgpt.com/docs/pricing |
| 16 | Copilot Free = 2,000 completions + 50 chat requests/month, agent mode included; Student plan for verified students (sec. 0, 5) | CONFIRMED | "2,000 completions per month"; "limited to 2000 completions and 50 chat requests (including Copilot Edits)"; agent mode "Included" on Free; "Verified students have access to the GitHub Copilot Student plan." | https://github.com/features/copilot/plans |
| 17 | Kazakhstan (and KG, UZ, TJ, TM) on Anthropic's supported list for Claude.ai and API (sec. 5, Q4, Corrections 4, Visual 7) | CONFIRMED | Page "Supported countries & regions" for "Commercial API access and Claude.ai" lists Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan; Russia and Belarus absent. | https://www.anthropic.com/supported-countries |
| 18 | Data retention 5 years (training on) / 30 days (off); Team/Enterprise/API not trained on by default (sec. 5, Q16, day 0) | CONFIRMED | "Users who allow data use for model improvement: 5-year retention period"; "Users who don't allow ...: 30-day retention period"; settings at claude.ai/settings/data-privacy-controls; commercial users: Anthropic "does not train generative models using code or prompts sent to Claude Code under commercial terms" unless opted in. | https://code.claude.com/docs/en/data-usage |
| 19 | Mentimeter Free capped at 50 participants per month (I1, Corrections 9) | CONFIRMED | "If your account is on a Free plan, you will be able to engage up to 50 participants per month." | https://help.mentimeter.com/en/articles/465589-how-many-people-can-participate-in-a-mentimeter-presentation |
| 20 | Anthropic cost figures: about 13 USD per developer per active day, 150–250 USD/month; five-hour + weekly windows; TPM warning for live training (sec. 4, Q5, Corrections 12) | CONFIRMED | "average cost is around $13 per developer per active day and $150-250 per developer per month"; seat allowance "resets on a rolling five-hour window and a weekly window"; "live training sessions with large groups ... may need higher TPM allocations per user". | https://code.claude.com/docs/en/costs |
| 21 | Artifacts on Free; setting "Code execution and file creation"; Free can create and share; persistent storage paid-only (4.1, sec. 5) | CORRECTED (share = UNVERIFIED) | "Artifacts are available on Free, Pro, Max, Team, and Enterprise plans"; setting is "Code execution and file creation" in Settings > Capabilities; "Persistent storage for artifacts is available on Pro, Max, Team, and Enterprise plans". The article does not address publishing a public link from Free; marked UNVERIFIED, test before the event. | https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them |
| 22 | Desktop Code tab, Local -> Select folder, no terminal/Node; modes Manual/Auto/Plan (4.2, I6, Q9, Q15) | CONFIRMED, one addition | "No terminal required"; "You don't need to install Node.js or the CLI separately"; "Select Local ... Click Select folder"; modes are Auto ("a classifier reviews actions in the background and blocks the risky ones"), Manual, Accept edits, Plan. Added "Accept edits" and the operational warning below. | https://code.claude.com/docs/en/desktop-quickstart |
| 23 | Best-practices commands: Shift+Tab plan mode; Esc twice or /rewind; checkpoints not a git replacement; explore/plan/implement/commit; two failed corrections -> /clear; /init; gh CLI (sec. 0, 2.1, 4.2, Q10–12, Q17) | CONFIRMED, one addition | All present verbatim. New fact relevant to I6/Demo 2: "On Pro, Max, and Team plans, auto mode is the built-in starting permission mode for interactive terminal and VS Code sessions", so permission prompts only appear after switching to Manual. Added to I6 and Demo 2 Step 4. | https://code.claude.com/docs/en/best-practices |
| 24 | Willison 19 Mar 2025: vibe coding = not reviewing the code, fine for low stakes; explain-every-line rule (sec. 2, 2.1, Q20, Corrections 8) | CONFIRMED (paraphrase is fair) | "building software with an LLM without reviewing the code it writes"; "not too bad for throwaway weekend projects"; golden rule: won't commit code "if I couldn't explain exactly what it does to somebody else". | https://simonwillison.net/2025/Mar/19/vibe-coding/ |
| 25 | Multilingual benchmark: 14 languages, no Kazakh/Russian, Yoruba about 80% of English on Sonnet 4.5; use native script (Q13) | CONFIRMED | Table has English + 14 languages ("translated into 14 additional languages"); Yoruba 79.7% on Sonnet 4.5 (52.7% on Haiku 4.5); no Kazakh or Russian row; "Submit text in its native script rather than transliteration". | https://platform.claude.com/docs/en/build-with-claude/multilingual-support |
| 26 | Netlify Drop: password-protected until claimed, build needs login, under 50 MB (4.3, Q23, Corrections 10) | CONFIRMED (precision) | "Deploys under 50MB work best"; files over 10 MB may get stuck; URL "protected with a temporary password until you claim it"; "Netlify only builds your project for you when you're signed in". | https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/ |
| 27 | Antigravity 0 USD Individual plan with "basic weekly rate limits"; Lovable Free 5 credits/day, 30/month; Bolt Free 300K tokens/day, 1M/month; Cursor students page no free year; Astana Hub bootcamp 23–25 Sep; PLOS 1 helper per 10; Learning output style TODO(human); cloud sessions research preview Pro/Max/Team (sec. 0, 5, 6, Q7, Q25, Corrections 11) | CONFIRMED (Astana Hub title corrected) | Antigravity: "For Individuals ... $0/month", "Basic weekly rate limits". Lovable: "daily grant of 5 build credits (up to 30 a month)", lovable.dev/students. Bolt: "daily cap of 300K", "1 million monthly cap". Cursor: "look out for promotions at our on-campus and online events starting this fall". Astana Hub: event is titled "VIBE CODING: how to create websites and services without knowing the code", SKO Hub, Petropavlovsk, 23–25 Sep, 16:00 (file said "Vibe Coding Bootcamp"; fixed). PLOS: "around 1 helper for each 10 students". Output styles: Learning adds "TODO(human) markers", switch with `/output-style <style>`. Cloud: "research preview for Pro, Max, and Team users". | https://antigravity.google/pricing ; https://lovable.dev/pricing ; https://support.bolt.new/account-and-subscription/tokens ; https://cursor.com/students ; https://astanahub.com/en/event/ ; https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1008090 ; https://code.claude.com/docs/en/output-styles ; https://code.claude.com/docs/en/claude-code-on-the-web |

Not re-checked in this pass (left with their original tags): Carpentries live-coding and instructor-notes pages, Brown & Wilson 2018, Teaching Tech Together, Bradbury 2016, the 65labs/AOL article, the Cursor Luma event page, the Google AI Studio Build page, the Gemini CLI quota page and GitHub discussion, the Qwen Code and Kilo.ai claim, the paulbreit.com card-payment guide (already UNVERIFIED), Open-Meteo (already UNVERIFIED), HackNU, Vercel Hobby and GitHub Pages docs (already [S]).
