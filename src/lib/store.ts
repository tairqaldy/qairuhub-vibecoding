// Progress + XP, persisted in localStorage. No accounts, no server.
// Framework-agnostic: React islands use useProgress(); Astro scripts use the functions directly.
import { useSyncExternalStore } from 'react';

const KEY = 'vc:progress:v1';
const EVENT = 'vc:progress';

export interface Progress {
  /** id -> xp awarded. ids look like "module:the-tweet", "lab:setup", "quiz:m0-q1", "widget:git-sim" */
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

function write(next: Progress) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: progress just will not persist */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
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

export function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      cb();
    }
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', onStorage);
  };
}

export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, read, () => empty);
}
