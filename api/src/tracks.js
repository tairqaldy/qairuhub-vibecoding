/**
 * What each certificate requires.
 *
 * This mirrors src/data/tracks.ts in the site repo. It is duplicated on
 * purpose: the browser decides what to SHOW, this file decides what to ISSUE,
 * and a credential that anyone can mint by editing their own progress map is
 * not a credential. scripts/check-tracks.mjs fails the site build if the two
 * ever disagree, so the duplication cannot rot quietly.
 */

export const TRACKS = {
  foundations: {
    credential: 'Vibecoding Foundations',
    passMark: 75,
    modules: ['the-tweet', 'why-now', 'ai-in-plain-language', 'problem-solving-mindset'],
    labs: ['setup', 'claude-code-first-session'],
  },
  builder: {
    credential: 'Vibecoding Builder',
    passMark: 75,
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
  },
  security: {
    credential: 'Vibecoding Security',
    passMark: 80,
    modules: ['security', 'test-and-quality'],
    labs: ['ship-it'],
  },
  advanced: {
    credential: 'Vibecoding Advanced',
    passMark: 75,
    modules: ['multi-agent', 'overnight-builds'],
    labs: ['mcp-skills-subagents', 'parallel-agents', 'other-tools'],
  },
};

export const CAPSTONE = { credential: 'Vibecoding, Full Programme' };

const PREFIX = {
  foundations: 'FND',
  builder: 'BLD',
  security: 'SEC',
  advanced: 'ADV',
  capstone: 'ALL',
};

// No I, O, 0 or 1 — these get read aloud and typed in by hand.
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function newCredentialId(track) {
  const bytes = new Uint8Array(8);
  globalThis.crypto.getRandomValues(bytes);
  let body = '';
  for (const b of bytes) body += ALPHABET[b % ALPHABET.length];
  return `VC-${PREFIX[track] ?? 'GEN'}-${body}`;
}

export const isTrack = (t) => Object.prototype.hasOwnProperty.call(TRACKS, t);

/**
 * Does this progress map actually earn the certificate?
 * Returns { ok, score, missing } — `missing` names what is not done yet, so the
 * API can tell the learner rather than just refusing.
 */
export function eligibility(track, earned) {
  const spec = TRACKS[track];
  if (!spec) return { ok: false, score: null, missing: ['unknown track'] };

  const map = earned && typeof earned === 'object' ? earned : {};
  const missing = [];
  for (const slug of spec.modules) if (!(`module:${slug}` in map)) missing.push(`module:${slug}`);
  for (const slug of spec.labs) if (!(`lab:${slug}` in map)) missing.push(`lab:${slug}`);

  const raw = map[`exam:${track}`];
  const score = typeof raw === 'number' ? raw : null;
  if (score === null) missing.push(`exam:${track}`);
  else if (score < spec.passMark) missing.push(`exam:${track}:below-pass-mark`);

  return { ok: missing.length === 0, score, missing };
}

/** The capstone needs all four certificates to already exist. */
export const capstoneEligibility = (issuedTracks) => {
  const held = new Set(issuedTracks);
  const missing = Object.keys(TRACKS).filter((t) => !held.has(t));
  return { ok: missing.length === 0, score: null, missing: missing.map((t) => `cert:${t}`) };
};
