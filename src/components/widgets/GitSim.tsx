import { useEffect, useMemo, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { award } from '@/lib/store';

/**
 * Visual git. The learner types real git commands and watches the commit graph move.
 * The final mission is the one that matters most in the agent era: undoing a bad commit.
 */

const copy = {
  en: {
    title: 'Git, visually',
    intro:
      'Type real git commands and watch the graph. This is the safest place in the world to break something: press reset and it is gone.',
    missions: 'Missions',
    hint: 'Hint',
    done: 'done',
    reset: 'Reset',
    working: 'Working directory',
    staged: 'Staged',
    clean: 'clean',
    complete:
      'You can now save work, branch, merge and undo. That is 95% of the git anyone actually uses — and all of what you need to supervise an agent.',
  },
  kk: {
    title: 'Git көзбен',
    intro:
      'Нақты git командаларын жазып, графиктің қалай өзгеретінін көр. Бұл — бір нәрсені бұзуға болатын әлемдегі ең қауіпсіз орын: reset бассаң, бәрі жоғалады.',
    missions: 'Тапсырмалар',
    hint: 'Көмек',
    done: 'дайын',
    reset: 'Қайта бастау',
    working: 'Жұмыс қалтасы',
    staged: 'Stage-де',
    clean: 'таза',
    complete:
      'Енді жұмысты сақтай, branch жасай, біріктіре және кері қайтара аласың. Бұл — адамдар шын қолданатын git-тің 95%-ы әрі agent-ті қадағалауға керегінің бәрі.',
  },
};

interface Commit {
  id: string;
  msg: string;
  parent: string | null;
  branch: string;
}

interface State {
  commits: Commit[];
  branches: Record<string, string>; // branch -> commit id
  head: string; // branch name
  working: string[];
  staged: string[];
  log: { cmd: string; out: string[]; err?: boolean }[];
  history: string[];
}

const start = (): State => ({
  commits: [{ id: 'a1b2c3d', msg: 'initial commit', parent: null, branch: 'main' }],
  branches: { main: 'a1b2c3d' },
  head: 'main',
  working: ['index.astro'],
  staged: [],
  log: [{ cmd: '', out: ['Type `git status` to see where you are. `help` lists the commands.'] }],
  history: [],
});

const ids = ['e4f5a6b', 'c7d8e9f', 'b1c2d3e', 'f9a8b7c', 'd5e6f7a', 'a9b8c7d', '3f4e5d6'];

const missions = [
  {
    id: 'status',
    goal: { en: 'Check the state of the repo', kk: 'Репозиторийдің күйін тексеру' },
    hint: 'git status',
    test: (s: State) => s.history.some((h) => h.startsWith('git status')),
  },
  {
    id: 'commit',
    goal: { en: 'Stage your change and commit it', kk: 'Өзгерісті stage-ке қосып, commit жасау' },
    hint: 'git add . && git commit -m "add hero"',
    test: (s: State) => s.commits.length >= 2,
  },
  {
    id: 'branch',
    goal: { en: 'Create a branch called feature and switch to it', kk: '«feature» деген branch жасап, соған ауысу' },
    hint: 'git checkout -b feature',
    test: (s: State) => s.head === 'feature',
  },
  {
    id: 'commit2',
    goal: { en: 'Make a commit on the feature branch', kk: 'feature branch-та commit жасау' },
    hint: 'git add . && git commit -m "signup form"',
    test: (s: State) => s.commits.some((c) => c.branch === 'feature'),
  },
  {
    id: 'merge',
    goal: { en: 'Go back to main and merge feature into it', kk: 'main-ге оралып, feature-ды біріктіру' },
    hint: 'git checkout main && git merge feature',
    test: (s: State) => s.history.some((h) => h.startsWith('git merge')) && s.head === 'main',
  },
  {
    id: 'revert',
    goal: {
      en: 'The agent committed something bad. Undo the last commit without deleting history',
      kk: 'Agent жаман нәрсені commit жасады. Тарихты жоймай, соңғы commit-ті кері қайтар',
    },
    hint: 'git revert HEAD',
    test: (s: State) => s.commits.some((c) => c.msg.startsWith('Revert')),
  },
];

export default function GitSim({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [s, setS] = useState<State>(start);
  const [input, setInput] = useState('');
  const [openHint, setOpenHint] = useState<string | null>(null);

  const doneIds = useMemo(() => missions.filter((m) => m.test(s)).map((m) => m.id), [s]);
  const allDone = doneIds.length === missions.length;

  useEffect(() => {
    if (allDone) award('widget:git-sim', 30);
  }, [allDone]);

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    // support "a && b"
    if (cmd.includes('&&')) {
      cmd.split('&&').forEach((part) => run(part.trim()));
      return;
    }
    setS((prev) => exec(prev, cmd));
    setInput('');
  }

  function exec(prev: State, cmd: string): State {
    const next: State = JSON.parse(JSON.stringify(prev));
    next.history.push(cmd);
    const out: string[] = [];
    let err = false;
    const parts = cmd.split(/\s+/);

    const push = (...lines: string[]) => out.push(...lines);
    const headCommit = next.branches[next.head];

    if (parts[0] === 'help') {
      push(
        'git status                  where am I, what changed',
        'git add .                   stage all changes',
        'git commit -m "message"     save a checkpoint',
        'git log                     list commits',
        'git branch <name>           create a branch',
        'git checkout <name>         switch branch  (-b creates it)',
        'git merge <name>            bring a branch into this one',
        'git revert HEAD             undo the last commit safely',
        'git reset --hard HEAD~1     delete the last commit (destructive)',
      );
    } else if (parts[0] !== 'git') {
      push(`${parts[0]}: not a git command. Type \`help\`.`);
      err = true;
    } else {
      switch (parts[1]) {
        case 'status': {
          push(`On branch ${next.head}`);
          if (!next.staged.length && !next.working.length) push('nothing to commit, working tree clean');
          if (next.staged.length) push('Changes to be committed:', ...next.staged.map((f) => `        new file:   ${f}`));
          if (next.working.length) push('Changes not staged for commit:', ...next.working.map((f) => `        modified:   ${f}`));
          break;
        }
        case 'add': {
          if (!next.working.length) push('nothing to add');
          else {
            next.staged = [...next.staged, ...next.working];
            next.working = [];
            push(`staged ${next.staged.length} file(s)`);
          }
          break;
        }
        case 'commit': {
          const m = cmd.match(/-m\s+["'](.+?)["']/);
          if (!next.staged.length) {
            push('nothing to commit — run `git add .` first');
            err = true;
          } else if (!m) {
            push('commit needs a message: git commit -m "what you did"');
            err = true;
          } else {
            const id = ids[next.commits.length % ids.length];
            next.commits.push({ id, msg: m[1], parent: headCommit, branch: next.head });
            next.branches[next.head] = id;
            next.staged = [];
            next.working = ['index.astro'];
            push(`[${next.head} ${id}] ${m[1]}`, ' 1 file changed');
          }
          break;
        }
        case 'log': {
          const chain: Commit[] = [];
          let cur: string | null = next.branches[next.head];
          while (cur) {
            const c = next.commits.find((x) => x.id === cur);
            if (!c) break;
            chain.push(c);
            cur = c.parent;
          }
          chain.forEach((c) => push(`${c.id}  ${c.msg}`));
          break;
        }
        case 'branch': {
          const name = parts[2];
          if (!name) push(...Object.keys(next.branches).map((b) => (b === next.head ? `* ${b}` : `  ${b}`)));
          else {
            next.branches[name] = headCommit;
            push(`created branch ${name}`);
          }
          break;
        }
        case 'checkout':
        case 'switch': {
          const isNew = parts.includes('-b') || parts.includes('-c');
          const name = parts[parts.length - 1];
          if (isNew) {
            next.branches[name] = headCommit;
            next.head = name;
            push(`Switched to a new branch '${name}'`);
          } else if (name in next.branches) {
            next.head = name;
            push(`Switched to branch '${name}'`);
          } else {
            push(`error: pathspec '${name}' did not match any branch`);
            err = true;
          }
          break;
        }
        case 'merge': {
          const name = parts[2];
          if (!(name in next.branches)) {
            push(`merge: ${name} - not something we can merge`);
            err = true;
          } else {
            const id = ids[next.commits.length % ids.length];
            next.commits.push({ id, msg: `Merge branch '${name}'`, parent: headCommit, branch: next.head });
            next.branches[next.head] = id;
            push(`Merge made by the 'ort' strategy.`, ` ${name} → ${next.head}`);
          }
          break;
        }
        case 'revert': {
          const target = next.commits.find((c) => c.id === next.branches[next.head]);
          if (!target) {
            push('nothing to revert');
            err = true;
          } else {
            const id = ids[next.commits.length % ids.length];
            next.commits.push({ id, msg: `Revert "${target.msg}"`, parent: target.id, branch: next.head });
            next.branches[next.head] = id;
            push(`[${next.head} ${id}] Revert "${target.msg}"`, 'The bad change is undone and the history is intact.');
          }
          break;
        }
        case 'reset': {
          const target = next.commits.find((c) => c.id === next.branches[next.head]);
          if (target?.parent) {
            next.branches[next.head] = target.parent;
            next.commits = next.commits.filter((c) => c.id !== target.id);
            push(`HEAD is now at ${target.parent}`, 'That commit is gone. This is why revert is usually the safer choice.');
          } else {
            push('nothing to reset');
            err = true;
          }
          break;
        }
        default:
          push(`git: '${parts[1]}' is not a git command in this drill. Type \`help\`.`);
          err = true;
      }
    }

    next.log.push({ cmd, out, err });
    return next;
  }

  // lay out the graph
  const branchNames = Object.keys(s.branches);
  const rows = s.commits.map((c, i) => ({ ...c, lane: branchNames.indexOf(c.branch), i }));

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

        <div className="grid gap-4 lg:grid-cols-[1fr_250px]">
          <div className="grid gap-4">
            {/* graph */}
            <div className="rounded-2xl border border-line bg-black/35 p-4">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                {branchNames.map((b) => (
                  <span key={b} className={`pill ${b === s.head ? 'pill-act' : ''}`}>
                    {b === s.head ? '● ' : ''}
                    {b}
                  </span>
                ))}
              </div>
              <div className="grid gap-0">
                {rows
                  .slice()
                  .reverse()
                  .map((c) => (
                    <div key={c.id} className="flex items-center gap-3 py-1.5">
                      <div className="flex" style={{ width: `${Math.max(1, branchNames.length) * 18}px` }}>
                        {branchNames.map((b, li) => (
                          <span key={b} className="flex w-[18px] justify-center">
                            {li === c.lane ? (
                              <span
                                className="size-3 rounded-full"
                                style={{
                                  background: c.msg.startsWith('Revert')
                                    ? 'var(--color-amber)'
                                    : c.msg.startsWith('Merge')
                                      ? 'var(--color-ice)'
                                      : 'var(--color-signal)',
                                  boxShadow: '0 0 10px currentColor',
                                }}
                              />
                            ) : li < Math.max(...rows.map((r) => r.lane)) ? (
                              <span className="h-full w-px bg-white/10" />
                            ) : null}
                          </span>
                        ))}
                      </div>
                      <code className="font-mono text-[12px] text-faint">{c.id}</code>
                      <span className="truncate text-[14px] text-fg">{c.msg}</span>
                      {Object.entries(s.branches)
                        .filter(([, id]) => id === c.id)
                        .map(([b]) => (
                          <span key={b} className="rounded border border-line-strong px-1.5 py-0.5 font-mono text-[10px] text-ice">
                            {b}
                          </span>
                        ))}
                    </div>
                  ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-4 border-t border-line pt-3 font-mono text-[11px] text-faint">
                <span>
                  {t.working}: {s.working.length ? s.working.join(', ') : t.clean}
                </span>
                <span>
                  {t.staged}: {s.staged.length ? s.staged.join(', ') : t.clean}
                </span>
              </div>
            </div>

            {/* console */}
            <div className="term">
              <div className="term-bar">
                <span className="term-dots" aria-hidden="true">
                  <i /><i /><i />
                </span>
                <span>git</span>
              </div>
              <div className="term-body h-[180px] overflow-y-auto" aria-live="polite">
                {s.log.map((l, i) => (
                  <div key={i}>
                    {l.cmd && (
                      <div className="text-white">
                        <span className="text-signal">$ </span>
                        {l.cmd}
                      </div>
                    )}
                    {l.out.map((o, j) => (
                      <div key={j} className={l.err ? 'text-danger' : 'text-[#c3c9e6]'}>
                        {o}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 border-t border-line px-4 py-2.5">
                <span className="font-mono text-[13px] text-signal">$</span>
                <input
                  className="flex-1 border-0 bg-transparent p-0 font-mono text-[13px] text-white outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && run(input)}
                  placeholder="git status"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="git command"
                />
                <button type="button" className="btn btn-sm" onClick={() => setS(start())}>
                  {t.reset}
                </button>
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
                    <div className={`rounded-xl border px-3 py-2.5 ${ok ? 'border-signal/50 bg-signal/8' : 'border-line bg-white/3'}`}>
                      <div className="flex items-start gap-2.5">
                        <span className={`mt-0.5 grid size-5 flex-none place-items-center rounded-full border text-[11px] ${ok ? 'border-signal bg-signal text-signal-ink' : 'border-line-strong text-faint'}`}>
                          {ok ? '✓' : ''}
                        </span>
                        <span className={`text-[14px] leading-snug ${ok ? 'text-faint line-through' : 'text-fg'}`}>{m.goal[lang]}</span>
                      </div>
                      {!ok && (
                        <button
                          type="button"
                          className="mt-1.5 ml-7.5 cursor-pointer border-0 bg-transparent p-0 text-left font-mono text-[11px] text-ice"
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
