# Kazakh (kk) localization reference — vibecoding.qairuhub.com

Research date: 21 Sep 2026. Scope: rules + glossary for the EN/KK masterclass site (vibe coding + hands-on Claude Code). Kazakh Cyrillic only. Site must contain no Russian.

How this file is organised (decisions first, dump last):
0. Ten decisions to apply site-wide
1. Sources and their verification status
2. Three-tier strategy: keep Latin / Cyrillic loan / translate
3. Attaching Kazakh endings to English words and acronyms (the hard part)
4. Tone: сен vs сіз — recommendation
5. Numbers, dates, units
6. UI microcopy (buttons, navigation, progress, quiz, errors)
7. Russian calques and slang to avoid
8. Glossary, 200+ terms, grouped along the course path
9. 15 example sentences
10. Corrections to common assumptions
11. Visual candidates
12. Fact-check log (22 Sep 2026): 12 on-screen claims re-checked against primary sources; corrections applied in place

Legend: VERIFIED = I opened the source in this session. UNVERIFIED = from memory or a search snippet only; treat as "probably right, check before quoting".

---

## 0. Ten decisions to apply site-wide

1. Translate the concept, keep the tool word. Words the learner will type or see on screen (git, commit, push, deploy, prompt, agent, MCP, API, Docker, LLM, token, repo, frontend, backend, Claude Code) are never replaced with coinages. First mention on a page: Kazakh gloss + English in parentheses, e.g. «тармақ (branch)». After that use whichever is shorter.
2. Script rule for kept words: Latin when it is a proper name, acronym, command or file name (git, GitHub, MCP, API, `.env`, deploy, frontend, backend, pull request). Cyrillic when the word is already a Kazakh dictionary/Wikipedia headword or common in Kazakh media (агент, токен, модель, сервер, код, файл, промпт, репозиторий, коммит). Never write Russian-flavoured spellings (бэкенд, деплой, фича) — they read as Russian.
3. Endings on Latin words: hyphen, no apostrophe, no space: «Claude Code-ты», «GitHub-қа», «git-те», «API-ге». Suffix is chosen by how the word is pronounced (vowel harmony + final consonant). When pronunciation is ambiguous (Gemini, production, CLI), use a Kazakh descriptor noun and put the ending on it: «CLI құралында», «production ортасына». Source: emle.kz rules 7–8 and the Microsoft Kazakh Style Guide (both VERIFIED, section 3).
4. Never attach a suffix to inline code or a command: not «`git push`-ты», but «`git push` пәрменін орында».
5. Tone: сен (informal singular) for learner-facing copy, quiz feedback and prompts; neutral infinitive (-у) for buttons and menu items so the register question never touches the UI chrome; no second person at all in error messages (passive/neutral, no blame, no exclamation marks). Justification in section 4.
6. Standard UI vocabulary follows the intersection of Microsoft + Android + Firefox Kazakh: қолданба (app), параметрлер (settings), әдепкі (default), пайдаланушы (user), әзірлеуші (developer), құпиясөз (password), сілтеме (link), жүктеп алу (download), жаңарту (update), қате (error), бас тарту (cancel), сақтау (save), жою (delete), кіру / тіркелу / шығу (sign in / sign up / sign out).
7. Dates and numbers follow CLDR kk (what `Intl.*('kk-KZ')` outputs): «2026 ж. 21 қыркүйек», «21.09.2026», 24-hour «19:00», decimal comma «3,5», thousands space «1 500», currency «5 000 ₸». Month and weekday names are lowercase.
8. Nouns after a numeral stay singular: «5 сабақ», not «5 сабақтар». Ordinals with digits take a hyphen before the noun: «1-қадам», «3-модуль».
9. Do not use the 2004–2006 state-approved neologisms that even Microsoft dropped: нобай (version), егелік (domain), веб-торап (website), ауани жады (virtual memory), пәрмен is the one survivor (command). Use нұсқа, домен, сайт, виртуалды жад.
10. «Vibe coding» stays Latin as a brand term (the Cyrillic «вайб-кодинг» is the Russian spelling). Gloss on first use: «vibe coding — ЖИ-мен табиғи тілде сөйлесіп код жазу».

---

## 1. Sources and verification status

| # | Source | What it gives | Status |
|---|---|---|---|
| S1 | Microsoft Kazakh Localization Style Guide, PDF, 44 pp. — https://aka.ms/kazakh-styleguide → https://download.microsoft.com/download/aa5b82ec-3bd1-43db-a393-b3a793ef0be1/kaz-kaz-StyleGuide.pdf | Tone, capitalization, punctuation, hyphen/dash, acronyms, error-message phrasing, Copilot prompt localization, standard menu commands | VERIFIED (read all 44 pages) |
| S2 | Microsoft Terminology on Microsoft Learn — https://learn.microsoft.com/en-us/globalization/reference/microsoft-terminology (Power BI search + TBX zip https://download.microsoft.com/download/b/2/d/b2db7a7c-8d33-47f3-b2c1-ee5e6445cf45/MicrosoftTermCollection.zip) | Official term base, ~100 languages incl. Kazakh | VERIFIED page; TBX not downloaded |
| S3 | kk.wikipedia «Ақпараттық технологиялар саласының терминдері» — https://kk.wikipedia.org/wiki/Ақпараттық_технологиялар_саласының_терминдері | The 2004-12-25 and 2006-03-31 State Terminology Commission list prepared with Microsoft (103 table rows, two columns Kazakh / Russian; has нобай, егелік, веб-торап (= веб-узел), ауани жады, «айқұлақ» таңбасы, пәрмен, қолданба, түймешік — but NO rows for ссылка, пароль or пользователь) | VERIFIED (re-checked 22 Sep 2026, raw HTML parsed) |
| S4 | Android (AOSP) Kazakh strings — https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/master/packages/SettingsLib/res/values-kk/strings.xml and …/core/res/res/values-kk/strings.xml | Google's Kazakh UI vocabulary | VERIFIED (extracted via fetch; keys quoted where given) |
| S5 | Firefox Kazakh l10n — https://raw.githubusercontent.com/mozilla-l10n/firefox-l10n/main/kk/browser/browser/preferences/preferences.ftl , …/browser/browser/browser.ftl , …/devtools/client/startup.properties , …/netmonitor.properties , …/debugger.properties | Browser + DevTools terms (debugger, breakpoint, request, headers) | VERIFIED |
| S6 | emle.kz «Дефис» — https://emle.kz/kz/punctuation?id=7 | Orthography: hyphen before suffixes on abbreviations, digits, foreign names | VERIFIED |
| S7 | stan.kz «Қысқарған сөздерге жалғау қалай жалғанады?» (Аққибат Ақжігітова, 11 Dec 2020) — https://stan.kz/kiskargan-sozderge-zhalgau-kalay-zhalganadi-340750/ | Suffix-on-abbreviation rule with examples («АҚШ-тың …, АҚШ-ның емес», «ҚазҰУ-ға», «ТУ-154-пен») | VERIFIED (re-checked 22 Sep 2026) |
| S8 | termincom.kz — https://termincom.kz/ | State term base, «390 787 термин», run by «Тіл-Қазына» centre; search is JS-only, fetch returns no rows | VERIFIED homepage; per-term lookups NOT possible headless |
| S9 | kk.wikipedia «Үлкен тілдік модель» — https://kk.wikipedia.org/wiki/Үлкен_тілдік_модель | LLM vocabulary (ҮТМ, токен, трансформер, эмбеддинг, «сыбыр сөз» for prompt) | VERIFIED |
| S10 | kk.wikipedia Git — https://kk.wikipedia.org/wiki/Git | репозиторий, коммит, бұтақ, біріктіру, нұсқаларды басқару жүйесі, әзірлеуші | VERIFIED |
| S11 | kk.wikipedia Дерекқор — https://kk.wikipedia.org/wiki/Дерекқор | дерекқор, кесте, жол, бағана, сұрату, кілт, транзакция | VERIFIED |
| S12 | kk.wikipedia Ақпараттық қауіпсіздік — https://kk.wikipedia.org/wiki/Ақпараттық_қауіпсіздік | конфиденциалдық, тұтастық, қауіп, осалдылық, аутентификация, авторизациялау, қатер | VERIFIED |
| S13 | kk.wikipedia Бағдарламалық жасақтама, Python, Жасанды интеллект | бастапқы код, бағдарламалау тілі, бағдарламашы, операциялық жүйе, стандартты кітапхана, нұсқа | VERIFIED |
| S14 | ISSAI KAZ-LLM page (Kazakh) — https://issai.nu.edu.kz/kk/kazllm-kaz/ | үлкен тілдік модель, деректер жиынтығы, ашық бастапқы код, бенчмарк, генеративті ЖИ, бейімдеу | VERIFIED |
| S15 | Egemen Qazaqstan «ChatGPT-дің қазақша баламасы», 23 Jul 2024 — https://egemen.kz/news/article368969-chatgpt-dinh-qazaqsha-balamasy | National paper attaching suffixes to Latin acronyms: ChatGPT-дің, LLM-ді | VERIFIED |
| S16 | standard.kz «ЖИ-агенттер …», 18 Sep 2026 — https://standard.kz/kz/post/2026_09_zi-agentter-adamdarga-tusiniksiz-ortaq-til-oilap-tapqan-318 | ЖИ-агенттер, нейрожелі, «Claude-та», «хабарламалардың 40%-ын», «35%-ын». NB: «OpenAI» occurs only uninflected («OpenAI тобында») — «OpenAI-дың» is NOT in this article (earlier claim corrected) | VERIFIED (re-checked 22 Sep 2026) |
| S17 | Samsung KZ (kk) — https://www.samsung.com/kz_kz/ | Жүйеге кіру, Тіркелу, Қолдау, Толығырақ ақпарат, Құпиялылық саясаты, Жабу, Келесі | VERIFIED |
| S18 | Astana Hub (kk) — https://astanahub.com/kk/ | Кіру, Басты бет, Қауымдастық, Бағдарламалар, Іс-шаралар, Өтінім, Стартап | VERIFIED |
| S19 | Scratch editor kk — https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/interface/kk.json | Kids' product still uses сіз; айнымалы, тізім, Бөлісу, Кіру, Жүктелуде… | VERIFIED |
| S20 | CLDR kk — https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-dates-full/main/kk/ca-gregorian.json and …/cldr-numbers-full/main/kk/numbers.json | Date/time/number patterns | VERIFIED |
| S21 | myrzamurat.kz «Backend және Frontend деген не?», 3 May 2023 — https://myrzamurat.kz/blog/backend-және-frontend-деген-не/ | Hobbyist usage: Frontend/Backend kept Latin, «фреймуорк», «батырма», «сұраулар» | VERIFIED |
| S22 | the-tech.kz IT accelerators review, 19 Aug 2026 — https://the-tech.kz/қazaқstandaғy-it-akseleratorlar-sholuy-aipreneurs-rs-bootcamp-most-business-intelligence | Startup vocabulary in Kazakh IT media (стартап, акселератор, фаундер, өтінім, MVP, «Vercel байланысында») | VERIFIED |
| S23 | Microsoft style guide index — https://learn.microsoft.com/en-us/globalization/reference/microsoft-style-guides | Confirms Kazakh guide exists | VERIFIED |
| — | Law of RK «Жасанды интеллект туралы» (signed Nov 2025) and «Ақпараттандыру туралы» on adilet.zan.kz | Legal definitions | UNVERIFIED — adilet.zan.kz returned an empty shell to fetch |
| S24 | Collins Dictionary blog «Collins' Word of the Year 2025: AI meets authenticity as society shifts», 6 Nov 2025 — https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/ | «vibe coding» = Word of the Year 2025, defined as «the use of artificial intelligence prompted by natural language to write computer code»; credits Andrej Karpathy with coining it; shortlist incl. «clanker», «broligarchy», «aura farming» | VERIFIED (22 Sep 2026) |
| — | Karpathy's X post, 2 Feb 2025, id 1886192184808149383 — https://x.com/karpathy/status/1886192184808149383 | Origin of the term | Date and id confirmed only via en.wikipedia's citation (https://en.wikipedia.org/wiki/Vibe_coding); the post itself could not be opened (x.com, xcancel and publish.x.com/oembed all block non-browser clients) — exact wording UNVERIFIED |

Note on Google: https://support.google.com/...?hl=kk served Russian text to a headless fetch, so Google Help is not a usable Kazakh source; use AOSP strings (S4) as the Google-side reference.

---

## 2. Three-tier strategy for English terms

| Tier | When | Form | Examples |
|---|---|---|---|
| A. Keep Latin | Proper names, acronyms, CLI commands, file names, things the learner sees on screen in English | Latin + hyphen + Kazakh ending; or Latin + Kazakh descriptor noun | Claude Code-ты, GitHub-қа, MCP сервері, `.env` файлы, pull request, deploy, frontend, backend |
| B. Cyrillic loan | Word is already a Kazakh headword (kk.wikipedia, Microsoft, Android, Firefox, media) | Cyrillic, endings attach directly without hyphen | агент, токен, модель, сервер, код, файл, терминал, браузер, промпт, репозиторий, коммит, интерфейс, домен, лицензия |
| C. Translate | A native or long-established Kazakh word exists and is used by at least one big localizer | Kazakh word, EN in parentheses on first mention | қолданба (app), тармақ (branch), біріктіру (merge), дерекқор (database), сілтеме (link), рұқсат (permission), құпиясөз (password), нұсқа (version), жөндеу (debug) |

Tie-breaker: if Microsoft, Android and Firefox disagree, prefer the form that is (1) not a Russian calque, (2) shortest, (3) used by Android (largest Kazakh-speaking user base on phones). E.g. settings: Android/Microsoft «Параметрлер» vs Firefox «Баптаулар» → use «Параметрлер»; both are acceptable.

First-mention rule (per page, not per site): «Тармақ (branch) — кодтың жеке көшірмесі…»; later just «тармақ» or «branch».

---

## 3. Attaching Kazakh endings to English words and acronyms

### 3.1 The rules (with sources)

1. Hyphen, always, between a Latin-script word/acronym and a Kazakh suffix. emle.kz rule 8 (VERIFIED, S6): «Шетелдік компания немесе шетелдік тауар (өзге тілдің әріптерімен жазылған) атауларынан кейін қосымша жалғанғанда дефис қойылады: Toshіba-ға, «Henkel»-ден». Rule 7: «Басқы әріп түрінде қысқарған сөзден кейін жалғанатын қосымшаның алдынан қойылады: ҚазҰУ-ға, БҰҰ-дан».
2. The suffix variant is decided by pronunciation, not spelling: stan.kz (VERIFIED, S7): «қосымша дефис (-) арқылы жалғанады», chosen by the last letter's sound — «АҚШ-тың» (the article adds «АҚШ-ның емес»), «ҚазҰУ-ға». So read the word aloud: Claude = [клод] → back vowel, ends in [д].
3. Microsoft's alternative (VERIFIED, S1 §4.1.2): «No ending is added to the acronyms» — use a descriptor word that carries the case: «Windows жүйесіне арналған», «Enter пернесін басыңыз», «2.3 нұсқасы». Use this whenever pronunciation is unclear or the hyphenated form looks ugly.
4. Cyrillic loans take endings directly, no hyphen: промптты, токендер, серверге, репозиторийде.
5. Digits: hyphen before a noun after an ordinal digit («5-сынып», «1-қадам»); Roman numerals no hyphen («ХХІ ғасыр») — emle.kz rule 3 (VERIFIED). Ranges use en dash with no spaces: «10–20-беттер» (S1 §4.1.8).
6. Kazakh does not use apostrophes for this (that is Turkish/Azerbaijani: «API'ye»). Do not write «API'ге».
7. Inline code and commands never take suffixes; wrap with a descriptor: «`npm install` пәрменін орында», «`CLAUDE.md` файлын аш».
8. Plural after numerals is not used: «3 коммит», «10 токен». Plural suffix only when no numeral: «коммиттер», «GitHub-тағы репозиторийлер».

### 3.2 Suffix chooser (Kazakh phonology in one table)

| Word ends in (as pronounced) | Genitive -ның/-нің | Dative -ға/-ге | Accusative -ны/-ні | Locative -да/-де | Ablative -дан/-ден | Instrumental -мен | Plural -лар/-лер |
|---|---|---|---|---|---|---|---|
| vowel а, о, е, і, ы, ә, ө, ү, ұ (repo, Figma) | -ның/-нің | -ға/-ге | -ны/-ні | -да/-де | -дан/-ден | -мен | -лар/-лер |
| и, у, й (API [апи], MCP [эм-си-пи], ChatGPT, deploy, OpenAI) | -дың/-дің | -ға/-ге | -ды/-ді | -да/-де | -дан/-ден | -мен | -лар/-лер |
| р, л (Docker, Vercel, URL, SQL) | -дың/-дің | -ға/-ге | -ды/-ді | -да/-де | -дан/-ден | -мен | -лар/-лер (р), -дар/-дер (л) |
| м, н, ң (LLM, Python, JSON, токен) | -ның/-нің | -ға/-ге | -ды/-ді | -да/-де | -нан/-нен | -мен | -дар/-дер |
| ж, з | -дың/-дің | -ға/-ге | -ды/-ді | -да/-де | -дан/-ден | -бен | -дар/-дер |
| voiceless к, қ, п, с, т, ш, ч, ф, х, ц and voiced б, в, г, д (git, GitHub, Claude, Code, commit, React, CSS, frontend) | -тың/-тің | -қа/-ке | -ты/-ті | -та/-те | -тан/-тен | -пен | -тар/-тер |

Front vs back (-е/-і vs -а/-ы) follows the vowel of the last pronounced syllable: [гит] front → git-те; [гитхаб] back → GitHub-та; [клод] back → Claude-та; [апи] front → API-ге; [эй-пи-ай] back → API-ға.

### 3.3 Ready-made paradigms for the words you will use most

| Word (read as) | «of …» | «to …» | «… (object)» | «in/at …» | «from …» | «with …» | Descriptor form (safe) |
|---|---|---|---|---|---|---|---|
| Claude Code [клод код] | Claude Code-тың | Claude Code-қа | Claude Code-ты | Claude Code-та | Claude Code-тан | Claude Code-пен | Claude Code құралы(н/на/нда) |
| Claude [клод] | Claude-тың | Claude-қа | Claude-ты | Claude-та (attested, S16) | Claude-тан | Claude-пен | Claude моделі |
| git [гит] | git-тің | git-ке | git-ті | git-те | git-тен | git-пен | git жүйесі |
| GitHub [гитхаб] | GitHub-тың | GitHub-қа | GitHub-ты | GitHub-та | GitHub-тан | GitHub-пен | GitHub платформасы |
| API [апи] (brief's choice) | API-дің | API-ге | API-ді | API-де | API-ден | API-мен | API интерфейсі, API кілті |
| API [эй-пи-ай] | API-дың | API-ға | API-ды | API-да | API-дан | API-мен | same |
| MCP [эм-си-пи] | MCP-дің | MCP-ге | MCP-ді | MCP-де | MCP-ден | MCP-мен | MCP сервері |
| LLM [эл-эл-эм] | LLM-нің | LLM-ге | LLM-ді (attested, S15) | LLM-де | LLM-нен | LLM-мен | LLM моделі |
| ChatGPT [чат-джи-пи-ти] | ChatGPT-дің (attested, S15) | ChatGPT-ге | ChatGPT-ді | ChatGPT-де | ChatGPT-ден | ChatGPT-мен | — |
| OpenAI [оупен-эй-ай] | OpenAI-дың (NOT attested — S16 writes «OpenAI тобында», i.e. the descriptor pattern) | OpenAI-ға | OpenAI-ды | OpenAI-да | OpenAI-дан | OpenAI-мен | OpenAI компаниясы |
| Docker [докер] | Docker-дің | Docker-ге | Docker-ді | Docker-де | Docker-ден | Docker-мен | Docker контейнері |
| deploy [деплой] | deploy-дың | deploy-ға | deploy-ды | deploy-да | deploy-дан | deploy-мен | «deploy жасау» (verb) |
| commit [коммит] | commit-тің | commit-ке | commit-ті | commit-те | commit-тен | commit-пен | «commit жасау» |
| repo [репо] | repo-ның | repo-ға | repo-ны | repo-да | repo-дан | repo-мен | репозиторий(ге/де) |
| frontend / backend [фронтенд/бэкенд] | frontend-тің | frontend-ке | frontend-ті | frontend-те | frontend-тен | frontend-пен | frontend бөлігі |
| промпт (Cyrillic) | промпттың | промптқа | промптты | промптта | промпттан | промптпен | — |
| токен | токеннің | токенге | токенді | токенде | токеннен | токенмен | — |
| агент | агенттің | агентке | агентті | агентте | агенттен | агентпен | — |
| ЖИ [жи] | ЖИ-дің | ЖИ-ге | ЖИ-ді | ЖИ-де | ЖИ-ден | ЖИ-мен | ЖИ-агент (attested, S16) |
| Vercel [версел] | Vercel-дің | Vercel-ге | Vercel-ді | Vercel-де | Vercel-ден | Vercel-мен | Vercel платформасы |
| Cursor [курсор] | Cursor-дың | Cursor-ға | Cursor-ды | Cursor-да | Cursor-дан | Cursor-мен | — |
| React [риакт] | React-тың | React-қа | React-ты | React-та | React-тан | React-пен | React кітапханасы |
| Next.js [некст-джей-эс] | Next.js-тің | Next.js-ке | Next.js-ті | Next.js-те | Next.js-тен | Next.js-пен | Next.js фреймворкі |
| Python [пайтон] | Python-ның | Python-ға | Python-ды | Python-да | Python-нан | Python-мен | Python тілі(нде) |
| JavaScript [джаваскрипт] | JavaScript-тің | JavaScript-ке | JavaScript-ті | JavaScript-те | JavaScript-тен | JavaScript-пен | JavaScript тілі |
| npm [эн-пи-эм] | npm-нің | npm-ге | npm-ді | npm-де | npm-нен | npm-мен | npm пакеті |
| URL [ю-ар-эл] (MS reading) | URL-дің | URL-ге | URL-ді | URL-де | URL-ден | URL-мен | URL мекенжайы |
| JSON [джейсон] | JSON-ның | JSON-ға | JSON-ды | JSON-да | JSON-нан | JSON-мен | JSON файлы |
| CSS [си-эс-эс] | CSS-тің | CSS-ке | CSS-ті | CSS-те | CSS-тен | CSS-пен | CSS стилі |
| PR [пи-ар] | PR-дың | PR-ға | PR-ды | PR-да | PR-дан | PR-мен | pull request |
| vibe coding [вайб кодиң] | vibe coding-тің | vibe coding-ке | vibe coding-ті | vibe coding-те | vibe coding-тен | vibe coding-пен | — |
| Figma [фигма] | Figma-ның | Figma-ға | Figma-ны | Figma-да | Figma-дан | Figma-мен | Figma-дан (attested pattern «Toshiba-ға», S6) |
| Gemini, production, CLI, IDE, README, localhost | ambiguous reading → always descriptor | | | | | | Gemini моделі, production ортасы, CLI құралы, IDE редакторы, README файлы, localhost мекенжайы |

Consistency rule for the site: pick ONE reading per word and put it in the i18n glossary. Recommended: API = [апи] (matches the brief's «API-ге» and how Kazakh/Russian-speaking devs actually say it).

### 3.4 Capitalization and punctuation that interact with this

- Kazakh capitalizes sparingly (S1 §4.1.3): weekday, month, language names lowercase; «веб-бет», «интернет-дүкен» lowercase inside compounds; only the first word of a UI label is capitalized («Барлығын таңдау»).
- Quotation marks in prose: «…» chevrons; straight "…" only inside UI strings (S1 §4.1.8). Period goes outside the chevrons.
- «Назар аударыңыз!» with exclamation, not a colon (S1). «Ескерту.» with a period introduces a note.
- Avoid slashes in prose; write «немесе»/«және» (S1). Slashes are fine in UI when space is tight.

---

## 4. Tone: сен or сіз?

Evidence collected:
- Every verified Kazakh product UI uses сіз: Microsoft (S1 samples «әрекетті қайталап көріңіз», «Жалғастырғыңыз келе ме?»), Android (S4 «Қайталап көріңіз»), Firefox (S5 «тілді таңдаңыз»), Samsung (S17 «сөйлесіңіз»), Scratch — a product for 8-year-olds — still сіз (S19: «Сіздің баптауларыңыз жаңартылды», one stray «Қайта жасап көр»).
- But Microsoft explicitly prescribes the informal form for text addressed to the AI: Copilot prompt localizations are all bare imperatives — «тізімде», «пішімде», «ұсын», «жаса», «келтір» (S1 §5.4, VERIFIED: «Use an informal tone of voice and form of address when translating Copilot predefined prompts»).
- Microsoft also warns that stacking imperatives «can make the customer feel like they're being talked down to» tells translators not to turn «you can» («істей аласыз») structures into imperatives, and prefers the imperative over «you must» («… қажет») phrasing (S1 §4.1.11, VERIFIED 22 Sep 2026; earlier wording here claimed the guide calls «қажет» rude — it does not).
- Kazakh school textbooks address pupils with bare imperatives (оқы, жаз, орында) — UNVERIFIED here, but universal practice.

Recommendation: сен, with three guardrails.

1. Learner-facing prose, tips, quiz feedback, onboarding: сен. «Промптты нақтырақ жаз», «Жарайсың!», «Тоқтаған жеріңнен жалғастыр». Reasons: (a) the audience is students and peers and the speaker is a peer builder, not a corporation; (b) the whole course is about talking to an AI in imperatives — Microsoft itself localizes AI prompts in сен-form, so the register the learner reads matches the register they will type; (c) strings are 20–30 % shorter (баста vs бастаңыз), which matters on phone-width cards; (d) it is a brand signal: none of the big Kazakh UIs do it, so it will read as deliberately friendly, like youth media.
2. Buttons, menus, labels: neutral infinitive/verbal noun (-у/-ю): «Бастау», «Сақтау», «Кодты көшіру». This is the Microsoft/Android convention («Command names should be translated as verbs… always in the infinitive», S1 §4.1.11) and it means the UI chrome never commits to сен or сіз.
3. Errors, legal, payment, data-consent text: no second person, or сіз. Microsoft's rule: «Using the active voice with 'you' in error messages can sound rude». Write «Жүктеу мүмкін болмады» not «Сен жүктей алмадың». Privacy policy stays formal (it will be read by adults and possibly institutions).

Fallback: if the live audience turns out to be mostly 30+ professionals or officials (e.g. a corporate or university-hosted run), flip the learner strings to сіз. Keep them in one i18n file so the switch is mechanical: -ыңыз/-іңіз on imperatives, -ың→-ыңыз on possessives, сен→сіз.

Live talk: address the room as «сіздер» in the opening, then move to inclusive «біз» («қазір бірге жасаймыз»); use сен only when talking to one volunteer on stage.

Prompts to Claude in Kazakh: сен-form imperatives, exactly like Microsoft's Copilot prompts: «Осы функцияға тест жаз», «Қатенің себебін түсіндір». (Kazakh output quality of current models is decent but English prompts still give the most reliable code; teach both.)

---

## 5. Numbers, dates, units (CLDR kk, VERIFIED S20; Microsoft S1)

| Item | Kazakh form | Note |
|---|---|---|
| Full date | 2026 ж. 21 қыркүйек, дүйсенбі | CLDR full: `y 'ж'. d MMMM, EEEE`. Year first, then day, month lowercase |
| Long date | 2026 ж. 21 қыркүйек | CLDR long. Also common in press: «21 қыркүйек 2026 ж.» and in official docs «2026 жылғы 21 қыркүйек» |
| Medium / short | 2026 ж. 21 қыр. / 21.09.26 | CLDR medium `y 'ж'. dd MMM`, short `dd.MM.yy`; use 4-digit year on the site: 21.09.2026 |
| Time | 19:00, 14:30:05 | 24-hour `HH:mm`; no AM/PM in Kazakh copy |
| Time range | 19:00–21:00 | en dash, no spaces (S1 §4.1.8) |
| Months | қаңтар, ақпан, наурыз, сәуір, мамыр, маусым, шілде, тамыз, қыркүйек, қазан, қараша, желтоқсан | lowercase; abbreviations қаң., ақп., нау., сәу., мам., мау., шіл., там., қыр., қаз., қар., жел. |
| Weekdays | дүйсенбі, сейсенбі, сәрсенбі, бейсенбі, жұма, сенбі, жексенбі | lowercase; abbr. дс, сс, ср, бс, жм, сб, жс |
| Decimal | 3,5 | comma |
| Thousands | 1 500; 1 000 000 | CLDR kk group separator is U+00A0 NO-BREAK SPACE (VERIFIED 22 Sep 2026 in numbers.json `symbols-numberSystem-latn.group` and in Node 24.12 `Intl.NumberFormat('kk-KZ').format(1500)` → `1 500`), so it never wraps; type `&nbsp;` in hand-written HTML |
| Percent | 80% | CLDR `#,##0%`, no space (VERIFIED). With suffix: «80%-ы» — pattern attested in Kazakh press: «хабарламалардың 40%-ын» (S16); or spell «80 пайызы» |
| Currency | 5 000 ₸ or 5 000 теңге | CLDR `#,##0.00 ¤`: amount, U+00A0, symbol (VERIFIED). `Intl` with `style:'currency'` prints «5 000,00 ₸» by default — pass `maximumFractionDigits: 0` for «5 000 ₸» |
| Compact | 30 мың, 148 млрд токен | CLDR short: «0 мың», «0 млн», «0 млрд» |
| Ordinal with digit | 1-қадам, 3-модуль, 25-тарау, 5-сынып | hyphen; emle.kz rule 3, S1 §4.1.3 |
| Suffix on a number | 5-ке, 10-ға, 3-ке, 2-ге, 100-ге, 2026-да, 19:00-де | chosen by the spoken numeral (бес→-ке, он→-ға, екі→-ге) |
| Version | 2.3 нұсқасы | S1 §5.2: «Version 2.3 → 2.3 нұсқасы» |
| Duration | 2 сағ 30 мин, 45 сек | abbreviations without period: сағ, мин, сек (S1 §4.1.1) |
| File size | 250 МБ, 4 ГБ, 12 КБ | S1: КБ, МБ (Cyrillic) |
| Steps «2 of 8» | Қадам: 2/8, or 8 қадамның 2-сі | Microsoft pattern: restructure with a colon so the placeholder needs no case («Анықталған қалталар: %1», S1 §5.6.2) |
| Plural after numeral | 5 сабақ, 3 коммит, 148 миллиард токен | never «5 сабақтар» |

Implementation tip: `new Intl.DateTimeFormat('kk-KZ',{dateStyle:'long'}).format(d)` and `new Intl.NumberFormat('kk-KZ')` reproduce the CLDR forms above, so hand-written copy and generated values will match. VERIFIED on Node 24.12.0 (22 Sep 2026) for 21 Sep 2026 19:00 — dateStyle long → «2026 ж. 21 қыркүйек», full → «2026 ж. 21 қыркүйек, дүйсенбі», medium → «2026 ж. 21 қыр.», short → «21.09.26», timeStyle short → «19:00»; `format(1500)` → «1 500» (U+00A0), `format(3.5)` → «3,5», `{style:'percent'}` 0.8 → «80%», `{notation:'compact'}` 30000 → «30 мың», 148e9 → «148 млрд», `{style:'currency',currency:'KZT'}` 5000 → «5 000,00 ₸» (add `maximumFractionDigits: 0` for «5 000 ₸»). Browser ICU builds can lag Node; spot-check in the target browsers.

---

## 6. UI microcopy

Form: buttons and menu items = infinitive; hints/feedback = сен; errors = neutral.

### 6.1 Buttons and actions

| EN | KK | Source / note |
|---|---|---|
| Start / Get started | Бастау / Оқуды бастау | infinitive convention S1 |
| Continue | Жалғастыру | S1 «Жалғастырғыңыз келе ме?» |
| Next / Back / Previous | Келесі / Артқа / Алдыңғы | S4 «Келесі», «Артқа» |
| Skip | Өткізіп жіберу | |
| Save / Cancel / Close / Done / OK | Сақтау / Бас тарту / Жабу / Дайын / Жарайды | S1, S4, S5 (all three agree) |
| Copy / Copied / Copy code / Copy prompt | Көшіру / Көшірілді / Кодты көшіру / Промптты көшіру | S1 «Көшіру» |
| Paste / Cut / Select all / Find / Replace | Қою / Қиып алу / Барлығын таңдау / Табу / Ауыстыру | S1 §5.6.6 standard menu |
| Undo / Redo | Болдырмау / Қайталау | S1 |
| Run / Try it | Іске қосу / Байқап көру | S1 «қайта іске қосу» |
| Show / Hide / Show more / Collapse | Көрсету / Жасыру / Көбірек көрсету / Жию | |
| Show answer / Show hint | Жауапты көрсету / Кеңесті көрсету | |
| Download / Upload / Share | Жүктеп алу / Жүктеп салу / Бөлісу | S5 preferences.ftl «Жүктеп алу» (VERIFIED; the string is NOT in the two AOSP files nor in S1 — S4 citation removed 22 Sep 2026); S19 «Бөлісу»; «жүктеп салу» UNVERIFIED |
| Open in new tab | Жаңа қойындыда ашу | «қойынды» S1 |
| Sign in / Sign up / Sign out | Кіру / Тіркелу / Шығу | S5, S17, S18, S19 |
| Register for the masterclass | Шеберлік сабағына тіркелу | |
| Submit / Send / Check / Retry / Reset | Жіберу / Жіберу / Тексеру / Қайталап көру / Тазалау | S4 «Жіберу» |
| Search / Filter | Іздеу / Сүзгі | S5 «Іздеу», «Сүзгіле» |
| Learn more | Толығырақ | S17 «Толығырақ ақпарат», S5 «Көбірек білу», S4 «Толық ақпарат» |
| Got it / Not now | Түсіндім / Қазір емес | S5 |
| Language: EN / KK toggle | English / Қазақша | write language names in themselves |
| Dark / light theme | Қараңғы режим / Жарық режим | «тақырып» would collide with «topic» |
| Mark as complete | Аяқталды деп белгілеу | S1 pattern «Оқылмаған деп белгілеу» |
| Print / Export PDF | Басып шығару / PDF ретінде сақтау | S1 «Басып шығару»; S5 «HAR ретінде сақтау» pattern |

### 6.2 Navigation and structure

| EN | KK |
|---|---|
| Home | Басты бет (S18) |
| Program / Agenda | Бағдарлама (note: also «software»; context disambiguates) |
| Modules / Lessons / Steps | Модульдер / Сабақтар / Қадамдар |
| Glossary | Глоссарий (alt: Терминдер сөздігі) |
| Resources / Links | Ресурстар / Пайдалы сілтемелер |
| Tools | Құралдар |
| Practice / Build together | Практика / Бірге жасаймыз |
| Q&A | Сұрақ-жауап |
| About / Speaker / Contact | Жоба туралы / Спикер / Байланыс |
| FAQ | Жиі қойылатын сұрақтар |
| Table of contents / On this page | Мазмұны / Осы бетте |
| Previous lesson / Next lesson | Алдыңғы сабақ / Келесі сабақ |
| Back to top | Жоғарыға |
| Menu / Close menu | Мәзір / Мәзірді жабу (S1 «мәзір») |
| Skip to content | Мазмұнға өту |
| Cheat sheet | Жадынама (not «шпаргалка», which is Russian) |
| Recording / Slides / Live | Жазба / Слайдтар / Тікелей эфир |
| Community / Events | Қауымдастық / Іс-шаралар (S18) |

### 6.3 Progress and status

| EN | KK |
|---|---|
| Step 2 of 8 | Қадам: 2/8 |
| Progress | Үлгерім |
| Completed / In progress / Not started | Аяқталды / Орындалуда / Басталмаған |
| 40 % complete | 40% аяқталды |
| Lessons completed: 3/8 | Аяқталған сабақтар: 3/8 |
| Reading time: 5 min | Оқу уақыты: 5 мин |
| Continue where you left off | Тоқтаған жеріңнен жалғастыр (S1: «тоқтаған жерден жалғастырамыз») |
| Loading… / Saving… / Saved / Checking… | Жүктелуде… / Сақталуда… / Сақталды / Тексерілуде… (S4, S19 «Жүктелуде») |
| Connected / Disconnected | Қосылды / Ажыратылды (S4) |
| Coming soon | Жақында |
| New / Updated | Жаңа / Жаңартылды |
| Beginner / Intermediate / Advanced | Бастаушы / Орта деңгей / Жоғары деңгей |

### 6.4 Quiz feedback (сен)

| EN | KK |
|---|---|
| Correct! | Дұрыс! / Жарайсың! / Дәл таптың! |
| Not quite. Try again. | Дұрыс емес. Тағы байқап көр. |
| Almost | Жақын келдің |
| Hint | Кеңес (tip) / Ишара (hint) |
| Explanation | Түсіндірме |
| Select one answer | Бір жауапты таңда |
| Select all that apply | Сәйкес келетіннің бәрін таңда |
| Check answer | Жауапты тексеру |
| Next question | Келесі сұрақ |
| You got 7 of 10 | 10 сұрақтың 7-еуіне дұрыс жауап бердің |
| Score | Нәтиже: 7/10 |
| Quiz complete | Тест аяқталды |
| Retake quiz | Тестті қайта тапсыру |
| Well done, one step left | Жақсы! Бір қадам қалды |
| Keep going | Алға! |

### 6.5 Errors and empty states (neutral, no blame, no «!»)

| EN | KK | Pattern source |
|---|---|---|
| Something went wrong | Бірдеңе дұрыс болмады. Қайталап көр. | S1 «Қате пайда болған сияқты…» |
| Page not found (404) | Бет табылмады. Сілтеме ескірген немесе мекенжай қате жазылған болуы мүмкін. → «Басты бетке оралу» | |
| No internet connection | Интернет байланысы жоқ. Байланысты тексеріп, қайталап көр. | S4 «Желі қателігі» |
| Failed to load | Жүктеу мүмкін болмады. | S1 «… мүмкін болмады» |
| Failed to copy | Көшіру мүмкін болмады. | S1 |
| Not available right now | Қазір қолжетімсіз. | S1 «қолжетімсіз» |
| Invalid email | Электрондық пошта мекенжайы дұрыс емес. | S1 «Құпиясөз дұрыс емес» |
| Required field | Бұл өріс міндетті. | |
| Session expired | Сеанс уақыты бітті. Қайта кір. | |
| Too many requests | Сұрау тым көп. Сәл күте тұр. | S1 «Күте тұрыңыз» pattern |
| Are you sure you want to reset progress? | Үлгерімді өшіруге сенімдісің бе? | S1 «… жоюға сенімдісіз бе?» |
| Nothing here yet | Әзірге ештеңе жоқ | |
| No results | Нәтижелер табылмады | S5 |
| No results for «{q}» | «{q}» бойынша ештеңе табылмады | |
| Unsupported browser | Бұл браузерге қолдау көрсетілмейді. | S19 pattern |
| Warning / Note | Назар аударыңыз! / Ескерту. | S1 |

---

## 7. Russian calques and slang to avoid

| Avoid (Russian or calque) | Use | Why / source |
|---|---|---|
| қосымша (for app), приложение | қолданба | Microsoft 2004/06 list S3, Android S4, Firefox S5 all use қолданба; «қосымша» = add-on/appendix (Firefox uses it for add-ons) |
| скачать ету, качать | жүктеп алу | S5 (Firefox preferences.ftl); not found in the AOSP files fetched |
| загрузить ету | жүктеп салу (upload) / жүктеу | |
| настройка(лар) | параметрлер (S1, S4) / баптаулар (S5) | |
| пароль | құпиясөз | S1 «Құпиясөз», S4 «Құпия сөз»; Firefox keeps «пароль» — acceptable but not native |
| ссылка | сілтеме | S4 core strings («Сілтемені көшіру»), S5; the S3 (2004/06) list has no ссылка row — citation corrected |
| кнопка | түйме (батырма) | S1 «түймесіне», S3 «түймешік», S21 «батырма» |
| папка | қалта | S1 «қалтаға» |
| пользователь, юзер | пайдаланушы (қолданушы) | S1, S4, S5, S13 |
| разработчик | әзірлеуші | S4 «Әзірлеуші опциялары», S10 |
| ошибка | қате | everywhere |
| обновить ету | жаңарту | S1, S4 |
| версия | нұсқа | S1 «2.3 нұсқасы», S13; avoid the 2004 coinage «нобай» |
| по умолчанию | әдепкі | S1 «Әдепкі мән», S4 |
| учётная запись, есептік жазба | аккаунт (S4, S18) or тіркелгі (S1) | «есептік жазба» is a word-for-word calque |
| личный кабинет, жеке кабинет | профиль / Менің бетім | S5 «Профильдерді басқару», S17 «Менің парақшам» |
| шпаргалка | жадынама | Russian word |
| образ (Docker image) | image | Russian |
| сборка (build) | build / құрастыру | |
| деплой, задеплоить | deploy жасау / жариялау | Cyrillic form is Russian slang |
| закоммитить, запушить, пофиксить, дебажить | commit жасау, push жасау, түзету, жөндеу | Russian verb morphology |
| фича, функционал | мүмкіндік / функция | S1 «функцияларын» |
| бэкенд, фронтэнд | backend, frontend (Latin) | «э» spelling is Russian |
| нейросеть | нейрожелі (S16) / нейрондық желі (S9) | |
| ИИ, ИИ-агент | ЖИ, ЖИ-агент | S16 |
| облако | бұлт (бұлттық сервер, S14) | |
| запрос | сұрау (S1) / сұраным (S5) | «сұраныс» also means economic demand — use with care |
| команда (command) | пәрмен (S1 «пәрмен жолы» UNVERIFIED for that exact phrase; S3 approved) | «команда» = team in Kazakh |
| ветка | тармақ / бұтақ (S10) | |
| слияние | біріктіру (S10) | |
| хранилище | қойма | |
| исходный код | бастапқы код (S5, S13, S14) | |
| база данных, мәліметтер базасы | дерекқор (S11) | «мәліметтер базасы» is a calque |
| данные, мәлімет (for data) | деректер | law/press standard; «дербес деректер» = personal data |
| уязвимость | осалдық (S12) | |
| утечка | деректердің сыртқа шығуы (ағып кетуі, S12) | |
| буфер обмена | аралық сақтағыш (S1) | |
| вкладка | қойынды (S1) | Firefox «бет» is ambiguous |
| закладка | бетбелгі (S5) | |
| расширение | кеңейту (S5) / кеңейтім | |
| уведомление | хабарландыру (S4) | «хабарлама» = message |
| скриншот | скриншот (S4, S5) — acceptable; native alt «экран суреті» | |
| ғаламтор (purist for internet) | интернет | opinion piece hosted on termincom.kz by Қайнар Олжай (editor-in-chief of «Қазақстан» TV, 8 Nov 2019) rejects «ғаламтор»: «„Интернет“ сөзін „ғаламтор“ дегенді … қолдамаймыз» (https://www.termincom.kz/articles/?id=111 VERIFIED 22 Sep 2026 — an author's view, not an official termincom ruling); S1 «интернет» |
| веб-торап, егелік, ауани (2004 list) | сайт, домен, виртуалды | dead coinages |
| сыбыр сөз (kk.wikipedia for prompt) | промпт | S9 has it, nobody else uses it |
| -циялау verbs when native exists (идентификациялау, конфигурациялау) | анықтау, баптау | S1 «Words to avoid» table (VERIFIED) |
| өтінеміз (please) | drop it: «Күте тұрыңыз» | S1: literal «өтінеміз» «isn't appropriate. Don't use it» |
| Fillers: короче, вообще, типа, давай, ладно, ну | drop or use «яғни», «жарайды», «кеттік» | spoken Russian |
| Russian conjunction habits: «сол себепті», «дегенмен», «алайда» stacks | себебі, бірақ | S1 §4.1.4 |
| Overly formal: қазіргі таңда, ағымдағы уақытта | қазір | S1 §2.1.2 |

Lint idea for the build: flag any Cyrillic token containing «ё», «ъ», «ь» at word end after a consonant cluster, or ending in «-ить/-ать/-ция» without Kazakh suffix, and a small stoplist (скачать, настройки, ссылка, кнопка, папка, пользователь, ошибка, файлы→OK, да/нет, привет, спасибо…). Kazakh legitimately uses ё, ц, ч, щ, ъ, ь, э, ю, я only inside loanwords, so a stoplist beats a character rule.

---

## 8. Glossary (grouped along the course path)

Columns: EN → KK recommended | Keep EN? (KEEP-L = Latin as-is; KEEP-C = Cyrillic loan; TR = translate; BOTH = KK + EN on first mention) | Alt | Avoid | Source.

### 8.1 Setup: computer, terminal, files, editor (36)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| software | бағдарламалық жасақтама; in prose just «бағдарлама» | TR | бағдарламалық қамтылым (law, UNVERIFIED) | бағдарламалық қамтамасыз ету (calque of ПО) | S3, S13 |
| application, app | қолданба | TR | — | қосымша, приложение | S3, S4, S5 |
| mobile app | мобильді қолданба | TR | | | own |
| operating system | операциялық жүйе (ОЖ) | TR | | | S1, S13 |
| computer | компьютер | KEEP-C | | ДК | S1 |
| device | құрылғы | TR | | | S1 |
| terminal | терминал | KEEP-C | | | own |
| command line | пәрмен жолы | TR | командалық жол | | S1/S3 «пәрмен» |
| command | пәрмен | TR | команда (S10) | | S3 |
| CLI | CLI (CLI құралы) | KEEP-L | | | own |
| shell | shell | KEEP-L | | | own |
| run, launch | іске қосу | TR | | запустить ету | S1 |
| restart | қайта іске қосу | TR | қайта қосу (S5) | | S1 |
| stop | тоқтату | TR | | | own |
| install / uninstall | орнату / жою | TR | алып тастау | | S1, S4 |
| update / upgrade | жаңарту / жаңа нұсқаға көшу | TR | | | S1, S4 |
| download / upload | жүктеп алу / жүктеп салу | TR | | скачать | S5 (not in the AOSP files fetched) |
| file / folder / directory | файл / қалта / каталог | KEEP-C/TR | | папка | S1 |
| path | жол (файл жолы) | TR | | | own |
| extension (file) | кеңейтім | TR | кеңейме (S3) | | S3 |
| code editor / IDE | код редакторы / IDE | TR / KEEP-L | | | own |
| settings | параметрлер | TR | баптаулар (S5) | настройки, теңшелім (2004) | S1, S4 |
| default | әдепкі | TR | | | S1, S4 |
| keyboard / key / shortcut | пернетақта / перне / пернелер тіркесімі | TR | | | S1 |
| clipboard | аралық сақтағыш | TR | алмасу буфері | буфер обмена | S1 |
| screenshot | скриншот | KEEP-C | экран суреті | | S4, S5 |
| window / tab / panel | терезе / қойынды / панель | TR | | вкладка | S1 |
| menu / icon / button | мәзір / белгіше / түйме | TR | түймешік, батырма | кнопка | S1, S3 |
| memory (RAM) / storage | жад / сақтау орны | TR | жинақтауыш (S5) | | S1, S4 |
| performance | өнімділік | TR | | | S5 |
| version | нұсқа | TR | | нобай | S1, S13 |
| release | шығарылым (релиз) | TR | | | own |
| log | журнал (лог) | TR | | | S4, S5 |
| account | аккаунт | KEEP-C | тіркелгі (S1) | есептік жазба | S4, S18 |
| sign in / sign up / sign out | кіру / тіркелу / шығу | TR | жүйеге кіру (S17) | | S5, S17 |
| username / password / email | пайдаланушы аты / құпиясөз / электрондық пошта | TR | құпия сөз (S4, two words), пароль (S5) | | S1 «Құпиясөз», S4, S5 (the S3 list has no пароль row — citation corrected) |

### 8.2 Programming basics (30)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| code / source code | код / бастапқы код | KEEP-C / TR | қайнар код (S10) | исходник | S5, S13 |
| programming / programmer | бағдарламалау / бағдарламашы | TR | | | S3, S13 |
| developer | әзірлеуші | TR | жасаушы | разработчик | S4, S10 |
| programming language | бағдарламалау тілі | TR | | | S13 |
| syntax / syntax error | синтаксис / синтаксис қатесі | KEEP-C | | | S13 |
| variable / constant | айнымалы / тұрақты | TR | | | S5, S19 |
| function / method | функция / әдіс | KEEP-C / TR | метод | | S5 |
| class / object | класс / объект | KEEP-C | нысан | | own |
| type (data type) | дерек типі | TR | | | own |
| string / number / boolean | жол / сан / логикалық мән | TR | string | | own |
| array / list | массив / тізім | KEEP-C / TR | | | S19 |
| loop / condition | цикл / шарт | KEEP-C / TR | | | S5 |
| exception | ерекше жағдай | TR | ережеден тыс жағдай (S5) | | S5 |
| bug / error | қате (bug) / қате | TR | ақау | баг | S4 |
| debug / debugger | жөндеу / жөндеуші | TR | түзету (S4 «USB арқылы түзету») | дебажить | S5 |
| breakpoint | үзу нүктесі | TR | | | S5 |
| stack trace / call stack | стек ізі / шақырулар стегі | TR | стек қадағалауы (S5) | | S5 |
| console / output / input | консоль / шығыс (нәтиже) / енгізу | KEEP-C / TR | | | S5 |
| test / testing / unit test | тест / тестілеу / модульдік тест | KEEP-C | сынақ | | own |
| refactoring | рефакторинг (кодты қайта құру) | KEEP-C | | | own |
| library / framework | кітапхана / фреймворк | TR / KEEP-C | | фреймуорк | S13, S21 |
| package / package manager | пакет / пакет менеджері | KEEP-C | | десте (2004) | own |
| dependency | тәуелділік | TR | | | own |
| module / import / export | модуль / импорттау / экспорттау | KEEP-C | | | S1, S5 |
| comment (in code) | түсініктеме | TR | | комментарий | own |
| documentation | құжаттама | TR | | | own |
| script | скрипт | KEEP-C | сценарий (S5) | | S5 |
| compile / compiler | компиляциялау / компилятор | KEEP-C | | | S13 |
| algorithm | алгоритм | KEEP-C | | | S13 |
| template | үлгі | TR | | шаблон | S1 (UNVERIFIED exact) |

### 8.3 Git and collaboration (24)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| git | git (git жүйесі) | KEEP-L | | | — |
| version control | нұсқаларды басқару | TR | | контроль версий | S10 |
| repository, repo | репозиторий (repo) | KEEP-C | код қоймасы | | S10 |
| clone | клондау (көшірмесін алу) | TR | | | own |
| commit | commit (коммит) | KEEP-L/C | | закоммитить | S10 |
| commit message | commit хабары | BOTH | | | own |
| branch / main branch | тармақ (branch) / негізгі тармақ | BOTH | бұтақ (S10) | ветка | S10 |
| merge / merge conflict | біріктіру (merge) / біріктіру қайшылығы | BOTH | | слияние | S10 |
| pull request (PR) | pull request (PR) | KEEP-L | | | own |
| push / pull / fetch | push / pull / fetch («push жасау») | KEEP-L | | запушить | own |
| fork | fork | KEEP-L | | | own |
| diff / changes | diff (айырма) / өзгерістер | BOTH / TR | | | S10 |
| history | тарих | TR | | | S5 |
| revert / rollback | қайтару / кері қайтару | TR | | | own |
| stash | stash | KEEP-L | | | own |
| tag | тег | KEEP-C | | | own |
| remote | қашықтағы репозиторий (remote) | BOTH | | | own |
| .gitignore / README / CLAUDE.md | file names as-is + «файлы» | KEEP-L | | | S1 rule |
| GitHub / issue | GitHub / issue (мәселе) | KEEP-L | | | own |
| open source | ашық бастапқы код | TR | | | S14 |
| license | лицензия | KEEP-C | | | S10 |
| contributor / maintainer | үлес қосушы / жетекші әзірлеуші | TR | | | own |
| code review | кодты тексеру (code review) | BOTH | код шолуы | | own |
| collaboration | бірлесіп жұмыс істеу | TR | | | own |

### 8.4 AI, LLM, agents, Claude Code (52)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| vibe coding | vibe coding | KEEP-L | | вайб-кодинг (Russian spelling) | own |
| artificial intelligence, AI | жасанды интеллект, ЖИ | TR | AI | ИИ | S13, S16 |
| AI agent / agent | ЖИ-агент / агент | TR / KEEP-C | | ИИ-агент | S16 |
| agentic coding | агенттік кодтау | TR | | | own |
| AI assistant / copilot | ЖИ-көмекші | TR | ассистент | | own |
| LLM, large language model | LLM, үлкен тілдік модель (ҮТМ) | BOTH | | | S9, S14 |
| model | модель | KEEP-C | | | S9 |
| neural network | нейрондық желі | TR | нейрожелі (S16) | нейросеть | S9 |
| machine learning | машиналық оқыту | TR | | | UNVERIFIED (standard usage) |
| deep learning | терең оқыту | TR | | | UNVERIFIED |
| training / pre-training | оқыту / алдын ала оқыту | TR | | | S9, S14 |
| fine-tuning | қосымша оқыту | TR | бейімдеу (S14) | | S9 |
| dataset | деректер жиынтығы | TR | деректер жинағы | датасет | S14 |
| parameters / weights | параметрлер / салмақтар | TR | салмақ коэффициенті | | S9 |
| token / tokenizer | токен / токенизатор | KEEP-C | | | S9, S15 |
| context / context window | контекст / контекст терезесі | KEEP-C / TR | | | own |
| prompt | промпт | KEEP-C | нұсқау, сұраныс | сыбыр сөз | S16-era media; S9 has coinage |
| system prompt | жүйелік промпт | TR | | | own |
| prompt engineering | промпт жазу шеберлігі | TR | промпт-инженерия | | own |
| instruction | нұсқау | TR | | | own |
| generate / generative AI | генерациялау (жасау) / генеративті ЖИ | KEEP-C | | | S14 |
| hallucination | галлюцинация (ойдан шығарылған факт) | KEEP-C | | | own |
| reasoning / thinking | пайымдау / ойлану | TR | | | own |
| extended thinking | кеңейтілген ойлану режимі | TR | | | own |
| inference | инференс (жауап шығару) | KEEP-C | | | own |
| embedding | эмбеддинг | KEEP-C | | | S9 |
| vector database | векторлық дерекқор | TR | | | own |
| RAG | RAG | KEEP-L | | | own |
| NLP | табиғи тілді өңдеу | TR | | | S9 |
| chatbot | чат-бот | KEEP-C | | | own |
| multimodal | мультимодальды | KEEP-C | | | S9 |
| benchmark / evaluation | бенчмарк / бағалау | KEEP-C / TR | | | S14 |
| open-weight model | ашық салмақты модель | TR | | | own |
| API key | API кілті | BOTH | | | own |
| rate limit | сұрау шегі | TR | | | own |
| tool / tool use / tool call | құрал / құрал қолдану / құрал шақыру | TR | | | own |
| MCP / MCP server | MCP / MCP сервері | KEEP-L | | | own |
| skill (Claude Skills) | skill (дағды) | BOTH | | | own |
| hook | hook | KEEP-L | | | own |
| subagent | субагент (қосалқы агент) | KEEP-C | | | own |
| memory (agent) | жад | TR | | | S1 |
| session | сеанс | TR | сессия | | own |
| plan mode | жоспарлау режимі | TR | | | own |
| permission / permission mode | рұқсат / рұқсат режимі | TR | | | S4 |
| slash command | «/» пәрмені (slash command) | BOTH | | слэш-команда | own |
| autocomplete | автотолтыру | TR | | | S5 pattern «автоматты түрде толтыру» |
| human in the loop | адам бақылауы | TR | | | own |
| guardrails | қорғаныс шектері | TR | | | own |
| iteration / iterate | итерация / қайталап жетілдіру | KEEP-C / TR | | | own |
| output / result | нәтиже | TR | | | own |
| Claude / Claude Code / Anthropic | as-is | KEEP-L | | | S16 |
| Cursor, Lovable, Replit, v0, Vercel | as-is | KEEP-L | | | S22 |

### 8.5 Web: frontend, backend, data (44)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| frontend / backend / full-stack | frontend / backend / full-stack | KEEP-L | клиенттік бөлік / серверлік бөлік | фронтенд, бэкенд | S21 |
| website / web page | сайт / веб-бет | KEEP-C / TR | веб-сайт | веб-торап | S1, S5 |
| home page / landing page | басты бет / лендинг | TR / KEEP-C | үй парағы (S5) | | S18 |
| browser | браузер | KEEP-C | | | S4, S5 |
| link / URL / address | сілтеме / URL / мекенжай | TR / KEEP-L | | ссылка, адрес | S4, S5 (not in S3 — citation corrected) |
| address bar | мекенжай жолағы | TR | адрестік жолақ (S5) | | S5 |
| bookmark | бетбелгі | TR | | | S5 |
| domain / hosting | домен / хостинг | KEEP-C | | егелік | S1, S5 |
| server / client | сервер / клиент | KEEP-C | | | S1, S11 |
| request / response | сұрау / жауап | TR | сұраным (S5) | запрос | S1, S5 |
| headers | тақырыптамалар | TR | | | S5 |
| HTTP / HTTPS | as-is | KEEP-L | | | — |
| API | API (API интерфейсі) | KEEP-L | қолданбалы бағдарламалау интерфейсі | | own |
| endpoint | endpoint | KEEP-L | | | own |
| JSON | JSON | KEEP-L | | | — |
| database | дерекқор | TR | деректер базасы | мәліметтер базасы | S11 |
| table / row / column | кесте / жол / баған | TR | бағана (S11) | | S11 |
| query | сұрау | TR | сұрату (S11) | | S11 |
| key / index | кілт / индекс | TR / KEEP-C | | | S11 |
| SQL | SQL | KEEP-L | | | S11 |
| schema / migration | схема / миграция | KEEP-C | | | own |
| HTML / CSS / JavaScript | as-is | KEEP-L | | | — |
| tag / element / attribute | тег / элемент / атрибут | KEEP-C | төлсипат (S3) | | S3 |
| component | компонент | KEEP-C | құрамдас (S3) | | S3 |
| button / form / field / input | түйме / форма / өріс / енгізу өрісі | TR | пішін | | S1 |
| style / stylesheet | стиль / стильдер файлы | KEEP-C | | | S5 |
| layout | макет (орналасу) | KEEP-C | | | own |
| responsive design | адаптивті дизайн | TR | | | S5 |
| font / bold / italic | қаріп / қалың / қиғаш | TR | | | S1 |
| color / background / image | түс / фон / сурет | TR | | | S1 |
| dark mode | қараңғы режим | TR | | | own |
| animation | анимация | KEEP-C | | қимылдану (2004) | S3 |
| design / UI / UX | дизайн / пайдаланушы интерфейсі / пайдаланушы тәжірибесі | KEEP-C / TR | | | own |
| accessibility | қолжетімділік | TR | қолжетерлілік (S5) | | S5 |
| user | пайдаланушы | TR | қолданушы (S21) | | S1, S4 |
| notification / message | хабарландыру / хабарлама | TR | | | S4, S5 |
| cookie | cookie файлы | KEEP-L | | | S5, S17 |
| cache | кэш | KEEP-C | | | S5 |
| session (web) | сеанс | TR | | | own |
| localhost / port | localhost / порт | KEEP-L / KEEP-C | | | own |
| static site | статикалық сайт | TR | | | own |
| SEO | SEO | KEEP-L | | | own |
| search / filter | іздеу / сүзгі | TR | | | S5 |
| share | бөлісу | TR | | | S19 |

### 8.6 Deploy and infrastructure (28)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| deploy / deployment | deploy («deploy жасау», жариялау) | KEEP-L | орналастыру | деплой | own |
| hosting | хостинг | KEEP-C | | | own |
| cloud | бұлт (бұлттық) | TR | | облако | S14 |
| serverless | серверсіз | TR | | | own |
| Docker / container | Docker / контейнер | KEEP-L / KEEP-C | | | own |
| image (Docker) | image | KEEP-L | | образ | own |
| virtual machine | виртуалды машина | TR | | ауани (2004) | own |
| CI/CD / pipeline | CI/CD / pipeline (конвейер) | KEEP-L | | | own |
| build | build (құрастыру) | KEEP-L | | сборка | own |
| environment | орта | TR | | | own |
| development / staging / production | әзірлеу ортасы / сынақ ортасы / жұмыс ортасы (production) | BOTH | | прод | own |
| environment variable / .env | орта айнымалысы / .env файлы | TR / KEEP-L | | | own |
| domain / DNS / CDN / SSL | домен / DNS / CDN / SSL | KEEP | | | S5 |
| certificate | сертификат | KEEP-C | | | S5 |
| logs / monitoring | журналдар / мониторинг (бақылау) | TR | | | S4, S5 |
| uptime / downtime | жұмыс уақыты / тоқтап қалу | TR | | | own |
| scaling | масштабтау | KEEP-C | | | own |
| rollback | кері қайтару | TR | | | own |
| release / version number | релиз / нұсқа нөмірі | KEEP-C / TR | | | S1 |
| webhook / cron job | webhook / cron тапсырмасы | KEEP-L | | | own |
| load / payload | жүктеме / пайдалы жүктеме | TR | | | S5 |
| latency | кідіріс | TR | | | own |
| bandwidth | өткізу қабілеті | TR | | | own |
| status / status page | күй / күй беті | TR | қалып-күй (S5) | | S5 |
| connection / connected | байланыс / қосылды | TR | | | S5, S4 |
| blocked | бұғатталған | TR | | | S5 |
| error page (404/500) | қате беті | TR | | | own |
| Vercel / Netlify / Supabase | as-is | KEEP-L | | | S22 |

### 8.7 Security and privacy (30)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| security / cybersecurity | қауіпсіздік / киберқауіпсіздік | TR | | | S5, S12 |
| privacy / privacy policy | құпиялылық / құпиялылық саясаты | TR | жекелік (S5) | | S17 |
| personal data | дербес деректер | TR | | персоналды деректер | UNVERIFIED (law term) |
| confidentiality / integrity / availability | құпиялылық / тұтастық / қолжетімділік | TR | конфиденциалдық (S12) | | S12 |
| encryption | шифрлау | TR | | | own |
| authentication | аутентификация (кіруді растау) | KEEP-C | | | S12 |
| authorization | авторизация (рұқсат беру) | KEEP-C | | | S12 |
| two-factor authentication | екі факторлы аутентификация | TR | | | own |
| password manager | құпиясөз менеджері | TR | | | own |
| secret / API key / token (auth) | құпия дерек (secret) / API кілті / токен | BOTH | | | own |
| leak | сыртқа шығу | TR | ағып кету (S12) | утечка | S12 |
| vulnerability | осалдық | TR | осалдылық (S12) | | S12 |
| threat / risk | қауіп / тәуекел | TR | қатер (S12) | | S12 |
| attack / attacker | шабуыл / шабуылдаушы | TR | | | S1 |
| hacker | хакер | KEEP-C | | | own |
| malware | зиянды бағдарлама | TR | | вирус (only for viruses) | own |
| phishing | фишинг | KEEP-C | | | own |
| prompt injection | промпт-инъекция | KEEP-C | зиянды нұсқау ендіру | | own |
| SQL injection / XSS | SQL-инъекция / XSS | KEEP | | | own |
| input validation | енгізілген деректерді тексеру | TR | | | own |
| sandbox | sandbox (оқшауланған орта) | BOTH | | | own |
| permission / access | рұқсат / қол жеткізу | TR | қатынау (S1, S12) | доступ | S4, S12 |
| allow / block | рұқсат беру / бұғаттау | TR | блоктау (S5) | | S5 |
| least privilege | ең аз рұқсат қағидаты | TR | | | own |
| backup | сақтық көшірме | TR | | резервная копия | UNVERIFIED (MS usage) |
| firewall | файрвол (желіаралық қалқан) | KEEP-C | | брандмауэр | own |
| consent | келісім | TR | | | own |
| audit | аудит | KEEP-C | тексеріс | | own |
| secure connection | қауіпсіз байланыс | TR | | | S5 |
| trust | сенім | TR | | | own |

### 8.8 Product, startup, course (39)

| EN | KK | Keep? | Alt | Avoid | Source |
|---|---|---|---|---|---|
| product / feature | өнім / мүмкіндік | TR | функция | фича, функционал | S1 |
| startup / founder | стартап / негізін қалаушы | KEEP-C / TR | фаундер (S22) | | S18, S22 |
| MVP / prototype / demo | MVP / прототип / демо | KEEP | | | S22 |
| idea / problem / solution | идея / мәселе / шешім | TR | | | own |
| user / customer | пайдаланушы / клиент (тұтынушы) | TR | | | S1 |
| feedback | пікір | TR | кері байланыс | | own |
| launch / ship / release | іске қосу / шығару / релиз | TR | | | own |
| iterate | қайталап жетілдіру | TR | итерация | | own |
| roadmap / backlog | жол картасы / backlog | TR / KEEP-L | | | own |
| task / priority / deadline | тапсырма / басымдық / мерзім | TR | | дедлайн | own |
| metrics / analytics | көрсеткіштер / аналитика | TR | метрикалар | | own |
| growth / market | өсу / нарық | TR | | | S22 |
| pricing / free / paid / trial | бағалар / тегін / ақылы / сынақ мерзімі | TR | | | own |
| subscription | жазылым | TR | | подписка | own |
| pitch / investor / accelerator | питч / инвестор / акселератор | KEEP-C | | | S22 |
| community / mentor | қауымдастық / тәлімгер | TR | ментор | | S18 |
| event / masterclass / workshop | іс-шара / шеберлік сабағы / воркшоп | TR | мастер-класс, практикум | | S18 |
| Q&A / speaker / participant | сұрақ-жауап / спикер / қатысушы | TR | баяндамашы | | S22 |
| registration / apply / application | тіркелу / өтінім беру / өтінім | TR | | заявка | S18 |
| course / lesson / module / step | курс / сабақ / модуль / қадам | TR | | | own |
| quiz / test / exercise / homework | тест / сынақ / жаттығу / үй тапсырмасы | TR | викторина | | own |
| hint / tip / example / note | ишара / кеңес / мысал / ескерту | TR | | | S1 |
| progress / score / level | үлгерім / ұпай / деңгей | TR | прогресс | | own |
| beginner / intermediate / advanced | бастаушы / орта деңгей / жоғары деңгей | TR | | | own |
| certificate | сертификат | KEEP-C | | | own |
| glossary / cheat sheet | глоссарий / жадынама | TR | терминдер сөздігі | шпаргалка | own |
| slides / recording / live stream | слайдтар / жазба / тікелей эфир | TR | | | own |
| builder (person) | жасаушы (builder) | BOTH | | | own |
| team | команда | KEEP-C | топ | | S22 |
| program (curriculum) | бағдарлама | TR | | | S18 |
| online / offline | онлайн / офлайн | KEEP-C | | | S18 |
| support / help | қолдау / анықтама | TR | көмек (S4) | | S17, S1 |
| contact us | бізбен хабарласыңыз | TR | байланыс | | S18 |
| terms of use | пайдалану шарттары | TR | | | own |
| copyright «All rights reserved» | Барлық құқықтар қорғалған | TR | | | UNVERIFIED (MS phrase) |
| newsletter | хабарлама таратылымы | TR | жаңалықтар хаты | рассылка | own |
| unsubscribe | жазылымнан бас тарту | TR | | | own |
| coming soon | жақында | TR | | | own |
| thank you / welcome | рақмет / қош келдің (сен) — қош келдіңіз (сіз) | TR | | спасибо | own |

Total: 283 rows across 8.1–8.8 (many rows carry 2–3 terms), comfortably above the 160 asked.

---

## 9. Fifteen example sentences (natural technical Kazakh, сен-form)

1. Claude Code-ты орнату үшін терминалды ашып, мына пәрменді іске қос.
   — To install Claude Code, open the terminal and run this command.
2. Промптты неғұрлым нақты жазсаң, агент соғұрлым дұрыс нәтиже береді.
   — The more precisely you write the prompt, the better the agent's result.
3. Өзгерістерді сақтағаннан кейін commit жасап, GitHub-қа push жаса.
   — After saving the changes, commit and push to GitHub.
4. API кілтін ешқашан кодтың ішіне жазба — оны `.env` файлында сақта.
   — Never put the API key inside the code; keep it in the .env file.
5. Қате шықса, қорықпа: қате мәтінін көшіріп, Claude-қа көрсет.
   — If an error appears, don't panic: copy the error text and show it to Claude.
6. Бұл модельдің контекст терезесі үлкен, бірақ әр токен үшін ақы төленеді.
   — This model has a large context window, but every token costs money.
7. Алдымен жоспарлау режимін қос: агент кодқа тиіспей тұрып, не істейтінін түсіндіріп береді.
   — Turn on plan mode first: the agent explains what it will do before touching the code.
8. MCP сервері арқылы агент дерекқорға, браузерге немесе Figma-ға қосыла алады.
   — Through an MCP server the agent can connect to a database, a browser or Figma.
9. Сайтты Vercel-ге deploy жасағаннан кейін сілтемені досыңа жібер.
   — After deploying the site to Vercel, send the link to a friend.
10. Frontend — пайдаланушы көретін бөлік, ал backend — серверде жұмыс істейтін бөлік.
    — Frontend is the part the user sees; backend is the part that runs on the server.
11. ЖИ жазған кодты тексермей тұрып жұмыс ортасына (production) шығаруға болмайды.
    — Don't ship AI-written code to production without checking it. (descriptor pattern for «production»)
12. Жаңа тармақ (branch) ашып ал, сонда негізгі код бүлінбейді.
    — Open a new branch, so the main code stays intact.
13. Тапсырманы шағын қадамдарға бөл де, әр қадамнан кейін нәтижені тексер.
    — Split the task into small steps and check the result after each one.
14. Репозиторийді клондап алғаннан кейін `npm install` пәрменін орында.
    — After cloning the repository, run npm install. (no suffix on inline code)
15. Бүгін бірге нөлден бастап жұмыс істейтін қолданба жасап, оны интернетке жариялаймыз.
    — Today we'll build a working app from scratch together and publish it to the internet.

Bonus (сіз, for the error/legal register): «Сеанс уақыты бітті. Жалғастыру үшін қайта кіріңіз.» — Session expired. Sign in again to continue.

---

## 10. Corrections to common assumptions

1. «Microsoft Language Portal» no longer exists as a site (microsoft.com/en-us/language now returns HTTP 403/404 — VERIFIED 22 Sep 2026). Terminology moved to Microsoft Learn (search via a Power BI report, plus a TBX zip download; S2 VERIFIED). The MicrosoftDocs/globalization repo removed the portal page and «Added redirect for microsoft-language-portal.md» in commit 022f3d90 on 29 Jun 2023 (VERIFIED via GitHub API: https://github.com/MicrosoftDocs/globalization/commit/022f3d90c5f4817dae19d98ec309e417c42d1778). The often-quoted exact closure date «30 June 2023» is UNVERIFIED — S2 does not mention the portal and no reachable Microsoft page states the date; say «retired at the end of June 2023». Cite «Microsoft Terminology (Microsoft Learn)», not «language portal».
2. The termincom.kz / State Terminology Commission IT list is a 2004–2006 artefact prepared with Microsoft; several of its coinages (нобай = version, егелік = domain, веб-торап = website, ауани жады = virtual memory, айқұлақ = @) are dead — Microsoft's own 2020s style guide writes «нұсқа», «домен», «интернет». Being «approved» does not mean «used». VERIFIED (S3 vs S1).
3. termincom.kz cannot be queried headlessly (server-side search returns «нәтиже жоқ»); the 390 787-term counter is real, but per-term citations to termincom in this file were not possible. Use the Wikipedia mirror of the 2004/06 list or query termincom manually in a browser.
4. «API-ге» (the brief's example) is right only if you say [апи]; Microsoft officially attaches no endings to acronyms and uses a descriptor («API интерфейсіне»); emle.kz prescribes the hyphen form. Both are legitimate — pick one per word and record it.
5. «Keep English as-is» is not the same as «keep Latin script»: агент, токен, коммит, репозиторий are already Kazakh headwords on kk.wikipedia; промпт, ЖИ-агент, нейрожелі appear in Kazakh press in 2024–2026. Writing them in Latin every time would look foreign, not «international».
6. «қосымша» for «app» is common in speech and media but is a calque of приложение; the three largest Kazakh localizations (Microsoft, Android, Firefox) all use «қолданба».
7. Every verified Kazakh consumer UI (Microsoft, Android, Firefox, Samsung, even Scratch for children) uses сіз, so сен on this site is a deliberate deviation, not «the norm for young audiences». The one authoritative precedent for informal address is Microsoft's rule for AI-directed Copilot prompts.
8. Google Help pages with `hl=kk` fall back to Russian for a non-browser client; do not cite them as a Kazakh source. AOSP strings are the reliable Google-side reference.
9. kk.wikipedia's «сыбыр сөз» for «prompt» is a lone coinage; no product or media outlet found uses it. Use «промпт».
10. Kazakh CLDR dates are year-first («2026 ж. 21 қыркүйек»), not day-first like Russian «21 сентября 2026 г.»; short form is dd.MM.yy. Copying the Russian pattern with Kazakh month names is a frequent mistake.
11. «Vibe coding» in Cyrillic («вайб-кодинг») is the Russian-media spelling; no Kazakh-language article using the term was found in search results as of 21 Sep 2026 (Russian sources dominate: habr, skillbox, rbc). Keep the Latin brand term with a Kazakh gloss. Origin facts (VERIFIED 22 Sep 2026, S24): Collins named «vibe coding» Word of the Year 2025 on 6 Nov 2025 and defines it as «the use of artificial intelligence prompted by natural language to write computer code»; the same post credits Andrej Karpathy with coining it. Karpathy's X post is dated 2 Feb 2025, id 1886192184808149383, per en.wikipedia's citation — the post itself could not be opened headless, so quote Collins, not the tweet, on slides.
12. Adilet.zan.kz (laws «Ақпараттандыру туралы», «Жасанды интеллект туралы») returns an empty shell to non-browser clients; legal-definition citations in this file are therefore UNVERIFIED.

---

## Visual candidates

| URL | What it shows | Teaching point |
|---|---|---|
| https://download.microsoft.com/download/aa5b82ec-3bd1-43db-a393-b3a793ef0be1/kaz-kaz-StyleGuide.pdf (page 7 table «Words and phrases to avoid»; page 30 «Copilot predefined prompts» table) | Microsoft's official Kazakh guide: formal words to avoid; Kazakh Copilot prompts written in bare imperatives («тізімде», «пішімде», «ұсын») | Even Microsoft localizes AI prompts in сен-form — the register you type to an AI is informal and imperative |
| https://emle.kz/kz/punctuation?id=7 | Official-style orthography portal, hyphen rules: «ҚазҰУ-ға, БҰҰ-дан», «Toshіba-ға, «Henkel»-ден», «5-сынып» | How to attach Kazakh endings to Latin words: hyphen, by pronunciation |
| https://kk.wikipedia.org/wiki/Ақпараттық_технологиялар_саласының_терминдері | The 2004/2006 state-approved IT term table («нобай — версия», «егелік — домен», «айқұлақ — @») | Approved ≠ used: why the site follows living usage over the commission list |
| https://termincom.kz/ | Homepage counter «390 787 термин», industry list incl. «Информатика және есептеуіш техника» | Where official terminology lives; scale of the national term base |
| https://standard.kz/kz/post/2026_09_zi-agentter-adamdarga-tusiniksiz-ortaq-til-oilap-tapqan-318 | Kazakh news (18 Sep 2026) headline with «ЖИ-агенттер»; in-text «Claude-та», «хабарламалардың 40%-ын», «нейрожелі» (OpenAI appears only uninflected: «OpenAI тобында») | Real-world Kazakh press already writes «ЖИ-агент», hyphenates Latin names and even percent signs («40%-ын») |
| https://egemen.kz/news/article368969-chatgpt-dinh-qazaqsha-balamasy | National daily headline «ChatGPT-дің қазақша баламасы» (23 Jul 2024) | Suffix on a Latin acronym in a headline; «-дің» after final [и] |
| https://issai.nu.edu.kz/kk/kazllm-kaz/ | ISSAI KAZ-LLM page in Kazakh: «үлкен тілдік модель», «деректер жиынтығы», «ашық бастапқы код», «бенчмарк» | A Kazakh university writing about LLMs in Kazakh — model AI vocabulary |
| https://kk.wikipedia.org/wiki/Үлкен_тілдік_модель | Kazakh LLM article: «ҮТМ», «токен», «трансформер», «эмбеддинг», and the odd «сыбыр сөз» for prompt | Shows both good loans and a failed coinage side by side |
| https://raw.githubusercontent.com/mozilla-l10n/firefox-l10n/main/kk/devtools/client/debugger.properties | Firefox Debugger in Kazakh: «Үзу нүктесі», «Шақырулар стегі», «Бастапқы кодтар», «айнымалы» | Developer tooling already exists in Kazakh — vocabulary for the debugging lesson |
| https://raw.githubusercontent.com/mozilla-l10n/firefox-l10n/main/kk/devtools/client/netmonitor.properties | Network panel in Kazakh: «Сұраным», «Жауап», «Тақырыптамалар», «Домен», «cURL ретінде көшіріп алу» | HTTP request/response vocabulary for the API lesson |
| https://raw.githubusercontent.com/aosp-mirror/platform_frameworks_base/master/packages/SettingsLib/res/values-kk/strings.xml | Android Kazakh: «Әзірлеуші опциялары», «USB арқылы түзету», «Қате туралы есеп», «Қолданба», «Параметрлер» | The phone in every student's pocket already uses қолданба/параметрлер/әзірлеуші |
| https://astanahub.com/kk/ | Astana Hub Kazakh homepage nav: «Кіру», «Қауымдастық», «Бағдарламалар», «Іс-шаралар», «Стартап» | Local ecosystem vocabulary for the product/startup module |
| https://www.samsung.com/kz_kz/ | Samsung KZ Kazakh header/footer: «Жүйеге кіру», «Тіркелу», «Қолдау», «Құпиялылық саясаты» | Formal сіз consumer UI baseline the site deliberately departs from |
| https://raw.githubusercontent.com/scratchfoundation/scratch-l10n/master/editor/interface/kk.json | Scratch (kids) Kazakh UI still in сіз («Сіздің баптауларыңыз жаңартылды») | Evidence that сен is a conscious brand choice, not default |
| https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-dates-full/main/kk/ca-gregorian.json | CLDR kk: `y 'ж'. d MMMM, EEEE`, lowercase months | Why the site prints «2026 ж. 21 қыркүйек» and what `Intl` will output |
| https://stan.kz/kiskargan-sozderge-zhalgau-kalay-zhalganadi-340750/ | Language-tips article: «АҚШ-тың», «ҚазҰУ-ға» with the rule text | Plain-language explanation of the suffix rule for the glossary page |
| https://myrzamurat.kz/blog/backend-және-frontend-деген-не/ | Hobbyist Kazakh dev blog: «Frontend — ол сайттың беті», «фреймуорк», «батырма» | Grassroots usage keeps frontend/backend in Latin |
| https://the-tech.kz/қazaқstandaғy-it-akseleratorlar-sholuy-aipreneurs-rs-bootcamp-most-business-intelligence | Kazakh IT media (Aug 2026): «стартап», «акселератор», «фаундер», «MVP әзірлеуге», «Vercel байланысында» | Startup vocabulary as Kazakh media actually writes it |
| https://learn.microsoft.com/en-us/globalization/reference/microsoft-terminology | Microsoft Terminology page (Power BI search + TBX download) | Where to verify a Microsoft Kazakh term today (portal is gone) |
| https://x.com/karpathy/status/1886192184808149383 (id and date 2 Feb 2025 taken from en.wikipedia's citation; post not opened — X blocks non-browser clients, so screenshot it manually in a browser) | Karpathy's original «vibe coding» post, 2 Feb 2025 | Origin of the course's title term; pair with the Kazakh gloss |
| https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/ (VERIFIED) | Collins blog, 6 Nov 2025: «vibe coding» is Word of the Year 2025, defined as «the use of artificial intelligence prompted by natural language to write computer code»; shortlist incl. «clanker», «broligarchy», «aura farming» | The term is dictionary-official; a dated, citable English definition for the title slide next to the Kazakh gloss |

---

## Fact-check log (22 Sep 2026)

Method: adversarial re-check of the 12 claims most likely to appear on slides. Every primary source was re-opened (WebFetch for pages; curl + grep/Python for raw JSON/XML/properties files; the Microsoft PDF read from a local text extraction). The session's WebSearch budget was exhausted, so only direct fetches were possible; a DuckDuckGo results page hit a CAPTCHA and was not bypassed.

| # | Claim in file | Source opened | Outcome |
|---|---|---|---|
| 1 | Microsoft Kazakh Style Guide: 44 pages; «No ending is added to the acronyms» (§4.1.2); «Use an informal tone of voice and form of address when translating Copilot predefined prompts» (§5.4); «can make the customer feel like they're being talked down to» (§4.1.11); «Using the active voice with "you" in error messages can sound rude»; «өтінеміз … isn't appropriate. Don't use it»; «Version 2.3 → 2.3 нұсқасы» (§5.2); «Command names should be translated as verbs … always in the infinitive» (§4.1.11, p. 26); Copilot table with «тізімде», «пішімде», «ұсын» (p. 30); «Words and phrases to avoid» (§2.1.2, p. 7) | https://download.microsoft.com/download/aa5b82ec-3bd1-43db-a393-b3a793ef0be1/kaz-kaz-StyleGuide.pdf | CONFIRMED — all quotes exact, section and page numbers correct. One CORRECTION: the guide never says «қажет» sounds rude; it prefers the imperative over «you must (… қажет)» and says not to convert «you can (істей аласыз)» into imperatives. Section 4 reworded. |
| 2 | emle.kz hyphen rules 3, 7, 8 with «ҚазҰУ-ға», «БҰҰ-дан», «Toshiba-ға», «Henkel»-ден», «5-сынып», «ХХІ ғасыр» | https://emle.kz/kz/punctuation?id=7 | CONFIRMED rule numbers and examples. CORRECTION: the rule 8 quotation omitted the parenthetical «(өзге тілдің әріптерімен жазылған)»; restored so the quote is exact. |
| 3 | stan.kz article: title, author, 11 Dec 2020, «қосымша дефис (-) арқылы жалғанады», «АҚШ-тың», «ҚазҰУ-ға» | https://stan.kz/kiskargan-sozderge-zhalgau-kalay-zhalganadi-340750/ | CONFIRMED. Author's full name is Аққибат Ақжігітова; the article explicitly writes «АҚШ-тың …, АҚШ-ның емес». |
| 4 | termincom.kz counter «390 787 термин», run by «Тіл-Қазына», category «Информатика және есептеуіш техника» | https://termincom.kz/ | CONFIRMED («Базада барлығы 390 787 термин»; Шайсұлтан Шаяхметов атындағы «Тіл-Қазына» ұлттық ғылыми-практикалық орталығы; category name exact). |
| 5 | kk.wikipedia IT list: approved 25 Dec 2004 and 31 Mar 2006, prepared with Microsoft, ~100 rows; нобай, егелік, веб-торап, ауани жады, айқұлақ, пәрмен, қолданба | https://kk.wikipedia.org/wiki/Ақпараттық_технологиялар_саласының_терминдері | CONFIRMED dates, Microsoft mention («Microsoft» корпорациясы дайындаған), 103 table rows, all coinages. CORRECTION: the table has NO rows for ссылка, пароль or пользователь, so S3 was removed as a citation for сілтеме and құпиясөз (sections 7, 8.1, 8.5); веб-торап is paired with Russian «веб-узел». |
| 6 | Egemen Qazaqstan headline «ChatGPT-дің қазақша баламасы», 23 Jul 2024, in-text «LLM-ді» | https://egemen.kz/news/article368969-chatgpt-dinh-qazaqsha-balamasy | CONFIRMED (23 шілде 2024, 07:25; author Бекзат Құлшар; «ChatGPT-дің», «LLM-ді»). |
| 7 | standard.kz, 18 Sep 2026: «ЖИ-агенттер», «нейрожелі», «Claude-та», «OpenAI-дың» | https://standard.kz/kz/post/2026_09_zi-agentter-adamdarga-tusiniksiz-ortaq-til-oilap-tapqan-318 | PARTLY REFUTED: «OpenAI-дың» does not occur anywhere in the article; OpenAI appears only uninflected («OpenAI тобында»). «Claude-та», «ЖИ-агенттер», «нейрожелі», «40%-ын», «35%-ын» confirmed. Fixed in the S16 row, paradigm table 3.3, section 5 percent row and the visual candidates. |
| 8 | CLDR kk: `y 'ж'. d MMMM, EEEE`, `y 'ж'. d MMMM`, `y 'ж'. dd MMM`, `dd.MM.yy`, `HH:mm`; month and weekday names and abbreviations; `#,##0%`, `#,##0.00 ¤`, «0 мың / 0 млн / 0 млрд»; group separator | https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-dates-full/main/kk/ca-gregorian.json and …/cldr-numbers-full/main/kk/numbers.json | CONFIRMED all patterns and names. UPGRADED: group separator is U+00A0 (was marked «codepoint UNVERIFIED»). |
| 9 | `Intl.DateTimeFormat('kk-KZ')` / `Intl.NumberFormat('kk-KZ')` reproduce the CLDR forms | Node 24.12.0, local run | CONFIRMED; the exact outputs are now listed in section 5. NOTE added: `style:'currency'` prints «5 000,00 ₸» unless `maximumFractionDigits: 0` is set. |
| 10 | «Microsoft Language Portal closed on 30 June 2023 — VERIFIED (S2)» | https://learn.microsoft.com/en-us/globalization/reference/microsoft-terminology ; …/microsoft-language-resources ; GitHub API commit list for the docs repo; pre-removal page at commit c30c6109 | REFUTED as «VERIFIED»: S2 never mentions the portal, and no reachable Microsoft page states a closure date. What is verifiable: the docs repo removed the portal page and added a redirect in commit 022f3d90 on 29 Jun 2023; microsoft.com/en-us/language returns 403/404. Exact date re-marked UNVERIFIED (section 10, item 1). |
| 11 | Collins Word of the Year 2025 = «vibe coding»; Karpathy X post Feb 2025, id 1886192184808149383 | https://blog.collinsdictionary.com/language-lovers/collins-word-of-the-year-2025-ai-meets-authenticity-as-society-shifts/ ; https://en.wikipedia.org/wiki/Vibe_coding | Collins CONFIRMED from the primary post (6 Nov 2025; definition quoted; Karpathy credited). Karpathy's date and id confirmed only through en.wikipedia's citation — x.com, xcancel (451) and publish.x.com/oembed (402) all refused — so the tweet's wording stays UNVERIFIED. Rows S24 and the visual candidates updated. |
| 12 | kk.wikipedia «Үлкен тілдік модель» uses «сыбыр сөз» for prompt; also ҮТМ, токен, трансформер, эмбеддинг | https://kk.wikipedia.org/wiki/Үлкен_тілдік_модель | CONFIRMED («мәтіндік сыбыр сөз (prompting) арқылы»); the article does not use «промпт» at all. |

Extra checks made while the raw files were open:

- AOSP kk strings (SettingsLib + core): «Әзірлеуші опциялары», «USB арқылы түзету», «Қате туралы есеп», «Қолданба», «Параметрлер», «Қайталап көріңіз», «Келесі», «Артқа», «Қосылды», «Ажыратылды», «Желі қателігі», «Толық ақпарат», «Сілтемені көшіру» CONFIRMED. «Жүктеп алу» is in NEITHER AOSP file nor in S1 — S4 removed from the download citations in 6.1, 7 and 8.1 (Firefox preferences.ftl has it).
- Firefox kk: debugger.properties «Үзу нүктесі», «Шақырулар стегі», «Бастапқы кодтар», «Нәтижелер табылмады»; netmonitor.properties «Сұраным», «Жауап», «Тақырыптамалар», «Домен», «cURL ретінде көшіріп алу», «Сүзгіле»; preferences.ftl / browser.ftl «Баптаулар», «Іздеу», «Түсіндім», «Қазір емес», «Көбірек білу», «Кіру», «пароль» CONFIRMED.
- termincom.kz/articles/?id=111: CONFIRMED, but re-attributed — it is an opinion piece by Қайнар Олжай dated 8 Nov 2019, not a termincom ruling (section 7 row fixed).
- Not re-checked in this pass (existing marks stand): S14 ISSAI, S17 Samsung, S18 Astana Hub, S19 Scratch, S21 myrzamurat.kz, S22 the-tech.kz, S1 §4.1.8 range dash, S1 §5.6.2 placeholder example, the «Жасанды интеллект туралы» law.

Blocked or unusable in this session: collinsdictionary.com main site (403), web.archive.org, theguardian.com, x.com / xcancel.com (451), publish.x.com/oembed (402), html.duckduckgo.com (CAPTCHA, not bypassed), WebSearch (budget exhausted).
