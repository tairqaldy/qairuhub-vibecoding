# Fundamentals — current facts (verified 21 Sep 2026)

Research file for vibecoding.qairuhub.com. Scope: facts that go stale (models, prices, free tiers, MCP, local LLMs) + plain-language explanations of AI and engineering basics.

**Legend.** VERIFIED = I opened the primary source on 21 Sep 2026 (pages were read through an automated fetch-and-summarize tool, so re-check any number before it goes on a slide). UNVERIFIED = came from a search snippet / secondary source / figure read-off, primary not opened. Prices are USD per 1M tokens, input / output, standard (non-batch) tier.

**Second pass (adversarial fact-check, 21 Sep 2026).** Every number, date, quote, price and command in sections 0-5 and 8 was re-opened against its primary source and an attempt was made to refute it. Corrections are applied inline; the outcome of each check is listed in "## Fact-check log" at the end of the file.

---

## 0. The 10 things a speaker must not get wrong (Sep 2026)

1. Anthropic's lineup is **Fable 5.1 / Opus 5 / Sonnet 5 / Haiku 4.5**, not "Opus/Sonnet 4.x". Sonnet 5 is **$2/$10** permanently. https://platform.claude.com/docs/en/about-claude/pricing
2. OpenAI's flagship is **GPT-6 Astra ($10/$50)**; the workhorses are **GPT-5.6 Sol/Terra/Luna**. https://developers.openai.com/api/docs/pricing
3. Google's newest models are **Flash** models (Gemini 3.8 Flash, GA Sep 2026); the newest Pro is still "3.1 Pro Preview" with no free tier. https://ai.google.dev/gemini-api/docs/pricing
4. Meta's frontier model is **closed-weight Muse Spark 1.3** (2 Sep 2026), not Llama. Last Llama = Llama 4 (Apr 2025). Meta still ships one small open-weight model, **Muse Glimmer** (30B, Apache 2.0, Aug 2026), so "Meta has no open models" is wrong. https://dev.meta.ai/docs/pricing-rate-limits , https://en.wikipedia.org/wiki/Muse_Spark
5. 1M-token context is now the norm (Anthropic, OpenAI, Google, DeepSeek, Qwen, Meta). Mistral is 256k.
6. "1 token = 0.75 English words" is outdated for new Claude models: current tokenizer gives ~555k words per 1M tokens (about 1.8 tokens/word). Kazakh costs roughly 2-4x more tokens per word than English.
7. GitHub Student Pack no longer gives Copilot Pro. It gives a restricted **Copilot Student** plan (200 AI credits/month, auto model selection only).
8. Netlify, Railway and Render free tiers all got tighter (credits, $5 trial, 30-day Postgres). Cloudflare is the most generous free host.
9. MCP spec **2026-07-28** made the protocol stateless and deprecated HTTP+SSE, Roots, Sampling, Logging.
10. Ollama's default context is **4,096 tokens**; agentic coding needs 64k+. A typical student laptop cannot run a Claude-Code-grade agent locally.

---

## 1. Models, context windows, prices

### 1.1 Anthropic — VERIFIED
Sources: https://platform.claude.com/docs/en/about-claude/models/overview , https://platform.claude.com/docs/en/about-claude/pricing , https://platform.claude.com/docs/en/about-claude/models/choosing-a-model

| Model | API ID | Context | Max output | Price in/out | Notes |
|---|---|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | 1M | 128k | $10 / $50 | Most capable widely released model; adaptive thinking always on; cache reads $0.25/MTok (2.5% of input). Announced 1 Sep 2026 in "Introducing Claude Fable 5.1 and Claude Mythos 5.1" (VERIFIED on https://www.anthropic.com/news); retirement "not sooner than September 1, 2027" |
| Claude Opus 5 | `claude-opus-5` | 1M | 128k | $5 / $25 | Docs: "start with Claude Opus 5 for most workloads"; fast mode (research preview) $10/$50 |
| Claude Sonnet 5 | `claude-sonnet-5` | 1M | 128k | $2 / $10 | The $2/$10 launch promo became the standard price; planned rise to $3/$15 on 1 Sep 2026 was cancelled |
| Claude Haiku 4.5 | `claude-haiku-4-5-20251001` | 200k | 64k | $1 / $5 | Small/fast model; retirement "not sooner than October 15, 2026" — do not build long-lived demos on it |

- Claude Mythos 5.1: same capability/price as Fable 5.1 but limited to Project Glasswing participants.
- Legacy but available: Fable 5, Opus 4.8/4.7/4.6/4.5, Sonnet 4.6/4.5 ($3/$15).
- 1M context is billed at standard rates on Claude 4.6+ ("A 900k-token request is billed at the same per-token rate as a 9k-token request" — verbatim from the pricing page's "Long context pricing" section).
- Knowledge cutoffs shown on the overview page (reliable / training): Fable 5.1 Jun 2026 / Jun 2026; Opus 5 May 2026 / May 2026; Sonnet 5 Jan 2026 / Jan 2026; Haiku 4.5 Feb 2025 / Jul 2025. Retirement commitments: Fable 5.1 not before 1 Sep 2027, Opus 5 not before 24 Jul 2027, Sonnet 5 not before 30 Jun 2027, Haiku 4.5 not before 15 Oct 2026.
- Batch API = 50% off. Cache read = 10% of input (2.5% on Fable/Mythos 5.1). Web search tool = $10 per 1,000 searches; web fetch = no extra charge.
- Tokenizer: Claude 4.7+ uses a newer tokenizer that "produces approximately 30% more tokens for the same text" (pricing page). Overview page: 1M tokens is roughly 555k words on the current tokenizer vs ~750k words on older models.
- New API users get "a small amount of free credits"; there is no standing free API tier.

### 1.2 OpenAI — prices and context VERIFIED; release dates UNVERIFIED
Sources: https://developers.openai.com/api/docs/pricing , https://developers.openai.com/api/docs/models

| Model | Context | Max output | Price in/out | Notes |
|---|---|---|---|---|
| GPT-6 Astra | 1.05M | 128k | $10 / $50 (cached in $1) | "Our most capable model" per models page; knowledge cutoff 30 Apr 2026; 2x long-context multiplier. Release date 3 Sep 2026 is UNVERIFIED (secondary: https://www.cloudzero.com/blog/openai-pricing/) |
| GPT-5.6 Sol | 1.05M | 128k | $4 / $20 (cached $0.40); pricing page: "promotional pricing is available at least through November 21, 2026" | No regular (post-promo) price is printed on the page. Secondaries' "$5/$30" matches the separate GPT-5.5 row ($5 / $30, <272k context) — do not present it as Sol's future price. Knowledge cutoff 16 Feb 2026 (models page) |
| GPT-5.6 Terra | 1.05M | 128k | $2 / $12 | Balanced tier |
| GPT-5.6 Luna | 1.05M | 128k | $0.20 / $1.20 | Small/cheap tier (price cut 30 Jul 2026 — UNVERIFIED date) |
| GPT-5.4-mini | — | — | $0.75 / $4.50 | Older small |
| GPT-5-mini | — | — | $0.25 / $2.00 | Older small |

- Cached input = 10% of input (VERIFIED: every row on the pricing page, e.g. Astra $1.00 cached vs $10 input). Batch = roughly 50% off, and the page also lists a "Flex" tier at batch-level prices and a "Fast mode" at 2x standard (VERIFIED on https://developers.openai.com/api/docs/pricing).
- openai.com/news returned HTTP 403 to the fetch tool, so launch posts were not opened.

### 1.3 Google Gemini — VERIFIED
Sources: https://ai.google.dev/gemini-api/docs/pricing , https://ai.google.dev/gemini-api/docs/models , https://ai.google.dev/gemini-api/docs/changelog , https://ai.google.dev/gemini-api/docs/rate-limits

| Model | Price in/out | Free tier | Notes |
|---|---|---|---|
| Gemini 3.8 Flash (GA 2 Sep 2026, changelog) | $0.75 / $3.75 "through December 31, 2026", then $1.50 / $7.50 from 1 Jan 2027 | Yes | Changelog: "our most intelligent Flash model, engineered for long-horizon software engineering"; 1,048,576 input / 65,536 output tokens (model page) |
| Gemini 3.7 Flash (GA 13 Aug 2026), 3.6 Flash (GA 21 Jul 2026) | same as above | Yes | |
| Gemini 3.5 Flash (GA 19 May 2026) | $1.50 / $9.00 | Yes | |
| Gemini 3.5 Flash-Lite (GA 21 Jul 2026) | $0.30 / $2.50 | Yes | Small/sub-agent tier |
| Gemini 3.1 Flash-Lite | $0.25 / $1.50 (audio input $0.50) | Yes | |
| Gemini 3.1 Pro Preview (released Feb 2026, model page) | $2 / $12 (<=200k prompt); $4 / $18 (>200k) | **No** | Newest Pro; still labelled preview; 1,048,576 input / 65,536 output tokens |
| Gemini 2.5 Pro | $1.25 / $10 (<=200k); $2.50 / $15 (>200k) | Yes | |
| Gemini 2.5 Flash-Lite | $0.10 / $0.40 | Yes | Cheapest |

- Context: VERIFIED for Gemini 3.8 Flash and 3.1 Pro Preview on their individual model pages (https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash , https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview): input limit 1,048,576 tokens, output limit 65,536 tokens. The models index page itself does not print limits. Other 3.x models assumed the same — UNVERIFIED.
- GA dates above come from https://ai.google.dev/gemini-api/docs/changelog (2 Sep 2026: gemini-3.8-flash; 13 Aug 2026: 3.7 Flash; 21 Jul 2026: 3.6 Flash + 3.5 Flash-Lite; 19 May 2026: 3.5 Flash).
- Free-tier rate limits are no longer published in docs: they "can be viewed in Google AI Studio" (https://aistudio.google.com/rate-limit). Do not quote RPM/RPD numbers from old blog posts.
- Gemini API free tier is still the only first-party frontier-lab API that is free without a card — the practical default for a student workshop.

### 1.4 DeepSeek — VERIFIED
Sources: https://api-docs.deepseek.com/quick_start/pricing , https://huggingface.co/deepseek-ai

| Model | Context | Max output | Input cache-miss | Output | Notes |
|---|---|---|---|---|---|
| `deepseek-flash` (DeepSeek-V4.1-Flash) | 1M | 384k | $0.30 peak / $0.15 off-peak | $1.20 / $0.60 | Thinking + non-thinking; vision; cache hit $0.006 / $0.003 |
| `deepseek-v4-pro` (V4-Pro-0813) | 1M | 384k | $1.32 peak / $0.66 off-peak | $3.96 / $1.98 | No vision |

- Peak = 01:00-04:00 and 06:00-10:00 UTC, Monday-Friday, "excluding Chinese public holidays" (pricing page wording); off-peak is half price. For Kazakhstan (UTC+5) peak is 06:00-09:00 and 11:00-15:00 local; evenings and weekends are off-peak.
- Both support tool calls, JSON output and the **Anthropic API format** (so Anthropic-compatible clients can point at DeepSeek).
- Open weights on Hugging Face: DeepSeek-V4.1-Flash, DeepSeek-V4-Pro-0813 (1.7T), DeepSeek-V4-Flash-0731 (304B). Licence: **MIT** on the DeepSeek-V4.1-Flash model card (VERIFIED, https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash). Parameter count is ambiguous: the org listing auto-counts 763B, but the model card states a 552B backbone that "activates only 8B parameters per token during prefill and 16B during decode" — quote the card, not the listing.

### 1.5 Meta — VERIFIED (pricing), partially UNVERIFIED (history)
Sources: https://dev.meta.ai/docs/pricing-rate-limits , https://en.wikipedia.org/wiki/Llama_(language_model)

- Current API models: `muse-spark-1.3`, `1.2`, `1.1` — **$1.25 / $4.25**, cached input $0.15. Context 1,048,576 tokens (UNVERIFIED; from https://openrouter.ai/meta/muse-spark-1.3 search snippet).
- Standard tier rate limits: 3,000 requests/min, 4M tokens/min. **Contributor tier**: `muse-spark-1.3-contributor` (also `1.2-contributor`) — $0.10 / $0.20, cached input $0.002; the page describes it as heavily discounted pricing in exchange for permission to use your prompts and completions to train future Meta models; 100 requests/min, 3M tokens/min. Good teaching example of "if it's nearly free, your data is the price".
- Muse Spark released April 2026 by Meta Superintelligence Labs as the replacement for Llama in Meta's products (https://en.wikipedia.org/wiki/Llama_(language_model)). Point releases per https://en.wikipedia.org/wiki/Muse_Spark (VERIFIED): 1.1 = 9 Jul 2026, 1.2 = 5 Aug 2026, 1.3 = **2 Sep 2026**. Weights are proprietary/closed; Zuckerberg has said Meta will release Muse Spark 1.2 as open-weight (announced, not shipped). Meta did ship a small open-weight model: **Muse Glimmer**, 30B, Apache 2.0, 10 Aug 2026 (Wikipedia); on Ollama as `muse-glimmer` (18-19 GB, 128k context, 223k pulls; https://ollama.com/library/muse-glimmer).
- Last open Llama: Llama 4 (5 Apr 2025). Scout = 17B active / 109B total, 10M context; Maverick = 17B active / 400B total, 1M context (Wikipedia).

### 1.6 Mistral — VERIFIED
Sources: https://docs.mistral.ai/models/mistral-medium-3-5-26-04 , https://docs.mistral.ai/getting-started/models/models_overview/ , https://mistral.ai/pricing/api (the model price table lives here, not on /pricing)

| Model | Context | Price in/out | Licence |
|---|---|---|---|
| Mistral Medium 3.5 (v26.04, 28 Apr 2026) | 256k | $1.50 / $7.50 | Modified MIT, open weights; "Dense 128B parameters", 80 GB download on Ollama (VERIFIED, https://ollama.com/library/mistral-medium-3.5) |
| Mistral Small 4 (v26.03) | 256k | $0.15 / $0.60 (VERIFIED on https://mistral.ai/pricing/api) | Apache 2.0 |
| Ministral 3 — 3B / 8B / 14B | — | $0.10 / $0.10 · $0.15 / $0.15 · $0.20 / $0.20 (same price in and out) | Apache 2.0; laptop-sized |
| Codestral | — | $0.30 / $0.90 | Premier (closed) code-completion model |

Batch = half price; cached input tokens -90% (both on https://mistral.ai/pricing/api).

### 1.7 Qwen (Alibaba) — VERIFIED
Sources: https://www.alibabacloud.com/help/en/model-studio/model-pricing , https://www.alibabacloud.com/help/en/model-studio/models (Singapore / international deployment)

| Model | Context | Price in/out | Free quota |
|---|---|---|---|
| qwen3.8-max | up to 1M | $2 / $6 | 1M tokens, valid 90 days |
| qwen3.7-plus | up to 1M | $0.40 (0-256k) or $1.20 (256k-1M) / $1.60 | 1M tokens, 90 days |
| qwen3.8-flash | up to 1M | $0.15 / $0.47 | 1M tokens, 90 days |

Open-weight Qwen on Ollama: `qwen3.8` 27B (2.3M pulls), `qwen3.6` 27B/35B (6.7M pulls) — https://ollama.com/search. Qwen3.8-Max being a 2.4T-parameter MoE is UNVERIFIED (https://felloai.com/qwen-pricing/).

### 1.8 One-glance comparison (flagship vs small)

| Lab | Flagship (in/out) | Small/cheap (in/out) | Context |
|---|---|---|---|
| Anthropic | Fable 5.1 $10/$50 (Opus 5 $5/$25) | Haiku 4.5 $1/$5 (Sonnet 5 $2/$10 mid) | 1M (Haiku 200k) |
| OpenAI | GPT-6 Astra $10/$50 | GPT-5.6 Luna $0.20/$1.20 | 1.05M |
| Google | Gemini 3.1 Pro Preview $2/$12; 3.8 Flash $0.75/$3.75 | 2.5 Flash-Lite $0.10/$0.40 | 1M |
| DeepSeek | V4-Pro $1.32/$3.96 peak | V4.1-Flash $0.30/$1.20 peak | 1M |
| Meta | Muse Spark 1.3 $1.25/$4.25 | Contributor tier $0.10/$0.20 | ~1M |
| Mistral | Medium 3.5 $1.50/$7.50 | Small 4 $0.15/$0.60 | 256k |
| Qwen | 3.8-Max $2/$6 | 3.8-Flash $0.15/$0.47 | 1M |

Independent ranking (VERIFIED, https://artificialanalysis.ai/models , Intelligence Index v4.3.2): top = Claude Fable 5.1 (53, at max/xhigh effort; 51 at high) and GPT-6 Astra (53 at max; 52 at xhigh). Best open-weights = GLM-5.3 (45, max), Kimi K3 (44, max), GLM 5.3 Flash (42); 66 of 149 evaluated models are open-weights. Scores depend on the effort setting, so name it on the slide. Teaching point: open weights trail the frontier by a visible but modest gap, and none of the top open models fit on a laptop.

**Worked cost example for a slide** (100k input + 10k output tokens, no caching; roughly "read a mid-size codebase and write a feature"):
Fable 5.1 $1.50 · Opus 5 $0.75 · Sonnet 5 $0.30 · Haiku 4.5 $0.15 · Gemini 3.8 Flash $0.11 · DeepSeek Flash (peak) $0.042 · GPT-5.6 Luna $0.032. Output tokens cost 4-6x input everywhere, and an agent re-sends its whole context every turn, so real agent sessions are dominated by (cached) input.

---

## 2. Tokens, and the Kazakh / Cyrillic "tokenizer tax"

**What a token is.** Models do not read letters or words; text is cut into sub-word pieces from a fixed vocabulary (roughly 100k-260k entries) learned by byte-pair encoding on the training corpus. Frequent strings ("the", " function") become one token; rare strings are split into many. Because training data is mostly English, English compresses best.

**English rules of thumb.**
- Classic: 1 token is about 4 characters or 0.75 words (Anthropic pricing FAQ, https://platform.claude.com/docs/en/about-claude/pricing ; OpenAI uses the same rule, https://help.openai.com/en/articles/4936856 — returned 403 to the fetch tool, UNVERIFIED today).
- Newer Claude tokenizer (Opus 4.7+): 1M tokens is about 555k words, so about **1.8 tokens per English word** vs 1.33 before (https://platform.claude.com/docs/en/about-claude/models/overview). Same price per token, ~30% more tokens per text.
- Measured English fertility in a 2026 study: **1.23 tokens/word**, the mean across the six tokenizers that are publicly available (Llama 4 Maverick, Llama 3.3 70B, Gemma 2 27B, GPT-4o, DeepSeek V3, Qwen3 32B); the paper covers ten models in total but only six for this cross-lingual measurement (https://arxiv.org/html/2605.24718). Corrected from "across ten models".

**Kazakh and Cyrillic evidence (VERIFIED unless marked).**
- Sherkala paper, Table 1 (https://arxiv.org/html/2503.01493): Llama-3.1 tokenizer fertility **Kazakh 4.73**, Russian 2.56, Turkish 2.23 tokens/word. After adding Kazakh tokens (+25% vocabulary): Kazakh **2.04** (-56.8%).
- TurkicNLP paper, Figure 2 (https://arxiv.org/html/2602.19174v2), four tokenizers (Qwen3.5, LLaMA 3, OLMo 3, GPT-5.2) over 20 Turkic languages: Turkish 1.95 (Qwen/GPT-5.2) to 3.03 (LLaMA). "GPT-5.2 and Qwen3.5 consistently achieve the best Turkic coverage" (paper text). Kazakh read off the figure: about 2.5 (GPT-5.2, Qwen3.5), about 3.0 (OLMo 3), about 3.5 (LLaMA 3) — exact Kazakh values UNVERIFIED (figure read-off by a tool).
- "Tokenizer Tax" paper (https://arxiv.org/html/2605.24718): Ukrainian 2.66 tokens/word (range 2.16-3.62 across the six tokenizers), Bulgarian 2.33 (range 1.86-2.84), vs English 1.23 — Cyrillic Slavic text costs about 2.2x English.
- SozKZ paper (https://arxiv.org/html/2603.20854v1): a dedicated Kazakh ByteLevel BPE tokenizer with a 50,257-token vocabulary; the paper states dedicated tokenizers reach fertility "2–3× lower than multilingual alternatives" for Turkic languages.
- Petrov et al., "Language Model Tokenizers Introduce Unfairness Between Languages", NeurIPS 2023 (https://aleksandarpetrov.github.io/tokenization-fairness/): across 17 tokenizers, token-count differences of "up to 15 times" between languages; interactive per-language comparison. Say "up to 15x", not "more than 15x".

**Rule of thumb for the talk.** Kazakh text costs about **2x English on the best modern tokenizers (GPT-5.x, Qwen3.5) and 3.5-4.7x on Llama-family tokenizers**. Reasons: Cyrillic is 2 bytes per letter in UTF-8, Kazakh-specific letters (ә ғ қ ң ө ұ ү һ і) are rare in training data, and Kazakh is agglutinative (one long word = a whole English phrase, e.g. "үйлеріміздегілерге"). Consequences: same prompt costs more, fills the context window faster, and generates slower. Practical advice: write prompts, code comments and CLAUDE.md in English; keep Kazakh for user-facing copy.

**Live demo idea.** Paste the same sentence in English, Russian and Kazakh into https://tiktokenizer.vercel.app/ (gpt-4o / o200k tokenizer, VERIFIED reachable) and show the counts. For Claude, the token-counting endpoint is the accurate source (https://platform.claude.com/docs/en/build-with-claude/token-counting).

---

## 3. Free tiers and limits (hosting, data, GitHub)

### 3.1 Cloudflare — VERIFIED
Sources: https://developers.cloudflare.com/workers/platform/pricing/ , https://developers.cloudflare.com/pages/platform/limits/
- Workers Free: 100,000 requests/day, 10 ms CPU per invocation. No charge for egress/bandwidth.
- Pages Free: 500 builds/month, 1 concurrent build, 20-min build timeout, 20,000 files/site, 25 MiB per file, 100 custom domains/project, 100 projects/account. No bandwidth cap is listed for static assets.
- KV: 100k reads/day, 1k writes/day, 1 GB. D1 (SQLite): 5M rows read/day, 100k rows written/day, 5 GB total. Durable Objects: 100k requests/day (SQLite-backed only). Queues: 10k ops/day. Hyperdrive: 100k queries/day. Workers Logs: 200k events/day, 3-day retention.
- Paid: $5/month (10M requests + 30M CPU-ms included).

### 3.2 Vercel Hobby — VERIFIED (docs last updated 14 Sep 2026)
Source: https://vercel.com/docs/plans/hobby
- 100 GB Fast Data Transfer, 1M edge requests, 1M function invocations, 4 CPU-hours active CPU, 360 GB-hrs memory, 5,000 image transformations per month; 200 projects; 100 deployments/day; function max duration 300 s; runtime logs kept 1 hour.
- **Non-commercial, personal use only.** Exceeding a limit usually means waiting 30 days. Pro = $20/user/month.

### 3.3 Netlify Free — VERIFIED
Sources: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/ , https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- Credit-based: **300 credits/month, hard limit**, no rollover, cannot buy more on Free.
- Rates: production deploy = 15 credits; 1 GB bandwidth = 20; 1 GB-hour compute = 10; 10k web requests = 2. Deploy previews and branch deploys are not metered; forms are free.
- Maths: 20 production deploys alone exhaust the month. When credits hit zero all projects are paused and show "Site not available" until the next cycle.
- Personal $9/month (1,000 credits), Pro $20/month (3,000 credits) — https://www.netlify.com/pricing/.

### 3.4 Railway — VERIFIED
Sources: https://docs.railway.com/reference/pricing/plans , https://docs.railway.com/reference/pricing/free-trial
- Trial: one-time $5 credit, "up to 30 days", whichever ends first. Then Free plan: "$1 of free credit per month. The credit does not roll over month to month." Trial limits per service (plans page): 1 GB RAM, 2 vCPU (shared cores), 0.5 GB volume, max 5 services per project. Free plan after the trial is smaller still: 0.5 GB RAM, 1 vCPU, 0.5 GB volume. Unverified (no GitHub verification) accounts get "restricted outbound network access and only a limited set of ports".
- Hobby: "$5 / month" including "$5 of resource usage per month"; limits 48 GB RAM / 48 vCPU / 5 GB volume; included usage resets each cycle and does not accumulate.

### 3.5 Render — VERIFIED
Source: https://render.com/docs/free
- Free web service: spins down after 15 min idle, about 1 minute cold start; 750 instance-hours/month per workspace; no persistent disk, no SSH.
- Free Postgres: 1 GB, **expires 30 days after creation**, one per workspace, no backups. Free Key Value: in-memory only, one per workspace. Static sites free. Bandwidth and build minutes have monthly included amounts (numbers not captured).

### 3.6 Supabase Free — VERIFIED
Source: https://supabase.com/pricing
- 2 active projects; 500 MB database (shared CPU, 500 MB RAM); 50,000 MAU; 1 GB file storage; 5 GB egress + 5 GB cached egress; 500k edge function invocations; 200 realtime connections, 2M messages.
- **Paused after 1 week of inactivity.** Pro from $25/month.

### 3.7 Neon Free — VERIFIED
Source: https://neon.com/pricing
- 100 projects; 0.5 GB storage per project; 100 CU-hours per project per month; 10 branches; autoscale up to 2 CU (8 GB RAM); mandatory scale-to-zero after 5 min; 5 GB egress per project.
- Paid is pure usage: Launch $0.106/CU-hour, storage $0.35/GB-month, no monthly minimum.

### 3.8 Firebase Spark — VERIFIED
Source: https://firebase.google.com/pricing
- Hosting 10 GB storage, 360 MB/day transfer. Firestore 50k reads, 20k writes, 20k deletes per day, 1 GiB. Auth 50k MAU. Realtime Database 1 GB, 100 simultaneous connections, 10 GB/month download.
- **Cloud Functions, new Cloud Storage buckets and App Hosting need the Blaze (pay-as-you-go) plan.** Precise wording after re-check: the pricing-plans doc (https://firebase.google.com/docs/projects/billing/firebase-pricing-plans) lists "Access to Cloud Functions (no-cost usage quota, then pay-as-you-go pricing for additional usage)" as a Blaze feature; on the pricing table the Spark column shows App Hosting as "Not applicable" and Cloud Storage `*.firebasestorage.app` buckets as "Not applicable" (only legacy `*.appspot.com` buckets keep 5 GB free on Spark). Blaze links a Cloud Billing account, and "Cloud Billing accounts require a payment method" — in practice a card. So the Functions quota is free-ish, but you cannot deploy them without a card on file.

### 3.9 GitHub — VERIFIED
Sources: https://docs.github.com/en/billing/concepts/product-billing/github-actions , https://docs.github.com/en/billing/concepts/product-billing/github-codespaces , https://docs.github.com/en/copilot/get-started/plans , https://docs.github.com/en/copilot/concepts/billing/copilot-requests , https://education.github.com/pack , https://github.com/orgs/community/discussions/189268
- **Actions**: Free = 2,000 min/month + 500 MB artifact storage (private repos); Pro = 3,000 min + 1 GB. Standard runners are free on public repos. Rates: Linux 2-core $0.006/min, Windows $0.010, macOS $0.062.
- **Codespaces**: Free = "120 hrs" compute + "15 GB-month" storage; Pro (what students get) = "180 hrs" + "20 GB-month" (docs table, column "Compute time per month"). The phrase "core hours" no longer appears on the billing page; it only says compute cost "is proportional to the number of processor cores". The old rule "120 core-hours = 60 h on a 2-core machine (Free) / 90 h (Pro)" is therefore UNVERIFIED as worded — say "about 120 hours of the smallest machine" or check the Codespaces usage page in your own account before quoting. Overage: 2-core $0.18/h, 4-core $0.36/h, storage $0.07/GB-month.
- **Copilot plans**: Free ($0; "Limited to 2000 completions per month", "An allowance of GitHub AI Credits", "Auto model selection only", excludes third-party agents); **Student** ($0 for verified students; "An allowance of GitHub AI Credits" — the plans page prints no number, the 200/month figure comes from the March 2026 announcement below; "Auto model selection only"; excludes third-party agents; completions are not capped on the plans page, but "unlimited" is not stated — UNVERIFIED); Pro $10 (1,500 credits = 1,000 base + 500 flex); Pro+ $39 (7,000 = 3,900 + 3,100); Max $100 (20,000 = 10,000 + 10,000); Business $19/seat (1,900/user); Enterprise $39/seat (3,900/user). The switch from premium requests to AI Credits happened around 1 Jun 2026: GitHub docs refer to subscribers "who remained on legacy premium request-based billing after June 1, 2026" (https://docs.github.com/en/copilot/concepts/billing/copilot-requests) — indirect evidence, exact all-plans date UNVERIFIED.
- **Student Developer Pack and AI**: includes Copilot Student, not Copilot Pro. Discussion "Important Updates to GitHub Copilot for Students" by martinwoodward, posted 11 Mar 2026, effective 12 Mar 2026: students can no longer manually select GPT-5.3-Codex, GPT-5.4, Claude Opus or Claude Sonnet; they remain reachable only through Auto mode; 200 monthly AI Credits effective 1 Jun 2026. Reactions on the post at fetch time: 94 thumbs-up, **6,796 thumbs-down**, 1,003 confused; 1,737 comments. No other AI coding tool (Claude, Cursor, etc.) appears in the pack listing as fetched.
- Pack extras relevant to a build-along: Codespaces at Pro level; free domain from Namecheap (.me, 1 year), .TECH (1 year) or Name.com (.dev/.app etc.); Azure $100 credit (18+); Heroku $13/month for 24 months; JetBrains IDEs; DataCamp 3 months.

### 3.10 Recommended zero-cost stack for a Kazakhstan student (synthesis, my judgment)
GitHub (public repo, free Actions) + Cloudflare Pages/Workers + D1 (or Neon / Supabase for Postgres) + Gemini API free tier for LLM calls. No card required for any of these. Avoid for beginners: Netlify Free (deploys burn credits), Render free Postgres (deleted after 30 days), Firebase Functions (needs Blaze card), Vercel Hobby for anything that earns money.

---

## 4. Local LLMs: Ollama, LM Studio, and the student laptop

**Ollama** — VERIFIED. Sources: https://docs.ollama.com/faq , https://ollama.com/search , https://ollama.com/pricing , https://docs.ollama.com/integrations/claude-code
- Local inference is free and private: prompts are not sent to ollama.com unless you pick a `:cloud` model.
- **Default context window = 4,096 tokens** (`OLLAMA_CONTEXT_LENGTH` to change). `ollama ps` shows the GPU/CPU split. Windows model path: `C:\Users\<user>\.ollama\models`.
- Ollama Cloud (https://ollama.com/pricing): Free plan has starter usage credits and 1 concurrent request; Pro "$20 / mo." with "$60 of usage credits per month" and 3 concurrent requests; Max "$100 / mo." with "$300 of usage credits per month" and 10 concurrent; Team $500/mo ($1,000 credits, shared).
- Claude Code integration (https://docs.ollama.com/integrations/claude-code): `ollama launch claude`, or set all three of `ANTHROPIC_AUTH_TOKEN=ollama`, `ANTHROPIC_API_KEY=""` and `ANTHROPIC_BASE_URL=http://localhost:11434`, then `claude --model <model>` (the docs' example is `claude --model qwen3.5`). Docs: "For larger repositories, set the context length to 64k or higher."
- Popular library models now: qwen3.6 (27B/35B; 6.7M pulls), qwen3.8 (27B), gemma4, gpt-oss, granite4.1/4.2 (3B/8B/30B), nemotron-3.5-lightning (30B, 3B active), mistral-medium-3.5 (128B), plus cloud-only giants (glm-5.3, deepseek-v4-pro, kimi-k2.6).

**LM Studio** — VERIFIED. Source: https://lmstudio.ai/docs/app/system-requirements
- macOS: Apple Silicon (M1-M4) only, "macOS 14.0 or newer is required", "16GB+ RAM recommended" (the claim that 8 GB Macs work with small models is not on the current requirements page — UNVERIFIED). Windows: x64 with AVX2 required, or ARM (Snapdragon X Elite); "At least 16GB of RAM is recommended"; "at least 4GB of dedicated VRAM is recommended". Linux: "Ubuntu 20.04 or newer is required".
- GUI app with a model browser and a local OpenAI-compatible server; easier than Ollama for non-terminal users.

**Sizing rule of thumb.** A 4-bit quantised model needs about 0.6-0.7 GB of memory per billion parameters plus 1-2 GB for context. Anchor (VERIFIED): `gpt-oss:20b` is a 14 GB download (MXFP4, 4.25 bits/param) and runs with "as little as 16GB memory"; `gpt-oss:120b` is 65 GB and needs an 80 GB GPU (https://ollama.com/library/gpt-oss).

**Gemma 4 sizes on Ollama** (VERIFIED as listed, https://ollama.com/library/gemma4): e2b 7.2 GB, e4b 9.6 GB, 12b 7.6 GB, 26b 19 GB, 31b 20 GB; 128k-256k context; vision, tools, thinking. Note: blog guides claim E2B needs only ~3 GB RAM (https://pactentia.com/blog/best-local-llm-8gb-ram-laptops-2026, UNVERIFIED), which conflicts with the 7.2 GB download listed — test on a real laptop before promising it.

**What a typical student laptop can do** (8-16 GB RAM, integrated graphics, no dedicated GPU):
- 8 GB: 1-4B models (Granite 3B, Ministral 3B, Qwen small, Phi-4-mini). Fine for chat, summarising, explaining code; weak at multi-file agent work. Model picks from secondary guides are UNVERIFIED.
- 16 GB: 7-14B models, or gpt-oss:20b with everything else closed. CPU-only speed is typically single-digit to low-teens tokens/second (UNVERIFIED; depends heavily on hardware).
- 16 GB+ Apple Silicon or an 8 GB+ NVIDIA GPU: usable 12-30B models; the first tier where local coding agents become bearable.
- Honest framing for the masterclass: local models are for privacy, offline work, zero cost and learning how LLMs work. Hosted frontier models remain far better for agentic coding; agent loops need 64k+ context and reliable tool calling, both hard on small local models. Kazakh quality on small local models is also clearly worse than on frontier models (tokenizer tax plus little Kazakh training data).

---

## 5. MCP (Model Context Protocol) — current state

Sources (VERIFIED): https://modelcontextprotocol.io/specification/latest , https://blog.modelcontextprotocol.io/posts/2026-07-28/ , https://registry.modelcontextprotocol.io/ , https://github.com/modelcontextprotocol/servers , https://en.wikipedia.org/wiki/Model_Context_Protocol

- **Current spec version: `2026-07-28`** (published 28 Jul 2026; https://modelcontextprotocol.io/specification/versioning lists it as the current revision). Previous handshake-based revisions are "2025-11-25 and earlier" (same page) — VERIFIED.
- Headline change: MCP is now **stateless at the protocol layer**. The initialize handshake and `Mcp-Session-Id` are gone; every request carries protocol version and client capabilities in `_meta`. Added: Multi Round-Trip Requests (replaces server-initiated calls), `Mcp-Method` / `Mcp-Name` headers for gateway routing, cacheable list results (`ttlMs`, `cacheScope`), authorization hardening.
- **Deprecated** (12-month minimum support window): Roots, Sampling, Logging; Dynamic Client Registration (moving to Client ID Metadata Documents); the legacy HTTP+SSE transport.
- What servers offer: **Resources, Prompts, Tools**. What clients offer: **Elicitation**. Wire format: JSON-RPC 2.0. Transports: stdio (local) and Streamable HTTP (remote).
- Official extensions: **Tasks** (long-running async work), **MCP Apps** (interactive UI rendered inside the chat), Enterprise Managed Authorization; "Skills over MCP" is a working group.
- SDKs: Tier 1 = TypeScript, Python, Go, C# (all updated to 2026-07-28); Rust in beta. About 500M monthly downloads across Tier 1 SDKs; TypeScript and Python each passed 1B total downloads (MCP blog).
- Governance: launched by Anthropic 25 Nov 2024; adopted by OpenAI (Mar 2025) and Google DeepMind (Apr 2025); donated in Dec 2025 to the **Agentic AI Foundation** under the Linux Foundation (co-founded by Anthropic, Block, OpenAI). MCP Dev Summit, New York, Apr 2026, about 1,200 attendees (Wikipedia).
- **Registry: https://registry.modelcontextprotocol.io/** — official; REST API at `/v0/servers` (VERIFIED: returns JSON with `count` and `nextCursor`; entries are per server version, with `remotes` of type `streamable-http`). Total server count not shown on the page.
- Reference servers repo (90.5k stars, 11.7k forks at fetch time): Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time. Thirteen older ones (AWS KB Retrieval, Brave Search, EverArt, GitHub, GitLab, Google Drive, Google Maps, PostgreSQL, Puppeteer, Redis, Sentry, Slack, SQLite) were moved to https://github.com/modelcontextprotocol/servers-archived; vendors now ship their own.
- Popular servers in 2026 (UNVERIFIED — aggregated from listicles: https://www.firecrawl.dev/blog/best-mcp-servers-for-developers , https://uibakery.io/blog/best-mcp-servers , https://www.tembo.io/blog/best-mcp-servers): GitHub, Playwright (Microsoft), Context7 (live library docs), Filesystem, Supabase / Postgres, Figma, Notion, Linear, Sentry, Stripe, Cloudflare, Vercel, Firecrawl. Trend: vendor-hosted remote servers with OAuth instead of local installs.
- Security point to teach: tool descriptions and tool results are untrusted input. The spec itself says tools "represent arbitrary code execution" and must be treated with caution. Prompt injection and data exfiltration through poisoned tools were documented from April 2025 onward. Install only servers from vendors you trust; read the permissions.

---

## 6. AI concepts in plain language (one analogy each)

**LLM (large language model).** An LLM is a program trained on a huge amount of text to predict what comes next, one piece at a time. From that single skill it learned grammar, facts, code and reasoning patterns. It does not look answers up in a database; it generates them from patterns stored in billions of numbers called weights. Analogy: a very well-read person playing "finish my sentence" — brilliant, fast, and occasionally confidently wrong.

**Token.** A token is the unit a model actually reads and writes: a common word, a piece of a word, or a punctuation mark. You pay per token and every limit is counted in tokens, not characters or words. English averages roughly 1.2-1.8 tokens per word depending on the tokenizer; Kazakh needs about 2-4x more for the same meaning. Analogy: LEGO bricks — English has many big pre-moulded pieces, while Kazakh text gets assembled from lots of tiny 1x1 bricks, so the same wall takes more bricks.

**Context window.** The context window is everything the model can see at once: your instructions, the conversation, files it has read, tool outputs, and its own reply. Current models hold up to about 1M tokens, but anything outside the window does not exist for the model, and very full windows make it slower, pricier and less precise. Coding agents manage this by summarising ("compacting") old material. Analogy: a desk — only papers lying on the desk can be used, and when it overflows something has to be filed away.

**Temperature.** Temperature controls how much randomness is used when picking the next token. Near 0 the model almost always takes the most likely option, so outputs are repeatable; higher values let less likely options through, which adds variety and also risk. Use low values for code and data extraction, higher for brainstorming; some reasoning models fix this setting themselves. Analogy: a chef who follows the recipe exactly at 0 and improvises more the higher you turn the dial.

**Hallucination.** A hallucination is output that sounds right but is invented: a library function that does not exist, a fake citation, a wrong price. It happens because the model generates plausible text rather than checking a source, and it rarely signals that it is unsure. The defences are grounding (give it the docs, let it search, let it run the code) and verification (tests, links, your own eyes). Analogy: a student who did not study but still writes a fluent, confident exam answer.

**Tool use (function calling).** On its own a model can only produce text. With tool use, you describe functions it may call (read a file, run a command, query an API); the model replies with a structured request, your program executes it, and the result goes back to the model. This is what turns a chatbot into something that can act in the real world. Analogy: a head chef who never touches the stove but calls out precise orders to the kitchen and tastes what comes back.

**RAG (retrieval-augmented generation).** RAG means first searching your own documents for passages relevant to the question, then pasting them into the prompt so the model answers from them. It gives the model fresh or private knowledge without retraining, and lets it cite where an answer came from. Quality depends mostly on the search step: bad retrieval, bad answer. Analogy: an open-book exam — the student is the same, but now the right page is open in front of them.

**Embeddings.** An embedding turns a piece of text into a long list of numbers such that texts with similar meaning end up with nearby numbers. That enables search by meaning instead of exact keywords, which is how most RAG systems find relevant passages; it works across languages too. Embeddings are produced by small, cheap models and stored in a vector database. Analogy: GPS coordinates for meaning — "cheap flat in Almaty" and "недорогая квартира в Алматы" land on the same street.

**Fine-tuning vs prompting.** Prompting changes what you tell the model; fine-tuning changes the model itself by training it further on your examples. Prompting (plus RAG and tools) is instant, cheap and reversible, and with today's models it solves the great majority of tasks. Fine-tuning is worth it for a fixed style or format at very high volume, or to make a small model good at one narrow job; it is a poor way to add facts. Analogy: prompting is briefing a skilled contractor each morning; fine-tuning is sending them back to trade school for a month.

**Reasoning models.** Reasoning models spend extra tokens thinking through a problem — planning, trying approaches, checking themselves — before they answer. That makes them much stronger at maths, debugging and multi-step planning, but slower and more expensive, because you pay for the thinking tokens. In 2026 this is a dial rather than a separate product: Claude's adaptive thinking with an effort setting, GPT's reasoning levels, Gemini's thinking budget. Analogy: the difference between blurting out an answer and working it through on scratch paper first.

**The agent loop.** An agent is a model running in a loop: look at the goal and current state, choose an action (a tool call), observe the result, repeat until the task is done or it needs you. Claude Code works this way: read files, edit, run tests, read the error, fix, run again. The power comes from feedback, because the model sees real results instead of guessing; the risk is that mistakes compound, which is why permissions, tests and git checkpoints matter. Analogy: a mechanic, not an oracle — try something, listen to the engine, adjust, try again.

**MCP (Model Context Protocol).** MCP is an open standard for plugging external tools and data into AI apps: one server for GitHub, Figma or your database works in Claude Code, ChatGPT, Cursor and other clients. A server exposes tools (actions), resources (data) and prompts (templates) over JSON-RPC; the AI app is the client. It began at Anthropic in November 2024, is now governed by the Linux Foundation's Agentic AI Foundation, and the current spec is 2026-07-28. Analogy: USB-C for AI — one connector standard instead of a custom cable for every device pair.

---

## 7. Engineering basics in plain language (one analogy each)

**Terminal.** The terminal is a text window where you type commands to the computer instead of clicking. It looks old-fashioned, but it is precise, scriptable and works the same on a server on the other side of the planet. It matters more now because AI coding agents work through the terminal: they run the same commands you would. Analogy: clicking is pointing at a menu; the terminal is speaking the language — slower to learn, far more you can say.

**Git.** Git is a version-control system: it records snapshots of your project so you can see what changed, when and why, and return to any earlier state. It runs on your own machine and needs no internet or account. With AI agents editing dozens of files at once, git is the safety net that makes bold experiments cheap to undo. Analogy: save points in a video game — before the boss fight you save, and if it goes badly you reload.

**Repo (repository).** A repository is a project folder plus its full git history. It can live only on your laptop or also on a hosting service such as GitHub, where others can copy (clone) it and contribute. One product is usually one repo; the hidden `.git` folder inside is where the history is stored. Analogy: a project binder that contains every previous version of every page.

**Branch.** A branch is a parallel line of work inside a repo. You create one to build a feature or try an idea without touching the stable version, usually called `main`. If the idea works you merge it back; if not you delete the branch and nothing is harmed. Analogy: photocopying the master document to scribble on, then transferring only the good edits to the original.

**Commit.** A commit is one saved snapshot in git: the exact state of the files plus a short message explaining the change. Small, frequent commits with clear messages make it easy to find where a bug appeared and to undo just that step. When working with an AI agent, commit before each big request so you can always roll back. Analogy: a diary entry with a photo attached — "added login form", dated and signed.

**Pull request (PR).** A pull request is a proposal to merge one branch into another, usually on GitHub. It shows exactly which lines changed, lets teammates or AI reviewers comment, and runs automated checks before anything reaches `main`. Even solo builders use PRs as a checkpoint for reviewing what the agent actually wrote. Analogy: handing a draft to an editor before it goes to print.

**Environment variables.** Environment variables are named values that live outside your code and are handed to the program when it starts — API keys, database addresses, settings like `NODE_ENV=production`. They keep secrets out of the repository and let the same code behave differently on your laptop and on the server. Locally they usually sit in a `.env` file that must be listed in `.gitignore`; on a host you enter them in the dashboard. Analogy: the office keys stay with the security guard, not taped to the front door.

**Package manager.** Almost no one writes everything from scratch; a package manager downloads the libraries your project depends on, and the libraries those depend on, at compatible versions. Examples are npm, pnpm and bun for JavaScript, pip and uv for Python. It records exact versions in a lock file so every machine installs the same thing. Analogy: an app store for code building blocks — one command instead of hunting for downloads by hand.

**Frontend.** The frontend is the part of an app that runs on the user's device and that they see and touch: pages, buttons, forms, animations. On the web it is built from HTML (structure), CSS (appearance) and JavaScript (behaviour), often with a framework such as React, Astro or Svelte. It should never hold secrets, because anyone can open the browser's developer tools and read it. Analogy: the dining room of a restaurant — menu, tables and waiters, everything the guest experiences.

**Backend.** The backend is the code that runs on a server, out of the user's sight: it checks who you are, applies the business rules, talks to the database and calls paid services such as an LLM API. Secrets live here, not in the frontend. It can be a long-running server or small serverless functions (Cloudflare Workers, Vercel Functions) that wake up per request. Analogy: the restaurant kitchen — guests never enter it, but every dish comes from there.

**API.** An API is a defined way for one program to ask another to do something, usually over the internet: send a request in an agreed format, get structured data (typically JSON) back. Your frontend talks to your backend through an API, and your backend talks to Claude or Gemini through theirs. An API key identifies you and is how usage gets billed. Analogy: the waiter and the menu — you cannot walk into the kitchen, but you can order anything on the menu and it arrives in a predictable form.

**Database.** A database stores your app's information so it survives restarts and can be searched quickly: users, orders, messages. Most apps use a relational (SQL) database such as Postgres or SQLite, where data sits in tables and you query it with SQL. Hosted options with free tiers — Supabase, Neon, Cloudflare D1 — mean you never manage a server yourself. Analogy: a well-organised warehouse with an index, rather than a pile of boxes in the corridor.

**DNS.** DNS is the internet's directory that translates a human-readable domain name into the numeric IP address of the server that hosts it. When you buy a domain you add DNS records (A, CNAME, TXT) pointing it at your host. Changes can take from minutes to hours to spread because answers are cached worldwide. Analogy: the contacts app on your phone — you tap "Mum" and the phone dials the number you never memorised.

**Deploy.** Deploying means taking the code from your laptop and putting it on servers where real users can reach it at a URL. Modern hosts such as Cloudflare Pages, Vercel and Netlify deploy on every `git push`: they pull the repo, build it and publish it in a minute or two, with a preview URL for every branch. "It works on my machine" is not done; deployed is done. Analogy: moving from rehearsing in your room to opening night on stage.

**CI/CD.** Continuous integration and continuous deployment are automation that runs whenever code changes: install dependencies, run tests and linters, build, and if everything passes, deploy. It lives in the repo as a config file (for example GitHub Actions workflows) and runs on the host's machines, with 2,000 free minutes a month on GitHub Free. It is how teams — and AI agents — ship many times a day without breaking things. Analogy: a factory conveyor belt with a quality-control station that stops defective items before they leave the building.

**Tests.** Tests are small programs that run your code and check that it does what you expect: given this input, that output. Unit tests check one function; end-to-end tests click through the real app in a browser. For vibecoding they are the most important guardrail, because they give the agent an objective "done" signal and catch the moment a new change silently breaks an old feature. Analogy: a pilot's pre-flight checklist — boring, fast, and the reason the plane does not fall out of the sky.

**Logs.** Logs are the timestamped messages a program writes while it runs: requests received, errors thrown, values you chose to print. When something breaks in production you cannot attach a debugger to a user's session, so you read the logs. Pasting the exact error text and surrounding log lines to an AI agent is the single fastest way to get a correct fix. Analogy: an aircraft's black-box recorder — nobody looks at it until something goes wrong, and then it is the only witness.

---

## 8. Corrections to common or outdated claims

1. "Students get Copilot Pro free via the Student Pack." Outdated since 12 Mar 2026: it is the Copilot Student plan — 200 AI Credits/month, auto model selection only, no manual choice of Claude or top GPT models. https://github.com/orgs/community/discussions/189268
2. "1 token is 0.75 words." Still fine for OpenAI-style estimates, but Claude 4.7+ uses a tokenizer producing about 30% more tokens (1M tokens is about 555k words). https://platform.claude.com/docs/en/about-claude/models/overview
3. "Claude Sonnet costs $3/$15." Sonnet 5 is $2/$10 and the announced rise was cancelled. Opus is $5/$25, not the old $15/$75.
4. "Meta = open-source Llama." Meta's current frontier model, Muse Spark 1.3 (2 Sep 2026), is closed-weight and API-only ($1.25/$4.25). Llama 4 (Apr 2025) was the last Llama release. But do not overcorrect: Meta released the open-weight Muse Glimmer (30B, Apache 2.0) in Aug 2026 and has said Muse Spark 1.2 will be open-weighted. https://en.wikipedia.org/wiki/Muse_Spark
5. "Google's best model is Gemini Pro." The newest GA models are Flash (3.8 Flash, Sep 2026); the newest Pro is still 3.1 Pro Preview and has no free tier.
6. "Long context costs extra." Depends on the vendor: Anthropic bills 1M context at standard rates on 4.6+; Google Pro doubles input above 200k; OpenAI applies a 2x long-context multiplier.
7. "Netlify free = 100 GB bandwidth + 300 build minutes." Now 300 credits/month; each production deploy costs 15 credits; sites are paused at zero.
8. "Railway has a free tier." It is a one-time $5 trial for up to 30 days, then $1/month of credit.
9. "Render's free Postgres lasts 90 days." It expires 30 days after creation.
10. "Gemini free tier is 15 RPM / 1,500 requests a day." Google no longer publishes fixed numbers in docs; limits are per project and shown in AI Studio.
11. "MCP uses SSE and a session handshake." The 2026-07-28 spec is stateless; HTTP+SSE, Roots, Sampling and Logging are deprecated.
12. "You can run Claude Code on a free local model on any laptop." Technically yes (`ollama launch claude`), but Ollama defaults to 4,096 context, agents need 64k+, and 8-16 GB laptops only fit small models that handle agent work poorly.
13. "DeepSeek is $0.27/$1.10 with 64k context." Now V4.1-Flash at $0.30/$1.20 peak (half off-peak), 1M context, 384k max output.
14. "Firebase free tier covers a full-stack app." Cloud Functions, new (`*.firebasestorage.app`) Cloud Storage buckets and App Hosting require the Blaze plan, which needs a Cloud Billing account with a payment method. Functions keep a no-cost quota inside Blaze, but Spark alone cannot deploy them.
15. "Vercel Hobby is fine for my startup." Hobby is restricted to non-commercial personal use.

---

## Visual candidates

| URL | What it shows | Teaching point |
|---|---|---|
| https://platform.claude.com/docs/en/about-claude/models/overview | Official comparison table: Fable 5.1 / Opus 5 / Sonnet 5 / Haiku 4.5 with price, 1M context, knowledge cutoffs | "Which model do I pick?"; models have knowledge cutoffs, so they need web search and docs |
| https://platform.claude.com/docs/en/about-claude/pricing | Full price table incl. cache and batch columns | Output costs 5x input; caching and batch change the economics of agents |
| https://developers.openai.com/api/docs/pricing | GPT-6 Astra and GPT-5.6 Sol/Terra/Luna price list | Flagship vs small tier: 50x price spread inside one vendor |
| https://ai.google.dev/gemini-api/docs/pricing | Gemini table with Free vs Paid columns | The free tier students can actually use; promo pricing with end dates goes stale |
| https://api-docs.deepseek.com/quick_start/pricing | Peak / off-peak price table, 1M context | Open-weight challengers are 10-30x cheaper; time-of-day pricing |
| https://dev.meta.ai/docs/pricing-rate-limits | Standard vs "Contributor" tier ($0.10/$0.20) | If it is nearly free, your data is the payment |
| https://artificialanalysis.ai/models | Intelligence Index chart: Fable 5.1 and GPT-6 Astra at 53, best open weights (GLM-5.3) at 45 | Frontier vs open-weights gap; how to read a leaderboard sceptically |
| https://tiktokenizer.vercel.app/ | Live tokenizer with coloured token boundaries | Live demo: same sentence in English, Russian, Kazakh — watch the count grow |
| https://aleksandarpetrov.github.io/tokenization-fairness/ | Interactive per-language "tokenization premium" tool | Tokenizers are unfair across languages; some need over 15x English |
| https://arxiv.org/html/2503.01493 (Table 1) | Sherkala paper: Kazakh fertility 4.73 on Llama-3.1 vs 2.04 with extended vocabulary | Hard evidence for the Kazakh tokenizer tax, from a Kazakh-LLM paper |
| https://arxiv.org/html/2602.19174v2 (Figure 2) | Fertility chart of four tokenizers across 20 Turkic languages | Kazakh next to Turkish, Uzbek, Kyrgyz; GPT-5.2 and Qwen are best, LLaMA worst |
| https://github.com/orgs/community/discussions/189268 | GitHub's "Important Updates to GitHub Copilot for Students" post with 6,796 downvotes vs 94 upvotes | Free AI perks get cut; do not build your workflow on one vendor's generosity |
| https://education.github.com/pack | Student Developer Pack offer grid (Copilot Student, Codespaces, free domains, Azure credit) | What a student in Kazakhstan can claim today for $0 |
| https://docs.github.com/en/copilot/get-started/plans | Copilot plan matrix: Free / Student / Pro / Pro+ / Max with AI Credits | The industry-wide move from "unlimited" to credit-based AI pricing |
| https://vercel.com/docs/plans/hobby | Hobby included-usage table and the "non-commercial" clause | Read the free-tier fine print before you launch |
| https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ | Credit rules: 15 credits per production deploy, sites paused at zero | Free tiers change; 20 deploys can use up a month |
| https://developers.cloudflare.com/workers/platform/pricing/ | Workers / KV / D1 free allowances, "no charge for egress" | Why this project's stack sits on Cloudflare |
| https://blog.modelcontextprotocol.io/posts/2026-07-28/ | Blog header and summary of the 2026-07-28 spec (stateless core, deprecations) | MCP is a living standard with versions; check the spec date |
| https://registry.modelcontextprotocol.io/ | Official MCP Registry search UI | Where to find servers; prefer official vendor entries |
| https://github.com/modelcontextprotocol/servers | Reference servers repo, 90.5k stars, list of 7 reference servers | Scale of the ecosystem; reference vs vendor vs community servers |
| https://ollama.com/search | Model library with sizes and pull counts (qwen3.6 6.7M pulls, many ":cloud" giants) | What "local model" means in 2026 and how big the good ones are |
| https://ollama.com/library/gpt-oss | gpt-oss 20b = 14 GB / 16 GB RAM; 120b = 65 GB / 80 GB GPU | The memory maths of running models on your own laptop |
| https://docs.ollama.com/integrations/claude-code | `ollama launch claude` and the 64k-context recommendation | Claude Code can point at other models; why context size matters for agents |
| https://lmstudio.ai/docs/app/system-requirements | Minimum specs: 16 GB RAM, AVX2, 4 GB VRAM | Check your laptop before the workshop |
| https://x.com/karpathy/status/1886192184808149383 | Andrej Karpathy's 2 Feb 2025 post that coined "vibe coding". Status ID confirmed against the `cite tweet` reference in https://en.wikipedia.org/wiki/Vibe_coding (number=1886192184808149383, dated 2 February 2025), and the ID's embedded snowflake timestamp decodes to 2025-02-02 23:17:15 UTC. X itself returned HTTP 402 to the fetch tool, so the post's current availability is UNVERIFIED — screenshot it manually. Opening line per Wikipedia: "There's a new kind of coding I call 'vibe coding'" | Origin of the term; opening slide |
| https://en.wikipedia.org/wiki/Muse_Spark | Release timeline 1.1 / 1.2 / 1.3 and the proprietary-vs-open-weight note (Muse Glimmer) | Even "open" labs change course; check who still ships weights |

---

## Fact-check log (21 Sep 2026, adversarial pass)

Method: for each claim likely to appear on a slide, the primary source was re-opened with WebFetch and read for the exact figure or wording; secondary sources were only used where the primary could not be reached. WebSearch was unavailable (session budget exhausted), so every check below is a direct page open. "HELD" = the file was right; "FIXED" = the file was changed; "REFINED" = right but imprecise, wording tightened; "UNVERIFIED" = could not be confirmed on a primary source and is now marked as such in the body.

| # | Claim checked | Source opened | Outcome |
|---|---|---|---|
| 1 | Anthropic price table: Fable 5.1 $10/$50, Opus 5 $5/$25, Sonnet 5 $2/$10, Haiku 4.5 $1/$5; Fable cache read $0.25 (0.025x); Sonnet 5 $3/$15 rise cancelled; batch 50%; web search $10/1k; web fetch free; "1 token ≈ 4 chars / 0.75 words"; free credits for new users | https://platform.claude.com/docs/en/about-claude/pricing | HELD on every number. The Sonnet 5 note reads: introductory pricing "through August 31, 2026, is now the standard price"; the "$3/$15 ... on September 1, 2026 will not occur". Fast mode $10/$50 applies to Opus 5 and Opus 4.8. |
| 2 | Tokenizer: "approximately 30% more tokens" (Claude 4.7+); 1M tokens ≈ 555k words vs ~750k before; 1M context / 128k output; Haiku 4.5 200k / 64k, retirement not before 15 Oct 2026; API IDs; "start with Claude Opus 5" | https://platform.claude.com/docs/en/about-claude/models/overview and pricing page | HELD. Exact wording: "This tokenizer produces approximately 30% more tokens for the same text." and "1M tokens is roughly 555k words or 2.5M Unicode characters on the current tokenizer (introduced with Claude Opus 4.7); models before it fit about 750k words". REFINED: the 900k/9k sentence is verbatim, not a paraphrase; knowledge cutoffs and retirement dates added. |
| 3 | Fable 5.1 announced 1 Sep 2026 | https://www.anthropic.com/news | HELD, upgraded from unopened to VERIFIED: "Introducing Claude Fable 5.1 and Claude Mythos 5.1", September 1, 2026. |
| 4 | OpenAI: GPT-6 Astra $10/$50 (cached $1), 1.05M / 128k, cutoff 30 Apr 2026, "Our most capable model"; Sol $4/$20 promo through 21 Nov 2026; Terra $2/$12; Luna $0.20/$1.20; GPT-5.4-mini $0.75/$4.50; GPT-5-mini $0.25/$2; 2x long-context multiplier; cached = 10%; batch 50% | https://developers.openai.com/api/docs/pricing , https://developers.openai.com/api/docs/models | HELD on all prices and limits. FIXED: batch discount and cached-input ratio were marked UNVERIFIED and are now verified on the primary page. FIXED: the "$5/$30 regular price" for Sol quoted by secondaries is actually the GPT-5.5 row; no post-promo Sol price is printed. Release dates remain UNVERIFIED (not on either page). |
| 5 | Gemini: 3.8 Flash $0.75/$3.75 through 31 Dec 2026 then $1.50/$7.50, free tier yes; 3.7/3.6 same; 3.5 Flash $1.50/$9; 3.5 Flash-Lite $0.30/$2.50; 3.1 Flash-Lite $0.25/$1.50; 3.1 Pro Preview $2/$12 & $4/$18, no free tier; 2.5 Pro $1.25/$10 & $2.50/$15; 2.5 Flash-Lite $0.10/$0.40 | https://ai.google.dev/gemini-api/docs/pricing | HELD on every row. |
| 6 | Gemini release months (3.8 Flash Sep, 3.7 Aug, 3.6 Jul, 3.5 May, 3.5 Flash-Lite Jul 2026) and "most intelligent Flash model" quote; 1M context | https://ai.google.dev/gemini-api/docs/changelog , https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash , .../gemini-3.1-pro-preview | HELD and REFINED with exact GA dates (2 Sep, 13 Aug, 21 Jul, 19 May 2026). FIXED: 1M context was UNVERIFIED; model pages show 1,048,576 input / 65,536 output for 3.8 Flash and 3.1 Pro Preview. |
| 7 | DeepSeek: deepseek-flash = V4.1-Flash $0.30/$1.20 peak, $0.15/$0.60 off-peak, cache hit $0.006/$0.003; V4-Pro $1.32/$3.96 & $0.66/$1.98; 1M context, 384k output; peak 01:00-04:00 & 06:00-10:00 UTC Mon-Fri; Anthropic API format; vision Flash-only | https://api-docs.deepseek.com/quick_start/pricing | HELD. REFINED: peak-hour rule also says "excluding Chinese public holidays". Kazakhstan local-time conversion (UTC+5 → 06:00-09:00, 11:00-15:00) re-computed and correct. |
| 8 | DeepSeek open weights: 763B / 1.7T / 304B; licence unknown | https://huggingface.co/deepseek-ai , https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash | FIXED: licence is MIT on the V4.1-Flash card (was UNVERIFIED). FIXED: card states 552B backbone with 8B/16B active, while the org listing auto-counts 763B — both now shown. |
| 9 | Meta: Muse Spark 1.3/1.2/1.1 $1.25/$4.25, cached $0.15; contributor tier $0.10/$0.20, 100 rpm; closed weights; 1.3 dated 2 Sep 2026; Llama 4 = 5 Apr 2025, Scout 17B/109B/10M, Maverick 17B/400B/1M; Muse Spark Apr 2026 by MSL | https://dev.meta.ai/docs/pricing-rate-limits , https://en.wikipedia.org/wiki/Muse_Spark , https://en.wikipedia.org/wiki/Llama_(language_model) | HELD on prices, limits and Llama facts. FIXED: 1.3 date (2 Sep 2026) and closed-weight status are now VERIFIED via Wikipedia (1.1 = 9 Jul, 1.2 = 5 Aug 2026); the codersera secondary was dropped. FIXED (omission): Meta released the open-weight Muse Glimmer (30B, Apache 2.0, 10 Aug 2026) — the "Meta = closed" framing in sections 0, 1.5 and 8 was softened. Contributor cached input $0.002 and standard limits (3,000 rpm / 4M tpm) added. |
| 10 | Mistral: Medium 3.5 $1.50/$7.50, 256k, Modified MIT, 28 Apr 2026, 128B on Ollama; Small 4 $0.15/$0.60 (was UNVERIFIED); batch 50%, cache -90% | https://docs.mistral.ai/models/mistral-medium-3-5-26-04 , https://mistral.ai/pricing/api , https://ollama.com/library/mistral-medium-3.5 | HELD. FIXED: Small 4 price now VERIFIED on mistral.ai/pricing/api; Codestral $0.30/$0.90 and Ministral 3 prices added; https://mistral.ai/pricing carries no model table (source line corrected to /pricing/api). 128B / 80 GB confirmed on Ollama. |
| 11 | Qwen: qwen3.8-max $2/$6; qwen3.7-plus $0.40 (0-256k) / $1.20 (256k-1M) in, $1.60 out; qwen3.8-flash $0.15/$0.47; 1M free tokens for 90 days | https://www.alibabacloud.com/help/en/model-studio/model-pricing | HELD (tier labels "0<Token≤1M" confirm 1M context). |
| 12 | Artificial Analysis: Fable 5.1 = 53, GPT-6 Astra = 53; GLM-5.3 45, Kimi K3 44, GLM 5.3 Flash 42 | https://artificialanalysis.ai/models | HELD. REFINED: index is v4.3.2 and the 53s are at max/xhigh effort (Fable 5.1 high = 51; Astra xhigh = 52); 66 of 149 models are open-weights. |
| 13 | Sherkala Table 1: Kazakh 4.73 → 2.04 (-56.8%), Russian 2.56, Turkish 2.23, +25% vocabulary | https://arxiv.org/html/2503.01493 | HELD exactly (vocab 128,256 → 159,766). |
| 14 | TurkicNLP: four tokenizers, 20 languages, Turkish 1.95-3.03, quote "GPT-5.2 and Qwen3.5 consistently achieve the best Turkic coverage" | https://arxiv.org/html/2602.19174v2 | HELD; quote is exact. Kazakh values are not in the text or tables, so the figure read-off stays UNVERIFIED. |
| 15 | "Tokenizer Tax": English 1.23 "across ten models"; Ukrainian 2.66 (2.16-3.62); Bulgarian 2.33 | https://arxiv.org/html/2605.24718 | FIXED: 1.23 is the mean across six publicly available tokenizers; the paper covers ten models overall. Bulgarian range (1.86-2.84) added. |
| 16 | SozKZ 50k vocab, 2-3x; Petrov 17 tokenizers, "more than 15x" | https://arxiv.org/html/2603.20854v1 , https://aleksandarpetrov.github.io/tokenization-fairness/ | HELD (50,257 tokens; "2–3× lower"). FIXED wording: Petrov says differences "up to 15 times", not "more than 15x"; NeurIPS 2023 added. |
| 17 | Copilot Student announcement: 11 Mar 2026, effective 12 Mar 2026, 200 AI Credits from 1 Jun 2026, models GPT-5.3-Codex / GPT-5.4 / Claude Opus / Claude Sonnet, 6,796 downvotes vs 94 upvotes | https://github.com/orgs/community/discussions/189268 | HELD on every figure (author martinwoodward; 1,003 confused reactions; 1,737 comments added). |
| 18 | Copilot plans: Free 2,000 completions; Pro $10 / 1,500; Pro+ $39 / 7,000; Max $100 / 20,000; Business $19; Enterprise $39; Student "unlimited completions"; "all plans moved to AI Credits 1 Jun 2026" | https://docs.github.com/en/copilot/get-started/plans , https://docs.github.com/en/copilot/concepts/billing/copilot-requests , https://docs.github.com/en/copilot/concepts/billing/individual-plans | HELD on prices and credit counts (base/flex split added). UNVERIFIED: Student "unlimited completions" (page only caps Free; says nothing for Student) and the plans page prints no credit number for Student or Free. UNVERIFIED (indirect only): the 1 Jun 2026 switch date — docs mention "legacy premium request-based billing after June 1, 2026"; the AI-credits concept page 404s and the changelog listing showed nothing. |
| 19 | GitHub Actions 2,000 min / 500 MB (Free), 3,000 / 1 GB (Pro), public repos free, $0.006 / $0.010 / $0.062 per min | https://docs.github.com/en/billing/concepts/product-billing/github-actions | HELD. |
| 20 | Codespaces 120 / 180 core-hours → 60 h / 90 h on 2-core | https://docs.github.com/en/billing/concepts/product-billing/github-codespaces , https://docs.github.com/en/codespaces/overview | FIXED: docs say "120 hrs" / "180 hrs" under "Compute time per month"; the phrase "core hours" appears on neither page. The 60 h / 90 h derivation is now marked UNVERIFIED as worded. |
| 21 | Netlify 300 credits hard limit, 15 per production deploy, 20 per GB, 10 per GB-hour, 2 per 10k requests, previews/branches/forms free, "Site not available"; Personal $9 / 1,000, Pro $20 / 3,000 | https://docs.netlify.com/.../how-credits-work/ , https://www.netlify.com/pricing/ | HELD verbatim. |
| 22 | Railway $5 one-time trial up to 30 days, then $1/month no rollover; trial 1 GB RAM / 2 vCPU / 0.5 GB volume; Hobby $5 with $5 usage; unverified accounts restricted networking | https://docs.railway.com/reference/pricing/free-trial , https://docs.railway.com/reference/pricing/plans | HELD (vCPU/volume figures live on the plans page, not the trial page). REFINED: Free plan is 0.5 GB RAM / 1 vCPU / 0.5 GB volume; trial max 5 services per project. |
| 23 | Render: 15 min spin-down, ~1 min cold start, 750 hours, free Postgres 1 GB expiring 30 days, one per workspace, no backups, KV in-memory | https://render.com/docs/free | HELD verbatim ("expire 30 days after creation"). |
| 24 | Supabase, Neon, Firebase Spark numbers | https://supabase.com/pricing , https://neon.com/pricing , https://firebase.google.com/pricing | HELD on every number. Firebase Blaze claim: see #25. |
| 25 | "Cloud Functions, Cloud Storage and App Hosting need Blaze (card required)" | https://firebase.google.com/pricing , https://firebase.google.com/docs/projects/billing/firebase-pricing-plans | REFINED, not refuted. The first fetch of the pricing page suggested all three were on Spark; a literal re-read shows App Hosting "Not applicable" on Spark, Cloud Storage `*.firebasestorage.app` buckets "Not applicable" (legacy `*.appspot.com` buckets still get 5 GB), and the pricing-plans doc lists "Access to Cloud Functions" as a Blaze feature; "Cloud Billing accounts require a payment method". Wording in 3.8 and 8.14 tightened accordingly. |
| 26 | Cloudflare Workers Free 100k req/day, 10 ms CPU; Paid $5 (10M req, 30M CPU-ms); KV 100k/1k/1 GB; D1 5M/100k/5 GB; DO 100k; Queues 10k; Hyperdrive 100k; Logs 200k / 3 days; no egress charge | https://developers.cloudflare.com/workers/platform/pricing/ | HELD verbatim. |
| 27 | Vercel Hobby: 100 GB, 1M edge requests, 1M invocations, 4 CPU-hrs, 360 GB-hrs, 5,000 image transformations, 200 projects, 100 deploys/day, 300 s, 1 h logs, non-commercial, 30-day wait, Pro $20/user, last updated 14 Sep 2026 | https://vercel.com/docs/plans/hobby | HELD on every figure (last_updated: 2026-09-14). |
| 28 | MCP 2026-07-28: stateless, initialize/Mcp-Session-Id removed, `_meta`, MRTR, Mcp-Method/Mcp-Name, ttlMs/cacheScope, auth hardening; deprecated Roots/Sampling/Logging (12 months), HTTP+SSE, DCR→CIMD; Tier 1 SDKs TS/Python/Go/C#, Rust beta; ~500M monthly, 1B total; Tasks / MCP Apps / EMA / Skills over MCP; previous version 2025-11-25; "arbitrary code execution" | https://blog.modelcontextprotocol.io/posts/2026-07-28/ , https://modelcontextprotocol.io/specification/latest , https://modelcontextprotocol.io/specification/versioning | HELD on all points; 2025-11-25 as the last handshake-based revision is now VERIFIED. Spec wording: "Tools represent arbitrary code execution and must be treated with appropriate caution." |
| 29 | MCP history: 25 Nov 2024; OpenAI Mar 2025; Google DeepMind Apr 2025; AAIF Dec 2025 (Anthropic, Block, OpenAI); Dev Summit NYC Apr 2026 ~1,200 | https://en.wikipedia.org/wiki/Model_Context_Protocol | HELD. |
| 30 | Servers repo 90.5k stars, 7 reference servers, 13 archived | https://github.com/modelcontextprotocol/servers | HELD (11.7k forks; archived list named in full). |
| 31 | Ollama default context 4,096; OLLAMA_CONTEXT_LENGTH; Windows path; `ollama ps`; local prompts not sent to ollama.com | https://docs.ollama.com/faq | HELD: "By default, Ollama uses a context window size of 4096 tokens."; "We don't see your prompts or data when you run locally." |
| 32 | `ollama launch claude`; ANTHROPIC_BASE_URL / ANTHROPIC_AUTH_TOKEN; 64k+ recommendation | https://docs.ollama.com/integrations/claude-code | HELD. FIXED (omission): docs also set `ANTHROPIC_API_KEY=""`; exact sentence is "For larger repositories, set the context length to 64k or higher." |
| 33 | Ollama Cloud plans; gpt-oss 14 GB / 65 GB, "as little as 16GB memory", 80 GB GPU, MXFP4 4.25 bits; Gemma 4 sizes; qwen3.6 6.7M / qwen3.8 2.3M pulls | https://ollama.com/pricing , https://ollama.com/library/gpt-oss , https://ollama.com/library/gemma4 , https://ollama.com/search | HELD on every figure; concurrency limits (Pro 3, Max 10) and Team tier added. Pull counts change daily. |
| 34 | LM Studio requirements | https://lmstudio.ai/docs/app/system-requirements | HELD except "8 GB works with small models", which is not on the page → UNVERIFIED. |
| 35 | Karpathy "vibe coding" post URL and date 2 Feb 2025 | https://en.wikipedia.org/w/index.php?title=Vibe_coding&action=raw ; snowflake decode of the ID; https://publish.x.com/oembed (HTTP 402) | FIXED status: ID 1886192184808149383 matches Wikipedia's citation and its timestamp decodes to 2025-02-02 23:17:15 UTC, so URL and date are no longer "from memory". X itself could not be opened (402), so live availability stays UNVERIFIED. |

Not re-checked in this pass (unchanged, still marked as in the body): OpenAI help-center 4936856 (403 earlier); GPT-6 Astra release date 3 Sep 2026 and Luna price-cut date; Qwen3.8-Max 2.4T MoE; Gemma E2B 3 GB RAM claim; the popular-MCP-servers listicle aggregate; laptop model picks and CPU tokens/sec.
