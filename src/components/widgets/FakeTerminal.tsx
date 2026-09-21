import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * A safe, fake shell. It understands a small set of real commands against a fake
 * file tree, so a beginner can build the muscle memory without risking anything.
 */

const copy = {
  en: {
    title: 'Terminal drill',
    intro: 'A real terminal, faked. Nothing here touches your computer. Work through the missions on the right.',
    missions: 'Missions',
    hint: 'Hint',
    done: 'done',
    complete: 'All missions complete. You now know enough terminal to survive any tutorial.',
    type: 'Type a command and press Enter. Try `help`.',
  },
  kk: {
    title: 'Терминал жаттығуы',
    intro: 'Бұл — нағыз терминалдың қауіпсіз көшірмесі. Мұндағы ештеңе компьютеріңе тимейді. Оң жақтағы тапсырмаларды орында.',
    missions: 'Тапсырмалар',
    hint: 'Көмек',
    done: 'дайын',
    complete: 'Барлық тапсырма орындалды. Енді кез келген нұсқаулықтан өтуге жететін терминал білесің.',
    type: 'Команда жазып, Enter бас. `help` деп көр.',
  },
};

interface Dir {
  [name: string]: Dir | string;
}

const initialFs: Dir = {
  'qairu-event': {
    'README.md': '# QAIRU Event Sign-up\n\nA tiny sign-up page for QairuHub events.',
    'package.json': '{\n  "name": "qairu-event",\n  "scripts": { "dev": "astro dev" }\n}',
    '.env.example': 'SUPABASE_URL=\nSUPABASE_ANON_KEY=',
    src: {
      'index.astro': '<h1>QAIRU Event</h1>',
      components: { 'SignupForm.astro': '<form>...</form>' },
    },
  },
};

type Mission = {
  id: string;
  goal: { en: string; kk: string };
  hint: string;
  test: (state: { cwd: string[]; log: string[]; fs: Dir; history: string[] }) => boolean;
};

const missions: Mission[] = [
  {
    id: 'ls',
    goal: { en: 'See what is in the current folder', kk: 'Ағымдағы қалтада не бар екенін көру' },
    hint: 'ls',
    test: (s) => s.history.some((h) => h.trim().split(/\s+/)[0] === 'ls'),
  },
  {
    id: 'cd',
    goal: { en: 'Go into the qairu-event folder', kk: 'qairu-event қалтасына кіру' },
    hint: 'cd qairu-event',
    test: (s) => s.cwd.includes('qairu-event'),
  },
  {
    id: 'cat',
    goal: { en: 'Read the README file', kk: 'README файлын оқу' },
    hint: 'cat README.md',
    test: (s) => s.history.some((h) => /^cat\s+README\.md/.test(h.trim())),
  },
  {
    id: 'mkdir',
    goal: { en: 'Create a folder called notes', kk: '«notes» деген қалта жасау' },
    hint: 'mkdir notes',
    test: (s) => {
      const proj = s.fs['qairu-event'];
      return typeof proj === 'object' && 'notes' in proj;
    },
  },
  {
    id: 'env',
    goal: { en: 'Copy .env.example to .env (the file that must never reach git)', kk: '.env.example-ті .env-ке көшіру (git-ке ешқашан түспеуі керек файл)' },
    hint: 'cp .env.example .env',
    test: (s) => {
      const proj = s.fs['qairu-event'];
      return typeof proj === 'object' && '.env' in proj;
    },
  },
  {
    id: 'back',
    goal: { en: 'Go back up one folder', kk: 'Бір қалта жоғары шығу' },
    hint: 'cd ..',
    test: (s) => s.history.some((h) => /^cd\s+\.\./.test(h.trim())) && !s.cwd.includes('qairu-event'),
  },
];

function clone(d: Dir): Dir {
  return JSON.parse(JSON.stringify(d));
}

export default function FakeTerminal({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [fs, setFs] = useState<Dir>(() => clone(initialFs));
  const [cwd, setCwd] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([t.type]);
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [input, setInput] = useState('');
  const [openHint, setOpenHint] = useState<string | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const state = { cwd, log, fs, history };
  const doneIds = missions.filter((m) => m.test(state)).map((m) => m.id);
  const allDone = doneIds.length === missions.length;

  useEffect(() => {
    if (allDone) award('widget:fake-terminal', 25);
  }, [allDone]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log]);

  function here(tree: Dir, path: string[]): Dir | null {
    let node: Dir | string = tree;
    for (const p of path) {
      if (typeof node !== 'object' || !(p in node)) return null;
      node = node[p];
    }
    return typeof node === 'object' ? node : null;
  }

  function run(raw: string) {
    const cmd = raw.trim();
    const prompt = `~/${cwd.join('/')}${cwd.length ? '' : ''} $ ${cmd}`;
    const out: string[] = [prompt];
    const [name, ...args] = cmd.split(/\s+/);
    const dir = here(fs, cwd);
    let nextFs = fs;
    let nextCwd = cwd;

    switch (name) {
      case '':
        break;
      case 'help':
        out.push(
          'Commands in this drill:',
          '  ls            list what is in this folder',
          '  cd <folder>   go into a folder   (cd .. goes back up)',
          '  pwd           print where you are',
          '  cat <file>    print a file',
          '  mkdir <name>  make a folder',
          '  touch <name>  make an empty file',
          '  cp <a> <b>    copy a file',
          '  rm <name>     delete (asks nothing — careful in real life)',
          '  clear         clear the screen',
        );
        break;
      case 'ls': {
        if (!dir) break;
        const entries = Object.entries(dir).map(([k, v]) => (typeof v === 'object' ? `${k}/` : k));
        out.push(entries.length ? entries.join('   ') : '(empty)');
        break;
      }
      case 'pwd':
        out.push(`/home/you/${cwd.join('/')}`);
        break;
      case 'cd': {
        const target = args[0];
        if (!target || target === '~') nextCwd = [];
        else if (target === '..') nextCwd = cwd.slice(0, -1);
        else if (target === '.') nextCwd = cwd;
        else {
          const node = dir?.[target];
          if (typeof node === 'object') nextCwd = [...cwd, target];
          else out.push(`cd: ${target}: No such directory`);
        }
        break;
      }
      case 'cat': {
        const f = args[0];
        const node = f ? dir?.[f] : undefined;
        if (typeof node === 'string') out.push(...node.split('\n'));
        else out.push(`cat: ${f ?? ''}: No such file`);
        break;
      }
      case 'mkdir': {
        const n = args[0];
        if (!n) out.push('mkdir: missing name');
        else if (dir && n in dir) out.push(`mkdir: ${n}: File exists`);
        else {
          nextFs = clone(fs);
          const d = here(nextFs, cwd);
          if (d) d[n] = {};
        }
        break;
      }
      case 'touch': {
        const n = args[0];
        if (!n) out.push('touch: missing name');
        else {
          nextFs = clone(fs);
          const d = here(nextFs, cwd);
          if (d && !(n in d)) d[n] = '';
        }
        break;
      }
      case 'cp': {
        const [a, b] = args;
        const src = a ? dir?.[a] : undefined;
        if (src === undefined) out.push(`cp: ${a ?? ''}: No such file`);
        else if (!b) out.push('cp: missing destination');
        else {
          nextFs = clone(fs);
          const d = here(nextFs, cwd);
          if (d) d[b] = typeof src === 'string' ? src : clone(src);
        }
        break;
      }
      case 'rm': {
        const n = args.find((a) => !a.startsWith('-'));
        if (!n) out.push('rm: missing name');
        else if (!dir || !(n in dir)) out.push(`rm: ${n}: No such file`);
        else {
          nextFs = clone(fs);
          const d = here(nextFs, cwd);
          if (d) delete d[n];
          out.push(`(removed ${n} — in a real terminal there is no undo)`);
        }
        break;
      }
      case 'clear':
        setLog([]);
        setHistory((h) => [...h, cmd]);
        setInput('');
        setHistIdx(-1);
        return;
      case 'sudo':
        out.push('This drill has no root, and neither should your agent.');
        break;
      default:
        out.push(`${name}: command not found. Type \`help\`.`);
    }

    setFs(nextFs);
    setCwd(nextCwd);
    setLog((l) => [...l, ...out]);
    setHistory((h) => [...h, cmd]);
    setInput('');
    setHistIdx(-1);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') run(input);
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1);
      if (history[idx] !== undefined) {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx < 0) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput('');
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    }
  }

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">
          {doneIds.length}/{missions.length} {t.done}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-5 text-[16px] text-muted">{t.intro}</p>

        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <div className="term" onClick={() => inputRef.current?.focus()}>
            <div className="term-bar">
              <span className="term-dots" aria-hidden="true">
                <i /><i /><i />
              </span>
              <span>bash — ~/{cwd.join('/')}</span>
            </div>
            <div ref={bodyRef} className="term-body h-[320px] overflow-y-auto" aria-live="polite">
              {log.map((l, i) => (
                <div key={i} className={l.includes(' $ ') ? 'text-white' : l.startsWith('  ') || l.includes(': ') ? 'text-[#c3c9e6]' : 'text-[#dbe2f7]'}>
                  {l.includes(' $ ') ? (
                    <>
                      <span className="text-signal">{l.slice(0, l.indexOf('$') + 1)}</span>
                      {l.slice(l.indexOf('$') + 1)}
                    </>
                  ) : (
                    l || ' '
                  )}
                </div>
              ))}
              <div className="mt-1 flex items-center">
                <span className="mr-2 whitespace-nowrap text-signal">~/{cwd.join('/')} $</span>
                <input
                  ref={inputRef}
                  className="flex-1 border-0 bg-transparent p-0 font-mono text-[13.5px] text-white outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKey}
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="terminal input"
                />
              </div>
            </div>
          </div>

          <div>
            <p className="m-0 mb-3 font-mono text-[11px] tracking-widest text-faint uppercase">{t.missions}</p>
            <ol className="m-0 grid list-none gap-2 p-0">
              {missions.map((m) => {
                const ok = doneIds.includes(m.id);
                return (
                  <li key={m.id} className="m-0">
                    <div className={`rounded-xl border px-3 py-2.5 transition-colors ${ok ? 'border-signal/50 bg-signal/8' : 'border-line bg-white/3'}`}>
                      <div className="flex items-start gap-2.5">
                        <span className={`mt-0.5 grid size-5 flex-none place-items-center rounded-full border text-[11px] ${ok ? 'border-signal bg-signal text-signal-ink' : 'border-line-strong text-faint'}`}>
                          {ok ? '✓' : ''}
                        </span>
                        <span className={`text-[14px] leading-snug ${ok ? 'text-faint line-through' : 'text-fg'}`}>{m.goal[lang]}</span>
                      </div>
                      {!ok && (
                        <button
                          type="button"
                          className="mt-1.5 ml-7.5 cursor-pointer border-0 bg-transparent p-0 font-mono text-[11px] text-ice"
                          onClick={() => setOpenHint(openHint === m.id ? null : m.id)}
                        >
                          {openHint === m.id ? <code className="text-signal">{m.hint}</code> : `${t.hint} →`}
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
            {allDone && <p className="mt-4 text-[14px] leading-snug text-signal">{t.complete}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
