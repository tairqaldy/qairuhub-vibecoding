import { useEffect, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { ApiError, login, saveSession, signup, isSignedIn, getUser, signOut } from '@/lib/api';
import { syncFromServer } from '@/lib/store';

const copy = {
  en: {
    tabSignup: 'Create account',
    tabLogin: 'Sign in',
    name: 'Your name',
    namePh: 'What should we call you?',
    email: 'Email',
    password: 'Password',
    passwordHint: 'At least 8 characters. Use something you do not use anywhere else.',
    submitSignup: 'Create account',
    submitLogin: 'Sign in',
    working: 'One moment…',
    haveAccount: 'Already have an account?',
    noAccount: 'No account yet?',
    signedInAs: 'Signed in as',
    continue: 'Continue',
    signOut: 'Sign out',
    why: 'Why an account',
    whyBody:
      'It saves your XP and where you stopped, so you can start on a laptop and carry on from a phone. It also tells QairuHub how many people are actually learning from this, which is what keeps it free.',
    privacy: 'We store your name, your email and your progress. Nothing else, and nothing is sold or shared.',
    errors: {
      email_taken: 'That email already has an account. Sign in instead.',
      bad_credentials: 'That email and password do not match.',
      rate_limited: 'Too many attempts. Wait fifteen minutes and try again.',
      network: 'Could not reach the server. Check your connection and try again.',
      invalid: 'Check the highlighted fields.',
      server_error: 'Something broke on our side. Try again in a moment.',
      unauthorized: 'Please sign in again.',
    } as Record<string, string>,
    fieldErr: { email: 'That does not look like an email address.', password: 'Passwords need at least 8 characters.', name: 'That name is too long.' } as Record<string, string>,
  },
  kk: {
    tabSignup: 'Аккаунт ашу',
    tabLogin: 'Кіру',
    name: 'Атың',
    namePh: 'Сені қалай атайық?',
    email: 'Email',
    password: 'Құпиясөз',
    passwordHint: 'Кемінде 8 таңба. Басқа жерде қолданбайтын құпиясөз ойлап тап.',
    submitSignup: 'Аккаунт ашу',
    submitLogin: 'Кіру',
    working: 'Бір сәт…',
    haveAccount: 'Аккаунтың бар ма?',
    noAccount: 'Аккаунтың жоқ па?',
    signedInAs: 'Кірген аккаунт',
    continue: 'Жалғастыру',
    signOut: 'Шығу',
    why: 'Аккаунт неге керек',
    whyBody:
      'Ол сенің XP-ің мен қай жерде тоқтағаныңды сақтайды, сондықтан ноутбуктан бастап, телефоннан жалғастыра аласың. Әрі QairuHub-қа бұдан шынымен қанша адам үйреніп жатқанын көрсетеді — курстың тегін болып қалуының себебі де сол.',
    privacy: 'Біз атыңды, email-іңді және прогресіңді ғана сақтаймыз. Басқа ештеңе жоқ, ешкімге сатылмайды әрі берілмейді.',
    errors: {
      email_taken: 'Бұл email-ге аккаунт бұрыннан бар. Кіріп көр.',
      bad_credentials: 'Email мен құпиясөз сәйкес келмейді.',
      rate_limited: 'Тым көп әрекет жасалды. Он бес минуттан кейін қайтала.',
      network: 'Серверге қосыла алмадық. Байланысыңды тексеріп, қайта көр.',
      invalid: 'Белгіленген өрістерді тексер.',
      server_error: 'Бізде бірдеңе бұзылды. Сәлден соң қайтала.',
      unauthorized: 'Қайтадан кіре ғой.',
    } as Record<string, string>,
    fieldErr: { email: 'Бұл email мекенжайына ұқсамайды.', password: 'Құпиясөз кемінде 8 таңба болуы керек.', name: 'Бұл ат тым ұзын.' } as Record<string, string>,
  },
};

export default function AuthForm({ lang, mode = 'signup' }: { lang: Lang; mode?: 'signup' | 'login' }) {
  const t = copy[lang];
  const [tab, setTab] = useState<'signup' | 'login'>(mode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<string[]>([]);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(isSignedIn());
    const on = () => setSignedIn(isSignedIn());
    window.addEventListener('vc:auth', on);
    return () => window.removeEventListener('vc:auth', on);
  }, []);

  const nextUrl = () => {
    if (typeof location === 'undefined') return `/${lang}/learn/`;
    const next = new URLSearchParams(location.search).get('next');
    // only same-origin paths, never an absolute URL from the query string
    return next && next.startsWith('/') && !next.startsWith('//') ? next : `/${lang}/learn/`;
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setFields([]);
    try {
      const res =
        tab === 'signup'
          ? await signup({ email, password, name: name.trim(), lang })
          : await login({ email, password });
      saveSession(res.token, res.user, res.expiresInDays);
      await syncFromServer();
      // A brand-new account has nowhere to continue from, so send it to the
      // profile, where the "where are you starting from?" picker lives. A
      // returning login keeps whatever ?next= brought them here.
      const explicitNext = new URLSearchParams(location.search).has('next');
      location.href = tab === 'signup' && !explicitNext ? `/${lang}/profile/` : nextUrl();
    } catch (err) {
      const e2 = err as ApiError;
      setError(t.errors[e2.code] ?? t.errors.server_error);
      setFields(e2.fields ?? []);
      setBusy(false);
    }
  }

  if (signedIn) {
    const u = getUser();
    return (
      <div className="widget">
        <div className="widget-head">
          <span className="widget-title">{t.signedInAs}</span>
        </div>
        <div className="widget-body">
          <p className="m-0 text-[18px] text-white">{u?.name || u?.email}</p>
          <p className="m-0 mt-1 font-mono text-[13px] text-faint">{u?.email}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn btn-signal" href={nextUrl()}>
              {t.continue} →
            </a>
            <button type="button" className="btn" onClick={() => signOut()}>
              {t.signOut}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const bad = (f: string) => fields.includes(f);

  return (
    <div className="widget">
      <div className="widget-head">
        <div className="flex gap-1.5">
          {(['signup', 'login'] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setTab(k);
                setError(null);
                setFields([]);
              }}
              className={`cursor-pointer rounded-full border px-4 py-1.5 font-mono text-[12px] tracking-wide transition-colors ${
                tab === k ? 'border-signal bg-signal/15 text-signal-soft' : 'border-line text-faint hover:text-white'
              }`}
            >
              {k === 'signup' ? t.tabSignup : t.tabLogin}
            </button>
          ))}
        </div>
      </div>

      <div className="widget-body">
        <form onSubmit={submit} className="grid gap-4" noValidate>
          {tab === 'signup' && (
            <div>
              <label className="label" htmlFor="af-name">
                {t.name}
              </label>
              <input
                id="af-name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePh}
                autoComplete="name"
                maxLength={80}
              />
              {bad('name') && <p className="m-0 mt-1 text-[13px] text-danger">{t.fieldErr.name}</p>}
            </div>
          )}

          <div>
            <label className="label" htmlFor="af-email">
              {t.email}
            </label>
            <input
              id="af-email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              style={bad('email') ? { borderColor: 'var(--color-danger)' } : undefined}
            />
            {bad('email') && <p className="m-0 mt-1 text-[13px] text-danger">{t.fieldErr.email}</p>}
          </div>

          <div>
            <label className="label" htmlFor="af-password">
              {t.password}
            </label>
            <input
              id="af-password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={tab === 'signup' ? 'new-password' : 'current-password'}
              required
              minLength={8}
              style={bad('password') ? { borderColor: 'var(--color-danger)' } : undefined}
            />
            <p className="m-0 mt-1 text-[13px] text-faint">{tab === 'signup' ? t.passwordHint : ''}</p>
            {bad('password') && <p className="m-0 mt-1 text-[13px] text-danger">{t.fieldErr.password}</p>}
          </div>

          <div aria-live="polite">
            {error && (
              <p className="m-0 rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-[15px] text-[#ffd7db]">
                {error}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-signal w-full" disabled={busy}>
            {busy ? t.working : tab === 'signup' ? t.submitSignup : t.submitLogin}
          </button>

          <p className="m-0 text-center text-[14px] text-muted">
            {tab === 'signup' ? t.haveAccount : t.noAccount}{' '}
            <button
              type="button"
              className="cursor-pointer border-0 bg-transparent p-0 text-signal-soft underline"
              onClick={() => {
                setTab(tab === 'signup' ? 'login' : 'signup');
                setError(null);
              }}
            >
              {tab === 'signup' ? t.tabLogin : t.tabSignup}
            </button>
          </p>
        </form>

        <div className="mt-6 rounded-2xl border-l-2 border-signal bg-signal/6 py-3 pr-4 pl-5">
          <p className="m-0 font-mono text-[11px] tracking-widest text-signal-soft uppercase">{t.why}</p>
          <p className="m-0 mt-2 text-[15.5px] leading-relaxed text-[#e8ebfa]">{t.whyBody}</p>
          <p className="m-0 mt-3 text-[13.5px] leading-relaxed text-faint">{t.privacy}</p>
        </div>
      </div>
    </div>
  );
}
