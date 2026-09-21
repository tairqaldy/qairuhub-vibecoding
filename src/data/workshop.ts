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

