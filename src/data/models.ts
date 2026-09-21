// MODELS CATALOGUE
//
// The model and the environment are two different choices. Claude Code, Cursor,
// Codex, Antigravity and opencode are environments: the loop, the tools, the
// permissions, the files it reads. What you see below is the engine you drop
// into that loop. Most environments let you swap the engine, and the bill,
// the context window and the failure modes all change when you do.
//
// PRICES AND LIMITS BELOW WERE TAKEN FROM THE RESEARCH FILES VERIFIED ON
// 21 SEPTEMBER 2026. THEY MOVE — promotional prices expire, small models get
// cheaper, models get retired, and at least one vendor changed a price twice
// in 2026. Treat every number here as a starting point, not a quote, and open
// the `docs` link before you put a figure on a slide or in a budget.
//
// All prices are USD per 1,000,000 tokens, standard (non-batch, non-cached)
// tier, input / output. `null` means the research did not state it — that is
// deliberate, not laziness: an unstated number is better than a guessed one.

// Self-contained on purpose: this file imports nothing, so it can be read,
// copied or checked on its own. `Lang` stays local to avoid colliding with the
// identically shaped type exported from curriculum.ts.
type Lang = 'en' | 'kk';
type L = Record<Lang, string>;

/**
 * tier groups the catalogue for a reader, not for a benchmark:
 *  - 'flagship'  the most capable, most expensive thing a lab sells
 *  - 'balanced'  the everyday workhorse most people should actually use
 *  - 'small'     cheap and fast, for narrow jobs and sub-agents
 *  - 'open'      open weights of any size — you can download them; whether
 *                you can RUN them is a separate question, see `note`
 */
export interface Model {
  id: string;
  name: string;
  vendor: string;
  tier: 'flagship' | 'balanced' | 'small' | 'open';
  contextTokens: number | null;
  inputPerM: number | null;
  outputPerM: number | null;
  goodAt: L;
  note: L;
  openWeights: boolean;
  freeAccess: L | null;
  docs: string;
}

export const pricesCheckedOn = '2026-09-21';

export const models: Model[] = [
  // ---------------------------------------------------------------- Anthropic
  {
    id: 'claude-fable-5-1',
    name: 'Claude Fable 5.1',
    vendor: 'Anthropic',
    tier: 'flagship',
    contextTokens: 1000000,
    inputPerM: 10,
    outputPerM: 50,
    goodAt: {
      en: 'The most capable model Anthropic has released widely. Long agent runs across a big codebase, adaptive thinking always on, and the full 1M-token window billed at the normal per-token rate — a 900k-token request costs the same per token as a 9k one.',
      kk: 'Anthropic кең таратқан ең күшті модель. Үлкен код базасында ұзақ агенттік сеанстар жүргізуге арналған, ойлану режимі әрқашан қосулы, ал 1 млн токендік контекст терезесі қалыпты бағамен есептеледі: 900 мың токендік сұрау да, 9 мың токендік сұрау да бір токен үшін бірдей тұрады.',
    },
    note: {
      en: 'The most expensive option on this page: five times Sonnet 5 for input, five times for output. Anthropic own documentation says to start with Opus 5 for most workloads, so reach for Fable only when Opus visibly fails. Claude Mythos 5.1 is the same capability at the same price but is limited to Project Glasswing participants. Cache reads are 2.5% of input here, cheaper than the usual 10%.',
      kk: 'Беттегі ең қымбат нұсқа: кіріс бойынша да, шығыс бойынша да Sonnet 5-тен бес есе қымбат. Anthropic құжаттамасының өзі «көп жағдайда Opus 5-тен баста» дейді, сондықтан Fable-ді Opus нақты жеткізбей жатқанда ғана ал. Claude Mythos 5.1 — дәл сондай қуат пен баға, бірақ ол тек Project Glasswing қатысушыларына ашық. Кэштен оқу мұнда кірістің 2,5%-ы, әдеттегі 10%-дан арзан.',
    },
    openWeights: false,
    freeAccess: {
      en: 'No standing free tier. New API accounts get a small amount of free credits and that is all.',
      kk: 'Тұрақты тегін деңгей жоқ. Жаңа API аккаунттарына шағын мөлшерде тегін кредит беріледі, бар болғаны сол.',
    },
    docs: 'https://platform.claude.com/docs/en/about-claude/models/overview',
  },
  {
    id: 'claude-opus-5',
    name: 'Claude Opus 5',
    vendor: 'Anthropic',
    tier: 'flagship',
    contextTokens: 1000000,
    inputPerM: 5,
    outputPerM: 25,
    goodAt: {
      en: 'The default recommendation in the Anthropic docs: start here for most workloads. Same 1M window and same 128k max output as Fable 5.1, at half the price.',
      kk: 'Anthropic құжаттамасындағы әдепкі ұсыныс: көп жағдайда осыдан баста. Контекст терезесі де (1 млн токен), ең үлкен жауап көлемі де (128 мың токен) Fable 5.1-дегідей, бірақ бағасы екі есе арзан.',
    },
    note: {
      en: 'There is also a fast mode research preview billed at Fable prices ($10 / $50), so check which mode your client actually sends before you assume the cheap rate. Anthropic commits to keeping Opus 5 available until at least 24 July 2027.',
      kk: 'Бұл модельдің Fable бағасымен ($10 / $50) есептелетін fast mode зерттеу нұсқасы да бар, сондықтан арзан тарифке сенер алдында құралың қай режимді жіберіп отырғанын тексер. Anthropic Opus 5-ті кемінде 2027 жылдың 24 шілдесіне дейін қолжетімді етіп ұстауға міндеттенген.',
    },
    openWeights: false,
    freeAccess: {
      en: 'No standing free tier. New API accounts get a small amount of free credits and that is all.',
      kk: 'Тұрақты тегін деңгей жоқ. Жаңа API аккаунттарына шағын мөлшерде тегін кредит беріледі, бар болғаны сол.',
    },
    docs: 'https://platform.claude.com/docs/en/about-claude/models/overview',
  },
  {
    id: 'claude-sonnet-5',
    name: 'Claude Sonnet 5',
    vendor: 'Anthropic',
    tier: 'balanced',
    contextTokens: 1000000,
    inputPerM: 2,
    outputPerM: 10,
    goodAt: {
      en: 'The workhorse of everyday vibecoding: a full 1M context and real agent quality at a fifth of the Fable 5.1 input price. If you are picking one Claude model to live in, this is usually it.',
      kk: 'Күнделікті vibecoding-тің жұмысшы аты: толық 1 млн контекст және нақты агенттік сапа, ал бағасы Fable 5.1 кірісінен бес есе арзан. Бір ғана Claude моделін таңдайтын болсаң, әдетте осы дұрыс.',
    },
    note: {
      en: 'The $2 / $10 was a launch promotion that became the permanent price — the announced rise to $3 / $15 on 1 September 2026 was cancelled. Older Sonnet 4.6 and 4.5 are still $3 / $15, so do not copy a price table written in 2025.',
      kk: '$2 / $10 — бастапқыда науқандық баға болған, кейін тұрақты бағаға айналды: 2026 жылдың 1 қыркүйегіне жоспарланған $3 / $15-ке көтерілу тоқтатылды. Ескі Sonnet 4.6 мен 4.5 әлі де $3 / $15, сондықтан 2025 жылы жазылған баға кестесін көшіріп алма.',
    },
    openWeights: false,
    freeAccess: {
      en: 'No standing free tier. New API accounts get a small amount of free credits and that is all.',
      kk: 'Тұрақты тегін деңгей жоқ. Жаңа API аккаунттарына шағын мөлшерде тегін кредит беріледі, бар болғаны сол.',
    },
    docs: 'https://platform.claude.com/docs/en/about-claude/models/overview',
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    vendor: 'Anthropic',
    tier: 'small',
    contextTokens: 200000,
    inputPerM: 1,
    outputPerM: 5,
    goodAt: {
      en: 'Cheap and fast for narrow, well-defined jobs: classifying, extracting, summarising, and running as a sub-agent under a bigger model.',
      kk: 'Тар әрі нақты тапсырмаларға арзан және жылдам: жіктеу, деректі бөліп алу, қысқаша мазмұндау және үлкен модельдің астында субагент ретінде жұмыс істеу.',
    },
    note: {
      en: 'The smallest window in the Anthropic line at 200k, and Anthropic only commits to keeping it alive until 15 October 2026 — do not build a demo you plan to show next year on it. Its knowledge is also the oldest of the four (training data to July 2025).',
      kk: 'Anthropic желісіндегі ең кіші контекст терезесі — 200 мың токен, әрі Anthropic оны тек 2026 жылдың 15 қазанына дейін ұстауға міндеттенген. Келесі жылы көрсетпекші демоңды осының үстіне құрма. Білімі де төртеуінің ішіндегі ең ескісі (оқыту деректері 2025 жылдың шілдесіне дейін).',
    },
    openWeights: false,
    freeAccess: {
      en: 'No standing free tier. New API accounts get a small amount of free credits and that is all.',
      kk: 'Тұрақты тегін деңгей жоқ. Жаңа API аккаунттарына шағын мөлшерде тегін кредит беріледі, бар болғаны сол.',
    },
    docs: 'https://platform.claude.com/docs/en/about-claude/models/overview',
  },

  // ------------------------------------------------------------------- OpenAI
  {
    id: 'gpt-6-astra',
    name: 'GPT-6 Astra',
    vendor: 'OpenAI',
    tier: 'flagship',
    contextTokens: 1050000,
    inputPerM: 10,
    outputPerM: 50,
    goodAt: {
      en: 'Described by OpenAI as their most capable model, and tied with Claude Fable 5.1 at the top of the independent Artificial Analysis Intelligence Index (53 at max effort). Knowledge cutoff 30 April 2026.',
      kk: 'OpenAI оны «ең қуатты моделіміз» деп сипаттайды, ал тәуелсіз Artificial Analysis Intelligence Index тізімінде ол Claude Fable 5.1-мен бірге бірінші орынды бөліседі (max режимінде 53 ұпай). Білім шегі — 2026 жылдың 30 сәуірі.',
    },
    note: {
      en: 'Same headline price as Fable 5.1, plus a 2x multiplier on long-context requests — so a genuinely big prompt costs double what the table says. Cached input is 10% of the normal rate, which matters a lot inside an agent loop.',
      kk: 'Негізгі бағасы Fable 5.1-дегідей, оның үстіне ұзын контекстті сұрауларға 2 есе көбейткіш қолданылады: шынымен үлкен промпт кестеде жазылғаннан екі есе қымбат тұрады. Кэштелген кіріс қалыпты бағаның 10%-ы ғана, ал бұл агенттік циклде үлкен рөл ойнайды.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Codex, the OpenAI coding agent, is listed as included in ChatGPT Free for quick coding tasks — but the Codex README only names paid plans, so test a free account before you rely on it in front of a room. On Plus the allowance is roughly 5 to 45 Astra messages per 5 hours.',
      kk: 'OpenAI компаниясының кодтау агенті Codex шағын тапсырмалар үшін тегін ChatGPT жоспарына кіреді деп жазылған, бірақ Codex README файлында тек ақылы жоспарлар аталады. Сондықтан аудитория алдында сүйенер алдында тегін аккаунтта тексеріп ал. Plus жоспарында 5 сағатта шамамен 5-тен 45-ке дейін Astra хабарламасы беріледі.',
    },
    docs: 'https://developers.openai.com/api/docs/models',
  },
  {
    id: 'gpt-5-6-sol',
    name: 'GPT-5.6 Sol',
    vendor: 'OpenAI',
    tier: 'balanced',
    contextTokens: 1050000,
    inputPerM: 4,
    outputPerM: 20,
    goodAt: {
      en: 'The balanced OpenAI workhorse for agent coding: 1.05M context, a lot cheaper than Astra, and the model most Codex tutorials assume. Knowledge cutoff 16 February 2026.',
      kk: 'Агенттік кодтауға арналған, OpenAI ұсынатын теңдестірілген жұмысшы модель: 1,05 млн контекст, Astra-дан әлдеқайда арзан, әрі Codex бойынша оқулықтардың көбі осыны болжайды. Білім шегі — 2026 жылдың 16 ақпаны.',
    },
    note: {
      en: 'The $4 / $20 is promotional pricing available at least through 21 November 2026, and no regular price is printed anywhere. Blogs quoting $5 / $30 for Sol are misreading the separate GPT-5.5 row — that is a different model with under 272k context. Budget for a rise.',
      kk: '$4 / $20 — кемінде 2026 жылдың 21 қарашасына дейін жарамды науқандық баға; тұрақты баға ешжерде жарияланбаған. Sol үшін $5 / $30 деп жазған блогтар кестедегі бөлек GPT-5.5 жолын шатастырып оқып отыр: ол — контексті 272 мың токеннен аз басқа модель. Бюджетті баға көтерілетінін ескеріп жоспарла.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Reachable through Codex on a paid ChatGPT plan; on Plus the allowance is roughly 10 to 100 Sol messages per 5 hours. The ChatGPT Go plan at $8 is the cheapest paid plan that includes Codex.',
      kk: 'Ақылы ChatGPT жоспарындағы Codex арқылы қолжетімді; Plus-та 5 сағатта шамамен 10-нан 100-ге дейін Sol хабарламасы беріледі. Codex кіретін ең арзан ақылы жоспар — $8 тұратын ChatGPT Go.',
    },
    docs: 'https://developers.openai.com/api/docs/pricing',
  },
  {
    id: 'gpt-5-6-terra',
    name: 'GPT-5.6 Terra',
    vendor: 'OpenAI',
    tier: 'balanced',
    contextTokens: 1050000,
    inputPerM: 2,
    outputPerM: 12,
    goodAt: {
      en: 'Half the input price of Sol with the same 1.05M window. A sensible default the day the Sol promotion ends, and the tier where a Codex subscription stretches furthest.',
      kk: 'Контекст терезесі Sol-дағыдай (1,05 млн), ал кіріс бағасы екі есе арзан. Sol-дың науқандық бағасы біткен күні дұрыс әдепкі таңдау, әрі Codex жазылымы дәл осы деңгейде ұзаққа жетеді.',
    },
    note: {
      en: 'In Codex on a Plus plan, Terra allows roughly 25 to 200 messages per 5 hours against 5 to 45 for Astra — the cheaper model buys you five times more attempts, and attempts are what agent work is made of.',
      kk: 'Plus жоспарындағы Codex-те Terra 5 сағатта шамамен 25-тен 200-ге дейін хабарламаға рұқсат етеді, ал Astra — небәрі 5-тен 45-ке дейін. Арзан модель саған бес есе көп талпыныс береді, ал агенттік жұмыс дәл талпыныстардан тұрады.',
    },
    openWeights: false,
    freeAccess: null,
    docs: 'https://developers.openai.com/api/docs/pricing',
  },
  {
    id: 'gpt-5-6-luna',
    name: 'GPT-5.6 Luna',
    vendor: 'OpenAI',
    tier: 'small',
    contextTokens: 1050000,
    inputPerM: 0.2,
    outputPerM: 1.2,
    goodAt: {
      en: 'Volume work inside the OpenAI family: classification, small edits, sub-agents, bulk rewriting. A fiftieth of the Astra input price with the same 1.05M window.',
      kk: 'OpenAI отбасындағы көлемді жұмысқа арналған: жіктеу, шағын өзгерістер, субагенттер, жаппай қайта жазу. Контекст терезесі сол 1,05 млн, ал кіріс бағасы Astra-дан елу есе арзан.',
    },
    note: {
      en: 'Older small models are still on the price list (GPT-5.4-mini at $0.75 / $4.50, GPT-5-mini at $0.25 / $2.00) and are simply worse value for the same job. Inside Codex on Plus, Luna carries by far the biggest allowance: roughly 250 to 2,000 messages per 5 hours.',
      kk: 'Баға тізімінде ескі кіші модельдер де тұр (GPT-5.4-mini — $0,75 / $4,50, GPT-5-mini — $0,25 / $2,00), бірақ олар дәл сол жұмысқа тиімсіз. Plus жоспарындағы Codex ішінде ең үлкен лимит Luna-да: 5 сағатта шамамен 250-ден 2 000-ға дейін хабарлама.',
    },
    openWeights: false,
    freeAccess: null,
    docs: 'https://developers.openai.com/api/docs/pricing',
  },
  {
    id: 'gpt-oss-20b',
    name: 'gpt-oss 20B',
    vendor: 'OpenAI',
    tier: 'open',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The open-weight OpenAI model that a real laptop can actually hold: a 14 GB download that Ollama says runs with as little as 16 GB of memory. The cheapest way to feel how an LLM behaves when nothing leaves your machine.',
      kk: 'Нағыз ноутбукке сыятын, салмақтары ашық OpenAI моделі: жүктелетін көлемі 14 ГБ, ал Ollama оны 16 ГБ жадпен-ақ іске қосуға болады дейді. Ештеңе құрылғыңнан шықпағанда LLM өзін қалай ұстайтынын сезінудің ең арзан жолы.',
    },
    note: {
      en: 'The big sibling gpt-oss:120b is a 65 GB download and wants an 80 GB GPU, so that one is cloud only. Be honest about what local buys you: privacy, offline work, zero cost and understanding — not frontier agent quality.',
      kk: 'Үлкен туысы gpt-oss:120b — 65 ГБ жүктеме, оған 80 ГБ GPU керек, сондықтан ол тек бұлтта жұмыс істейді. Жергілікті модель не беретінін шынайы бағала: құпиялылық, интернетсіз жұмыс, нөл шығын және түсінік — бірақ алдыңғы қатарлы агент сапасы емес.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Free: pull it with Ollama and run it offline. Google Antigravity also lists gpt-oss-120b on its free Individual plan, so you can try the big one without hardware.',
      kk: 'Тегін: Ollama арқылы жүктеп алып, интернетсіз іске қоса бер. Оның үстіне Google Antigravity-дің тегін Individual жоспарында gpt-oss-120b бар, сондықтан үлкенін техникасыз да байқап көруге болады.',
    },
    docs: 'https://ollama.com/library/gpt-oss',
  },

  // ------------------------------------------------------------------- Google
  {
    id: 'gemini-3-8-flash',
    name: 'Gemini 3.8 Flash',
    vendor: 'Google',
    tier: 'balanced',
    contextTokens: 1048576,
    inputPerM: 0.75,
    outputPerM: 3.75,
    goodAt: {
      en: 'The Google changelog calls it their most intelligent Flash model, engineered for long-horizon software engineering. GA since 2 September 2026, 1,048,576 tokens in and 65,536 out, and it has a free tier. For a student in Kazakhstan this is the practical default.',
      kk: 'Google changelog-ы оны «ұзақ мерзімді бағдарламалық инженерияға жасалған ең ақылды Flash моделіміз» деп атайды. 2026 жылдың 2 қыркүйегінен бері жалпы қолжетімді, кірісі 1 048 576 токен, шығысы 65 536 токен, әрі тегін деңгейі бар. Қазақстандағы студент үшін бұл — практикалық әдепкі таңдау.',
    },
    note: {
      en: 'The price is promotional through 31 December 2026; from 1 January 2027 it doubles to $1.50 / $7.50. Google has cut or repriced free access twice in 2026, so do not design a product around this tier lasting forever.',
      kk: 'Бұл баға 2026 жылдың 31 желтоқсанына дейінгі науқандық баға; 2027 жылдың 1 қаңтарынан ол екі есе өсіп, $1,50 / $7,50 болады. Google 2026 жылы тегін мүмкіндіктерді екі рет қысқартты не қайта бағалады, сондықтан өніміңді бұл деңгей мәңгі қалады деп жоспарлама.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Yes. The Gemini API free tier is the only first-party frontier-lab API that works without a card, which is why it is the right choice for a workshop. Google no longer publishes the rate limits in the docs — check your own numbers in Google AI Studio and do not quote figures from old blog posts.',
      kk: 'Иә. Gemini API-дің тегін деңгейі — картасыз жұмыс істейтін жалғыз ірі зертхананың тікелей API интерфейсі, сондықтан воркшопқа дәл осы дұрыс. Google енді сұрау шектерін құжаттамада жарияламайды: өз лимитіңді Google AI Studio-да қарап ал да, ескі блог жазбаларындағы сандарды келтірме.',
    },
    docs: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash',
  },
  {
    id: 'gemini-3-1-pro-preview',
    name: 'Gemini 3.1 Pro Preview',
    vendor: 'Google',
    tier: 'flagship',
    contextTokens: 1048576,
    inputPerM: 2,
    outputPerM: 12,
    goodAt: {
      en: 'The newest Gemini Pro and the strongest Gemini for hard reasoning, with the same 1,048,576-token window as 3.8 Flash. Cheap for a flagship compared with Astra or Fable.',
      kk: 'Ең жаңа Gemini Pro және күрделі пайымдауға ең мықты Gemini; контекст терезесі 3.8 Flash-тағыдай — 1 048 576 токен. Astra не Fable-мен салыстырғанда флагман үшін арзан.',
    },
    note: {
      en: 'Two things to know. It is still labelled preview more than half a year after its February 2026 release. And it is the one Gemini with no free tier — above a 200k prompt the price also changes to $4 / $18, so long context is not flat-rate here the way it is at Anthropic.',
      kk: 'Екі нәрсені біл. Біріншіден, 2026 жылдың ақпанында шыққанына жарты жылдан асса да, әлі «preview» деп белгіленген. Екіншіден, бұл — тегін деңгейі жоқ жалғыз Gemini; оның үстіне промпт 200 мың токеннен асса, баға $4 / $18-ге ауысады, яғни Anthropic-тегідей бірыңғай баға мұнда жоқ.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Not in the API. But Google Antigravity lists Gemini 3.1 Pro on its free Individual plan, and Kazakhstan is on the supported country list — the catch is that Antigravity is not available to anyone under 18.',
      kk: 'API арқылы емес. Бірақ Google Antigravity-дің тегін Individual жоспарында Gemini 3.1 Pro бар, ал Қазақстан қолдау көрсетілетін елдер тізімінде. Бір шарты бар: Antigravity 18 жасқа толмағандарға ашылмайды.',
    },
    docs: 'https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview',
  },
  {
    id: 'gemini-3-5-flash-lite',
    name: 'Gemini 3.5 Flash-Lite',
    vendor: 'Google',
    tier: 'small',
    contextTokens: null,
    inputPerM: 0.3,
    outputPerM: 2.5,
    goodAt: {
      en: 'The small, sub-agent tier of the current Gemini generation, and it still has a free tier: routing, classification, cheap bulk calls, the boring half of an agent pipeline.',
      kk: 'Қазіргі Gemini буынының кіші, субагенттік деңгейі, әрі оның тегін деңгейі сақталған: бағыттау, жіктеу, арзан көпшілікті сұраулар — агент құбырының қызықсыз жартысы.',
    },
    note: {
      en: 'Google prints context and output limits only on individual model pages, and only Gemini 3.8 Flash and 3.1 Pro Preview were confirmed. Open the model page before you design around a context number for this one.',
      kk: 'Google контекст пен шығыс шектерін тек жеке модель беттерінде жариялайды, оның ішінде тексерілгені — Gemini 3.8 Flash пен 3.1 Pro Preview ғана. Осы модельдің контекст көлеміне сүйеніп жоба құрар алдында оның бетін ашып көр.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Yes, on the Gemini API free tier — no card needed. Limits are shown in Google AI Studio, not in the docs.',
      kk: 'Иә, Gemini API-дің тегін деңгейінде — картаның қажеті жоқ. Лимиттер құжаттамада емес, Google AI Studio-да көрсетіледі.',
    },
    docs: 'https://ai.google.dev/gemini-api/docs/pricing',
  },
  {
    id: 'gemini-2-5-flash-lite',
    name: 'Gemini 2.5 Flash-Lite',
    vendor: 'Google',
    tier: 'small',
    contextTokens: null,
    inputPerM: 0.1,
    outputPerM: 0.4,
    goodAt: {
      en: 'The cheapest model on this entire page, and it has a free tier — which makes it a fine place to make your very first API call and watch a token counter move.',
      kk: 'Осы беттегі ең арзан модель, оның үстіне тегін деңгейі бар. Сондықтан ең алғашқы API сұрауыңды жіберіп, токен есептегішінің қозғалғанын бақылауға тамаша келеді.',
    },
    note: {
      en: 'An older 2.5-generation model. The Flash models Google describes as built for software engineering are the 3.x ones — use this for simple text work and move up when the task involves a codebase.',
      kk: 'Бұл — ескілеу 2.5 буынының моделі. Google «бағдарламалық инженерияға жасалған» деп сипаттайтын Flash модельдері — 3.x буыны. Мұны қарапайым мәтін жұмысына пайдалан да, тапсырма код базасына қатысты болса, жоғарырақ көтеріл.',
    },
    openWeights: false,
    freeAccess: {
      en: 'Yes, on the Gemini API free tier — no card needed.',
      kk: 'Иә, Gemini API-дің тегін деңгейінде — картаның қажеті жоқ.',
    },
    docs: 'https://ai.google.dev/gemini-api/docs/pricing',
  },
  {
    id: 'gemma-4',
    name: 'Gemma 4',
    vendor: 'Google',
    tier: 'open',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The open-weight Google family, and the most laptop-friendly one on this page: sizes on Ollama run from e2b at 7.2 GB through 12b at 7.6 GB to 31b at 20 GB, with vision, tool use and thinking.',
      kk: 'Google-дың салмақтары ашық отбасы, әрі беттегі ең ноутбукке ыңғайлысы: Ollama-дағы өлшемдері e2b — 7,2 ГБ, 12b — 7,6 ГБ, 31b — 20 ГБ; көру, құрал қолдану және ойлану мүмкіндіктері бар.',
    },
    note: {
      en: 'Context is listed as 128k to 256k depending on size. Be careful with blog guides claiming the e2b size needs only about 3 GB of RAM — that conflicts with the 7.2 GB download, so test it on a real laptop before you promise anything to a room full of students.',
      kk: 'Контекст өлшемге қарай 128 мыңнан 256 мың токенге дейін деп көрсетілген. «e2b нұсқасына небәрі 3 ГБ жад керек» деп жазатын блог нұсқаулықтарына абай бол: бұл 7,2 ГБ жүктемеге қайшы келеді. Толы аудиторияға уәде берер алдында нағыз ноутбукте тексеріп көр.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Free to download and run via Ollama.',
      kk: 'Ollama арқылы тегін жүктеп алып, іске қосуға болады.',
    },
    docs: 'https://ollama.com/library/gemma4',
  },

  // ----------------------------------------------------------------- DeepSeek
  {
    id: 'deepseek-flash',
    name: 'DeepSeek V4.1-Flash',
    vendor: 'DeepSeek',
    tier: 'open',
    contextTokens: 1000000,
    inputPerM: 0.3,
    outputPerM: 1.2,
    goodAt: {
      en: 'Serious quality at roughly a tenth of Western flagship prices: 1M context, 384k max output, thinking and non-thinking modes, vision, tool calls and JSON output. It also speaks the Anthropic API format, so Anthropic-compatible clients can be pointed straight at it.',
      kk: 'Батыс флагмандарынан шамамен он есе арзан бағаға нағыз сапа: 1 млн контекст, 384 мың токенге дейінгі жауап, ойланатын және ойланбайтын режимдер, көру, құрал шақыру және JSON шығысы. Оның үстіне ол Anthropic API форматында сөйлейді, сондықтан Anthropic-пен үйлесімді құралдарды тікелей осыған бағыттауға болады.',
    },
    note: {
      en: 'The prices shown are peak. Off-peak is half: peak runs 01:00-04:00 and 06:00-10:00 UTC on weekdays, which in Kazakhstan (UTC+5) means 06:00-09:00 and 11:00-15:00 local — your evenings and weekends are the cheap window. And read the second half of open weights carefully: the model card describes a 552B backbone, so open does not mean it fits on your machine.',
      kk: 'Көрсетілген бағалар — шың сағаттардікі. Шыңнан тыс уақытта екі есе арзан: шың уақыты жұмыс күндері UTC бойынша 01:00-04:00 және 06:00-10:00, яғни Қазақстанда (UTC+5) жергілікті 06:00-09:00 және 11:00-15:00. Кештерің мен демалыс күндерің — арзан терезе. Ашық салмақ дегенді де мұқият оқы: модель картасында 552 млрд параметрлік негіз сипатталған, яғни «ашық» деген сөз «сенің құрылғыңа сыяды» дегенді білдірмейді.',
    },
    openWeights: true,
    freeAccess: {
      en: 'The weights are MIT-licensed on Hugging Face, so it is free if you own hardware for a 552B-parameter model. The hosted API is not free, but it is the cheapest serious API here.',
      kk: 'Салмақтары Hugging Face-те MIT лицензиясымен жарияланған, яғни 552 млрд параметрлік модельге техникаң болса — тегін. Хостталған API тегін емес, бірақ ол мұндағы ең арзан байыпты API.',
    },
    docs: 'https://api-docs.deepseek.com/quick_start/pricing',
  },
  {
    id: 'deepseek-v4-pro',
    name: 'DeepSeek V4-Pro',
    vendor: 'DeepSeek',
    tier: 'open',
    contextTokens: 1000000,
    inputPerM: 1.32,
    outputPerM: 3.96,
    goodAt: {
      en: 'The bigger DeepSeek model (V4-Pro-0813, listed at 1.7T parameters on Hugging Face) with the same 1M context and 384k max output, still cheaper than any Western flagship.',
      kk: 'DeepSeek-тің үлкен моделі (V4-Pro-0813, Hugging Face-те 1,7 трлн параметр деп көрсетілген); контексті сол 1 млн, жауабы 384 мың токенге дейін, әрі кез келген Батыс флагманынан арзан.',
    },
    note: {
      en: 'No vision, unlike Flash. Same peak and off-peak split. It costs about four times what DeepSeek Flash does, so start with Flash and only move up if you can show that Flash is the thing failing.',
      kk: 'Flash-тан айырмашылығы — көру мүмкіндігі жоқ. Шың және шыңнан тыс бағалар дәл солай бөлінеді. DeepSeek Flash-тан шамамен төрт есе қымбат, сондықтан алдымен Flash-пен баста, тек Flash нақты жеткізбей жатқанын көрсете алсаң ғана жоғары көтеріл.',
    },
    openWeights: true,
    freeAccess: null,
    docs: 'https://api-docs.deepseek.com/quick_start/pricing',
  },

  // --------------------------------------------------------------------- Meta
  {
    id: 'muse-spark-1-3',
    name: 'Muse Spark 1.3',
    vendor: 'Meta',
    tier: 'flagship',
    contextTokens: null,
    inputPerM: 1.25,
    outputPerM: 4.25,
    goodAt: {
      en: 'The current Meta frontier model, released 2 September 2026 by Meta Superintelligence Labs as the replacement for Llama inside Meta products. Very cheap for a flagship, with generous standard rate limits (3,000 requests and 4M tokens per minute).',
      kk: 'Meta-ның қазіргі алдыңғы қатарлы моделі; 2026 жылдың 2 қыркүйегінде Meta Superintelligence Labs шығарған, Meta өнімдерінде Llama-ның орнын басқан модель. Флагман үшін өте арзан, әрі стандартты лимиттері жомарт (минутына 3 000 сұрау және 4 млн токен).',
    },
    note: {
      en: 'Closed weights. This is the correction to the most common outdated claim in the room: Meta is no longer the open-source Llama company at the frontier. Zuckerberg has said Muse Spark 1.2 will be released open-weight, but that is announced, not shipped. The ~1M context figure circulating online is not confirmed in the Meta docs, so it is left blank here. See the Contributor tier below for the cheap version and its price in data.',
      kk: 'Салмақтары жабық. Аудиторияда ең жиі кездесетін ескірген пікірді дәл осы түзейді: Meta енді алдыңғы шепте «ашық бастапқы кодты Llama компаниясы» емес. Цукерберг Muse Spark 1.2-ні ашық салмақпен шығарамыз деген, бірақ бұл — жарияланған сөз, шыққан дүние емес. Интернетте тарап жүрген «шамамен 1 млн контекст» дерегі Meta құжаттамасында расталмаған, сондықтан мұнда бос қалдырылды. Арзан нұсқасын және оның деректегі бағасын төмендегі Contributor деңгейінен қара.',
    },
    openWeights: false,
    freeAccess: null,
    docs: 'https://dev.meta.ai/docs/pricing-rate-limits',
  },
  {
    id: 'muse-spark-1-3-contributor',
    name: 'Muse Spark 1.3 (Contributor tier)',
    vendor: 'Meta',
    tier: 'balanced',
    contextTokens: null,
    inputPerM: 0.1,
    outputPerM: 0.2,
    goodAt: {
      en: 'Exactly the same model as above, at a twelfth of the input price and a twentieth of the output price. On paper the best value in this entire catalogue.',
      kk: 'Жоғарыдағы дәл сол модель, бірақ кіріс бағасы он екі есе, шығыс бағасы жиырма есе арзан. Қағаз жүзінде — бүкіл каталогтағы ең тиімді ұсыныс.',
    },
    note: {
      en: 'Read why it is cheap. The Meta page describes it as heavily discounted pricing in exchange for permission to use your prompts and completions to train future Meta models. Rate limits are tighter too: 100 requests per minute against 3,000 on the standard tier. This is the clearest lesson in the catalogue — if it is nearly free, your data is the price. Never point it at a client codebase, a private repo, or anything covered by an NDA.',
      kk: 'Неге арзан екенін оқы. Meta беті мұны «промпттарың мен жауаптарыңды болашақ Meta модельдерін оқытуға пайдалануға рұқсат бергенің үшін берілетін үлкен жеңілдік» деп сипаттайды. Лимиттері де қатаң: стандартты деңгейдегі 3 000-ның орнына минутына 100 сұрау. Каталогтағы ең анық сабақ осы: бірдеңе тегінге жақын болса, төлем — сенің дерегің. Оны клиенттің код базасына, жабық repo-ға немесе NDA-мен қорғалған ештеңеге бағыттама.',
    },
    openWeights: false,
    freeAccess: {
      en: 'The opencode Zen gateway has carried the Muse Spark 1.3 contributor tier in its rotating set of free beta models. The same warning applies twice over: free models there may use your prompts for training.',
      kk: 'opencode-тың Zen шлюзі өзінің ауысып тұратын тегін beta модельдерінің қатарында Muse Spark 1.3-тің contributor деңгейін ұстап келеді. Ескерту мұнда екі есе күшті: ондағы тегін модельдер промпттарыңды оқытуға пайдалануы мүмкін.',
    },
    docs: 'https://dev.meta.ai/docs/pricing-rate-limits',
  },
  {
    id: 'muse-glimmer',
    name: 'Muse Glimmer 30B',
    vendor: 'Meta',
    tier: 'open',
    contextTokens: 128000,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The small open-weight model Meta did ship: 30B parameters under Apache 2.0, released 10 August 2026, with a 128k context. Proof that Meta ships nothing open any more is also wrong.',
      kk: 'Meta шынымен шығарған кіші ашық модель: 30 млрд параметр, Apache 2.0 лицензиясы, 2026 жылдың 10 тамызында жарияланған, контексті 128 мың токен. «Meta енді ешқандай ашық модель шығармайды» деген пікірдің де қате екенінің дәлелі.',
    },
    note: {
      en: 'The download on Ollama is 18-19 GB. By the same rule of thumb that lets gpt-oss:20b (14 GB) run on 16 GB of memory, you want noticeably more than 16 GB here. 30B is not a frontier model — use it to learn how these things behave, not to ship a product.',
      kk: 'Ollama-дағы жүктеме көлемі 18-19 ГБ. gpt-oss:20b (14 ГБ) 16 ГБ жадта жұмыс істейтінін ескерсек, мұнда 16 ГБ-дан айтарлықтай көп жад керек. 30 млрд параметр — алдыңғы қатарлы модель емес: оны өнім шығаруға емес, модельдердің өзін қалай ұстайтынын үйренуге пайдалан.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Free to download and run via Ollama, where it already has over 200 thousand pulls.',
      kk: 'Ollama арқылы тегін жүктеп алып, іске қосуға болады; онда ол қазірдің өзінде 200 мыңнан астам рет жүктелген.',
    },
    docs: 'https://ollama.com/library/muse-glimmer',
  },
  {
    id: 'llama-4-scout',
    name: 'Llama 4 Scout',
    vendor: 'Meta',
    tier: 'open',
    contextTokens: 10000000,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The last open Llama, released 5 April 2025: 17B active parameters of 109B total, and a 10M-token context window that is still the largest number on this page by a factor of ten.',
      kk: 'Соңғы ашық Llama, 2026 жылғы емес — 2025 жылдың 5 сәуірінде шыққан: жалпы 109 млрд параметрдің 17 млрд-ы белсенді, ал 10 млн токендік контекст терезесі осы беттегі ең үлкен сан, екінші орындағыдан он есе үлкен.',
    },
    note: {
      en: 'History, not a recommendation. Meta moved to closed weights in 2026 and there has been no Llama 5. Its sibling Maverick is 17B active of 400B total with 1M context. One more reason it matters to us: Llama-family tokenizers are the worst of the lot for Kazakh, about 4.73 tokens per word against 2.56 for Russian and 2.23 for Turkish.',
      kk: 'Бұл — ұсыныс емес, тарих. Meta 2026 жылы жабық салмақтарға көшті, Llama 5 шыққан жоқ. Туысы Maverick — жалпы 400 млрд параметрдің 17 млрд-ы белсенді, контексті 1 млн токен. Бізге маңызды тағы бір себебі: Llama тектес токенизаторлар қазақ тілі үшін ең нашары — бір сөзге шамамен 4,73 токен, ал орыс тілінде 2,56, түрік тілінде 2,23.',
    },
    openWeights: true,
    freeAccess: null,
    docs: 'https://en.wikipedia.org/wiki/Llama_(language_model)',
  },

  // ------------------------------------------------------------------ Mistral
  {
    id: 'mistral-medium-3-5',
    name: 'Mistral Medium 3.5',
    vendor: 'Mistral',
    tier: 'open',
    contextTokens: 256000,
    inputPerM: 1.5,
    outputPerM: 7.5,
    goodAt: {
      en: 'The serious European open-weight option: a dense 128B model under a modified MIT licence, released 28 April 2026. If the requirement is that data never leaves your own servers, this is the tier that can actually do the work.',
      kk: 'Еуропаның байыпты ашық нұсқасы: өзгертілген MIT лицензиясымен шыққан, 128 млрд параметрлік тығыз модель (2026 жылғы 28 сәуір). Деректер өз серверлеріңнен шықпауы шарт болса, жұмысты шынымен тартатын деңгей осы.',
    },
    note: {
      en: 'The 256k context is the smallest among the big labs — everyone else here sits at 1M, and that gap is felt immediately in agent work on a large repo. Self-hosting is also not a laptop story: the Ollama download is 80 GB.',
      kk: 'Контексті 256 мың токен — ірі зертханалардың ішіндегі ең кішісі; қалғандарының бәрі 1 млн деңгейінде, ал бұл айырма үлкен repo-мен агенттік жұмыста бірден сезіледі. Өз серверіңде ұстау да ноутбук әңгімесі емес: Ollama-дағы жүктеме 80 ГБ.',
    },
    openWeights: true,
    freeAccess: {
      en: 'The weights are downloadable under a modified MIT licence, so self-hosting is free of licence cost. The hosted API is paid.',
      kk: 'Салмақтарын өзгертілген MIT лицензиясымен жүктеп алуға болады, яғни өз серверіңде ұстауға лицензия ақысы жоқ. Хостталған API ақылы.',
    },
    docs: 'https://docs.mistral.ai/models/mistral-medium-3-5-26-04',
  },
  {
    id: 'mistral-small-4',
    name: 'Mistral Small 4',
    vendor: 'Mistral',
    tier: 'open',
    contextTokens: 256000,
    inputPerM: 0.15,
    outputPerM: 0.6,
    goodAt: {
      en: 'Apache 2.0 and cheap. The permissive licence is the point: you can use it commercially with no strings, self-hosted or through the API, which is rare at this quality level.',
      kk: 'Apache 2.0 және арзан. Ең бастысы — лицензияның еркіндігі: оны коммерциялық мақсатта ешқандай шартсыз пайдалана аласың, өз серверіңде де, API арқылы да. Бұл сапа деңгейінде мұндайы сирек.',
    },
    note: {
      en: 'Still the Mistral 256k ceiling. On the Mistral API batch processing is half price and cached input is 90% cheaper, which is the most aggressive caching discount in this catalogue.',
      kk: 'Mistral-дың сол 256 мың токендік шегі күшінде. Mistral API-де batch режимі екі есе арзан, ал кэштелген кіріс 90%-ға арзан — бұл каталогтағы ең жомарт кэш жеңілдігі.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Weights are Apache 2.0, so downloading and self-hosting costs nothing but hardware.',
      kk: 'Салмақтары Apache 2.0 лицензиясымен, сондықтан жүктеп алып, өз серверіңде ұстау техникадан басқа ештеңе тұрмайды.',
    },
    docs: 'https://mistral.ai/pricing/api',
  },
  {
    id: 'ministral-3-8b',
    name: 'Ministral 3 8B',
    vendor: 'Mistral',
    tier: 'open',
    contextTokens: null,
    inputPerM: 0.15,
    outputPerM: 0.15,
    goodAt: {
      en: 'Laptop-sized and Apache 2.0, with the unusual property that input and output cost exactly the same — which makes it the easiest model in the catalogue to budget for.',
      kk: 'Ноутбукке сыятын өлшем әрі Apache 2.0 лицензиясы, оның үстіне сирек кездесетін қасиеті бар: кіріс пен шығыс дәл бірдей тұрады. Сондықтан бұл — каталогтағы бюджеті ең оңай есептелетін модель.',
    },
    note: {
      en: 'The family is 3B at $0.10 / $0.10, 8B at $0.15 / $0.15 and 14B at $0.20 / $0.20. Use small models for one narrow job at a time. An agent loop needs 64k or more of context and dependable tool calling, and that is exactly where models this size start to wobble.',
      kk: 'Отбасы: 3 млрд — $0,10 / $0,10, 8 млрд — $0,15 / $0,15, 14 млрд — $0,20 / $0,20. Кіші модельдерді бір мезгілде бір ғана тар тапсырмаға қолдан. Агенттік циклге кемінде 64 мың токен контекст және сенімді құрал шақыру керек, ал дәл осы екеуінде осы өлшемдегі модельдер ақсай бастайды.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Weights are Apache 2.0 and the sizes are small enough for a normal laptop.',
      kk: 'Салмақтары Apache 2.0 лицензиясымен, ал өлшемдері қарапайым ноутбукке сияды.',
    },
    docs: 'https://mistral.ai/pricing/api',
  },
  {
    id: 'codestral',
    name: 'Codestral',
    vendor: 'Mistral',
    tier: 'small',
    contextTokens: null,
    inputPerM: 0.3,
    outputPerM: 0.9,
    goodAt: {
      en: 'A dedicated code-completion model — the tab-completion kind of AI rather than the agent kind. Useful to know the category exists, because completion and agent work are priced and judged differently.',
      kk: 'Кодты толықтыруға арналған арнайы модель — агенттік емес, tab басқанда жалғастыратын ЖИ түрі. Бұл санаттың бар екенін білген жөн, өйткені толықтыру мен агенттік жұмыс әртүрлі бағаланады әрі әртүрлі өлшенеді.',
    },
    note: {
      en: 'Premier licence, meaning closed weights, unlike most of the Mistral line. Context size is not printed on the pricing page, so it is blank here.',
      kk: 'Premier лицензиясы, яғни салмақтары жабық — Mistral желісінің көпшілігінен айырмашылығы сол. Контекст көлемі баға бетінде көрсетілмеген, сондықтан мұнда бос тұр.',
    },
    openWeights: false,
    freeAccess: null,
    docs: 'https://mistral.ai/pricing/api',
  },

  // --------------------------------------------------------------------- Qwen
  {
    id: 'qwen3-8-max',
    name: 'Qwen3.8-Max',
    vendor: 'Alibaba (Qwen)',
    tier: 'flagship',
    contextTokens: 1000000,
    inputPerM: 2,
    outputPerM: 6,
    goodAt: {
      en: 'The Alibaba flagship: up to 1M context at $2 / $6, which undercuts the Western flagships by a factor of five on input and eight on output. Output being only three times input is unusually flat, and it helps on generation-heavy work.',
      kk: 'Alibaba-ның флагманы: 1 млн токенге дейінгі контекст, бағасы $2 / $6 — Батыс флагмандарынан кіріс бойынша бес есе, шығыс бойынша сегіз есе арзан. Шығыстың кірістен небәрі үш есе қымбат болуы сирек кездесетін теңдік, әрі көп мәтін жазатын жұмыста көмектеседі.',
    },
    note: {
      en: 'Claims that it is a 2.4 trillion parameter mixture of experts are unverified — do not repeat them from a stage. The prices and the free quota here come from the Singapore international deployment of Alibaba Model Studio.',
      kk: 'Оны «2,4 трлн параметрлік mixture of experts» деп жазатын мәліметтер расталмаған — сахнадан қайталама. Мұндағы бағалар мен тегін квота Alibaba Model Studio-ның Сингапурдағы халықаралық нұсқасынан алынған.',
    },
    openWeights: false,
    freeAccess: {
      en: '1M free tokens, valid for 90 days, on Alibaba Cloud Model Studio.',
      kk: 'Alibaba Cloud Model Studio-да 1 млн токен тегін, 90 күн бойы жарамды.',
    },
    docs: 'https://www.alibabacloud.com/help/en/model-studio/model-pricing',
  },
  {
    id: 'qwen3-7-plus',
    name: 'Qwen3.7-Plus',
    vendor: 'Alibaba (Qwen)',
    tier: 'balanced',
    contextTokens: 1000000,
    inputPerM: 0.4,
    outputPerM: 1.6,
    goodAt: {
      en: 'The Qwen middle tier, up to 1M context, priced below most small models from Western labs.',
      kk: 'Qwen-нің орта деңгейі; контексті 1 млн токенге дейін, ал бағасы Батыс зертханаларының көптеген кіші модельдерінен де төмен.',
    },
    note: {
      en: 'Input pricing is stepped, not flat: $0.40 per million up to 256k, then $1.20 per million from 256k to 1M. Filling a big window triples the input rate here, which is the opposite of how Anthropic bills long context.',
      kk: 'Кіріс бағасы бірыңғай емес, сатылы: 256 мың токенге дейін 1 млн токен үшін $0,40, ал 256 мыңнан 1 млн-ға дейін $1,20. Мұнда үлкен терезені толтырсаң, кіріс бағасы үш есе өседі — Anthropic ұзын контексті есептейтін тәсілдің тура қарама-қарсысы.',
    },
    openWeights: false,
    freeAccess: {
      en: '1M free tokens, valid for 90 days, on Alibaba Cloud Model Studio.',
      kk: 'Alibaba Cloud Model Studio-да 1 млн токен тегін, 90 күн бойы жарамды.',
    },
    docs: 'https://www.alibabacloud.com/help/en/model-studio/model-pricing',
  },
  {
    id: 'qwen3-8-flash',
    name: 'Qwen3.8-Flash',
    vendor: 'Alibaba (Qwen)',
    tier: 'small',
    contextTokens: 1000000,
    inputPerM: 0.15,
    outputPerM: 0.47,
    goodAt: {
      en: 'Up to 1M context for $0.15 per million input. As a cheap tier it is unusual in keeping the full context window rather than cutting it.',
      kk: '1 млн токенге дейінгі контекст, ал 1 млн кіріс токені небәрі $0,15. Арзан деңгей үшін сирек қасиет: контекст терезесі қысқартылмай, толық күйінде қалған.',
    },
    note: {
      en: 'Qwen tokenizers are among the best documented for Turkic languages — a 2026 study found Qwen3.5 and GPT-5.2 consistently achieved the best Turkic coverage, which matters directly for Kazakh text.',
      kk: 'Qwen токенизаторлары түркі тілдері үшін ең жақсы құжатталғандардың қатарында: 2026 жылғы зерттеу Qwen3.5 пен GPT-5.2 түркі тілдерін тұрақты түрде ең жақсы қамтитынын көрсеткен. Бұл қазақ мәтініне тікелей қатысты.',
    },
    openWeights: false,
    freeAccess: {
      en: '1M free tokens, valid for 90 days, on Alibaba Cloud Model Studio.',
      kk: 'Alibaba Cloud Model Studio-да 1 млн токен тегін, 90 күн бойы жарамды.',
    },
    docs: 'https://www.alibabacloud.com/help/en/model-studio/model-pricing',
  },
  {
    id: 'qwen3-8-open',
    name: 'Qwen3.8 (open weights, 27B)',
    vendor: 'Alibaba (Qwen)',
    tier: 'open',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The open-weight Qwen line is the most-pulled non-Western family on Ollama, and 27B is the size a strong laptop or a single decent GPU can actually hold.',
      kk: 'Салмақтары ашық Qwen желісі — Ollama-да ең көп жүктелетін Батыстан тыс отбасы, ал 27 млрд параметр — қуатты ноутбук немесе бір жақсы GPU шынымен көтеретін өлшем.',
    },
    note: {
      en: 'The older Qwen3.6 (27B and 35B) still has 6.7M pulls against 2.3M for Qwen3.8, so the community default is one generation behind — worth checking which one your tutorial actually assumes. The Ollama guide for running Claude Code against a local model uses a Qwen model in its own example.',
      kk: 'Ескілеу Qwen3.6 (27 және 35 млрд) әлі 6,7 млн рет жүктелген, ал Qwen3.8 — 2,3 млн рет; яғни қауымдастықтың әдепкі таңдауы бір буынға артта. Оқыған нұсқаулығың қайсысын меңзеп тұрғанын тексер. Claude Code-ты жергілікті модельмен іске қосу туралы Ollama нұсқаулығы өз мысалында Qwen моделін қолданады.',
    },
    openWeights: true,
    freeAccess: {
      en: 'Free to download and run via Ollama.',
      kk: 'Ollama арқылы тегін жүктеп алып, іске қосуға болады.',
    },
    docs: 'https://ollama.com/search',
  },

  // ------------------------------------------------- Other significant families
  {
    id: 'glm-5-3',
    name: 'GLM-5.3',
    vendor: 'GLM',
    tier: 'open',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The highest-scoring open-weight model on the independent Artificial Analysis Intelligence Index: 45 at max effort on v4.3.2, against 53 for Claude Fable 5.1 and GPT-6 Astra.',
      kk: 'Тәуелсіз Artificial Analysis Intelligence Index тізіміндегі салмақтары ашық модельдердің ең жоғары нәтижесі: v4.3.2 нұсқасында max режимінде 45 ұпай, ал Claude Fable 5.1 мен GPT-6 Astra — 53 ұпай.',
    },
    note: {
      en: 'Two teaching points. First, the open-weight gap behind the frontier is visible but modest, and 66 of the 149 models the index evaluates are open-weight. Second, on Ollama this one exists only as a cloud model — open weights never meant it fits on your machine. Scores depend on the effort setting, so always name the setting when you quote one.',
      kk: 'Екі сабақ бар. Біріншіден, ашық модельдердің алдыңғы шептен артта қалуы байқалады, бірақ шамалы: индекс бағалайтын 149 модельдің 66-сы — салмағы ашық модельдер. Екіншіден, Ollama-да бұл тек бұлттық модель ретінде бар: «ашық салмақ» ешқашан «сенің құрылғыңа сыяды» дегенді білдірген емес. Ұпайлар effort параметріне тәуелді, сондықтан сан келтірсең, қай режим екенін де айт.',
    },
    openWeights: true,
    freeAccess: null,
    docs: 'https://artificialanalysis.ai/models',
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3',
    vendor: 'Kimi',
    tier: 'open',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The second-strongest open-weight score on the Artificial Analysis index (44 at max effort), and available as a model choice inside Cursor alongside Claude, GPT and Gemini.',
      kk: 'Artificial Analysis индексіндегі салмағы ашық модельдер арасында екінші нәтиже (max режимінде 44 ұпай), әрі Cursor ішінде Claude, GPT және Gemini-мен қатар таңдауға болады.',
    },
    note: {
      en: 'Cloud-scale like GLM-5.3: Ollama carries the Kimi line only as cloud models. The practical lesson from both is that the open-weight frontier and the runs-on-my-laptop frontier are two completely different lines, roughly 500 billion parameters apart.',
      kk: 'GLM-5.3 сияқты бұлт деңгейіндегі модель: Ollama Kimi желісін тек бұлттық модель ретінде ұсынады. Екеуінен шығатын практикалық сабақ: «салмағы ашық модельдердің шегі» мен «менің ноутбугімде жұмыс істейтіндердің шегі» — екі мүлде бөлек сызық, арасы жүздеген миллиард параметр.',
    },
    openWeights: true,
    freeAccess: null,
    docs: 'https://artificialanalysis.ai/models',
  },
  {
    id: 'grok-4-7',
    name: 'Grok 4.7',
    vendor: 'xAI',
    tier: 'flagship',
    contextTokens: null,
    inputPerM: null,
    outputPerM: null,
    goodAt: {
      en: 'The family you meet mainly through Cursor, whose model docs list Grok 4.5, 4.6 and 4.7 including 500k-context and Fast variants next to Claude, GPT and Gemini.',
      kk: 'Бұл отбасына көбіне Cursor арқылы кездесесің: оның модель құжаттамасында Claude, GPT және Gemini-мен қатар Grok 4.5, 4.6 және 4.7 нұсқалары, оның ішінде 500 мың контекстті және Fast нұсқалары тізілген.',
    },
    note: {
      en: 'The price and context cells are deliberately blank: no first-party figure was verified for this research, and a model you cannot price is a model you cannot budget. Worth knowing the context — Cursor has belonged to SpaceX since 14 August 2026, and its pricing page now advertises Grok limits and Grok Bot access alongside the other vendors. Notice when a tool has a reason to steer you towards one engine.',
      kk: 'Баға мен контекст ұяшықтары әдейі бос: бұл зерттеу барысында бірінші көзден алынған дерек расталмады, ал бағасын білмейтін модельді бюджетке де сыйғыза алмайсың. Мән-жайды біліп қойған жөн: Cursor 2026 жылдың 14 тамызынан бері SpaceX-ке тиесілі, ал оның баға бетінде енді басқа компаниялармен қатар Grok лимиттері мен Grok Bot мүмкіндігі жарнамаланады. Құралдың сені белгілі бір модельге бұруға себебі бар екенін байқай біл.',
    },
    openWeights: false,
    freeAccess: {
      en: 'The Cursor Hobby plan is free with no credit card and a limited number of agent requests. The Cursor pricing page advertises generous limits for Grok without saying on which plan, so check before you count on it.',
      kk: 'Cursor-дың Hobby жоспары тегін, картасыз, бірақ агент сұрауларының саны шектеулі. Cursor баға беті «Grok үшін жомарт лимиттер» деп жарнамалайды, алайда қай жоспарда екенін жазбайды — сондықтан сүйенер алдында тексер.',
    },
    docs: 'https://cursor.com/docs/models',
  },
];

// ---------------------------------------------------------------------------
// RUNNING A MODEL ON YOUR OWN MACHINE
//
// The honest framing: local models are for privacy, offline work, zero cost and
// understanding how this all works. Hosted frontier models are still far better
// at agentic coding, and Kazakh output on small local models is clearly worse,
// because of both the tokenizer tax and the small amount of Kazakh in training.
// ---------------------------------------------------------------------------

export interface LocalOption {
  id: string;
  name: string;
  what: L;
  needs: L;
  url: string;
}

export const localOptions: LocalOption[] = [
  {
    id: 'ollama',
    name: 'Ollama',
    what: {
      en: 'The standard way to run an open-weight model on your own machine: one command pulls a model, another chats with it, and it exposes a local server other tools can talk to. Nothing you type leaves your laptop unless you deliberately choose a cloud model. Use ollama ps to see how much of the model ended up on the GPU versus the CPU.',
      kk: 'Салмағы ашық модельді өз құрылғыңда іске қосудың стандартты жолы: бір пәрмен модельді жүктейді, екіншісі онымен сөйлестіреді, ал ол басқа құралдар қосыла алатын жергілікті сервер ашады. Әдейі бұлттық модель таңдамасаң, жазғаныңның ешқайсысы ноутбугіңнен шықпайды. Модельдің қай бөлігі GPU-ға, қай бөлігі CPU-ға түскенін ollama ps пәрменімен көресің.',
    },
    needs: {
      en: 'A terminal, and honest arithmetic about memory: roughly 0.6 to 0.7 GB per billion parameters for a 4-bit model, plus 1 to 2 GB for context. The anchor to remember is gpt-oss:20b — a 14 GB download that Ollama says runs with as little as 16 GB. Change the default context length before anything else: it ships at 4,096 tokens (OLLAMA_CONTEXT_LENGTH), and agent work needs 64k or more. On Windows the models land in C:\\Users\\<you>\\.ollama\\models, so check you have the disk space.',
      kk: 'Терминал және жад туралы адал есеп: 4-биттік модельге 1 млрд параметрге шамамен 0,6-0,7 ГБ, оның үстіне контекстке 1-2 ГБ. Есте ұстайтын тірек нүкте — gpt-oss:20b: жүктемесі 14 ГБ, ал Ollama оны 16 ГБ жадпен-ақ іске қосуға болады дейді. Бәрінен бұрын әдепкі контекст ұзындығын өзгерт: ол 4 096 токенмен келеді (OLLAMA_CONTEXT_LENGTH), ал агенттік жұмысқа кемінде 64 мың керек. Windows-та модельдер C:\\Users\\<сен>\\.ollama\\models ішіне түседі, сондықтан дискіде орын бар-жоғын тексер.',
    },
    url: 'https://ollama.com',
  },
  {
    id: 'lm-studio',
    name: 'LM Studio',
    what: {
      en: 'The same job in a desktop app: a model browser, a chat window and a local server, with no terminal involved. The gentler first step if the command line is still new, and a good way to watch memory use climb as you load a bigger model.',
      kk: 'Дәл сол жұмыстың жұмыс үстелі қолданбасындағы нұсқасы: модель каталогы, чат терезесі және жергілікті сервер — терминалсыз. Пәрмен жолы әлі жаңа болса, бұл жұмсақ бірінші қадам, әрі үлкенірек модель жүктегенде жадтың қалай толатынын бақылауға ыңғайлы.',
    },
    needs: {
      en: 'macOS: Apple Silicon only (M1 to M4), macOS 14.0 or newer, 16 GB or more of RAM recommended. Windows: x64 with AVX2, or a Snapdragon X Elite ARM machine; at least 16 GB of RAM and at least 4 GB of dedicated VRAM recommended. Linux: Ubuntu 20.04 or newer. The old claim that 8 GB Macs work fine with small models is not on the current requirements page — treat it as untested.',
      kk: 'macOS: тек Apple Silicon (M1-M4), macOS 14.0 немесе жаңарағы, 16 ГБ-тан астам жад ұсынылады. Windows: AVX2 қолдайтын x64 немесе Snapdragon X Elite ARM құрылғысы; кемінде 16 ГБ жад және кемінде 4 ГБ бөлек VRAM ұсынылады. Linux: Ubuntu 20.04 немесе жаңарағы. «8 ГБ Mac-та кіші модельдер жақсы жұмыс істейді» деген ескі пікір қазіргі талаптар бетінде жоқ — тексерілмеген дүние деп сана.',
    },
    url: 'https://lmstudio.ai',
  },
  {
    id: 'sizing',
    name: 'Sizing: what your laptop actually fits',
    what: {
      en: '8 GB of RAM: models of 1 to 4 billion parameters. Fine for chatting, summarising and explaining code; weak at multi-file agent work. 16 GB: 7 to 14 billion, or gpt-oss:20b with everything else closed. 16 GB or more of Apple Silicon, or an NVIDIA GPU with 8 GB or more: usable 12 to 30 billion parameter models — the first tier where a local coding agent becomes bearable rather than a demo.',
      kk: '8 ГБ жад: 1-4 млрд параметрлік модельдер. Сөйлесуге, мазмұндауға және кодты түсіндіруге жетеді; көп файлды агенттік жұмысқа әлсіз. 16 ГБ: 7-14 млрд, немесе қалған бәрін жауып қойсаң — gpt-oss:20b. 16 ГБ-тан асатын Apple Silicon немесе 8 ГБ-тан асатын NVIDIA GPU: 12-30 млрд параметрлік модельдер жұмысқа жарайды. Жергілікті кодтау агенті демо емес, шыдамды құралға айналатын алғашқы деңгей осы.',
    },
    needs: {
      en: 'Treat this as a rule of thumb, not a promise. Speed on CPU alone is typically in the single digits to low teens of tokens per second, but that figure is unverified and depends heavily on your hardware. Measure on your own machine before you plan a workshop or a deadline around it.',
      kk: 'Мұны уәде емес, шамалау ережесі деп қабылда. Тек CPU-мен жылдамдық әдетте секундына бірнеше токеннен он шақты токенге дейін, бірақ бұл сан расталмаған әрі техникаңа қатты тәуелді. Воркшоп немесе мерзім жоспарлар алдында өз құрылғыңда өлшеп көр.',
    },
    url: 'https://ollama.com/search',
  },
  {
    id: 'claude-code-local',
    name: 'Claude Code pointed at a local model',
    what: {
      en: 'The answer to the question everyone asks: yes, technically you can run Claude Code against a model on your own machine. Ollama documents it — run ollama launch claude, or set ANTHROPIC_AUTH_TOKEN to ollama, ANTHROPIC_API_KEY to an empty string and ANTHROPIC_BASE_URL to http://localhost:11434, then start claude with the --model flag.',
      kk: 'Бәрі қоятын сұрақтың жауабы: иә, техникалық тұрғыдан Claude Code-ты өз құрылғыңдағы модельмен іске қосуға болады. Ollama мұны құжаттаған: ollama launch claude пәрменін орында, немесе ANTHROPIC_AUTH_TOKEN мәнін ollama, ANTHROPIC_API_KEY мәнін бос жол, ANTHROPIC_BASE_URL мәнін http://localhost:11434 етіп қой да, claude құралын --model жалаушасымен іске қос.',
    },
    needs: {
      en: 'Raise the context length to 64k or higher first — the Ollama docs say so explicitly for larger repositories — and expect a real drop in quality. An agent loop needs long context and dependable tool calling, and on an 8 to 16 GB laptop you only fit small models, which are weak at exactly those two things. Kazakh output suffers twice over: the tokenizer tax plus very little Kazakh in a small model.',
      kk: 'Ең алдымен контекст ұзындығын 64 мыңға немесе одан жоғары көтер — Ollama құжаттамасы үлкен репозиторийлер үшін мұны тікелей айтады — және сапаның шынымен төмендейтінін күт. Агенттік циклге ұзын контекст пен сенімді құрал шақыру керек, ал 8-16 ГБ ноутбукке тек кіші модельдер сияды, олар дәл осы екеуінде әлсіз. Қазақша жауап екі есе зардап шегеді: токенизатор салығы, оның үстіне кіші модельде қазақ тілі өте аз.',
    },
    url: 'https://docs.ollama.com/integrations/claude-code',
  },
  {
    id: 'ollama-cloud',
    name: 'Ollama Cloud',
    what: {
      en: 'The escape hatch for when the model you want does not fit: the same Ollama commands, executed on someone else GPU. Not local and not private, but it is how you reach glm-5.3, deepseek-v4-pro or kimi-k2.6, which exist on Ollama only as cloud models.',
      kk: 'Қалаған моделің сыймай қалғандағы қосалқы жол: дәл сол Ollama пәрмендері, бірақ біреудің GPU құрылғысында орындалады. Бұл жергілікті де, құпия да емес, бірақ Ollama-да тек бұлттық түрде бар glm-5.3, deepseek-v4-pro немесе kimi-k2.6 модельдеріне осылай жетесің.',
    },
    needs: {
      en: 'An account. The free plan has starter usage credits and 1 concurrent request; Pro is $20 a month with $60 of usage credits and 3 concurrent requests; Max is $100 a month with $300 of credits and 10 concurrent requests. Be clear with yourself that the privacy argument for running locally disappears here.',
      kk: 'Аккаунт керек. Тегін жоспарда бастапқы кредиттер және 1 қатарлас сұрау бар; Pro — айына $20, $60 кредит және 3 қатарлас сұрау; Max — айына $100, $300 кредит және 10 қатарлас сұрау. Өзіңе анық айтып қой: жергілікті іске қосудың басты дәлелі — құпиялылық — мұнда жоғалады.',
    },
    url: 'https://ollama.com/pricing',
  },
];

// ---------------------------------------------------------------------------

export const pricingNote: L = {
  en: 'Every hosted model runs two meters. Tokens in — your prompt, your files, every tool result, and the entire conversation so far — and tokens out, which is what it writes back. Prices on this page are USD per million tokens at the standard non-batch, non-cached rate. Output is the expensive meter everywhere: 4 to 6 times input across every vendor here, because input is read in a single pass while output has to be produced one token at a time. You might conclude that output dominates your bill, and for a chatbot it does. For a coding agent it does not, because the agent re-sends its whole context on every single turn of the loop, so a long session is mostly input, read over and over. That is why the discounts that actually matter are on the input side: cached input costs 10% of the normal rate at Anthropic and OpenAI (2.5% on Fable 5.1) and 90% less at Mistral, and batch processing is roughly half price everywhere. A concrete size to hold in your head: 100k input plus 10k output, about what it takes to read a mid-size codebase and write one feature, costs around $1.50 on Fable 5.1, $0.75 on Opus 5, $0.30 on Sonnet 5, $0.11 on Gemini 3.8 Flash and $0.032 on GPT-5.6 Luna. One last thing that hits us specifically: the same sentence in Kazakh costs roughly twice its English token count on the best modern tokenizers, and up to 4.7 times on Llama-family ones. Write your prompts, your code comments and your CLAUDE.md in English, and keep Kazakh for what your users actually read.',
  kk: 'Әр хостталған модель екі есептегішпен жұмыс істейді. Кіріс токендер — сенің промптың, файлдарың, әр құралдың қайтарған нәтижесі және осы сәтке дейінгі бүкіл әңгіме — және шығыс токендер, яғни модельдің жазып қайтарғаны. Беттегі бағалар доллармен, 1 млн токен үшін, batch емес және кэштелмеген қарапайым тариф бойынша берілген. Қымбаты — бәрінде де шығыс: мұндағы барлық компанияда ол кірістен 4-6 есе қымбат, өйткені кіріс бір өтуде оқылады, ал шығыс бір-бірлеп жазылады. Сонда есепшотта шығыс басым болады деп ойлауың мүмкін — чат-бот үшін солай. Бірақ кодтайтын агент үшін олай емес: агент цикл сайын бүкіл контекстін қайта жібереді, сондықтан ұзақ сеанстың басым бөлігі — қайта-қайта оқылатын кіріс. Сол себепті шынымен маңызды жеңілдіктер кіріс жағында: кэштелген кіріс Anthropic пен OpenAI-да қалыпты бағаның 10%-ы (Fable 5.1-де 2,5%-ы), Mistral-да 90% арзан, ал batch режимі барлық жерде шамамен екі есе арзан. Есіңде ұстайтын нақты мысал: 100 мың кіріс және 10 мың шығыс токен — орташа код базасын оқып, бір мүмкіндік жазуға кететін шама — Fable 5.1-де шамамен $1,50, Opus 5-те $0,75, Sonnet 5-те $0,30, Gemini 3.8 Flash-та $0,11, ал GPT-5.6 Luna-да $0,032 тұрады. Соңғы бір дүние бізге тікелей қатысты: дәл сол сөйлем қазақша жазылса, ең жақсы заманауи токенизаторларда ағылшыннан шамамен екі есе, Llama тектес токенизаторларда 4,7 есеге дейін көп токен жейді. Сондықтан промпттарыңды, кодтағы түсініктемелеріңді және CLAUDE.md файлыңды ағылшынша жаз, қазақшаны пайдаланушы шынымен оқитын мәтінге қалдыр.',
};
