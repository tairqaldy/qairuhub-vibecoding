// The AI coding ENVIRONMENTS catalogue.
//
// This course is not about one product. The tools below are the ones a builder in
// Kazakhstan can actually reach today, grouped by the four surfaces:
// app builders -> editor agents -> terminal agents -> async cloud agents.
//
// Every price, free tier, command and URL here comes from the research files
// (other-tools-handson.md, claude-code-handson.md, fundamentals-current.md),
// checked 21-22 Sep 2026. Tools get renamed, acquired and repriced within a
// quarter — Windsurf became Devin Desktop, Gemini CLI stopped serving consumers,
// Roo Code shut down — so re-check a number before you put it on a slide.
// What stays true is the habit: spec first, AGENTS.md, commit before every run,
// read the diff, run the tests.

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  kind: 'terminal' | 'ide' | 'extension' | 'cloud' | 'app-builder';
  /** one line: what this thing is */
  tagline: { en: string; kk: string };
  /** what it is genuinely best at */
  strength: { en: string; kk: string };
  /** the honest downside — always filled in */
  weakness: { en: string; kk: string };
  /** what you get without paying, specifically */
  free: { en: string; kk: string };
  /** cheapest paid entry, e.g. "$20/mo"; null if free-only or not published */
  paidFrom: string | null;
  /** one-line install/start command, or the download URL; null if there is nothing to install */
  install: string | null;
  docs: string;
  /** the instruction file this tool reads */
  rulesFile: string | null;
  /** the handful a beginner in Kazakhstan should actually try first */
  startHere: boolean;
  /** payment/availability notes that matter from Kazakhstan */
  kzNote: { en: string; kk: string } | null;
}

export const tools: Tool[] = [
  // ---------------------------------------------------------------- start here
  {
    id: 'claude-code',
    name: 'Claude Code',
    vendor: 'Anthropic',
    kind: 'terminal',
    tagline: {
      en: "Anthropic's agentic coding tool — terminal, IDE, desktop app and browser, all one engine.",
      kk: 'Anthropic-тің агенттік кодтау құралы: терминал, IDE редакторы, қолданба және браузер — бәрінде бір негіз.',
    },
    strength: {
      en: 'The deepest agent loop in a real repository: plan mode, checkpoints and rewind, CLAUDE.md memory, hooks, subagents, MCP servers, git worktrees and a headless mode for scripts. CLAUDE.md, settings and MCP servers are shared across every local surface.',
      kk: 'Нақты репозиторийдегі ең терең агент циклі: жоспарлау режимі, checkpoint пен rewind, CLAUDE.md жады, hook-тар, субагенттер, MCP серверлері, git worktree және скриптке арналған headless режимі. CLAUDE.md, параметрлер мен MCP серверлері барлық жергілікті бетте ортақ.',
    },
    weakness: {
      en: 'No free tier at all — the free claude.ai plan does not include Claude Code, so you need Pro, Max, Team, Enterprise or API credits. Long sessions run into a rolling 5-hour limit plus a weekly one, shared with Claude chat.',
      kk: 'Тегін деңгейі мүлде жоқ: тегін claude.ai жоспарына Claude Code кірмейді, сондықтан Pro, Max, Team, Enterprise немесе API кредиттері керек. Ұзақ сеанстар 5 сағаттық және апталық шектеуге тіреледі — ол шектеу Claude чатымен ортақ.',
    },
    free: {
      en: 'Nothing. Claude Code requires a Pro, Max, Team, Enterprise or Console (API) account. For a one-evening workshop, Console API keys with a workspace spend limit are the cheap way in.',
      kk: 'Ештеңе. Claude Code үшін Pro, Max, Team, Enterprise немесе Console (API) аккаунты керек. Бір кештік воркшопқа шығын шегі қойылған Console API кілттері — ең арзан жол.',
    },
    paidFrom: '$20/mo (Pro; $17/mo billed annually)',
    install:
      'curl -fsSL https://claude.ai/install.sh | bash  •  Windows PowerShell: irm https://claude.ai/install.ps1 | iex',
    docs: 'https://code.claude.com/docs/en/overview',
    rulesFile: 'CLAUDE.md (since v2.1.277 it reads AGENTS.md instead when there is no CLAUDE.md)',
    startHere: true,
    kzNote: {
      en: 'Kazakhstan is on the Anthropic supported-countries list for both the API and Claude.ai, so no VPN is needed. There is no individual student price. $20 is roughly 10 200 KZT before bank conversion fees; Kazakhstani Visa/Mastercard cards are reported to work once foreign payments are enabled in the bank app.',
      kk: 'Қазақстан Anthropic қолдау көрсететін елдер тізімінде — API үшін де, Claude.ai үшін де, сондықтан VPN қажет емес. Жеке студенттік бағасы жоқ. $20 — банк айырбас комиссиясына дейін шамамен 10 200 ₸; банк қолданбасында шетелдік төлемдер қосулы болса, қазақстандық Visa/Mastercard карталары жұмыс істейді деп хабарлайды.',
    },
  },
  {
    id: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere (part of SpaceX since 14 Aug 2026)',
    kind: 'ide',
    tagline: {
      en: 'A VS Code fork with a built-in multi-model agent, Tab completion, Plan mode, cloud agents and a CLI.',
      kk: 'VS Code негізіндегі редактор: ішінде көпмодельді агент, Tab толықтыру, жоспарлау режимі, бұлттық агенттер және CLI құралы бар.',
    },
    strength: {
      en: 'The smoothest GUI agent loop there is: Ctrl/Cmd+I opens the agent, Shift+Tab switches to Plan mode, and you accept or reject every diff per file. One editor with every vendor’s models — Claude, GPT, Gemini, Grok, Composer — and the largest community of rules and tutorials.',
      kk: 'Графикалық интерфейстегі ең тегіс агент циклі: Ctrl/Cmd+I агентті ашады, Shift+Tab жоспарлау режиміне ауыстырады, әр файлдағы өзгерісті бөлек қабылдайсың не қайтарасың. Бір редакторда барлық вендордың модельдері — Claude, GPT, Gemini, Grok, Composer — және ең үлкен қауымдастық.',
    },
    weakness: {
      en: "The usage pool burns fast on frontier models — Cursor's own docs say daily agent users typically spend $60-100/mo. Ownership and pricing changed several times in 2026, and the old free year of Pro for students is gone.",
      kk: 'Күшті модельдерде шектеу тез бітеді — Cursor құжаттамасының өзі күн сайын агент қолданатындар әдетте айына $60-100 жұмсайды дейді. 2026 жылы иесі де, бағасы да бірнеше рет өзгерді, ал студенттерге берілетін бір жылдық тегін Pro енді жоқ.',
    },
    free: {
      en: 'Hobby plan: no credit card required, a limited number of Agent requests, Tab completion included.',
      kk: 'Hobby жоспары: карта қажет емес, Agent сұрауларының саны шектеулі, Tab толықтыру бар.',
    },
    paidFrom: '$20/mo (Pro)',
    install:
      'https://cursor.com  •  CLI: curl https://cursor.com/install -fsS | bash (binary: agent)',
    docs: 'https://cursor.com/docs',
    rulesFile: '.cursor/rules/*.mdc (also reads AGENTS.md, including nested files)',
    startHere: true,
    kzNote: {
      en: 'There is no regional plan for Kazakhstan — the cheap Start plan (₹649/mo) is India-only. The former free year of Pro for students is gone; the students page now promises only promotions at campus and online events.',
      kk: 'Қазақстанға арналған аймақтық жоспар жоқ — арзан Start жоспары (₹649/ай) тек Үндістанда. Студенттерге берілетін бұрынғы бір жылдық тегін Pro жабылды; студенттер беті енді тек кампустағы және онлайн іс-шаралардағы акцияларды уәде етеді.',
    },
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot (agent mode)',
    vendor: 'GitHub / Microsoft',
    kind: 'extension',
    tagline: {
      en: 'The default AI layer of VS Code: completions, chat, a local agent mode, code review and a CLI.',
      kk: 'VS Code-тың әдепкі ЖИ қабаты: автотолтыру, чат, жергілікті агент режимі, кодты қарап шығу және CLI құралы.',
    },
    strength: {
      en: 'The cheapest paid agent at $10/mo and zero install inside VS Code, with the tightest GitHub issue-to-PR loop. It also reads everyone else’s instruction files — AGENTS.md and CLAUDE.md are on by default in VS Code.',
      kk: 'Айына $10 — ең арзан ақылы агент, әрі VS Code ішінде ештеңе орнатудың қажеті жоқ. GitHub-тағы issue-ден PR-ға дейінгі жол ең қысқа. Оның үстіне басқа құралдардың нұсқау файлдарын оқиды: VS Code-та AGENTS.md пен CLAUDE.md әдепкіде қосулы.',
    },
    weakness: {
      en: 'Since 1 Jun 2026 agent work is metered in AI credits (1 credit = $0.01), so the 200 student credits are about $2 of agent usage — heavy agent work is no longer free. Model choice was removed on the Free and Student plans on 24 Jun 2026.',
      kk: '2026 жылғы 1 маусымнан бастап агент жұмысы AI кредиттерімен өлшенеді (1 кредит = $0,01), сондықтан студенттің 200 кредиті шамамен $2 агент жұмысына тең — ауыр агент жұмысы енді тегін емес. 2026 жылғы 24 маусымнан бері Free және Student жоспарларында модельді өзің таңдай алмайсың.',
    },
    free: {
      en: 'Free plan: 2 000 completions/month plus limited chat and agent use. Students with GitHub Education get the Copilot Student plan: unlimited completions plus 200 AI credits/month, auto model selection only. Teachers and popular open-source maintainers get Copilot Pro free.',
      kk: 'Free жоспары: айына 2 000 автотолтыру, чат пен агент шектеулі. GitHub Education арқылы студенттер Copilot Student жоспарын алады: автотолтыру шексіз, айына 200 AI кредиті, модель автоматты түрде таңдалады. Мұғалімдер мен танымал ашық бастапқы код жобаларының иелері Copilot Pro-ны тегін алады.',
    },
    paidFrom: '$10/mo (Pro, includes $15 of AI credits)',
    install:
      'VS Code -> sign in with GitHub -> Chat view -> Agent  •  CLI: npm install -g @github/copilot',
    docs: 'https://docs.github.com/en/copilot',
    rulesFile: '.github/copilot-instructions.md (also reads AGENTS.md and CLAUDE.md in VS Code)',
    startHere: true,
    kzNote: {
      en: 'GitHub Education is global and needs no card, which makes the Copilot Student plan the most realistic $0 route for a student in Kazakhstan. Apply before the workshop — approval is not instant.',
      kk: 'GitHub Education бүкіл әлемде жұмыс істейді және карта сұрамайды, сондықтан Copilot Student — Қазақстандағы студент үшін ең шынайы $0 жол. Өтінімді воркшопқа дейін бер: мақұлдау бірден келмейді.',
    },
  },
  {
    id: 'codex-cli',
    name: 'OpenAI Codex CLI',
    vendor: 'OpenAI',
    kind: 'terminal',
    tagline: {
      en: "OpenAI's coding agent in your terminal — one ChatGPT account also unlocks the IDE extension, the desktop app and cloud tasks.",
      kk: 'OpenAI компаниясының терминалдағы кодтау агенті: бір ChatGPT аккаунты IDE кеңейтімін, қолданбаны және бұлттық тапсырмаларды да ашады.',
    },
    strength: {
      en: 'The strongest "one subscription, three surfaces" story, and the CLI itself is open source (Apache-2.0, 125.7k stars). Native AGENTS.md, /init to write it, /review to review your own uncommitted diff, codex exec for scripts and codex resume to reopen a session.',
      kk: '«Бір жазылым — үш бет» идеясының ең мықты үлгісі, әрі CLI құралының өзі ашық бастапқы кодты (Apache-2.0, 125,7 мың жұлдыз). AGENTS.md файлын өзі оқиды, /init оны жазып береді, /review өзіңнің commit жасалмаған өзгерісіңді тексереді, codex exec скриптке, codex resume ескі сеансқа қайтарады.',
    },
    weakness: {
      en: 'Limits are published as ranges per model, not as numbers, and they change with the model you pick. The Free and Go allowances are tiny, the Windows sandbox is labelled experimental, and the npm package is @openai/codex, not codex.',
      kk: 'Шектеулер нақты санмен емес, әр модель үшін диапазонмен беріледі және таңдаған модельге қарай өзгереді. Free мен Go деңгейінде мөлшер өте аз, Windows жүйесіндегі sandbox эксперименттік деп белгіленген, ал npm пакетінің аты codex емес — @openai/codex.',
    },
    free: {
      en: 'Included in ChatGPT Free for quick coding tasks (small allowance). Caution: the GitHub README’s sign-in paragraph names only Plus, Pro, Business, Edu and Enterprise while the pricing page says Free and Go include Codex — test a free account before you rely on it.',
      kk: 'ChatGPT Free ішінде шағын тапсырмаларға берілген (мөлшері аз). Ескерту. GitHub-тағы README кіру бөлімінде тек Plus, Pro, Business, Edu және Enterprise аталады, ал баға беті Free мен Go-да да Codex бар дейді — сенер алдында тегін аккаунтта тексеріп көр.',
    },
    paidFrom: '$8/mo (ChatGPT Go); $20/mo (Plus)',
    install: 'npm install -g @openai/codex  •  Windows PowerShell: irm https://chatgpt.com/codex/install.ps1 | iex',
    docs: 'https://learn.chatgpt.com/docs/codex/cli',
    rulesFile:
      'AGENTS.md (global ~/.codex/AGENTS.md first, then every directory from repo root down to your cwd; 32 KiB cap)',
    startHere: true,
    kzNote: {
      en: 'Kazakhstan is on the OpenAI supported-countries list. ChatGPT Go at $8/mo is the cheapest paid plan anywhere that includes Codex.',
      kk: 'Қазақстан OpenAI қолдау көрсететін елдер тізімінде бар. Айына $8 тұратын ChatGPT Go — Codex кіретін ең арзан ақылы жоспар.',
    },
  },

  // ------------------------------------------------------- the free Google stack
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    vendor: 'Google',
    kind: 'ide',
    tagline: {
      en: "Google's agent-first dev platform: a VS Code-style IDE plus a multi-agent desktop app.",
      kk: 'Google компаниясының агентке негізделген әзірлеу ортасы: VS Code стиліндегі IDE редакторы және көпагенттік қолданба.',
    },
    strength: {
      en: 'The most generous free agent access available right now. The $0 Individual plan lists Gemini 3.8/3.7/3.6 Flash, Gemini 3.1 Pro, Claude Sonnet and Opus 4.6 and gpt-oss-120b — non-Google models included — with unlimited tab completions.',
      kk: 'Бүгінгі ең жомарт тегін агент. $0 тұратын Individual жоспарында Gemini 3.8/3.7/3.6 Flash, Gemini 3.1 Pro, Claude Sonnet пен Opus 4.6 және gpt-oss-120b бар — Google шығармаған модельдер де кіреді, ал tab толықтыру шексіз.',
    },
    weakness: {
      en: 'No published source, interactive Google sign-in, and weekly limits that are never stated as numbers (check with /usage). Google cut its free tiers twice in 2026, so treat "free" as having a shelf life. Unavailable to users under 18.',
      kk: 'Бастапқы коды жарияланбаған, Google арқылы қолмен кіру керек, апталық шектеулер ешқашан сан түрінде айтылмайды (/usage арқылы тексер). Google 2026 жылы тегін деңгейлерін екі рет қысқартты, сондықтан «тегін» деген сөздің мерзімі бар. 18 жасқа толмағандарға қолжетімді емес.',
    },
    free: {
      en: 'Individual plan at $0: weekly rate limits, unlimited tab completions, and the multi-vendor model list above. Higher limits ride on a Google AI Pro or Ultra subscription; there is no Antigravity-only plan.',
      kk: 'Individual жоспары — $0: апталық шектеулер, шексіз tab толықтыру және жоғарыдағы көпвендорлы модель тізімі. Жоғарырақ шектеу Google AI Pro не Ultra жазылымымен келеді; тек Antigravity үшін жеке жоспар жоқ.',
    },
    paidFrom: '$19.99/mo via Google AI Pro (secondary source)',
    install: 'https://antigravity.google',
    docs: 'https://antigravity.google/docs',
    rulesFile: '.agents/rules/ (also reads AGENTS.md and GEMINI.md)',
    startHere: false,
    kzNote: {
      en: 'Kazakhstan is explicitly on the supported list (so are Kyrgyzstan and Uzbekistan), personal Google accounts only. It is unavailable to users under 18, so school pupils need Copilot Student or Cursor Hobby instead.',
      kk: 'Қазақстан қолдау көрсетілетін елдер тізімінде анық көрсетілген (Қырғызстан мен Өзбекстан да), тек жеке Google аккаунттары. 18 жасқа толмағандарға жабық, сондықтан мектеп оқушыларына Copilot Student не Cursor Hobby керек.',
    },
  },
  {
    id: 'antigravity-cli',
    name: 'Antigravity CLI (agy)',
    vendor: 'Google',
    kind: 'terminal',
    tagline: {
      en: 'The terminal agent that replaced Gemini CLI for everyone who is not an enterprise customer.',
      kk: 'Кәсіпорын клиенті емес барлық адам үшін Gemini CLI құралының орнын басқан терминал агенті.',
    },
    strength: {
      en: 'A $0 terminal agent with real autonomy controls: /goal runs a task to completion without asking at every step, /grill-me makes it interview you before it builds, /usage shows what is left per model, and /browser and /schedule are built in.',
      kk: 'Автономия тұтқалары бар $0 терминал агенті: /goal тапсырманы әр қадамда сұрамай аяғына дейін орындайды, /grill-me жасамас бұрын саған сұрақ қойғызады, /usage әр модельде қанша қалғанын көрсетеді, /browser мен /schedule ішіне салынған.',
    },
    weakness: {
      en: 'Same caveats as the IDE: no published source, 18+ only, opaque weekly limits, and an interactive Google sign-in that is awkward on a headless machine (it can print an authorization URL instead).',
      kk: 'Кемшіліктері де сол: бастапқы коды жоқ, тек 18+, апталық шектеу түсініксіз, кіру Google арқылы қолмен жүреді — бұл headless машинада ыңғайсыз (оның орнына авторизация сілтемесін басып шығара алады).',
    },
    free: {
      en: 'The same $0 Individual plan as Antigravity; run /usage to see the remaining quota per model.',
      kk: 'Antigravity редакторындағы сол $0 Individual жоспары; қанша қалғанын /usage арқылы көр.',
    },
    paidFrom: '$19.99/mo via Google AI Pro (secondary source)',
    install:
      'curl -fsSL https://antigravity.google/cli/install.sh | bash  •  PowerShell: irm https://antigravity.google/cli/install.ps1 | iex  •  then: cd project && agy',
    docs: 'https://antigravity.google/docs/getting-started?tab=cli',
    rulesFile: '.agents/rules/ (also reads AGENTS.md and GEMINI.md in the working directory)',
    startHere: false,
    kzNote: {
      en: 'Supported in Kazakhstan with a personal Google account, 18+ only. If the venue Wi-Fi blocks the localhost OAuth callback, agy prints an authorization URL you can open on another device.',
      kk: 'Қазақстанда жеке Google аккаунтымен қолжетімді, тек 18+. Іс-шара Wi-Fi желісі localhost арқылы OAuth қайтарымын бөгесе, agy авторизация сілтемесін басып шығарады — оны басқа құрылғыда аш.',
    },
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    vendor: 'Google',
    kind: 'terminal',
    tagline: {
      en: 'The open-source Gemini terminal agent — enterprise-only in practice since 18 Jun 2026.',
      kk: 'Ашық бастапқы кодты Gemini терминал агенті — 2026 жылғы 18 маусымнан бері іс жүзінде тек кәсіпорындарға арналған.',
    },
    strength: {
      en: 'Still the reference open-source implementation of a terminal agent (Apache-2.0, ~107k stars), and a perfectly good tool if your university or employer has Gemini Code Assist Standard/Enterprise or a paid key.',
      kk: 'Терминал агентінің эталондық ашық бастапқы код үлгісі күйінде қалды (Apache-2.0, шамамен 107 мың жұлдыз). Университетіңде не жұмысыңда Gemini Code Assist Standard/Enterprise немесе ақылы кілт болса, толық жарамды құрал.',
    },
    weakness: {
      en: 'On 18 Jun 2026 it stopped serving free users and Google AI Pro/Ultra subscribers; consumers were moved to Antigravity CLI. The README still advertises 1 000 requests/day with a Google login while the docs site contradicts it — do not build a workshop on it.',
      kk: '2026 жылғы 18 маусымда тегін пайдаланушыларға және Google AI Pro/Ultra жазылушыларына қызмет көрсетуді тоқтатты; оларды Antigravity CLI құралына көшірді. README әлі де Google аккаунтымен күніне 1 000 сұрау уәде етеді, бірақ құжаттама беті оны жоққа шығарады — воркшопты бұған құрма.',
    },
    free: {
      en: 'None for consumers. Only Gemini Code Assist Standard/Enterprise, Google Cloud or a paid Gemini Enterprise Agent Platform key still work.',
      kk: 'Жеке пайдаланушыға ештеңе жоқ. Тек Gemini Code Assist Standard/Enterprise, Google Cloud немесе ақылы Gemini Enterprise Agent Platform кілті жұмыс істейді.',
    },
    paidFrom: null,
    install: 'npm install -g @google/gemini-cli',
    docs: 'https://github.com/google-gemini/gemini-cli',
    rulesFile: 'GEMINI.md (also reads AGENTS.md)',
    startHere: false,
    kzNote: null,
  },

  // ---------------------------------------------------------- async cloud agents
  {
    id: 'codex-cloud',
    name: 'Codex cloud',
    vendor: 'OpenAI',
    kind: 'cloud',
    tagline: {
      en: 'Hand a task to Codex in the cloud: it works in its own environment and comes back with a pull request.',
      kk: 'Тапсырманы бұлттағы Codex-ке бер: ол өз ортасында жұмыс істеп, pull request-пен қайтады.',
    },
    strength: {
      en: 'Same account, same AGENTS.md and same habits as the CLI, so there is nothing new to learn. Cloud tasks plus GitHub PR review make it the least painful step onto rung 4.',
      kk: 'Аккаунт та, AGENTS.md файлы да, әдет те CLI құралындағыдай — жаңадан үйренетін ештеңе жоқ. Бұлттық тапсырмалар мен GitHub-тағы PR-ды қарап шығу төртінші сатыға ең ауыртпалықсыз өтуге мүмкіндік береді.',
    },
    weakness: {
      en: 'It needs a repo that builds in a clean environment, real tests and a human who reads the diff. It draws on the same Codex allowance as your local work, and on Free or Go that allowance is tiny.',
      kk: 'Таза ортада құрастырылатын репозиторий, нақты тесттер және өзгерісті оқитын адам керек. Ол жергілікті жұмысыңмен ортақ Codex мөлшерінен алады, ал Free не Go деңгейінде ол мөлшер өте аз.',
    },
    free: {
      en: 'Shares the Codex allowance of your ChatGPT plan — usable to try on Free, not enough to work with.',
      kk: 'ChatGPT жоспарыңдағы ортақ Codex мөлшерін пайдаланады: Free деңгейінде байқап көруге жетеді, жұмыс істеуге жетпейді.',
    },
    paidFrom: '$20/mo (ChatGPT Plus)',
    install: 'codex cloud (from the Codex CLI)',
    docs: 'https://learn.chatgpt.com/docs/codex/cli',
    rulesFile: 'AGENTS.md',
    startHere: false,
    kzNote: {
      en: 'Kazakhstan is on the OpenAI supported-countries list, so no VPN is needed; ChatGPT Go at $8/mo is the cheapest entry that includes Codex.',
      kk: 'Қазақстан OpenAI қолдау көрсететін елдер тізімінде, сондықтан VPN қажет емес; Codex кіретін ең арзан жол — айына $8 тұратын ChatGPT Go.',
    },
  },
  {
    id: 'copilot-cloud',
    name: 'Copilot coding agent',
    vendor: 'GitHub',
    kind: 'cloud',
    tagline: {
      en: 'Assign a GitHub issue to Copilot; it works in the cloud and returns a pull request.',
      kk: 'GitHub-тағы issue-ді Copilot-қа тапсыр: ол бұлтта жұмыс істеп, pull request қайтарады.',
    },
    strength: {
      en: 'It lives where the work already is — issues, pull requests, code review — so your teammates do not have to install anything or learn a new tool. It reads the repository instruction files you already keep.',
      kk: 'Жұмыс бұрыннан тұрған жерде істейді: issue, pull request, кодты қарап шығу. Командаңа ештеңе орнатудың, жаңа құрал үйренудің қажеті жоқ. Репозиторийде бұрыннан жатқан нұсқау файлдарын оқиды.',
    },
    weakness: {
      en: 'Metered in AI credits like the rest of Copilot, so one long agent run is real money — 200 student credits are about $2. And it only pays off on a repo where CI actually passes.',
      kk: 'Copilot-тың қалған бөлігі сияқты AI кредиттерімен өлшенеді, сондықтан бір ұзақ агент жүгірісі нақты ақша — студенттің 200 кредиті шамамен $2. Оның үстіне CI шынымен өтетін репозиторийде ғана пайда береді.',
    },
    free: {
      en: 'Draws on the same AI credit balance as the rest of Copilot (1 credit = $0.01); the Student plan gives 200 credits/month.',
      kk: 'Copilot-тың қалған бөлігімен ортақ AI кредит балансынан алады (1 кредит = $0,01); Student жоспары айына 200 кредит береді.',
    },
    paidFrom: '$10/mo (Pro, includes $15 of AI credits)',
    install: 'Assign an issue to Copilot in your GitHub repository',
    docs: 'https://docs.github.com/en/copilot',
    rulesFile: 'AGENTS.md or .github/copilot-instructions.md',
    startHere: false,
    kzNote: null,
  },
  {
    id: 'jules',
    name: 'Google Jules',
    vendor: 'Google',
    kind: 'cloud',
    tagline: {
      en: 'Connect a GitHub repo, describe a task, and Jules works in a cloud VM and opens a pull request.',
      kk: 'GitHub репозиторийін қос, тапсырманы сипатта — Jules бұлттық виртуалды машинада жұмыс істеп, pull request ашады.',
    },
    strength: {
      en: 'The best free introduction to async agents: 15 tasks a day, 3 at a time, no card. Ideal for chores — tests, dependency bumps, small bug fixes — and it reads your AGENTS.md.',
      kk: 'Async агенттермен танысудың ең жақсы тегін жолы: күніне 15 тапсырма, бір уақытта 3-еуі, карта сұрамайды. Ұсақ жұмысқа таптырмайды — тесттер, тәуелділіктерді жаңарту, шағын қателерді түзету — әрі AGENTS.md файлын оқиды.',
    },
    weakness: {
      en: 'The free tier runs an older model (Gemini 2.5 Pro), your repo has to build in a clean VM, and feedback is much slower than a local agent.',
      kk: 'Тегін деңгейде ескілеу модель жұмыс істейді (Gemini 2.5 Pro), репозиторийің таза виртуалды машинада құрастырылуы керек, ал жауап жергілікті агентке қарағанда әлдеқайда баяу келеді.',
    },
    free: {
      en: '15 tasks/day, 3 concurrent, Gemini 2.5 Pro, on a rolling 24-hour window.',
      kk: 'Күніне 15 тапсырма, бір уақытта 3-еуі, Gemini 2.5 Pro, жылжымалы 24 сағаттық терезе.',
    },
    paidFrom: '$19.99/mo via Google AI Pro (100 tasks/day, 15 concurrent)',
    install: 'https://jules.google — sign in with Google, then connect GitHub',
    docs: 'https://jules.google/docs/',
    rulesFile: 'AGENTS.md',
    startHere: false,
    kzNote: {
      en: 'The free tier needs only a Google account and a GitHub repo — no card at all. Paid tiers are sold through Google AI Pro/Ultra and only for personal @gmail accounts.',
      kk: 'Тегін деңгейге тек Google аккаунты мен GitHub репозиторийі керек — карта мүлде сұралмайды. Ақылы деңгейлер Google AI Pro/Ultra арқылы сатылады және тек жеке @gmail аккаунттарына беріледі.',
    },
  },

  // ------------------------------------------------- editor agents and extensions
  {
    id: 'devin-desktop',
    name: 'Devin Desktop (ex-Windsurf)',
    vendor: 'Cognition',
    kind: 'ide',
    tagline: {
      en: 'The Windsurf editor, rebranded on 2 Jun 2026: the Devin Local agent, an Agent Command Center, and other agents over the Agent Client Protocol.',
      kk: '2026 жылғы 2 маусымда атын өзгерткен Windsurf редакторы: Devin Local агенті, Agent Command Center және Agent Client Protocol арқылы қосылатын басқа агенттер.',
    },
    strength: {
      en: 'One $20 plan covers both the local IDE agent and the Devin Cloud agent, so you get rung 2 and rung 4 for one price. Even the free tier keeps unlimited Tab completions and inline edits.',
      kk: 'Бір $20 жоспары жергілікті IDE агентін де, Devin Cloud агентін де қамтиды — бір бағаға екінші де, төртінші де саты. Тегін деңгейдің өзінде Tab толықтыру мен жолішілік өңдеу шексіз.',
    },
    weakness: {
      en: 'Third name in two years (Codeium -> Windsurf -> Devin Desktop), so almost every tutorial you find is stale and windsurf.com docs now redirect to docs.devin.ai. The free quota is light and the model list on it is limited.',
      kk: 'Екі жылда үшінші ат (Codeium -> Windsurf -> Devin Desktop), сондықтан тапқан оқулықтарыңның бәрі дерлік ескірген, ал windsurf.com құжаттамасы docs.devin.ai сайтына бағыттайды. Тегін мөлшер аз, ондағы модель тізімі де шектеулі.',
    },
    free: {
      en: 'Free $0: a light quota to code with agents, limited model availability, unlimited Tab completions and inline edits — but no Devin Cloud.',
      kk: 'Free — $0: агентпен жұмыс істеуге шағын мөлшер, модельдер саны шектеулі, Tab толықтыру мен жолішілік өңдеу шексіз, бірақ Devin Cloud жоқ.',
    },
    paidFrom: '$20/mo (Pro)',
    install: 'https://devin.ai — download for Mac, Windows or Linux; import your VS Code or Cursor settings during onboarding',
    docs: 'https://docs.devin.ai',
    rulesFile: '.windsurf/rules/ or .devin/rules/ (also reads AGENTS.md)',
    startHere: false,
    kzNote: {
      en: 'Besides cards, checkout accepts Apple Pay, Google Pay, WeChat Pay and Alipay — useful when a Kazakhstani card is refused by the processor.',
      kk: 'Картадан басқа Apple Pay, Google Pay, WeChat Pay және Alipay қабылданады — қазақстандық картаны төлем жүйесі қабылдамаған кезде пайдалы.',
    },
  },
  {
    id: 'devin-cloud',
    name: 'Devin Cloud',
    vendor: 'Cognition',
    kind: 'cloud',
    tagline: {
      en: 'The autonomous cloud software engineer: give it a ticket, get a pull request.',
      kk: 'Автономды бұлттық инженер: тапсырма бер — pull request ал.',
    },
    strength: {
      en: 'Built for delegating a whole ticket rather than a single edit, and it now comes inside the $20 Pro plan together with the desktop agent.',
      kk: 'Жеке өзгеріс емес, тұтас тапсырманы тапсыруға жасалған, әрі қазір $20 тұратын Pro жоспарының ішінде, жергілікті агентпен бірге келеді.',
    },
    weakness: {
      en: 'It still needs a repo with tests and a human reviewer to be worth it. The old "$500 per month Devin" reputation lingers, so people dismiss it before they check the current price.',
      kk: 'Пайда беруі үшін тесттері бар репозиторий мен оны тексеретін адам керек. «Айына $500 тұратын Devin» деген ескі атақ әлі жүр, сондықтан көбі қазіргі бағасын қарамай-ақ бас тартады.',
    },
    free: {
      en: 'Not included in the Free plan — cloud agents start at Pro. The old Core ($20 + $2.25 per ACU) and Team ($500) plans were retired in Apr 2026.',
      kk: 'Free жоспарына кірмейді — бұлттық агенттер Pro-дан басталады. Ескі Core ($20 + ACU үшін $2,25) және Team ($500) жоспарлары 2026 жылдың сәуірінде жабылған.',
    },
    paidFrom: '$20/mo (Pro)',
    install: 'https://devin.ai',
    docs: 'https://docs.devin.ai',
    rulesFile: '.devin/rules/ (also reads AGENTS.md)',
    startHere: false,
    kzNote: null,
  },
  {
    id: 'kiro',
    name: 'AWS Kiro',
    vendor: 'Amazon Web Services',
    kind: 'ide',
    tagline: {
      en: 'A spec-driven agentic IDE: requirements -> design -> tasks, plus a CLI, a web app and an iOS TestFlight build.',
      kk: 'Спецификацияға негізделген агенттік IDE редакторы: талаптар -> дизайн -> тапсырмалар. Сонымен қатар CLI құралы, веб нұсқасы және iOS TestFlight нұсқасы бар.',
    },
    strength: {
      en: 'It forces the discipline this whole course teaches by hand: you cannot skip the spec. Steering files and hooks make the project rules explicit instead of hoping the agent guesses them.',
      kk: 'Осы курс қолмен үйрететін тәртіпті мәжбүрлеп орнатады: спецификацияны аттап өте алмайсың. Steering файлдары мен hook-тар жоба ережелерін анық жазып қояды — агент өзі болжайды деп үміттенудің қажеті жоқ.',
    },
    weakness: {
      en: '50 free credits a month is a demo, not a workflow; the sign-in is AWS-flavoured (AWS Builder ID or IAM Identity Center); and the model list is narrower than Cursor’s.',
      kk: 'Айына 50 тегін кредит — бұл демо, жұмыс тәртібі емес; кіру AWS стилінде (AWS Builder ID немесе IAM Identity Center); модель тізімі Cursor-дағыдан тар.',
    },
    free: {
      en: '50 credits/month with open-weight models and Claude Sonnet 4.5 (the free list also names Qwen3 Coder Next, DeepSeek 3.2 and MiniMax M2.1). Credits do not roll over.',
      kk: 'Айына 50 кредит, ашық салмақты модельдер мен Claude Sonnet 4.5 (тегін тізімде Qwen3 Coder Next, DeepSeek 3.2 және MiniMax M2.1 да бар). Кредиттер келесі айға көшпейді.',
    },
    paidFrom: '$20/mo (Pro, 1 000 credits)',
    install: 'https://kiro.dev',
    docs: 'https://kiro.dev/docs/',
    rulesFile: '.kiro/steering/*.md (starter files: product.md, tech.md, structure.md)',
    startHere: false,
    kzNote: null,
  },
  {
    id: 'cline',
    name: 'Cline',
    vendor: 'Cline (open source)',
    kind: 'extension',
    tagline: {
      en: 'An open-source agent inside VS Code, JetBrains, Cursor or Antigravity — plus a CLI, a Kanban board and an SDK.',
      kk: 'VS Code, JetBrains, Cursor немесе Antigravity ішінде жұмыс істейтін ашық бастапқы кодты агент. Сонымен бірге CLI құралы, Kanban тақтасы және SDK бар.',
    },
    strength: {
      en: 'Total transparency: you see every tool call and what each one costs in tokens, which makes it the best tool for actually understanding an agent loop. Plan and Act modes, and any model — including local ones.',
      kk: 'Толық ашықтық: әр құрал шақыруын және оның қанша токен тұрғанын көресің — агент циклін шынымен түсінуге ең қолайлы құрал. Plan және Act режимдері бар, кез келген модель, соның ішінде жергілікті модельдер де, жұмыс істейді.',
    },
    weakness: {
      en: 'Bring your own key means a card with API billing, and frontier-model API usage costs more than a flat $20 plan for the same amount of work.',
      kk: 'Өз кілтіңді әкелу деген сөз — API төлемі қосылған карта керек, ал күшті модельдерді API арқылы қолдану сол жұмыс көлемі үшін $20 тұратын тұрақты жоспардан қымбатқа түседі.',
    },
    free: {
      en: 'The extension and the CLI are free and open source (Apache-2.0). You pay only for inference: your own key, the Cline provider at cost, or a ClinePass subscription.',
      kk: 'Кеңейтім де, CLI құралы да тегін әрі ашық бастапқы кодты (Apache-2.0). Тек модель жұмысы үшін төлейсің: өз кілтің, өзіндік құнмен Cline провайдері немесе ClinePass жазылымы.',
    },
    paidFrom: null,
    install: 'npm install -g cline (Node 20+), then: cline auth  •  or install the extension from the VS Code marketplace',
    docs: 'https://docs.cline.bot',
    rulesFile: '.clinerules',
    startHere: false,
    kzNote: null,
  },
  {
    id: 'roo-code',
    name: 'Roo Code (shut down)',
    vendor: 'Roo Code Inc.',
    kind: 'extension',
    tagline: {
      en: 'Shut down on 15 May 2026 — listed here so a 2025 tutorial does not send you into a dead tool.',
      kk: '2026 жылғы 15 мамырда жабылды — 2025 жылғы оқулық сені жоқ құралға жетелемес үшін осында тұр.',
    },
    strength: {
      en: 'Nothing today. Its value is historical: it was the most popular Cline fork, and its README now points you to Cline or to the community fork ZooCode.',
      kk: 'Бүгін ештеңе бермейді. Құндылығы тарихи ғана: бұл Cline-ның ең танымал форкі болатын, ал README енді сені Cline-ға немесе ZooCode қауымдастық форкіне бағыттайды.',
    },
    weakness: {
      en: 'The extension was shut down and the repository archived on 15 May 2026, so everything you read about it is out of date.',
      kk: 'Кеңейтім жабылды, репозиторий 2026 жылғы 15 мамырда мұрағатқа түсті, сондықтан ол туралы оқығаныңның бәрі ескірген.',
    },
    free: {
      en: 'Not available — the extension is gone and the repository is archived.',
      kk: 'Қолжетімді емес — кеңейтім жоқ, репозиторий мұрағатта.',
    },
    paidFrom: null,
    install: null,
    docs: 'https://github.com/RooCodeInc/Roo-Code',
    rulesFile: null,
    startHere: false,
    kzNote: null,
  },

  // --------------------------------------------------- open-source terminal tools
  {
    id: 'opencode',
    name: 'opencode',
    vendor: 'Anomaly',
    kind: 'terminal',
    tagline: {
      en: 'The most popular open-source alternative to Claude Code: a TUI, a desktop app and an IDE extension, provider-agnostic.',
      kk: 'Claude Code-тың ең танымал ашық бастапқы кодты баламасы: терминалдық интерфейс, қолданба және IDE кеңейтімі, кез келген провайдермен жұмыс істейді.',
    },
    strength: {
      en: 'Genuinely $0 experiments through the rotating free models on Zen, switching models mid-project, and source you can read to learn how an agent actually works. /connect picks a provider, /init writes your AGENTS.md.',
      kk: 'Zen-дегі ауысып тұратын тегін модельдер арқылы шынымен $0 тәжірибе жасауға болады, жоба ортасында модельді ауыстыра аласың, ал агенттің қалай жұмыс істейтінін бастапқы кодынан оқып түсінесің. /connect провайдерді таңдайды, /init AGENTS.md жазып береді.',
    },
    weakness: {
      en: 'Free Zen models are weak and unstable and may use your prompts for training; good models mean your own API key. Since 19 Mar 2026 you cannot sign in with a Claude Pro/Max subscription (removed per Anthropic legal requests), and an unauthenticated RCE was disclosed in Jan 2026 — keep it updated.',
      kk: 'Zen-дегі тегін модельдер әлсіз әрі тұрақсыз, промптыңды оқытуға пайдалануы мүмкін; жақсы модель керек болса, өз API кілтің керек. 2026 жылғы 19 наурыздан бері Claude Pro/Max жазылымымен кіру мүмкін емес (Anthropic-тің құқықтық талабы бойынша алынып тасталған), ал 2026 жылдың қаңтарында аутентификациясыз қашықтан код орындау осалдығы жарияланды — жаңартып отыр.',
    },
    free: {
      en: 'The tool itself is free, plus a rotating set of free beta models on Zen (today: Big Pickle, MiMo-V2.5, Nemotron 3 variants, Muse Spark 1.3 contributor tier). Zen is otherwise pay-as-you-go and auto-reloads $20 when the balance drops below $5 — you can turn that off.',
      kk: 'Құралдың өзі тегін, оған қоса Zen-де ауысып тұратын тегін бета модельдер бар (бүгін: Big Pickle, MiMo-V2.5, Nemotron 3 нұсқалары, Muse Spark 1.3 contributor деңгейі). Қалған жағдайда Zen — қолданғаныңа қарай төлем: баланс $5-тен төмен түскенде автоматты түрде $20 толтырады, оны өшіруге болады.',
    },
    paidFrom: null,
    install:
      'curl -fsSL https://opencode.ai/install | bash  •  Windows: choco install opencode or scoop install opencode',
    docs: 'https://opencode.ai/docs/',
    rulesFile: 'AGENTS.md (/init generates it)',
    startHere: false,
    kzNote: null,
  },
  {
    id: 'aider',
    name: 'Aider',
    vendor: 'Aider (open source)',
    kind: 'terminal',
    tagline: {
      en: 'The original open-source terminal pair programmer: git-native, with a repo map and an architect/editor mode.',
      kk: 'Терминалдағы алғашқы ашық бастапқы кодты жұптық бағдарламашы: git-пен тығыз байланысқан, репозиторий картасы және architect/editor режимі бар.',
    },
    strength: {
      en: 'It teaches git discipline better than anything else, because it commits every change automatically — every step is reversible. Tiny, scriptable, and happy with local models.',
      kk: 'git тәртібін бәрінен жақсы үйретеді, себебі әр өзгерісті автоматты түрде commit жасайды — кез келген қадамды кері қайтара аласың. Кішкентай, скриптке ыңғайлы, жергілікті модельдермен де жұмыс істейді.',
    },
    weakness: {
      en: 'Development has stalled: the last tagged release is v0.86.0 from 9 Aug 2025 and its loop is simple next to a 2026 agent. Treat it as legacy — good for learning the idea, not for daily work.',
      kk: 'Дамуы тоқтап қалған: соңғы белгіленген шығарылым — 2025 жылғы 9 тамыздағы v0.86.0, ал циклі 2026 жылғы агенттермен салыстырғанда қарапайым. Оны ескі құрал деп қара: идеяны түсінуге жақсы, күнделікті жұмысқа емес.',
    },
    free: {
      en: 'Free and open source; you pay only for the model through your own API key.',
      kk: 'Тегін әрі ашық бастапқы кодты; тек өз API кілтің арқылы модель үшін төлейсің.',
    },
    paidFrom: null,
    install: 'python -m pip install -U aider-chat',
    docs: 'https://aider.chat/docs/',
    rulesFile: 'AGENTS.md',
    startHere: false,
    kzNote: null,
  },

  // ------------------------------------------------------- rung 1: app builders
  {
    id: 'lovable',
    name: 'Lovable',
    vendor: 'Lovable',
    kind: 'app-builder',
    tagline: {
      en: 'Chat your way to a full-stack web app with a built-in cloud backend and GitHub sync.',
      kk: 'Чат арқылы толық қолданба жасайсың: бұлттық backend ішіне салынған, GitHub-пен синхрондалады.',
    },
    strength: {
      en: 'The fastest path from an idea to a shareable MVP if you have never opened a terminal — the backend and the hosting come with it, so a demo link exists the same evening.',
      kk: 'Терминалды бір рет те ашпаған адам үшін идеядан бөлісуге болатын MVP-ге дейінгі ең жылдам жол: backend те, хостинг те бірге келеді — сілтеме сол кеші дайын болады.',
    },
    weakness: {
      en: 'Credits vanish into debugging loops, and runtime (Cloud/AI) usage is billed separately after launch. App builders also hide the code, which is exactly the part you came to learn.',
      kk: 'Кредиттер қатені іздеу шеңберінде тез жоғалады, ал іске қосқаннан кейінгі Cloud/AI шығыны бөлек есептеледі. Оның үстіне мұндай құралдар кодты жасырады — ал сен дәл соны үйренуге келдің.',
    },
    free: {
      en: '5 build credits/day, capped at 30 per month, plus 20 Cloud credits and 4 AI credits a month.',
      kk: 'Күніне 5 build кредиті, айына 30-дан аспайды, оған қоса айына 20 Cloud және 4 AI кредиті.',
    },
    paidFrom: '$25/mo (Pro, 200 credits/month; secondary source)',
    install: 'https://lovable.dev',
    docs: 'https://docs.lovable.dev',
    rulesFile: null,
    startHere: false,
    kzNote: {
      en: 'A student discount page exists at lovable.dev/students, but whether Kazakhstani universities qualify is not confirmed — check before you count on it.',
      kk: 'lovable.dev/students бетінде студенттік жеңілдік бар, бірақ қазақстандық университеттердің жарайтыны расталмаған — сенер алдында тексер.',
    },
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    vendor: 'StackBlitz',
    kind: 'app-builder',
    tagline: {
      en: 'An in-browser full-stack dev environment driven by chat — real files, real terminal, zero install.',
      kk: 'Браузердің ішіндегі толық әзірлеу ортасы, чатпен басқарылады: нақты файлдар, нақты терминал, ештеңе орнатудың керегі жоқ.',
    },
    strength: {
      en: 'You watch the real files and a real terminal while the agent works, so it is the app builder that teaches the most. Nothing to install, so it runs on a weak laptop or a school computer.',
      kk: 'Агент жұмыс істеп жатқанда нақты файлдарды да, нақты терминалды да көресің — сондықтан бұл бірінші сатыдағы құралдардың ішінде ең көп үйрететіні. Ештеңе орнатпайсың, сондықтан әлсіз ноутбукта да, мектеп компьютерінде де жүреді.',
    },
    weakness: {
      en: 'Token burn grows with the size of the project, so a big app eats the daily allowance quickly.',
      kk: 'Жоба өскен сайын токен шығыны да өседі, сондықтан үлкен қолданба күндік мөлшерді тез жеп қояды.',
    },
    free: {
      en: '300K tokens/day and 1M tokens/month, with Bolt branding on what you publish.',
      kk: 'Күніне 300 мың токен, айына 1 млн токен; жариялаған жұмысыңда Bolt белгісі қалады.',
    },
    paidFrom: '$25/mo (Pro, 10M+ tokens/month, one month of rollover)',
    install: 'https://bolt.new',
    docs: 'https://support.bolt.new',
    rulesFile: null,
    startHere: false,
    kzNote: null,
  },
  {
    id: 'v0',
    name: 'v0',
    vendor: 'Vercel',
    kind: 'app-builder',
    tagline: {
      en: 'Prompt to UI and Next.js apps, with one-click deploy to Vercel.',
      kk: 'Промпттан интерфейс пен Next.js қолданбасын жасайды, бір батырмамен Vercel-ге deploy жасайды.',
    },
    strength: {
      en: 'The best-looking React/Tailwind UI of any generator, with a design mode and GitHub sync — the fastest way to a landing page you are not ashamed of.',
      kk: 'Осындай құралдардың ішіндегі ең әдемі React/Tailwind интерфейсі, дизайн режимі және GitHub синхронизациясы бар — ұялмай көрсететін landing бетке дейінгі ең жылдам жол.',
    },
    weakness: {
      en: 'Next.js and Vercel centric, and the free allowance is small: 7 messages a day. On 21 Sep 2026 the Plus card showed "$30" next to a "$90" figure, so re-check the price before you plan a budget.',
      kk: 'Next.js пен Vercel-ге бейімделген, ал тегін мөлшері аз: күніне 7 хабарлама. 2026 жылғы 21 қыркүйекте Plus картасында «$30» деген баға «$90» дегеннің қасында тұрды, сондықтан бюджет жоспарламас бұрын бағаны қайта тексер.',
    },
    free: {
      en: '$5 of credits a month, 7 messages/day, GitHub sync included.',
      kk: 'Айына $5 кредит, күніне 7 хабарлама, GitHub синхронизациясы бар.',
    },
    paidFrom: '$30/mo (Plus, includes $30 credits and $2 daily login credits)',
    install: 'https://v0.app',
    docs: 'https://v0.app/docs',
    rulesFile: null,
    startHere: false,
    kzNote: {
      en: 'A student plan exists, but eligibility from Kazakhstan is not confirmed.',
      kk: 'Студенттік жоспар бар, бірақ Қазақстаннан кім жарайтыны расталмаған.',
    },
  },
  {
    id: 'replit',
    name: 'Replit Agent',
    vendor: 'Replit',
    kind: 'app-builder',
    tagline: {
      en: 'A cloud IDE plus an agent that builds, hosts and gives you a database — from any machine, even a phone.',
      kk: 'Бұлттық IDE редакторы және қолданбаны жасап, орналастырып, дерекқор беретін агент — кез келген құрылғыдан, тіпті телефоннан.',
    },
    strength: {
      en: 'Everything in one place: code, database and deploy. It is the only realistic option when your only device is a Chromebook, a borrowed computer or a phone.',
      kk: 'Бәрі бір жерде: код, дерекқор және deploy. Қолыңда Chromebook, біреуден сұраған компьютер не телефон ғана болса, бұл — жалғыз шынайы нұсқа.',
    },
    weakness: {
      en: 'Effort-based agent pricing is hard to predict, Full build and Plan mode are paid-only, and on Starter a published app’s link expires after 30 days.',
      kk: 'Агент бағасы жұмсалған күшке қарай есептеледі, сондықтан болжау қиын; Full build пен Plan режимі тек ақылы жоспарда, ал Starter-де жарияланған қолданбаның сілтемесі 30 күннен кейін өшеді.',
    },
    free: {
      en: 'Starter: daily Agent credits with a monthly cap, 1 published app (link expires after 30 days), 2 GB, Lite build mode only.',
      kk: 'Starter: күндік Agent кредиттері (айлық шегі бар), 1 жарияланған қолданба (сілтемесі 30 күннен кейін өшеді), 2 ГБ, тек Lite build режимі.',
    },
    paidFrom: '$20/mo (Core, $18 annual, includes $20 of model credits)',
    install: 'https://replit.com',
    docs: 'https://docs.replit.com',
    rulesFile: null,
    startHere: false,
    kzNote: null,
  },
];

export const toolKinds: { id: Tool['kind']; label: { en: string; kk: string } }[] = [
  {
    id: 'app-builder',
    label: {
      en: 'Prompt-to-app builders',
      kk: 'Промпттан қолданба жасайтын құралдар',
    },
  },
  {
    id: 'ide',
    label: {
      en: 'AI IDEs and editor agents',
      kk: 'AI редакторлары (IDE) және редактор агенттері',
    },
  },
  {
    id: 'extension',
    label: {
      en: 'Editor extensions',
      kk: 'Редактор кеңейтімдері',
    },
  },
  {
    id: 'terminal',
    label: {
      en: 'Terminal agents',
      kk: 'Терминал агенттері',
    },
  },
  {
    id: 'cloud',
    label: {
      en: 'Async and cloud agents',
      kk: 'Async және бұлттық агенттер',
    },
  },
];

export const pickGuide: {
  situation: { en: string; kk: string };
  /** Tool ids, best first */
  pick: string[];
  why: { en: string; kk: string };
}[] = [
  {
    situation: {
      en: 'You are a student with a university email and a budget of zero',
      kk: 'Сен университет поштасы бар, бюджеті нөлге тең студентсің',
    },
    pick: ['copilot', 'jules', 'antigravity'],
    why: {
      en: 'GitHub Education gives you the Copilot Student plan with no card at all: unlimited completions plus 200 AI credits a month. Add Jules for free async pull requests (15 tasks/day), and Antigravity if you are 18 or older and want a bigger free agent.',
      kk: 'GitHub Education карта сұрамай Copilot Student жоспарын береді: автотолтыру шексіз, айына 200 AI кредиті. Оған тегін async pull request үшін Jules-ты қос (күніне 15 тапсырма), ал 18-ден асқан болсаң әрі күштірек тегін агент керек болса — Antigravity.',
    },
  },
  {
    situation: {
      en: 'You have never opened a terminal and you need a demo by Friday',
      kk: 'Сен терминалды ешқашан ашып көрмегенсің, ал жұмаға демо керек',
    },
    pick: ['lovable', 'bolt', 'v0'],
    why: {
      en: 'Rung 1 gives you a working link in one evening: Lovable for a full-stack app with a backend, Bolt if you want to see the real files and terminal in the browser, v0 for the best-looking UI. Then move up a rung — builders hide the code you actually came to learn.',
      kk: 'Бірінші саты бір кеште жұмыс істейтін сілтеме береді: backend-і бар толық қолданбаға — Lovable, браузерде нақты файлдар мен терминалды көргің келсе — Bolt, ең әдемі интерфейске — v0. Содан соң жоғарырақ сатыға көтеріл: бұл құралдар сен үйренуге келген кодты жасырады.',
    },
  },
  {
    situation: {
      en: 'You already know VS Code and want the shortest path to an agent',
      kk: 'Сен VS Code-ты білесің және агентке дейінгі ең қысқа жолды іздейсің',
    },
    pick: ['copilot', 'cursor', 'cline'],
    why: {
      en: 'Same keybindings, no new editor to learn. Copilot is the cheapest paid agent at $10/mo and free for students; Cursor has the smoothest agent loop and every vendor’s models; Cline shows you every tool call and its token cost, which is the best way to understand what an agent really does.',
      kk: 'Пернелер тіркесімі сол күйінде, жаңа редактор үйренудің керегі жоқ. Copilot — айына $10 тұратын ең арзан ақылы агент, студентке тегін; Cursor-да агент циклі ең тегіс әрі барлық вендордың модельдері бар; Cline әр құрал шақыруын және оның токен құнын көрсетеді — агенттің не істеп жатқанын түсінудің ең жақсы жолы.',
    },
  },
  {
    situation: {
      en: 'You are comfortable with git and the terminal and want to understand how agents really work',
      kk: 'Сен git пен терминалды еркін меңгергенсің және агенттердің шын мәнінде қалай жұмыс істейтінін түсінгің келеді',
    },
    pick: ['claude-code', 'codex-cli', 'antigravity-cli', 'opencode'],
    why: {
      en: 'Terminal agents in a real git repository, which is where this course lives. Claude Code is the main track; Codex CLI comes with any ChatGPT plan, even the cheap $8 one; agy is $0 if you are 18+; opencode is open source with free beta models, so you can read the loop instead of guessing it.',
      kk: 'Нақты git репозиторийіндегі терминал агенттері — осы курстың негізгі алаңы. Claude Code — басты бағыт; Codex CLI кез келген ChatGPT жоспарымен, тіпті $8 тұратынымен де келеді; 18-ден асқан болсаң, agy — $0; opencode ашық бастапқы кодты әрі тегін бета модельдері бар, сондықтан циклді болжамай, кодынан оқып шығасың.',
    },
  },
  {
    situation: {
      en: 'You already pay for one AI subscription and do not want a second',
      kk: 'Сен бір ЖИ жазылымын төлеп қойдың және екіншісін алғың келмейді',
    },
    pick: ['claude-code', 'codex-cli', 'cursor'],
    why: {
      en: 'Do not stack subscriptions — one $20 plan is enough. Claude Pro already includes Claude Code; ChatGPT Plus already includes Codex on three surfaces; and if what you want is one GUI editor with every vendor’s models, that is Cursor Pro at $20.',
      kk: 'Жазылымдарды үстемелеме — бір $20 жоспары жеткілікті. Claude Pro-ның ішінде Claude Code бар; ChatGPT Plus-тың ішінде Codex үш бетте де бар; ал саған барлық вендордың моделі бір графикалық редакторда керек болса — ол $20 тұратын Cursor Pro.',
    },
  },
  {
    situation: {
      en: 'You have a real repo with tests and want work done while you sleep',
      kk: 'Сенде тесттері бар нақты репозиторий бар және жұмыс сен ұйықтап жатқанда істелгенін қалайсың',
    },
    pick: ['jules', 'codex-cloud', 'copilot-cloud', 'devin-cloud'],
    why: {
      en: 'Rung 4. Start with Jules because it is free, then use the cloud agent that comes with the subscription you already pay for: Codex cloud, the Copilot coding agent, or Devin Cloud on the $20 Pro plan. All of them need a repo that builds in a clean VM, tests that actually run, and a human who reads the diff before merging.',
      kk: 'Төртінші саты. Тегін болғандықтан Jules-тан баста, сосын бұрыннан төлеп жүрген жазылымыңмен келетін бұлттық агентті қолдан: Codex cloud, Copilot coding agent немесе $20 тұратын Pro жоспарындағы Devin Cloud. Бәріне де таза виртуалды машинада құрастырылатын репозиторий, шынымен жүретін тесттер және merge жасамас бұрын өзгерісті оқитын адам керек.',
    },
  },
];
