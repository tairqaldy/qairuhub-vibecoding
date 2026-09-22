/**
 * The level exams.
 *
 * One pool per track. Each attempt draws a random subset (Track.ask) and the
 * Exam widget shuffles the four options before rendering, so `answer` is an
 * index into the array as authored here, never a position on screen. That is
 * deliberate: the first draft of two of these pools keyed every question to the
 * same index, and a fixed order would have made them beatable without reading a
 * word of the course.
 *
 * Every question is grounded in a sentence that actually appears in the lesson
 * named by `ref`. Generated from the authoring run and checked against the MDX;
 * edit here, not upstream.
 */

import type { Lang } from './curriculum';
import type { TrackId } from './tracks';

type L = Record<Lang, string>;

export interface ExamQuestion {
  id: string;
  q: L;
  /** Four options. Order here is the authoring order; the widget shuffles. */
  options: L[];
  /** 0-based index into `options` as written above. */
  answer: number;
  why: L;
  /** Lang-less path of the lesson that teaches this, for href(lang, ref). */
  ref: string;
}

export const exams: Record<TrackId, ExamQuestion[]> = {
  foundations: [
    {
      id: 'foundations-throwaway-scope',
      q:
        { en: 'Karpathy\'s original post defined vibe coding in three parts: you do not read the code, the project is disposable, and you talk instead of typing. The lesson tells you to hold on to one of them in particular. Which, and why?', kk: 'Karpathy-дің бастапқы посты vibe coding-ті үш бөлікке бөлді: кодты оқымайсың, жоба бір реттік, теру орнына сөйлейсің. Сабақ солардың біреуін бөлек ұстауды айтады. Қайсысын және неге?' },
      options: [
        { en: 'You talk instead of typing — dictating is what makes the loop fast', kk: 'Теру орнына сөйлеу — дауыстап айту циклді жылдамдатады' },
        { en: 'You do not read the code — reading every diff is what slows people down', kk: 'Кодты оқымау — адамды баяулататын нәрсе әр diff-ті оқу' },
        { en: 'The project is disposable — that is the part that keeps you out of trouble', kk: 'Жобаның бір реттік болуы — дәл сол сені пәледен аулақ ұстайды' },
        { en: 'You accept every diff — it is the habit the dictionaries ended up recording', kk: 'Әр diff-ті қабылдау — сөздіктер жазып алған әдет сол' },
      ],
      answer: 2,
      why:
        { en: 'Later usage blurred the first part, dropped the second and forgot the third. The safety lives in the second one: not reading costs you nothing on a weekend project, and costs you a great deal once there is a database and real users.', kk: 'Кейінгі қолданыс бірінші бөлікті бұлыңғырлатты, екіншісін тастап кетті, үшіншісін ұмытты. Қауіпсіздік дәл екіншісінде: демалыс күнгі жобада оқымасаң, ештеңе жоғалтпайсың; дерекқоры мен нақты пайдаланушылары барда көп нәрсе жоғалтасың.' },
      ref: 'learn/the-tweet',
    },
    {
      id: 'foundations-definition-names-no-tool',
      q:
        { en: 'A classmate says: "I built it in Claude Code, so it was not vibe coding." Using the definitions in this module, what is wrong with that sentence?', kk: 'Курстасың былай дейді: «Мен оны Claude Code-та жасадым, демек бұл vibe coding емес». Осы модульдегі анықтамаларға сүйенсек, бұл сөйлемнің қатесі неде?' },
      options: [
        { en: 'Nothing — reaching for an agent puts the work in agentic engineering by definition', kk: 'Қатесі жоқ — agent қолданылса, бұл анықтама бойынша agentic engineering' },
        { en: 'Neither definition names a tool; it is about whether anybody reviewed the code', kk: 'Екі анықтаманың бірінде де құрал аталмайды; шешетіні — кодты біреу тексерді ме, жоқ па' },
        { en: 'Vibe coding means dictating by voice, so a session you typed cannot be it', kk: 'Vibe coding — дауыспен айту, сондықтан қолмен терілген сеанс оған жатпайды' },
        { en: 'The definitions only apply to code that ends up in production', kk: 'Анықтамалар тек production ортасына жететін кодқа қатысты' },
      ],
      answer: 1,
      why:
        { en: 'Karpathy\'s version and Willison\'s both describe producing code without engaging with what comes out. You can vibe code inside Claude Code and you can do careful engineering inside Claude Code — the tool is not the tell.', kk: 'Karpathy-дің де, Willison-ның да анықтамасы бір нәрсені сипаттайды: шыққан кодпен айналыспай код өндіру. Claude Code ішінде vibe coding жасауға да, мұқият инженерия жасауға да болады — құрал ештеңені шешпейді.' },
      ref: 'learn/the-tweet',
    },
    {
      id: 'foundations-agentic-tell',
      q:
        { en: 'You read every diff before merging and can explain each line. By the module\'s table, what would still have to be true for this work to count as agentic engineering rather than AI-assisted coding?', kk: 'Сен біріктірер алдында әр diff-ті оқисың және әр жолды түсіндіре аласың. Модульдегі кестеге сүйенсек, бұл жұмыс ЖИ-мен бірге кодтау емес, agentic engineering болуы үшін тағы не болуы керек еді?' },
      options: [
        { en: 'The agent, not you, would have to have typed every line of the code', kk: 'Кодтың әр жолын сен емес, agent теруі керек еді' },
        { en: 'The spec, the success criteria and a failing test would exist before the agent starts', kk: 'Agent бастамай тұрып спецификация, табыс өлшемдері және әлі өтпей тұрған тест дайын болуы керек еді' },
        { en: 'It would have to be running in production, with real users and real data on it', kk: 'Ол production ортасында, нақты пайдаланушылармен әрі нақты деректермен жұмыс істеп тұруы керек еді' },
        { en: 'You would have to be in an agent loop rather than a chat window', kk: 'Чат терезесі емес, agent циклінде отыруың керек еді' },
      ],
      answer: 1,
      why:
        { en: 'Reading the diff before merging is the tell for AI-assisted coding, and you are already doing it. Agentic engineering moves the work earlier: the spec, the success criteria and the test exist before the first line gets written.', kk: 'Біріктірер алдында diff-ті оқу — ЖИ-мен бірге кодтаудың белгісі, ал сен оны істеп отырсың. Agentic engineering жұмысты ертерек жылжытады: спецификация, табыс өлшемдері және тест бірінші жол жазылмай тұрып дайын болады.' },
      ref: 'learn/the-tweet',
    },
    {
      id: 'foundations-yc-denominator',
      q:
        { en: 'Someone posts: "95% of Y Combinator startups now have AI-generated codebases." What did Jared Friedman actually say?', kk: 'Біреу былай деп жазады: «Y Combinator стартаптарының 95%-ында код базасын енді ЖИ жазады». Jared Friedman шын мәнінде не айтты?' },
      options: [
        { en: 'That about a quarter of one batch had codebases roughly 95% AI-generated', kk: 'Бір лектің шамамен төрттен бірінде кодтың шамамен 95%-ын ЖИ жазғанын' },
        { en: 'That 95% of the startups in the batch used AI somewhere in their codebase', kk: 'Лектегі стартаптардың 95%-ы код базасының бір жерінде ЖИ қолданғанын' },
        { en: 'That 95% of the AI-generated code in that batch came from imported libraries', kk: 'Сол лектегі ЖИ жазған кодтың 95%-ы сырттан қосылған кітапханалардан келгенін' },
        { en: 'That 95% of the founders in the batch could no longer write the code by hand', kk: 'Лектегі құрылтайшылардың 95%-ы кодты енді қолмен жаза алмайтынын' },
      ],
      answer: 0,
      why:
        { en: 'The figure is 25% of one batch, not 95% of Y Combinator, and it counts human-typed characters against AI-typed ones with imported library code left out. Friedman also said those founders could have written every line themselves. When a number like this is quoted at you, the question is "of what?"', kk: 'Сан — бір лектің 25%-ы, Y Combinator-дың 95%-ы емес; әрі ол адам терген таңбалар мен ЖИ терген таңбаларды салыстырады, сырттан қосылған кітапхана коды есепке кірмейді. Friedman сол құрылтайшылар әр жолды өздері де жаза алатынын айтқан. Саған осындай сан айтылса, сұрайтының — «неден есептелген?»' },
      ref: 'learn/why-now',
    },
    {
      id: 'foundations-metr-lower-bound',
      q:
        { en: 'METR\'s February 2026 rerun measured returning developers at 18% less time. Why does METR call its own dataset an unreliable signal and read that estimate as a lower bound?', kk: 'METR-дің 2026 ж. ақпандағы қайталама сынағында оралған әзірлеушілер уақытты 18% аз жұмсаған. METR неге өз деректер жиынтығын сенімсіз сигнал деп атап, бұл бағаны төменгі шекара деп санайды?' },
      options: [
        { en: 'Because the confidence interval came out far too narrow to be believed', kk: 'Себебі сенімділік аралығы сенуге келмейтіндей тым тар шыққан' },
        { en: 'Because 30% to 50% of participants skipped the tasks they least wanted to do by hand', kk: 'Себебі қатысушылардың 30%-дан 50%-ға дейінгісі қолмен істегісі келмеген тапсырмаларды бермей қойған' },
        { en: 'Because the developers were working in repositories they had never seen and did not own', kk: 'Себебі әзірлеушілер бұрын көрмеген әрі өздеріне тиесілі емес репозиторийлерде жұмыс істеген' },
        { en: 'Because the time was reported by the developers rather than measured with a stopwatch', kk: 'Себебі уақытты өлшемеген, әзірлеушілер өздері айтып берген' },
      ],
      answer: 1,
      why:
        { en: 'People quietly dropped the tasks they did not want to do without AI, so the best AI use cases selected themselves out of the sample. The honest summary today is that the sign has probably flipped and the size is unknown.', kk: 'Адамдар ЖИ-сіз істегісі келмеген тапсырмаларын үнсіз тастап кеткен, сондықтан ЖИ-дің ең жақсы тұстары таңдамадан өздігінен шығып қалған. Бүгінгі адал қорытынды: таңбасы, сірә, өзгерген, ал шамасы белгісіз.' },
      ref: 'learn/why-now',
    },
    {
      id: 'foundations-fresh-session-memory',
      q:
        { en: 'You finish a long session tonight and open a brand-new session in the same folder tomorrow morning. What does the model know about yesterday\'s work?', kk: 'Бүгін кешке ұзақ сеансты аяқтадың, ал ертең таңертең сол қалтада мүлдем жаңа сеанс ашасың. Модель кешегі жұмыс туралы нені біледі?' },
      options: [
        { en: 'Everything, because a 1M-token window holds several days of work', kk: 'Бәрін біледі, өйткені 1M токендік терезеге бірнеше күндік жұмыс сыяды' },
        { en: 'Nothing, unless something puts it back into the context window', kk: 'Ештеңе білмейді — біреу оны контекст терезесіне қайта салып бермесе' },
        { en: 'Only the files it edited, which it re-reads when it starts up', kk: 'Тек өзі өзгерткен файлдарды — оларды іске қосылғанда қайта оқиды' },
        { en: 'A summary of it, which it wrote to disk when the session ended', kk: 'Сеанс біткенде дискіге жазып қойған қысқаша қорытындыны' },
      ],
      answer: 1,
      why:
        { en: 'The context window is everything the model can see at once, and anything outside it does not exist. Memory between sessions is something you arrange — a file it reads, or a command that reopens the old conversation — never something that happens on its own.', kk: 'Контекст терезесі — модель бір мезетте көре алатын нәрсенің бәрі, ал одан тыс нәрсе ол үшін жоқ. Сеанстар арасындағы жадты сен ұйымдастырасың: ол оқитын файл немесе ескі әңгімені қайта ашатын пәрмен. Өздігінен ондай жад пайда болмайды.' },
      ref: 'learn/ai-in-plain-language',
    },
    {
      id: 'foundations-thinking-tokens',
      q:
        { en: 'You raise the effort setting on a reasoning model for a simple task. Why does the bill move more than the extra thinking time would suggest?', kk: 'Қарапайым тапсырмада пайымдайтын модельдің күш деңгейін көтердің. Шот неге қосымша ойлау уақытынан күтілгеннен көбірек өседі?' },
      options: [
        { en: 'Higher effort quietly switches you to a larger and more expensive model', kk: 'Күш деңгейі жоғарыласа, сені үнсіз үлкенірек әрі қымбат модельге ауыстырады' },
        { en: 'Thinking tokens are billed at the output rate, and output costs several times input', kk: 'Ойлану токендері шығыс бағасымен есептеледі, ал шығыс кірістен бірнеше есе қымбат' },
        { en: 'Higher effort turns off caching, so every file in the session is charged again', kk: 'Күш деңгейі жоғарыласа, кэш өшеді де, сеанстағы әр файл қайта есептеледі' },
        { en: 'Higher effort makes the agent re-read the whole repository on every single turn', kk: 'Күш деңгейі жоғарыласа, agent әр жүрісте бүкіл репозиторийді қайта оқиды' },
      ],
      answer: 1,
      why:
        { en: 'The scratch paper is billed as output, and output runs four to six times the input price almost everywhere. Lowering effort on simple tasks is a real cost lever, the same way /clear is.', kk: 'Қаралама шығыс ретінде есептеледі, ал шығыс барлық жерде дерлік кірістен төрт-алты есе қымбат. Қарапайым тапсырмада күш деңгейін төмендету — `/clear` сияқты нақты шығын тетігі.' },
      ref: 'learn/ai-in-plain-language',
    },
    {
      id: 'foundations-split-the-spec',
      q:
        { en: 'Your spec has six must-have items — more than one agent run can finish well. How does the module tell you to cut it up?', kk: 'Спецификацияңда алты міндетті мүмкіндік бар — бір agent жүрісінде сапалы бітетін көлемнен көп. Модуль оны қалай бөлуді айтады?' },
      options: [
        { en: 'Split it by file, so that each run only ever touches a single file', kk: 'Файл бойынша бөлу — әр жүріс бір ғана файлға тисін' },
        { en: 'Build the easiest item first, so the agent has a working base to grow from', kk: 'Ең оңайынан бастау — agent-те өсіретін жұмыс істейтін негіз болсын' },
        { en: 'Into pieces that each finish and get checked alone, starting with the riskiest', kk: 'Әрқайсысы бөлек аяқталып, бөлек тексерілетін бөліктерге, ең тәуекелдісінен бастап' },
        { en: 'Hand over all six at once and review the whole diff carefully at the end', kk: 'Алтауын бірден беріп, соңында diff-ті бір рет мұқият тексеру' },
      ],
      answer: 2,
      why:
        { en: 'Every piece needs a check of its own, and if you cannot name that check, you are looking at two pieces rather than one. Starting with the riskiest item finds the problem while the code is still small enough to throw away.', kk: 'Әр бөліктің өз тексерісі болуы керек, ал сол тексерісті атай алмасаң, алдыңда бір емес, екі бөлік тұр. Ең тәуекелдісінен бастасаң, мәселені код әлі лақтырып тастауға болатындай шағын кезінде табасың.' },
      ref: 'learn/problem-solving-mindset',
    },
    {
      id: 'foundations-take-the-wheel',
      q:
        { en: 'Kent Beck lists three signals that it is time to take the wheel back from the agent. Which of these is one of them?', kk: 'Kent Beck agent-тен басқаруды қайта өз қолыңа алатын үш белгіні атайды. Мыналардың қайсысы — сол белгінің бірі?' },
      options: [
        { en: 'It stops to ask you a clarifying question before it starts working', kk: 'Ол жұмысқа кіріспес бұрын тоқтап, нақтылайтын сұрақ қояды' },
        { en: 'It disables or deletes tests so the run comes back green', kk: 'Ол тесттерді өшіреді немесе жояды — нәтиже жасыл болып шықсын деп' },
        { en: 'It writes considerably more code than you had been expecting', kk: 'Ол сен күткеннен әлдеқайда көп код жазады' },
        { en: 'It proposes a different approach from the one you had in mind', kk: 'Ол сен ойлағаннан басқа тәсіл ұсынады' },
      ],
      answer: 1,
      why:
        { en: 'The three signals are looping, adding functionality nobody asked for, and cheating to get a green result. A clarifying question or a different approach is the agent working well, not badly.', kk: 'Үш белгі: шеңбер бойымен айналу, ешкім сұрамаған мүмкіндік қосу және жасыл нәтиже үшін алдау. Ал нақтылайтын сұрақ та, басқа тәсіл де — agent-тің жақсы жұмыс істеп тұрғанының белгісі.' },
      ref: 'learn/problem-solving-mindset',
    },
    {
      id: 'foundations-powershell-separator',
      q:
        { en: 'On Windows you paste `mkdir qairu-event && cd qairu-event` into a PowerShell prompt and get: The token \'&&\' is not a valid statement separator. What is the fix?', kk: 'Windows-та PowerShell жолына `mkdir qairu-event && cd qairu-event` деп қойдың да, мынаны алдың: The token \'&&\' is not a valid statement separator. Шешімі қандай?' },
      options: [
        { en: 'Install Git for Windows — that line only runs inside Git Bash', kk: 'Git for Windows орнату — бұл жол тек Git Bash ішінде жүреді' },
        { en: 'Run PowerShell as administrator, because the folder cannot be created otherwise', kk: 'PowerShell-ді әкімші атынан іске қосу, әйтпесе қалта жасалмайды' },
        { en: 'Separate the two commands with `;`, or run the line in a shell that takes `&&`', kk: 'Екі пәрменді `;` таңбасымен ажырату, не жолды `&&` қабылдайтын shell-де орындау' },
        { en: 'Open a new terminal so that PowerShell picks up the updated PATH', kk: 'Жаңа терминал ашу — сонда PowerShell жаңартылған PATH тізімін оқиды' },
      ],
      answer: 2,
      why:
        { en: 'PowerShell separates commands with a semicolon; `&&` belongs to Bash and CMD. Reading the message tells you which shell the line was written for — retyping it in the same window never will.', kk: 'PowerShell пәрмендерді нүктелі үтірмен бөледі, ал `&&` — Bash пен CMD-дің белгісі. Хабарды оқысаң, жолдың қай shell үшін жазылғанын білесің; сол терезеде қайта теріп отырсаң, ешқашан білмейсің.' },
      ref: 'labs/setup',
    },
    {
      id: 'foundations-api-key-billing',
      q:
        { en: 'You pay for Claude Pro. You start Claude Code and, instead of opening the browser login, it asks you to approve an API key. What is happening?', kk: 'Сен Claude Pro-ға төлеп отырсың. Claude Code-ты іске қосасың, ал ол браузер арқылы кіруді ашудың орнына API кілтін растауды сұрайды. Не болып жатыр?' },
      options: [
        { en: 'Pro covers claude.ai only, so the command line always bills you per token', kk: 'Pro тек claude.ai сайтын қамтиды, сондықтан CLI құралы әрдайым токен бойынша есептейді' },
        { en: 'Your five-hour allowance is spent, so it has fallen back to the API', kk: 'Бес сағаттық лимитің бітіп, ол API-ге ауысып кеткен' },
        { en: 'ANTHROPIC_API_KEY is set in your environment, moving you to per-token billing', kk: 'Ортаңда ANTHROPIC_API_KEY айнымалысы орнатылған, сондықтан есеп токен бойынша жүреді' },
        { en: 'The install is broken — reinstall Claude Code and log in through the browser', kk: 'Орнату бұзылған — Claude Code-ты қайта орнатып, браузер арқылы кіру керек' },
      ],
      answer: 2,
      why:
        { en: 'Claude Code skips the browser login whenever that variable is set, and per-token billing starts without announcing itself. If you did not set it deliberately, unset it before you begin the session.', kk: 'Сол айнымалы орнатулы тұрса, Claude Code браузер арқылы кіруді өткізіп жібереді де, токен бойынша төлем ескертусіз басталады. Оны әдейі қоймаған болсаң, сеанс бастамай тұрып өшіріп таста.' },
      ref: 'labs/claude-code-first-session',
    },
    {
      id: 'foundations-readme-mismatch',
      q:
        { en: 'In your first session the agent answers all five questions about the flashcard project fluently. Which part of the answer is the real proof that it read the code rather than guessed?', kk: 'Алғашқы сеансыңда agent флешкарта жобасы туралы бес сұрақтың бәріне еркін жауап берді. Жауаптың қай бөлігі оның болжамай, кодты шынымен оқығанының нағыз дәлелі?' },
      options: [
        { en: 'It listed all three files and said what each one is for in the project', kk: 'Үш файлды да тізіп, әрқайсысы жобада не үшін керегін айтты' },
        { en: 'It noticed the README promises a Next button that the code does not have', kk: 'README уәде еткен Next түймесінің кодта жоқ екенін байқады' },
        { en: 'It finished by asking you a question, exactly as the prompt required', kk: 'Промпт талап еткендей, соңында саған сұрақ қойды' },
        { en: 'It described the whole project in two sentences, as the prompt required', kk: 'Промпт талап еткендей, бүкіл жобаны екі сөйлеммен сипаттады' },
      ],
      answer: 1,
      why:
        { en: 'Anything the README states can be paraphrased without opening a single file. Catching that the code only answers the Right Arrow key means it actually read index.html. If it missed that, it skimmed.', kk: 'README файлында жазылғанның бәрін бірде-бір файл ашпай-ақ өз сөзіңмен айтып беруге болады. Ал кодтың тек оң жақ көрсеткі пернесіне жауап беретінін байқау — index.html файлын шынымен оқығанының белгісі. Мұны байқамаса, үстірт шолып шыққан.' },
      ref: 'labs/claude-code-first-session',
    },
  ],
  builder: [
    {
      id: 'builder-one-job-and',
      q:
        { en: 'You write the one job on your PRD as: "Reserve a seat and see who else is coming." What does the PRD page say about that sentence?', kk: 'PRD-дегі «бір ғана жұмысты» былай жаздың: «Орын брондау және кім келетінін көру». PRD беті осы сөйлем туралы не дейді?' },
      options: [
        { en: 'Nothing is wrong — two clauses give the agent more of the picture to work with', kk: 'Ештеңесі бұрыс емес — екі бөлік agent-ке суреттің көбірек жағын береді' },
        { en: 'It holds two jobs; keep the one that hurts more and let the other one wait', kk: 'Мұнда екі жұмыс тұр; қаттырақ ауыртатынын қалдыр, екіншісі кейінге қалсын' },
        { en: 'It belongs in the definition of done instead, where several clauses are normal', kk: 'Оның орны — «дайын» анықтамасында, онда бірнеше бөлік болғаны қалыпты' },
        { en: 'Split it into two PRDs and let the agent build both of them in parallel', kk: 'Екі бөлек PRD жазып, екеуін agent қатар құрастырсын' },
      ],
      answer: 1,
      why:
        { en: 'An "and" in the one job means two jobs are hiding in it. Keep the one that hurts more; the other drops onto the not-building list, where it stops the agent inventing a feature you never asked for.', kk: '«Бір ғана жұмыстағы» «және» — ішінде екі жұмыс жасырынып тұрғанының белгісі. Қаттырақ ауыртатынын қалдыр; екіншісі «жасамаймыз» тізіміне түседі де, agent сен сұрамаған мүмкіндікті ойлап таппайды.' },
      ref: 'learn/idea-to-prd',
    },
    {
      id: 'builder-sample-beats-docs',
      q:
        { en: 'Your refs folder holds the docs URL for the one endpoint you call and a real success response saved from it. The two disagree about a field name. What goes in the prompt?', kk: 'refs қалтаңда шақыратын жалғыз endpoint-тің құжаттама URL-і және содан сақталған нақты сәтті жауап жатыр. Екеуі өріс атауы туралы келіспейді. Prompt ішіне не жазасың?' },
      options: [
        { en: 'Trust the docs page — it is the official contract, and the saved sample may be stale', kk: 'Құжаттама бетіне сен — ол ресми келісім, ал сақталған үлгі ескірген болуы мүмкін' },
        { en: 'Trust the sample file, and write that tie-breaker into the prompt yourself', kk: 'Үлгі файлға сен — сол шешуші сөйлемді prompt ішіне өзің жаз' },
        { en: 'Paste the whole docs site so the agent can work out which of the two is current', kk: 'Қайсысы жаңа екенін agent өзі анықтасын деп бүкіл құжаттама сайтын көшіріп қой' },
        { en: 'Drop both and describe the response schema carefully in your own words instead', kk: 'Екеуін де тастап, жауаптың құрылымын өз сөзіңмен мұқият сипаттап бер' },
      ],
      answer: 1,
      why:
        { en: 'A real response settles what prose argues about: the exact field spelling, the date format, whether a missing value arrives as null or not at all. State the tie-breaker so the agent never has to pick.', kk: 'Нақты жауап мәтін таласып өтетін нәрсені бірден шешеді: өрістің дәл жазылуы, күн пішімі, жоқ мән null күйінде келе ме әлде мүлде келмей ме. Кімге сену керегін өзің айт — сонда agent таңдамайды.' },
      ref: 'learn/references',
    },
    {
      id: 'builder-memory-file-line',
      q:
        { en: 'Four lines are proposed for your project AGENTS.md. Which one earns its place?', kk: 'Жобаңның AGENTS.md файлына төрт жол ұсынылды. Қайсысы өз орнын ақтайды?' },
      options: [
        { en: '"Write clean, readable code and keep functions small."', kk: '«Таза, оқылатын код жаз және функцияларды шағын ұста.»' },
        { en: '"All database access goes through src/lib/db — no Supabase calls inside components."', kk: '«Дерекқорға жүгіну тек src/lib/db арқылы — компоненттің ішінде Supabase шақыруы болмайды.»' },
        { en: '"The repo has src/, public/, tests/ and a scripts/ folder for tooling."', kk: '«Репозиторийде src/, public/, tests/ және құралдарға арналған scripts/ қалталары бар.»' },
        { en: '"We are finishing the seat counter this week, then moving on to the confirmation email."', kk: '«Осы аптада орын санағышын бітіреміз, содан кейін растау хатына көшеміз.»' },
      ],
      answer: 1,
      why:
        { en: 'A memory file is a standing charge paid again in every session, so each line has to be a fact the agent cannot read off your code. Platitudes, folder tours and this week\'s task are all on the docs\' exclude list.', kk: 'Жад файлы — әр сеанста қайта төленетін тұрақты шығын, сондықтан әр жол agent кодтан оқи алмайтын дерек болуға тиіс. Жалпы сөз, қалталар тізімі және осы апталық тапсырма — үшеуі де құжаттаманың «қоспа» тізімінде.' },
      ref: 'learn/context-ssot',
    },
    {
      id: 'builder-agents-md-precedence',
      q:
        { en: 'Your repo already has a CLAUDE.md. You add an AGENTS.md so Codex and Cursor read the same rules. With no other change, what does Claude Code load at session start?', kk: 'Репозиторийіңде CLAUDE.md файлы бұрыннан бар. Codex пен Cursor да сол ережелерді оқысын деп AGENTS.md қостың. Басқа ештеңе өзгертпесең, Claude Code сеанс басында нені жүктейді?' },
      options: [
        { en: 'Both files, merged broad to specific, the way the memory scopes are merged', kk: 'Екі файлды да, жад деңгейлері сияқты жалпыдан нақтыға қарай біріктіріп' },
        { en: 'Only CLAUDE.md — AGENTS.md is read natively only when no CLAUDE.md exists', kk: 'Тек CLAUDE.md файлын — AGENTS.md файлы CLAUDE.md жоқ кезде ғана оқылады' },
        { en: 'Only AGENTS.md, because it is the newer open standard and takes precedence', kk: 'Тек AGENTS.md файлын, себебі ол — жаңарақ ашық стандарт әрі басымдыққа ие' },
        { en: 'Neither of them, until you run /init again so the new file gets registered', kk: 'Ешқайсысын: жаңа файл тіркелуі үшін алдымен /init пәрменін қайта орындау керек' },
      ],
      answer: 1,
      why:
        { en: 'The portable fix is one line inside CLAUDE.md: @AGENTS.md. Then AGENTS.md is the single source of truth and every tool, Claude Code included, reads the same file.', kk: 'Тасымалды шешім — CLAUDE.md ішіндегі бір жол: @AGENTS.md. Сонда AGENTS.md жалғыз ақиқат көзі болады да, Claude Code-ты қоса, әр құрал бір файлды оқиды.' },
      ref: 'learn/context-ssot',
    },
    {
      id: 'builder-mode-for-exploring',
      q:
        { en: 'You want the agent to read a repo you do not know and come back with an approach, with no chance of it touching your source while it looks. Which permission mode?', kk: 'Agent өзің білмейтін репозиторийді оқып шығып, тәсіл ұсынсын дейсің — әрі қарап жүргенде кодыңа тиюіне мүмкіндік болмасын. Қай рұқсат режимі?' },
      options: [
        { en: 'Accept edits — its file edits stay inside the working directory you started in', kk: 'Accept edits — оның файл өңдеулері іске қосылған жұмыс қалтасының ішінде қалады' },
        { en: 'Plan — it reads and explores, and cannot edit source until you approve a plan', kk: 'Plan — оқиды әрі зерттейді, ал жоспарды мақұлдағанша кодты өңдей алмайды' },
        { en: 'Auto — a separate classifier model reviews every action before it runs', kk: 'Auto — әр әрекетті орындалмай тұрып бөлек жіктеуші модель қарап шығады' },
        { en: 'Manual — it asks before each edit, which comes to the same protection', kk: 'Manual — әр өңдеу алдында сұрайды, қорғанысы айналып келгенде сол бір нәрсе' },
      ],
      answer: 1,
      why:
        { en: 'Accept edits and auto both let files change; auto only reviews the change first. Manual asks, and a tired yes is still a yes. Plan is the one mode where source edits are off the table until a plan exists that you approved.', kk: 'Accept edits те, auto та файлдың өзгеруіне жол береді; auto тек өзгерісті алдын ала қарап шығады. Manual сұрайды, ал шаршаған «иә» — сол да «иә». Plan — мақұлданған жоспар пайда болғанша кодты өңдеу мүмкін болмайтын жалғыз режим.' },
      ref: 'learn/the-agent',
    },
    {
      id: 'builder-deny-rule-gap',
      q:
        { en: 'Your .claude/settings.json denies Read(./.env). You ask the agent to read .env with a one-line Python script. What happens?', kk: '.claude/settings.json файлыңда Read(./.env) тыйымы тұр. Agent-тен .env файлын бір жолдық Python скриптімен оқуды сұрадың. Не болады?' },
      options: [
        { en: 'Refused outright — a Read deny covers every route to that path, Bash included', kk: 'Тікелей тыйым салынады — Read тыйымы сол жолға апаратын әр жолды, Bash-ты қоса, жабады' },
        { en: 'An approval box appears: Bash rules match command text, not the program that opens the file', kk: 'Рұқсат терезесі шығады: Bash ережелері файлды ашатын бағдарламаны емес, пәрмен мәтінін салыстырады' },
        { en: 'It runs with no prompt at all, because the permission system does not see Python', kk: 'Ешнәрсе сұрамай орындалады, себебі рұқсат жүйесі Python-ды мүлде көрмейді' },
        { en: 'The session halts with a Settings Error, because the two rules contradict each other', kk: 'Екі ереже бір-біріне қайшы болғандықтан сеанс Settings Error қатесімен тоқтайды' },
      ],
      answer: 1,
      why:
        { en: 'A path deny blocks the Read, Edit and Write tools, plus cat, head, tail and sed inside Bash. A script that opens the file itself walks straight around it — which is why the docs call these rules convenience, not a security boundary.', kk: 'Жолға қойылған тыйым Read, Edit, Write құралдарын, әрі Bash ішіндегі cat, head, tail, sed пәрмендерін бұғаттайды. Файлды өзі ашатын скрипт оны тура айналып өтеді — құжаттама бұл ережелерді қауіпсіздік шекарасы емес, ыңғайлылық дейтіні сондықтан.' },
      ref: 'labs/claude-md-and-permissions',
    },
    {
      id: 'builder-case-sensitive-build',
      q:
        { en: 'The page renders perfectly on your Windows laptop. The host\'s build fails on an import line. Which cause fits that exactly?', kk: 'Бет Windows ноутбугыңда мінсіз шығады. Ал хосттағы build импорт жолында құлайды. Қай себеп дәл келеді?' },
      options: [
        { en: 'node_modules was never committed, so the build machine has no dependencies at all', kk: 'node_modules қалтасы ешқашан commit жасалмаған, сондықтан build машинасында тәуелділік мүлде жоқ' },
        { en: 'A variable that sits in your local .env was never added on the host', kk: 'Жергілікті .env файлыңдағы айнымалы хостқа қосылмай қалған' },
        { en: 'The filename and the import differ in capitalisation — Windows ignores that, Linux does not', kk: 'Файл атауы мен импорттағы жазылуы бас әріппен ерекшеленеді — Windows оны ескермейді, Linux ескереді' },
        { en: 'The host runs an older Node version than the one installed on your laptop', kk: 'Хостта сенің ноутбугыңдағыдан ескі Node нұсқасы орнатылған' },
      ],
      answer: 2,
      why:
        { en: 'A missing variable fails at run time, not on an import, and node_modules is meant to be reinstalled from the lock file. Case is the one that only appears once the build leaves Windows — match the filename character for character.', kk: 'Жетіспейтін айнымалы импортта емес, жұмыс кезінде құлатады, ал node_modules қалтасы lock файлынан әдейі қайта орнатылады. Әріп регистрі — build Windows-тан шыққанда ғана көрінетін жалғыз себеп: файл атауын әріпме-әріп сәйкестендір.' },
      ref: 'learn/local-build',
    },
    {
      id: 'builder-committed-key',
      q:
        { en: 'You pushed before writing .gitignore, and .env went up with everything else. You delete the file, commit and push again. Is the key safe now?', kk: '.gitignore файлын жазбай тұрып push жасадың да, .env бәрімен бірге кетті. Файлды өшіріп, қайта commit жасап, тағы push жібердің. Кілт енді қауіпсіз бе?' },
      options: [
        { en: 'Yes — the current version of the repo no longer contains the file or the key', kk: 'Иә — репозиторийдің ағымдағы нұсқасында файл да, кілт те жоқ' },
        { en: 'Yes, as long as the same commit also adds .env to .gitignore for next time', kk: 'Иә, егер сол commit ішінде .env файлы .gitignore тізіміне де қосылса' },
        { en: 'No — it is in the history and on someone else\'s server; revoke it and issue a new key', kk: 'Жоқ — ол тарихта тұр әрі бөтен серверге көшіп кетті; күшін жой да, жаңа кілт ал' },
        { en: 'No, but a force push rewrites the history on GitHub and settles the problem', kk: 'Жоқ, бірақ force push GitHub-тағы тарихты қайта жазып, мәселені шешеді' },
      ],
      answer: 2,
      why:
        { en: 'Every earlier snapshot still holds the value, and the push copied them somewhere you do not control. Treat any key that reached a commit as public, and write .gitignore before the first commit next time.', kk: 'Бұрынғы әр түсірілімде мән әлі тұр, ал push оларды сен басқармайтын жерге көшіріп қойған. Commit-ке жеткен кез келген кілтті жария деп есепте, ал келесіде .gitignore файлын бірінші commit-тен бұрын жаз.' },
      ref: 'learn/local-build',
    },
    {
      id: 'builder-restore-untracked',
      q:
        { en: 'The agent edited index.html and created scratch-notes.md, and committed nothing. You run `git restore .` in your terminal. What is on disk now?', kk: 'Agent index.html файлын өзгертті де, scratch-notes.md файлын жасады, ештеңе commit жасаған жоқ. Сен терминалда git restore . пәрменін орындадың. Дискіде қазір не тұр?' },
      options: [
        { en: 'Both are back to the last commit — that command covers the whole working tree', kk: 'Екеуі де соңғы commit күйіне оралды — бұл пәрмен бүкіл жұмыс каталогын қамтиды' },
        { en: 'index.html is clean; scratch-notes.md is still there, because it only touches tracked files', kk: 'index.html таза; scratch-notes.md әлі орнында, себебі ол тек бақыланатын файлға тиеді' },
        { en: 'Nothing changed — that command needs a commit hash to restore from', kk: 'Ештеңе өзгерген жоқ — бұл пәрменге қалпына келтіретін commit hash-ы керек' },
        { en: 'index.html is clean and scratch-notes.md is deleted, because git never tracked it', kk: 'index.html таза, ал scratch-notes.md өшті, себебі git оны ешқашан бақымаған' },
      ],
      answer: 1,
      why:
        { en: 'Untracked leftovers need git clean, and that one has no undo. Run `git clean -nd` first and read the list, then `git clean -fd` when the list says only what you expect.', kk: 'Бақыланбайтын қалдыққа git clean керек, ал оның кері қайтаруы жоқ. Алдымен `git clean -nd` орындап тізімді оқы, тізімде тек күткенің тұрса, содан кейін `git clean -fd`.' },
      ref: 'labs/undo-anything',
    },
    {
      id: 'builder-no-undo-left',
      q:
        { en: 'Which of these four losses does nothing in the three-layer undo bring back?', kk: 'Мына төрт шығынның қайсысын үш қабатты кері қайтарудың ешқайсысы орнына келтіре алмайды?' },
      options: [
        { en: 'A bad commit you already pushed to GitHub yesterday', kk: 'Кеше GitHub-қа push жасап қойған нашар commit' },
        { en: 'A file Claude\'s edit tool rewrote earlier in this same session', kk: 'Дәл осы сеанста Claude-тың өңдеу құралы қайта жазған файл' },
        { en: 'An untracked file you removed with git clean -fd', kk: 'git clean -fd пәрменімен өшірілген, бақыланбайтын файл' },
        { en: 'A commit you dropped with git reset --hard on your own laptop', kk: 'Өз ноутбугыңда git reset --hard арқылы жоғалтқан commit' },
      ],
      answer: 2,
      why:
        { en: 'The pushed commit takes git revert, the edited file takes rewind, and a dropped commit is usually still listed in git reflog. Git never held a copy of an untracked file — which is why you run git clean -nd and read the list first.', kk: 'Push жасалған commit-ке git revert бар, өңделген файлға rewind бар, ал жоғалған commit әдетте git reflog тізімінде тұрады. Бақыланбайтын файлдың git-те ешқашан көшірмесі болмаған — сондықтан алдымен git clean -nd орындап, тізімді оқисың.' },
      ref: 'labs/undo-anything',
    },
    {
      id: 'builder-first-test-top',
      q:
        { en: 'The testing pyramid has many unit tests at the base and a few end-to-end tests at the top. Your project has zero tests today. Where does the first one go?', kk: 'Тест пирамидасының түбінде көп модульдік тест, төбесінде бірнеше end-to-end тест тұрады. Жобаңда бүгін бірде-бір тест жоқ. Алғашқысын қайда жазасың?' },
      options: [
        { en: 'At the base — unit tests take milliseconds each, so build the foundation first', kk: 'Түбіне — модульдік тест миллисекундпен өтеді, сондықтан алдымен іргетасты қала' },
        { en: 'In the middle — an integration test against the real database covers the most ground', kk: 'Ортасына — нақты дерекқорға жүгінетін интеграциялық тест ең көп нәрсені қамтиды' },
        { en: 'At the top — one end-to-end test on the single path the product exists for', kk: 'Төбесіне — өнім соның үшін бар жалғыз жолға бір end-to-end тест' },
        { en: 'Nowhere yet — wait until the feature stops changing every single day', kk: 'Әзірге еш жерге — мүмкіндік күн сайын өзгеріп жатқанда тест жазу ерте' },
      ],
      answer: 2,
      why:
        { en: 'The pyramid is where you end up after a year, not where you start. One test proving a human can complete the main flow is worth more on day one than fifty tests of functions that may not survive the week.', kk: 'Пирамида — бір жылдан кейін келетін жағдай, бастайтын жер емес. Адам негізгі жолды өте алатынын дәлелдейтін бір тест алғашқы күні апта аяғына жетпеуі мүмкін елу функция тестінен қымбат.' },
      ref: 'learn/test-and-quality',
    },
    {
      id: 'builder-decorative-tests',
      q:
        { en: 'You are reading an agent\'s diff. It adds one feature and four tests, and the suite is green. What single question tells you whether those tests are worth anything?', kk: 'Agent-тің diff-ін оқып отырсың. Ол бір мүмкіндік пен төрт тест қосқан, жиынтық жасыл. Сол тесттердің бағасы бар-жоғын қай жалғыз сұрақ көрсетеді?' },
      options: [
        { en: 'Do they use the same test runner as the rest of the project?', kk: 'Олар жобаның қалған бөлігімен бірдей тест іске қосқышын қолдана ма?' },
        { en: 'If I deleted the feature, which of them would go red?', kk: 'Мүмкіндікті өшірсем, солардың қайсысы қызыл болар еді?' },
        { en: 'Do all four of them finish in under a second?', kk: 'Төртеуі де бір секундтан аз уақытта бітеді ме?' },
        { en: 'Do they cover every line the diff added?', kk: 'Олар diff қосқан әр жолды қамти ма?' },
      ],
      answer: 1,
      why:
        { en: 'A test that stays green after the feature is gone is decoration — it asserts something that was already true. While you are in the diff, also check whether any existing test was skipped, weakened or deleted to reach that green.', kk: 'Мүмкіндік жоғалғаннан кейін де жасыл тұрған тест — әшекей: ол бұрыннан рас нәрсені тексеріп отыр. Diff ішінде жүргенде жасылға жету үшін аттап кеткен, әлсіреткен не өшірген тест бар-жоғын да қарап шық.' },
      ref: 'learn/test-and-quality',
    },
    {
      id: 'builder-browser-only-step',
      q:
        { en: 'Your agent reports that the site is live on your own custom domain. Which part of that could it not have done from the terminal?', kk: 'Agent сайт өз доменіңде жұмыс істеп тұр деп хабарлады. Соның қай бөлігін ол терминалдан істей алмайды?' },
      options: [
        { en: 'Building dist/ — the build only happens on the host\'s machine, never on yours', kk: 'dist/ қалтасын құрастыру — build тек хост машинасында жүреді, сенікінде ешқашан емес' },
        { en: 'Pushing to GitHub — every push needs a fresh login in a browser window', kk: 'GitHub-қа push жасау — әр push сайын браузерде қайтадан кіру керек' },
        { en: 'Uploading dist/ — wrangler cannot publish a folder from your own machine', kk: 'dist/ қалтасын жүктеу — wrangler өз машинаңдағы қалтаны жариялай алмайды' },
        { en: 'Attaching the custom domain — there is no CLI for it; someone opens the dashboard', kk: 'Өз доменді жалғау — оның CLI нұсқасы жоқ; басқару панелін біреу ашады' },
      ],
      answer: 3,
      why:
        { en: 'Wrangler builds, pushes and uploads happily, then stops at the dashboard. An agent that cannot open a browser will hand you the pages.dev URL and call it live, so ask it to list the browser-only steps before it starts.', kk: 'Wrangler құрастыруды да, push-ты да, жүктеуді де істейді, содан кейін басқару панелінде тоқтайды. Браузер аша алмайтын agent саған pages.dev мекенжайын беріп, «жарияланды» дейді — сондықтан жұмыс басталмай тұрып, браузерде қолмен істелетін қадамдарды тізіп беруін сұра.' },
      ref: 'learn/deploy',
    },
    {
      id: 'builder-paste-the-trace',
      q:
        { en: 'A user hits a 500 on the reserve button. You have the full stack trace open in the host\'s dashboard. What goes into the agent prompt?', kk: 'Пайдаланушы брондау түймесін басқанда 500 қатесін алды. Хостың басқару панелінде толық стек ізі ашық тұр. Agent-ке арналған prompt ішіне не кіреді?' },
      options: [
        { en: 'Your own two-sentence summary of what went wrong, so the context stays clean', kk: 'Не болғаны туралы өзің жазған екі сөйлемдік түйін — сонда контекст таза қалады' },
        { en: 'Only the file and line from the first frame, since the rest is node_modules noise', kk: 'Тек алғашқы кадрдағы файл мен жол нөмірі, қалғаны node_modules шуы' },
        { en: 'The trace unedited, the log lines around it, and the files it names', kk: 'Стек ізі өңделмеген күйінде, айналасындағы журнал жолдары және онда аталған файлдар' },
        { en: 'A screenshot of the dashboard showing how many people hit the error', kk: 'Қатеге қанша адам тап болғанын көрсететін басқару панелінің скриншоты' },
      ],
      answer: 2,
      why:
        { en: 'Everywhere else you trim what you paste, but a trace is evidence, and a summary of it is lossy compression done by the person who does not understand the bug yet. If the log still is not enough, ask what to log next instead of guessing.', kk: 'Басқа жерде көшіретініңді қысқартасың, ал стек ізі — дәлел, әрі оның түйінін әлі қатені түсінбеген адам жазып отыр. Журнал сонда да жетпесе, болжамның орнына келесі не жазып алу керегін сұра.' },
      ref: 'learn/logs-and-feedback',
    },
  ],
  security: [
    {
      id: 'security-lethal-trifecta',
      q:
        { en: 'Your agent can read your private repositories and it can open public pull requests. Which one more thing turns that setup into Simon Willison\'s lethal trifecta?', kk: 'Agent-ің жеке репозиторийлеріңді оқи алады және ашық pull request аша алады. Мұны Simon Willison айтқан lethal trifecta-ға айналдыру үшін тағы не жетіспейді?' },
      options: [
        { en: 'Letting it read issues that strangers filed on your public repo', kk: 'Ашық repo-ңда бейтаныс адамдар жазған issue-лерді оқуға рұқсат беру' },
        { en: 'Giving it a second MCP server that reads only your own files', kk: 'Тек өз файлдарыңды оқитын екінші MCP серверін қосу' },
        { en: 'Running it in auto mode so it stops asking about every command', kk: 'Әр пәрмен туралы сұрамауы үшін auto режимінде іске қосу' },
        { en: 'Letting it run for hours without you watching the terminal', kk: 'Терминалды бақыламай, сағаттап жұмыс істетіп қою' },
      ],
      answer: 0,
      why:
        { en: 'The trifecta is private data, untrusted content, and a way to send data out. You already have two. Attacker-written text is the third, and Invariant Labs demonstrated exactly this: an instruction hidden in a public issue that made the agent publish private code.', kk: 'Trifecta — жеке деректерге қол жеткізу, сенімсіз мазмұнмен жанасу және деректі сыртқа жіберу жолы. Екеуі бар. Үшіншісі — шабуылдаушы жазған мәтін. Invariant Labs дәл осыны көрсетті: ашық issue ішіндегі нұсқау agent-ке жабық кодты жариялатты.' },
      ref: 'learn/security',
    },
    {
      id: 'security-public-key-by-design',
      q:
        { en: 'Your Supabase app has a login page and it works. One table still has no row level security policy. Why can strangers already read that table?', kk: 'Supabase қолданбаңда кіру беті бар, ол жұмыс істеп тұр. Бір кестеде row level security ережесі әлі жоқ. Сол кестені бейтаныс адамдар неге қазірдің өзінде оқи алады?' },
      options: [
        { en: 'The browser talks to the database directly with a key that is public by design, so the login page is not in the way', kk: 'Браузер дерекқормен тікелей сөйлеседі, ал кілт әдейі ашық — кіру беті ортада тұрмайды' },
        { en: 'Supabase keeps new tables readable until the project moves to a paid plan', kk: 'Supabase жаңа кестелерді ақылы тарифке көшкенше оқуға ашық ұстайды' },
        { en: 'The anon key must have leaked into git history at some point', kk: 'Anon кілт бір кезде git тарихына түсіп кеткен болуы керек' },
        { en: 'The login check runs on the server, but only after the query has already returned', kk: 'Кіру тексерісі серверде жүреді, бірақ сұрау нәтижесі қайтқаннан кейін ғана' },
      ],
      answer: 0,
      why:
        { en: 'On Supabase and Firebase the key in the browser is meant to be public. Row level security policies are the only thing between the internet and the table. A login screen decides what your interface shows, not what the database hands out.', kk: 'Supabase пен Firebase-те браузердегі кілт әдейі ашық. Интернет пен кестенің арасындағы жалғыз нәрсе — RLS ережелері. Кіру беті интерфейс не көрсететінін шешеді, дерекқор не беретінін емес.' },
      ref: 'learn/security',
    },
    {
      id: 'security-service-role-in-bundle',
      q:
        { en: 'You search your built bundle and find `service_role`. RLS is switched on for every table. How bad is it?', kk: 'Жиналған bundle ішінен `service_role` тіркесін таптың. Әр кестеде RLS қосулы. Жағдай қаншалық ауыр?' },
      options: [
        { en: 'As bad as having no RLS at all: that key bypasses row level security, so rotate it today', kk: 'RLS мүлде жоқтағыдай ауыр: бұл кілт RLS-ті айналып өтеді, сондықтан оны бүгін ауыстыр' },
        { en: 'Limited: RLS applies to that key too, so only tables you made public are exposed', kk: 'Шектеулі: бұл кілтке де RLS қолданылады, сондықтан тек өзің ашқан кестелер көрінеді' },
        { en: 'Acceptable while the site is served over HTTPS, because the bundle is encrypted in transit', kk: 'Сайт HTTPS арқылы берілсе, қауіпті емес — bundle жолда шифрланады' },
        { en: 'Only a problem if the repository is public, since the bundle is generated from it', kk: 'Репозиторий ашық болса ғана мәселе, себебі bundle содан жиналады' },
      ],
      answer: 0,
      why:
        { en: 'A `service_role` key bypasses RLS. That is the exact shape of the Supabase MCP attack, where the agent read a tokens table straight through the policies. Any occurrence outside a server-side file means rotate the key.', kk: '`service_role` кілті RLS-ті айналып өтеді. Supabase MCP шабуылының пішіні дәл осындай болды: agent токендер кестесін ережелердің үстінен оқып шықты. Серверлік файлдан тыс жерде кездессе, кілт ауыстырылады.' },
      ref: 'learn/security',
    },
    {
      id: 'security-view-owner-privileges',
      q:
        { en: 'Harley Kimball had row level security switched on and was still broken into twice. What let a reader walk past the policies?', kk: 'Harley Kimball-да row level security қосулы тұрса да, оны екі рет бұзып кірді. Оқып кеткен адам ережелерді қалай айналып өтті?' },
      options: [
        { en: 'A Postgres view ran with its owner\'s privileges, so reading through the view skipped row level security', kk: 'Бір Postgres view оны жасаған иенің құқығымен орындалды, сондықтан ол арқылы оқығанда RLS аттап өтілді' },
        { en: 'He had pasted his anon key into a public post while asking for help', kk: 'Ол көмек сұрап жазған ашық жазбасына anon кілтін қойып жіберген еді' },
        { en: 'His policies covered select, but he had forgotten insert and update', kk: 'Ережелері select-ті қамтыған, бірақ insert пен update ұмыт қалған' },
        { en: 'Cursor had written a second client that connected with an older key', kk: 'Cursor ескі кілтпен қосылатын екінші клиент жазып қойған еді' },
      ],
      answer: 0,
      why:
        { en: 'RLS applies to the table, not to everything sitting in front of it. A view owned by a privileged role reads with that role\'s rights, which is why the module tells you to check whose privileges your views run with.', kk: 'RLS кестеге қолданылады, оның алдында тұрған нәрсенің бәріне емес. Артықшылығы бар рөлге тиесілі view сол рөлдің құқығымен оқиды — сондықтан модуль view кімнің құқығымен орындалатынын тексер дейді.' },
      ref: 'learn/security',
    },
    {
      id: 'security-cross-user-read',
      q:
        { en: 'You logged out, took the anon key from the Network tab, ran `curl` against the `orders` table and got an empty array. Which hole does that test leave untested?', kk: 'Жүйеден шығып, Network қойындысынан anon кілтті алып, `orders` кестесіне `curl` жібердің — бос массив қайтты. Бұл тексеріс қандай тесікті ашық қалдырады?' },
      options: [
        { en: 'Whether a signed-in user can read another user\'s row by changing the id', kk: 'Жүйеге кірген пайдаланушы id-ді өзгерту арқылы басқа адамның жолын оқи ала ма' },
        { en: 'Whether the anon key is present in the built bundle', kk: 'Anon кілт жиналған bundle ішінде бар ма' },
        { en: 'Whether the table has automatic backups switched on', kk: 'Кестеде автоматты сақтық көшірме қосулы ма' },
        { en: 'Whether the sign-up form validates the email on the server', kk: 'Тіркелу формасы поштаны серверде тексере ме' },
      ],
      answer: 0,
      why:
        { en: 'The logged-out `curl` only proves that anonymous strangers are blocked. The checklist carries a second test for a reason: log in as one user, change an id in the request, and see whether somebody else\'s row comes back.', kk: 'Жүйеден шығып жасалған `curl` тек аты белгісіз қонақтың бұғатталғанын дәлелдейді. Тізімде екінші тексеріс бекер тұрған жоқ: бір пайдаланушы болып кір, сұраудағы id-ді өзгерт те, бөтен жол қайта ма — соны қара.' },
      ref: 'learn/security',
    },
    {
      id: 'security-scanner-policy-exists',
      q:
        { en: 'A security scanner reports that every table in your project has a row level security policy. What has it still not told you?', kk: 'Қауіпсіздік сканері жобаңдағы әр кестеде row level security ережесі бар дейді. Ол саған әлі нені айтпады?' },
      options: [
        { en: 'Whether those policies restrict anything, or simply allow everything', kk: 'Сол ережелер шынымен шектей ме, әлде бәріне рұқсат бере ме' },
        { en: 'Whether the tables also have backups configured', kk: 'Кестелерде сақтық көшірме бапталған ба' },
        { en: 'Whether the policies were written before or after the tables', kk: 'Ережелер кестелерден бұрын жазылды ма, кейін жазылды ма' },
        { en: 'Whether the anon key in the browser is the current one', kk: 'Браузердегі anon кілт ең соңғысы ма' },
      ],
      answer: 0,
      why:
        { en: 'Lovable shipped a scanner in April 2025 that checked whether a policy existed, not whether it allowed everything. A policy that permits every row passes the check and protects nothing.', kk: 'Lovable 2025 жылдың сәуірінде ереженің бар-жоғын тексеретін сканер шығарды, ал ереже бәріне рұқсат беріп тұр ма — соны тексермеді. Әр жолға рұқсат беретін ереже мұндай тексерістен өтеді де, ештеңені қорғамайды.' },
      ref: 'learn/security',
    },
    {
      id: 'security-slopsquatting',
      q:
        { en: 'Why does a package name a model invented become an attacker\'s opportunity, instead of just a failed install?', kk: 'Модель ойдан шығарған пакет атауы неге жай ғана «орнатылмай қалған пакет» емес, шабуылдаушыға мүмкіндік болып шығады?' },
      options: [
        { en: 'Models invent the same names repeatedly, so an attacker can register one and wait for someone to install it', kk: 'Модельдер бір атауларды қайта-қайта ойлап табады, сондықтан шабуылдаушы соны тіркеп қойып, біреу орнатқанша күте алады' },
        { en: 'npm resolves a missing name to the closest existing package automatically', kk: 'npm жоқ атауды өзіне ең ұқсас пакетке автоматты түрде ауыстырады' },
        { en: 'A missing package makes the agent retry the install with raised permissions', kk: 'Пакет табылмаса, agent оны жоғары рұқсатпен қайта орнатып көреді' },
        { en: 'Registries create a placeholder page for any name that gets requested often', kk: 'Registry жиі сұралған кез келген атауға дайын бет ашып қояды' },
      ],
      answer: 0,
      why:
        { en: 'A 2026 study found 127 fake names invented identically by five frontier models, and 53 of them were still free to register after disclosure. Predictable is all an attacker needs.', kk: '2026 жылғы зерттеу бес алдыңғы қатарлы модель дәл бірдей ойлап тапқан 127 жалған атауды тапты, олардың 53-і жарияланғаннан кейін де тіркеуге бос тұрған. Шабуылдаушыға керегі — болжауға болатындығы.' },
      ref: 'learn/security',
    },
    {
      id: 'security-mcp-tool-poisoning',
      q:
        { en: 'Which part of an MCP server reaches the model without ever being shown to you?', kk: 'MCP серверінің қай бөлігі саған көрсетілмей, тікелей модельге жетеді?' },
      options: [
        { en: 'The tool descriptions, which the server can also rewrite after you have approved it', kk: 'Құрал сипаттамалары — оларды сервер сен мақұлдағаннан кейін қайта жаза да алады' },
        { en: 'The server\'s source code, which the model reads before the first call', kk: 'Сервердің бастапқы коды — модель оны бірінші шақырудан бұрын оқиды' },
        { en: 'The server\'s log file, which is attached to every tool result', kk: 'Сервердің журнал файлы — ол әр құрал нәтижесіне қоса беріледі' },
        { en: 'The server\'s network traffic, which the model inspects for errors', kk: 'Сервердің желілік трафигі — модель оны қате іздеп қарап шығады' },
      ],
      answer: 0,
      why:
        { en: 'Invariant Labs demonstrated an innocuous `add` tool whose description told the agent to read the user\'s SSH private key and pass it as a hidden parameter. You approve the tool\'s name; the model obeys its description.', kk: 'Invariant Labs зиянсыз көрінетін `add` құралын көрсетті: сипаттамасында agent-ке пайдаланушының SSH жеке кілтін оқып, жасырын параметр ретінде жіберу нұсқауы тұрған. Сен құралдың атауын мақұлдайсың, ал модель оның сипаттамасын орындайды.' },
      ref: 'learn/security',
    },
    {
      id: 'security-deny-list-not-a-boundary',
      q:
        { en: 'You put deny rules for `.env`, `~/.ssh` and `~/.aws` into `.claude/settings.json`. Why does the module still refuse to call that a security boundary?', kk: '`.claude/settings.json` файлына `.env`, `~/.ssh` және `~/.aws` үшін тыйым ережелерін жаздың. Модуль мұны неге бәрібір қауіпсіздік шекарасы деп атамайды?' },
      options: [
        { en: 'A blocked agent can write and run a script that reads the same files', kk: 'Жолы жабылған agent сол файлдарды оқитын скрипт жазып, соны іске қоса алады' },
        { en: 'Deny rules are ignored whenever the session is in plan mode', kk: 'Сеанс plan режимінде тұрғанда тыйым ережелері ескерілмейді' },
        { en: 'The rules only start applying after you approve the first prompt', kk: 'Ережелер сен бірінші рұқсатты бергеннен кейін ғана күшіне енеді' },
        { en: 'The rules cover reads, but the agent can still open those files for writing', kk: 'Ережелер оқуды ғана қамтиды, agent файлдарды жазуға аша береді' },
      ],
      answer: 0,
      why:
        { en: 'A deny list stops the obvious accident, not a determined path around it. For real autonomy the module says to isolate the machine rather than keep lengthening the list.', kk: 'Тыйым тізімі айқын кездейсоқ қатені тоқтатады, әдейі іздеген айналма жолды тоқтатпайды. Шын еркіндік керек болса, модуль тізімді ұзартпай, компьютердің өзін оқшаулауды айтады.' },
      ref: 'learn/security',
    },
    {
      id: 'security-skip-permissions-nx',
      q:
        { en: 'Beyond the agent\'s own mistakes, what did the August 2025 Nx attack show about `--dangerously-skip-permissions`?', kk: 'Agent-тің өз қателерінен бөлек, 2025 жылдың тамызындағы Nx шабуылы `--dangerously-skip-permissions` туралы нені көрсетті?' },
      options: [
        { en: 'Malware on the machine hunted for installed AI CLIs and invoked them with those skip-all flags to find secrets', kk: 'Компьютердегі зиянды бағдарлама орнатылған ЖИ CLI құралдарын тауып, оларды сол «бәрін өткізіп жібер» жалаушаларымен іске қосып, құпия деректерді іздеді' },
        { en: 'The flag silently uploaded the project\'s environment variables to the tool vendor', kk: 'Жалауша жобаның орта айнымалыларын үнсіз түрде құрал сатушысына жіберіп отырды' },
        { en: 'The flag disabled the sandbox, and the sandbox is the only thing blocking network access', kk: 'Жалауша sandbox-ты сөндірді, ал желіге шығуды тек sandbox қана бұғаттайды' },
        { en: 'The flag let the agent install packages that npm audit would otherwise have rejected', kk: 'Жалауша npm audit қабылдамайтын пакеттерді орнатуға мүмкіндік берді' },
      ],
      answer: 0,
      why:
        { en: 'Permission prompts are not only there to catch the agent. They are also the barrier an attacker who already has a foothold has to get past, and that flag hands it to them.', kk: 'Рұқсат сұраулары тек agent-тің қатесін ұстау үшін тұрған жоқ. Олар — компьютерге кіріп алған шабуылдаушы аттап өтуге мәжбүр болатын тосқауыл, ал бұл жалауша оны шабуылдаушының қолына беріп қояды.' },
      ref: 'learn/security',
    },
    {
      id: 'security-committed-key-rotate',
      q:
        { en: 'You pushed a public repo, then noticed `.env` went up with it. You delete the file and push again. What is still true?', kk: 'Ашық репозиторийге push жасадың, сосын `.env` файлы қоса кеткенін байқадың. Файлды өшіріп, қайта push жасадың. Не өзгермей қалды?' },
      options: [
        { en: 'The key stays compromised until you rotate it — deleting the file does not take it back', kk: 'Кілт ауыстырылмайынша ұрланған болып қала береді — файлды өшіру оны қайтармайды' },
        { en: 'The key is safe again, because GitHub rewrites the history when a file is removed', kk: 'Кілт қайта қауіпсіз болды: файл өшірілгенде GitHub тарихты қайта жазады' },
        { en: 'The key is safe if the repository was public for less than an hour', kk: 'Репозиторий бір сағаттан аз уақыт ашық тұрса, кілт қауіпсіз' },
        { en: 'The key is safe once `.env` is in `.gitignore`, because that covers the old commit too', kk: '`.env` файлы `.gitignore` ішіне түскен соң кілт қауіпсіз, себебі ол ескі commit-ті де қамтиды' },
      ],
      answer: 0,
      why:
        { en: 'A public repo is public the instant it exists, and a committed key stays compromised after you delete it — it is still in git history. Rotate anything ever committed, or ever pasted into an AI chat.', kk: 'Ашық репозиторий пайда болған сәттен бастап ашық, ал бір рет commit-ке түскен кілт өшірілгеннен кейін де ұрланған болып қала береді — ол git тарихында жатыр. Бір рет commit-ке түскен немесе ЖИ-чатқа қойылған кілттің бәрін ауыстыр.' },
      ref: 'labs/ship-it',
    },
    {
      id: 'security-tests-deleted-for-green',
      q:
        { en: 'After a long fix loop the agent\'s screen says \'all tests pass\'. Which of Kent Beck\'s three cheating signals does that message hide best?', kk: 'Ұзақ түзету циклінен кейін agent экранында «all tests pass» деп тұр. Kent Beck атаған үш белгінің қайсысын бұл хабар ең жақсы жасырады?' },
      options: [
        { en: 'It disabled or deleted the tests that were failing', kk: 'Құлап тұрған тесттерді сөндіріп немесе өшіріп тастағанын' },
        { en: 'It looped on the same fix for a long time', kk: 'Бір түзетуді ұзақ айналсоқтағанын' },
        { en: 'It added functionality nobody asked for', kk: 'Ешкім сұрамаған мүмкіндік қосқанын' },
        { en: 'It ran only the new test file instead of the whole suite', kk: 'Толық жиынтықтың орнына тек жаңа тест файлын іске қосқанын' },
      ],
      answer: 0,
      why:
        { en: 'Looping and unasked-for features are visible in the transcript. A deleted or skipped test looks exactly like a passing one from the summary, so read the diff for removed test files every time.', kk: 'Айналсоқтау мен артық мүмкіндік транскриптте көрініп тұрады. Ал өшірілген не аттап кетілген тест қорытындыда өтіп жатқан тесттен еш айнымайды, сондықтан diff-те өшірілген тест файлы бар-жоғын әр жолы қарап шық.' },
      ref: 'learn/test-and-quality',
    },
  ],
  advanced: [
    {
      id: 'advanced-split-by-context',
      q:
        { en: 'You plan to have one agent write a feature and a second agent write its tests. Why does the course tell you to merge those two into one agent?', kk: 'Бір agent мүмкіндікті жазады, екінші agent соның тестін жазады деп жоспарладың. Курс неге бұл екеуін бір agent-ке біріктір дейді?' },
      options: [
        { en: 'Two sessions cost double, and tests are cheap enough to write by hand afterwards', kk: 'Екі сеанс екі есе қымбат, ал тестті кейін қолмен жаза салу да қиын емес' },
        { en: 'The agent that built the feature already holds the context; a separate tester tests what it guessed the feature was', kk: 'Мүмкіндікті жасаған agent-тің қолында контекст онсыз да бар; бөлек тестілеуші мүмкіндіктің не екенін өзі болжап, соны тестілейді' },
        { en: 'A subagent may not run test commands, so it could never prove the feature works', kk: 'Subagent-ке тест пәрмендерін іске қосуға рұқсат жоқ, сондықтан ол ештеңені дәлелдей алмайды' },
        { en: 'Test files and source files usually sit in the same folder, so the two agents would collide', kk: 'Тест файлдары мен бастапқы код әдетте бір қалтада жатады, сондықтан екі agent соқтығысады' },
      ],
      answer: 1,
      why:
        { en: 'Split by context, not by job title. Every handoff drops what the previous agent knew but never wrote down, and the agent that built the feature already holds everything its tests need.', kk: 'Лауазым бойынша емес, контекст бойынша бөл. Әр беруде алдыңғы agent білген, бірақ жазып қалдырмаған нәрсе жоғалады, ал мүмкіндікті жасаған agent-те тестке керектің бәрі бар.' },
      ref: 'learn/multi-agent',
    },
    {
      id: 'advanced-fan-out-floor',
      q:
        { en: 'The fan-out prompt makes the agent merge any two tasks that share a file or share a design decision. What does it say to do when fewer than two tasks survive that rule?', kk: 'Fan-out prompt-ы бір файлды немесе бір дизайн шешімін бөлісетін кез келген екі тапсырманы біріктір дейді. Осы ережеден кейін екеуден аз тапсырма қалса, не істеу керек деп жазылған?' },
      options: [
        { en: 'Spawn one extra agent to own the shared file, so the split still holds', kk: 'Ортақ файлдың иесі болатын тағы бір agent қосу, сонда бөлініс бұзылмайды' },
        { en: 'Say so, and just do the work yourself in this session — spawn nothing', kk: 'Соны айту да, жұмысты осы сеанста өзің істеп шығу — ештеңе іске қоспау' },
        { en: 'Split the shared file in two, so each task ends up with its own', kk: 'Ортақ файлды екіге бөлу, сонда әр тапсырманың өз файлы болады' },
        { en: 'Run the surviving tasks one after another inside a single worktree', kk: 'Аман қалған тапсырмаларды бір worktree ішінде кезекпен орындау' },
      ],
      answer: 1,
      why:
        { en: 'The prompt is a filter, not a fan-out button. If the work does not survive the merge rule, parallelism has nothing to buy you and one session is the cheaper, safer shape.', kk: 'Бұл prompt — fan-out түймесі емес, сүзгі. Жұмыс біріктіру ережесінен өтпесе, қатарластық саған ештеңе бермейді, ал бір сеанс арзанырақ әрі қауіпсіз.' },
      ref: 'learn/multi-agent',
    },
    {
      id: 'advanced-fresh-verifier',
      q:
        { en: 'Every parallel task from the fan-out prompt has come back with its result. The prompt then starts one more subagent. What is that last subagent for?', kk: 'Fan-out prompt-ындағы қатар жүрген тапсырманың бәрі нәтижесімен оралды. Содан кейін prompt тағы бір subagent іске қосады. Ол не үшін керек?' },
      options: [
        { en: 'To merge the branches and resolve whatever conflicts the parallel edits produced', kk: 'Тармақтарды біріктіріп, қатар жасалған өзгерістерден шыққан қайшылықтарды шешу үшін' },
        { en: 'To re-run every check itself and report what actually fails, having written none of the code', kk: 'Бұл кодтың бірде-бір жолын жазбаған күйі әр тексеруді өзі қайта жүргізіп, шынында не құлайтынын айту үшін' },
        { en: 'To compress the other agents\' reports into one short summary you can read', kk: 'Басқа agent-тердің есептерін сен оқитын бір қысқа қорытындыға сығу үшін' },
        { en: 'To pick up whatever the others left unfinished and spawn replacements for it', kk: 'Қалғандары аяқтамаған жұмысты алып, оның орнына жаңа agent-тер қосу үшін' },
      ],
      answer: 1,
      why:
        { en: 'An agent defending code it wrote ten minutes ago is a weak referee. A fresh context that produced none of the work re-runs the checks and reports the real failures.', kk: 'Он минут бұрын өзі жазған кодты қорғап отырған agent — нашар төреші. Жұмысқа мүлде қатыспаған таза контекст тексерулерді қайта жүргізіп, нағыз ақауларды айтады.' },
      ref: 'learn/multi-agent',
    },
    {
      id: 'advanced-teams-not-isolated',
      q:
        { en: 'You move from two worktree sessions to an agent team: one lead plus three teammates. What protection do you lose in that move?', kk: 'Екі worktree сеансынан agent командасына көштің: бір жетекші және үш командалас. Осы көшуде қандай қорғанысты жоғалтасың?' },
      options: [
        { en: 'The shared task list, since an agent team coordinates through the lead instead', kk: 'Ортақ тапсырма тізімін — agent командасы оның орнына жетекші арқылы үйлеседі' },
        { en: 'File isolation — teammates are not worktree-isolated, so partitioning files is your job', kk: 'Файлдардың оқшаулануын — командаластар worktree-мен оқшауланбайды, сондықтан файлдарды бөлу сенің жұмысың' },
        { en: 'The ability to route each agent to a different model for its part of the work', kk: 'Әр agent-ке өз бөлігі үшін бөлек модель беру мүмкіндігін' },
        { en: 'Plan mode, which agent teams are not allowed to start in', kk: 'Plan mode-ты — agent командаларына онда бастауға болмайды' },
      ],
      answer: 1,
      why:
        { en: 'A worktree is the layer that stops two agents touching the same file. Agent teams do not have it, so one owner per file becomes something you enforce by hand.', kk: 'Worktree — екі agent-тің бір файлға тиюін тоқтататын қабат. Agent командаларында ол жоқ, сондықтан «әр файлға бір ие» ережесін қолмен ұстауға тура келеді.' },
      ref: 'learn/multi-agent',
    },
    {
      id: 'advanced-worktree-base-ref',
      q:
        { en: 'You commit your latest work but do not push it. Then you open two worktree sessions with `claude --worktree`. What do both agents start from?', kk: 'Соңғы жұмысыңды commit жасадың, бірақ push жасаған жоқсың. Содан кейін `claude --worktree` арқылы екі worktree сеансын аштың. Екі agent те неден бастайды?' },
      options: [
        { en: 'Your latest local commit, because a worktree copies the folder you are standing in', kk: 'Соңғы жергілікті commit-іңнен, себебі worktree сен тұрған қалтаны көшіреді' },
        { en: 'The remote default branch, so both agents begin from code missing your last commit', kk: 'Қашықтағы әдепкі тармақтан, сондықтан екі agent те соңғы commit-ің жоқ кодтан бастайды' },
        { en: 'An empty branch with no history, which is why dependencies have to be reinstalled', kk: 'Тарихы жоқ бос тармақтан, тәуелділіктерді қайта орнататын себеп те сол' },
        { en: 'Whichever branch happened to be checked out in the main folder when you ran it', kk: 'Негізгі қалтада іске қосқан сәтте қай тармақ ашық тұрса, содан' },
      ],
      answer: 1,
      why:
        { en: 'By default `worktree.baseRef` is `fresh`: the branch comes off the remote default branch, not your local HEAD. Push before you fan out, or set `baseRef` to `head`.', kk: 'Әдепкіде `worktree.baseRef` мәні — `fresh`: тармақ сенің жергілікті HEAD-іңнен емес, қашықтағы әдепкі тармақтан тарайды. Fan-out жасамас бұрын push жаса немесе `baseRef` мәнін `head` қой.' },
      ref: 'labs/parallel-agents',
    },
    {
      id: 'advanced-skill-over-claude-md',
      q:
        { en: 'You have a six-line procedure you re-type most weeks. Why does the lab put it in a skill instead of in CLAUDE.md?', kk: 'Апта сайын дерлік қайта теріп отыратын алты жолдық рәсімің бар. Практика оны неге CLAUDE.md файлына емес, skill-ге салуды айтады?' },
      options: [
        { en: 'CLAUDE.md is capped at 200 lines and the procedure would push it over', kk: 'CLAUDE.md файлы 200 жолмен шектелген, ал рәсім оны сол шектен асырады' },
        { en: 'CLAUDE.md loads every session, so its lines cost context every time; a skill costs about 100 tokens until you call it', kk: 'CLAUDE.md әр сеанста жүктеледі, сондықтан ондағы әр жол әр сеанста контекст жейді; ал skill сен шақырғанға дейін шамамен 100 token тұрады' },
        { en: 'A skill runs in its own context window, so its working output never reaches yours', kk: 'Skill өз контекст терезесінде жұмыс істейді, сондықтан оның жұмыс шығысы сенікіне мүлде жетпейді' },
        { en: 'Only a skill can be committed to the repo, so only a skill reaches your teammates', kk: 'Тек skill-ді ғана repo-ға commit жасауға болады, сондықтан командаластарыңа тек ол жетеді' },
      ],
      answer: 1,
      why:
        { en: 'The "own context window" option describes a subagent, not a skill. A skill loads in layers: metadata always, the body only when it is relevant, referenced files only when needed.', kk: '«Өз контекст терезесі бар» деген нұсқа skill-ді емес, subagent-ті сипаттайды. Skill қабаттап жүктеледі: метадерек әрқашан, мәтін бөлігі тек қатысы болғанда, сілтеме жасалған файлдар тек керек болғанда.' },
      ref: 'labs/mcp-skills-subagents',
    },
    {
      id: 'advanced-commit-before-subagent',
      q:
        { en: 'Lab 05 makes you commit immediately before you hand work to a subagent. What goes wrong if you skip that commit?', kk: 'Lab 05 жұмысты subagent-ке тапсырар алдында дәл сол сәтте commit жасауды талап етеді. Сол commit-ті өткізіп жіберсең, не бұзылады?' },
      options: [
        { en: 'The subagent cannot see files that have not been committed yet', kk: 'Subagent әлі commit жасалмаған файлдарды көре алмайды' },
        { en: '`/rewind` usually does not restore subagent edits, so your checkpoints will not bring the files back', kk: '`/rewind` пәрмені subagent өзгерістерін әдетте қайтармайды, сондықтан checkpoint-терің файлдарды кері әкелмейді' },
        { en: 'The subagent inherits its permissions from the last commit, so it runs with none', kk: 'Subagent рұқсаттарды соңғы commit-тен мұра етеді, сондықтан рұқсатсыз жұмыс істейді' },
        { en: '`/context` counts the subagent\'s file reads against your own window instead', kk: '`/context` subagent оқыған файлдарды сенің терезеңе жазып қояды' },
      ],
      answer: 1,
      why:
        { en: 'Checkpoints are local undo and they miss subagent edits and Bash changes. Git is the undo that covers everything, which is why the commit comes before the delegation.', kk: 'Checkpoint — жергілікті болдырмау, ол subagent өзгерістерін де, Bash жасаған өзгерістерді де қамтымайды. Бәрін қамтитын болдырмау — git, сондықтан commit тапсырудың алдында тұрады.' },
      ref: 'labs/mcp-skills-subagents',
    },
    {
      id: 'advanced-blockers-second-failure',
      q:
        { en: 'At 03:00 your unattended run fails the same step for the second time. What does the master prompt tell it to do next?', kk: 'Түнгі 03:00-де қараусыз жүрген жұмыс бір қадамда екінші рет сүрінді. Басты prompt оған әрі қарай не істеуді айтады?' },
      options: [
        { en: 'Try once more with a different approach, and stop only if that attempt fails too', kk: 'Басқа жолмен тағы бір рет көру, ол да сәтсіз болса ғана тоқтау' },
        { en: 'Stop that item, append what it tried and what it saw to BLOCKERS.md, move to the next', kk: 'Сол тармақты тоқтату, не істегенін және не көргенін BLOCKERS.md файлына жазу, келесіге өту' },
        { en: 'Roll back to the last commit and restart the session from PROGRESS.md', kk: 'Соңғы commit-ке қайтып, сеансты PROGRESS.md файлынан қайта бастау' },
        { en: 'Wait for you, leaving the question at the end of PROGRESS.md', kk: 'Сені күту және сұрақты PROGRESS.md файлының соңына қалдыру' },
      ],
      answer: 1,
      why:
        { en: 'Two attempts, then write it down and move on. A third attempt at 03:00 spends tokens on the thing least likely to work, and BLOCKERS.md is what you read in the morning.', kk: 'Екі талпыныс, сосын жазып қой да, әрі қарай жүр. Түнгі 03:00-дегі үшінші талпыныс token-ді сәті ең аз нәрсеге жағады, ал таңертең оқитының — BLOCKERS.md файлы.' },
      ref: 'learn/overnight-builds',
    },
    {
      id: 'advanced-clear-over-compact',
      q:
        { en: 'You finish one task and move to an unrelated one in the same long session. Which move is the free one?', kk: 'Бір ұзақ сеанста бір тапсырманы бітіріп, оған қатысы жоқ екіншісіне көштің. Қайсысы тегін?' },
      options: [
        { en: '`/compact`, because it shrinks the conversation before the next request goes out', kk: '`/compact` пәрмені, себебі ол келесі сұрау кетпей тұрып әңгімені кішірейтеді' },
        { en: '`/clear`, because `/compact` is itself a large request', kk: '`/clear` пәрмені, себебі `/compact` өзі үлкен сұрау' },
        { en: 'Lowering `/effort`, because thinking tokens are not billed', kk: '`/effort` деңгейін төмендету, себебі ойлану token-дері есептелмейді' },
        { en: 'Opening a subagent, because its window is billed separately from yours', kk: 'Subagent ашу, себебі оның терезесі сенікінен бөлек есептеледі' },
      ],
      answer: 1,
      why:
        { en: 'Compaction has to send the whole conversation to be summarised, so it costs. Clearing costs nothing. Lower `/effort` is still worth doing on simple work — thinking tokens bill as output.', kk: 'Сығу үшін бүкіл әңгімені қорытуға жіберу керек, сондықтан ол ақылы. Тазалау ештеңе тұрмайды. Ал `/effort` деңгейін қарапайым жұмыста төмендеткен жөн — ойлану token-дері шығыс ретінде есептеледі.' },
      ref: 'learn/overnight-builds',
    },
    {
      id: 'advanced-grill-me-vs-goal',
      q:
        { en: 'In Antigravity\'s terminal agent `agy`, what is the difference between `/grill-me` and `/goal`?', kk: 'Antigravity-дің терминалдағы agent-і `agy` ішінде `/grill-me` мен `/goal` пәрмендерінің айырмашылығы неде?' },
      options: [
        { en: '`/grill-me` runs the task to the end with no stops; `/goal` makes it ask questions first', kk: '`/grill-me` тапсырманы тоқтаусыз соңына дейін жүргізеді; `/goal` алдымен сұрақ қойғызады' },
        { en: '`/grill-me` makes it ask clarifying questions before writing; `/goal` runs with no approval stops', kk: '`/grill-me` код жазбас бұрын нақтылаушы сұрақ қойғызады; `/goal` мақұлдау тоқтауынсыз жүгіреді' },
        { en: 'Both are approval settings, and `/grill-me` is the stricter of the two', kk: 'Екеуі де мақұлдау параметрі, ал `/grill-me` қатаңырағы' },
        { en: '`/grill-me` reviews a finished diff; `/goal` sets your weekly model quota', kk: '`/grill-me` дайын diff-ті тексереді; `/goal` апталық модель квотаңды белгілейді' },
      ],
      answer: 1,
      why:
        { en: 'They sit at opposite ends of the autonomy dial: one adds friction before the first line of code, the other removes the stops entirely. Know which one you just turned on.', kk: 'Екеуі дербестік реттегішінің қарама-қарсы шетінде тұр: біреуі бірінші жол жазылмай тұрып кедергі қосады, екіншісі тоқтаудың бәрін алып тастайды. Қайсысын қосқаныңды біл.' },
      ref: 'labs/other-tools',
    },
    {
      id: 'advanced-readme-vs-docs',
      q:
        { en: 'The Gemini CLI README still advertises 1,000 free requests a day. The docs site says consumers lost the tool on 18 June 2026. What does the lab tell you to do?', kk: 'Gemini CLI құралының README файлы әлі күнге күніне 1 000 тегін сұрау уәде етеді. Құжаттама беті тұтынушылар бұл құралды 2026 ж. 18 маусымда жоғалтқанын жазады. Практика саған не істеуді айтады?' },
      options: [
        { en: 'Trust the README — it ships with the version you actually installed', kk: 'README файлына сену — ол сен орнатқан нұсқамен бірге келеді' },
        { en: 'Believe the page with a date on it, and test your own account before you rely on a free tier', kk: 'Күні жазылған бетке сену және тегін деңгейге сүйенбес бұрын өз аккаунтыңды тексеріп көру' },
        { en: 'Assume a reduced free tier survives, and plan for fewer requests per day', kk: 'Тегін деңгейдің азайған түрі қалды деп есептеп, күніне аз сұрау жоспарлау' },
        { en: 'Open an issue and wait for the project\'s maintainers to confirm which page is current', kk: 'Issue ашып, қай беттің дұрыс екенін жобаны жүргізушілер растағанша күту' },
      ],
      answer: 1,
      why:
        { en: 'Five tools changed owner, price or name in a year. A README is marketing nobody re-reads; a dated docs page is the one that was updated when the policy actually changed.', kk: 'Бір жылда бес құрал иесін, бағасын немесе атауын өзгертті. README — ешкім қайта оқымайтын жарнама; ал күні жазылған құжаттама беті саясат шынымен өзгергенде жаңартылған бет.' },
      ref: 'labs/other-tools',
    },
  ],
};

export const examPool = (id: TrackId) => exams[id] ?? [];

/** Fisher-Yates over a copy. Used for both the draw and the option order. */
export function shuffled<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
