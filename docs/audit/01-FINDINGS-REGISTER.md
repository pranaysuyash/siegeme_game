# SiegeMe — Refactor Decision Architect Audit (Findings Register)

- **Persona applied:** `PER-0001 — Refactor Decision Architect` (canonical, expanded; from `/Users/pranay/Desktop/personas_23rdaug26`).
- **Method:** Observe → evidence → root structural cause → scope → invariants → alternatives → decision. Adversarial default: *assume no change is warranted until evidence proves otherwise.*
- **Surfaces audited:** Frontend/game-client, Server/authority/worker, Domain/simulation/world/balance, Governance/quality/ops/doctrine.
- **Audit inputs:** 4 parallel exploration passes over the working tree at commit `e55e13b` (post `c02b874`). No code was modified during the audit.
- **Companion docs:** `02-ASSESSMENT.md` (first-principles / long-term / doctrine alignment + improvements), `03-SESSION-EVIDENCE.md` (this chat, commands + outputs), `04-IMPLEMENTATION-PLAN.md`.

## Reading conventions

- **ID scheme:** `FE-` frontend/client, `SV-` server/authority, `DM-` domain/simulation, `GO-` governance/ops.
- **Explicit** = visible in code/docs. **Implicit** = only inferable / latent.
- **Structural class** uses the Refactor Decision Architect taxonomy (coupling, duplication, missing/misplaced abstraction, boundary erosion, state complexity, divergent change, change amplification, data-shape coupling, temporal coupling, dead code, claimed-vs-implemented gap).
- **Severity** is evidence-weighted: a correctness/security/money/invariant risk outranks aesthetics regardless of code ugliness.

---

## 1. Frontend / game-client (`src/app`, `src/components`, `src/game/client`, `src/game/presentation`)

**Coherent core:** `snapshot` (authoritative `PublicWorldSnapshot`) is a genuine single source of truth with version guards; the realtime layer is sound in its core (sequence action, batch cap, delta-apply with monotonic guards). Problems are localized duplication, two overlapping staleness flags, and a fragile implicit reconnect invariant.

### FE-1 — Orphaned store action `beginAttack` (dead code)
- Evidence: `src/game/client/store.ts:46` declared, `:102-106` implemented, **zero callers** (attack flow is `openSheet("attack")` → `claimTurn` → `setMode("attack-aim")`, `store.ts:130`).
- Class: missing abstraction / dead branch. Explicit. Severity: Low (maintainability).
- Invariant: none. Blast radius: trivial (delete-safe).
- **Resolution (current checkout):** removed the uncalled action and retained the
  sheet-to-claim flow as the only client entry into attack mode.

### FE-2 — Duplicate projectile-completion logic (`completeProjectile` vs `advanceTime`)
- Evidence: `store.ts:191-202` and `:203-210` are near-identical ~10-line blocks; phase→mode map `CORONATION ? "defeat-cinematic" : "spectator"` copy-pasted.
- Class: duplication / divergent change. Explicit. Severity: Medium (attack lifecycle for every shot).
- Invariant: `projectile`, `pendingSnapshot`, `shotLog`, `impactEffect`, `lastResult` set atomically — both must stay identical.

### FE-3 — Snapshot-apply + clock/mode logic duplicated across 3 setters (4 phase→mode rules)
- Evidence: `setSnapshot` `:86-89`, `setRealtimeSnapshot` `:90-93`, `setRealtimeDelta` `:94-98` each recompute `serverClockSkewMs` and derive `mode` from phase; `setSnapshot` uses `ACTIVE?"spectator":"empty"` while others use `reconnecting?…:unchanged`; completion uses `CORONATION?defeat-cinematic:spectator`. **Four** rules.
- Class: duplication / change amplification. Explicit. Severity: High (every world update path).
- Invariant: world-version monotonic guard (`worldVersion < current → no-op`) must be preserved in every copy.

### FE-4 — `serverClockSkew` recomputed in 5+ places
- Evidence: `store.ts:88,92,97,131,148`. No shared `applyAuthorityClock` helper.
- Class: missing abstraction. Explicit. Severity: Low–Medium.

### FE-5 — Entitlements fetch re-implemented in 4 sites
- Evidence: `store.ts:182-187` (`refreshEntitlements`), `SiegeApp.tsx:130,302,328`. Each re-derives `attack`/`breaker`/`defense` counters. Vocab mismatch: client reads `"BREAKER_SHOT"` (`store.ts`) while `AuthoritativeWorldState` exposes `breakerShots[]`.
- Class: missing abstraction / change amplification. Explicit. Severity: Medium (payments/entitlement UX; silent break if server emits a new kind).

### FE-6 — Hardcoded avatar initials `"FH"` placeholder
- Evidence: `SiegeApp.tsx:50` and `:405` render literal `"FH"`, not `snapshot.ruler.displayName`.
- Class: boundary erosion / cosmetic defect. Explicit. Severity: Low but user-visible (breaks published-identity feature S24/S29).
- **Resolution (current checkout):** the identity sheet now derives initials from
  the authority-projected ruler display name, matching the top identity chip.

### FE-7 — Realtime `lastEventSequence` not reset on reconnect/resync (fragile implicit invariant)
- Evidence: `SiegeApp.tsx:493` `let lastEventSequence = 0;` in effect closure; `connect()` re-invoked on `onclose` (`:533`) and `resync` (`:509`) **without resetting marker**; `realtimeSequenceAction` (`realtime.ts:8-12`) returns `"ignore"` whenever `incoming <= lastEventSequence`. `resync` branch (`:506-511`) also does not reseed.
- Class: boundary erosion / fragile hidden contract. Implicit. Severity: High (all live updates lost after a socket blip if server re-sequences per connection).
- Invariant: server event-sequence must be connection-independent across reconnects; `resync` must reseed the marker (it does not).

### FE-8 — Connection loss during an active turn not reflected in `mode`
- Evidence: `onclose` (`:529-534`) sets `mode="reconnecting"` only for `spectator`/`empty`; `fireAttack` guards on `resyncing` (`store.ts:157`) not `reconnecting`. A dropped socket mid-aim leaves UI interactive against a stale world.
- Class: missing handling / boundary erosion. Implicit. Severity: Medium.

### FE-9 — Overloaded `AppMode` enum mixes orthogonal axes
- Evidence: `store.ts:10` unions connection status + interaction state + phase-derived state; callers enumerate specific modes (`SiegeApp.tsx:163,433`).
- Class: missing abstraction / divergent change. Explicit. Severity: Medium (whole UI gating).

### FE-10 — Overlapping staleness flags `resyncing` vs `reconnecting`
- Evidence: `resyncing` (`store.ts:35`) separate from `reconnecting` mode; `fireAttack` blocks on `resyncing` not `reconnecting`; realtime handlers clear `resyncing` (`store.ts:92,96,98`) but `reconnecting` cleared by `onopen` (`SiegeApp.tsx:499`).
- Class: missing abstraction / inconsistent gating. Implicit. Severity: Medium (two flags can disagree about command safety).

### FE-11 — Projectile completion coupled to rAF; two progress-advance paths
- Evidence: `Projectile` `useFrame` advances `projectile.progress` (`GameCanvas.tsx:471-480`) and calls `completeProjectile()` at `>=1`; `advanceTime` (`store.ts:191-197`) also advances it. Backgrounded tab → frozen projectile → stuck in `attack-flight`.
- Class: boundary erosion (state machine ↔ presentation). Implicit. Severity: Medium.

### FE-12 — `pendingSnapshot` duplicates authoritative next world
- Evidence: `fireAttack` stores post-attack world as `pendingSnapshot` (`store.ts:175`); same world also arrives over WS `attack_resolved` (`SiegeApp.tsx:515`). Two sources must agree on `worldVersion`.
- Class: duplicate state source / change amplification. Implicit. Severity: Medium.

### FE-13 — `attack_resolved` applies snapshot AND delta redundantly
- Evidence: `SiegeApp.tsx:515-516` calls both `setRealtimeSnapshot` and `setRealtimeDelta`; the monotonic guard saves it but the double-apply is unnecessary.
- Class: duplication. Explicit. Severity: Low–Medium.

### FE-14 — `turn:none` fallback contradicts backlog W-008 (claimed-vs-implemented gap)
- Evidence: `store.ts:167` still sends `turnId: get().turn?.id ?? "turn:none"`; harness still accepts it (`authority.harness.test.ts:190,270`); W-008 says resolved.
- Class: claimed-vs-implemented gap. Explicit. Severity: Low (defensive fallback; contract muddied).

### FE-15 — `CameraRig` recomputes `cameraPresetFor` twice/frame
- Evidence: `GameCanvas.tsx:74-80` (and `(mode==="empty"?"spectator":mode)` duplicated at `:59` and `:80`).
- Class: duplication / minor perf. Explicit. Severity: Low.

### FE-16 — `benchmarkMode` disables graphics polish but not motion loops
- Evidence: `GameCanvas.tsx:698` `reducedGraphics={graphicsPolicy.reduced || benchmarkMode}`; motion (`Banner`/`Core`/`PowerOrb`/`ImpactBurst`) still runs (`:197,221,379,511`).
- Class: minor inconsistency. Implicit (likely intentional). Severity: Low.

### FE-17 — `submitDefensePlacement` silently drops non-ACTIVE phase
- Evidence: `store.ts:111` `if (!snapshot || !defensePlacement || snapshot.phase !== "ACTIVE") return;` — no `attackError` set; UI stuck in `defense-placement`.
- Class: missing error path. Implicit. Severity: Low (edge race with reign end).

### FE-18 — `generateFortress` re-derived in `defend` sheet (unmemoized)
- Evidence: `SiegeApp.tsx:408` inline `generateFortress(...)`; renderer also calls it (`GameCanvas.tsx:538`, memoized).
- Class: coupling / change amplification. Explicit. Severity: Low.

### FE-19 — Audio settings: three sync mechanisms, no store slice
- Evidence: `localStorage` + CustomEvent (`SiegeApp.tsx:227-239`) + direct read (`GameCanvas.tsx:423-449`). Coherent but unusual boundary.
- Class: boundary / minor duplication. Implicit (acceptable). Severity: Low.

### FE-20 — `attack-requesting` has no timeout/abort
- Evidence: `fireAttack` (`store.ts:161`) awaits authority POST with no `AbortController`/timeout.
- Class: missing resilience. Implicit. Severity: Low.

### FE-21 — Spectators never receive `defeat-cinematic` (claimed-vs-implemented gap)
- Evidence: `defeat-cinematic` only entered in `completeProjectile`/`advanceTime` on `CORONATION` (`store.ts:200,208`) — i.e. only the firing player; WS `attack_resolved` updates `snapshot` but never sets the mode (`SiegeApp.tsx:515`, `DefeatCinematic` requires `mode==="defeat-cinematic"` at `:182`). W-030 claims resolved.
- Class: divergent change / claimed-vs-implemented gap. Implicit. Severity: Medium (signature UX moment asymmetric).

### FE-22 — Realtime `resync` path drops the rest of a batch
- Evidence: `SiegeApp.tsx:506-511` `socket.send("resync"); return;` exits the loop; coupled to FE-7.
- Class: boundary. Implicit. Severity: Low–Medium.

### FE-23 — `graphics-policy` placement
- Evidence: `src/game/client/graphics-policy.ts` pure fn of `(viewportWidth, deviceMemory)`, only used by `GameCanvas.tsx`; `reason` exposed via `window.__THREE_GAME_DIAGNOSTICS__.graphics.reason` — satisfies explainable degradation. Audit claims (Environment/Lightformers/ContactShadows/Bloom) **verified** in `GameCanvas.tsx:94-123,659-698`.
- Class: cohesion (acceptable). Severity: Low. No misplacement defect; could live under `presentation/`.

---

## 2. Server / authority / worker (`cloudflare/`, proxy routes)

**Load-bearing invariants confirmed:** entitlement consumption + damage application atomic in `transactionSync`; command replay/idempotency via `command_id`/`attackCommandFingerprint`; webhook verification fails closed when key unset; `x-siege-player-id` re-derived server-side (client cannot spoof identity); core-integrity monotonic guard; DO eviction/reconstruction harness-covered.

### SV-1 — HIGH: DEFENSE_PACK escalating price ladder vs single static Dodo product
- Evidence: one `DODO_DEFENSE_PRODUCT_ID` (`index.ts:1125`); intent amount from reign-scoped ladder `nextDefensePriceMinor ?? defensePriceForTier(0)` (`index.ts:1132`); checkout sends only `product_id` (`index.ts:1135`); webhook grants only if `totalAmount === intent.expected_amount_minor` (`dodo.ts:36`). Once ladder escalates (W-017 claims `$3→$34`), Dodo fixed price ≠ ladder → `422` → **paid entitlement silently rejected**.
- Class: data-shape coupling / missing abstraction. Explicit code, implicit false assumption. Severity: HIGH (money/entitlement loss in production past tier 0).
- Invariant: "webhook grant matches purchase intent amount" vs "escalating ladder authoritative" are mutually incompatible with one product id. Blast radius: all paid `DEFENSE_PACK` post tier 0.

### SV-2 — HIGH: Webhook returns terminal `422` when intent missing (transient race → permanent entitlement loss)
- Evidence: `/webhooks/dodo` (`index.ts:1158`) looks up intent by `metadata.purchase_intent_id`; missing → `422` (`index.ts:1174`). `webhook_events` inserted via `INSERT OR IGNORE` (`:1166`) so a later retry is `duplicate` and `evaluateDodoPayment` ignores `duplicate` for granting. `reconcileEntitlements` (`index.ts:814`) only scans `PENDING_GRANT` rows — never reconciles an unmatched/`422` webhook.
- Class: temporal coupling / missing deferral-retry contract. Implicit assumption Dodo retries 4xx. Severity: HIGH (silent, unrecoverable money loss on ordering race).

### SV-3 — HIGH: Migration 0009 columns written unconditionally — deploy/migration ordering hazard on money path
- Evidence: `0009_reconciliation_links.sql` adds `payments.purchase_intent_id`, `entitlement_ledger.intent_id`; worker inserts both unconditionally (`index.ts:804-805`). If worker deploys before 0009 applied → SQL "no such column" on every grant.
- Class: code/migration ordering coupling; missing compatibility gate (reverse direction is handled). Explicit. Severity: HIGH (launch-blocking at cutover).

### SV-4 — MED: Dual source of truth for live entitlements (`live_entitlements` JSON never read)
- Evidence: `state.liveEntitlements` written at `index.ts:362,377,394` but never read; all checks read SQL `live_entitlements`. Persisted into `authoritative_world_state` every write (`writeState:283`).
- Class: state complexity / dead state. Explicit. Severity: Medium (JSON bloat + latent divergence trap).

### SV-5 — MED: Silent session issued to any visitor; recovery builds already-expired session
- Evidence: `sessionFor` issues signed anonymous session to every caller (`index.ts:781-785`, `session.ts:52` HttpOnly/Secure/Lax). `/recovery/claim` builds `PlayerSession` with `expiresAt: now` (`index.ts:1025`) — dead/confusing; a future edit reusing it would mint an instantly-invalid cookie.
- Class: boundary erosion / dead-code footgun. Implicit. Severity: Medium (low probability, high confusion).
- **Resolution (current checkout):** recovery now passes only the player identity
  and creation timestamp to the player upsert; the signed recovery session gets
  its normal TTL from `issueSession`, with no expired intermediate session value.

### SV-6 — MED: Realtime broadcast can drop events on DO hibernation
- Evidence: `broadcast` coalesces into `broadcastBuffer`, flushes on `setTimeout` (`index.ts:748-771`); comment acknowledges loss if isolate hibernates before flush; no flush on `webSocketClose`/hibernation. Recovery only via client resync.
- Class: temporal coupling / reliability gap. Implicit. Severity: Medium (spectators can miss events; eventual-consistent via `/world`).

### SV-7 — MED: Defense price captured from ladder but config drift vs Dodo even at tier 0
- Evidence: `expected_amount_minor` at tier 0 = `defensePriceForTier(0)` (`index.ts:1132`) must exactly equal Dodo product price; nothing pushes GameConfig → Dodo; checkout sends no price. Two manually-synced sources.
- Class: data-shape coupling / config split-brain. Implicit. Severity: Medium (typo in either breaks all defense grants; no alerting — W-074 open).

### SV-8 — LOW/MED: God-file boundary erosion in `cloudflare/src/index.ts`
- Evidence: single ~1231-line module: HTTP routing + DO `SiegeWorld` + public worker + payments/webhook + SVG share-card + image sniffing + ballistic orchestration + moderation + recovery; `if`-chain dispatch; internal vs public intermixed.
- Class: missing abstraction / boundary erosion. Explicit. Severity: Low–Medium (change-safety on money/security paths).

### SV-9 — LOW: Stale `recoveredSession` + redundant double event-pruning
- Evidence: `index.ts:1025` unused `recoveredSession`; `pruneStorage` (`:715`) and `pruneEvents` (`:718`) overlap (`pruneStorage:775`, `pruneEvents:286`).
- Class: redundancy / dead code. Explicit. Severity: Low.

### SV-10 — LOW: Hardcoded `baseUrl` "https://authority.internal" in scheduled reconciliation
- Evidence: `scheduled` (`index.ts:1217-1220`) calls `reconcileEntitlements(env, world, "https://authority.internal")`; DO stub ignores host.
- Class: hidden contract / magic constant. Explicit. Severity: Low (fragile if DO stub URL semantics change).

**Backlog cross-checks:** W-017 ("escalating ladder authoritative in … webhook match") contradicted by SV-1/SV-7. The unmatched-webhook gap in SV-2 is now covered locally by retained-event scheduled reconciliation and an intent-arrives-after-webhook harness test; production delivery/alerting remains external. W-078 proxy fallback already resolved (routes use `SIEGE_AUTHORITY_URL` consistently — good thin pass-through). Migration 0009 syntactically safe; only hazard is ordering (SV-3).

---

## 3. Domain / simulation / world / balance (`src/game/domain`, `world`, `simulation`, `balance`, `security`)

> Note: brief referenced `world/authoritative-state.ts` and `world/invariants.ts` — **neither exists**. Authoritative-state construction lives in `world/initial-snapshot.ts`; "finite world invariants" are asserted **only** in `invariants.test.ts`, not enforced by runtime code.

### DM-1 — Breaker projectile is behaviorally inert (dead config)
- Evidence: `GameConfig.attack.breakerStructureMultiplier` (config.ts:17), `breakerCoreDamageCapFraction` (config.ts:18) defined + unit-tested (config.test.ts:25-29) but **zero consumers**; `resolveBallisticShot` (ballistics.ts:90-138) never inspects projectile type; `command-fingerprint.ts:7,26` distinguishes it.
  - Class: divergence / premature abstraction. Explicit. Severity: Medium (paying players get identical damage; double-count risk if "wired" wrongly).
  - **Re-checked (Phase 3): STALE — no code change required.** `breakerStructureMultiplier` and `breakerCoreDamageCapFraction` ARE consumed in `cloudflare/src/index.ts` `handleAttack` (structure damage ×multiplier at `:683`, breaker core cap at `:684-685`, brace-reduced damage at `:720`, structure application at `:726-727`). The audit snapshot predated this wiring.

### DM-2 — `maxCoreDamage` cap not enforced on live path
- Evidence: `attack.ts:27` caps `coreDamage` at 20 only in **legacy** `resolveAttackIntent`; live `damageForPower` (ballistics.ts:140-142) = `baseDamage + power*powerDamage`, equals 20 at `power=1` **by coincidence**; no `Math.min(...,maxCoreDamage)` on live path.
  - Class: missing invariant / fragility. Explicit. Severity: Medium (editing config silently breaks cap).
  - **Resolution (Phase 2):** `damageForPower` (ballistics.ts:140-142) now caps at `Math.min(GameConfig.attack.maxCoreDamage, baseDamage + power*powerDamage)` — enforced on the live path, not by coincidence.

### DM-3 — Authoritative resolver does not validate aim against config bounds
- Evidence: config.ts:7-13 bounds `minElevation..maxPower`; `launchVelocity` (ballistics.ts:75-83) / `resolveBallisticShot` consume raw unbounded yaw/elevation/power. No server-side clamp/validate.
  - Class: missing invariant / validation gap. Explicit. Severity: Medium (malicious client out-of-envelope aim; balance assumptions broken).
  - **Resolution (Phase 2):** `sanitizeBallisticInput` (ballistics.ts) clamps yaw/elevation/power to `GameConfig.attack` bounds inside `resolveBallisticShot` before any geometry is computed.

### DM-4 — `MaterialClass` has no behavioral effect (non-physical)
- Evidence: `MaterialClass` (types.ts:3), per-component assignment (generator.ts:20-30); `damageForPower` (ballistics.ts:140) ignores material; no material multipliers in config. WOOD and STONE take identical damage.
  - Class: domain modeling gap. Explicit. Severity: Medium (siege dynamics non-physical; misleading for tuning).
  - **Resolution (Phase 5):** Reclassified — `materialClass` IS consumed by the renderer (`GameCanvas.tsx`) to color components, so it is retained as a visual-only attribute. The *attack-damage* differential (WOOD vs STONE) remains intentionally inert (no material multipliers in config). DM-4's "no behavioral effect" claim was too broad; corrected to "no damage effect, visual effect present."

### DM-5 — `supportGroup` is dead metadata (no support/collapse system)
- Evidence: `supportGroup` set on components (generator.ts:21-29) but **no consumer**.
  - Class: premature abstraction. Explicit. Severity: Low (misleads maintainers).
  - **Resolution (Phase 5):** `supportGroup` removed from `WorldComponentDefinition` (types.ts) and all generator component literals (generator.ts). No consumer existed.

### DM-6 — Dual source of truth for Core HP; projection silently shadows one
- Evidence: Core HP exists at `components[core:main].hp` (types.ts:38-44) **and** `reign.coreIntegrity` (types.ts:74); `projectPublicWorldSnapshot` overrides component hp with `reign.coreIntegrity` (initial-snapshot.ts:110), discarding stored component hp.
  - Class: state complexity / divergence. Explicit. Severity: Medium (if reducer writes wrong field, core damage is invisible).
  - **Resolution (Phase 2):** single `applyCoreDamage` helper (core-damage.ts) writes `reign.coreIntegrity` AND core component `hp`/state atomically, clamped `[0,coreMaxIntegrity]`; `cloudflare/src/index.ts` `handleAttack` now routes all core damage through it. No shadowed component-hp write remains.

### DM-7 — No damage-application reducer/helper in inspected surface; version/state hand-rolled
- Evidence: `componentStateFromHp` (attack.ts:31-36) exists; no `applyComponentDamage`; `WorldComponentState.version` informational; `applyWorldDelta` (realtime.ts:29) ignores `version`; the authoritative reducer that applies shots lives **outside** inspected surface and is untested here.
- Class: missing abstraction / hidden contract. Implicit. Severity: Medium (invariant violations in external reducer go uncaught).

### DM-8 — Invariant tests poke state directly; never exercise real simulation
- Evidence: `invariants.test.ts:33-51` sets `coreIntegrity` by hand and checks projection; never calls `resolveBallisticShot`. Name promises "deterministic event sequences" the body does not deliver.
  - Class: test gap / premature confidence. Implicit. Severity: Medium (authoritative reducer regressions ship undetected).
  - **Resolution (Phase 2):** `invariants.test.ts` now drives `resolveBallisticShot` + `applyCoreDamage` through a deterministic real-resolver loop, asserting bounded/monotonic `coreIntegrity` (was a hand-set-state poke). The 5s-timeout loop was reduced to deterministic scenarios.

### DM-9 — `realtimeSequenceAction` dead in client; dedup/resync never wired
- Evidence: `realtimeSequenceAction` (realtime.ts:8-12) defined + tested but only consumer in running client absent; `store.ts:5` imports only `applyWorldDelta` (keys on `worldVersion`, realtime.ts:16).
  - Class: divergence / dead code (tested invariant never runs). Explicit. Severity: Medium (gap/duplicate handling relies solely on worldVersion; resync path unreachable).
  - **Resolution (Phase 4):** Wired into `store.setRealtimeDelta` via `lastEventSequence` state (init `0`, reset on full snapshots). `realtimeSequenceAction` now drives `ignore` / `resync` / `apply` for client deltas — the resync path is reachable.

### DM-10 — `eventSequence` and `worldVersion` initialized differently, consumed by different paths
- Evidence: initial `worldVersion:1` (initial-snapshot.ts:12) vs `eventSequence:0` (`:57`) — off-by-one; legacy migration sets `eventSequence: candidate.worldVersion` (`:150`); `applyWorldDelta` orders on `worldVersion`, `realtimeSequenceAction` on `eventSequence`.
  - Class: divergence / hidden contract. Explicit. Severity: Medium (contradictory ordering handling).
  - **Resolution (Phase 2):** `eventSequence` init set to `1` to match `worldVersion:1`; bootstrap guard pristine sentinel updated to `eventSequence !== 1` (and still rejects re-bootstrap via `worldVersion !== 1`). Parity test added in `invariants.test.ts`.

### DM-11 — `resolveAttackIntent` legacy duplicate targeting model inconsistent with ballistics
- Evidence: `attack.ts:13-29` "Legacy threshold fixture"; live uses geometric gating (enclosure `DESTROYED`, ballistics.ts:102). Two models disagree on core reachability.
  - Class: duplication / premature abstraction. Implicit. Severity: Low–Medium (drift if legacy reused).
  - **Resolution (Phase 5):** `resolveAttackIntent` removed from `attack.ts` (and its tests in `attack.test.ts`). `resolveBallisticShot` + `parseBallisticTarget` remain the sole targeting path. `AttackIntent` type retained.

### DM-12 — `royalShieldPulseArmed` / `blockedByRoyalShieldPulse` modeled but never used
- Evidence: `reign.royalShieldPulseArmed` (types.ts:78, initial-snapshot.ts:25,127,141), `AttackIntent.blockedByRoyalShieldPulse` (attack.ts:10); no resolver reads them.
- Class: dead field / domain gap. Explicit. Severity: Medium (paid defense mechanic is a no-op).
- **Resolution (registered incorrectly as deferred — already implemented):** The charge builds on defense placement (`royalGuardCharge += 25`, max 100). When `royalGuardCharge >= 100`, `royalShieldPulseArmed` is set to `true` (`cloudflare/src/index.ts:589`). On the next core hit, `pulseBlocksHit` reads the flag, sets damage to 0, disarms the pulse, and writes `blockedByRoyalShieldPulse: true` in the response (`index.ts:719-723,754`). The mechanic works end-to-end. Register error: "no resolver reads them" was incorrect. No code change needed.

### DM-13 — Balance simulator unrealistic vs live model
- Evidence: `simulator.ts:55-60` "treats every successful hit as direct Core damage"; omits enclosure gating, shield absorption (`config.defense.shieldHits`), brace mitigation (`config.defense.braceDamageMultiplier`), material/wall damage, power-orb charge. `Math.pow(mitigation, Math.min(reign===0?0:defensePlacementsPerReign,8))` (simulator.ts:85) — flat per-placement multiplier, discontinuity first reign.
- Class: balance realism gap. Implicit. Severity: Medium (overstates breach rate; misinforms tuning).

### DM-14 — Power-orb / defense hits return synthetic ids the application must string-parse
- Evidence: `resolveBallisticShot` returns `componentId:"power-orb"` (ballistics.ts:116) and `"defense:<id>"` (ballistics.ts:126); external application must special-case prefixes. No helper.
  - Class: hidden contract / fragility. Implicit. Severity: Medium (misparse → orb damages core or defenses never deplete).
  - **Resolution (Phase 2):** `parseBallisticTarget(componentId, coreComponentId)` helper (target.ts) returns `{kind:'core'|'power-orb'|'defense'|'component'}`; `cloudflare/src/index.ts` `handleAttack` uses it instead of prefix string-checks.

### DM-15 — Determinism relies on float trig; replay fragility off-engine
- Evidence: `powerOrbPosition` (ballistics.ts:26-29) uses `Math.sin/cos(worldVersion)`; float arithmetic in generator. Deterministic within one JS engine only.
  - Class: determinism risk. Implicit. Severity: Low–Medium (cross-engine replay divergence).
  - **Resolution (Phase 5):** Documented the engine assumption with a code comment at the top of `ballistics.ts` (DM-15). Revisit only if replay moves off the worker engine.

### DM-16 — Component-state thresholds duplicated (`attack.ts` vs `initial-snapshot.ts`)
- Evidence: `componentStateFromHp` (attack.ts:31-36) and inline projection (initial-snapshot.ts:110) both hard-code `<=0.25` CRITICAL, `<0.8` DAMAGED.
  - Class: duplication. Explicit. Severity: Low (staging divergence if one changes).
  - **Resolution (Phase 4):** `projectPublicWorldSnapshot` (initial-snapshot.ts) now derives core component state via `componentStateFromHp`, eliminating the inline duplicate thresholds.

### DM-17 — `WorldComponentState.version` dead on client
- Evidence: `applyWorldDelta` (realtime.ts:29) replaces by id regardless of `version`; field never compared.
  - Class: dead field. Explicit. Severity: Low.
  - **Resolution (Phase 5):** `WorldComponentState.version` removed from the type and from every writer (`cloudflare/src/index.ts` handleAttack ×2, `core-damage.ts`, `initial-snapshot.ts` init). `applyWorldDelta` never compared it. Tests updated (`core-damage.test.ts`, `realtime.test.ts`).

### DM-18 — Active-attack label leaks player-id prefix (minor privacy)
- Evidence: `initial-snapshot.ts:98` `label:"Attacker-"+turn.playerId.slice(0,4)` in public snapshot.
  - Class: info disclosure. Explicit (minor). Severity: Low.
  - **Resolution (Phase 4):** Label is now `Attacker #${shotNumber}` — no player-id fragment in the public snapshot. Test updated (`authoritative-state.test.ts`).

**Cross-cutting hidden contracts:** determinism holds only within one engine; core integrity monotonic-non-increasing clamped `[0,coreMaxIntegrity]` enforced only in projection; command fingerprint is the only idempotency guard inspected; public identity (`public-identity.ts`) coherent and well-guarded (no findings).

---

## 4. Governance / quality / ops / doctrine

**Strengths:** genuinely strong CI code gate (lint + dual typecheck + Vitest + **real** Worker/DO/D1 harness + build + wrangler dry-run); honest decision records (`WORK_BACKLOG.md`, `OPEN_DECISIONS_AND_EXTERNAL_GATES.md`) separating local vs external gates; audits reference real source; coherent conventional git history.

### GO-1 — Documented commit-time doctrine hooks do not exist
- Evidence: `AGENT_KICKOFF_PROMPT.txt:27-28` claims managed `pre-commit`/`prepare-commit-msg`/`commit-msg` enforce review trailers + attestation; reality: `core.hooksPath` empty, only `*.sample` in `.git/hooks`, no husky/prepare in `package.json`, no `agent-start/hooks` dir.
- Class: process gap / doctrine boundary erosion. Implicit (docs claim an absent gate). Severity: Medium–High (complacency; nothing enforces trailers).
- Doctrine conflict: `/Users/pranay/Projects/AGENTS.md:81` requires review passes + trailers; repo does not follow documented gate.

### GO-2 — Browser smoke not a CI gate; evidence non-reproducible
- Evidence: `verify.yml:19-23` omits all `test:browser*`; no `cron`; 31 committed artifacts manually produced; `OPEN_DECISIONS:107` admits evidence only via local scripts, not hosted/real-device/prod.
- Class: process gap (missing evidence-tier gate). Explicit (docs admit it). Severity: Medium (Tier-4 launch claims rest on stale artifacts).

### GO-3 — Repo-local `AGENTS.md` does not chain to canonical control-plane doctrine
- Evidence: repo `AGENTS.md` is 9 lines, only Next.js rules block; `CLAUDE.md` → `AGENTS.md`; neither references `/Users/pranay/Projects/AGENTS.md` / `OPERATING_DOCTRINE.md`. Control plane reachable only via `agent-start` generator artifacts.
- Class: boundary erosion / documentation drift. Implicit. Severity: Medium (repo-local tooling never reaches approval gates / evidence-tier discipline).

### GO-4 — `.gitignore` inaccurate about artifact scope; ineffective for tracked debug PNG
- Evidence: `.gitignore:17-21` comment says durable evidence only under `browser-smoke/` but many dirs committed; `artifacts/*-debug.png` (added this session) does not exclude already-tracked `artifacts/authority-debug.png`.
- Class: documentation drift. Implicit. Severity: Low.

### GO-5 — Mislabeled command in `vitest.config.mjs` comment
- Evidence: comment says authority harness runs via `npm run test:authority`; actually `test:authority` = `node scripts/authority-flow-smoke.mjs` while the Vitest Worker/DO/D1 harness is `test:harness`.
- Class: documentation drift. Implicit. Severity: Low (runbook copy-paste error).

### GO-6 — `OPERATING_DOCTRINE.md` copy omits its own SHA-256/timestamp provenance
- Evidence: header states generated copies must record source/version/hash/time, but local copy lists only path + v8.0; provenance partially recoverable via `SESSION_CONTEXT.md:13` (`sha256 ff848618…`).
- Class: provenance gap. Implicit. Severity: Low–Medium (doctrine drift risk).

### GO-7 — No orchestrated `test:browser:all`; partial server self-boot
- Evidence: 7 `test:browser*` scripts, no aggregate; only `browser-isolated-smoke.mjs:39,54` self-spawns servers; others presuppose manual `authority:dev` + `dev`.
- Class: process gap (reproducibility friction). Implicit. Severity: Low–Medium (root cause of GO-2).

---

## Consolidated priority order (Refactor Decision Architect)

**Stop-ship before any production payment cutover (highest evidence-weighted):**
1. SV-1 DEFENSE ladder vs single product (money loss)
2. SV-2 webhook 422 on missing intent (silent money loss)
3. SV-3 migration 0009 ordering (launch-blocking)

**High-leverage structural (next):**
4. FE-3 / FE-2 / FE-4 unify snapshot-apply + mode + clock (one helper)
5. FE-7 / FE-8 / FE-10 / FE-22 realtime reconnect/sequence invariant + single staleness flag
6. DM-7 / DM-8 / DM-6 make authoritative attack-application reducer visible + tested end-to-end; collapse dual core-HP + dual ordering counters (DM-9/DM-10)
7. DM-1 / DM-2 / DM-3 / DM-12 enforce config bounds, `maxCoreDamage`, breaker/shield-pulse behavior inside resolver

**Hygiene / doctrine:**
8. GO-1 install or retract commit hooks; GO-2/GO-7 reproducible browser gate; GO-3 chain doctrine; FE-1, FE-14, SV-9 dead code; FE-6/DM-18 display/privacy.

Full per-finding decisions, first-principles/long-term/doctrine assessment, and improvement options are in `02-ASSESSMENT.md`.
