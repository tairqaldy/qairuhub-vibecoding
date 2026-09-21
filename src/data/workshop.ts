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
  {
    from: '1:12',
    to: '1:19',
    energy: 'interact',
    module: 'git-and-github',
    title: {
      en: 'Prompt duel, then rewind all of it',
      kk: 'Prompt жекпе-жегі, сосын бәрін кері қайтар',
    },
    goal: {
      en: 'The room sees, in the same file, what a vague prompt and a specific prompt actually produce — and that undoing costs nothing.',
      kk: 'Зал бір файлдың өзінде бұлдыр prompt пен нақты prompt не беретінін көреді — және кері қайтару тегін екенін түсінеді.',
    },
    doing: [
      {
        en: 'Volunteer A dictates a vague styling prompt out loud, something like "make it look better". Run it. Let the room stare at the arbitrary result in silence for a few seconds.',
        kk: 'Бірінші ерікті бұлдыр prompt айтады, мысалы «make it look better». Оны орында. Кездейсоқ шыққан нәтижеге зал бірнеше секунд үнсіз қарасын.',
      },
      {
        en: 'Press Esc twice or run /rewind back to the previous checkpoint, and say the sentence: mistakes are cheap here, so try things.',
        kk: 'Esc-ті екі рет бас немесе `/rewind` пәрменін орындап, алдыңғы сақтау нүктесіне қайт та, негізгі ойды айт: мұнда қате арзан, сондықтан батыл байқап көр.',
      },
      {
        en: 'Volunteer B dictates a specific one: exact palette, exact font size, CSS only, and tell me which rules you changed. Run it. Let the room judge, not you.',
        kk: 'Екінші ерікті нақтысын айтады: дәл түс палитрасы, дәл шрифт өлшемі, тек CSS және «қай ережелерді өзгерткеніңді айт». Оны орында. Бағаны сен емес, зал берсін.',
      },
      {
        en: 'Name the limit honestly: checkpoints undo file edits, not what a shell command already did. That is what git is for.',
        kk: 'Шектеуін ашық айт: сақтау нүктелері файл өзгерістерін ғана қайтарады, орындалып кеткен пәрменнің салдарын емес. Ол үшін git бар.',
      },
    ],
  },
  {
    from: '1:19',
    to: '1:25',
    energy: 'teach',
    module: 'context-ssot',
    title: {
      en: 'Give it a memory, then save the good state',
      kk: 'Оған жад бер, сосын жақсы күйін сақта',
    },
    goal: {
      en: 'Everyone knows what CLAUDE.md or AGENTS.md is for, and why a boring commit matters more than a pretty screen.',
      kk: 'Әркім `CLAUDE.md` не `AGENTS.md` не үшін керегін және неге әдемі экраннан гөрі қарапайым commit маңыздырақ екенін біледі.',
    },
    doing: [
      {
        en: 'Run /init, open the generated file, and add one human line it could never guess: this app must keep working by opening index.html directly, never add a build step.',
        kk: '`/init` пәрменін орында, шыққан файлды аш және өзі ешқашан таба алмайтын бір адами жолды қос: «бұл қолданба `index.html` файлын тікелей ашқанда жұмыс істеуі керек, құрастыру қадамын қоспа».',
      },
      {
        en: 'Say the rule: short file, read at the start of every session, pruned when it stops being read. A bloated memory file is an ignored memory file.',
        kk: 'Ережені айт: файл қысқа болсын, әр сеанстың басында оқылады, оқылмай қалса қысқартылады. Ісініп кеткен жад файлы — еленбейтін жад файлы.',
      },
      {
        en: 'Ask the agent to commit with a descriptive message, then show git log --oneline: four commits, four laps of the loop.',
        kk: 'Agent-тен мазмұнды хабары бар commit жасауды сұра, сосын `git log --oneline` көрсет: төрт commit — циклдың төрт айналымы.',
      },
    ],
  },
  {
    from: '1:25',
    to: '1:34',
    energy: 'interact',
    slide: 11,
    module: 'security',
    title: {
      en: 'Spot the bug: twelve lines, three problems',
      kk: 'Қатені тап: он екі жол, үш мәселе',
    },
    goal: {
      en: 'The room discovers, by arguing with each other rather than listening to you, that plausible code and correct code are different things.',
      kk: 'Зал сені тыңдап емес, бір-бірімен таласып отырып, «сенімді көрінетін код» пен «дұрыс код» екі бөлек нәрсе екенін өзі ашады.',
    },
    doing: [
      {
        en: 'Show the snippet. Individual vote A/B/C/D with no talking. Show the split on screen without saying who is right.',
        kk: 'Код үзіндісін көрсет. Сөйлеспей, әркім жеке A/B/C/D дауысын берсін. Кім дұрыс екенін айтпай, дауыстардың бөлінуін экранға шығар.',
      },
      {
        en: 'Two minutes of pair discussion, then a revote. The second vote is the lesson; the first one was only the hook.',
        kk: 'Екі минут жұппен талқыла, сосын қайта дауыс бер. Сабақ — екінші дауыс беруде; біріншісі тек қызықтыру үшін болды.',
      },
      {
        en: 'Resolve all three: a secret key shipped to every browser, user input injected straight into HTML, and the string bug where "1000" + "100" becomes "1000100".',
        kk: 'Үшеуін де талда: әр браузерге тарап кеткен құпия кілт, HTML ішіне тікелей енгізілген пайдаланушы мәтіні және «1000» + «100» = «1000100» болатын мәтін қатесі.',
      },
      {
        en: 'Anchor it in numbers: of 1 645 scanned Lovable apps, 170 exposed names, emails, financial data and API keys. AI co-authored pull requests carried about 1.7 times more issues — 10.83 against 6.45 per pull request.',
        kk: 'Сандармен бекіт: тексерілген 1 645 Lovable қолданбасының 170-і аттарды, электрондық пошталарды, қаржы деректері мен API кілттерін ашық қалдырған. ЖИ қатысқан pull request-терде мәселе шамамен 1,7 есе көп болған — біреуіне 10,83 қате, адамдікінде 6,45.',
      },
    ],
  },
  {
    from: '1:34',
    to: '1:44',
    energy: 'demo',
    module: 'deploy',
    title: {
      en: 'Demo 3: break it, debug it, ship it',
      kk: 'Demo 3: бұз, жөнде, шығар',
    },
    goal: {
      en: 'The room has one repeatable debugging sentence and has watched a folder turn into a public URL in under a minute.',
      kk: 'Залда қайталап қолдануға келетін бір жөндеу сөйлемі бар және олар бір минуттан аз уақытта қалтаның ашық URL-ге айналғанын көрді.',
    },
    doing: [
      {
        en: 'Show the symptom in the browser and the red error in the console. Ask the room: what three things do we give the agent? Symptom, expected result, exact error.',
        kk: 'Браузердегі белгіні және консольдегі қызыл қатені көрсет. Залдан сұра: agent-ке қай үш нәрсені береміз? Белгі, күтілген нәтиже, дәл қате мәтіні.',
      },
      {
        en: 'Paste prompt D: root cause explained in two sentences as if to a first-year student, a failing test first, then the fix, and do not suppress the error.',
        kk: 'D prompt-ын қой: түбірлі себебін бірінші курс студентіне түсіндіргендей екі сөйлеммен айт, алдымен құлайтын тест жаз, сосын түзет және қатені баса көрсетпей жасырма.',
      },
      {
        en: 'Ship: drag the folder onto Netlify Drop, put the URL in a QR, and let the room open it while you are still talking.',
        kk: 'Шығар: қалтаны Netlify Drop бетіне сүйреп апар, URL-ді QR-кодқа сал және сен әлі сөйлеп тұрғанда зал оны ашсын.',
      },
      {
        en: 'Say the fine print out loud: an unclaimed Netlify Drop URL is password-protected until you claim it, and anything that needs a build step needs a login.',
        kk: 'Ұсақ жазуын дауыстап айт: иеленбеген Netlify Drop сілтемесі сен оны өзіңе бекітпейінше құпиясөзбен қорғалады, ал құрастыру қадамы керек жобаға аккаунтқа кіру қажет.',
      },
    ],
    fallback: {
      en: 'Pre-deployed URL and QR on the slide, plus a screenshot of the console error so the debugging story still works with no browser. Fully offline: play the recording, pause it on the error, make the room shout the three things, then play the fix.',
      kk: 'Слайдта алдын ала жарияланған сілтеме мен QR-код, қоса консольдегі қатенің скриншоты — сонда браузерсіз де жөндеу әңгімесі жүреді. Мүлде интернетсіз: жазбаны қос, қате тұрған жерде тоқтат, зал үш нәрсені дауыстап айтсын, сосын түзетуді көрсет.',
    },
  },
  {
    from: '1:44',
    to: '1:52',
    energy: 'teach',
    slide: 5,
    module: 'why-now',
    title: {
      en: 'The honest slide: does this actually make you faster?',
      kk: 'Шыншыл слайд: бұл шынымен жылдамдата ма?',
    },
    goal: {
      en: 'Nobody leaves oversold. The room can answer a sceptical friend with real numbers instead of enthusiasm.',
      kk: 'Ешкім артық үміт арқалап кетпесін. Зал күдікті досына шабытпен емес, нақты сандармен жауап бере алады.',
    },
    doing: [
      {
        en: 'This is the slump. The demos are over, it is minute 105, people are tired. Lower your voice instead of raising it, and say out loud that you are about to argue against your own workshop.',
        kk: 'Дәл осы жер — шаршау сәті. Демолар бітті, 105-минут, адамдар шаршады. Дауысты көтермей, керісінше бәсеңдет және ашық айт: қазір өз сабағыңа қарсы дәлел келтіресің.',
      },
      {
        en: 'METR, early 2025: 16 experienced developers on their own repositories took 19% longer with AI, while expecting to be 24% faster. The February 2026 update still measures slowdowns — minus 18% and minus 4% — with confidence intervals crossing zero, and METR itself calls that only very weak evidence.',
        kk: 'METR, 2025 жылдың басы: өз репозиторийлерінде жұмыс істеген 16 тәжірибелі әзірлеуші ЖИ-мен 19% ұзағырақ істеген, ал өздері 24% жылдам боламыз деп күткен. 2026 ж. 24 ақпандағы жаңартуда да баяулау көрінеді — минус 18% және минус 4% — сенім аралықтары нөлден өтеді, ал METR оны «өте әлсіз дәлел» деп атайды.',
      },
      {
        en: 'Stack Overflow 2025: 84% use or plan to use AI, but only 33% trust its accuracy against 46% who distrust it, and 66% are frustrated by answers that are almost right.',
        kk: 'Stack Overflow 2025: 84% ЖИ-ді қолданады немесе қолданбақ, бірақ дәлдігіне тек 33% сенеді, ал 46% сенбейді; 66%-ын «дәлге жақын, бірақ дәл емес» жауаптар ашуландырады.',
      },
      {
        en: 'Then land it: none of that says do not do this. It says the value sits in the VERIFY step — and that is exactly the part you can learn tonight.',
        kk: 'Сосын түйінде: бұлардың бірі де «жасама» деп тұрған жоқ. Бұл — құндылық VERIFY қадамында дегені, ал дәл соны бүгін кешке үйренуге болады.',
      },
    ],
  },
  {
    from: '1:52',
    to: '2:00',
    energy: 'interact',
    slide: 16,
    module: 'problem-solving-mindset',
    title: {
      en: 'Five rules, two cards, one ask',
      kk: 'Бес ереже, екі қағаз, бір өтініш',
    },
    goal: {
      en: 'Everyone leaves with five sentences they can repeat from memory and one concrete thing they will do tonight.',
      kk: 'Әркім жатқа қайталай алатын бес сөйлеммен және бүгін кешке істейтін бір нақты іспен кетеді.',
    },
    doing: [
      {
        en: 'Redraw the loop from memory and make the room say the five words with you, out loud, twice.',
        kk: 'Циклды жатқа қайта сыз және бес сөзді залмен бірге дауыстап екі рет айт.',
      },
      {
        en: 'The five rules: say what done looks like; plan before you build; make it prove it; after two failed corrections run /clear and write a better first prompt; commit what works, no secrets in code, low stakes first.',
        kk: 'Бес ереже: «дайын» деген не екенін айт; құрастырмас бұрын жоспарла; дәлелдеуін талап ет; екі түзету сәтсіз болса `/clear` жасап, жақсырақ бірінші prompt жаз; істеп тұрғанын commit жаса, кодта құпия сақтама, алдымен тәуекелі аз нәрседен баста.',
      },
      {
        en: 'Minute cards: green is one thing you learned, red is one thing still unclear. Stick them on the door on the way out; helpers cluster the red ones into the Q&A bursts.',
        kk: 'Минут қағаздары: жасылға — үйренген бір нәрсең, қызылға — әлі түсініксіз бір нәрсе. Шыққанда есікке жабыстыр; көмекшілер қызылдарын сұрақ-жауап блогына топтастырады.',
      },
      {
        en: 'The ask, said plainly: reading about this changes nothing. Tonight, one hour, one small thing, one link you can send to somebody. That is the whole point of the next hour.',
        kk: 'Өтінішті ашық айт: бұл туралы оқу ештеңені өзгертпейді. Бүгін кешке — бір сағат, бір шағын нәрсе, біреуге жібере алатын бір сілтеме. Келесі сағаттың бүкіл мәні — осы.',
      },
    ],
  },
  {
    from: '2:00',
    to: '2:10',
    energy: 'break',
    title: {
      en: 'Break — ten real minutes',
      kk: 'Үзіліс — толық он минут',
    },
    goal: {
      en: 'The room refills, and the red cards turn into a question list you can actually use.',
      kk: 'Зал қайта толады, ал қызыл қағаздар шынымен қолданатын сұрақтар тізіміне айналады.',
    },
    doing: [
      {
        en: 'Helpers cluster the red cards into six to eight questions and hand you the list on paper.',
        kk: 'Көмекшілер қызыл қағаздарды алты-сегіз сұраққа топтастырып, тізімді саған қағазбен береді.',
      },
      {
        en: 'Reset the laptop to the project cards slide and start the visible 40-minute timer only when people are actually back in their seats.',
        kk: 'Ноутбукті тапсырма карталары слайдына қайтар және көрінетін 40 минуттық таймерді адамдар шынымен орнына отырғанда ғана қос.',
      },
      {
        en: 'Do not shorten this. A skipped break costs more in the last hour than the ten minutes it saves.',
        kk: 'Бұны қысқартпа. Өткізіп жіберілген үзіліс соңғы сағатта өзі үнемдеген он минуттан қымбатқа түседі.',
      },
    ],
  },

  // --------------------------------------------- part B: build together + Q&A
  {
    from: '2:10',
    to: '2:15',
    energy: 'build',
    title: {
      en: 'Pick a project, find a partner',
      kk: 'Тапсырма таңда, жұптас тап',
    },
    goal: {
      en: 'Every pair has one card, one working seat and one person already on the keyboard within five minutes.',
      kk: 'Бес минут ішінде әр жұпта бір карта, бір жұмыс істейтін орын және пернетақтада отырған бір адам болады.',
    },
    doing: [
      {
        en: 'Pair by mixed experience, and the less experienced person drives first. Pair everyone, not only the people who look lost.',
        kk: 'Жұпты тәжірибесі әртүрлі адамдардан құра, пернетақтаға алдымен тәжірибесі азы отырады. Жұпқа бәрін бөл, тек сасып қалғандарды емес.',
      },
      {
        en: 'Each pair picks one of the ten cards, or an idea from the word cloud that fits the same constraints: one page, no login, no paid API, no secrets.',
        kk: 'Әр жұп он картаның бірін таңдайды немесе сол шектеулерге сай идеяны алады: бір бет, кіру жүйесі жоқ, ақылы API жоқ, құпия деректер жоқ.',
      },
      {
        en: 'Start the visible timer and say the number out loud: forty minutes, three sprints, one link at the end.',
        kk: 'Көрінетін таймерді қос және санды дауыстап айт: қырық минут, үш кезең, соңында бір сілтеме.',
      },
    ],
  },
  {
    from: '2:15',
    to: '2:25',
    energy: 'build',
    module: 'idea-to-prd',
    title: {
      en: 'Sprint 1: describe, plan, get anything on screen',
      kk: '1-кезең: сипатта, жоспарла, экранға бірдеңе шығар',
    },
    goal: {
      en: 'Every pair has something rendering, however ugly. Nothing kills a build session like a blank screen at minute fifteen.',
      kk: 'Әр жұпта экранда бірдеңе көрінеді, қаншалықты ұсқынсыз болса да. Он бесінші минуттағы бос экраннан артық практиканы өлтіретін нәрсе жоқ.',
    },
    doing: [
      {
        en: 'Pairs paste the card starter prompt, answer the agent questions honestly, and approve a plan they have actually read.',
        kk: 'Жұптар картадағы бастапқы prompt-ты қояды, agent сұрақтарына шын жауап береді және шынымен оқыған жоспарды мақұлдайды.',
      },
      {
        en: 'Green card goes up the moment something renders. Helpers go to the red cards; the presenter never leaves the stage to fix one laptop.',
        kk: 'Экранда бірдеңе көрінген сәтте жасыл қағаз көтеріледі. Көмекшілер қызыл қағаздарға барады; жүргізуші бір ноутбук үшін сахнадан кетпейді.',
      },
      {
        en: 'Build project 1 on the big screen at the same pace as the room, never faster. If you are ahead, stop and wait in silence.',
        kk: 'Үлкен экранда 1-тапсырманы залмен бірдей қарқынмен жаса, ешқашан алда жүрме. Озып кетсең, тоқта да үнсіз күт.',
      },
    ],
  },
  {
    from: '2:25',
    to: '2:28',
    energy: 'interact',
    title: {
      en: 'Q&A burst 1: three questions while the agents work',
      kk: '1-сұрақ блогы: agent-тер істеп жатқанда үш сұрақ',
    },
    goal: {
      en: 'Dead waiting time becomes teaching time, and the red cards from the break get answered in public.',
      kk: 'Бос күту уақыты сабаққа айналады, ал үзілістегі қызыл қағаздар жұрт алдында жауап алады.',
    },
    doing: [
      {
        en: 'Three questions from the clustered red cards, 45 seconds each, no follow-ups. Say out loud that agent thinking time is exactly when to ask.',
        kk: 'Топтастырылған қызыл қағаздардан үш сұрақ, әрқайсысына 45 секунд, қосымша сұрақсыз. Agent ойланып тұрған уақыт — дәл сұрақ қоятын уақыт екенін айт.',
      },
      {
        en: 'If a question needs five minutes, say so honestly and park it for the closing block instead of stealing the sprint.',
        kk: 'Сұраққа бес минут керек болса, соны ашық айт та, кезеңнен уақыт ұрлаудың орнына қорытынды блокқа қалдыр.',
      },
    ],
  },
  {
    from: '2:28',
    to: '2:40',
    energy: 'build',
    module: 'test-and-quality',
    title: {
      en: 'Sprint 2: one feature, one fix, swap the driver',
      kk: '2-кезең: бір мүмкіндік, бір түзету, кезекті ауыстыр',
    },
    goal: {
      en: 'Every pair goes round the loop a second time, and both people have touched the keyboard by the end of it.',
      kk: 'Әр жұп циклдың екінші айналымын жасайды және кезең соңында екеуі де пернетақтаға отырып үлгереді.',
    },
    doing: [
      {
        en: 'Two minutes into this sprint, call "swap driver" out loud. Do not ask, tell — otherwise the confident one keeps the keyboard all night.',
        kk: 'Кезең басталғаннан кейін екі минут өткенде «кезекті ауыстыр» деп дауыстап айт. Сұрама, айт — әйтпесе батылырағы пернетақтаны кеш бойы жібермейді.',
      },
      {
        en: 'Helpers enforce the two-strikes rule: two failed corrections on the same bug means /clear and a better first prompt, not a third try.',
        kk: 'Көмекшілер «екі соққы» ережесін қадағалайды: бір қатеге екі түзету өтпесе, үшінші рет тырыспай, `/clear` жасап, жақсырақ бірінші prompt жазады.',
      },
      {
        en: 'If a pair is drowning, cut their must-have list in half in front of them. At this point scope fails, not skill.',
        kk: 'Бір жұп батып бара жатса, міндетті талаптар тізімін солардың көзінше екі есе қысқарт. Бұл кезде құлайтын нәрсе — дағды емес, ауқым.',
      },
    ],
  },
  {
    from: '2:40',
    to: '2:43',
    energy: 'interact',
    title: {
      en: 'Q&A burst 2',
      kk: '2-сұрақ блогы',
    },
    goal: {
      en: 'The second wind: the room hears what is working for other pairs, not only what is broken on their own screen.',
      kk: 'Екінші тыныс: зал тек өз экранындағы ақауды емес, басқа жұптарда не жұмыс істеп тұрғанын естиді.',
    },
    doing: [
      {
        en: 'Three more questions, and take one live from the floor if someone is visibly stuck on something the whole room shares.',
        kk: 'Тағы үш сұрақ; біреу бүкіл залға ортақ нәрседен тұрып қалғаны көрініп тұрса, сұрақты орнынан алып жауап бер.',
      },
      {
        en: 'Name one pair that is shipping well and say exactly what they did differently. Public credit moves a room faster than any slide.',
        kk: 'Жақсы алға басқан бір жұпты ата және олар нақты нені басқаша істегенін айт. Жұрт алдындағы мақтау кез келген слайдтан күштірек.',
      },
    ],
  },
  {
    from: '2:43',
    to: '2:55',
    energy: 'build',
    module: 'deploy',
    title: {
      en: 'Sprint 3: verify, then ship',
      kk: '3-кезең: тексер, сосын шығар',
    },
    goal: {
      en: 'Most of the room ends with a URL that somebody else can open on their own phone.',
      kk: 'Залдың көбі басқа біреу өз телефонынан аша алатын сілтемемен аяқтайды.',
    },
    doing: [
      {
        en: 'Read the definition of done from each card out loud, line by line, and have every pair check theirs against it.',
        kk: 'Әр картадағы «дайын» анықтамасын дауыстап жолма-жол оқы да, әр жұп өзінікін соған салып тексерсін.',
      },
      {
        en: 'Deploy: drag onto Netlify Drop, publish the artifact, or share the AI Studio link. Then post the link plus one line of description in the Telegram group.',
        kk: 'Жариялау: Netlify Drop бетіне сүйреп апар, artifact-ты жарияла немесе AI Studio сілтемесімен бөліс. Сосын Telegram тобына сілтемені және бір жол сипаттаманы жаз.',
      },
      {
        en: 'Say the honest thing about unfinished work: a half-built app with a live link beats a perfect one on a laptop that nobody will ever open.',
        kk: 'Аяқталмаған жұмыс туралы шынын айт: тірі сілтемесі бар жартылай қолданба ешкім ашпайтын ноутбуктегі мінсіз қолданбадан артық.',
      },
    ],
  },
  {
    from: '2:55',
    to: '3:05',
    energy: 'interact',
    slide: 15,
    title: {
      en: 'Demo gallery: 90 seconds each',
      kk: 'Демо галереясы: әрқайсысына 90 секунд',
    },
    goal: {
      en: 'The room watches people exactly like them ship something, and learns that the best story of the night is a bug story.',
      kk: 'Зал дәл өздеріндей адамдардың бірдеңе шығарғанын көреді және кештің ең жақсы әңгімесі — қате туралы әңгіме екенін ұғады.',
    },
    doing: [
      {
        en: 'Four or five volunteer pairs, 90 seconds each, opened from their own link on the big screen — never from your laptop.',
        kk: 'Төрт-бес ерікті жұп, әрқайсысына 90 секунд, үлкен экранда өз сілтемесінен ашылады — сенің ноутбугыңнан емес.',
      },
      {
        en: 'Three questions only: what did you ask for, what broke, how did you fix it.',
        kk: 'Тек үш сұрақ: нені сұрадың, не бұзылды, оны қалай түзеттің.',
      },
      {
        en: 'Applaud the best bug story, not the prettiest app, and say out loud why you are doing that.',
        kk: 'Ең әдемі қолданбаны емес, қате туралы ең жақсы әңгімені мақта және неге олай істеп тұрғаныңды дауыстап айт.',
      },
    ],
  },
  {
    from: '3:05',
    to: '3:10',
    energy: 'teach',
    slide: 16,
    module: 'overnight-builds',
    title: {
      en: 'Close: the seven days that matter more than tonight',
      kk: 'Қорытынды: бүгінгі кештен маңыздырақ жеті күн',
    },
    goal: {
      en: 'Everyone leaves with a plan for tomorrow, a place to post it, and the feeling that they have already started.',
      kk: 'Әркім ертеңгі жоспармен, оны жариялайтын орынмен және «бастап қойдым» деген сезіммен кетеді.',
    },
    doing: [
      {
        en: 'The seven-day plan on one slide: 30 to 45 minutes a day, one deliverable a day, posted in the group. Read day 1 out loud so it sounds small.',
        kk: 'Бір слайдта жеті күндік жоспар: күніне 30-45 минут, күніне бір нәтиже, топқа жарияланады. 1-күнді дауыстап оқы — сонда ол шағын болып естіледі.',
      },
      {
        en: 'The community: the QairuHub group, this site, and the follow-up call in a week where anyone gets 90 seconds to show what they built.',
        kk: 'Қауымдастық: QairuHub тобы, осы сайт және бір аптадан кейінгі онлайн кездесу — онда әркімге жасағанын көрсетуге 90 секунд беріледі.',
      },
      {
        en: 'The last line: the only difference between the people who demoed tonight and the people who did not is that they typed. Go and type.',
        kk: 'Соңғы сөз: бүгін демо көрсеткендер мен көрсетпегендердің жалғыз айырмасы — біріншілері жазып көрді. Бар да, жазып көр.',
      },
      {
        en: 'Group photo, then hold the room for ten minutes of nothing but questions. That is where the real ones come out.',
        kk: 'Ортақ фото, сосын тағы он минут тек сұраққа арнап қал. Ең шынайы сұрақтар дәл сол жерде шығады.',
      },
    ],
  },
];

// ------------------------------------------------------------- before the event
// Sent five days before, repeated one day before. Source: research section 5.
// `who` exists so that nobody reads an instruction that does not apply to them
// and concludes they cannot come.

export const beforeEvent: { title: L; body: L; who: L }[] = [
  {
    who: { en: 'everyone', kk: 'бәріне' },
    title: {
      en: 'A charged laptop and your phone',
      kk: 'Зарядталған ноутбук және телефон',
    },
    body: {
      en: 'The phone is not optional: half the room interactions run through a QR code, and you will test what you build on a real phone screen. A laptop is better, but the browser track works from a phone alone.',
      kk: 'Телефон міндетті: залдағы әрекеттердің жартысы QR-код арқылы өтеді, әрі жасағаныңды нақты телефон экранында сынайсың. Ноутбук жақсырақ, бірақ браузер жолы тек телефонмен де жүреді.',
    },
  },
  {
    who: { en: 'everyone', kk: 'бәріне' },
    title: {
      en: 'Join the Telegram group before you arrive',
      kk: 'Келмес бұрын Telegram тобына қосыл',
    },
    body: {
      en: 'Every prompt, link and QR code of the evening is posted there, and that is where helpers answer you during the build session. Joining at the door costs you the first ten minutes.',
      kk: 'Кештегі әрбір prompt, сілтеме және QR-код сонда жарияланады, ал практика кезінде көмекшілер саған сол жерде жауап береді. Есік алдында қосылсаң, алғашқы он минутыңды жоғалтасың.',
    },
  },
  {
    who: { en: 'everyone', kk: 'бәріне' },
    title: {
      en: 'A free GitHub account',
      kk: 'Тегін GitHub аккаунты',
    },
    body: {
      en: 'You will not need git in the first hour, but you will need somewhere to put the thing you build. Students: apply for GitHub Education at the same time — verified students get the Copilot Student plan, which is one of the zero-cost ways into the build session.',
      kk: 'Бірінші сағатта git керек болмайды, бірақ жасаған нәрсеңді қоятын орын керек болады. Студент болсаң, бірге GitHub Education-ға өтінім бер: расталған студенттерге Copilot Student жоспары беріледі, ал бұл — практика бөліміне тегін кіретін жолдардың бірі.',
    },
  },
  {
    who: { en: 'if you have a laptop', kk: 'ноутбугың болса' },
    title: {
      en: 'Do every install at home, never at the venue',
      kk: 'Барлық орнатуды үйде жаса, залда емес',
    },
    body: {
      en: 'Venue wifi will not survive fifty simultaneous downloads. Install and log in at home, open the tool once and confirm it actually starts. If something is still broken, come 20 to 30 minutes early — helpers fix installs at the setup desk, not from the stage.',
      kk: 'Залдағы wi-fi елу адамның бір мезгілде жүктеуіне шыдамайды. Үйде орнат, аккаунтқа кір, құралды бір рет ашып, шынымен іске қосылатынын тексер. Әлі де бірдеңе бұзық болса, 20-30 минут ерте кел: көмекшілер орнатуды сахнадан емес, дайындық үстелінде түзетеді.',
    },
  },
  {
    who: { en: 'if you will pay for one month', kk: 'бір айға төлей алсаң' },
    title: {
      en: 'Track B: Claude Code in a real folder',
      kk: 'B жолы: нақты қалтадағы Claude Code',
    },
    body: {
      en: 'Claude Code needs a paid plan: Pro is 20 dollars a month, or 17 a month billed annually. The easiest route is the Desktop app Code tab — no terminal, no Node.js. If you want the terminal, the native installer needs no admin rights and no WSL on Windows. Then check it: `claude --version` should print a version, and `claude doctor` diagnoses the rest. Requirements are modest, because the model runs in the cloud: Windows 10 1809 or newer, macOS 13 or newer, Ubuntu 20.04 or newer, 4 GB of RAM.',
      kk: 'Claude Code-қа ақылы жазылым керек: Pro айына 20 доллар, жылдық төлемде айына 17 доллар. Ең оңай жол — Desktop қолданбасының Code қойындысы: терминал да, Node.js та керек емес. Терминалды қаласаң, Windows-та жеке орнатқышқа әкімші құқығы да, WSL де қажет емес. Сосын тексер: `claude --version` нұсқаны көрсетуі керек, ал `claude doctor` қалғанын анықтайды. Талаптар шағын, себебі модель бұлтта жұмыс істейді: Windows 10 1809 немесе жаңасы, macOS 13 немесе жаңасы, Ubuntu 20.04 немесе жаңасы, 4 ГБ жад.',
    },
  },
  {
    who: { en: 'if you cannot install anything', kk: 'ештеңе орната алмасаң' },
    title: {
      en: 'Track A: the browser, zero cost, nothing to install',
      kk: 'A жолы: браузер, тегін, ештеңе орнатпайсың',
    },
    body: {
      en: 'This is the fallback that means nobody is left out, and plenty of people will build the whole evening here. Create a free account at claude.ai — Kazakhstan is on the supported-countries list, so no VPN — and in Settings, Capabilities, switch on Code execution and file creation so artifacts work. Then sign in to Google AI Studio with any Google account and open Build. Both run on a phone, a borrowed laptop or a university computer.',
      kk: 'Бұл — ешкім шет қалмайтын қосалқы жол, әрі көп адам бүкіл кешті осында өткізеді. claude.ai сайтында тегін аккаунт аш — Қазақстан қолдау көрсетілетін елдер тізімінде, сондықтан VPN керек емес — сосын «Параметрлер», «Capabilities» бөлімінде «Code execution and file creation» дегенді қос, сонда artifact-тар жұмыс істейді. Одан кейін кез келген Google аккаунтымен Google AI Studio-ға кіріп, Build бөлімін аш. Екеуі де телефонда, біреуден сұраған ноутбукте немесе университет компьютерінде жүреді.',
    },
  },
  {
    who: { en: 'if you already write code and will not pay', kk: 'код жазып жүрсең, бірақ төлемейтін болсаң' },
    title: {
      en: 'Track C: a free agent in your folder',
      kk: 'C жолы: қалтаңдағы тегін agent',
    },
    body: {
      en: 'Three zero-cost options, each with fine print worth reading before you rely on it. Codex CLI works on a free ChatGPT account, but the free limits are not published anywhere. The Antigravity Individual plan is 0 dollars with basic weekly rate limits, and users report exhausting them in minutes. Copilot Free gives 2 000 completions and 50 chat requests a month, which one evening of building can finish. Test yours at home on a small task.',
      kk: 'Үш тегін нұсқа бар, әрқайсысының сүйенер алдында оқитын ұсақ жазуы бар. Codex CLI тегін ChatGPT аккаунтымен жұмыс істейді, бірақ тегін шектеулері еш жерде жарияланбаған. Antigravity-дің Individual жоспары 0 доллар, апталық негізгі шектеулерімен, ал пайдаланушылар оны бірнеше минутта таусып алатынын айтады. Copilot Free айына 2 000 толықтыру және 50 чат сұрауын береді, мұны бір кештік жұмыс бітіріп тастайды. Өзіңдікін үйде шағын тапсырмамен сынап көр.',
    },
  },
  {
    who: { en: 'everyone', kk: 'бәріне' },
    title: {
      en: 'Decide your data setting before you paste anything',
      kk: 'Бірдеңе қоймас бұрын деректер параметрін шеш',
    },
    body: {
      en: 'On Free, Pro and Max you choose whether your data may be used for model training, at claude.ai/settings/data-privacy-controls. With it on, retention is 5 years; with it off, 30 days. Decide once, at home, calmly. The rule that matters more than the setting: never paste other people personal data or your employer secrets into any AI tool, tonight or ever.',
      kk: 'Free, Pro және Max жоспарларында деректеріңнің модельді оқытуға пайдаланылуын өзің шешесің — claude.ai/settings/data-privacy-controls бетінде. Қосулы болса, сақтау мерзімі 5 жыл; өшірулі болса, 30 күн. Мұны үйде, асықпай, бір рет шеш. Ал параметрден де маңыздырақ ереже: бөгде адамдардың дербес деректерін немесе жұмыс орныңның құпияларын ешқандай ЖИ құралына қойма — бүгін де, ешқашан да.',
    },
  },
];

// ---------------------------------------------------------------- presenter kit
// Packed the night before, checked at T-2 minutes. One person presents, so every
// item here exists to remove one thing you would otherwise have to think about on stage.

export const presenterKit: { title: L; body: L }[] = [
  {
    title: {
      en: 'Terminal at 20pt or larger, light theme',
      kk: 'Терминал шрифті 20pt немесе үлкенірек, жарық режим',
    },
    body: {
      en: 'Black text on white beats any dark theme on a projector, and the back row decides your font size, not your laptop screen. Set it the night before and never touch it during the talk. Same for the editor and the browser.',
      kk: 'Проекторда ақ фондағы қара мәтін кез келген қараңғы режимнен артық, ал шрифт өлшемін ноутбугың емес, артқы қатар шешеді. Кеше кешке орнатып қой да, сөйлеу кезінде мүлде қолыңды тигізбе. Редактор мен браузерде де солай.',
    },
  },
  {
    title: {
      en: 'Browser zoomed to 150 per cent, everything else closed',
      kk: 'Браузерде бет 150 пайызға ұлғайтылған, қалғаны жабық',
    },
    body: {
      en: 'Press Ctrl and plus until a person in the last row can read a URL out loud. Close every unrelated tab and window: a stray bookmark bar with a personal link is a story the room will remember better than your demo.',
      kk: 'Артқы қатардағы адам URL-ді дауыстап оқи алғанша Ctrl мен + бас. Қатысы жоқ барлық қойынды мен терезені жап: бетбелгілер жолағындағы кездейсоқ жеке сілтеме зал есінде демоңнан да жақсы қалады.',
    },
  },
  {
    title: {
      en: 'Tabs pre-opened, in the order you will need them',
      kk: 'Қойындылар алдын ала, керек ретімен ашылған',
    },
    body: {
      en: 'claude.ai with the demo chat ready, Google AI Studio Build as the Demo 1 fallback, the pre-published Dastarkhan Split link, the Netlify Drop page, status.claude.com, and the slide deck. Nothing else. You should never search for a tab while a room of a hundred people watches.',
      kk: 'Демоға дайын чаты бар claude.ai, Demo 1-дің қосалқы жолы ретінде Google AI Studio Build, алдын ала жарияланған Dastarkhan Split сілтемесі, Netlify Drop беті, status.claude.com және слайдтар. Басқа ештеңе жоқ. Жүз адам қарап отырғанда қойынды іздеп отыруға болмайды.',
    },
  },
  {
    title: {
      en: 'The demo repo, tagged at every checkpoint',
      kk: 'Әр қадамда тегі қойылған демо репозиторийі',
    },
    body: {
      en: 'One repo with a tag per step: step-0-empty, step-1-plan with PLAN.md already saved, step-2-built, step-3-tested, step-4-styled, plus the bug-demo branch for Demo 3. When something stalls you run one checkout, say out loud that this is a checkpoint from rehearsal, and keep moving. This is what turns a dead demo into a 15-second pause.',
      kk: 'Әр қадамға бір тегі бар жалғыз репозиторий: step-0-empty, PLAN.md сақталып қойылған step-1-plan, step-2-built, step-3-tested, step-4-styled, қоса Demo 3 үшін bug-demo тармағы. Бірдеңе тоқтап қалса, бір checkout жасайсың, бұл дайындық кезіндегі сақтау нүктесі екенін ашық айтасың да, әрі қарай жүресің. Дәл осы нәрсе өлі демоны 15 секундтық кідіріске айналдырады.',
    },
  },
  {
    title: {
      en: 'An offline copy of every page you will show',
      kk: 'Экранда көрсететін әр беттің интернетсіз көшірмесі',
    },
    body: {
      en: 'Screenshot or save every URL that appears on a slide: the pricing page, the supported-countries list, the survey charts, the METR chart, the news headlines. Some of them refuse automated fetching anyway, so open them by hand and capture them. If the wifi dies you still have the whole evidence half of the talk.',
      kk: 'Слайдта шығатын әрбір URL-ді скриншотқа түсір немесе сақтап қой: баға беті, қолдау көрсетілетін елдер тізімі, сауалнама диаграммалары, METR диаграммасы, жаңалық тақырыптары. Кейбірі автоматты жүктеуге бәрібір көнбейді, сондықтан оларды қолмен ашып түсіріп ал. Wi-fi өлсе де, сөзіңнің дәлелдерге негізделген жартысы қолыңда қалады.',
    },
  },
  {
    title: {
      en: 'Silent screen recordings of all three demos',
      kk: 'Үш демоның үнсіз экран жазбалары',
    },
    body: {
      en: 'Recorded the day before, on the machine you will actually present from. You narrate over them live and ask the same prediction questions, so the room barely notices. A recording you narrate is a talk; a demo you debug on stage is a hostage situation.',
      kk: 'Кеше жазылған, дәл сөйлейтін ноутбугыңда. Оларды тірі дауыспен түсіндіріп, дәл сол болжам сұрақтарын қоясың, сондықтан зал байқамай да қалады. Түсіндіріп отырған жазба — бұл сабақ; сахнада жөндеп отырған демо — бұл кепілге алу.',
    },
  },
  {
    title: {
      en: 'Phone hotspot on a second carrier, already tested',
      kk: 'Екінші оператордағы телефон интернеті, алдын ала сыналған',
    },
    body: {
      en: 'The venue wifi and your hotspot must not be the same network. Connect the laptop to the hotspot once before doors open so there is no password dialog at minute four. Switching is step one of the fallback ladder and it should take you ten seconds.',
      kk: 'Залдағы wi-fi мен телефонындағы интернет бір желі болмауы керек. Есік ашылмай тұрып ноутбукті телефон интернетіне бір рет қосып қой, сонда төртінші минутта құпиясөз терезесі шықпайды. Ауысу — қосалқы баспалдақтың бірінші қадамы, оған он секунд кетуі тиіс.',
    },
  },
  {
    title: {
      en: 'Notifications off, and a bare demo account',
      kk: 'Хабарландырулар өшірулі, демоға арналған бос аккаунт',
    },
    body: {
      en: 'Do not disturb on the laptop and the phone, every chat app quit, a clean desktop. Better still, present from a separate user account on the machine that looks like a learner machine: no aliases, no custom shell, no half-finished projects. When your setup matches theirs, they can copy what they see.',
      kk: 'Ноутбукте де, телефонда да мазаламау режимі, барлық чат қолданбасы жабық, үстелде артық ештеңе жоқ. Одан да жақсысы — ноутбуктегі бөлек, үйренушінің құрылғысындай көрінетін тіркелгіден сөйле: бүркеншік пәрмендер жоқ, өзгертілген shell жоқ, жартылай бітпеген жобалар жоқ. Ортаң олардікімен бірдей болса, көргенін қайталай алады.',
    },
  },
  {
    title: {
      en: 'A second machine, logged in, at the same checkpoint',
      kk: 'Екінші ноутбук, аккаунтқа кірген, сол қадамда тұрған',
    },
    body: {
      en: 'Logged into a different account, on the same repo tag, screen unlocked, plugged in. A login failure or a usage limit on the main laptop then costs you the time it takes to walk two steps. Also useful for the demo gallery, when a pair cannot get their link open.',
      kk: 'Басқа аккаунтқа кірген, сол репозиторий тегінде тұрған, экраны ашық, қуатқа қосулы. Сонда негізгі ноутбуктегі кіру мәселесі немесе шектеу екі қадам жүруге кететін уақытқа ғана тұрады. Демо галереясында бір жұп сілтемесін аша алмай қалғанда да керек болады.',
    },
  },
  {
    title: {
      en: 'A Claude account you have not used today',
      kk: 'Бүгін пайдаланбаған Claude аккаунты',
    },
    body: {
      en: 'Usage resets on a rolling five-hour window and a weekly one, so rehearsing all afternoon on the account you will present with is how a demo dies at minute nine. Rehearse on one account, present on another, and check status.claude.com at T-2.',
      kk: 'Шектеу жылжымалы бес сағаттық және апталық терезе бойынша жаңарады, сондықтан түс ауа бойы сөйлейтін аккаунтыңмен дайындалу — демоның тоғызыншы минутта өлуінің қысқа жолы. Бір аккаунтпен дайындал, екіншісімен сөйле, ал T-2 сәтінде status.claude.com бетін тексер.',
    },
  },
  {
    title: {
      en: 'Every demo prompt in one text file, in order',
      kk: 'Барлық демо prompt-ы бір мәтін файлында, ретімен',
    },
    body: {
      en: 'Numbered, in the order you will paste them, open in a window you can reach without searching. Never type a demo prompt live: one typo on stage costs 40 seconds and all your momentum, and the room starts reading your typing instead of your point.',
      kk: 'Нөмірленген, қоятын ретімен, іздемей-ақ жететін терезеде ашық тұрсын. Демо prompt-ын ешқашан сахнада терме: бір қате әріп 40 секундты және бүкіл қарқынды алып кетеді, ал зал ойыңды емес, теріп жатқаныңды оқи бастайды.',
    },
  },
  {
    title: {
      en: 'Green and red cards, one pair per person',
      kk: 'Жасыл және қызыл қағаздар, әр адамға бір жұптан',
    },
    body: {
      en: 'Cut them the night before and count them twice. Green means I am fine, red means I need help, and they run the whole evening: the row walk, the build sprints, the minute cards at the end. Draw a different shape on each colour too, because colour blindness is common enough to matter in a room of a hundred.',
      kk: 'Кеше кешке қиып, екі рет санап шық. Жасыл — бәрі дұрыс, қызыл — көмек керек, әрі олар бүкіл кешті басқарады: қатарларды аралау, практика кезеңдері, соңындағы минут қағаздары. Әр түске бөлек пішін де сыз, себебі жүз адамдық залда түсті ажырата алмау кездесетін нәрсе.',
    },
  },
  {
    title: {
      en: 'Timing checkpoints taped to the laptop',
      kk: 'Ноутбукке жабыстырылған уақыт белгілері',
    },
    body: {
      en: 'Five numbers on one card, where only you can see them: 0:21 Demo 1 is finished, 0:52 you are inside the folder, 1:34 Demo 3 starts, 2:00 the break starts on time, 2:55 the gallery starts whatever is unfinished. If you are more than four minutes behind at any of them, cut a teaching beat, never the break and never the gallery.',
      kk: 'Бір қағазда бес сан, тек саған көрінетін жерде: 0:21 — Demo 1 бітті, 0:52 — қалтаның ішіндесің, 1:34 — Demo 3 басталды, 2:00 — үзіліс уақытында басталды, 2:55 — не бітпесе де галерея басталды. Солардың бірінде төрт минуттан көп қалып қойсаң, түсіндіру бөлігін қысқарт, ал үзіліс пен галереяға тиіспе.',
    },
  },
  {
    title: {
      en: 'Water, a mic, and helpers who know the crib sheet',
      kk: 'Су, микрофон және жадынаманы білетін көмекшілер',
    },
    body: {
      en: 'A bottle within reach, because you will talk for three hours. A mic even in a small room, because you will face the screen sometimes. And one helper per ten people, briefed on four moves: cut the must-have list in half, two failed corrections means `/clear`, Esc to redirect a wandering agent, `/rewind` when something that worked is broken.',
      kk: 'Қол жететін жерде бір бөтелке су, себебі үш сағат сөйлейсің. Шағын залда да микрофон, себебі кейде экранға қарап қаласың. Және әр он адамға бір көмекші, төрт әрекетті біліп тұрсын: міндетті талаптар тізімін екі есе қысқарту, екі түзету сәтсіз болса `/clear`, адасып кеткен agent-ті Esc арқылы қайта бағыттау, істеп тұрған нәрсе бұзылса `/rewind`.',
    },
  },
];

// ----------------------------------------------------------------- interactions
// Keyed to the clock in runOfShow. `prompt` is the exact sentence the presenter
// says out loud — written out because improvised instructions produce silence,
// and a room that does not understand the task assumes it is their fault.

export const interactions: { at: string; kind: L; prompt: L; why: L }[] = [
  {
    at: '-0:08',
    kind: { en: 'Entry poll', kk: 'Кіру сауалнамасы' },
    prompt: {
      en: 'Two questions before we start, and please answer honestly, because I am going to change how I explain things based on your answers. One: never written code, written a little, or you write code for money? Two: which of these AI tools have you actually opened yourself — not read about, opened?',
      kk: 'Бастар алдында екі сұрақ, және шыныңды айт, себебі мен жауаптарыңа қарап түсіндіру тәсілімді өзгертемін. Біріншісі: ешқашан код жазбағансың ба, сәл-пәл жаздың ба, әлде код жазып ақша табасың ба? Екіншісі: осы ЖИ құралдарының қайсысын шынымен өзің ашып көрдің — оқығаның емес, ашып көргенің?',
    },
    why: {
      en: 'It calibrates your vocabulary for the next three hours, and it tells you how to balance the pairs later. More importantly it is public: beginners find out in the first minute that they are the majority, which is the single cheapest way to stop them leaving at the break.',
      kk: 'Бұл алдағы үш сағатқа сөздігіңді реттейді және кейін жұптарды қалай теңестіру керегін айтады. Одан маңыздысы — ол ашық: бастаушылар бірінші минутта көпшілік өздері екенін біледі, ал бұл — олардың үзілісте кетіп қалмауының ең арзан тәсілі.',
    },
  },
  {
    at: '0:06',
    kind: { en: 'Three rules, said once', kk: 'Үш ереже, бір рет айтылады' },
    prompt: {
      en: 'Three rules for tonight. First: if you are stuck, put the red card up — you do not raise your hand and you do not say a word, a helper comes to you. Second: ask your question in Kazakh, Russian or English, whichever comes out faster, I do not care which. Third: errors are not the failure, they are the lesson — the best story of tonight will be somebody bug story, and I mean that literally, there is applause for it at the end.',
      kk: 'Бүгінгі үш ереже. Біріншісі: тұрып қалсаң, қызыл қағазды көтер — қол көтерудің де, дауыстаудың да қажеті жоқ, көмекші өзі келеді. Екіншісі: сұрағыңды қазақша, орысша немесе ағылшынша қой, қайсысы тез шықса, маған бәрібір. Үшіншісі: қате — сәтсіздік емес, сабақтың өзі. Бүгінгі ең жақсы әңгіме біреудің қате туралы әңгімесі болады, мұны сөзбе-сөз айтып тұрмын: соңында оған қошемет бар.',
    },
    why: {
      en: 'The red card removes the social cost of being stuck, which is the real reason people sit in silence for forty minutes. Naming the three languages out loud matters in this room specifically: people hesitate more over which language to ask in than over the question itself.',
      kk: 'Қызыл қағаз тұрып қалудың әлеуметтік бағасын жояды, ал адамдардың қырық минут үнсіз отыруының нағыз себебі — сол. Үш тілді дауыстап атау дәл осы залда маңызды: адамдар сұрақтың өзінен гөрі, оны қай тілде қою керегіне көбірек кідіреді.',
    },
  },
  {
    at: '0:08',
    kind: { en: 'Predict before the reveal', kk: 'Нәтижеге дейінгі болжам' },
    prompt: {
      en: 'Before I turn this around — hands up if you think the rounded amounts will add up exactly to the bill total. Hands down. Hands up if you think the Kazakh labels will all be correct. Keep your hand there, I want everyone to see this number. Right — remember what you just voted, because in ten minutes you will find out whether you were right.',
      kk: 'Мұны бұрып көрсетер алдында — дөңгелектенген сомалар есепшоттың жалпы сомасына дәл келеді деп ойласаң, қолыңды көтер. Түсір. Қазақша жазулардың бәрі дұрыс шығады деп ойласаң, қолыңды көтер. Қолыңды сол күйі ұста, бұл санды бәрі көрсін. Жақсы — қалай дауыс бергеніңді есіңде сақта, он минуттан кейін дұрыс болжағаныңды білесің.',
    },
    why: {
      en: 'A prediction makes people commit, and a committed guess is what makes the answer stick. Wrong guesses cost nothing here, which is exactly the relationship with being wrong that you want them to carry into the build session.',
      kk: 'Болжам адамды шешім қабылдауға мәжбүрлейді, ал айтылған болжамнан кейін жауап есте қалады. Мұнда қате болжам ештеңеге тұрмайды, ал қателікке деген дәл осындай қатынасты олардың практика бөліміне алып баруы керек.',
    },
  },
  {
    at: '0:23',
    kind: { en: 'Phones out, two minutes', kk: 'Телефондар қолға, екі минут' },
    prompt: {
      en: 'Open this QR on your phone and break it. You have two minutes and the timer is on the screen. Try a negative price. Try zero people on one item. Put an emoji where a name goes. Type a bill of one billion tenge. Shout out anything that looks wrong — do not put your hand up, just shout, I will write the best three straight into the fix prompt.',
      kk: 'Осы QR-кодты телефоныңнан ашып, оны бұзып көр. Екі минут уақытың бар, таймер экранда. Теріс бағаны байқап көр. Бір тағамға нөл адам қой. Ат орнына эмодзи жаз. Бір миллиард теңгелік есепшот тер. Тұрпайы көрінген нәрсені дауыстап айт — қол көтерме, жай дауыста, ең қызық үшеуін мен бірден түзету prompt-ына жазамын.',
    },
    why: {
      en: 'Two minutes of a hundred people is more input variety than any test suite they will write tonight, and they discover that themselves rather than hearing it from you. It also converts the passive half of the room into participants before the concept block, which is where you would otherwise lose them.',
      kk: 'Жүз адамның екі минуты — бүгін жазатын кез келген тесттен әлдеқайда алуан түрлі енгізу, әрі оны олар сенен естімей, өздері ашады. Сонымен бірге залдың енжар жартысы теориялық бөлікке дейін қатысушыға айналады, әйтпесе оларды дәл сол жерде жоғалтар едің.',
    },
  },
  {
    at: '0:38',
    kind: { en: 'Stand up and talk to one person', kk: 'Тұрып, бір адаммен сөйлес' },
    prompt: {
      en: 'Everybody stand up. Yes, everybody, including the back row. Turn to the person next to you. Ninety seconds each, and I will tell you when to swap: what would you build for your family business, your university or your city? Not something impressive — something that annoys you every week. Then one line into the Telegram group, and I will read three of them out loud.',
      kk: 'Бәрі орнынан тұрсын. Иә, бәрі, артқы қатарды қоса. Қасыңдағы адамға бұрыл. Әрқайсысына 90 секунд, ауысатын кезді мен айтамын: отбасы ісіне, университетіңе немесе қалаңа не жасар едің? Таңғаларлық нәрсе емес — апта сайын ашуыңды келтіретін нәрсе. Сосын Telegram тобына бір жол жаз, мен үшеуін дауыстап оқимын.',
    },
    why: {
      en: 'This lands at the forty-minute trough, and standing up is worth more than any slide you could put there. It also produces the raw material for the build session: by the break you have a list of real problems from the actual room, not from a template.',
      kk: 'Бұл қырқыншы минуттағы шаршау сәтіне тап келеді, ал орныңнан тұру сол жерге қоятын кез келген слайдтан пайдалы. Сонымен бірге практика бөліміне шикізат береді: үзіліске дейін қолыңда үлгіден емес, нақты залдан жиналған шынайы мәселелер тізімі болады.',
    },
  },
  {
    at: '0:43',
    kind: { en: 'Hands up per tool', kk: 'Әр құралға қол көтеру' },
    prompt: {
      en: 'I am going to name nine tools and I want a hand up for every single one you have opened. Claude.ai artifacts. Google AI Studio Build. Claude Code. Codex CLI. Cursor. Antigravity. Copilot in VS Code. Lovable. Bolt. Now look around the room. Almost nobody here has used more than three of those — so stop worrying about picking the right one, because the thing that transfers between all nine is the loop, not the logo.',
      kk: 'Қазір тоғыз құралды атаймын, әрқайсысын ашып көрген болсаң, қолыңды көтер. Claude.ai artifact-тары. Google AI Studio Build. Claude Code. Codex CLI. Cursor. Antigravity. VS Code ішіндегі Copilot. Lovable. Bolt. Енді айналаңа қара. Мұнда ешкім дерлік олардың үшеуінен көбін қолданбаған — сондықтан «дұрысын таңдау» деп уайымдауды қой, себебі тоғызының арасында тасымалданатын нәрсе логотип емес, цикл.',
    },
    why: {
      en: 'Tool anxiety is the most common reason a beginner never starts, and the fastest cure is showing them that the experienced people in the room have not tried most of these either. The count does the arguing for you.',
      kk: 'Құрал таңдаудан қорқу — бастаушының ешқашан бастамауының ең жиі себебі, ал оны емдеудің ең жылдам жолы — залдағы тәжірибелі адамдардың да олардың көбін қолданып көрмегенін көрсету. Дәлелді сен емес, санақ айтады.',
    },
  },
  {
    at: '0:56',
    kind: { en: 'The room answers the agent', kk: 'Залдың agent-ке жауабы' },
    prompt: {
      en: 'It asked us three questions, so we answer them. Question one is on the screen — shout your answer, loudest opinion wins, I am typing whatever I hear. For the second one I am going to type our answer in Kazakh on purpose, and I will tell you now what I expect: it will work, and it will be a bit weaker than the same sentence in English. Watch and judge for yourself.',
      kk: 'Ол бізге үш сұрақ қойды, ендеше жауап берейік. Бірінші сұрақ экранда — жауабыңды дауыстап айт, қайсысы қатты естілсе, соны жазамын. Екіншісіне жауапты әдейі қазақша жазамын және не күтетінімді қазірден айтайын: жұмыс істейді, бірақ ағылшынша жазылған сол сөйлемнен сәл әлсіздеу болады. Қарап отыр да, өзің бағала.',
    },
    why: {
      en: 'It shows that the agent can interview you instead of guessing, which is the single habit that most improves a beginner output. Typing one answer in Kazakh in public, and naming the limitation before it appears, buys you honesty credit you will spend later on the METR slide.',
      kk: 'Бұл agent-тің болжаудың орнына сенен сұрай алатынын көрсетеді, ал бастаушының нәтижесін ең көп жақсартатын әдет — осы. Бір жауапты жұрт алдында қазақша жазып, шектеуін ол көрінбей тұрып айтқаның саған шыншылдық беделін береді, ал оны кейін METR слайдында жұмсайсың.',
    },
  },
  {
    at: '1:05',
    kind: { en: 'Approve or deny, thumbs', kk: 'Мақұлдау не бас тарту, бас бармақпен' },
    prompt: {
      en: 'It is asking for permission and I am not clicking until you vote. Thumbs up to allow, thumbs down to deny. Read what it actually wants to do first — not what you assume it wants to do. You in the blue jacket, you voted no: why? Tell the room. That instinct is the only safety layer this whole system has, and it is you, not the software.',
      kk: 'Ол рұқсат сұрап тұр, сендер дауыс бермейінше мен баспаймын. Рұқсат берсең — бас бармақ жоғары, бермесең — төмен. Алдымен оның шынымен не істегісі келетінін оқы, өзің ойлаған нәрсені емес. Көк күртеше кигені: сен «жоқ» дедің, неге? Залға айт. Осы түйсік — бүкіл жүйенің жалғыз қауіпсіздік қабаты, әрі ол бағдарлама емес, сенсің.',
    },
    why: {
      en: 'Reading a permission prompt before clicking is a habit, and habits are built by doing it together and out loud. Asking why for a deny is the important half: it puts a beginner reasoning in front of the room and usually it is better reasoning than the confident yes.',
      kk: 'Баспас бұрын рұқсат сұрауын оқу — әдет, ал әдет бірге және дауыстап істегенде қалыптасады. Бас тартудың себебін сұрау — бұның маңызды жартысы: ол бастаушының пайымын зал алдына шығарады, әрі ол көбіне сенімді «иә» дегеннен дұрысырақ болып шығады.',
    },
  },
  {
    at: '1:20',
    kind: { en: 'Two volunteers duel', kk: 'Екі еріктінің жекпе-жегі' },
    prompt: {
      en: 'I need two volunteers who will dictate a prompt to me out loud. First one: give me a vague styling request, the kind you would actually type at midnight. Something like make it look better. Thank you — look at that result in silence for a second. Now I press Esc twice and everything we just did is gone, for free. Second volunteer: same goal, but be specific — exact colours, exact size, and tell it to report which rules it changed.',
      kk: 'Маған prompt-ты дауыстап айтатын екі ерікті керек. Біріншісі: маған бұлдыр безендіру сұрауын айт, түн ортасында өзің жазатындай. Мысалы, «make it look better». Рақмет — енді бір секунд үнсіз осы нәтижеге қарап тұр. Ал мен Esc-ті екі рет басамын да, жаңа істегеніміздің бәрі тегін жойылады. Екінші ерікті: мақсат сол, бірақ нақты айт — дәл түстер, дәл өлшем және «қай ережелерді өзгерткеніңді айт» деп қос.',
    },
    why: {
      en: 'Nothing you can say about prompt quality beats watching two prompts hit the same file back to back. The rewind in the middle is the real lesson though: it is the moment the room learns that experimenting costs nothing here.',
      kk: 'Prompt сапасы туралы айтқан кез келген сөзің бір файлға қатарынан түскен екі prompt-ты көрумен теңесе алмайды. Ал ортадағы кері қайтару — нағыз сабақ: зал дәл сол сәтте мұнда тәжірибе жасау тегін екенін түсінеді.',
    },
  },
  {
    at: '1:27',
    kind: { en: 'Vote, argue, vote again', kk: 'Дауыс бер, таласып ал, қайта дауыс бер' },
    prompt: {
      en: 'Twelve lines on the screen. Which one hurts you most in production: A, B, C, or D, none of them, ship it. Vote now, on your own, no talking. Here is the split — I am not telling you who is right. Two minutes: turn to the person next to you and argue. Now vote again. Look how that moved.',
      kk: 'Экранда он екі жол. Жұмыс ортасында саған қайсысы қатты соққы береді: A, B, C әлде D — ешқайсысы емес, шығара беруге болады? Қазір, жеке, сөйлеспей дауыс бер. Міне, дауыстардың бөлінуі — кімнің дұрыс екенін айтпаймын. Екі минут: қасыңдағы адамға бұрылып, таласып ал. Енді қайта дауыс бер. Қалай өзгергенін көр.',
    },
    why: {
      en: 'The second vote is the lesson; the first was only the hook. People are persuaded by a peer sitting next to them in a way they are not persuaded by a presenter, and the visible movement between the two votes is the proof they persuaded each other.',
      kk: 'Сабақ — екінші дауыс беруде, біріншісі тек қызықтыру үшін болды. Адам жанындағы құрдасының дәлеліне жүргізушінің дәлеліне сенбейтіндей сенеді, ал екі дауыс беру арасындағы көзге көрінетін өзгеріс — олардың бір-бірін сендіргенінің дәлелі.',
    },
  },
  {
    at: '1:36',
    kind: { en: 'Call and response', kk: 'Сұрақ — бірге жауап' },
    prompt: {
      en: 'There is the symptom in the browser and there is the red line in the console. Before I type anything: what three things do we give the agent? Shout them. Symptom. Expected result. Exact error text. Say it with me once more, because this is the sentence you will use every single day next week.',
      kk: 'Міне, браузердегі белгі, ал мынау — консольдегі қызыл жол. Мен бірдеңе термес бұрын: agent-ке қай үш нәрсені береміз? Дауыстап айт. Белгі. Күтілген нәтиже. Қатенің дәл мәтіні. Менімен бірге тағы бір рет айт, себебі келесі аптада күн сайын қолданатын сөйлемің — осы.',
    },
    why: {
      en: 'Three items said out loud twice by a hundred people is a better memory device than any slide. It also fills the wait while the agent works, which is exactly the dead air where a room goes quiet and starts checking phones.',
      kk: 'Жүз адамның екі рет дауыстап айтқан үш тармағы кез келген слайдтан жақсы есте қалады. Сонымен бірге бұл agent жұмыс істеп тұрған уақытты толтырады, ал дәл сол бос уақытта зал тынышталып, телефонға үңіле бастайды.',
    },
  },
  {
    at: '1:57',
    kind: { en: 'Minute cards on the door', kk: 'Есіктегі минут қағаздары' },
    prompt: {
      en: 'Take your two cards. On the green one write one thing you learned tonight. On the red one write one thing that is still unclear — and please write the real one, not a polite one, because the red cards are what I answer after the break. Stick them on the door on your way out. Ten minutes, real ten minutes, go.',
      kk: 'Екі қағазыңды ал. Жасылына бүгін үйренген бір нәрсеңді жаз. Қызылына әлі түсініксіз бір нәрсені жаз — сыпайысын емес, шынын жаз, себебі үзілістен кейін мен дәл қызыл қағаздарға жауап беремін. Шығып бара жатып есікке жабыстыр. Он минут, толық он минут, кеттік.',
    },
    why: {
      en: 'It gives you a real question list instead of the three loud people who would otherwise own the Q&A, and it gives quiet attendees a way to ask. It is also your only honest feedback on whether the first two hours landed.',
      kk: 'Бұл саған сұрақ-жауапты иемденіп алатын үш дауыстының орнына нақты сұрақтар тізімін береді, ал үндемейтіндерге сұрау мүмкіндігін береді. Сонымен қатар бұл — алғашқы екі сағаттың жеткен-жетпегені туралы жалғыз шыншыл кері байланыс.',
    },
  },
  {
    at: '2:30',
    kind: { en: 'Swap the driver', kk: 'Кезекті ауыстыру' },
    prompt: {
      en: 'Swap driver. Right now, both of you, hands off the keyboard and change seats. I am not asking, I am telling you, because if I ask, the confident one keeps the keyboard until midnight. Whoever has typed less in the last ten minutes is typing for the next ten.',
      kk: 'Кезекті ауыстыр. Дәл қазір, екеуің де пернетақтадан қолыңды ал да, орын алмас. Мен сұрап тұрған жоқпын, айтып тұрмын, себебі сұрасам, батылырағы пернетақтаны түн ортасына дейін жібермейді. Соңғы он минутта кім азырақ терген болса, келесі он минутта сол тереді.',
    },
    why: {
      en: 'The person who does not touch the keyboard learns almost nothing and leaves believing they could not do it. One sentence, said as an instruction and not a suggestion, is the difference between a pair session and a demonstration with an audience of one.',
      kk: 'Пернетақтаға тимеген адам түк үйренбейді және «менің қолымнан келмейді екен» деген оймен кетеді. Ұсыныс емес, бұйрық ретінде айтылған бір сөйлем — жұптық жұмыс пен бір көрерменге арналған көрсетілімнің арасындағы айырма.',
    },
  },
  {
    at: '2:56',
    kind: { en: 'Demo gallery', kk: 'Демо галереясы' },
    prompt: {
      en: 'Four pairs, ninety seconds each, and you open it from your own link on this screen, not from my laptop. Three questions only: what did you ask for, what broke, how did you fix it. And I am telling you now — the applause at the end is for the best bug story, not the prettiest app, because the bug story is the part that proves you understood something.',
      kk: 'Төрт жұп, әрқайсысына 90 секунд, әрі оны менің ноутбугымнан емес, осы экранда өз сілтемеңнен ашасың. Тек үш сұрақ: нені сұрадың, не бұзылды, оны қалай түзеттің. Және қазірден айтайын — соңындағы қошемет ең әдемі қолданбаға емес, қате туралы ең жақсы әңгімеге беріледі, себебі бірдеңені түсінгеніңді дәл сол әңгіме дәлелдейді.',
    },
    why: {
      en: 'People believe someone exactly like them far more than they believe you. Making them open their own link also proves the thing actually shipped, and rewarding the bug story sets what they will practise for the next seven days.',
      kk: 'Адам саған емес, дәл өзіндей біреуге әлдеқайда көп сенеді. Өз сілтемесінен аштыру оның шынымен жарияланғанын дәлелдейді, ал қате туралы әңгімені мадақтау олардың келесі жеті күнде нені жаттықтыратынын белгілейді.',
    },
  },
];

// ------------------------------------------------------------------ live demos
// `prompt` is the exact text, in English, already sitting in the clipboard file.
// Never retyped on stage. `ifItFails` is written so that the last rung of every
// ladder works with the wifi switched off entirely.

export const demos: { title: L; setup: L; prompt: string; expect: L; ifItFails: L }[] = [
  {
    title: {
      en: 'Demo 1: one paragraph, one link you can send',
      kk: 'Demo 1: бір абзац — жібере алатын бір сілтеме',
    },
    setup: {
      en: 'claude.ai in the browser, a fresh chat, with Code execution and file creation already switched on in Settings, Capabilities. A second tab on Google AI Studio Build with the same prompt ready. The pre-published version of the app bookmarked, and its QR already on a slide. Read the prompt line by line on screen before you talk about the result: goal, must-haves, constraints, language, and the last paragraph, which is the line almost nobody writes.',
      kk: 'Браузерде claude.ai, жаңа чат, «Параметрлер», «Capabilities» бөлімінде «Code execution and file creation» қосулы тұр. Екінші қойындыда дәл сол prompt дайын тұрған Google AI Studio Build. Қолданбаның алдын ала жарияланған нұсқасы бетбелгіде, ал оның QR-коды слайдта дайын. Нәтиже туралы сөйлемес бұрын prompt-ты экранда жолма-жол оқы: мақсат, міндетті талаптар, шектеулер, тіл және соңғы абзац — ешкім дерлік жазбайтын жол.',
    },
    prompt: `Build a single-page web app called "Dastarkhan Split". It splits a cafe bill between friends in Kazakhstani tenge.

Must have:
- add people by name
- add items with a price, and tick which people shared each item
- a service charge field, default 10%
- show what each person owes, rounded to the nearest 10 tenge, and make sure the rounded amounts still add up exactly to the bill total
- a "Copy summary" button that produces plain text I can paste into Telegram or WhatsApp
- English interface with a toggle to Kazakh
- mobile-first, one file, no external libraries

Before you build: list 3 test cases with exact expected numbers. Then build. Then check your own test cases and tell me which pass.`,
    expect: {
      en: 'Three named test cases with numbers appear first, then a working one-file app inside about two minutes. The rounding clause is the interesting part: it frequently gets the three test cases right and still leaves one tenge unaccounted for somewhere. Open the result, run its own three tests in front of the room, and read the numbers out loud. At least one Kazakh label will be awkward — that is the planned mistake, so ask a native speaker in the room to correct one string and paste their wording back in.',
      kk: 'Алдымен сандары бар, аталған үш тест жағдайы шығады, сосын екі минуттай уақытта бір файлдан тұратын жұмыс істейтін қолданба пайда болады. Ең қызығы — дөңгелектеу туралы талап: ол үш тестті жиі дұрыс өткізеді, бірақ бір жерде бір теңге есепсіз қалып қояды. Нәтижені аш, өзі жазған үш тестті залдың көзінше орында және сандарды дауыстап оқы. Қазақша жазулардың кемінде біреуі сөлекет шығады — бұл әдейі жасалған қате, сондықтан залдағы біреуден бір жолды түзетуді сұрап, сөзін орнына қой.',
    },
    ifItFails: {
      en: 'Decide in 30 seconds and never debug on stage. First the phone hotspot. Then the second tab in AI Studio Build with the same prompt. Then the pre-published link and its QR from the slide, said honestly out loud — this one is from yesterday, the live one is still thinking — which keeps the phone interaction working. Then the 90-second recording, narrated live with the same prediction question. With no internet at all: open dastarkhan-split.html from the disk and let one volunteer try to break it on your laptop while the room shouts suggestions.',
      kk: '30 секундта шеш, сахнада ешқашан жөндеме. Алдымен телефон интернеті. Сосын дәл сол prompt тұрған AI Studio Build қойындысы. Сосын слайдтағы алдын ала жарияланған сілтеме мен QR-код — шыныңды дауыстап айт: «бұл кешегісі, тірісі әлі ойланып жатыр» — сонда телефонмен тексеру бәрібір жүреді. Сосын 90 секундтық жазба, дәл сол болжам сұрағымен, тірі дауыспен түсіндіріледі. Мүлде интернетсіз: дискідегі `dastarkhan-split.html` файлын аш та, зал ұсыныс айтып отырғанда бір еріктіге өз ноутбугыңда бұздырып көр.',
    },
  },
  {
    title: {
      en: 'Demo 2: an agent in your folder, in plan mode',
      kk: 'Demo 2: қалтаңдағы agent, plan mode-та',
    },
    setup: {
      en: 'A folder called qazaq-cards containing exactly one file, words.csv, with 50 rows checked by a native speaker, and git init already run. Terminal open in that folder, the session switched to Manual mode before you start — on Pro, Max and Team the starting mode is Auto and a classifier approves most actions silently, so in Auto the room sees no permission prompts at all. Press Shift+Tab until the status line says plan mode, and point at it so everyone sees where it says that.',
      kk: 'Ішінде тек бір файл — ана тілінде сөйлейтін адам тексерген 50 жолдан тұратын `words.csv` бар `qazaq-cards` қалтасы, әрі `git init` орындалып қойған. Терминал сол қалтада ашық, ал сеанс бастамас бұрын Manual режимге ауыстырылған: Pro, Max және Team жоспарларында бастапқы режим — Auto, онда әрекеттердің көбін жіктеуіш үнсіз мақұлдайды, сондықтан Auto режимінде зал бірде-бір рұқсат сұрауын көрмейді. Күй жолында «plan mode» жазылғанша Shift+Tab бас та, сол жазуды саусағыңмен көрсет.',
    },
    prompt: `Read @words.csv. I want a flashcard web app for learning Kazakh words:
- show the Kazakh word, tap to flip to English and Russian
- buttons "Knew it" / "Didn't know"; cards I miss come back sooner
- progress saved in the browser
- a toggle between Cyrillic and Latin script
Plain HTML/CSS/JS, no build step, must work offline by opening index.html.
Ask me up to 3 questions if anything is unclear. Then propose a plan: files, data flow, and how you will verify it works. Do not write code yet.`,
    expect: {
      en: 'Within a minute it reads the file, then asks up to three real questions — usually about how much sooner a missed card should return and what the default script is. The room answers by vote. Then a written plan appears and nothing on disk has changed. Read the plan aloud and change one thing in it before you approve: a plan you approve without reading is not a plan. Only then let it build, and run the permission vote on the real prompts as they appear.',
      kk: 'Бір минут ішінде ол файлды оқиды, сосын үшке дейін нақты сұрақ қояды — әдетте қате айтылған карта қанша ертерек оралуы керегі және әдепкі жазу қайсысы екені туралы. Зал дауыс беру арқылы жауап береді. Сосын жазбаша жоспар шығады, ал дискіде ештеңе өзгермеген. Жоспарды дауыстап оқы да, мақұлдамас бұрын бір нәрсесін өзгерт: оқымай мақұлдаған жоспар — жоспар емес. Содан кейін ғана құрастыруға рұқсат бер және нақты рұқсат сұраулары шыққан сайын дауыс беруді өткіз.',
    },
    ifItFails: {
      en: 'The command `git checkout step-1-plan` gives you the saved PLAN.md — read that instead and say plainly that it is a checkpoint from rehearsal. A login failure or a usage limit means the second laptop, which is already sitting at the same tag. If the service itself is down, run the identical prompt in Codex CLI or Antigravity and make that the lesson out loud: the loop is tool-agnostic, which is exactly why we teach the loop. Fully offline: the step-1-plan and step-3-tested files are on disk, so read the plan and the recorded test output from the editor with no network at all.',
      kk: '`git checkout step-1-plan` пәрмені сақталған `PLAN.md` файлын береді — соны оқы да, бұл дайындық кезіндегі сақтау нүктесі екенін ашық айт. Кіру мәселесі немесе шектеу шықса — сол тегте тұрған екінші ноутбук. Қызметтің өзі істемей тұрса, дәл сол prompt-ты Codex CLI немесе Antigravity ішінде орында да, соны дауыстап сабаққа айналдыр: цикл құралға тәуелді емес, біз циклды дәл сондықтан үйретеміз. Мүлде интернетсіз: `step-1-plan` мен `step-3-tested` файлдары дискіде тұр, сондықтан жоспарды да, жазылып қойған тест нәтижесін де желісіз редактордан оқы.',
    },
  },
  {
    title: {
      en: 'Demo 3: break it, debug it, ship it',
      kk: 'Demo 3: бұз, жөнде, шығар',
    },
    setup: {
      en: 'The bug-demo branch of the flashcard app, where saved progress is read without a guard: a fresh browser throws a parse error and the streak shows 11 instead of 2, because a string was added to a number. Browser and console side by side on screen, the error already visible, the console font large. The Netlify Drop page open in another tab and the folder ready to drag. Ask the room for the three things before you type anything.',
      kk: 'Флешкарта қолданбасының `bug-demo` тармағы: сақталған үлгерім қорғаныссыз оқылады, сондықтан жаңа браузерде талдау қатесі шығады, ал серия 2-нің орнына 11 болып көрінеді, себебі санға мәтін қосылып кеткен. Экранда браузер мен консоль қатар тұр, қате көрініп тұр, консоль шрифті үлкен. Басқа қойындыда Netlify Drop беті ашық, қалта сүйреуге дайын. Бірдеңе термес бұрын залдан үш нәрсені сұра.',
    },
    prompt: `After I reload the page following my first session, I see this console error: [paste the exact error text here]. Expected: my progress is restored and the streak shows 2, but it shows 11.
Find the root cause and explain it to me in two sentences as if I were a first-year student. Write a failing test that reproduces it, then fix it and run the test. Do not suppress the error.`,
    expect: {
      en: 'Two sentences of root cause, a test that fails first, then the fix, then the test passing — in that order, which is the whole point. Read the failing line out loud when it appears: a demo where nothing ever fails teaches nothing at all. Then ship it: drag the folder onto Netlify Drop, put the URL in a QR, and let the room open it on their phones while you are still talking. Say the fine print out loud — an unclaimed Netlify Drop URL is password-protected until you claim it, and anything that needs a build step needs a login.',
      kk: 'Екі сөйлеммен түбірлі себеп, алдымен құлайтын тест, сосын түзету, сосын өтіп кеткен тест — дәл осы ретпен, ал бүкіл мән осында. Құлаған жол шыққанда соны дауыстап оқы: ешнәрсе құламайтын демо ештеңе үйретпейді. Сосын шығар: қалтаны Netlify Drop бетіне сүйреп апар, URL-ді QR-кодқа сал да, сен әлі сөйлеп тұрғанда зал оны телефонынан ашсын. Ұсақ жазуын дауыстап айт: иеленбеген Netlify Drop сілтемесі сен оны өзіңе бекітпейінше құпиясөзбен қорғалады, ал құрастыру қадамы керек жобаға аккаунтқа кіру қажет.',
    },
    ifItFails: {
      en: 'The console error is already a screenshot on a backup slide, so the whole debugging story works with no browser at all: show the screenshot, make the room shout the three things, then jump to the fixed tag on disk and read the diff. For shipping, the pre-deployed URL and its QR are on the slide — the room still opens a real link, it is just yesterday version, and you say so. Fully offline: play the recording, pause it on the red line, ask for the three things, then play the fix and the test output.',
      kk: 'Консольдегі қате қосалқы слайдта скриншот күйінде тұр, сондықтан бүкіл жөндеу әңгімесі браузерсіз де жүреді: скриншотты көрсет, зал үш нәрсені дауыстап айтсын, сосын дискідегі түзетілген тегке өт те, өзгерісті оқы. Жариялау үшін алдын ала жарияланған сілтеме мен оның QR-коды слайдта тұр — зал бәрібір нақты сілтемені ашады, жай ғана кешегі нұсқасы, ал сен соны айтасың. Мүлде интернетсіз: жазбаны қос, қызыл жолда тоқтат, үш нәрсені сұра, сосын түзетуді және тест нәтижесін көрсет.',
    },
  },
];

// ------------------------------------------------------- build-together projects
// Shared constraints so every card fits 40 minutes in any track: one static page
// or one script, no login, no paid API, no secrets, data in the browser or in a
// bundled file, mobile-first, deployable by drag-and-drop. Nobody starts from a
// blank page, so every card ships with a prompt you paste as it is.
// Every starterPrompt ends with the same verification tail on purpose.

export const projects: {
  title: L;
  brief: L;
  stack: L;
  starterPrompt: string;
  done: L;
  level: 1 | 2 | 3;
}[] = [
  {
    level: 1,
    title: { en: 'Dastarkhan Split', kk: 'Dastarkhan Split' },
    brief: {
      en: 'Split a cafe bill in tenge between friends, where not everybody ate everything. The arithmetic is the whole project: rounding each share to the nearest 10 tenge is easy, making the rounded shares still add up exactly to the bill is not. This is the card for a pair that has never built anything, and it is the one the presenter builds on the big screen.',
      kk: 'Кафедегі есепшотты достар арасында теңгемен бөлу, әрі бәрі бәрін жеген жоқ. Бүкіл жоба — арифметикада: әркімнің үлесін ең жақын 10 теңгеге дейін дөңгелектеу оңай, ал дөңгелектелген үлестердің жалпы сомаға дәл келуі оңай емес. Бұл карта — ешқашан ештеңе жасап көрмеген жұпқа арналған, әрі жүргізуші үлкен экранда дәл осыны жасайды.',
    },
    stack: {
      en: 'One HTML file, plain JavaScript, no libraries, nothing saved anywhere. Works in every track, including on a phone.',
      kk: 'Бір HTML файл, қарапайым JavaScript, кітапханасыз, ештеңе еш жерде сақталмайды. Барлық жолда жүреді, телефонда да.',
    },
    starterPrompt: `Build a one-file mobile web app that splits a cafe bill in tenge between friends: people by name, items with a price and a tick for who shared each item, a service charge field defaulting to 10%, amounts rounded to the nearest 10 tenge that still sum exactly to the bill total, and a "Copy summary" button that produces plain text for Telegram. English interface with a toggle to Kazakh. One file, no external libraries, mobile-first.

Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.`,
    done: {
      en: 'A 3-people, 4-item example matches a calculation you did by hand on paper; the rounded shares sum exactly to the total; a negative price and an empty name are both rejected with a readable message; the link opens on somebody else phone.',
      kk: '3 адам, 4 тағамнан тұратын мысал қағазда қолмен есептегеніңмен дәл келеді; дөңгелектелген үлестер жалпы сомаға дәл қосылады; теріс баға да, бос ат та оқуға болатын хабармен қабылданбайды; сілтеме басқа біреудің телефонында ашылады.',
    },
  },
  {
    level: 2,
    title: { en: 'Qazaq Cards', kk: 'Qazaq Cards' },
    brief: {
      en: 'Flashcards for learning Kazakh words, where the cards you get wrong come back sooner. The scheduling logic is the interesting half and it is also where the agent will quietly write something that looks right and is not, which makes this a good card for a pair that wants to practise verifying.',
      kk: 'Қазақ сөздерін үйренуге арналған флешкарталар, әрі қате айтқан карталарың ертерек қайта оралады. Ең қызық жартысы — кезекті есептеу логикасы, әрі agent дәл сол жерде дұрыс көрінетін, бірақ дұрыс емес нәрсені үнсіз жазып кетеді, сондықтан бұл карта тексеруді жаттыққысы келетін жұпқа қолайлы.',
    },
    stack: {
      en: 'One HTML file plus a small word list, progress in the browser only. No build step: it has to work by opening index.html straight from disk, with the wifi off.',
      kk: 'Бір HTML файл және шағын сөз тізімі, үлгерім тек браузерде сақталады. Құрастыру қадамы жоқ: `index.html` файлын дискіден тікелей ашқанда, wi-fi өшірулі күйінде жұмыс істеуі керек.',
    },
    starterPrompt: `Build an offline flashcard app for learning Kazakh words from this list [paste 20 rows: Kazakh, English, Russian]. Show the Kazakh word, tap to flip to the translations, buttons "Knew it" and "Didn't know", cards I miss come back sooner than cards I knew, progress saved in the browser, and a toggle between Cyrillic and Latin script. Plain HTML, CSS and JavaScript, no build step, must work offline by opening index.html.

Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.`,
    done: {
      en: 'A card you marked as missed comes back within the next 5 cards, and you checked that by counting, not by trusting; a page reload keeps your progress; the script toggle changes every card and not just the visible one; the whole thing still works with the wifi switched off.',
      kk: '«Білмедім» деп белгілеген картаң келесі 5 картаның ішінде қайта оралады, әрі мұны сеніп емес, санап тексердің; бетті қайта жүктегенде үлгерім сақталады; жазу ауыстырғышы тек көрініп тұрғанын емес, әр картаны өзгертеді; бәрі wi-fi өшірулі күйінде де жұмыс істейді.',
    },
  },
  {
    level: 1,
    title: { en: 'My page', kk: 'Менің бетім' },
    brief: {
      en: 'A one-page bilingual personal site with your real name, your real projects and your real contacts. It is the least technical card on the list and by far the most useful one after tonight: by day 7 it is the thing you send to a recruiter or a scholarship committee. The hard part is not the code, it is writing three honest sentences about yourself.',
      kk: 'Нақты атың, нақты жобаларың және нақты байланыс деректерің бар, бір беттен тұратын екітілді жеке сайт. Тізімдегі ең техникалық емес карта, бірақ бүгіннен кейінгі ең пайдалысы: 7-күні дәл осыны жұмыс берушіге немесе грант комиссиясына жібересің. Қиыны — код емес, өзің туралы үш шыншыл сөйлем жазу.',
    },
    stack: {
      en: 'One HTML file, no frameworks, no images heavier than the text. Should load on mobile data in a lecture hall basement.',
      kk: 'Бір HTML файл, фреймворксіз, мәтіннен ауыр сурет жоқ. Дәрісхананың жертөлесінде мобильді интернетпен жүктелуі керек.',
    },
    starterPrompt: `Build a one-page personal site for me. Here is what goes on it: [your name, 3 facts about you, 3 projects with one line each, your contacts]. Sections: a short hero, about, projects, contact. A toggle between English and Kazakh, a dark and light mode, no frameworks, and it must load fast on mobile data.

Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.`,
    done: {
      en: 'Every word on the page is yours and there is no placeholder text left anywhere; both languages are complete, not one language plus a half-translated menu; it looks right at 360 pixels wide and on a desktop; the live URL is in the Telegram group.',
      kk: 'Беттегі әр сөз — сенікі, еш жерде толтырғыш мәтін қалмаған; екі тіл де толық, бір тіл мен жартылай аударылған мәзір емес; ені 360 пиксель экранда да, компьютерде де дұрыс көрінеді; тірі сілтеме Telegram тобында тұр.',
    },
  },
  {
    level: 2,
    title: { en: 'Exam sprint timer', kk: 'Емтихан таймері' },
    brief: {
      en: 'A study timer for ENT or IELTS preparation that asks what you actually studied after every session and draws you a weekly chart of minutes per subject. The honest reason this card works: you will use it next week, and a tool you use is a tool you keep fixing, which is how you actually learn this.',
      kk: 'ҰБТ-ға немесе IELTS-ке дайындалуға арналған оқу таймері: әр сеанстан кейін нені оқығаныңды сұрайды да, пән бойынша апталық минут диаграммасын салып береді. Бұл картаның шын мәні: сен оны келесі аптада қолданасың, ал қолданатын құралыңды үнемі түзетіп отырасың, нақты үйрену дегеніміз — осы.',
    },
    stack: {
      en: 'One page, browser storage, a chart you draw yourself rather than pull from a library. CSV export so the data is never trapped.',
      kk: 'Бір бет, браузердегі сақтау, кітапханадан алмай, өзің салатын диаграмма. Деректер қамалып қалмауы үшін CSV-ге шығару.',
    },
    starterPrompt: `Build a Pomodoro study timer: 25 minutes of work and 5 of break by default, both adjustable. After each finished session it asks which subject I studied and saves it. It shows a weekly bar chart of minutes per subject. All data stays in the browser, with a button to export everything to CSV. One page, mobile-first, no login.

Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.`,
    done: {
      en: 'The timer keeps correct time when you switch to another browser tab and come back; a session you finish appears in the chart immediately; the exported CSV opens in Excel or Sheets with the columns in the right places; the reset button asks before it deletes anything.',
      kk: 'Басқа қойындыға ауысып қайта оралғанда таймер уақытты дұрыс санайды; аяқталған сеанс диаграммада бірден көрінеді; шығарылған CSV Excel немесе Sheets ішінде бағандары дұрыс күйде ашылады; тазалау түймесі бірдеңені жоймас бұрын сұрайды.',
    },
  },
  {
    level: 2,
    title: { en: 'Toi planner', kk: 'Той жоспарлаушы' },
    brief: {
      en: 'Guest list and budget for a family celebration: who is coming, from which side, how many seats, and what it costs planned against actual. Somebody in your family is doing this in a notebook right now, which makes this the card most likely to find a real user before the week is out.',
      kk: 'Отбасылық той үшін қонақтар тізімі мен бюджет: кім келеді, қай жағынан, қанша орын керек және жоспарланған мен нақты шығын қандай. Дәл қазір отбасыңда біреу мұны дәптерге жазып отыр, сондықтан бұл карта апта бітпей жатып нақты пайдаланушы табуға ең жақын.',
    },
    stack: {
      en: 'One page, browser storage, and a print stylesheet — because the person who will actually use it will want it on paper.',
      kk: 'Бір бет, браузердегі сақтау және басып шығаруға арналған стиль — себебі оны шын қолданатын адам қағаз күйінде қалайды.',
    },
    starterPrompt: `Build a planner for a family celebration. Guests: name, which side of the family, RSVP yes or no or maybe, and number of seats. Budget lines: description, planned amount in tenge, actual amount in tenge. Show the totals, the number of confirmed seats, and the cost per guest. Add a printable view that fits on one page. Everything stays in the browser, no login.

Ask me up to 3 questions first. Then show a short plan. Then build. Then list 3 test cases with expected results, run or walk through them, and tell me honestly which pass.`,
    done: {
      en: 'Totals are correct for a 5-guest sample you checked by hand; filtering by RSVP changes both the list and the totals, not just the list; the print view fits on one page with nothing cut off at the right edge; the data is still there after you reload.',
      kk: '5 қонақтан тұратын мысалдың жалпы сомасы қолмен тексергеніңмен дәл келеді; RSVP бойынша сүзгі тек тізімді емес, жалпы соманы да өзгертеді; басып шығару көрінісі бір бетке сыяды, оң жақ шеті кесілмейді; бетті қайта жүктегенде деректер орнында тұр.',
    },
  },
];

