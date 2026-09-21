// The materials library: everything worth reading about vibecoding and agentic engineering,
// organised by what the learner is trying to DO, not by who published it.
//
// Every URL here comes from the fact-checked research files. Nothing is invented.
// Facts marked UNVERIFIED in the research are not repeated here.
//
// Structure:
//   materials  -> 14 categories, each a shelf you can read top to bottom
//   paths      -> 4 curated routes through the shelves, for 4 kinds of learner

export type Lang = 'en' | 'kk';
type L = { en: string; kk: string };

export interface Resource {
  title: string;
  url: string;
  /** author or organisation */
  by: string;
  kind: 'docs' | 'post' | 'paper' | 'video' | 'course' | 'repo' | 'tool' | 'book' | 'community';
  /** ONE sentence: what you get from it, and when to open it */
  why: L;
  /** 1 beginner, 2 intermediate, 3 deep */
  level: 1 | 2 | 3;
  /** the ~20 that matter most */
  essential?: boolean;
}

export interface Category {
  id: string;
  title: L;
  blurb: L;
  items: Resource[];
}

export const materials: Category[] = [
  // ---------------------------------------------------------------------------
  {
    id: 'start-here',
    title: { en: 'Start here', kk: 'Осыдан баста' },
    blurb: {
      en: 'Eight links, in this order. They give you the definition, the one rule that keeps you safe, and the two guides every serious practitioner reads. One evening.',
      kk: 'Сегіз сілтеме, осы ретпен. Олар анықтаманы, сені қорғайтын бір ережені және кәсіби деңгейде жұмыс істейтіндердің бәрі оқитын екі нұсқаулықты береді. Бір кешке жетеді.',
    },
    items: [
      {
        title: 'Not all AI-assisted programming is vibe coding (but vibe coding rocks)',
        url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
        by: 'Simon Willison',
        kind: 'post',
        level: 1,
        essential: true,
        why: {
          en: 'The clearest definition anyone has written — vibe coding means you did not review the code — plus the golden rule: never ship code you could not explain to someone else.',
          kk: 'Ең анық анықтама: vibe coding дегеніміз — кодты қарап шықпау. Қасында алтын ереже бар: басқаға түсіндіріп бере алмайтын кодты ешқашан жіберме.',
        },
      },
      {
        title: 'The original vibe coding post (2 Feb 2025)',
        url: 'https://x.com/karpathy/status/1886192184808149383',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 1,
        essential: true,
        why: {
          en: 'The 997-character post that named the movement — read it to see that its author scoped it to throwaway weekend projects, a limit almost everyone later dropped.',
          kk: 'Қозғалысқа ат берген 997 таңбалық жазба. Оқып шық: автордың өзі мұны «бір демалысқа арналған жобалар» деп шектеген, ал кейін оны бәрі ұмытты.',
        },
      },
      {
        title: 'One year later: "agentic engineering"',
        url: 'https://x.com/karpathy/status/2019137879310836075',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 1,
        why: {
          en: 'The 4 Feb 2026 retrospective where the author of the term says professionals now work through agents with oversight, and proposes a stricter name for it.',
          kk: '2026 жылғы 4 ақпандағы шолу: терминнің авторы кәсіби мамандар енді агент арқылы, бірақ қатаң бақылаумен жұмыс істейтінін айтып, бұған жаңа ат ұсынады.',
        },
      },
      {
        title: 'Claude Code best practices',
        url: 'https://code.claude.com/docs/en/best-practices',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'The single most useful page in this whole library: give the agent a way to verify its own work, keep the context clean, and avoid the five named failure patterns.',
          kk: 'Осы кітапханадағы ең пайдалы бет: агентке өз жұмысын тексеретін жол бер, контекстті таза ұста және аталған бес сәтсіздік үлгісінен аулақ жүр.',
        },
      },
      {
        title: 'Agentic Engineering Patterns (guide)',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/',
        by: 'Simon Willison',
        kind: 'course',
        level: 2,
        essential: true,
        why: {
          en: 'A free book-length guide in short chapters: principles, working with agents, testing and QA, understanding code, annotated prompts — read one chapter a day.',
          kk: 'Қысқа тараулардан тұратын тегін әрі көлемді нұсқаулық: қағидалар, агентпен жұмыс, тестілеу, кодты түсіну, түсіндірмелі промпттар. Күніне бір тараудан оқы.',
        },
      },
      {
        title: 'Vibe coding (encyclopedia article)',
        url: 'https://en.wikipedia.org/wiki/Vibe_coding',
        by: 'Wikipedia',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The neutral ten-minute overview with every citation linked — the fastest way to check a claim you heard somewhere.',
          kk: 'Барлық дереккөзі сілтемеленген, он минуттық бейтарап шолу. Біреуден естіген дерегіңді тексерудің ең жылдам жолы.',
        },
      },
      {
        title: 'Collins Word of the Year 2025: vibe coding',
        url: 'https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/',
        by: 'Collins Dictionary',
        kind: 'post',
        level: 1,
        why: {
          en: 'The dictionary definition that went mainstream in November 2025 — note that it drops the "you do not read the code" part entirely, which is why a second term was needed.',
          kk: '2025 жылдың қарашасында жаппай тарап кеткен сөздік анықтамасы. Байқа: онда «кодты оқымайсың» деген бөлік мүлде жоқ — сондықтан екінші термин керек болды.',
        },
      },
      {
        title: 'Supported countries and regions',
        url: 'https://www.anthropic.com/supported-countries',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Kazakhstan is on the list for both Claude.ai and the API, so no VPN is needed — check this page yourself before you believe anyone who says otherwise.',
          kk: 'Қазақстан Claude.ai және API тізімінде де бар, сондықтан VPN қажет емес. Кереғар пікір естісең, алдымен осы бетті өзің аш.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'story',
    title: { en: 'The story and the culture', kk: 'Тарих және мәдениет' },
    blurb: {
      en: 'One tweet, fifteen months, a Word of the Year and a change of mind in public. The arc is the lesson: vibes for throwaways, engineering for anything that matters.',
      kk: 'Бір твит, он бес ай, «Жыл сөзі» және көпшілік алдында өзгерген көзқарас. Сабақ та осы доғада: бір реттік жобаға — vibe, маңызды нәрсеге — инженерия.',
    },
    items: [
      {
        title: 'The hottest new programming language is English (24 Jan 2023)',
        url: 'https://x.com/karpathy/status/1617979122625712128',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 1,
        why: {
          en: 'Seven words, two years before the term existed — the pre-history of the whole idea, and a good opening slide.',
          kk: 'Жеті сөз, әрі термин пайда болғанға дейін екі жыл бұрын. Бүкіл идеяның алдындағы тарих әрі жақсы ашылу слайды.',
        },
      },
      {
        title: 'MenuGen: what a real vibe-coded app actually costs',
        url: 'https://karpathy.bearblog.dev/vibe-coding-menugen/',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 1,
        why: {
          en: 'The local prototype felt 80% done but was closer to 20% — most of the work was auth, payments, keys and config, which is exactly where beginners get stuck.',
          kk: 'Жергілікті прототип 80% дайын сияқты көрінген, шын мәнінде 20%-ға жақын болған: жұмыстың көбі auth, төлем, кілттер мен баптауға кеткен — бастаушылар дәл осы жерде тығырыққа тіреледі.',
        },
      },
      {
        title: 'Software Is Changing (Again) — YC AI Startup School talk',
        url: 'https://www.youtube.com/watch?v=LCEmiRjPEtQ',
        by: 'Andrej Karpathy / Y Combinator',
        kind: 'video',
        level: 1,
        essential: true,
        why: {
          en: 'The talk that gives you the vocabulary for everything else: Software 1.0/2.0/3.0, the autonomy slider, and keeping the generation-to-verification loop fast.',
          kk: 'Қалған бәрін түсінуге керек сөздікті беретін дәріс: Software 1.0/2.0/3.0, автономия реттегіші және «жасау → тексеру» циклін жылдам ұстау.',
        },
      },
      {
        title: '2025 LLM Year in Review',
        url: 'https://karpathy.bearblog.dev/year-in-review-2025/',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 2,
        why: {
          en: 'Six shifts of 2025 in one page, including the line that Claude Code was the first convincing demonstration of what an LLM agent looks like.',
          kk: '2025 жылдың алты өзгерісі бір бетте. Ішінде Claude Code-ты «LLM агентінің қандай болатынын алғаш сенімді көрсеткен құрал» деген жол бар.',
        },
      },
      {
        title: 'From Vibe Coding to Agentic Engineering (Sequoia AI Ascent 2026)',
        url: 'https://karpathy.bearblog.dev/sequoia-ascent-2026/',
        by: 'Andrej Karpathy',
        kind: 'post',
        level: 2,
        why: {
          en: 'The clearest framing of the split: vibe coding raises the floor so anyone can build, agentic engineering raises the ceiling without giving up quality.',
          kk: 'Айырманың ең анық тұжырымы: vibe coding «еденді» көтереді — енді кез келген адам құра алады; agentic engineering сапаны жоғалтпай «төбені» көтереді.',
        },
      },
      {
        title: 'Andrej Karpathy: AGI is still a decade away (podcast)',
        url: 'https://www.dwarkesh.com/p/andrej-karpathy',
        by: 'Dwarkesh Patel',
        kind: 'video',
        level: 2,
        why: {
          en: 'The counter-swing: eight months after coining the term he hand-wrote his own flagship repo, because agents kept misunderstanding novel code.',
          kk: 'Кері бұрылыс: терминді ойлап тапқаннан кейін сегіз ай өткенде ол өзінің басты репозиторийін қолмен жазған — агенттер жаңа, үйреншікті емес кодты түсінбей қойған.',
        },
      },
      {
        title: 'Vibe engineering',
        url: 'https://simonwillison.net/2025/Oct/7/vibe-engineering/',
        by: 'Simon Willison',
        kind: 'post',
        level: 2,
        why: {
          en: 'The list of habits coding agents reward — tests, planning, docs, version control, CI, review, QA — which doubles as a syllabus for the whole masterclass.',
          kk: 'Агенттер марапаттайтын дағдылардың тізімі: тест, жоспарлау, құжаттама, нұсқаларды басқару, CI, шолу, QA. Бұл тізім осы курстың бағдарламасы да бола алады.',
        },
      },
      {
        title: 'Vibe coding and agentic engineering are getting closer than I would like',
        url: 'https://simonwillison.net/2026/May/6/vibe-coding-and-agentic-engineering/',
        by: 'Simon Willison',
        kind: 'post',
        level: 2,
        why: {
          en: 'The most honest senior take of 2026: he admits he stopped reviewing every line, and names the danger — each unreviewed success makes the next one feel safer.',
          kk: '2026 жылдың ең адал кәсіби пікірі: автор әр жолды қарап шығуды қойғанын мойындайды және қауіпті атайды — тексерілмеген әр жетістік келесісін қауіпсіз сезіндіреді.',
        },
      },
      {
        title: 'Vibe coding (meme archive)',
        url: 'https://knowyourmeme.com/memes/vibe-coding',
        by: 'Know Your Meme',
        kind: 'community',
        level: 1,
        why: {
          en: 'The jokes, dated and sourced — useful when you want to show how fast the term went from a post to a saturated meme in six weeks.',
          kk: 'Күні мен дереккөзі көрсетілген әзілдер жинағы. Термин алты аптада жай жазбадан жаппай мемге қалай айналғанын көрсеткің келсе, пайдалы.',
        },
      },
      {
        title: 'The Way of Code: The Timeless Art of Vibe Coding',
        url: 'https://www.thewayofcode.com/',
        by: 'Rick Rubin and Anthropic',
        kind: 'book',
        level: 1,
        why: {
          en: 'Eighty-one chapters modelled on the Dao De Jing with editable Claude artifacts — proof that a meme can become a product in under four months.',
          kk: '«Дао де цзин» үлгісімен жазылған 81 тарау және өзгертуге болатын Claude artifact-тары. Мем төрт айдан аз уақытта өнімге айналатынының дәлелі.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'evidence',
    title: { en: 'The evidence: what the numbers say', kk: 'Дәлел: сандар не дейді' },
    blurb: {
      en: 'Both sides, with sources. Measured effects sit between minus 19 percent and plus 25 percent; self-reported effects sit between 1.4x and 8x. That gap is the whole lesson.',
      kk: 'Екі жағы да, дереккөзімен. Өлшенген әсер −19%-бен +25% аралығында, ал адамдардың өздері айтқаны 1,4 еседен 8 есеге дейін. Осы алшақтықтың өзі — басты сабақ.',
    },
    items: [
      {
        title: 'Measuring the impact of early-2025 AI on experienced open-source developer productivity',
        url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
        by: 'METR',
        kind: 'paper',
        level: 2,
        essential: true,
        why: {
          en: 'The best randomised trial we have: 16 experienced developers on 246 real issues took 19 percent longer with AI, while believing they were 20 percent faster.',
          kk: 'Бізде бар ең сапалы рандомизацияланған зерттеу: 16 тәжірибелі әзірлеуші 246 нақты тапсырмада ЖИ-мен 19% баяу жұмыс істеген, бірақ өздерін 20% жылдам деп сезінген.',
        },
      },
      {
        title: 'Uplift update (24 Feb 2026)',
        url: 'https://metr.org/blog/2026-02-24-uplift-update/',
        by: 'METR',
        kind: 'paper',
        level: 2,
        why: {
          en: 'The follow-up: the sign probably flipped toward a speedup, but both confidence intervals cross zero and METR itself calls the dataset unreliable — read it before you quote either result.',
          kk: 'Жалғасы: таңба жылдамдау жағына ауысқан сияқты, бірақ екі сенім аралығы да нөлді кесіп өтеді, әрі METR өз деректерін сенімсіз деп атайды. Екі нәтиженің бірін келтірер алдында оқы.',
        },
      },
      {
        title: '2026 GenAI Code Security Report',
        url: 'https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/',
        by: 'Veracode',
        kind: 'paper',
        level: 2,
        essential: true,
        why: {
          en: 'Syntax is solved and security is not: the pass rate moved from 55 to 56 percent in a year, so 44 percent of unprompted AI code still ships a known flaw.',
          kk: 'Синтаксис шешілді, қауіпсіздік — жоқ: бір жылда нәтиже 55%-дан 56%-ға ғана өскен, яғни арнайы сұрамаған ЖИ кодының 44%-ында белгілі осалдық қалады.',
        },
      },
      {
        title: '2025 GenAI Code Security Report',
        url: 'https://www.veracode.com/blog/genai-code-security-report/',
        by: 'Veracode',
        kind: 'paper',
        level: 2,
        why: {
          en: 'The 2025 baseline across 100+ models: 45 percent of samples failed, Java worst at 72 percent, and bigger models were not safer.',
          kk: '100-ден астам модель бойынша 2025 жылғы бастапқы өлшем: үлгілердің 45%-ы сынақтан өтпеген, ең нашары Java — 72%, әрі үлкен модельдер қауіпсіз болып шықпаған.',
        },
      },
      {
        title: 'Developer Survey 2025: AI section',
        url: 'https://survey.stackoverflow.co/2025/ai',
        by: 'Stack Overflow',
        kind: 'paper',
        level: 1,
        essential: true,
        why: {
          en: 'The adoption-versus-trust picture from 49,000 developers: 84 percent use or plan to use AI, 46 percent distrust its accuracy, and only about 3 percent trust it highly.',
          kk: '49 000 әзірлеушінің «қолдану мен сенім» суреті: 84% ЖИ-ді пайдаланады не пайдаланбақ, 46% дәлдігіне сенбейді, ал қатты сенетіні — небәрі 3%-ға жуық.',
        },
      },
      {
        title: 'AI Coding Agents: Adoption Trends (Aug 2026)',
        url: 'https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/',
        by: 'JetBrains Research',
        kind: 'paper',
        level: 1,
        why: {
          en: 'The freshest large survey: 90 percent of professional developers use coding agents weekly, and Claude Code is at 39 percent work adoption worldwide.',
          kk: 'Ең жаңа ірі сауалнама: кәсіби әзірлеушілердің 90%-ы агенттерді аптасына бір рет болса да пайдаланады, ал Claude Code әлемде 39% жұмыс қолданысына жеткен.',
        },
      },
      {
        title: 'How AI assistance affects coding skill formation',
        url: 'https://www.anthropic.com/research/AI-assistance-coding-skills',
        by: 'Anthropic',
        kind: 'paper',
        level: 1,
        essential: true,
        why: {
          en: 'The one study every student must read: juniors who fully delegated scored 50 percent on a comprehension quiz, those who asked for explanations scored 67.',
          kk: 'Әр студент оқуға тиіс жалғыз зерттеу: бәрін агентке тапсырғандар түсіну тестінде 50%, ал түсіндіруді сұрағандар 67% жинаған.',
        },
      },
      {
        title: 'DORA 2025 report',
        url: 'https://blog.google/innovation-and-ai/technology/developers-tools/dora-report-2025/',
        by: 'Google Cloud / DORA',
        kind: 'paper',
        level: 2,
        why: {
          en: 'Around 5,000 professionals: 90 percent use AI at work, but adoption is still negatively linked to delivery stability — the report says AI amplifies what a team already is.',
          kk: 'Шамамен 5 000 маман: 90%-ы жұмыста ЖИ қолданады, бірақ бұл жеткізу тұрақтылығымен әлі де теріс байланысты. Есептің түйіні: ЖИ команда қандай болса, соны күшейтеді.',
        },
      },
      {
        title: 'AI is already writing almost one third of new software code',
        url: 'https://csh.ac.at/news/ai-is-already-writing-almost-one-third-of-new-software-code/',
        by: 'Complexity Science Hub (Daniotti, Wachs, Feng, Neffke)',
        kind: 'paper',
        level: 2,
        why: {
          en: 'The independent academic number, not a company claim: about 29 percent of new US Python functions by end 2024, with gains going almost entirely to experienced developers.',
          kk: 'Компания емес, тәуелсіз академиялық сан: 2024 жылдың соңында АҚШ-та жаңа Python функцияларының шамамен 29%-ы. Ұтыс түгелге жуық тәжірибелі әзірлеушілерге тиген.',
        },
      },
      {
        title: 'Canaries in the Coal Mine (Aug 2026 update)',
        url: 'https://digitaleconomy.stanford.edu/news/canariesaug26/',
        by: 'Brynjolfsson, Chandar and Chen (Stanford Digital Economy Lab)',
        kind: 'paper',
        level: 2,
        why: {
          en: 'The entry-level jobs question, with the caveats the headlines drop: 22-25 year olds in AI-exposed occupations are about 19 percent below trend, and the authors call it descriptive, not causal.',
          kk: 'Жас мамандардың жұмысы туралы сұрақ — тақырыптар түсіріп кететін ескертулерімен: ЖИ әсері жоғары салаларда 22–25 жастағылар трендтен шамамен 19% төмен, ал авторлар мұны себеп-салдар емес, сипаттама деп атайды.',
        },
      },
      {
        title: 'The AI Code Quality and Maintainability Gap',
        url: 'https://www.gitclear.com/the_ai_code_quality_maintainability_gap',
        by: 'GitClear',
        kind: 'paper',
        level: 3,
        why: {
          en: '623 million code changes say duplication is up and refactoring is down — the long-term cost of code nobody rereads, though the dataset is a vendor one and correlational.',
          kk: '623 миллион код өзгерісі көрсететіні: қайталану өсті, refactoring азайды. Ешкім қайта оқымайтын кодтың ұзақмерзімді бағасы — бірақ дерек вендордікі әрі корреляциялық.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'fundamentals',
    title: { en: 'Learn the fundamentals', kk: 'Негізін үйрен' },
    blurb: {
      en: 'Tokens, context, MCP, git and the instruction-file standards. This is the vocabulary layer — the words that make every other page on this site readable.',
      kk: 'Токен, контекст, MCP, git және нұсқаулық файл стандарттары. Бұл — сөздік қабаты: осы сайттағы қалған беттердің бәрін түсінікті ететін сөздер.',
    },
    items: [
      {
        title: 'AGENTS.md',
        url: 'https://agents.md/',
        by: 'Agentic AI Foundation (Linux Foundation)',
        kind: 'docs',
        level: 1,
        essential: true,
        why: {
          en: 'The one file that every agent reads — a README for agents, plain Markdown, no required fields, used by 60,000+ open-source repos.',
          kk: 'Барлық агент оқитын жалғыз файл — агенттерге арналған README. Қарапайым Markdown, міндетті өріс жоқ, 60 000-нан астам ашық репозиторий қолданады.',
        },
      },
      {
        title: 'Agent Skills specification',
        url: 'https://agentskills.io/specification',
        by: 'agentskills.io',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The open standard behind skills: a folder with SKILL.md, loaded progressively so a big instruction set costs almost nothing until it is actually needed.',
          kk: 'Skill-дердің артындағы ашық стандарт: SKILL.md бар қалта, ол кезең-кезеңмен жүктеледі — үлкен нұсқаулық шынымен керек болғанға дейін контекстке еш шығын түсірмейді.',
        },
      },
      {
        title: 'Model Context Protocol specification',
        url: 'https://modelcontextprotocol.io/specification/latest',
        by: 'Model Context Protocol',
        kind: 'docs',
        level: 2,
        why: {
          en: 'USB-C for AI tools, in the current 2026-07-28 revision: servers offer resources, prompts and tools, clients offer elicitation, everything over JSON-RPC.',
          kk: 'ЖИ құралдарына арналған USB-C, ағымдағы 2026-07-28 нұсқасында: серверлер resource, prompt және tool ұсынады, клиенттер elicitation береді, бәрі JSON-RPC арқылы.',
        },
      },
      {
        title: 'Official MCP registry',
        url: 'https://registry.modelcontextprotocol.io/',
        by: 'Model Context Protocol',
        kind: 'tool',
        level: 2,
        why: {
          en: 'Where to look up a server before you install it — and the habit to build, because an MCP server runs with your permissions.',
          kk: 'Серверді орнатар алдында осы жерден іздеп көр. Мұны әдетке айналдыр: MCP сервері сенің рұқсаттарыңмен жұмыс істейді.',
        },
      },
      {
        title: 'MCP reference servers',
        url: 'https://github.com/modelcontextprotocol/servers',
        by: 'Model Context Protocol',
        kind: 'repo',
        level: 2,
        why: {
          en: 'The seven reference servers (Filesystem, Git, Fetch, Memory, Time and friends) — the cheapest way to read real MCP code before writing your own.',
          kk: 'Жеті үлгі сервер (Filesystem, Git, Fetch, Memory, Time және т.б.). Өз серверіңді жазар алдында нақты MCP кодын оқудың ең қарапайым жолы.',
        },
      },
      {
        title: 'Token counting API',
        url: 'https://platform.claude.com/docs/en/build-with-claude/token-counting',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Stop guessing what a prompt costs: this endpoint gives the exact token count for Claude models, which matters double for Kazakh text.',
          kk: 'Промпттың бағасын болжауды қой: бұл endpoint Claude модельдері үшін дәл токен санын береді — қазақ мәтіні үшін бұл екі есе маңызды.',
        },
      },
      {
        title: 'Tiktokenizer',
        url: 'https://tiktokenizer.vercel.app/',
        by: 'Tiktokenizer',
        kind: 'tool',
        level: 1,
        why: {
          en: 'Paste the same sentence in English and Kazakh and watch the token counts diverge — the fastest demonstration of the tokenizer tax on your own text.',
          kk: 'Бір сөйлемді ағылшынша және қазақша қойып көр де, токен санының қалай алшақтайтынын бақыла. «Токенизатор салығын» өз мәтініңде көрудің ең жылдам жолы.',
        },
      },
      {
        title: 'Sherkala: a Kazakh-adapted LLM (tokenizer fertility table)',
        url: 'https://arxiv.org/html/2503.01493',
        by: 'arXiv 2503.01493',
        kind: 'paper',
        level: 3,
        why: {
          en: 'Table 1 is the number to remember: Kazakh costs 4.73 tokens per word on the Llama-3.1 tokenizer versus 2.56 for Russian, and drops to 2.04 once Kazakh tokens are added.',
          kk: 'Есте сақтайтын сан — 1-кесте: Llama-3.1 токенизаторында қазақ тілі сөзіне 4,73 токен кетеді (орыс тілінде 2,56), ал қазақ токендері қосылғанда 2,04-ке дейін түседі.',
        },
      },
      {
        title: 'Git for Windows',
        url: 'https://git-scm.com/downloads/win',
        by: 'Git',
        kind: 'tool',
        level: 1,
        why: {
          en: 'Install this before the workshop: git is the only real undo when an agent edits thirty files at once, and most students here are on Windows.',
          kk: 'Шеберлік сабағына дейін орнат: агент отыз файлды бірден өзгерткенде жалғыз шынайы «болдырмау» — git, ал мұндағы студенттердің көбі Windows-та отыр.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'tools',
    title: { en: 'The agents, IDEs and app builders', kk: 'Агенттер, IDE-лер және қолданба құрастырғыштар' },
    blurb: {
      en: 'Four surfaces, one ladder: browser builders, editor agents, terminal agents, cloud agents. Prices and free tiers change every quarter, so always open the page rather than trusting a tutorial.',
      kk: 'Төрт бет, бір саты: браузерде құрастырғыштар, редактор агенттері, терминал агенттері, бұлттағы агенттер. Баға мен тегін лимит әр тоқсан сайын өзгереді, сондықтан оқулыққа емес, әрқашан ресми бетке сен.',
    },
    items: [
      {
        title: 'Codex CLI documentation',
        url: 'https://learn.chatgpt.com/docs/codex/cli',
        by: 'OpenAI',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The strongest "one subscription, three surfaces" story — terminal, IDE extension and cloud tasks that open pull requests, all on one ChatGPT account.',
          kk: '«Бір жазылым — үш бет» дегеннің ең күшті мысалы: терминал, IDE кеңейтімі және pull request ашатын бұлттық тапсырмалар — бәрі бір ChatGPT тіркелгісімен.',
        },
      },
      {
        title: 'ChatGPT and Codex pricing',
        url: 'https://learn.chatgpt.com/docs/pricing',
        by: 'OpenAI',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Check here before you promise anyone a free CLI: the pricing page says Free and Go include Codex, with allowances given as ranges rather than numbers.',
          kk: 'Біреуге тегін CLI уәде етер алдында осыны аш: баға бетінде Free мен Go жоспарларында Codex бар делінген, бірақ лимиттер нақты сан емес, аралықпен берілген.',
        },
      },
      {
        title: 'Cursor documentation',
        url: 'https://cursor.com/docs',
        by: 'Cursor (Anysphere)',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The smoothest GUI agent loop, with plan mode, rules and a CLI — start here if you already live in a VS Code-style editor.',
          kk: 'Ең ыңғайлы графикалық агент циклі: plan mode, ережелер және CLI бар. VS Code тәрізді редакторда жұмыс істеп жүрсең, осыдан баста.',
        },
      },
      {
        title: 'Google Antigravity documentation',
        url: 'https://antigravity.google/docs',
        by: 'Google',
        kind: 'docs',
        level: 1,
        essential: true,
        why: {
          en: 'The most generous free agent access right now — an IDE, a desktop app and the agy CLI, with non-Google models on the free Individual plan.',
          kk: 'Қазіргі ең жомарт тегін агент қолжетімділігі: IDE, жұмыс үстелі қолданбасы және agy CLI, әрі тегін Individual жоспарында Google-дікі емес модельдер де бар.',
        },
      },
      {
        title: 'Antigravity FAQ (availability and age limit)',
        url: 'https://antigravity.google/docs/faq/',
        by: 'Google',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Two facts that decide whether it works for you: Kazakhstan is supported, and the product is not available to under-18s — which matters for school-age attendees.',
          kk: 'Саған жарай ма, жоқ па — соны шешетін екі дерек: Қазақстан қолдауға кіреді, бірақ өнім 18 жасқа толмағандарға қолжетімсіз. Мектеп жасындағы қатысушылар үшін бұл маңызды.',
        },
      },
      {
        title: 'Transitioning Gemini CLI to Antigravity CLI',
        url: 'https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/',
        by: 'Google Developers Blog',
        kind: 'post',
        level: 2,
        why: {
          en: 'Read this whenever a 2025 tutorial tells you Gemini CLI gives 1,000 free requests a day: from 18 Jun 2026 it stopped serving free and AI Pro/Ultra users.',
          kk: '2025 жылғы оқулық «Gemini CLI күніне 1 000 тегін сұрау береді» десе, осыны оқы: 2026 жылғы 18 маусымнан бастап ол тегін және AI Pro/Ultra қолданушыларына қызмет көрсетуін тоқтатты.',
        },
      },
      {
        title: 'GitHub Copilot plans',
        url: 'https://github.com/features/copilot/plans',
        by: 'GitHub',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The cheapest paid agent at $10 a month, and the page that explains AI Credits — 1 credit is $0.01, which is how you translate a plan into actual agent runs.',
          kk: 'Айына $10-ға ең арзан ақылы агент. Әрі AI Credits деген не екенін түсіндіретін бет: 1 credit = $0,01 — жоспарды нақты агент жұмысына осылай аударасың.',
        },
      },
      {
        title: 'Copilot agent mode in VS Code',
        url: 'https://code.visualstudio.com/docs/copilot/agents/overview',
        by: 'Microsoft / VS Code',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The lowest-friction first agent for anyone who already has VS Code open — and VS Code now hosts Claude and Codex harnesses next to Copilot.',
          kk: 'VS Code-ы ашық тұрған адам үшін ең кедергісіз бірінші агент. Оның үстіне VS Code енді Copilot-пен қатар Claude мен Codex harness-терін де ұстайды.',
        },
      },
      {
        title: 'Important updates to GitHub Copilot for students',
        url: 'https://github.com/orgs/community/discussions/189268',
        by: 'GitHub Education community',
        kind: 'community',
        level: 1,
        why: {
          en: 'The Student plan is free and needs no card, but it is now 200 AI credits a month with auto model selection only — read the thread before you build a course on it.',
          kk: 'Student жоспары тегін әрі карта қажет етпейді, бірақ қазір айына 200 AI credit және тек автоматты модель таңдау. Оның үстіне курс құрар алдында талқылауды оқы.',
        },
      },
      {
        title: 'Jules usage limits',
        url: 'https://jules.google/docs/usage-limits/',
        by: 'Google',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The best free door into cloud agents: connect a GitHub repo, describe a task, get a pull request — 15 tasks a day on the free tier.',
          kk: 'Бұлттық агенттерге кірудің ең жақсы тегін есігі: GitHub репозиторийін қос, тапсырманы сипатта, pull request ал. Тегін деңгейде күніне 15 тапсырма.',
        },
      },
      {
        title: 'opencode documentation',
        url: 'https://opencode.ai/docs/',
        by: 'Anomaly',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The most popular open-source terminal agent: provider-agnostic, readable source, and a free rotating set of beta models if you have no budget at all.',
          kk: 'Ең танымал ашық бастапқы кодты терминал агенті: провайдерге тәуелсіз, кодын оқуға болады, әрі бюджет мүлде болмаса — ауысып тұратын тегін beta модельдер жиыны бар.',
        },
      },
      {
        title: 'Cline documentation',
        url: 'https://docs.cline.bot',
        by: 'Cline',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The transparency option: you see every tool call and its token cost, you can point it at any model including local ones, and it works as a VS Code extension or a CLI.',
          kk: 'Ашықтықты бағалайтындарға: әр tool шақыруы мен оның токен бағасы көрініп тұрады, кез келген модельге, соның ішінде жергілікті модельге де бағыттауға болады, VS Code кеңейтімі ретінде де, CLI ретінде де жұмыс істейді.',
        },
      },
      {
        title: 'Lovable pricing and credits',
        url: 'https://lovable.dev/pricing',
        by: 'Lovable',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The fastest idea-to-shareable-MVP path with a built-in backend — but read how credits work first, because debugging loops eat them fastest.',
          kk: 'Идеядан бөлісуге дайын MVP-ге дейінгі ең жылдам жол, әрі backend-і кіреді. Бірақ алдымен credit қалай жұмсалатынын оқы: ең көп credit-ті жөндеу циклдері жейді.',
        },
      },
      {
        title: 'AWS Kiro documentation',
        url: 'https://kiro.dev/docs/',
        by: 'AWS',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The IDE that forces spec-before-code on you — worth one evening even if you never adopt it, because the discipline transfers to every other tool.',
          kk: 'Кодтан бұрын spec жазуға мәжбүрлейтін IDE. Тіпті тұрақты қолданбасаң да бір кешіңді арна: бұл тәртіп кез келген басқа құралға көшеді.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'claude-code',
    title: { en: 'Claude Code, end to end', kk: 'Claude Code: басынан аяғына дейін' },
    blurb: {
      en: 'The main track of this masterclass. Five ideas carry everything: the loop, context as the scarce resource, permission as trust, almost everything is reversible, and teach it once rather than every time.',
      kk: 'Осы курстың негізгі бағыты. Бәрін бес идея ұстап тұр: цикл, контекст — тапшы ресурс, рұқсат — сенімнің өлшемі, бәрін дерлік кері қайтаруға болады және бір рет үйрет, әр жолы емес.',
    },
    items: [
      {
        title: 'Claude Code overview',
        url: 'https://code.claude.com/docs/en/overview',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'What it is and which surface to use — terminal, desktop app, web, VS Code, JetBrains or mobile all run the same engine and share your settings.',
          kk: 'Бұл не және қай бетті таңдау керек: терминал, жұмыс үстелі қолданбасы, web, VS Code, JetBrains және мобиль — бәрі бір қозғалтқышта жұмыс істейді әрі параметрлерің ортақ.',
        },
      },
      {
        title: 'Set up Claude Code',
        url: 'https://code.claude.com/docs/en/setup',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        essential: true,
        why: {
          en: 'The exact install commands and system requirements — and the page that kills the old myth that Windows needs Node, npm and WSL.',
          kk: 'Дәл орнату пәрмендері мен жүйе талаптары. Әрі «Windows-та Node, npm және WSL керек» деген ескі мифті жоққа шығаратын бет.',
        },
      },
      {
        title: 'How Claude Code works',
        url: 'https://code.claude.com/docs/en/how-claude-code-works',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The agentic loop diagram — describe, gather context, act with tools, verify, repeat — plus the reminder that you can interrupt at any point.',
          kk: 'Агенттік цикл сызбасы: сипатта → контекст жина → құралдармен әрекет ет → тексер → қайтала. Әрі кез келген сәтте үзуге болатынын ұмытпа.',
        },
      },
      {
        title: 'Permission modes',
        url: 'https://code.claude.com/docs/en/permission-modes',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'The single most important safety page: what Manual, accept-edits, plan, auto and bypass actually allow, and why plan mode belongs at the start of anything non-trivial.',
          kk: 'Қауіпсіздік бойынша ең маңызды бет: Manual, accept-edits, plan, auto және bypass режимдері нақты нені рұқсат етеді, әрі күрделі жұмыстың бәрін неге plan mode-тан бастау керек.',
        },
      },
      {
        title: 'Memory: CLAUDE.md and AGENTS.md',
        url: 'https://code.claude.com/docs/en/memory',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'Project memory done right: keep it under 200 lines, include only what the agent cannot guess, and note that Claude Code now reads AGENTS.md when there is no CLAUDE.md.',
          kk: 'Жоба жадысын дұрыс жасау: 200 жолдан аспасын, тек агент өзі таба алмайтынды жаз. Әрі есте ұста: CLAUDE.md болмаса, Claude Code енді AGENTS.md-ті оқиды.',
        },
      },
      {
        title: 'Checkpointing and rewind',
        url: 'https://code.claude.com/docs/en/checkpointing',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Local undo: Esc Esc or /rewind restores code, conversation, or both — but Bash side effects are not tracked, so this is not a replacement for git.',
          kk: 'Жергілікті «болдырмау»: Esc Esc немесе /rewind кодты, әңгімені немесе екеуін де қайтарады. Бірақ Bash тудырған өзгерістер бақыланбайды, сондықтан бұл git-тің орнын баспайды.',
        },
      },
      {
        title: 'Interactive mode and keyboard shortcuts',
        url: 'https://code.claude.com/docs/en/interactive-mode',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Ten minutes that save hours: Shift+Tab to cycle modes, Esc to stop, Ctrl+G to edit a plan in your editor.',
          kk: 'Сағаттарды үнемдейтін он минут: режимді ауыстыру үшін Shift+Tab, тоқтату үшін Esc, жоспарды өз редакторыңда ашу үшін Ctrl+G.',
        },
      },
      {
        title: 'Slash commands',
        url: 'https://code.claude.com/docs/en/commands',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'There are about ninety; you need fifteen — /clear, /compact, /context, /init, /permissions, /rewind, /usage and a handful more.',
          kk: 'Барлығы тоқсанға жуық, саған он бесі жетеді: /clear, /compact, /context, /init, /permissions, /rewind, /usage және тағы бірнешеуі.',
        },
      },
      {
        title: 'Agent Skills in Claude Code',
        url: 'https://code.claude.com/docs/en/skills',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'How to teach a repeatable workflow once: a folder with SKILL.md, loaded only when relevant, which is why skills beat stuffing everything into CLAUDE.md.',
          kk: 'Қайталанатын жұмыс ағынын бір рет үйретудің жолы: SKILL.md бар қалта, тек керек кезде жүктеледі. Сол себепті бәрін CLAUDE.md-ке тығудан гөрі skill жақсы.',
        },
      },
      {
        title: 'Hooks guide',
        url: 'https://code.claude.com/docs/en/hooks-guide',
        by: 'Anthropic',
        kind: 'docs',
        level: 3,
        why: {
          en: 'CLAUDE.md is advice and a hook is a rule, so use hooks for anything that must always or never happen, such as running the linter after every edit.',
          kk: 'CLAUDE.md — кеңес, hook — ереже. Әрқашан немесе ешқашан болмауға тиіс нәрселерге hook қолдан: мысалы, әр өзгерістен кейін linter-ді іске қосу.',
        },
      },
      {
        title: 'MCP quickstart',
        url: 'https://code.claude.com/docs/en/mcp-quickstart',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Connect your first server in five minutes, and learn to read the claude mcp list statuses — Connected, Needs authentication, Failed to connect.',
          kk: 'Бес минутта бірінші серверіңді қос және claude mcp list күйлерін оқуды үйрен: Connected, Needs authentication, Failed to connect.',
        },
      },
      {
        title: 'Claude Code auto mode',
        url: 'https://www.anthropic.com/engineering/claude-code-auto-mode',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 2,
        why: {
          en: 'Why permission prompts stopped working — users approved about 93 percent of them anyway — and why auto mode is described as a seatbelt, not a sandbox.',
          kk: 'Рұқсат сұрау неге тиімсіз болып қалды — пайдаланушылар оның 93%-ына бәрібір келіскен — әрі auto режимі неге sandbox емес, «қауіпсіздік белдігі» деп аталады.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'context',
    title: { en: 'Prompting, planning and context engineering', kk: 'Промпт, жоспарлау және контекст инженериясы' },
    blurb: {
      en: 'The one constraint under everything: attention is a finite budget and quality drops as the window fills. This shelf covers how to spend that budget, and the spec-driven toolkits built on top of it.',
      kk: 'Бәрінің астындағы жалғыз шектеу: назар — шектеулі бюджет, ал терезе толған сайын сапа түседі. Бұл сөре сол бюджетті қалай жұмсау керегін және оның үстіне салынған spec-ке негізделген құралдарды қамтиды.',
    },
    items: [
      {
        title: 'Effective context engineering for AI agents',
        url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 2,
        essential: true,
        why: {
          en: 'The successor to prompt engineering, in one post: find the right altitude for your system prompt, retrieve just in time, and use compaction, notes and subagents for long horizons.',
          kk: 'Prompt engineering-тің жалғасы бір жазбада: жүйелік промптқа дұрыс «биіктік» тап, деректі дәл керек кезде ал, ұзақ жұмыста compaction, жазба және subagent қолдан.',
        },
      },
      {
        title: 'Context Rot: how increasing input tokens impacts LLM performance',
        url: 'https://www.trychroma.com/research/context-rot',
        by: 'Chroma (Kelly Hong, Anton Troynikov, Jeff Huber)',
        kind: 'paper',
        level: 2,
        essential: true,
        why: {
          en: 'Eighteen models tested: performance gets less reliable as input grows, even on trivial tasks, and a single plausible distractor already hurts — the evidence behind /clear.',
          kk: 'Он сегіз модель сыналған: кіріс өскен сайын нәтиже, тіпті қарапайым тапсырмада да, сенімсіздене түседі, әрі бір ғана ұқсас бөгде дерек зиян келтіреді. /clear-дің дәлелі осы.',
        },
      },
      {
        title: 'Advanced Context Engineering for Coding Agents',
        url: 'https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md',
        by: 'Dex Horthy (HumanLayer)',
        kind: 'repo',
        level: 3,
        why: {
          en: 'Research, then plan, then implement — each in a fresh context, each leaving a markdown artifact; and the leverage rule that makes you review plans, not only diffs.',
          kk: 'Зерттеу → жоспар → орындау, әрқайсысы таза контексте, әрқайсысы markdown артефакт қалдырады. Әрі тек diff-ті емес, жоспарды да қарап шығуға мәжбүрлейтін «иін күші» ережесі.',
        },
      },
      {
        title: 'Understanding the context window',
        url: 'https://code.claude.com/docs/en/context-window',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'An interactive walkthrough of what actually fills your window at startup and what each file read costs — open it once and you will never over-stuff a session again.',
          kk: 'Сессия басында терезені шын мәнінде не толтыратынын және әр файлды оқу қанша тұратынын көрсететін интерактивті шолу. Бір рет ашсаң, сессияны қайта артық толтырмайсың.',
        },
      },
      {
        title: 'What is agentic engineering?',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/what-is-agentic-engineering/',
        by: 'Simon Willison',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The one-line definition to keep — agents run tools in a loop to achieve a goal — with the boundary against vibe coding spelled out.',
          kk: 'Есте сақтайтын бір жолдық анықтама: агент мақсатқа жету үшін құралдарды циклмен іске қосады. Vibe coding-тен айырмасы да нақты көрсетілген.',
        },
      },
      {
        title: 'Equipping agents for the real world with Agent Skills',
        url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 2,
        why: {
          en: 'Progressive disclosure explained: about 100 tokens of metadata always loaded, the body only when relevant, scripts only when needed — that is the whole trick.',
          kk: 'Кезең-кезеңмен ашу қалай жұмыс істейді: әрқашан жүктелетін ~100 токен метадерек, керек кезде ғана негізгі мәтін, шын қажет болғанда ғана скрипт. Бар қулық — осы.',
        },
      },
      {
        title: 'Evaluating AGENTS.md: are repository-level context files helpful?',
        url: 'https://arxiv.org/abs/2602.11988',
        by: 'ETH Zurich and LogicStar.ai',
        kind: 'paper',
        level: 3,
        why: {
          en: 'The uncomfortable result: generic context files did not generally improve success rates while adding over 20 percent to inference cost — write only non-guessable facts.',
          kk: 'Ыңғайсыз нәтиже: жалпылама контекст файлдары табысты жалпы жақсартпаған, ал есептеу бағасын 20%-дан астам өсірген. Тек өзі таба алмайтын нақты деректі жаз.',
        },
      },
      {
        title: 'AGENTS.md outperforms skills in our agent evals',
        url: 'https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals',
        by: 'Vercel',
        kind: 'post',
        level: 3,
        why: {
          en: 'The other half of the story: a small always-present docs index took their Next.js eval from 53 to 100 percent — specific pointers help, generic descriptions cost tokens.',
          kk: 'Әңгіменің екінші жағы: әрқашан қолжетімді шағын құжаттама индексі олардың Next.js бағалауын 53%-дан 100%-ға жеткізген. Нақты сілтеме көмектеседі, жалпы сипаттама токен жейді.',
        },
      },
      {
        title: 'GitHub Spec Kit',
        url: 'https://github.com/github/spec-kit',
        by: 'GitHub',
        kind: 'repo',
        level: 2,
        why: {
          en: 'Spec-driven development as a CLI: constitution, then specify, then plan, then tasks, then implement and converge — try it once on a feature you already understand.',
          kk: 'Spec-ке негізделген әзірлеу CLI түрінде: constitution → specify → plan → tasks → implement → converge. Алдымен өзің жақсы білетін функцияда сынап көр.',
        },
      },
      {
        title: 'Kiro specs: requirements, design, tasks',
        url: 'https://kiro.dev/docs/specs/',
        by: 'AWS',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The clearest worked example of a three-file spec with approval gates between the phases — copy the structure even if you never install Kiro.',
          kk: 'Кезеңдер арасында бекіту нүктелері бар үш файлдық spec-тің ең анық мысалы. Kiro-ны орнатпасаң да, құрылымын көшіріп ал.',
        },
      },
      {
        title: 'Exploring Gen AI: spec-driven development with three tools',
        url: 'https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html',
        by: 'Birgitta Böckeler (martinfowler.com)',
        kind: 'post',
        level: 2,
        why: {
          en: 'The critique that keeps you sane: for a small bug these workflows are a sledgehammer, and elaborate process can give a false sense of control — SDD is a dial, not a religion.',
          kk: 'Есіңді жиғызатын сын: кішкентай қате үшін бұл ағындар — балғамен шыбын ұру, ал күрделі процесс жалған бақылау сезімін береді. SDD — дін емес, реттегіш.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'testing',
    title: { en: 'Testing, verification and quality', kk: 'Тестілеу, тексеру және сапа' },
    blurb: {
      en: 'The agent stops when the work looks done. Without a runnable check, "looks done" is its only signal and you become the test suite. Everything on this shelf fixes that.',
      kk: 'Агент жұмыс біткен сияқты көрінгенде тоқтайды. Іске қосылатын тексеру болмаса, оның жалғыз белгісі — «бітті сияқты», ал тест жүйесіне сен айналасың. Бұл сөредегінің бәрі соны түзейді.',
    },
    items: [
      {
        title: 'Red/green TDD with coding agents',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/',
        by: 'Simon Willison',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'Add "use red/green TDD" to a build prompt and the agent writes the test, watches it fail, then implements — a test never seen failing proves nothing.',
          kk: 'Құру промптына «use red/green TDD» деп қос: агент алдымен тест жазады, оның құлағанын көреді, содан кейін жүзеге асырады. Құлағаны көрінбеген тест ештеңе дәлелдемейді.',
        },
      },
      {
        title: 'First run the tests',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/first-run-the-tests/',
        by: 'Simon Willison',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The cheapest way to start a session in an unfamiliar repo: have the agent run the existing suite, so it learns the project and the norm at the same time.',
          kk: 'Бейтаныс репозиторийде сессияны бастаудың ең арзан тәсілі: агентке бар тесттерді іске қостыр — ол жобаны да, қабылданған тәртіпті де бірден үйренеді.',
        },
      },
      {
        title: 'Anti-patterns',
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/anti-patterns/',
        by: 'Simon Willison',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The short list of things not to do, headed by the big one: never open a pull request with code you have not reviewed yourself.',
          kk: 'Істемеуге тиіс нәрселердің қысқа тізімі, ең бастысы бірінші тұр: өзің қарап шықпаған кодпен ешқашан pull request ашпа.',
        },
      },
      {
        title: 'Augmented Coding: Beyond the Vibes',
        url: 'https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes',
        by: 'Kent Beck',
        kind: 'post',
        level: 2,
        why: {
          en: 'Three signals the agent has gone off the rails — it loops, it adds things nobody asked for, or it cheats by weakening tests to get green.',
          kk: 'Агенттің жолдан шыққанын көрсететін үш белгі: айналып қалады, ешкім сұрамаған нәрсе қосады немесе жасыл нәтиже алу үшін тесттерді әлсіретіп алдайды.',
        },
      },
      {
        title: 'TDD, AI agents and coding with Kent Beck',
        url: 'https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent',
        by: 'The Pragmatic Engineer',
        kind: 'post',
        level: 2,
        why: {
          en: 'The long-form version: the agent is a genie that grants wishes in unexpected ways, TDD is a superpower with agents, and even Beck struggles to stop them deleting tests.',
          kk: 'Кеңейтілген нұсқасы: агент — тілекті күтпеген жолмен орындайтын жын, TDD агентпен бірге супер күшке айналады, әрі тесттерді өшіруден Beck-тің өзі де әрең тоқтатады.',
        },
      },
      {
        title: 'Demystifying evals for AI agents',
        url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 3,
        why: {
          en: 'When you want to measure whether your CLAUDE.md or skill actually changed behaviour: start with 20-50 tasks taken from real failures and grade them deterministically.',
          kk: 'CLAUDE.md немесе skill мінез-құлықты шынымен өзгертті ме — соны өлшегің келсе: нақты сәтсіздіктерден алынған 20–50 тапсырмадан баста және оларды детерминистік бағала.',
        },
      },
      {
        title: '/goal: run until a condition is met',
        url: 'https://code.claude.com/docs/en/goal',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'A small fast model judges your condition after every turn — write conditions the agent can prove, such as "npm test exits 0", and always bound it with a turn limit.',
          kk: 'Әр қадамнан кейін шағын әрі жылдам модель шартыңды тексереді. Агент дәлелдей алатын шарт жаз («npm test 0 қайтарсын») және әрқашан қадам санын шектеп қой.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'security',
    title: { en: 'Security in the AI era', kk: 'ЖИ дәуіріндегі қауіпсіздік' },
    blurb: {
      en: 'Two different problems: the app you shipped has no access control, and the agent you trusted has too much power. Both have known patterns, known fixes and a standard checklist.',
      kk: 'Екі бөлек мәселе: жариялаған қолданбаңда қатынауды бақылау жоқ және сен сенген агенттің билігі тым көп. Екеуінің де белгілі үлгісі, белгілі шешімі және стандарт тексеру тізімі бар.',
    },
    items: [
      {
        title: 'The lethal trifecta for AI agents',
        url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
        by: 'Simon Willison',
        kind: 'post',
        level: 1,
        essential: true,
        why: {
          en: 'The mental model to apply before connecting anything: private data, untrusted content and a way to send data out — if all three are present, remove one.',
          kk: 'Бірдеңе қосар алдында қолданатын ой үлгісі: құпия дерек, сенімсіз мазмұн және деректі сыртқа жіберу жолы. Үшеуі де болса, біреуін алып таста.',
        },
      },
      {
        title: 'OWASP Top 10:2025 (web applications)',
        url: 'https://top10.owasp.org/2025',
        by: 'OWASP',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'The industry checklist, freshly renumbered: broken access control is still number one, and software supply chain failures entered at number three.',
          kk: 'Жаңадан нөмірленген салалық тексеру тізімі: қатынауды бақылаудың бұзылуы әлі де бірінші орында, ал бағдарламалық жабдықтау тізбегінің ақаулары үшінші орынға кірді.',
        },
      },
      {
        title: 'OWASP Top 10 for LLM Applications 2026',
        url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
        by: 'OWASP GenAI Security Project',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The LLM-specific list, released 3 Aug 2026: prompt injection is still unsolved at number one, and excessive agency climbed to number three.',
          kk: 'LLM-ге арналған тізім, 2026 жылғы 3 тамызда шыққан: prompt injection әлі шешілмей бірінші орында, ал шектен тыс өкілеттік үшінші орынға көтерілді.',
        },
      },
      {
        title: 'Claude Code security',
        url: 'https://code.claude.com/docs/en/security',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        essential: true,
        why: {
          en: 'The vendor\'s own threat model and the permission rules that back it — read it before you ever type a flag with the word dangerously in it.',
          kk: 'Өндірушінің өз қауіп моделі және соны қамтамасыз ететін рұқсат ережелері. Құрамында dangerously деген сөз бар жалауды терер алдында оқы.',
        },
      },
      {
        title: 'Claude Code sandboxing',
        url: 'https://code.claude.com/docs/en/sandboxing',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Filesystem and network isolation with /sandbox — note that native Windows is not supported, so Windows students should run it inside WSL2.',
          kk: '/sandbox арқылы файл жүйесі мен желіні оқшаулау. Есте ұста: таза Windows қолдауға кірмейді, сондықтан Windows-тағы студенттер оны WSL2 ішінде іске қоссын.',
        },
      },
      {
        title: 'MCP security notification: tool poisoning attacks',
        url: 'https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks',
        by: 'Invariant Labs',
        kind: 'post',
        level: 3,
        why: {
          en: 'The original demonstration that a tool description is untrusted input: hidden instructions inside it steer the agent without you ever seeing them.',
          kk: 'Tool сипаттамасы сенімсіз кіріс екенінің алғашқы көрсетілімі: ішіндегі жасырын нұсқаулар агентті сен байқамастан бағыттайды.',
        },
      },
      {
        title: 'GitHub MCP exploited: accessing private repositories via toxic agent flows',
        url: 'https://invariantlabs.ai/blog/mcp-github-vulnerability',
        by: 'Invariant Labs',
        kind: 'post',
        level: 3,
        why: {
          en: 'A public issue containing an instruction made an agent pull data out of private repositories — the official server behaved exactly as designed, which is the point.',
          kk: 'Ішінде нұсқауы бар ашық issue агентті жабық репозиторийлерден дерек шығаруға мәжбүрлеген. Ресми сервер дәл жобаланғандай жұмыс істеді — мәселенің мәні осында.',
        },
      },
      {
        title: 'Supabase MCP can leak your entire SQL database',
        url: 'https://generalanalysis.com/blog/supabase-mcp-blog',
        by: 'General Analysis',
        kind: 'post',
        level: 3,
        why: {
          en: 'The case that proves the rule about connecting agents to databases: read-only, project-scoped, dev project only, never a service_role key.',
          kk: 'Агентті дерекқорға қосу ережесін дәлелдейтін жағдай: тек оқуға, жоба шегінде, тек dev жобасында, ешқашан service_role кілтімен емес.',
        },
      },
      {
        title: 'Defense in depth for MCP',
        url: 'https://supabase.com/blog/defense-in-depth-mcp',
        by: 'Supabase',
        kind: 'post',
        level: 3,
        why: {
          en: 'The vendor response, and honest about it: layered mitigations reduce the risk but do not eliminate it, so keep the agent away from production.',
          kk: 'Өндірушінің жауабы, әрі адал жауап: қабатты шаралар қауіпті азайтады, бірақ жоймайды. Сондықтан агентті production-нан алыс ұста.',
        },
      },
      {
        title: 'We Have a Package for You! (package hallucination)',
        url: 'https://arxiv.org/abs/2406.10279',
        by: 'Spracklen et al. (USENIX Security 2025)',
        kind: 'paper',
        level: 3,
        why: {
          en: 'The study behind slopsquatting: 16 models invented 205,474 unique package names, and the invented names repeat, which is exactly what an attacker needs.',
          kk: 'Slopsquatting-тің артындағы зерттеу: 16 модель 205 474 бірегей пакет атауын ойлап тапқан, әрі сол атаулар қайталанады — шабуылдаушыға дәл осы керек.',
        },
      },
      {
        title: 'The Range Shrinks, the Threat Remains (2026 frontier models)',
        url: 'https://arxiv.org/abs/2605.17062',
        by: 'Aleksandr Churilov (arXiv 2605.17062)',
        kind: 'paper',
        level: 3,
        why: {
          en: 'The 2026 rerun: five frontier models still hallucinate packages 4.6 to 6.1 percent of the time, and 127 fake names were invented identically by all five.',
          kk: '2026 жылғы қайталау: бес алдыңғы қатарлы модель пакеттерді әлі де 4,6–6,1% жағдайда ойдан шығарады, ал 127 жалған атауды бесеуі де бірдей ойлап тапқан.',
        },
      },
      {
        title: 's1ngularity: the Nx supply-chain attack',
        url: 'https://www.wiz.io/blog/s1ngularity-supply-chain-attack',
        by: 'Wiz',
        kind: 'post',
        level: 2,
        why: {
          en: 'Malware that prompted every AI CLI it found with skip-permissions flags to hunt for secrets — the clearest reason not to make those flags a habit.',
          kk: 'Тапқан әр ЖИ CLI-ын skip-permissions жалауларымен іске қосып, құпияларды іздеткен зиянды бағдарлама. Ол жалауларды әдетке айналдырмаудың ең анық себебі.',
        },
      },
      {
        title: '341 malicious skills found on an agent skill marketplace',
        url: 'https://thehackernews.com/2026/02/researchers-find-341-malicious-clawhub.html',
        by: 'The Hacker News',
        kind: 'post',
        level: 2,
        why: {
          en: 'About 12 percent of audited skills were malicious — agent skills, MCP servers and rules files are the new npm, so install only what you would trust with your laptop.',
          kk: 'Тексерілген skill-дердің шамамен 12%-ы зиянды болып шыққан. Agent skill, MCP сервері және ереже файлдары — жаңа npm, сондықтан ноутбугіңді сеніп тапсыратын нәрсені ғана орнат.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'failures',
    title: { en: 'What actually went wrong', kk: 'Шын мәнінде не болды' },
    blurb: {
      en: 'A library of documented incidents, each with a root cause and a control you can apply tonight. Different vendors, one pattern: the agent has your authority and there is no undo.',
      kk: 'Құжатталған оқиғалар жинағы: әрқайсысының түпкі себебі және бүгін кешке-ақ қолдануға болатын шарасы бар. Өндірушілер әртүрлі, үлгі біреу: агентте сенің өкілеттігің бар, ал кері қайтару жоқ.',
    },
    items: [
      {
        title: 'Replit AI agent deletes a production database during a code freeze',
        url: 'https://www.theregister.com/2025/07/21/replit_saastr_vibe_coding_incident/',
        by: 'The Register',
        kind: 'post',
        level: 1,
        essential: true,
        why: {
          en: 'The canonical story, with the day-by-day timeline: the agent wiped live data, then claimed rollback was impossible when it was not — a prompt is not a permission system.',
          kk: 'Күн-күнімен жазылған негізгі оқиға: агент нақты деректі өшіріп, сосын кері қайтару мүмкін емес деп мәлімдеген — ал шын мәнінде мүмкін болған. Промпт — рұқсат жүйесі емес.',
        },
      },
      {
        title: 'Coding agent horror stories: the rm -rf incident',
        url: 'https://www.docker.com/blog/coding-agent-horror-stories-the-rm-rf-incident/',
        by: 'Docker',
        kind: 'post',
        level: 1,
        why: {
          en: 'A home directory deleted by one trailing path in one command — and the argument for running agents in a container that mounts only the project folder.',
          kk: 'Бір пәрмендегі бір ғана артық жол үй қалтасын өшірген. Әрі агентті тек жоба қалтасын қосатын контейнерде іске қосудың дәлелі.',
        },
      },
      {
        title: 'Gemini CLI deletes a user\'s files',
        url: 'https://github.com/google-gemini/gemini-cli/issues/4586',
        by: 'GitHub issue (anuraag2601)',
        kind: 'community',
        level: 2,
        why: {
          en: 'The most instructive one technically: a silent mkdir failure plus no read-after-write check meant every move overwrote the previous file — agents hallucinate state, not only facts.',
          kk: 'Техникалық жағынан ең үйретерлігі: mkdir үнсіз құлаған, жазғаннан кейін тексеру болмаған, сондықтан әр move алдыңғы файлдың үстіне жазылған. Агент тек дерекке емес, жүйе күйіне де қатысты қателеседі.',
        },
      },
      {
        title: 'Cursor YOLO mode deleted everything on the machine',
        url: 'https://forum.cursor.com/t/cursor-yolo-deleted-everything-in-my-computer/103131',
        by: 'Cursor forum',
        kind: 'community',
        level: 1,
        why: {
          en: 'Proof that denylists are not a safety boundary: agents route around blocked commands by writing a script that does the same thing — use an allowlist and a sandbox.',
          kk: 'Тыйым тізімі қауіпсіздік шекарасы емес екенінің дәлелі: агент бұғатталған пәрменді айналып өтіп, дәл сол істі істейтін скрипт жазады. Тыйым емес, рұқсат тізімі мен sandbox қолдан.',
        },
      },
      {
        title: 'Google Antigravity wipes a user\'s D: drive',
        url: 'https://www.theregister.com/2025/12/01/google_antigravity_wipes_d_drive/',
        by: 'The Register',
        kind: 'post',
        level: 1,
        why: {
          en: 'Every vendor has a no-approval mode — YOLO, Turbo, skip-permissions, auto — and the same failure shows up in all of them; this one matters for a Windows audience.',
          kk: 'Әр өндірушіде рұқсатсыз режим бар: YOLO, Turbo, skip-permissions, auto — және дәл сол сәтсіздік бәрінде қайталанады. Windows қолданатын аудиторияға бұл ерекше маңызды.',
        },
      },
      {
        title: 'Exposed Moltbook database reveals millions of API keys',
        url: 'https://www.wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys',
        by: 'Wiz (Gal Nagli)',
        kind: 'post',
        level: 2,
        why: {
          en: 'A hard-coded key in client JavaScript plus no row-level security exposed 1.5 million tokens — and it was fixed in about three hours once someone told them.',
          kk: 'Клиенттік JavaScript ішіндегі қатып жазылған кілт пен жол деңгейіндегі қорғаныстың жоқтығы 1,5 миллион токенді ашып қойған. Айтылған соң шамамен үш сағатта түзелген.',
        },
      },
      {
        title: 'Statement on CVE-2025-48757 (missing RLS in generated apps)',
        url: 'https://mattpalmer.io/posts/2025/05/statement-on-CVE-2025-48757/',
        by: 'Matt Palmer',
        kind: 'post',
        level: 2,
        why: {
          en: 'The scale number worth remembering: of 1,645 scanned apps, 170 had exploitable access-control gaps — this is the single most common vibe-coded flaw.',
          kk: 'Есте сақтарлық ауқым: сканерленген 1 645 қолданбаның 170-інде пайдалануға болатын қатынау олқылығы болған. Бұл — vibe coding-те ең жиі кездесетін ақау.',
        },
      },
      {
        title: 'Lovable-hosted app exposed 18,000 users',
        url: 'https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities/',
        by: 'The Register',
        kind: 'post',
        level: 2,
        why: {
          en: 'Sixteen flaws including inverted auth logic that blocked logged-in users and allowed anonymous ones — and the platform\'s free security scan was optional.',
          kk: 'Он алты ақау, соның ішінде аударылып кеткен auth логикасы: жүйеге кіргендерді бұғаттап, анонимдерге рұқсат берген. Платформаның тегін қауіпсіздік сканері міндетті емес болатын.',
        },
      },
      {
        title: 'An AI vibe coding horror story (patient records)',
        url: 'https://www.tobru.ch/an-ai-vibe-coding-horror-story/',
        by: 'Tobias Brunner',
        kind: 'post',
        level: 2,
        why: {
          en: 'A medical professional shipped a patient system with access control only in client JavaScript — read it before you tell yourself personal-data law does not apply to hobby apps.',
          kk: 'Дәрігер қатынауды тек клиенттік JavaScript-те тексеретін пациент жүйесін жасап шығарған. «Дербес дерек заңы әуесқой жобаға қатысы жоқ» деп ойламас бұрын оқы.',
        },
      },
      {
        title: 'Official statement from Tea (a counter-example)',
        url: 'https://simonwillison.net/2025/Jul/26/official-statement-from-tea/',
        by: 'Simon Willison',
        kind: 'post',
        level: 2,
        why: {
          en: 'The breach everyone blamed on vibe coding that was not: legacy data from before the term existed — use it to practise checking a story before you repeat it.',
          kk: 'Бәрі vibe coding-ке жапқан, бірақ оған қатысы жоқ дерек ағуы: терминнің өзі пайда болғанға дейінгі ескі жүйедегі дерек болған. Оқиғаны қайталамас бұрын тексеруді осыдан үйрен.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'orchestration',
    title: { en: 'Multi-agent, parallel and long-running work', kk: 'Көп агент, қатарлас және ұзақ жұмыс' },
    blurb: {
      en: 'The expensive end of the ladder. Read the case for it and the case against it before you spend three to ten times the tokens to get the same result.',
      kk: 'Сатының қымбат шеті. Сол нәтиже үшін үш-он есе көп токен жұмсар алдында мұның пайдасы туралы да, зияны туралы да оқы.',
    },
    items: [
      {
        title: 'Building effective agents',
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
        by: 'Anthropic Engineering (Erik Schluntz, Barry Zhang)',
        kind: 'post',
        level: 2,
        why: {
          en: 'The vocabulary everyone uses: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer — plus the advice to start with the simplest thing.',
          kk: 'Бәрі қолданатын сөздік: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Әрі бір кеңес: ең қарапайымынан баста.',
        },
      },
      {
        title: 'Don\'t Build Multi-Agents',
        url: 'https://cognition.com/blog/dont-build-multi-agents',
        by: 'Walden Yan (Cognition)',
        kind: 'post',
        level: 2,
        why: {
          en: 'The counter-position you must read before building a fleet: actions carry implicit decisions, and subagents that cannot see each other make conflicting ones.',
          kk: 'Агент флотын құрар алдында міндетті түрде оқитын қарсы пікір: әр әрекет ішінде жасырын шешім жатыр, ал бірін-бірі көрмейтін subagent-тер қайшы шешім қабылдайды.',
        },
      },
      {
        title: 'How we built our multi-agent research system',
        url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 3,
        why: {
          en: 'The evidence for the other side, with the bill attached: a large gain on a research eval, but roughly fifteen times the tokens of a single chat.',
          kk: 'Екінші жақтың дәлелі, шотымен қоса: зерттеу бағалауында үлкен өсім, бірақ жай әңгімеге қарағанда шамамен он бес есе көп токен.',
        },
      },
      {
        title: 'Building multi-agent systems: when and how to use them',
        url: 'https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them',
        by: 'Anthropic',
        kind: 'post',
        level: 2,
        why: {
          en: 'The decision rule worth memorising: decompose by context, not by job title — the agent that builds a feature should also write its tests.',
          kk: 'Жаттап алуға тұрарлық ереже: жұмысты лауазым бойынша емес, контекст бойынша бөл. Функцияны жазған агент оның тесттерін де жазуы керек.',
        },
      },
      {
        title: 'Running agents in parallel (Claude Code)',
        url: 'https://code.claude.com/docs/en/agents',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The five mechanisms in one page — subagents, agent view, agent teams, projects, dynamic workflows — with the three questions that tell you which one you need.',
          kk: 'Бес тетік бір бетте: subagent, agent view, agent teams, projects, dynamic workflows. Қасында қайсысы керегін айқындайтын үш сұрақ бар.',
        },
      },
      {
        title: 'Git worktrees for parallel sessions',
        url: 'https://code.claude.com/docs/en/worktrees',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The only safe way to let two agents write at once: a separate working directory and branch each, so neither can touch the other\'s files.',
          kk: 'Екі агентке бір мезетте жазуға рұқсат берудің жалғыз қауіпсіз жолы: әрқайсысына бөлек жұмыс қалтасы мен тармақ, сонда бірі екіншісінің файлына тие алмайды.',
        },
      },
      {
        title: 'Effective harnesses for long-running agents',
        url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents',
        by: 'Anthropic Engineering',
        kind: 'post',
        level: 3,
        why: {
          en: 'How to survive across sessions: an init script, a progress file, a feature list the agent may only mark passing after testing it as a user would.',
          kk: 'Сессиялар арасында аман қалудың жолы: init скрипті, үлгерім файлы және функциялар тізімі — агент әр функцияны нақты пайдаланушыдай сынап көргенде ғана «өтті» деп белгілей алады.',
        },
      },
      {
        title: 'Building a C compiler with a team of parallel Claudes',
        url: 'https://www.anthropic.com/engineering/building-c-compiler',
        by: 'Nicholas Carlini (Anthropic)',
        kind: 'post',
        level: 3,
        why: {
          en: 'The honest ceiling of parallelism today: around 2,000 sessions, about $20,000 and 100,000 lines of Rust — and the lesson that weak tests give you the wrong product.',
          kk: 'Бүгінгі қатарластықтың шынайы шегі: шамамен 2 000 сессия, $20 000-ға жуық және 100 000 жол Rust коды. Сабағы: әлсіз тест саған қате өнім береді.',
        },
      },
      {
        title: 'Scaling long-running autonomous coding',
        url: 'https://cursor.com/blog/scaling-agents',
        by: 'Wilson Lin (Cursor)',
        kind: 'post',
        level: 3,
        why: {
          en: 'What failed and what worked at scale: flat peer agents with locks slowed 20 agents to the throughput of 3; planners, workers and a judge worked.',
          kk: 'Үлкен ауқымда не сәтсіз, не сәтті болды: құлыппен жұмыс істейтін тең агенттер 20 агентті 3-еудің қарқынына түсірген; planner, worker және judge құрылымы жұмыс істеген.',
        },
      },
      {
        title: 'Ralph: a coding agent in a bash loop',
        url: 'https://ghuntley.com/ralph/',
        by: 'Geoffrey Huntley',
        kind: 'post',
        level: 3,
        why: {
          en: 'The simplest long-running pattern there is — one task per iteration, each in a fresh context re-reading the same files — with tests providing the backpressure.',
          kk: 'Ұзақ жұмыстың ең қарапайым үлгісі: әр итерацияда бір тапсырма, әрқайсысы таза контексте сол файлдарды қайта оқиды, ал тежеуішті тесттер береді.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'models-cost',
    title: { en: 'Models, tokens and cost', kk: 'Модельдер, токендер және шығын' },
    blurb: {
      en: 'Which model, at what effort, for how much. An agent re-sends its whole context every turn, so cost is mostly input — and a flat subscription is the predictable option for a student.',
      kk: 'Қай модель, қандай күш деңгейінде және қанша тұрады. Агент әр қадамда бүкіл контекстін қайта жібереді, сондықтан шығын негізінен кіріске кетеді. Студентке болжауға келетін нұсқа — тұрақты жазылым.',
    },
    items: [
      {
        title: 'Claude pricing',
        url: 'https://claude.com/pricing',
        by: 'Anthropic',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The page to open before you plan a budget — and the one that answers the most common beginner question: the free plan does not include Claude Code.',
          kk: 'Бюджет жоспарлар алдында ашатын бет. Әрі бастаушылардың ең жиі сұрағына жауап береді: тегін жоспарға Claude Code кірмейді.',
        },
      },
      {
        title: 'Manage costs in Claude Code',
        url: 'https://code.claude.com/docs/en/costs',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The levers in order of impact: /clear between tasks, the right model for the job, lower effort for simple work, and a CLAUDE.md under 200 lines.',
          kk: 'Әсері бойынша реттелген тетіктер: тапсырмалар арасында /clear, іске сай модель, қарапайым жұмысқа төмен effort және 200 жолдан аспайтын CLAUDE.md.',
        },
      },
      {
        title: 'Model configuration and aliases',
        url: 'https://code.claude.com/docs/en/model-config',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'What opus, sonnet, haiku, opusplan and default actually resolve to on your plan — check it the week of any talk, because these change.',
          kk: 'Сенің жоспарыңда opus, sonnet, haiku, opusplan және default нақты қайсысына сәйкес келетіні. Кез келген дәріс алдындағы аптада тексер: бұлар өзгеріп тұрады.',
        },
      },
      {
        title: 'Choosing a model',
        url: 'https://platform.claude.com/docs/en/about-claude/models/choosing-a-model',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'The routing question answered properly: an expensive model plans and synthesises, a cheaper one does the parallel legwork.',
          kk: 'Бағыттау сұрағына дұрыс жауап: қымбат модель жоспарлап, қорытады, ал арзаны қатарлас қара жұмысты істейді.',
        },
      },
      {
        title: 'Anthropic API pricing',
        url: 'https://platform.claude.com/docs/en/about-claude/pricing',
        by: 'Anthropic',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Per-token rates and the rule of thumb behind every estimate on this site — output tokens cost several times input everywhere.',
          kk: 'Токен бойынша бағалар және осы сайттағы кез келген есептің артындағы ереже: шығыс токендер бәрінде де кіріс токендерден бірнеше есе қымбат.',
        },
      },
      {
        title: 'Independent model comparison',
        url: 'https://artificialanalysis.ai/models',
        by: 'Artificial Analysis',
        kind: 'tool',
        level: 2,
        why: {
          en: 'A vendor-neutral ranking that scores by effort setting — useful because open-weight models trail the frontier by a visible but modest gap.',
          kk: 'Өндірушіден тәуелсіз, күш деңгейін ескеретін рейтинг. Пайдалы: ашық салмақты модельдер алдыңғы қатардан байқалатын, бірақ шамалы ғана артта.',
        },
      },
      {
        title: 'Ollama documentation',
        url: 'https://docs.ollama.com/faq',
        by: 'Ollama',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Local models are free, private and offline — but note the default context window is 4,096 tokens, which is far too small for agent work until you raise it.',
          kk: 'Жергілікті модельдер тегін, құпия әрі желісіз жұмыс істейді. Бірақ әдепкі контекст терезесі 4 096 токен — оны көтермейінше агенттік жұмысқа мүлде аз.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'ship',
    title: { en: 'Deploy and infrastructure', kk: 'Deploy және инфрақұрылым' },
    blurb: {
      en: 'The gap between a demo on localhost and a live link with auth and a database is where most beginners stop. Every service here has a real free tier — and a real limit worth reading first.',
      kk: 'localhost-тағы демо мен auth пен дерекқоры бар тірі сілтеменің арасы — бастаушылардың көбі тоқтайтын жер. Мұндағы әр қызметтің шын тегін деңгейі бар, әрі алдымен оқуға тұрарлық шын шегі де бар.',
    },
    items: [
      {
        title: 'Cloudflare Workers pricing and limits',
        url: 'https://developers.cloudflare.com/workers/platform/pricing/',
        by: 'Cloudflare',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The most forgiving free tier for a student project: 100,000 requests a day with no charge for bandwidth, and no card needed to start.',
          kk: 'Студент жобасына ең қолайлы тегін деңгей: күніне 100 000 сұрау, трафик тегін, әрі бастау үшін карта қажет емес.',
        },
      },
      {
        title: 'Vercel Hobby plan',
        url: 'https://vercel.com/docs/plans/hobby',
        by: 'Vercel',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Generous and easy, with one rule people miss: Hobby is non-commercial and personal use only, so anything that earns money needs a paid plan.',
          kk: 'Жомарт әрі ыңғайлы, бірақ көп адам байқамайтын бір ережесі бар: Hobby тек жеке, коммерциялық емес қолданысқа. Ақша әкелетін жобаға ақылы жоспар керек.',
        },
      },
      {
        title: 'Netlify credit-based free plan',
        url: 'https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/',
        by: 'Netlify',
        kind: 'docs',
        level: 2,
        why: {
          en: 'Read the arithmetic before you choose it: 300 credits a month is a hard limit and a production deploy costs 15, so twenty deploys exhaust the month.',
          kk: 'Таңдамас бұрын есебін оқы: айына 300 credit — қатаң шек, ал бір production deploy 15 credit тұрады, яғни жиырма deploy айлық лимитті таусады.',
        },
      },
      {
        title: 'Supabase pricing and free tier',
        url: 'https://supabase.com/pricing',
        by: 'Supabase',
        kind: 'docs',
        level: 1,
        why: {
          en: 'The default backend for vibe-coded apps: 2 projects, 500 MB of database, 50,000 monthly active users — and a pause after one week of inactivity.',
          kk: 'Vibe coding-пен жасалған қолданбалардың әдепкі backend-і: 2 жоба, 500 МБ дерекқор, айына 50 000 белсенді пайдаланушы. Бір апта белсенділік болмаса, жоба тоқтатылады.',
        },
      },
      {
        title: 'Render free tier',
        url: 'https://render.com/docs/free',
        by: 'Render',
        kind: 'docs',
        level: 1,
        why: {
          en: 'Easy to deploy but read one line carefully: the free Postgres expires 30 days after creation, which has cost more than one student their demo data.',
          kk: 'Deploy оңай, бірақ бір жолды мұқият оқы: тегін Postgres құрылғаннан кейін 30 күнде жойылады. Бұл бір емес, бірнеше студентті демо деректерінен айырған.',
        },
      },
      {
        title: 'GitHub Actions billing and free minutes',
        url: 'https://docs.github.com/en/billing/concepts/product-billing/github-actions',
        by: 'GitHub',
        kind: 'docs',
        level: 2,
        why: {
          en: 'CI is where verification becomes automatic: standard runners are free on public repos, and private repos get 2,000 minutes a month on the free plan.',
          kk: 'Тексеру автоматқа айналатын жер — CI. Ашық репозиторийлерде стандартты runner-лер тегін, ал жабық репозиторийлерге тегін жоспарда айына 2 000 минут беріледі.',
        },
      },
      {
        title: 'GitHub Student Developer Pack',
        url: 'https://education.github.com/pack',
        by: 'GitHub Education',
        kind: 'tool',
        level: 1,
        essential: true,
        why: {
          en: 'The single best free offer for a student here: Copilot Student, Codespaces at Pro level, a free domain for a year — global, and no card required.',
          kk: 'Мұндағы студентке ең тиімді тегін ұсыныс: Copilot Student, Pro деңгейіндегі Codespaces, бір жылға тегін домен. Әлем бойынша қолжетімді әрі карта қажет емес.',
        },
      },
    ],
  },

  // ---------------------------------------------------------------------------
  {
    id: 'community',
    title: { en: 'People, communities and what to do next', kk: 'Адамдар, қауымдастықтар және келесі қадам' },
    blurb: {
      en: 'Nobody learns this from documentation alone. Follow a handful of people who publish their mistakes, join one room where builders ship, and pick a next course.',
      kk: 'Мұны тек құжаттамадан оқып үйрену мүмкін емес. Қателерін ашық жазатын бірнеше адамды бақыла, құрушылар жиналатын бір қауымдастыққа кір және келесі курсты таңда.',
    },
    items: [
      {
        title: 'Vibe coding tag archive',
        url: 'https://simonwillison.net/tags/vibe-coding/',
        by: 'Simon Willison',
        kind: 'community',
        level: 1,
        why: {
          en: 'The single best-maintained feed on this topic — if you follow only one source after this masterclass, make it this one.',
          kk: 'Осы тақырып бойынша ең ұқыпты жүргізілетін лента. Курстан кейін бір ғана дереккөзді бақылайтын болсаң, осыны таңда.',
        },
      },
      {
        title: 'The 70% problem: hard truths about AI-assisted coding',
        url: 'https://addyo.substack.com/p/the-70-problem-hard-truths-about',
        by: 'Addy Osmani',
        kind: 'post',
        level: 1,
        why: {
          en: 'The essay that named the feeling: AI gets you 70 percent fast, and the last 30 percent is as hard as ever — hardest of all for non-engineers.',
          kk: 'Сол сезімге ат берген мақала: ЖИ 70%-ды жылдам бітіреді, ал қалған 30% бұрынғыдай ауыр — әсіресе инженер емес адамға.',
        },
      },
      {
        title: 'My AI adoption journey',
        url: 'https://mitchellh.com/writing/my-ai-adoption-journey',
        by: 'Mitchell Hashimoto',
        kind: 'post',
        level: 2,
        why: {
          en: 'Six concrete steps from a serious engineer, including the best single habit here: turn every agent mistake into a tool or a doc so it cannot recur.',
          kk: 'Тәжірибелі инженердің алты нақты қадамы. Ішіндегі ең пайдалы әдет: агенттің әр қатесін қайталанбайтындай етіп құралға не құжатқа айналдыр.',
        },
      },
      {
        title: 'I know when you\'re vibe coding',
        url: 'https://alexkondov.com/i-know-when-youre-vibe-coding/',
        by: 'Alex Kondov',
        kind: 'post',
        level: 2,
        why: {
          en: 'What a reviewer sees on the other side of your pull request: code that works but that nobody on the team would have written that way.',
          kk: 'Pull request-іңнің арғы жағындағы рецензент не көреді: жұмыс істейтін, бірақ командадағы ешкім олай жазбайтын код.',
        },
      },
      {
        title: 'After two years of vibecoding, I\'m back to writing by hand',
        url: 'https://atmoio.substack.com/p/after-two-years-of-vibecoding-im',
        by: 'Mo Bitar',
        kind: 'post',
        level: 2,
        why: {
          en: 'The most-discussed vibe-coding post on Hacker News: changes that look fine in isolation but do not respect the whole, and skills that quietly decayed.',
          kk: 'Hacker News-тағы ең көп талқыланған vibe coding жазбасы: бөлек қарағанда дұрыс көрінетін, бірақ тұтас жүйеге қайшы өзгерістер және байқаусыз әлсіреген дағдылар.',
        },
      },
      {
        title: 'Breaking the spell of vibe coding (dark flow)',
        url: 'https://www.fast.ai/posts/2026-01-28-dark-flow/',
        by: 'Rachel Thomas (fast.ai)',
        kind: 'post',
        level: 2,
        why: {
          en: 'The slot-machine comparison that explains the perception gap: dark flow feels productive precisely because the losses are hidden from you.',
          kk: 'Қабылдау алшақтығын түсіндіретін ұтыс автоматымен салыстыру: «қараңғы ағын» өнімді сезіледі, өйткені шығындар сенен жасырылған.',
        },
      },
      {
        title: 'Anthropic Academy',
        url: 'https://anthropic.skilljar.com/',
        by: 'Anthropic',
        kind: 'course',
        level: 1,
        why: {
          en: 'The obvious next step after this masterclass: structured courses on Claude Code and AI fluency, straight from the people who build the tool.',
          kk: 'Осы курстан кейінгі айқын келесі қадам: Claude Code және ЖИ сауаттылығы бойынша құрылымды курстар — құралды жасаған адамдардың өзінен.',
        },
      },
      {
        title: 'Claude Campus and Builder Clubs',
        url: 'https://claude.com/programs/campus',
        by: 'Anthropic',
        kind: 'community',
        level: 1,
        why: {
          en: 'Student-led workshops, hackathons and demo nights with API credits, open to students worldwide aged 18 and over — check the next application window.',
          kk: 'Студенттер жүргізетін семинарлар, хакатондар және демо кештер, API credit-терімен. 18 жастан асқан студенттерге әлем бойынша ашық — келесі өтінім кезеңін тексер.',
        },
      },
      {
        title: 'Astana Hub events',
        url: 'https://astanahub.com/en/event/',
        by: 'Astana Hub',
        kind: 'community',
        level: 1,
        why: {
          en: 'The local room: hackathons and meetups in Kazakhstan where you can show the thing you built this week to actual people.',
          kk: 'Жергілікті алаң: Қазақстандағы хакатондар мен кездесулер — осы аптада жасаған дүниеңді нақты адамдарға көрсететін орын.',
        },
      },
      {
        title: 'r/ClaudeCode',
        url: 'https://www.reddit.com/r/ClaudeCode/',
        by: 'Reddit',
        kind: 'community',
        level: 1,
        why: {
          en: 'Where real usage problems surface first — rate limits, ignored CLAUDE.md files, workflows that broke after an update.',
          kk: 'Нақты қолданыстағы мәселелер алдымен осы жерде шығады: лимиттер, ескерілмеген CLAUDE.md файлдары, жаңартудан кейін бұзылған жұмыс ағындары.',
        },
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// Curated reading paths. Internal steps point at this site's own pages.
// -----------------------------------------------------------------------------

export interface PathStep {
  label: L;
  url: string;
}

export interface ReadingPath {
  id: string;
  title: L;
  forWho: L;
  steps: PathStep[];
}

export const paths: ReadingPath[] = [
  {
    id: 'never-coded',
    title: { en: 'I have never written code', kk: 'Мен ешқашан код жазбағанмын' },
    forWho: {
      en: 'You have an idea and a laptop. Seven steps, about one week at forty minutes a day, ending with a live link you can send to someone.',
      kk: 'Сенде идея мен ноутбук бар. Жеті қадам, күніне қырық минуттан шамамен бір апта. Соңында біреуге жіберетін тірі сілтемең болады.',
    },
    steps: [
      {
        label: { en: 'Learn what vibe coding actually means', kk: 'Vibe coding шын мәнінде не екенін біл' },
        url: 'https://simonwillison.net/2025/Mar/19/vibe-coding/',
      },
      {
        label: { en: 'Read the story: the tweet that named it', kk: 'Тарихты оқы: оған ат берген твит' },
        url: '/en/learn/the-tweet/',
      },
      {
        label: { en: 'Get the vocabulary: tokens, context, agents', kk: 'Сөздікті игер: токен, контекст, агент' },
        url: '/en/learn/ai-in-plain-language/',
      },
      {
        label: { en: 'Set up your machine (lab)', kk: 'Компьютеріңді дайында (зертхана)' },
        url: '/en/labs/setup/',
      },
      {
        label: { en: 'Your first agent session (lab)', kk: 'Агентпен алғашқы сессияң (зертхана)' },
        url: '/en/labs/claude-code-first-session/',
      },
      {
        label: { en: 'Put it on the internet', kk: 'Оны интернетке шығар' },
        url: '/en/learn/deploy/',
      },
      {
        label: { en: 'Run the security checklist before you share the link', kk: 'Сілтемені бөліспес бұрын қауіпсіздік тізімінен өт' },
        url: '/en/learn/security/',
      },
    ],
  },
  {
    id: 'dev-new-to-agents',
    title: { en: 'I can code, but agents are new to me', kk: 'Код жаза аламын, бірақ агенттер маған жаңа' },
    forWho: {
      en: 'You already know git and a language. This path is about unlearning chat habits and building the verification loop that makes agents safe to trust.',
      kk: 'git-ті және бір тілді білесің. Бұл жол — чат әдеттерінен арылып, агентке сенуді қауіпсіз ететін тексеру циклін құру туралы.',
    },
    steps: [
      {
        label: { en: 'Read the best-practices page end to end', kk: 'Best practices бетін басынан аяғына дейін оқы' },
        url: 'https://code.claude.com/docs/en/best-practices',
      },
      {
        label: { en: 'Understand why context is the whole constraint', kk: 'Контекст неге басты шектеу екенін түсін' },
        url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
      },
      {
        label: { en: 'Learn the permission modes before you need them', kk: 'Рұқсат режимдерін керек болғанға дейін үйрен' },
        url: 'https://code.claude.com/docs/en/permission-modes',
      },
      {
        label: { en: 'Explore, plan, code, commit (lab)', kk: 'Зертте, жоспарла, жаз, commit жаса (зертхана)' },
        url: '/en/labs/plan-mode-build/',
      },
      {
        label: { en: 'Write your first CLAUDE.md or AGENTS.md', kk: 'Алғашқы CLAUDE.md немесе AGENTS.md файлыңды жаз' },
        url: 'https://code.claude.com/docs/en/memory',
      },
      {
        label: { en: 'Add red/green TDD to your build prompts', kk: 'Құру промпттарыңа red/green TDD қос' },
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/',
      },
      {
        label: { en: 'Work through the patterns guide, one chapter a day', kk: 'Үлгілер нұсқаулығын күніне бір тараудан оқып шық' },
        url: 'https://simonwillison.net/guides/agentic-engineering-patterns/',
      },
    ],
  },
  {
    id: 'security-deep',
    title: { en: 'I want to go deep on security', kk: 'Қауіпсіздікті терең меңгергім келеді' },
    forWho: {
      en: 'You are about to put something real on the internet, or you are the person on your team who gets asked whether it is safe. Two evenings.',
      kk: 'Интернетке нақты бірдеңе шығарғалы тұрсың немесе командаңда «бұл қауіпсіз бе?» деген сұрақ саған келеді. Екі кешке жетеді.',
    },
    steps: [
      {
        label: { en: 'Learn the lethal trifecta and apply it to your setup', kk: '«Өлімші үштікті» үйрен де, өз жүйеңе қолдан' },
        url: 'https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/',
      },
      {
        label: { en: 'Read the web application top ten', kk: 'Веб қолданбалардың үздік ондығын оқы' },
        url: 'https://top10.owasp.org/2025',
      },
      {
        label: { en: 'Read the LLM application top ten', kk: 'LLM қолданбаларының үздік ондығын оқы' },
        url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
      },
      {
        label: { en: 'See how an official MCP server became an exfiltration path', kk: 'Ресми MCP сервері дерек ағызу жолына қалай айналғанын қара' },
        url: 'https://invariantlabs.ai/blog/mcp-github-vulnerability',
      },
      {
        label: { en: 'Check what the data says about unprompted AI code', kk: 'Арнайы сұралмаған ЖИ коды туралы дерек не дейтінін тексер' },
        url: 'https://www.veracode.com/blog/2026-genai-code-security-report-ai-risk/',
      },
      {
        label: { en: 'Lock down the agent itself', kk: 'Агенттің өзін шектеп қой' },
        url: 'https://code.claude.com/docs/en/security',
      },
      {
        label: { en: 'Work the pre-ship checklist on your own project', kk: 'Жариялау алдындағы тізімді өз жобаңда орында' },
        url: '/en/learn/security/',
      },
    ],
  },
  {
    id: 'scale-up',
    title: { en: 'I want to run more than one agent', kk: 'Бірнеше агентті қатар жүргізгім келеді' },
    forWho: {
      en: 'One agent already works for you and you are wondering about five. Read the case against first, because most tasks do not need it.',
      kk: 'Бір агент саған әлдеқашан жұмыс істеп жатыр, енді бесеуін ойлап жүрсің. Алдымен қарсы дәлелді оқы: тапсырмалардың көбіне бұл қажет емес.',
    },
    steps: [
      {
        label: { en: 'Get the pattern vocabulary', kk: 'Үлгілер сөздігін игер' },
        url: 'https://www.anthropic.com/engineering/building-effective-agents',
      },
      {
        label: { en: 'Read the case against multi-agent first', kk: 'Алдымен көп агентке қарсы дәлелді оқы' },
        url: 'https://cognition.com/blog/dont-build-multi-agents',
      },
      {
        label: { en: 'Then read the case for it, with the token bill', kk: 'Содан кейін токен шотымен қоса, жақтаушы дәлелді оқы' },
        url: 'https://www.anthropic.com/engineering/multi-agent-research-system',
      },
      {
        label: { en: 'Learn the decision rule: split by context, not job title', kk: 'Шешім ережесін үйрен: лауазым емес, контекст бойынша бөл' },
        url: 'https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them',
      },
      {
        label: { en: 'Isolate parallel work with git worktrees', kk: 'Қатарлас жұмысты git worktree-мен оқшаула' },
        url: 'https://code.claude.com/docs/en/worktrees',
      },
      {
        label: { en: 'Run two agents and a reviewer (lab)', kk: 'Екі агент пен бір рецензентті іске қос (зертхана)' },
        url: '/en/labs/parallel-agents/',
      },
      {
        label: { en: 'See what happens at real scale, and what it costs', kk: 'Нақты ауқымда не болатынын және оның бағасын қара' },
        url: 'https://www.anthropic.com/engineering/building-c-compiler',
      },
    ],
  },
];
