import { useEffect, useMemo, useState } from 'react';
import { fetchRoster, fetchStats, getUser, type AdminUser, type Stats } from '@/lib/api';
import { labs, modules, totalXp } from '@/data/curriculum';

/**
 * The organiser's dashboard: the room at a glance, then the roster.
 *
 * It loads with the signed-in organiser's own token, so during a session there
 * is nothing to paste. The ADMIN_KEY field stays as a fallback for a browser
 * that is not signed in.
 *
 * The roster is personal data. It is served only to an address on the admin
 * list, and nothing else in the API ever returns a name or an email.
 */

const KEY = 'vc:adminkey';

const titleOf = (id: string) => {
  const [kind, slug] = id.split(':');
  const found = kind === 'module' ? modules.find((m) => m.slug === slug) : labs.find((l) => l.slug === slug);
  return found ? `${kind === 'module' ? 'Module' : 'Lab'} · ${found.title.en}` : id;
};

/** "4m", "3h", "2d" — short enough to scan a whole column during a session. */
function ago(iso: string | null) {
  if (!iso) return '—';
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 90) return 'now';
  if (s < 3600) return `${Math.round(s / 60)}m`;
  if (s < 86400) return `${Math.round(s / 3600)}h`;
  return `${Math.round(s / 86400)}d`;
}

const isLive = (iso: string | null) => Boolean(iso) && Date.now() - new Date(iso!).getTime() < 20 * 60 * 1000;

type Sort = 'xp' | 'recent' | 'joined' | 'name';

export default function AdminStats() {
  const [key, setKey] = useState('');
  const [needKey, setNeedKey] = useState(false);
  const [data, setData] = useState<Stats | null>(null);
  const [roster, setRoster] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<Sort>('xp');
  const [auto, setAuto] = useState(false);

  // Try the session first: the organiser is already signed in to reach this page.
  useEffect(() => {
    let saved = '';
    try {
      saved = localStorage.getItem(KEY) ?? '';
    } catch {}
    if (saved) setKey(saved);
    void load(saved || undefined, true);
  }, []);

  // During a live session a stale number is worse than none.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => void load(key || undefined, true), 30000);
    return () => clearInterval(id);
  }, [auto, key]);

  async function load(k?: string, quiet = false) {
    if (!quiet) setBusy(true);
    setError(null);
    try {
      const [s, r] = await Promise.all([fetchStats(k), fetchRoster(k)]);
      setData(s);
      setRoster(r.users);
      setNeedKey(false);
      if (k) {
        try {
          localStorage.setItem(KEY, k);
        } catch {}
      }
    } catch (e) {
      const code = e instanceof Error ? e.message : 'error';
      if (code === 'unauthorized') {
        setNeedKey(true);
        setError(k ? 'That key was not accepted.' : null);
      } else {
        setError(code === 'network' ? 'Could not reach the API.' : `Could not load (${code}).`);
      }
      if (!quiet) {
        setData(null);
        setRoster(null);
      }
    } finally {
      setBusy(false);
    }
  }

  const rows = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const list = (roster ?? []).filter(
      (u) => !f || u.name.toLowerCase().includes(f) || u.email.toLowerCase().includes(f),
    );
    const by: Record<Sort, (a: AdminUser, b: AdminUser) => number> = {
      xp: (a, b) => b.xp - a.xp,
      recent: (a, b) => new Date(b.last_seen_at ?? 0).getTime() - new Date(a.last_seen_at ?? 0).getTime(),
      joined: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      name: (a, b) => (a.name || a.email).localeCompare(b.name || b.email),
    };
    return [...list].sort(by[sort]);
  }, [roster, filter, sort]);

  const live = (roster ?? []).filter((u) => isLive(u.last_seen_at)).length;
  const maxDay = Math.max(1, ...(data?.signupsByDay ?? []).map((d) => d.n));
  const totalItems = modules.length + labs.length;
  const me = typeof window === 'undefined' ? null : getUser();

  return (
    <div className="mt-8 grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn btn-signal" onClick={() => void load(key || undefined)} disabled={busy}>
          {busy ? 'Loading…' : 'Refresh'}
        </button>
        <label className="flex cursor-pointer items-center gap-2 text-[14px] text-muted">
          <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
          Auto-refresh every 30s
        </label>
        {me?.email && <span className="font-mono text-[12px] text-faint">signed in as {me.email}</span>}
      </div>

      {needKey && (
        <form
          className="flex flex-wrap items-end gap-3 rounded-2xl border border-line bg-white/3 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            void load(key);
          }}
        >
          <div className="min-w-[260px] flex-1">
            <label className="label" htmlFor="adminkey">
              Admin key
            </label>
            <p className="m-0 mb-2 text-[13px] text-faint">
              Your session was not accepted. Sign in with the organiser account, or paste ADMIN_KEY.
            </p>
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
            Load
          </button>
        </form>
      )}

      {error && (
        <p className="m-0 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-[15px] text-[#ffd7db]">{error}</p>
      )}

      {data && (
        <>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {[
              { v: data.users, k: 'accounts', c: 'var(--color-signal-soft)' },
              { v: live, k: 'in the room now', c: 'var(--color-pink)' },
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

          {/* ---------------------------------------------------------- roster */}
          <div className="rounded-2xl border border-line bg-white/3 p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <p className="m-0 mr-auto font-mono text-[11px] tracking-widest text-faint uppercase">
                Who is here ({rows.length})
              </p>
              <input
                className="input max-w-[220px] text-[14px]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Find a name or email"
              />
              <select className="input max-w-[170px] text-[14px]" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="xp">Most XP</option>
                <option value="recent">Last seen</option>
                <option value="joined">Newest</option>
                <option value="name">Name</option>
              </select>
            </div>

            {rows.length === 0 ? (
              <p className="m-0 text-[15px] text-faint">{roster ? 'Nobody matches that.' : 'Nobody yet.'}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="text-left font-mono text-[10px] tracking-widest text-faint uppercase">
                      <th className="py-2 pr-3 font-normal">Person</th>
                      <th className="py-2 pr-3 font-normal">Lang</th>
                      <th className="py-2 pr-3 text-right font-normal">XP</th>
                      <th className="py-2 pr-3 font-normal">Progress</th>
                      <th className="py-2 pr-3 text-right font-normal">Mod</th>
                      <th className="py-2 pr-3 text-right font-normal">Labs</th>
                      <th className="py-2 pr-3 text-right font-normal">Seen</th>
                      <th className="py-2 font-normal">Last page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((u) => (
                      <tr key={u.id} className="border-t border-line align-middle">
                        <td className="py-2.5 pr-3">
                          <span className="flex items-center gap-2">
                            <span
                              className="inline-block h-1.5 w-1.5 flex-none rounded-full"
                              style={{ background: isLive(u.last_seen_at) ? 'var(--color-ok)' : 'transparent' }}
                              title={isLive(u.last_seen_at) ? 'active in the last 20 minutes' : ''}
                            />
                            <span className="min-w-0">
                              <span className="block truncate text-fg">{u.name || '—'}</span>
                              <span className="block truncate font-mono text-[11.5px] text-faint">{u.email}</span>
                            </span>
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 font-mono text-[12px] text-faint">{u.lang}</td>
                        <td className="py-2.5 pr-3 text-right font-mono text-signal-soft">{u.xp}</td>
                        <td className="py-2.5 pr-3">
                          <span className="block h-1.5 w-[90px] overflow-hidden rounded-full bg-white/10">
                            <span
                              className="block h-full rounded-full bg-signal"
                              style={{ width: `${Math.min(100, (u.xp / Math.max(1, totalXp)) * 100)}%` }}
                            />
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 text-right font-mono text-[12px] text-muted">{u.modules}</td>
                        <td className="py-2.5 pr-3 text-right font-mono text-[12px] text-muted">{u.labs}</td>
                        <td className="py-2.5 pr-3 text-right font-mono text-[12px] text-faint">{ago(u.last_seen_at)}</td>
                        <td className="py-2.5 max-w-[220px] truncate font-mono text-[11.5px] text-faint">
                          {u.last_page ?? '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
