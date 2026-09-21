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
      en: 'A word already written in Cyrillic needs no hyphen: промптты, токендер, серверге, репозиторийде, агентпен, модельдің. The hyphen belongs to Latin script and to acronyms only. Kazakh also never uses an apostrophe for this, so API-ге is right and API`ге is not.',
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
      en: 'For an agent a test is the objective signal that the work is done.',
      kk: 'Агент үшін тест — жұмыстың бітуін көрсететін объективті белгі.',
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
  // --- end of terms ---
];
