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

- Added protected coronation state, a 120-second server-enforced setup window,
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

## Evidence-hygiene closure pass (2026-08-27 night)

- W-002 now has strict S2 evidence: the signed DEFENSE_PACK webhook harness
  test was run against the pre-fix commit `95f2f90` and failed red
  (`expected 422 to be 200` — defense grants rejected by the ATTACK_PACK-only
  check), and passes green at HEAD against the real Worker + DO + D1.
- New `scripts/browser-attack-flow.mjs` (`npm run test:browser:attack`) drives
  the real browser loop end to end: injected silent session, granted pack,
  attack sheet, live turn claim, canvas drag-release fire, impact result,
  "fire next shot" re-arm twice, and the S18 summary sheet with the shot
  record. This upgrades the W-009 UI path from static/build evidence to a
  Tier 4 browser runtime proof.
- Harness gained an explicit "miss still consumes the paid shot" assertion
  using a verified max-arc miss aim.
- `docs/ARCHITECTURE_CORRECTIONS.md` now records the per-shot turn model and
  the coronation projection-expiry rule so future agents do not reconcile
  them back to spec wording.

## Remaining external and hardening gates

- Cloudflare production identifiers, Dodo live/test credentials and product
  configuration, registrar DNS, the `api.siegeme.com` route, hosted frontend,
  and hosted smoke remain external deployment work.
- Automated moderation is active; local report handling, moderation case
  persistence, and audit history now exist. Human review operations remain a
  pre-launch hardening gate.
- Human moderation workflow, decoder-backed image normalization, durable/WAF
  rate-limit policy, structured observability/metrics, identity deletion and privacy operations,
  load/fan-out testing, and deployed concurrency remain before a
  production-readiness claim.
- Defense price escalation, Royal Guard pulse, defense placement mode, shared
  Siege Charge/Power Orb/Breaker Shot, and contribution scoring are implemented
  local foundations. Richer social spectator history remains a product slice.

## Camera and local completion reconciliation (2026-08-27)

- Implemented the camera-direction audit locally: pure state/device presets,
  explicit eased position/quaternion handoffs, aim FOV tightening, staged
  coronation defeat framing, portrait framing, and flight-only shake.
- Implemented a defense placement presentation mode with generated-slot glow,
  ghost previews, confirm/cancel controls, versioned authority submission, and
  a camera handoff. Added keyboard aim, elevation, power, and fire controls.
- Added a countdown readout while a turn lease is active.
- Added moderation report/case persistence and secret-gated list/resolve
  routes. Added scheduled D1 cleanup for expired recovery tokens and retained
  webhook payloads; DO command retention remains in the DO-owned store.
- Added the generator-owned moving Power Orb as a real swept ballistic collider
  and visible scene object; an authority hit awards +25 Siege Charge. Aligned
  braces with the attached-damaged-component model and centralized its 65%
  damage multiplier in `GameConfig`.
- Added migration `0006_moderation_cases.sql` and applied it to the clean local
  D1 fixture. The current local run is `reign:001`, world version 1, Core 100.
- Strengthened browser smoke to require a renderer signal and exercise defense
  preview cancellation. Desktop 1280x720 and mobile 390x844 pass with no
  unexpected page errors; screenshots show the fortress rendered.
- Isolated authority smoke passes with 18 accepted shots, CORONATION, wrong
  claimant rejection, new reign generation, recovery claim/reuse protection,
  and protected-turn rejection.

These are local Tier 2 through Tier 4 claims. They do not close production
secrets, Dodo product/webhook setup, DNS, hosted deployment, human moderation
operations, or deployed load evidence.

## Camera direction and remaining local slice (2026-08-27)

- Added a reign-scoped Breaker Shot. Hitting the moving Power Orb fills Siege
  Charge; crossing the threshold arms one bonus shot for that attacker. The
  Worker validates and consumes it exactly once, applies explicit structure
  and Core caps, and resets earned Breaker Shots on succession.
- Added the capped public `/events` read model and local proxy, a details-sheet
  recent-impact list, and a share sheet that uses native share or clipboard
  fallback without granting authority.
- Restored the R2/D1 asset metadata invariant and added compensating R2 object
  deletion if metadata persistence fails.
- Added selectable generated defense slots and bounded coronation CTA/social
  fields with migration `0007_identity_social_fields.sql`.
- Corrected WebSocket gap handling so a resync request does not advance the
  sequence marker before the resync snapshot arrives. Added sequence and
  equal-version regression coverage.
- Added an explicit defeat-cinematic mode, local-only semantic/camera
  diagnostics, and background/visibility aim cancellation. Reduced-motion now
  disables flight shake as well as camera handoff animation.
- Applied local migrations through `0008`, restarted Worker `8787` and Next
  `5188`, and kept both services running for continued testing.
- The root app suite passes 83 tests and the dedicated real Worker/DO/D1
  harness passes 10 isolated tests. The root suite intentionally excludes the
  harness, so both commands are required evidence.

The remaining repository-local product boundaries are decoder-backed pixel
resize/re-encoding, richer social history, broader property and device
testing, and cosmetic game-feel polish. Contribution scoring, archive
reconciliation, the camera handoff, the coronation cinematic, and the
portable asset-container sanitation path are implemented in the current
checkout. Human moderation operations, durable edge/WAF limits, structured
monitoring, spend alerts, and notifications still require operational/provider
decisions. Provider, account, DNS, hosted, and real-payment gates remain
external.

## Contribution and schema closure pass (2026-08-27)

- Added authoritative reign-scoped contribution counters for attack shots,
  hits, damage, Core damage, Power Orb hits, and defense placements.
- Added D1 migration `0008_contributions.sql`, deterministic close-of-reign
  titles, idempotent archive persistence, a privacy-safe `/contributors` read
  model, and details-sheet contributor feedback.
- Added portable image-container sanitation before R2 storage: PNG/JPEG/WebP
  signatures, dimensions, and ancillary metadata are checked or stripped;
  decoder-backed resize/re-encoding remains the explicit hardening boundary
  because the Worker runtime has no native Canvas decoder.
- Corrected checkout-return hydration so URL-dependent payment status renders
  identically during server HTML and the first client hydration pass.
- Added forced-colors and reduced-motion CSS fallbacks and made the turn claim
  a versioned realtime event so public attacker attribution is timely.
