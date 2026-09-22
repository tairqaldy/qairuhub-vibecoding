// Create the schema. Safe to run on every boot: everything is IF NOT EXISTS.
import { q, pool } from './db.js';

const statements = [
  `CREATE TABLE IF NOT EXISTS users (
     id            bigserial PRIMARY KEY,
     email         text NOT NULL,
     email_norm    text NOT NULL UNIQUE,
     password_hash text NOT NULL,
     name          text NOT NULL DEFAULT '',
     lang          text NOT NULL DEFAULT 'en',
     created_at    timestamptz NOT NULL DEFAULT now(),
     last_seen_at  timestamptz NOT NULL DEFAULT now(),
     token_version integer NOT NULL DEFAULT 0
   )`,

  // One row per user. `earned` is the same {id: xp} map the browser keeps.
  `CREATE TABLE IF NOT EXISTS progress (
     user_id    bigint PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
     earned     jsonb NOT NULL DEFAULT '{}'::jsonb,
     xp         integer NOT NULL DEFAULT 0,
     last_page  text,
     updated_at timestamptz NOT NULL DEFAULT now()
   )`,

  // Append-only, for the statistics. No page content, no personal data beyond the user id.
  `CREATE TABLE IF NOT EXISTS events (
     id         bigserial PRIMARY KEY,
     user_id    bigint REFERENCES users(id) ON DELETE CASCADE,
     kind       text NOT NULL,
     ref        text,
     lang       text,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,

  `CREATE INDEX IF NOT EXISTS events_user_created ON events (user_id, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS events_kind_created ON events (kind, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS users_created ON users (created_at DESC)`,

  // Simple per-identifier throttle for the auth endpoints.
  `CREATE TABLE IF NOT EXISTS auth_attempts (
     id         bigserial PRIMARY KEY,
     ident      text NOT NULL,
     ok         boolean NOT NULL,
     created_at timestamptz NOT NULL DEFAULT now()
   )`,
  `CREATE INDEX IF NOT EXISTS auth_attempts_ident ON auth_attempts (ident, created_at DESC)`,
];

export async function migrate() {
  for (const s of statements) await q(s);
  console.log(`[migrate] schema ready (${statements.length} statements)`);
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, '/')}`) {
  migrate()
    .then(() => pool.end())
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
