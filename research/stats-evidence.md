# Stats and evidence: what the numbers on vibecoding actually say

Research date: 21 Sep 2026. Topic owner: stats-evidence agent. Purpose: give the masterclass an honest, two-sided evidence base. Not a dump: organised by the five questions the audience will actually ask, each with a "say it on stage" line, the numbers, and the fine print.

Status labels: **[V]** = I opened the source in this session. **[V2]** = I opened a reliable secondary source, primary was blocked (403/402). **[UNVERIFIED]** = seen only in search snippets or SEO aggregators; do not put on a slide without re-checking.

Quoting note: almost everything below is paraphrased. When a slide needs exact wording, pull it from the URL given (one short quote per slide, with attribution).

---

## 0. The five-line summary (for the opening slide)

1. **Share of code written by AI is genuinely high at frontier companies** (Google 75% of new code, Anthropic 80%+ of merged code, YC W25: a quarter of startups at ~95%) but every one of those numbers is self-reported, measured differently, and comes with "reviewed by engineers". Across ordinary GitHub, the best academic estimate was ~29% of new Python functions in the US at end of 2024.
2. **"AI makes you faster" is not a settled fact.** The best RCT (METR, early 2025) found experienced devs 19% *slower* while believing they were 20% faster. METR's late-2025 rerun points toward a speedup (-18% time for returning devs) but METR itself calls the data unreliable. Self-reports (1.4-2x, 4x, 8x) are much larger than anything measured in experiments.
3. **Security has not improved with model quality.** Veracode: 45% of AI code samples failed security tests in 2025; 44% in July 2026. Syntax went to ~100%, security stayed at ~55-56%.
4. **Everyone uses it, few trust it.** Stack Overflow 2025: 84% use or plan to use AI, 46% distrust accuracy, ~3% highly trust. JetBrains 2026: 90% of pro devs use coding agents weekly; Claude Code at 39% work adoption.
5. **For learners the risk is real and specific.** Anthropic's own RCT (Jan 2026): juniors who delegated to AI scored 50% vs 67% on a comprehension quiz. The ones who asked AI to explain kept their scores. Productivity gains in the Science study accrued almost entirely to experienced developers. Entry-level employment in AI-exposed jobs is ~19% below trend (Stanford, Aug 2026).

The honest thesis for the talk: **vibecoding is real leverage, the leverage goes to people who can read, verify and steer, and the numbers say so from both sides.**

---

## 1. "How much code is AI really writing?"

**Say it on stage:** "At the frontier labs, most of it. In the average repo, roughly a quarter to a third. And nobody measures it the same way."

| Claim | Exact figure | Who / when | Sample / method | Caveat | Source | Status |
|---|---|---|---|---|---|---|
| YC W25 "95% AI-written" | For ~25% of the W25 batch, ~95% of the codebase is AI-generated | **Jared Friedman** (YC managing partner), YC video "Vibe Coding Is the Future" with Garry Tan, Harj Taggar, Diana Hu; TechCrunch coverage 6 Mar 2025 | Informal poll of batch founders; no published methodology | It is 25% of startups, NOT 95% of all YC code. Figure excludes boilerplate such as library imports; it is human-typed vs AI-typed characters. Friedman stressed these founders are highly technical and could have built it by hand. In the same video Diana Hu said you need taste and training to judge LLM output, and Tan said early reasoning models were poor at debugging | https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/ | [V] |
| Garry Tan repeats it | Same 25%/95% figure; also batch growing ~10% week over week | Garry Tan, CNBC, 15 Mar 2025 | Interview | Source returned 403; details from search snippet only | https://www.cnbc.com/2025/03/15/y-combinator-startups-are-fastest-growing-in-fund-history-because-of-ai.html | [UNVERIFIED] |
| Google | 25% (Oct 2024, Q3 earnings call) -> "more than 30%" (Apr 2025 earnings call) -> 50% (fall 2025) -> **75% of all new code** (22 Apr 2026) | Sundar Pichai, Cloud Next '26 blog post. Exact wording: "75% of all new code at Google is now AI-generated and approved by engineers" | Internal metric, method undisclosed | "New code", and "approved by engineers". Historically Google counted accepted autocomplete characters, so early numbers are not comparable to agentic numbers. Semafor (24 Apr 2026): such time-horizon claims are "pretty impossible to fact-check"; it puts Google at 25% in 2024 and 50% in fall 2025. Same post: one complex migration done 6x faster than a year earlier | https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/ ; https://www.semafor.com/article/04/24/2026/google-ceo-says-75-of-companys-new-code-is-ai-generated | [V] |
| Microsoft | 20-30% of code in company repos "written by software" | Satya Nadella, LlamaCon fireside with Zuckerberg, 29 Apr 2025 | Internal, undisclosed | Varies by language (better in Python, worse in C++). Zuckerberg said he did not know Meta's number. Kevin Scott forecast 95% by 2030. TechCrunch warns methodologies differ between companies. No updated Microsoft-wide figure found for 2026 | https://techcrunch.com/2025/04/29/microsoft-ceo-says-up-to-30-of-the-companys-code-was-written-by-ai/ | [V] |
| Anthropic (company) | **More than 80% of merged code authored by Claude as of May 2026**, up from low single digits before Claude Code launched (Feb 2025). Typical engineer merged ~8x as much code per day in Q2 2026 vs 2024. Mar 2026 poll of 130 Anthropic research staff: median self-estimate ~4x output "with Mythos Preview" (authors expect the true March uplift was "somewhat lower") | Anthropic Institute essay by Marina Favaro and Jack Clark (page updated 18 Sep 2026) | Internal repo data + employee survey | Anthropic itself says lines of code measure quantity not quality and that 8x almost certainly overstates the real productivity gain | https://www.anthropic.com/institute/recursive-self-improvement | [V] |
| Anthropic (individuals) | Boris Cherny (Claude Code lead): 100% of his code AI-written for 2+ months; 22 and 27 PRs shipped on consecutive days. Company-wide 70-90%; Claude Code ~90% self-written | Fortune, 29 Jan 2026 | Personal statements on X | Expert power user at an AI lab. Fortune contrasts with ~30% at Microsoft/Salesforce and cites Karpathy on subtle conceptual errors and dead code left by models | https://fortune.com/2026/01/29/100-percent-of-code-at-anthropic-and-openai-is-now-ai-written-boris-cherny-roon/ | [V] |
| Amodei's prediction | AI writing 90% of code in 3-6 months, essentially all in 12 months | Dario Amodei, Council on Foreign Relations, 10 Mar 2025 | Forecast | Came true inside Anthropic roughly on schedule; did NOT come true industry-wide (see next row) | https://www.cfr.org/event/ceo-speaker-series-dario-amodei-anthropic | [V] |
| Independent academic estimate | **~29% of newly written Python functions in the US were AI-written by end of 2024** (5% in 2022). Germany 23%, France 24%, India 20%, Russia 15%, China 12% | Daniotti, Wachs, Feng, Neffke; *Science*, Jan 2026 (Complexity Science Hub Vienna) | Neural classifier over 30M+ Python contributions by ~160,000 GitHub developers | Python on GitHub only; classifier-based; data ends 2024, before the agent wave (non-US country figures are early-2025 readings). Output gain modest: AI raised quarterly output by ~3.6% by end 2024 (a level shift, not 3.6% compounding every quarter). Less experienced devs used AI more (37% vs 27% of work) but gains went almost exclusively to experienced devs. No CIS/Central Asia figure besides Russia | https://csh.ac.at/news/ai-is-already-writing-almost-one-third-of-new-software-code/ ; https://www.science.org/doi/10.1126/science.adz9311 | [V] (press release opened; paper not) |
| Claude Code share of GitHub | ~4% of all public GitHub commits authored by Claude Code (Feb 2026), double the prior month; SemiAnalysis projects 20%+ of daily commits by end of 2026 | SemiAnalysis, 5 Feb 2026; repeated in Anthropic's Series G release, 12 Feb 2026 | SemiAnalysis' article states the 4% but does not spell out the detection method; the co-author trailer is the likely mechanism [UNVERIFIED method] | Public commits only; undercounts users who strip the trailer, overcounts hobby repos. The 20% is a projection, not a measurement | https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point ; https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation | [V] |
| Commit-level estimate | ~25% of 2026 commits show measurable AI assistance | GitClear "Maintainability Gap", June 2026 | 623M code changes, 2023-2026 | Vendor dataset; primary page 403, read via secondary summary | https://www.gitclear.com/the_ai_code_quality_maintainability_gap | [V2] |
| Veracode's framing | AI generates roughly half of committed code in organisations that use the tools | Veracode 2026 report, 28 Jul 2026 | Not an original measurement | Treat as an industry talking point, not data | https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/ | [V] |

Teaching point: line up Friedman (25% of startups at 95%), Pichai (75% of new code, approved), Nadella (20-30%, language-dependent), Science (29% of Python functions) on one slide. Same question, four different denominators.

---

## 2. "Does it actually make you faster?"

**Say it on stage:** "The best experiment we have said no, and the developers did not notice. The rerun says probably yes now, and the researchers say do not trust their own number. Your feeling of speed is not evidence."

### 2a. METR: the full arc (this is the centrepiece)

| Item | Figure | Details | Source | Status |
|---|---|---|---|---|
| METR RCT, published 10 Jul 2025 | AI-allowed tasks took **19% longer** (CI roughly +2% to +39%; the bounds are not restated in the blog text or arXiv abstract, so read them off the paper's figure before putting them on a slide) | n = **16** experienced open-source developers, **246** real issues, randomised per issue to AI-allowed or AI-disallowed. Repos averaged 22k+ stars and 1M+ lines; devs had ~5 years on their repo. Tools: mostly Cursor Pro with Claude 3.5/3.7 Sonnet. Paid $150/hour | https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ ; https://arxiv.org/abs/2507.09089 | [V] |
| Perception gap | Forecast before: 24% faster. Belief after: **20% faster**. Reality: 19% slower. Economists predicted 39% faster, ML experts 38% faster | Same study. A roughly 40-point gap between felt and measured effect (METR's own May 2026 survey post restates it as people overestimating "by 40 percentage points on average") | same | [V] |
| What METR says it does NOT show | Not a claim about most developers, not about juniors or unfamiliar codebases, not about future models, not that better ways of using AI do not exist | Setting is the hardest case for AI: experts, huge mature repos, high quality bar, implicit context | same | [V] |
| METR update, 24 Feb 2026 | Late-2025 rerun: returning developers **-18% time** (CI -38% to +9%); newly recruited developers **-4%** (CI -15% to +9%) | 57 developers (10 returning + 47 new), 800+ tasks, 143 repos, started Aug 2025; pay was $50/hour, down from $150 in the 2025 study. Both intervals include zero, so neither result is statistically significant | https://metr.org/blog/2026-02-24-uplift-update/ | [V] |
| Why METR is abandoning the design | Selection effects: some devs refused to work without AI; 30-50% avoided submitting tasks they did not want to do by hand; agents running in parallel break time tracking; non-compliance on AI-disallowed tasks | METR calls the data an unreliable signal and believes it likely *understates* current speedup because the best AI use cases and the keenest adopters dropped out | same | [V] |
| METR theory note, 8 May 2026 | Speedup on old tasks <= uplift in value <= speedup on new tasks. A huge measured speedup on chosen tasks can coexist with a small real gain in value | Worked example: +33% on old task mix vs +50% on new task mix | https://metr.org/blog/2026-05-08-task-substitution-and-uplift/ | [V] |
| METR survey, 11 May 2026 | Median self-reported gain **1.4-2x in value**, 3x in speed; respondents recall 1.3x for Mar 2025 and forecast 2.5x for Mar 2027 | n = 349 technical workers (87 software engineers, 71 researchers, 129 academics/PhD students, 48 founders/managers), Feb-Apr 2026. 50% regularly use Claude Code; average 7 months with agentic tools | https://metr.org/blog/2026-05-11-ai-usage-survey/ | [V] |
| Caveat METR attaches to its own survey | Self-report only; their RCT showed people overestimate by ~40 points; METR's own staff reported lower gains than other groups | same | [V] |
| Capability evidence (not productivity) | MirrorCode (METR + Epoch AI, 10 Apr 2026): Claude Opus 4.6 reimplemented a 16,905-line Go bioinformatics toolkit, passing 2,000 of 2,001 tests; estimated 2-17 weeks of skilled human work; 280M tokens actually used against a 1B-token budget (~$550 at full budget) | Requires a detailed checkable spec and a full test suite, which real projects rarely have; memorisation cannot be fully excluded; one of four targets (Pkl) remained unsolved | https://epoch.ai/blog/mirrorcode-preliminary-results ; https://metr.org/blog/2026-04-10-mirrorcode-preliminary-results/ | [V] |

As of 21 Sep 2026 METR's research page lists no new productivity RCT result after the February update (checked https://metr.org/research/). [V]

### 2b. The rest of the productivity evidence

| Study | Figure | Sample / date | Caveat | Source | Status |
|---|---|---|---|---|---|
| GitHub Copilot experiment | 55% faster (1h11 vs 2h41); 95% CI 21-89%; completion 78% vs 70% | 95 professional devs, one greenfield task (HTTP server in JavaScript), published 7 Sep 2022 | Vendor-run; toy task; no quality measurement. The origin of most "55% faster" marketing | https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/ | [V] |
| Google internal RCT | ~21% less time (96 vs 114 min) | 96 full-time Google engineers, one enterprise-grade task, summer 2024 | Wide CI; loses significance at p<.05 once controls are added (per search summary of the paper); pre-agent tooling | https://arxiv.org/abs/2410.12944 | [V] (abstract) |
| *Science* GitHub study | +3.6% quarterly output attributable to AI by end 2024; worth ~$23-38B/yr to the US | 160k devs, 30M contributions | Gains concentrated in experienced developers | https://csh.ac.at/news/ai-is-already-writing-almost-one-third-of-new-software-code/ | [V] |
| Faros AI "Productivity Paradox" | High-AI teams: +21% tasks, +98% PRs merged, but PR review time +91%, PR size +154%, bugs per dev +9%; no measurable improvement at company level | Telemetry from 10,000+ devs across 1,255 teams; 23 Jul 2025 | Vendor selling engineering analytics; correlational | https://www.faros.ai/blog/ai-software-engineering | [V] |
| DORA 2025 (Google) | 90% use AI at work (+14 points YoY); median 2 h/day; 65% rely on it heavily; 80%+ say productivity up; 59% say code quality up; AI adoption now positively linked to throughput but still negatively linked to delivery stability | ~5,000 tech professionals + 100+ hours of interviews; 23-24 Sep 2025 | Self-report survey. Central thesis: AI amplifies what a team already is | https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/ ; https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report | [V] |
| DORA "ROI of AI-assisted Software Development" (2026.01) | Model for a 500-engineer org: ~$8.4M first-year cost, ~$11.6M value, 39% ROI, ~8-month payback; 35-40% gains on simple tasks vs ~10% or less on complex legacy code; change-failure rate modelled rising 5% -> 6%; "J-curve" dip first | Google Cloud DORA team; InfoQ coverage 11 May 2026 | A financial model with assumptions, not a measurement. The 727% three-year figure is Google Cloud marketing | https://www.infoq.com/news/2026/05/dora-roi-ai-assisted-dev-report/ ; https://cloud.google.com/resources/content/dora-roi-of-ai-assisted-software-development | [V2] |
| GitClear 2026 velocity | Heavy AI users out-produce non-users 4-10x, but most of that gap pre-dated AI; against their own past selves the gain is ~25% | 623M changes, June 2026 | From search summary of the report | https://www.gitclear.com/the_ai_code_quality_maintainability_gap | [UNVERIFIED detail] |

Pattern worth teaching: **measured effects cluster between -19% and +25%; self-reported effects cluster between 1.4x and 8x.** The gap itself is the lesson.

---

## 3. "Is the code any good? Is it safe?"

**Say it on stage:** "Models learned to write code that runs. They did not learn to write code that is safe, unless you ask. Nearly half of unprompted AI code ships a known vulnerability, and that number has not moved in a year."

### 3a. Veracode GenAI Code Security (three editions)

| Edition | Headline | Detail | Source | Status |
|---|---|---|---|---|
| 2025 report, 30 Jul 2025 | **45% of code samples failed** security tests (introduced an OWASP Top 10 flaw) | 100+ LLMs, Java / Python / C# / JavaScript, four CWEs (SQL injection CWE-89, XSS CWE-80, log injection CWE-117, weak crypto CWE-327). Failure rates: Java 72%, C# 45%, JavaScript 43%, Python 38%. XSS failed 86%. Blog: security "remained flat, regardless of model size or training sophistication". [UNVERIFIED from the blog and the report landing page: "80 coding tasks" and "log injection failed 88%"; both presumably in the full PDF] | https://www.veracode.com/blog/genai-code-security-report/ | [V] |
| Spring 2026 update, 24 Mar 2026 | Overall pass rate **55%**; syntax correctness 95%+ | 150+ LLMs tracked incl. GPT-5.1/5.2, Gemini 3, Claude 4.5/4.6. Best: reasoning-focused models at 70-72% (the blog credits "reasoning-focused models"; the "OpenAI" attribution was not re-confirmed). By language: Python 62%, C# 58%, JavaScript 57%, Java 29%. By CWE: SQLi 82%, crypto 86%, XSS 15%, log injection 13% | https://www.veracode.com/blog/spring-2026-genai-code-security/ | [V] |
| 2026 report, 28 Jul 2026 | Pass rate **56%** (44% of tasks introduce a risky flaw), essentially unchanged from 55% | Best model GPT-5.5 at 68%. Reasoning models 56% vs non-reasoning 51%; coding-specialised models 51% vs general 52%; large 53% vs small/medium 51%. SQLi 83%, crypto 87%, XSS 15%, log injection 12%. Report tagline: syntax is solved, security is not | https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/ ; https://thenextweb.com/news/veracode-2026-genai-code-security-56-percent-pass-rate | [V] |

Caveats to state out loud: Veracode sells application-security tooling. Prompts deliberately contain **no security instructions**, so this measures the default, not the ceiling. Tasks are small function completions, not agentic sessions with tests and review. The practical takeaway is constructive: say "sanitise input, parameterise queries, escape output" in the prompt or CLAUDE.md, and run a security review pass. Practitioner echo: Pieter Levels, 11 Mar 2025, while patching XSS holes in fly.pieter.com, wrote that unless you explicitly ask, AI "doesn't really care" about XSS when it writes code (post in section 6).

### 3b. Maintainability: GitClear

| Edition | Figures | Sample | Caveat | Source | Status |
|---|---|---|---|---|---|
| 2025 report (Feb 2025) | Copy/pasted lines 8.3% (2020) -> 12.3% (2024); moved/refactored lines 24.1% -> 9.5%; 2024 was the first year copy/paste exceeded moved lines; duplicated blocks (5+ lines) up roughly eightfold in 2024 (report title says 4x growth in clones); churn of new code within two weeks 3.1% -> 5.7% | 211M changed lines, 2020-2024 (the "25 large open-source projects" detail is not in the secondary summary opened; UNVERIFIED) | Correlational, no AI-vs-non-AI control; vendor. Churn numbers differ between summaries (3.3% -> 6.9% also circulates; the jonas.rs summary lists both 5.7% and "7.9% of all newly added code" for 2024) because GitClear reports more than one churn metric | https://www.gitclear.com/ai_assistant_code_quality_2025_research ; summary: https://www.jonas.rs/2025/02/09/report-summary-gitclear-ai-code-quality-research-2025.html | [V2] |
| 2026 "Maintainability Gap" (June 2026) | Refactoring share 21% (2022) -> 3.8% (-70% vs 2023 baseline); duplication 40.3 -> 73.0 per million (+81%); copy/paste 9.4% -> 15.7% in H1 2026 (+41%); error-masking catch blocks +47%; cross-file reuse -35%; legacy-code maintenance -74%; two-week churn ~16% -> ~19% | 623M code changes, 2023-2026 | Correlational. "Moved lines" may undercount refactoring when an agent rewrites a function in place | https://www.gitclear.com/the_ai_code_quality_maintainability_gap ; summary: https://www.arturmarkus.com/ai-code-quality-by-the-numbers-623-million-changes-refactoring-down-70-duplication-up-81/ | [V2] |

### 3c. Other quality signals

| Source | Figure | Sample | Caveat | URL | Status |
|---|---|---|---|---|---|
| CodeRabbit, 17 Dec 2025 | AI-co-authored PRs had ~1.7x more issues (10.83 vs 6.45 per PR); critical issues 1.4x; logic errors 1.75x; maintainability 1.64x; security 1.57x; performance 1.42x; XSS 2.74x | 470 open-source PRs (the 320/150 AI-vs-human split is not shown on the CodeRabbit newsroom page or in The Register; UNVERIFIED) | Vendor of AI code review. Cannot be sure the "human" PRs were AI-free. Small sample. The Register: human PRs had 1.76x more spelling errors and 1.32x more testability issues | https://www.coderabbit.ai/newsroom/state-of-ai-vs-human-code-generation-report ; https://www.theregister.com/2025/12/17/ai_code_bugs/ | [V] |
| Faros AI, Jul 2025 | +9% bugs per developer, +154% PR size on high-AI teams | 10k devs | see 2b | https://www.faros.ai/blog/ai-software-engineering | [V] |
| DORA 2025 | AI adoption still negatively associated with delivery stability | ~5k respondents | survey | https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report | [V] |

---

## 4. "Who is using this, and do they trust it?"

**Say it on stage:** "Adoption is near-universal. Trust is not. Professionals treat the model as a fast junior whose work must be checked."

### 4a. Stack Overflow Developer Survey

| Figure | Value | Source | Status |
|---|---|---|---|
| Release / sample | Results released **29 Jul 2025**; 49,000+ responses, 177 countries, 62 questions | https://stackoverflow.co/company/press/archive/stack-overflow-2025-developer-survey/ | [V] |
| Use or plan to use AI tools | **84%** (76% in 2024); ~51% of professionals use daily | https://survey.stackoverflow.co/2025/ai | [V] |
| Trust in accuracy | **46% distrust** (26.1% somewhat + 19.6% highly) vs ~33% trust; only **3.1% highly trust**. Distrust was 31% in 2024 | same | [V] |
| Sentiment | 60% favourable, down from 70%+ in 2023-24 | same | [V] |
| Top frustrations | 66%: answers that are almost right but not quite; 45%: debugging AI code takes longer | same | [V] |
| Vibe coding | ~72% said it is not part of their professional work (press release rounds the combined "no" answers to 77%); ~15% said yes | same + press release | [V] |
| Agents | 31% use agents; 38% have no plans to; 69% of agent users report productivity gains | press release | [V] |
| Tools | Cursor 18%, Claude Code 10% among dev environments; OpenAI GPT 81%, Claude Sonnet 43%, Gemini Flash 35% among LLMs | press release | [V] |
| Job threat | 64% do not see AI as a threat to their job (68% in 2024) | press release | [V] |

**Stack Overflow 2026 status:** the 2026 survey opened 23 Jun 2026 (https://stackoverflow.blog/2026/06/23/the-2026-developer-survey-is-now-open-for-human-developers-only/) [V]. As of 21 Sep 2026 https://survey.stackoverflow.co/2026/ returns 404 and the survey index lists 2025 as the latest results [V]. **Dozens of blog posts titled "Stack Overflow 2026: 84% / 3%" are recycling 2025 data.** Use "2025 survey" on slides and re-check the index before the talk.

### 4b. JetBrains (the freshest large survey)

JetBrains Research, "AI Coding Agents: Adoption Trends", Aug 2026; 15,000+ professional developers, fielded May-Jul 2026. https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/ [V]

- 90% of professional developers use AI coding agents at work at least weekly; 68% daily.
- **Claude Code: 39% work adoption worldwide** (18% in Jan 2026), 47% in the US; the single most-used tool for 31% of developers.
- GitHub Copilot 21% (29% a year earlier); Codex 16% (from 3%); Cursor 12% (from 18%); JetBrains AI ~9%; OpenCode 7%; Google Antigravity 6% (15% in India).
- Awareness: Copilot 79%, Cursor 75%, Codex 65%.
- Caveat: respondents skew toward JetBrains' audience; "work adoption" is self-reported regular use.

### 4c. DORA 2025 trust numbers

24% trust AI output a great deal or a lot (4% + 20%); 30% trust it a little or not at all (23% + 7%). Source: https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/ [V]

### 4d. Market / adoption numbers

| Product | Figure | Date | Caveat | Source | Status |
|---|---|---|---|---|---|
| Claude Code | Run-rate revenue >$2.5B, more than doubled since 1 Jan 2026; weekly active users doubled since 1 Jan; business subscriptions 4x; enterprise >50% of Claude Code revenue | 12 Feb 2026 | Run-rate is a recent period annualised, not booked revenue. No user count disclosed | https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation | [V] |
| Claude Code | Reached $1B run-rate "within six months" of its mid-2025 public launch (so around Nov 2025) | VentureBeat article dated 8 May 2026 (this file previously said "reported Nov 2025"; corrected) | Secondary source restating company figures | https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth | [V2] |
| Anthropic overall | $14B run-rate (Feb 2026); ~$30B (Apr 2026; Amodei: "We tried to plan very well for a world of 10x growth per year. And yet we saw 80x"); customers spending $1M+/yr: "a dozen" two years earlier -> "exceeds 500" (Series G, 12 Feb 2026) -> 1,000+ (VentureBeat, 8 May 2026) | Feb-May 2026 | Company statements. VentureBeat's revenue path: $87M (Jan 2024) -> $1B (Dec 2024) -> $9B (end 2025) -> $30B (Apr 2026) | same two URLs | [V] |
| Claude Code "$8B by May 2026", "54% of AI coding market", Anthropic "$47B ARR" | - | - | SEO aggregator figures, no primary source found | https://www.getpanto.ai/blog/claude-ai-statistics | [UNVERIFIED] |
| Cursor (Anysphere) | ARR: $100M (Jan 2025) -> $500M+ (Jun 2025) -> $1B (Nov 2025) -> ~$3B (May 2026). Valuation $9.9B (5 Jun 2025, $900M round) -> $29.3B (13 Nov 2025). **Acquired by SpaceX:** merger agreement between Space Exploration Technologies Corp., a merger subsidiary and Anysphere, Inc. ("Cursor") signed 16 Jun 2026; merger effective 14 Aug 2026; Cursor common and preferred stock converted into 389,289,254 SpaceX Class A shares "based on an implied equity value of Cursor of $60.0 billion" (all-stock) | 2025-2026 | SpaceX deal confirmed from SpaceX's Form 8-K filed 14 Aug 2026 (Items 2.01/3.02). $9.9B / $500M+ / 5 Jun 2025 confirmed by TechCrunch. The $100M, $1B, $3B ARR milestones and $29.3B valuation were read on Wikipedia only (tertiary). The Apr 2026 "option to acquire for $60B or pay $10B" framing (CNBC, 21 Apr 2026) was not opened [UNVERIFIED] | https://www.sec.gov/Archives/edgar/data/1181412/000162828026056945/spcx-20260814.htm ; https://techcrunch.com/2025/06/05/cursors-anysphere-nabs-9-9b-valuation-soars-past-500m-arr/ ; https://en.wikipedia.org/wiki/Cursor_(company) | SpaceX deal [V] (SEC 8-K); $9.9B / $500M+ [V]; other ARR milestones [V2, Wikipedia] |
| GitHub Copilot | 50M of GitHub's 225M users use Copilot | Microsoft FY26 Q4 earnings, 29 Jul 2026 | Source does not say paid vs free; treat as all users including the free tier. Paid subscribers were 4.7M in Jan 2026 (GitHub COO post, not opened). CNBC page 403 | https://office365itpros.com/2026/07/30/fy26-q4-microsoft-results/ | [V2]; 4.7M [UNVERIFIED] |
| Lovable | $500M annualised revenue; 1M new projects/week; 50M+ projects total; $400M reported in Feb 2026 | 9 Jun 2026 | Company claim; TechCrunch asks how many projects are abandoned and notes no independent verification | https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/ | [V] |
| Replit | ~$525M ARR, $9B valuation, targeting $1B ARR by end of 2026; ARR was $2.8M in 2024 | 2026 | Search snippets only | https://www.cnbc.com/2026/05/19/replit-cnbc-disruptor-50-ranking.html | [UNVERIFIED] |

---

## 5. "What does this mean for me as a student or junior?"

**Say it on stage:** "The gains go to people who understand what the model wrote. Use the agent to build, and use it again to explain. The second half is what makes you employable."

| Study | Figure | Sample / date | Caveat | Source | Status |
|---|---|---|---|---|---|
| Anthropic RCT on skill formation | AI group scored **50%** vs **67%** for hand-coders on a follow-up quiz (17 points, about two letter grades; d = 0.74, p = 0.01). Largest gap on debugging questions. AI group was only ~2 minutes faster, not significant | 52 mostly junior engineers learning the Python `trio` async library; 29 Jan 2026 | Small n; immediate quiz only; one library | https://www.anthropic.com/research/AI-assistance-coding-skills ; paper https://arxiv.org/html/2601.20245v1 | [V] |
| Same study: how you use it matters | High scorers (65%+): generate then ask follow-up questions (n=2), ask for explanation with the code (n=3), ask only conceptual questions and fix errors yourself (n=7; also second fastest). Low scorers (<40%): full delegation (n=4), sliding into delegation (n=4), asking AI to debug repeatedly (n=4) | same | Tiny subgroups, descriptive only | same | [V] |
| *Science* 2026 | Juniors use AI more (37% vs 27%) but measurable productivity gains accrue almost exclusively to experienced developers | 160k GitHub devs, to end 2024 | pre-agent era | https://csh.ac.at/news/ai-is-already-writing-almost-one-third-of-new-software-code/ | [V] |
| Stanford "Canaries in the Coal Mine" (Brynjolfsson, Chandar, Chen) | First version (Aug 2025) was widely reported as a 13% relative employment decline for ages 22-25 in the most AI-exposed occupations [13% UNVERIFIED: that version was not opened]. The **13 Nov 2025 revision** (opened) reports a **16%** relative decline after controlling for firm-level shocks, and: "By September 2025, employment for software developers aged 22-25 declined nearly 20% compared to its peak in late 2022". **Update 12 Aug 2026: employment of 22-25-year-olds in highly exposed occupations is ~19% below** where it would be had it kept pace with less-exposed peers (data through June 2026). The update says this same gap measure was 15% at the July 2025 data vintage, so "13% -> 19%" mixes two different constructions; say "15% -> 19% on the same measure" or quote each paper separately. Experienced workers show no comparable gap; the mechanism is reduced hiring, not separations | ADP payroll data (US), millions of workers | Authors: "descriptive patterns, not causal estimates"; gaps shrink when controlling for education; gaps are larger in the ADP sample than in national survey benchmarks; US only | https://digitaleconomy.stanford.edu/news/canariesaug26/ ; https://digitaleconomy.stanford.edu/publication/canaries-in-the-coal-mine-six-facts-about-the-recent-employment-effects-of-artificial-intelligence/ ; Nov 2025 PDF: https://digitaleconomy.stanford.edu/wp-content/uploads/2025/08/Canaries_BrynjolfssonChandarChen.pdf | Aug 2026 update (19%, 15%) [V]; Nov 2025 revision (16%, ~20% software developers) [V]; Aug 2025 "13%" [UNVERIFIED] |
| METR 2025 side note | Developers with little prior Cursor experience dominated the sample; the HN discussion highlights that the one dev with 50+ hours of Cursor experience showed a speedup | n=16 | Anecdotal subgroup of one; use only as a "skill with the tool matters" hint | https://news.ycombinator.com/item?id=44522772 | [V] |

---

## 6. Success stories, with the fine print

**Say it on stage:** "The build took three hours. The audience took ten years."

| Story | Figures | Fine print | Source | Status |
|---|---|---|---|---|
| Pieter Levels, fly.pieter.com | Started 22 Feb 2025, built live on X. Post of 11 Mar 2025 (22:59 UTC): "gone from $0 to $1 million ARR in just 17 days", "**$87,000 MRR** (which is $1M ARR)", 320,000 people had flown in the game, "Only 3 ads left"; tools named in the same post: Cursor + Claude 3.5, trying 3.7. Revenue from in-game ad placements sold as monthly sponsorships (blimps, a custom UFO for Basecamp, an Ozempic-seller blimp). 100M+ views of the saga on X (his blog). [UNVERIFIED in the sources opened: "first prototype in ~3 hours" (quoted only by the secondary dev.to piece), Grok 3 use, a paid F-16 at ~$29.99, Musk amplification, 600k+ followers] | "ARR" was one viral month times twelve. **Correction to earlier drafts of this file:** the ad slots were sold as *subscriptions*. Levels wrote in the same post that "they ARE subscriptions and they do renew", while adding that whether the MRR would hold for a year "we can only guess". The caveat is renewal risk after attention fades, not one-off income. Same post: he was fixing XSS holes and warned that AI-written code "can be full of security holes" unless you explicitly ask it to check. Secondary reporting (dev.to) says his X bio listed the project at $0/month by mid-2026 [UNVERIFIED; the dev.to page as fetched carries a 24 Jun 2025 date yet cites a mid-2026 bio, so treat it with care]. He had a decade of shipping in public, is an experienced PHP/JS developer, and had to fix security and cheating problems live | https://levels.io/fly-pieter-com-vibecoded-flight-simulator ; post https://x.com/levelsio/status/1899596115210891751 ; decline: https://dev.to/promptway/he-built-a-flight-simulator-in-three-hours-and-hit-1m-a-year-in-17-days-then-it-went-to-zero-1b1l | blog [V]; post text and date [V] (read via the fxtwitter API mirror; date cross-checked from the snowflake ID); $0/month [UNVERIFIED, secondary]; 3 hours / Grok 3 / F-16 [UNVERIFIED] |
| Base44 (Maor Shlomo) | Sold to Wix for **$80M cash**, 18 Jun 2025, six months after launch; 250,000 users; $189,000 profit in May 2025; bootstrapped | Not truly solo: 8 employees, who shared a $25M retention pool. Shlomo was a repeat founder (Explorium). Base44 is itself a vibe-coding platform, so this is a "sell shovels" story. Later claims ($90M earn-out, $100M ARR by Mar 2026) not verified here | https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/ | [V]; later figures [UNVERIFIED] |
| Lovable | $500M annualised revenue, Jun 2026 | The money in vibecoding so far is mostly made by the tool makers. Abandonment rate of user projects unknown | https://techcrunch.com/2026/06/09/lovable-says-it-has-hit-500m-in-annualized-revenue-with-1-million-new-projects-a-week/ | [V] |
| YC W25 | A quarter of the batch at ~95% AI-written code; Tan: fastest-growing batch in YC history | Highly technical founders; growth claims from YC itself | see section 1 | [V] / [UNVERIFIED] |

---

## 7. Corrections to common claims (use as a "myth vs source" slide)

1. **"Garry Tan said 95% of YC code is AI-written."** The original speaker was Jared Friedman; the claim is that for about a quarter of W25 startups ~95% of the codebase was AI-generated, excluding imports, and he stressed the founders were fully capable engineers.
2. **"Studies prove AI makes developers slower."** One RCT, 16 experts on giant familiar repos, early-2025 tools. METR explicitly refuses the generalisation, and its late-2025 data leans toward speedup.
3. **"METR now says developers are 18% faster."** That is the returning-developer subgroup (10 people), the confidence interval crosses zero, the new-recruit estimate was only -4%, and METR called the dataset unreliable and redesigned the study. Correct phrasing: "the sign probably flipped; the size is unknown".
4. **"Stack Overflow 2026 survey: 84% use AI, 3% trust it."** Those are 2025 numbers. 2026 results were not published as of 21 Sep 2026. Also, "3%" is only the "highly trust" bucket; about a third trust it somewhat. Some coverage cites "29% trust" (down from 40%), a different cut from the ~33% on the survey page.
5. **"Newer models write safer code."** Veracode pass rate: 55% (2025) -> 55% (Mar 2026) -> 56% (Jul 2026). Only reasoning models moved a little (56% vs 51%; best single model 68-72%).
6. **"Google: 25-30% of code is AI."** Out of date. Pichai said 75% of new code in Apr 2026 (and the metric's meaning shifted from autocomplete to agents along the way).
7. **"Amodei was wrong / was right about 90%."** Both: true inside Anthropic (80%+ merged, May 2026), false for the industry (about 25-30% by independent measures).
8. **"Levels makes $1M a year from a vibe-coded game."** It was a 17-day run-rate extrapolation ($87k MRR x 12) from in-game ad sponsorships. Nuance: Levels said the sponsorships were monthly subscriptions that "do renew", and that whether they would hold for a year "we can only guess". Reportedly near zero by mid-2026 (secondary source, UNVERIFIED).
9. **"Base44 was a solo founder."** Sole owner, but eight employees, and a repeat founder.
10. **"Copilot is the most-used AI coding tool."** By awareness and total users (50M incl. free) yes; by 2026 professional work usage JetBrains has Claude Code at 39% vs Copilot at 21%.
11. **"GitClear found 4x / 8x / 10x more duplication."** Different metrics in the same 2025 report (clone growth vs duplicated-block frequency). Quote the line-level numbers instead: copy/paste 8.3% -> 12.3%, refactoring 24.1% -> 9.5%.
12. **"Cursor is an independent $29B startup."** No longer. SpaceX's Form 8-K filed 14 Aug 2026 records the merger of Anysphere, Inc. ("Cursor") into a SpaceX subsidiary, effective 14 Aug 2026, under an agreement signed 16 Jun 2026, for 389,289,254 SpaceX Class A shares at "an implied equity value of Cursor of $60.0 billion". [V] https://www.sec.gov/Archives/edgar/data/1181412/000162828026056945/spcx-20260814.htm

---

## 8. How to structure this on the site (suggestion, 3 screens)

1. **"Two truths" screen.** Left column: 75% (Google), 80%+ (Anthropic), 39% (Claude Code adoption), $2.5B+ (Claude Code run-rate). Right column: -19% (METR 2025), 44% insecure (Veracode 2026), 3% highly trust (SO 2025), 50 vs 67 (Anthropic skills RCT). Every number clickable to its source.
2. **"Feeling vs measurement" interactive.** Ask the audience to guess METR's result before revealing: forecast +24%, felt +20%, measured -19%. Then show the Feb 2026 update with its error bars crossing zero.
3. **"Who captures the gains" screen.** Science (gains to seniors), Anthropic RCT (explain-mode vs delegate-mode), Stanford canaries (-19% for ages 22-25). Ends with the course promise: learn to steer and verify, not only to prompt.

---

## 9. Things still not verified after the fact-check pass (21 Sep 2026)

- Garry Tan's CNBC quotes (403 on both attempts).
- Stanford Aug 2025 first-version "13%" figure (the Nov 2025 revision, which was opened, says 16%; the Aug 2026 update says 15% on its own gap measure at the July 2025 vintage; the ~20% software-developer figure IS confirmed in the Nov 2025 revision).
- GitHub Copilot 4.7M paid subscribers (Jan 2026); Microsoft CNBC page (403).
- Cursor $100M / $1B / $3B ARR milestones and $29.3B valuation (Wikipedia only); Cursor $2B ARR Feb 2026 (TNW headline only). The SpaceX acquisition itself is now verified from the SEC 8-K.
- Replit $525M ARR / $9B; Base44 $100M ARR; Claude Code $8B run-rate and 54% market share; Anthropic $47B ARR.
- GitClear primary pages (403 again); numbers match the two secondary summaries. "25 large open-source projects" and the "4-10x / ~25% vs own past" velocity claims not found in those summaries.
- Veracode 2025 "80 coding tasks" and "log injection 88%" (not on the blog or report landing page; likely in the PDF).
- CodeRabbit 320/150 PR split; JetBrains "Antigravity 15% in India"; Veracode Spring 2026 "OpenAI" attribution of the 70-72% best models.
- Levels: "3 hours" first prototype, Grok 3 use, F-16 at ~$29.99, Musk amplification, follower count; "$0/month" by mid-2026 (secondary only).
- Whether a Stack Overflow 2026 results page appears between now and the talk (404 as of 21 Sep 2026).
- Exact YouTube URL and publish date of YC's "Vibe Coding Is the Future".
- Now verified and moved out of this list: Karpathy's "vibe coding" post (text and 2 Feb 2025 date), Levels' 11 Mar 2025 post (text and date), the Cursor/SpaceX merger (SEC 8-K), HN thread counts, SemiAnalysis X posts (5 Feb and 27 Feb 2026).

---

## Fact-check log

Adversarial pass run 21 Sep 2026. Method: for every claim likely to appear on a slide, the primary URL was opened with WebFetch and the figure was read against the page; X posts were read through the fxtwitter API mirror and their dates cross-checked by decoding the status ID; the Stanford Nov 2025 PDF was text-extracted locally; the SpaceX 8-K was located through SEC EDGAR's company browser. The web-search budget was exhausted before this pass, so no new sources were discovered by search; every URL below was already in this file or was reached from a page already in it. Placed before "Visual candidates" so that section stays last.

| # | Claim as it would appear on screen | Source opened | Outcome |
|---|---|---|---|
| 1 | Pichai: "75% of all new code at Google is now AI-generated and approved by engineers" (22 Apr 2026); one migration 6x faster | blog.google Cloud Next '26 post; Semafor 24 Apr 2026 | CONFIRMED verbatim; post adds "up from 50% last fall". Semafor: 25% (2024) -> 50% (fall 2025) -> 75% |
| 2 | METR 2025: n=16, 246 tasks, +19% time; forecast -24%, belief -20%; economists -39%, ML experts -38%; ~5 years on repo; $150/h; Cursor Pro + Claude 3.5/3.7 Sonnet; 22k+ stars, 1M+ lines | metr.org blog 10 Jul 2025; arXiv 2507.09089 abstract | CONFIRMED. CI bounds (+2%..+39%) not restated in blog text or abstract; flagged in the table |
| 3 | METR Feb 2026: -18% (CI -38%..+9%) returning, -4% (CI -15%..+9%) new; 57 devs (10+47); 800+ tasks; 143 repos; started Aug 2025; 30-50% avoided tasks | metr.org 24 Feb 2026 | CONFIRMED. Added: rerun paid $50/h vs $150/h in 2025 |
| 4 | Veracode 2026 (28 Jul 2026): 56% pass / 44% flawed; GPT-5.5 68%; reasoning 56% vs 51%; coding 51% vs general 52%; large 53% vs small/medium 51%; SQLi 83, crypto 87, XSS 15, log injection 12; "roughly half" of committed code | veracode.com blog | CONFIRMED in full |
| 5 | Veracode 2025 (30 Jul 2025): 45% failed; 100+ LLMs; Java 72 / C# 45 / JS 43 / Python 38; XSS 86%; no improvement with size or sophistication | veracode.com blog + 2025 report landing page | CONFIRMED except "80 coding tasks" and "log injection 88%", which appear on neither page -> UNVERIFIED |
| 6 | Veracode Spring 2026 (24 Mar 2026): 55% pass; 95%+ syntax; 150+ LLMs; Python 62 / C# 58 / JS 57 / Java 29; SQLi 82, crypto 86, XSS 15, log 13; best 70-72% | veracode.com blog | CONFIRMED. "OpenAI" attribution of the 70-72% not re-confirmed (blog says "reasoning-focused models") |
| 7 | Stack Overflow 2025 (29 Jul 2025): 84% use/plan (76% in 2024); 51% of pros daily; 3.1% highly trust; 29.6% somewhat trust; 26.1% + 19.6% = 46% distrust vs 33% trust; 60% favourable (70%+ in 2023-24); 66% "almost right"; 45.2% debugging longer; 72% + 5.3% "no" to vibe coding (~77%); agents 31% use / 38% no plans / 69% productivity; Cursor 18%, Claude Code 10%; GPT 81%, Claude Sonnet 43%, Gemini Flash 35%; 64% no job threat (68% in 2024); 49,000+ / 177 countries / 62 questions | survey.stackoverflow.co/2025/ai; SO press release | CONFIRMED in full |
| 8 | Stack Overflow 2026 results not yet published | survey.stackoverflow.co/2026/ (404); stackoverflow.blog 23 Jun 2026 | CONFIRMED: 404 on 21 Sep 2026; survey opened 23 Jun 2026, no results date given |
| 9 | JetBrains Aug 2026: 15,000+ pros, May-Jul 2026; 90% weekly, 68% daily; Claude Code 39% (47% US; 18% in Jan 2026), most-used for 31%; Copilot 21% (29% a year earlier); Codex 16% (3%); Cursor 12% (18%); JetBrains AI ~9%; OpenCode 7%; Antigravity 6%; awareness Copilot 79 / Cursor 75 / Codex 65 | blog.jetbrains.com | CONFIRMED. "Antigravity 15% in India" not re-confirmed |
| 10 | Anthropic skills RCT (29 Jan 2026): 52 mostly-junior devs; Python Trio; 50% vs 67%; d = 0.738; p = 0.01; ~2 min faster, n.s.; debugging largest gap; high-scoring patterns n = 2/3/7, low-scoring n = 4/4/4 | anthropic.com/research | CONFIRMED (file rounds d to 0.74) |
| 11 | Stanford canaries: ~19% gap (12 Aug 2026); "13%" (Aug 2025); software devs 22-25 down ~20% | digitaleconomy.stanford.edu news + publication page; Nov 2025 PDF (text-extracted) | 19% CONFIRMED (data through Jun 2026; "descriptive, not causal"; reduced hiring). Nov 2025 revision says 16%, and "nearly 20%" for software developers 22-25 by Sep 2025 vs late-2022 peak: CONFIRMED. Aug 2026 update gives 15% for the July 2025 vintage on its own measure. "13%" left UNVERIFIED; row rewritten so the two measures are not chained |
| 12 | YC W25 (TechCrunch, 6 Mar 2025): Jared Friedman; a quarter of the batch at ~95%; imports excluded; "highly technical"; Diana Hu on taste; Tan on debugging | techcrunch.com | CONFIRMED |
| 13 | Garry Tan, CNBC 15 Mar 2025 | cnbc.com | 403 again; stays UNVERIFIED |
| 14 | Anthropic Institute: >80% of merged code by Claude (May 2026); low single digits before Feb 2025; 8x code/engineer/day (Q2 2026 vs 2024); ~4x survey; "almost certainly an overstatement" | anthropic.com/institute (updated 18 Sep 2026) | CONFIRMED. Survey detail added: poll of 130 research staff, Mar 2026, "with Mythos Preview" |
| 15 | Amodei, CFR 10 Mar 2025: 90% of code in three to six months, essentially all in twelve | cfr.org | CONFIRMED verbatim |
| 16 | Science / CSH: 29% of new US Python functions end-2024 (5% in 2022); DE 23, FR 24, IN 20, RU 15, CN 12; 30M+ contributions, ~160k devs; +3.6%; $23-38B/yr; 37% vs 27% usage; gains to experienced devs; Science 22 Jan 2026 | csh.ac.at | CONFIRMED. Wording fixed: 3.6% is a level effect on quarterly output, not "per quarter"; non-US figures are early-2025 |
| 17 | Series G (12 Feb 2026): $30B at $380B; $14B run-rate; Claude Code >$2.5B, "more than doubled since the beginning of 2026"; WAU doubled; business subscriptions 4x; enterprise >50%; 4% of GitHub public commits, double the prior month | anthropic.com/news | CONFIRMED. $1M+ customers: "exceeds 500" in Feb 2026; the file's "1,000+" is the May 2026 VentureBeat figure; both now shown with dates |
| 18 | VentureBeat: $30B run-rate (Apr 2026); "plan ... 10x ... saw 80x"; Claude Code $1B within six months of launch; 1,000+ $1M customers | venturebeat.com | CONFIRMED; article date is 8 May 2026 (file said "reported Nov 2025"); corrected |
| 19 | SemiAnalysis (5 Feb 2026): 4% of public commits; 20%+ of daily commits by end 2026; X posts by @dylan522p and @SemiAnalysis_ | newsletter.semianalysis.com; fxtwitter mirror; snowflake decode | CONFIRMED (posts dated 5 Feb and 27 Feb 2026, identical text). Detection method not stated in the article -> UNVERIFIED |
| 20 | Levels: $87k MRR = $1M ARR in 17 days, post of ~11 Mar 2025; Cursor + Claude | fxtwitter mirror of status 1899596115210891751 (11 Mar 2025 22:59 UTC); levels.io blog | CONFIRMED figures, date and tools. REFUTED the file's "not subscriptions": Levels wrote "they ARE subscriptions and they do renew". "3 hours", Grok 3, F-16 $29.99, Musk amplification and follower count not in any source opened -> UNVERIFIED |
| 21 | Levels revenue "$0/month" by mid-2026 | dev.to/promptway | Secondary only; the page date as fetched (24 Jun 2025) conflicts with its citation of a mid-2026 bio -> UNVERIFIED, flagged |
| 22 | Karpathy coined "vibe coding", 2 Feb 2025, status 1886192184808149383 | fxtwitter mirror; snowflake decode (2 Feb 2025 23:17 UTC) | CONFIRMED text and date; status upgraded from UNVERIFIED to [V] |
| 23 | Base44 (TechCrunch, 18 Jun 2025): $80M cash to Wix; 6 months old; 250,000 users; $189,000 profit in May; 8 employees; $25M retention pool; Maor Shlomo, ex-Explorium; bootstrapped | techcrunch.com | CONFIRMED in full |
| 24 | Cursor acquired by SpaceX, closed 14 Aug 2026, ~$60B all-stock | SEC Form 8-K, Space Exploration Technologies Corp. (CIK 1181412), filed 14 Aug 2026, Items 2.01/3.02 | CONFIRMED from primary: agreement 16 Jun 2026; effective 14 Aug 2026; 389,289,254 Class A shares; "implied equity value of Cursor of $60.0 billion". Row and myth #12 rewritten; status [V] |
| 25 | Cursor $9.9B valuation, $500M+ ARR, 5 Jun 2025 | techcrunch.com | CONFIRMED ($900M round) |
| 26 | Nadella (LlamaCon, 29 Apr 2025): 20-30% "written by software"; Python > C++; Zuckerberg did not know Meta's figure; Kevin Scott 95% by 2030; methodology caveat | techcrunch.com | CONFIRMED |
| 27 | Fortune (29 Jan 2026): Cherny "100% for two+ months"; 22 and 27 PRs on consecutive days; Anthropic 70-90%; Claude Code ~90%; Microsoft ~30%, Salesforce similar; Karpathy on subtle errors and dead code | fortune.com | CONFIRMED |
| 28 | Lovable (TechCrunch, 9 Jun 2026): $500M annualised; 1M projects/week; 50M+ projects; $400M in Feb 2026; abandonment caveat | techcrunch.com | CONFIRMED; "Feb-Mar 2026" tightened to Feb 2026 |
| 29 | METR survey (11 May 2026): n = 349 (87/71/129/48); Feb-Apr 2026; 1.4-2x value, 3x speed; 1.3x recalled for Mar 2025; 2.5x forecast for Mar 2027; 50% use Claude Code; 7 months with agents; 40-point overestimate caveat | metr.org | CONFIRMED |
| 30 | METR task-substitution note (8 May 2026): old-task uplift <= value uplift <= new-task uplift; +33% vs +50% | metr.org | CONFIRMED |
| 31 | MirrorCode (10 Apr 2026): Opus 4.6; gotree 16,905 Go lines; 2,000/2,001 tests; 2-17 weeks; ~$550; Pkl unsolved; needs precise spec; memorisation not excluded | epoch.ai | CONFIRMED; 280M tokens used of a 1B budget; wording tightened |
| 32 | No new METR productivity RCT after 24 Feb 2026 | metr.org/research | CONFIRMED as of 21 Sep 2026 |
| 33 | HN thread 44522772: 775 points, 485 comments, 10 Jul 2025; "50+ hours of Cursor" note | news.ycombinator.com | CONFIRMED (the 50-hours line is the paper authors' own caveat, quoted in-thread) |
| 34 | Copilot 2022 (7 Sep 2022): 55% faster; 1h11 vs 2h41; 95% CI [21%, 89%]; 78% vs 70% completion; 95 devs; JavaScript HTTP server | github.blog | CONFIRMED |
| 35 | Google RCT: 96 engineers; ~21% less time; summer 2024; "confidence interval is large" | arXiv 2410.12944 abstract | CONFIRMED (96 vs 114 min is from the paper body, not re-checked) |
| 36 | DORA 2025 (23 Sep 2025): 90% (+14 pts); median 2 h/day; 65% rely; 80%+ productivity up; 59% quality up; trust 4% + 20% = 24%, 23% + 7% = 30%; ~5,000 respondents | blog.google | CONFIRMED |
| 37 | DORA ROI model (InfoQ, 11 May 2026): 500 engineers; $8.4M cost; $11.6M value; 39% ROI; ~8 months; 35-40% vs ~10%; CFR 5% -> 6%; 727% three-year marketing figure | infoq.com | CONFIRMED (secondary) |
| 38 | Faros (23 Jul 2025): 10,000+ devs, 1,255 teams; +21% tasks; +98% PRs; +91% review time; +154% PR size; +9% bugs; no company-level correlation | faros.ai | CONFIRMED |
| 39 | CodeRabbit (17 Dec 2025): 470 PRs; 1.7x issues; 1.75 / 1.64 / 1.57 / 1.42 / 2.74 | coderabbit.ai newsroom; theregister.com | CONFIRMED (category multipliers via The Register; 10.83 vs 6.45 issues per PR). 320/150 split shown on neither page -> UNVERIFIED |
| 40 | GitClear 2025 and 2026 figures | gitclear.com (403 twice); jonas.rs; arturmarkus.com | Primary still blocked; both secondary summaries match the file's numbers. "25 large open-source projects" and the 4-10x / ~25% velocity claims not in the summaries -> UNVERIFIED. The arturmarkus summary itself cites "Stack Overflow 2026: 84% / 3%", a live example of the recycled-2025-data problem in myth #4 |
| 41 | Copilot: 50M of GitHub's 225M users (FY26 Q4, 29 Jul 2026) | office365itpros.com | CONFIRMED (secondary); paid vs free not specified |
| 42 | Semafor date and framing | semafor.com | CONFIRMED (24 Apr 2026; "pretty impossible to fact-check") |

Net result: 2 refutations (Levels "not subscriptions"; VentureBeat "Nov 2025"), 1 misleading wording fixed (3.6% "per quarter"), 1 chained-measure error fixed (Stanford 13% -> 19%), 5 items upgraded from UNVERIFIED to verified (Karpathy post, Levels post, Cursor/SpaceX via 8-K, Stanford ~20% software-developer figure, SemiAnalysis X posts), 9 sub-details newly marked UNVERIFIED. Every headline number on the proposed "Two truths" screen (75%, 80%+, 39%, $2.5B+, -19%, 44%, 3.1%, 50 vs 67) survived.

---

## Visual candidates

| URL | What it shows | Teaching point |
|---|---|---|
| https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/ | The bar chart: expert forecasts, developer forecast (+24%), developer post-hoc estimate (+20%), observed result (-19%) | Felt speed is not measured speed. Best single chart for the talk |
| https://metr.org/blog/2026-02-24-uplift-update/ | Late-2025 estimates with confidence intervals crossing zero (-18% returning, -4% new) and the list of selection problems | Science updates itself; honest uncertainty; developers refusing to work without AI is itself a finding |
| https://news.ycombinator.com/item?id=44522772 | HN thread on the METR study, 775 points / 485 comments, 10 Jul 2025 | How practitioners argued about it; the "50+ hours of Cursor experience" comment |
| https://metr.org/blog/2026-05-11-ai-usage-survey/ | Self-reported 1.4-2x gains with METR's own warning about self-report | Contrast with the RCT: same lab, two very different kinds of evidence |
| https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/ | Headline plus the Friedman passage | Read past the headline: 25% of startups, technical founders, imports excluded |
| https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/cloud-next-2026-sundar-pichai/ | Pichai's paragraph: 75% of new code, AI-generated and engineer-approved | Frontier adoption, and the word "approved" |
| https://www.anthropic.com/institute/recursive-self-improvement | Chart of share of merged code authored by Claude rising to 80%+, with Anthropic's own caveat on lines of code | Even the vendor says LoC overstates productivity |
| https://www.anthropic.com/research/AI-assistance-coding-skills | Quiz score chart (50% vs 67%) and the six interaction patterns | How to use AI without hollowing out your skills; ideal for the student audience |
| https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/ | Flat security pass-rate line (~55-56%) against near-100% syntax correctness; per-CWE bars (XSS 15%, log injection 12%) | Runs is not the same as safe; always prompt for and review security |
| https://view.ceros.com/veracode/genai-code-security-report2026 | Interactive 2026 report (charts by language and CWE) | Same, higher-fidelity charts |
| https://survey.stackoverflow.co/2025/ai | Trust-in-accuracy chart (46% distrust, 3.1% highly trust) and the frustrations chart (66% "almost right") | Pros use it daily and verify everything |
| https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/ | Tool adoption chart: Claude Code 39%, Copilot 21%, Codex 16%, Cursor 12% | Why the workshop teaches Claude Code; how fast the market flips |
| https://x.com/dylan522p/status/2019490550911766763 (5 Feb 2026) and https://x.com/SemiAnalysis_/status/2027443723362042308 (27 Feb 2026, same text) | Post: "4% of GitHub public commits are being authored by Claude Code right now", 20%+ of daily commits projected by end of 2026, with a chart image [V, text via fxtwitter mirror] | Scale of agentic coding; also a lesson in asking how the metric is built (SemiAnalysis does not state the method) |
| https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point | The commit-share chart in article form | Same |
| https://x.com/levelsio/status/1899596115210891751 | Levels' post of 11 Mar 2025: $0 to $1M ARR in 17 days, $87k MRR, 320,000 players [V]. The same post contains "they ARE subscriptions and they do renew" and his warning that AI code "can be full of security holes" unless you ask it to check | The iconic success screenshot; pair it with the caveat slide, and reuse the XSS line in the security section |
| https://levels.io/fly-pieter-com-vibecoded-flight-simulator | His own write-up with the embedded tweet timeline (60+ posts) | Building in public as distribution; distribution beats code |
| https://dev.to/promptway/he-built-a-flight-simulator-in-three-hours-and-hit-1m-a-year-in-17-days-then-it-went-to-zero-1b1l | Headline about the revenue going to zero | Run-rate is not revenue; one-off income versus subscriptions |
| https://techcrunch.com/2025/06/18/6-month-old-solo-owned-vibe-coder-base44-sells-to-wix-for-80m-cash/ | Base44 $80M headline | Success story with fine print (8 staff, repeat founder, sells the shovel) |
| https://csh.ac.at/news/ai-is-already-writing-almost-one-third-of-new-software-code/ | Country adoption chart (US 29% ... China 12%) | Independent measurement vs CEO statements; seniors capture the gains |
| https://digitaleconomy.stanford.edu/project/indicators/canaries-dashboard/ and https://digitaleconomy.stanford.edu/news/canariesaug26/ | Employment lines diverging for ages 22-25 in AI-exposed jobs (gap ~19%) | Why "learn to verify and steer" matters for juniors |
| https://www.gitclear.com/ai_assistant_code_quality_2025_research | Chart of copy/paste lines overtaking moved (refactored) lines in 2024 | AI adds code, it rarely tidies; ask the agent to refactor and deduplicate |
| https://www.faros.ai/blog/ai-software-engineering | +98% PRs vs +91% review time graphic | The bottleneck moves to review; reading code is the new core skill |
| https://fortune.com/2026/01/29/100-percent-of-code-at-anthropic-and-openai-is-now-ai-written-boris-cherny-roon/ | Embedded posts by Boris Cherny (100% AI-written, 22 and 27 PRs/day) | What an expert workflow at the extreme looks like |
| https://x.com/karpathy/status/1886192184808149383 | The post that coined "vibe coding", 2 Feb 2025 23:17 UTC [V, text and date confirmed via the fxtwitter mirror and snowflake decode]. Key lines: "I 'Accept All' always, I don't read the diffs anymore" and "It's not too bad for throwaway weekend projects" | Origin of the term; he meant throwaway weekend projects, which is exactly the boundary the masterclass teaches |
