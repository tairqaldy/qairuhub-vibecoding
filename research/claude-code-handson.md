# Claude Code hands-on: current guide + 6 labs (research file)

Research date: 21 Sep 2026. Latest Claude Code releases seen in docs: v2.1.263 -> v2.1.269 (week of 7-11 Sep 2026) - https://code.claude.com/docs/en/whats-new/2026-w37
Primary source: official docs at https://code.claude.com/docs (index: https://code.claude.com/docs/llms.txt, ~197 pages, also in Russian: https://code.claude.com/docs/_llms/ru.md).

Legend
- VERIFIED = I opened the source page on 21 Sep 2026 and read the raw text.
- VERIFIED-S = I opened the page but only saw a machine summary of it (tables may be slightly compressed). Re-check the exact wording before putting it on a slide.
- UNVERIFIED = not opened / third-party only / from memory.

Note for the site builder: the docs have a Russian index (useful for the KZ audience), no Kazakh one.

---

## 0. The teaching spine (use this instead of a feature list)

Everything in Claude Code hangs off 5 ideas. Each lab below trains exactly one or two of them.

| # | Mental model | One-line version | Doc |
|---|---|---|---|
| 1 | The loop | You describe -> Claude gathers context -> acts with tools -> verifies -> repeats; you can interrupt any time | https://code.claude.com/docs/en/how-claude-code-works |
| 2 | Context is the scarce resource | Everything (chat, files read, command output, CLAUDE.md) shares one window; quality drops as it fills | https://code.claude.com/docs/en/best-practices |
| 3 | Permission = how much you trust it right now | Modes (Manual / accept edits / plan / auto) + allow/ask/deny rules + sandbox | https://code.claude.com/docs/en/permission-modes |
| 4 | Everything is reversible (almost) | Esc, Esc Esc / `/rewind`, git. Bash side effects and remote systems are NOT reversible | https://code.claude.com/docs/en/checkpointing |
| 5 | Teach it once, not every time | CLAUDE.md (always loaded) -> skills (on demand) -> hooks (deterministic) -> subagents (separate context) -> MCP (external tools) | https://code.claude.com/docs/en/features-overview |

Docs' own framing of the core constraint (paraphrase): most best practices derive from one fact - the context window fills fast and performance degrades as it fills. VERIFIED - https://code.claude.com/docs/en/best-practices

---

## 1. What Claude Code is, and the surfaces

Definition (paraphrase of the docs overview): an agentic coding tool that reads your codebase, edits files, runs commands and integrates with dev tools; available in terminal, IDE, desktop app and browser. VERIFIED - https://code.claude.com/docs/en/overview

Claude Code is the "agentic harness" around the Claude model: it supplies tools, context management and the execution environment. VERIFIED - https://code.claude.com/docs/en/how-claude-code-works

All surfaces run the same engine; CLAUDE.md, settings and MCP servers are shared across the local surfaces. VERIFIED - https://code.claude.com/docs/en/platforms

| Surface | How to get it | Best for | Notes | Doc |
|---|---|---|---|---|
| Terminal CLI | native installer (section 3), run `claude` | Full feature set, scripting, Agent SDK | Only surface with scripting (`claude -p`); supports third-party providers | https://code.claude.com/docs/en/quickstart |
| Desktop app | download macOS / Windows x64 / Windows ARM64; Linux (Ubuntu/Debian) in beta via apt; open the **Code** tab | Visual diff review, parallel sessions side by side, scheduled tasks, starting cloud sessions | Includes Claude Code - no separate CLI install. Paid subscription required | https://code.claude.com/docs/en/desktop-quickstart |
| Web | https://claude.ai/code | Long-running tasks in Anthropic-managed cloud VMs; keeps running after you disconnect; repos you do not have locally | Pull a cloud session into terminal with `claude --teleport` (needs claude.ai subscription) | https://code.claude.com/docs/en/claude-code-on-the-web |
| VS Code (and Cursor) | Extensions view -> search "Claude Code" (`Ctrl+Shift+X`), then Command Palette (`Ctrl+Shift+P`) -> "Claude Code" -> Open in New Tab | Inline diffs, @-mentions, plan review inside the editor | The extension bundles a private CLI copy and does NOT put `claude` on PATH | https://code.claude.com/docs/en/vs-code |
| JetBrains | Marketplace plugin "Claude Code" | IntelliJ / PyCharm / WebStorm diff viewer, selection sharing | Requires the CLI installed separately | https://code.claude.com/docs/en/jetbrains |
| Mobile (iOS / Android Claude app) | Claude app | Start and monitor cloud sessions; drive a local session via Remote Control; Dispatch a task to Desktop (Pro/Max) | Thin client, not a local runtime | https://code.claude.com/docs/en/mobile |
| Other | Slack `@Claude`, Chrome, GitHub Actions, GitLab CI/CD, Remote Control (`claude remote-control`), Channels (Telegram/Discord/webhooks into a session) | Team chat -> PR, browser testing, CI | Channels + Telegram is a nice local-audience demo idea | https://code.claude.com/docs/en/platforms |

All rows VERIFIED against https://code.claude.com/docs/en/overview and https://code.claude.com/docs/en/platforms.

Three execution environments: Local (your machine, default), Cloud (Anthropic VMs or self-hosted), Remote Control (your machine, driven from a browser/phone). VERIFIED - https://code.claude.com/docs/en/how-claude-code-works

---

## 2. Plans, pricing, and what a student in Kazakhstan can actually use

Availability: Kazakhstan is on Anthropic's supported-countries list for both the API and Claude.ai (Kyrgyzstan and Uzbekistan too; Russia is not). The page ("Supported countries & regions") has two lists, API and Claude.ai, with identical contents. VERIFIED (fact-check 21 Sep 2026) - https://www.anthropic.com/supported-countries . If someone sees `App unavailable in region` it is a country/VPN issue. VERIFIED - https://code.claude.com/docs/en/troubleshoot-install

Account requirement: Claude Code needs a Pro, Max, Team, Enterprise or Console (API) account; the free claude.ai plan does not include Claude Code. VERIFIED - https://code.claude.com/docs/en/setup

| Plan | Price (claude.com/pricing, read 21 Sep 2026) | Claude Code? | Default model in Claude Code |
|---|---|---|---|
| Free | $0 | No | - |
| Pro | $20/month, or $17/month billed annually ("$200 billed up front") | Yes | Sonnet 5 |
| Max | "From $100 Per month"; "Choose 5x or 20x more usage than Pro" (the 20x tier's price is not printed on the page - historically $200, UNVERIFIED) | Yes | Opus 5 |
| Team | Standard seat $25/mo ($20 annual); Premium seat $125/mo ($100 annual) | Yes | Sonnet 5 (Standard) / Opus 5 (Premium) |
| Enterprise | "US$20/seat/month, billed annually" + usage at API rates | Yes | Opus 5 |
| Console (API, pay per token) | Fable 5.1 $10 in / $50 out per MTok; Opus 5 $5/$25; Sonnet 5 $2/$10; Haiku 4.5 $1/$5 | Yes | Opus 5 |

Prices VERIFIED (fact-check 21 Sep 2026; every figure in the table matches the page text, API rows included) - https://claude.com/pricing . Default models VERIFIED (fact-check) - https://code.claude.com/docs/en/model-config : "Pro and Team Standard: defaults to Sonnet 5"; "Max, Team Premium, Enterprise, and Anthropic API: defaults to Opus 5"; Microsoft Foundry defaults to Sonnet 4.5.

How subscription usage works: Team/Enterprise seats (and, by the same error messages, Pro/Max) draw from an allowance that resets on a rolling five-hour window plus a weekly window, shared with Claude chat and Cowork. When you hit it you see "You've hit your session limit" / "weekly limit"; `/usage-credits` lets you buy past it. VERIFIED - https://code.claude.com/docs/en/costs

What API usage really costs: across enterprise deployments the average is about $13 per developer per active day, $150-250 per developer per month, under $30/day for 90% of users. VERIFIED - https://code.claude.com/docs/en/costs . Takeaway for students: a $20 Pro plan is far cheaper than API billing for daily use; API credits are fine for a one-evening workshop.

Student routes
- There is no individual student price on the pricing page; it lists an institution-level Education plan. VERIFIED-S - https://claude.com/pricing , https://claude.com/solutions/education
- `/passes` command. Exact table row: "Share a free week of Claude Code with friends. Only visible if your account is eligible". Useful for a workshop: eligible organisers/mentors can seed passes. VERIFIED (fact-check 21 Sep 2026) - https://code.claude.com/docs/en/commands . Which plans are eligible and how many passes you get is NOT stated on the page - UNVERIFIED; check in-product before promising it.
- Campus Ambassadors, Claude Builder Clubs (Pro access + API credits), and ~$50 student API-credit applications are reported by third-party guides only. UNVERIFIED - e.g. https://felloai.com/claude-student-discount/ . Whether these accept Kazakhstan universities: UNVERIFIED.
- Workshop fallback when someone has no paid plan: pair them with a neighbour, or have the organiser create Console API keys with a workspace spend limit (https://code.claude.com/docs/en/costs#claude-console). Docs warn that live training sessions with large groups may need higher TPM limits on an API org. VERIFIED - https://code.claude.com/docs/en/costs
- Local payment-card acceptance from Kazakhstan: UNVERIFIED (not researched).

---

## 3. Installation (exact commands)

System requirements: macOS 13+, Windows 10 1809+ / Server 2019+, Ubuntu 20.04+, Debian 10+, Alpine 3.19+; 4 GB+ RAM; x64 or ARM64; internet; shell = Bash, Zsh, PowerShell or CMD. VERIFIED - https://code.claude.com/docs/en/setup

Recommended: native installer (auto-updates in background).

```bash
# macOS, Linux, WSL
curl -fsSL https://claude.ai/install.sh | bash
```
```powershell
# Windows PowerShell (no admin needed)
irm https://claude.ai/install.ps1 | iex
```
```batch
:: Windows CMD
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```
VERIFIED - https://code.claude.com/docs/en/setup

Alternatives (none auto-update by default):
- Homebrew: `brew install --cask claude-code` (stable channel, ~1 week behind) or `claude-code@latest`; upgrade with `brew upgrade claude-code`.
- WinGet: `winget install Anthropic.ClaudeCode`; upgrade `winget upgrade Anthropic.ClaudeCode`.
- Linux: signed apt / dnf / apk repos - https://code.claude.com/docs/en/setup#install-with-linux-package-managers
- npm: `npm install -g @anthropic-ai/claude-code` - still works but is under "advanced options"; needs Node.js 22+ since v2.1.198; it just downloads the same native binary; never `sudo npm install -g`. Upgrade with `npm install -g @anthropic-ai/claude-code@latest`.
All VERIFIED - https://code.claude.com/docs/en/setup

Windows specifics (most of the room will be on Windows)
- Two options: native Windows (no requirements; sandboxing not supported) or WSL 2 (sandboxing supported). WSL is NOT required.
- Git for Windows is optional but recommended: with it Claude uses Git Bash for its Bash tool; without it Claude falls back to a PowerShell tool. Labs 2 and 6 need git anyway, so install it: https://git-scm.com/downloads/win
- If Claude cannot find Git Bash: in settings.json set `"env": {"CLAUDE_CODE_GIT_BASH_PATH": "C:\\Program Files\\Git\\bin\\bash.exe"}`.
- Prompt shows `PS C:\` = PowerShell; `C:\` without PS = CMD. `The token '&&' is not a valid statement separator` = you pasted the CMD command into PowerShell. `'irm' is not recognized` = you pasted the PowerShell command into CMD.
- Binary lands at `%USERPROFILE%\.local\bin\claude.exe` (macOS/Linux: `~/.local/bin/claude`, a symlink into `~/.local/share/claude/versions/`).
VERIFIED - https://code.claude.com/docs/en/setup

Verify
```bash
claude --version     # prints e.g. "2.1.269 (Claude Code)"
claude doctor        # read-only install + settings diagnostics
```
VERIFIED - https://code.claude.com/docs/en/setup

Fix "command not found: claude" / "'claude' is not recognized" (install dir not on PATH) - VERIFIED - https://code.claude.com/docs/en/troubleshoot-install
```bash
# macOS zsh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc   # then open a new terminal
# Linux bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
```
```powershell
# Windows PowerShell, then open a new terminal
$currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
[Environment]::SetEnvironmentVariable('PATH', "$currentPath;$env:USERPROFILE\.local\bin", 'User')
```

Other install errors worth a slide (same doc): `syntax error near unexpected token '<'` or curl 403 = install script returned HTML (network/region block); `running scripts is disabled on this system` = PowerShell execution policy (npm shims); `Claude Code does not support 32-bit Windows` = you opened "PowerShell (x86)"; `TLS connect error` = update CA certificates / corporate proxy.

Update / channels / uninstall
- `claude update` applies an update now. Release channel: `/config` -> Auto-update channel, or `"autoUpdatesChannel": "stable"` in settings.json (`latest` is default).
- Uninstall native: macOS/Linux `rm -f ~/.local/bin/claude; rm -rf ~/.local/share/claude`; Windows `Remove-Item "$env:USERPROFILE\.local\bin\claude.exe" -Force; Remove-Item "$env:USERPROFILE\.local\share\claude" -Recurse -Force`. Config lives in `~/.claude/` and `~/.claude.json`.
VERIFIED - https://code.claude.com/docs/en/setup

---

## 4. First run and login

```bash
cd path/to/your/project
claude
```
First launch opens a browser login. Account types: Claude Pro/Max/Team/Enterprise (recommended), Claude Console (API credits; a "Claude Code" workspace is auto-created for cost tracking), or Bedrock / Google Cloud / Microsoft Foundry. Credentials are stored, no re-login needed. Switch accounts with `/login`; sign out with `/logout`. If `ANTHROPIC_API_KEY` is set in the environment, Claude Code skips the browser login and asks you to approve the key instead - a classic way to get billed per token by accident. VERIFIED - https://code.claude.com/docs/en/quickstart

The first time you run Claude in a folder you get a workspace-trust dialog (needed later for `--worktree`). VERIFIED - https://code.claude.com/docs/en/worktrees

The header shows version, current model and working directory; `/help` lists commands, `/resume` continues an earlier conversation. VERIFIED - https://code.claude.com/docs/en/quickstart

Good first prompts (from the quickstart): `what does this project do?`, `explain the folder structure`, `where is the main entry point?`, `what can Claude Code do?`. Claude reads files on demand - you do not add context manually.

---

## 5. The core loop

1. You type a task in plain language.
2. Gather context: Claude searches/reads files, git state, CLAUDE.md.
3. Take action: edits files, runs shell commands (asking or not, per permission mode).
4. Verify: runs tests/build, reads the output, iterates.
5. You steer: `Esc` stops it mid-action (work so far is kept); typing a message and pressing Enter while it works queues a correction it reads after the current action.
VERIFIED - https://code.claude.com/docs/en/how-claude-code-works

Built-in tool categories: file operations, search, execution (shell, git, tests), web (search + fetch), code intelligence (via plugins). VERIFIED - same page.

Recommended workflow for anything non-trivial: Explore -> Plan -> Implement -> Commit, with plan mode for the first two. Skip the plan if you could describe the diff in one sentence. VERIFIED - https://code.claude.com/docs/en/best-practices

The single highest-leverage habit: give Claude a check it can run (tests, build, linter, screenshot comparison) so it closes the loop itself. Before/after example from the docs: instead of "implement a function that validates email addresses", give example cases and say "run the tests after implementing". VERIFIED - https://code.claude.com/docs/en/best-practices

---

## 6. Essential commands and shortcuts

### 6.1 Shell commands
| Command | Does |
|---|---|
| `claude` | interactive session in current dir |
| `claude "task"` | interactive, with an initial prompt |
| `claude -p "query"` | non-interactive: answer and exit |
| `claude -c` / `claude --continue` | continue most recent conversation in this dir |
| `claude -r` / `claude --resume` | pick an earlier conversation |
| `claude --permission-mode plan` (or `default`/`manual`, `acceptEdits`, `auto`) | choose starting mode |
| `claude --model opus` | choose model |
| `claude -w name` / `claude --worktree name` | start in an isolated git worktree |
| `claude update`, `claude doctor`, `claude --version` | maintenance |
| `claude mcp add|list|get|remove` | manage MCP servers |
| `claude agents` | agent view: dispatch/monitor background sessions (research preview) |
VERIFIED - https://code.claude.com/docs/en/quickstart , https://code.claude.com/docs/en/permission-modes , https://code.claude.com/docs/en/worktrees , https://code.claude.com/docs/en/agents

### 6.2 Slash commands a beginner needs (15 of ~90)
| Command | Does | Verified in |
|---|---|---|
| `/help` | list commands | quickstart |
| `/init` | generate a starter CLAUDE.md from the codebase | memory |
| `/memory` | open CLAUDE.md files, toggle auto memory | memory |
| `/context` | show what is filling the context window (and which memory files loaded) | memory, how-claude-code-works |
| `/clear` | new conversation, empty context (costs nothing) | costs |
| `/compact [instructions]` | summarise conversation to free space, e.g. `/compact Focus on the API changes` | best-practices |
| `/rewind` (or Esc Esc) | restore code and/or conversation, or summarise part of it | checkpointing |
| `/plan [description]` | plan mode for this prompt | permission-modes |
| `/permissions` | view/add allow, ask, deny rules | permissions |
| `/model`, `/effort` | switch model / reasoning effort | model-config |
| `/usage` (`/cost` is an alias - VERIFIED, commands page row "Alias for `/usage`"; `/stats` alias UNVERIFIED - not found on the commands page) | session tokens, plan usage bars, breakdown | costs, commands |
| `/resume`, `/rename <name>` | find/label sessions | best-practices |
| `/btw <question>` | side question that never enters history | best-practices |
| `/mcp`, `/hooks`, `/skills` | inspect MCP servers / hooks (read-only browser) / skills | mcp-quickstart, hooks-guide, skills |
| `/doctor`, `/config`, `/login` | checkup, settings UI, auth | commands |
Also worth knowing: `/diff`, `/branch`, `/tasks`, `/sandbox`, `/code-review`, `/security-review`, `/export`, `/insights`, `/passes`, `/terminal-setup`, `/statusline`, `/desktop`, `/teleport`, `/loop`, `/goal`, `/batch`. Full list VERIFIED-S - https://code.claude.com/docs/en/commands

### 6.3 Keyboard shortcuts (all VERIFIED - https://code.claude.com/docs/en/interactive-mode)
| Key | Does |
|---|---|
| `Esc` | interrupt Claude (keeps work so far); closes dialogs; on a permission prompt = No |
| `Esc` `Esc` | empty input: open rewind menu; with text: clear the draft (Up recalls it) |
| `Shift+Tab` | cycle permission modes (`Alt+M` on some Windows setups) |
| `Ctrl+C` | interrupt; if idle: first press clears input, second exits |
| `Ctrl+D` twice, or `/exit` | quit |
| `Ctrl+G` (or `Ctrl+X Ctrl+E`) | open prompt - or the proposed plan - in your text editor |
| `Ctrl+O` | transcript viewer (detailed tool calls) |
| `Ctrl+R` | reverse-search prompt history |
| `Ctrl+B` | send running bash command / agent to background (tmux: press twice) |
| `Ctrl+T` | show/hide Claude's to-do checklist |
| `Ctrl+S` | stash / restore the current prompt draft |
| `Ctrl+L` | redraw screen |
| `Ctrl+V` (`Alt+V` on Windows/WSL, `Cmd+V` in iTerm2) | paste an image from clipboard as `[Image #N]` |
| `Alt+P` / `Option+P` | switch model without losing the prompt |
| `Alt+T` / `Option+T` | toggle extended thinking (no effect on Fable models) |
| `Alt+O` / `Option+O` | toggle fast mode |
| `\` + `Enter`, `Shift+Enter`, or `Ctrl+J` | newline in the prompt |
| `/` at start | commands and skills |
| `!` at start | shell mode: run a command yourself, output goes into the conversation |
| `@` | file-path autocomplete / mention |
| `?` on empty input | shortcut help panel |
| Up/Down | prompt history; `Tab` accepts autocomplete (and opens a comment field on Yes/No permission answers) |
macOS: Alt-shortcuts need "Option as Meta" in the terminal - https://code.claude.com/docs/en/terminal-config

---

## 7. Permission modes and plan mode

### 7.1 The modes (VERIFIED - https://code.claude.com/docs/en/permission-modes)
| UI label | Config value | Runs without asking | Status bar |
|---|---|---|---|
| Manual | `default` (alias `manual`, v2.1.200+) | reads only | `manual mode on` |
| Accept edits | `acceptEdits` | reads, file edits, common fs commands (`mkdir`, `touch`, `mv`, `cp`, `rm`, `sed`) inside the working dir | `accept edits on` |
| Plan | `plan` | reads (+ classifier-approved exploration commands when auto mode is available); no source edits until you approve a plan | `plan mode on` |
| Auto | `auto` | everything, with a separate classifier model reviewing actions | `auto mode on` |
| Don't ask | `dontAsk` | only pre-approved tools; everything else denied (CI) | `don't ask on` |
| Bypass permissions | `bypassPermissions` | everything; containers/VMs only | `bypass permissions on` |

Big 2026 change: on Pro, Max and Team plans the built-in starting mode for interactive terminal and VS Code sessions is now **auto** (needs v2.1.228+ on macOS/Linux/WSL, v2.1.233+ on native Windows). Enterprise plans, Console API keys, Bedrock/Vertex/Foundry, and every `claude -p` run start in Manual. The very first session after install may also start in Manual. VERIFIED - https://code.claude.com/docs/en/permission-modes#which-mode-a-session-starts-in

Switching: `Shift+Tab`. From auto the first press goes to Manual, then the cycle is Manual -> accept edits -> plan -> Manual (auto and bypass slot in after plan when available; `dontAsk` is never in the cycle). Or start with `claude --permission-mode <mode>`, or set `permissions.defaultMode` in `~/.claude/settings.json`. Gotcha: `"auto"` and `"bypassPermissions"` are ignored when set in the project's `.claude/settings.json` / `.claude/settings.local.json` - a cloned repo cannot silently put you in auto mode. VERIFIED - same page.

Teaching recommendation: run Labs 1-4 in Manual mode (`claude --permission-mode manual`) so students actually see what the agent wants to do; introduce auto mode afterwards as a convenience they now understand.

### 7.2 Auto mode in one paragraph
A second model (classifier) reviews actions before they run and blocks things that escalate beyond your request, touch unrecognised infrastructure, or look driven by hostile content Claude read. Blocked by default: download-and-execute like `curl | bash`, sending sensitive data out, production deploys/migrations, mass cloud deletion, IAM/repo permission grants, modifying shared infra, irreversibly destroying pre-existing files, force push, `git reset --hard`-style discards of uncommitted work, plus a long list added in v2.1.195-v2.1.200 (secret managers, unapproved PR merges, disabling security tests...). If you say "don't push" in chat, the classifier treats that as a boundary until you lift it. The docs explicitly warn it reduces prompts but does not guarantee safety. Works on all plans; needs Opus 4.6+/Sonnet 4.6+/Fable on the Anthropic API. VERIFIED - https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode

Why it exists: Anthropic wrote "Claude Code users approve 93% of permission prompts" and that this leads "to approval fatigue, where people stop paying close attention". Full classifier pipeline (Stage 1 -> Stage 2): 0.4% false-positive rate on real traffic, 17% false-negative rate on real overeager actions; Stage 1 alone: 8.5% FPR / 6.6% FNR. Post "Published Mar 25, 2026", "Written by John Hughes". VERIFIED (fact-check 21 Sep 2026, exact strings) - https://www.anthropic.com/engineering/claude-code-auto-mode

Sandboxing (`/sandbox`): OS-level filesystem + network isolation for the Bash tool (Linux bubblewrap, macOS seatbelt); exact quote: "sandboxing safely reduces permission prompts by 84%" (Anthropic's internal usage; post title "Beyond permission prompts: making Claude Code more secure and autonomous", "Published Oct 20, 2025"). Not supported on native Windows - only macOS, Linux, WSL2. VERIFIED (fact-check 21 Sep 2026) - https://www.anthropic.com/engineering/claude-code-sandboxing ; Windows row VERIFIED - https://code.claude.com/docs/en/setup

### 7.3 Plan mode
- Enter: `Shift+Tab` until the bar shows plan mode, or prefix one prompt with `/plan`, or `claude --permission-mode plan`. Leave without approving: `Shift+Tab`.
- Claude reads, runs exploration commands, writes a plan; edits are blocked.
- Approval choices: "Yes, and use auto mode" (or "Yes, auto-accept edits" where auto is unavailable) / "Yes, manually approve edits" / "No, keep planning".
- `Ctrl+G` opens the plan in your editor so you can rewrite it before approving.
- Project default: `{"permissions": {"defaultMode": "plan"}}` in `.claude/settings.json`.
VERIFIED - https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode

### 7.4 Never-auto-approved, in any mode
Explicit `ask` rules; `rm`/`rmdir` on critical paths such as `rm -rf /` or `rm -rf ~`; tools that need user interaction. Deny rules win in every mode, including bypass. VERIFIED - same page.

---

## 8. CLAUDE.md and memory

Two systems, both loaded at session start, both "context, not enforced configuration" (to truly block something use a hook or a deny rule). VERIFIED - https://code.claude.com/docs/en/memory

| | CLAUDE.md | Auto memory |
|---|---|---|
| Written by | you | Claude |
| Holds | instructions, rules, commands | learnings: your preferences, corrections, project facts not derivable from code |
| Location | see below | `~/.claude/projects/<project>/memory/` (`MEMORY.md` index + topic files) |
| Loaded | whole file, every session | first 200 lines or 25 KB of `MEMORY.md`; topic files on demand |

CLAUDE.md locations, broad -> specific (VERIFIED - https://code.claude.com/docs/en/memory):
- Managed policy: macOS `/Library/Application Support/ClaudeCode/CLAUDE.md`, Linux/WSL `/etc/claude-code/CLAUDE.md`, Windows `C:\Program Files\ClaudeCode\CLAUDE.md`
- User: `~/.claude/CLAUDE.md` (all your projects)
- Project: `./CLAUDE.md` or `./.claude/CLAUDE.md` (commit it)
- Local: `./CLAUDE.local.md` (personal; add to `.gitignore`)
- Subdirectory CLAUDE.md files load on demand when Claude reads files there.
- `.claude/rules/*.md` with `paths:` frontmatter = rules that load only for matching files.
- Imports: `@path/to/file` inside CLAUDE.md (max depth 4; imported files still cost context).
- AGENTS.md: since v2.1.277 Claude Code reads a repo's `AGENTS.md` by itself when there is no CLAUDE.md; if both exist it reads CLAUDE.md only (import AGENTS.md with `@AGENTS.md` to share one file with Codex/Cursor/etc.).

Workflow: `/init` generates a starter file; `/memory` opens/edits files and toggles auto memory; `/context` confirms which memory files loaded; say "add this to CLAUDE.md" to have Claude write a rule; say "remember that ..." and it goes to auto memory. VERIFIED - same page.

Writing rules that get followed (VERIFIED - memory + best-practices):
- Target under 200 lines per file. Bloat makes Claude ignore rules.
- Concrete and checkable: "Use 2-space indentation", "Run `npm test` before committing", "API handlers live in `src/api/handlers/`".
- Include: commands Claude cannot guess, style rules that differ from defaults, test instructions, repo etiquette, env quirks, gotchas. Exclude: anything readable from code, standard conventions, long tutorials, file-by-file descriptions, things that change often.
- Test for each line: would removing it cause mistakes? If not, cut it.
- Add to CLAUDE.md when Claude makes the same mistake twice.
- Project-root CLAUDE.md survives `/compact` (re-read from disk); instructions given only in chat do not.
- Disable auto memory: `/memory` toggle, `"autoMemoryEnabled": false`, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.

---

## 9. Checkpoints and rewind

VERIFIED - https://code.claude.com/docs/en/checkpointing
- Every prompt that starts a turn creates a checkpoint; file snapshots kept for the 100 most recent checkpoints per session; snapshots are deleted after about 30 days (`cleanupPeriodDays`). Checkpoints persist across `--resume`.
- Open the menu: `/rewind`, or `Esc` `Esc` with an empty input.
- Actions: Restore code and conversation / Restore conversation / Restore code / Summarize from here / Summarize up to here / Never mind.
- After `/clear`, the rewind menu offers a `/resume <session-id> (previous session)` entry (v2.1.191+).
- NOT tracked: files changed by Bash commands (`rm`, `mv`, `cp`...), edits by most subagents, manual edits outside Claude, symlinked/hard-linked files, remote side effects (DB, deploys, pushes).
- Not a replacement for git: commit before risky work. To explore an alternative without losing the original session use `/branch` or `claude --continue --fork-session`.

---

## 10. Context management

VERIFIED - https://code.claude.com/docs/en/how-claude-code-works , https://code.claude.com/docs/en/best-practices , https://code.claude.com/docs/en/costs
- Window holds: conversation, file contents read, command output, CLAUDE.md, auto memory, loaded skills, system instructions. Fable 5.1, Fable 5, Sonnet 5, Opus 4.6 and later, and Sonnet 4.6 support a 1M-token window; models running a native 1M window auto-compact "at about 967K tokens by default" (VERIFIED, fact-check 21 Sep 2026 - https://code.claude.com/docs/en/model-config) - bigger, but the "degrades as it fills" rule still applies and long context burns plan usage faster.
- `/context` = see what is using space. `/usage` = tokens / plan bars.
- Auto-compaction: near the limit Claude Code first clears older tool outputs, then summarises. Early detailed instructions may be lost -> put durable rules in CLAUDE.md. Tune with `/autocompact`.
- `/clear` between unrelated tasks (free). `/rename` first so `/resume` can find the old session.
- `/compact <what to keep>`; or add a "Compact instructions" section to CLAUDE.md. Compacting a huge context is itself a big request; in a fresh session it prints `Not enough messages to compact.`
- Partial compaction: rewind menu -> Summarize from here / up to here.
- `/btw` for throwaway questions. Subagents for research that would flood the main context. Skills instead of long CLAUDE.md sections.
- Rule of thumb from the docs: corrected Claude twice on the same thing? `/clear` and write a better prompt.
- Why usage climbs in an all-day session: full history is re-sent on every request; prompt cache lifetime is 1 hour on a subscription, dropping to 5 minutes once you are drawing on usage credits (5 minutes by default on an API key or cloud provider), so the first message after a long break re-processes everything.

---

## 11. Skills

VERIFIED-S - https://code.claude.com/docs/en/skills ; examples VERIFIED - https://code.claude.com/docs/en/best-practices
- A skill = a folder with `SKILL.md` (YAML frontmatter + markdown instructions), optionally with reference files and scripts. Only the description sits in context; the body loads when used. Follows the open Agent Skills standard (https://agentskills.io).
- Paths: personal `~/.claude/skills/<name>/SKILL.md`; project `.claude/skills/<name>/SKILL.md`; plugin `<plugin>/skills/<name>/SKILL.md`.
- Invoke: `/skill-name args`, or Claude loads it automatically when the description matches.
- Custom slash commands are merged into skills: `.claude/commands/deploy.md` and `.claude/skills/deploy/SKILL.md` both create `/deploy`.
- Key frontmatter: `name`, `description`, `disable-model-invocation: true` (manual only - use for side-effect workflows), `allowed-tools`, `context: fork` + `agent` (run in a subagent), `model`, `argument-hint`, `user-invocable: false`, `paths`.
- Arguments: `$ARGUMENTS` (all), `$0`/`$1` (positional). Dynamic context: a line with `!` followed by a backticked shell command is executed and its output injected.
- `/skills` lists what is loaded. Bundled skills include `/code-review`, `/batch`, `/loop`, `/doctor`, `/debug`, `/run`, `/verify`.

Minimal example (own wording, same shape as the docs):
```markdown
---
name: explain-diff
description: Explain my uncommitted changes in plain language and flag risks
disable-model-invocation: true
---
## Current changes
!`git diff HEAD`

## Instructions
Explain these changes to a beginner in 3 bullets, then list risks
(missing error handling, hardcoded values, secrets).
```

---

## 12. Subagents

VERIFIED-S - https://code.claude.com/docs/en/sub-agents ; example VERIFIED - https://code.claude.com/docs/en/best-practices
- A subagent is a helper Claude with its own context window, system prompt, tool list and permissions. It does the noisy work (searching, reading logs) and returns a summary - context isolation is the point.
- Built-in: Explore (read-only search), Plan (research during plan mode), general-purpose (all tools), plus small helpers.
- Define: markdown file in `.claude/agents/<name>.md` (project) or `~/.claude/agents/<name>.md` (user), or `--agents` JSON flag. Easiest: ask Claude to write one. Note: as of v2.1.198 `/agents` no longer opens a management panel; it just points to the file locations (VERIFIED - https://code.claude.com/docs/en/agents).
- Frontmatter: `name`, `description` (required); `tools`, `disallowedTools`, `model` (`sonnet`/`opus`/`haiku`/`fable`/`inherit`), `permissionMode`, `skills`, `memory`, `isolation: worktree`, `background`, `hooks`, `maxTurns`.
- Invoke: natural language ("use the security-reviewer agent on this diff"), `@`-mention to force it, or `claude --agent <name>` for a whole session.
- Foreground vs background; `/tasks` lists running work; `Ctrl+B` backgrounds; `Ctrl+X Ctrl+K` (twice) stops all background subagents.
- Subagent edits are usually NOT restored by `/rewind` - use git (VERIFIED - checkpointing).
- Cheap-model tip: `model: haiku` for simple subagents (VERIFIED - costs).

```markdown
---
name: security-reviewer
description: Reviews code for security vulnerabilities
tools: Read, Grep, Glob, Bash
model: opus
---
You are a senior security engineer. Look for injection, auth flaws,
secrets in code, insecure data handling. Give line references and fixes.
```

---

## 13. Hooks

VERIFIED - https://code.claude.com/docs/en/hooks-guide
- Hooks = your shell commands that Claude Code runs at lifecycle events. Deterministic: they always fire, unlike CLAUDE.md advice. Also prompt-based, agent-based and HTTP hook types.
- Configure in the `hooks` key of `~/.claude/settings.json` (all projects), `.claude/settings.json` (project, committable), `.claude/settings.local.json`, managed policy, plugin `hooks/hooks.json`, or skill/subagent frontmatter. `/hooks` is a read-only browser. Kill switch: `"disableAllHooks": true`.
- Events (main ones): `SessionStart`, `UserPromptSubmit`, `PreToolUse` (can block), `PermissionRequest`, `PostToolUse`, `PostToolUseFailure`, `Notification`, `SubagentStart`/`SubagentStop`, `Stop`, plus `PreCompact`/`SessionEnd`, `WorktreeCreate`/`WorktreeRemove`, `FileChanged`, etc. Full list: https://code.claude.com/docs/en/hooks
- Hook gets JSON on stdin (`tool_input.file_path`, `tool_input.command`, `cwd`...). Exit 0 = no objection (normal permission flow continues); exit 2 = block, stderr is fed back to Claude; JSON on stdout for fine control.
- `matcher` filters by tool name, e.g. `"Edit|Write"`, `"Bash"`.
- Docs examples: desktop notification when Claude needs you; Prettier after every edit (`jq -r '.tool_input.file_path' | xargs npx prettier --write`); block edits to `.env` / `package-lock.json` / `.git/` with a script that exits 2; re-inject context after compaction.
- Bash examples need `jq` and (on Windows) Git Bash.

Windows-friendly first hook (adapted from the docs; put in `~/.claude/settings.json`):
```json
{
  "hooks": {
    "Notification": [
      { "matcher": "", "hooks": [ { "type": "command",
        "command": "powershell.exe -Command \"[System.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms'); [System.Windows.Forms.MessageBox]::Show('Claude Code needs your attention', 'Claude Code')\"" } ] }
    ]
  }
}
```
macOS command: `osascript -e 'display notification "Claude Code needs your attention" with title "Claude Code"'`. Linux: `notify-send` variant in the doc.

---

## 14. MCP servers

VERIFIED - https://code.claude.com/docs/en/mcp-quickstart
- MCP (Model Context Protocol) = open standard for plugging external tools/data into Claude: issue trackers, databases, browsers, design tools.
- Add from your normal shell (not inside a session):
```bash
# hosted server, no auth - the official "first server": searchable Claude Code docs
claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp
claude mcp list            # expect: claude-code-docs ... Connected
# local stdio server: a browser Claude can drive (needs Node.js 18+)
claude mcp add playwright -- npx -y @playwright/mcp@latest
# OAuth server: add, then inside a session run /mcp -> select -> Authenticate
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
claude mcp remove claude-code-docs
```
- Everything after `--` is the command that starts a local server; forgetting `--` is the classic mistake.
- Scopes: `local` (default; you + this project; stored in `~/.claude.json`), `--scope project` (writes `.mcp.json` in the repo root; teammates get an approval prompt), `--scope user` (you, all projects; `~/.claude.json`). Windows: `%USERPROFILE%\.claude.json`. Claude Code does NOT read `~/.claude/mcp.json` or similar.
- Inside a session: `/mcp` shows status, reconnect, authenticate, disable.
- Token-auth servers: `--header "Authorization: Bearer <token>"`; env vars: `--env KEY=value`.
- Slow first start (npx download) -> `MCP_TIMEOUT=60000 claude` (PowerShell: `$env:MCP_TIMEOUT = "60000"; claude`).
- Context cost: MCP tool definitions are deferred by default (only names + server instructions load), but CLI tools such as `gh` remain cheaper than an MCP server. VERIFIED - https://code.claude.com/docs/en/costs
- Connectors added at https://claude.ai/customize/connectors load automatically in the CLI for the same account.

---

## 15. Git worktrees and parallel sessions

VERIFIED - https://code.claude.com/docs/en/worktrees , https://code.claude.com/docs/en/agents
- A worktree = a second working directory of the same repo on its own branch. One Claude session per worktree = no file collisions.
- Built in: `claude --worktree feature-auth` (or `-w`). Creates `.claude/worktrees/feature-auth/` on a new branch `worktree-feature-auth`. No name -> a random one like `bright-running-fox`. `claude --worktree "#1234"` branches from a PR.
- Needs a git repo and workspace trust (run plain `claude` once in the folder first).
- Base: by default branches from the remote default branch (`origin/HEAD`, "fresh"); with no remote it falls back to local HEAD. To include your unpushed work set `{"worktree": {"baseRef": "head"}}`.
- Add `.claude/worktrees/` to `.gitignore`. A worktree is a fresh checkout: reinstall dependencies there. `.worktreeinclude` (gitignore syntax) copies ignored files such as `.env` into each new worktree.
- On exit: clean worktree -> removed automatically (unnamed session); has changes/commits -> prompt to keep or remove. `-p` runs never clean up.
- Manual route: `git worktree add ../project-feature-a -b feature-a`, `cd` there, `claude`; `git worktree list`; `git worktree remove <path>`.
- Subagents in worktrees: `isolation: worktree` in the agent frontmatter, or say "use worktrees for your agents". `/batch <instruction>` splits a big change into 5-30 worktree-isolated subagents that each open a PR.
- "Yes, don't ask again" approvals made in a worktree are saved to the main checkout's `.claude/settings.local.json` and apply to all worktrees (v2.1.211+; not on Windows in all cases).

Ways to go parallel (docs comparison): subagents (inside one session) / agent view `claude agents` (background sessions, research preview) / agent teams (experimental, off by default, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; "approximately 7x more tokens than standard sessions when teammates run in plan mode") / Projects at claude.ai/code (cloud threads, public beta on Pro and Max) / dynamic workflows (scripted fan-out). Worktrees, cross-session messaging and `/batch` are supporting tools. Desktop app: tick the worktree option when starting a session. Cost warning: parallel sessions multiply token usage.

Writer/Reviewer pattern: session A implements; a fresh session B (or a subagent) reviews the diff with no bias toward code it just wrote; feed findings back to A. VERIFIED - https://code.claude.com/docs/en/best-practices

---

## 16. Non-interactive ("headless") mode and the Agent SDK

VERIFIED - https://code.claude.com/docs/en/headless
- The docs now call this "run Claude Code programmatically" / non-interactive mode; it is the CLI face of the Agent SDK (Python and TypeScript packages: https://code.claude.com/docs/en/agent-sdk/overview).
```bash
claude -p "What does the auth module do?"
cat build-error.txt | claude -p "concisely explain the root cause of this build error" > output.txt
claude -p "Summarize this project" --output-format json | jq -r '.result'
claude -p "Run the test suite and fix any failures" --allowedTools "Bash,Read,Edit"
claude -p "Apply the lint fixes" --permission-mode acceptEdits
claude -p "Look at my staged changes and create an appropriate commit" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
claude -p "Now focus on the database queries" --continue
```
- `--output-format text|json|stream-json`; JSON includes `session_id`, `total_cost_usd`; `--json-schema '<schema>'` puts validated output in `structured_output`.
- `-p` always starts in Manual mode, so anything that would prompt is denied unless allowed via `--allowedTools`, `permissions.allow`, or a mode such as `acceptEdits`/`auto`. `--permission-prompts none` (v2.1.259+) for unattended jobs.
- `--bare`: skips hooks, skills, plugins, MCP, auto memory, CLAUDE.md for reproducible CI runs; needs `ANTHROPIC_API_KEY` (does not use subscription login); will become the default for `-p` in a future release.
- Without `--bare`, `-p` runs a repo's hooks and `.mcp.json` servers with no trust dialog - do not run `claude -p` in a repo you do not trust.
- stdin cap 10 MB. Exit code 0 on success. Skills work in `-p` (`/skill-name` in the prompt string).
- Fan-out loop from the docs: `for file in $(cat files.txt); do claude -p "Migrate $file ... Return OK or FAIL." --allowedTools "Edit,Bash(git commit *)"; done` (VERIFIED - best-practices).

---

## 17. settings.json: scopes, allow/deny lists

VERIFIED - https://code.claude.com/docs/en/settings , https://code.claude.com/docs/en/permissions
| Scope | File | Who |
|---|---|---|
| User | `~/.claude/settings.json` (Windows: `%USERPROFILE%\.claude\settings.json`) | you, every project |
| Project (shared) | `.claude/settings.json` | everyone who clones the repo |
| Project (local) | `.claude/settings.local.json` | you, this project; Claude Code adds it to your global git excludes when it creates it |
| Managed | `managed-settings.json` / MDM / claude.ai admin console | your organisation; cannot be overridden |
Precedence, highest first: managed > `claude --settings` > project local > project shared > user. List keys such as `permissions.allow` MERGE across files. `~/.claude.json` is a separate state file (login, MCP servers, trust decisions) - do not hand-edit. Files are strict JSON (no comments, no trailing commas); a broken file shows a Settings Error at next start. Edit via `/config`, `/permissions`, or a text editor.

Example (doc example plus a deny for pushes):
```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": ["Bash(npm run lint)", "Bash(npm run test *)", "Bash(git commit *)"],
    "ask":   ["Bash(git push *)"],
    "deny":  ["Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)"]
  }
}
```
Rule facts:
- Format `Tool` or `Tool(specifier)`. Evaluation order: deny -> ask -> allow; first match wins; specificity does not matter.
- Bash wildcards: `*` matches any text; put it AFTER the subcommand (`Bash(git log *)`, not `Bash(git *)`). `Bash(ls:*)` is an accepted legacy spelling of `Bash(ls *)` only at the end of a pattern. Mind the space: `Bash(git diff*)` also matches `git diff-index`.
- Bash rules match command text, not the program: `Bash(rm *)` does not stop `/bin/rm` or `bash -c 'rm ...'`. They are convenience, not a security boundary - use sandboxing or a PreToolUse hook for that.
- Files: only `Read(path)` and `Edit(path)` rules are consulted (gitignore-style patterns; `//abs`, `~/home`, `/relative-to-settings`, `./cwd`). A `Write(...)` path rule is accepted but never checked. A `Read` deny also blocks Edit/Write on that path, and covers `cat`/`head`/`tail`/`sed` in Bash - but not a script that opens the file itself.
- Web: `WebFetch(domain:example.com)`, `WebFetch(domain:*.example.com)`. MCP: `mcp__server` or `mcp__server__tool`. Subagents: `Agent(...)`.
- "Yes, and don't ask again" on a Bash command saves a permanent rule to `.claude/settings.local.json`; file-edit approvals last only for the session.
- `/fewer-permission-prompts` scans your transcripts and proposes an allowlist (VERIFIED-S - commands).

---

## 18. Cost and usage control

VERIFIED - https://code.claude.com/docs/en/costs
- Subscribers: `/usage` shows plan bars + attribution (skills, subagents, MCP servers) + behaviour flags (long context, cache misses); the dollar figure is only meaningful for API users. `/insights` writes an HTML report on how you work (`~/.claude/usage-data/report.html`).
- API users: set a workspace spend limit in the Console; `--max-budget-usd` flag for scripted runs; JSON output has `total_cost_usd`.
- Cheapest habits, in order of impact: `/clear` between tasks; right model for the job (Sonnet for most coding, Opus/Fable for hard reasoning, `model: haiku` for simple subagents); specific prompts instead of "improve this codebase"; plan mode before big changes; `Esc` early when it goes wrong; lower `/effort` for simple tasks (thinking tokens are billed as output); disable unused MCP servers; move workflow text from CLAUDE.md into skills; delegate log/test-output reading to subagents.
- Parallel work multiplies usage; agent teams use "approximately 7x more tokens than standard sessions when teammates run in plan mode" (exact wording; the 7x is conditional on plan mode, do not quote it bare).
- Background overhead is small (typically under $0.04 per session).
- An accidentally exported `ANTHROPIC_API_KEY` switches you from subscription to per-token billing (VERIFIED - quickstart).

Models (VERIFIED, fact-check 21 Sep 2026 - https://code.claude.com/docs/en/model-config): aliases `sonnet` -> Sonnet 5 and `opus` -> Opus 5 on the Anthropic API (Microsoft Foundry resolves them to Sonnet 4.5 / Opus 4.6), `haiku` -> "Latest Haiku model" (the docs do not name a version; the pricing page lists Haiku 4.5 as the current Haiku), `fable` -> Fable 5.1, `best` -> `fable` where available, otherwise `opus`, `opusplan` (Opus in plan mode, Sonnet for execution), `sonnet[1m]` / `opus[1m]`. `/model` to switch (press `s` in the picker to switch for this session only); `/effort low|medium|high|xhigh|max|ultracode` (`high` is the default on every model except Opus 4.7); the word `ultrathink` in a prompt asks for deeper reasoning on that turn. Thinking cannot be turned off on Fable models.

---

## 19. Common beginner mistakes (and the fix)

From the docs' own failure-pattern list (VERIFIED - https://code.claude.com/docs/en/best-practices):
1. Kitchen-sink session: unrelated tasks in one conversation -> `/clear` between tasks.
2. Correcting over and over: context fills with failed attempts -> after two failed corrections, `/clear` and write a better prompt.
3. Over-specified CLAUDE.md: rules get lost -> prune; convert must-happen rules to hooks.
4. Trust-then-verify gap: plausible code that misses edge cases -> always give a check (tests, script, screenshot). Cannot verify it? Do not ship it.
5. Infinite exploration: unscoped "investigate" reads hundreds of files -> scope it or use a subagent.

From the rest of the docs / workshop experience:
6. Pasting the wrong Windows install command (CMD vs PowerShell) - section 3.
7. `claude` not found after install -> PATH fix, open a NEW terminal - section 3.
8. Installing only the VS Code extension and expecting `claude` in the terminal (the extension does not add it to PATH).
9. Running `claude` in the home directory or Desktop instead of a project folder -> Claude can see (and index) everything there. Always `cd` into a project first.
10. No git repo / no commit before letting the agent loose -> checkpoints do not cover Bash changes; `git init && git commit` first.
11. Believing `/rewind` undoes everything (it does not undo `rm`, DB writes, pushes, deploys).
12. Living in bypass mode (`--dangerously-skip-permissions`) on a laptop; docs say containers/VMs only.
13. Treating CLAUDE.md as enforcement; it is advice. Deny rules and hooks enforce.
14. Putting secrets in the repo and trusting `Read(./.env)` alone - a script can still read the file; keep secrets out of reach and use sandboxing where available.
15. Forgetting `--` in `claude mcp add name -- command`; editing a non-existent `~/.claude/mcp.json`.
16. Expecting worktrees to contain unpushed commits or `node_modules` (fresh checkout from the default branch).
17. Leaving a giant session open all day, then being surprised by the usage bar.
18. Vague prompts ("fix the bug") instead of symptom + location + definition of done.
19. Accepting a plan without reading it; not using `Ctrl+G` to edit it.
20. Asking Claude "how do I do X in Claude Code?" is allowed and works - beginners forget the tool documents itself (`/help`, or plain questions).

---

## 20. Six progressive labs (15-20 min each)

Shared setup: a laptop with a terminal, git installed (Windows: Git for Windows), a paid Claude plan or guest pass/API key. All labs use one tiny project, "qairu-cards" (a Kazakh-English flashcard web page), so nobody needs an existing codebase. Labs 1-4: start sessions with `claude --permission-mode manual` so every action is visible. Prompts are in English; students may prompt in Kazakh or Russian - Claude handles both (UNVERIFIED quality claim; test before the talk).

### Lab 1 - Install and say hello (15 min) [mental model 1]
Goal: working install, logged in, first conversation, know how to leave.
Steps
1. Install (section 3). New terminal. `claude --version`, then `claude doctor`.
2. Create the project:
   - macOS/Linux: `mkdir qairu-cards && cd qairu-cards && git init`
   - PowerShell: `mkdir qairu-cards; cd qairu-cards; git init`
3. `claude --permission-mode manual` -> complete browser login -> accept the trust dialog.
4. Type: `what can Claude Code do? answer in 5 bullets`
5. Type: `/help`, then `/usage`, then `?` on an empty line (shortcut panel).
6. Type: `! git status` (shell mode) and see the output enter the conversation.
7. Press `Shift+Tab` a few times; read the mode name in the status bar each time. Return to manual.
8. `/exit` (or `Ctrl+D` twice). Then `claude -c` to prove the conversation resumes. Exit again.
Expected: version string like `2.1.x (Claude Code)`; a bullet answer; status bar cycling manual -> accept edits -> plan.
You are done when: `claude --version` prints a version, `/usage` shows your plan, and `claude -c` reopened your earlier chat.
Doc: https://code.claude.com/docs/en/quickstart

### Lab 2 - The loop: plan, build, verify, rewind (20 min) [models 1, 3, 4]
Goal: ship a working page through plan mode, then break it and undo it.
Steps
1. In `qairu-cards`: `claude --permission-mode plan`
2. Prompt:
   ```
   Build a single-file flashcard web app in index.html (no frameworks, no build step).
   10 Kazakh-English word pairs, click a card to flip it, Next/Previous buttons,
   and a counter like "3 / 10". Keep all CSS and JS inside index.html.
   Plan first. In the plan, include how you will verify it works.
   ```
3. Read the plan. Press `Ctrl+G`, add one line of your own (e.g. "cards must be keyboard accessible: Space flips, arrows navigate"), save, close.
4. Choose "Yes, manually approve edits". Approve each edit; read at least one diff fully.
5. Open `index.html` in a browser. Check flip, next, counter.
6. Commit: prompt `commit this with a descriptive message` (approve the git commands).
7. Now a deliberately bad idea: `rewrite the whole page so that everything is bright pink and uses Comic Sans, and remove the counter`. Approve. Reload the browser - ugly.
8. Press `Esc` `Esc` (empty input) -> select the pink prompt -> "Restore code and conversation". Reload the browser.
9. Bonus: while Claude is mid-answer on any prompt, press `Esc` once and redirect it.
Expected: a plan with a verification step; a working page; after rewind the page is back to the committed version and the pink prompt is back in your input box.
You are done when: `git log --oneline` shows 1 commit, the browser shows the non-pink app with a counter, and you have used `Ctrl+G` and `Esc Esc` once each.
Docs: https://code.claude.com/docs/en/permission-modes , https://code.claude.com/docs/en/checkpointing

### Lab 3 - Memory and context: teach it once (15-20 min) [models 2, 5]
Goal: CLAUDE.md that changes behaviour; feel `/context`, `/clear`, `/compact`.
Steps
1. `claude --permission-mode manual`, then `/init`. Approve writing `CLAUDE.md`. Open it (`/memory` -> project file).
2. Replace/add so the file has under 20 lines and includes exactly these rules:
   ```
   # Project rules
   - Single file app: all code stays in index.html. Never add frameworks or a build step.
   - Every user-visible string must exist in Kazakh and English.
   - After any change, list the manual test steps you expect me to run in the browser.
   ```
3. `/context` - find "Memory files" and confirm CLAUDE.md is listed; note the percentage used.
4. `/clear`. Prompt: `add a "Shuffle" button`. Watch whether it (a) stays in index.html, (b) labels the button in both languages, (c) prints test steps.
5. Say: `remember that I prefer short answers without emojis`. Then `/memory` -> open the auto memory folder and look at what was saved.
6. Ask 3-4 exploratory questions about the code, then `/context` again (number went up). Run `/compact keep only the decisions about data format and the list of changed files`. `/context` once more.
7. `/btw what does localStorage do?` - then confirm with `/context` that it added nothing.
8. Commit.
Expected: the Shuffle button arrives bilingual with test steps and no new files; context percentage drops after `/compact`.
You are done when: a fresh session (after `/clear`) follows all three rules without being reminded, and you can point at the memory file on disk (`~/.claude/projects/.../memory/MEMORY.md`).
Doc: https://code.claude.com/docs/en/memory

### Lab 4 - Guardrails: settings.json rules + your first hook (20 min) [model 3]
Goal: allow the boring stuff, deny the dangerous stuff, get a notification hook.
Steps
1. Create a fake secret: file `.env` containing `API_KEY=super-secret-123`. Add `.env` to `.gitignore`.
2. Create `.claude/settings.json`:
   ```json
   {
     "$schema": "https://json.schemastore.org/claude-code-settings.json",
     "permissions": {
       "allow": ["Bash(git status)", "Bash(git diff *)", "Bash(git log *)"],
       "ask":   ["Bash(git push *)"],
       "deny":  ["Read(./.env)", "Read(./.env.*)"]
     }
   }
   ```
3. Start `claude --permission-mode manual`. Run `/permissions` and find your rules and the file they came from.
4. Prompt: `what is in my .env file?` -> must be refused. Prompt: `show me git status and the last 3 commits` -> must run with no prompt.
5. Prompt: `run: git push` -> must ask even if you switch to accept-edits mode (no remote needed; just see the prompt, answer No, and press `Tab` on No to add the comment "no remote yet").
6. Hook: add the Notification hook from section 13 to `~/.claude/settings.json` (Windows PowerShell version, or `osascript` on macOS). Alternative: prompt `write a Notification hook in my user settings that shows a desktop notification on this OS` and review what it proposes.
7. `/hooks` -> confirm 1 hook under Notification. Ask Claude to create a file, switch to another window, wait for the dialog/notification.
8. Discussion point: ask `read .env using a python one-liner` - observe what happens and discuss why path rules are not a sandbox (section 17).
Expected: `.env` read denied; git read commands silent; push prompts; a notification appears when Claude waits for you.
You are done when: `/permissions` lists 3 allow + 1 ask + 2 deny rules from `.claude/settings.json`, and `/hooks` shows your Notification hook.
Docs: https://code.claude.com/docs/en/permissions , https://code.claude.com/docs/en/hooks-guide

### Lab 5 - Extend it: one skill, one MCP server (20 min) [model 5]
Goal: a reusable `/explain-diff` command and a live external tool.
Steps
1. Create `.claude/skills/explain-diff/SKILL.md` with the example from section 11 (or prompt: `create a project skill called explain-diff that injects git diff HEAD and explains my uncommitted changes to a beginner, manual invocation only`).
2. Restart `claude`. Type `/` and find `explain-diff`; run `/skills` to see it listed.
3. Make a small manual edit to index.html in your editor, then run `/explain-diff`.
4. Exit. In the normal shell:
   ```bash
   claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp
   claude mcp list
   ```
5. Start `claude`, run `/mcp` (server shows connected). Prompt: `Use the claude-code-docs server to look up what MCP_TIMEOUT does`. Approve the tool call; notice the tool call is labelled with the server name.
6. `/context` - see how little the MCP server costs (tools are deferred).
7. Stretch (needs Node.js 18+): `claude mcp add playwright -- npx -y @playwright/mcp@latest`, then prompt `Use playwright to open my index.html (file URL) and tell me whether the counter updates when you click Next`. This is self-verification through a real browser.
8. Optional cleanup: `claude mcp remove claude-code-docs`.
Expected: `/explain-diff` prints a 3-bullet explanation + risks; `claude mcp list` shows `Connected`; the docs answer arrives through an MCP tool call.
You are done when: `/explain-diff` works in a fresh session and `claude mcp list` shows at least one connected server.
Docs: https://code.claude.com/docs/en/skills , https://code.claude.com/docs/en/mcp-quickstart

### Lab 6 - Two agents in parallel worktrees, plus a reviewer (20 min) [models 2, 4, 5]
Goal: two features built simultaneously without collisions, reviewed by a fresh context, merged.
Pre-flight: everything committed (`git status` clean); `.gitignore` contains `.claude/worktrees/`; you have run plain `claude` in this folder before (trust). Watch `/usage` - two sessions burn roughly double.
Steps
1. Terminal A: `claude --worktree dark-mode`
   Prompt: `Add a dark mode toggle that remembers the choice in localStorage. Follow CLAUDE.md. When done, commit on this branch.`
2. Terminal B (second window, same folder): `claude --worktree quiz-mode`
   Prompt: `Add a quiz mode: show the Kazakh word, 4 English options, track score. Follow CLAUDE.md. When done, commit on this branch.`
3. While both run, in a third terminal: `git worktree list` and look inside `.claude/worktrees/`. Open each worktree's index.html in the browser to test them separately.
4. In Terminal A, after the commit, prompt:
   `Use a subagent to review this branch's diff against main. Report only correctness problems and violations of CLAUDE.md, not style.` Fix what is real.
5. Exit both sessions; when asked, choose to KEEP the worktrees.
6. In the main folder:
   ```bash
   git merge worktree-dark-mode
   git merge worktree-quiz-mode
   ```
   If there is a conflict in index.html (likely - same file): `claude "help me resolve the merge conflict in index.html, keep both features, then list test steps"`.
7. Headless finish: `claude -p "Summarize what changed in the last 3 commits in 5 bullets" --output-format json` and find `result`, `session_id`, `total_cost_usd` in the output.
8. Clean up: `git worktree remove .claude/worktrees/dark-mode` and the same for `quiz-mode`; `git branch -d worktree-dark-mode worktree-quiz-mode`.
Expected: two branches named `worktree-dark-mode` and `worktree-quiz-mode`; both features present on main after merging; a JSON blob from the headless run.
You are done when: the page on main has both a dark-mode toggle and a quiz mode, `git worktree list` shows only the main checkout, and you can explain why the two agents never overwrote each other.
Docs: https://code.claude.com/docs/en/worktrees , https://code.claude.com/docs/en/sub-agents , https://code.claude.com/docs/en/headless
Teaching note: the merge conflict in step 6 is a feature, not a bug - it shows that worktrees isolate files, not design decisions; splitting work by file/module is the real skill. For a conflict-free demo, tell agent B to put quiz code in a separate `quiz.js` (and relax the single-file rule in CLAUDE.md first).

Lab-to-talk mapping for the 1-2 h format: Labs 1-2 live with the audience (35 min), Lab 3-4 as demo (15 min), Labs 5-6 in the build-together hour or as homework. Desktop-app alternative for non-terminal people: the same labs work in the Code tab (mode selector instead of Shift+Tab; worktree checkbox instead of `--worktree`) - https://code.claude.com/docs/en/desktop-quickstart

---

## 21. Corrections to common / outdated claims

1. "Install with npm, needs Node.js" - outdated. Native installer is the recommended path, auto-updates, needs no Node. npm still works but wants Node 22+ and merely downloads the native binary. (setup)
2. "Windows needs WSL" - wrong. Native Windows works from PowerShell or CMD; Git for Windows is optional (without it Claude uses a PowerShell tool). WSL2 is only needed for sandboxing. (setup)
3. "Claude Code asks permission for everything by default" - no longer true on Pro/Max/Team: auto mode (classifier-reviewed) is the built-in start since v2.1.228 (v2.1.233 on Windows). The ask-everything mode is now labelled "Manual" (config value still `default`). `claude -p`, API keys and Enterprise still start in Manual. (permission-modes)
4. "Shift+Tab cycles default -> acceptEdits -> plan" - incomplete: from auto the first press goes to Manual; auto/bypass appear after plan only when available. (permission-modes)
5. "Press # to add a memory" - the `#` shortcut is not in the current quick-commands table (`/`, `!`, `@`, `:`, `?`). Current ways: `/memory`, "add this to CLAUDE.md", or "remember that..." (goes to auto memory, which now exists and is on by default). (interactive-mode, memory)
6. "`/cost` shows what you spent" - `/cost` is an alias of `/usage` (VERIFIED, commands page; the `/stats` alias is UNVERIFIED); for subscribers the dollar figure is not a bill. (costs, commands)
7. "Custom slash commands live in .claude/commands" - still works, but commands are merged into skills; `.claude/skills/<name>/SKILL.md` is the current form. (skills)
8. "`/agents` opens the subagent manager" - since v2.1.198 it only prints file locations; `claude agents` is a different thing (agent view for background sessions). (agents)
9. "Permission wildcard is `Bash(npm run test:*)`" - the canonical form is now space + star, `Bash(npm run test *)`; `:*` is accepted only as a trailing legacy form. And `Write(path)` rules are silently never checked - use `Edit(path)`. (permissions)
10. "Deny rules protect my secrets" - only against Claude's file tools and recognised shell readers; a script can still open the file. Bash rules match text, not programs. Use sandboxing/hooks for real boundaries. (permissions)
11. "Rewind undoes everything" - it undoes edits made by Claude's edit tools in the main session; not Bash side effects, not most subagent edits, not symlinked files, nothing remote. 100 checkpoints/session, snapshots ~30 days. (checkpointing)
12. "Headless mode" - docs now frame `claude -p` as the Agent SDK CLI / non-interactive mode; `--bare` is recommended for scripts and will become the `-p` default; `-p` without `--bare` runs a repo's hooks and MCP servers with no trust prompt. (headless)
13. "For parallel agents you must run `git worktree add` yourself" - `claude --worktree <name>` does it (`.claude/worktrees/<name>`, branch `worktree-<name>`), branching from the remote default branch, not your current HEAD, unless `worktree.baseRef` is `"head"`. (worktrees)
14. "Claude Code ignores AGENTS.md" - since v2.1.277 it reads AGENTS.md natively when no CLAUDE.md exists. (memory)
15. "MCP servers bloat your context" - tool definitions are deferred by default now; still, CLI tools like `gh` are cheaper. (costs)
16. "Subagents cannot spawn subagents" - the current sub-agents doc describes nested subagents (default depth limit reported as 3, max 20 concurrent). VERIFIED-S only - confirm before stating numbers. (sub-agents)
17. "The free plan includes Claude Code" / "there is a student discount" - free plan has no Claude Code; no individual student price is published; cheapest entry is Pro at $17/month annual ($200 billed up front) or $20 monthly. Student ambassador/club perks are third-party-reported (UNVERIFIED). (setup, pricing)
18. "Claude is not available in Kazakhstan" - Kazakhstan is on the supported-countries list for Claude.ai and the API. (supported-countries)
19. "Context is 200K" - current default models (Sonnet 5, Opus 5, Fable 5.1) run a 1M window natively on the API; auto-compact "at about 967K tokens by default" (VERIFIED, fact-check - model-config). Context discipline still matters for quality and usage.
20. "The Desktop app is just chat" - it has a Code tab that bundles Claude Code (no CLI install), with diff review, parallel sessions and worktree option; paid plan required; Linux build is beta. (overview)

---

## 22. Source list (all opened 21 Sep 2026 unless marked)

Docs: overview, quickstart, setup, troubleshoot-install, platforms, how-claude-code-works, best-practices, permission-modes, permissions, settings, memory, checkpointing, interactive-mode, commands, costs, skills, sub-agents, hooks-guide, mcp-quickstart, worktrees, agents, headless, model-config, whats-new/2026-w37 - all under https://code.claude.com/docs/en/<name>
Engineering posts: https://www.anthropic.com/engineering/claude-code-auto-mode (25 Mar 2026); https://www.anthropic.com/engineering/claude-code-sandboxing (20 Oct 2025); https://www.anthropic.com/engineering/claude-code-best-practices (now resolves to the docs best-practices page, per search result title - not opened separately); also listed but NOT opened: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents , https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents , https://www.anthropic.com/engineering/harness-design-long-running-apps , https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models , https://claude.com/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code
Other: https://claude.com/pricing ; https://www.anthropic.com/supported-countries ; https://claude.com/solutions/education ; https://news.ycombinator.com/item?id=43163011
Not opened in this pass (follow-ups): desktop-quickstart, web-quickstart, mobile, vs-code, sandboxing, context-window, hooks reference, agent-sdk/overview, cli-reference, features-overview.

---

## Visual candidates

Browser tools were off-limits and the web-search budget ran out, so X/Reddit posts could not be verified in this pass; they are marked UNVERIFIED with what to look for.

| # | URL | What it shows | Teaching point |
|---|---|---|---|
| 1 | https://code.claude.com/docs/en/how-claude-code-works (diagram `images/agentic-loop.svg`, light + dark variants) | Official agentic-loop diagram: prompt -> gather context -> take action -> verify -> repeat, "you can interrupt at any point" | Mental model 1, the loop. Best single image for the talk. VERIFIED |
| 2 | https://code.claude.com/docs/en/how-claude-code-works (diagram `images/session-continuity.svg`) | Resume continues the same session; fork creates a new ID | Sessions, `--continue` vs `/branch`. VERIFIED |
| 3 | https://code.claude.com/docs/en/settings (interactive "Settings precedence" graphic at top) | 5 stacked levels: managed > command line > project local > shared project > user | settings.json scopes. VERIFIED |
| 4 | https://code.claude.com/docs/en/context-window | Interactive walkthrough of what loads into context at startup and what each file read costs (referenced by best-practices) | Mental model 2, context as scarce resource. Page exists in index; NOT opened |
| 5 | https://code.claude.com/docs/en/permission-modes ("Available modes" table) | The six modes and what runs without asking | Mental model 3; also shows the "auto is default on Pro/Max/Team" sentence. VERIFIED |
| 6 | https://www.anthropic.com/engineering/claude-code-auto-mode (Figure 1 + the 93% stat) | Modes plotted by autonomy vs security; "users approve 93% of permission prompts" | Why approval fatigue makes click-through permissions fake safety. VERIFIED (fact-check: 93% sentence, Figure 1 caption and "Published Mar 25, 2026" confirmed) |
| 7 | https://www.anthropic.com/engineering/claude-code-sandboxing | Header + "reduces permission prompts by 84%" | Sandboxing as the other way to cut prompts. VERIFIED (fact-check: "84%" sentence and "Published Oct 20, 2025" confirmed) |
| 8 | https://code.claude.com/docs/en/best-practices ("Avoid common failure patterns" section) | The five named failure patterns with fixes | Section 19 slide; screenshot the list. VERIFIED |
| 9 | https://code.claude.com/docs/en/best-practices (before/after prompt tables) | Vague vs specific prompts side by side | Prompting for agents: symptom + location + done-criteria. VERIFIED |
| 10 | https://code.claude.com/docs/en/costs (first paragraphs + `/usage` sample block) | "$13 per developer per active day", "$150-250 per month"; sample session cost output | Cost reality check; subscription vs API. VERIFIED |
| 11 | https://claude.com/pricing | Plan cards: Free / Pro $17-$20 / Max from $100; API price table incl. Fable 5.1, Opus 5, Sonnet 5, Haiku 4.5 | "What can a student use" slide. VERIFIED (fact-check 21 Sep 2026: every listed price matches the page) |
| 12 | https://code.claude.com/docs/en/whats-new/2026-w37 (image `images/whats-new/plugin-eval.jpg`) | Weekly digest header "Releases v2.1.263 -> v2.1.269", terminal screenshot of `claude plugin eval` | Pace of change: seven version numbers (v2.1.263-v2.1.269) and "2 features" in one week - why we teach mental models, not button locations. VERIFIED (fact-check: heading "Week 37 · September 7–11, 2026", "Releases v2.1.263 → v2.1.269" and the image path confirmed; the page itself counts features, not releases) |
| 13 | https://code.claude.com/docs/en/quickstart (install tabs) | The three install one-liners with the PowerShell/CMD confusion note | Lab 1 slide. VERIFIED |
| 14 | https://code.claude.com/docs/en/mcp-quickstart (status table) | `claude mcp list` statuses: Connected / Needs authentication / Failed to connect | Lab 5 slide. VERIFIED |
| 15 | https://news.ycombinator.com/item?id=43163011 | HN thread "Claude 3.7 Sonnet and Claude Code", 2127 points, 963 comments, 24 Feb 2025 | Origin moment: Claude Code launched as a research preview 19 months ago. VERIFIED (title/points/date) |
| 16 | https://x.com/karpathy/status/1886192184808149383 | Andrej Karpathy's 2 Feb 2025 post on X coining "vibe coding" | Definition slide for the whole masterclass. UNVERIFIED as a primary source (X returned HTTP 402 to the fetcher again on 21 Sep 2026). Secondary confirmation: Wikipedia's "Vibe coding" article credits Karpathy, dates the post February 2, 2025, and cites exactly this URL - https://en.wikipedia.org/wiki/Vibe_coding . Open the post manually before screenshotting. |
| 17 | X thread by Boris Cherny (@bcherny, Claude Code creator) on his personal setup: parallel sessions, plan mode first, shared CLAUDE.md, verification loops (early Jan 2026) | Creator's own workflow | Validates Labs 2, 3, 6 as "how the pros work". UNVERIFIED - exact URL not recovered; search `from:bcherny Claude Code setup` |
| 18 | https://www.reddit.com/r/ClaudeAI/ and https://www.reddit.com/r/ClaudeCode/ (top posts of the month on usage limits / "Claude ignored my CLAUDE.md") | Real user pain | Motivates context discipline, short CLAUDE.md, hooks for enforcement. UNVERIFIED - pick a current thread manually |
| 19 | https://agentskills.io | Agent Skills open-standard landing page | Skills are portable across tools, not Claude lock-in. Linked from skills doc; NOT opened |
| 20 | https://code.claude.com/docs/_llms/ru.md | Russian docs index (197 pages) | Accessibility for the KZ audience: official docs exist in Russian. VERIFIED (listed in llms.txt) |

---

## Fact-check log

Adversarial pass on 21 Sep 2026. Method: pick the claims most likely to appear on a slide (numbers, dates, quotes, prices, commands), open the primary source with a fetcher, and try to refute each one. Browser tools were not used. Web search budget was exhausted before this pass, so only direct fetches were possible.

| # | Claim checked | Source opened | Outcome |
|---|---|---|---|
| 1 | Plan prices: Pro $20 / $17 annual; Max "From $100" with 5x or 20x; Team $25/$20 Standard, $125/$100 Premium; Enterprise $20/seat; API Fable 5.1 $10/$50, Opus 5 $5/$25, Sonnet 5 $2/$10, Haiku 4.5 $1/$5 per MTok | https://claude.com/pricing | CONFIRMED, all figures. Added exact strings: Pro annual is "$200 billed up front"; Enterprise is "US$20/seat/month, billed annually". Max 20x tier price still not printed on the page (stays UNVERIFIED). Education plan is institution-level only, as stated. |
| 2 | Install one-liners (`curl -fsSL https://claude.ai/install.sh \| bash`, `irm https://claude.ai/install.ps1 \| iex`, CMD variant), system requirements, npm needs Node 22+ since v2.1.198, binary paths, WSL optional, Git for Windows optional, no sandbox on native Windows, Homebrew/WinGet commands, uninstall commands | https://code.claude.com/docs/en/setup | CONFIRMED character-for-character. Only nit: the docs' own example output for `claude --version` is `2.1.211 (Claude Code)`; the file's `2.1.269` is an illustrative example, left as is. |
| 3 | Auto mode is the built-in start on Pro/Max/Team; needs v2.1.228+ (macOS/Linux/WSL) and v2.1.233+ (native Windows); Enterprise, API keys, Bedrock/Vertex/Foundry and `claude -p` start in Manual; `manual` alias since v2.1.200; Shift+Tab from auto goes to Manual, then default -> acceptEdits -> plan; `auto`/`bypassPermissions` ignored in project settings; plan approval option wording; supported models Opus 4.6+/Sonnet 4.6+/Fable; "does not guarantee safety" warning | https://code.claude.com/docs/en/permission-modes | CONFIRMED on every point. Added to the blocked-by-default list: force push and `git reset --hard`-style discards, which the file omitted. |
| 4 | "users approve 93% of permission prompts"; "approval fatigue" quote; 0.4% FPR / 17% FNR; post dated 25 Mar 2026 | https://www.anthropic.com/engineering/claude-code-auto-mode | CONFIRMED. Exact sentence: "Claude Code users approve 93% of permission prompts." 0.4% FPR is "on real traffic", 17% FNR is "on real overeager"; both are the full Stage 1 -> Stage 2 pipeline. Added Stage-1-only figures (8.5% / 6.6%) and author (John Hughes). Upgraded VERIFIED-S -> VERIFIED. |
| 5 | Sandboxing cut prompts by 84%; post dated 20 Oct 2025; bubblewrap / seatbelt | https://www.anthropic.com/engineering/claude-code-sandboxing | CONFIRMED. Exact sentence: "sandboxing safely reduces permission prompts by 84%." Added post title. Upgraded VERIFIED-S -> VERIFIED. |
| 6 | "$13 per developer per active day", "$150-250 per developer per month", "below $30 per active day for 90% of users"; background overhead under $0.04/session; cache TTL 1 h subscription / 5 min API; five-hour + weekly windows; limit error strings; TPM warning for live training; MCP tools deferred, `gh` cheaper; agent teams ~7x | https://code.claude.com/docs/en/costs | CONFIRMED with two refinements applied: (a) the 7x figure is stated only "when teammates run in plan mode" - qualifier added in two places; (b) the 1-hour cache lifetime "drops to five minutes once you're drawing on usage credits" - added. The allowance is shared with "Claude chat and Cowork" - added. |
| 7 | Checkpoints: 100 most recent per session; snapshots deleted after ~30 days (`cleanupPeriodDays`); `/rewind` or Esc Esc on empty input; six menu options; persists across resume; `/resume <id> (previous session)` entry needs v2.1.191+; Bash changes / most subagent edits / symlinks not tracked; `/branch` or `--continue --fork-session` | https://code.claude.com/docs/en/checkpointing | CONFIRMED on every point. No change. |
| 8 | HN thread "Claude 3.7 Sonnet and Claude Code": 2127 points, 963 comments, 24 Feb 2025 | https://news.ycombinator.com/item?id=43163011 | CONFIRMED (title, 2127 points, 963 comments, "Feb 24, 2025", posted by bakugo). "19 months ago" arithmetic holds for Sep 2026. |
| 9 | Karpathy "vibe coding" post URL and date | https://x.com/karpathy/status/1886192184808149383 (HTTP 402); https://en.wikipedia.org/wiki/Vibe_coding | NOT REFUTED, NOT PRIMARY-VERIFIED. X blocked the fetcher. Wikipedia cites exactly this URL, credits Karpathy and dates it 2 Feb 2025. Row updated: stays UNVERIFIED as a primary source, with the secondary confirmation and date added. |
| 10 | Kazakhstan, Kyrgyzstan, Uzbekistan supported; Russia not; applies to both API and Claude.ai | https://www.anthropic.com/supported-countries | CONFIRMED. Two lists (API, Claude.ai) with identical contents. Upgraded VERIFIED-S -> VERIFIED. |
| 11 | Default model per plan (Pro / Team Standard -> Sonnet 5; Max / Team Premium / Enterprise / API -> Opus 5); aliases; 1M context; auto-compact ~967K; effort levels; `ultrathink`; thinking always on for Fable | https://code.claude.com/docs/en/model-config | CONFIRMED with corrections: `haiku` resolves to "Latest Haiku model" (the docs do not say 4.5 - fixed); `best` = `fable` where available, otherwise `opus` (added); effort levels also include `ultracode` (added); `high` is the default except on Opus 4.7 (added). 1M window list is Fable 5.1, Fable 5, Sonnet 5, Opus 4.6+, Sonnet 4.6 (added). Upgraded VERIFIED-S -> VERIFIED. |
| 12 | Latest digest: "v2.1.263 -> v2.1.269", week of 7-11 Sep 2026; image `images/whats-new/plugin-eval.jpg`; "7 releases in one week" | https://code.claude.com/docs/en/whats-new/2026-w37 | CONFIRMED heading "Week 37 · September 7–11, 2026", "Releases v2.1.263 → v2.1.269", "2 features", image path. CORRECTED the visual-candidate caption: the page counts 2 features; "7" is the span of version numbers, not a count the page states. |
| 13 (bonus) | Keyboard shortcuts table: Esc, Esc Esc, Shift+Tab / Alt+M, Ctrl+C, Ctrl+D, Ctrl+G / Ctrl+X Ctrl+E, Ctrl+O, Ctrl+R, Ctrl+B, Ctrl+T, Ctrl+S, Ctrl+L, Ctrl+V / Alt+V / Cmd+V, Alt+P, Alt+T (no effect on Fable), Alt+O, Ctrl+J / Shift+Enter, `!`, `@`, `?`, Tab comment field, Ctrl+X Ctrl+K | https://code.claude.com/docs/en/interactive-mode | CONFIRMED, every row. `#` is not in the quick-commands table (`/`, `!`, `@`, `:`, `?`), so section 21 item 5 stands. Note: Ctrl+T toggles the task checklist in the main UI and syntax highlighting inside the `/theme` picker - the file's reading is the main-UI one and is correct. |
| 14 (bonus) | MCP commands: `claude mcp add --transport http claude-code-docs https://code.claude.com/docs/mcp`, `claude mcp add playwright -- npx -y @playwright/mcp@latest`, Sentry URL, `claude mcp remove`, scopes and file locations, `MCP_TIMEOUT=60000`, Node 18+ for Playwright, `--` separator, `~/.claude/mcp.json` not read | https://code.claude.com/docs/en/mcp-quickstart | CONFIRMED character-for-character. No change. |
| 15 (bonus) | Memory: MEMORY.md "first 200 lines or 25KB"; AGENTS.md read natively from v2.1.277; imports max depth four hops; managed-policy paths; `autoMemoryEnabled: false` and `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`; "target under 200 lines" | https://code.claude.com/docs/en/memory | CONFIRMED on every point. No change. |
| 16 (bonus) | `/passes` wording; `/cost` and `/stats` are aliases of `/usage` | https://code.claude.com/docs/en/commands | `/passes`: CONFIRMED with the exact row "Share a free week of Claude Code with friends. Only visible if your account is eligible"; the file's "Pro/Max user" eligibility was not on the page - reworded, eligibility marked UNVERIFIED. `/cost`: CONFIRMED ("Alias for `/usage`"). `/stats`: NOT FOUND on the page - marked UNVERIFIED in section 6.2 and section 21 item 6. |

Net result: 0 claims refuted outright; 6 claims tightened with exact wording or a missing qualifier (7x plan-mode condition, cache TTL under usage credits, `haiku` alias version, `/passes` eligibility, "7 releases" caption, Karpathy date/secondary source); 2 items newly marked UNVERIFIED (`/stats` alias, `/passes` eligibility); 9 VERIFIED-S labels upgraded to VERIFIED.
