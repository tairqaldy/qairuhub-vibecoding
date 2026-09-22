import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';
import { labs, modules } from '@/data/curriculum';

/**
 * Reads the aggregate stats endpoint. The admin key is typed by the owner and
 * kept only in this browser's localStorage — it is never part of the build.
 */

interface Stats {
  users: number;
  activeLast7Days: number;
  byLanguage: Record<string, number>;
  avgXp: number;
  maxXp: number;
  completions: { id: string; n: number }[];
  signupsByDay: { d: string; n: number }[];
}

const KEY = 'vc:adminkey';
const titleOf = (id: string) => {
  const [kind, slug] = id.split(':');
  const found = kind === 'module' ? modules.find((m) => m.slug === slug) : labs.find((l) => l.slug === slug);
  return found ? `${kind === 'module' ? 'Module' : 'Lab'} · ${found.title.en}` : id;
};

export default function AdminStats() {
  const [key, setKey] = useState('');
  const [data, setData] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        setKey(saved);
        void load(saved);
      }
    } catch {}
  }, []);

  async function load(k: string) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/stats`, { headers: { 'x-admin-key': k } });
      if (res.status === 401) throw new Error('That key was not accepted.');
      if (!res.ok) throw new Error(`Server returned ${res.status}.`);
      setData((await res.json()) as Stats);
      try {
        localStorage.setItem(KEY, k);
      } catch {}
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load.');
      setData(null);
    } finally {
      setBusy(false);
    }
  }

  const maxDay = Math.max(1, ...(data?.signupsByDay ?? []).map((d) => d.n));
  const totalItems = modules.length + labs.length;

  return (
    <div className="mt-8 grid gap-6">
      <form
        className="flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          void load(key);
        }}
      >
        <div className="min-w-[260px] flex-1">
          <label className="label" htmlFor="adminkey">
            Admin key
          </label>
          <input
            id="adminkey"
            className="input font-mono text-[13px]"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="paste ADMIN_KEY"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-signal" disabled={busy || !key}>
          {busy ? 'Loading…' : 'Load'}
        </button>
        {data && (
          <button
            type="button"
            className="btn"
            onClick={() => {
              try {
                localStorage.removeItem(KEY);
              } catch {}
              setKey('');
              setData(null);
            }}
          >
            Forget key
          </button>
        )}
      </form>

      {error && (
        <p className="m-0 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-[15px] text-[#ffd7db]">{error}</p>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { v: data.users, k: 'accounts', c: 'var(--color-signal-soft)' },
              { v: data.activeLast7Days, k: 'active, last 7 days', c: 'var(--color-ok)' },
              { v: data.avgXp, k: 'average XP', c: '#fff' },
              { v: data.maxXp, k: 'highest XP', c: 'var(--color-lime)' },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl border border-line bg-white/3 p-5">
                <div className="font-display text-[42px] leading-none font-extralight" style={{ color: s.c }}>
                  {s.v}
                </div>
                <div className="mt-2 font-mono text-[11px] tracking-wider text-faint uppercase">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white/3 p-5">
              <p className="m-0 mb-4 font-mono text-[11px] tracking-widest text-faint uppercase">Signups per day</p>
              {data.signupsByDay.length === 0 ? (
                <p className="m-0 text-[15px] text-faint">Nothing yet.</p>
              ) : (
                <div className="flex h-[140px] items-end gap-1">
                  {data.signupsByDay.map((d) => (
                    <div key={d.d} className="flex flex-1 flex-col items-center gap-1.5" title={`${d.d}: ${d.n}`}>
                      <span className="font-mono text-[10px] text-faint">{d.n}</span>
                      <div
                        className="w-full rounded-t bg-signal"
                        style={{ height: `${Math.max(3, (d.n / maxDay) * 108)}px` }}
                      />
                      <span className="font-mono text-[9px] text-faint">{d.d.slice(5)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-line bg-white/3 p-5">
              <p className="m-0 mb-4 font-mono text-[11px] tracking-widest text-faint uppercase">By language</p>
              <div className="grid gap-3">
                {Object.entries(data.byLanguage).map(([l, n]) => (
                  <div key={l}>
                    <div className="mb-1 flex justify-between text-[14px]">
                      <span className="text-fg">{l === 'kk' ? 'Қазақша' : 'English'}</span>
                      <span className="font-mono text-faint">{n}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(n / Math.max(1, data.users)) * 100}%`,
                          background: l === 'kk' ? 'var(--color-pink)' : 'var(--color-signal)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white/3 p-5">
            <p className="m-0 mb-4 font-mono text-[11px] tracking-widest text-faint uppercase">
              Most completed ({data.completions.length} of {totalItems} touched)
            </p>
            {data.completions.length === 0 ? (
              <p className="m-0 text-[15px] text-faint">Nobody has finished anything yet.</p>
            ) : (
              <ol className="m-0 grid list-none gap-2 p-0">
                {data.completions.map((c) => (
                  <li key={c.id} className="flex items-center gap-3">
                    <span className="w-8 flex-none text-right font-mono text-[13px] text-signal-soft">{c.n}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-signal/70"
                        style={{ width: `${(c.n / Math.max(1, data.completions[0].n)) * 100}%` }}
                      />
                    </div>
                    <span className="w-[280px] flex-none truncate text-[14px] text-muted">{titleOf(c.id)}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </>
      )}
    </div>
  );
}
