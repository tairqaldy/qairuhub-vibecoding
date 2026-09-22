import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';

/**
 * The site assistant. Docks to the right edge and answers anything: the course
 * material first, with links to the page it came from, and general programming,
 * debugging or career questions when the site does not cover them.
 *
 * The site is a multi-page app, so the conversation is kept in sessionStorage.
 * Without that, every link the reader clicks would wipe the thread mid-question.
 */

const KEY = 'vc:ask:v1';
const WIDTH_KEY = 'vc:ask:w';

/** Never narrower than a readable column, never so wide the lesson vanishes. */
function clampWidth(px: number) {
  const vw = window.innerWidth;
  return Math.round(Math.min(Math.max(px, 340), Math.max(360, Math.min(vw - 320, vw * 0.75))));
}

const copy = {
  en: {
    open: 'Ask',
    title: 'Ask anything',
    sub: 'The course, your code, your error, or where to start.',
    placeholder: 'Ask a question, paste an error, or ask for code…',
    send: 'Send',
    thinking: 'Thinking…',
    sources: 'Read this',
    clear: 'New chat',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied',
    resize: 'Drag to resize. Arrow keys also work.',
    disclaimer: 'It can be wrong. Linked pages are the source of truth.',
    error: 'Something went wrong. Try again in a moment.',
    offline: 'Could not reach the assistant. Check your connection.',
    empty: 'I did not get an answer out that time. Ask again?',
    suggestions: [
      'What is vibe coding, exactly?',
      'How do I install Claude Code?',
      'Explain this error: EADDRINUSE',
      'Write me a Python script to rename files',
      'I have never coded. Where do I start?',
    ],
  },
  kk: {
    open: 'Сұра',
    title: 'Кез келген нәрсені сұра',
    sub: 'Курс, өз кодың, қатең немесе неден бастау керегі.',
    placeholder: 'Сұрақ қой, қатені жапсыр немесе код сұра…',
    send: 'Жіберу',
    thinking: 'Ойланып жатыр…',
    sources: 'Мынаны оқы',
    clear: 'Жаңа әңгіме',
    close: 'Жабу',
    copy: 'Көшіру',
    copied: 'Көшірілді',
    resize: 'Енін өзгерту үшін сүйре. Көрсеткі пернелер де жүреді.',
    disclaimer: 'Ол қателесуі мүмкін. Шындық көзі — сілтемедегі беттер.',
    error: 'Бірдеңе дұрыс болмады. Сәлден соң қайтала.',
    offline: 'Көмекшіге қосыла алмадық. Байланысыңды тексер.',
    empty: 'Бұл жолы жауап шықпады. Қайта сұрап көресің бе?',
    suggestions: [
      'Vibe coding деген не?',
      'Claude Code-ты қалай орнатамын?',
      'Мына қатені түсіндір: EADDRINUSE',
      'Файл атын өзгертетін Python скрипт жаз',
      'Мен ешқашан код жазбағанмын. Неден бастаймын?',
    ],
  },
};

interface Source {
  n: number;
  title: string;
  section: string | null;
  url: string;
  kind: string;
}
interface Msg {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

function load(): Msg[] {
  try {
    const raw = sessionStorage.getItem(KEY);
    const v = raw ? JSON.parse(raw) : null;
    return Array.isArray(v) ? v.slice(-40) : [];
  } catch {
    return [];
  }
}

export default function Assistant({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore the thread after mount, never during render — sessionStorage does
  // not exist while Astro pre-renders this component to HTML.
  useEffect(() => {
    setMsgs(load());
    try {
      if (sessionStorage.getItem(KEY + ':open') === '1') setOpen(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (msgs.length) sessionStorage.setItem(KEY, JSON.stringify(msgs.slice(-40)));
      else sessionStorage.removeItem(KEY);
    } catch {}
  }, [msgs]);

  // The page reads this class to inset itself, so the lesson and the answer sit
  // side by side instead of one on top of the other.
  useEffect(() => {
    try {
      sessionStorage.setItem(KEY + ':open', open ? '1' : '0');
    } catch {}
    document.documentElement.classList.toggle('ask-open', open);
    return () => document.documentElement.classList.remove('ask-open');
  }, [open]);

  // Restore a width the reader chose earlier. Re-clamped against the current
  // window, because they may have resized the browser since.
  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(WIDTH_KEY));
      if (Number.isFinite(saved) && saved > 0) {
        document.documentElement.style.setProperty('--ask-w', `${clampWidth(saved)}px`);
      }
    } catch {}
  }, []);

  function applyWidth(px: number, persist: boolean) {
    const w = clampWidth(px);
    document.documentElement.style.setProperty('--ask-w', `${w}px`);
    if (persist) {
      try {
        localStorage.setItem(WIDTH_KEY, String(w));
      } catch {}
    }
  }

  function startResize(e: React.PointerEvent<HTMLButtonElement>) {
    e.preventDefault();
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    const root = document.documentElement;
    root.classList.add('ask-sizing');
    panelRef.current?.classList.add('is-sizing');

    const move = (ev: PointerEvent) => applyWidth(window.innerWidth - ev.clientX, false);
    const end = (ev: PointerEvent) => {
      applyWidth(window.innerWidth - ev.clientX, true);
      root.classList.remove('ask-sizing');
      panelRef.current?.classList.remove('is-sizing');
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', end);
      el.removeEventListener('pointercancel', end);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);
  }

  function gripKey(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 80 : 24;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const current = panelRef.current?.getBoundingClientRect().width ?? 480;
    applyWidth(current + (e.key === 'ArrowLeft' ? step : -step), true);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, busy, open]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    setQ('');
    setBusy(true);
    const history = msgs.slice(-6).map((m) => ({ role: m.role, content: m.content }));
    setMsgs((m) => [...m, { role: 'user', content: text }]);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, lang, page: location.pathname, history }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { answer: string; sources: Source[] };
      setMsgs((m) => [
        ...m,
        { role: 'assistant', content: data.answer || t.empty, sources: data.sources ?? [] },
      ]);
    } catch {
      const offline = typeof navigator !== 'undefined' && !navigator.onLine;
      setMsgs((m) => [...m, { role: 'assistant', content: offline ? t.offline : t.error }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="vc-ask-fab"
        onClick={() => setOpen(true)}
        aria-label={t.title}
        hidden={open}
      >
        <span className="vc-ask-spark" aria-hidden="true" />
        <span>{t.open}</span>
      </button>

      <aside ref={panelRef} className={`vc-ask ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label={t.title}>
        <button
          type="button"
          className="vc-ask-grip"
          onPointerDown={startResize}
          onKeyDown={gripKey}
          aria-label={t.resize}
          title={t.resize}
          tabIndex={open ? 0 : -1}
        />
        <header className="vc-ask-head">
          <div>
            <p className="vc-ask-title">{t.title}</p>
            <p className="vc-ask-sub">{t.sub}</p>
          </div>
          <button type="button" className="vc-ask-x" onClick={() => setOpen(false)} aria-label={t.close}>
            ✕
          </button>
        </header>

        <div className="vc-ask-body" ref={bodyRef}>
          {msgs.length === 0 && (
            <div className="vc-ask-empty">
              {t.suggestions.map((s) => (
                <button key={s} type="button" className="vc-ask-sugg" onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {msgs.map((m, i) => (
            <div key={i} className={`vc-ask-msg vc-ask-${m.role}`}>
              <div className="vc-ask-bubble">
                {m.role === 'assistant' ? <Rich text={m.content} copy={t.copy} copied={t.copied} /> : m.content}
              </div>
              {m.sources && m.sources.length > 0 && (
                <div className="vc-ask-src">
                  <p>{t.sources}</p>
                  <ul>
                    {dedupe(m.sources).map((s) => (
                      <li key={s.url + (s.section ?? '')}>
                        <a href={s.url}>
                          <span className="vc-ask-src-t">
                            <span className="vc-ask-src-n">{s.n}</span>
                            {s.title}
                          </span>
                          {s.section && <span className="vc-ask-src-s">{s.section}</span>}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {busy && (
            <div className="vc-ask-msg vc-ask-assistant">
              <div className="vc-ask-bubble vc-ask-wait">
                <span /> <span /> <span /> {t.thinking}
              </div>
            </div>
          )}
        </div>

        <form
          className="vc-ask-foot"
          onSubmit={(e) => {
            e.preventDefault();
            ask(q);
          }}
        >
          <textarea
            ref={inputRef}
            className="vc-ask-input"
            value={q}
            rows={1}
            placeholder={t.placeholder}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                ask(q);
              }
            }}
          />
          <div className="vc-ask-actions">
            {msgs.length > 0 && (
              <button type="button" className="vc-ask-clear" onClick={() => setMsgs([])}>
                {t.clear}
              </button>
            )}
            <button type="submit" className="vc-ask-send" disabled={busy || !q.trim()}>
              {t.send}
            </button>
          </div>
          <p className="vc-ask-note">{t.disclaimer}</p>
        </form>
      </aside>
    </>
  );
}

/* --------------------------------------------------------------- rendering */

/**
 * Just enough Markdown for an answer: fenced code with a copy button, inline
 * code, bold, and list items. Everything else stays literal text, which is
 * safer than a full parser inside a widget nobody can debug on stage.
 */
function Rich({ text, copy, copied }: { text: string; copy: string; copied: string }) {
  const parts = String(text).split(/```/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Code key={i} raw={part} copy={copy} copied={copied} />
        ) : (
          <Prose key={i} text={part} />
        ),
      )}
    </>
  );
}

function Code({ raw, copy, copied }: { raw: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);
  // a fence may open with a language tag on the first line
  const nl = raw.indexOf('\n');
  const first = nl === -1 ? '' : raw.slice(0, nl).trim();
  const isLang = /^[a-z0-9+#-]{1,16}$/i.test(first);
  const lang = isLang ? first : '';
  const code = (isLang ? raw.slice(nl + 1) : raw).replace(/^\n+|\n+$/g, '');

  return (
    <div className="vc-ask-code">
      <div className="vc-ask-code-bar">
        <span>{lang || 'code'}</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard?.writeText(code).then(
              () => {
                setDone(true);
                setTimeout(() => setDone(false), 1600);
              },
              () => {},
            );
          }}
        >
          {done ? copied : copy}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Prose({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        if (!line.trim()) return <span key={i} className="vc-ask-gap" />;
        const bullet = /^\s*([-*•]|\d+\.)\s+/.exec(line);
        const body = bullet ? line.slice(bullet[0].length) : line;
        return (
          <p key={i} className={bullet ? 'vc-ask-li' : undefined}>
            {bullet && <span className="vc-ask-bullet">{/^\d/.test(bullet[1]) ? bullet[1] : '·'}</span>}
            <Inline text={body} />
          </p>
        );
      })}
    </>
  );
}

function Inline({ text }: { text: string }) {
  // `code`, **bold** and bare URLs, in one pass so the pieces cannot nest wrong
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|https?:\/\/[^\s<>()]+)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith('`') && p.endsWith('`') && p.length > 2) return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith('**') && p.endsWith('**') && p.length > 4) return <b key={i}>{p.slice(2, -2)}</b>;
        if (/^https?:\/\//.test(p))
          return (
            <a key={i} href={p} target="_blank" rel="noopener noreferrer">
              {p}
            </a>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

function dedupe(list: Source[]) {
  const seen = new Set<string>();
  return list.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}
