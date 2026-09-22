/**
 * The track requirements exist twice on purpose.
 *
 * src/data/tracks.ts decides what the browser SHOWS. api/src/tracks.js decides
 * what the server ISSUES — a credential anyone can mint by editing their own
 * progress map is not a credential, so the check has to run where the learner
 * cannot reach it.
 *
 * Duplication that nobody checks is duplication that rots. This fails the build
 * the moment the two disagree about a module, a lab, a pass mark or a name.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Pull the `tracks` array literal out of the TypeScript file and evaluate it. */
function readSiteTracks() {
  const src = fs.readFileSync(path.join(root, 'src/data/tracks.ts'), 'utf8');
  const start = src.indexOf('export const tracks: Track[] = [');
  if (start === -1) throw new Error('src/data/tracks.ts: could not find `export const tracks`');
  // Start after the "=", or the first bracket found is the one in `Track[]`
  // and the literal parses as an empty array.
  const open = src.indexOf('[', src.indexOf('=', start));

  // Walk to the matching bracket. The array holds only data, so a depth count
  // is enough — but skip anything inside a string so a "]" in prose cannot end
  // the array early.
  let depth = 0;
  let quote = null;
  let end = -1;
  for (let i = open; i < src.length; i++) {
    const ch = src[i];
    if (quote) {
      if (ch === '\\') i++;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === '[') depth++;
    else if (ch === ']' && --depth === 0) {
      end = i + 1;
      break;
    }
  }
  if (end === -1) throw new Error('src/data/tracks.ts: unbalanced brackets in `tracks`');

  const literal = src.slice(open, end).replace(/\bas const\b/g, '');
  // eslint-disable-next-line no-new-func
  return new Function(`return ${literal}`)();
}

const site = readSiteTracks();
// pathToFileURL, not a bare path: on Windows an absolute path starts with a
// drive letter and the ESM loader reads "c:" as an unsupported URL scheme.
const { TRACKS, CAPSTONE } = await import(pathToFileURL(path.join(root, 'api/src/tracks.js')).href);

const problems = [];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const siteIds = site.map((t) => t.id).sort();
const apiIds = Object.keys(TRACKS).sort();
if (!eq(siteIds, apiIds)) {
  problems.push(`track ids differ — site [${siteIds}] vs api [${apiIds}]`);
}

for (const t of site) {
  const a = TRACKS[t.id];
  if (!a) continue; // already reported above
  if (!eq(t.modules, a.modules)) {
    problems.push(
      `${t.id}: modules differ\n    site: ${JSON.stringify(t.modules)}\n    api:  ${JSON.stringify(a.modules)}`,
    );
  }
  if (!eq(t.labs, a.labs)) {
    problems.push(`${t.id}: labs differ\n    site: ${JSON.stringify(t.labs)}\n    api:  ${JSON.stringify(a.labs)}`);
  }
  if (t.passMark !== a.passMark) {
    problems.push(`${t.id}: passMark differs — site ${t.passMark} vs api ${a.passMark}`);
  }
  if (t.credential.en !== a.credential) {
    problems.push(`${t.id}: credential name differs — site "${t.credential.en}" vs api "${a.credential}"`);
  }
}

// Every module and lab must belong to at least one track, or a learner can
// finish the whole site and still not complete anything.
const curriculum = fs.readFileSync(path.join(root, 'src/data/curriculum.ts'), 'utf8');
const slugsIn = (block) => [...block.matchAll(/^\s*\{\s*slug:\s*'([^']+)'/gm)].map((m) => m[1]);
const modulesBlock = curriculum.slice(curriculum.indexOf('export const modules'), curriculum.indexOf('export const labs'));
const labsBlock = curriculum.slice(curriculum.indexOf('export const labs'), curriculum.indexOf('export const cycle'));

const coveredModules = new Set(site.flatMap((t) => t.modules));
const coveredLabs = new Set(site.flatMap((t) => t.labs));
for (const slug of slugsIn(modulesBlock)) {
  if (!coveredModules.has(slug)) problems.push(`module "${slug}" is in no track`);
}
for (const slug of slugsIn(labsBlock)) {
  if (!coveredLabs.has(slug)) problems.push(`lab "${slug}" is in no track`);
}
// And nothing may point at a module or lab that does not exist.
const realModules = new Set(slugsIn(modulesBlock));
const realLabs = new Set(slugsIn(labsBlock));
for (const t of site) {
  for (const s of t.modules) if (!realModules.has(s)) problems.push(`${t.id}: no such module "${s}"`);
  for (const s of t.labs) if (!realLabs.has(s)) problems.push(`${t.id}: no such lab "${s}"`);
}

if (!CAPSTONE?.credential) problems.push('api/src/tracks.js: CAPSTONE.credential is missing');

if (problems.length) {
  console.error('tracks check failed:\n');
  for (const p of problems) console.error(`  - ${p}`);
  console.error('\nsrc/data/tracks.ts and api/src/tracks.js must agree.');
  process.exit(1);
}

const items = site.reduce((n, t) => n + t.modules.length + t.labs.length, 0);
console.log(
  `tracks ok — ${site.length} tracks, ${items} required items, ` +
    `${new Set(site.flatMap((t) => t.modules)).size} modules and ${new Set(site.flatMap((t) => t.labs)).size} labs covered`,
);
