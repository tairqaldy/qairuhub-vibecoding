import { useMemo, useState } from 'react';
import type { Lang } from '@/data/curriculum';

const copy = {
  en: {
    title: 'Token counter',
    intro: 'Models do not read letters or words. They read tokens. Type anything and watch how it gets chopped up.',
    placeholder: 'Type English, Kazakh, code, emoji…',
    tokens: 'tokens',
    chars: 'characters',
    words: 'words',
    ratio: 'chars / token',
    cost: 'Cost for 1,000 messages this size',
    costNote: 'at $3 per million input tokens',
    presets: 'Try these:',
    note: 'This is a close approximation of how a BPE tokenizer splits text, not the exact tokenizer of any one model. The pattern it shows is real: Latin text packs ~4 characters into a token, Cyrillic text often gets 1–2, so the same sentence in Kazakh can cost 2–3× more.',
    lesson: 'Why you care',
    lessonBody:
      'Your context window, your bill and your speed are all measured in tokens. The same meaning written in Kazakh costs more than in English — so for long agent instructions, English is usually the cheaper language, even when you talk to the user in Kazakh.',
  },
  kk: {
    title: 'Token санағыш',
    intro: 'Модель әріпті де, сөзді де оқымайды. Ол token оқиды. Кез келген нәрсе жаз да, оның қалай бөлінетінін көр.',
    placeholder: 'Ағылшынша, қазақша, код, эмодзи жаз…',
    tokens: 'token',
    chars: 'таңба',
    words: 'сөз',
    ratio: 'таңба / token',
    cost: 'Осындай 1 000 хабарламаның құны',
    costNote: 'миллион кіріс token-і $3 болғанда',
    presets: 'Мынаны байқап көр:',
    note: 'Бұл — BPE tokenizer мәтінді қалай бөлетінінің жуық көрінісі, нақты бір модельдің токенизаторы емес. Бірақ көрсетіп тұрған заңдылық шынайы: латын мәтінінде бір token-ге ~4 таңба сыйса, кириллицада көбіне 1–2 таңба ғана сыяды. Сондықтан бір сөйлем қазақша 2–3 есе қымбатқа түсуі мүмкін.',
    lesson: 'Бұл неге маңызды',
    lessonBody:
      'Контекст терезесі де, шот та, жылдамдық та token-мен өлшенеді. Қазақша жазылған бірдей мағына ағылшыншадан қымбат тұрады. Сондықтан agent-ке арналған ұзын нұсқаулықты ағылшынша жазған тиімді — пайдаланушымен қазақша сөйлессең де.',
  },
};

const presets = [
  { label: 'EN', text: 'Build a sign-up form with email validation and save it to the database.' },
  { label: 'ҚАЗ', text: 'Электрондық поштаны тексеретін тіркелу формасын жасап, дерекқорға сақта.' },
  { label: '{ }', text: 'const user = await db.users.findFirst({ where: { email } });' },
  { label: '🎉', text: '🎉 vibecoding 🚀 qairuhub ✨' },
];

/**
 * Approximate BPE segmentation. Not any model's real tokenizer, but it reproduces the
 * behaviour that matters for teaching: leading spaces join the next token, common English
 * chunks stay whole, non-Latin scripts fragment, punctuation and emoji stand alone.
 */
const COMMON = [
  'ing', 'tion', 'ment', 'able', 'ould', 'ate', 'the', 'and', 'for', 'you', 'that', 'with', 'this',
  'ere', 'ali', 'con', 'pro', 'ent', 'ion', 'ver', 'res', 'ter', 'ers', 'est', 'all', 'ass', 'dat',
  'ail', 'orm', 'ave', 'ed', 'er', 'in', 'on', 'at', 'it', 'is', 'an', 'or', 'ar', 'se', 'st', 're',
  'le', 'ti', 'te', 'de', 'ra', 'ur', 'li', 'ne', 'me', 'us', 'em', 'up', 'to', 'of', 'as', 'be',
];

function tokenize(input: string): string[] {
  const out: string[] = [];
  // split keeping leading spaces attached, like real BPE does
  const chunks = input.match(/\s*[^\s]+|\s+/g) ?? [];
  for (const chunk of chunks) {
    if (/^\s+$/.test(chunk)) {
      out.push(chunk);
      continue;
    }
    const lead = chunk.match(/^\s*/)?.[0] ?? '';
    let rest = chunk.slice(lead.length);
    let prefix = lead;

    while (rest.length > 0) {
      const ch = rest[0];

      // emoji / symbols: one token each (often more in reality)
      if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(ch)) {
        out.push(prefix + ch);
        prefix = '';
        rest = rest.slice(1);
        continue;
      }
      // punctuation stands alone
      if (/[^\p{L}\p{N}]/u.test(ch)) {
        out.push(prefix + ch);
        prefix = '';
        rest = rest.slice(1);
        continue;
      }
      // Cyrillic and other non-Latin scripts fragment into 1-2 char pieces
      if (!/[A-Za-z0-9]/.test(ch)) {
        const take = rest.length > 1 && /[\p{L}]/u.test(rest[1]) ? 2 : 1;
        const piece = rest.slice(0, take);
        out.push(prefix + piece);
        prefix = '';
        rest = rest.slice(piece.length);
        continue;
      }
      // Latin: try a known chunk, else take up to 4 chars
      const lower = rest.toLowerCase();
      const hit = COMMON.find((c) => lower.startsWith(c) && c.length <= rest.length);
      const len = hit ? hit.length : Math.min(4, rest.length);
      out.push(prefix + rest.slice(0, len));
      prefix = '';
      rest = rest.slice(len);
    }
  }
  return out;
}

const HUES = [150, 200, 265, 40, 320, 95];

export default function Tokenizer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [text, setText] = useState(presets[lang === 'kk' ? 1 : 0].text);
  const tokens = useMemo(() => tokenize(text), [text]);

  const chars = [...text].length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const count = tokens.filter((x) => x.trim() !== '').length || (text ? tokens.length : 0);
  const ratio = count ? (chars / count).toFixed(1) : '0';
  const cost = ((count * 1000) / 1_000_000) * 3;

  return (
    <section className="widget">
      <div className="widget-head">
        <span className="widget-title">{t.title}</span>
        <span className="pill pill-act">
          {count} {t.tokens}
        </span>
      </div>
      <div className="widget-body">
        <p className="mt-0 mb-4 text-[16px] text-muted">{t.intro}</p>

        <label className="label" htmlFor="tok-input">
          {t.placeholder}
        </label>
        <textarea
          id="tok-input"
          className="textarea font-mono text-[14px]"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          spellCheck={false}
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[12px] text-faint">{t.presets}</span>
          {presets.map((p) => (
            <button key={p.label} type="button" className="btn btn-sm" onClick={() => setText(p.text)}>
              {p.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-1.5 rounded-2xl border border-line bg-black/40 p-4 font-mono text-[14px] leading-loose">
          {tokens.map((tok, i) => (
            <span
              key={i}
              className="rounded-md px-1 py-0.5 whitespace-pre transition-colors"
              style={{
                background: `hsl(${HUES[i % HUES.length]} 70% 55% / 0.22)`,
                boxShadow: `inset 0 0 0 1px hsl(${HUES[i % HUES.length]} 70% 60% / 0.45)`,
                color: '#fff',
              }}
              title={`#${i + 1}`}
            >
              {tok === ' ' ? '␣' : tok}
            </span>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { v: count, k: t.tokens, c: 'var(--color-signal)' },
            { v: chars, k: t.chars, c: '#fff' },
            { v: words, k: t.words, c: '#fff' },
            { v: ratio, k: t.ratio, c: 'var(--color-ice)' },
          ].map((s) => (
            <div key={s.k} className="rounded-xl border border-line bg-white/3 p-3">
              <div className="font-display text-[28px] leading-none font-extralight" style={{ color: s.c }}>
                {s.v}
              </div>
              <div className="mt-1 font-mono text-[11px] tracking-wide text-faint uppercase">{s.k}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-line bg-white/3 p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[15px] text-muted">{t.cost}</span>
            <span className="font-display text-[26px] leading-none font-light text-amber">${cost.toFixed(2)}</span>
          </div>
          <p className="m-0 mt-1 font-mono text-[11px] text-faint">{t.costNote}</p>
        </div>

        <details className="mt-4 text-[14px] text-faint">
          <summary className="cursor-pointer">ⓘ</summary>
          <p className="mt-2 mb-0 leading-relaxed">{t.note}</p>
        </details>

        <div className="mt-5 rounded-2xl border-l-2 border-signal bg-signal/6 py-3 pr-4 pl-5">
          <p className="m-0 font-mono text-[11px] tracking-widest text-signal uppercase">{t.lesson}</p>
          <p className="m-0 mt-2 text-[16px] leading-relaxed text-[#e8ebfa]">{t.lessonBody}</p>
        </div>
      </div>
    </section>
  );
}
