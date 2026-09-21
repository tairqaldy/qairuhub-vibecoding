// Single source of truth for the course structure.
// Localised copy (title, objective, body) lives in the MDX frontmatter per locale;
// the titles here are used for navigation and as a fallback when a translation is missing.

export type Lang = 'en' | 'kk';
export type ActId = 'why' | 'how' | 'scale';
type L = Record<Lang, string>;

export interface Act {
  id: ActId;
  n: string;
  title: L;
  tagline: L;
}

export interface Module {
  slug: string;
  order: number;
  act: ActId;
  /** step in the 9-step vibecoding cycle, if the module maps to one */
  cycleStep?: number;
  minutes: number;
  xp: number;
  title: L;
  blurb: L;
  widget: string;
}

export interface Lab {
  slug: string;
  order: number;
  minutes: number;
  xp: number;
  level: 1 | 2 | 3;
  tool: 'claude-code' | 'cursor' | 'codex' | 'gemini' | 'any';
  title: L;
  blurb: L;
}

export const acts: Act[] = [
  {
    id: 'why',
    n: 'I',
    title: { en: 'Why', kk: 'Неге' },
    tagline: { en: 'The story, the evidence, the mindset', kk: 'Тарих, дәлел, ойлау тәсілі' },
  },
  {
    id: 'how',
    n: 'II',
    title: { en: 'How', kk: 'Қалай' },
    tagline: { en: 'The 9-step cycle, one step at a time', kk: '9 қадамдық цикл — бір-бірлеп' },
  },
  {
    id: 'scale',
    n: 'III',
    title: { en: 'Scale', kk: 'Ауқым' },
    tagline: { en: 'From one agent to a team of them', kk: 'Бір agent-тен тұтас командаға' },
  },
];

export const modules: Module[] = [
  {
    slug: 'the-tweet', order: 0, act: 'why', minutes: 8, xp: 50, widget: 'none',
    title: { en: 'The Tweet That Named a Movement', kk: 'Қозғалысқа ат берген твит' },
    blurb: { en: 'What vibe coding is, what it is not, and how one throwaway post became Word of the Year.', kk: 'Vibe coding деген не, не емес және бір кездейсоқ жазба қалай «Жыл сөзіне» айналды.' },
  },
  {
    slug: 'why-now', order: 1, act: 'why', minutes: 8, xp: 50, widget: 'guess-the-number',
    title: { en: 'Why This Skill Matters Now', kk: 'Бұл дағды неге дәл қазір маңызды' },
    blurb: { en: 'The 95% and the 19%: the gap between how fast AI feels and how fast it is.', kk: '95% және 19%: ЖИ қаншалықты жылдам сезілетіні мен шын жылдамдығының арасы.' },
  },
  {
    slug: 'ai-in-plain-language', order: 2, act: 'why', minutes: 10, xp: 60, widget: 'tokenizer',
    title: { en: 'AI in Plain Language', kk: 'ЖИ қарапайым тілмен' },
    blurb: { en: 'Tokens, context windows, hallucinations, agents and MCP without the jargon.', kk: 'Token, контекст терезесі, галлюцинация, agent және MCP — терминсіз түсіндірме.' },
  },
  {
    slug: 'problem-solving-mindset', order: 3, act: 'why', minutes: 8, xp: 50, widget: 'none',
    title: { en: 'The Problem-Solving Mindset', kk: 'Мәселе шешу ойлауы' },
    blurb: { en: 'Understand, plan, do, review. The agent types; you still think.', kk: 'Түсін, жоспарла, орында, тексер. Кодты agent жазады, ойлайтын — сен.' },
  },
  {
    slug: 'idea-to-prd', order: 4, act: 'how', cycleStep: 1, minutes: 9, xp: 60, widget: 'prd-wizard',
    title: { en: 'Idea → Product', kk: 'Идея → Өнім' },
    blurb: { en: 'Turn a vague idea into a one-page PRD an agent can actually build from.', kk: 'Бұлыңғыр идеяны agent шынымен құра алатын бір беттік PRD-ге айналдыр.' },
  },
  {
    slug: 'references', order: 5, act: 'how', cycleStep: 2, minutes: 7, xp: 40, widget: 'none',
    title: { en: 'References', kk: 'Үлгілер мен дереккөздер' },
    blurb: { en: 'Screenshots, examples and API samples: show the agent what good looks like.', kk: 'Скриншот, мысал, API үлгілері: agent-ке «жақсы» қандай болатынын көрсет.' },
  },
  {
    slug: 'context-ssot', order: 6, act: 'how', cycleStep: 3, minutes: 11, xp: 70, widget: 'agents-md-builder',
    title: { en: 'Context & the Single Source of Truth', kk: 'Контекст және бірыңғай шындық көзі' },
    blurb: { en: 'CLAUDE.md, AGENTS.md and the master prompt: the memory your agent does not have.', kk: 'CLAUDE.md, AGENTS.md және master prompt: agent-те жоқ жадтың орнына.' },
  },
  {
    slug: 'the-agent', order: 7, act: 'how', cycleStep: 4, minutes: 12, xp: 80, widget: 'claude-code-sim',
    title: { en: 'The AI Coding Agent', kk: 'ЖИ coding agent' },
    blurb: { en: 'Claude Code, Cursor, Codex, Gemini CLI: plan mode, permissions and prompts that work.', kk: 'Claude Code, Cursor, Codex, Gemini CLI: plan mode, рұқсаттар және жұмыс істейтін prompt-тар.' },
  },
  {
    slug: 'local-build', order: 8, act: 'how', cycleStep: 5, minutes: 9, xp: 60, widget: 'fake-terminal',
    title: { en: 'Code & Local Build', kk: 'Код және жергілікті құрастыру' },
    blurb: { en: 'Folders, the terminal, .env and a dev server: your workshop bench.', kk: 'Қалталар, терминал, .env және dev server: сенің жұмыс үстелің.' },
  },
  {
    slug: 'git-and-github', order: 9, act: 'how', cycleStep: 6, minutes: 11, xp: 70, widget: 'git-sim',
    title: { en: 'Repo & Version Control', kk: 'Репозиторий және нұсқаларды басқару' },
    blurb: { en: 'Commits are save points. Learn to undo anything an agent does.', kk: 'Commit — сақтау нүктесі. Agent жасаған кез келген нәрсені кері қайтаруды үйрен.' },
  },
  {
    slug: 'test-and-quality', order: 10, act: 'how', cycleStep: 7, minutes: 9, xp: 60, widget: 'none',
    title: { en: 'Test & Quality', kk: 'Тестілеу және сапа' },
    blurb: { en: 'Plausible is not correct. Make the agent prove its work.', kk: 'Шынайы көріну — дұрыс деген сөз емес. Agent жұмысын дәлелдесін.' },
  },
  {
    slug: 'security', order: 11, act: 'how', cycleStep: 7, minutes: 12, xp: 90, widget: 'spot-the-bug',
    title: { en: 'Security: When the Vibes Go Wrong', kk: 'Қауіпсіздік: vibe бұзылған кезде' },
    blurb: { en: 'A deleted database, 72,000 leaked photos, and the checklist that prevents both.', kk: 'Жойылған дерекқор, 72 000 жария болған фото және осының алдын алатын тізім.' },
  },
  {
    slug: 'deploy', order: 12, act: 'how', cycleStep: 8, minutes: 10, xp: 70, widget: 'deploy-sim',
    title: { en: 'Deploy', kk: 'Deploy: жариялау' },
    blurb: { en: 'From localhost to a real URL with a domain, SSL and zero dollars.', kk: 'Localhost-тан домені, SSL-і бар нақты URL-ге — нөл теңгеге.' },
  },
  {
    slug: 'logs-and-feedback', order: 13, act: 'how', cycleStep: 9, minutes: 8, xp: 50, widget: 'none',
    title: { en: 'Logs & Feedback', kk: 'Логтар және кері байланыс' },
    blurb: { en: 'Read what production tells you and feed it into the next loop.', kk: 'Production не айтып тұрғанын оқып, оны келесі циклге енгіз.' },
  },
  {
    slug: 'multi-agent', order: 14, act: 'scale', minutes: 12, xp: 90, widget: 'orchestrator',
    title: { en: 'Multi-Agent Development Systems', kk: 'Көп агентті әзірлеу жүйелері' },
    blurb: { en: 'Orchestrators, subagents, worktrees and when one agent is still the right answer.', kk: 'Orchestrator, subagent, worktree және қай кезде бір agent жеткілікті.' },
  },
  {
    slug: 'overnight-builds', order: 15, act: 'scale', minutes: 10, xp: 100, widget: 'none',
    title: { en: 'Autonomous Builds & What Comes Next', kk: 'Автономды құрастыру және әрі қарай не болады' },
    blurb: { en: 'This site was built overnight by agents. Here is exactly how, and where you go from here.', kk: 'Бұл сайтты agent-тер бір түнде құрастырды. Дәл қалай жасалғаны және сенің келесі қадамың.' },
  },
];

export const labs: Lab[] = [
  {
    slug: 'setup', order: 0, minutes: 20, xp: 60, level: 1, tool: 'any',
    title: { en: 'Set Up Your Machine', kk: 'Компьютеріңді дайында' },
    blurb: { en: 'Node, git, an editor and the accounts you need. Windows, macOS and Linux.', kk: 'Node, git, редактор және қажетті аккаунттар. Windows, macOS және Linux.' },
  },
  {
    slug: 'claude-code-first-session', order: 1, minutes: 20, xp: 80, level: 1, tool: 'claude-code',
    title: { en: 'Claude Code: Your First Session', kk: 'Claude Code: алғашқы сессия' },
    blurb: { en: 'Install it, say hello, let it explore a repo and explain it back to you.', kk: 'Орнат, сәлемдес, репозиторийді зерттетіп, өзіңе түсіндіртіп көр.' },
  },
  {
    slug: 'plan-mode-build', order: 2, minutes: 25, xp: 100, level: 1, tool: 'claude-code',
    title: { en: 'Plan Mode: Build a Real Page', kk: 'Plan mode: нақты бет құрастыру' },
    blurb: { en: 'Explore, plan, code, commit: ship the QAIRU Event Sign-up landing page.', kk: 'Зертте, жоспарла, кодта, commit жаса: QAIRU Event Sign-up бетін шығар.' },
  },
  {
    slug: 'claude-md-and-permissions', order: 3, minutes: 20, xp: 100, level: 2, tool: 'claude-code',
    title: { en: 'CLAUDE.md, Permissions & Slash Commands', kk: 'CLAUDE.md, рұқсаттар және slash командалар' },
    blurb: { en: 'Give the agent a memory and a fence. Stop repeating yourself.', kk: 'Agent-ке жад пен шекара бер. Бір нәрсені қайталай беруді доғар.' },
  },
  {
    slug: 'undo-anything', order: 4, minutes: 20, xp: 100, level: 2, tool: 'claude-code',
    title: { en: 'Undo Anything: Git, Checkpoints & Rewind', kk: 'Кез келгенін қайтар: git, checkpoint және rewind' },
    blurb: { en: 'Break the project on purpose, then recover it three different ways.', kk: 'Жобаны әдейі бұз да, оны үш түрлі жолмен қалпына келтір.' },
  },
  {
    slug: 'mcp-skills-subagents', order: 5, minutes: 25, xp: 120, level: 2, tool: 'claude-code',
    title: { en: 'MCP, Skills & Subagents', kk: 'MCP, skill және subagent' },
    blurb: { en: 'Plug tools into your agent, teach it a repeatable skill, delegate to a helper.', kk: 'Agent-ке құралдар қос, қайталанатын skill үйрет, көмекшіге тапсырма бер.' },
  },
  {
    slug: 'ship-it', order: 6, minutes: 25, xp: 120, level: 2, tool: 'claude-code',
    title: { en: 'Ship It: Deploy With Your Agent', kk: 'Шығар: agent-пен бірге deploy жасау' },
    blurb: { en: 'GitHub, Cloudflare Pages and a live URL you can send to a friend.', kk: 'GitHub, Cloudflare Pages және досыңа жібере алатын тірі URL.' },
  },
  {
    slug: 'parallel-agents', order: 7, minutes: 30, xp: 150, level: 3, tool: 'claude-code',
    title: { en: 'Parallel Agents With Worktrees', kk: 'Worktree арқылы параллель agent-тер' },
    blurb: { en: 'Run two agents on two branches at once and merge their work safely.', kk: 'Екі agent-ті екі branch-та қатар іске қосып, жұмысын қауіпсіз біріктір.' },
  },
  {
    slug: 'other-tools', order: 8, minutes: 25, xp: 80, level: 1, tool: 'any',
    title: { en: 'Cursor, Codex & Gemini CLI Quickstarts', kk: 'Cursor, Codex және Gemini CLI: жылдам бастау' },
    blurb: { en: 'The same workflow in three other tools, including a free one.', kk: 'Сол бір жұмыс тәсілі үш басқа құралда — оның ішінде тегіні де бар.' },
  },
];

export const cycle: { n: number; key: string; title: L; hint: L }[] = [
  { n: 1, key: 'idea', title: { en: 'Idea / Product', kk: 'Идея / Өнім' }, hint: { en: 'Problem, users, definition of done', kk: 'Мәселе, пайдаланушылар, дайындық анықтамасы' } },
  { n: 2, key: 'references', title: { en: 'References', kk: 'Үлгілер' }, hint: { en: 'Examples, screenshots, API samples', kk: 'Мысалдар, скриншоттар, API үлгілері' } },
  { n: 3, key: 'context', title: { en: 'Context / SSOT', kk: 'Контекст / SSOT' }, hint: { en: 'PRD, CLAUDE.md, master prompt', kk: 'PRD, CLAUDE.md, master prompt' } },
  { n: 4, key: 'agent', title: { en: 'AI Coding Agent', kk: 'ЖИ coding agent' }, hint: { en: 'Plan mode, tools, MCP', kk: 'Plan mode, құралдар, MCP' } },
  { n: 5, key: 'code', title: { en: 'Code / Local Build', kk: 'Код / Жергілікті құрастыру' }, hint: { en: 'Terminal, .env, dev server', kk: 'Терминал, .env, dev server' } },
  { n: 6, key: 'repo', title: { en: 'Repo / Version Control', kk: 'Репозиторий / Нұсқалар' }, hint: { en: 'Commits, branches, pull requests', kk: 'Commit, branch, pull request' } },
  { n: 7, key: 'test', title: { en: 'Test / Quality', kk: 'Тест / Сапа' }, hint: { en: 'Tests, review, security', kk: 'Тест, review, қауіпсіздік' } },
  { n: 8, key: 'deploy', title: { en: 'Deploy', kk: 'Deploy' }, hint: { en: 'Hosting, domain, SSL, secrets', kk: 'Хостинг, домен, SSL, құпиялар' } },
  { n: 9, key: 'logs', title: { en: 'Logs / Feedback', kk: 'Логтар / Кері байланыс' }, hint: { en: 'Errors, analytics, next iteration', kk: 'Қателер, аналитика, келесі итерация' } },
];

export const totalXp = modules.reduce((s, m) => s + m.xp, 0) + labs.reduce((s, l) => s + l.xp, 0);
export const moduleBySlug = (slug: string) => modules.find((m) => m.slug === slug);
export const labBySlug = (slug: string) => labs.find((l) => l.slug === slug);
export const lessonFile = (m: Module) => `${String(m.order).padStart(2, '0')}-${m.slug}`;
export const labFile = (l: Lab) => `${String(l.order).padStart(2, '0')}-${l.slug}`;
