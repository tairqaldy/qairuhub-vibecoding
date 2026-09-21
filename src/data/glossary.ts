// EN -> KK technical glossary for vibecoding.qairuhub.com
//
// This file is BOTH a reference page and the source of truth for every Kazakh
// term used elsewhere on the site. If a word appears here, the rest of the site
// must spell it the same way.
//
// Conventions come from research/kk-glossary.md (sections 2-7):
//   - keepLatin = true  -> the English word stays in Latin script inside Kazakh
//                          prose, and Kazakh endings attach with a hyphen
//                          (GitHub-qa, git-te, API-ge).
//   - keepLatin = false -> the word is written in Cyrillic (a settled Kazakh
//                          loan such as agent, token, model) or fully
//                          translated (qoldanba, tarmaq, derekqor).
//   - avoid             -> a Russian calque or dead 2004-era coinage.
// Kazakh copy on this site addresses the learner as "sen" and contains no
// Russian.

export interface Term {
  /** the English term, as the learner will meet it in tools and docs */
  en: string;
  /** the Kazakh rendering to use in running text */
  kk: string;
  /** true when the English word stays as-is in Kazakh text */
  keepLatin: boolean;
  /** an acceptable alternative rendering */
  alt?: string;
  /** a Russian calque or otherwise discouraged form */
  avoid?: string;
  /** one plain sentence a beginner understands */
  def: { en: string; kk: string };
  /** group id, see `groups` below */
  group: string;
  /** a short sentence showing correct use in Kazakh, with an English gloss */
  example?: { en: string; kk: string };
}

export interface Group {
  id: string;
  title: { en: string; kk: string };
}

/** Groups follow the course path, from first ideas to a shipped product. */
export const groups: Group[] = [
  { id: 'ai-basics', title: { en: 'AI basics', kk: 'ЖИ негіздері' } },
  { id: 'agents', title: { en: 'Agents and agentic coding', kk: 'Агенттер және агенттік кодтау' } },
  { id: 'prompting', title: { en: 'Prompting and specs', kk: 'Промпт және спецификация' } },
  { id: 'code-basics', title: { en: 'Code and the terminal', kk: 'Код және терминал' } },
  { id: 'git', title: { en: 'Git and collaboration', kk: 'Git және бірлескен жұмыс' } },
  { id: 'web', title: { en: 'Web: frontend and backend', kk: 'Веб: frontend және backend' } },
  { id: 'data', title: { en: 'Data and databases', kk: 'Деректер және дерекқор' } },
  { id: 'security', title: { en: 'Security and privacy', kk: 'Қауіпсіздік және құпиялылық' } },
  { id: 'deploy', title: { en: 'Deploy and infrastructure', kk: 'Deploy және инфрақұрылым' } },
  { id: 'product', title: { en: 'Product and startup', kk: 'Өнім және стартап' } },
  { id: 'workshop', title: { en: 'Course and workshop', kk: 'Курс және шеберлік сабағы' } },
];

/**
 * The eight writing rules this glossary is built on. Read these before adding
 * a term, and before writing any Kazakh copy for the site.
 */
export const rules: { title: { en: string; kk: string }; body: { en: string; kk: string } }[] = [
  {
    title: {
      en: 'Keep the tool word, translate the concept',
      kk: 'Құрал атауын сақта, ұғымды аудар',
    },
    body: {
      en: 'Words the learner will type or see on screen stay as they are: git, prompt, agent, API, deploy, token, repo, frontend, backend, MCP, Claude Code. Words that have already settled into Kazakh are written in Cyrillic: агент, токен, модель, сервер, код, файл, промпт, репозиторий, коммит. Everything else gets a real Kazakh word: қолданба (app), тармақ (branch), біріктіру (merge), дерекқор (database), сілтеме (link), құпиясөз (password).',
      kk: 'Үйренуші теретін немесе экраннан көретін сөздер сол күйінде қалады: git, prompt, agent, API, deploy, token, repo, frontend, backend, MCP, Claude Code. Қазақ тілінде әбден орныққан сөздер кириллицамен жазылады: агент, токен, модель, сервер, код, файл, промпт, репозиторий, коммит. Қалғанының бәріне нақты қазақ сөзі алынады: қолданба (app), тармақ (branch), біріктіру (merge), дерекқор (database), сілтеме (link), құпиясөз (password).',
    },
  },
  {
    title: {
      en: 'Latin word + hyphen + Kazakh ending',
      kk: 'Латын сөзі + дефис + қазақша жалғау',
    },
    body: {
      en: 'Attach the ending with a hyphen, never an apostrophe and never a space: GitHub-қа, git-те, Claude Code-ты, API-ге, LLM-ді, Vercel-ге. Choose the ending by how the word sounds, not how it is spelled: Claude is read [клод], so it behaves like a back-vowel word ending in a hard consonant, giving Claude-қа and Claude-та. When the reading is unclear (Gemini, production, CLI, IDE, README), drop the suffix and put a Kazakh descriptor noun after the name instead: CLI құралында, production ортасына, README файлын.',
      kk: 'Жалғау дефис арқылы жалғанады: апостроф та, бос орын да қойылмайды — GitHub-қа, git-те, Claude Code-ты, API-ге, LLM-ді, Vercel-ге. Жалғаудың түрі жазылуына емес, айтылуына қарай таңдалады: Claude [клод] деп оқылады, сондықтан жуан әрі қатаң түрі жалғанады — Claude-қа, Claude-та. Оқылуы күмәнді болса (Gemini, production, CLI, IDE, README), жалғауды мүлде қоспай, артынан қазақша анықтауыш сөз қой: CLI құралында, production ортасына, README файлын.',
    },
  },
  {
    title: {
      en: 'Cyrillic loans take endings directly',
      kk: 'Кириллицамен жазылған сөзге жалғау тікелей жалғанады',
    },
    body: {
      en: 'A word already written in Cyrillic needs no hyphen: промптты, токендер, серверге, репозиторийде, агентпен, модельдің. The hyphen belongs to Latin script and to acronyms only. Kazakh also never uses an apostrophe for this, the way Turkish does, so API-ге is right and the apostrophe form is not.',
      kk: 'Кириллицамен жазылып тұрған сөзге дефис қойылмайды: промптты, токендер, серверге, репозиторийде, агентпен, модельдің. Дефис — тек латын әрпімен жазылған сөз бен қысқарған сөзге арналған. Қазақ тілінде бұл жерде апостроф та қолданылмайды: API-ге деп жазылады.',
    },
  },
  {
    title: {
      en: 'Never suffix a command or a file name',
      kk: 'Пәрмен мен файл атауына жалғау жалғанбайды',
    },
    body: {
      en: 'A command has to be typed character for character, so it never carries a Kazakh ending. Wrap it in a descriptor noun instead: write «npm install пәрменін орында», not «npm install-ды орында»; write «CLAUDE.md файлын аш», not «CLAUDE.md-ны аш». The same holds for file names, flags and anything shown as inline code.',
      kk: 'Пәрмен әріпме-әріп теріледі, сондықтан оған қазақша жалғау жалғанбайды. Оның орнына артынан анықтауыш сөз қой: «npm install пәрменін орында» деп жаз, «npm install-ды орында» деп жазба; «CLAUDE.md файлын аш» деп жаз, «CLAUDE.md-ны аш» деп жазба. Бұл ереже файл атауына, жалаушаларға және код түрінде көрсетілген кез келген үзіндіге қатысты.',
    },
  },
  {
    title: { en: 'Address the learner as сен', kk: 'Үйренушіге «сен» деп сөйле' },
    body: {
      en: 'Learner-facing prose, tips and quiz feedback use сен: «Промптты нақтырақ жаз», «Жарайсың!». Buttons and menu items use the neutral infinitive, so the interface itself never has to choose a register: «Бастау», «Сақтау», «Кодты көшіру». Error messages use no second person at all and no exclamation mark: «Жүктеу мүмкін болмады», not «Сен жүктей алмадың». Prompts written to an AI are сен-form imperatives too, which is exactly the register the learner will be typing all day.',
      kk: 'Үйренушіге арналған мәтін, кеңес және тест жауабы «сен» түрінде жазылады: «Промптты нақтырақ жаз», «Жарайсың!». Түйме мен мәзір атаулары бейтарап тұйық етістікпен беріледі, сонда интерфейстің өзі ешқандай мәнер таңдамайды: «Бастау», «Сақтау», «Кодты көшіру». Қате хабарларында екінші жақ та, леп белгісі де болмайды: «Жүктеу мүмкін болмады» — «Сен жүктей алмадың» емес. ЖИ-ге жазылатын промпт та «сен» түріндегі бұйрық райда, өйткені үйренуші күні бойы дәл сол мәнерде жазады.',
    },
  },
  {
    title: { en: 'Numbers and dates the Kazakh way', kk: 'Сан мен күнді қазақша жаз' },
    body: {
      en: 'Dates start with the year: «2026 ж. 22 қыркүйек»; the short form is 22.09.2026. Months and weekdays are lowercase. Time is 24-hour (19:00) and a range uses an en dash with no spaces (19:00–21:00). Decimals take a comma (3,5), thousands a non-breaking space (1 500), money the same (5 000 ₸). Percent has no space, 80%, and its ending takes a hyphen, «80%-ы». A noun after a numeral stays singular: «5 сабақ», «3 коммит», never «5 сабақтар». Ordinals written in digits take a hyphen: «1-қадам», «3-модуль». A version is written «2.3 нұсқасы».',
      kk: 'Күн жылдан басталады: «2026 ж. 22 қыркүйек»; қысқа түрі — 22.09.2026. Ай мен апта күндері кіші әріппен жазылады. Уақыт 24 сағаттық (19:00), аралығы бос орынсыз сызықшамен беріледі (19:00–21:00). Ондық бөлшекте үтір (3,5), мыңдықтар ажыратылмайтын бос орынмен бөлінеді (1 500), ақша да солай (5 000 ₸). Пайыз бос орынсыз жазылады — 80%, жалғауы дефиспен — «80%-ы». Сан алдында тұрса, зат есім көпше тұлғада болмайды: «5 сабақ», «3 коммит», ешқашан «5 сабақтар» емес. Цифрмен жазылған реттік санға дефис қойылады: «1-қадам», «3-модуль». Нұсқа «2.3 нұсқасы» деп жазылады.',
    },
  },
  {
    title: {
      en: 'Drop the Russian calques',
      kk: 'Орыс тілінен көшірілген сөздерді қолданба',
    },
    body: {
      en: 'Use қолданба not қосымша, жүктеп алу not скачать ету, параметрлер not настройкалар, құпиясөз not пароль, сілтеме not ссылка, түйме not кнопка, қалта not папка, пайдаланушы not юзер, әзірлеуші not разработчик, нұсқа not версия, әдепкі not по умолчанию, дерекқор not мәліметтер базасы. Never hang Russian verb endings on an English root: instead of закоммитить, запушить, пофиксить, задеплоить write «commit жасау», «push жасау», «түзету», «deploy жасау». And never use the Russian-flavoured spellings бэкенд, фронтэнд, деплой, вайб-кодинг: backend, frontend, deploy and vibe coding stay in Latin.',
      kk: '«Қосымша» емес — қолданба, «скачать ету» емес — жүктеп алу, «настройкалар» емес — параметрлер, «пароль» емес — құпиясөз, «ссылка» емес — сілтеме, «кнопка» емес — түйме, «папка» емес — қалта, «юзер» емес — пайдаланушы, «разработчик» емес — әзірлеуші, «версия» емес — нұсқа, «мәліметтер базасы» емес — дерекқор. Ағылшын түбіріне орысша етістік жалғауын жапсырма: «закоммитить», «запушить», «пофиксить», «задеплоить» дегеннің орнына «commit жасау», «push жасау», «түзету», «deploy жасау» деп жаз. «Бэкенд», «фронтэнд», «деплой», «вайб-кодинг» деп те жазылмайды: backend, frontend, deploy, vibe coding латынша қалады.',
    },
  },
  {
    title: {
      en: 'Gloss the term once, then use the short form',
      kk: 'Терминді бір рет түсіндір, сосын қысқа түрін қолдан',
    },
    body: {
      en: 'The first time a term appears on a page, give the Kazakh rendering with the English in parentheses: «Тармақ (branch) — кодтың жеке көшірмесі…». After that use whichever form is shorter and clearer, тармақ or branch. This rule applies per page, not per site, because most people arrive straight into one lesson from search.',
      kk: 'Термин бетте бірінші рет кездескенде қазақша түрін беріп, жақша ішінде ағылшыншасын жаз: «Тармақ (branch) — кодтың жеке көшірмесі…». Одан әрі қайсысы қысқа әрі түсінікті, соны қолдана бер: «тармақ» немесе «branch». Бұл ереже әр бетке бөлек қолданылады, өйткені адам іздеуден бірден бір сабаққа түсуі мүмкін.',
    },
  },
];

export const terms: Term[] = [
  // --- ai-basics -----------------------------------------------------------
  {
    en: 'vibe coding',
    kk: 'vibe coding',
    keepLatin: true,
    avoid: 'вайб-кодинг',
    group: 'ai-basics',
    def: {
      en: 'Writing software by telling an AI in plain language what you want, then looking at what it built.',
      kk: 'Vibe coding — не керегін қарапайым тілмен айтып, кодты ЖИ-ге жаздыру, сосын шыққан нәтижені қарап шығу.',
    },
    example: {
      en: 'Build your first app with vibe coding, but read the code yourself afterwards.',
      kk: 'Бірінші қолданбаңды vibe coding-пен жаса, бірақ кодты сосын өзің оқып шық.',
    },
  },
  {
    en: 'artificial intelligence (AI)',
    kk: 'жасанды интеллект (ЖИ)',
    keepLatin: false,
    alt: 'ЖИ',
    avoid: 'ИИ',
    group: 'ai-basics',
    def: {
      en: 'Technology that lets a computer do work that used to need human thinking.',
      kk: 'Жасанды интеллект — бұрын адамның ойлауын қажет еткен жұмысты компьютерге істететін технология.',
    },
    example: {
      en: 'Working with AI is a skill every builder needs today, not a separate profession.',
      kk: 'ЖИ-мен жұмыс істеу — бүгін әр жасаушыға керек дағды, бөлек мамандық емес.',
    },
  },
  {
    en: 'large language model (LLM)',
    kk: 'үлкен тілдік модель (LLM)',
    keepLatin: false,
    alt: 'ҮТМ',
    group: 'ai-basics',
    def: {
      en: 'A program trained on huge amounts of text to predict what comes next, which is how it writes answers and code.',
      kk: 'Үлкен тілдік модель — орасан көп мәтінмен оқытылып, келесі бөлікті болжауды үйренген, содан жауап пен код жаза алатын бағдарлама.',
    },
    example: {
      en: 'Do not think of an LLM as a database: it does not look the answer up, it writes it.',
      kk: 'LLM-ді дерекқор деп ойлама: ол жауапты іздеп таппайды, жаңадан жазады.',
    },
  },
  {
    en: 'model',
    kk: 'модель',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'One trained AI program you can send a request to; each one differs in strength, speed and price.',
      kk: 'Модель — сұрауыңа жауап беретін нақты бір оқытылған ЖИ бағдарламасы; әрқайсысының күші, жылдамдығы мен бағасы әртүрлі.',
    },
    example: {
      en: 'Pick a cheap model for simple tasks and a strong one for hard ones.',
      kk: 'Қарапайым тапсырмаға арзан модельді, қиын жұмысқа күшті модельді таңда.',
    },
  },
  {
    en: 'token',
    kk: 'токен',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The smallest piece a model actually reads and writes: a word, a part of a word, or a punctuation mark.',
      kk: 'Токен — модель шын мәнінде оқитын және жазатын ең кіші бөлшек: сөз, сөздің бөлігі немесе тыныс белгісі.',
    },
    example: {
      en: 'Everything is counted in tokens: the price, the limits and the context window.',
      kk: 'Бәрі токенмен саналады: баға да, шектеу де, контекст терезесі де.',
    },
  },
  {
    en: 'tokenizer',
    kk: 'токенизатор',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The part that cuts text into tokens; every model family has its own.',
      kk: 'Токенизатор — мәтінді токендерге бөлетін бөлік; әр модель тұқымдасының өз токенизаторы бар.',
    },
  },
  {
    en: 'tokenizer tax',
    kk: 'токен салығы',
    keepLatin: false,
    alt: 'tokenizer tax',
    group: 'ai-basics',
    def: {
      en: 'The extra cost of writing in a language the tokenizer handles badly: Kazakh text needs roughly two to four times more tokens than the same meaning in English.',
      kk: 'Токен салығы — токенизатор нашар бөлетін тілде жазғаның үшін төленетін артық ақы: сол бір мағына қазақша ағылшыншадан шамамен 2–4 есе көп токен алады.',
    },
    example: {
      en: 'Write prompts and CLAUDE.md in English, keep Kazakh for what the user reads.',
      kk: 'Промпт пен CLAUDE.md файлын ағылшынша жаз, қазақшаны пайдаланушы оқитын мәтінге қалдыр.',
    },
  },
  {
    en: 'context window',
    kk: 'контекст терезесі',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Everything the model can see at once: your instructions, the conversation, the files it read and its own reply.',
      kk: 'Контекст терезесі — модельдің бір мезетте көре алатын бүкіл мәтіні: нұсқауың, әңгіме, оқыған файлдары және өз жауабы.',
    },
    example: {
      en: 'Anything outside the context window simply does not exist for the model.',
      kk: 'Контекст терезесінен тыс қалған нәрсе модель үшін мүлде жоқ.',
    },
  },
  {
    en: 'context',
    kk: 'контекст',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'All the information the model has in front of it at the moment it writes an answer.',
      kk: 'Контекст — модель жауап жазып тұрған сәтте алдында тұрған барлық ақпарат.',
    },
  },
  {
    en: 'context rot',
    kk: 'контексттің тозуы',
    keepLatin: false,
    alt: 'context rot',
    group: 'ai-basics',
    def: {
      en: 'The fact that answers get less reliable as the input grows, even on easy questions.',
      kk: 'Контексттің тозуы — кіріс мәтін ұзарған сайын жауаптың сенімсіздене беруі, тіпті оңай сұрақта да.',
    },
    example: {
      en: 'A long window does not fix context rot: start a fresh session for a new task.',
      kk: 'Терезенің үлкендігі контексттің тозуын жоймайды: жаңа тапсырмаға жаңа сеанс аш.',
    },
  },
  {
    en: 'temperature',
    kk: 'температура',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A setting for how much randomness goes into choosing the next token: low means repeatable, high means varied.',
      kk: 'Температура — келесі токенді таңдағандағы кездейсоқтық деңгейі: төмен болса — нәтиже тұрақты, жоғары болса — әртүрлі.',
    },
    example: {
      en: 'Keep it low for code, raise it for brainstorming.',
      kk: 'Кодқа температураны төмен қой, идея ойлап табуға жоғары көтер.',
    },
  },
  {
    en: 'hallucination',
    kk: 'галлюцинация',
    keepLatin: false,
    alt: 'ойдан шығарылған жауап',
    group: 'ai-basics',
    def: {
      en: 'Output that sounds right but is invented: a function that does not exist, a fake link, a wrong price.',
      kk: 'Галлюцинация — сенімді естілгенімен, ойдан шығарылған жауап: жоқ функция, жалған сілтеме, қате баға.',
    },
    example: {
      en: 'Do not trust a link the model gives you until you open it.',
      kk: 'Модель берген сілтемені ашып көрмей сенбе — галлюцинация болуы мүмкін.',
    },
  },
  {
    en: 'training',
    kk: 'оқыту',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The process of showing a model enormous amounts of text and adjusting the billions of numbers inside it.',
      kk: 'Оқыту — модельге орасан көп мәтінді көрсетіп, ішіндегі миллиардтаған санды бірте-бірте бапқа келтіру процесі.',
    },
  },
  {
    en: 'fine-tuning',
    kk: 'қосымша оқыту',
    keepLatin: false,
    alt: 'бейімдеу',
    group: 'ai-basics',
    def: {
      en: 'Training a ready model further on your own examples so it fits one narrow job.',
      kk: 'Қосымша оқыту — дайын модельді өз мысалдарыңмен әрі қарай оқытып, бір нақты іске бейімдеу.',
    },
    example: {
      en: 'To add facts use RAG, not fine-tuning.',
      kk: 'Факт қосу үшін қосымша оқытуды емес, RAG тәсілін қолдан.',
    },
  },
  {
    en: 'dataset',
    kk: 'деректер жиынтығы',
    keepLatin: false,
    alt: 'деректер жинағы',
    avoid: 'датасет',
    group: 'ai-basics',
    def: {
      en: 'A collection of examples gathered to train or to test a model.',
      kk: 'Деректер жиынтығы — модельді оқытуға немесе тексеруге жиналған мысалдар жинағы.',
    },
  },
  {
    en: 'parameters',
    kk: 'параметрлер',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The numbers inside a model that get adjusted during training; the count is how model sizes are compared.',
      kk: 'Параметрлер — оқыту кезінде бапталатын модельдің ішкі сандары; модельдің көлемі солардың санымен өлшенеді.',
    },
  },
  {
    en: 'weights',
    kk: 'салмақтар',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The trained values a model stores; everything it seems to know lives in them.',
      kk: 'Салмақтар — модель сақтайтын, оқыту нәтижесінде шыққан сандар; оның бар «білімі» соның ішінде.',
    },
  },
  {
    en: 'neural network',
    kk: 'нейрондық желі',
    keepLatin: false,
    alt: 'нейрожелі',
    avoid: 'нейросеть',
    group: 'ai-basics',
    def: {
      en: 'A structure of simple calculations stacked in layers that learns from examples instead of fixed rules.',
      kk: 'Нейрондық желі — қабат-қабат жалғанған қарапайым есептеулерден тұратын, дайын ережемен емес, мысалдармен үйренетін құрылым.',
    },
  },
  {
    en: 'machine learning',
    kk: 'машиналық оқыту',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Getting a computer to find the rule from examples instead of you writing the rule by hand.',
      kk: 'Машиналық оқыту — ережені қолмен жазбай, компьютерге мысалдардан заңдылық таптыру тәсілі.',
    },
  },
  {
    en: 'deep learning',
    kk: 'терең оқыту',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Machine learning that uses neural networks with many layers; it is what made modern AI possible.',
      kk: 'Терең оқыту — көп қабатты нейрондық желіні қолданатын машиналық оқыту түрі; қазіргі ЖИ осының арқасында шықты.',
    },
  },
  {
    en: 'embedding',
    kk: 'эмбеддинг',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Turning a piece of text into a list of numbers so that texts with similar meaning end up close together.',
      kk: 'Эмбеддинг — мәтінді сандар тізбегіне айналдыру; мағынасы ұқсас мәтіндердің сандары да бір-біріне жақын болады.',
    },
    example: {
      en: 'Embeddings let search find the meaning, not just the exact word.',
      kk: 'Эмбеддинг арқылы іздеу дәл сол сөзді емес, сол мағынаны табады.',
    },
  },
  {
    en: 'RAG (retrieval-augmented generation)',
    kk: 'RAG',
    keepLatin: true,
    group: 'ai-basics',
    def: {
      en: 'First finding the relevant passages in your own documents, then pasting them into the prompt so the model answers from them.',
      kk: 'RAG — сұраққа жауап берер алдында өз құжаттарыңнан керек үзіндіні тауып, промптқа қосу тәсілі.',
    },
    example: {
      en: 'With RAG the model answers from your documents and can point at the source.',
      kk: 'RAG тәсілімен модель сенің құжаттарыңа сүйеніп жауап береді әрі дереккөзін көрсете алады.',
    },
  },
  {
    en: 'inference',
    kk: 'инференс',
    keepLatin: false,
    alt: 'жауап шығару',
    group: 'ai-basics',
    def: {
      en: 'The moment a trained model actually answers your request; this is what you pay for.',
      kk: 'Инференс — оқытылған модельдің нақты сұрауға жауап шығарып тұрған сәті; ақы да сол үшін төленеді.',
    },
  },
  {
    en: 'reasoning model',
    kk: 'пайымдайтын модель',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A model that spends extra tokens thinking a problem through before answering: stronger, but slower and dearer.',
      kk: 'Пайымдайтын модель — жауап берер алдында есепті ойша шешіп шығатын модель: дәлірек, бірақ баяу әрі қымбат.',
    },
    example: {
      en: 'Give a tricky bug to a reasoning model and a rename to a fast one.',
      kk: 'Қиын қатені пайымдайтын модельге бер, атын өзгерту сияқты ұсақ істі жылдамына бер.',
    },
  },
  {
    en: 'extended thinking',
    kk: 'кеңейтілген ойлану режимі',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A mode that lets the model use more tokens on thinking before it writes the answer.',
      kk: 'Кеңейтілген ойлану режимі — модельге жауап жазар алдында ойлануға көбірек токен жұмсауға рұқсат беретін баптау.',
    },
  },
  {
    en: 'multimodal',
    kk: 'мультимодальды',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Able to understand more than text: images, audio or video as well.',
      kk: 'Мультимодальды — мәтінмен қатар сурет, дыбыс немесе бейнені де түсінетін деген сөз.',
    },
    example: {
      en: 'Show a multimodal model a screenshot of a design and ask for the page.',
      kk: 'Мультимодальды модельге дизайн скриншотын көрсетіп, сол бойынша бет жасауды сұра.',
    },
  },
  {
    en: 'benchmark',
    kk: 'бенчмарк',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A fixed set of tasks used to compare models with each other.',
      kk: 'Бенчмарк — модельдерді өзара салыстыруға арналған тұрақты тапсырмалар жиыны.',
    },
    example: {
      en: 'A benchmark score is a hint, not a promise about your own task.',
      kk: 'Бенчмарк ұпайы — бағдар ғана, сенің тапсырмаңа берілген уәде емес.',
    },
  },
  {
    en: 'generative AI',
    kk: 'генеративті ЖИ',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'AI that produces new text, code, images or sound instead of picking from ready answers.',
      kk: 'Генеративті ЖИ — дайын жауаптың ішінен таңдамай, жаңа мәтін, код, сурет немесе дыбыс жасап шығаратын ЖИ.',
    },
  },
  {
    en: 'open-weight model',
    kk: 'ашық салмақты модель',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A model whose weights anyone can download and run on their own machine.',
      kk: 'Ашық салмақты модель — салмақтарын кез келген адам жүктеп алып, өз машинасында іске қоса алатын модель.',
    },
  },
  {
    en: 'local LLM',
    kk: 'жергілікті LLM',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A model that runs on your own laptop with no internet: free and private, but weaker than a hosted frontier model.',
      kk: 'Жергілікті LLM — интернетсіз, өз ноутбугыңда істейтін модель: тегін әрі құпия, бірақ бұлттағы күшті модельдерден әлсіз.',
    },
    example: {
      en: 'With Ollama your prompts never leave the computer.',
      kk: 'Ollama арқылы жергілікті модельді іске қоссаң, промптарың компьютерден шықпайды.',
    },
  },
  {
    en: 'quantization',
    kk: 'квантизация',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Shrinking a model by storing its numbers with less precision, so it fits on ordinary hardware.',
      kk: 'Квантизация — модельдің сандарын дәлдігі төмен түрде сақтап, оны кішірейту; сонда ол қарапайым компьютерге сыяды.',
    },
    example: {
      en: 'A 4-bit model needs roughly 0.6-0.7 GB of memory per billion parameters.',
      kk: '4 биттік модель әр миллиард параметрге шамамен 0,6–0,7 ГБ жад сұрайды.',
    },
  },
  {
    en: 'natural language processing (NLP)',
    kk: 'табиғи тілді өңдеу',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The field that teaches computers to read and write human language.',
      kk: 'Табиғи тілді өңдеу — компьютерге адам тілін оқуды және жазуды үйрететін сала.',
    },
  },
  {
    en: 'chatbot',
    kk: 'чат-бот',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A program you talk to in question-and-answer form.',
      kk: 'Чат-бот — сұрақ-жауап түрінде сөйлесетін бағдарлама.',
    },
  },
  {
    en: 'rate limit',
    kk: 'сұрау шегі',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The maximum number of requests you may send in a given period.',
      kk: 'Сұрау шегі — белгілі бір уақыт ішінде жіберуге болатын сұраулардың ең көп саны.',
    },
  },
  // --- agents --------------------------------------------------------------
  {
    en: 'AI agent',
    kk: 'ЖИ-агент',
    keepLatin: false,
    alt: 'агент',
    avoid: 'ИИ-агент',
    group: 'agents',
    def: {
      en: 'A model running in a loop: it takes a goal, calls tools itself, looks at the result and tries again.',
      kk: 'ЖИ-агент — цикл ішінде істейтін модель: мақсатты алады, құралдарды өзі шақырады, нәтижені көреді де, қайта әрекет етеді.',
    },
    example: {
      en: 'The agent reads the file, edits it, runs the tests, sees the error and fixes it.',
      kk: 'Агент файлды оқиды, өзгертеді, тестті жүргізеді, қатені көреді де, түзетеді.',
    },
  },
  {
    en: 'agent loop',
    kk: 'агент циклі',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Look at the goal, choose an action, observe the result, repeat until it is done or it needs you.',
      kk: 'Агент циклі — мақсатты қарау, әрекет таңдау, нәтижені көру және қайталау; жұмыс біткенше немесе саған жүгінгенше жалғасады.',
    },
    example: {
      en: 'The power of the loop is feedback: the agent sees real results instead of guessing.',
      kk: 'Циклдің күші — кері байланыста: агент болжамай, нақты нәтижені көріп отырады.',
    },
  },
  {
    en: 'agentic coding',
    kk: 'агенттік кодтау',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Writing software by directing an agent instead of typing most of the code yourself.',
      kk: 'Агенттік кодтау — кодтың көбін өзің теріп жазбай, агентке тапсырып, оның жұмысын бағыттап отыру.',
    },
  },
  {
    en: 'agentic engineering',
    kk: 'агенттік инженерия',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'The professional version of vibe coding: the agent writes, but tests, review and git stay in place.',
      kk: 'Агенттік инженерия — vibe coding-тің кәсіби түрі: кодты агент жазады, бірақ тест, тексеру және git орнында қалады.',
    },
    example: {
      en: 'The step from vibe coding to agentic engineering starts with one test.',
      kk: 'Vibe coding-тен агенттік инженерияға өту бір тест жазудан басталады.',
    },
  },
  {
    en: 'tool use',
    kk: 'құрал қолдану',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Giving a model the ability to act: read a file, run a command, call an API.',
      kk: 'Құрал қолдану — модельге әрекет етуге мүмкіндік беру: файл оқу, пәрмен жүргізу, API шақыру.',
    },
    example: {
      en: 'Without tools a model can only produce text.',
      kk: 'Құралы болмаса, модель тек мәтін жаза алады.',
    },
  },
  {
    en: 'tool call',
    kk: 'құрал шақыру',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'The structured request a model makes, such as read this file, which your program then executes.',
      kk: 'Құрал шақыру — модельдің «мына файлды оқы» деген нақты сұрауы; оны сенің бағдарламаң орындап, нәтижесін қайтарады.',
    },
  },
  {
    en: 'MCP (Model Context Protocol)',
    kk: 'MCP',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'An open standard for plugging external tools and data into AI apps, so one server works in many of them.',
      kk: 'MCP — сыртқы құралдар мен деректерді ЖИ қолданбаларына қосудың ашық стандарты; бір сервер бірнеше құралда бірдей істейді.',
    },
    example: {
      en: 'MCP is USB-C for AI: one connector instead of a separate cable for every pair.',
      kk: 'MCP — ЖИ үшін USB-C іспетті: әр жұпқа бөлек сым емес, бір ортақ қосқыш.',
    },
  },
  {
    en: 'MCP server',
    kk: 'MCP сервері',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'A small program that exposes the tools and data of one system, such as GitHub, Figma or your database.',
      kk: 'MCP сервері — бір жүйенің құралдары мен деректерін ашып беретін шағын бағдарлама: GitHub, Figma немесе дерекқор.',
    },
    example: {
      en: 'Install only servers you trust: a tool description is untrusted input too.',
      kk: 'Тек сенетін көзден алынған MCP серверін орнат: құрал сипаттамасы да сенімсіз кіріс деп саналады.',
    },
  },
  {
    en: 'subagent',
    kk: 'субагент',
    keepLatin: false,
    alt: 'қосалқы агент',
    group: 'agents',
    def: {
      en: 'A helper agent the main one starts: it works in its own context window and returns a short summary.',
      kk: 'Субагент — негізгі агент шақыратын көмекші агент: өз контекст терезесінде жұмыс істеп, қысқа қорытынды қайтарады.',
    },
    example: {
      en: 'Give a long investigation to a subagent so your main window stays clean.',
      kk: 'Ұзақ іздеуді субагентке тапсыр, сонда негізгі терезең таза қалады.',
    },
  },
  {
    en: 'skill (Agent Skills)',
    kk: 'skill',
    keepLatin: true,
    alt: 'дағды',
    group: 'agents',
    def: {
      en: 'A folder that describes how to do one job properly, which the agent opens only when that job comes up.',
      kk: 'Skill — бір істі қалай дұрыс атқару керегі жазылған қалта; агент оны сол іс кезіккенде ғана ашады.',
    },
    example: {
      en: 'A skill beats stuffing everything into CLAUDE.md: it enters the context only when needed.',
      kk: 'Skill-ді қолдану бәрін CLAUDE.md файлына тығудан артық: ол контекстке керек кезде ғана кіреді.',
    },
  },
  {
    en: 'hook',
    kk: 'hook',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'Your own script that runs automatically at a fixed point in the agent run, for example a linter after every edit.',
      kk: 'Hook — агент жұмысының белгілі бір сәтінде автоматты түрде іске қосылатын сенің скриптің: мысалы, әр өзгерістен кейін линтер жүргізу.',
    },
    example: {
      en: 'A rule that must never be broken belongs in a hook, not in CLAUDE.md.',
      kk: 'Ешқашан бұзылмауға тиіс ережені CLAUDE.md файлына емес, hook-қа жаз.',
    },
  },
  {
    en: 'CLAUDE.md',
    kk: 'CLAUDE.md файлы',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'The project memory loaded at the start of every session: commands, rules and quirks the agent cannot guess.',
      kk: 'CLAUDE.md — әр сеанстың басында жүктелетін жоба жады: агент өзі болжай алмайтын пәрмендер, ережелер мен ерекшеліктер.',
    },
    example: {
      en: 'Keep it under 200 lines: every line costs context in every session.',
      kk: 'CLAUDE.md файлын 200 жолдан қысқа ұста: әр жол әр сеанста контекст жейді.',
    },
  },
  {
    en: 'AGENTS.md',
    kk: 'AGENTS.md файлы',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'The same idea as CLAUDE.md but in a shared format that many different tools read.',
      kk: 'AGENTS.md — CLAUDE.md-мен мақсаты бір, бірақ түрлі құралдар оқитын ортақ пішімдегі файл.',
    },
    example: {
      en: 'One AGENTS.md is read by Claude Code, Codex and Cursor alike.',
      kk: 'Бір AGENTS.md файлын түрлі құралдар оқиды: Claude Code, Codex, Cursor.',
    },
  },
  {
    en: 'plan mode',
    kk: 'жоспарлау режимі',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A mode where the agent reads and explores but does not touch the code, and writes out what it intends to do.',
      kk: 'Жоспарлау режимі — агент файлдарды оқиды, бірақ кодқа тимейді: алдымен не істейтінін жазып береді.',
    },
    example: {
      en: 'Review the 200-line plan, not the 2000-line diff.',
      kk: '2000 жолдық diff-ті емес, 200 жолдық жоспарды оқы.',
    },
  },
  {
    en: 'permission mode',
    kk: 'рұқсат режимі',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'The setting that decides which actions the agent may take without asking you first.',
      kk: 'Рұқсат режимі — агенттің қай әрекетті сенен сұрамай істей алатынын белгілейтін баптау.',
    },
  },
  {
    en: 'auto mode',
    kk: 'авто режим',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A mode where a separate checking model reviews the actions instead of asking you about each one.',
      kk: 'Авто режим — әр әрекетті сенен сұраудың орнына, оларды бөлек тексеруші модель қарап отыратын режим.',
    },
    example: {
      en: 'Auto mode is a seatbelt, not an isolated sandbox.',
      kk: 'Авто режим — қауіпсіздік белдігі, оқшауланған орта емес.',
    },
  },
  {
    en: 'session',
    kk: 'сеанс',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'One continuous conversation with the agent; when it ends, its context is gone.',
      kk: 'Сеанс — агентпен бір отырыста жүргізілген әңгіме; ол аяқталғанда контексті де жоғалады.',
    },
    example: {
      en: 'After two failed corrections, clear the session and write a better first prompt.',
      kk: 'Екі рет түзетуге тырысып болмаса, сеансты тазалап, бірінші промптты жақсырақ жаз.',
    },
  },
  {
    en: 'memory (agent)',
    kk: 'жад',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Notes and files the agent keeps between sessions, because the conversation itself does not survive.',
      kk: 'Жад — агент сеанстар арасында сақтап қалатын жазбалары мен файлдары, өйткені әңгіменің өзі сақталмайды.',
    },
  },
  {
    en: 'compaction',
    kk: 'қысу',
    keepLatin: false,
    alt: 'compaction',
    group: 'agents',
    def: {
      en: 'Turning a long conversation into a short summary so work can continue in a fresh window.',
      kk: 'Қысу — ұзарып кеткен әңгімені қысқа түйінге айналдырып, жұмысты таза терезеде жалғастыру.',
    },
    example: {
      en: 'For an unrelated task clearing is better than compacting, and it is free.',
      kk: 'Байланысы жоқ тапсырмаға көшсең, қысудан гөрі тазалаған жөн, оның үстіне ол тегін.',
    },
  },
  {
    en: 'context engineering',
    kk: 'контекст инженериясы',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'The craft of giving the model exactly the tokens it needs at each step, and nothing more.',
      kk: 'Контекст инженериясы — модельге әр қадамда дәл қажет мәтінді ғана беріп отыру шеберлігі.',
    },
    example: {
      en: 'Context engineering is what prompt engineering became once agents started running in loops.',
      kk: 'Контекст инженериясы — агенттер цикл ішінде істей бастағанда промпт жазу шеберлігінің жалғасы.',
    },
  },
  {
    en: 'checkpoint',
    kk: 'бақылау нүктесі',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A snapshot the tool takes before an edit, so you can step back to it.',
      kk: 'Бақылау нүктесі — құралдың өзгеріс жасар алдында файлдардың күйін сақтап қоюы; соған қайтып оралуға болады.',
    },
    example: {
      en: 'A checkpoint is local undo, git is permanent undo.',
      kk: 'Бақылау нүктесі — жергілікті қайтару, ал git — тұрақты қайтару.',
    },
  },
  {
    en: 'worktree',
    kk: 'worktree',
    keepLatin: true,
    alt: 'бөлек жұмыс қалтасы',
    group: 'agents',
    def: {
      en: 'A separate folder with its own branch that shares one repository history, so parallel sessions never collide.',
      kk: 'Worktree — бір репозиторийдің тарихын бөлісетін, бөлек қалтадағы бөлек тармақ; сондықтан қатар жүрген сеанстар бір-біріне тимейді.',
    },
    example: {
      en: 'Give parallel agents a worktree each, so they do not fight over the same file.',
      kk: 'Қатар істейтін агенттердің әрқайсысына бөлек worktree бер, сонда бір файлды таласпайды.',
    },
  },
  {
    en: 'multi-agent system',
    kk: 'көпагенттік жүйе',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Several agents splitting one task between them.',
      kk: 'Көпагенттік жүйе — бір тапсырманы өзара бөлісіп орындайтын бірнеше агент.',
    },
    example: {
      en: 'It typically costs three to ten times the tokens, so try one agent first.',
      kk: 'Ол әдетте токенді 3–10 есе көп жейді, сондықтан алдымен бір агентпен көр.',
    },
  },
  {
    en: 'orchestrator',
    kk: 'жетекші агент',
    keepLatin: false,
    alt: 'orchestrator',
    group: 'agents',
    def: {
      en: 'The agent that splits the work, hands parts to worker agents and collects the results.',
      kk: 'Жетекші агент — жұмысты бөліп, бөліктерін орындаушы агенттерге таратып, нәтижелерін жинайтын агент.',
    },
  },
  {
    en: 'evaluator agent',
    kk: 'бағалаушы агент',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'An agent whose only job is to check the finished work against the agreed criteria.',
      kk: 'Бағалаушы агент — жұмысты өзі жасамай, тек дайын нәтижені келісілген шарттарға сай ма деп тексеретін агент.',
    },
    example: {
      en: 'Separate the maker from the checker: an agent grades its own work far too generously.',
      kk: 'Жасаушы мен тексерушіні бөлек қой: агент өз жұмысын тым жомарт бағалайды.',
    },
  },
  {
    en: 'eval',
    kk: 'eval',
    keepLatin: true,
    alt: 'бағалау жиынтығы',
    group: 'agents',
    def: {
      en: 'A test suite for the agent and your own instructions: a set of real tasks you rerun after every change.',
      kk: 'Eval — агенттің өзіне және сенің нұсқауларыңа арналған тест жиынтығы: әр өзгерістен кейін қайта жүргізілетін нақты тапсырмалар.',
    },
    example: {
      en: 'The minimal version: keep 10-20 tasks that once went wrong and rerun them.',
      kk: 'Ең қарапайым түрі: бір кездері дұрыс шықпаған 10–20 тапсырманы сақтап қойып, қайта жүргізіп көру.',
    },
  },
  {
    en: 'verification loop',
    kk: 'тексеру циклі',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Anything that gives the agent a pass or fail signal it can read itself: a test, a build, a screenshot.',
      kk: 'Тексеру циклі — агенттің өзі оқи алатын «өтті» не «өтпеді» белгісін беретін кез келген нәрсе: тест, build немесе скриншот.',
    },
    example: {
      en: 'If you cannot verify it, do not ship it.',
      kk: 'Тексере алмайтын нәрсені шығарма.',
    },
  },
  {
    en: 'guardrails',
    kk: 'қорғаныс шектері',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'The limits that keep an agent from going too far: permissions, tests, folders it may not touch.',
      kk: 'Қорғаныс шектері — агентті асып кетуден сақтайтын шектеулер: рұқсаттар, тесттер, тиюге болмайтын қалталар.',
    },
  },
  {
    en: 'human in the loop',
    kk: 'адам бақылауы',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Keeping a person in the chain so that important actions are seen and approved before they happen.',
      kk: 'Адам бақылауы — маңызды әрекет орындалмай тұрып, оны адамның көріп, растап отыруы.',
    },
  },
  {
    en: 'harness',
    kk: 'harness',
    keepLatin: true,
    alt: 'агент ортасы',
    group: 'agents',
    def: {
      en: 'The scaffolding around a long-running agent: a progress file, a feature list and a fixed ritual for each session.',
      kk: 'Harness — ұзақ істейтін агентті ұстап тұратын қоршау: не істелгенін жазатын файл, мүмкіндіктер тізімі және әр сеанстың тұрақты тәртібі.',
    },
  },
  {
    en: 'agent loop script (Ralph loop)',
    kk: 'Ralph циклі',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'A simple shell loop that feeds the same prompt to the agent again and again, each time in a fresh context.',
      kk: 'Ralph циклі — бір промптты агентке қайта-қайта беретін қарапайым цикл; әр қайталауда контекст жаңадан басталады.',
    },
    example: {
      en: 'If you start a loop, always cap the number of iterations.',
      kk: 'Цикл қосар алдында қайталау санын міндетті түрде шектеп қой.',
    },
  },
  {
    en: 'slash command',
    kk: '«/» пәрмені',
    keepLatin: false,
    alt: 'slash command',
    avoid: 'слэш-команда',
    group: 'agents',
    def: {
      en: 'A ready-made action inside the agent, typed with a slash at the start.',
      kk: '«/» пәрмені — агенттің ішінде «/» таңбасынан басталатын дайын әрекет.',
    },
  },
  {
    en: 'cloud agent',
    kk: 'бұлттық агент',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'An agent running on a machine in the cloud rather than on your laptop, which you watch from a browser or phone.',
      kk: 'Бұлттық агент — сенің ноутбугыңда емес, бұлттағы машинада істейтін агент; оны браузерден немесе телефоннан бақылайсың.',
    },
  },
  {
    en: 'agent team',
    kk: 'агенттер тобы',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A lead agent and several teammates sharing one task list and messaging each other.',
      kk: 'Агенттер тобы — ортақ тапсырмалар тізімі бар, бір-біріне хабар жаза алатын жетекші агент пен оның командасы.',
    },
    example: {
      en: 'If you run a team, give every file exactly one owner.',
      kk: 'Агенттер тобын қоссаң, әр файлдың иесі біреу ғана болсын.',
    },
  },
  {
    en: 'spec-driven development',
    kk: 'спецификацияға негізделген әзірлеу',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Writing what and why first, then how, then the task list, and only then letting the agent code against those files.',
      kk: 'Спецификацияға негізделген әзірлеу — алдымен не және не үшін екенін, сосын қалай екенін, сосын тапсырмалар тізімін жазып, содан кейін ғана агентке код жаздыру.',
    },
  },
  {
    en: 'headless mode',
    kk: 'headless режимі',
    keepLatin: true,
    group: 'agents',
    def: {
      en: 'Running the agent from a single command with no interactive screen, which is what scripts and automation need.',
      kk: 'Headless режимі — агентті сұхбаттасу экранынсыз, бір пәрменмен іске қосу; скрипт пен автоматтандыруға осы керек.',
    },
  },
  {
    en: 'token budget',
    kk: 'токен бюджеті',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'How many tokens you are willing to spend on one task; set it before you start anything that runs on its own.',
      kk: 'Токен бюджеті — бір тапсырмаға жұмсауға дайын токен мөлшерің; өз бетінше жүретін жұмысты бастар алдында оны белгілеп ал.',
    },
  },
  {
    en: 'model routing',
    kk: 'модельді таңдап бағыттау',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Sending each kind of work to the model that suits it: a cheap one for simple steps, a strong one for architecture.',
      kk: 'Модельді таңдап бағыттау — әр жұмысты өзіне лайық модельге жіберу: қарапайым қадамға арзанын, құрылым ойлауға күштісін.',
    },
  },
  // --- prompting -----------------------------------------------------------
  {
    en: 'prompt',
    kk: 'промпт',
    keepLatin: false,
    alt: 'нұсқау',
    avoid: 'сыбыр сөз',
    group: 'prompting',
    def: {
      en: 'The instruction you give the model; the more precise it is, the better the result.',
      kk: 'Промпт — модельге беретін нұсқауың: ол неғұрлым нақты болса, нәтиже соғұрлым дұрыс шығады.',
    },
    example: {
      en: 'Write the prompt precisely: which file, what result, how to check it.',
      kk: 'Промптты нақты жаз: қай файл, қандай нәтиже, оны қалай тексеру керек.',
    },
  },
  {
    en: 'system prompt',
    kk: 'жүйелік промпт',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'The standing instruction that sits in front of every request and sets the agent rules and manner.',
      kk: 'Жүйелік промпт — әр сұраудың алдында тұратын тұрақты нұсқау: агенттің ережесі мен сөйлеу мәнерін белгілейді.',
    },
  },
  {
    en: 'prompt engineering',
    kk: 'промпт жазу шеберлігі',
    keepLatin: false,
    alt: 'промпт-инженерия',
    group: 'prompting',
    def: {
      en: 'Building instructions that get a correct, repeatable result out of a model.',
      kk: 'Промпт жазу шеберлігі — модельден дұрыс әрі қайталанатын нәтиже шығатындай нұсқау құрастыру.',
    },
  },
  {
    en: 'instruction',
    kk: 'нұсқау',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'One clear sentence telling the model what to do, in the imperative.',
      kk: 'Нұсқау — модельге не істеу керегін бұйрық райда айтатын бір анық сөйлем.',
    },
    example: {
      en: 'Write a test for this function. Explain why the error happened.',
      kk: 'Осы функцияға тест жаз. Қатенің себебін түсіндір.',
    },
  },
  {
    en: 'prompt template',
    kk: 'промпт үлгісі',
    keepLatin: false,
    avoid: 'шаблон',
    group: 'prompting',
    def: {
      en: 'A ready prompt with blanks you fill in and reuse again and again.',
      kk: 'Промпт үлгісі — бос орындарын толтырып, қайта-қайта қолдана беретін дайын промпт.',
    },
  },
  {
    en: 'few-shot example',
    kk: 'үлгі мысал',
    keepLatin: false,
    alt: 'few-shot',
    group: 'prompting',
    def: {
      en: 'One to three correctly done examples put inside the prompt, whose shape the model then copies.',
      kk: 'Үлгі мысал — промпттың ішіне қосылатын, дұрыс орындалған 1–3 мысал; модель солардың пішінін қайталайды.',
    },
  },
  {
    en: 'spec (SPEC.md)',
    kk: 'спецификация',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A short document saying what will be built, what is out of scope, and what counts as done.',
      kk: 'Спецификация — не жасалатынын, ауқымнан не тыс қалатынын және «дайын» дегеннің нені білдіретінін жазған қысқа құжат.',
    },
    example: {
      en: 'Once the spec is written, open a fresh session and build from it.',
      kk: 'Спецификацияны жазып алған соң, жаңа сеанс ашып, соның бойынша кодтат.',
    },
  },
  {
    en: 'PRD (product requirements document)',
    kk: 'PRD',
    keepLatin: true,
    alt: 'өнім талаптары құжаты',
    group: 'prompting',
    def: {
      en: 'A document collecting who the product is for, why it exists and what it must do.',
      kk: 'PRD — өнім кім үшін, не үшін жасалатынын және нені істеуге тиіс екенін жинақтаған құжат.',
    },
  },
  {
    en: 'plan',
    kk: 'жоспар',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'The list of steps the agent writes before it touches the code; read it before you approve it.',
      kk: 'Жоспар — агент кодқа тиер алдында жазатын қадамдар тізімі; мақұлдамай тұрып оқып шық.',
    },
    example: {
      en: 'One bad line of plan turns into a hundred bad lines of code.',
      kk: 'Жоспардағы бір қате жол кодтағы жүз қате жолға айналады.',
    },
  },
  {
    en: 'acceptance criteria',
    kk: 'қабылдау шарттары',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'The concrete, checkable points that prove a task is finished.',
      kk: 'Қабылдау шарттары — тапсырманың бітуін дәлелдейтін нақты, тексеруге келетін тармақтар.',
    },
  },
  {
    en: 'scope',
    kk: 'ауқым',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'What belongs to the task and what does not; if you leave it unsaid, the agent will add things nobody asked for.',
      kk: 'Ауқым — тапсырмаға не кіреді, не кірмейді; оны жазбасаң, агент ешкім сұрамаған нәрсені қосып жібереді.',
    },
    example: {
      en: 'Write the out-of-scope list too, not just the task.',
      kk: 'Тапсырманы ғана емес, ауқымнан тыс қалатынын да жазып қой.',
    },
  },
  {
    en: 'evidence',
    kk: 'дәлел',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Proof rather than a claim: the test output, the command and its result, a screenshot.',
      kk: 'Дәлел — «жасалды» деген сөз емес, нақты көрсетілген тест нәтижесі, пәрмен шығысы немесе скриншот.',
    },
    example: {
      en: 'Ask the agent for evidence: let it show the test output.',
      kk: 'Агенттен дәлел сұра: тесттің шығысын көрсетсін.',
    },
  },
  {
    en: 'iteration',
    kk: 'итерация',
    keepLatin: false,
    alt: 'қайталап жетілдіру',
    group: 'prompting',
    def: {
      en: 'Looking at the result, fixing the prompt and running again; not getting it right first time is normal.',
      kk: 'Итерация — нәтижені көріп, промптты түзеп, қайта жүргізу; бірінші реттен дұрыс шықпағаны қалыпты жағдай.',
    },
  },
  {
    en: 'output',
    kk: 'нәтиже',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'What the model gives back: text, code or a tool call.',
      kk: 'Нәтиже — модельдің қайтарғаны: мәтін, код немесе құрал шақыру.',
    },
  },
  // --- code-basics ---------------------------------------------------------
  {
    en: 'terminal',
    kk: 'терминал',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A text window where you type commands to the computer instead of clicking.',
      kk: 'Терминал — тінтуірмен шертпей, пәрмен теріп компьютерге тапсырма беретін мәтіндік терезе.',
    },
    example: {
      en: 'Coding agents work through the terminal, so this window matters more than it used to.',
      kk: 'Кодтайтын агенттер терминал арқылы жұмыс істейді, сондықтан бұл терезенің маңызы артты.',
    },
  },
  {
    en: 'command line',
    kk: 'пәрмен жолы',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The line in the terminal where you type and the computer waits for your command.',
      kk: 'Пәрмен жолы — терминалдағы сен теретін және компьютер пәрменді күтіп тұратын жол.',
    },
  },
  {
    en: 'command',
    kk: 'пәрмен',
    keepLatin: false,
    alt: 'команда',
    group: 'code-basics',
    def: {
      en: 'One line of text the computer runs when you press Enter.',
      kk: 'Пәрмен — Enter пернесін басқанда компьютер орындайтын бір жол мәтін.',
    },
    example: {
      en: 'Run npm install. (A command never takes a Kazakh ending.)',
      kk: 'npm install пәрменін орында. (Пәрменнің өзіне жалғау жалғанбайды.)',
    },
  },
  {
    en: 'CLI (command-line interface)',
    kk: 'CLI',
    keepLatin: true,
    group: 'code-basics',
    def: {
      en: 'A program with no window of its own, driven entirely from the terminal.',
      kk: 'CLI — өз терезесі жоқ, толығымен терминалдан басқарылатын бағдарлама.',
    },
    example: {
      en: 'Claude Code is a CLI tool: you start it from the terminal.',
      kk: 'Claude Code — CLI құралы, оны терминалдан іске қосасың.',
    },
  },
  {
    en: 'shell',
    kk: 'shell',
    keepLatin: true,
    group: 'code-basics',
    def: {
      en: 'The program that reads what you typed and runs it; bash and zsh are two of them.',
      kk: 'Shell — терілген пәрменді оқып, орындататын бағдарлама; bash пен zsh — соның түрлері.',
    },
  },
  {
    en: 'run, launch',
    kk: 'іске қосу',
    keepLatin: false,
    avoid: 'запустить ету',
    group: 'code-basics',
    def: {
      en: 'To start a program so that it begins doing its work.',
      kk: 'Іске қосу — бағдарламаны жұмысын бастайтындай етіп жүргізу.',
    },
  },
  {
    en: 'install',
    kk: 'орнату',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'To put a program or a library on your computer so it is ready to use.',
      kk: 'Орнату — бағдарламаны немесе кітапхананы компьютерге қойып, қолдануға дайындау.',
    },
  },
  {
    en: 'file',
    kk: 'файл',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A named piece of saved information: a text, a picture, a piece of code.',
      kk: 'Файл — аты бар, сақталған ақпарат бөлігі: мәтін, сурет немесе код.',
    },
  },
  {
    en: 'folder, directory',
    kk: 'қалта',
    keepLatin: false,
    alt: 'каталог',
    avoid: 'папка',
    group: 'code-basics',
    def: {
      en: 'A container that holds files and other folders.',
      kk: 'Қалта — ішіне файлдар мен басқа қалталар жиналатын орын.',
    },
  },
  {
    en: 'path',
    kk: 'файл жолы',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The exact address of a file on the computer: which folder it sits in and under what name.',
      kk: 'Файл жолы — файлдың компьютердегі дәл мекенжайы: қай қалтада, қандай атпен жатқаны.',
    },
  },
  {
    en: 'file extension',
    kk: 'кеңейтім',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The bit after the dot in a file name that says what kind of file it is.',
      kk: 'Кеңейтім — файл атындағы нүктеден кейінгі бөлік; файлдың қандай түрде екенін көрсетеді.',
    },
  },
  {
    en: 'code editor',
    kk: 'код редакторы',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A program for writing code, which colours the syntax and spots obvious mistakes.',
      kk: 'Код редакторы — код жазуға арналған бағдарлама: синтаксисті түстеп көрсетеді, айқын қателерді байқатады.',
    },
  },
  {
    en: 'IDE',
    kk: 'IDE',
    keepLatin: true,
    group: 'code-basics',
    def: {
      en: 'An editor, a terminal and a debugger gathered into one window.',
      kk: 'IDE — редактор, терминал және жөндеуші бір терезеге жиналған бағдарлама.',
    },
    example: {
      en: 'VS Code is an IDE, and coding agents run inside it as well.',
      kk: 'VS Code — IDE редакторы, кодтайтын агенттер оның ішінде де істейді.',
    },
  },
  {
    en: 'source code',
    kk: 'бастапқы код',
    keepLatin: false,
    alt: 'қайнар код',
    avoid: 'исходник',
    group: 'code-basics',
    def: {
      en: 'The human-readable text a program is actually written in.',
      kk: 'Бастапқы код — бағдарламаның адам оқи алатын, жазылып тұрған мәтіні.',
    },
  },
  {
    en: 'programming',
    kk: 'бағдарламалау',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'Describing to a computer, step by step and without ambiguity, what it should do.',
      kk: 'Бағдарламалау — компьютерге не істеу керегін қадаммен, екіұшты жерсіз түсіндіру.',
    },
  },
  {
    en: 'developer',
    kk: 'әзірлеуші',
    keepLatin: false,
    alt: 'жасаушы',
    avoid: 'разработчик',
    group: 'code-basics',
    def: {
      en: 'A person who builds software; with agents the job shifts from typing to directing and checking.',
      kk: 'Әзірлеуші — бағдарлама жасайтын адам; агенттер заманында оның жұмысы теруден гөрі бағыттауға және тексеруге ауысты.',
    },
  },
  {
    en: 'programming language',
    kk: 'бағдарламалау тілі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The language a program is written in, such as Python or JavaScript.',
      kk: 'Бағдарламалау тілі — бағдарлама жазылатын тіл, мысалы Python немесе JavaScript.',
    },
    example: {
      en: 'Write this script in Python.',
      kk: 'Бұл скриптті Python тілінде жаз.',
    },
  },
  {
    en: 'syntax',
    kk: 'синтаксис',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The writing rules of a language: where the commas, brackets and spaces go.',
      kk: 'Синтаксис — тілдің жазу ережелері: үтір, жақша, бос орын қай жерде тұратыны.',
    },
  },
  {
    en: 'syntax error',
    kk: 'синтаксис қатесі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The program will not even start because a rule of writing was broken, often one missing bracket.',
      kk: 'Синтаксис қатесі — жазу ережесі бұзылғандықтан бағдарлама іске қосылмайды; көбіне бір жақшаның жетіспеуінен болады.',
    },
  },
  {
    en: 'variable',
    kk: 'айнымалы',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A named place you put a value into and call back by that name later.',
      kk: 'Айнымалы — ішіне мән салып қоятын, кейін сол атпен шақыратын аты бар орын.',
    },
  },
  {
    en: 'constant',
    kk: 'тұрақты',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A named value that never changes while the program runs.',
      kk: 'Тұрақты — бағдарлама жүріп тұрғанда мәні өзгермейтін, аты бар шама.',
    },
  },
  {
    en: 'function',
    kk: 'функция',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A named piece of code that takes input, does one job and gives a result back.',
      kk: 'Функция — кіріс алып, бір істі атқарып, нәтиже қайтаратын, аты бар код бөлігі.',
    },
  },
  {
    en: 'class',
    kk: 'класс',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A template for making objects of the same kind.',
      kk: 'Класс — біртектес объектілер жасауға арналған үлгі.',
    },
  },
  {
    en: 'object',
    kk: 'объект',
    keepLatin: false,
    alt: 'нысан',
    group: 'code-basics',
    def: {
      en: 'One concrete thing in code, with its own data and its own actions.',
      kk: 'Объект — деректері мен әрекеттері бір жерге жиналған нақты дана.',
    },
  },
  {
    en: 'data type',
    kk: 'дерек типі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'What kind of value this is: text, number, yes or no, list.',
      kk: 'Дерек типі — мәннің қандай түрде екені: мәтін, сан, иә-жоқ мәні, тізім.',
    },
  },
  {
    en: 'string',
    kk: 'жол (string)',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A text value inside code, written between quotation marks.',
      kk: 'Жол (string) — кодтың ішіндегі мәтін мәні, тырнақшаға алынып жазылады.',
    },
  },
  {
    en: 'boolean',
    kk: 'логикалық мән',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A value that can only be true or false.',
      kk: 'Логикалық мән — тек «ақиқат» немесе «жалған» бола алатын мән.',
    },
  },
  {
    en: 'array',
    kk: 'массив',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'An ordered set of values kept under one name and reached by position.',
      kk: 'Массив — бір атпен сақталатын, реті бар мәндер жиыны; әрқайсысына орны бойынша жетесің.',
    },
  },
  {
    en: 'list',
    kk: 'тізім',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'Several values in a row that you can add to and walk through one by one.',
      kk: 'Тізім — қатар тұрған бірнеше мән; оған жаңасын қосуға және бірінен соң бірін аралап шығуға болады.',
    },
  },
  {
    en: 'loop',
    kk: 'цикл',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'Code that repeats the same action until a condition stops it.',
      kk: 'Цикл — шарт тоқтатқанша бір әрекетті қайта-қайта орындайтын код.',
    },
  },
  {
    en: 'condition',
    kk: 'шарт',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A check that decides which branch of the code runs next.',
      kk: 'Шарт — кодтың қай тармағы орындалатынын шешетін тексеру.',
    },
  },
  {
    en: 'exception',
    kk: 'ерекше жағдай',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'An unexpected situation the program reports instead of carrying on quietly.',
      kk: 'Ерекше жағдай — бағдарлама үнсіз жалғаспай, хабарлап тоқтайтын күтпеген жағдай.',
    },
  },
  {
    en: 'bug',
    kk: 'қате (bug)',
    keepLatin: false,
    alt: 'ақау',
    avoid: 'баг',
    group: 'code-basics',
    def: {
      en: 'The program runs, but does something other than what you intended.',
      kk: 'Қате (bug) — бағдарлама істеп тұр, бірақ сен ойлағаннан басқаша жұмыс істейді.',
    },
  },
  {
    en: 'debug',
    kk: 'жөндеу',
    keepLatin: false,
    alt: 'түзету',
    avoid: 'дебажить',
    group: 'code-basics',
    def: {
      en: 'Finding out why the program misbehaves and fixing the cause.',
      kk: 'Жөндеу — бағдарламаның неге дұрыс істемей тұрғанын тауып, себебін түзету.',
    },
    example: {
      en: 'Copy the whole error text and give it to the agent: that is the fastest route to a fix.',
      kk: 'Қатенің мәтінін толық көшіріп, агентке бер — түзетудің ең жылдам жолы осы.',
    },
  },
  {
    en: 'breakpoint',
    kk: 'үзу нүктесі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A marked line where the program pauses so you can look at the values.',
      kk: 'Үзу нүктесі — бағдарлама тоқтап, мәндерді қарап шығуға мүмкіндік беретін белгіленген жол.',
    },
  },
  {
    en: 'stack trace',
    kk: 'стек ізі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The list printed when an error happens, showing which function was called from where.',
      kk: 'Стек ізі — қате шыққанда басылып шығатын тізім: қай функция қайдан шақырылғанын көрсетеді.',
    },
  },
  {
    en: 'console',
    kk: 'консоль',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The place where a program prints its messages and where you can type into it.',
      kk: 'Консоль — бағдарлама хабарларын басып шығаратын және оған пәрмен теруге болатын орын.',
    },
  },
  {
    en: 'log',
    kk: 'журнал (лог)',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The timestamped messages a program writes while it runs.',
      kk: 'Журнал — бағдарлама жұмыс істеп тұрғанда жазып отыратын, уақыты көрсетілген хабарлар.',
    },
    example: {
      en: 'When something breaks in production, read the logs first.',
      kk: 'Жұмыс ортасында бірдеңе бұзылса, алдымен журналды оқы.',
    },
  },
  {
    en: 'test',
    kk: 'тест',
    keepLatin: false,
    alt: 'сынақ',
    group: 'code-basics',
    def: {
      en: 'A small program that runs your code and checks that the expected result comes out.',
      kk: 'Тест — кодыңды іске қосып, күткен нәтиже шыққанын тексеретін шағын бағдарлама.',
    },
    example: {
      en: 'For an agent a test is the signal, beyond argument, that the work is done.',
      kk: 'Агент үшін тест — жұмыстың бітуін көрсететін нақты, дауға келмейтін белгі.',
    },
  },
  {
    en: 'unit test',
    kk: 'модульдік тест',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A test that checks one small piece of code on its own.',
      kk: 'Модульдік тест — кодтың бір ғана шағын бөлігін бөлек тексеретін тест.',
    },
  },
  {
    en: 'TDD (test-driven development)',
    kk: 'TDD',
    keepLatin: true,
    alt: 'алдымен тест жазу',
    group: 'code-basics',
    def: {
      en: 'Write a failing test first, watch it fail, then write just enough code to make it pass.',
      kk: 'TDD — алдымен құлайтын тест жазу, оның құлағанын көру, сосын соны өткізуге жететін кодты жазу.',
    },
    example: {
      en: 'A test never seen failing proves nothing: it may be passing for the wrong reason.',
      kk: 'Құлағанын көрмеген тест ештеңені дәлелдемейді: ол басқа себеппен өтіп тұрған болуы мүмкін.',
    },
  },
  {
    en: 'regression test',
    kk: 'регрессиялық тест',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A test that catches the moment a new change silently breaks something that used to work.',
      kk: 'Регрессиялық тест — жаңа өзгеріс бұрын істеп тұрған нәрсені үнсіз бұзып кеткен сәтті ұстайтын тест.',
    },
  },
  {
    en: 'refactoring',
    kk: 'рефакторинг',
    keepLatin: false,
    alt: 'кодты қайта құру',
    group: 'code-basics',
    def: {
      en: 'Tidying the code without changing what the program does.',
      kk: 'Рефакторинг — бағдарламаның мінезін өзгертпей, кодтың өзін ретке келтіру.',
    },
  },
  {
    en: 'linter',
    kk: 'линтер',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A tool that checks style and suspicious places in the code without running it.',
      kk: 'Линтер — кодты іске қоспай-ақ, жазу стилі мен күмәнді жерлерін тексеретін құрал.',
    },
  },
  {
    en: 'library',
    kk: 'кітапхана',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'Ready-made code written by someone else that you use instead of writing it yourself.',
      kk: 'Кітапхана — біреу жазып қойған дайын код; оны өзің жазудың орнына қолданасың.',
    },
  },
  {
    en: 'framework',
    kk: 'фреймворк',
    keepLatin: false,
    avoid: 'фреймуорк',
    group: 'code-basics',
    def: {
      en: 'A ready structure that decides the shape of your project and leaves you to fill in the parts.',
      kk: 'Фреймворк — жобаның қаңқасын белгілеп беретін дайын құрылым; сен тек бөліктерін толтырасың.',
    },
  },
  {
    en: 'package',
    kk: 'пакет',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A library packed up so it can be installed with one command.',
      kk: 'Пакет — бір пәрменмен орнатуға болатындай оралған кітапхана.',
    },
  },
  {
    en: 'package manager',
    kk: 'пакет менеджері',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A tool that downloads the libraries your project needs, and the ones those need, at matching versions.',
      kk: 'Пакет менеджері — жобаңа керек кітапханаларды, олардың өз тәуелділіктерін де қоса, үйлесімді нұсқада жүктеп әкелетін құрал.',
    },
    example: {
      en: 'After cloning the repository, run npm install.',
      kk: 'Репозиторийді клондап алған соң, npm install пәрменін орында.',
    },
  },
  {
    en: 'dependency',
    kk: 'тәуелділік',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'Someone else code your project cannot run without.',
      kk: 'Тәуелділік — жобаң онсыз істемейтін, біреу жазған код.',
    },
  },
  {
    en: 'module',
    kk: 'модуль',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'One file or folder of code that does a clearly separate part of the job.',
      kk: 'Модуль — жұмыстың нақты бір бөлігін атқаратын код файлы немесе қалтасы.',
    },
  },
  {
    en: 'import',
    kk: 'импорттау',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'To bring code from another file or library into this one.',
      kk: 'Импорттау — басқа файлдағы немесе кітапханадағы кодты осы файлға әкелу.',
    },
  },
  {
    en: 'comment (in code)',
    kk: 'түсініктеме',
    keepLatin: false,
    avoid: 'комментарий',
    group: 'code-basics',
    def: {
      en: 'A note inside the code for people to read; the computer skips it.',
      kk: 'Түсініктеме — кодтың ішіндегі, адамға арналған жазба; компьютер оны елемей өтеді.',
    },
  },
  {
    en: 'documentation',
    kk: 'құжаттама',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The written explanation of how a tool or library is used.',
      kk: 'Құжаттама — құралды немесе кітапхананы қалай қолдану керегін жазып қойған мәтін.',
    },
  },
  {
    en: 'script',
    kk: 'скрипт',
    keepLatin: false,
    alt: 'сценарий',
    group: 'code-basics',
    def: {
      en: 'A short program that does one job from start to finish, usually run from the terminal.',
      kk: 'Скрипт — бір істі басынан аяғына дейін атқаратын, әдетте терминалдан жүргізілетін қысқа бағдарлама.',
    },
  },
  {
    en: 'compile',
    kk: 'компиляциялау',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'To turn source code into the form a machine can run.',
      kk: 'Компиляциялау — бастапқы кодты машина орындай алатын түрге айналдыру.',
    },
  },
  {
    en: 'algorithm',
    kk: 'алгоритм',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A precise sequence of steps that leads to a result.',
      kk: 'Алгоритм — нәтижеге жеткізетін нақты қадамдар тізбегі.',
    },
  },
  {
    en: 'version',
    kk: 'нұсқа',
    keepLatin: false,
    avoid: 'нобай',
    group: 'code-basics',
    def: {
      en: 'One numbered state of a program, for example 2.3.',
      kk: 'Нұсқа — бағдарламаның нөмірленген нақты күйі, мысалы 2.3 нұсқасы.',
    },
  },
  {
    en: 'release',
    kk: 'шығарылым',
    keepLatin: false,
    alt: 'релиз',
    group: 'code-basics',
    def: {
      en: 'A version handed over to users, with a note of what changed.',
      kk: 'Шығарылым — пайдаланушыларға берілген нұсқа; қасында не өзгергені жазылады.',
    },
  },
  {
    en: 'settings',
    kk: 'параметрлер',
    keepLatin: false,
    alt: 'баптаулар',
    avoid: 'настройкалар',
    group: 'code-basics',
    def: {
      en: 'The values you can change to make a program behave the way you want.',
      kk: 'Параметрлер — бағдарламаны өзіңе ыңғайлы етіп өзгертуге болатын мәндер.',
    },
  },
  {
    en: 'default',
    kk: 'әдепкі',
    keepLatin: false,
    avoid: 'по умолчанию',
    group: 'code-basics',
    def: {
      en: 'The value a program uses when you have not chosen one yourself.',
      kk: 'Әдепкі — сен өзің таңдамағанда бағдарлама қолданатын мән.',
    },
  },
  {
    en: 'keyboard shortcut',
    kk: 'пернелер тіркесімі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A combination of keys that does an action faster than the menu.',
      kk: 'Пернелер тіркесімі — мәзірден іздегеннен жылдам әрекет жасататын перне жиынтығы.',
    },
  },
  {
    en: 'clipboard',
    kk: 'аралық сақтағыш',
    keepLatin: false,
    avoid: 'буфер обмена',
    group: 'code-basics',
    def: {
      en: 'The invisible place that holds what you copied until you paste it.',
      kk: 'Аралық сақтағыш — көшірген нәрсең қойылғанша тұратын көзге көрінбейтін орын.',
    },
  },
  {
    en: 'screenshot',
    kk: 'скриншот',
    keepLatin: false,
    alt: 'экран суреті',
    group: 'code-basics',
    def: {
      en: 'A picture of what is on your screen, useful as evidence for an agent.',
      kk: 'Скриншот — экрандағы көріністің суреті; агентке дәлел ретінде беруге ыңғайлы.',
    },
  },
  {
    en: 'performance',
    kk: 'өнімділік',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'How fast a program works and how much memory it eats.',
      kk: 'Өнімділік — бағдарламаның қаншалықты жылдам істейтіні және қанша жад жейтіні.',
    },
  },
  // --- git -----------------------------------------------------------------
  {
    en: 'git',
    kk: 'git',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'A system that records snapshots of your project so you can see what changed and go back to any earlier state.',
      kk: 'Git — жобаңның әр күйін сақтап отыратын жүйе: не өзгергенін көресің, кез келген бұрынғы күйге қайта аласың.',
    },
    example: {
      en: 'Think of git as save points in a game: before the boss fight you save.',
      kk: 'git-ті ойындағы сақтау нүктесі деп ойла: қиын жерге кірер алдында сақтап аласың.',
    },
  },
  {
    en: 'version control',
    kk: 'нұсқаларды басқару',
    keepLatin: false,
    avoid: 'контроль версий',
    group: 'git',
    def: {
      en: 'Keeping the whole history of a project so nothing is ever lost for good.',
      kk: 'Нұсқаларды басқару — жобаның бүкіл тарихын сақтау, сонда ештеңе біржола жоғалмайды.',
    },
  },
  {
    en: 'repository, repo',
    kk: 'репозиторий',
    keepLatin: false,
    alt: 'код қоймасы',
    group: 'git',
    def: {
      en: 'The project folder together with its entire git history.',
      kk: 'Репозиторий — жобаның қалтасы мен оның бүкіл git тарихы бірге.',
    },
    example: {
      en: 'Your repositories on GitHub are the portfolio people actually look at.',
      kk: 'GitHub-тағы репозиторийлерің — адамдар шынымен қарайтын портфолио.',
    },
  },
  {
    en: 'clone',
    kk: 'клондау',
    keepLatin: false,
    alt: 'көшірмесін алу',
    group: 'git',
    def: {
      en: 'To copy a repository, with its history, onto your own computer.',
      kk: 'Клондау — репозиторийді тарихымен қоса өз компьютеріңе көшіріп алу.',
    },
  },
  {
    en: 'commit',
    kk: 'commit',
    keepLatin: true,
    alt: 'коммит',
    avoid: 'закоммитить',
    group: 'git',
    def: {
      en: 'One saved snapshot in git: the exact state of the files plus a short message saying what changed.',
      kk: 'Commit — git-те сақталған бір күй: файлдардың дәл сол сәттегі түрі және не өзгергенін түсіндіретін қысқа хабар.',
    },
    example: {
      en: 'Commit before every big request, so you can always roll back.',
      kk: 'Әр үлкен сұрауды бермей тұрып commit жаса, сонда әрқашан кері қайта аласың.',
    },
  },
  {
    en: 'commit message',
    kk: 'commit хабары',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'The one line explaining why this change was made, written for whoever reads it in six months.',
      kk: 'Commit хабары — өзгерістің неге жасалғанын түсіндіретін бір жол; оны жарты жылдан кейін оқитын адам үшін жазасың.',
    },
  },
  {
    en: 'branch',
    kk: 'тармақ (branch)',
    keepLatin: false,
    alt: 'бұтақ',
    avoid: 'ветка',
    group: 'git',
    def: {
      en: 'A parallel line of work inside one repository, so you can try an idea without touching the stable code.',
      kk: 'Тармақ — бір репозиторийдің ішіндегі параллель жұмыс жолы: тұрақты кодқа тимей, идеяңды сынап көресің.',
    },
    example: {
      en: 'Open a new branch and the main code stays intact.',
      kk: 'Жаңа тармақ ашып ал, сонда негізгі код бүлінбейді.',
    },
  },
  {
    en: 'main branch',
    kk: 'негізгі тармақ',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'The branch holding the version considered stable, usually called main.',
      kk: 'Негізгі тармақ — тұрақты деп саналатын нұсқа тұратын тармақ, әдетте main деп аталады.',
    },
  },
  {
    en: 'merge',
    kk: 'біріктіру (merge)',
    keepLatin: false,
    avoid: 'слияние',
    group: 'git',
    def: {
      en: 'Bringing the work of one branch back into another.',
      kk: 'Біріктіру — бір тармақтағы жұмысты екінші тармаққа қайта қосу.',
    },
  },
  {
    en: 'merge conflict',
    kk: 'біріктіру қайшылығы',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'Two branches changed the same line differently, so git asks you which version to keep.',
      kk: 'Біріктіру қайшылығы — екі тармақта бір жол екі түрлі өзгергенде git қайсысын қалдыруды сенен сұрайды.',
    },
  },
  {
    en: 'pull request (PR)',
    kk: 'pull request (PR)',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'A proposal to merge one branch into another: it shows exactly which lines changed and lets people comment.',
      kk: 'Pull request — бір тармақты екіншісіне біріктіруге берілетін ұсыныс: қай жол өзгергені көрініп тұрады, пікір жазуға болады.',
    },
    example: {
      en: 'Never open a pull request with code you have not read yourself.',
      kk: 'Өзің оқып шықпаған кодқа PR ашпа.',
    },
  },
  {
    en: 'push',
    kk: 'push',
    keepLatin: true,
    avoid: 'запушить',
    group: 'git',
    def: {
      en: 'Sending your local commits up to the repository on the server.',
      kk: 'Push — жергілікті commit-теріңді серверде тұрған репозиторийге жіберу.',
    },
    example: {
      en: 'After saving the changes, commit and push to GitHub.',
      kk: 'Өзгерістерді сақтаған соң commit жасап, GitHub-қа push жаса.',
    },
  },
  {
    en: 'pull',
    kk: 'pull',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'Bringing other people commits from the server down into your copy.',
      kk: 'Pull — серверден басқалардың commit-терін өз көшірмеңе түсіріп алу.',
    },
  },
  {
    en: 'fetch',
    kk: 'fetch',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'Downloading the news from the server without changing your own files yet.',
      kk: 'Fetch — серверден жаңалықты жүктеп алу, бірақ өз файлдарыңды әзірге өзгертпеу.',
    },
  },
  {
    en: 'fork',
    kk: 'fork',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'Your own copy of someone else repository, which you may change freely.',
      kk: 'Fork — біреудің репозиторийінің өзіңе тиесілі көшірмесі; оны еркін өзгерте аласың.',
    },
  },
  {
    en: 'diff',
    kk: 'diff (айырма)',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'The difference between two states: which lines were added and which removed.',
      kk: 'Diff — екі күйдің арасындағы айырма: қай жол қосылды, қай жол өшірілді.',
    },
  },
  {
    en: 'history',
    kk: 'тарих',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'The chain of all commits: who changed what, when and why.',
      kk: 'Тарих — бүкіл commit-тердің тізбегі: кім, қашан, нені, не үшін өзгертті.',
    },
  },
  {
    en: 'revert',
    kk: 'қайтару',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'Undoing one earlier change without erasing the history around it.',
      kk: 'Қайтару — бұрынғы бір өзгерісті болдырмау, бірақ айналасындағы тарихты өшірмеу.',
    },
  },
  {
    en: 'stash',
    kk: 'stash',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'Putting unfinished changes aside for a moment so you can work on something else.',
      kk: 'Stash — аяқталмаған өзгерістерді сәтке ысырып қойып, басқа іске көшу.',
    },
  },
  {
    en: 'tag',
    kk: 'тег',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'A name pinned to one commit, usually to mark a released version.',
      kk: 'Тег — бір commit-ке бекітілген атау; әдетте шығарылған нұсқаны белгілеу үшін қойылады.',
    },
  },
  {
    en: 'remote',
    kk: 'қашықтағы репозиторий (remote)',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'The copy of the repository living on a server, which everyone syncs with.',
      kk: 'Қашықтағы репозиторий — серверде тұратын, бәрі өзара үйлестіретін көшірме.',
    },
  },
  {
    en: '.gitignore',
    kk: '.gitignore файлы',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'The list telling git which files must never be saved into the history.',
      kk: '.gitignore — git-ке қай файлдарды тарихқа сақтамау керегін айтатын тізім.',
    },
    example: {
      en: 'Do not forget to put the .env file in .gitignore.',
      kk: '.env файлын .gitignore тізіміне қосуды ұмытпа.',
    },
  },
  {
    en: 'README',
    kk: 'README файлы',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'The first page of a repository: what this is, how to run it, how to help.',
      kk: 'README — репозиторийдің бірінші беті: бұл не, қалай іске қосылады, қалай көмектесуге болады.',
    },
  },
  {
    en: 'GitHub',
    kk: 'GitHub',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'A platform that stores repositories on the internet and makes working together possible.',
      kk: 'GitHub — репозиторийлерді интернетте сақтайтын және бірге жұмыс істеуге мүмкіндік беретін платформа.',
    },
    example: {
      en: 'You can show a friend your repository on GitHub with one link.',
      kk: 'GitHub-тағы репозиторийіңді досыңа бір сілтемемен көрсете аласың.',
    },
  },
  {
    en: 'issue',
    kk: 'issue (мәселе)',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'A written-down task or bug in a repository, which anyone can discuss.',
      kk: 'Issue — репозиторийде жазылып қойған тапсырма немесе қате; оны кез келген адам талқылай алады.',
    },
  },
  {
    en: 'open source',
    kk: 'ашық бастапқы код',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'Code anyone may read, use and improve, within the terms of its licence.',
      kk: 'Ашық бастапқы код — лицензия шеңберінде кез келген адам оқи, қолдана және жақсарта алатын код.',
    },
  },
  {
    en: 'licence',
    kk: 'лицензия',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'The file saying what others are allowed to do with your code.',
      kk: 'Лицензия — кодыңмен басқалардың не істеуге құқылы екенін айтатын файл.',
    },
  },
  {
    en: 'code review',
    kk: 'кодты тексеру (code review)',
    keepLatin: false,
    alt: 'код шолуы',
    group: 'git',
    def: {
      en: 'Someone reading the written code and saying what is wrong with it before it is merged.',
      kk: 'Кодты тексеру — жазылған кодты біріктірер алдында біреудің оқып шығып, кемшілігін айтуы.',
    },
    example: {
      en: 'Review in a fresh session: a fresh context is not attached to code it just wrote.',
      kk: 'Кодты тексеруге жаңа сеанс аш: жаңа контекст өзі жаңа жазған кодқа бауыр басып қалмайды.',
    },
  },
  {
    en: 'contributor',
    kk: 'үлес қосушы',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'Anyone whose work has gone into a project, whether code, docs or translation.',
      kk: 'Үлес қосушы — жобаға еңбегі сіңген кез келген адам: код, құжаттама немесе аударма арқылы.',
    },
  },
  {
    en: 'collaboration',
    kk: 'бірлесіп жұмыс істеу',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'Several people building one project without stepping on each other work.',
      kk: 'Бірлесіп жұмыс істеу — бірнеше адамның бір жобаны бір-бірінің жұмысын бұзбай жасауы.',
    },
  },
  // --- web -----------------------------------------------------------------
  {
    en: 'frontend',
    kk: 'frontend',
    keepLatin: true,
    alt: 'клиенттік бөлік',
    avoid: 'фронтенд',
    group: 'web',
    def: {
      en: 'The part of an app that runs on the user device and that they see and touch: pages, buttons, forms.',
      kk: 'Frontend — қолданбаның пайдаланушы құрылғысында істейтін, көзге көрінетін бөлігі: беттер, түймелер, формалар.',
    },
    example: {
      en: 'Never put a secret key in the frontend: anyone can read it from the browser.',
      kk: 'Frontend-ке ешқашан құпия кілт жазба: оны кез келген адам браузерден оқи алады.',
    },
  },
  {
    en: 'backend',
    kk: 'backend',
    keepLatin: true,
    alt: 'серверлік бөлік',
    avoid: 'бэкенд',
    group: 'web',
    def: {
      en: 'The code running on a server out of sight: it checks who you are, applies the rules and talks to the database.',
      kk: 'Backend — серверде, көз көрмейтін жерде істейтін код: кім екеніңді тексереді, ережелерді қолданады, дерекқормен сөйлеседі.',
    },
    example: {
      en: 'Frontend is the dining room, backend is the kitchen.',
      kk: 'Frontend — мейрамхананың залы, backend — ас үйі.',
    },
  },
  {
    en: 'full-stack',
    kk: 'full-stack',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'Working on both sides at once, the visible part and the server part.',
      kk: 'Full-stack — екі жақты қатар жасау: көзге көрінетін бөлікті де, сервердегі бөлікті де.',
    },
  },
  {
    en: 'website',
    kk: 'сайт',
    keepLatin: false,
    alt: 'веб-сайт',
    avoid: 'веб-торап',
    group: 'web',
    def: {
      en: 'A set of pages that live at one address on the internet.',
      kk: 'Сайт — интернетте бір мекенжайда тұратын беттер жиыны.',
    },
  },
  {
    en: 'web page',
    kk: 'веб-бет',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'One page of a site, which the browser loads and shows.',
      kk: 'Веб-бет — сайттың бір беті; браузер оны жүктеп, экранға шығарады.',
    },
  },
  {
    en: 'landing page',
    kk: 'лендинг',
    keepLatin: false,
    alt: 'кіріс беті',
    group: 'web',
    def: {
      en: 'A single page built to explain one thing and get one action out of the visitor.',
      kk: 'Лендинг — бір нәрсені түсіндіріп, келушіден бір әрекет күтуге арналған жалғыз бет.',
    },
  },
  {
    en: 'browser',
    kk: 'браузер',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'The program that opens web pages and runs their code.',
      kk: 'Браузер — веб-беттерді ашатын және олардың кодын орындайтын бағдарлама.',
    },
  },
  {
    en: 'link',
    kk: 'сілтеме',
    keepLatin: false,
    avoid: 'ссылка',
    group: 'web',
    def: {
      en: 'A piece of text or an image that takes you to another page when clicked.',
      kk: 'Сілтеме — басқанда басқа бетке апаратын мәтін немесе сурет.',
    },
  },
  {
    en: 'URL',
    kk: 'URL',
    keepLatin: true,
    alt: 'URL мекенжайы',
    avoid: 'адрес',
    group: 'web',
    def: {
      en: 'The full address of a page on the internet, the thing you copy from the address bar.',
      kk: 'URL — беттің интернеттегі толық мекенжайы; мекенжай жолағынан көшіріп аласың.',
    },
    example: {
      en: 'After publishing the site, send the URL to a friend.',
      kk: 'Сайтты жариялағаннан кейін URL мекенжайын досыңа жібер.',
    },
  },
  {
    en: 'domain',
    kk: 'домен',
    keepLatin: false,
    avoid: 'егелік',
    group: 'web',
    def: {
      en: 'The readable name of a site, such as qairuhub.com, which you rent by the year.',
      kk: 'Домен — сайттың оқуға жеңіл атауы, мысалы qairuhub.com; оны жылдап жалға аласың.',
    },
  },
  {
    en: 'server',
    kk: 'сервер',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'A computer that runs all the time and answers requests from other computers.',
      kk: 'Сервер — үнемі қосулы тұратын және басқа компьютерлердің сұрауына жауап беретін компьютер.',
    },
  },
  {
    en: 'client',
    kk: 'клиент',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'The side that sends the request: your browser, your phone, your program.',
      kk: 'Клиент — сұрау жіберетін жақ: браузерің, телефоның немесе бағдарламаң.',
    },
  },
  {
    en: 'request',
    kk: 'сұрау',
    keepLatin: false,
    alt: 'сұраным',
    avoid: 'запрос',
    group: 'web',
    def: {
      en: 'The message a client sends to a server asking it to do something or hand something over.',
      kk: 'Сұрау — клиенттің серверге жіберетін хабары: бірдеңе істеуін немесе беруін өтінеді.',
    },
  },
  {
    en: 'response',
    kk: 'жауап',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'What the server sends back, together with a status code saying how it went.',
      kk: 'Жауап — сервердің қайтарғаны; қасында қалай өткенін білдіретін күй коды болады.',
    },
  },
  {
    en: 'headers',
    kk: 'тақырыптамалар',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'The extra lines travelling with a request or a response: who is asking, in what format, with what key.',
      kk: 'Тақырыптамалар — сұрау мен жауаптың қасында жүретін қосымша жолдар: кім сұрап тұр, қандай пішімде, қандай кілтпен.',
    },
  },
  {
    en: 'HTTP / HTTPS',
    kk: 'HTTP / HTTPS',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The rules browsers and servers use to talk; the S means the conversation is encrypted.',
      kk: 'HTTP — браузер мен сервердің сөйлесу ережесі; HTTPS дегендегі S сөйлесудің шифрланғанын білдіреді.',
    },
  },
  {
    en: 'API',
    kk: 'API',
    keepLatin: true,
    alt: 'API интерфейсі',
    group: 'web',
    def: {
      en: 'An agreed way for one program to ask another to do something and get structured data back.',
      kk: 'API — бір бағдарламаның екіншісінен бірдеңе сұрайтын келісілген тәсілі: сұрау жібересің, құрылымды жауап аласың.',
    },
    example: {
      en: 'When you send a request to an API, your API key shows who you are.',
      kk: 'API-ге сұрау жібергенде API кілтің кім екеніңді көрсетеді.',
    },
  },
  {
    en: 'endpoint',
    kk: 'endpoint',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'One specific address inside an API that does one specific thing.',
      kk: 'Endpoint — API ішіндегі бір нақты әрекетке жауап беретін нақты мекенжай.',
    },
  },
  {
    en: 'JSON',
    kk: 'JSON',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'A simple text format programs use to send structured data to each other.',
      kk: 'JSON — бағдарламалар бір-біріне құрылымды дерек жіберетін қарапайым мәтін пішімі.',
    },
    example: {
      en: 'The API answers in JSON, so any language can read it.',
      kk: 'API JSON пішімінде жауап береді, сондықтан оны кез келген тіл оқи алады.',
    },
  },
  {
    en: 'HTML',
    kk: 'HTML',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The language that describes the structure of a page: what is a heading, what is a list, what is a button.',
      kk: 'HTML — беттің құрылымын сипаттайтын тіл: қайсысы тақырып, қайсысы тізім, қайсысы түйме.',
    },
  },
  {
    en: 'CSS',
    kk: 'CSS',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The language that sets how a page looks: colours, sizes, spacing, layout.',
      kk: 'CSS — беттің сыртқы түрін белгілейтін тіл: түс, өлшем, аралық, орналасу.',
    },
  },
  {
    en: 'JavaScript',
    kk: 'JavaScript',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The programming language that runs in the browser and makes a page react to you.',
      kk: 'JavaScript — браузерде істейтін, бетті сенің әрекетіңе жауап беретіндей ететін бағдарламалау тілі.',
    },
  },
  {
    en: 'element',
    kk: 'элемент',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'One building block of a page: a heading, a paragraph, an image, a button.',
      kk: 'Элемент — беттің бір құрылыс бөлшегі: тақырып, абзац, сурет, түйме.',
    },
  },
  {
    en: 'attribute',
    kk: 'атрибут',
    keepLatin: false,
    alt: 'төлсипат',
    group: 'web',
    def: {
      en: 'An extra property written on an element, such as where a link points.',
      kk: 'Атрибут — элементке жазылатын қосымша қасиет, мысалы сілтеменің қайда апаратыны.',
    },
  },
  {
    en: 'component',
    kk: 'компонент',
    keepLatin: false,
    alt: 'құрамдас',
    group: 'web',
    def: {
      en: 'A piece of interface you build once and reuse in many places.',
      kk: 'Компонент — бір рет жасап, көп жерде қайта қолданатын интерфейс бөлігі.',
    },
  },
  {
    en: 'button',
    kk: 'түйме',
    keepLatin: false,
    alt: 'батырма',
    avoid: 'кнопка',
    group: 'web',
    def: {
      en: 'The element a person presses to make something happen.',
      kk: 'Түйме — адам бірдеңе болу үшін басатын элемент.',
    },
  },
  {
    en: 'form',
    kk: 'форма',
    keepLatin: false,
    alt: 'пішін',
    group: 'web',
    def: {
      en: 'The set of fields a person fills in and sends to the server.',
      kk: 'Форма — адам толтырып, серверге жіберетін өрістер жиыны.',
    },
  },
  {
    en: 'field',
    kk: 'өріс',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'One place in a form where a person types or picks a value.',
      kk: 'Өріс — формадағы адам мән теретін немесе таңдайтын бір орын.',
    },
  },
  {
    en: 'layout',
    kk: 'макет',
    keepLatin: false,
    alt: 'орналасу',
    group: 'web',
    def: {
      en: 'How the blocks of a page are arranged on the screen.',
      kk: 'Макет — беттің блоктары экранда қалай орналасқаны.',
    },
  },
  {
    en: 'responsive design',
    kk: 'адаптивті дизайн',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'Building a page so it looks right on a phone and on a laptop alike.',
      kk: 'Адаптивті дизайн — бетті телефонда да, ноутбукта да дұрыс көрінетіндей жасау.',
    },
    example: {
      en: 'Check it on a phone first: most of your visitors arrive from one.',
      kk: 'Алдымен телефоннан тексер: келушілердің көбі телефонмен кіреді.',
    },
  },
  {
    en: 'dark mode',
    kk: 'қараңғы режим',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'A dark colour scheme for the interface, easier on the eyes at night.',
      kk: 'Қараңғы режим — интерфейстің қою түсті нұсқасы; түнде көзге жеңіл тиеді.',
    },
  },
  {
    en: 'animation',
    kk: 'анимация',
    keepLatin: false,
    avoid: 'қимылдану',
    group: 'web',
    def: {
      en: 'Movement in the interface that explains what just changed.',
      kk: 'Анимация — интерфейстегі қозғалыс; не өзгергенін көзге көрсетіп түсіндіреді.',
    },
  },
  {
    en: 'design',
    kk: 'дизайн',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'Deciding how a product looks and how it feels to use.',
      kk: 'Дизайн — өнімнің қалай көрінетінін және қолданғанда қалай сезілетінін шешу.',
    },
  },
  {
    en: 'user interface (UI)',
    kk: 'пайдаланушы интерфейсі (UI)',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'Everything a person sees and touches: screens, buttons, texts, icons.',
      kk: 'Пайдаланушы интерфейсі — адам көретін және түртетін нәрсенің бәрі: экрандар, түймелер, мәтіндер, белгішелер.',
    },
  },
  {
    en: 'user experience (UX)',
    kk: 'пайдаланушы тәжірибесі (UX)',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'How easy or annoying it is for a person to reach their goal in your product.',
      kk: 'Пайдаланушы тәжірибесі — адамның сенің өніміңде мақсатына жетуі қаншалықты оңай немесе ыңғайсыз екені.',
    },
  },
  {
    en: 'accessibility',
    kk: 'қолжетімділік',
    keepLatin: false,
    alt: 'қолжетерлілік',
    group: 'web',
    def: {
      en: 'Making the product usable for people who see, hear or move differently.',
      kk: 'Қолжетімділік — көру, есту немесе қозғалу мүмкіндігі басқаша адам да өнімді қолдана алатындай ету.',
    },
  },
  {
    en: 'user',
    kk: 'пайдаланушы',
    keepLatin: false,
    alt: 'қолданушы',
    avoid: 'пользователь',
    group: 'web',
    def: {
      en: 'The person your product is actually for.',
      kk: 'Пайдаланушы — өнімің кім үшін жасалса, сол адам.',
    },
  },
  {
    en: 'notification',
    kk: 'хабарландыру',
    keepLatin: false,
    avoid: 'уведомление',
    group: 'web',
    def: {
      en: 'A short message the product sends to draw attention to something.',
      kk: 'Хабарландыру — өнім бір нәрсеге назар аудартып жіберетін қысқа хабар.',
    },
  },
  {
    en: 'cookie',
    kk: 'cookie файлы',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'A small file a site keeps in your browser to remember you between visits.',
      kk: 'Cookie — сайт сені келесі келгенде тануы үшін браузерде сақтайтын шағын файл.',
    },
  },
  {
    en: 'cache',
    kk: 'кэш',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'A copy kept close by so the same thing is not fetched twice.',
      kk: 'Кэш — бір нәрсені екі рет әкелмеу үшін жақын жерде сақталған көшірме.',
    },
    example: {
      en: 'If the change does not show up, clear the cache and reload.',
      kk: 'Өзгеріс көрінбесе, кэшті тазалап, бетті қайта жүкте.',
    },
  },
  {
    en: 'localhost',
    kk: 'localhost',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The address of your own machine: the site is running, but only for you.',
      kk: 'Localhost — өз машинаңның мекенжайы: сайт істеп тұр, бірақ әзірге тек сен үшін.',
    },
    example: {
      en: 'While it opens only at localhost, nobody else can see it.',
      kk: 'Сайт localhost мекенжайында ғана ашылып тұрса, оны әлі ешкім көре алмайды.',
    },
  },
  {
    en: 'port',
    kk: 'порт',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'The numbered door on a machine through which one program is reached.',
      kk: 'Порт — машинадағы нөмірленген есік; бір бағдарламаға сол арқылы жетесің.',
    },
  },
  {
    en: 'static site',
    kk: 'статикалық сайт',
    keepLatin: false,
    group: 'web',
    def: {
      en: 'A site of ready files with no server logic: the cheapest and fastest thing to publish.',
      kk: 'Статикалық сайт — серверлік логикасы жоқ, дайын файлдардан тұратын сайт: жариялау ең арзан әрі жылдам.',
    },
  },
  {
    en: 'SEO',
    kk: 'SEO',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'Making a site easy for search engines to understand, so people find it.',
      kk: 'SEO — сайтты іздеу жүйелері түсінетіндей етіп жасау, сонда адамдар оны таба алады.',
    },
  },
  // --- data ----------------------------------------------------------------
  {
    en: 'database',
    kk: 'дерекқор',
    keepLatin: false,
    alt: 'деректер базасы',
    avoid: 'мәліметтер базасы',
    group: 'data',
    def: {
      en: 'Where an app keeps its information so it survives a restart and can be searched quickly.',
      kk: 'Дерекқор — қолданба ақпаратын сақтайтын орын: қайта қосқанда жоғалмайды әрі тез ізделеді.',
    },
    example: {
      en: 'Users, orders and messages live in the database, not in the code.',
      kk: 'Пайдаланушылар, тапсырыстар мен хабарлар кодта емес, дерекқорда тұрады.',
    },
  },
  {
    en: 'data',
    kk: 'деректер',
    keepLatin: false,
    avoid: 'мәліметтер',
    group: 'data',
    def: {
      en: 'The information a product stores and works with.',
      kk: 'Деректер — өнім сақтайтын және өңдейтін ақпарат.',
    },
  },
  {
    en: 'table',
    kk: 'кесте',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'One kind of thing in a database, with rows for the items and columns for their properties.',
      kk: 'Кесте — дерекқордағы бір түрлі нәрсенің жиыны: жолдары — даналары, бағандары — қасиеттері.',
    },
  },
  {
    en: 'row',
    kk: 'жол',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'One record in a table: one user, one order, one message.',
      kk: 'Жол — кестедегі бір жазба: бір пайдаланушы, бір тапсырыс, бір хабар.',
    },
  },
  {
    en: 'column',
    kk: 'баған',
    keepLatin: false,
    alt: 'бағана',
    group: 'data',
    def: {
      en: 'One property held for every row, such as name or date.',
      kk: 'Баған — әр жолда сақталатын бір қасиет, мысалы аты немесе күні.',
    },
  },
  {
    en: 'query',
    kk: 'сұрау',
    keepLatin: false,
    alt: 'сұрату',
    group: 'data',
    def: {
      en: 'A question you ask the database, for example all orders from this week.',
      kk: 'Сұрау — дерекқорға қоятын сұрағың, мысалы осы аптадағы барлық тапсырыс.',
    },
  },
  {
    en: 'key',
    kk: 'кілт',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'The column that identifies a row uniquely, so it is never confused with another.',
      kk: 'Кілт — жолды бірегей танытатын баған; сол арқылы ол басқамен шатаспайды.',
    },
  },
  {
    en: 'index',
    kk: 'индекс',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'An extra list that lets the database find the right row fast.',
      kk: 'Индекс — дерекқорға керек жолды жылдам таптыратын қосымша тізім.',
    },
  },
  {
    en: 'SQL',
    kk: 'SQL',
    keepLatin: true,
    group: 'data',
    def: {
      en: 'The language for asking a database for data and for writing data into it.',
      kk: 'SQL — дерекқордан дерек сұрайтын және оған дерек жазатын тіл.',
    },
    example: {
      en: 'Ask the agent to show the SQL before it runs it.',
      kk: 'Агенттен SQL сұрауын орындамай тұрып көрсетуін сұра.',
    },
  },
  {
    en: 'schema',
    kk: 'схема',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'The description of which tables exist and which columns they have.',
      kk: 'Схема — қандай кестелер бар, олардың қандай бағандары бар екенін сипаттайтын құрылым.',
    },
  },
  {
    en: 'migration',
    kk: 'миграция',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'A recorded step that changes the shape of the database, so the change can be repeated and undone.',
      kk: 'Миграция — дерекқордың құрылымын өзгертетін, жазылып қалатын қадам; оны қайталауға да, кері қайтаруға да болады.',
    },
  },
  {
    en: 'vector database',
    kk: 'векторлық дерекқор',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'A database that stores embeddings and finds texts by meaning rather than by exact words.',
      kk: 'Векторлық дерекқор — эмбеддингтерді сақтайтын және мәтінді дәл сөзі бойынша емес, мағынасы бойынша табатын дерекқор.',
    },
  },
  {
    en: 'backup',
    kk: 'сақтық көшірме',
    keepLatin: false,
    avoid: 'резервная копия',
    group: 'data',
    def: {
      en: 'A copy of the data kept elsewhere, so a mistake or a failure does not end the project.',
      kk: 'Сақтық көшірме — деректердің басқа жерде сақталған көшірмесі: қате де, ақау да жобаны бітірмейді.',
    },
  },
  {
    en: 'analytics',
    kk: 'аналитика',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'Collecting and reading numbers about how people actually use the product.',
      kk: 'Аналитика — адамдар өнімді шын мәнінде қалай қолданатыны туралы сандарды жинап, оқу.',
    },
  },
  {
    en: 'metrics',
    kk: 'көрсеткіштер',
    keepLatin: false,
    alt: 'метрикалар',
    group: 'data',
    def: {
      en: 'The few numbers you decided to watch, because they show whether the product is working.',
      kk: 'Көрсеткіштер — өнімнің жұмыс істеп тұрғанын байқату үшін бақылауға алған бірнеше сан.',
    },
  },
  // --- security ------------------------------------------------------------
  {
    en: 'security',
    kk: 'қауіпсіздік',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Keeping data and systems out of the hands of people who should not have them.',
      kk: 'Қауіпсіздік — деректер мен жүйелерді тиіс емес адамның қолына түсірмеу.',
    },
  },
  {
    en: 'privacy',
    kk: 'құпиялылық',
    keepLatin: false,
    alt: 'жекелік',
    group: 'security',
    def: {
      en: 'A person deciding for themselves what happens to their own data.',
      kk: 'Құпиялылық — адамның өз деректерінің тағдырын өзі шешуі.',
    },
  },
  {
    en: 'personal data',
    kk: 'дербес деректер',
    keepLatin: false,
    avoid: 'персоналды деректер',
    group: 'security',
    def: {
      en: 'Any information that points to a specific person: name, phone, address, photo.',
      kk: 'Дербес деректер — нақты бір адамды көрсететін кез келген ақпарат: аты, телефоны, мекенжайы, суреті.',
    },
    example: {
      en: 'Do not paste personal data into a prompt just to test something.',
      kk: 'Бірдеңені сынап көру үшін промптқа дербес деректерді қоя салма.',
    },
  },
  {
    en: 'encryption',
    kk: 'шифрлау',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Turning data into a form only the holder of the key can read.',
      kk: 'Шифрлау — деректерді тек кілті бар адам оқи алатын түрге айналдыру.',
    },
  },
  {
    en: 'authentication',
    kk: 'аутентификация',
    keepLatin: false,
    alt: 'кіруді растау',
    group: 'security',
    def: {
      en: 'Checking that you are who you say you are.',
      kk: 'Аутентификация — сенің айтқан адамың екеніңді тексеру.',
    },
  },
  {
    en: 'authorization',
    kk: 'авторизация',
    keepLatin: false,
    alt: 'рұқсат беру',
    group: 'security',
    def: {
      en: 'Deciding what you are allowed to do once it is known who you are.',
      kk: 'Авторизация — кім екенің анықталған соң, саған нені істеуге болатынын шешу.',
    },
  },
  {
    en: 'two-factor authentication',
    kk: 'екі факторлы аутентификация',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Asking for a second proof besides the password, usually a code from your phone.',
      kk: 'Екі факторлы аутентификация — құпиясөзден бөлек екінші дәлел сұрау, әдетте телефондағы код.',
    },
    example: {
      en: 'Turn it on for GitHub before anything else.',
      kk: 'Оны бірінші кезекте GitHub-та қосып қой.',
    },
  },
  {
    en: 'password',
    kk: 'құпиясөз',
    keepLatin: false,
    alt: 'құпия сөз',
    avoid: 'пароль',
    group: 'security',
    def: {
      en: 'The secret word that lets you into an account, and only you.',
      kk: 'Құпиясөз — аккаунтқа тек сені кіргізетін құпия сөз.',
    },
  },
  {
    en: 'password manager',
    kk: 'құпиясөз менеджері',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A program that stores long, different passwords for every site so you do not have to remember them.',
      kk: 'Құпиясөз менеджері — әр сайтқа ұзын әрі әртүрлі құпиясөзді сақтайтын бағдарлама; жаттаудың қажеті болмайды.',
    },
  },
  {
    en: 'secret',
    kk: 'құпия дерек (secret)',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A value that must live outside the code: an API key, a database password, a token.',
      kk: 'Құпия дерек — кодтың ішінде емес, сыртында тұруға тиіс мән: API кілті, дерекқор құпиясөзі, токен.',
    },
    example: {
      en: 'Never write an API key inside the code: keep it in the .env file.',
      kk: 'API кілтін ешқашан кодтың ішіне жазба — оны .env файлында сақта.',
    },
  },
  {
    en: 'API key',
    kk: 'API кілті',
    keepLatin: true,
    group: 'security',
    def: {
      en: 'The string that identifies you to a paid service and against which your usage is billed.',
      kk: 'API кілті — ақылы қызметке кім екеніңді танытатын және шығының соған жазылатын жол.',
    },
    example: {
      en: 'A leaked key is someone else spending your money.',
      kk: 'Сыртқа шығып кеткен кілт — сенің ақшаңды басқа біреудің жұмсауы.',
    },
  },
  {
    en: 'leak',
    kk: 'сыртқа шығу',
    keepLatin: false,
    alt: 'ағып кету',
    avoid: 'утечка',
    group: 'security',
    def: {
      en: 'Data ending up where it was never meant to be.',
      kk: 'Сыртқа шығу — деректердің мүлде тиіс емес жерге түсіп қалуы.',
    },
  },
  {
    en: 'vulnerability',
    kk: 'осалдық',
    keepLatin: false,
    alt: 'осалдылық',
    group: 'security',
    def: {
      en: 'A weak spot in a system that an attacker can use.',
      kk: 'Осалдық — жүйедегі шабуылдаушы пайдалана алатын әлсіз жер.',
    },
  },
  {
    en: 'threat',
    kk: 'қауіп',
    keepLatin: false,
    alt: 'қатер',
    group: 'security',
    def: {
      en: 'Something that could cause harm if nothing stops it.',
      kk: 'Қауіп — тоқтатылмаса зиян келтіре алатын нәрсе.',
    },
  },
  {
    en: 'risk',
    kk: 'тәуекел',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'How likely the harm is and how bad it would be.',
      kk: 'Тәуекел — зиянның болу ықтималдығы және оның қаншалықты ауыр болатыны.',
    },
  },
  {
    en: 'attack',
    kk: 'шабуыл',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A deliberate attempt to break into or break down a system.',
      kk: 'Шабуыл — жүйеге әдейі кіруге немесе оны істен шығаруға жасалған әрекет.',
    },
  },
  {
    en: 'hacker',
    kk: 'хакер',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Someone who finds ways into systems; some do it to fix them, some to abuse them.',
      kk: 'Хакер — жүйеге кірудің жолын табатын адам; біреулері оны түзету үшін, біреулері теріс пайдалану үшін істейді.',
    },
  },
  {
    en: 'malware',
    kk: 'зиянды бағдарлама',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A program written to damage your machine or steal from it.',
      kk: 'Зиянды бағдарлама — машинаңа зиян келтіру немесе одан ұрлау үшін жазылған бағдарлама.',
    },
  },
  {
    en: 'phishing',
    kk: 'фишинг',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A fake message or page that imitates a real one to get your password out of you.',
      kk: 'Фишинг — құпиясөзіңді алу үшін шынайысына ұқсатып жасалған жалған хабар немесе бет.',
    },
  },
  {
    en: 'prompt injection',
    kk: 'промпт-инъекция',
    keepLatin: false,
    alt: 'зиянды нұсқау ендіру',
    group: 'security',
    def: {
      en: 'An instruction hidden inside text the agent reads, written to make it do something you never asked for.',
      kk: 'Промпт-инъекция — агент оқитын мәтіннің ішіне жасырылған, оны сен сұрамаған әрекетке көндіретін нұсқау.',
    },
    example: {
      en: 'Treat what a tool returns as data, never as an instruction.',
      kk: 'Құрал қайтарған мәтінді нұсқау емес, жай дерек деп қара.',
    },
  },
  {
    en: 'SQL injection',
    kk: 'SQL-инъекция',
    keepLatin: true,
    group: 'security',
    def: {
      en: 'Slipping database commands into an input field that was never checked.',
      kk: 'SQL-инъекция — тексерілмеген енгізу өрісі арқылы дерекқорға өз пәрмендерін кіргізіп жіберу.',
    },
  },
  {
    en: 'input validation',
    kk: 'енгізілген деректерді тексеру',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Checking everything that comes from outside before your code believes it.',
      kk: 'Енгізілген деректерді тексеру — сырттан келген нәрсенің бәрін код оған сенер алдында тексеру.',
    },
  },
  {
    en: 'sandbox',
    kk: 'sandbox',
    keepLatin: true,
    alt: 'оқшауланған орта',
    group: 'security',
    def: {
      en: 'An isolated environment where a program can do no harm outside its walls.',
      kk: 'Sandbox — бағдарлама өз қабырғасынан тыс зиян келтіре алмайтын оқшауланған орта.',
    },
    example: {
      en: 'Run an agent without permission prompts only inside an isolated environment.',
      kk: 'Рұқсат сұрамайтын агентті тек оқшауланған ортада іске қос.',
    },
  },
  {
    en: 'permission',
    kk: 'рұқсат',
    keepLatin: false,
    alt: 'қол жеткізу',
    avoid: 'доступ',
    group: 'security',
    def: {
      en: 'The right to do one specific thing, granted deliberately.',
      kk: 'Рұқсат — нақты бір әрекетті істеуге әдейі берілген құқық.',
    },
  },
  {
    en: 'least privilege',
    kk: 'ең аз рұқсат қағидаты',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'Giving every tool and person only the access their job actually needs.',
      kk: 'Ең аз рұқсат қағидаты — әр құрал мен адамға тек жұмысына жететін рұқсатты ғана беру.',
    },
  },
  {
    en: 'firewall',
    kk: 'файрвол',
    keepLatin: false,
    alt: 'желіаралық қалқан',
    avoid: 'брандмауэр',
    group: 'security',
    def: {
      en: 'A filter that decides which network traffic may in and which may not.',
      kk: 'Файрвол — қандай желілік трафикті өткізіп, қандайын өткізбейтінін шешетін сүзгі.',
    },
  },
  {
    en: 'consent',
    kk: 'келісім',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A person agreeing, knowingly and freely, to what you do with their data.',
      kk: 'Келісім — адамның деректерімен не істелетінін біліп тұрып, өз еркімен рұқсат беруі.',
    },
  },
  {
    en: 'audit',
    kk: 'аудит',
    keepLatin: false,
    alt: 'тексеріс',
    group: 'security',
    def: {
      en: 'Going through what happened and who did what, after the fact.',
      kk: 'Аудит — не болғанын және кімнің не істегенін кейіннен қарап шығу.',
    },
  },
  {
    en: 'trust',
    kk: 'сенім',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'What you decide to believe without checking every time, which is why it should be given narrowly.',
      kk: 'Сенім — әр жолы тексермей-ақ қабылдайтын нәрсең; сондықтан оны шектеулі түрде беру керек.',
    },
  },
  // --- deploy --------------------------------------------------------------
  {
    en: 'deploy',
    kk: 'deploy',
    keepLatin: true,
    alt: 'жариялау',
    avoid: 'деплой',
    group: 'deploy',
    def: {
      en: 'Taking the code off your laptop and putting it on servers where real people can reach it at a URL.',
      kk: 'Deploy — кодты ноутбуктан алып, серверге қойып, нақты адамдар сілтеме арқылы кіретіндей ету.',
    },
    example: {
      en: 'After deploying the site to Vercel, send the link to a friend.',
      kk: 'Сайтты Vercel-ге deploy жасағаннан кейін сілтемені досыңа жібер.',
    },
  },
  {
    en: 'hosting',
    kk: 'хостинг',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The service that keeps your site running on its machines.',
      kk: 'Хостинг — сайтыңды өз машиналарында үздіксіз ұстап тұратын қызмет.',
    },
  },
  {
    en: 'cloud',
    kk: 'бұлт',
    keepLatin: false,
    alt: 'бұлттық',
    avoid: 'облако',
    group: 'deploy',
    def: {
      en: 'Someone else computers, rented by the minute instead of bought.',
      kk: 'Бұлт — сатып алудың орнына уақытпен өлшеп жалға алынатын, басқа біреудің компьютерлері.',
    },
  },
  {
    en: 'serverless',
    kk: 'серверсіз',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'Running small functions that wake up per request, so you never manage a server yourself.',
      kk: 'Серверсіз тәсіл — әр сұрауға бір сәт оянатын шағын функцияларды қолдану; серверді өзің ұстамайсың.',
    },
  },
  {
    en: 'container',
    kk: 'контейнер',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'A program wrapped up with everything it needs, so it runs the same on any machine.',
      kk: 'Контейнер — бағдарламаны керек-жарағымен бірге орап қою; сонда ол кез келген машинада бірдей істейді.',
    },
  },
  {
    en: 'Docker',
    kk: 'Docker',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'The most common tool for building and running containers.',
      kk: 'Docker — контейнер жасаудың және іске қосудың ең кең тараған құралы.',
    },
  },
  {
    en: 'image (container)',
    kk: 'image',
    keepLatin: true,
    avoid: 'образ',
    group: 'deploy',
    def: {
      en: 'The ready-made blueprint a container is started from.',
      kk: 'Image — контейнер содан бастап іске қосылатын дайын үлгі.',
    },
  },
  {
    en: 'virtual machine',
    kk: 'виртуалды машина',
    keepLatin: false,
    avoid: 'ауани машина',
    group: 'deploy',
    def: {
      en: 'A whole computer simulated inside another computer.',
      kk: 'Виртуалды машина — бір компьютердің ішінде имитацияланған тұтас компьютер.',
    },
  },
  {
    en: 'build',
    kk: 'build',
    keepLatin: true,
    alt: 'құрастыру',
    avoid: 'сборка',
    group: 'deploy',
    def: {
      en: 'The step that turns source code into the finished form a browser or a server can run.',
      kk: 'Build — бастапқы кодты браузер немесе сервер орындайтын дайын түрге айналдыратын қадам.',
    },
    example: {
      en: 'A failing build is also a signal the agent can read.',
      kk: 'Құлаған build — агент оқи алатын белгінің бірі.',
    },
  },
  {
    en: 'CI/CD',
    kk: 'CI/CD',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'Automation that runs on every change: install, test, build, and if all is well, deploy.',
      kk: 'CI/CD — әр өзгерісте өзі жүретін автоматтандыру: орнатады, тестілейді, build жасайды, бәрі дұрыс болса — шығарады.',
    },
  },
  {
    en: 'pipeline',
    kk: 'pipeline',
    keepLatin: true,
    alt: 'конвейер',
    group: 'deploy',
    def: {
      en: 'The chain of automated steps a change passes through on its way to users.',
      kk: 'Pipeline — өзгеріс пайдаланушыға жеткенше өтетін автоматты қадамдар тізбегі.',
    },
  },
  {
    en: 'environment',
    kk: 'орта',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The place code runs, with its own settings and its own data.',
      kk: 'Орта — кодтың өз баптауымен және өз деректерімен жүретін жері.',
    },
  },
  {
    en: 'production',
    kk: 'жұмыс ортасы (production)',
    keepLatin: false,
    avoid: 'прод',
    group: 'deploy',
    def: {
      en: 'The live version real people are using, where a mistake costs the most.',
      kk: 'Жұмыс ортасы — нақты адамдар қолданып отырған тірі нұсқа; қате мұнда ең қымбатқа түседі.',
    },
    example: {
      en: 'Do not ship AI-written code to production without checking it.',
      kk: 'ЖИ жазған кодты тексермей тұрып production ортасына шығарма.',
    },
  },
  {
    en: 'staging',
    kk: 'сынақ ортасы',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'A copy of production for trying things out, where breaking something harms nobody.',
      kk: 'Сынақ ортасы — жұмыс ортасының сынап көруге арналған көшірмесі; мұнда бірдеңе бұзылса, ешкімге зиян жоқ.',
    },
  },
  {
    en: 'environment variable',
    kk: 'орта айнымалысы',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'A named value kept outside the code and handed to the program when it starts: keys, addresses, settings.',
      kk: 'Орта айнымалысы — кодтың сыртында тұратын, бағдарлама іске қосылғанда берілетін мән: кілттер, мекенжайлар, баптаулар.',
    },
  },
  {
    en: '.env file',
    kk: '.env файлы',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'The local file holding your environment variables, which must be listed in .gitignore.',
      kk: '.env — орта айнымалыларың жазылатын жергілікті файл; оны .gitignore тізіміне қосу міндетті.',
    },
    example: {
      en: 'Open the .env file and put the key there.',
      kk: '.env файлын ашып, кілтті сонда жаз.',
    },
  },
  {
    en: 'DNS',
    kk: 'DNS',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'The internet directory that turns a domain name into the numeric address of a server.',
      kk: 'DNS — домен атауын сервердің сандық мекенжайына аударатын интернеттің анықтамалығы.',
    },
    example: {
      en: 'A DNS change can take minutes or hours to spread.',
      kk: 'DNS жазбасындағы өзгеріс таралуға бірнеше минуттан бірнеше сағатқа дейін уақыт алуы мүмкін.',
    },
  },
  {
    en: 'CDN',
    kk: 'CDN',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'A network of servers around the world that serves your files from the one nearest the visitor.',
      kk: 'CDN — файлдарыңды келушіге ең жақын серверден беретін, дүние жүзіне таралған серверлер желісі.',
    },
  },
  {
    en: 'SSL certificate',
    kk: 'SSL сертификаты',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'The proof that lets a browser open your site over an encrypted connection.',
      kk: 'SSL сертификаты — браузердің сайтыңа шифрланған байланыс арқылы кіруіне мүмкіндік беретін дәлел.',
    },
  },
  {
    en: 'monitoring',
    kk: 'мониторинг',
    keepLatin: false,
    alt: 'бақылау',
    group: 'deploy',
    def: {
      en: 'Watching a running system so you learn about a problem before your users tell you.',
      kk: 'Мониторинг — істеп тұрған жүйені бақылау; ақаулықты пайдаланушы айтқанша өзің білесің.',
    },
  },
  {
    en: 'uptime',
    kk: 'жұмыс уақыты',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The share of time a service was actually available.',
      kk: 'Жұмыс уақыты — қызметтің шын мәнінде қолжетімді болған уақытының үлесі.',
    },
  },
  {
    en: 'scaling',
    kk: 'масштабтау',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'Making a system cope when the number of users grows.',
      kk: 'Масштабтау — пайдаланушы саны өскенде жүйенің шыдайтындай етуі.',
    },
  },
  {
    en: 'rollback',
    kk: 'кері қайтару',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'Going back to the previous working version when a new one turns out broken.',
      kk: 'Кері қайтару — жаңа нұсқа бұзық болып шықса, бұрынғы жұмыс істеген нұсқаға оралу.',
    },
  },
  {
    en: 'webhook',
    kk: 'webhook',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'An address another service calls the moment something happens, instead of you asking it repeatedly.',
      kk: 'Webhook — бірдеңе болған сәтте басқа қызмет өзі шақыратын мекенжай; сенің қайта-қайта сұрап отыруың қажет емес.',
    },
  },
  {
    en: 'cron job',
    kk: 'cron тапсырмасы',
    keepLatin: true,
    group: 'deploy',
    def: {
      en: 'A task that runs on a schedule, for example every night at three.',
      kk: 'Cron тапсырмасы — кесте бойынша жүретін жұмыс, мысалы әр түні сағат үште.',
    },
  },
  {
    en: 'latency',
    kk: 'кідіріс',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'How long it takes between the request going out and the answer coming back.',
      kk: 'Кідіріс — сұрау кеткен сәт пен жауап келген сәттің арасындағы уақыт.',
    },
  },
  {
    en: 'bandwidth',
    kk: 'өткізу қабілеті',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'How much data can pass through a connection in a given time.',
      kk: 'Өткізу қабілеті — байланыс арқылы белгілі уақытта өте алатын дерек көлемі.',
    },
  },
  {
    en: 'status page',
    kk: 'күй беті',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The page a service keeps to say whether it is working right now.',
      kk: 'Күй беті — қызметтің дәл қазір істеп тұрғанын хабарлайтын беті.',
    },
  },
  {
    en: 'free tier',
    kk: 'тегін жоспар',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The limited amount a service lets you use without paying, usually enough for a first project.',
      kk: 'Тегін жоспар — ақы төлемей қолдануға берілетін шектеулі мөлшер; алғашқы жобаға әдетте жетеді.',
    },
    example: {
      en: 'Your first project needs no money: GitHub, Vercel and Cloudflare all have free tiers.',
      kk: 'Алғашқы жобаңа ақша керек емес: GitHub-та да, Vercel-де де, Cloudflare-де де тегін жоспар бар.',
    },
  },
  {
    en: 'preview URL',
    kk: 'алдын ала көру сілтемесі',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'A temporary address created for a branch, so the work can be shown before it goes live.',
      kk: 'Алдын ала көру сілтемесі — тармаққа жасалатын уақытша мекенжай; жұмысты жарияламай тұрып көрсетуге болады.',
    },
  },
  {
    en: 'error page (404, 500)',
    kk: 'қате беті',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The page shown when something is missing or broken; 404 means not found, 500 means the server failed.',
      kk: 'Қате беті — бір нәрсе табылмағанда немесе бұзылғанда шығатын бет: 404 — табылмады, 500 — сервер істен шықты.',
    },
  },
  // --- product -------------------------------------------------------------
  {
    en: 'product',
    kk: 'өнім',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Something people actually use to solve a problem, not just a working piece of code.',
      kk: 'Өнім — адамдар мәселесін шешу үшін шынымен қолданатын нәрсе, жай ғана істеп тұрған код емес.',
    },
  },
  {
    en: 'feature',
    kk: 'мүмкіндік',
    keepLatin: false,
    alt: 'функция',
    avoid: 'фича',
    group: 'product',
    def: {
      en: 'One thing a product lets a person do.',
      kk: 'Мүмкіндік — өнімнің адамға істетіп беретін бір ісі.',
    },
  },
  {
    en: 'MVP (minimum viable product)',
    kk: 'MVP',
    keepLatin: true,
    group: 'product',
    def: {
      en: 'The simplest working version that is still enough to test whether the idea holds.',
      kk: 'MVP — идеяның дұрыстығын тексеруге жететін, ең қарапайым жұмыс істейтін нұсқа.',
    },
    example: {
      en: 'Do not polish the MVP: show it to five people first.',
      kk: 'MVP-ді жылтыратпа: алдымен бес адамға көрсет.',
    },
  },
  {
    en: 'prototype',
    kk: 'прототип',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A rough version made to answer one question, which you are allowed to throw away.',
      kk: 'Прототип — бір сұраққа жауап табу үшін жасалған дөрекі нұсқа; оны лақтырып тастауға болады.',
    },
  },
  {
    en: 'demo',
    kk: 'демо',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A short live showing of the product working.',
      kk: 'Демо — өнімнің істеп тұрғанын тікелей көрсететін қысқа көрініс.',
    },
  },
  {
    en: 'idea',
    kk: 'идея',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The cheapest part of the work: what matters is what you build from it.',
      kk: 'Идея — жұмыстың ең арзан бөлігі; маңыздысы — одан не жасайтының.',
    },
  },
  {
    en: 'problem',
    kk: 'мәселе',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The difficulty a real person has, which your product is supposed to remove.',
      kk: 'Мәселе — нақты адамның басындағы қиындық; өнімің соны жоюға тиіс.',
    },
    example: {
      en: 'Start from the problem, not from the technology.',
      kk: 'Технологиядан емес, мәселеден баста.',
    },
  },
  {
    en: 'solution',
    kk: 'шешім',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Your answer to the problem, which is only one of the possible answers.',
      kk: 'Шешім — мәселеге берген жауабың; ол мүмкін жауаптардың бірі ғана.',
    },
  },
  {
    en: 'customer',
    kk: 'клиент',
    keepLatin: false,
    alt: 'тұтынушы',
    group: 'product',
    def: {
      en: 'The person who pays; they are not always the same person as the user.',
      kk: 'Клиент — ақы төлейтін адам; ол әрқашан пайдаланушымен бір адам бола бермейді.',
    },
  },
  {
    en: 'feedback',
    kk: 'пікір',
    keepLatin: false,
    alt: 'кері байланыс',
    group: 'product',
    def: {
      en: 'What people say after using the product, which is worth more than what they say about the idea.',
      kk: 'Пікір — адамдардың өнімді қолданып көргеннен кейін айтқаны; ол идея туралы айтқанынан әлдеқайда құнды.',
    },
  },
  {
    en: 'launch',
    kk: 'іске қосу',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The moment the product becomes available to people outside your own circle.',
      kk: 'Іске қосу — өнімнің өз ортаңнан тыс адамдарға қолжетімді болған сәті.',
    },
  },
  {
    en: 'ship',
    kk: 'шығару',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Getting the work into people hands; works on my machine is not shipped.',
      kk: 'Шығару — жұмысты адамдардың қолына жеткізу; «менің компьютерімде істейді» әлі шығару емес.',
    },
    example: {
      en: 'Ship something small every week rather than something perfect once a year.',
      kk: 'Жылына бір рет мінсіз нәрсе емес, апта сайын кішкентай нәрсе шығар.',
    },
  },
  {
    en: 'iterate',
    kk: 'қайталап жетілдіру',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Releasing, watching what happens, changing it, releasing again.',
      kk: 'Қайталап жетілдіру — шығару, не болғанын бақылау, өзгерту, қайта шығару.',
    },
  },
  {
    en: 'roadmap',
    kk: 'жол картасы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The order in which you intend to build things, and what waits.',
      kk: 'Жол картасы — нені қандай ретпен жасайтының және нелердің кезегін күтетіні.',
    },
  },
  {
    en: 'backlog',
    kk: 'backlog',
    keepLatin: true,
    alt: 'орындалмаған тапсырмалар тізімі',
    group: 'product',
    def: {
      en: 'The list of everything not done yet, sorted so the top of it is what matters now.',
      kk: 'Backlog — әлі орындалмаған істердің тізімі; басындағысы дәл қазір маңыздысы болатындай реттеледі.',
    },
  },
  {
    en: 'task',
    kk: 'тапсырма',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'One piece of work small enough to finish and check.',
      kk: 'Тапсырма — аяқтауға және тексеруге болатындай шағын жұмыс бөлігі.',
    },
    example: {
      en: 'Split the task into small steps and check the result after each one.',
      kk: 'Тапсырманы шағын қадамдарға бөл де, әр қадамнан кейін нәтижені тексер.',
    },
  },
  {
    en: 'priority',
    kk: 'басымдық',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'What gets done first when you cannot do everything.',
      kk: 'Басымдық — бәрін бірдей істеуге мүмкіндік болмағанда, алдымен қайсысы істелетіні.',
    },
  },
  {
    en: 'deadline',
    kk: 'мерзім',
    keepLatin: false,
    avoid: 'дедлайн',
    group: 'product',
    def: {
      en: 'The date by which the work must be finished.',
      kk: 'Мерзім — жұмыстың бітуге тиіс күні.',
    },
  },
  {
    en: 'startup',
    kk: 'стартап',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A young company looking for a way to grow fast with something new.',
      kk: 'Стартап — жаңа нәрсемен тез өсудің жолын іздеп жүрген жас компания.',
    },
  },
  {
    en: 'founder',
    kk: 'негізін қалаушы',
    keepLatin: false,
    alt: 'фаундер',
    group: 'product',
    def: {
      en: 'Someone who started the company and carries the risk of it.',
      kk: 'Негізін қалаушы — компанияны бастаған және оның тәуекелін көтеретін адам.',
    },
  },
  {
    en: 'pitch',
    kk: 'питч',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A short, clear telling of what you are building and why it matters.',
      kk: 'Питч — не жасап жатқаныңды және оның не үшін маңызды екенін қысқа әрі анық айтып беру.',
    },
  },
  {
    en: 'investor',
    kk: 'инвестор',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Someone who puts money into the company in exchange for a share of it.',
      kk: 'Инвестор — компанияның үлесіне ие болу үшін оған ақша салатын адам.',
    },
  },
  {
    en: 'accelerator',
    kk: 'акселератор',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A programme that takes a young team for a few months and pushes it to grow faster.',
      kk: 'Акселератор — жас команданы бірнеше айға алып, тезірек өсуге итермелейтін бағдарлама.',
    },
  },
  {
    en: 'pricing',
    kk: 'баға',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'How much you ask, for what, and how often.',
      kk: 'Баға — нең үшін, қанша және қандай жиілікпен ақы сұрайтының.',
    },
  },
  {
    en: 'subscription',
    kk: 'жазылым',
    keepLatin: false,
    avoid: 'подписка',
    group: 'product',
    def: {
      en: 'Paying a fixed amount every month instead of once.',
      kk: 'Жазылым — бір рет емес, ай сайын тұрақты сома төлеу.',
    },
    example: {
      en: 'For a student a flat subscription is the predictable option; API keys plus loops are where surprise bills come from.',
      kk: 'Студентке тұрақты жазылым болжауға оңай; күтпеген шот API кілті мен циклдерден шығады.',
    },
  },
  {
    en: 'trial',
    kk: 'сынақ мерзімі',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A period when you may use a paid product for free before deciding.',
      kk: 'Сынақ мерзімі — шешім қабылдағанша ақылы өнімді тегін қолдануға берілетін уақыт.',
    },
  },
  {
    en: 'growth',
    kk: 'өсу',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'More people using the product, and more of them coming back.',
      kk: 'Өсу — өнімді қолданатын адамның көбеюі және олардың қайта оралуы.',
    },
  },
  {
    en: 'market',
    kk: 'нарық',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'All the people who have this problem and could pay to have it solved.',
      kk: 'Нарық — осы мәселесі бар және оны шешуге ақы төлей алатын адамдардың бәрі.',
    },
  },
  {
    en: 'community',
    kk: 'қауымдастық',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The people around a product or a topic who help each other.',
      kk: 'Қауымдастық — бір өнімнің немесе бір тақырыптың айналасындағы, бір-біріне көмектесетін адамдар.',
    },
  },
  {
    en: 'mentor',
    kk: 'тәлімгер',
    keepLatin: false,
    alt: 'ментор',
    group: 'product',
    def: {
      en: 'Someone further along the road who saves you a year of mistakes in one conversation.',
      kk: 'Тәлімгер — осы жолмен алда жүрген адам; бір әңгімеде бір жылдық қатеден құтқарады.',
    },
  },
  {
    en: 'portfolio',
    kk: 'портфолио',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The open collection of things you have built: links and repositories.',
      kk: 'Портфолио — жасаған дүниелеріңнің ашық жинағы: сілтемелер мен репозиторийлер.',
    },
    example: {
      en: 'One finished and deployed project says more than ten unfinished ones.',
      kk: 'Аяқталып, жарияланған бір жоба бітпеген он жобадан көп нәрсе айтады.',
    },
  },
  // --- workshop ------------------------------------------------------------
  {
    en: 'masterclass',
    kk: 'шеберлік сабағы',
    keepLatin: false,
    avoid: 'мастер-класс',
    group: 'workshop',
    def: {
      en: 'A short intensive session where you learn by building something together.',
      kk: 'Шеберлік сабағы — бірге бір нәрсе жасай отырып үйренетін қысқа әрі қарқынды сабақ.',
    },
  },
  {
    en: 'workshop',
    kk: 'воркшоп',
    keepLatin: false,
    alt: 'практикум',
    group: 'workshop',
    def: {
      en: 'A session where everyone works with their own hands, not just listens.',
      kk: 'Воркшоп — тек тыңдап қана қоймай, әркім өз қолымен жұмыс істейтін сабақ.',
    },
  },
  {
    en: 'course',
    kk: 'курс',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A sequence of lessons leading from the first step to a finished result.',
      kk: 'Курс — бірінші қадамнан бастап дайын нәтижеге жеткізетін сабақтар тізбегі.',
    },
  },
  {
    en: 'lesson',
    kk: 'сабақ',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'One part of a course, short enough to finish in one sitting.',
      kk: 'Сабақ — курстың бір бөлігі; бір отырыста аяқтауға жететіндей қысқа.',
    },
  },
  {
    en: 'module (of a course)',
    kk: 'модуль',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A group of lessons about one topic.',
      kk: 'Модуль — бір тақырыпқа арналған сабақтар тобы.',
    },
    example: {
      en: 'Module 3 is about agents.',
      kk: '3-модуль агенттер туралы.',
    },
  },
  {
    en: 'step',
    kk: 'қадам',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'One action in a sequence you are asked to do now.',
      kk: 'Қадам — тізбектегі дәл қазір істеуге тиіс бір әрекет.',
    },
    example: {
      en: 'Step 2 of 8.',
      kk: 'Қадам: 2/8.',
    },
  },
  {
    en: 'quiz',
    kk: 'тест',
    keepLatin: false,
    alt: 'сынақ',
    avoid: 'викторина',
    group: 'workshop',
    def: {
      en: 'A few questions that show whether the idea actually stuck.',
      kk: 'Тест — ұғымның шынымен қонғанын байқататын бірнеше сұрақ.',
    },
    example: {
      en: 'Not quite. Try again.',
      kk: 'Дұрыс емес. Тағы байқап көр.',
    },
  },
  {
    en: 'exercise',
    kk: 'жаттығу',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A small task you do with your own hands to make the knowledge real.',
      kk: 'Жаттығу — білімді шын мәнінде меңгеру үшін өз қолыңмен орындайтын шағын тапсырма.',
    },
  },
  {
    en: 'homework',
    kk: 'үй тапсырмасы',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Work to do on your own after the session; this is where most of the learning happens.',
      kk: 'Үй тапсырмасы — сабақтан кейін өз бетіңмен істейтін жұмыс; үйренудің көбі осында болады.',
    },
  },
  {
    en: 'hint',
    kk: 'ишара',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A nudge that points the way without giving the answer.',
      kk: 'Ишара — жауапты бермей-ақ, бағыт көрсететін нұсқау.',
    },
  },
  {
    en: 'tip',
    kk: 'кеңес',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A short piece of practical advice from experience.',
      kk: 'Кеңес — тәжірибеден шыққан қысқа әрі пайдалы ақыл.',
    },
  },
  {
    en: 'example',
    kk: 'мысал',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A concrete case that makes an abstract rule clear.',
      kk: 'Мысал — дерексіз ережені түсінікті ететін нақты жағдай.',
    },
  },
  {
    en: 'note',
    kk: 'ескерту',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A short remark worth keeping in mind.',
      kk: 'Ескерту — есте ұстауға тұрарлық қысқа сөз.',
    },
  },
  {
    en: 'progress',
    kk: 'үлгерім',
    keepLatin: false,
    avoid: 'прогресс',
    group: 'workshop',
    def: {
      en: 'How much of the course you have got through so far.',
      kk: 'Үлгерім — курстың қанша бөлігін өтіп шыққаның.',
    },
    example: {
      en: 'Continue where you left off.',
      kk: 'Тоқтаған жеріңнен жалғастыр.',
    },
  },
  {
    en: 'score',
    kk: 'ұпай',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'The number of correct answers, which is a signal for you and not a grade.',
      kk: 'Ұпай — дұрыс жауаптың саны; бұл саған арналған белгі, баға емес.',
    },
    example: {
      en: 'You got 7 of 10.',
      kk: '10 сұрақтың 7-еуіне дұрыс жауап бердің.',
    },
  },
  {
    en: 'level',
    kk: 'деңгей',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'How hard the material is, from beginner to advanced.',
      kk: 'Деңгей — материалдың қаншалықты күрделі екені: бастаушыдан жоғары деңгейге дейін.',
    },
  },
  {
    en: 'beginner',
    kk: 'бастаушы',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Someone doing this for the first time; no previous programming is assumed.',
      kk: 'Бастаушы — бұл істі бірінші рет істеп отырған адам; бұрын бағдарламалау талап етілмейді.',
    },
  },
  {
    en: 'intermediate',
    kk: 'орта деңгей',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Someone who has built something before and now wants to build it properly.',
      kk: 'Орта деңгей — бұрын бірдеңе жасап көрген, енді оны дұрыстап жасағысы келетін адам.',
    },
  },
  {
    en: 'advanced',
    kk: 'жоғары деңгей',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Someone ready for long-running agents, parallel work and cost control.',
      kk: 'Жоғары деңгей — ұзақ істейтін агенттерге, қатар жүретін жұмысқа және шығынды басқаруға дайын адам.',
    },
  },
  {
    en: 'certificate',
    kk: 'сертификат',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Proof that you finished the course; the projects you built are worth more.',
      kk: 'Сертификат — курсты бітіргеніңнің дәлелі; бірақ жасаған жобаларың одан да құнды.',
    },
  },
  {
    en: 'glossary',
    kk: 'глоссарий',
    keepLatin: false,
    alt: 'терминдер сөздігі',
    group: 'workshop',
    def: {
      en: 'The list of terms with plain explanations, this page.',
      kk: 'Глоссарий — терминдердің қарапайым түсіндірмесі берілген тізім, яғни осы бет.',
    },
  },
  {
    en: 'cheat sheet',
    kk: 'жадынама',
    keepLatin: false,
    avoid: 'шпаргалка',
    group: 'workshop',
    def: {
      en: 'One page with the commands and rules you need at hand while working.',
      kk: 'Жадынама — жұмыс үстінде қол астында тұратын пәрмендер мен ережелер жинақталған бір бет.',
    },
  },
  {
    en: 'slides',
    kk: 'слайдтар',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'The presentation shown during the live session.',
      kk: 'Слайдтар — тікелей сабақ кезінде көрсетілетін презентация.',
    },
  },
  {
    en: 'recording',
    kk: 'жазба',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'The video of the session, for those who could not be there.',
      kk: 'Жазба — сабақтың бейнесі; келе алмағандарға арналған.',
    },
  },
  {
    en: 'live stream',
    kk: 'тікелей эфир',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'The session broadcast as it happens, where you can ask straight away.',
      kk: 'Тікелей эфир — сабақтың болып жатқан сәтте таратылуы; сұрағыңды сол жерде қоя аласың.',
    },
  },
  {
    en: 'builder',
    kk: 'жасаушы (builder)',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Anyone who makes things, whether or not they call themselves a programmer.',
      kk: 'Жасаушы — өзін бағдарламашы деп атаса да, атамаса да, дүние жасайтын кез келген адам.',
    },
  },
  {
    en: 'team',
    kk: 'команда',
    keepLatin: false,
    alt: 'топ',
    group: 'workshop',
    def: {
      en: 'A few people building one thing together.',
      kk: 'Команда — бір дүниені бірге жасап жатқан бірнеше адам.',
    },
  },
  {
    en: 'Q&A',
    kk: 'сұрақ-жауап',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'The part where you ask and get an answer; there are no stupid questions here.',
      kk: 'Сұрақ-жауап — сұрап, жауап алатын бөлім; мұнда ақымақ сұрақ деген болмайды.',
    },
  },
  {
    en: 'speaker',
    kk: 'спикер',
    keepLatin: false,
    alt: 'баяндамашы',
    group: 'workshop',
    def: {
      en: 'The person running the session.',
      kk: 'Спикер — сабақты жүргізіп отырған адам.',
    },
  },
  {
    en: 'participant',
    kk: 'қатысушы',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'Everyone in the room or in the stream, you included.',
      kk: 'Қатысушы — залдағы немесе эфирдегі әркім, соның ішінде сен де.',
    },
  },
  {
    en: 'registration',
    kk: 'тіркелу',
    keepLatin: false,
    avoid: 'регистрация',
    group: 'workshop',
    def: {
      en: 'Signing up for the session so a place is kept for you.',
      kk: 'Тіркелу — сабаққа жазылып, өзіңе орын сақтап қою.',
    },
    example: {
      en: 'Register for the masterclass. It is free.',
      kk: 'Шеберлік сабағына тіркел. Ол тегін.',
    },
  },
  {
    en: 'function calling',
    kk: 'функция шақыру',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The mechanism that lets a model reply with «run this function with these values» instead of replying with text.',
      kk: 'Функция шақыру — модельдің мәтін жазудың орнына «мына функцияны мынадай мәнмен орында» деп жауап бере алатын тәсілі.',
    },
    example: {
      en: 'Function calling is what turns a plain chat model into an agent.',
      kk: 'Функция шақыру арқылы қарапайым чат моделі агентке айналады.',
    },
  },
  {
    en: 'pre-training',
    kk: 'алдын ала оқыту',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The first and longest stage of training, where the model reads an enormous slice of the internet and learns language itself.',
      kk: 'Алдын ала оқыту — оқытудың ең ұзақ бірінші кезеңі: модель интернеттің орасан бөлігін оқып, тілдің өзін үйренеді.',
    },
  },
  {
    en: 'knowledge cutoff',
    kk: 'білім шегі',
    keepLatin: false,
    alt: 'оқыту деректерінің соңғы күні',
    group: 'ai-basics',
    def: {
      en: 'The date after which the model has read nothing, so newer libraries and events simply do not exist for it.',
      kk: 'Білім шегі — модель оқыған деректердің соңғы күні: одан кейін шыққан кітапхана да, жаңалық та ол үшін жоқ.',
    },
    example: {
      en: 'If the library is newer than the cutoff, paste its documentation into the prompt yourself.',
      kk: 'Кітапхана білім шегінен кейін шыққан болса, құжаттамасын промптқа өзің қос.',
    },
  },
  {
    en: 'frontier model',
    kk: 'алдыңғы қатарлы модель',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The strongest model a company currently offers, usually also the slowest and the most expensive.',
      kk: 'Алдыңғы қатарлы модель — компанияның қазіргі ең күшті моделі, әдетте ең баяу әрі ең қымбаты.',
    },
    example: {
      en: 'Today four or five labs have a frontier model, and they change places every few months.',
      kk: 'Бүгін алдыңғы қатарлы модель төрт-бес компанияда бар, олар бірнеше ай сайын орын ауыстырып тұрады.',
    },
  },
  {
    en: 'closed model',
    kk: 'жабық модель',
    keepLatin: false,
    alt: 'жабық салмақты модель',
    group: 'ai-basics',
    def: {
      en: 'A model whose weights stay private, so the only way to use it is through the company that made it.',
      kk: 'Жабық модель — салмақтары жарияланбаған модель: оны тек жасаған компания арқылы қолдануға болады.',
    },
    example: {
      en: 'A closed model is usually stronger; an open-weight one is usually more private.',
      kk: 'Жабық модель әдетте күштірек, ашық салмақты модель құпиярақ — таңдау тапсырмаға байланысты.',
    },
  },
  {
    en: 'model provider',
    kk: 'модель жеткізуші',
    keepLatin: false,
    alt: 'провайдер',
    group: 'ai-basics',
    def: {
      en: 'The company whose servers actually run the model you are talking to: Anthropic, OpenAI, Google, Mistral and others.',
      kk: 'Модель жеткізуші — сен сөйлесіп отырған модельді өз серверінде іске қосатын компания: Anthropic, OpenAI, Google, Mistral және басқалары.',
    },
    example: {
      en: 'Most tools let you change provider without rewriting a single prompt.',
      kk: 'Көп құралда бірде-бір промптты қайта жазбай, модель жеткізушіні ауыстыруға болады.',
    },
  },
  {
    en: 'transformer',
    kk: 'трансформер',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The internal design shared by almost every modern language model, which lets it weigh each word against all the others.',
      kk: 'Трансформер — қазіргі тілдік модельдердің дерлік бәріне ортақ ішкі құрылым: ол әр сөзді қалған сөздердің бәрімен салыстыра алады.',
    },
  },
  {
    en: 'prompt caching',
    kk: 'промптты кэштеу',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Storing the unchanged beginning of a prompt so that repeat requests come back cheaper and faster.',
      kk: 'Промптты кэштеу — промпттың өзгермейтін басын сақтап қою; содан кейінгі сұраулар арзан әрі жылдам болады.',
    },
    example: {
      en: 'Put the long standing instructions at the top, where they can be cached.',
      kk: 'Ұзын тұрақты нұсқауды промпттың басына қой — сонда ол кэштеледі.',
    },
  },
  {
    en: 'streaming',
    kk: 'ағынмен беру',
    keepLatin: false,
    avoid: 'стриминг',
    group: 'ai-basics',
    def: {
      en: 'Showing the answer token by token while it is still being written, instead of waiting for all of it.',
      kk: 'Ағынмен беру — жауаптың толық бітуін күтпей, жазылып жатқан күйінде токенмен көрсетіп отыру.',
    },
  },
  {
    en: 'input and output tokens',
    kk: 'кіріс және шығыс токендері',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'What you send counts as input tokens and what the model writes counts as output tokens, and output usually costs several times more.',
      kk: 'Кіріс токендері — сенің жібергенің, шығыс токендері — модельдің жазғаны; шығысы әдетте бірнеше есе қымбат.',
    },
    example: {
      en: 'A long file you paste in is charged as input tokens on every single turn.',
      kk: 'Қойып жіберген ұзын файл әр сұрау сайын қайта кіріс токені болып саналады.',
    },
  },
  {
    en: 'evaluation (eval)',
    kk: 'бағалау',
    keepLatin: false,
    alt: 'eval',
    group: 'ai-basics',
    def: {
      en: 'A repeatable test you run against a model or a prompt to see whether a change really helped.',
      kk: 'Бағалау — модельді немесе промптты тексеретін қайталанбалы сынақ: өзгеріс шынымен пайда берді ме, соны көрсетеді.',
    },
    example: {
      en: 'Without evals you are only guessing that the new prompt is better.',
      kk: 'Бағалау болмаса, жаңа промпт жақсы екенін тек болжап отырасың.',
    },
  },
  {
    en: 'non-determinism',
    kk: 'нәтиженің тұрақсыздығы',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The same prompt can give a different answer each time, because the model picks its tokens with a little randomness.',
      kk: 'Нәтиженің тұрақсыздығы — бір промпт әр жолы басқаша жауап беруі мүмкін, өйткені модель токенді аздап кездейсоқ таңдайды.',
    },
    example: {
      en: 'It worked once, so run it again before you decide it is fixed.',
      kk: 'Бір рет істеп кетсе, «бітті» деме — тағы бір рет іске қосып көр.',
    },
  },
  {
    en: 'AI assistant',
    kk: 'ЖИ-көмекші',
    keepLatin: false,
    alt: 'ассистент',
    avoid: 'ИИ-ассистент',
    group: 'ai-basics',
    def: {
      en: 'A chat-shaped AI that answers and drafts for you but does nothing on your computer by itself.',
      kk: 'ЖИ-көмекші — сұрағыңа жауап беріп, мәтін жазып беретін, бірақ компьютеріңде өз бетінше ештеңе істемейтін ЖИ.',
    },
    example: {
      en: 'An assistant suggests, an agent goes and does it.',
      kk: 'ЖИ-көмекші ұсыныс береді, ал агент барып өзі істейді.',
    },
  },
  {
    en: 'AI literacy',
    kk: 'ЖИ сауаттылығы',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Knowing what these tools can and cannot do, and checking what they produce instead of trusting it.',
      kk: 'ЖИ сауаттылығы — бұл құралдардың нені істей алатынын, нені істей алмайтынын біліп, шығарған нәтижесіне сене салмай тексеру дағдысы.',
    },
    example: {
      en: 'AI literacy is now as basic a skill as using a search engine.',
      kk: 'Бүгін ЖИ сауаттылығы іздеу жүйесін қолдана білу сияқты негізгі дағдыға айналды.',
    },
  },
  {
    en: 'bias',
    kk: 'бейімділік',
    keepLatin: false,
    alt: 'жүйелі ауытқу',
    group: 'ai-basics',
    def: {
      en: 'A lopsided pattern a model picked up from its training data and quietly repeats in its answers.',
      kk: 'Бейімділік — модельдің оқыған деректерінен жұққан, жауабында байқатпай қайталанатын біржақтылық.',
    },
    example: {
      en: 'A model has read far more English than Kazakh, and that shows.',
      kk: 'Модель қазақшадан әлдеқайда көп ағылшын мәтінін оқыған, ол жауабынан білініп тұрады.',
    },
  },
  {
    en: 'AI safety',
    kk: 'ЖИ қауіпсіздігі',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'The work of making a model refuse harmful requests and behave predictably once it is given real power.',
      kk: 'ЖИ қауіпсіздігі — модельді зиянды сұраудан бас тартатын, нақты билік берілгенде болжауға болатындай әрекет ететін етіп жасау жұмысы.',
    },
  },
  {
    en: 'GPU',
    kk: 'GPU',
    keepLatin: true,
    alt: 'графикалық процессор',
    avoid: 'видеокарта',
    group: 'ai-basics',
    def: {
      en: 'The chip that does the heavy parallel arithmetic behind training and running models.',
      kk: 'GPU — модельді оқыту мен іске қосудың артында тұрған ауыр есептеуді қатарынан орындайтын чип.',
    },
    example: {
      en: 'A local model runs on your GPU; a hosted one runs on someone else’s.',
      kk: 'Жергілікті модель сенің GPU құрылғыңда, бұлттағы модель басқа біреудің GPU құрылғысында істейді.',
    },
  },
  {
    en: 'speech to text',
    kk: 'дауысты мәтінге айналдыру',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Turning what you say out loud into text the model can read.',
      kk: 'Дауысты мәтінге айналдыру — ауызша айтқаныңды модель оқитын мәтінге көшіру.',
    },
    example: {
      en: 'Dictating a long prompt is usually faster than typing it.',
      kk: 'Ұзын промптты теріп отырғаннан гөрі айтып жіберген жылдам.',
    },
  },
  {
    en: 'image model',
    kk: 'сурет жасайтын модель',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'A model that produces pictures from a written description instead of producing text.',
      kk: 'Сурет жасайтын модель — мәтін жазудың орнына сипаттама бойынша сурет шығаратын модель.',
    },
    example: {
      en: 'Use an image model for the logo and a language model for the code.',
      kk: 'Логотипке сурет жасайтын модельді, кодқа тілдік модельді қолдан.',
    },
  },
  {
    en: 'agent',
    kk: 'агент',
    keepLatin: false,
    alt: 'ЖИ-агент',
    avoid: 'ИИ-агент',
    group: 'agents',
    def: {
      en: 'An AI that does not just answer but works in a loop: it decides, uses tools, checks the result and keeps going until the task is done.',
      kk: 'Агент — жай жауап бермей, цикл ішінде жұмыс істейтін ЖИ: шешім қабылдайды, құрал қолданады, нәтижені тексереді және тапсырма біткенше жалғастыра береді.',
    },
    example: {
      en: 'Tell an agent the goal, not which keys to press.',
      kk: 'Агентке қандай түйме басу керегін емес, қандай мақсатқа жету керегін айт.',
    },
  },
  {
    en: 'coding agent',
    kk: 'кодтау агенті',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'An agent that can read your project, write files, run commands and see the errors it has just caused.',
      kk: 'Кодтау агенті — жобаңды оқып, файл жазып, пәрмен орындап, өзі шығарған қатені көре алатын агент.',
    },
    example: {
      en: 'Claude Code, Codex, Gemini CLI, Cursor and Copilot are all coding agents, so try more than one.',
      kk: 'Claude Code, Codex, Gemini CLI, Cursor, Copilot — бәрі кодтау агенті, сондықтан біреуімен шектелме, бірнешеуін байқап көр.',
    },
  },
  {
    en: 'tool',
    kk: 'құрал',
    keepLatin: false,
    avoid: 'инструмент',
    group: 'agents',
    def: {
      en: 'Anything an agent is allowed to call: reading a file, running a command, searching the web, asking a database.',
      kk: 'Құрал — агентке шақыруға рұқсат етілген кез келген әрекет: файл оқу, пәрмен орындау, интернеттен іздеу, дерекқорға сұрау жіберу.',
    },
  },
  {
    en: 'skill',
    kk: 'skill',
    keepLatin: true,
    alt: 'дағды',
    group: 'agents',
    def: {
      en: 'A folder of instructions and files an agent loads only when a task needs them, which keeps the context small.',
      kk: 'Skill — агент тапсырма талап еткенде ғана жүктейтін нұсқау мен файл жинағы; сол себепті контекст артық толып кетпейді.',
    },
    example: {
      en: 'Put the deploy steps your team repeats into a skill instead of into every prompt.',
      kk: 'Командаң қайталай беретін deploy қадамдарын әр промптқа емес, бір skill ішіне жаз.',
    },
  },
  {
    en: 'auto-accept',
    kk: 'автоматты мақұлдау',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Letting the agent apply its changes without asking you each time, which is fast and is also how people lose work.',
      kk: 'Автоматты мақұлдау — агентке әр өзгерісті сұрамай қолдануға рұқсат беру: жылдам, әрі жұмысынан айырылудың ең жиі себебі.',
    },
    example: {
      en: 'Do not switch auto-accept on before the work is committed.',
      kk: 'Жұмысты commit жасамай тұрып автоматты мақұлдауды қоспа.',
    },
  },
  {
    en: 'background agent',
    kk: 'фондық агент',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'An agent that keeps working on its own while you do something else and reports back when it is finished.',
      kk: 'Фондық агент — сен басқа іспен айналысып жүргенде өз бетінше жұмыс істеп, біткен соң хабарлайтын агент.',
    },
    example: {
      en: 'Send the boring cleanup to a background agent and carry on with the feature.',
      kk: 'Ұсақ тазалау жұмысын фондық агентке бер де, өзің негізгі мүмкіндікті жалғастыра бер.',
    },
  },
  {
    en: 'agent instructions file (CLAUDE.md, AGENTS.md)',
    kk: 'агент нұсқаулары файлы',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A file at the root of the project that every agent reads first: how to run the code, what the rules are, what it must never touch.',
      kk: 'Агент нұсқаулары файлы — жобаның түбірінде жатқан, әр агент ең алдымен оқитын файл: кодты қалай іске қосу керегі, қандай ереже бар, неге мүлде тиіспеу керегі жазылады.',
    },
    example: {
      en: 'Write CLAUDE.md in English and keep it short, because every session pays for it in tokens.',
      kk: 'CLAUDE.md файлын ағылшынша әрі қысқа жаз: оның ақысы әр сеанста токенмен төленеді.',
    },
  },
  {
    en: 'autonomy',
    kk: 'дербестік',
    keepLatin: false,
    alt: 'автономдық',
    group: 'agents',
    def: {
      en: 'How far an agent may go on its own before it has to come back and ask you.',
      kk: 'Дербестік — агенттің сенен сұрамай қаншалық алға жүре алатыны.',
    },
    example: {
      en: 'Raise autonomy only where a mistake is cheap to undo.',
      kk: 'Қатені түзету арзанға түсетін жерде ғана дербестікті арттыр.',
    },
  },
  {
    en: 'guardrail',
    kk: 'қорғаныс шегі',
    keepLatin: false,
    alt: 'шектеу',
    group: 'agents',
    def: {
      en: 'A rule set in advance that stops an agent doing damage even when its reasoning goes wrong.',
      kk: 'Қорғаныс шегі — пайымы қате кеткен жағдайда да агентті зиян келтіруден тоқтататын, алдын ала қойылған ереже.',
    },
    example: {
      en: 'Never handing the agent production credentials is exactly such a guardrail.',
      kk: 'Агентке production ортасының кілтін мүлде бермеу — дәл сондай қорғаныс шегі.',
    },
  },
  {
    en: 'AI editor',
    kk: 'ЖИ редакторы',
    keepLatin: false,
    alt: 'AI IDE',
    group: 'agents',
    def: {
      en: 'A code editor with an agent built in, such as Cursor, Windsurf or VS Code with Copilot, which sees your open files and edits them in place.',
      kk: 'ЖИ редакторы — ішіне агент орнатылған код редакторы (Cursor, Windsurf, Copilot қосылған VS Code): ашық тұрған файлдарыңды көріп, сол жерде өзгертеді.',
    },
    example: {
      en: 'Give one task to a terminal agent and the same task to an AI editor: they feel completely different.',
      kk: 'Бір тапсырманы терминалдағы агентке де, ЖИ редакторына да бер — екеуі мүлде басқаша сезіледі.',
    },
  },
  {
    en: 'CLI agent (terminal agent)',
    kk: 'терминалдағы агент',
    keepLatin: false,
    alt: 'CLI агенті',
    group: 'agents',
    def: {
      en: 'An agent you run in the terminal, where it reaches your project exactly as far as you do: Claude Code, Codex CLI, Gemini CLI, opencode.',
      kk: 'Терминалдағы агент — терминалда іске қосылатын, жобаңа дәл сендей қол жеткізе алатын агент: Claude Code, Codex CLI, Gemini CLI, opencode.',
    },
    example: {
      en: 'A terminal agent can run your tests, which is how it finds its own mistakes.',
      kk: 'Терминалдағы агент тестті өзі іске қоса алады, сондықтан өз қатесін өзі тауып алады.',
    },
  },
  {
    en: 'AI app builder',
    kk: 'ЖИ қолданба құрастырғышы',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'A site where you describe an app in a chat box and it is built, published and given a link for you: Lovable, v0, Replit, Bolt.',
      kk: 'ЖИ қолданба құрастырғышы — чат терезесіне сипаттап жазсаң, қолданбаны өзі жасап, интернетке шығарып, сілтемесін беретін сайт: Lovable, v0, Replit, Bolt.',
    },
    example: {
      en: 'Start the idea in a builder, then move the code into your own repo when it gets serious.',
      kk: 'Идеяны құрастырғыштан баста, жоба байыпты түрге енгенде кодты өз репозиторийіңе көшір.',
    },
  },
  {
    en: 'inline autocomplete',
    kk: 'автотолтыру',
    keepLatin: false,
    avoid: 'автозаполнение',
    group: 'agents',
    def: {
      en: 'The grey suggestion that appears as you type and finishes the line for you.',
      kk: 'Автотолтыру — теріп отырғанда шығып, жолды аяқтап беретін сұр ұсыныс.',
    },
    example: {
      en: 'Autocomplete guesses the next line; an agent handles the whole task.',
      kk: 'Автотолтыру келесі жолды болжайды, ал агент бүкіл тапсырманы атқарады.',
    },
  },
  {
    en: 'switching models',
    kk: 'модель ауыстыру',
    keepLatin: false,
    group: 'agents',
    def: {
      en: 'Running the same task on a different model to find out which one actually suits it.',
      kk: 'Модель ауыстыру — бір тапсырманы басқа модельге беріп көру: қайсысы шынымен келетінін содан білесің.',
    },
    example: {
      en: 'If one model keeps failing on a bug, hand it to another before you rewrite the prompt.',
      kk: 'Бір модель қатені шеше алмай жатса, промптты қайта жазбай тұрып тапсырманы басқа модельге бер.',
    },
  },
  {
    en: 'workflow',
    kk: 'жұмыс ағыны',
    keepLatin: false,
    avoid: 'воркфлоу',
    group: 'agents',
    def: {
      en: 'A fixed sequence of steps you wrote yourself, where the model fills in the parts but does not choose the order.',
      kk: 'Жұмыс ағыны — өзің жазған тұрақты қадамдар тізбегі: модель бөліктерін толтырады, бірақ ретін өзі таңдамайды.',
    },
    example: {
      en: 'If you already know the steps, write a workflow, not an agent.',
      kk: 'Қадамдарды өзің біліп тұрсаң, агент емес, жұмыс ағынын жаз.',
    },
  },
  {
    en: 'few-shot prompting',
    kk: 'few-shot',
    keepLatin: true,
    alt: 'мысалмен көрсету',
    group: 'prompting',
    def: {
      en: 'Putting two or three finished examples in the prompt so the model copies their pattern.',
      kk: 'Few-shot — промптқа екі-үш дайын мысал қосу; модель сол үлгіні ұстанып жалғастырады.',
    },
    example: {
      en: 'Instead of describing the format you want, show two examples: that is few-shot.',
      kk: 'Қалаған пішімді сипаттап жатпай, екі мысал көрсет — бұл few-shot тәсілі.',
    },
  },
  {
    en: 'zero-shot prompting',
    kk: 'zero-shot',
    keepLatin: true,
    alt: 'мысалсыз промпт',
    group: 'prompting',
    def: {
      en: 'Asking for the job with no examples at all, just the instruction itself.',
      kk: 'Zero-shot — бірде-бір мысал бермей, тапсырманың өзін ғана жазу.',
    },
    example: {
      en: 'Start zero-shot and add examples only when the answer misses the mark.',
      kk: 'Алдымен zero-shot тәсілімен сұра, жауап көңілден шықпаса ғана мысал қос.',
    },
  },
  {
    en: 'chain of thought',
    kk: 'ойлау тізбегі',
    keepLatin: false,
    alt: 'chain of thought',
    group: 'prompting',
    def: {
      en: 'Asking the model to work through the steps before it gives the answer, which helps a lot on hard problems.',
      kk: 'Ойлау тізбегі — модельден жауапты бірден емес, қадамдарын жазып барып беруді сұрау; қиын есепте көп көмектеседі.',
    },
    example: {
      en: 'Write "think step by step first, then answer".',
      kk: '«Алдымен қадамдап ойлан, содан кейін жауап бер» деп жаз.',
    },
  },
  {
    en: 'role prompt',
    kk: 'рөлдік промпт',
    keepLatin: false,
    alt: 'role prompt',
    group: 'prompting',
    def: {
      en: 'Opening the prompt by telling the model who to be, which changes its tone and how deep it goes.',
      kk: 'Рөлдік промпт — модельге кім болу керегін айтып бастау; содан жауаптың мәнері мен тереңдігі өзгереді.',
    },
    example: {
      en: '"You are an experienced backend developer" gives a different answer than no role at all.',
      kk: '«Сен тәжірибелі backend әзірлеушісің» деп бастасаң, жауап мүлде басқаша шығады.',
    },
  },
  {
    en: 'master prompt',
    kk: 'негізгі промпт',
    keepLatin: false,
    alt: 'master prompt',
    group: 'prompting',
    def: {
      en: 'One long prompt you write carefully once and reuse for every task of the same kind.',
      kk: 'Негізгі промпт — бір рет мұқият жазып алып, сол тектес тапсырманың бәріне қайта қолданатын ұзын промпт.',
    },
    example: {
      en: 'Keep your master prompt in a file instead of retyping it every time.',
      kk: 'Негізгі промптыңды файлға сақтап қой, әр жолы қайта теріп отырма.',
    },
  },
  {
    en: 'output format',
    kk: 'шығыс пішімі',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Saying exactly what shape the answer must take: a table, JSON, five bullet points, one file.',
      kk: 'Шығыс пішімі — жауап қандай түрде болу керегін нақты айту: кесте, JSON, бес тармақ немесе бір файл.',
    },
    example: {
      en: 'Name the output format and you stop getting an essay where you wanted a list.',
      kk: 'Шығыс пішімін нақты айтсаң, тізім сұрағанда шығарма алып отырмайсың.',
    },
  },
  {
    en: 'spec (specification)',
    kk: 'спецификация',
    keepLatin: false,
    alt: 'техникалық сипаттама',
    avoid: 'ТЗ',
    group: 'prompting',
    def: {
      en: 'A short written description of what has to be built, precise enough that two people would build the same thing.',
      kk: 'Спецификация — не жасалу керегін қысқаша жазып қою; екі адам оқып, бірдей нәрсе жасайтындай нақты болғаны жөн.',
    },
    example: {
      en: 'Write the spec first and the agent stops guessing.',
      kk: 'Алдымен спецификация жаз — сонда агент болжаумен отырмайды.',
    },
  },
  {
    en: 'BRD (business requirements document)',
    kk: 'BRD',
    keepLatin: true,
    alt: 'бизнес талаптарының құжаты',
    group: 'prompting',
    def: {
      en: 'A document saying why the business wants this at all and what it expects to gain from it.',
      kk: 'BRD — бизнес талаптарының құжаты: компанияға бұл не үшін керек және одан не ұтады.',
    },
    example: {
      en: 'The BRD answers "why", the PRD answers "what".',
      kk: 'BRD құжаты «неге» дегенге жауап береді, PRD «нені» дегенге.',
    },
  },
  {
    en: 'requirement',
    kk: 'талап',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'One thing the product must do, written so that you can check it later.',
      kk: 'Талап — өнім міндетті түрде істейтін бір нәрсе; кейін тексеруге келетіндей етіп жазылады.',
    },
    example: {
      en: '"Make it fast" is not a requirement; "the page opens in under two seconds" is.',
      kk: '«Жылдам болсын» — талап емес; «бет екі секундтан аз уақытта ашылады» — талап.',
    },
  },
  {
    en: 'definition of done',
    kk: 'дайындық шарты',
    keepLatin: false,
    alt: 'definition of done',
    group: 'prompting',
    def: {
      en: 'A shared answer to the question "when is this actually done?": tested, reviewed, deployed, written down.',
      kk: 'Дайындық шарты — «бұл жұмыс қашан шынымен бітті?» дегенге берілген ортақ жауап: тексерілді, қаралды, шығарылды, жазылды.',
    },
    example: {
      en: 'Without a definition of done, everything stays 90% finished forever.',
      kk: 'Дайындық шарты болмаса, бәрі мәңгі «90% дайын» күйінде қалады.',
    },
  },
  {
    en: 'scope creep',
    kk: 'ауқымның ұлғайып кетуі',
    keepLatin: false,
    alt: 'scope creep',
    group: 'prompting',
    def: {
      en: 'The quiet growth of a task as "just one more small thing" keeps getting added to it.',
      kk: 'Ауқымның ұлғайып кетуі — «тағы бір ғана кішкене нәрсе» деп қосыла бергеннен тапсырманың байқаусызда өсуі.',
    },
    example: {
      en: 'A demo that never ships is usually scope creep, not a hard problem.',
      kk: 'Шықпай қалған демоның себебі — көбіне қиын мәселе емес, ауқымның ұлғайып кетуі.',
    },
  },
  {
    en: 'constraint',
    kk: 'шектеу',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A limit you accept on purpose: a deadline, a budget, one page only, no paid services.',
      kk: 'Шектеу — әдейі қабылдайтын шек: мерзім, бюджет, «тек бір бет», «ақылы қызмет жоқ».',
    },
    example: {
      en: 'Tell the agent your constraints or it will invent its own.',
      kk: 'Шектеулеріңді агентке алдын ала айт, әйтпесе ол өзінікін ойлап табады.',
    },
  },
  {
    en: 'edge case',
    kk: 'шеткі жағдай',
    keepLatin: false,
    alt: 'edge case',
    group: 'prompting',
    def: {
      en: 'A rare but real situation at the edge of normal use: an empty list, a very long name, no internet.',
      kk: 'Шеткі жағдай — сирек, бірақ шын болатын жағдай: бос тізім, тым ұзын атау, интернеттің жоқтығы.',
    },
    example: {
      en: 'Ask for the edge cases first: that is where the bugs live.',
      kk: 'Алдымен шеткі жағдайларды сұра — қате көбіне соларда жатады.',
    },
  },
  {
    en: 'user story',
    kk: 'пайдаланушы тарихы',
    keepLatin: false,
    avoid: 'юзер-стори',
    group: 'product',
    def: {
      en: 'One sentence naming who wants what and why: as a student I want X so that Y.',
      kk: 'Пайдаланушы тарихы — кім, нені, не үшін қалайтынын бір сөйлеммен жазу: «студент ретінде мен … қалаймын, себебі …».',
    },
    example: {
      en: 'Turn each user story into one task for the agent.',
      kk: 'Әр пайдаланушы тарихын агентке берілетін бір тапсырмаға айналдыр.',
    },
  },
  {
    en: 'jobs to be done',
    kk: 'шешілетін міндет',
    keepLatin: false,
    alt: 'jobs to be done',
    group: 'product',
    def: {
      en: 'The idea that a person "hires" your product to get one specific job done in their life.',
      kk: 'Шешілетін міндет — адам сенің өніміңді өз өміріндегі нақты бір істі тындыру үшін «жалдайды» деген көзқарас.',
    },
    example: {
      en: 'Nobody wants a note app; they want to stop forgetting things.',
      kk: 'Ешкім жазба қолданбасын қаламайды — ұмытпауды қалайды.',
    },
  },
  {
    en: 'persona',
    kk: 'пайдаланушы бейнесі',
    keepLatin: false,
    alt: 'персона',
    group: 'product',
    def: {
      en: 'A short portrait of one typical user, built from real conversations rather than from imagination.',
      kk: 'Пайдаланушы бейнесі — ойдан шығарылмай, шын әңгімелерден құралған бір типтік пайдаланушының қысқаша портреті.',
    },
    example: {
      en: 'Build for one persona: building for everyone reaches nobody.',
      kk: 'Бір пайдаланушы бейнесіне қарап жаса; бәріне арнағаның ешкімге жетпейді.',
    },
  },
  {
    en: 'user journey',
    kk: 'пайдаланушы жолы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The whole path a person takes, from first hearing about your product to using it every week.',
      kk: 'Пайдаланушы жолы — адамның өнім туралы алғаш естіген сәтінен бастап, оны апта сайын қолданғанға дейінгі бүкіл жолы.',
    },
    example: {
      en: 'Walk the journey yourself on a phone before you show it to anyone.',
      kk: 'Біреуге көрсетер алдында сол жолды телефоннан өзің өтіп шық.',
    },
  },
  {
    en: 'target audience',
    kk: 'мақсатты аудитория',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The specific group of people this product is made for.',
      kk: 'Мақсатты аудитория — өнімнің нақты кімге арналғаны.',
    },
    example: {
      en: '"Everyone" is not a target audience.',
      kk: '«Барлығы» деген — мақсатты аудитория емес.',
    },
  },
  {
    en: 'problem statement',
    kk: 'мәселенің тұжырымы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'One or two sentences saying whose problem this is, when it happens and why it hurts.',
      kk: 'Мәселенің тұжырымы — бұл кімнің мәселесі, қашан кездеседі және неге ауыр екенін бір-екі сөйлеммен айту.',
    },
    example: {
      en: 'Start every project with the problem statement, not with the technology.',
      kk: 'Әр жобаны технологиядан емес, мәселенің тұжырымынан баста.',
    },
  },
  {
    en: 'changelog',
    kk: 'өзгерістер журналы',
    keepLatin: false,
    alt: 'changelog',
    group: 'product',
    def: {
      en: 'A dated list of what changed in each version, written for the people who use the product.',
      kk: 'Өзгерістер журналы — әр нұсқада не өзгергенін күнімен жазып отыратын тізім; өнімді қолданатын адамға арналады.',
    },
    example: {
      en: 'Two lines per release are enough to show the product is alive.',
      kk: 'Әр шығарылымға екі жол жазғаның да пайдаланушыға өнімнің тірі екенін сездіреді.',
    },
  },
  {
    en: 'trade-off',
    kk: 'айырбас',
    keepLatin: false,
    alt: 'trade-off',
    avoid: 'трейд-офф',
    group: 'product',
    def: {
      en: 'Gaining one thing by giving up another: speed for features, simplicity for power.',
      kk: 'Айырбас — бірдеңені алу үшін екіншісінен бас тарту: мүмкіндік есебінен жылдамдық, қуат есебінен қарапайымдылық.',
    },
    example: {
      en: 'Say the trade-off out loud and it becomes a decision instead of an accident.',
      kk: 'Айырбасты дауыстап айт — сонда ол кездейсоқтық емес, саналы шешім болады.',
    },
  },
  {
    en: 'stakeholder',
    kk: 'мүдделі тарап',
    keepLatin: false,
    avoid: 'стейкхолдер',
    group: 'product',
    def: {
      en: 'Anyone whose interests the project touches: the user, the customer, the teacher, the investor.',
      kk: 'Мүдделі тарап — жоба мүддесіне тиетін кез келген адам: пайдаланушы, тапсырыс беруші, оқытушы, инвестор.',
    },
    example: {
      en: 'Show the stakeholders a working demo, not a slide.',
      kk: 'Мүдделі тараптарға слайд емес, істеп тұрған демо көрсет.',
    },
  },
  {
    en: 'validation',
    kk: 'идеяны тексеру',
    keepLatin: false,
    alt: 'валидация',
    group: 'product',
    def: {
      en: 'Checking with real people that the thing you plan to build is actually wanted, before you build it.',
      kk: 'Идеяны тексеру — жасамақ болған нәрсеңнің шынымен керек екенін жасар алдында адамдардан сұрап білу.',
    },
    example: {
      en: 'Ten conversations before ten thousand lines of code.',
      kk: 'Он мың жол код жазбас бұрын он адаммен сөйлес.',
    },
  },
  {
    en: 'feedback loop',
    kk: 'кері байланыс айналымы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The repeating cycle of ship, watch, listen, change: the shorter it is, the faster you learn.',
      kk: 'Кері байланыс айналымы — шығару, бақылау, тыңдау, өзгерту деген қайталанатын айналым; ол неғұрлым қысқа болса, соғұрлым тез үйренесің.',
    },
    example: {
      en: 'A one-day feedback loop teaches more than a one-month plan.',
      kk: 'Бір күндік кері байланыс айналымы бір айлық жоспардан көп үйретеді.',
    },
  },
  {
    en: 'retention',
    kk: 'пайдаланушыны ұстап қалу',
    keepLatin: false,
    alt: 'retention',
    avoid: 'удержание',
    group: 'product',
    def: {
      en: 'The share of people who come back and keep using the product after the first time.',
      kk: 'Пайдаланушыны ұстап қалу — бір рет көргеннен кейін қайта оралып, өнімді қолдана беретін адамдардың үлесі.',
    },
    example: {
      en: 'A hundred sign-ups mean little if only ten people come back.',
      kk: 'Жүз адам тіркелгенмен, қайта оралғаны он болса, оның мәні аз.',
    },
  },
  {
    en: 'churn',
    kk: 'пайдаланушының кетуі',
    keepLatin: false,
    alt: 'churn',
    avoid: 'отток',
    group: 'product',
    def: {
      en: 'The share of users who stop using the product over a given period.',
      kk: 'Пайдаланушының кетуі — белгілі бір уақыт ішінде өнімді қолдануды тоқтатқандардың үлесі.',
    },
    example: {
      en: 'Ask the ones who left why: they answer more honestly.',
      kk: 'Кеткендерден себебін сұра — олар шынын ашығырақ айтады.',
    },
  },
  {
    en: 'product-market fit',
    kk: 'өнім мен нарықтың сәйкестігі',
    keepLatin: false,
    alt: 'product-market fit (PMF)',
    group: 'product',
    def: {
      en: 'The point where enough people want what you built that they come back without being asked.',
      kk: 'Өнім мен нарықтың сәйкестігі — жасағаныңды қалайтын адам жеткілікті болып, олар сұратпай-ақ қайта оралатын сәт.',
    },
    example: {
      en: 'You can feel product-market fit: people complain the moment it breaks.',
      kk: 'Өнім мен нарық сәйкескенін сезесің: өнім бұзылса, адамдар бірден шағымданады.',
    },
  },
  {
    en: 'pivot',
    kk: 'бағытты бұру',
    keepLatin: false,
    alt: 'pivot',
    avoid: 'пивот',
    group: 'product',
    def: {
      en: 'Changing the idea while keeping what you learned, because the first version did not find its users.',
      kk: 'Бағытты бұру — бірінші нұсқа өз адамын таппағанда, үйренгеніңді сақтап қалып, идеяны өзгерту.',
    },
    example: {
      en: 'A pivot is not a failure; refusing to pivot usually is.',
      kk: 'Бағытты бұру — сәтсіздік емес; бұрмай қою көбіне сәтсіздік.',
    },
  },
  {
    en: 'onboarding',
    kk: 'алғашқы таныстыру',
    keepLatin: false,
    alt: 'onboarding',
    avoid: 'онбординг',
    group: 'product',
    def: {
      en: 'The first few minutes a new user spends with your product, from opening it to getting one useful result.',
      kk: 'Алғашқы таныстыру — жаңа пайдаланушының өнімді ашқаннан бастап, бірінші пайдалы нәтижені алғанға дейінгі алғашқы бірнеше минуты.',
    },
    example: {
      en: 'If the first result takes more than a minute, most people leave.',
      kk: 'Бірінші нәтиже бір минуттан көп уақыт алса, адамдардың көбі кетіп қалады.',
    },
  },
  {
    en: 'directory',
    kk: 'каталог',
    keepLatin: false,
    alt: 'қалта',
    avoid: 'папка',
    group: 'code-basics',
    def: {
      en: 'A named place that holds files and other directories inside it.',
      kk: 'Каталог — ішінде файлдар мен басқа каталогтар тұратын, аты бар орын.',
    },
    example: {
      en: 'Check which directory you are in with the pwd command.',
      kk: 'Қай каталогта тұрғаныңды pwd пәрменімен тексер.',
    },
  },
  {
    en: 'folder',
    kk: 'қалта',
    keepLatin: false,
    avoid: 'папка',
    group: 'code-basics',
    def: {
      en: 'The same thing as a directory, seen on screen as an icon you can open.',
      kk: 'Қалта — каталогтың дәл өзі, бірақ экранда ашылатын белгіше түрінде көрінетіні.',
    },
  },
  {
    en: 'code',
    kk: 'код',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The text a person or an AI writes to tell a computer exactly what to do.',
      kk: 'Код — компьютерге не істеу керегін дәл айту үшін жазылатын мәтін.',
    },
  },
  {
    en: 'integer',
    kk: 'бүтін сан',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A whole number with nothing after the decimal point: 0, 7, -3.',
      kk: 'Бүтін сан — үтірден кейінгі бөлшегі жоқ сан: 0, 7, -3.',
    },
  },
  {
    en: 'node_modules',
    kk: 'node_modules',
    keepLatin: true,
    group: 'code-basics',
    def: {
      en: 'The folder holding every package a JavaScript project downloaded; it grows huge and is never saved into git.',
      kk: 'node_modules — JavaScript жобасы жүктеп алған пакеттердің бәрі жататын қалта; ол қатты үлкейеді әрі git-ке ешқашан сақталмайды.',
    },
    example: {
      en: 'When something breaks, delete node_modules and run npm install again.',
      kk: 'Бірдеңе бұзылса, node_modules қалтасын өшіріп, npm install пәрменін қайта орында.',
    },
  },
  {
    en: 'run',
    kk: 'іске қосу',
    keepLatin: false,
    avoid: 'запустить ету',
    group: 'code-basics',
    def: {
      en: 'Making the computer actually carry out a program or a command.',
      kk: 'Іске қосу — бағдарламаны немесе пәрменді компьютерге нақты орындату.',
    },
  },
  {
    en: 'runtime',
    kk: 'орындалу уақыты',
    keepLatin: false,
    alt: 'runtime',
    group: 'code-basics',
    def: {
      en: 'The time while the program is actually running, as opposed to while it is being written.',
      kk: 'Орындалу уақыты — бағдарлама жазылып жатқан кез емес, нақты жұмыс істеп тұрған кез.',
    },
    example: {
      en: 'A syntax error shows up at once; a runtime error waits until a user hits it.',
      kk: 'Синтаксис қатесі бірден көрінеді, ал орындалу уақытындағы қате пайдаланушы тап болғанша тығылып жатады.',
    },
  },
  {
    en: 'debugger',
    kk: 'жөндеуші',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'A tool that stops a program in the middle so you can look at what it is doing.',
      kk: 'Жөндеуші — бағдарламаны ортасынан тоқтатып, не істеп жатқанын қарауға мүмкіндік беретін құрал.',
    },
  },
  {
    en: 'call stack',
    kk: 'шақырулар стегі',
    keepLatin: false,
    group: 'code-basics',
    def: {
      en: 'The chain of functions that are waiting on each other at this moment.',
      kk: 'Шақырулар стегі — дәл қазір бірін-бірі күтіп тұрған функциялардың тізбегі.',
    },
  },
  {
    en: 'repository (repo)',
    kk: 'репозиторий',
    keepLatin: false,
    alt: 'код қоймасы',
    avoid: 'хранилище',
    group: 'git',
    def: {
      en: 'One project as git sees it: all its files plus their entire history.',
      kk: 'Репозиторий — git көзімен қарағандағы бір жоба: бүкіл файлы және солардың толық тарихы.',
    },
    example: {
      en: 'Make a repository for every project, even a one-evening one.',
      kk: 'Бір кештік жоба болса да, әрқайсысына бөлек репозиторий аш.',
    },
  },
  {
    en: 'rebase',
    kk: 'rebase',
    keepLatin: true,
    group: 'git',
    def: {
      en: 'Replaying your commits on top of the newest version of another branch, so the history stays a straight line.',
      kk: 'Rebase — өз commit-теріңді басқа тармақтың ең жаңа нұсқасының үстіне қайта қою; сонда тарих түзу сызық болып қалады.',
    },
    example: {
      en: 'Rebase before you open a pull request, not after someone reviewed it.',
      kk: 'Pull request ашар алдында rebase жаса, біреу оқып шыққан соң жасама.',
    },
  },
  {
    en: 'tag (git)',
    kk: 'тег',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'A permanent label on one commit, used to mark a released version.',
      kk: 'Тег — бір commit-ке қойылатын тұрақты белгі; әдетте шыққан нұсқаны белгілеу үшін қойылады.',
    },
    example: {
      en: 'Tag the commit you demoed as v1.0.',
      kk: 'Көрсеткен нұсқаңның commit-іне v1.0 тегін қой.',
    },
  },
  {
    en: 'commit history',
    kk: 'commit тарихы',
    keepLatin: true,
    alt: 'тарих',
    group: 'git',
    def: {
      en: 'The full list of commits, from the very first one up to now.',
      kk: 'Commit тарихы — алғашқысынан бүгінгіге дейінгі барлық commit тізімі.',
    },
  },
  {
    en: 'license',
    kk: 'лицензия',
    keepLatin: false,
    group: 'git',
    def: {
      en: 'The text saying what other people are allowed to do with your code.',
      kk: 'Лицензия — өзгелердің сенің кодыңмен не істеуге құқылы екенін айтатын мәтін.',
    },
  },
  {
    en: 'DOM',
    kk: 'DOM',
    keepLatin: true,
    alt: 'беттің құрылымы',
    group: 'web',
    def: {
      en: 'The live tree of elements the browser builds out of your HTML, which code can then change.',
      kk: 'DOM — браузер HTML-ден құрастыратын, кейін код өзгерте алатын элементтердің тірі ағашы.',
    },
    example: {
      en: 'JavaScript updates the page by changing the DOM.',
      kk: 'JavaScript бетті DOM-ды өзгерту арқылы жаңартады.',
    },
  },
  {
    en: 'state',
    kk: 'күй',
    keepLatin: false,
    alt: 'state',
    group: 'web',
    def: {
      en: 'The data an interface is holding right now: what is typed in, which tab is open, whether it is still loading.',
      kk: 'Күй — интерфейстің дәл қазір есінде тұрған деректері: не терілгені, қай қойынды ашық екені, әлі жүктеліп жатқаны.',
    },
    example: {
      en: 'Most interface bugs are really bugs in the state.',
      kk: 'Интерфейстегі қателердің көбі — шын мәнінде күйдегі қате.',
    },
  },
  {
    en: 'routing',
    kk: 'маршруттау',
    keepLatin: false,
    alt: 'бет мекенжайлары',
    group: 'web',
    def: {
      en: 'The rules that decide which page a visitor gets for each address on your site.',
      kk: 'Маршруттау — сайттағы әр мекенжайға қай бет ашылатынын шешетін ереже.',
    },
    example: {
      en: 'The address /about has to open the about page — that is routing.',
      kk: '/about мекенжайы «жоба туралы» бетін ашуы керек — маршруттау деген осы.',
    },
  },
  {
    en: 'REST API',
    kk: 'REST API',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The most common style of API, where each address stands for one thing and the verb says what to do with it.',
      kk: 'REST API — ең жиі кездесетін API түрі: әр мекенжай бір нәрсені білдіреді, ал етістік сол нәрсемен не істейтінін айтады.',
    },
  },
  {
    en: 'HTTP',
    kk: 'HTTP',
    keepLatin: true,
    group: 'web',
    def: {
      en: 'The rules a browser and a server follow whenever they talk to each other.',
      kk: 'HTTP — браузер мен сервер бір-бірімен сөйлескен сайын ұстанатын ереже.',
    },
  },
  {
    en: 'HTTP status code',
    kk: 'HTTP күй коды',
    keepLatin: true,
    alt: 'жауап коды',
    group: 'web',
    def: {
      en: 'A three-digit number in every response: 200 means fine, 404 means not found, 500 means the server broke.',
      kk: 'HTTP күй коды — әр жауаптағы үш таңбалы сан: 200 — бәрі дұрыс, 404 — табылмады, 500 — серверде қате.',
    },
    example: {
      en: 'Read the status code first: it tells you on whose side the problem is.',
      kk: 'Алдымен күй кодын оқы: мәселенің қай жақта екенін сол айтады.',
    },
  },
  {
    en: 'primary key',
    kk: 'негізгі кілт',
    keepLatin: false,
    alt: 'бастапқы кілт',
    group: 'data',
    def: {
      en: 'The column whose value is different in every row, so one exact row can always be picked out.',
      kk: 'Негізгі кілт — мәні әр жолда бөлек болатын баған: сол арқылы бір жолды дәл тауып аласың.',
    },
  },
  {
    en: 'foreign key',
    kk: 'сыртқы кілт',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'A column that points at a row in another table, which is how an order knows whose it is.',
      kk: 'Сыртқы кілт — басқа кестедегі жолды көрсететін баған: тапсырыстың кімдікі екені осылай белгілі болады.',
    },
  },
  {
    en: 'transaction',
    kk: 'транзакция',
    keepLatin: false,
    group: 'data',
    def: {
      en: 'A group of changes that either all happen together or none of them happen at all.',
      kk: 'Транзакция — не түгел орындалатын, не мүлде орындалмайтын өзгерістер тобы.',
    },
    example: {
      en: 'Money leaving one account and arriving in another belongs in a single transaction.',
      kk: 'Ақшаның бір шоттан шығуы мен екінші шотқа түсуі бір транзакцияда болуы керек.',
    },
  },
  {
    en: 'CSV',
    kk: 'CSV',
    keepLatin: true,
    group: 'data',
    def: {
      en: 'A plain text file where each line is one entry and commas separate the columns; what a spreadsheet exports.',
      kk: 'CSV — әр жолы бір жазба, бағандары үтірмен бөлінген қарапайым мәтіндік файл; кесте бағдарламалары деректі осы түрде шығарады.',
    },
    example: {
      en: 'Export the sheet as a CSV file and let the agent analyse it.',
      kk: 'Кестені CSV файлы етіп жүктеп алып, агентке талдатып көр.',
    },
  },
  {
    en: 'two-factor authentication (2FA)',
    kk: 'екі факторлы аутентификация',
    keepLatin: false,
    alt: '2FA',
    group: 'security',
    def: {
      en: 'A second proof on top of the password, usually a code that arrives on your phone.',
      kk: 'Екі факторлы аутентификация — құпиясөзден бөлек екінші дәлел: әдетте телефонға келетін код.',
    },
    example: {
      en: 'Turn two-factor authentication on for GitHub today.',
      kk: 'GitHub-та екі факторлы аутентификацияны бүгін қосып қой.',
    },
  },
  {
    en: 'access token',
    kk: 'кіру токені',
    keepLatin: false,
    alt: 'токен',
    group: 'security',
    def: {
      en: 'A long secret string a service gives your program to use instead of a password.',
      kk: 'Кіру токені — қызмет сенің бағдарламаңа құпиясөздің орнына беретін ұзын құпия жол.',
    },
    example: {
      en: 'A leaked token is exactly as bad as a leaked password.',
      kk: 'Сыртқа шығып кеткен токен — сыртқа шығып кеткен құпиясөзбен бірдей.',
    },
  },
  {
    en: 'HTTPS',
    kk: 'HTTPS',
    keepLatin: true,
    group: 'security',
    def: {
      en: 'HTTP with encryption, so nobody along the way can read or change what is sent.',
      kk: 'HTTPS — шифрланған HTTP: жолшыбай ешкім жіберілген деректі оқи да, өзгерте де алмайды.',
    },
    example: {
      en: 'If the address does not start with https, do not type a password into that page.',
      kk: 'Мекенжай https деп басталмаса, ол бетке құпиясөз терме.',
    },
  },
  {
    en: 'OWASP Top 10',
    kk: 'OWASP Top 10',
    keepLatin: true,
    group: 'security',
    def: {
      en: 'The standard list of the ten most common web security mistakes, kept up to date by a community of experts.',
      kk: 'OWASP Top 10 — вебтегі ең жиі кездесетін он қауіпсіздік қатесінің тізімі; оны мамандар қауымдастығы жаңартып отырады.',
    },
    example: {
      en: 'Ask the agent to review your app against the OWASP Top 10.',
      kk: 'Қолданбаңды OWASP Top 10 тізімі бойынша тексеріп шығуды агенттен сұра.',
    },
  },
  {
    en: 'XSS (cross-site scripting)',
    kk: 'XSS',
    keepLatin: true,
    group: 'security',
    def: {
      en: 'An attack in which someone gets their own code to run inside another visitor browser on your site.',
      kk: 'XSS — біреудің өз кодын сенің сайтыңда басқа келушінің браузерінде орындатып жіберуі.',
    },
  },
  {
    en: 'row-level security (RLS)',
    kk: 'жол деңгейіндегі қауіпсіздік',
    keepLatin: false,
    alt: 'RLS',
    group: 'security',
    def: {
      en: 'A rule inside the database itself that lets each person read only their own rows.',
      kk: 'Жол деңгейіндегі қауіпсіздік — әр адамға тек өз жолдарын оқуға рұқсат беретін, дерекқордың өзі қадағалайтын ереже.',
    },
    example: {
      en: 'Turn RLS on before the app is opened to everyone.',
      kk: 'Қолданбаны жұртқа ашпай тұрып, RLS саясатын қосып қой.',
    },
  },
  {
    en: 'rate limiting',
    kk: 'сұрауды шектеу',
    keepLatin: false,
    group: 'security',
    def: {
      en: 'A rule on your own server that stops answering anyone who is sending far too many requests.',
      kk: 'Сұрауды шектеу — тым көп сұрау жіберіп жатқан біреуге жауап беруді тоқтататын, өз серверіңдегі ереже.',
    },
    example: {
      en: 'Without it one script can empty your API budget in an hour.',
      kk: 'Ол болмаса, бір скрипт API бюджетіңді бір сағатта бітіріп тастайды.',
    },
  },
  {
    en: 'data leak',
    kk: 'деректердің сыртқа шығуы',
    keepLatin: false,
    alt: 'ағып кету',
    avoid: 'утечка',
    group: 'security',
    def: {
      en: 'Data reaching people who were never meant to see it.',
      kk: 'Деректердің сыртқа шығуы — деректің оны көруге тиіс емес адамдарға жетіп қалуы.',
    },
  },
  {
    en: 'downtime',
    kk: 'тоқтап қалу',
    keepLatin: false,
    group: 'deploy',
    def: {
      en: 'The time during which a service was not working at all.',
      kk: 'Тоқтап қалу — қызметтің мүлде істемей тұрған уақыты.',
    },
  },
  {
    en: 'AI coding tool',
    kk: 'ЖИ-кодтау құралы',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'Any editor or terminal program with a model built into it: Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini CLI, Codex.',
      kk: 'ЖИ-кодтау құралы — ішіне модель орнатылған редактор немесе терминал бағдарламасы: Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini CLI, Codex.',
    },
    example: {
      en: 'They all work the same way, so learn one properly and you can switch to any other.',
      kk: 'Олардың жұмыс қағидасы ұқсас: біреуін жөндеп меңгерсең, кез келген екіншісіне оңай көшесің.',
    },
  },
  {
    en: 'Claude',
    kk: 'Claude',
    keepLatin: true,
    group: 'ai-basics',
    def: {
      en: "Anthropic's family of models, and the assistant this course leans on most.",
      kk: 'Claude — Anthropic компаниясының модельдер тобы әрі осы курста ең жиі қолданылатын ЖИ-көмекші.',
    },
    example: {
      en: 'Show the error text to Claude and ask why it happens.',
      kk: 'Қате мәтінін Claude-қа көрсетіп, себебін сұра.',
    },
  },
  {
    en: 'ChatGPT',
    kk: 'ChatGPT',
    keepLatin: true,
    group: 'ai-basics',
    def: {
      en: "OpenAI's assistant, the one most people meet first.",
      kk: 'ChatGPT — OpenAI компаниясының ЖИ-көмекшісі; көпшілік ЖИ-мен алғаш осы арқылы танысады.',
    },
    example: {
      en: "It is worth comparing ChatGPT's answer with Claude's on the same question.",
      kk: 'Бір сұраққа ChatGPT-дің жауабы мен Claude-тың жауабын салыстырып көрген жөн.',
    },
  },
  {
    en: 'Gemini',
    kk: 'Gemini',
    keepLatin: true,
    group: 'ai-basics',
    def: {
      en: "Google's family of models, strong on long documents and on images.",
      kk: 'Gemini — Google компаниясының модельдер тобы: ұзын құжатпен және суретпен жақсы жұмыс істейді.',
    },
    example: {
      en: 'A name whose reading is unclear takes a descriptor noun, not a hyphenated ending.',
      kk: 'Оқылуы күмәнді атауға жалғау қоспа: «Gemini-ге» емес, «Gemini моделіне» деп жаз.',
    },
  },
  {
    en: 'RLHF (reinforcement learning from human feedback)',
    kk: 'адам пікірі арқылы оқыту',
    keepLatin: false,
    alt: 'RLHF',
    group: 'ai-basics',
    def: {
      en: "A later training stage where people rate the model's answers, so it learns which kind of reply is actually useful.",
      kk: 'Адам пікірі арқылы оқыту — адамдар модельдің жауаптарын бағалап отыратын кейінгі кезең; содан модель қандай жауаптың шынымен пайдалы екенін үйренеді.',
    },
  },
  {
    en: 'token price',
    kk: 'токен бағасы',
    keepLatin: false,
    group: 'ai-basics',
    def: {
      en: 'What you pay per million tokens, counted separately for what you send in and what the model writes back.',
      kk: 'Токен бағасы — әр миллион токен үшін төленетін ақы; жіберген мәтінің мен модель жазған жауап бөлек саналады.',
    },
    example: {
      en: 'A Kazakh prompt costs more, because the same meaning takes more tokens.',
      kk: 'Қазақша промпт қымбатырақ түседі: сол бір мағына көбірек токен алады.',
    },
  },
  {
    en: 'GPU (graphics processing unit)',
    kk: 'графикалық процессор (GPU)',
    keepLatin: false,
    alt: 'GPU',
    avoid: 'видеокарта',
    group: 'ai-basics',
    def: {
      en: 'The chip that does the enormous number of calculations a model needs; it is the reason AI costs money.',
      kk: 'Графикалық процессор — модельге қажет орасан көп есептеуді атқаратын чип; ЖИ-дің қымбаттығы да содан.',
    },
    example: {
      en: 'A local model runs on your own GPU; a hosted one runs in a data centre.',
      kk: 'Жергілікті модель өз құрылғыңның графикалық процессорында, бұлттағы модель деректер орталығында істейді.',
    },
  },
  {
    en: 'lab (hands-on lab)',
    kk: 'практикалық жұмыс',
    keepLatin: false,
    alt: 'практикум',
    group: 'workshop',
    def: {
      en: 'A guided block of time in which you type everything yourself and end up with something that works.',
      kk: 'Практикалық жұмыс — бәрін өзің теріп отыратын, соңында жұмыс істейтін нәтиже шығатын бағытталған тапсырма.',
    },
  },
  {
    en: 'template',
    kk: 'үлгі',
    keepLatin: false,
    avoid: 'шаблон',
    group: 'workshop',
    def: {
      en: 'A ready-made starting file or project you copy and change instead of starting from nothing.',
      kk: 'Үлгі — нөлден бастамай, көшіріп алып өзгертетін дайын файл немесе жоба.',
    },
    example: {
      en: 'Copy the prompt template and put your own task into it.',
      kk: 'Промпт үлгісін көшіріп алып, ішіне өз тапсырмаңды жаз.',
    },
  },
  {
    en: 'checklist',
    kk: 'тексеру тізімі',
    keepLatin: false,
    avoid: 'чек-лист',
    group: 'workshop',
    def: {
      en: 'A short list of things to confirm before you call the work done.',
      kk: 'Тексеру тізімі — жұмысты «бітті» деуден бұрын растап шығатын қысқа тізім.',
    },
    example: {
      en: 'Go through the checklist before you deploy.',
      kk: 'Deploy жасамас бұрын тексеру тізімін қарап шық.',
    },
  },
  {
    en: 'live coding',
    kk: 'тікелей код жазу',
    keepLatin: false,
    alt: 'live coding',
    avoid: 'лайвкодинг',
    group: 'workshop',
    def: {
      en: 'Writing code in front of the audience, mistakes included, so they see how the work really goes.',
      kk: 'Тікелей код жазу — қатысушылардың көз алдында, қателерімен қоса код жазу; сонда жұмыстың шын барысы көрінеді.',
    },
  },
  {
    en: 'pair programming',
    kk: 'жұптасып код жазу',
    keepLatin: false,
    avoid: 'парное программирование',
    group: 'workshop',
    def: {
      en: 'Two people at one screen: one types, the other thinks a step ahead and catches mistakes.',
      kk: 'Жұптасып код жазу — бір экранның алдындағы екі адам: біреуі теріп отырады, екіншісі бір қадам алда ойлап, қатені байқайды.',
    },
    example: {
      en: 'Working with an AI feels like pair programming where you are the one thinking ahead.',
      kk: 'ЖИ-мен жұмыс істеу жұптасып код жазуға ұқсайды: алдын ала ойлайтын жақ — сенсің.',
    },
  },
  {
    en: 'cohort',
    kk: 'оқу ағымы',
    keepLatin: false,
    alt: 'топ',
    avoid: 'поток',
    group: 'workshop',
    def: {
      en: 'The group that starts and finishes the course at the same time as you.',
      kk: 'Оқу ағымы — курсты сенімен бір мезгілде бастап, бірге аяқтайтын топ.',
    },
  },
  {
    en: 'contribution',
    kk: 'үлес қосу',
    keepLatin: false,
    avoid: 'контрибьют',
    group: 'workshop',
    def: {
      en: "Any improvement you send to someone else's project: a fix, a test, a line of documentation or a translation.",
      kk: 'Үлес қосу — өзге адамның жобасына жіберген кез келген жақсартуың: түзету, тест, құжаттамадағы бір жол немесе аударма.',
    },
    example: {
      en: 'Your first contribution can be a Kazakh translation of a README.',
      kk: 'Бірінші үлесің README файлының қазақша аудармасы болуы мүмкін.',
    },
  },
  {
    en: 'side project',
    kk: 'жеке жоба',
    keepLatin: false,
    alt: 'side project',
    avoid: 'пет-проект',
    group: 'workshop',
    def: {
      en: 'Something you build in your own time because you want it to exist, not because anyone asked for it.',
      kk: 'Жеке жоба — тапсырма бойынша емес, өзің қалағандықтан, бос уақытыңда жасайтын дүние.',
    },
    example: {
      en: 'Most careers here start with one small side project, not with a diploma.',
      kk: 'Бұл салада мансап дипломнан емес, бір шағын жеке жобадан басталады.',
    },
  },
  {
    en: 'hackathon',
    kk: 'хакатон',
    keepLatin: false,
    group: 'workshop',
    def: {
      en: 'A contest of one or two days in which teams build something working from scratch.',
      kk: 'Хакатон — командалар нөлден бастап жұмыс істейтін дүние жасап шығатын бір-екі күндік жарыс.',
    },
    example: {
      en: 'Hackathons run all year in Kazakhstan: apply to one.',
      kk: 'Қазақстанда хакатон жыл бойы өтеді: біреуіне өтінім бер.',
    },
  },
];
