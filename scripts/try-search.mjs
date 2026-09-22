/**
 * Exercise the assistant's retrieval without a Workers runtime.
 *
 *   node scripts/try-search.mjs "Claude Code-ты қалай орнатамын?" kk
 *
 * Prints the ranked passages the model would actually be handed, so a bad
 * answer can be traced to bad retrieval instead of blamed on the model.
 */
import fs from 'node:fs';
import { build, search } from '../functions/api/_search.js';

const query = process.argv[2];
const lang = process.argv[3] ?? 'en';
if (!query) {
  console.error('usage: node scripts/try-search.mjs "<query>" [en|kk]');
  process.exit(1);
}

const file = ['dist/assistant-index.json', 'public/assistant-index.json'].find((f) => fs.existsSync(f));
if (!file) {
  console.error('no index — run `npm run build` first');
  process.exit(1);
}

const index = build(JSON.parse(fs.readFileSync(file, 'utf8')).docs ?? []);
const hits = search(index, query, lang, 8);

console.log(`${hits.length} hit(s) for ${JSON.stringify(query)} [${lang}]\n`);
for (const [i, h] of hits.entries()) {
  console.log(`${i + 1}. ${h.score.toFixed(2)}  ${h.d.title}${h.d.section ? ' › ' + h.d.section : ''}`);
  console.log(`   ${h.d.url}`);
  console.log(`   ${h.d.text.replace(/\s+/g, ' ').slice(0, 150)}…\n`);
}
