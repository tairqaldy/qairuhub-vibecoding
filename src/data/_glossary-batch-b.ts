[
  // --- prompting -----------------------------------------------------------
  {
    en: 'user prompt',
    kk: 'пайдаланушы промпты',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'The message you type yourself, as opposed to the system prompt that was set once for the whole session.',
      kk: 'Пайдаланушы промпты — сеанс басында бір рет қойылған жүйелік промптан бөлек, өзің теріп жіберетін хабар.',
    },
    example: {
      en: 'Keep the rules in the system prompt and put the task in the user prompt.',
      kk: 'Ережені жүйелік промптта қалдыр, тапсырманы пайдаланушы промптына жаз.',
    },
  },
  {
    en: 'structured prompt',
    kk: 'құрылымды промпт',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A prompt split into labelled parts - task, context, rules, format - so that nothing is lost inside one long paragraph.',
      kk: 'Құрылымды промпт — тапсырма, контекст, ереже, пішім деп бөлікке бөліп жазылған промпт; сонда ұзын абзацтың ішінде ештеңе жоғалмайды.',
    },
    example: {
      en: 'Four short labelled blocks work better than one paragraph holding everything.',
      kk: 'Бәрін бір абзацқа тықпалағаннан гөрі, төрт қысқа бөлікке бөлген артық.',
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
    en: 'negative example',
    kk: 'теріс мысал',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'An example of what you do not want, given so that the model can stay away from it.',
      kk: 'Теріс мысал — модель қашық жүрсін деп әдейі көрсетілетін «былай болмасын» деген мысал.',
    },
    example: {
      en: 'One good example plus one bad one teaches faster than a page of rules.',
      kk: 'Бір жақсы мысал мен бір теріс мысал бір бет ережеден тез үйретеді.',
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
    en: 'rubric',
    kk: 'бағалау кестесі',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'A short list of what a good answer must contain, used to judge what the model produced.',
      kk: 'Бағалау кестесі — жақсы жауапта не болуға тиіс екенін тізіп жазып қою; модельдің нәтижесі соған қарап бағаланады.',
    },
    example: {
      en: 'Give the rubric to a second agent and let it grade the first one.',
      kk: 'Бағалау кестесін екінші агентке беріп, біріншінің жұмысын соған тексерт.',
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
    en: 'style guide',
    kk: 'стиль нұсқаулығы',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'The written rules for how your text or code should look, handed to the model so its output matches the rest.',
      kk: 'Стиль нұсқаулығы — мәтінің мен кодың қандай болуға тиіс екенін жазып қойған ереже; модельдің нәтижесі қалғанынан айнымасын деп беріледі.',
    },
    example: {
      en: 'Two lines of style guide save an hour of rewriting.',
      kk: 'Стиль нұсқаулығындағы екі жол бір сағаттық қайта жазудан құтқарады.',
    },
  },
  {
    en: 'tone of voice',
    kk: 'сөйлеу мәнері',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'How your product talks to people: warm or formal, short or detailed, informal or polite.',
      kk: 'Сөйлеу мәнері — өнімнің адамға қалай тіл қататыны: жылы ма, ресми ме, қысқа ма, толық па, «сен» бе, «сіз» бе.',
    },
    example: {
      en: 'Decide the tone once and put it in the prompt, or every screen will sound different.',
      kk: 'Мәнерді бір рет шешіп, промптқа жазып қой, әйтпесе әр бет әртүрлі сөйлейді.',
    },
  },
  {
    en: 'assumption',
    kk: 'жорамал',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Something you took for granted without checking; writing it down lets someone catch it early.',
      kk: 'Жорамал — тексермей-ақ шын деп қабылдаған нәрсе; жазып қойсаң, оны біреу ерте байқайды.',
    },
    example: {
      en: 'List your assumptions at the end of the spec and mark the risky ones.',
      kk: 'Спецификацияның соңына жорамалдарыңды тізіп, қайсысы қауіпті екенін белгіле.',
    },
  },
  {
    en: 'open question',
    kk: 'шешілмеген сұрақ',
    keepLatin: false,
    group: 'prompting',
    def: {
      en: 'Something in the plan that nobody has decided yet, written down instead of silently guessed.',
      kk: 'Шешілмеген сұрақ — жоспарда әлі шешілмей тұрған тұс; үнсіз болжап кетпей, ашық жазып қойылады.',
    },
    example: {
      en: 'Three open questions at the top of the spec save three wrong features.',
      kk: 'Спецификацияның басындағы үш шешілмеген сұрақ үш қате мүмкіндіктен сақтайды.',
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
  // --- product -------------------------------------------------------------
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
    en: 'user interview',
    kk: 'пайдаланушымен сұхбат',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A one-to-one conversation in which you ask what the person did, not what they would like.',
      kk: 'Пайдаланушымен сұхбат — адамның не қалайтынын емес, не істегенін сұрайтын жеке әңгіме.',
    },
    example: {
      en: 'Ask: tell me about the last time this problem came up.',
      kk: '«Бұл мәселе соңғы рет қашан кездесті, соны айтшы» деп сұра.',
    },
  },
  {
    en: 'survey',
    kk: 'сауалнама',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The same short set of questions sent to many people: good for counting, weak for understanding.',
      kk: 'Сауалнама — көп адамға жіберілетін бірдей қысқа сұрақтар: санауға жақсы, түсінуге әлсіз.',
    },
    example: {
      en: 'Five questions get answered; twenty get abandoned.',
      kk: 'Бес сұраққа жауап береді, жиырмасын аяқтамай тастайды.',
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
    en: 'positioning',
    kk: 'өнімнің орны',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'How people describe your product to someone else: what it is, who it is for and what it is not.',
      kk: 'Өнімнің орны — адам сенің өніміңді басқаға қалай түсіндіретіні: бұл не, кімге арналған және не емес.',
    },
    example: {
      en: 'If two users describe you differently, the positioning is not finished.',
      kk: 'Екі пайдаланушы екі түрлі сипаттаса, өнімнің орны әлі анықталмаған.',
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
      en: 'One landing page and twenty users already count as an experiment.',
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
    en: 'cohort',
    kk: 'когорта',
    keepLatin: false,
    alt: 'бір мезгілде келген топ',
    group: 'product',
    def: {
      en: 'A group of users counted together by when they arrived, so one week can be compared honestly with another.',
      kk: 'Когорта — қашан келгеніне қарай бір топқа жинақталған пайдаланушылар; сонда бір аптаны екіншісімен әділ салыстыруға болады.',
    },
    example: {
      en: 'Look at retention by cohort instead of at one big number.',
      kk: 'Ұстап қалуды бір үлкен санмен емес, когортамен бөліп қара.',
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
    en: 'user acquisition',
    kk: 'пайдаланушы тарту',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The work of getting new people to try the product, and what each new person costs you.',
      kk: 'Пайдаланушы тарту — өнімді жаңа адамдарға қолдандыру жұмысы және әр жаңа адамның қанша шығынға түсетіні.',
    },
    example: {
      en: 'The first hundred users come from your own hands, not from ads.',
      kk: 'Алғашқы жүз пайдаланушы жарнамадан емес, өз қолыңнан келеді.',
    },
  },
  {
    en: 'word of mouth',
    kk: 'ауыздан-ауызға тарау',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'People telling other people about your product without being paid or asked to.',
      kk: 'Ауыздан-ауызға тарау — адамдардың ақысыз, сұрамай-ақ сенің өнімің туралы басқаға айтуы.',
    },
    example: {
      en: 'Word of mouth starts when the product is genuinely useful to ten people.',
      kk: 'Ауыздан-ауызға тарау өнім он адамға шын пайдалы болғанда басталады.',
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
    en: 'revenue',
    kk: 'табыс',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The money that comes in from users, before any costs are taken off.',
      kk: 'Табыс — шығын шегерілмей тұрғандағы, пайдаланушылардан түскен ақша.',
    },
    example: {
      en: 'The first paying user changes the project more than the first thousand visitors.',
      kk: 'Бірінші төлеген пайдаланушы жобаны алғашқы мың келушіден күштірек өзгертеді.',
    },
  },
  {
    en: 'cost',
    kk: 'шығын',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'The money going out: servers, model tokens, domains and the tools you pay for.',
      kk: 'Шығын — сыртқа кететін ақша: сервер, модель токендері, домен және ақылы құралдар.',
    },
    example: {
      en: 'With an AI feature inside, the cost grows with every user, so check it early.',
      kk: 'Ішінде ЖИ мүмкіндігі болса, шығын әр пайдаланушымен бірге өседі — оны ерте тексер.',
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
    en: 'milestone',
    kk: 'межелі кезең',
    keepLatin: false,
    group: 'product',
    def: {
      en: 'A visible point in the plan that you either reach on time or you do not.',
      kk: 'Межелі кезең — жоспардағы нақты нүкте: оған не уақытында жетесің, не жетпейсің.',
    },
    example: {
      en: 'Set the milestone at the demo, not at the perfect version.',
      kk: 'Межелі кезеңді мінсіз нұсқаға емес, демоға қой.',
    },
  },
  {
    en: 'retrospective',
    kk: 'қорытынды талқы',
    keepLatin: false,
    alt: 'ретроспектива',
    group: 'product',
    def: {
      en: 'A short talk after a piece of work about what helped, what got in the way and what you will change next time.',
      kk: 'Қорытынды талқы — жұмыс біткен соң не көмектесті, не кедергі болды, келесіде нені өзгертеміз деп отырып сөйлесу.',
    },
    example: {
      en: 'Fifteen minutes and three lines written down are enough.',
      kk: 'Он бес минут пен жазып алған үш жол жетіп жатыр.',
    },
  },
];
