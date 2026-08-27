# Siege Me — Spec vs Implementation Status & Gap Audit

**Date:** 2026-08-27
**Authoritative spec:** `docs/Siege-Me-Agent-Handoff/authoritative/FULL_PRODUCT_TECHNICAL_SPEC.md` (4,034 lines, 59 sections + appendices)
**Build order:** `docs/Siege-Me-Agent-Handoff/implementation/IMPLEMENTATION_ORDER.md` (Phases A–G) and spec §53 (Sequences 1–7)
**Evidence basis for this audit:** direct read of the full spec and all source under `src/`, `cloudflare/src/`, `cloudflare/migrations/`, `scripts/`; current local verification on 2026-08-27 (`npm test`, app and Worker typechecks, browser smoke, authority flow smoke); and provider checks recorded in `progress.md`. Historical findings below are reconciled against the current checkout.

This document is a current-state audit against the authoritative spec. It intentionally does not restate the spec; it maps what exists, what is partial, what is missing, and where code reality has drifted from docs.

> **Repo-local reconciliation addendum, 2026-08-27:** The implementation pass
> after this audit added versioned `GameConfig`, authoritative defense price
> escalation, Royal Guard pulse, active-turn defense locking, entitlement and
> queue read models, checkout-return confirmation, S01/S05/S37/S43/S44 local
> surfaces, trajectory preview, history routes, archive outbox and scheduled
> retry, mutation throttling, R2 asset ownership/type/size checks, security
> headers, CI, and private `authoritative_world_state` persistence. The older
> matrix entries below that say these items are absent are historical findings;
> the current remaining gaps are the explicit provider, moderation,
> normalization, shared-meter, camera/input, broader DO integration, and
> production hardening items described in `docs/WORK_BACKLOG.md`.

---

## 1. What the product is (spec digest)

One global throne, one active reign, one canonical persistent world owned server-side by the `SiegeWorld` Durable Object (`global-throne-v1`). Spectators watch free; attackers pay $3 for 3 skill-based shots in single-active-attacker turns; defenders pay an escalating global price ladder ($3→$34 per reign) for finite shields/braces that can never heal Core Integrity. When Core reaches 0 the decisive attacker is crowned, configures a locked public identity (name/type/URL/message/CTA with moderation), the previous reign archives to history, and a fresh procedural fortress generates. All entitlements come only from verified Dodo webhooks; clients never mint shots or submit damage.

## 2. Where we stand — build phase status

| Spec sequence | Build phase | Status | Evidence |
|---|---|---|---|
| 1 — Deterministic local game core | A + B | **~85%** | Generator (`src/game/world/generator.ts`, version-locked, deterministic, tested), swept ballistic solver (`ballistics.ts`, 1/120 timestep, AABB sweeps, tested), cosmetic projectile + impact FX/audio, pointer aim mapping. Missing: camera presets, trajectory preview, keyboard alt-input, collider debug overlay. |
| 2 — Authoritative persistent state | A + B | **~90%** | DO owns snapshot/version/events; WebSocket fanout with hibernation-style accept, resync on `"resync"`, delta broadcast for attacks; client gap-detection and resync tested in browser smoke. Two-browser persistence evidenced by smoke artifacts. |
| 3 — Attack economy | C + D | **~75%** | Checkout → purchase intent → webhook verify (StandardWebhooks) → idempotent grant into DO all exist and were exercised locally. Queue + 20s turn leases + FIFO promotion exist, and the client claims a live turn before entering aim mode. **Payment confirmation polling and hosted Dodo verification remain provider work.** |
| 4 — Conquest & coronation | F | **~85%** | Core-zero succession transition exists (`succession.status="CORE_BREACHED"`), conqueror-bound identity publish via `/identity`, 120-second authority-side fallback, new-reign generation with fresh seed + 60s protection, countdown UI, and `reign_archive` written to D1. **Missing: logo/avatar upload path, S24 cinematic, S29 dethroned view.** |
| 5 — Defense economy | E | **~60%** | `POST /defense/place` transactions work: entitlement consumed inside DO storage transaction, slots validated from generator, shield=2 hits / brace=1 hit, command replay is idempotent, and placement deltas are broadcast. **Missing: escalating price ladder, Royal Guard accrual/pulse, and slot-glow placement flow.** |
| 6 — Shared attacker objective | — | **0%** | No Power Orb, no Siege Charge accrual (field exists in state, never incremented), no Breaker Shot arming. |
| 7 — Social/history/polish | G | **~10%** | Ruler identity sheet + basic details sheet ship; reign archive rows persist but nothing reads them (no history/HoF surface); one WebAudio impact thump; everything else (share cards, notifications, analytics, moderation ops, operator panel, reduced graphics, performance tests) not started. |

## 3. Screen state matrix (S00–S44)

| States | Status |
|---|---|
| S00 boot, S02 empty throne (+claim entry), S03 live spectator home, S06 ruler identity sheet | **Done** |
| S01 reconnecting | **Partial** — mode flips and unsafe actions gate, but no dedicated overlay/copy/steps |
| S04 live attack spectator | **Partial** — spectator sees attack HUD copy/impact FX via broadcast, but attacker attribution chip ("who is attacking") not shown |
| S05 critical siege | **Partial** — Core pulse accelerates when CRITICAL; no distinct critical presentation/HUD warning |
| S07 attack purchase sheet | **Partial** — opens checkout redirect; S08 checkout itself is provider-hosted; **S09 confirming / S10 failed / S11 granted transitions absent** (post-return there is no "Confirming payment…" poll) |
| S12 queue, S13 ready | **Not built client-side** — server returns 202 QUEUED but no UI renders it; no claim window UX |
| S14–S17 aim/flight/resolution/between-shots | **Partial but reachable:** the client claims a turn, enters `attack-aim`, fires through the Worker, animates the projectile, and applies version-aware impact state. Payment-confirmation and between-shot queue polish remain. |
| S18 turn complete summary | Not built |
| S19 defend sheet, S21 resolution toast-ish | **Partial:** finite defense purchase/place contracts and deltas exist; price ladder, slot glow, and richer feedback remain. |
| S20 defense placement mode | Partial — placement POSTs work; valid-slot glow/ghost preview camera framing absent |
| S22 ruler controls, S23 under-siege alert | Not built |
| S24–S29 conquest family | Server transitions exist; all client cinematics/sheets except coronation identity form absent |
| S26 coronation form | Partial — name/type/URL/message fields only; logo upload, CTA selector, social handle, URL metadata autofill, countdown missing |
| S30 details sheet | Partial — meters shown; queue/contributors/recent-events absent |
| S31–S34 history/timeline/HoF/rankings | Not built (data captured server-side) |
| S35 queue details | Not built (optional launch) |
| S36 share, S37 how-it-works | Not built |
| S38 ballistics harness | Exists informally as vitest suites, not player-facing (correctly out of launch scope) |
| S39 identity verification | Not built (spec says "Later") |
| S40/S41 moderation pending/rejected | Validation exists fail-closed; no pipeline/UI |
| S42 purchase recovery | Entitlement balance survives in DO + recovery-code issuance/claim works (30-day hashed tokens in D1); recovery is exposed from the live meta and coronation sheets. |
| S43 unsupported WebGL | Not built |
| S44 reduced graphics | AdaptiveDpr only; no explicit degraded mode |

## 4. Historical issues reconciled against the current checkout

1. **Resolved:** app and Worker typechecks pass after the private/public coronation state split.
2. **Resolved:** Dodo purchase intents and webhook grants branch by `ATTACK_PACK` versus `DEFENSE_PACK`; local defense placement consumes only the matching balance.
3. **Resolved:** the client can claim a turn and sends the authority-issued `turnId` into `fireAttack`.
4. **Resolved:** all authority-produced deltas, including `defense_placed`, use the version-aware client merger.
5. **Resolved:** a 120-second authority-side timeout creates a CTA-free fallback identity, archives the defeated reign, and starts a new protected reign on the next request.
6. **Resolved:** the design review and implementation-order docs now identify the ballistic resolver, turn lease, defense, succession, and recovery status correctly.

## 5. Deviations & design deltas worth a decision

- **Brace model:** spec §17.2 wants braces attached to a *damaged structural component* reducing damage to it by 35%; implementation treats braces as standalone hittable objects occupying slots. Simpler, but weaker than spec intent (does not protect already-wounded walls).
- **Shot damage:** `damageForPower = round(8+power·12)` capped 20 for Core — inside the spec's 8–25 tuning envelope; miss still consumes the shot (correct per product philosophy).
- **Queue model divergence risk:** server FIFO lease logic exists but has zero client loop; building queue UX later may force protocol additions (e.g., a WS `turn_ready` event), which is cheap to add now versus after UI.
- **Camera:** single fixed authored camera vs spec §39 preset set.
- **Prices hardcoded client-side ($3 labels)** while ladder lives nowhere — needs a config source before Phase E completion.

## 6. Hygiene list

- The former `isDodoConfigured()` and inactive asset-pipeline findings are
  superseded by the current checkout and asset route; decoder-backed pixel
  normalization remains an explicit hardening boundary.
- Legacy threshold resolver `resolveAttackIntent` is retained deliberately as
  a test scaffold; paid gameplay uses the versioned ballistic resolver.
- The dedicated Worker/DO/D1 harness now covers attack transactions, queue
  promotion, replay idempotency, coronation, grants, recovery eligibility,
  defense, and archive paths. Broader property, device, and load coverage
  remain pre-launch verification work.
- Production secrets, Dodo products, registrar DNS, `api.siegeme.com` routing, and hosted frontend deployment remain external gates. The Cloudflare D1 UUID is now configured and remote migrations `0001` through `0003` are applied; the dedicated R2 bucket `siegeme-ruler-assets` now exists.

## 7. Recommended next work (priority order)

The recommendations below are historical ordering from the original audit.
Completed local items are tracked in the reconciliation addendum above and
the canonical work universe in `docs/WORK_BACKLOG.md`.

## Current reconciliation addendum, August 27 2026

The historical status matrix and action list above predate the local
completion pass. Current source and focused tests cover camera presets,
trajectory preview, Power Orb collision and Siege Charge, Breaker Shot
arming/consumption, defense placement presentation, recovery, public events,
and mobile/reduced-motion rendering. Read `docs/WORK_BACKLOG.md` for current
local versus external boundaries before using the historical percentages.

**P0 — make the current slice honest and payable**
1. Add load-bearing Worker/DO integration tests around the already-running authority paths, including webhook mismatches, duplicate defense commands, timeout fallback, and eviction/reconstruction.
2. Wire provider-confirmed payment polling and a complete post-checkout attack-ready state around the existing turn/aim contract.
3. Add the defense price ladder, richer placement UX, and shared meter rules before expanding the defense economy.

**P1 — complete the core economy**
4. Add load-bearing Worker/DO integration tests for defense placement, replay, and realtime visibility.
5. Implement the escalating defense price ladder from `reign.defensePriceTier` (config → checkout amount → UI price display).
6. Royal Guard Charge accrual (+25/placement) and Royal Shield Pulse block of next direct Core hit.
7. Expand the R2 asset pipeline from the provisioned bucket to signed upload, sanitation, ownership, and delivery.

**P2 — then broaden**
8. Power Orb + Siege Charge + Breaker Shot (Sequence 6).
9. Brace-to-component alignment decision + spec-conform behavior (or record deviation).
10. History/details enrichment, share card, how-it-works; S01 reconnect overlay polish; camera presets; S44 reduced graphics; rate limiting; admin endpoints; property/integration/E2E tests per §54; deployment cutover (real D1/secrets/DNS/Dodo products/provider approval).
