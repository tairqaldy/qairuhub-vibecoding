/**
 * Wrap every `## section` of a lesson in a collapsible block.
 *
 * The pages carry a lot of material. Showing all of it at once is what makes
 * them feel like a wall, so each section collapses to its heading plus a one-line
 * teaser and opens on click. Nothing is removed from the HTML, so search engines,
 * Ctrl+F and "print to PDF" still see the whole page (see `open` handling in
 * LessonLayout, which expands a section when its anchor is targeted).
 *
 * Runs on the hast tree after MDX, so it has to move both plain elements and
 * `mdxJsxFlowElement` nodes (our components) into the body.
 */

const TEASER_MAX = 110;

function textOf(node, out = []) {
  if (!node) return '';
  if (node.type === 'text') out.push(node.value);
  for (const c of node.children ?? []) textOf(c, out);
  return out.join('');
}

/** First sentence of the first paragraph, trimmed to something scannable. */
function teaserFor(nodes) {
  for (const n of nodes) {
    if (n.type === 'element' && n.tagName === 'p') {
      const t = textOf(n).replace(/\s+/g, ' ').trim();
      if (t.length < 25) continue;
      const cut = t.slice(0, TEASER_MAX);
      const stop = cut.search(/[.!?](\s|$)/);
      if (stop > 30) return cut.slice(0, stop + 1);
      return (cut.length < t.length ? cut.replace(/\s\S*$/, '') + '…' : cut);
    }
  }
  return '';
}

const isH2 = (n) => n.type === 'element' && n.tagName === 'h2';

export default function rehypeSections() {
  return (tree) => {
    const kids = tree.children ?? [];
    const firstH2 = kids.findIndex(isH2);
    if (firstH2 === -1) return;

    const out = kids.slice(0, firstH2); // intro stays open
    let i = firstH2;

    while (i < kids.length) {
      if (!isH2(kids[i])) {
        out.push(kids[i]);
        i++;
        continue;
      }
      const heading = kids[i];
      i++;
      const body = [];
      while (i < kids.length && !isH2(kids[i])) {
        body.push(kids[i]);
        i++;
      }

      const teaser = teaserFor(body);
      const id = heading.properties?.id;

      out.push({
        type: 'element',
        tagName: 'details',
        properties: { className: ['sec'], 'data-section': id ?? true },
        children: [
          {
            type: 'element',
            tagName: 'summary',
            properties: { className: ['sec-head'] },
            children: [
              { type: 'element', tagName: 'span', properties: { className: ['sec-mark'], 'aria-hidden': 'true' }, children: [] },
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['sec-text'] },
                children: [
                  heading,
                  ...(teaser
                    ? [{ type: 'element', tagName: 'span', properties: { className: ['sec-teaser'] }, children: [{ type: 'text', value: teaser }] }]
                    : []),
                ],
              },
            ],
          },
          { type: 'element', tagName: 'div', properties: { className: ['sec-body'] }, children: body },
        ],
      });
    }

    tree.children = out;
  };
}
