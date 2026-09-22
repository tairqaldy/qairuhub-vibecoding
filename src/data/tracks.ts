/**
 * Levels.
 *
 * The 16 modules and 9 labs are one long road. Most people do not want a road,
 * they want to know where they are and what is left. A track is a named slice
 * of that road with an exam at the end and a credential behind it.
 *
 * Four tracks cover every module and every lab. Security deliberately overlaps
 * Builder: finishing the loop already puts you most of the way through it, and
 * pretending otherwise would make people redo work they have done.
 *
 * Copy here is bilingual because three pages and a certificate all need it.
 * Page-level prose still lives in each page's own `c = {en, kk}` object.
 */

import { labBySlug, moduleBySlug, type Lang } from './curriculum';

type L = Record<Lang, string>;

export type TrackId = 'foundations' | 'builder' | 'security' | 'advanced';

export interface Track {
  id: TrackId;
  /** Shown as the level badge. Matches the 1/2/3 scale already used by labs and materials. */
  level: 1 | 2 | 3;
  n: string;
  /** A CSS custom property name from global.css. */
  accent: string;
  title: L;
  tagline: L;
  /** The onboarding question: which of these is you? */
  forWho: L;
  /** What the credential is called on the certificate and on LinkedIn. */
  credential: L;
  /** What you can do once you hold it. Printed on the certificate back matter. */
  proves: L;
  modules: string[];
  labs: string[];
  /** Questions drawn per attempt, from a larger pool. */
  ask: number;
  /** Percent needed to pass. */
  passMark: number;
}

export const tracks: Track[] = [
  {
    id: 'foundations',
    level: 1,
    n: '01',
    accent: 'var(--color-ok)',
    title: { en: 'Foundations', kk: 'Негіздер' },
    tagline: {
      en: 'What vibe coding is, what the evidence says, and your first agent session.',
      kk: 'Vibe coding деген не, зерттеулер не дейді және алғашқы agent сессияң.',
    },
    forWho: {
      en: 'I have never written code. I am starting from zero.',
      kk: 'Мен код жазып көрген емеспін. Нөлден бастаймын.',
    },
    credential: { en: 'Vibecoding Foundations', kk: 'Vibecoding: Негіздер' },
    proves: {
      en: 'Can set up a machine, run an agent, and tell the three modes apart.',
      kk: 'Компьютерін баптап, agent-ті іске қосып, үш режимді ажырата алады.',
    },
    modules: ['the-tweet', 'why-now', 'ai-in-plain-language', 'problem-solving-mindset'],
    labs: ['setup', 'claude-code-first-session'],
    ask: 8,
    passMark: 75,
  },
  {
    id: 'builder',
    level: 2,
    n: '02',
    accent: 'var(--color-signal)',
    title: { en: 'Builder', kk: 'Құрастырушы' },
    tagline: {
      en: 'The whole nine-step loop: idea, context, agent, code, repo, test, deploy, logs.',
      kk: 'Тоғыз қадамдық цикл түгел: идея, контекст, agent, код, repo, тест, deploy, лог.',
    },
    forWho: {
      en: 'I can code, but agents are new to me.',
      kk: 'Код жаза аламын, бірақ agent-тер маған жаңа.',
    },
    credential: { en: 'Vibecoding Builder', kk: 'Vibecoding: Құрастырушы' },
    proves: {
      en: 'Can take an idea to a deployed app and fix it when it breaks.',
      kk: 'Идеяны deploy-ға дейін жеткізеді. Бұзылса, өзі жөндейді.',
    },
    modules: [
      'idea-to-prd',
      'references',
      'context-ssot',
      'the-agent',
      'local-build',
      'git-and-github',
      'test-and-quality',
      'deploy',
      'logs-and-feedback',
    ],
    labs: ['plan-mode-build', 'claude-md-and-permissions', 'undo-anything', 'ship-it'],
    ask: 10,
    passMark: 75,
  },
  {
    id: 'security',
    level: 3,
    n: '03',
    accent: 'var(--color-pink)',
    title: { en: 'Security', kk: 'Қауіпсіздік' },
    tagline: {
      en: 'Why a rule in a prompt is not a rule, and what to check before you go public.',
      kk: 'Prompt-тағы ереже неге ереже емес. Жарияламас бұрын нені тексеру керек.',
    },
    forWho: {
      en: 'I am about to put something real online, and people ask me if it is safe.',
      kk: 'Жобамды интернетке шығарғалы тұрмын. Менен «қауіпсіз бе?» деп сұрайды.',
    },
    credential: { en: 'Vibecoding Security', kk: 'Vibecoding: Қауіпсіздік' },
    proves: {
      en: 'Can check whether a vibe-coded app is safe to expose, and set limits the agent cannot talk past.',
      kk: 'Қолданбаны шығаруға бола ма — соны тексереді. Agent айналып өте алмайтын шектеу қояды.',
    },
    modules: ['security', 'test-and-quality'],
    labs: ['ship-it'],
    ask: 8,
    passMark: 80,
  },
  {
    id: 'advanced',
    level: 3,
    n: '04',
    accent: 'var(--color-lime)',
    title: { en: 'Advanced', kk: 'Жоғары деңгей' },
    tagline: {
      en: 'More than one agent, and when that is a bad idea. MCP, skills, subagents, worktrees, cost.',
      kk: 'Бірнеше agent қатар: қашан пайдалы, қашан қате. MCP, skill, subagent, worktree, шығын.',
    },
    forWho: {
      en: 'One agent works for me. I want to run several.',
      kk: 'Бір agent жақсы жұмыс істеп тұр. Енді бірнешеуін қатар қосқым келеді.',
    },
    credential: { en: 'Vibecoding Advanced', kk: 'Vibecoding: Жоғары деңгей' },
    proves: {
      en: 'Can run several agents on separate, checkable work without burning money or trust.',
      kk: 'Бірнеше agent-ті бөлек, тексерілетін жұмысқа қоя алады. Ақша да, сенім де босқа кетпейді.',
    },
    modules: ['multi-agent', 'overnight-builds'],
    labs: ['mcp-skills-subagents', 'parallel-agents', 'other-tools'],
    ask: 8,
    passMark: 75,
  },
];

/** Held only when all four are held. There is no separate exam for it. */
export const capstone = {
  id: 'capstone' as const,
  title: { en: 'The whole programme', kk: 'Толық бағдарлама' },
  tagline: {
    en: 'All four levels: every module, every lab, every exam passed.',
    kk: 'Төрт деңгей түгел: әр модуль, әр практика, әр емтихан.',
  },
  credential: { en: 'Vibecoding, Full Programme', kk: 'Vibecoding: толық бағдарлама' },
  proves: {
    en: 'Holds Foundations, Builder, Security and Advanced.',
    kk: 'Төрт сертификат та қолында: Негіздер, Құрастырушы, Қауіпсіздік, Жоғары деңгей.',
  },
};

export type CertId = TrackId | 'capstone';

/* ------------------------------------------------------------------ keys */

// Progress ids. The server caps keys at 80 characters and values at 1000, so
// these stay short. An exam value is the best score out of 100, not XP earned
// once — see awardBest() in src/lib/store.ts.
export const examKey = (id: TrackId) => `exam:${id}`;
export const certKey = (id: CertId) => `cert:${id}`;

export const trackById = (id: string) => tracks.find((t) => t.id === id);

export interface TrackItem {
  kind: 'module' | 'lab';
  slug: string;
  title: L;
  minutes: number;
  xp: number;
  /** The progress id this item is stored under. */
  key: string;
  /** Lang-less path fragment, for href(lang, path). */
  path: string;
}

/** Every module and lab in a track, modules first, in curriculum order. */
export function trackItems(track: Track): TrackItem[] {
  const mods = track.modules
    .map((slug) => moduleBySlug(slug))
    .filter((m): m is NonNullable<typeof m> => Boolean(m))
    .map((m) => ({
      kind: 'module' as const,
      slug: m.slug,
      title: m.title,
      minutes: m.minutes,
      xp: m.xp,
      key: `module:${m.slug}`,
      path: `learn/${m.slug}`,
    }));
  const lbs = track.labs
    .map((slug) => labBySlug(slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))
    .map((l) => ({
      kind: 'lab' as const,
      slug: l.slug,
      title: l.title,
      minutes: l.minutes,
      xp: l.xp,
      key: `lab:${l.slug}`,
      path: `labs/${l.slug}`,
    }));
  return [...mods, ...lbs];
}

export interface TrackState {
  track: Track;
  items: TrackItem[];
  done: TrackItem[];
  left: TrackItem[];
  /** Percent of items finished, 0-100. */
  pct: number;
  minutesLeft: number;
  /** Best exam score so far, or null if never attempted. */
  score: number | null;
  examPassed: boolean;
  /** Everything read and the exam passed. The certificate can be issued. */
  earnedCert: boolean;
  /** The certificate has actually been issued and has a credential id. */
  holdsCert: boolean;
}

/**
 * Where someone stands in a track.
 *
 * `earned` is the flat progress map. Presence means done; the exam key's value
 * is the best score. Reading is deliberately tolerant — a missing key is just
 * "not done", never an error.
 */
export function trackState(track: Track, earned: Record<string, number>): TrackState {
  const items = trackItems(track);
  const done = items.filter((i) => i.key in earned);
  const left = items.filter((i) => !(i.key in earned));
  const raw = earned[examKey(track.id)];
  const score = typeof raw === 'number' ? raw : null;
  const examPassed = score !== null && score >= track.passMark;
  const allRead = left.length === 0;
  return {
    track,
    items,
    done,
    left,
    pct: items.length ? Math.round((done.length / items.length) * 100) : 0,
    minutesLeft: left.reduce((n, i) => n + i.minutes, 0),
    score,
    examPassed,
    earnedCert: allRead && examPassed,
    holdsCert: certKey(track.id) in earned,
  };
}

export const allTrackStates = (earned: Record<string, number>) => tracks.map((t) => trackState(t, earned));

/** The capstone is held when all four certificates are held. */
export const capstoneEarned = (earned: Record<string, number>) =>
  tracks.every((t) => certKey(t.id) in earned);

/**
 * Which track to nudge someone towards: the one in progress and closest to
 * finishing, else the first untouched one. Never a track already certified.
 */
export function nextTrack(earned: Record<string, number>): TrackState | null {
  const states = allTrackStates(earned).filter((s) => !s.holdsCert);
  if (!states.length) return null;
  const started = states.filter((s) => s.done.length > 0);
  const pool = started.length ? started : states;
  return pool.slice().sort((a, b) => b.pct - a.pct || a.track.level - b.track.level)[0];
}
