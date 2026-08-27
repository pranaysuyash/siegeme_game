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

## Verification and succession pass (2026-08-27)

- Added protected coronation state, a 60-second server-enforced setup window,
  countdown UI, and action rejection during protection.
- Added a 120-second authority-side coronation timeout. If the conqueror does
  not publish an identity, the Durable Object creates a CTA-free fallback
  identity, archives the defeated reign, starts a fresh protected reign, and
  broadcasts the transition on the next request.
- Added identity publication through the signed player session, automated
  safety moderation persistence, deterministic new-reign generation, and
  previous-reign archival into D1.
- Added one-time hashed recovery codes with a second-device claim path.
- Added defense purchase-kind handling, finite shield/brace entitlements,
  semantic placement slots, defense collision interception, and defense deltas.
- Added turn-claim UX so the client no longer sends the rejected `turn:none`
  placeholder for an aimed shot.
- Added `scripts/authority-flow-smoke.mjs`, covering real Worker sessions,
  entitlement grant boundary, turn leases, ballistic Core breach, wrong
  claimant rejection, new-reign health reset, D1 archive, recovery claim,
  recovery reuse rejection, and protected-turn rejection.
- Local authority evidence: 18 accepted shots, `reign:001` archived at world
  version 19, `reign:002` created at world version 20, recovery claim 200,
  recovery reuse 401, protected turn claim 409.
- Local D1 migration `0003_recovery.sql` applied successfully.
- Clean-state browser evidence: desktop and 390x844 mobile smoke pass after a
  full Worker and Next restart, including WebSocket snapshot, identity and
  recovery sheets, canvas bounds, signed cookie flags, and fail-closed Dodo.
- The local post-succession state was preserved at
  `/private/tmp/siegeme-wrangler-state-v3-20260827-1902/v3` before a clean
  browser fixture was created. It was not deleted.

## Three.js audit pass

- R3F/Drei, fundamentals, geometry, and interaction audits are preserved in
  their project-local audit files.
- Implemented cached projectile vectors, local render-loop interpolation,
  conditional camera shake, Drei instancing, AdaptiveDpr, AdaptiveEvents,
  soft-shadow pipeline configuration, launcher tension feedback, and
  best-effort haptics.
- Runtime browser smoke emitted no unexpected page errors. The renderer uses
  the supported r185 PCF shadow enum and no longer requests the deprecated
  `PCFSoftShadowMap` constant.

## Repo-local completion pass (2026-08-27)

- Added versioned `GameConfig` for attack bounds/damage, turn and coronation
  timing, defense ladder, Royal Guard pulse, and event retention.
- Added authoritative defense price escalation, Royal Guard accrual, one-hit
  Royal Shield Pulse, active-turn defense lock, entitlement read model, queue
  read model, and queued-turn polling.
- Added checkout-return entitlement confirmation UI, S01 reconnecting overlay,
  S05 critical notice, S37 explainer sheet, S43 WebGL fallback, S44 reduced
  graphics behavior, and deterministic early-arc trajectory preview.
- Added read-only history/reign API surfaces, archive outbox with scheduled
  retry, mutation throttling, R2 asset upload/delivery boundary, D1 asset
  metadata migration, security headers, and CI verification workflow.
- Moved new Durable Object writes to `authoritative_world_state` with additive
  migration from legacy `world_snapshot` storage.
- Local evidence after the pass: 38 Vitest tests, lint, dual typecheck, clean
  desktop/mobile browser smoke, authority succession/recovery smoke, local
  D1 migrations `0001` through `0005`, and Wrangler dry-run remain the gates
  to rerun before delivery.

## P0 completion pass (second session, 2026-08-27 evening)

- Extracted the Dodo webhook grant decision into a pure module
  (`cloudflare/src/dodo.ts`) with 8 regression tests; both ATTACK_PACK and
  DEFENSE_PACK intents now grant, with amount/product/currency/status checks
  covered at unit level for the first time.
- The Durable Object now validates entitlement grant kinds instead of accepting
  any string into `live_entitlements`.
- Fixed a real spectator bug surfaced by the browser gate: expired coronation
  protection kept projecting `coronation.protectedUntil`, so Attack/Defend
  stayed hidden until a mutating command cleared the state. The projection now
  emits the window only while it is genuinely active (regression test added),
  and the client treats an expired window as absent.
- Completed the client attack loop: shot log with per-shot records, server-
  confirmed remaining-shot count after each impact, a "fire next shot" re-arm
  affordance (S17), and a turn-summary sheet (S18) when the pack is spent.
- Realtime client now applies `defense_placed` deltas and `reign_started`
  snapshots instead of silently dropping them.
- Full gate green at commit time: eslint clean, app+worker typechecks, 39/39
  vitest, production `next build`, and desktop+mobile browser smoke against
  live wrangler (8787) + Next (5188).

## Remaining external and hardening gates

- Cloudflare production identifiers, Dodo live/test credentials and product
  configuration, registrar DNS, the `api.siegeme.com` route, hosted frontend,
  and hosted smoke remain external deployment work.
- Automated moderation is active; human moderation queue, report handling,
  and moderation audit history remain pre-launch hardening.
- Human moderation workflow, image normalization, durable/WAF rate-limit
  policy, structured observability/metrics, retention and privacy operations,
  load/fan-out testing, and deployed concurrency remain before a
  production-readiness claim.
- Defense price escalation and Royal Guard pulse are now local foundations;
  shared Siege Charge/Power Orb/Breaker Shot, contribution scoring, defense
  placement mode, and social spectator features remain product work.
