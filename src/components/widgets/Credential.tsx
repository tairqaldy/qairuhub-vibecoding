import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/data/curriculum';
import { capstone, certKey, trackById, trackState, type CertId } from '@/data/tracks';
import { award, getProgress, setName as saveName, useProgress } from '@/lib/store';
import { ApiError, fetchCertificates, getUser, issueCertificate, type Credential as Cred } from '@/lib/api';
import { confetti } from '@/lib/confetti';
import { href } from '@/i18n/ui';

/**
 * Claiming and showing one credential.
 *
 * The server re-checks eligibility against its own copy of progress before it
 * issues anything — the browser decides what to show, never what is true. What
 * comes back is a real row with a real id and a real date, which is the whole
 * reason the verify URL means something when a stranger opens it.
 *
 * The printed name is whatever the holder typed. The verify page says so.
 */

const SITE = 'https://vibecoding.qairuhub.com';
// LinkedIn matches a company page by numeric id. Swap ORG_ID in when QairuHub's
// is to hand (it is the number in the company admin URL) and the entry links to
// the page instead of a plain-text employer.
const ORG_NAME = 'QairuHub';
const ORG_ID: string | null = null;

const copy = {
  en: {
    locked: 'Not yet',
    lockedBody: (n: number) => `${n} still to finish, then the exam.`,
    examLeft: 'Pass the exam to unlock the certificate.',
    ready: 'You earned it',
    readyBody: 'Put your name on it. This is what will be printed and what a verifier will see.',
    namePh: 'Your full name',
    claim: 'Claim the certificate',
    claiming: 'Issuing…',
    held: 'Certificate issued',
    id: 'Credential ID',
    issued: 'Issued',
    verify: 'Verification page',
    linkedin: 'Add to LinkedIn',
    download: 'Download PNG',
    copyDetails: 'Copy the details',
    copied: 'Copied',
    manual:
      'If LinkedIn opens an empty form, paste these in: the name, QairuHub as the issuing organisation, the credential ID and the verification URL.',
    failed: 'Could not issue it just now. Try again in a moment.',
    notEligible: 'The server does not see this as finished yet. Refresh the page and try again.',
    signIn: 'Sign in to claim your certificate.',
    nameNeeded: 'Type your name first.',
  },
  kk: {
    locked: 'Әзірге жоқ',
    lockedBody: (n: number) => `Тағы ${n} нәрсе қалды, сосын емтихан.`,
    examLeft: 'Сертификат ашылуы үшін емтиханды тапсыр.',
    ready: 'Сен мұны жеңіп алдың',
    readyBody: 'Атыңды жаз. Сертификатта осы жазылады және тексеруші де осыны көреді.',
    namePh: 'Толық атың',
    claim: 'Сертификатты алу',
    claiming: 'Беріліп жатыр…',
    held: 'Сертификат берілді',
    id: 'Сертификат нөмірі',
    issued: 'Берілген күні',
    verify: 'Тексеру беті',
    linkedin: 'LinkedIn-ге қосу',
    download: 'PNG жүктеу',
    copyDetails: 'Деректерін көшіру',
    copied: 'Көшірілді',
    manual:
      'LinkedIn бос форма ашса, мыналарды қой: атауы, беруші ұйым — QairuHub, сертификат нөмірі және тексеру сілтемесі.',
    failed: 'Дәл қазір бере алмадық. Сәлден соң қайтала.',
    notEligible: 'Сервер мұны әлі аяқталған деп көрмейді. Бетті жаңарт та, қайта көр.',
    signIn: 'Сертификатты алу үшін аккаунтқа кір.',
    nameNeeded: 'Алдымен атыңды жаз.',
  },
};

function linkedInUrl(cred: Cred, name: string) {
  const d = new Date(cred.issued_at);
  const p = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name,
    issueYear: String(d.getFullYear()),
    issueMonth: String(d.getMonth() + 1),
    certId: cred.id,
    certUrl: `${SITE}/verify/${cred.id}`,
  });
  if (ORG_ID) p.set('organizationId', ORG_ID);
  else p.set('organizationName', ORG_NAME);
  return `https://www.linkedin.com/profile/add?${p.toString()}`;
}

export default function Credential({
  lang,
  id,
  credential,
  proves,
}: {
  lang: Lang;
  id: CertId;
  credential: string;
  proves: string;
}) {
  const t = copy[lang];
  const progress = useProgress();
  const track = id === 'capstone' ? null : trackById(id);
  const state = track ? trackState(track, progress.earned) : null;

  const [cred, setCred] = useState<Cred | null>(null);
  const [name, setNameInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setNameInput(getProgress().name || getUser()?.name || '');
    fetchCertificates()
      .then((r) => setCred(r.certificates.find((c) => c.track === id) ?? null))
      .catch(() => {});
  }, [id]);

  const eligible = id === 'capstone' ? progressHasAllCerts(progress.earned) : Boolean(state?.earnedCert);

  async function claim() {
    const who = name.trim();
    if (!who) {
      setError(t.nameNeeded);
      return;
    }
    setBusy(true);
    setError(null);
    try {
      saveName(who);
      const r = await issueCertificate(id, who);
      setCred(r.certificate);
      // Mirror it locally so the profile and the header can show it without a
      // round trip. Zero XP: a credential is a milestone, not points.
      award(certKey(id), 0);
      if (r.issued) confetti(3200);
    } catch (e) {
      if (e instanceof ApiError && e.code === 'unauthorized') setError(t.signIn);
      else if (e instanceof ApiError && e.code === 'not_eligible') setError(t.notEligible);
      else setError(t.failed);
    } finally {
      setBusy(false);
    }
  }

  function download() {
    const c = canvasRef.current;
    if (!c || !cred) return;
    draw(c, credential, cred, proves, lang);
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `${cred.id}.png`;
    a.click();
  }

  function copyDetails() {
    if (!cred) return;
    const text = [
      credential,
      `${ORG_NAME}`,
      `${t.id}: ${cred.id}`,
      `${SITE}/verify/${cred.id}`,
    ].join('\n');
    navigator.clipboard?.writeText(text).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      },
      () => {},
    );
  }

  /* ------------------------------------------------------------------ held */
  if (cred) {
    return (
      <div className="cred is-held">
        <p className="cred-k">
          <span className="tick" aria-hidden="true">
            ✓
          </span>
          {t.held}
        </p>
        <h3>{credential}</h3>
        <dl>
          <div>
            <dt>{t.id}</dt>
            <dd className="mono">{cred.id}</dd>
          </div>
          <div>
            <dt>{t.issued}</dt>
            <dd>{new Date(cred.issued_at).toLocaleDateString(lang === 'kk' ? 'kk-KZ' : 'en-GB')}</dd>
          </div>
        </dl>
        <div className="cred-actions">
          <a className="btn btn-signal btn-sm" href={linkedInUrl(cred, credential)} target="_blank" rel="noopener noreferrer">
            {t.linkedin}
          </a>
          <a className="btn btn-sm" href={`/verify/${cred.id}`} target="_blank" rel="noopener noreferrer">
            {t.verify} ↗
          </a>
          <button type="button" className="btn btn-sm" onClick={download}>
            {t.download}
          </button>
          <button type="button" className="btn btn-sm" onClick={copyDetails}>
            {copied ? t.copied : t.copyDetails}
          </button>
        </div>
        <p className="cred-note">{t.manual}</p>
        <canvas ref={canvasRef} width={1200} height={820} hidden />
      </div>
    );
  }

  /* --------------------------------------------------------------- earned */
  if (eligible) {
    return (
      <div className="cred is-ready">
        <p className="cred-k">{t.ready}</p>
        <h3>{credential}</h3>
        <p className="cred-body">{t.readyBody}</p>
        <div className="cred-claim">
          <input
            className="input"
            value={name}
            maxLength={60}
            placeholder={t.namePh}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <button type="button" className="btn btn-signal" onClick={claim} disabled={busy}>
            {busy ? t.claiming : t.claim}
          </button>
        </div>
        {error && <p className="cred-err">{error}</p>}
      </div>
    );
  }

  /* --------------------------------------------------------------- locked */
  const left = state?.left.length ?? 0;
  return (
    <div className="cred is-locked">
      <p className="cred-k">{t.locked}</p>
      <h3>{credential}</h3>
      <p className="cred-body">{left > 0 ? t.lockedBody(left) : t.examLeft}</p>
      {track && left === 0 && (
        <a className="btn btn-sm" href={href(lang, `tracks/${track.id}`)}>
          {t.examLeft}
        </a>
      )}
    </div>
  );
}

function progressHasAllCerts(earned: Record<string, number>) {
  return ['foundations', 'builder', 'security', 'advanced'].every((t) => `cert:${t}` in earned);
}

/** The downloadable card. Inter only — Courgette has no Kazakh glyphs. */
function draw(canvas: HTMLCanvasElement, credential: string, cred: Cred, proves: string, lang: Lang) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const W = canvas.width;
  const H = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#03040c');
  bg.addColorStop(1, '#070c24');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = 'rgba(43,127,255,.45)';
  ctx.lineWidth = 3;
  ctx.strokeRect(44, 44, W - 88, H - 88);

  ctx.fillStyle = '#6aa6ff';
  ctx.font = '500 22px Inter, sans-serif';
  ctx.fillText('QAIRUHUB · VIBECODING', 96, 132);

  ctx.fillStyle = '#ffffff';
  ctx.font = '300 74px Inter, sans-serif';
  wrap(ctx, credential, 96, 246, W - 192, 82);

  ctx.fillStyle = 'rgba(255,255,255,.72)';
  ctx.font = '400 27px Inter, sans-serif';
  wrap(ctx, proves, 96, 372, W - 192, 40);

  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.font = '500 19px Inter, sans-serif';
  ctx.fillText(lang === 'kk' ? 'КІМГЕ БЕРІЛДІ' : 'ISSUED TO', 96, 520);

  ctx.fillStyle = '#ffffff';
  ctx.font = '500 52px Inter, sans-serif';
  ctx.fillText(cred.holder_name || '—', 96, 582);

  ctx.fillStyle = 'rgba(255,255,255,.45)';
  ctx.font = '400 21px "IBM Plex Mono", monospace';
  ctx.fillText(cred.id, 96, H - 132);
  ctx.fillText(`${SITE}/verify/${cred.id}`, 96, H - 96);

  ctx.textAlign = 'right';
  ctx.fillText(new Date(cred.issued_at).toLocaleDateString(lang === 'kk' ? 'kk-KZ' : 'en-GB'), W - 96, H - 96);
  ctx.textAlign = 'left';
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  let line = '';
  let cursor = y;
  for (const word of String(text).split(' ')) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max && line) {
      ctx.fillText(line, x, cursor);
      line = word;
      cursor += lh;
    } else line = test;
  }
  if (line) ctx.fillText(line, x, cursor);
}
