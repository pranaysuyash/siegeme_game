# Siege Me Cloudflare authority

The Next.js app is a client and presentation shell. This Worker owns the
server boundary for the global throne. The named `SiegeWorld` Durable Object
with id `global-throne-v1` is the only live authority for the current reign,
Core integrity, fortress components, entitlements, and spectator fanout.

D1 is the durable queryable ledger for players, public identities, verified
Dodo webhook events, payments, entitlements, and reign archives. It records
facts and supports recovery. It does not arbitrate live ownership or combat.
R2 is reserved for uploaded logos, avatars, share cards, and replay blobs.

## Local authority

Create `cloudflare/.dev.vars` from the example below. Keep it untracked.

```dotenv
SESSION_SECRET=local-session-secret-change-me
AUTHORITY_INTERNAL_SECRET=local-authority-secret-change-me
DODO_PAYMENTS_ENVIRONMENT=test_mode
```

Apply the local D1 schema once:

```sh
npx wrangler d1 migrations apply siegeme-ledger --local --config cloudflare/wrangler.toml
npm run authority:dev
```

Run Next with `SIEGE_AUTHORITY_URL=http://127.0.0.1:8787` so `/api/world`
and the Worker routes are reachable. The browser receives a silent signed
HttpOnly player session. There is no client fallback and no signup wall.

For a deployed D1 database, replace the placeholder `database_id` in
`wrangler.toml` with the real database id, then apply migrations remotely.

## Production shape

- `siegeme.com`: Next.js presentation deployment on Vercel or Cloudflare Pages.
- `api.siegeme.com`: this Worker, routed through Cloudflare.
- Durable Object `global-throne-v1`: global world state, serialized attack,
  defense, and succession transactions, live entitlements, and WebSocket fanout.
- D1: payment, webhook idempotency, player session presence, entitlement, and
  reign-history ledger.
- R2: customer-provided and generated media that should not live in D1.
- Dodo webhook: Worker endpoint with signature verification, D1 idempotency,
  and idempotent grant delivery into the Durable Object.

The attack endpoint rejects requests until a Dodo-confirmed entitlement is
both recorded in D1 and granted into the Durable Object, and until the player
holds the current turn lease. Once accepted, the Durable Object resolves the
bounded ballistic command against generator-derived colliders and consumes one
shot exactly once. A browser request cannot grant itself a shot.
