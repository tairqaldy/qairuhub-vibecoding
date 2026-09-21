// Link checker for the built site.
//   - every internal href resolves to a real page in dist/
//   - every in-page #anchor exists on its target page
//   - external links are collected and (optionally) HEAD-checked with --external
// Exit 1 on broken internal links.
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const checkExternal = process.argv.includes('--external');

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found — run the build first');
  process.exit(1);
}

const pages = [];
const walk = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) pages.push(p);
  }
};
walk(DIST);

// url path -> set of ids on that page
const idsByPage = new Map();
const urlOf = (file) =>
  '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '/');

for (const f of pages) {
  const html = fs.readFileSync(f, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idsByPage.set(urlOf(f), ids);
}

const exists = (u) => {
  const clean = u.split('?')[0];
  if (idsByPage.has(clean)) return true;
  if (idsByPage.has(clean.endsWith('/') ? clean : clean + '/')) return true;
  const asFile = path.join(DIST, clean);
  return fs.existsSync(asFile);
};

const broken = [];
const anchors = [];
const external = new Set();

for (const f of pages) {
  const from = urlOf(f);
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(/<a\b[^>]*?href="([^"]+)"/g)) {
    const href = m[1];
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) continue;

    if (/^https?:\/\//.test(href)) {
      external.add(href);
      continue;
    }
    if (href.startsWith('#')) {
      const id = decodeURIComponent(href.slice(1));
      if (id && !(idsByPage.get(from) ?? new Set()).has(id)) anchors.push(`${from} → ${href}`);
      continue;
    }
    const [urlPart, hash] = href.split('#');
    const target = urlPart || from;
    if (!exists(target)) {
      broken.push(`${from} → ${href}`);
      continue;
    }
    if (hash) {
      const key = target.endsWith('/') ? target : target + '/';
      const ids = idsByPage.get(key);
      if (ids && !ids.has(decodeURIComponent(hash))) anchors.push(`${from} → ${href}`);
    }
  }
}

console.log(`checked ${pages.length} pages · ${external.size} external links`);

if (checkExternal) {
  const list = [...external];
  let bad = 0;
  const batch = 12;
  for (let i = 0; i < list.length; i += batch) {
    const results = await Promise.all(
      list.slice(i, i + batch).map(async (u) => {
        try {
          const ctrl = new AbortController();
          const t = setTimeout(() => ctrl.abort(), 12000);
          let r = await fetch(u, { method: 'HEAD', redirect: 'follow', signal: ctrl.signal });
          if (r.status === 405 || r.status === 403) {
            r = await fetch(u, { method: 'GET', redirect: 'follow', signal: ctrl.signal });
          }
          clearTimeout(t);
          return r.status >= 400 ? `${r.status}  ${u}` : null;
        } catch (e) {
          return `ERR   ${u}  (${String(e).slice(0, 40)})`;
        }
      }),
    );
    for (const r of results.filter(Boolean)) {
      // Many sites block automated HEAD requests; report but never fail the build on it.
      console.log('  external: ' + r);
      bad++;
    }
  }
  console.log(`external check done — ${bad} not reachable from here (informational only)`);
}

if (anchors.length) {
  console.log(`\n${anchors.length} anchor(s) with no matching id:`);
  console.log('  ' + [...new Set(anchors)].slice(0, 20).join('\n  '));
}

if (broken.length) {
  console.error(`\nBROKEN internal links (${broken.length}):`);
  console.error('  ' + [...new Set(broken)].join('\n  '));
  process.exit(1);
}

console.log('no broken internal links');
