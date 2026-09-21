# Origin and evolution of "vibe coding" (2023 -> Sep 2026)

Research date: 21 Sep 2026. Author: research agent (origin-history).

Method notes
- x.com returns HTTP 402 to the fetcher, so tweet text, timestamps and counters were read through the FxTwitter JSON mirror (`https://api.fxtwitter.com/<user>/status/<id>`), which proxies the public X API. Counters are "as of 21 Sep 2026". Canonical x.com URLs are given for screenshots.
- VERIFIED = I opened the source (or the FxTwitter mirror of it) during this session. UNVERIFIED = from a search snippet, a secondary source I could not open, or my own memory.
- Quotes are kept under 15 words. Everything else is paraphrase.
- The web-search budget for the session ran out midway; June-Sep 2026 coverage was completed by opening TechCrunch tag pages, Simon Willison's tag pages, HN Algolia API, AP/NBC wire copies.

---

## 1. The one-paragraph story (use this as the spine of the talk)

A throwaway tweet (2 Feb 2025) named a feeling: you talk to an AI, accept everything, never read the code, and it "mostly works". Within 9 months it was Collins Word of the Year. Within 12 months its author said professionals now do something stricter, which he calls "agentic engineering": you still do not type the code, but you own the spec, the review, the tests and the quality. By Sep 2026 the term is in Merriam-Webster proper, the tool named in the original tweet (Cursor) has been bought for $60B, and the author works at Anthropic. The teaching point: **vibe coding raised the floor (anyone can build); agentic engineering raises the ceiling (professionals build more, without lowering quality). The masterclass should teach both, and teach people to know which mode they are in.**

---

## 2. The primary sources, exactly

### 2.1 The "English" tweet (pre-history) - VERIFIED
- URL: https://x.com/karpathy/status/1617979122625712128
- Posted: Tue 24 Jan 2023, 20:14:18 UTC.
- Full text (7 words): "The hottest new programming language is English"
- Counters on 21 Sep 2026: 12,893,539 views; 73,187 likes; 8,916 reposts; 2,305 replies; 7,132 bookmarks.
- History of the phrase: https://quoteinvestigator.com/2024/10/20/hottest-program/ (UNVERIFIED - not opened; appeared in search results).

### 2.2 The vibe coding tweet - VERIFIED
- URL: https://x.com/karpathy/status/1886192184808149383
- Posted: Sun 2 Feb 2025, 23:17:15 UTC (= 3 Feb 2025, 04:17 in Almaty/Astana, UTC+5). Source client: Twitter Web App. Length: 997 characters.
- Counters on 21 Sep 2026: **7,359,582 views**; 34,142 likes; 3,629 reposts; 1,472 replies; 17,837 bookmarks.
- Opening words (exact): "There's a new kind of coding I call \"vibe coding\"" and then "fully give in to the vibes, embrace exponentials, and forget that the code even exists."
- What the rest says (paraphrase, with exact fragments):
  - Tooling named: "Cursor Composer w Sonnet"; he dictates with SuperWhisper and barely touches the keyboard.
  - He asks for trivial things - exact example: "decrease the padding on the sidebar by half" - because he is too lazy to find them.
  - "I \"Accept All\" always, I don't read the diffs anymore."
  - Error messages get pasted back with no comment; usually that fixes it.
  - Code grows beyond his usual comprehension; unfixable bugs get worked around or hit with random changes.
  - Scope limiter that everyone forgets: "It's not too bad for throwaway weekend projects".
  - Closing image: "I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."
- Three things the original definition contains that later usage dropped: (a) not reading the code, (b) throwaway/weekend scope, (c) voice input. Collins kept none of them.

### 2.3 MenuGen blog post (first real vibe-coded app by Karpathy) - VERIFIED
- URL: https://karpathy.bearblog.dev/vibe-coding-menugen/ - 27 Apr 2025.
- App: photograph a restaurant menu, get generated pictures of each dish.
- Lessons: local prototype felt done but was ~20% of the work; most effort went into non-code configuration (Vercel, Clerk auth, Stripe payments, API keys, env vars); LLM knowledge of APIs was outdated and hallucinated deprecated calls.
- Exact (fact-checked 21 Sep 2026; original is lower-case mid-sentence): "vibe coding full web apps today is kind of messy" - the sentence continues that it is not a good idea for anything of actual importance. Also exact: "I felt like I was 80% done but (foreshadowing...) it was a bit closer to 20%."
- Teaching use: the gap between "demo on localhost" and "deployed product with auth and payments" is where beginners die. Same example returns in the 2025 YC talk and the 2026 Sequoia talk (where the whole app collapses into one multimodal model call).

### 2.4 YC AI Startup School talk "Software Is Changing (Again)" - VERIFIED
- YouTube: https://www.youtube.com/watch?v=LCEmiRjPEtQ (title "Andrej Karpathy: Software Is Changing (Again)", channel Y Combinator - verified through YouTube oEmbed; view count not retrievable by fetcher - UNVERIFIED).
- YC library page: https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again
- Delivered: 17 Jun 2025, YC AI Startup School (Latent Space write-up https://www.latent.space/p/s3 is dated 17 Jun 2025 and calls it "Andrej's talk at YC AI Startup School 2025"; it does NOT name a city - San Francisco is UNVERIFIED from that source). YC library page shows no date to the fetcher. Video announced by Karpathy on X on 19 Jun 2025 02:01 UTC: https://x.com/karpathy/status/1935518272667217925 (1,269,976 views; 8,845 likes on 21 Sep 2026).
- Slides (Google Slides, linked from Latent Space): https://docs.google.com/presentation/d/1sZqMAoIJDxz79cbC5ap5v9jknYH4Aa9cFFaWL8Rids4/edit?usp=sharing
- Chapters as Karpathy listed them in the announcement tweet:
  - 0:00 software is changing fundamentally again; LLMs are a new kind of computer programmed "in English".
  - 6:06 LLMs have properties of utilities, fabs and operating systems; "we are computing circa ~1960s".
  - 14:39 LLM psychology: "people spirits", stochastic simulations of people; superhuman in some ways, fallible in others.
  - 18:16 partially autonomous products.
  - 29:05 English as programming language makes software accessible - "(yes, vibe coding)".
  - 33:36 LLMs are a new consumer of digital information - "Build for agents!"
- Framework:
  - Software 1.0 = code humans write. Software 2.0 = neural-net weights (his Nov 2017 essay "Software 2.0", https://karpathy.medium.com/software-2-0-a64152b37c35 - UNVERIFIED URL, not opened). Software 3.0 = prompts in English that program an LLM.
- Metaphors worth a slide each (from Latent Space notes, VERIFIED there):
  - LLM as utility (metered, outages = "intelligence brownouts"), as fab (huge capex), as operating system (closed vs open, apps on top), in a 1960s time-sharing era.
  - "People spirits" with jagged intelligence and anterograde amnesia (no memory beyond context window).
  - Iron Man suit: build augmentation with an **autonomy slider** (Cursor: Tab -> Cmd+K -> Cmd+L -> agent), not fully autonomous robots.
  - Keep the **generation -> verification loop** fast; keep the AI "on a leash"; small diffs.
  - "Demo is works.any(), product is works.all()".
  - Build for agents: llms.txt, docs in markdown, replace "click here" with curl commands.
  - Exact closing framing: "This is the Decade of Agents" (not "year of agents").

### 2.5 The Dwarkesh interview and nanochat (the counter-swing) - VERIFIED
- Dwarkesh Podcast, "Andrej Karpathy - AGI is still a decade away", 17 Oct 2025: https://www.dwarkesh.com/p/andrej-karpathy
  - Says "decade of agents"; current agents "just don't work" well enough yet; for novel code the models "kept misunderstanding the code"; he preferred autocomplete to agents for that repo.
- nanochat reply tweet, 13 Oct 2025 15:27 UTC: https://x.com/karpathy/status/1977758204139331904 (488,196 views). Exact: "it's basically entirely hand-written (with tab autocomplete)". He tried Claude/Codex agents and found them net unhelpful on that repo, possibly because it was too far off the training distribution.
- Teaching use: eight months after coining vibe coding, its author hand-wrote his flagship repo. Tool choice depends on how novel the code is.

### 2.6 December 2025: the threshold - VERIFIED
- 2025 LLM Year in Review, 19 Dec 2025: https://karpathy.bearblog.dev/year-in-review-2025/ - six shifts: RLVR; ghosts vs animals / jagged intelligence; Cursor as new app layer; Claude Code ("AI on your computer"); vibe coding; Nano Banana / LLM GUI. On Claude Code, exact: "the first convincing demonstration of what an LLM Agent looks like". On vibe coding, exact: "programming is not strictly reserved for highly trained professionals" - and, in the same section, it also lets trained professionals write far more (vibe coded) software that would otherwise never be written; he calls the original tweet a "shower of thoughts tweet" here too.
- "Behind" tweet, 26 Dec 2025 17:36 UTC: https://x.com/karpathy/status/2004607146781278521 - **17,066,227 views**, 55,334 likes (21 Sep 2026). Exact opening: "I've never felt this much behind as a programmer." HN thread: https://news.ycombinator.com/item?id=46407732
- "Notes from Claude coding" tweet, 26 Jan 2026 20:25 UTC: https://x.com/karpathy/status/2015883857489522876 - 7,848,443 views; 40,733 likes; 36,991 bookmarks. Key fact: he went from ~80% manual+autocomplete / 20% agents in November 2025 to 80% agent coding / 20% edits in December 2025. Other points: models make subtle conceptual errors and wrong assumptions without asking; tenacity ("they never get tired"); leverage comes from giving success criteria and tests first; he notices his manual coding skill atrophying; predicts 2026 as year of the "slopacolypse". (Readable copy: https://www.pixelsham.com/2026/01/27/andrej-karpathy-a-few-random-notes-from-claude-coding-quite-a-bit-last-few-weeks/)

### 2.7 The "agentic engineering" post - VERIFIED
- URL: https://x.com/karpathy/status/2019137879310836075
- Posted: Wed 4 Feb 2026, 19:55:58 UTC - a quote-tweet retrospective on the one-year anniversary. Counters 21 Sep 2026: 1,298,664 views; 8,781 likes; 811 reposts; 2,954 bookmarks.
- What he says (paraphrase + exact fragments):
  - The original was "a shower of thoughts throwaway tweet"; after 17 years on Twitter he still cannot predict engagement; vibe coding is now on his Wikipedia page and its article is longer than his.
  - In Feb 2025 LLMs were weak enough that vibe coding was for fun throwaway projects and "it almost worked".
  - One year later, programming through LLM agents is becoming a default professional workflow, with more oversight. Goal: claim the leverage "without any compromise on the quality of the software".
  - Naming, exact: "personally my current favorite \"agentic engineering\"".
  - "agentic" because "you are not writing the code directly 99% of the time" - you orchestrate agents and act as oversight.
  - "engineering" because there is "an art & science and expertise to it" that can be learned.
  - Expects 2026 gains on both the model layer and the new agent layer.
- Note what he does NOT say: he does not say vibe coding is dead, and the word "passé" does not appear in the post. He says others have been hunting for a better name and this is his "current favorite" - he does not claim to have coined it.

### 2.8 Sequoia AI Ascent 2026 fireside chat - VERIFIED
- YouTube: https://www.youtube.com/watch?v=96jN2OCOfLs - title "Andrej Karpathy: From Vibe Coding to Agentic Engineering w/ Stephanie Zhan", channel Sequoia Capital (verified via oEmbed).
- His own written summary, 30 Apr 2026: https://karpathy.bearblog.dev/sequoia-ascent-2026/
- His X summary, 30 Apr 2026 17:28 UTC: https://x.com/karpathy/status/2049903821095354523 (1,320,273 views). Says the chat happened "a ~week ago" -> roughly 22-24 Apr 2026 (exact event date UNVERIFIED).
- Core lines from the blog summary:
  - Vibe coding "raises the floor"; agentic engineering "raises the ceiling" while preserving quality, security, maintainability. Agentic engineers design specs, supervise plans, inspect diffs.
  - December 2025 was a step change: generated chunks became larger, more coherent, more reliable; the unit of work moved from lines to macro actions ("implement this feature").
  - Software 3.0 restated: the context window is the main lever; the LLM is an interpreter over that context.
  - Exact: "You can outsource your thinking, but you can't outsource your understanding."
  - Verifiability: classical software automates what you can specify; LLMs + RL automate what you can verify. Jaggedness = verifiability x training attention x data coverage x economic value.
  - Three "new horizon" examples from the X post: MenuGen collapsing into one model call; ".md skills" instead of .sh install scripts; LLM knowledge bases over unstructured data. Jaggedness example: a model can refactor a 100,000-line codebase and also tell you to walk to the car wash.
  - Last theme: "agent-native economy", agentic engineering skill set and hiring.

### 2.9 Karpathy joins Anthropic - VERIFIED
- X post, Tue 19 May 2026 15:05 UTC: https://x.com/karpathy/status/2056753169888334312 - **28,015,767 views**, 149,312 likes. Exact: "Personal update: I've joined Anthropic." Says he wants to get back to R&D, stays passionate about education and plans to resume it later.
- TechCrunch, 19 May 2026 (Rebecca Bellan, Lorenzo Franceschi-Bicchierai): https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/ - pre-training team under Nick Joseph; he leads a team using Claude to accelerate pre-training research; future of Eureka Labs unclear.

---

## 3. Simon Willison: the definitional counterweight

All VERIFIED on simonwillison.net.

1. **19 Mar 2025 - "Not all AI-assisted programming is vibe coding (but vibe coding rocks)"** https://simonwillison.net/2025/Mar/19/vibe-coding/
   - Narrow definition: vibe coding = building software with an LLM *without reviewing the code it writes*.
   - Golden rule: do not commit code you could not explain to someone else. If you reviewed, tested and understood it, that is not vibe coding, it is software development.
   - Pro-vibe-coding too: great for beginners and for building intuition; keep it low-stakes; watch secrets, private data and billable APIs.
2. **11 Mar 2025 - "Here's how I use LLMs to help me write code"** https://simonwillison.net/2025/Mar/11/using-llms-for-code/ (linked from the above; not opened - UNVERIFIED content).
3. **7 Oct 2025 - "Vibe engineering"** https://simonwillison.net/2025/Oct/7/vibe-engineering/
   - Proposed name for the professional end: seasoned engineers accelerating with LLMs while staying accountable for what they ship.
   - Lists what coding agents reward: automated tests, planning in advance, documentation, good version control habits, CI/CD automation, code review culture, management skill, manual QA, research skills, preview environments, judgment on what to outsource, better estimation. Thesis: LLMs amplify existing expertise.
4. **11 Feb 2026 - "GLM-5: From Vibe Coding to Agentic Engineering"** https://simonwillison.net/2026/Feb/11/glm-5/ - notes Z.ai put the phrase in a model launch title and that "agentic engineering" was showing up from several people, most notably Karpathy, also Addy Osmani. (Z.ai post: https://z.ai/blog/glm-5; HN: https://news.ycombinator.com/item?id=46977210, 378 points but only 8 comments - the main discussion of the same URL ran under the title "GLM-5: Targeting complex systems engineering and long-horizon agentic tasks", https://news.ycombinator.com/item?id=46974853, 484 points / 520 comments. Both VERIFIED via HN Algolia API, 21 Sep 2026.)
5. **23 Feb 2026 - "Writing about Agentic Engineering Patterns"** https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/ - he drops his own "vibe engineering" and adopts "agentic engineering". Defines it as building software with coding agents (Claude Code, OpenAI Codex) whose defining feature is that they both generate and execute code.
   - Guide: https://simonwillison.net/guides/agentic-engineering-patterns/ - chapters: Principles (What is agentic engineering?; Writing code is cheap now; Hoard things you know how to do; AI should help us produce better code; Anti-patterns) / Working with coding agents (How coding agents work; Using Git; Subagents) / Testing and QA (Red/green TDD; First run the tests; Agentic manual testing) / Understanding code (Linear walkthroughs; Interactive explanations) / Annotated prompts / Appendix.
   - Chapter definition: https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/ - exact: "Agents run tools in a loop to achieve a goal". Vibe coding = unreviewed, prototype-quality LLM code.
6. **6 May 2026 - "Vibe coding and agentic engineering are getting closer than I'd like"** https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/ (from Heavybit's High Leverage podcast ep. 9). He admits that as agents got more reliable he stopped reviewing every line even for production, which blurs his own distinction; the bottleneck moves from writing code to design and evaluation. HN: https://news.ycombinator.com/item?id=48037128 - 787 points, 885 comments (second-biggest "vibe coding" HN thread ever).
7. **8 Jul 2026 - "Rewriting Bun in Rust"** https://simonwillison.net/2026/Jul/8/rewriting-bun-in-rust/ - Jarred Sumner ported Bun from Zig to Rust with parallel Claude agents: 11 days for the initial port, a PR with "+1 million lines added", "around $165,000 at API pricing" (5.9B uncached input tokens + 72B cached input token reads / 690M output tokens - the file's earlier "5.9B input" omitted the cached reads), validated by the existing language-independent test suite plus adversarial review. Used as the showcase of agentic engineering that is *not* vibe coding.
8. Tag pages to mine for fresh examples: https://simonwillison.net/tags/vibe-coding/ and https://simonwillison.net/tags/agentic-engineering/ (63 posts on 21 Sep 2026). Recent: 31 Aug 2026 "Introducing wrapture" (entirely agent-written yet carefully engineered); 22 Aug 2026 "More than just code review"; 11 Sep 2026 Boris Cherny on guardrails for Claude-written production code at Anthropic; 14 Sep 2026 Laurie Voss quote that the cost of writing code collapsed.

Three definitions to put side by side on one slide:
- Karpathy (Feb 2025): forget the code exists, accept all, weekend projects.
- Willison (Mar 2025): any LLM-built software whose code you did not review.
- Collins (Nov 2025): using AI prompted by natural language to write code (no mention of review at all).
The public meaning drifted from "a reckless-but-fun mode" to "any AI coding". That drift is why a second term was needed.

---

## 4. Dictionaries and mainstream press

- **Merriam-Webster "Slang & Trending"**, dated 8 Mar 2025 (date per Wikipedia citation): https://www.merriam-webster.com/slang/vibe-coding - page could not be opened by fetcher (socket closed) - definition text UNVERIFIED.
- **Collins Word of the Year 2025**, announced 6 Nov 2025. Blog post by Rachel Quin: https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/ - VERIFIED. Definition: "the use of artificial intelligence prompted by natural language to write computer code". Shortlist: vibe coding, aura farming, taskmasking, broligarchy, biohacking, HENRY, micro-retirement, coolcation, glaze, clanker. Landing page: https://www.collinsdictionary.com/woty
  - Coverage: CNN 6 Nov 2025 https://www.cnn.com/2025/11/06/tech/vibe-coding-collins-word-year-scli-intl (HTTP 451 to fetcher - UNVERIFIED content); The Conversation https://theconversation.com/slop-vibe-coding-and-glazing-ai-dominates-2025s-words-of-the-year-269688 (UNVERIFIED, not opened). Merriam-Webster's own 2025 Word of the Year was "slop" (per CodeRabbit history post, secondary - UNVERIFIED at source).
- **Merriam-Webster full dictionary entry, Sep 2026** - VERIFIED via three wire/news copies (fact-checked 21 Sep 2026): "vibe coding" is among 1,400 new words and definitions added to the online dictionary. Announced on merriam-webster.com on **Tuesday 15 Sep 2026** (NBC, dated 16 Sep: it "announced the additions on its website Tuesday"; iHeart names "Tuesday (September 15)").
  - CP24, 19 Sep 2026, byline Archie Niari "with files from Anna Furman, The Associated Press" (not a pure AP wire): https://www.cp24.com/news/world/2026/09/19/merriam-webster-adds-1400-words-from-glow-up-to-trash-panda/ - exact: "'Vibe coding' describes using an AI system to generate computer code" and says "AGI" also got an entry. Does not mention "compute".
  - NBC News, Matt Lavietes, 16 Sep 2026: https://www.nbcnews.com/news/us-news/merriam-webster-gives-dictionary-glow-1400-new-words-definitions-rcna598097 - lists "parasocial," "compute," "vibe coding" and "superfood" among the additions. Does not mention "AGI".
  - iHeart, 16 Sep 2026: https://www.iheart.com/content/2026-09-16-merriam-webster-adds-1400-words-in-major-dictionary-update/ - names all three: "compute" (as a noun for computational resources), "AGI", "vibe coding".
  - So "AGI" rests on CP24 + iHeart, "compute" on NBC + iHeart. Merriam-Webster's own pages (entry https://www.merriam-webster.com/dictionary/vibe%20coding and the new-words announcement https://www.merriam-webster.com/wordplay/new-words-in-the-dictionary) could not be opened by the fetcher (socket closed) - the exact M-W definition wording is UNVERIFIED; on a slide, quote the AP-derived gloss and attribute it to the press copy, or screenshot the live entry.
- **NYT, Kevin Roose, 27 Feb 2025**, "Not a Coder? With A.I., Just Having an Idea Can Be Enough" - the piece that took the term mainstream; "software for one"; notes errors, including an AI that made up fake reviews. URL (UNVERIFIED, paywalled): https://www.nytimes.com/2025/02/27/technology/personaltech/vibecoding-ai-software-programming.html . Facts confirmed via Wikipedia https://en.wikipedia.org/wiki/Vibe_coding.
- **TechCrunch, Ivan Mehta, 6 Mar 2025** - VERIFIED (re-checked 21 Sep 2026): https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated - YC managing partner **Jared Friedman** (not Garry Tan) said a quarter of the W25 batch had ~95% AI-generated codebases; from the YC video "Vibe Coding Is the Future". Garry Tan (YC CEO) is on the same panel and is quoted separately, saying founders still need classical coding training to sustain products - which is why the statistic gets misattributed to him.
- **MIT Technology Review, Rhiannon Williams, 16 Apr 2025**, "What is vibe coding, exactly?" - VERIFIED: https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/ - good for low-stakes prototypes; cites the "Leo" case (Cursor-built SaaS attacked after he bragged about it).
- **Ars Technica, Benj Edwards, 5 Mar 2025**, "Will the future of software development run on vibes?" https://arstechnica.com/ai/2025/03/is-vibe-coding-with-ai-gnarly-or-reckless-maybe-some-of-both/ - UNVERIFIED (domain blocked for fetcher).
- **Business Insider, 4 Jun 2025** - Andrew Ng calls it a bad name for "a very real and exhausting job" (title per Wikipedia citation; URL UNVERIFIED).
- **WSJ, Jul 2025**, "Vibe Coding Has Arrived for Businesses"; **WSJ, 22 May 2026**, "The AI Superstars Who Say a 'Vibe Slop' Crisis Is Coming" (titles per Wikipedia citations; URLs UNVERIFIED).
- **NYT opinion/explainer by Paul Ford, Feb 2026** - Ford's follow-up reflection linked by Willison 23 Feb 2026: https://simonwillison.net/2026/Feb/23/paul-ford/ (NYT title/URL UNVERIFIED).
- **The New Stack (2026)**, headline "Vibe coding is passé. Karpathy has a new name for the future of software." https://thenewstack.io/vibe-coding-is-passe/ - headline VERIFIED, body not retrievable. "Passé" is the outlet's word; see corrections.
- **Forbes, Jodie Cook, 12 Jun 2026**, "Is Vibe Coding Already Dead? Even Karpathy Is Moving On" https://www.forbes.com/sites/jodiecook/2026/06/12/is-vibe-coding-already-dead-even-karpathy-is-moving-on/ - UNVERIFIED (403).
- **Reuters Breakingviews, 18 Aug 2026**, "Vibe coding is a low-key threat to software firms" https://www.breakingviews.com/columns/considered-view/vibe-coding-is-low-key-threat-software-firms-2026-08-18/ - headline only (401).
- **Wikipedia**: https://en.wikipedia.org/wiki/Vibe_coding - VERIFIED; as of 21 Sep 2026 the article does not mention "agentic engineering".

---

## 5. Dated timeline, 2017 -> Sep 2026

Legend: [V] verified this session, [U] unverified.

**Pre-history**
- Nov 2017 - Karpathy publishes "Software 2.0" (neural nets as a new way to write software). [U] https://karpathy.medium.com/software-2-0-a64152b37c35
- 24 Jan 2023 - Karpathy: "The hottest new programming language is English". 12.9M views today. [V] https://x.com/karpathy/status/1617979122625712128
- 16 Jul 2024 - Karpathy founds Eureka Labs (AI-native education). [V via Wikipedia] https://en.wikipedia.org/wiki/Andrej_Karpathy

**2025 - the word is born and goes mainstream**
- 2 Feb 2025 (23:17 UTC) - the vibe coding tweet. 7.36M views today. [V] https://x.com/karpathy/status/1886192184808149383
- Late Feb 2025 - Claude Code released, about three weeks after the tweet (per Willison's guide chapter). [V for "three weeks"; exact day 24 Feb 2025 U] https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/
- 27 Feb 2025 - Kevin Roose in NYT brings the term to a general audience. [V via Wikipedia] https://en.wikipedia.org/wiki/Vibe_coding
- 6 Mar 2025 - YC: a quarter of W25 startups have ~95% AI-generated code (Jared Friedman). [V] https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated
- 8 Mar 2025 - Merriam-Webster lists it under Slang & Trending. [U] https://www.merriam-webster.com/slang/vibe-coding
- 19 Mar 2025 - Willison draws the line: no review = vibe coding; reviewed = software development. [V] https://simonwillison.net/2025/Mar/19/vibe-coding/
- 22 Mar 2025 - HN: "\"Vibe Coding\" vs. Reality" (221 points, 297 comments). [V] https://news.ycombinator.com/item?id=43448432
- 16 Apr 2025 - MIT Technology Review explainer. [V] https://www.technologyreview.com/2025/04/16/1115135/what-is-vibe-coding-exactly/
- 19 Apr 2025 - Addy Osmani: "Vibe Coding is not an excuse for low-quality work" (HN 259 points). [V via HN API] https://addyo.substack.com/p/vibe-coding-is-not-an-excuse-for
- 27 Apr 2025 - Karpathy's MenuGen post: deployment, auth, payments are the hard 80%. [V] https://karpathy.bearblog.dev/vibe-coding-menugen/
- May 2025 - Lovable-built apps: 170 of 1,645 scanned apps exposed data through missing access controls. [V via Wikipedia] https://en.wikipedia.org/wiki/Vibe_coding
- 4 Jun 2025 - Andrew Ng objects to the name. [U - via Wikipedia citation]
- 5 Jun 2025 - Cursor maker Anysphere: $9.9B valuation, >$500M ARR. [V headline] https://techcrunch.com/2025/06/05/cursors-anysphere-nabs-9-9b-valuation-soars-past-500m-arr/
- 17 Jun 2025 - Karpathy's YC AI Startup School talk "Software Is Changing (Again)" (Software 3.0). Video announced 19 Jun 02:01 UTC (= evening of 18 Jun, US Pacific). [V] https://www.youtube.com/watch?v=LCEmiRjPEtQ ; https://x.com/karpathy/status/1935518272667217925 ; https://www.latent.space/p/s3
- 10 Jul 2025 - METR RCT: 16 experienced open-source developers, 246 issues; with AI tools they "take 19% longer to complete issues", while they had expected a 24% speedup and afterwards still believed they had been sped up by 20%. [V at primary source, 21 Sep 2026] https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- Jul 2025 - Replit agent deletes a production database despite instructions not to. [V via Wikipedia] same URL
- Jul 2025 - WSJ: "Vibe Coding Has Arrived for Businesses". [U]
- 7 Oct 2025 - Willison proposes "vibe engineering" for the professional end. [V] https://simonwillison.net/2025/Oct/7/vibe-engineering/
- 13 Oct 2025 - Karpathy: nanochat was "basically entirely hand-written"; agents were net unhelpful there. [V] https://x.com/karpathy/status/1977758204139331904
- 17 Oct 2025 - Dwarkesh interview: "decade of agents", agents not there yet. [V] https://www.dwarkesh.com/p/andrej-karpathy
- Oct 2025 - Veracode: LLM code got more functional but not more secure. [V via Wikipedia]
- 6 Nov 2025 - **Collins Word of the Year 2025: vibe coding.** [V] https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/
- 13 Nov 2025 - Cursor raises $2.3B. [V headline] https://techcrunch.com/2025/11/13/coding-assistant-cursor-raises-2-3b-5-months-after-its-previous-round/
- 19 Nov 2025 - Lovable hits $200M ARR. [V headline] https://techcrunch.com/2025/11/19/as-lovable-hits-200m-arr-its-ceo-credits-staying-in-europe-for-its-success/
- Dec 2025 - CodeRabbit: AI co-authored PRs have ~1.7x more major issues. [V via Wikipedia]
- 18 Dec 2025 - Lovable raises $330M at $6.6B. [V headline] https://techcrunch.com/2025/12/18/vibe-coding-startup-lovable-raises-330m-at-a-6-6b-valuation/
- 19 Dec 2025 - Karpathy's 2025 Year in Review names Claude Code and vibe coding among six paradigm shifts. [V] https://karpathy.bearblog.dev/year-in-review-2025/
- 26 Dec 2025 - "I've never felt this much behind as a programmer." 17.1M views. [V] https://x.com/karpathy/status/2004607146781278521

**2026 - from vibes to engineering**
- 12 Jan 2026 - ZDNET: Linus Torvalds vibe-codes a Python visualizer with Google Antigravity. [V via Wikipedia citation]
- 26 Jan 2026 - Karpathy's Claude Code notes: 80/20 flipped to agents in December; "slopacolypse" warning. 7.8M views. [V] https://x.com/karpathy/status/2015883857489522876
- 26 Jan 2026 - HN's biggest vibe coding thread: "After two years of vibecoding, I'm back to writing by hand" (865 points, 634 comments). [V via HN API] https://news.ycombinator.com/item?id=46765460 ; same day: arXiv "Vibe coding kills open source" https://arxiv.org/abs/2601.15494 (HN 330 points).
- 28 Jan 2026 - LinkedIn adds vibe coding certificates. [V headline] https://techcrunch.com/2026/01/28/linkedin-will-let-you-show-off-your-vibe-coding-chops-with-a-certificate/
- 4 Feb 2026 - **Karpathy's anniversary post: "agentic engineering".** [V] https://x.com/karpathy/status/2019137879310836075
- 11 Feb 2026 - Z.ai titles its launch "GLM-5: From Vibe Coding to Agentic Engineering". [V] https://z.ai/blog/glm-5 ; https://simonwillison.net/2026/Feb/11/glm-5/
- 12 Feb 2026 - GitHub blog: "Welcome to the Eternal September of open source" (AI-generated contribution flood). [V via Wikipedia citation]
- 13 Feb 2026 - fast.ai "Breaking the spell of vibe coding" on HN (434 points). [V via HN API] https://www.fast.ai/posts/2026-01-28-dark-flow/
- 15 Feb 2026 - "Cognitive debt" (Margaret-Anne Storey) enters the vocabulary via Willison. [V] https://simonwillison.net/2026/Feb/15/cognitive-debt/
- 23 Feb 2026 - Willison adopts "agentic engineering", starts the Patterns guide. [V] https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/
- 2 Mar 2026 - Cursor reportedly passes $2B annualized revenue. [V headline] https://techcrunch.com/2026/03/02/cursor-has-reportedly-surpassed-2b-in-annualized-revenue/
- 5 Mar 2026 - CodeRabbit publishes "A semantic history" of the term. [V] https://www.coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod
- 9 Mar 2026 - Anthropic launches a code review tool for the flood of AI-generated code. [V headline] https://techcrunch.com/2026/03/09/anthropic-launches-code-review-tool-to-check-flood-of-ai-generated-code/
- 11 Mar 2026 - Replit valued at $9B, six months after $3B. [V headline] https://techcrunch.com/2026/03/11/replit-snags-9b-valuation-6-months-after-hitting-3b/
- 6 Apr 2026 - Bram Cohen: "The cult of vibe coding is dogfooding run amok" (HN 616 points). [V via HN API] https://bramcohen.com/p/the-cult-of-vibe-coding-is-insane
- 21 Apr 2026 - SpaceX partners with Cursor and takes an option to buy it for $60B (or pay Cursor $10B instead - TechCrunch's June piece calls this a break-up fee). TechCrunch (Tim Fernholz) says Cursor "was eyeing a $50 billion valuation in an upcoming private fundraising round"; the round SIZE ("$2B") in the earlier draft of this file is NOT in the article - UNVERIFIED, removed. Valuation path per the same article: $2.5B (Jan 2025) -> $9B (May 2025) -> $29.3B post-money after the $2.3B Series D (Nov 2025). [V body] https://techcrunch.com/2026/04/21/spacex-is-working-with-cursor-and-has-an-option-to-buy-the-startup-for-60-billion/
- ~23 Apr 2026 - Sequoia AI Ascent fireside: "From Vibe Coding to Agentic Engineering" (floor vs ceiling). Summary posted 30 Apr. [V] https://www.youtube.com/watch?v=96jN2OCOfLs ; https://karpathy.bearblog.dev/sequoia-ascent-2026/
- 28 Apr 2026 - Lovable ships iOS and Android apps; Replit still blocked by Apple (1 May interview). [V] https://techcrunch.com/2026/04/28/lovable-launches-its-vibe-coding-app-on-ios-and-android/ ; https://techcrunch.com/2026/05/01/replits-amjad-masad-on-the-cursor-deal-fighting-apple-and-why-hed-rather-not-sell/
- 6 May 2026 - Willison: vibe coding and agentic engineering "are getting closer than I'd like". [V] https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/
- 12 May 2026 - Google brings vibe-coded widgets ("Create My Widget") to Android. [V headline] https://techcrunch.com/2026/05/12/googles-create-my-widget-feature-will-let-you-vibe-code-your-own-widgets/
- 19 May 2026 - **Karpathy joins Anthropic pre-training.** 28M views. [V] https://x.com/karpathy/status/2056753169888334312 ; https://techcrunch.com/2026/05/19/openai-co-founder-andrej-karpathy-joins-anthropics-pre-training-team/
- 20 May 2026 - rsync 3.4.3 problems; GitHub issue "Please Do Not Vibe F*** Up This Software" goes viral (The Register, 4 Jun 2026). [V via Wikipedia citation]
- 22 May 2026 - WSJ: "vibe slop" crisis warning. [U]

**June -> September 2026 (the requested window)**
- 9 Jun 2026 - Lovable: $500M annualized revenue, 1M new projects a week, 50M+ projects total. [V] https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/
- 12 Jun 2026 - Forbes: "Is Vibe Coding Already Dead? Even Karpathy Is Moving On". [U - 403] https://www.forbes.com/sites/jodiecook/2026/06/12/is-vibe-coding-already-dead-even-karpathy-is-moving-on/
- 16 Jun 2026 - **SpaceX to acquire Cursor for $60B in stock**, days after SpaceX's IPO. [V] https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/
- 29 Jun 2026 - Base44 (Wix-owned vibe coding platform) launches its own model; Cursor ships a mobile app for steering agents. [V headlines] https://techcrunch.com/2026/06/29/vibe-coding-platform-base44-launches-own-model-as-ai-startups-seek-defensibility/ ; https://techcrunch.com/2026/06/29/cursor-now-has-a-mobile-app-for-guiding-your-coding-agent-on-the-go/
- 5-7 Jul 2026 - Willison ships sqlite-utils 4.0; the rc was mostly written by "Claude Fable" for about $149 in tokens. [V - tag page summary] https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/
- 7 Jul 2026 - Figma acquires the team behind Bud (formerly Orchids, the YC vibe coding app whose security hole was shown to the BBC in Feb 2026); product shuts down 18 Jul. [V] https://techcrunch.com/2026/07/07/figma-acquires-team-behind-a-vibe-coding-app/
- 8 Jul 2026 - Bun rewritten from Zig to Rust by agents in 11 days, ~$165K of tokens. [V] https://simonwillison.net/2026/Jul/8/rewriting-bun-in-rust/
- 8 Jul 2026 - Lovable in talks to raise ~$300M at $13.2B. [V] https://techcrunch.com/2026/07/08/lovable-reportedly-in-talks-to-double-its-valuation-to-13-2b/ ; Wikipedia records the closed round as Aug 2026 Series C, $400M at $13.3B [V via Wikipedia, secondary] https://en.wikipedia.org/wiki/Lovable_(company)
- 15 Jul 2026 - India's Emergent becomes a unicorn ($130M Series C) about a year after launch. [V headline] https://techcrunch.com/2026/07/15/indian-ai-coding-startup-emergent-becomes-a-unicorn-just-over-a-year-after-launch/
- 5 Aug 2026 - Willison one-shots a full "raccoon heist" game with Claude Fable 5, redoing a 2022 GPT-3 idea. [V - tag page summary] https://simonwillison.net/2026/Aug/5/raccoon-heist/
- 15 Aug 2026 - **SpaceX closes the Cursor acquisition.** [V] https://techcrunch.com/2026/08/15/spacex-officially-closes-its-cursor-acquisition/
- 18 Aug 2026 - Cursor launches a code-hosting rival to GitHub; Reuters Breakingviews calls vibe coding a "low-key threat" to software firms. [V headlines] https://techcrunch.com/2026/08/18/cursor-capitalizes-on-github-frustration-launches-rival-hosting-platform/ ; https://www.breakingviews.com/columns/considered-view/vibe-coding-is-low-key-threat-software-firms-2026-08-18/
- Aug 2026 - VibeEval monthly scan: 30,998 live vibe-coded apps, 57% of reachable Supabase apps allowed unauthenticated reads (vendor report; from search snippet). [U] https://vibe-eval.com/updates/vibe-coding-security-monthly-aug-2026/
- 8 Sep 2026 - Cognition (Devin) raises $2B at $48B; ARR $900M, up from $492M in May. [V] https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation-signaling-investors-believe-ai-coding-is-far-from-a-winner-take-all-market/
- 15 Sep 2026 (Tue) - **Merriam-Webster adds "vibe coding" to the dictionary** in a 1,400-entry update (with "AGI" and noun "compute"). [V via NBC 16 Sep + iHeart 16 Sep + CP24/AP 19 Sep; M-W's own page not openable] https://www.nbcnews.com/news/us-news/merriam-webster-gives-dictionary-glow-1400-new-words-definitions-rcna598097 ; https://www.cp24.com/news/world/2026/09/19/merriam-webster-adds-1400-words-from-glow-up-to-trash-panda/
- 18 Sep 2026 - HN front page: "Bend 2 and the Vibe-Coding Trap" (326 points) - you can vibe-code an entire language and still miss that a better established solution exists. [V] https://blog.liampwll.com/posts/bend_vibe_coding/ ; https://news.ycombinator.com/item?id=49753179
- No new Karpathy blog post since 30 Apr 2026 (bearblog index checked 21 Sep 2026). [V] https://karpathy.bearblog.dev/blog/

---

## 6. Corrections to common claims (for the brief and the slides)

1. **"The tweet has 4.5M views."** Stale. 7,359,582 on 21 Sep 2026. The 2023 "English" tweet is often cited at ~4M; it is at 12.9M. Karpathy's most-viewed coding-related posts are actually the Anthropic announcement (28.0M) and the "never felt this much behind" post (17.1M).
2. **"Karpathy said vibe coding is dead / passé."** The 4 Feb 2026 post contains neither word. "Passé" is The New Stack's headline. His actual framing: vibe coding was for throwaway projects when models were weaker; professionals now need a differently named discipline. At Sequoia he framed them as coexisting (floor vs ceiling), and his Dec 2025 review still celebrates vibe coding. Whether he said "passé" aloud on stage is UNVERIFIED.
3. **"He coined 'agentic engineering' at Sequoia in April 2026."** First use was the X post of 4 Feb 2026; Sequoia (~23 Apr 2026) popularised it. He called it his "current favorite" among names others were proposing; Addy Osmani was also using it (per Willison, 11 Feb 2026).
4. **"Garry Tan said 25% of YC startups are 95% AI-written."** TechCrunch attributes the statistic to YC managing partner Jared Friedman; it covers the W25 batch only and excludes imported library code.
5. **"Merriam-Webster added vibe coding in March 2025."** That was a Slang & Trending page, not a dictionary entry. The dictionary entry arrived on 15 Sep 2026 (Tuesday), per NBC and iHeart.
6. **"Vibe coding = any coding with AI."** That is the Collins/AP sense. Karpathy's original and Willison's definition both hinge on *not reading the code*. Teach the distinction explicitly.
7. **"The inventor of vibe coding vibe-codes everything."** In Oct 2025 he hand-wrote nanochat and called agents net unhelpful for it; he flipped to ~80% agent coding only in Dec 2025 after a capability jump.
8. **"Karpathy, founder of Eureka Labs."** Outdated since 19 May 2026: he is on Anthropic's pre-training team. Eureka Labs' status is unclear.
9. **"Cursor, the independent startup."** Acquired by SpaceX for $60B in stock; deal closed 15 Aug 2026.
10. **Talk date confusion.** The YC talk was given 17 Jun 2025; the video went up 18-19 Jun 2025. Many posts cite either date.
11. **Wikipedia is behind.** As of 21 Sep 2026 the Vibe coding article has no mention of "agentic engineering" and nothing dated Jun-Sep 2026.

---

## 7. Suggested teaching arc (5 beats, ~10 minutes of the talk)

1. 2023: "English is the programming language" - the idea before the tools.
2. Feb 2025: the tweet - show it, read three fragments, underline "throwaway weekend projects".
3. 2025: hype and hangover - Collins WOTY on one side; MenuGen's messy 80%, Lovable/Replit incidents, METR's -19% on the other.
4. Dec 2025 -> Feb 2026: models cross a threshold; Karpathy goes 80% agents; renames the professional mode "agentic engineering".
5. 2026: floor vs ceiling. Live demo plan: vibe-code something in 5 minutes (floor), then redo one feature the agentic way - spec, plan, tests first, read the diff (ceiling). Close with "you can't outsource your understanding".

---

## Visual candidates

1. https://x.com/karpathy/status/1886192184808149383 - the original vibe coding tweet with 7.36M views counter. Teaching point: origin; highlight "Accept All" and "throwaway weekend projects".
2. https://x.com/karpathy/status/1617979122625712128 - seven-word "English" tweet, 12.9M views. Teaching point: the idea predates the tools by two years.
3. https://x.com/karpathy/status/2019137879310836075 - anniversary post defining "agentic engineering" (the two bullet points on "agentic" and "engineering"). Teaching point: the rename and why.
4. https://x.com/karpathy/status/2004607146781278521 - "never felt this much behind as a programmer", 17.1M views. Teaching point: even experts feel behind; December 2025 threshold.
5. https://x.com/karpathy/status/2015883857489522876 - Claude Code notes, the 80/20 flip sentence. Teaching point: what changed in practice; also "slopacolypse".
6. https://x.com/karpathy/status/1977758204139331904 - nanochat "entirely hand-written" reply. Teaching point: agents fail off-distribution; know when not to vibe.
7. https://x.com/karpathy/status/2056753169888334312 - "I've joined Anthropic", 28M views. Teaching point: where the story stands in 2026.
8. https://www.youtube.com/watch?v=LCEmiRjPEtQ - YC talk; screenshot the Software 1.0/2.0/3.0 slide (~1:30-5:00), the autonomy slider / Iron Man slide (~27:00), and the "vibe coding" kids slide (~29:05). Slides deck: https://docs.google.com/presentation/d/1sZqMAoIJDxz79cbC5ap5v9jknYH4Aa9cFFaWL8Rids4/edit?usp=sharing
9. https://x.com/karpathy/status/1935518272667217925 - talk announcement with chapter list. Teaching point: one-screen outline of Software 3.0.
10. https://www.youtube.com/watch?v=96jN2OCOfLs - Sequoia fireside title card "From Vibe Coding to Agentic Engineering". Teaching point: floor vs ceiling.
11. https://karpathy.bearblog.dev/sequoia-ascent-2026/ - blog header plus the "outsource your thinking" line. Teaching point: understanding is not outsourceable.
12. https://karpathy.bearblog.dev/vibe-coding-menugen/ - MenuGen post header and the services list (Vercel, Clerk, Stripe). Teaching point: deployment is the hard part.
13. https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/ and https://www.collinsdictionary.com/woty - Collins WOTY 2025 banner with definition. Teaching point: mainstream arrival and definition drift.
14. https://www.cp24.com/news/world/2026/09/19/merriam-webster-adds-1400-words-from-glow-up-to-trash-panda/ (or https://www.merriam-webster.com/dictionary/vibe%20coding) - Merriam-Webster entry, Sep 2026. Teaching point: it is now a dictionary word - this week.
15. https://simonwillison.net/2025/Mar/19/vibe-coding/ - post title "Not all AI-assisted programming is vibe coding (but vibe coding rocks)". Teaching point: the review line.
16. https://simonwillison.net/2025/Oct/7/vibe-engineering/ - the list of 12 practices. Teaching point: what professionals add on top.
17. https://simonwillison.net/guides/agentic-engineering-patterns/ - guide table of contents. Teaching point: a ready curriculum for the "ceiling" half of the masterclass.
18. https://news.ycombinator.com/item?id=48037128 - HN thread (787 points, 885 comments) on Willison's "getting closer than I'd like". Teaching point: the boundary is blurring as agents improve.
19. https://news.ycombinator.com/item?id=46765460 - HN "After two years of vibecoding, I'm back to writing by hand" (865 points). Teaching point: backlash and cognitive debt.
20. https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated - headline. Teaching point: adoption speed (with correct attribution to Jared Friedman).
21. https://techcrunch.com/2026/06/16/spacex-to-acquire-cursor-for-60b-in-stock-days-after-blockbuster-ipo/ - headline. Teaching point: the tool from the tweet became a $60B company in 16 months.
22. https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/ - headline. Teaching point: non-programmers are building at scale (1M projects/week).
23. https://simonwillison.net/2026/Jul/8/rewriting-bun-in-rust/ - Bun rewrite numbers (11 days, ~$165K). Teaching point: what agentic engineering looks like at the ceiling: test suite as the verifier.
24. https://en.wikipedia.org/wiki/Vibe_coding - article header. Teaching point: Karpathy's joke that the article is longer than his own.

---

## Fact-check log

Adversarial pass, 21 Sep 2026, by a second agent. Method: every primary source below was opened (x.com via the FxTwitter JSON mirror `https://api.fxtwitter.com/karpathy/status/<id>`; HN via the Algolia API). I tried to refute each claim; outcome codes: CONFIRMED (matches source exactly), CORRECTED (file changed), UNVERIFIED (source not openable; claim flagged in place). 32 claims checked; 8 corrections/tightenings; 4 left UNVERIFIED.

**Karpathy posts (7 tweets)**
1. Vibe coding tweet https://x.com/karpathy/status/1886192184808149383 - CONFIRMED: created 2 Feb 2025 23:17:15 UTC; source "Twitter Web App"; 997 characters; 7,359,582 views / 34,142 likes / 3,629 reposts / 1,472 replies / 17,837 bookmarks; every quoted fragment ("There's a new kind of coding I call \"vibe coding\"", "fully give in to the vibes, embrace exponentials, and forget that the code even exists", "Cursor Composer w Sonnet", "SuperWhisper", "I \"Accept All\" always, I don't read the diffs anymore", "It's not too bad for throwaway weekend projects", "I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works") is present verbatim. CORRECTED: the padding example is "decrease the padding on the sidebar by half", not "halve" (section 2.2).
2. "English" tweet https://x.com/karpathy/status/1617979122625712128 - CONFIRMED: 24 Jan 2023 20:14:18 UTC; text exactly "The hottest new programming language is English"; 12,893,539 views / 73,187 likes / 8,916 reposts / 2,305 replies / 7,132 bookmarks.
3. "Agentic engineering" post https://x.com/karpathy/status/2019137879310836075 - CONFIRMED: 4 Feb 2026 19:55:58 UTC; 1,298,664 views / 8,781 likes / 811 reposts / 2,954 bookmarks; exact fragments "a shower of thoughts throwaway tweet", "it almost worked", "without any compromise on the quality of the software", "personally my current favorite \"agentic engineering\"", "you are not writing the code directly 99% of the time", "an art & science and expertise to it" all present. Neither "passé" nor "dead" appears - correction #2 stands.
4. Anthropic post https://x.com/karpathy/status/2056753169888334312 - CONFIRMED: 19 May 2026 15:05:42 UTC; 28,015,767 views / 149,312 likes; opens "Personal update: I've joined Anthropic."
5. "Behind" post https://x.com/karpathy/status/2004607146781278521 - CONFIRMED: 26 Dec 2025 17:36:02 UTC; 17,066,227 views / 55,334 likes; opens "I've never felt this much behind as a programmer."
6. Claude Code notes https://x.com/karpathy/status/2015883857489522876 - CONFIRMED: 26 Jan 2026 20:25:39 UTC; 7,848,443 views / 40,733 likes / 36,991 bookmarks; exact: "80% manual+autocomplete coding and 20% agents in November to 80% agent coding and 20% edits+touchups in December"; spelling "slopacolypse" is Karpathy's own; also "crossed some kind of threshold of coherence around December 2025".
7. nanochat reply https://x.com/karpathy/status/1977758204139331904 - CONFIRMED: 13 Oct 2025 15:27:55 UTC; 488,196 views; exact "it's basically entirely hand-written (with tab autocomplete)"; "net unhelpful" and "too far off the data distribution" present.
8. YC talk announcement https://x.com/karpathy/status/1935518272667217925 - CONFIRMED: 19 Jun 2025 02:01:31 UTC; 1,269,976 views / 8,845 likes; chapter timestamps 0:00 / 6:06 / 14:39 / 18:16 / 29:05 / 33:36 and "(yes, vibe coding)", "computing circa ~1960s", "Build for agents!" all verbatim.
9. Sequoia X summary https://x.com/karpathy/status/2049903821095354523 - CONFIRMED: 30 Apr 2026 17:28:50 UTC; 1,320,273 views; "from a ~week ago"; 100,000-line refactor vs "walk to the car wash" is there.

**Karpathy blog posts**
10. Sequoia blog https://karpathy.bearblog.dev/sequoia-ascent-2026/ - CONFIRMED: dated 30 Apr 2026; exact sentences "Vibe coding raises the floor." / "Agentic engineering raises the ceiling." / "You can outsource your thinking, but you can't outsource your understanding." / "You design specs, supervise plans, inspect diffs, write tests, create evaluation loops, manage permissions." / "The LLM is an interpreter over that context".
11. Year in review https://karpathy.bearblog.dev/year-in-review-2025/ - CONFIRMED date 19 Dec 2025, six section headings, and exact "the first convincing demonstration of what an LLM Agent looks like". CORRECTED: the vibe-coding line is "programming is not strictly reserved for highly trained professionals" (file had a loose paraphrase); added his point that it also empowers professionals (section 2.6).
12. MenuGen https://karpathy.bearblog.dev/vibe-coding-menugen/ - CONFIRMED date 27 Apr 2025 and the 80%-felt / ~20%-actual line. CORRECTED: quote is lower-case "vibe coding full web apps today is kind of messy", mid-sentence (section 2.3). Services named in the post: Cursor, Claude, OpenAI, Replicate, Vercel, Clerk, Google Cloud Console, Stripe, Supabase, Vercel KV, Upstash.

**Willison**
13. 19 Mar 2025 post - CONFIRMED: definition "building software with an LLM without reviewing the code it writes"; golden rule and "that's not vibe coding, it's software development" sentence present.
14. 7 Oct 2025 "Vibe engineering" - CONFIRMED: exactly 12 bolded practices; "I propose we call this vibe engineering, with my tongue only partially in my cheek"; "AI tools amplify existing expertise".
15. 23 Feb 2026 post - CONFIRMED: coding agents (Claude Code, OpenAI Codex) "can both generate and execute code"; contrasts vibe coding (original definition) with agentic engineering.
16. Guide chapter - CONFIRMED: exact "Agents run tools in a loop to achieve a goal"; Claude Code released "just three weeks" after the tweet.
17. 6 May 2026 post - CONFIRMED: from Heavybit High Leverage podcast, episode 9; exact "I'm not reviewing every line of code that they write anymore, even for my production level stuff". HN 48037128: 787 points / 885 comments (Algolia).
18. 8 Jul 2026 Bun post - CONFIRMED: 11 days, "+1 million lines added", "around $165,000 at API pricing", 690M output tokens, Zig -> Rust, Jarred Sumner. CORRECTED: token figure is 5.9B *uncached* input plus 72B *cached* input reads (section 3.7).

**Dictionaries / press / numbers**
19. Collins WOTY blog - CONFIRMED: 6 Nov 2025, Rachel Quin; definition verbatim "the use of artificial intelligence prompted by natural language to write computer code"; shortlist of 10 matches.
20. TechCrunch 6 Mar 2025 YC piece - CONFIRMED: Ivan Mehta; "A quarter of the W25 startup batch have 95% of their codebases generated by AI", attributed to YC managing partner Jared Friedman. Added: Garry Tan is on the same panel, quoted on a different point (section 4).
21. Merriam-Webster Sep 2026 - CORRECTED (section 4, timeline, correction #5): announcement day is Tue 15 Sep 2026 (NBC 16 Sep: "announced the additions on its website Tuesday"; iHeart: "Tuesday (September 15)"). CP24 byline is Archie Niari with AP files (Anna Furman), dated 19 Sep, and it does NOT mention "compute"; NBC (Matt Lavietes) mentions "compute" and "vibe coding" but NOT "AGI"; iHeart names all three. The 1,400 count and the gloss "describes using an AI system to generate computer code" are CONFIRMED in CP24. UNVERIFIED: Merriam-Webster's own entry and new-words pages (socket closed to fetcher) - exact M-W definition wording unknown.
22. TechCrunch 16 Jun 2026 SpaceX-Cursor - CONFIRMED: Sean O'Kane; "$60 billion stock deal"; days after SpaceX IPO; April option was buy for $60B or pay a $10B break-up fee; prior valuation ~$29B.
23. TechCrunch 15 Aug 2026 close - CONFIRMED: Anthony Ha; "Cursor is now officially a part of SpaceX"; $60B in stock.
24. TechCrunch 21 Apr 2026 option - CORRECTED (timeline): article says Cursor "was eyeing a $50 billion valuation in an upcoming private fundraising round"; the "$2B raise" figure is not in it - removed and marked UNVERIFIED. Added valuation path $2.5B -> $9B -> $29.3B post-money (Nov 2025 Series D, $2.3B).
25. TechCrunch 19 May 2026 Karpathy/Anthropic - CONFIRMED: Bellan + Franceschi-Bicchierai; "pre-training under team lead Nick Joseph"; "start a team focused on using Claude to accelerate pre-training research"; Eureka Labs future unclear.
26. TechCrunch 9 Jun 2026 Lovable - CONFIRMED: Julie Bort; "surpassed $500 million in annualized run-rate revenue"; "over 50 million projects"; "one million new projects a week".
27. TechCrunch 8 Sep 2026 Cognition - CONFIRMED: Marina Temkin; $2B at $48B; ARR $492M (May) -> $900M; previous round at $26B four months earlier.
28. METR study - CONFIRMED at primary source (10 Jul 2025): 16 developers, 246 issues, "take 19% longer", expected +24%, believed +20% afterwards. Source upgraded from Wikipedia to metr.org (timeline).
29. Dwarkesh episode - CONFIRMED: "Andrej Karpathy — AGI is still a decade away", 17 Oct 2025; "this is more accurately described as the decade of agents"; "they just don't work".
30. Latent Space https://www.latent.space/p/s3 - CONFIRMED dated 17 Jun 2025 with the Google Slides link; CORRECTED: it does not name a city, so "San Francisco" is now marked UNVERIFIED (section 2.4).
31. HN counts via Algolia - CONFIRMED: 46765460 = 865 pts / 634 comments (26 Jan 2026); 43448432 = 221 / 297 (22 Mar 2025); 43739037 Addy Osmani = 259 / 200; 47006615 fast.ai = 434 / 348 (13 Feb 2026); 47664912 Bram Cohen = 616 / 512 (6 Apr 2026); 49753179 Bend 2 = 326 / 235 (18 Sep 2026); 46977210 GLM-5 = 378 / 8. Added note that the main GLM-5 thread is 46974853 (484 / 520) under a different title (section 3.4).
32. Collins "Merriam-Webster's own 2025 WOTY was 'slop'" - not re-checked; remains UNVERIFIED as labelled in section 4.

**Still UNVERIFIED after this pass (left flagged in place):** Merriam-Webster's own entry text; the YC talk city (San Francisco); the size of the Cursor round SpaceX pre-empted; Merriam-Webster's 2025 WOTY "slop"; plus everything already marked [U]/UNVERIFIED in the file (Software 2.0 URL, Slang & Trending date, NYT/WSJ/Forbes/Ars URLs, VibeEval numbers, Lovable Series C via Wikipedia).
