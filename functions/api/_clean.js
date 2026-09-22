/**
 * Tidy a model answer before it reaches the page.
 *
 * Small open models occasionally leak a chat-template role token and start a
 * second turn, or restate the whole answer. Both look broken to a reader, so
 * cut at the first leak, drop a duplicated tail, and remove a sentence the
 * token cap chopped in half.
 */
export function clean(raw) {
  let a = String(raw || '').trim();

  // a chat-template token is never part of a real answer, so cut wherever it lands
  const tok = a.match(/<\|[^|]*\|>/);
  if (tok) a = a.slice(0, tok.index);

  const cuts = [
    /\n\s*(assistant|user|system)\s*[:\n]/i, // a new turn on its own line
    /\S*assistant\s{2,}/i, // "…елекassistant  " glued onto the text
  ];
  for (const re of cuts) {
    const m = a.match(re);
    if (m && m.index > 40) a = a.slice(0, m.index);
  }

  a = a.replace(/\s*\b(assistant|user|system)\s*$/i, '').trim();

  // the model restated the answer: keep the first copy
  const half = Math.floor(a.length / 2);
  if (half > 60) {
    const head = a.slice(0, half).trim();
    if (head.length > 60 && a.indexOf(head, half - 10) !== -1) a = head;
  }

  // drop a trailing sentence the token limit cut off mid-way
  if (a.length > 200 && !/[.!?:)\]]\s*$/.test(a)) {
    const stop = Math.max(a.lastIndexOf('. '), a.lastIndexOf('! '), a.lastIndexOf('? '));
    if (stop > a.length * 0.6) a = a.slice(0, stop + 1);
  }

  return a.trim();
}
