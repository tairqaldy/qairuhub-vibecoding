// Content is written by many agents, and YAML is unforgiving about a few characters.
// This quotes any scalar frontmatter value that would otherwise break the parser
// (a colon+space, a leading quote/bracket, a trailing colon, a stray #).
// Idempotent: safe to run before every build.
import fs from 'node:fs';
import path from 'node:path';

const roots = ['src/content/lessons', 'src/content/labs'];
const files = [];
for (const root of roots) {
  if (!fs.existsSync(root)) continue;
  for (const locale of fs.readdirSync(root)) {
    const dir = path.join(root, locale);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.mdx')) files.push(path.join(dir, f));
  }
}

// A complete inline flow collection (["a", "b"] or {a: 1}) is valid YAML and must
// be left alone — quoting it would turn a list into a string.
const isFlowCollection = (v) =>
  (v.startsWith('[') && v.endsWith(']')) || (v.startsWith('{') && v.endsWith('}'));

const needsQuote = (v) => {
  if (isFlowCollection(v)) return false;
  return /:\s/.test(v) || /\s#/.test(v) || /:$/.test(v) || /^[[{>|*&!%@`]/.test(v) || /^-\s/.test(v);
};

let changed = 0;
const problems = [];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) {
    problems.push(`${file}: no frontmatter block`);
    continue;
  }
  const lines = m[1].split(/\r?\n/);
  let touched = false;

  const fixed = lines.map((line) => {
    const kv = line.match(/^([A-Za-z_][\w-]*):[ \t]+(.*)$/);
    if (!kv) return line; // list items, nested keys, blank lines
    const [, key, valueRaw] = kv;
    const value = valueRaw.trim();
    if (!value) return line;
    // already quoted, or a plain list/number/bool
    if (/^["'].*["']$/.test(value)) return line;
    if (!needsQuote(value)) return line;
    touched = true;
    const escaped = value.replace(/"/g, '\\"');
    return `${key}: "${escaped}"`;
  });

  if (touched) {
    fs.writeFileSync(file, raw.replace(m[1], fixed.join('\n')), 'utf8');
    changed++;
    console.log(`fixed  ${file}`);
  }
}

if (problems.length) {
  console.error('\nProblems:\n  ' + problems.join('\n  '));
  process.exit(1);
}
console.log(`frontmatter ok — ${files.length} files checked, ${changed} fixed`);
