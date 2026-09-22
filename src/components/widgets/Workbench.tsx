import { useEffect, useMemo, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { allTrackStates, nextTrack } from '@/data/tracks';
import { useProgress } from '@/lib/store';
import { href } from '@/i18n/ui';
import { track } from '@/lib/api';

/**
 * The workbench: a small imitation of what a terminal agent feels like, with a
 * real model behind it.
 *
 * Everything else interactive on this site is scripted and offline on purpose.
 * This one is not, and that is the point — you cannot learn the loop from a
 * recording of the loop. The cost is bounded by a daily per-person allowance
 * counted server-side, and the whole project lives in localStorage, so nothing
 * here can reach anything real.
 */

const STORE = 'vc:bench:v1';

const STARTER: FileRec[] = [
  {
    path: 'index.html',
    content: `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My first page</title>
    <style>
      body { font-family: system-ui, sans-serif; display: grid; place-items: center;
             min-height: 100vh; margin: 0; background: #0b1020; color: #fff; }
      h1 { font-weight: 300; }
    </style>
  </head>
  <body>
    <h1>Change me, then ask the agent for something.</h1>
  </body>
</html>
`,
  },
];

interface FileRec {
  path: string;
  content: string;
}
interface Turn {
  role: 'user' | 'assistant';
  content: string;
  changed?: string[];
}

const copy = {
  en: {
    files: 'Files',
    newFile: 'New file',
    preview: 'Preview',
    code: 'Code',
    run: 'Run',
    ask: 'Ask the agent to change something…',
    send: 'Send',
    working: 'Working…',
    reset: 'Start over',
    left: 'calls left today',
    noPreview: 'Add an index.html to see a preview.',
    changed: 'changed',
    task: 'Your task',
    taskNone: 'Build whatever you want. Or ask the agent what to try.',
    hint: 'Tip: ask for one small change at a time, then read what it did. That is the whole loop.',
    emptyChat: 'Ask for a change. Try: “make the heading bigger and add a button that counts clicks”.',
    delete: 'Delete',
    confirmReset: 'Delete every file and start again?',
    signedOut: 'Sign in to use the workbench.',
  },
  kk: {
    files: 'Файлдар',
    newFile: 'Жаңа файл',
    preview: 'Алдын ала қарау',
    code: 'Код',
    run: 'Іске қосу',
    ask: 'Agent-тен бірдеңені өзгертуді сұра…',
    send: 'Жіберу',
    working: 'Істеп жатыр…',
    reset: 'Қайтадан бастау',
    left: 'бүгінге қалды',
    noPreview: 'Алдын ала қарау үшін index.html қос.',
    changed: 'өзгерді',
    task: 'Тапсырмаң',
    taskNone: 'Қалағаныңды құрастыр. Немесе agent-тен не істеп көруге болатынын сұра.',
    hint: 'Кеңес: бір уақытта бір шағын өзгеріс сұра да, не істегенін оқы. Бүкіл цикл — осы.',
    emptyChat: 'Өзгеріс сұра. Мысалы: «тақырыпты үлкейт және басылған санын санайтын түйме қос».',
    delete: 'Өшіру',
    confirmReset: 'Барлық файлды өшіріп, қайтадан бастау керек пе?',
    signedOut: 'Workbench-ті қолдану үшін аккаунтқа кір.',
  },
};

export default function Workbench({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const progress = useProgress();

  const [files, setFiles] = useState<FileRec[]>(STARTER);
  const [active, setActive] = useState('index.html');
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [tab, setTab] = useState<'preview' | 'code'>('code');
  const [remaining, setRemaining] = useState<number | null>(null);
  const [previewKey, setPreviewKey] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const v = JSON.parse(raw);
        if (Array.isArray(v.files) && v.files.length) setFiles(v.files);
        if (Array.isArray(v.turns)) setTurns(v.turns.slice(-30));
        if (typeof v.active === 'string') setActive(v.active);
      }
    } catch {}
    fetch('/api/build')
      .then(() => {})
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORE, JSON.stringify({ files, turns: turns.slice(-30), active }));
    } catch {}
  }, [files, turns, active]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns, busy]);

  const current = files.find((f) => f.path === active) ?? files[0];
  const html = useMemo(() => {
    const index = files.find((f) => f.path === 'index.html');
    if (!index) return '';
    // Inline the other files so the sandboxed iframe, which has no network and
    // no origin, can still resolve them.
    let out = index.content;
    for (const f of files) {
      if (f.path === 'index.html') continue;
      if (f.path.endsWith('.css')) {
        out = out.replace(
          new RegExp(`<link[^>]*href=["']\\.?/?${f.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'g'),
          `<style>\n${f.content}\n</style>`,
        );
      } else if (f.path.endsWith('.js')) {
        out = out.replace(
          new RegExp(`<script[^>]*src=["']\\.?/?${f.path.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>\\s*</script>`, 'g'),
          `<script>\n${f.content}\n</script>`,
        );
      }
    }
    return out;
  }, [files]);

  /** What the agent should know about where this person is in the course. */
  const situation = useMemo(() => {
    const n = nextTrack(progress.earned);
    if (!n) return '';
    const states = allTrackStates(progress.earned);
    const donePct = Math.round(states.reduce((s, x) => s + x.pct, 0) / states.length);
    const nextItem = n.left[0];
    return `${donePct}% through the course overall. Current level: ${n.track.title.en} (${n.pct}%). Next unread: ${nextItem ? nextItem.title.en : 'nothing — the exam is next'}.`;
  }, [progress]);

  function writeFile(path: string, content: string) {
    setFiles((list) => {
      const i = list.findIndex((f) => f.path === path);
      if (i === -1) return [...list, { path, content }];
      const copyList = [...list];
      copyList[i] = { path, content };
      return copyList;
    });
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    setTurns((list) => [...list, { role: 'user', content: text }]);

    try {
      const res = await fetch('/api/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang,
          message: text,
          files,
          progress: situation,
          history: turns.slice(-6).map((x) => ({ role: x.role, content: x.content })),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (typeof data.quota?.remaining === 'number') setRemaining(data.quota.remaining);
      void track('workbench', res.ok ? 'ok' : String(res.status), lang);

      if (!res.ok) {
        setTurns((list) => [...list, { role: 'assistant', content: data.message || t.emptyChat }]);
        return;
      }

      const changed: string[] = [];
      for (const f of data.files ?? []) {
        writeFile(f.path, f.content);
        changed.push(f.path);
      }
      if (changed.length) {
        setActive(changed[0]);
        setPreviewKey((k) => k + 1);
        if (changed.includes('index.html')) setTab('preview');
      }
      setTurns((list) => [...list, { role: 'assistant', content: data.message || '', changed }]);
    } catch {
      setTurns((list) => [...list, { role: 'assistant', content: t.emptyChat }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bench">
      <div className="bench-side">
        <div className="bench-side-h">
          <span>{t.files}</span>
          <button
            type="button"
            onClick={() => {
              const name = prompt('File name', 'style.css');
              if (name && /^[\w.-]+$/.test(name)) {
                writeFile(name, '');
                setActive(name);
                setTab('code');
              }
            }}
          >
            +
          </button>
        </div>
        <ul className="bench-files">
          {files.map((f) => (
            <li key={f.path}>
              <button
                type="button"
                className={f.path === active ? 'is-active' : ''}
                onClick={() => {
                  setActive(f.path);
                  setTab('code');
                }}
              >
                {f.path}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="bench-reset"
          onClick={() => {
            if (!confirm(t.confirmReset)) return;
            setFiles(STARTER);
            setActive('index.html');
            setTurns([]);
          }}
        >
          {t.reset}
        </button>
      </div>

      <div className="bench-main">
        <div className="bench-tabs">
          <button type="button" className={tab === 'code' ? 'on' : ''} onClick={() => setTab('code')}>
            {t.code}
          </button>
          <button
            type="button"
            className={tab === 'preview' ? 'on' : ''}
            onClick={() => {
              setTab('preview');
              setPreviewKey((k) => k + 1);
            }}
          >
            {t.preview}
          </button>
          <span className="bench-path">{current?.path}</span>
          {remaining !== null && (
            <span className="bench-quota">
              {remaining} {t.left}
            </span>
          )}
        </div>

        {tab === 'code' ? (
          <textarea
            className="bench-editor"
            spellCheck={false}
            value={current?.content ?? ''}
            onChange={(e) => current && writeFile(current.path, e.target.value)}
          />
        ) : html ? (
          <iframe
            key={previewKey}
            className="bench-preview"
            title={t.preview}
            sandbox="allow-scripts"
            srcDoc={html}
          />
        ) : (
          <p className="bench-empty">{t.noPreview}</p>
        )}
      </div>

      <div className="bench-chat">
        <div className="bench-log" ref={chatRef}>
          {turns.length === 0 && <p className="bench-hint">{t.emptyChat}</p>}
          {turns.map((x, i) => (
            <div key={i} className={`bench-turn ${x.role}`}>
              <p>{x.content}</p>
              {x.changed && x.changed.length > 0 && (
                <p className="bench-changed">
                  {x.changed.map((p) => (
                    <button key={p} type="button" onClick={() => { setActive(p); setTab('code'); }}>
                      {p}
                    </button>
                  ))}
                  <span>{t.changed}</span>
                </p>
              )}
            </div>
          ))}
          {busy && <p className="bench-hint">{t.working}</p>}
        </div>
        <form
          className="bench-ask"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <textarea
            rows={2}
            value={input}
            placeholder={t.ask}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <button type="submit" className="btn btn-signal btn-sm" disabled={busy || !input.trim()}>
            {busy ? t.working : t.send}
          </button>
        </form>
        <p className="bench-tip">{t.hint}</p>
      </div>
    </div>
  );
}
