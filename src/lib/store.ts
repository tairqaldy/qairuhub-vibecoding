// Progress and XP.
//
// localStorage stays the source of truth for the UI, so nothing ever waits on the
// network to feel responsive. The server is a mirror: we merge down on sign-in and
// push up (debounced) on change. Merging always keeps the HIGHER value per id, so
// finishing a module on your phone can never be undone by an older tab syncing.
import { useSyncExternalStore } from 'react';
import { fetchMe, getToken, isSignedIn, pushProgress } from './api';

const KEY = 'vc:progress:v1';
const EVENT = 'vc:progress';

export interface Progress {
  /** id -> xp. ids look like "module:the-tweet", "lab:setup", "quiz:m0-q1", "widget:git-sim" */
  earned: Record<string, number>;
  name?: string;
}

const empty: Progress = { earned: {} };
let cache: Progress | null = null;

function read(): Progress {
  if (cache) return cache;
  if (typeof localStorage === 'undefined') return empty;
  try {
    const raw = localStorage.getItem(KEY);
    cache = raw ? { ...empty, ...JSON.parse(raw) } : { earned: {} };
  } catch {
    cache = { earned: {} };
  }
  return cache!;
}

function write(next: Progress, sync = true) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: progress just will not persist */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
  if (sync) schedulePush();
}

export const getProgress = read;
export const has = (id: string) => id in read().earned;
export const totalEarned = () => Object.values(read().earned).reduce((a, b) => a + b, 0);

/** Award XP once per id. Returns true if this call awarded it. */
export function award(id: string, xp: number): boolean {
  const p = read();
  if (id in p.earned) return false;
  write({ ...p, earned: { ...p.earned, [id]: xp } });
  return true;
}

export function revoke(id: string) {
  const p = read();
  if (!(id in p.earned)) return;
  const { [id]: _drop, ...rest } = p.earned;
  write({ ...p, earned: rest });
}

export function setName(name: string) {
  write({ ...read(), name });
}

export function resetProgress() {
  write({ earned: {} });
}

/* ---------------------------------------------------------------- syncing */

let timer: ReturnType<typeof setTimeout> | undefined;
let pushing = false;

function schedulePush() {
  if (!isSignedIn()) return;
  clearTimeout(timer);
  timer = setTimeout(push, 1500);
}

async function push() {
  if (pushing || !isSignedIn()) return;
  pushing = true;
  try {
    const p = read();
    const res = await pushProgress({
      earned: p.earned,
      name: p.name,
      lastPage: typeof location !== 'undefined' ? location.pathname : undefined,
    });
    // the server merges too, so adopt whatever it settled on
    if (res?.earned) write({ ...read(), earned: res.earned }, false);
  } catch {
    /* offline or signed out — localStorage still holds everything */
  } finally {
    pushing = false;
  }
}

/** Pull the server's copy and merge it into the local one. Call after sign-in and on load. */
export async function syncFromServer(): Promise<void> {
  if (!isSignedIn()) return;
  try {
    const { user, progress } = await fetchMe();
    const local = read();
    const merged: Record<string, number> = { ...(progress.earned ?? {}) };
    for (const [k, v] of Object.entries(local.earned)) merged[k] = Math.max(merged[k] ?? 0, v);

    const changedLocally = JSON.stringify(merged) !== JSON.stringify(progress.earned ?? {});
    write({ earned: merged, name: local.name || user.name }, false);
    if (changedLocally) await push();
  } catch {
    /* keep whatever is local */
  }
}

/** Flush any pending write when the tab goes away, so nothing is lost on close. */
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && getToken()) push();
  });
}

export function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener('vc:auth', cb);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('vc:auth', cb);
    window.removeEventListener('storage', onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => empty);
}
