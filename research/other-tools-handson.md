# Other AI coding tools, hands-on (state of the landscape: 21 Sep 2026)

Research file for vibecoding.qairuhub.com. Scope: everything that is NOT Claude Code, from the point of view of a student/builder in Kazakhstan. All prices in USD, checked 21 Sep 2026.

Legend: **[V]** = verified, I opened the primary source today. **[S]** = secondary source only (blog/aggregator), treat as likely but re-check. **UNVERIFIED** = from memory or a search snippet, not opened.

---

## 0. TL;DR for the masterclass (what changed vs. what people still repeat)

The 2025-era mental map ("Cursor vs Windsurf vs Copilot, plus free Gemini CLI") is outdated. Six things broke it in 2026:

1. **Gemini CLI is no longer a free consumer tool.** Since 18 Jun 2026 it stopped serving free users and Google AI Pro/Ultra subscribers; they were moved to **Antigravity CLI (`agy`)**, whose GitHub repo publishes only README/CHANGELOG/examples and no source code (fact-checked 21 Sep 2026; Google's own posts never use the words "closed source"). Gemini CLI lives on for enterprise licences / paid keys. Announced 19 May 2026 by Dmitry Lyalin and Taylor Mullen; the announcement discussion shows 6 thumbs-up vs 301 thumbs-down. [V] https://github.com/google-gemini/gemini-cli/discussions/27274 , https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/ , https://geminicli.com/docs/resources/quota-and-pricing/ , https://github.com/google-antigravity/antigravity-cli
2. **Windsurf is now "Devin Desktop"** (rebrand shipped 2 Jun 2026 as an over-the-air update; Cascade agent replaced by "Devin Local", legacy Cascade supported until 1 Jul 2026). windsurf.com docs redirect to docs.devin.ai. [V] https://devin.ai/blog/windsurf-is-now-devin-desktop/ , https://docs.devin.ai/desktop/accounts/usage
3. **Roo Code is dead.** Repo archived 15 May 2026; README points users to Cline or the community fork ZooCode. [V] https://github.com/RooCodeInc/Roo-Code
4. **Cursor belongs to SpaceX.** $60B deal reported 16 Jun 2026 (Reuters, via HN "SpaceX to buy Cursor for $60B", 1,151 points / 1,703 comments [V for the HN thread; Reuters and CNBC not fetchable]); closed 14 Aug 2026 per Cursor's own blog post "Cursor is now a part of SpaceX" [V] https://cursor.com/blog . The earlier step was disclosed 21 Apr 2026: SpaceX posted that it had an "agreement to acquire Cursor for $60B" (HN 47855293, 823 points / 989 comments; HN commenters describe it as roughly $10B paid for an option with a $60B strike) [V for HN thread, S for the option structure]. "All-stock" appears only in HN comments: UNVERIFIED. Cursor's pricing page now lists "Generous limits for Grok" and "Grok Bot access" (linking to x.ai/bot) next to Claude/GPT/Gemini, but does not mention SpaceX or xAI [V] https://cursor.com/pricing . HN thread https://news.ycombinator.com/item?id=48553224 .
5. **GitHub Copilot is metered by tokens now.** "Premium requests" were replaced by GitHub AI Credits on 1 Jun 2026 (announced 27 Apr 2026; the announcement listed Pro $10 with $10 of credits and Pro+ $39 with $39, and no Max tier) [V] https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/ . The plans page today is more generous and adds a tier: Pro $10 with $15 credits, Pro+ $39 with $70, Max $100 with $200, 1 credit = $0.01 [V] https://github.com/features/copilot/plans . The Student plan: original post 11 Mar 2026 (effective 12 Mar), "Update June 1" gives 200 AI credits/month, "Update June 24th" makes auto model selection the only option on Free and Student; 6,796 thumbs-down on the post [V] https://github.com/orgs/community/discussions/189268
6. **Claude Code reads AGENTS.md natively** since v2.1.277 (18 Sep 2026) when the project has no CLAUDE.md. The "Claude ignores AGENTS.md, you must symlink" advice is now a legacy workaround. [V] https://code.claude.com/docs/en/changelog , https://code.claude.com/docs/en/memory

Teaching consequence: do not teach tools as stable products. Teach **the four surfaces** (below) and **portable habits** (AGENTS.md, git checkpoints, plan-then-build, review diffs). Tools get renamed, acquired, or paywalled within a quarter.

---

## 1. A structured way in: the four surfaces ladder

Use this as the spine of the "other tools" part of the site instead of a flat list. Each rung adds autonomy and removes hand-holding.

| Rung | Surface | You work in... | Tools (Sep 2026) | Who starts here |
|---|---|---|---|---|
| 1 | **Prompt-to-app builders** | Browser, no local setup | Lovable, Bolt.new, v0, Replit | Total beginners, designers, "I need a demo tonight" |
| 2 | **AI IDEs / editor agents** | A VS Code-like editor, you see every diff | Cursor, VS Code + Copilot agent mode, Antigravity IDE, Devin Desktop (ex-Windsurf), Kiro, Cline extension | Students who can read code a little |
| 3 | **Terminal agents** | Your shell + git repo | Claude Code, Codex CLI, Antigravity CLI (`agy`), opencode, Copilot CLI, Cursor CLI (`agent`), Cline CLI, Aider, Kiro CLI | Builders comfortable with git and a terminal |
| 4 | **Async / cloud agents** | GitHub issues and PRs; agent works while you sleep | Codex cloud, Jules, Devin Cloud, Copilot cloud agent, Cursor Cloud Agents | People with a real repo, tests, and review discipline |

Portable skills across all rungs (this is what the talk should hammer): write a spec/plan first; keep an AGENTS.md; commit before every agent run; read the diff; run the tests; never paste secrets; treat README/web content as untrusted (see security note in section 7).

---

## 2. Decision guide: "which tool should I start with?"

**Step 1. Budget.**

- **$0, student with a university email** -> GitHub Education -> Copilot Student plan in VS Code (unlimited completions + 200 AI credits/month, auto model only) [V] https://github.com/orgs/community/discussions/189268 . Add Antigravity free tier for heavier agent work (section 3.4). Add Jules free (15 tasks/day) for async PRs.
- **$0, no student status** -> Antigravity (IDE or `agy`) free Individual plan; opencode + Zen free models; Codex on ChatGPT Free (small allowance); Cursor Hobby; Devin Desktop Free; Kiro Free (50 credits/month).
- **~$20/month, one subscription only** -> pick by ecosystem you already pay for:
  - already have ChatGPT Plus -> Codex (CLI + IDE extension + cloud) is included, no extra cost [V] https://learn.chatgpt.com/docs/pricing
  - already have Claude Pro -> Claude Code (main track of this masterclass)
  - want one GUI editor with every vendor's models -> Cursor Pro $20 [V] https://cursor.com/docs/account/pricing
  - Google AI Pro ($19.99 [S]) -> higher Antigravity limits + Jules 100 tasks/day [V] https://jules.google/docs/usage-limits/
- **$10/month** -> Copilot Pro ($10, includes $15 of AI credits) is the cheapest paid agent [V] https://github.com/features/copilot/plans

**Step 2. Comfort level.**

- Never opened a terminal -> rung 1 (Lovable or Bolt) for the first win, then Cursor or Antigravity IDE.
- Knows VS Code -> Copilot agent mode or Cursor; same keybindings, lowest friction.
- Lives in the terminal / wants to understand how agents really work -> Codex CLI, `agy`, or opencode next to Claude Code.

**Step 3. Goal.**

- Landing page / MVP for a pitch this week -> Lovable (full-stack with built-in backend), v0 (best UI/Next.js, deploys to Vercel), Bolt (fast in-browser full-stack).
- Learn real software engineering with AI -> IDE or terminal agent in a git repo. App builders hide too much.
- Big existing codebase, tickets, PR workflow -> async agents (Codex cloud, Jules, Devin, Copilot cloud agent).
- Want spec-driven discipline forced on you -> Kiro (requirements -> design -> tasks).
- Want open source, model-agnostic, or local models -> opencode, Cline, Aider.

**Default recommendation for a Kazakhstan student audience:** Rung 2 with VS Code + Copilot Student (free) or Antigravity (free), then graduate to a terminal agent (Claude Code / Codex CLI). One paid $20 plan is enough; do not stack subscriptions.

---

## 3. Tool cards

Format: what / get started / price / best at / weakness / docs.

### 3.1 Cursor (Anysphere, part of SpaceX since 14 Aug 2026)
- **What:** VS Code fork with a built-in multi-model coding agent, Tab completion, Plan mode, cloud agents, and a CLI.
- **Start:** download at https://cursor.com ; CLI: `curl https://cursor.com/install -fsS | bash` (macOS/Linux/WSL) or `irm 'https://cursor.com/install?win32=true' | iex` (PowerShell); binary is `agent` [V] https://cursor.com/docs/cli/overview
- **Price:** Hobby free ("No credit card required", limited Agent requests); Pro/"Individual" $20; Pro Plus $60; Ultra $200; Teams Standard $40/user, Teams Premium $120/user; India-only "Start" plan at "₹649/mo, tax inclusive" [V] https://cursor.com/pricing , https://cursor.com/docs/account/pricing . Cursor's own docs say "Daily Agent users: Typically $60–$100/mo total usage" [V same]. Pro+ = 3x, Ultra = 20x usage [S] https://www.digitalapplied.com/blog/grok-bot-cursor-tier-gating-spacex-anysphere-deal-2026 ; Cursor's docs describe the tiers by included usage pools, not multipliers, so keep the multipliers off slides.
- **Models seen in docs (21 Sep 2026):** Composer 2.5; Grok 4.5, 4.6, 4.7 (incl. 500k-context and Fast variants); Claude from 4 Sonnet through Opus 4.8, plus Claude Opus 5, Sonnet 5, Fable 5 and Fable 5.1; GPT-5 through GPT-5.6 Luna/Sol/Terra incl. Codex variants (no GPT-6 listed); Gemini 2.5 Flash through 3.8 Flash and 3.1 Pro; Kimi K2.7 Code and K3; GLM 5.2; Muse Spark 1.3 [V] https://cursor.com/docs/models
- **Best at:** the smoothest GUI agent loop (Ctrl/Cmd+I agent, Shift+Tab plan mode), model choice, big community of rules/tutorials.
- **Weakness:** usage-based pool burns fast on frontier models; pricing/ownership changed several times; student "free year of Pro" is gone, the students page now only promises promotions at campus/online events [V] https://cursor.com/students
- **Docs:** https://cursor.com/docs

### 3.2 OpenAI Codex (CLI, IDE extension, cloud, desktop app)
- **What:** OpenAI's coding agent, one account across terminal, VS Code-family extension, cloud tasks that open PRs, and code review.
- **Start (CLI):** `npm install -g @openai/codex` or `brew install --cask codex` or `curl -fsSL https://chatgpt.com/codex/install.sh | sh`; Windows: `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"`; run `codex`, sign in with ChatGPT [V] https://github.com/openai/codex (Apache-2.0, 125.7k stars on 21 Sep 2026). Note: the README's "Sign in with ChatGPT" paragraph names Plus, Pro, Business, Edu and Enterprise only, while the pricing page says Free and Go include Codex; test a Free account before promising it on stage. Trap: the npm package is `@openai/codex`, not `codex` [S] https://www.verdent.ai/guides/install-codex-cli-mac-windows-linux
- **Price:** included in ChatGPT Free ("Explore Codex capabilities on quick coding tasks") and Go $8 ("Use Codex for lightweight coding tasks"); Plus $20 with per-5-hour local-message ranges that depend on model (GPT-6 Astra 5-45, GPT-5.6 Sol 10-100, GPT-5.6 Terra 25-200, GPT-5.6 Luna 250-2,000, GPT-5.5 15-80, GPT-5.4 20-100, GPT-5.4 mini 60-350); Pro from $100 with "5x or 20x more Codex usage than Plus"; Business $20/user/month billed annually ($25 monthly, 2+ users); extra credits purchasable; API-key mode bills per token [V] https://learn.chatgpt.com/docs/pricing .
- **Best at:** strongest "one subscription, three surfaces" story; cloud tasks + GitHub PR review; open-source CLI; native AGENTS.md.
- **Weakness:** limits are ranges, not numbers, and vary by model; Windows sandbox labelled experimental [S] https://www.codeagentswarm.com/en/guides/codex-cli-on-windows ; Free/Go allowances are tiny.
- **Docs:** https://learn.chatgpt.com/docs/codex/cli (developers.openai.com/codex now 308-redirects to learn.chatgpt.com [V])

### 3.3 Gemini CLI (Google) - status: enterprise-only in practice
- **What:** open-source (Apache-2.0) terminal agent for Gemini models; ~107k GitHub stars [V] https://github.com/google-gemini/gemini-cli
- **What happened:** "Service update: mitigating abuse and prioritizing traffic" posted 18 Mar 2026 (author ryanjsalva), effective 25 Mar 2026: "Gemini Pro models will only be accessible via paid subscriptions", free tier limited to Flash [V] https://github.com/google-gemini/gemini-cli/discussions/22970 (1,039 thumbs-down vs 137 thumbs-up on 21 Sep 2026). 19 May 2026: Google announced that from 18 Jun 2026 Gemini CLI stops serving free users and Google AI Pro/Ultra subscribers; enterprise (Gemini Code Assist Standard/Enterprise, Google Cloud, paid Gemini Enterprise Agent Platform keys) keeps working [V] discussion #27274 and Google Developers Blog (links in section 0). The one quote worth showing on a slide, from the maintainers' post (full sentence begins "On June 18, 2026,"): "Gemini CLI will stop serving requests for Google AI Pro and Ultra".
- **Still installable:** `npm install -g @google/gemini-cli` / `npx @google/gemini-cli` / `brew install gemini-cli` [V README]. Note the README still advertises "1,000 requests/day" with Google login; the official docs site contradicts it and says free/Google One users were replaced by Antigravity CLI on 18 Jun 2026 [V] https://geminicli.com/docs/resources/quota-and-pricing/ , https://geminicli.com/docs/get-started/authentication/ . Whether an unpaid AI Studio API key still works is contradictory between pages: UNVERIFIED, test before the workshop.
- **Use it only if:** your university/company has Gemini Code Assist Standard/Enterprise or you have a paid API key. Otherwise go to 3.4.

### 3.4 Google Antigravity (IDE, "Antigravity 2.0" desktop app, and Antigravity CLI `agy`)
- **What:** Google's agent-first dev platform: a VS Code-style IDE, a multi-agent desktop app, and a terminal agent that replaced Gemini CLI for consumers ("Go-based" is UNVERIFIED; the public repo has no source, so the language cannot be checked).
- **Start:** IDE/desktop from https://antigravity.google ; CLI: `curl -fsSL https://antigravity.google/cli/install.sh | bash` (macOS/Linux), `irm https://antigravity.google/cli/install.ps1 | iex` (PowerShell); then `cd project && agy` [V] https://github.com/google-antigravity/antigravity-cli , https://antigravity.google/docs/getting-started?tab=cli . Binary lands in `~/.local/bin/agy` or `%LOCALAPPDATA%\agy\bin`.
- **Price:** Individual plan $0 with weekly rate limits, unlimited tab completions; the pricing page lists Gemini 3.8/3.7/3.6 Flash, Gemini 3.1 Pro, Claude Sonnet and Opus 4.6, and gpt-oss-120b under the free plan [V] https://antigravity.google/pricing . Higher limits ride on Google AI Pro ($19.99 [S]) / Ultra ($99.99 5x, $199.99 20x [S]) https://www.cloudzero.com/blog/google-antigravity-pricing/ . No Antigravity-only subscription.
- **Kazakhstan:** listed as supported (so are Kyrgyzstan and Uzbekistan); personal Google accounts only; not available to under-18 users [V] https://antigravity.google/docs/faq/ . That age gate matters for school-age attendees.
- **Best at:** the most generous free agent access right now, including non-Google models; multi-agent manager; `/goal`, `/grill-me`, `/schedule`, `/browser` commands in the CLI [V getting-started].
- **Weakness:** no published source (repo = README, CHANGELOG, examples, issue tracker [V]), interactive Google sign-in (awkward for CI/headless [S] https://yaw.sh/blog/gemini-cli-not-free-alternatives/ ); Google has cut free tiers twice in 2026, so "free" has a shelf life; weekly limits are opaque (`/usage` shows remaining quota per model [V] https://antigravity.google/docs/cli/commands/usage/ ).
- **Docs:** https://antigravity.google/docs ; migration from Gemini CLI: https://antigravity.google/docs/cli/gcli-migration

### 3.5 GitHub Copilot (agent mode in VS Code, cloud agent, Copilot CLI)
- **What:** the default AI layer of VS Code/GitHub: completions, chat, local agent mode, a cloud agent that works on issues and returns PRs, code review, and a terminal CLI. VS Code now also hosts Claude and Codex "harnesses" next to Copilot [V] https://code.visualstudio.com/docs/copilot/agents/overview
- **Start:** install VS Code -> sign in with GitHub -> Chat view -> Agent. CLI: `npm install -g @github/copilot`, `winget install GitHub.Copilot`, `brew install copilot-cli`, or `curl -fsSL https://gh.io/copilot-install | bash`; binary `copilot`; needs PowerShell 6+ on Windows [V] https://github.com/github/copilot-cli
- **Price:** Free (2,000 completions/month + limited chat/agent); Pro $10 (includes $15 credits); Pro+ $39 ($70 credits); Max $100 ($200 credits); Business $19/user; Enterprise $39/user. Completions and next-edit suggestions are unmetered on paid plans; 1 AI credit = $0.01 [V] https://github.com/features/copilot/plans and GitHub blog (section 0). Students: free Copilot Student plan via GitHub Education, 200 credits/month (since the 1 Jun 2026 update), auto model selection only since the 24 Jun 2026 update [V] discussion #189268. Teachers and popular OSS maintainers get Copilot Pro free [V] https://docs.github.com/en/copilot/how-tos/manage-your-account/get-free-access-to-copilot-pro
- **Best at:** cheapest paid tier; zero-install inside VS Code; tight GitHub issue -> PR loop; reads everyone's instruction files (section 5).
- **Weakness:** 200 student credits is roughly $2 of agent usage, so heavy agent work is not free any more; annual plans appear retired (the blog says existing annual Pro/Pro+ users keep their plan until expiry, then move to Free "with the option to upgrade to a paid monthly plan"; the plans page shows no annual option [V blog + plans page, inference]); model choice removed on Free/Student.
- **Docs:** https://docs.github.com/en/copilot , https://code.visualstudio.com/docs/copilot/overview

### 3.6 Devin Desktop (formerly Windsurf) and Devin Cloud (Cognition)
- **What:** Devin Desktop = the Windsurf editor rebranded, with Devin Local agent and an "Agent Command Center"; also hosts other agents over the Agent Client Protocol (Claude Agent, OpenCode). Devin Cloud = the autonomous cloud software engineer. [V] https://devin.ai/blog/windsurf-is-now-devin-desktop/
- **Start:** download for Mac/Windows/Linux, import VS Code or Cursor settings during onboarding, log in with a Devin account [V] https://docs.devin.ai/desktop/getting-started
- **Price:** Free $0 ("Light quota to code with agents", "Limited model availability", "Unlimited Tab completions", "Unlimited inline edits", no Devin Cloud); Pro $20 ("frontier models from OpenAI, Claude, Gemini, and SpaceXAI", "Access to cloud agents (Devin Cloud)", SWE-2 Free included through 10 Oct 2026); Max $200 ("Significantly higher quotas"); Teams $80/month + $40 per full developer seat; Enterprise custom [V 21 Sep 2026] https://devin.ai/pricing . Quotas refresh daily/weekly instead of monthly credits since March 2026 [S] https://www.verdent.ai/guides/windsurf-pricing-2026 . Payment methods include Apple Pay, Google Pay, WeChat Pay, Alipay besides cards [V] https://docs.devin.ai/desktop/accounts/usage
- **Best at:** one $20 plan that covers both a local IDE agent and a cloud agent; good for delegating whole tickets.
- **Weakness:** third name in two years (Codeium -> Windsurf -> Devin Desktop), so tutorials are stale; the old "$500/month Devin" reputation lingers; cloud agent still needs a repo with tests to be useful.
- **Docs:** https://docs.devin.ai

### 3.7 AWS Kiro
- **What:** spec-driven agentic IDE (requirements -> design -> tasks), plus CLI, web, iOS TestFlight app; steering files and hooks.
- **Start:** download from https://kiro.dev , sign in with social login, AWS Builder ID, or IAM Identity Center; IDE on macOS/Windows 10-11/Linux, CLI on macOS/Windows 11 PowerShell/Linux [V] https://kiro.dev/docs/getting-started/installation/
- **Price:** Free 50 credits/month (open-weight models + Claude Sonnet 4.5); Pro $20 (1,000 credits); Pro+ $40 (2,000); Pro Max $100 (5,000); Power $200 (10,000); overage $0.04/credit; credits do not roll over; first-time upgraders get $20 credited [V] https://kiro.dev/pricing/
- **Best at:** teaching "spec before code" because the product forces it; good fit for the planning part of the talk.
- **Weakness:** 50 free credits is a demo, not a workflow; AWS-flavoured sign-in; model list narrower than Cursor.
- **Docs:** https://kiro.dev/docs/

### 3.8 Cline (and the end of Roo Code)
- **What:** open-source (Apache-2.0) agent as a VS Code/JetBrains/Cursor/Antigravity extension, plus a CLI (`npm install -g cline`, Node 20+, `cline auth`), a Kanban board (`npx kanban`), and an SDK [V] https://docs.cline.bot/getting-started/installing-cline
- **Price:** extension and CLI free; you pay for inference: bring your own key, Cline provider pay-as-you-go at cost, or the ClinePass subscription (price not shown on the page today) [V] https://cline.bot/pricing . Enterprise custom.
- **Roo Code:** extension shut down and repo archived 15 May 2026 (banner: "archived by the owner on May 15, 2026"; README: "The Roo Code Extension was shut down on May 15th"); README recommends ZooCode (community fork) or Cline [V] https://github.com/RooCodeInc/Roo-Code . Announcement date 21 Apr 2026: the README gives no announcement date; the HN thread (item 47851734) returned HTTP 429 twice on 21 Sep 2026; the date is consistent with the timestamp encoded in the CEO's tweet ID (2046636598859559114 decodes to 21 Apr 2026 UTC) but the post content is UNVERIFIED. Team pivoted to a cloud agent [S] https://thenewstack.io/roo-code-cloud-ides-ai-coding/ (article body not fetchable today, headline only). Cline's post about Roo merging back: https://x.com/cline/status/2046645935762198953 (UNVERIFIED content, X not fetchable).
- **Best at:** transparency (you see every tool call and token cost), any model including local ones, plan/act modes.
- **Weakness:** BYOK means a student needs an API key with billing, and frontier-model API usage costs more than a $20 flat plan.
- **Docs:** https://docs.cline.bot

### 3.9 Aider
- **What:** the original open-source terminal pair programmer; git-native (auto-commits every change), repo map, architect/editor mode.
- **Start:** `python -m pip install aider-install && aider-install`, then `aider --model <model> --api-key <provider>=<key>` (UNVERIFIED today, from aider.chat docs as I remember them); pip route `python -m pip install -U aider-chat` [S] https://www.deployhq.com/guides/aider
- **Price:** free, BYOK.
- **Status warning:** the last tagged GitHub release is v0.86.0 from 9 Aug 2025 [V] https://github.com/Aider-AI/aider/releases ; the history page shows only unreleased main-branch work (Claude 4.5/4.6 support etc.) after v0.86.1 [V] https://aider.chat/HISTORY.html . A secondary source claims v0.86.2 on 12 Feb 2026 (UNVERIFIED). Treat Aider as slow-moving/legacy in Sep 2026.
- **Best at:** teaching git discipline; tiny, scriptable; works with local models.
- **Weakness:** no real agent loop compared with 2026 tools; development has stalled.
- **Docs:** https://aider.chat/docs/

### 3.10 opencode (Anomaly)
- **What:** open-source terminal agent (TUI + desktop app + IDE extension), provider-agnostic; the most popular open alternative to Claude Code (HN launch thread 1,274 points, 20 Mar 2026: https://news.ycombinator.com/item?id=47460525). ~208k stars claim is [S].
- **Start:** `curl -fsSL https://opencode.ai/install | bash`, or `npm install -g opencode-ai`, `brew install anomalyco/tap/opencode`, Windows: `choco install opencode` / `scoop install opencode`; then `/connect` to pick a provider and `/init` to generate AGENTS.md [V] https://opencode.ai/docs/
- **Price:** tool is free. "Zen" = curated pay-as-you-go model gateway (auto-reload $20 when balance < $5, can be disabled) with a rotating set of free beta models (today: Big Pickle, MiMo-V2.5, Nemotron 3 variants, Muse Spark 1.3 contributor tier, and others; free models may use prompts for training) [V] https://opencode.ai/docs/zen/
- **Known friction:** on 19 Mar 2026 opencode removed its built-in Claude Pro/Max login "per legal requests" from Anthropic (PR got 548 thumbs-down); so you cannot officially reuse a Claude subscription inside opencode, only API keys [V] https://github.com/anomalyco/opencode/pull/18186 . Security history: unauthenticated RCE disclosed Jan 2026 https://cy.md/opencode-rce/ (UNVERIFIED details, HN 432 points).
- **Best at:** $0 experiments with free Zen models; switching models mid-project; learning how agents work by reading the source.
- **Weakness:** free models are weak/unstable and log your prompts; BYOK for good models.
- **Docs:** https://opencode.ai/docs/

### 3.11 Google Jules
- **What:** asynchronous cloud agent: connect a GitHub repo, describe a task, it works in a cloud VM and opens a PR.
- **Start:** https://jules.google -> sign in with Google -> connect GitHub.
- **Price:** free: 15 tasks/day, 3 concurrent, Gemini 2.5 Pro; "Jules in Pro" (Google AI Pro): 100/day, 15 concurrent; "in Ultra": 300/day, 60 concurrent, newer Gemini 3 models; rolling 24-hour window; paid plans only for personal @gmail accounts [V] https://jules.google/docs/usage-limits/
- **Best at:** the best free introduction to rung 4; chores like tests, dependency bumps, small bug fixes; reads AGENTS.md.
- **Weakness:** free tier model is old; needs a repo that builds in a clean VM; slower feedback than a local agent.
- **Docs:** https://jules.google/docs/

### 3.12 Devin (cloud)
Covered in 3.6. Correction to the common claim "Devin costs $500/month": the ladder is now Free / Pro $20 / Max $200 / Teams / Enterprise; the older Core ($20 + $2.25 per ACU) and Team ($500) plans were retired on 14 Apr 2026 [S] https://www.usecarly.com/blog/devin-pricing/ ; current ladder [V] https://devin.ai/pricing .

### 3.13 App builders (rung 1)

| Tool | One line | Free tier | Paid entry | Best at | Weakness | Docs |
|---|---|---|---|---|---|---|
| **Lovable** | Chat-to-full-stack web app with built-in cloud backend, GitHub sync | 5 build credits/day (max 30/month) + 20 Cloud + 4 AI credits/month [V] https://lovable.dev/pricing | Pro $25 (200 credits/month; Business $50) [S] https://www.lowcode.agency/blog/lovable-pricing (neither lovable.dev/pricing nor the docs page rendered a Pro price on 21 Sep 2026); top-ups $15 per 50 credits on Pro, $30 per 50 on Business; Pro removes the 30/month cap on the 5 daily build credits [V] https://docs.lovable.dev/introduction/plans-and-credits ; student discount via lovable.dev/students [V] | Fastest idea -> shareable MVP; non-coders | Credits vanish on debugging loops; separate runtime (Cloud/AI) billing after launch [S] | https://docs.lovable.dev |
| **Bolt.new** (StackBlitz) | In-browser full-stack dev environment driven by chat | 300K tokens/day, 1M/month, Bolt branding [V] https://bolt.new/pricing | Pro $25 (10M+ tokens/month, rollover one month, custom domain); Teams $30/member [V] | Seeing real code + terminal in the browser, zero install | Token burn grows with project size | https://support.bolt.new |
| **v0** (Vercel) | Prompt-to-UI/Next.js app, one-click deploy to Vercel | $5 credits/month, 7 messages/day, GitHub sync [V] https://v0.app/pricing | Plus $30/user (incl. $30 credits + $2 daily login credits); Business $100/user [V]. Caution: on 21 Sep 2026 the Plus card rendered "$30" next to a "$90" figure (promo vs list price?); re-screenshot before quoting $30 as the standard price | Best-looking React/Tailwind UI; design mode | Next.js/Vercel-centric; small free allowance; student plan exists [V], KZ eligibility UNVERIFIED | https://v0.app/docs |
| **Replit** | Cloud IDE + Agent that builds, hosts, and gives you a database | Starter: daily Agent credits with a monthly cap, 1 published app (link expires after 30 days), 2 GB, Lite build mode only [V] https://docs.replit.com/billing/plans/starter-plan | Core $20 ($18 annual) incl. $20 model credits; Pro $100 [V] https://replit.com/pricing | All-in-one (code + DB + deploy) from a Chromebook or phone | Effort-based Agent pricing is hard to predict; Full build and Plan mode are paid-only | https://docs.replit.com |

---

## 4. Kazakhstan notes (availability and payment)

- **Country availability [V]:** Kazakhstan is on Anthropic's supported list (API and Claude.ai) https://www.anthropic.com/supported-countries , on OpenAI's supported list https://developers.openai.com/api/docs/supported-countries , and on Antigravity's list https://antigravity.google/docs/faq/ . No VPN is needed for the main tools. Russia is not supported by these vendors, which is why Russian-language payment guides recommend Kazakhstani cards as the workaround [S] https://habr.com/ru/articles/1037638/ .
- **Age gate:** Antigravity is unavailable under 18 [V FAQ]. Plan an alternative (Copilot Student, Cursor Hobby) for school pupils.
- **Payment:** all vendors bill in USD through card processors (mostly Stripe). Kazakhstani Visa/Mastercard cards (Kaspi Gold, Halyk, Freedom) are reported to work across AI services [S] https://habr.com/ru/articles/1037638/ , https://profinvestment.com/how-pay-ai-russia/ . Typical failure causes: internet/foreign payments disabled in the bank app, 3-D Secure failure, billing country not matching the card, prepaid/virtual card flagged [S] https://aipaymentfix.com/guides/chatgpt-card-declined/ . An old (2023) OpenAI forum thread documents a KZ card being refused on the API billing page despite the country being supported: https://community.openai.com/t/my-country-is-in-the-list-of-supported-countries-kazakhstan-but-i-cant-attach-my-credit-card/90889 (UNVERIFIED whether still relevant). $20 is roughly 10,200 KZT before bank conversion fees [S] https://www.glbgpt.com/hub/chatgpt-plus-subscription-price-in-kazakhstan-2026-guide/ .
- **No regional pricing for KZ:** Cursor has an India-only cheap plan [V]; nothing similar for Kazakhstan found. ChatGPT Go at $8 is the cheapest paid plan that includes Codex [V].
- **Student offers:** GitHub Education (Copilot Student) is global and needs no card [V]. Google AI Pro student pricing exists via SheerID with up to 4 years eligibility, but availability varies by country; Kazakhstan eligibility UNVERIFIED https://one.google.com/about/google-ai-plans/ . Cursor's former free student year is no longer offered [V]. Lovable and v0 student programs: eligibility for KZ universities UNVERIFIED.
- **Practical workshop advice:** have every attendee create, before the event, (1) a GitHub account + Education application, (2) a personal Gmail for Antigravity/Jules, (3) a ChatGPT free account for Codex. These three cost $0 and do not need a card. Hotel/university Wi-Fi sometimes blocks OAuth callbacks on localhost; `agy` prints an authorization URL for remote sessions [V antigravity-cli README], Codex offers device/API-key login.

---

## 5. AGENTS.md vs CLAUDE.md vs .cursor/rules vs copilot-instructions

### 5.1 What each file is

| File | Owner | Where | Format | Who reads it (Sep 2026) |
|---|---|---|---|---|
| `AGENTS.md` | Open standard, now stewarded by the Agentic AI Foundation under the Linux Foundation; started by OpenAI Codex, Amp, Jules, Cursor, Factory; used by 60k+ open-source repos [V] https://agents.md/ | repo root; nested copies per package, nearest file wins [V] | plain Markdown, no required fields | Codex, Cursor, Copilot (VS Code, cloud agent, CLI), Jules, opencode, Devin/Windsurf, Aider, Zed, Warp, Kilo, Gemini CLI (all listed on agents.md [V]); Antigravity CLI (per its migration doc [V], not listed on agents.md); and since 18 Sep 2026 Claude Code (per Anthropic docs [V], not listed on agents.md) |
| `CLAUDE.md` | Anthropic | `./CLAUDE.md` or `./.claude/CLAUDE.md`, `~/.claude/CLAUDE.md`, `CLAUDE.local.md`; scoped rules in `.claude/rules/*.md` with `paths:` | Markdown + `@path` imports | Claude Code; also VS Code Copilot (`chat.useClaudeMdFile`, on by default) and Copilot agents (root `CLAUDE.md`) [V] https://code.visualstudio.com/docs/copilot/customization/custom-instructions , https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions |
| `.cursor/rules/*.mdc` | Cursor | project folder | Markdown with frontmatter `description`, `globs`, `alwaysApply`; four activation behaviours (always / auto-attach by glob / agent-decided / @-mention) [V] https://cursor.com/docs/context/rules | Cursor only. Cursor also reads `AGENTS.md` (incl. nested) as the plain alternative. Legacy `.cursorrules` is not mentioned in current docs. |
| `.github/copilot-instructions.md` | GitHub | `.github/` | Markdown, repo-wide | Copilot Chat, code review, agents. Path-scoped variant: `.github/instructions/NAME.instructions.md` with `applyTo:` globs (on GitHub.com only used by cloud agent and code review) [V GitHub docs] |
| `GEMINI.md` | Google | project dir, `~/.gemini/GEMINI.md` | Markdown | Gemini CLI, Antigravity (global rules at `~/.gemini/GEMINI.md` [V rules docs]); "Copilot agents read root GEMINI.md" is UNVERIFIED (VS Code custom-instructions docs do not mention GEMINI.md; GitHub docs not re-checked today) |
| `.agents/rules/` | Antigravity | repo root (legacy `.agent/rules` still read) | Markdown rules with activation modes manual / always on / model decision / glob [V] https://antigravity.google/docs/rules-workflows | Antigravity IDE, 2.0, CLI. `agy` also keeps reading `GEMINI.md` and `AGENTS.md` in the working directory [V] https://antigravity.google/docs/cli/gcli-migration |
| `.kiro/steering/*.md` | Kiro | workspace or `~/.kiro/steering/` | Markdown; inclusion modes always / conditional / manual / auto; starter files product.md, tech.md, structure.md [V] https://kiro.dev/docs/steering/ | Kiro (AGENTS.md support in Kiro: UNVERIFIED) |
| `.clinerules`, `.devin/rules/`, `.windsurf/rules/` | Cline, Devin Desktop | project | Markdown | Their own tools; Claude Code's new `/init` flow can read these when `CLAUDE_CODE_NEW_INIT=1` [V Claude memory docs] |

### 5.2 Exact behaviours worth teaching

- **Codex:** global `~/.codex/AGENTS.md` (or `AGENTS.override.md`, checked first; `CODEX_HOME` overrides the directory), then every directory from repo root down to the cwd, concatenated root-first so "Files closer to your current directory override earlier guidance"; combined size capped by `project_doc_max_bytes` (32 KiB default, Codex stops adding files at the cap); extra filenames via `project_doc_fallback_filenames` [V] https://learn.chatgpt.com/docs/agent-configuration/agents-md (developers.openai.com/codex/guides/agents-md 308-redirects there). So adding `CLAUDE.md` to the fallback list makes Codex read Claude's file.
- **Claude Code (v2.1.277+, 18 Sep 2026):** reads `AGENTS.md` only when there is no `CLAUDE.md`, `.claude/CLAUDE.md`, or `CLAUDE.local.md` in the cwd or above. If both exist, only CLAUDE.md loads, unless you set Project instructions to `claude-md-and-agents-md` in `/config`. Not available yet on Bedrock/Vertex/Foundry sessions (changelog wording: "not yet on Bedrock, Vertex or Foundry"), nor when feature-flag fetching/telemetry is disabled, nor in the first session after installing or upgrading to a version with the feature. A directly-read AGENTS.md does not show in `/memory` or `/context`; look for the line `no CLAUDE.md found; AGENTS.md loaded: ...` at session start. Not read: `AGENTS.local.md`, `AGENTS.override.md`, anything under `.agents/`. Gotcha: creating a `CLAUDE.local.md` silently stops AGENTS.md from loading under the default setting (`claude-md-or-agents-md`). [V 21 Sep 2026] https://code.claude.com/docs/en/memory , https://code.claude.com/docs/en/changelog (entry "2.1.277", 18 Sep 2026)
- **Copilot in VS Code:** `chat.useAgentsMdFile` and `chat.useClaudeMdFile` are on by default; nested AGENTS.md is experimental (`chat.useNestedAgentsMdFiles`); when several instruction files exist they are all merged with no guaranteed order [V VS Code docs]. So duplicated content across files = duplicated tokens.
- **Cursor:** AGENTS.md for plain always-on guidance; `.cursor/rules` when you need glob-scoped or on-demand rules.

### 5.3 How to keep them in sync (recommended recipe)

1. **One source of truth: `AGENTS.md`** at repo root. Put in it: what the project is (3 lines), exact build/test/lint commands, code style, do-not-touch areas, commit/PR conventions. Keep it short.
2. **Claude Code:** either delete CLAUDE.md and let Claude read AGENTS.md directly, or keep a two-line `CLAUDE.md`:
   ```
   @AGENTS.md
   # Claude-specific notes below (hooks, skills, subagents)
   ```
   Anthropic's docs recommend the `@AGENTS.md` import over a symlink when anyone on the team uses Windows, because symlink creation needs admin/Developer Mode and git may check the link out as a text file [V memory docs]. Most Kazakhstan students are on Windows, so teach the import, not `ln -s`.
3. **Cursor, Copilot, Codex, Jules, opencode, agy, Devin:** nothing to do, they read AGENTS.md. Do not also copy the same text into `.github/copilot-instructions.md`, because VS Code merges both and you pay twice.
4. **Tool-specific extras go in tool-specific files only:** glob-scoped rules -> `.cursor/rules/*.mdc`, `.claude/rules/*.md`, `.github/instructions/*.instructions.md`, `.agents/rules/`. Keep these thin and point back to AGENTS.md for shared facts.
5. **Migrating into Claude Code from another tool:** `/import` (v2.1.213+) copies instruction files, MCP servers, commands, subagents, and skills once [V memory docs].
6. **Sync tools** such as `rulesync` or `ruler` generate per-tool files from one source (UNVERIFIED, not checked today). With native AGENTS.md support nearly everywhere, they are needed less in Sep 2026 than in 2025.

### 5.4 Evidence: keep the file small

- ETH Zurich/LogicStar.ai paper "Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?" (Gloaguen, Mündler, Vechev of ETH Zurich; Müller, Raychev of LogicStar.ai; arXiv 2602.11988, v1 12 Feb 2026, v2 23 Jun 2026): "providing context files does not generally improve task success rates" while "increasing inference cost by over 20% on average"; repository overviews "are not helpful"; instructions "are well followed by coding agents" [V] https://arxiv.org/abs/2602.11988 , https://arxiv.org/html/2602.11988v2 . Lesson: write only non-obvious commands and constraints, never paste an LLM-generated tour of the repo.
- Vercel eval (27 Jan 2026): an 8 KB compressed docs index placed in AGENTS.md reached 100% pass rate on their Next.js evals vs 53% baseline and 79% for skills with explicit instructions [V] https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals . Lesson: passive, always-present pointers to version-specific docs beat "hope the agent calls the tool".
- These two results do not conflict: specific, non-guessable facts help; generic descriptions cost tokens.

---

## 6. Hands-on quickstarts (workshop-ready)

Shared prep for all three: install Git, create an empty folder `vibe-demo`, run `git init`. Rule for the room: commit before every big prompt.

### 6.1 Cursor (GUI, 7 steps, $0 on Hobby)
1. Download from https://cursor.com , install, sign in (Google/GitHub). Hobby needs no card [V pricing].
2. File -> Open Folder -> `vibe-demo`. Accept the "import VS Code settings" prompt if you use VS Code.
3. Open the Agent with Ctrl+I (Cmd+I on macOS) [V] https://cursor.com/docs/get-started/quickstart
4. Press Shift+Tab in the agent input to switch to **Plan mode**; prompt: "Plan a single-page tenge/USD converter with a hardcoded rate, plain HTML/CSS/JS, no build step. Ask me questions first." Read and edit the plan.
5. Approve the plan; watch the diff; Accept or Reject per file. Open `index.html` in a browser.
6. Ask the agent to "create an AGENTS.md with how to run and the code style we used". Commit: `git add -A && git commit -m "first agent build"`.
7. Make one follow-up change ("add KZT <-> EUR, keep layout") to show the iterate loop, then show where usage is tracked in the dashboard so students see the meter. Optional: install the CLI and run `agent "explain this repo"` in the terminal [V CLI docs].

### 6.2 Codex CLI (terminal, 8 steps, works on ChatGPT Free with small limits)
1. Install: `npm install -g @openai/codex` (needs Node) or on Windows PowerShell `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"`; macOS/Linux `curl -fsSL https://chatgpt.com/codex/install.sh | sh` [V].
2. `cd vibe-demo && codex` -> choose "Sign in with ChatGPT" (Free/Go/Plus all include Codex [V pricing]).
3. `/status` to see model, sandbox, and approval settings; `/model` to pick model and reasoning effort; `/permissions` to choose how much it may do without asking [V] https://learn.chatgpt.com/docs/codex/cli
4. `/init` -> Codex writes an `AGENTS.md`. Open it, trim it to what is true.
5. Prompt: "Build a CLI todo app in Python with add/list/done, store data in todos.json, include pytest tests. Show me the plan first."
6. Approve edits and commands as they appear; when done run the tests yourself.
7. `/review` to let Codex review its own uncommitted diff; fix what it finds; `git commit`.
8. Show automation and continuity: `codex exec "add a --priority flag and update tests"` (non-interactive) and `codex resume` (reopen an earlier session). Mention `codex cloud` for rung 4 [V CLI docs].

### 6.3 "Gemini CLI" slot -> teach Antigravity CLI `agy` instead (8 steps, $0, 18+)
Why: Gemini CLI no longer serves free or AI Pro/Ultra users (section 3.3). If your organisation has Gemini Code Assist Standard/Enterprise or a paid key, the old flow still applies: `npm install -g @google/gemini-cli`, `gemini`, choose API key/Vertex auth, `GEMINI.md` for context.

1. Install: PowerShell `irm https://antigravity.google/cli/install.ps1 | iex`; macOS/Linux `curl -fsSL https://antigravity.google/cli/install.sh | bash` [V].
2. Open a new terminal, `cd vibe-demo`, run `agy`.
3. First-run wizard: colour scheme, rendering mode (alt-screen or inline), trust the workspace; sign in with a personal Google account (must be 18+, supported country: KZ is fine) [V].
4. `/usage` to see remaining quota per model on the free Individual plan [V].
5. `/grill-me` with a task ("I want a Telegram-style chat UI mock in one HTML file") so the agent asks clarifying questions before building [V getting-started].
6. Let it build; review the file edits; open the result in the browser.
7. Add project memory: create `AGENTS.md` (shared with every other tool); put Antigravity-only rules in `.agents/rules/` [V rules docs, migration docs].
8. Show autonomy controls: `/goal <task>` runs until the task is complete without intermediate prompts; contrast with step-by-step approval and discuss when each is safe. Commit.

Coming from Gemini CLI: first launch offers a migration checklist; `agy plugin import gemini` converts extensions; skills move to `.agents/skills/`; MCP servers move to `.agents/mcp_config.json` / `~/.gemini/config/mcp_config.json` with `serverUrl` instead of `url`/`httpUrl` [V] https://antigravity.google/docs/cli/gcli-migration

---

## 7. Security note to include on the "other tools" page

- 20 Jul 2026: Pillar Security showed sandbox escapes in Cursor, Codex, Gemini CLI, and Antigravity: the agent stays sandboxed but writes files that trusted tools outside the sandbox later execute; the trigger was prompt injection hidden in README files or dependencies. Cursor fixed in 3.0.0 (CVE-2026-48124, a further Cursor CVE pending), Codex CLI in v0.95.0 (CVE pending); Google classed both Antigravity findings as "Other valid security vulnerabilities" and downgraded severity [V] https://www.bleepingcomputer.com/news/security/cursor-codex-gemini-cli-antigravity-hit-by-sandbox-escapes/
- Teaching point: "sandbox on" is not a licence for auto-approve on untrusted repos. Keep tools updated, keep secrets out of the workspace, review diffs to config/dotfiles, prefer approval mode for cloned code.

---

## 8. Comparison table (compact reference; the ladder in section 1 is the primary structure)

| Tool | Surface | Free tier (Sep 2026) | Paid entry | Open source | Reads AGENTS.md | Best first use |
|---|---|---|---|---|---|---|
| Cursor | IDE + CLI + cloud | Hobby, limited agent | $20 | No | Yes | GUI agent with any model |
| Codex | CLI + IDE ext + cloud + app | In ChatGPT Free/Go (small) | $8 Go / $20 Plus | CLI yes (Apache-2.0) | Yes (native) | One sub, three surfaces |
| Gemini CLI | CLI | None for consumers since 18 Jun 2026 | Enterprise/paid key | Yes | Yes | Only with enterprise licence |
| Antigravity / `agy` | IDE + desktop + CLI | Yes, weekly limits, multi-vendor models, 18+ | Google AI Pro ~$19.99 | No | Yes (+ `.agents/rules`, GEMINI.md) | Best $0 agent today |
| Copilot | VS Code agent + cloud agent + CLI | Free plan; Student plan 200 credits | $10 | CLI repo public | Yes (+ CLAUDE.md [V]; GEMINI.md UNVERIFIED) | Students, GitHub PR flow |
| Devin Desktop (ex-Windsurf) + Devin Cloud | IDE + cloud | Desktop only, light quota | $20 | No | Yes | Delegating tickets |
| Kiro | IDE + CLI + web | 50 credits/month | $20 | No | UNVERIFIED (uses `.kiro/steering`) | Learning spec-driven flow |
| Cline | Extension + CLI | Tool free, BYOK | pay per token / ClinePass | Yes (Apache-2.0) | UNVERIFIED (uses `.clinerules`) | Transparent agent, any model |
| Roo Code | - | Shut down 15 May 2026 | - | Archived | - | Do not teach |
| Aider | CLI | Tool free, BYOK | pay per token | Yes | Yes (listed on agents.md) | Git-native minimalism; stagnant |
| opencode | CLI + desktop | Tool free + free Zen beta models | Zen pay-as-you-go | Yes | Yes (`/init` creates it) | $0 terminal agent |
| Jules | Cloud async | 15 tasks/day | Google AI Pro | No | Yes | First async PR |
| Lovable | App builder | 5 credits/day (30/mo) | $25 | No | n/a | MVP tonight |
| Bolt.new | App builder | 300K tokens/day, 1M/mo | $25 | Core OSS (UNVERIFIED) | n/a | In-browser full-stack |
| v0 | App builder | $5 credits, 7 msgs/day | $30 | No | n/a | Beautiful Next.js UI |
| Replit | Cloud IDE + Agent | Starter daily credits, 1 app | $20 | No | n/a | Code+DB+deploy anywhere |

---

## 9. Source reliability notes

- Everything marked [V] was fetched today via the vendor's own page or repo. Page summaries were produced by a fetch tool; exact numbers should be re-screenshotted before going on a slide.
- Model names on vendor pages today (GPT-6 Astra and GPT-5.6 Sol/Terra/Luna on learn.chatgpt.com; Gemini 3.8 Flash, Claude Opus 4.8, Claude Opus 5 / Sonnet 5 / Fable 5.1, Grok 4.7, Composer 2.5, Kimi K3, GLM 5.2, Muse Spark 1.3 on cursor.com/docs/models) are reported as displayed on those pages; do not extrapolate capabilities.
- The Devin blog fetch rendered the post date as 2024; the HN submission timestamp (2 Jun 2026) and docs confirm 2026.
- Web search budget ran out mid-research, so Reddit and X threads were not individually verified. X posts below are marked accordingly.

---

## Visual candidates

| URL | What it shows | Teaching point |
|---|---|---|
| https://github.com/google-gemini/gemini-cli/discussions/27274 | Official "An important update: Transitioning Gemini CLI to Antigravity CLI" post, 19 May 2026, 6 thumbs-up vs 301 thumbs-down, 82 comments [V] | Free tiers are marketing budgets; tools you rely on can vanish in 30 days. Learn portable habits |
| https://news.ycombinator.com/item?id=48196867 | HN thread "Gemini CLI will stop working from June 18, 2026" (406 points, 209 comments) | Community reaction; same point |
| https://github.com/google-gemini/gemini-cli/discussions/22970 | "Service update: mitigating abuse and prioritizing traffic", posted 18 Mar 2026, effective 25 Mar 2026; 1,039 thumbs-down vs 137 thumbs-up [V] | The first cut before the shutdown: Pro models paywalled |
| https://geminicli.com/docs/resources/quota-and-pricing/ | Docs page with the banner stating Gemini CLI was replaced by Antigravity CLI on 18 Jun 2026 | Always check official docs date, READMEs go stale (the repo README still says 1,000 free requests/day) |
| https://antigravity.google/pricing | Free Individual plan listing Gemini, Claude, and gpt-oss models | Best $0 option today; multi-vendor inside a Google product |
| https://antigravity.google/docs/faq/ | Supported countries list including Kazakhstan; 18+ notice | KZ availability proof for the audience |
| https://devin.ai/blog/windsurf-is-now-devin-desktop/ | Blog header "Windsurf is now Devin Desktop" | Tool names churn (Codeium -> Windsurf -> Devin Desktop) |
| https://github.com/RooCodeInc/Roo-Code | Archived-repo banner, 15 May 2026, shutdown disclaimer | Open-source forks die too; the licence lets the community continue (ZooCode) |
| https://x.com/cline/status/2046645935762198953 | Cline's post on Roo Code shutting down and merging back (UNVERIFIED, from search snippet) | Same, with a human touch |
| https://twitter.com/mattrubens/status/2046636598859559114 | Roo Code CEO's shutdown announcement, 21 Apr 2026 (content UNVERIFIED; HN item 47851734 returned 429; date consistent with the tweet-ID timestamp) | Founders pivoting from IDE extensions to cloud agents: the rung 2 -> rung 4 trend |
| https://news.ycombinator.com/item?id=48553224 | HN "SpaceX to buy Cursor for $60B" (1,151 points, 1,703 comments, links to Reuters 16 Jun 2026) [V] | Scale of the vibecoding market; vendor lock-in risk |
| https://news.ycombinator.com/item?id=47855293 | HN "SpaceX says it has agreement to acquire Cursor for $60B" (823 points, 989 comments), Apr 2026, linking https://twitter.com/spacex/status/2046713419978453374 (tweet content UNVERIFIED) [V for HN] | Same; the option-then-acquisition two-step |
| https://cursor.com/blog | Post "Cursor is now a part of SpaceX", 14 Aug 2026: "Cursor has officially been acquired by SpaceX." [V] | Closing date; use this instead of press paywalls |
| https://cursor.com/pricing | Pricing cards now showing "Generous limits for Grok" and "Grok Bot access" [V] | What an acquisition does to a product within 2 months |
| https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/ | GitHub announcement of AI Credits replacing premium requests (HN: https://news.ycombinator.com/item?id=47923357 , 767 points) | Every vendor is moving from flat plans to token metering; learn to watch usage |
| https://github.com/orgs/community/discussions/189268 | "Important Updates to GitHub Copilot for Students", 11 Mar 2026 with dated updates (1 Jun: 200 credits; 24 Jun: auto model only); 6,796 thumbs-down, 1,003 confused, 94 thumbs-up [V] | Student perks shrink; do not build a course on one free perk |
| https://github.com/features/copilot/plans | Plan grid Free / Pro $10 / Pro+ $39 / Max $100 with credit amounts | Cheapest paid agent; price comparison slide |
| https://learn.chatgpt.com/docs/pricing | Codex limits table per plan and per model | Limits are ranges tied to model size: pick smaller models for routine work |
| https://github.com/openai/codex | Repo header, 125.7k stars (21 Sep 2026), Apache-2.0, install one-liners [V] | Open-source CLI + quickstart slide |
| https://news.ycombinator.com/item?id=49760187 | HN "Claude Code now reads AGENTS.md if there is no Claude.md", 18 Sep 2026 (734 points, 275 comments) | AGENTS.md won the standards war; fresh news hook for the talk |
| https://github.com/anthropics/claude-code/issues/6235 | The long-running "Support AGENTS.md" feature request (HN 379 points, Aug 2026) | How user pressure shapes tools |
| https://code.claude.com/docs/en/memory | Table of which file Claude reads for each AGENTS.md/CLAUDE.md combination | The sync recipe in section 5.3 |
| https://agents.md/ | Landing page with logos of supporting tools and "60k+ projects" | One file, many agents |
| https://arxiv.org/abs/2602.11988 | Paper abstract: context files add 20%+ cost without general success gains | Keep AGENTS.md short and specific |
| https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals | Bar chart 53% / 53% / 79% / 100% | Passive context with a docs index beats on-demand retrieval |
| https://www.bleepingcomputer.com/news/security/cursor-codex-gemini-cli-antigravity-hit-by-sandbox-escapes/ | Headline on sandbox escapes across four agents, Jul 2026 | Security: prompt injection via README, do not auto-approve on untrusted repos |
| https://news.ycombinator.com/item?id=47460525 | HN "OpenCode - Open source AI coding agent" (1,274 points) | Open-source alternative momentum |
| https://github.com/anomalyco/opencode/pull/18186 | PR removing Claude Pro/Max login "per legal requests", 548 thumbs-down | Subscriptions are tied to the vendor's own client; third-party tools need API keys |
| https://systima.ai/blog/claude-code-vs-opencode-token-overhead | Post claiming Claude Code sends 33k tokens before the prompt vs 7k for opencode (HN 706 points; UNVERIFIED content) | Hidden context overhead; why harness design matters |
| https://kiro.dev/pricing/ | Credit ladder 50 / 1,000 / 2,000 / 5,000 / 10,000 | Credit-based pricing literacy |
| https://devin.ai/pricing | Free / Pro $20 / Max $200 grid | "Devin costs $500" is outdated |
| https://bolt.new/pricing , https://v0.app/pricing , https://lovable.dev/pricing , https://replit.com/pricing | Free-tier limits of the four app builders | Rung 1 comparison slide; all four have a daily cap designed to convert you |

---

## Fact-check log (adversarial pass, 21 Sep 2026)

Method: picked the claims most likely to appear on a slide (dates, prices, quotes, commands, counts), opened each primary source with a fetch tool, and tried to refute the claim. Web search budget was exhausted, so only direct URL fetches were possible. HN and vendor pages were fetched live; reaction/point counts are as of this pass.

| # | Claim checked | Source opened | Outcome |
|---|---|---|---|
| 1 | Gemini CLI stops serving free + AI Pro/Ultra users on 18 Jun 2026; announced 19 May 2026; slide quote | github.com/google-gemini/gemini-cli/discussions/27274 ; developers.googleblog.com post ; geminicli.com quota page | CONFIRMED. Full sentence: "On June 18, 2026, Gemini CLI will stop serving requests for Google AI Pro and Ultra, as well as those using it free of charge." Banner on geminicli.com: "Gemini CLI was replaced by Antigravity CLI on June 18th, 2026." Added reaction counts (6 up / 301 down). Softened "closed-source" to "no published source" because Google never says it; the antigravity-cli repo has README/CHANGELOG/examples only. |
| 2 | Discussion #22970 dated 25 Mar 2026 | github.com/google-gemini/gemini-cli/discussions/22970 | CORRECTED. Posted 18 Mar 2026, changes effective 25 Mar 2026. Vote counts (137 up / 1,039 down) confirmed. |
| 3 | Windsurf -> Devin Desktop on 2 Jun 2026, OTA update, Devin Local replaces Cascade, legacy Cascade until 1 Jul | devin.ai/blog/windsurf-is-now-devin-desktop | CONFIRMED. "the update will arrive as a standard over-the-air update"; "continue to use the legacy Cascade agent through July 1st". |
| 4 | Roo Code archived 15 May 2026; announced 21 Apr 2026 | github.com/RooCodeInc/Roo-Code ; HN 47851734 (429 twice) ; thenewstack.io (body not served) | PARTLY. Archive date and README wording confirmed. Announcement date 21 Apr 2026 could not be opened; tweet-ID timestamp decodes to 21 Apr 2026 but content marked UNVERIFIED. |
| 5 | SpaceX buys Cursor for $60B, all-stock, announced 16 Jun 2026, option disclosed 21 Apr, closed 14 Aug | HN 48553224 ; HN 47855293 ; cursor.com/blog ; Reuters and CNBC unreachable | PARTLY. $60B, 16 Jun date (Reuters URL slug), HN counts confirmed. Closing 14 Aug 2026 upgraded to [V] via Cursor blog "Cursor is now a part of SpaceX". "All-stock" downgraded to UNVERIFIED (HN comments only). April structure ($10B option, $60B strike) marked [S]. Pricing page mentions Grok Bot but not SpaceX/xAI. |
| 6 | Copilot: AI Credits replace premium requests 1 Jun 2026; Pro $10/$15 credits, Pro+ $39/$70, Max $100/$200, 1 credit = $0.01; Student 200 credits, auto-only since 24 Jun | github.blog post (27 Apr 2026) ; github.com/features/copilot/plans ; discussion #189268 | CONFIRMED with attribution fix. The blog announced $10/$39 credits and no Max tier; today's plans page shows $15/$70 and Max. Student post is from 11 Mar 2026 with "Update June 1" (200 credits) and "Update June 24th" (auto model only). "Annual plans retired" marked as inference. |
| 7 | Claude Code reads AGENTS.md since v2.1.277 (18 Sep 2026); `/import` since v2.1.213; `claude-md-and-agents-md`; Windows import-over-symlink advice | code.claude.com/docs/en/changelog ; code.claude.com/docs/en/memory | CONFIRMED. Changelog: "Added AGENTS.md support: in a project with no CLAUDE.md, Claude Code reads AGENTS.md instead; change it under "Project instructions" in `/config` (not yet on Bedrock, Vertex or Foundry)". Memory doc confirms v2.1.213 for `/import`, the Windows symlink caveat, `CLAUDE_CODE_NEW_INIT`. Added: unavailable when telemetry/feature flags are off and in the first session after upgrade; `.agents/` not read. |
| 8 | Cursor prices (Hobby free, $20/$60/$200, Teams $40, India ₹649), "$60-100/mo" line, CLI install commands and `agent` binary, model list | cursor.com/pricing ; cursor.com/docs/account/pricing ; cursor.com/docs/cli/overview ; cursor.com/docs/models ; cursor.com/students ; cursor.com/docs/get-started/quickstart | CONFIRMED, with additions: Teams Premium $120/user; model list now includes Claude Opus 5, Sonnet 5, Fable 5/5.1 (file previously said "4.5-4.8"). Docs do not state 3x/20x multipliers (kept [S]). Students page: only "promotions at our on-campus and online events starting this fall". Cmd/Ctrl+I and Shift+Tab plan mode confirmed. |
| 9 | Codex: install commands, Apache-2.0, 125.7k stars, plan prices, per-model 5-hour ranges, model names, slash commands | github.com/openai/codex ; learn.chatgpt.com/docs/pricing ; learn.chatgpt.com/docs/codex/cli ; learn.chatgpt.com/docs/agent-configuration/agents-md | CONFIRMED. All 7 model ranges listed. Business is $20/user only on annual billing ($25 monthly). README's sign-in paragraph omits Free/Go while the pricing page includes them: flagged. `/init /status /model /permissions /review`, `codex exec/resume/cloud` all documented. AGENTS.md guide upgraded from [S] to [V]: `project_doc_max_bytes` 32 KiB, `project_doc_fallback_filenames`, `AGENTS.override.md` checked first. |
| 10 | Antigravity: install commands, `agy`, binary paths, free-plan models, KZ/KG/UZ supported, under-18 blocked, personal accounts, slash commands, migration details | github.com/google-antigravity/antigravity-cli ; antigravity.google/docs/getting-started?tab=cli ; antigravity.google/pricing ; antigravity.google/docs/faq ; docs/cli/commands/usage ; docs/rules-workflows ; docs/cli/gcli-migration | CONFIRMED. Paths `~/.local/bin/agy` and `C:\Users\<username>\AppData\Local\agy\bin`. Free models: "Gemini 3.8 Flash, Gemini 3.7 Flash, Gemini 3.6 Flash, Gemini 3.1 Pro, Claude Sonnet & Opus 4.6, gpt-oss-120b". "Antigravity is unavailable to under-18 users." Pro/Ultra USD prices not shown on Google's pages (kept [S]). "Go-based" marked UNVERIFIED. |
| 11 | Kiro credit ladder 50 / 1,000 / 2,000 / 5,000 / 10,000 at $0 / $20 / $40 / $100 / $200, $0.04 overage, no rollover, $20 first-upgrade credit | kiro.dev/pricing | CONFIRMED exactly. Free models named: Claude Sonnet 4.5, Qwen3 Coder Next, DeepSeek 3.2, MiniMax M2.1. |
| 12 | Devin ladder Free / Pro $20 / Max $200 / Teams $80 + $40 per seat | devin.ai/pricing | CONFIRMED. Added quoted feature lines and the SWE-2 Free promo through 10 Oct 2026. Retirement of the old $500 Team plan on 14 Apr 2026 remains [S]. |
| 13 | arXiv 2602.11988: no general success gain, cost +20%, ETH Zurich/LogicStar | arxiv.org/abs/2602.11988 ; arxiv.org/html/2602.11988v2 | CONFIRMED, including affiliations (Gloaguen, Mündler, Vechev: ETH Zurich; Müller, Raychev: LogicStar.ai). v2 dated 23 Jun 2026. |
| 14 | Vercel eval 27 Jan 2026: 53% / 53% / 79% / 100%, 8 KB index | vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals | CONFIRMED (index compressed from ~40 KB to 8 KB, Next.js 16 APIs). |
| 15 | Jules limits 15/3 free, 100/15 Pro, 300/60 Ultra, rolling 24 h, @gmail only | jules.google/docs/usage-limits | CONFIRMED. Pro/Ultra model text: "starting with Gemini 3 Pro". |
| 16 | opencode: HN 1,274 points; PR 18186 merged 19 Mar 2026 with 548 thumbs-down; install commands; `/init` writes AGENTS.md | HN 47460525 ; github.com/anomalyco/opencode/pull/18186 ; opencode.ai/docs | CONFIRMED (PR title "anthropic legal requests", description "Remove anthropic references per legal requests"; 618 HN comments). |
| 17 | Pillar Security sandbox escapes 20 Jul 2026, Cursor 3.0.0 / CVE-2026-48124, Codex v0.95.0, Google downgrade | bleepingcomputer.com article | CONFIRMED; added that further CVEs are pending. |
| 18 | HN counts: 48196867 (406/209), 49760187 (734/275), 47923357 (767) | HN items | CONFIRMED (47923357 has 553 comments). |
| 19 | Aider last release v0.86.0, 9 Aug 2025 | github.com/Aider-AI/aider/releases | CONFIRMED (previous: v0.85.0 27 Jun 2025, v0.84.0 30 May 2025). |
| 20 | agents.md "60k+", Agentic AI Foundation / Linux Foundation | agents.md | CONFIRMED ("Used by over 60k open-source projects"). Site lists Gemini CLI, Devin, Windsurf, Copilot coding agent etc.; it does not list Antigravity CLI or Claude Code, so those attributions now cite their own docs. |
| 21 | Copilot CLI install commands, `copilot` binary, PowerShell 6+ | github.com/github/copilot-cli | CONFIRMED. |
| 22 | Cline CLI `npm install -g cline`, Node 20+, `cline auth`, `npx kanban` | docs.cline.bot/getting-started/installing-cline | CONFIRMED (extension also runs in Windsurf and VSCodium). |
| 23 | App builders: Lovable 5/day up to 30/month + 20 Cloud + 4 AI; Bolt 300K/day, 1M/month, Pro $25 10M, Teams $30; v0 $5 credits + 7 msgs/day, Plus $30, Business $100; Replit Core $20/$18, Pro $100, Starter 1 app / 30 days / 2 GB / Lite only | lovable.dev/pricing ; docs.lovable.dev ; bolt.new/pricing ; v0.app/pricing ; replit.com/pricing ; docs.replit.com starter page | CONFIRMED, except Lovable Pro $25 (no price rendered on either Lovable page, stays [S]) and v0 Plus, where the card showed "$30" beside "$90": flagged for re-screenshot. |
| 24 | Kazakhstan on Anthropic and OpenAI supported lists; Russia absent | anthropic.com/supported-countries ; developers.openai.com/api/docs/supported-countries | CONFIRMED. |
| 25 | VS Code settings `chat.useAgentsMdFile`, `chat.useClaudeMdFile`, `chat.useNestedAgentsMdFiles`; no guaranteed order | code.visualstudio.com custom-instructions page | CONFIRMED. Page does not mention GEMINI.md, so "Copilot reads GEMINI.md" is now UNVERIFIED. |
| 26 | Cursor rules: `.cursor/rules/*.mdc`, frontmatter `description/globs/alwaysApply`, four modes, nested AGENTS.md, no `.cursorrules` | cursor.com/docs/context/rules | CONFIRMED. |
| 27 | Gemini CLI README: 107k stars, Apache-2.0, "1,000 requests/day" still advertised | github.com/google-gemini/gemini-cli | CONFIRMED (107.1k stars; README still says "Free tier: 60 requests/min and 1,000 requests/day with personal Google account"; no mention of Antigravity CLI). |

Not re-checked today (left as marked in the body): Google AI Pro/Ultra USD prices, Devin quota refresh cadence and payment methods, Devin plan retirement date 14 Apr 2026, Kiro AGENTS.md support, Cline/Roo X posts, opencode RCE details, Systima token-overhead post, the Habr/KZ payment guides, Windows sandbox status for Codex.
