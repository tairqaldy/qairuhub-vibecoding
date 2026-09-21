// Merge the _glossary-batch-*.ts fragments into src/data/glossary.ts, de-duplicating
// by English term, then delete the fragments. Idempotent and safe to re-run.
import fs from 'node:fs';
import path from 'node:path';

const GLOSSARY = 'src/data/glossary.ts';
const dir = 'src/data';
const batches = fs
  .readdirSync(dir)
  .filter((f) => /^_glossary-batch-.*\.ts$/.test(f))
  .sort();

if (!batches.length) {
  console.log('no batch files to merge');
  process.exit(0);
}

const src = fs.readFileSync(GLOSSARY, 'utf8');
const startMark = 'export const terms: Term[] = [';
const start = src.indexOf(startMark);
if (start === -1) {
  console.error('could not find the terms array in glossary.ts');
  process.exit(1);
}
// the terms array is the last export in the file and ends with "];"
const bodyStart = start + startMark.length;
const end = src.lastIndexOf('];');
if (end <= bodyStart) {
  console.error('could not find the end of the terms array');
  process.exit(1);
}

const head = src.slice(0, bodyStart);
const existingBody = src.slice(bodyStart, end);
const tail = src.slice(end);

// Collect the English terms already present so batches cannot introduce duplicates.
const seen = new Set([...existingBody.matchAll(/^\s{4}en: ['"](.+?)['"],/gm)].map((m) => m[1].toLowerCase()));
const seenBefore = seen.size;

let added = 0;
let addedBody = '';

for (const file of batches) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8').trim();
  const open = raw.indexOf('[');
  const close = raw.lastIndexOf(']');
  if (open === -1 || close === -1) {
    console.error(`${file}: not an array literal, skipping`);
    continue;
  }
  const inner = raw.slice(open + 1, close);

  // split into top-level objects by tracking brace depth outside strings
  const objects = [];
  let depth = 0;
  let cur = '';
  let quote = null;
  let prev = '';
  for (const ch of inner) {
    if (quote) {
      cur += ch;
      if (ch === quote && prev !== '\\') quote = null;
    } else if (ch === "'" || ch === '"' || ch === '`') {
      cur += ch;
      quote = ch;
    } else if (ch === '{') {
      depth++;
      cur += ch;
    } else if (ch === '}') {
      depth--;
      cur += ch;
      if (depth === 0) {
        objects.push(cur.trim().replace(/^,+/, '').trim());
        cur = '';
      }
    } else if (depth > 0) {
      cur += ch;
    }
    prev = ch;
  }

  let fileAdded = 0;
  for (const obj of objects) {
    const m = obj.match(/\ben:\s*['"](.+?)['"]/);
    if (!m) continue;
    const key = m[1].toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    addedBody += '\n  ' + obj.replace(/\n/g, '\n') + ',';
    fileAdded++;
    added++;
  }
  console.log(`${file}: +${fileAdded} (of ${objects.length})`);
}

const merged = head + existingBody.replace(/,?\s*$/, ',') + addedBody + '\n' + tail;
fs.writeFileSync(GLOSSARY, merged, 'utf8');
for (const f of batches) fs.unlinkSync(path.join(dir, f));

console.log(`\nmerged: ${seenBefore} → ${seen.size} terms (+${added}); removed ${batches.length} batch files`);
