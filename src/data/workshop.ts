// Live-workshop data for vibecoding.qairuhub.com.
// Source of truth: research/workshop-design.md (21 Sep 2026 research pass + fact-check log).
// Kazakh rules: research/kk-glossary.md sections 0-7. Kazakh Cyrillic only, no Russian.
// Tool words stay Latin (git, prompt, agent, deploy, commit, Claude Code, API); endings attach with a hyphen.
//
// Shape of the event: 30 minutes of doors and setup, a 2-hour masterclass, a 10-minute break,
// then a 60-minute build-together + Q&A block. Pre-show segments use negative times.

export interface L {
  en: string;
  kk: string;
}

export interface Segment {
  /** "0:00" — clock position inside the event. Negative values are before doors close. */
  from: string;
  to: string;
  title: L;
  /** What the room should feel or understand by the end of this segment. */
  goal: L;
  /** 2-4 concrete beats: what the presenter actually does. */
  doing: L[];
  /** Slide number in /present, 1-based, when one matches. */
  slide?: number;
  /** Curriculum slug when the segment maps to a module. */
  module?: string;
  energy: 'hook' | 'teach' | 'demo' | 'interact' | 'break' | 'build';
  /** What to do if the demo fails or the wifi dies. Required for every demo segment. */
  fallback?: L;
}

export const runOfShow: Segment[] = [
  // ---------------------------------------------------------------- doors
  {
    from: '-0:30',
    to: '-0:20',
    energy: 'interact',
    title: {
      en: 'Doors open: the setup desk',
      kk: 'Есік ашылады: дайындық үстелі',
    },
    goal: {
      en: 'Nobody spends the first hour fighting an install. The room feels like a workshop, not a lecture hall.',
      kk: 'Ешкім бірінші сағатты орнатумен әуреленбесін. Зал дәрісхана емес, шеберхана сияқты көрінсін.',
    },
    doing: [
      {
        en: 'Loop one slide: wifi password, a QR to the setup page, a QR to the Telegram group. Nothing else.',
        kk: 'Бір слайдты қайталап көрсет: wi-fi құпиясөзі, дайындық бетіне QR-код, Telegram тобына QR-код. Басқа ештеңе жоқ.',
      },
      {
        en: 'Helpers sit at a setup desk — one helper per ten people — and fix installs there, never from the stage.',
        kk: 'Көмекшілер дайындық үстелінде отырады: әр он адамға бір көмекші. Орнатуды сахнадан емес, сол жерде түзетеді.',
      },
      {
        en: 'Hand every person one green and one red card. Green means I am fine, red means I need help.',
        kk: 'Әр адамға бір жасыл, бір қызыл қағаз бер. Жасыл — бәрі дұрыс, қызыл — көмек керек.',
      },
      {
        en: 'Play music. A silent empty room before a workshop costs you the first ten minutes of energy.',
        kk: 'Музыка қос. Сабақ алдындағы үнсіз бос зал алғашқы он минуттық қуатты жеп қояды.',
      },
    ],
  },
  {
    from: '-0:20',
    to: '-0:10',
    energy: 'interact',
    module: 'local-build',
    title: {
      en: 'Row walk: prove that something opens',
      kk: 'Қатарларды аралау: бірдеңенің ашылатынын тексер',
    },
    goal: {
      en: 'Every seat has at least one working way to build today — and you know which seats do not.',
      kk: 'Әр орында бүгін жасауға жарайтын кемінде бір жұмыс істейтін жол болсын — және қай орындарда жоқ екенін біл.',
    },
    doing: [
      {
        en: 'Helpers check one thing per person: claude --version prints a version, or the Desktop app Code tab opens, or claude.ai loads in the browser.',
        kk: 'Көмекшілер әр адамнан бір нәрсені тексереді: `claude --version` нұсқаны көрсете ме, Desktop қолданбасының Code қойындысы ашыла ма, әлде браузерде claude.ai жүктеле ме.',
      },
      {
        en: 'A broken terminal install gets claude doctor once. If it still fails, move that person to the browser track and stop. Do not debug it now.',
        kk: 'Терминалдағы орнату бұзылса, бір рет `claude doctor` пәрменін орында. Әлі болмаса — ол адамды браузер жолына ауыстыр да, тоқта. Қазір жөндеуге кіріспе.',
      },
      {
        en: 'Write down who has a paid seat. You will need that list to balance the pairs in the build session.',
        kk: 'Кімде ақылы жазылым бар екенін жазып ал. Бұл тізім кейін жұптарды теңестіруге керек болады.',
      },
    ],
  },
  {
    from: '-0:10',
    to: '0:00',
    energy: 'interact',
    title: {
      en: 'Entry poll and the last checks',
      kk: 'Кіру сауалнамасы және соңғы тексеру',
    },
    goal: {
      en: 'Beginners can see they are the majority, and you know that nothing will break in the first four minutes.',
      kk: 'Бастаушылар өздерінің көпшілік екенін көреді, ал сен алғашқы төрт минутта ештеңе бұзылмайтынына сенімдісің.',
    },
    doing: [
      {
        en: 'Put the entry poll on screen: never coded / a little / I write code for money. Second question: which AI tools have you actually opened?',
        kk: 'Экранға кіру сауалнамасын қой: ешқашан код жазбағанмын / сәл-пәл / код жазып ақша табамын. Екінші сұрақ: қай ЖИ құралдарын шынымен ашып көрдің?',
      },
      {
        en: 'Presenter checks in this order: status page, hotspot on a second carrier, notifications off, terminal font 20pt or larger, light theme, fallback tab already open.',
        kk: 'Жүргізуші осы ретпен тексереді: қызмет күйі беті, екінші операторда телефон интернеті, хабарландырулар өшірулі, терминал шрифті 20pt немесе үлкенірек, жарық режим, қосалқы қойынды ашық тұр.',
      },
      {
        en: 'The cold-open prompt is already in the clipboard. Never type a demo prompt live — typos on stage cost 40 seconds and all your momentum.',
        kk: 'Алғашқы prompt аралық сақтағышта дайын тұрсын. Демо prompt-ты ешқашан сахнада қолмен терме: бір қате әріп 40 секундты және бүкіл қарқынды алып кетеді.',
      },
    ],
  },

  // ---------------------------------------------------- part A: masterclass
  {
    from: '0:00',
    to: '0:04',
    energy: 'hook',
    slide: 1,
    title: {
      en: 'Cold open: press Enter before you say hello',
      kk: 'Суық бастау: амандаспас бұрын Enter бас',
    },
    goal: {
      en: 'In four minutes the room has watched a working app appear out of one paragraph of ordinary language. Curiosity arrives before theory.',
      kk: 'Төрт минутта зал бір абзац қарапайым сөзден жұмыс істейтін қолданба пайда болғанын көреді. Теорияға дейін қызығушылық келеді.',
    },
    doing: [
      {
        en: 'Say nothing. Paste the Demo 1 prompt, press Enter, and only then say who you are and what QairuHub is, while the agent works behind you.',
        kk: 'Үндеме. Demo 1 prompt-ын қой, Enter бас, содан кейін ғана өзіңді және QairuHub-ты таныстыр — agent артыңда жұмыс істеп тұрады.',
      },
      {
        en: 'Name the deal out loud: today nobody only watches. By the end everyone in this room types something, breaks it and ships it.',
        kk: 'Келісімді дауыстап айт: бүгін ешкім тек қарап отырмайды. Сабақ соңында залдағы әркім бірдеңе жазады, бұзады және жариялайды.',
      },
      {
        en: 'Do not explain the prompt yet. The explanation lands twice as hard once they have seen the result.',
        kk: 'Prompt-ты әзірге түсіндірме. Нәтижені көргеннен кейінгі түсіндірме екі есе күшті әсер етеді.',
      },
    ],
    fallback: {
      en: 'If nothing renders in 90 seconds, open the pre-published link from your bookmarks and say it honestly: this one is from yesterday, the live one is still thinking. Keep the live tab in a corner and come back to it.',
      kk: '90 секундта ештеңе шықпаса, бетбелгіден алдын ала жарияланған сілтемені аш та, шынын айт: «бұл — кешегісі, тірісі әлі ойланып жатыр». Тірі қойындыны бұрышта қалдырып, кейін қайта орал.',
    },
  },
  {
    from: '0:04',
    to: '0:09',
    energy: 'interact',
    title: {
      en: 'Who is in the room, and the rules of the room',
      kk: 'Залда кім отыр және залдың ережесі',
    },
    goal: {
      en: 'Beginners relax because they can see they are the majority. Everyone knows how to ask for help without raising their voice.',
      kk: 'Бастаушылар тынышталады, себебі көпшілік өздері екенін көреді. Әркім дауыс көтермей-ақ көмек сұрауды біледі.',
    },
    doing: [
      {
        en: 'Read the poll out loud with the real numbers. If beginners are the majority — and they almost always are — say that number twice.',
        kk: 'Сауалнаманы нақты сандарымен дауыстап оқы. Бастаушылар көп болса — әдетте солай — сол санды екі рет айт.',
      },
      {
        en: 'Three rules: a red card means help is coming; ask in Kazakh, Russian or English, whichever is faster for you; errors are the lesson, not the failure.',
        kk: 'Үш ереже: қызыл қағаз — көмек келеді; сұрағыңды қазақша, орысша немесе ағылшынша қой, қайсысы тез болса; қате — сәтсіздік емес, сабақтың өзі.',
      },
      {
        en: 'Prediction before the reveal: hands up — will the rounded amounts add up exactly to the bill total? Will the Kazakh labels be right? Count the hands out loud.',
        kk: 'Нәтижені көрсетпес бұрын болжам сұра: қол көтер — дөңгелектенген сомалар есепшоттың жалпы сомасына дәл келе ме? Қазақша жазулар дұрыс шыға ма? Қолдарды дауыстап сана.',
      },
    ],
  },
  {
    from: '0:09',
    to: '0:21',
    energy: 'demo',
    slide: 10,
    module: 'idea-to-prd',
    title: {
      en: 'Demo 1: one paragraph, one link you can send',
      kk: 'Demo 1: бір абзац — жібере алатын бір сілтеме',
    },
    goal: {
      en: 'Everyone can name the five parts of a prompt that make the difference, and the one line almost nobody writes: make it check itself.',
      kk: 'Әркім жақсы prompt-тың бес бөлігін атай алады және ең сирек жазылатын жолды біледі: «өзіңді өзің тексер».',
    },
    doing: [
      {
        en: 'Read the prompt line by line on screen: goal, must-haves, constraints, language, and the last paragraph — list three test cases with exact numbers, then check them.',
        kk: 'Prompt-ты экранда жолма-жол оқы: мақсат, міндетті талаптар, шектеулер, тіл және соңғы абзац — «нақты сандары бар үш тест жағдайын жаз, сосын оларды тексер».',
      },
      {
        en: 'Open the result and run its own three test cases in front of the room. Read the numbers out loud. If one fails, say so — that is the demo, not a problem with it.',
        kk: 'Нәтижені аш та, өзі жазған үш тестті залдың көз алдында орында. Сандарды дауыстап оқы. Біреуі өтпесе, соны айт: бұл — демоның кемшілігі емес, мәні.',
      },
      {
        en: 'Publish, show the QR, and say the word out loud: ship. An app that nobody else can open is not finished.',
        kk: 'Жариялап, QR-кодты көрсет те, сөзді дауыстап айт: «шығардық». Басқа ешкім аша алмайтын қолданба аяқталған емес.',
      },
      {
        en: 'Planned mistake: the Kazakh labels will be awkward somewhere. Ask a native speaker in the room to fix one string, paste their correction, and say the line — you are the domain expert, the agent is the typist.',
        kk: 'Әдейі жасалған қате: қазақша жазулардың бірі сөлекет шығады. Залдағы біреуден бір жолды түзетуді сұра, түзетуін қой да, негізгі ойды айт: сала маманы — сен, agent тек теруші.',
      },
    ],
    fallback: {
      en: 'Ladder, decided in 30 seconds and never debugged on stage: phone hotspot, then the pre-published link plus QR from the slide so the phone interaction still works, then the 90-second recording narrated live with the same prediction question, then fully offline — open dastarkhan-split.html from disk and let one volunteer try to break it on your laptop.',
      kk: 'Баспалдақ — 30 секундта шешіледі, сахнада ешқашан жөнделмейді: телефон интернеті; содан кейін слайдтағы алдын ала жарияланған сілтеме мен QR-код (сонда телефонмен тексеру бәрібір жүреді); содан кейін 90 секундтық жазба — сол болжам сұрағын қоя отырып тірі дауыстап түсіндір; ең соңында интернетсіз нұсқа: дискідегі `dastarkhan-split.html` файлын аш та, бір еріктіге өз ноутбугыңда бұздырып көр.',
    },
  },
  {
    from: '0:21',
    to: '0:27',
    energy: 'interact',
    module: 'test-and-quality',
    title: {
      en: 'Break it on your phone',
      kk: 'Телефонмен бұзып көр',
    },
    goal: {
      en: 'The room learns in two minutes that VERIFY is a human job, and that real users find things no test suite does.',
      kk: 'Зал екі минутта VERIFY қадамы адамның жұмысы екенін және нақты пайдаланушылар ешқандай тест таппайтын нәрселерді табатынын түсінеді.',
    },
    doing: [
      {
        en: 'QR on screen, two minutes on the clock: negative price, zero people on an item, an emoji for a name, a bill of 1 000 000 000 ₸.',
        kk: 'Экранда QR-код, уақыт — екі минут: теріс баға, бір тағамға нөл адам, ат орнына эмодзи, 1 000 000 000 ₸ есепшот.',
      },
      {
        en: 'Collect the three best failures out loud and type them into one fix prompt: root causes, do not hide errors, re-run the tests plus one new test per bug.',
        kk: 'Ең қызық үш ақауды дауыстап жинап ал да, бір түзету prompt-ына жаз: түбірлі себебін тап, қатені жасырма, тесттерді қайта орында және әр қатеге бір жаңа тест қос.',
      },
      {
        en: 'While the agent fixes, ask the room: which of these three would have reached a real user? That answer is their test plan for tonight.',
        kk: 'Agent түзетіп жатқанда залдан сұра: осы үшеуінің қайсысы нақты пайдаланушыға жетер еді? Сол жауап — олардың бүгінгі тест жоспары.',
      },
    ],
  },
  {
    from: '0:27',
    to: '0:37',
    energy: 'teach',
    slide: 2,
    module: 'the-tweet',
    title: {
      en: 'What vibecoding is, and what it is not',
      kk: 'Vibecoding деген не және не емес',
    },
    goal: {
      en: 'Nobody leaves thinking vibecoding just means "AI writes my code". Everyone can place themselves on the line between not reading the code and owning every line.',
      kk: 'Ешкім vibecoding деген жай ғана «кодты ЖИ жазады» деп ойлап кетпесін. Әркім «кодты оқымау» мен «әр жолға жауап беру» арасындағы сызықтан өз орнын таба алады.',
    },
    doing: [
      {
        en: 'Karpathy, 2 February 2025: fully give in to the vibes, embrace exponentials, and forget that the code even exists. Collins made it Word of the Year on 6 November 2025.',
        kk: 'Karpathy, 2025 ж. 2 ақпан: «fully give in to the vibes, embrace exponentials, and forget that the code even exists». Collins оны 2025 ж. 6 қарашада «Жыл сөзі» деп жариялады.',
      },
      {
        en: 'Willison splits it in two: vibe coding means you do not review the code, which is fine for low stakes. Responsible AI-assisted programming means you could explain every line you ship.',
        kk: 'Willison оны екіге бөледі: vibe coding — кодты тексермеу, тәуекелі аз жұмысқа жарайды. Жауапты ЖИ-көмекші бағдарламалау — шығарған әр жолыңды түсіндіре алу.',
      },
      {
        en: 'Draw the loop by hand on the board: DESCRIBE, PLAN, BUILD, VERIFY, SHIP, with REWIND as the arrow back. Then say it — Demo 1 was exactly one lap of that.',
        kk: 'Циклды тақтаға қолмен сыз: DESCRIBE, PLAN, BUILD, VERIFY, SHIP және кері қайтаратын REWIND көрсеткісі. Сосын айт: Demo 1 — дәл осы циклдың бір айналымы.',
      },
      {
        en: 'Honest line: today most of this room is in the vibe column. That is the right place to start and the wrong place to stay.',
        kk: 'Шыншыл сөз: бүгін бұл залдың көбі vibe бағанында тұр. Бастауға дұрыс жер, бірақ сол жерде қалып қоюға болмайды.',
      },
    ],
  },
  {
    from: '0:37',
    to: '0:42',
    energy: 'interact',
    title: {
      en: 'Stand up: what would you build?',
      kk: 'Орныңнан тұр: сен не жасар едің?',
    },
    goal: {
      en: 'The 40-minute slump is spent standing and talking instead of sitting and fading, and the build session already has its ideas.',
      kk: '40-минуттық шаршау сәті отырып-сөніп емес, тұрып-сөйлесіп өтеді, ал практика бөліміне идеялар әзір болады.',
    },
    doing: [
      {
        en: 'Everyone stands. 90 seconds each with a neighbour: what would you build for your family business, your university, your city?',
        kk: 'Бәрі тұрады. Көршіңмен 90 секундтан сөйлес: отбасы ісіне, университетіңе, қалаңа не жасар едің?',
      },
      {
        en: 'One line each into the Telegram group. Read three of them out loud — these become project cards in the build session.',
        kk: 'Әркім Telegram тобына бір жол жазады. Үшеуін дауыстап оқы: олар практика бөлімінің тапсырмасына айналады.',
      },
      {
        en: 'If the room is shy, name it: the first person to speak gets applause, not judgement. Then wait. Do not rescue the silence too quickly.',
        kk: 'Зал именіп тұрса, соны ашық айт: бірінші сөйлеген адамға сын емес, қошемет бар. Сосын күт. Үнсіздікті тым тез құтқарма.',
      },
    ],
  },
  {
    from: '0:42',
    to: '0:52',
    energy: 'teach',
    slide: 7,
    module: 'the-agent',
    title: {
      en: 'The map: which environment, which model, which wallet',
      kk: 'Карта: қай орта, қай модель, қай әмиян',
    },
    goal: {
      en: 'Everyone knows there are at least six ways in, at least three of which cost zero, and that what transfers between them is the loop, not the logo.',
      kk: 'Әркім кем дегенде алты жол бар екенін, олардың кемінде үшеуі тегін екенін және олардың арасында тасымалданатын нәрсе логотип емес, цикл екенін біледі.',
    },
    doing: [
      {
        en: 'Hands up as you name each one: Claude.ai artifacts, Google AI Studio Build, Claude Code, Codex CLI, Cursor, Antigravity, Copilot in VS Code, Lovable, Bolt. Count the hands out loud — it is usually two or three tools, not nine.',
        kk: 'Әрқайсысын атаған сайын қол көтерт: Claude.ai artifact-тары, Google AI Studio Build, Claude Code, Codex CLI, Cursor, Antigravity, VS Code ішіндегі Copilot, Lovable, Bolt. Қолдарды дауыстап сана — әдетте тоғыз емес, екі-үш құрал шығады.',
      },
      {
        en: 'Three tracks. A: browser, zero cost, any device. B: Claude Code, needs a paid plan — Pro is 20 dollars a month, 17 if billed annually. C: a free agent in a folder — Codex CLI on a free ChatGPT account, the free Antigravity Individual plan, Copilot Free.',
        kk: 'Үш жол. A: браузер, тегін, кез келген құрылғыда. B: Claude Code, ақылы жазылым керек — Pro айына 20 доллар, жылдық төлемде 17 доллар. C: қалтаңдағы тегін agent — тегін ChatGPT аккаунтындағы Codex CLI, Antigravity-дің тегін Individual жоспары, Copilot Free.',
      },
      {
        en: 'Models in one sentence: a bigger model for planning and hard bugs, a smaller and faster one for routine edits. All of them are confidently wrong sometimes, so the VERIFY step never changes.',
        kk: 'Модельдер туралы бір сөйлем: жоспарлау мен қиын қателерге үлкен модель, күнделікті ұсақ өзгеріске кішірек әрі жылдам модель. Бәрі де кейде сеніммен қателеседі, сондықтан VERIFY қадамы ешқашан өзгермейді.',
      },
      {
        en: 'Free tiers die: Gemini CLI stopped serving free users on 18 June 2026. That is the argument for learning the loop instead of one product.',
        kk: 'Тегін жоспарлар жоғалып отырады: Gemini CLI 2026 ж. 18 маусымда тегін пайдаланушыларға қызмет көрсетуді тоқтатты. Сондықтан бір өнімді емес, циклды үйрену керек.',
      },
    ],
  },
  {
    from: '0:52',
    to: '1:02',
    energy: 'demo',
    module: 'context-ssot',
    title: {
      en: 'Demo 2a: an agent in your folder, in plan mode',
      kk: 'Demo 2a: қалтаңдағы agent, plan mode-та',
    },
    goal: {
      en: 'The room sees that the agent reads a real file, asks real questions, and proposes before it touches anything.',
      kk: 'Зал agent-тің нақты файлды оқитынын, нақты сұрақ қоятынын және ештеңеге тимей тұрып ұсыныс жасайтынын көреді.',
    },
    doing: [
      {
        en: 'Show the empty folder: one words.csv and nothing else. Go into it, start the agent, press Shift+Tab until the status line says plan mode.',
        kk: 'Бос қалтаны көрсет: ішінде бір ғана `words.csv`, басқа ештеңе жоқ. Ішіне кір, agent-ті іске қос, күй жолында «plan mode» жазылғанша Shift+Tab бас.',
      },
      {
        en: 'Paste prompt A with @words.csv in it. Point at the last two lines: ask me up to three questions, then propose a plan, do not write code yet.',
        kk: 'Ішінде `@words.csv` бар A prompt-ын қой. Соңғы екі жолды көрсет: «маған үшке дейін сұрақ қой, сосын жоспар ұсын, әзірге код жазба».',
      },
      {
        en: 'The room answers the agent by vote. Type one answer in Kazakh on purpose and say what you expect out loud: it will work, and it will be weaker than English.',
        kk: 'Зал agent-ке дауыс беру арқылы жауап береді. Бір жауапты әдейі қазақша жаз және не күтетіңді дауыстап айт: жұмыс істейді, бірақ ағылшыншадан әлсіздеу болады.',
      },
      {
        en: 'Read the plan aloud and change one thing in it before approving. A plan you approve without reading is not a plan.',
        kk: 'Жоспарды дауыстап оқы да, мақұлдамас бұрын бір нәрсесін өзгерт. Оқымай мақұлдаған жоспар — жоспар емес.',
      },
    ],
    fallback: {
      en: 'git checkout step-1-plan gives you the saved PLAN.md; read that instead and say plainly that it is a checkpoint from rehearsal. If login or the usage limit fails, switch to the second laptop. If the service itself is down, run the same prompt in Codex CLI or Antigravity and make that the lesson: the loop is tool-agnostic.',
      kk: '`git checkout step-1-plan` пәрмені сақталған `PLAN.md` файлын береді; соны оқы да, бұл дайындық кезіндегі сақтау нүктесі екенін ашық айт. Кіру немесе шектеу мәселесі шықса, екінші ноутбукке ауыс. Қызметтің өзі істемей тұрса, дәл сол prompt-ты Codex CLI немесе Antigravity ішінде орында — және соны сабаққа айналдыр: цикл құралға тәуелді емес.',
    },
  },
  {
    from: '1:02',
    to: '1:12',
    energy: 'demo',
    slide: 13,
    module: 'the-agent',
    title: {
      en: 'Demo 2b: permissions, then make it prove it',
      kk: 'Demo 2b: рұқсаттар, содан соң дәлелдеу',
    },
    goal: {
      en: 'Everyone understands that they are the safety layer, and that "it works" means a check that ran, not a sentence the agent wrote.',
      kk: 'Әркім қауіпсіздік қабаты — өзі екенін, ал «жұмыс істейді» дегені agent жазған сөйлем емес, орындалған тексеру екенін түсінеді.',
    },
    doing: [
      {
        en: 'Switch to Manual mode before you start or the room sees no permission prompts at all: on Pro, Max and Team the starting mode for terminal sessions is Auto, and a classifier approves most actions silently.',
        kk: 'Бастамас бұрын Manual режимге ауыс, әйтпесе зал бірде-бір рұқсат сұрауын көрмейді: Pro, Max және Team жоспарларында терминал сеансы Auto режимінен басталады, ал онда әрекеттердің көбін жіктеуіш үнсіз мақұлдайды.',
      },
      {
        en: 'On each real permission prompt the room votes thumbs up or down before you click. Ask why for at least one deny, and take the answer seriously.',
        kk: 'Әр нақты рұқсат сұрауында зал сен басарда бас бармағын жоғары не төмен көрсетіп дауыс береді. Кем дегенде бір бас тартудың себебін сұра және жауабын елеусіз қалдырма.',
      },
      {
        en: 'Prompt B: write a small test script for the three behaviours, run it, show the output, and if a check fails fix the app and not the test.',
        kk: 'B prompt-ы: үш мінез-құлықты тексеретін шағын тест жаз, оны орында, шыққан нәтижені көрсет, ал тексеру өтпесе тестті емес, қолданбаны түзет.',
      },
      {
        en: 'Read the failing line out loud if there is one. A demo where nothing ever fails teaches nothing at all.',
        kk: 'Өтпеген жол болса, соны дауыстап оқы. Ешнәрсе құламайтын демо ештеңе үйретпейді.',
      },
    ],
    fallback: {
      en: 'Backup slide with five canned permission prompts — npm install, reading .env, rm -rf on a folder, git push --force, curl piped into bash — and run the vote on those instead. For the verification beat, jump to the step-3-tested tag and show the test output recorded yesterday.',
      kk: 'Қосалқы слайдта бес дайын рұқсат сұрауы тұрсын: `npm install`, `.env` файлын оқу, қалтаға `rm -rf`, `git push --force`, `curl` нәтижесін `bash` ішіне жіберу — дауыс беруді сол бойынша өткіз. Тексеру бөлігі үшін `step-3-tested` тегіне өт те, кеше жазылған тест нәтижесін көрсет.',
    },
  },
  // <<CHUNK2>>
];
