// Client for the vibecoding API (Railway). Nothing here runs at build time.
//
// The token is kept in BOTH localStorage (so the app can read it) and a cookie
// (so the Cloudflare Pages middleware can gate routes before any HTML is sent).
// The cookie is first-party to the site, not to the API domain.

export const API_URL = (import.meta.env.PUBLIC_API_URL as string) || 'https://vibecoding-api-production.up.railway.app';

const TOKEN_KEY = 'vc:token';
const USER_KEY = 'vc:user';
export const COOKIE = 'vc_session';

export interface User {
  id: string;
  email: string;
  name: string;
  lang: 'en' | 'kk';
  createdAt?: string;
  /** Set by the API for the organiser's address. The edge gate is the real check. */
  admin?: boolean;
}

/** One row of the live roster, from GET /admin/users. */
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  lang: 'en' | 'kk';
  created_at: string;
  last_seen_at: string | null;
  xp: number;
  last_page: string | null;
  modules: number;
  labs: number;
  quizzes: number;
}

/* ------------------------------------------------------------------ token */

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export const isSignedIn = () => Boolean(getToken());

function setCookie(token: string, days: number) {
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${COOKIE}=${token}; Path=/; Expires=${exp}; SameSite=Lax${secure}`;
}

function clearCookie() {
  document.cookie = `${COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function saveSession(token: string, user: User, days = 30) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch {}
  setCookie(token, days);
  window.dispatchEvent(new CustomEvent('vc:auth'));
}

export function signOut() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch {}
  clearCookie();
  window.dispatchEvent(new CustomEvent('vc:auth'));
}

/* ------------------------------------------------------------------ calls */

export class ApiError extends Error {
  constructor(
    public code: string,
    public status: number,
    public fields: string[] = [],
  ) {
    super(code);
  }
}

async function call<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string>) };
  if (init.body) headers['Content-Type'] = 'application/json';
  if (auth) {
    const token = getToken();
    if (!token) throw new ApiError('unauthorized', 401);
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(API_URL + path, { ...init, headers });
  } catch {
    throw new ApiError('network', 0);
  }

  if (res.status === 401 && auth) {
    // the token expired or was invalidated — drop it so the UI can recover
    signOut();
    throw new ApiError('unauthorized', 401);
  }

  const data = await res.json().catch(() => ({}) as Record<string, unknown>);
  if (!res.ok) {
    throw new ApiError(String((data as { error?: string }).error ?? 'error'), res.status, (data as { fields?: string[] }).fields ?? []);
  }
  return data as T;
}

export const signup = (body: { email: string; password: string; name: string; lang: string }) =>
  call<{ token: string; user: User; expiresInDays: number }>('/auth/signup', { method: 'POST', body: JSON.stringify(body) });

export const login = (body: { email: string; password: string }) =>
  call<{ token: string; user: User; expiresInDays: number }>('/auth/login', { method: 'POST', body: JSON.stringify(body) });

export const fetchMe = () =>
  call<{ user: User; progress: { earned: Record<string, number>; xp: number; last_page: string | null } }>('/me', {}, true);

export const pushProgress = (body: { earned: Record<string, number>; lastPage?: string; name?: string }) =>
  call<{ earned: Record<string, number>; xp: number }>('/progress', { method: 'PUT', body: JSON.stringify(body) }, true);

export interface Stats {
  users: number;
  activeLast7Days: number;
  byLanguage: Record<string, number>;
  avgXp: number;
  maxXp: number;
  completions: { id: string; n: number }[];
  signupsByDay: { d: string; n: number }[];
}

/** Admin reads. Uses the signed-in organiser's token; the key is the fallback. */
const admin = <T,>(path: string, adminKey?: string) =>
  call<T>(path, adminKey ? { headers: { 'X-Admin-Key': adminKey } } : {}, !adminKey);

export const fetchRoster = (adminKey?: string) => admin<{ users: AdminUser[]; total: number }>('/admin/users', adminKey);
export const fetchStats = (adminKey?: string) => admin<Stats>('/stats', adminKey);

export const track = (kind: string, ref?: string, lang?: string) =>
  call('/event', { method: 'POST', body: JSON.stringify({ kind, ref, lang }) }, true).catch(() => {});
