Original prompt: read the handoff and the agents and operating doctrines and get started building the game, we will use dodopayments and the domain is bought siegeme.com

# Progress

## 2026-08-27

- Read the live handoff kit, authoritative product spec, implementation order, acceptance gates, generated agent context, and current operating doctrine.
- Confirmed this checkout was documentation-only and had no Git repository or existing runtime to preserve.
- Chose the first coherent slice: Next.js app shell, S00 boot, S03 procedural spectator world, a Cloudflare Durable Object authority boundary, and fail-closed Dodo route contracts.
- Added deterministic fortress definitions with semantic component IDs and a server-owned initial world snapshot.
- Added R3F + Rapier scene, Zustand UI/action state, `window.render_game_to_text`, and `window.advanceTime` for the web-game test loop.
- Added a Cloudflare-first authority scaffold. Supabase is not part of the
  runtime plan.

## v2 implementation

- `SiegeWorld` now owns the canonical `global-throne-v1` snapshot, SQLite
  live-entitlement balances, schema-versioned state, FIFO attack leases,
  event sequence, attack transactions, and spectator WebSockets.
- The Worker silently issues signed HttpOnly player sessions and records player
  presence in D1 without requiring signup.
- D1 migrations now define the payment, webhook, entitlement, identity, and
  reign-archive ledger. Dodo checkout and webhook traffic terminate at the
  Worker, with idempotent grant delivery into the Durable Object.
- Next routes remain a presentation proxy and do not persist payment state.

## Review correction evidence

- Local D1 migrations `0001_ledger.sql` and `0002_purchase_intents.sql` apply
  successfully.
- Worker and app typechecks pass separately, including Cloudflare-specific
  `Request`, `Response`, and `WebSocket` types.
- Local signed webhook exercise grants an intent-bound entitlement once; replay
  is idempotent. A valid command without an active turn is rejected without
  consuming that entitlement or changing world version.
- Local synthetic Worker exercise now claims a 20-second turn, resolves the
  generator-derived ballistic collider, consumes one entitlement, promotes a
  queued second player, and returns the identical stored result on command
  replay without a second world-version increment.
- Gemini design-review findings F-01 and F-02 are now exercised in the running
  Worker. F-03 has a fail-closed identity validator, F-04 has pointer capture
  and `touch-action: none`, and Wrangler is pinned to `4.127.0` for the active
  August 2026 compatibility boundary.
- Public identity validation now rejects markup, unsafe URL schemes,
  credentials, private hosts, and punycode hosts before a future coronation
  form can persist or broadcast identity data.
- S00 -> S03, checkout fail-closed state, session cookie flags, WebSocket
  snapshot, identity/details sheets, desktop, and mobile browser smoke pass.
- Wrangler dry-run reports `SiegeWorld`, D1, and R2 bindings. Production
  browser routing can address `api.siegeme.com` directly; local mode retains
  the Next proxy fallback.

## Deliberately gated follow-up

- New-reign generation, coronation identity setup, public identity moderation
  persistence, and D1 reign archival still remain behind the succession phase.
- The older threshold resolver remains a legacy test scaffold and is not used
  by the authoritative ballistic path.
- Production deployment still requires a real D1 database id, Worker secrets,
  Dodo product/webhook configuration, Cloudflare route/DNS, rate limits, and
  independent hosted verification.
