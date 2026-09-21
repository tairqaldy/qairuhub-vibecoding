[
  // --- prompting -----------------------------------------------------------
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
      en: 'Start zero-shot and add a worked example only when the answer misses the mark.',
      kk: 'Алдымен zero-shot тәсілімен сұра, жауап көңілден шықпаса ғана үлгі мысал қос.',
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
    en: 'prompt chaining',
    kk: 'промпт тізбегі',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Splitting a big job into several prompts, where each one takes the previous answer as its input.',
      kk: 'Промпт тізбегі — үлкен жұмысты бірнеше промптқа бөлу; әрқайсысы алдыңғысының жауабын кіріс ретінде алады.',
    },
    example: {
      en: 'First ask for the plan, then ask for the code from that plan: that is prompt chaining.',
      kk: 'Алдымен жоспар сұра, содан кейін сол жоспар бойынша код сұра — бұл промпт тізбегі.',
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
      en: 'One long prompt you write carefully once and then reuse for every task of the same kind.',
      kk: 'Негізгі промпт — бір рет мұқият жазып алып, сол тектес тапсырманың бәріне қайта қолданатын ұзын промпт.',
    },
    example: {
      en: 'Keep your master prompt in a file instead of retyping it every time.',
      kk: 'Негізгі промптыңды файлға сақтап қой, әр жолы қайта теріп отырма.',
    },
  },
  {
    en: 'task decomposition',
    kk: 'тапсырманы бөлшектеу',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Cutting one big request into small steps that can be checked one by one.',
      kk: 'Тапсырманы бөлшектеу — бір үлкен сұрауды бірінен соң бірін тексеруге келетін шағын қадамдарға бөлу.',
    },
    example: {
      en: 'Split the task into small steps and check the result after each one.',
      kk: 'Тапсырманы шағын қадамдарға бөл де, әр қадамнан кейін нәтижені тексер.',
    },
  },
  {
    en: 'clarifying question',
    kk: 'нақтылаушы сұрақ',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A question the agent asks you before it starts, so that it does not build the wrong thing.',
      kk: 'Нақтылаушы сұрақ — агент жұмысқа кіріспес бұрын саған қоятын сұрақ; қате нәрсе жасап қоймау үшін керек.',
    },
    example: {
      en: 'End the prompt with: ask me three questions before you write any code.',
      kk: 'Промпттың соңына «код жазбас бұрын маған үш сұрақ қой» деп жаз.',
    },
  },
  {
    en: 'ambiguity',
    kk: 'көмескілік',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A place in your instruction that can be read two ways; the model picks one of them, often not yours.',
      kk: 'Көмескілік — нұсқауыңның екі түрлі түсінуге болатын тұсы; модель біреуін таңдайды, көбіне сен ойлағанын емес.',
    },
    example: {
      en: 'Words like soon, nice and simple are ambiguity; numbers and examples are not.',
      kk: '«Тезірек», «әдемі», «қарапайым» деген сөздер — көмескілік; сан мен мысалда көмескілік жоқ.',
    },
  },
  {
    en: 'self-critique prompt',
    kk: 'өзін тексеру промпты',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Asking the model to go back over its own answer and name what is wrong with it before you accept it.',
      kk: 'Өзін тексеру промпты — модельден өз жауабын қайта қарап, ондағы кемшілікті өзіне атап беруді сұрау.',
    },
    example: {
      en: 'Ask: list three weaknesses in the code you just wrote, then fix them.',
      kk: '«Жаңа жазған кодыңның үш әлсіз тұсын ата да, түзет» деп сұра.',
    },
  },
  {
    en: 'grounding',
    kk: 'дереккөзге сүйену',
    keepLatin: false,
    alt: 'grounding',
    group: 'prompting',
    def: {
      en: 'Making the model answer from material you gave it and show where the answer came from, instead of from memory.',
      kk: 'Дереккөзге сүйену — модельді өз жадынан емес, сен берген материалға қарап жауап беруге және қай жерден алғанын көрсетуге мәжбүрлеу.',
    },
    example: {
      en: 'Say: answer only from this file and quote the line you used.',
      kk: '«Тек осы файлға сүйен және қай жолды алғаныңды көрсет» деп жаз.',
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
    en: 'non-goal',
    kk: 'мақсат емес',
    keepLatin: false,
    alt: 'non-goal',
    group: 'prompting',
    def: {
      en: 'Something you write down on purpose as a thing this piece of work will not do.',
      kk: '«Мақсат емес» — осы жұмыс әдейі істемейтін нәрсені алдын ала жазып қою.',
    },
    example: {
      en: 'Non-goals stop the agent from adding a sign-in page you never asked for.',
      kk: '«Мақсат емес» тізімі агенттің сұралмаған кіру бетін қосып қоюынан сақтайды.',
    },
  },
  {
    en: 'definition of done',
    kk: 'дайындық өлшемі',
    keepLatin: false,
    alt: 'definition of done',
    group: 'prompting',
    def: {
      en: 'The rule that says when any piece of work counts as finished: tested, reviewed, deployed, written down.',
      kk: 'Дайындық өлшемі — кез келген жұмыс қашан біткен саналатынын айтатын ереже: тексерілді, қаралды, шығарылды, жазылды.',
    },
    example: {
      en: 'Acceptance criteria belong to one feature; the definition of done is the same for everything.',
      kk: 'Қабылдау шарттары әр мүмкіндікке бөлек, ал дайындық өлшемі бәріне ортақ.',
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
  // --- product -------------------------------------------------------------
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
    en: 'user research',
    kk: 'пайдаланушыны зерттеу',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Talking to the people you are building for and watching what they actually do, before you decide what to build.',
      kk: 'Пайдаланушыны зерттеу — не жасау керегін шешпес бұрын, өнім кімге арналса, сол адаммен сөйлесіп, не істейтінін бақылау.',
    },
    example: {
      en: 'Five real conversations are worth more than fifty guesses.',
      kk: 'Бес шынайы әңгіме елу болжамнан құнды.',
    },
  },
  {
    en: 'use case',
    kk: 'қолдану сценарийі',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'One concrete situation in which a person uses your product to get something done.',
      kk: 'Қолдану сценарийі — адам сенің өніміңді бір нәрсені бітіру үшін қолданатын нақты жағдай.',
    },
    example: {
      en: 'Write three use cases before the first line of code.',
      kk: 'Бірінші жол кодқа дейін үш қолдану сценарийін жазып ал.',
    },
  },
  {
    en: 'value proposition',
    kk: 'құндылық ұсынысы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'One sentence saying what the user gets, who it is for, and why it beats what they do today.',
      kk: 'Құндылық ұсынысы — пайдаланушы не алатынын, бұл кімге арналғанын және бүгінгі әдетінен несімен артық екенін бір сөйлеммен айту.',
    },
    example: {
      en: 'If your value proposition needs a paragraph, it is not ready yet.',
      kk: 'Құндылық ұсынысың бір абзац болса, ол әлі дайын емес.',
    },
  },
  {
    en: 'competitor',
    kk: 'бәсекелес',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'Anyone else solving the same problem for the same people, including a notebook or a spreadsheet.',
      kk: 'Бәсекелес — сол мәселені сол адамдарға шешіп жүрген кез келген нәрсе; дәптер мен кесте файлы да бәсекелес.',
    },
    example: {
      en: 'Ask your first users what they used before you.',
      kk: 'Алғашқы пайдаланушыларыңнан «бұған дейін немен істедің?» деп сұра.',
    },
  },
  {
    en: 'hypothesis',
    kk: 'болжам',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A guess written down in a way that could later be shown to be wrong.',
      kk: 'Болжам — кейін жалған екені дәлелденетіндей етіп жазылған жорамал.',
    },
    example: {
      en: 'Write "students will use this every week", then go and check it.',
      kk: '«Студенттер мұны апта сайын қолданады» деп жаз да, барып тексер.',
    },
  },
  {
    en: 'experiment',
    kk: 'эксперимент',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A small, cheap test you run to find out whether a hypothesis holds.',
      kk: 'Эксперимент — болжамның расталатын-расталмайтынын білу үшін жүргізілетін шағын әрі арзан сынақ.',
    },
    example: {
      en: 'One landing page and twenty users is already an experiment.',
      kk: 'Бір лендинг пен жиырма пайдаланушының өзі — эксперимент.',
    },
  },
  {
    en: 'A/B test',
    kk: 'A/B тест',
    keepLatin: true,
    group: 'product',
    def: {
      en: 'Showing two versions to two groups of users and keeping the one that works better.',
      kk: 'A/B тест — екі нұсқаны екі топқа көрсетіп, нәтижесі жақсысын қалдыру.',
    },
    example: {
      en: 'Do not run an A/B test with ten users: the numbers will tell you nothing.',
      kk: 'Он адаммен A/B тест жүргізбе — сан ештеңе көрсетпейді.',
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
    en: 'early adopter',
    kk: 'ерте қолданушы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'One of the first people to try your product while it is still rough, because the problem hurts them enough.',
      kk: 'Ерте қолданушы — мәселе қатты батқандықтан, өнім әлі шикі кезінде оны қолданып көретін алғашқы адамдардың бірі.',
    },
    example: {
      en: 'Ten early adopters teach you more than a thousand visitors.',
      kk: 'Он ерте қолданушы мың келушіден көп үйретеді.',
    },
  },
  {
    en: 'waitlist',
    kk: 'күту тізімі',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A list of people who left their contact details to be told when the product opens.',
      kk: 'Күту тізімі — өнім ашылғанда хабар алу үшін байланысын қалдырған адамдардың тізімі.',
    },
    example: {
      en: 'A landing page with a waitlist tests the idea before the product exists.',
      kk: 'Күту тізімі бар лендинг өнім жасалмай тұрып-ақ идеяны тексереді.',
    },
  },
  {
    en: 'beta version',
    kk: 'бета-нұсқа',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A version handed to a small group on purpose, while you still expect to find problems in it.',
      kk: 'Бета-нұсқа — әлі қате шығатынын біле тұра, шағын топқа әдейі берілетін нұсқа.',
    },
    example: {
      en: 'Say out loud that it is a beta and people forgive the rough edges.',
      kk: 'Бұл бета-нұсқа екенін ашық айт — сонда адамдар кемшілігін кешіреді.',
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
    en: 'conversion',
    kk: 'конверсия',
    keepLatin: false,
    alt: 'мақсатты әрекетке жету үлесі',
    group: 'product',
    def: {
      en: 'The share of people who take the step you hoped for: signing up, sending the first message, paying.',
      kk: 'Конверсия — сен күткен қадамды жасаған адамдардың үлесі: тіркелді, бірінші хабарын жіберді, төлем жасады.',
    },
    example: {
      en: 'Measure conversion one step at a time, not across the whole journey.',
      kk: 'Конверсияны бүкіл жол бойынша емес, әр қадамға бөліп өлше.',
    },
  },
  {
    en: 'north star metric',
    kk: 'басты көрсеткіш',
    keepLatin: false,
    alt: 'north star metric',
    group: 'product',
    def: {
      en: 'The single number that best shows people are getting real value from your product.',
      kk: 'Басты көрсеткіш — адамдардың өніміңнен шынайы пайда көріп отырғанын ең жақсы көрсететін жалғыз сан.',
    },
    example: {
      en: 'For a learning site the north star is lessons finished, not page views.',
      kk: 'Оқу сайтының басты көрсеткіші — қаралым емес, аяқталған сабақ саны.',
    },
  },
  {
    en: 'unit economics',
    kk: 'бірлік экономикасы',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'What one user costs you and what one user brings in; if the cost is bigger, growth only makes it worse.',
      kk: 'Бірлік экономикасы — бір пайдаланушы қанша шығын әкеліп, қанша табыс әкелетіні; шығын көп болса, өсу жағдайды тек нашарлатады.',
    },
    example: {
      en: 'With AI inside, count the tokens one user burns in a month.',
      kk: 'Ішінде ЖИ болса, бір пайдаланушы айына қанша токен жұмсайтынын санап шық.',
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
];
