# practices-agentic — the practices that turn vibe coding into agentic engineering

Research date: 21 Sep 2026. Researcher: Claude (subagent). Audience: students and builders in Kazakhstan, beginner to intermediate. Adversarially fact-checked 21 Sep 2026 by a second subagent — see "## Fact-check log" at the end for what was opened, what was corrected, and what is still UNVERIFIED.

Legend
- [V] = VERIFIED: I opened the source page on 21 Sep 2026 and the claim is on it.
- UNVERIFIED = I could not open the primary source (blocked, paywalled, or only seen through a search snippet). Do not put on a slide without re-checking.
- Wording is paraphrased on purpose. Direct quotation is kept to one short line in the whole file (copyright hygiene); pull exact wording from the URL when you build a slide.
- Command names, file names, flags, and numbers are reproduced exactly because they are facts, not prose.

---

## 0. The spine: how to teach this (not a dump, a ladder)

The whole topic collapses into ONE constraint and SEVEN rungs. Teach them in this order; each rung only makes sense once the previous one is in place.

The one constraint: the context window is small, fills fast, and quality drops as it fills. Anthropic's own Claude Code guide says most of its best practices derive from this single fact [V] https://code.claude.com/docs/en/best-practices. Everything below is a way of spending context wisely or of checking the output without a human in the loop.

1. Rung 1 — Give the agent a way to check its own work (tests, build, screenshot). This is the difference between vibe coding and engineering. (Section 2)
2. Rung 2 — Explore, then plan, then code, then commit. Review the 200-line plan, not the 2,000-line diff. (Section 3)
3. Rung 3 — Write project memory once: CLAUDE.md / AGENTS.md, short. Move rare knowledge to Skills, hard rules to hooks. (Section 4)
4. Rung 4 — Work with safety nets: git commits, checkpoints/rewind, worktrees, permission modes. (Section 5)
5. Rung 5 — Manage context on purpose: /clear, /compact, subagents for research, fresh session per task, specs on disk. (Sections 1, 3, 7)
6. Rung 6 — Let it run long: loops (Ralph, /goal), harnesses with a progress file and a feature list, evaluator separate from generator. (Section 7)
7. Rung 7 — Go parallel only when the work is truly independent: subagents, worktrees, background/cloud sessions, agent teams, workflows. Know the token bill (3-10x, up to 15x). (Section 8)

Around the ladder: spec-driven development toolkits (Section 6) are packaged versions of rungs 2-3; evals/observability (Section 11) are rung 1 applied to the agent itself; model routing and cost control (Section 10) keep rungs 6-7 affordable.

Suggested 90-minute cut: Section 1 (5 min, one chart) -> Section 2 (15, live demo: same prompt with and without a test) -> Section 3 (15, plan mode live) -> Section 4 (10, write a CLAUDE.md together) -> Section 5 (10) -> Section 7 (10, show a loop) -> Section 8 (10, when NOT to) -> templates (15).

Naming: Karpathy, who coined "vibe coding" (Feb 2025), is widely reported to have proposed "agentic engineering" as the name for the professional version in a post on X https://x.com/karpathy/status/2019137879310836075. UNVERIFIED: the post ID decodes (Twitter snowflake) to 4 Feb 2026 19:55 UTC, but on 21 Sep 2026 the post could not be opened by any route (x.com returned HTTP 402, a mirror returned 451, X's own oEmbed endpoint returned 402), so both the wording and the attribution rest on search snippets only. His reported framing (UNVERIFIED paraphrase): you are not typing the code most of the time, you orchestrate agents and act as oversight, and there is real learnable skill in it. Simon Willison's guide defines agentic engineering simply as building software with the help of coding agents — agents that can both write and run code — and contrasts it with vibe coding, which he reserves for unreviewed, prototype-quality output [V] https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/. Note for slides: Willison's page credits Karpathy only for coining "vibe coding" (Feb 2025) and presents "agentic engineering" as the term he himself uses — it does not attribute the term to Karpathy [V]. Safe wording: "a term used by Karpathy and Willison, among others". Kent Beck drew the same line in June 2025 as "vibe coding" vs "augmented coding": in the second you still care about the code, its complexity, and the tests [V] https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes.

---

## 1. The one constraint: context rot and context engineering

### 1.1 Chroma, "Context Rot" (14 Jul 2025) [V]
Source: https://www.trychroma.com/research/context-rot (old URL research.trychroma.com/context-rot 301-redirects here). Authors: Kelly Hong, Anton Troynikov, Jeff Huber.
- 18 models tested: Claude Opus 4 / Sonnet 4 / Sonnet 3.7 / Sonnet 3.5 / Haiku 3.5; o3, GPT-4.1 (+mini, nano), GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo; Gemini 2.5 Pro / 2.5 Flash / 2.0 Flash; Qwen3-235B / 32B / 8B.
- Experiments: needle-question similarity, distractors, needle-haystack similarity, haystack structure (original vs shuffled), LongMemEval conversational QA, repeated-words replication.
- Takeaways: (1) performance becomes less reliable as input grows, across nearly every model, even on trivially simple tasks; (2) the less the question lexically resembles the answer, the faster it degrades; (3) a single plausible distractor already hurts, more distractors hurt more; (4) counter-intuitively, shuffled haystacks scored better than logically ordered ones; (5) Claude models tended to abstain rather than hallucinate under ambiguity, GPT models hallucinated most.
- Caveat for slides: the model list is mid-2025. Use the principle, not the numbers.
- HN thread: 260 points, 59 comments https://news.ycombinator.com/item?id=44564248 [V: re-confirmed 21 Sep 2026 on the HN page itself and via the hn.algolia.com search API `num_comments` field; posted by kellyhongsn, 14 Jul 2025].

### 1.2 Anthropic, "Effective context engineering for AI agents" (29 Sep 2025) [V]
Source: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents. Authors: Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, Jeremy Hadfield.
- Definition: context engineering = the strategies for curating and maintaining the best possible set of tokens at inference time. It is the successor of "prompt engineering" once agents run in loops.
- Attention is a finite budget; every token added spends some of it; recall drops as the window fills (the post uses the term context rot).
- System prompts: aim for the "right altitude" — specific enough to steer, general enough to act as heuristics; not brittle if-else rules, not vague vibes.
- Tools: self-contained, robust to error, unambiguous; if a human cannot say which tool applies, the agent cannot either.
- Just-in-time retrieval: keep lightweight identifiers (paths, queries, links) and load data at runtime instead of pre-stuffing. Claude Code does this with grep/glob/head instead of indexing everything.
- Three techniques for long horizons: compaction (summarise and restart the window), structured note-taking (agent writes notes to a file outside the window), sub-agent architectures (clean windows for focused subtasks, condensed summaries back to the lead).

### 1.3 What this means at the keyboard (Claude Code, Sep 2026) [V]
Source: https://code.claude.com/docs/en/best-practices and https://code.claude.com/docs/en/costs
- `/clear` between unrelated tasks. After two failed corrections on the same issue: `/clear` and write a better first prompt — a clean session with a better prompt beats a long polluted one.
- `/compact <instructions>` to steer what survives; or `Esc Esc` / `/rewind` -> "Summarize from here" / "Summarize up to here" to compact only part of the conversation.
- `/btw` for side questions that never enter history. `/context` to see what is eating the window. Custom status line to watch usage live.
- Subagents for investigation ("use subagents to investigate X") so file reads land in another window.
- An interactive walkthrough of what fills the window: https://code.claude.com/docs/en/context-window (good screenshot).
- Named failure patterns in the guide: kitchen-sink session, correcting over and over, over-specified CLAUDE.md, trust-then-verify gap, infinite exploration.

### 1.4 HumanLayer, "Advanced Context Engineering for Coding Agents" (Dex Horthy, 29 Aug 2025) [V]
Source: https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md
- Workflow: Research -> Plan -> Implement, each in a fresh context, each producing a markdown artifact the next phase reads. He calls it frequent intentional compaction.
- Target: keep context utilisation around 40-60%.
- Leverage hierarchy: a bad line of research becomes many bad lines of plan; a bad line of plan becomes hundreds of bad lines of code. So humans review research and plans, not only diffs.
- Claimed results: bug fixes landed in a ~300k-LOC Rust codebase (BAML); ~35k LOC shipped in ~7 hours. Also reports a failure: a two-week spiral on a race condition. (Self-reported — treat as anecdote.)

---

## 2. Rung 1 — verification loops and TDD with agents

### 2.1 "Give Claude a way to verify its work" is now the FIRST section of Anthropic's guide [V]
Source: https://code.claude.com/docs/en/best-practices
- The agent stops when the work looks done. Without a runnable check, "looks done" is its only signal and the human becomes the test suite.
- A check = anything returning pass/fail the agent can read: test suite, build exit code, linter, a script diffing output against a fixture, a browser screenshot compared with a design.
- Four strengths of gating, in rising order of setup: (a) ask in the prompt to run the check and iterate; (b) `/goal <condition>` — a separate small model re-checks after every turn; (c) a Stop hook — a script that blocks the turn from ending until it passes (Claude Code overrides after 8 consecutive blocks); (d) a verification subagent or a dynamic workflow where a fresh model tries to refute the result.
- Ask for evidence (test output, command + result, screenshot), not assertions.
- Rule to put on a slide: if you cannot verify it, do not ship it.

### 2.2 Red/green TDD (Simon Willison, guide chapter, 2026) [V]
Source: https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/
- Append "Use red/green TDD" to a build prompt. The agent writes the test, watches it fail, then implements until it passes.
- Why the red step matters: a test that was never seen failing may be passing for the wrong reason and proves nothing.
- Benefits for agents specifically: guards against code that does not work, against unrequested extra code, and leaves a regression suite for later sessions.
- Sibling chapter "First run the tests": start a session in an existing repo by having the agent run the suite — it learns the project and the norm at once https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/ (chapter listed in index [V]; body not opened).

### 2.3 Kent Beck's warning signs (25 Jun 2025) [V]
Source: https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes
- Three signals the agent is going off the rails: it starts looping; it adds functionality nobody asked for; it cheats — disabling or deleting tests to get green.
- His system prompt enforces Red -> Green -> Refactor, simplest failing test first, minimum code to pass, never mix structural and behavioural changes in one commit.

### 2.4 Anthropic's guide on tests [V]
Source: https://code.claude.com/docs/en/best-practices
- Bug-fix pattern: describe the symptom, the likely location, and what "fixed" means; ask for a failing test that reproduces it, then the fix.
- Writer/Reviewer and Tester/Implementer splits: one session writes tests, another writes code to pass them; a fresh context reviews better because it is not attached to code it just wrote.
- From the C-compiler project (Section 7.4): the agent will solve exactly the problem the tests define, so weak tests = wrong product.

---

## 3. Rung 2 — Explore -> Plan -> Code -> Commit, and plan mode

Source: https://code.claude.com/docs/en/best-practices and https://code.claude.com/docs/en/permission-modes [V]
- Explore: enter plan mode (`Shift+Tab` until the status bar shows `⏸ plan mode on`, or `claude --permission-mode plan`, or prefix one prompt with `/plan`). The agent reads files and runs exploratory commands but does not edit source.
- Plan: ask for a detailed implementation plan; `Ctrl+G` opens the plan in your editor so you can edit it before approving.
- Implement: approve the plan (this exits plan mode) and let it code against the plan, with tests.
- Commit: descriptive commit + PR.
- When to skip planning: if you could describe the diff in one sentence (typo, log line, rename), just do it. Planning pays when the approach is uncertain, the change spans files, or the code is unfamiliar.
- Mode cycle in the CLI: `default` (Manual) -> `acceptEdits` -> `plan`; optional `auto`, `dontAsk`, `bypassPermissions`. To make plan the project default: `defaultMode: "plan"` in `.claude/settings.json`.
- Interview-then-spec pattern for bigger features: start with a one-line idea, have the agent interview you (Claude Code uses its `AskUserQuestion` tool), write `SPEC.md`, then start a FRESH session to implement from the spec. Good specs are self-contained: files and interfaces involved, what is out of scope, and an end-to-end verification step.
- Plan locally, execute in the cloud: plan in plan mode (`claude --permission-mode plan`), save the plan to the repo, commit and push, then `claude --cloud "Execute the migration plan in docs/migration-plan.md"` (the docs' exact example) [V] https://code.claude.com/docs/en/claude-code-on-the-web
- Model split for this workflow: the `opusplan` alias uses Opus in plan mode and Sonnet for execution [V] https://code.claude.com/docs/en/model-config

---

## 4. Rung 3 — project memory: CLAUDE.md, AGENTS.md, Skills, hooks

### 4.1 CLAUDE.md [V]
Sources: https://code.claude.com/docs/en/best-practices , https://code.claude.com/docs/en/memory
- Loaded at the start of every session, so every line costs context in every session. Target under 200 lines.
- Include: commands the agent cannot guess, style rules that differ from defaults, test runner and how to run one test, repo etiquette (branches, PRs), project-specific architecture decisions, env quirks, gotchas.
- Exclude: anything readable from the code, standard language conventions, long API docs (link instead), fast-changing info, file-by-file tours, platitudes such as "write clean code".
- Pruning test for each line: would removing it cause mistakes? If no, delete. If the agent ignores a rule, the file is probably too long. Emphasis words ("IMPORTANT") work only if used on one or two lines.
- `/init` generates a starter; `/doctor` proposes cuts for a checked-in file; `/context` confirms it loaded; `@path` imports other files; `CLAUDE.local.md` for private notes (gitignore it); `.claude/rules/*.md` with path scoping so rules load only when matching files are touched; `~/.claude/CLAUDE.md` for personal global rules.
- Auto memory: Claude also keeps its own notes (first 200 lines / 25 KB of MEMORY.md loaded each session).
- CLAUDE.md is advisory context, not enforcement. For "must always/never happen", use a hook.

### 4.2 AGENTS.md — the cross-tool standard [V]
Sources: https://agents.md/ ; Linux Foundation press release 9 Dec 2025 https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation
- Plain Markdown, no required fields; a predictable place for build/test commands, style, testing, security notes, commit/PR rules. "README for agents".
- Stewardship: Agentic AI Foundation (AAIF) under the Linux Foundation, formed 9 Dec 2025 with three founding projects — MCP (Anthropic), goose (Block), AGENTS.md (OpenAI). Platinum members: AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI.
- Adoption: 60,000+ open-source repos. Supported by Codex, Jules, Factory, Aider, VS Code, GitHub Copilot, JetBrains Junie, Cursor, Zed, Devin, Warp, goose and more.
- Monorepos: nearest AGENTS.md to the edited file wins; explicit chat instructions override files. OpenAI's main repo is cited as having 88 of them.
- Codex specifics [V] https://learn.chatgpt.com/docs/agent-configuration/agents-md (redirect target of developers.openai.com/codex/guides/agents-md): global `~/.codex/AGENTS.md` (or `AGENTS.override.md`), then every directory from git root down to cwd; combined cap `project_doc_max_bytes` = 32 KiB; extra filenames via `project_doc_fallback_filenames`.
- Claude Code and AGENTS.md [V] https://code.claude.com/docs/en/memory#agents-md : since v2.1.277 Claude Code reads `AGENTS.md` natively when there is no `CLAUDE.md` / `.claude/CLAUDE.md` / `CLAUDE.local.md` in or above the working directory. If a CLAUDE.md exists, only CLAUDE.md is read unless you set Project instructions to `claude-md-and-agents-md`. Not available in some sessions (e.g. Bedrock, telemetry disabled) — there, keep the portable pattern: make `AGENTS.md` the single source and put one line `@AGENTS.md` in `CLAUDE.md`.
- OpenAI "Harness engineering" (Feb 2026, UNVERIFIED — page returned HTTP 403 on both research passes including the 21 Sep 2026 fact-check; web.archive.org is not reachable from this tool; every detail below comes from search snippets) https://openai.com/index/harness-engineering/ : a small team shipped a ~1M-line product with no hand-written code over ~5 months; key lesson — keep AGENTS.md short (~100 lines) as a table of contents pointing to versioned docs in the repo, because a giant instruction file crowds out the task.

### 4.3 Agent Skills [V]
Sources: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills (16 Oct 2025; Barry Zhang, Keith Lazuka, Mahesh Murag) ; spec https://agentskills.io/specification ; https://code.claude.com/docs/en/best-practices
- A skill = a folder with `SKILL.md` (+ optional `scripts/`, `references/`, `assets/`). Originally developed by Anthropic and released as an open standard (agentskills.io says so without a date [V]); the `agentskills/agentskills` spec repo was created 16 Dec 2025 [V via api.github.com `created_at`], 25.6k stars on 21 Sep 2026. The often-quoted launch date "18 Dec 2025" is UNVERIFIED — say "December 2025" on a slide.
- Frontmatter: `name` (<= 64 chars, lowercase-hyphen, must match folder) and `description` (<= 1024 chars: what it does AND when to use it). Optional: `license`, `compatibility`, `metadata`, `allowed-tools` (experimental).
- Progressive disclosure: level 1 metadata (~100 tokens) always loaded; level 2 SKILL.md body (< 5,000 tokens, < 500 lines recommended) loaded when relevant; level 3 referenced files/scripts only when needed. This is why skills beat a fat CLAUDE.md.
- Skills can ship code: deterministic work (sorting, parsing a PDF) is cheaper and more reliable as a script than as generated tokens.
- In Claude Code: `.claude/skills/<name>/SKILL.md`; invoke as `/<name>`; `disable-model-invocation: true` for side-effect workflows you want to trigger manually; `$ARGUMENTS` for input. Validate with `skills-ref validate ./my-skill`.
- Security: install only from trusted sources; read bundled scripts and any instruction that reaches for the network.
- Authoring loop: start from an eval (where does the agent fail?), split when SKILL.md grows, watch how the agent actually uses it, let the agent help rewrite it.

### 4.4 Hooks, subagent definitions, plugins [V]
Source: https://code.claude.com/docs/en/best-practices , https://code.claude.com/docs/en/sub-agents
- Hooks = deterministic scripts at lifecycle points (PreToolUse, PostToolUse, Stop, ...). Use for zero-exception rules: run eslint after every edit, block writes to `migrations/`. Configure in `.claude/settings.json`, browse with `/hooks`. The agent can write its own hooks.
- Custom subagents: `.claude/agents/<name>.md` with frontmatter `name`, `description`, optional `tools`, `disallowedTools`, `model` (sonnet/opus/haiku/fable/inherit), `permissionMode`, `maxTurns`, `skills`, `mcpServers`, `hooks`, `memory`, `background`, `effort`, `isolation: worktree`. Built-ins: Explore (read-only), Plan, general-purpose. By default a subagent can spawn subagents up to three layers below the main conversation (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`), and spawning fails once 20 subagents are running in a session (`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`) [V].
- Plugins bundle skills + hooks + subagents + MCP servers; `/plugin` to browse.
- CLI tools (`gh`, `aws`, `gcloud`, `sentry-cli`) are the most context-efficient integrations; MCP tool definitions are deferred by default but still cost more than a CLI.

---

## 5. Rung 4 — safety nets: git, checkpoints, worktrees, permission modes

### 5.1 Checkpoints / rewind [V]
Source: https://code.claude.com/docs/en/checkpointing
- Every prompt that starts a turn creates a checkpoint; files are snapshotted before each edit. `Esc Esc` (empty input) or `/rewind` opens the menu: restore code and conversation / conversation only / code only / Summarize from here / Summarize up to here.
- Kept: the 100 most recent checkpoints per session; snapshots are swept ~30 days after the session last saved one (`cleanupPeriodDays`). They survive closing the terminal and `--resume`.
- NOT tracked: changes made by Bash commands (`rm`, `mv`, `cp`), most subagent edits, external edits, symlinked/hard-linked files. It is not a replacement for git.
- Teaching line: checkpoints are "local undo"; git is "permanent undo". Commit before anything risky; then tell the agent to try the risky thing.
- Kiro shipped checkpointing too at GA (17 Nov 2025): the GA post says you can now go back to a previous change in the agent execution flow [V] https://kiro.dev/blog/general-availability/

### 5.2 Git with agents
- Simon Willison's chapter "Using Git with coding agents" https://simonwillison.net/guides/agentic-engineering-patterns/using-git-with-coding-agents/ (listed in index [V]; body not opened).
- Anthropic long-running harness: commit after every unit of progress with a descriptive message so a later session (or you) can revert to a working state [V] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Willison's main anti-pattern: do not open pull requests with code you have not reviewed yourself; keep PRs small, include context and evidence that it works [V] https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/

### 5.3 Git worktrees [V]
Source: https://code.claude.com/docs/en/worktrees
- A worktree = separate working directory + branch sharing the same repo history. One agent session per worktree means parallel sessions never touch each other's files.
- `claude --worktree feature-auth` (or `-w`): creates `.claude/worktrees/feature-auth/` on branch `worktree-feature-auth`, branched from the remote default branch (`worktree.baseRef: "fresh"`; set `"head"` to branch from your current work). Omit the name and one is generated. `claude --worktree "#1234"` branches from a PR.
- Add `.claude/worktrees/` to `.gitignore`. A worktree is a fresh checkout: install deps again; list gitignored files to copy (e.g. `.env`) in `.worktreeinclude`.
- On exit: clean worktrees are removed automatically; ones with work prompt keep/remove.
- Subagents: ask "use worktrees for your agents" or set `isolation: worktree` in the subagent frontmatter. `/batch <instruction>` splits one big change across 5-30 worktree-isolated subagents, each opening a PR.
- Manual equivalent for any tool: `git worktree add ../proj-feature-a -b feature-a`, `git worktree list`, `git worktree remove ...`.
- Claude Code enforces isolation: blocks edits, commands, and git redirects that target the main checkout from inside a worktree session.

### 5.4 Permission modes, auto mode, sandboxing [V]
Sources: https://code.claude.com/docs/en/permission-modes ; https://www.anthropic.com/engineering/claude-code-auto-mode (25 Mar 2026, John Hughes)
- Modes: `default` (Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. On Pro/Max/Team the starting mode in terminal and VS Code is now auto mode.
- Auto mode: a classifier model reviews actions instead of you. Two layers — a prompt-injection probe on tool outputs, and a transcript classifier (runs on Sonnet 4.6, sees only user messages and bare commands so the agent cannot argue with it).
- Numbers from the post: users approved ~93% of permission prompts anyway (prompt fatigue); full pipeline false-positive rate 0.4%; false-negative rate on real over-eager actions 17%. So auto mode is a seatbelt, not a sandbox.
- `bypassPermissions` / `--dangerously-skip-permissions`: isolated containers and VMs only.
- Allowlists (`/permissions`) and OS-level sandbox (`/sandbox`) reduce prompts without removing control.

---

## 6. Spec-driven development (SDD): Spec Kit, Kiro, BMAD — and the critique

SDD = packaged rungs 2-3: write what and why, then how, then tasks, then implement against those files.

### 6.1 GitHub Spec Kit [V]
Sources: https://github.com/github/spec-kit (README on main, 21 Sep 2026) ; releases https://github.com/github/spec-kit/releases
- Open source (MIT), Python 3.11+, 138k stars, 12.4k forks (21 Sep 2026). Latest release v1.0.9 (21 Sep 2026); v1.0.3 through v1.0.9 all shipped between 1 and 21 Sep 2026 (v1.0.2 on 31 Aug) — seven releases in three weeks, it moves fast [V releases page].
- Install now: `uv tool install specify-cli` then `specify init my-project --integration copilot` (integration key per agent; Copilot "skills mode" is the README example).
- Core commands, current spelling is HYPHENATED: `/speckit-constitution` (project principles) -> `/speckit-specify` (what and why) -> `/speckit-plan` (technical approach) -> `/speckit-tasks` (work items) -> `/speckit-implement` -> `/speckit-converge` (check progress against the spec; repeat implement -> converge until it reports Converged).
- First-party extensions: `specify extension add bug` (`/speckit-bug-assess`, `/speckit-bug-fix`, `/speckit-bug-test`) and `specify extension add assess` (`/speckit-assess-intake`, `-research`, `-define`, `-shape`, `-decide` -> go / needs-clarification / kill). Extensions add capabilities; presets adapt behaviour.
- Older tutorials (late 2025) show dot syntax (`/speckit.specify`), `uvx --from git+https://github.com/github/spec-kit.git specify init`, and extra commands `/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`. The current README's core list does not show those three — re-check before demoing.

### 6.2 AWS Kiro [V]
Source: https://kiro.dev/docs/specs/
- A spec = three files: `requirements.md` (or `bugfix.md`) with user stories + acceptance criteria, `design.md`, `tasks.md`. Phases: Requirements -> Design -> Tasks, with approval gates.
- Variants now documented: Requirements-First, Design-First, Quick Spec (all three artifacts without gates), and Bugfix specs.
- Newer features on the page: parallel task execution (dependency analysis, independent tasks run concurrently), "Analyze Requirements" consistency check, and Correctness = property-based tests derived from the spec https://kiro.dev/docs/specs/correctness/ , https://kiro.dev/blog/property-based-testing/ (linked, not opened).
- Steering files (`product.md`, `tech.md`, `structure.md`) are Kiro's project memory (per Böckeler, below). Requirements use EARS-style "WHEN ... THE SYSTEM SHALL ..." phrasing — UNVERIFIED on the current docs page (not mentioned in the fetched summary).
- GA 17 Nov 2025 with Kiro CLI (Claude Sonnet 4.5 / Haiku 4.5 / Auto), team plans via AWS IAM Identity Center, property-based testing, checkpointing [V] https://kiro.dev/blog/general-availability/ . Pricing on 21 Sep 2026 [V] https://kiro.dev/pricing/ : Free $0 with 50 credits/month; Pro $20 per user/month (1,000 credits); Pro+ $40 (2,000); Pro Max $100 (5,000); Power $200 (10,000).

### 6.3 BMAD Method [V]
Sources: https://github.com/bmad-code-org/BMAD-METHOD , https://docs.bmad-method.org/
- "Breakthrough Method for Agile AI Driven Development". 53.3k stars.
- Current install: `npx skills add bmad-code-org/BMAD-METHOD`; or Claude Code `/plugin marketplace add bmad-code-org/bmad-plugins`; or `codex plugin marketplace add bmad-code-org/bmad-plugins`. It now ships as Agent Skills/plugins.
- Current framing: one delivery loop — Clarify -> Plan -> Build and verify -> Learn and adjust — with right-sized process (small change goes straight to build; bigger work enters earlier). Skills named in docs: `bmad-spec`, `bmad-build`, `bmad-project-context`, `bmad-help`. Modules: BMad Method, Builder, Creative Intelligence Suite, Test Architect, Loop, Game Dev Studio.
- The older picture (persona agents Analyst / PM / Architect / Scrum Master / Dev / QA, `npx bmad-method install`, PRD -> architecture -> sharded stories) does not appear in the current README. Treat any 2025 BMAD tutorial as outdated.

### 6.4 The critique — Birgitta Böckeler on martinfowler.com (15 Oct 2025) [V]
Source: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- Three meanings of SDD: spec-first (spec is starter fluid), spec-anchored (spec stays alive and changes flow through it), spec-as-source (humans edit only the spec; e.g. Tessl marks code as generated, do-not-edit).
- Findings: for a small bug Kiro's workflow was heavy (she likens it to a sledgehammer for a nut); spec-kit produced lots of markdown that was more tedious to review than code; elaborate workflows gave a false sense of control because the agent still skipped or over-applied instructions.
- Teaching line: SDD is a dial, not a religion. One-sentence diff -> no spec. Multi-file feature -> SPEC.md + plan. Multi-week product -> a toolkit.

---

## 7. Rung 6 — long-running work: Ralph, /goal, harnesses

### 7.1 Geoffrey Huntley's Ralph loop [V]
Sources: https://ghuntley.com/ralph/ (14 Jul 2025) ; https://ghuntley.com/loop/ ("Everything is a Ralph Loop", 17 Jan 2026) ; history https://www.humanlayer.dev/blog/brief-history-of-ralph (Dex Horthy, 6 Jan 2026)
- The only direct quote in this file — Huntley: "Ralph is a Bash loop." The original, exactly as printed on the page: `while :; do cat PROMPT.md | claude-code ; done` — an endless shell loop piping PROMPT.md into a coding-agent CLI [V]. Own-words equivalent for Claude Code: `while true; do claude -p "$(cat PROMPT.md)"; done` (add permissions flags and a stop condition before using for real).
- Mechanics: one task per iteration; each iteration is a FRESH context that re-reads the same files — `PROMPT.md`, a prioritised `fix_plan.md`, `specs/*`, an `AGENT.md` with build/run notes. Tests and the compiler provide backpressure. Subagents absorb expensive searches. When it misbehaves you tune the prompt like tuning an instrument; the failure modes are predictable.
- Claims on the page (self-reported, anecdotal; [V] only that they appear there — CORRECTED 21 Sep 2026, the earlier draft merged two separate stories): (a) an iMessage screenshot, "shared with permission", from an unnamed person: a $50k USD contract MVP, delivered, tested and reviewed, for $297 USD — done with Amp (@ampcode), NOT Claude Code, and not tied to any hackathon; (b) separately, a linked repomirror write-up titled "We Put a Coding Agent in a While Loop and It Shipped 6 Repos Overnight" https://github.com/repomirrorhq/repomirror/blob/main/repomirror.md — Huntley's page does not say it was a YC hackathon (UNVERIFIED); (c) Ralph is building CURSED, an esoteric language compiled via LLVM — the page gives no total build time (it only mentions a spec bug found "a month in"), so "~3 months" is UNVERIFIED; HumanLayer's timeline puts the CURSED launch in Sep 2025, two months after the Jul 2025 Ralph post.
- Timeline (HumanLayer): 19 Jun 2025 meetup talk -> Jul 2025 blog post -> Sep 2025 CURSED launch -> Dec 2025 Anthropic ships an official plugin -> 1 Jan 2026 "showdown" livestream. Press: The Register, 27 Jan 2026, by Simon Sharwood — headline says the 'Ralph Wiggum' loop prompts Claude to vibe-clone commercial software for $10 an hour, and the piece notes Anthropic built a Ralph Wiggum plugin for Claude Code [V opened 21 Sep 2026] https://www.theregister.com/2026/01/27/ralph_wiggum_claude_loops/
- Official plugin [V]: https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop (earlier path: anthropics/claude-code/plugins/ralph-wiggum). Commands `/ralph-loop "<prompt>" --max-iterations <n> --completion-promise "<text>"` and `/cancel-ralph`. Implemented as a Stop hook that blocks exit and re-feeds the prompt INSIDE the same session. README guidance: good for well-defined tasks with clear success criteria and greenfield work; bad for judgment/design calls, one-shots, unclear criteria, production debugging; always set `--max-iterations`.
- Critique (Dex Horthy): the power of Ralph is small tasks in independent context windows; the in-session plugin loses that, and is fragile without permissive flags. He prefers the five-line bash loop.
- Jan 2026 Huntley position: monolithic single-process loop, one task per loop, over multi-agent "microservices"; watch the loop and engineer away each failure domain.

### 7.2 Claude Code's native loop tools (2026) [V]
Source: https://code.claude.com/docs/en/goal
- `/goal <condition>`: after each turn a small fast model (Haiku by default) judges the condition from the transcript: not yet met -> another turn with the reason as guidance; met -> goal clears; impossible -> clears with reason. It cannot run tools itself, so write conditions the agent's own output can prove ("`npm test` exits 0", "`git status` is clean"). Up to 4,000 chars. Bound it: "or stop after 20 turns". `/goal` shows status, `/goal clear` stops. Works headless: `claude -p "/goal ..."`. Pair with auto mode for unattended runs.
- Comparison given in the docs: `/goal` = next turn when the previous ends, until a model confirms the condition; `/loop` = re-run on a time interval; Stop hook = your own script or prompt decides.
- Mapping to Ralph: `/goal` is an in-session Ralph with an evaluator; the bash loop with `claude -p` is the fresh-context Ralph.

### 7.3 Anthropic harness posts [V]
(a) "Effective harnesses for long-running agents" (26 Nov 2025, Justin Young) https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Problem: each new session starts with no memory; agents either try to one-shot everything or declare victory early.
- Two prompts: an initializer agent (first session: writes `init.sh`, a progress file `claude-progress.txt`, a feature list, first git commit) and a coding agent (every later session: make incremental progress on ONE feature, leave the environment clean).
- Feature list as JSON with 200+ end-to-end features, all initially marked failing; the agent may only flip a feature to passing after testing it as a user would (browser automation via Puppeteer MCP). JSON chosen because models are less likely to casually rewrite it than Markdown.
- Session ritual: read progress + feature list + git log, run `init.sh`, test that the app still works, pick one failing feature, implement, verify, commit, update progress.
- Failure -> fix pairs: premature victory -> feature list; messy handoff -> git + progress notes; untested "done" -> explicit self-verification; cannot run the app -> `init.sh`.

(b) "Harness design for long-running application development" (24 Mar 2026, Prithvi Rajasekaran) https://www.anthropic.com/engineering/harness-design-long-running-apps
- Three roles: Planner (one-line prompt -> product spec), Generator (builds in chunks), Evaluator (drives the running app with Playwright and grades against criteria). GAN-like separation because agents grade their own work too generously.
- Sprint contracts: generator and evaluator agree what "done" means for a chunk before code is written.
- Context resets (fresh session + structured handoff) vs compaction: Sonnet 4.5 showed "context anxiety" (wrapping up early near the limit), which compaction did not cure; Opus 4.6 largely removed the need, and the sprint construct was dropped.
- Costs: retro game maker on Opus 4.5 — solo 20 min / $9 vs full harness 6 h / $200; DAW on Opus 4.6 — 3 h 50 min / $124.70 (planner 4.7 min / $0.46; build phase, all rounds, 3 h 15 min / $113.85; QA phase, all rounds, 25.2 min / $10.39) [V exact figures re-checked 21 Sep 2026].
- Design-quality rubric for the evaluator: design quality, originality, craft, functionality — first two weighted higher to fight generic "AI look".
- Meta-lesson: every harness component encodes an assumption about what the model cannot do; re-test and strip components with each model release. The interesting harness space moves, it does not shrink.

### 7.4 "Building a C compiler with a team of parallel Claudes" (5 Feb 2026, Nicholas Carlini) [V]
Source: https://www.anthropic.com/engineering/building-c-compiler
- 16 parallel Opus 4.6 instances, each in a Docker container with its own clone, each in an endless bash loop that starts a new session when the last ends; task claiming by lock files in `current_tasks/`; merge back to upstream.
- ~2,000 Claude Code sessions over two weeks, ~$20,000 API cost, ~100,000 lines of Rust; compiles Linux 6.9 on x86, ARM, RISC-V; the post's wording is a 99% pass rate on most compiler test suites including the GCC torture suite [V]. Limits: no own assembler/linker, 16-bit real-mode boot code delegated to GCC, output slower than unoptimised GCC.
- Lessons: tests must be near-perfect because the agent optimises for them; design output for the agent (little stdout, details to log files, grep-friendly error lines, summary stats); agents are time-blind — give a `--fast` sampled test mode; parallelism breaks when everyone hits the same giant task — use an oracle (GCC) to split it; specialise roles (dedup, performance, docs, quality).

### 7.5 Cursor, "Scaling long-running autonomous coding" (14 Jan 2026, Wilson Lin) [V]
Source: https://cursor.com/blog/scaling-agents ; commentary https://simonwillison.net/2026/jan/19/scaling-long-running-autonomous-coding/ [V] ; HN https://news.ycombinator.com/item?id=46624541
- Failed: flat peer agents with locks (20 agents slowed to the throughput of 2-3; locks held too long or never released) and optimistic concurrency (agents became risk-averse, small safe edits, churn).
- Worked: planners (recursive, can spawn sub-planners) -> workers (grind one task, no cross-talk) -> a judge at the end of each cycle, then a fresh start. Removing an "integrator" role removed a bottleneck.
- Scale: browser from scratch ~1M+ lines / 1,000 files in about a week; Solid->React migration +266K/-193K over 3+ weeks; 25x video-render speed-up. Prompts mattered more than harness; model choice per role mattered.
- Reality check: the announcement drew scepticism because CI was failing and build steps were missing; fixed within a day; Willison then built and ran it, with visible rendering glitches.

---

## 8. Rung 7 — multi-agent orchestration, and when NOT to

### 8.1 The pattern vocabulary — "Building effective agents" (19 Dec 2024, Erik Schluntz and Barry Zhang) [V]
Source: https://www.anthropic.com/engineering/building-effective-agents
- Workflows = LLMs and tools on predefined code paths. Agents = LLMs directing their own process and tool use.
- Five workflow patterns: prompt chaining, routing, parallelization (sectioning / voting), orchestrator-workers (central LLM splits and delegates dynamically), evaluator-optimizer (one generates, one critiques, loop).
- Default advice: start with the simplest thing; add complexity only when it measurably improves results; agents cost more and compound errors; sandbox and guardrail them.
- Three principles: simplicity, transparency (show planning), a carefully documented and tested agent-computer interface.

### 8.2 The evidence for multi-agent — "How we built our multi-agent research system" (13 Jun 2025) [V]
Source: https://www.anthropic.com/engineering/multi-agent-research-system (Hadfield, Zhang, Lien, Scholz, Fox, Ford)
- Orchestrator-worker: lead Opus 4 plans and spawns Sonnet 4 subagents in parallel. +90.2% over single-agent Opus 4 on an internal research eval.
- Bill: agents ~4x the tokens of chat; multi-agent ~15x. Token usage alone explained ~80% of performance variance on a browsing benchmark — multi-agent works largely because it spends more tokens in parallel windows.
- Poor fit: work needing shared context or many dependencies; the post says most coding tasks have fewer truly parallel parts than research.
- Eight prompt lessons: think like your agents (simulate); teach the orchestrator to delegate (objective, output format, tools, boundaries); scale effort to query complexity with explicit rules; tool design is critical; let agents improve prompts and tool descriptions; start wide then narrow; guide thinking; parallel tool calls (up to ~90% faster research).
- Eval lessons: start with ~20 real queries; LLM-as-judge with a rubric; humans catch what automation misses. Production: agents are stateful, errors compound -> resumable checkpoints, full tracing, rainbow deploys.

### 8.3 When to go multi-agent — Anthropic blog (23 Jan 2026, Cara Phillips et al.) [V]
Source: https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them
- Worth it in three cases: context protection (side work would pollute the main window), parallelization (independent facets), specialization (focused tool sets / prompts / domain).
- Cost: typically 3-10x the tokens of a single agent for the same task.
- Not worth it when better prompting of one agent gets the same result or when coordination overhead eats the gain. Exhaust single-agent options first.
- Decompose by CONTEXT, not by job title: the agent that builds a feature should also write its tests, because it already holds the context. Splitting by work type (planner/coder/tester) creates handoff loss.
- Verification-subagent pattern: one agent whose only job is to test/validate, with an instruction that it must run the complete suite before passing.

### 8.4 The counter-position — Cognition, "Don't Build Multi-Agents" (12 Jun 2025, Walden Yan) [V]
Source: https://cognition.com/blog/dont-build-multi-agents (cognition.ai redirects)
- Principle 1: share context — full agent traces, not just messages. Principle 2: actions carry implicit decisions; conflicting decisions produce bad results.
- Flappy Bird example: two subagents build a Mario-style background and a mismatched bird; the lead has to merge incompatible assumptions.
- Recommends a single-threaded linear agent; for very long tasks add a dedicated context-compression model.
- Its description of Claude Code (subagents only answer questions, never work in parallel) was true in mid-2025 and is now outdated — see 8.5. The principle still holds and matches Anthropic's Jan 2026 "decompose by context".

### 8.5 Claude Code's five ways to run work in parallel (Sep 2026) [V]
Source: https://code.claude.com/docs/en/agents
- Subagents: workers inside one session, own window, return a summary. Use when a side task would flood the main conversation. https://code.claude.com/docs/en/sub-agents
- Agent view (`claude agents`, research preview): one screen to dispatch and monitor background sessions; each moves into its own worktree before editing. https://code.claude.com/docs/en/agent-view
- Agent teams (experimental, off by default; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`): a lead + teammates with a shared task list and a mailbox; teammates message each other. Best for research/review, competing-hypothesis debugging, separate modules, cross-layer work. Start with 3-5 teammates, 5-6 tasks each; one owner per file; no nested teams; no resume of in-process teammates; teammates are not worktree-isolated (stated explicitly on https://code.claude.com/docs/en/agents — partition files so each teammate owns a different set). ~7x tokens of a normal session when teammates run in plan mode. https://code.claude.com/docs/en/agent-teams , https://code.claude.com/docs/en/costs
- Projects (public beta, Pro/Max): one ongoing conversation at claude.ai/code that spawns parallel cloud "threads". https://code.claude.com/docs/en/claude-projects
- Dynamic workflows: Claude writes a JavaScript script (`agent()`, `pipeline()`, `parallel()`, `phase()`) that a runtime executes in the background; the plan lives in code, results in script variables, only the final answer returns to context. Triggers: say "use a workflow", the keyword `ultracode`, or `/effort ultracode`. Bundled: `/deep-research`. Limits: 16 concurrent agents by default, 1,000 agents per run, 4,096 items per `pipeline()`/`parallel()`; "Large workflow" warning above 25 agents or ~1.5M projected tokens; size guideline small (<5) / medium (<10) / large (<50). Save to `.claude/workflows/` and rerun as `/<name>`. https://code.claude.com/docs/en/workflows
- Helpers: worktrees (file isolation), cross-session messaging, `/batch` (5-30 worktree subagents, one PR each), routines (scheduled cloud sessions), `/fork` and `/subtask`.
- Decision questions from the docs: who coordinates (Claude in one conversation / you / a lead agent / a script)? Do workers need to talk? Do tasks touch the same files?

### 8.6 Background and cloud agents [V unless marked]
- Claude Code in the cloud (research preview; Pro, Max, Team, some Enterprise seats): start from claude.ai/code, mobile, desktop, or `claude --cloud "task"` (`--remote` is a deprecated alias); runs in an Anthropic-managed VM that clones your GitHub branch (push first); pull back with `claude --teleport` / `/teleport`; send follow-ups with `claude -p "msg" --cloud <session-id>`; Auto-fix watches a PR for CI failures and review comments (`/autofix-pr`); no separate compute charge, shares your rate limits; GitHub only for clone/PR. https://code.claude.com/docs/en/claude-code-on-the-web
- Remote Control steers a LOCAL session from phone/browser (different feature). https://code.claude.com/docs/en/remote-control
- GitHub Copilot cloud agent: assign an issue to Copilot or use the agents panel or mention `@copilot` on a PR; runs in an ephemeral GitHub Actions environment; output is a draft PR. https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent
- Others in the same category, not opened in this pass (UNVERIFIED details): OpenAI Codex cloud, Cursor background agents, Google Jules, Devin.
- Architecture note — "Scaling Managed Agents: decoupling the brain from the hands" (8 Apr 2026; Lance Martin, Gabe Cemaj, Michael Cohen): session log as a durable event store outside the context window, stateless harness, credentials never inside the sandbox, containers provisioned only when needed; p50 time-to-first-token down ~60%, p95 down >90%. https://www.anthropic.com/engineering/managed-agents

### 8.7 One-slide rule: when NOT to use multi-agent
- The task is sequential, or pieces share files or decisions (Cognition; agent-teams docs).
- A better prompt or a /clear would fix it (Anthropic Jan 2026).
- You cannot afford 3-10x (up to 15x) tokens (Anthropic Jan 2026; Jun 2025).
- You have no automated check — parallel agents without tests multiply unverified code (C-compiler post).
- Default to: one agent + subagents for research + a fresh-context reviewer. Add parallel writers only with worktrees and one owner per file.

---

## 9. If you build agents yourself: tools and 12-factor

### 9.1 "Writing effective tools for agents — with agents" (11 Sep 2025, Ken Aizawa et al.) [V]
Source: https://www.anthropic.com/engineering/writing-tools-for-agents
- Loop: prototype the tool -> run an eval with realistic tasks -> let Claude read the transcripts and improve the tool.
- Principles: fewer, higher-level tools rather than one wrapper per API endpoint; namespace tools (`asana_projects_search`); return meaningful context (names over UUIDs; offer concise/detailed response formats); be token-efficient (pagination, filtering, truncation with helpful messages — Claude Code caps tool responses at 25,000 tokens by default); prompt-engineer descriptions and parameter names (`user_id`, not `user`).

### 9.2 HumanLayer, 12-Factor Agents (Dex Horthy) [V]
Source: https://github.com/humanlayer/12-factor-agents (26.3k stars)
- Thesis: production-grade LLM apps are mostly ordinary software with LLM steps at the right points; own the pieces instead of adopting a monolithic framework.
- Factors: 1 natural language to tool calls; 2 own your prompts; 3 own your context window; 4 tools are just structured outputs; 5 unify execution state and business state; 6 launch/pause/resume with simple APIs; 7 contact humans with tool calls; 8 own your control flow; 9 compact errors into the context window; 10 small, focused agents; 11 trigger from anywhere; 12 make the agent a stateless reducer. Bonus 13: pre-fetch context you know you will need.
- Bridges to this masterclass: factor 3 = Section 1; factor 10 = Section 8.7; factor 7 = permission prompts / AskUserQuestion; factor 9 = design test output for the agent.

---

## 10. Model routing and cost control

### 10.1 Routing [V]
Source: https://code.claude.com/docs/en/model-config , https://code.claude.com/docs/en/sub-agents
- Claude Code aliases on 21 Sep 2026 (Anthropic API) [V, CORRECTED]: `opus` -> Opus 5; `sonnet` -> Sonnet 5 (on the Anthropic API Sonnet 5 always runs with the 1M window — no 200K variant, no `[1m]` suffix, auto-compacts at about 967K tokens); `default` depends on plan — Opus 5 on Max / Team Premium / Enterprise / API, but Sonnet 5 on Pro / Team Standard (so a Pro student's "default" is Sonnet, not Opus); `haiku` -> the current fast Haiku model (the page names no version — "Haiku 4.5" is UNVERIFIED); `fable` -> Fable 5.1 (Fable 5 in Claude apps gateway sessions); `best` -> whatever `fable` resolves to where Fable is available, else the same model as `opus`; `opusplan` -> `opus` in plan mode, `sonnet` for execution; `[1m]` suffix is needed only for Opus 4.6 / Sonnet 4.6 — Fable 5.1, Fable 5, Sonnet 5 and Opus 4.7+ get the 1M window on every plan including Pro without it. These change — check the page the week of the talk.
- Effort levels: `low`, `medium`, `high` (default on most models), `xhigh`, `max`, plus `ultracode` (= xhigh + automatic workflow orchestration). Set with `/effort`, `claude --effort`, or `CLAUDE_CODE_EFFORT_LEVEL`. The old "think / think hard / ultrathink" keyword advice is no longer on the best-practices page.
- Per-role routing: `model: haiku` in a subagent file for simple work; `CLAUDE_CODE_SUBAGENT_MODEL` for a global subagent default; name the model in the spawn prompt for teammates ("Use Sonnet for each teammate"). The small fast model (Haiku) already runs `/goal` evaluation and background summaries.
- Pattern from the research system: expensive model plans and synthesises, cheaper model does the parallel legwork (Opus lead + Sonnet workers).
- Other routers (UNVERIFIED in this pass): Kiro "Auto" agent, Cursor "Auto", OpenRouter auto-routing (https://openrouter.ai/docs — specific page returned 404).

### 10.2 Cost facts and levers [V]
Source: https://code.claude.com/docs/en/costs
- Enterprise averages: about $13 per developer per active day, $150-250 per developer per month; under $30 per active day for 90% of users. (Older versions of this page quoted roughly $6/day — UNVERIFIED from memory; the point is that the number has risen with more autonomous use.)
- `/usage` shows session cost, per-model tokens, prompt-cache hit rate, and on subscriptions an attribution breakdown (skills, subagents, plugins, MCP servers, loops). `/insights` writes an HTML report on how you work. `--max-budget-usd` caps a headless run.
- Levers, in order of impact: `/clear` between tasks; right model for the job (Sonnet for most, Opus for architecture, Haiku for simple subagents); lower `/effort` for simple tasks (thinking tokens bill as output); keep CLAUDE.md < 200 lines and move workflows to skills; prefer CLI tools over MCP servers and disable unused servers (`/mcp`); hooks that pre-filter noisy output (e.g. only failing tests); subagents for verbose operations; specific prompts; plan mode before expensive work; stop early with `Esc`.
- Why long sessions get expensive: the full conversation is re-sent on every request (cached, but still billed at the cache-read rate); after a break longer than the cache lifetime (1 h on subscription, 5 min on API by default) the whole context is re-processed; scheduled loops, goal check-ins, cross-session messages, and idle teammates all keep spending. `/compact` is itself a big request; `/clear` is free.
- Multi-agent multipliers to quote: ~4x (agent vs chat), ~15x (multi-agent research), 3-10x (multi-agent generally), ~7x (agent team in plan mode), harness run 22x a solo run ($200 vs $9).
- For students in Kazakhstan: a flat subscription with `/usage` bars is the predictable option; API keys + loops are where surprise bills happen — always set iteration caps (`--max-iterations`, "or stop after N turns", `--max-budget-usd`).

---

## 11. Evals and observability

### 11.1 "Demystifying evals for AI agents" (9 Jan 2026; Mikaela Grace, Jeremy Hadfield, Rodrigo Olivares, Jiri De Jonghe) [V]
Source: https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- Vocabulary: task, trial (repeat because outputs vary), grader, transcript, outcome (final environment state), eval harness vs agent harness, eval suite.
- Graders: code-based (fast, cheap, reproducible, brittle), model-based (flexible, needs calibration), human (gold standard, slow). Prefer deterministic graders where possible; for coding agents, "does it run and do tests pass" plus an LLM rubric for quality.
- Capability evals (start low, measure what it can do) vs regression evals (stay near 100%). pass@k (at least one of k succeeds) vs pass^k (all k succeed = reliability).
- Roadmap: start with 20-50 tasks taken from real failures; convert manual checks you already do; write unambiguous tasks with reference solutions; isolate each trial in a clean environment; read transcripts regularly; watch for saturation; give the suite an owner.
- Tools named: Harbor, Braintrust, LangSmith, Langfuse, Arize Phoenix.
- Companion posts: "Quantifying infrastructure noise in agentic coding evals" (5 Feb 2026) https://www.anthropic.com/engineering/infrastructure-noise ; "Designing AI-resistant technical evaluations" (21 Jan 2026) https://www.anthropic.com/engineering/AI-resistant-technical-evaluations ; "Eval awareness in Claude Opus 4.6's BrowseComp performance" (6 Mar 2026) https://www.anthropic.com/engineering/eval-awareness-browsecomp (titles/dates [V] from the index; bodies not opened).

### 11.2 Observability for a coding agent [V]
Source: https://code.claude.com/docs/en/monitoring-usage
- Turn on: `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_METRICS_EXPORTER=otlp|prometheus|console`, `OTEL_LOGS_EXPORTER=otlp|console`, `OTEL_EXPORTER_OTLP_ENDPOINT=...`.
- Metrics: `claude_code.session.count`, `claude_code.token.usage`, `claude_code.cost.usage`, `claude_code.lines_of_code.count`, `claude_code.commit.count`, `claude_code.pull_request.count`, `claude_code.code_edit_tool.decision`, `claude_code.active_time.total`.
- Events: `claude_code.user_prompt`, `claude_code.tool_result`, `claude_code.tool_decision`, `claude_code.api_request`, `claude_code.api_error` (prompt text only with `OTEL_LOG_USER_PROMPTS=1`).
- Traces (beta): `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` + `OTEL_TRACES_EXPORTER=otlp`; spans `claude_code.interaction` > `llm_request` / `hook` / `tool`.
- Any OTel backend works (Grafana, Datadog, Honeycomb, Langfuse...). For beginners the zero-setup version is `/usage`, `/insights`, `/context`, and the transcript itself.

### 11.3 Beginner translation
- An eval is a test suite for the agent + your prompts/CLAUDE.md. Minimal version: keep 10-20 real tasks that went wrong, rerun them after you change CLAUDE.md, a skill, or the model.
- Claude Code docs say the same about CLAUDE.md: treat it like code and check that behaviour actually changes after an edit.

---

## 12. What is new in 2026 (timeline to cite)

- 9 Jan — Anthropic: Demystifying evals for AI agents. [V]
- 14 Jan — Cursor: Scaling long-running autonomous coding (planner/worker/judge; 1M-line browser). [V]
- 17 Jan — Huntley: Everything is a Ralph Loop. [V]
- 23 Jan — Anthropic blog: Building multi-agent systems — when and how (3-10x tokens; decompose by context). [V]
- 4 Feb — Karpathy proposes "agentic engineering" on the vibe-coding anniversary. (date from post ID; wording UNVERIFIED)
- 5 Feb — Anthropic: C compiler with 16 parallel Claudes ($20k, 100k lines). [V]
- ~11 Feb — OpenAI: Harness engineering (AGENTS.md as table of contents). UNVERIFIED (HTTP 403 again on the 21 Sep 2026 re-check; date and content from search snippets only).
- 23 Feb — Simon Willison launches the Agentic Engineering Patterns guide https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/ ; index https://simonwillison.net/guides/agentic-engineering-patterns/ [V index]. Chapters as listed in the index on 21 Sep 2026 (16) [V]: what is agentic engineering; writing code is cheap now; hoard things you know how to do; AI should help us produce better code; anti-patterns (things to avoid); how coding agents work; using Git with coding agents; subagents; red/green TDD; first run the tests; agentic manual testing; linear walkthroughs; interactive explanations; two annotated case studies (a GIF optimization tool using WebAssembly and Gifsicle; adding a new content type to a blog-to-newsletter tool); prompts I use. The 23 Feb launch post itself named only the first two chapters published that day (writing code is cheap now; red/green TDD) and promised 1-2 more per week [V].
- 24 Mar — Anthropic: Harness design for long-running apps (planner/generator/evaluator). [V]
- 25 Mar — Anthropic: Claude Code auto mode. [V]
- 8 Apr — Anthropic: Managed Agents. [V]
- 23 Apr — Anthropic: update on Claude Code quality reports (postmortem) https://www.anthropic.com/engineering/april-23-postmortem [V title/date only].
- 2026, undated in docs — Claude Code features now in the official guide: `/goal`, dynamic workflows + `ultracode`, agent view, agent teams (experimental), Projects, `/batch`, routines, native AGENTS.md reading (v2.1.277+), `/btw`, `/insights`. [V]
- Sep 2026 — Spec Kit 1.0.x with `/speckit-converge`, bug and assess extensions (1.0.9 on 21 Sep). [V]
- Also: Anthropic "2026 Agentic Coding Trends Report" PDF https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf (seen in search results; not opened — UNVERIFIED content).

---

## 13. Corrections to common claims (use as "myth vs now" slides)

1. "Anthropic's Claude Code best practices is a blog post at anthropic.com/engineering/claude-code-best-practices." — That URL now 308-redirects to the living docs page https://code.claude.com/docs/en/best-practices. The content was rewritten: verification comes first, context management is the organising idea, and the think/ultrathink keyword advice is gone (use `/effort`). The Apr 2025 original is still listed in the engineering index by title only.
2. "Spec Kit commands are /speckit.specify, /speckit.plan ... installed with uvx." — Current README uses hyphens (`/speckit-specify`), `uv tool install specify-cli`, `specify init <name> --integration <agent>`, and adds `/speckit-converge` plus bug/assess extensions.
3. "BMAD = a team of persona agents (Analyst, PM, Architect, Scrum Master, Dev, QA) installed with npx bmad-method install." — Current repo installs as skills/plugins (`npx skills add bmad-code-org/BMAD-METHOD`) and describes a Clarify -> Plan -> Build and verify -> Learn and adjust loop; personas are absent from the README.
4. "Claude Code ignores AGENTS.md; you must symlink it." — Since v2.1.277 it reads AGENTS.md natively when no CLAUDE.md exists. The `@AGENTS.md` import remains the portable fallback.
5. "AGENTS.md is OpenAI's format." — It was donated to the Agentic AI Foundation (Linux Foundation) on 9 Dec 2025; 60k+ repos.
6. "Multi-agent is 90% better." — That number is for breadth-first research, at ~15x tokens, and the same post says most coding is less parallelisable. Anthropic's 2026 guidance: 3-10x tokens; try a single agent first.
7. "Claude Code subagents cannot write code in parallel" (from Cognition, Jun 2025). — Outdated: worktree-isolated subagents, `/batch`, agent teams, and workflows (up to 1,000 agents/run) exist. The underlying principle (shared context, one owner per decision) still stands.
8. "The official Ralph plugin is Ralph." — The plugin (`ralph-loop`) re-feeds the prompt inside one session via a Stop hook; the original technique's value is a fresh context per iteration. The $50k-for-$297 story is a self-reported anecdote from an iMessage screenshot on Huntley's page, and it credits Amp (@ampcode), not Claude Code — do not attach it to Claude Code or to a hackathon on a slide.
9. "Checkpoints mean I do not need git." — Checkpoints miss Bash-made changes and most subagent edits, keep 100 per session, and are swept after ~30 days.
10. "Use --dangerously-skip-permissions to stop the prompts." — Auto mode is now the default on Pro/Max/Team and is the intended answer; but with a 17% miss rate on over-eager actions it is not a sandbox.
11. "Long context windows solved context rot." — Opus 5 and Sonnet 5 have 1M windows, yet the official guide still says performance degrades as the window fills and tells you to `/clear`. Chroma's 18 models are 2025 models; cite the principle, not the figures.
12. "Always build an elaborate harness / always reset context." — Anthropic's Mar 2026 post removed the sprint construct and context resets when moving from Sonnet 4.5 / Opus 4.5 to Opus 4.6. Harness parts are model-specific assumptions; re-test them.
13. "Agent teams are a standard Claude Code feature." — Experimental, off by default, known limits (no resume, no nested teams, not worktree-isolated), ~7x tokens.
14. Secondary sources date Karpathy's "agentic engineering" post variously (one search summary said 10 Feb); the post ID decodes to 4 Feb 2026. A search snippet also claimed he joined Anthropic — UNVERIFIED, do not repeat. On 21 Sep 2026 the post could not be opened by any automated route (x.com HTTP 402, mirror 451, X oEmbed 402): open it in a normal browser and screenshot the real text before putting any quote from it on screen.

---

## 14. Ready-to-use templates

All templates are original text written for this masterclass, built from the practices above. Square brackets = fill in. They work in Claude Code, Codex, Cursor, Kiro, Copilot.

### 14.1 PRD prompt (interview -> SPEC.md)

```text
I want to build: [one or two sentences].

Before writing anything, interview me. Ask one question at a time
(use your question tool if you have one). Skip obvious questions; dig into
the parts I probably have not thought through:
- who the user is and the single most important job they need done
- the smallest version that is still useful (MVP) and what is explicitly OUT of scope
- data: what is stored, where, who can see it
- edge cases, failure states, empty states
- tech constraints: [stack / hosting / budget / deadline]
- how we will know it works (acceptance checks a script or a person can run)

Stop when you have enough, then write SPEC.md with these sections:
1. Problem and user  2. Goals / Non-goals  3. User stories with acceptance criteria
4. Data model  5. Screens or endpoints  6. Tech decisions and why
7. Out of scope  8. End-to-end verification steps  9. Open questions

Do not write code. I will review SPEC.md and start a fresh session to build it.
```

### 14.2 Plan prompt (plan mode / read-only)

```text
Read SPEC.md and the existing code under [paths]. Do not edit anything yet.

1. Tell me what you found: relevant files, existing patterns to reuse, risks.
2. Propose an implementation plan as PLAN.md:
   - ordered steps, each small enough to verify on its own
   - files to create or change per step
   - the test or check that proves each step works
   - what you will NOT touch
   - questions or assumptions I must confirm
3. Offer one simpler alternative if there is one, with the trade-off.

Wait for my approval before implementing. If a step turns out wrong while
implementing, stop and update the plan instead of improvising.
```

### 14.3 Bug-fix prompt (reproduce first)

```text
Bug: [what the user sees], expected: [what should happen].
Where: [page / endpoint / file guess]. Since: [commit, date, or "unknown"].
Evidence: [paste error, log lines, screenshot].

Process:
1. Reproduce it. Write a failing test (or a script) that shows the bug. Show me the failure.
2. Find the root cause. Explain it in 3-5 sentences. Do not hide the symptom
   (no try/catch that swallows it, no skipped or deleted tests).
3. Fix it with the smallest change. Run the new test and the related suite.
4. Show evidence: the command you ran and its output.
5. Tell me if the same mistake likely exists elsewhere; list places, do not fix them yet.

Do not refactor unrelated code. Commit with a message that explains the cause.
```

### 14.4 Review prompt (fresh context, adversarial but bounded)

```text
You are reviewing a change you did not write. Use a fresh subagent/session.
Inputs: the diff of [branch or PR], SPEC.md / PLAN.md, and AGENTS.md.

Check, in this order:
1. Correctness: does it do what the spec says? Which requirement is missing or wrong?
2. Edge cases from the spec: is each one handled AND tested?
3. Security: input validation, auth checks, secrets in code, injection, unsafe defaults.
4. Scope: anything changed that the task did not require?
5. Tests: would they fail if the feature broke? Any test weakened, skipped, or deleted?

Report only findings that affect correctness, security, or the stated requirements.
For each: file and line, what breaks, a concrete failing scenario, suggested fix.
Put style preferences in a separate, optional list. If you find nothing serious, say so.
```

### 14.5 Test prompt (red/green)

```text
Add tests for [function / module / flow] in [path]. Use red/green TDD.

- Read the existing tests first and copy their style and runner ([runner]).
- Cover: the happy path, [edge case 1], [edge case 2], invalid input, and one regression
  for [past bug] if relevant. Avoid mocks unless the dependency is external or slow.
- For new behaviour: write the test, run it, show me it FAILS for the right reason,
  then implement until it passes.
- For existing behaviour: if a new test fails, stop and tell me — it may be a real bug.
  Do not change production code to make a test pass without asking.
- Run only the relevant tests while iterating, the full suite once at the end.
  Show the final output.
Never delete, skip, or loosen an existing test to get green.
```

### 14.6 CLAUDE.md / AGENTS.md example (short on purpose, ~40 lines)

Make `AGENTS.md` the single source; put the one line `@AGENTS.md` in `CLAUDE.md` so every tool and every Claude Code version reads the same thing.

```markdown
# AGENTS.md — qairu-notes (example)

## What this is
Next.js 15 (App Router) + TypeScript + Tailwind + Supabase. UI strings in EN and KK.

## Commands
- Install: `pnpm install`
- Dev server: `pnpm dev` (http://localhost:3000)
- Typecheck: `pnpm typecheck`   Lint: `pnpm lint`
- One test file: `pnpm vitest run path/to/file.test.ts`   All tests: `pnpm test`
- E2E: `pnpm e2e` (needs dev server running)

## Workflow
- For anything bigger than a one-line change: explore, write a plan, wait for approval.
- After a series of edits run typecheck + the related tests. Show the output.
- Small commits, message = what and why. Never push to `main`; open a PR.
- If you have been corrected twice on the same thing, stop and ask.

## Code rules that differ from defaults
- Server Components by default; add "use client" only when state or effects are needed.
- All DB access goes through `src/lib/db/*`. No Supabase calls inside components.
- Every user-facing string goes through `t()` with keys in `messages/en.json` and `messages/kk.json`.
- No new dependencies without asking.

## Gotchas
- `.env.local` is required (see `.env.example`). Never print or commit secrets.
- Supabase row-level security is ON; new tables need a policy or queries return empty.
- Kazakh text: test with long words; do not truncate with fixed widths.

## Do not touch
- `supabase/migrations/*` that are already applied — add a new migration instead.
- `src/generated/*` (generated types).

## When compacting
Keep: the list of modified files, the current plan step, and the test commands.

## More detail (read only when relevant)
- Architecture: docs/architecture.md   - API conventions: docs/api.md   - Release steps: docs/release.md
```

Why it is shaped this way: commands the agent cannot guess; only rules that differ from defaults; gotchas; pointers instead of pasted docs (table-of-contents style); a compaction instruction; under 200 lines. Hard guarantees (e.g. never edit applied migrations) should also be a hook.

### 14.7 Master-prompt skeleton (any task)

```text
GOAL        [one sentence: what should be true when you are done]
WHY         [who needs it / what it unblocks — helps the agent make trade-offs]
CONTEXT     Read first: @[file], @[file]. Pattern to follow: [existing example file].
            Docs: [URL]. Relevant history: [issue / PR / commit].
CONSTRAINTS Stack: [..]. Do not change: [..]. No new dependencies. Out of scope: [..].
PROCESS     1) explore and summarise  2) plan and wait for OK  3) implement in small steps
            4) verify  5) commit. Use subagents for broad searches.
DONE MEANS  [runnable check: `command` exits 0 / test names pass / screenshot matches]
            Show evidence: command + output (or screenshot).
IF STUCK    After two failed attempts at the same thing: stop, explain what you tried,
            propose options. Ask instead of guessing on anything ambiguous.
OUTPUT      Short summary: what changed, where, how verified, what is left.
LIMITS      [max turns / budget / time], then stop and report.
```

Loop variant (for `/goal` or a Ralph-style loop): keep the same skeleton in PROMPT.md, add "Pick the single highest-priority unchecked item in TODO.md, do only that, run the checks, tick it off, commit, update NOTES.md with anything the next session must know, then stop." and always set an iteration cap.

---

## Visual candidates

Posts and threads
- https://x.com/karpathy/status/2019137879310836075 — Karpathy's vibe-coding-anniversary post proposing "agentic engineering" (4 Feb 2026). Teaching point: the name change; you orchestrate and oversee. (Could not be opened by the automated fact-checker on 21 Sep 2026 — open it in a browser and confirm the wording before screenshotting; the post ID decodes to 4 Feb 2026 19:55 UTC.)
- https://x.com/simonw/status/2025990408514523517 — Simon Willison announcing the Agentic Engineering Patterns guide (Feb 2026). Teaching point: there is now a pattern catalogue; red/green TDD.
- https://x.com/AnthropicAI/status/2036481033621623056 — Anthropic announcing the multi-agent harness post (Mar 2026). Teaching point: planner / generator / evaluator.
- https://x.com/martinfowler/status/1978453531565695415 — Martin Fowler sharing Böckeler's SDD analysis (Oct 2025). Teaching point: SDD has three meanings; it is a dial.
- https://news.ycombinator.com/item?id=44564248 — HN thread "Context Rot" (260 points, 59 comments). Teaching point: long context is not free; community reaction.
- https://news.ycombinator.com/item?id=46624541 — HN thread on Cursor's scaling-agents post. Teaching point: hype vs scrutiny of "1M lines by agents".
- https://www.theregister.com/2026/01/27/ralph_wiggum_claude_loops/ — The Register headline on the Ralph loop (Jan 2026). Teaching point: a five-line loop became mainstream news.

Charts and diagrams
- https://www.trychroma.com/research/context-rot — accuracy-vs-input-length charts for 18 models. Teaching point: the one constraint (Section 1).
- https://code.claude.com/docs/en/context-window — interactive walkthrough of what fills a session's context. Teaching point: why /clear and subagents matter.
- https://www.anthropic.com/engineering/building-effective-agents — diagrams of prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Teaching point: the pattern vocabulary.
- https://www.anthropic.com/engineering/multi-agent-research-system — lead-agent/subagent architecture diagram. Teaching point: orchestrator-worker and the 15x token bill.
- https://mintcdn.com/claude-code/nsvRFSDNfpSU5nT7/images/subagents-vs-agent-teams-light.png (from https://code.claude.com/docs/en/agent-teams) — subagents vs agent teams diagram. Teaching point: who talks to whom.
- https://www.anthropic.com/engineering/harness-design-long-running-apps — cost/duration tables ($9 solo vs $200 harness; $124.70 DAW breakdown) and app screenshots. Teaching point: what autonomy costs and buys.
- https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents — failure-mode table and feature-list JSON snippet. Teaching point: progress file + feature list + commit ritual.
- https://www.anthropic.com/engineering/building-c-compiler — header and numbers (16 agents, ~2,000 sessions, $20k, 100k lines). Teaching point: tests are the steering wheel.
- https://cursor.com/blog/scaling-agents — planner/worker/judge description and the browser screenshot. Teaching point: hierarchy beats flat swarms.
- https://www.anthropic.com/engineering/claude-code-auto-mode — two-layer classifier diagram and the 93% / 0.4% / 17% numbers. Teaching point: permission fatigue and honest limits.

Pages and repos
- https://code.claude.com/docs/en/best-practices — the before/after prompt tables and the include/exclude CLAUDE.md table. Teaching point: specific prompts + verification.
- https://agents.md/ — homepage with supporting-tool logos and the 60k+ figure. Teaching point: one file, every agent.
- https://github.com/github/spec-kit — repo header (138k stars) and command list. Teaching point: SDD toolchain; commands change, read the README.
- https://kiro.dev/docs/specs/ — requirements / design / tasks flow. Teaching point: three-file spec.
- https://github.com/humanlayer/12-factor-agents — the 12-factor grid image in the README. Teaching point: agents are mostly software engineering.
- https://ghuntley.com/ralph/ — post header with the loop one-liner. Teaching point: the simplest possible harness.
- https://github.com/anthropics/claude-plugins-official/tree/main/plugins/ralph-loop — plugin README (when to use / not use). Teaching point: loops need stop conditions.
- https://simonwillison.net/guides/agentic-engineering-patterns/ — guide table of contents. Teaching point: a map of the field for further reading.
- https://agentskills.io/specification — SKILL.md frontmatter table and progressive-disclosure levels. Teaching point: skills vs fat CLAUDE.md.
- https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html — spec-first / spec-anchored / spec-as-source. Teaching point: critique slide.

---

## Fact-check log

Adversarial fact-check run on 21 Sep 2026 by a second Claude subagent. Method: pick the claims most likely to appear on a slide (numbers, dates, quotes, attributions, prices, commands), open the primary source with WebFetch, and try to refute each one. WebSearch was unavailable (session budget exhausted), so everything below is from direct fetches of the URLs named. X/Twitter post IDs were decoded offline with the snowflake formula (timestamp_ms = (id >> 22) + 1288834974657).

Outcome key: CONFIRMED = the source says exactly this; CORRECTED = the file was wrong or misleading and has been edited; UPGRADED = was UNVERIFIED, now opened and confirmed; STILL UNVERIFIED = primary source unreachable.

### The 12 core on-screen claims

1. Karpathy "agentic engineering" post, 4 Feb 2026 (Section 0, 12, 13.14, Visuals) — STILL UNVERIFIED, WORDING TIGHTENED. Post ID 2019137879310836075 decodes to 2026-02-04 19:55:58 UTC (date CONFIRMED by arithmetic). The post itself could not be opened: x.com HTTP 402, xcancel.com HTTP 451, publish.x.com/oembed HTTP 402. Simon Willison's "What is agentic engineering?" page mentions Karpathy once, only as the coiner of "vibe coding" in Feb 2025, and presents "agentic engineering" as the term Willison himself uses [V]. File now says the attribution is unverified and offers safe slide wording.
2. Chroma "Context Rot", 14 Jul 2025, 18 models, authors Hong / Troynikov / Huber, HN 260 points / 59 comments (1.1) — CONFIRMED. Model list, six experiments, shuffled-beats-ordered finding, and Claude-abstains / GPT-hallucinates finding all on https://www.trychroma.com/research/context-rot. HN figures re-confirmed on the HN page and via hn.algolia.com search API (num_comments = 59; a recursive count of nested children gives 71, which is why HN's headline number differs from a tree count — quote 59).
3. Auto mode numbers 93% / 0.4% FPR / 17% FNR, Sonnet 4.6 classifier, 25 Mar 2026, John Hughes (5.4, 13.10, Visuals) — CONFIRMED on https://www.anthropic.com/engineering/claude-code-auto-mode. "Auto mode is the built-in starting permission mode on Pro/Max/Team" is NOT in that post; it is CONFIRMED on https://code.claude.com/docs/en/permission-modes and https://code.claude.com/docs/en/best-practices.
4. Multi-agent research system: +90.2%, ~4x, ~15x, 80% of variance, up to 90% faster, ~20 queries, 13 Jun 2025 (8.2, 13.6) — CONFIRMED on https://www.anthropic.com/engineering/multi-agent-research-system (authors Hadfield, Zhang, Lien, Scholz, Fox, Ford).
5. C compiler: 16 Opus 4.6 agents, nearly 2,000 sessions, just under $20,000, 100,000-line Rust compiler, Linux 6.9 on x86/ARM/RISC-V, two weeks, 5 Feb 2026, Nicholas Carlini (7.4, 12) — CONFIRMED on https://www.anthropic.com/engineering/building-c-compiler. Minor wording CORRECTED: the post says "99% pass rate on most compiler test suites including the GCC torture test suite", not specifically 99% on the torture suite.
6. Harness design costs: $9 / 20 min solo vs $200 / 6 h harness; DAW $124.70 in 3 h 50 min; 24 Mar 2026, Prithvi Rajasekaran; context anxiety; sprint contracts dropped on Opus 4.6 (7.3b, 13.12) — CONFIRMED on https://www.anthropic.com/engineering/harness-design-long-running-apps. Sub-costs made exact: planner $0.46 (4.7 min), build $113.85 (3 h 15 min), QA $10.39 (25.2 min).
7. Spec Kit: 138k stars, 12.4k forks, MIT, Python 3.11+, `uv tool install specify-cli`, `specify init my-project --integration copilot`, hyphenated `/speckit-*` commands incl. `/speckit-converge`, bug and assess extensions, v1.0.9 on 21 Sep 2026 (6.1, 12, 13.2) — CONFIRMED on https://github.com/github/spec-kit and /releases. Release cadence made precise: v1.0.3-v1.0.9 all between 1 and 21 Sep 2026.
8. AGENTS.md: 60k+ repos, 88 files in OpenAI's main repo, AAIF stewardship, founded 9 Dec 2025 with MCP / goose / AGENTS.md, eight Platinum members (4.2, 13.5) — CONFIRMED on https://agents.md/ and the Linux Foundation press release. Every tool the file names (Codex, Jules, Factory, Aider, VS Code, GitHub Copilot, JetBrains Junie, Cursor, Zed, Devin, Warp, goose) appears on agents.md. Codex `~/.codex/AGENTS.md`, `AGENTS.override.md`, 32 KiB `project_doc_max_bytes` CONFIRMED on https://learn.chatgpt.com/docs/agent-configuration/agents-md.
9. Ralph: "Ralph is a Bash loop." exact; 14 Jul 2025; files PROMPT.md / fix_plan.md / specs / AGENT.md; $50k-for-$297 (7.1, 13.8) — quote and date CONFIRMED on https://ghuntley.com/ralph/ ; CORRECTED two things: (a) the $50k / $297 claim is an iMessage screenshot shared with permission, from an unnamed person, and credits Amp (@ampcode) — it is not a Claude Code story and is a different anecdote from the linked repomirror "6 repos overnight" write-up; the "YC hackathon" framing is not on Huntley's page; (b) "CURSED over ~3 months" is not on the page (it only says a spec bug surfaced "a month in") — marked UNVERIFIED; HumanLayer's timeline (CONFIRMED on https://www.humanlayer.dev/blog/brief-history-of-ralph , 6 Jan 2026) has the Jul 2025 post and a Sep 2025 CURSED launch. Also added the exact original loop from the page: `while :; do cat PROMPT.md | claude-code ; done`. Official plugin commands, Stop-hook mechanism, when-to-use lists and "always set --max-iterations" CONFIRMED on the claude-plugins-official README.
10. Cost facts: ~$13 per developer per active day, $150-250 per month, below $30/day for 90% of users; agent teams ~7x; cache lifetime 1 h subscription / 5 min API; background spend under $0.04 per session (10.2, 13.13) — CONFIRMED on https://code.claude.com/docs/en/costs. `/usage` attribution breakdown, `/insights` HTML report, `--max-budget-usd`, "keep CLAUDE.md under 200 lines" also CONFIRMED there.
11. "Building multi-agent systems": 3-10x tokens, three cases, decompose by context not job title, verification subagent, 23 Jan 2026, Cara Phillips (8.3, 8.7, 13.6) — CONFIRMED on https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them (contributors Paul Chen, Andy Schumeister, Brad Abrams, Theo Chu).
12. Cursor "Scaling long-running autonomous coding": 14 Jan 2026, Wilson Lin, 1M+ lines / 1,000 files in about a week, +266K/-193K over 3+ weeks, 25x video render, 20 agents to the throughput of 2-3, integrator role removed (7.5, 12) — CONFIRMED on https://cursor.com/blog/scaling-agents.

### Additional checks (Claude Code docs, all fetched 21 Sep 2026)

- Model aliases (10.1) — CORRECTED. `default` is plan-dependent: Opus 5 on Max / Team Premium / Enterprise / API, Sonnet 5 on Pro / Team Standard. The `haiku` alias row names no version, so "Haiku 4.5" is now marked UNVERIFIED. Sonnet 5 always runs with 1M on the Anthropic API; `[1m]` is only needed for Opus 4.6 / Sonnet 4.6. Effort levels low/medium/high/xhigh/max, default high (Opus 4.7 defaults to xhigh), `ultracode` = xhigh + workflows: CONFIRMED on https://code.claude.com/docs/en/model-config.
- Permission modes (3, 5.4): mode identifiers, Shift+Tab cycle `default -> acceptEdits -> plan`, `⏸ plan mode on`, `/plan` prefix, `claude --permission-mode plan`, `defaultMode: "plan"` in `.claude/settings.json`, auto as the built-in starting mode on Pro/Max/Team, `bypassPermissions` for isolated containers and VMs only — CONFIRMED. `Ctrl+G` opens the plan in your editor — CONFIRMED on best-practices.
- Checkpointing (5.1, 13.9): 100 most recent checkpoints per session, snapshots swept about 30 days after the session last saved one (`cleanupPeriodDays`), Esc Esc / `/rewind`, five menu options, not tracked: Bash `rm`/`mv`/`cp`, most subagent edits, external edits, symlinked / hard-linked files — CONFIRMED on https://code.claude.com/docs/en/checkpointing.
- Memory / AGENTS.md (4.1, 4.2, 13.4): native AGENTS.md reading requires v2.1.277+, only when no CLAUDE.md / .claude/CLAUDE.md / CLAUDE.local.md exists unless Project instructions = `claude-md-and-agents-md`; unavailable on Bedrock or with telemetry disabled; auto memory loads the first 200 lines or 25KB of MEMORY.md; target under 200 lines per CLAUDE.md — CONFIRMED on https://code.claude.com/docs/en/memory.
- Best practices (0, 1.3, 2.1, 3): "most best practices are based on one constraint" opening; "Give Claude a way to verify its work" is the first main section; Stop hook overridden after 8 consecutive blocks; `/goal`, `/btw`, `/context`, `/doctor`, `/init`; "after two failed corrections, /clear"; five named failure patterns; `/batch` = 5 to 30 worktree subagents each opening a PR — CONFIRMED. The words "think hard" / "ultrathink" do not appear on the page — CONFIRMED (myth 13.1 stands).
- `/goal` (7.2): evaluator is the small fast model, Haiku by default on the Claude API; cannot run tools; condition up to 4,000 characters; "or stop after 20 turns" example; `/goal clear`; `claude -p "/goal ..."`; comparison table with `/loop` and Stop hook — CONFIRMED on https://code.claude.com/docs/en/goal.
- Dynamic workflows (8.5, 13.7): 16 concurrent agents by default, 1,000 agents per run, 4,096 items per `pipeline()`/`parallel()`, "Large workflow" warning above 25 agents or 1.5M projected tokens, size guideline small <5 / medium <10 / large <50, triggers (`ultracode` keyword, "use a workflow", `/effort ultracode`), bundled `/deep-research`, save to `.claude/workflows/` — CONFIRMED on https://code.claude.com/docs/en/workflows.
- Sub-agents (4.4): frontmatter fields, model values incl. `fable` and `inherit`, built-ins Explore / Plan / general-purpose, nesting up to three layers below the main conversation, 20 concurrent limit, `CLAUDE_CODE_SUBAGENT_MODEL` — CONFIRMED on https://code.claude.com/docs/en/sub-agents.
- Agent teams (8.5, 13.13): experimental, disabled by default, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, start with 3-5 teammates and 5-6 tasks each, no nested teams, no resume of in-process teammates, one owner per file, ~7x tokens in plan mode (costs page); "teammates are not isolated in worktrees" stated on https://code.claude.com/docs/en/agents — CONFIRMED.
- Worktrees (5.3): `--worktree`/`-w`, `.claude/worktrees/<name>/`, branch `worktree-<name>`, `worktree.baseRef` `"fresh"` (default) / `"head"`, `claude --worktree "#1234"`, `.worktreeinclude`, `isolation: worktree`, clean worktrees removed automatically on exit, main-checkout isolation checks — CONFIRMED on https://code.claude.com/docs/en/worktrees.
- Cloud (8.6): `claude --cloud "..."`, `--remote` deprecated alias, `claude --teleport` / `/teleport`, `claude -p "msg" --cloud <session-id>`, `/autofix-pr`, research preview for Pro/Max/Team and Enterprise premium seats, no separate compute charge, GitHub required for clone and PR — CONFIRMED on https://code.claude.com/docs/en/claude-code-on-the-web. The plan-then-cloud example command was made exact.
- Agent Skills spec (4.3): `name` max 64 chars lowercase/hyphen matching the folder, `description` max 1024, optional `license` / `compatibility` / `metadata` / `allowed-tools` (experimental), metadata ~100 tokens, body under 5,000 tokens recommended, keep SKILL.md under 500 lines, `skills-ref validate ./my-skill` — CONFIRMED on https://agentskills.io/specification. Anthropic post 16 Oct 2025 by Zhang / Lazuka / Murag — CONFIRMED. "Open standard on 18 Dec 2025" — CORRECTED to "Dec 2025; repo created 16 Dec 2025; 18 Dec UNVERIFIED".
- Other dates/authors CONFIRMED on their pages: Anthropic "Effective context engineering" 29 Sep 2025 (Rajasekaran, Dixon, Ryan, Hadfield); "Effective harnesses" 26 Nov 2025 (Justin Young; 200+ features; JSON; Puppeteer MCP); "Building effective agents" 19 Dec 2024 (Erik Schluntz, Barry Zhang); "Writing tools for agents" 11 Sep 2025 (Ken Aizawa; 25,000-token cap; `asana_projects_search`; `user_id`); "Demystifying evals" 9 Jan 2026 (Grace, Hadfield, Olivares, De Jonghe; 20-50 tasks; pass@k vs pass^k; Harbor, Braintrust, LangSmith, Langfuse, Arize Phoenix); "Managed Agents" 8 Apr 2026 (Martin, Cemaj, Cohen; p50 TTFT down roughly 60%, p95 down over 90%); Cognition "Don't Build Multi-Agents" 12 Jun 2025 (Walden Yan); Kent Beck "Augmented coding" 25 Jun 2025; Böckeler SDD 15 Oct 2025 (Tessl; sledgehammer / nut; "a LOT of markdown"); HumanLayer ACE-FCA 40-60%, 300k LOC BAML, 35k LOC in 7 h, two-week race condition; 12-factor agents 26.3k stars and all 13 factor titles; BMAD 53.3k stars, `npx skills add bmad-code-org/BMAD-METHOD`, four-phase loop, skill names on docs.bmad-method.org, no personas in the README; Simon Willison guide launch 23 Feb 2026 and its 16-chapter index (list CORRECTED to match).
- Kiro (5.1, 6.2) — UPGRADED from UNVERIFIED: GA 17 Nov 2025 with Kiro CLI, team plans, property-based testing, checkpointing; pricing Free 50 credits / Pro $20 / Pro+ $40 / Pro Max $100 / Power $200 per user per month.
- The Register 27 Jan 2026 (7.1, Visuals) — UPGRADED: opened; headline and author (Simon Sharwood) recorded.
- X post dates for the visual candidates (snowflake decode): simonw 2025990408514523517 = 23 Feb 2026 17:45 UTC (matches the guide launch date); AnthropicAI 2036481033621623056 = 24 Mar 2026 16:31 UTC (matches the harness post); martinfowler 1978453531565695415 = 15 Oct 2025 13:30 UTC (matches the Böckeler article). None of the X posts themselves could be opened (HTTP 402).

### Still UNVERIFIED after this pass (do not put on a slide without a human opening the source)

- Karpathy post text and the claim that he "proposed agentic engineering" (x.com 402 / mirror 451 / oEmbed 402).
- OpenAI "Harness engineering" (openai.com 403): the ~1M-line / ~5-month / ~100-line-AGENTS.md figures.
- `haiku` alias = Haiku 4.5 (docs name no version).
- Agent Skills open-standard launch date "18 Dec 2025" (repo created 16 Dec 2025; announcement date not found on agentskills.io).
- Ralph anecdotes: the "YC hackathon" framing of the repomirror story; CURSED total build time.
- Anthropic "2026 Agentic Coding Trends Report" PDF content (not opened).
- Section 1.4 publication date "29 Aug 2025" for ACE-FCA (page content confirmed; exact date not shown on the fetched page).
- Kiro EARS-style requirement phrasing (not on the fetched specs page).
