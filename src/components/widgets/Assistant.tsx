import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';

/**
 * The site assistant. Docks to the right edge, answers only from this site's
 * material, and always offers the pages behind the answer so the reader can go
 * and read the real thing.
 */

const copy = {
  en: {
    open: 'Ask',
    title: 'Ask about anything here',
    sub: 'Answers come from this site only, with links to the page they came from.',
    placeholder: 'Ask a question, paste an error, or ask for code…',
    send: 'Send',
    thinking: 'Reading the site…',
    sources: 'Read this',
    clear: 'New question',
    close: 'Close',
    disclaimer: 'It can be wrong. The linked pages are the source of truth.',
    error: 'Something went wrong. Try again in a moment.',
    offline: 'Could not reach the assistant. Check your connection.',
    empty: 'Nothing on the site matches that yet.',
    suggestions: [
      'What is vibe coding, exactly?',
      'How do I install Claude Code?',
      'Why did my agent delete a file?',
      'What is a context window?',
      'Which tool should I start with?',
    ],
  },
  kk: {
    open: 'Сұра',
    title: 'Мұндағы кез келген нәрсе туралы сұра',
    sub: 'Жауаптар тек осы сайттың материалынан алынады әрі қай беттен екені сілтемемен беріледі.',
    placeholder: 'Сұрақ қой, қатені жапсыр немесе код сұра…',
    send: 'Жіберу',
    thinking: 'Сайтты оқып жатыр…',
    sources: 'Мынаны оқы',
    clear: 'Жаңа сұрақ',
    close: 'Жабу',
    disclaimer: 'Ол қателесуі мүмкін. Шындық көзі — сілтемедегі беттер.',
    error: 'Бірдеңе дұрыс болмады. Сәлден соң қайтала.',
    offline: 'Көмекшіге қосыла алмадық. Байланысыңды тексер.',
    empty: 'Бұған сәйкес ештеңе әзірге сайтта жоқ.',
    suggestions: [
      'Vibe coding деген не?',
      'Claude Code-ты қалай орнатамын?',
      'Agent неге файлды өшіріп жіберді?',
      'Контекст терезесі деген не?',
      'Қай құралдан бастаған дұрыс?',
    ],
  },
};

interface Source {
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

export default function Assistant({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
  }, [msgs, busy]);

  async function ask(question: string) {
    const text = question.trim();
    if (!text || busy) return;
    setQ('');
    setBusy(true);
    const history = msgs.slice(-4).map((m) => ({ role: m.role, content: m.content }));
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
    } catch (e) {
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

      <aside className={`vc-ask ${open ? 'is-open' : ''}`} aria-hidden={!open} aria-label={t.title}>
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
              <div className="vc-ask-bubble">{m.content}</div>
              {m.sources && m.sources.length > 0 && (
                <div className="vc-ask-src">
                  <p>{t.sources}</p>
                  <ul>
                    {dedupe(m.sources).map((s) => (
                      <li key={s.url + (s.section ?? '')}>
                        <a href={s.url}>
                          <span className="vc-ask-src-t">{s.title}</span>
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

function dedupe(list: Source[]) {
  const seen = new Set<string>();
  return list.filter((s) => {
    if (seen.has(s.url)) return false;
    seen.add(s.url);
    return true;
  });
}
