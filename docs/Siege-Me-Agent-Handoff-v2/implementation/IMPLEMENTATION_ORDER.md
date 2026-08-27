# Implementation Order

This is sequencing, not a reduced-scope alternate product. Build the production architecture from the beginning.

## Phase A — Foundation

1. Next.js + TypeScript application shell
2. R3F Canvas and renderer lifecycle
3. Rapier initialization with fixed timestep
4. Zustand client UI/session state
5. Cloudflare Worker/Durable Object/D1/R2 boundaries
6. Environment/config validation
7. Domain model types independent of React/Three
8. Semantic world-state schema
9. Procedural world generator interface
10. Deterministic world seed/versioning
11. Durable Object WebSocket connection/broadcast abstraction
12. Error/loading/reconnect state model
13. Mobile viewport/input handling
14. Performance capability probe and graphics-mode state

Exit gate:
- app boots;
- renderer mounts/unmounts safely;
- world snapshot can be loaded/reconstructed;
- connection loss can disable unsafe actions;
- no core game truth lives only in the client renderer.

## Phase B — Procedural Fortress + S00/S01/S02/S03

1. Implement canonical procedural fortress silhouette
2. Semantic component IDs
3. Fixed colliders for intact components
4. Core object and Core state
5. Ruler identity texture surfaces
6. S00 loading
7. S01 reconnect overlay
8. S02 empty throne
9. S03 live spectator shell
10. Compact DOM HUD
11. Visual damage-state mapping
12. Mobile spectator layout

Exit gate:
- S03 uses actual procedural game world, not static concept art;
- same world state reconstructs identically from server snapshot;
- UI does not resemble a dashboard;
- Core/ruler/reign state is readable.

## Phase C — Payments and Entitlements

1. Dodo product/price configuration abstraction
2. Checkout initiation
3. Webhook signature verification
4. Payment persistence
5. Idempotent entitlement issuance
6. Attack entitlement balance
7. Defense entitlement balance
8. Recovery/reconciliation path
9. S07–S11
10. S19 purchase half of defense family

Never grant gameplay from the checkout-return URL alone.

## Phase D — Attack System

1. One-active-attacker lock/lease
2. Queue
3. S12/S13
4. Attack camera
5. Aim/power gesture
6. Trajectory preview
7. Standard cannonball
8. Authoritative/replay-verifiable physics input
9. Damage resolver
10. Component damage stages
11. Destruction/collapse
12. S14–S18
13. S04 live spectator of another attack
14. S05 critical siege
15. Siege Charge + Power Orb + Breaker Shot

## Phase E — Defense System

1. Shield
2. Brace
3. Server-approved placement slots
4. Defense price escalation
5. Defender/ruler purchase
6. S20/S21/S22
7. Royal Guard Charge
8. Royal Shield effect
9. Concurrency rules around attack turns

## Phase F — Succession / Coronation

1. Core defeat transaction
2. DEFEAT_PENDING
3. authoritative conqueror selection
4. S24/S25
5. S26 public identity form
6. URL/logo normalization
7. S27 fortification
8. generate new reign
9. reset per-reign meters/defenses
10. S28 transition
11. S29 dethroned state
12. archive previous reign

## Phase G — Details, History, Safety, Hardening

- S06
- S30–S37
- moderation
- URL safety
- rate limits
- abuse/fraud controls
- analytics
- S42 recovery
- S43 unsupported device
- S44 reduced graphics
- performance budgets
- load/concurrency testing


## Cloudflare authority correction

The active architecture is Cloudflare-first. Current world mutations, queue, turns, Core, shields, entitlement consumption and succession live in one named `SiegeWorld` Durable Object. D1 is the payment/idempotency/history ledger, R2 stores blobs, KV is optional non-authoritative cache/config, and Queues are optional background/retry infrastructure. Do not restore Supabase without an explicit architecture decision.
