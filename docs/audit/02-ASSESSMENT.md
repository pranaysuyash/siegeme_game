# SiegeMe — Findings Assessment (First-Principles / Long-Term / Doctrine Alignment)

Companion to `01-FINDINGS-REGISTER.md`. Each finding is scored on three axes and given a **Refactor Decision Architect outcome**:

- **First-principles:** does the code/model rest on bedrock physics/domain truth and a single coherent source of truth, or on accidents, duplication, and unverified assumption?
- **Long-term:** does the current shape compound leverage for planned capabilities (more reigns, payments, realtime scale, real-device/prod evidence) or accrue interest-bearing debt?
- **Doctrine alignment:** does it satisfy the canonical control-plane doctrine (`/Users/pranay/Projects/AGENTS.md`, `OPERATING_DOCTRINE.md` v8.0) — evidence tiers, approval/stop gates, no silent "done", provenance, salvage, single instruction source?

**Outcome vocabulary:** `APPROVE` (fix now), `APPROVE NARROW` (fix with tighter scope), `PRECONDITIONS` (needs a gate/test first), `DEFER` (monitor), `REJECT` (not worth it), `RECLASSIFY` (different work type).

## Current-checkout reconciliation, August 28 2026

The findings below remain historical assessment provenance. The following
approved simulation controls are now implemented in the canonical source:

- `sanitizeBallisticInput` bounds Worker-side aim input to `GameConfig` before
  the deterministic resolver runs, and `damageForPower` applies the configured
  Core cap.
- `applyCoreDamage` is the single authority path that updates Core Integrity
  and the derived Core component stage together, preserving non-increasing
  integrity.
- `parseBallisticTarget` gives Power Orb, defense, Core, and generic structure
  hits typed target branches instead of inline prefix parsing.

Current evidence for these changes is the 137-test app suite, 19-test real
Worker/DO/D1 harness, dual typecheck, lint, production build, Wrangler
dry-run, and the passing local browser matrix. The original finding text is
not rewritten because it records what was observed at audit time. The late
intent ordering race is now covered by scheduled reconciliation: a verified
Dodo payment event retained before its purchase intent arrives is revalidated
and granted through the idempotent entitlement path.

---

## A. Stop-ship payment/authority findings (SV-1, SV-2, SV-3)

### SV-1 — DEFENSE ladder vs single static Dodo product
- **First-principles:** FAIL. Two independent pricing authorities (GameConfig ladder vs Dodo catalog) with no reconciliation primitive is a classic split-brain; the system cannot tell the truth about what a defense costs.
- **Long-term:** FAIL. Every paid defense past tier 0 is silently rejected → revenue channel dies exactly as the game matures. High-interest debt.
- **Doctrine:** FAIL. `OPEN_DECISIONS` W-017 is marked "Resolved" while the implementation cannot satisfy it → a silent "done" (doctrine forbids this).
- **Decision: APPROVE (RECLASSIFY as payment-architecture fix).** Improvements: (a) per-tier `DODO_DEFENSE_PRODUCT_ID` map keyed by `nextDefensePriceTier`; or (b) charge a fixed product and grant a fixed quantity, dropping ladder enforcement from the payment path (ladder stays as *display* only); or (c) pass `amount`+`currency` to Dodo checkout so the product is price-less. Pick (b) or (c) — smallest scope that removes the contradiction. Add a test that fires a webhook at tier>0.

### SV-2 — Webhook 422 on missing intent
- **First-principles:** FAIL. A transient ordering race should never convert to permanent entitlement loss; idempotency must be the default, not the lucky case.
- **Long-term:** FAIL. Unrecoverable money loss with no alerting; erodes trust in the payment substrate.
- **Doctrine:** FAIL. `reconcileEntitlements` claims a safety net that does not cover the unmatched case → silent gap.
- **Decision: APPROVE (implemented locally, external operations remain).** The verified webhook is retained when its purchase intent is not yet present; scheduled reconciliation later scans recent paid Dodo events, revalidates the intent against product, amount, currency, kind, and pending state, then uses the idempotent grant path. The real Worker/DO/D1 harness covers intent-arrives-after-webhook. Provider delivery, alerting, and production scheduling remain external release gates.

### SV-3 — Migration 0009 ordering hazard
- **First-principles:** FAIL. Code must not assume a migration that may not yet be applied; deploy order is a real contract, not an accident.
- **Long-term:** FAIL. Launch-blocking at cutover; undiscovered because harness applies all `.sql`.
- **Doctrine:** PARTIAL — deploy order is an external/operator gate (explicitly out of repo authority per `CLAUDE.md`), but the *code* should still be defensive.
- **Decision: APPROVE (PRECONDITIONS: CI/migration gate).** Improvements: (a) add a `verify.yml` step that runs the harness against a DB **without** 0009 to prove graceful degradation, or (b) make the insert tolerant (insert core columns, then `UPDATE` the new columns only if present via a feature check), or (c) document the exact required deploy sequence in `OPEN_DECISIONS` and gate release on it. Strongest: (a) — turns the latent hazard into a failing test.

## B. High-leverage client structure (FE-2, FE-3, FE-4, FE-7, FE-8, FE-10, FE-11, FE-12, FE-21, FE-22)

### FE-3 / FE-2 / FE-4 — Unify snapshot-apply + mode + clock
- **First-principles:** PASS intent (single source of truth exists) but FAIL execution (4 divergent phase→mode rules, 5 skew sites).
- **Long-term:** FAIL as-is — every new phase/mode forces 3–4 coordinated edits; this is change amplification on the hottest path.
- **Doctrine:** Neutral.
- **Decision: APPROVE.** Improvement: extract `applyAuthoritySnapshot(snapshot, {realtime, reconnecting})` computing `mode` once (single canonical phase→mode table) and `serverClockSkewMs` once; all setters + completion call it. Fixes FE-2/FE-3/FE-4 and **FE-21** (spectator defeat-cinematic) in one move by deriving `defeat-cinematic` from `phase===CORONATION` in the shared helper.

### FE-7 / FE-8 / FE-10 / FE-22 — Realtime reconnect/sequence + single staleness flag
- **First-principles:** FAIL. The system silently depends on a server behavior (connection-independent sequence) that is nowhere asserted; two staleness flags encode one concept inconsistently.
- **Long-term:** FAIL. Flaky networks → frozen or stale boards for attackers/spectators; unreachable resync path.
- **Doctrine:** Neutral.
- **Decision: APPROVE NARROW.** Improvements: (a) seed `lastEventSequence` from the first authoritative snapshot on connect and on `resync`; (b) collapse `resyncing`+`reconnecting` into one `stale` flag and gate `fireAttack`/`submitDefensePlacement` on it; (c) set `mode="reconnecting"` on `onclose` for **all** modes and pause commands; (d) `resync` handler should not `return` mid-batch if remaining messages can be safely reprocessed. Add a harness/realtime test for reconnect-after-gap.

### FE-11 — Projectile completion coupled to rAF
- **First-principles:** FAIL. Presentation loop (rAF) owns a state-machine transition; backgrounded tabs break it.
- **Long-term:** FAIL. Any throttled/background render stalls the attack lifecycle.
- **Decision: APPROVE NARROW.** Improvement: drive completion from a clock/timer (`advanceTime` already exists) decoupled from rAF, with rAF only for visual interpolation. Keep `completeProjectile` idempotent.

### FE-12 — `pendingSnapshot` duplicate next-world
- **First-principles:** PARTIAL. Two sources for one authority world is a smell.
- **Long-term:** Neutral-to-FAIL. Redundant-but-possibly-stale; guarded today.
- **Decision: DEFER → fold into FE-3.** Once snapshot application is unified, have completion read the WS `attack_resolved` world as the single post-attack source and drop `pendingSnapshot`.

### FE-21 — Spectator `defeat-cinematic`
- **First-principles:** FAIL for UX symmetry (only the firing player sees the signature moment).
- **Long-term:** Neutral.
- **Decision: APPROVE (folds into FE-3).** Derive from `phase===CORONATION` in the shared helper so all clients get it.

## C. Domain / simulation integrity (DM-1, DM-2, DM-3, DM-4, DM-6, DM-7, DM-8, DM-9, DM-10, DM-12, DM-13, DM-14, DM-15, DM-16, DM-17, DM-18)

### DM-7 / DM-8 — Authoritative attack reducer not visible/tested; invariant tests poke state
- **First-principles:** FAIL. The most safety-critical logic (apply damage, cap core, update core integrity, bump version) is outside the tested surface; "finite world invariants" tests never replay a real shot.
- **Long-term:** FAIL. Regressions in the reducer ship undetected; this is the substrate the whole game stands on.
- **Doctrine:** FAIL — a passing local test is treated as proof the docs imply (`THREEJS_*` audits are honest about scope, but the invariant tests over-claim).
- **Decision: APPROVE (PRECONDITIONS: characterization tests).** Improvement: (a) lift the authoritative apply-shot reducer into `world/` (e.g. `applyAttackResult.ts`) as a pure, exported function; (b) test it against `resolveBallisticShot` end-to-end (gate, enclosure, core, defense, orb, breaker); (c) make `invariants.test.ts` actually replay deterministic event sequences through the reducer, not hand-set `coreIntegrity`.

### DM-6 / DM-10 / DM-9 — Dual core-HP + dual ordering counters + dead `realtimeSequenceAction`
- **First-principles:** FAIL. Two fields for one truth (core HP); two counters with different conventions for one ordering; a tested sequence-action that never runs.
- **Long-term:** FAIL. Contradictory handling between server projection and client realtime; invisible/phantom core damage.
- **Decision: APPROVE.** Improvement: (a) make `reign.coreIntegrity` the **only** core HP with a single `applyCoreDamage` helper; delete the shadowed component hp write; (b) unify on `worldVersion` as the sole ordering key (or formally pair `eventSequence` to it with an assertion); (c) wire `realtimeSequenceAction` into the client or delete it and its test.

### DM-1 / DM-2 / DM-3 / DM-12 — Enforce bounds, cap, breaker, shield-pulse in resolver
- **First-principles:** FAIL. Paid mechanics (Breaker, Royal Shield Pulse) are no-ops; `maxCoreDamage` holds only by coincidence; aim bounds unenforced server-side.
- **Long-term:** FAIL. Balance exploit surface + non-physical model misleads tuning.
- **Decision: APPROVE.** Improvement: (a) validate/clamp yaw/elevation/power server-side against `GameConfig` (reject out-of-envelope with `422`); (b) `Math.min(damage, maxCoreDamage)` explicitly on the live path; (c) implement breaker multiplier + core-damage cap and shield-pulse absorption in `resolveBallisticShot`; (d) add config-driven tests proving each paid mechanic changes outcomes.

### DM-4 / DM-5 / DM-11 / DM-13 — Physicality, dead metadata, legacy targeting, simulator realism
- **First-principles:** DM-4/DM-5 PARTIAL (material/support are modeled but inert — acceptable as *future* hooks only if documented; otherwise remove). DM-11 legacy targeting is a latent trap. DM-13 simulator overstates breach rate.
- **Long-term:** DM-13 FAIL (misinforms balance); DM-11 FAIL if reused; DM-4/DM-5 neutral if explicitly deferred.
- **Decision: DM-4/DM-5 REJECT-as-dead-or-document** (either implement material/support effects or drop the fields to stop misleading); **DM-11 REJECT** (delete legacy `resolveAttackIntent`, keep ballistics only); **DM-13 APPROVE NARROW** (rebuild `simulateBalance` on the real gating/absorption model, or label it explicitly non-representative in code+yaml and keep it out of tuning decisions).

### DM-14 / DM-15 / DM-16 / DM-17 / DM-18 — Synthetic ids, determinism, threshold dup, dead version, privacy
- **First-principles:** DM-14 FAIL (stringly-typed contract the app must parse by prefix); DM-15 PARTIAL (determinism only within one engine); DM-16/DM-17 cosmetic; DM-18 minor privacy leak.
- **Long-term:** DM-14 Medium (misparse risk); DM-15 Low–Medium (cross-engine replay).
- **Decision: DM-14 APPROVE** (add `parseBallisticTarget(componentId)` helper returning `{kind:'orb'|'defense'|'component', id?}`); **DM-15 DEFER** (document engine assumption; revisit only if replay moves off-worker); **DM-16 APPROVE** (share threshold constants); **DM-17 REJECT** (drop `version` or actually use it); **DM-18 APPROVE NARROW** (use a non-identifying label like `Attacker #N`).

## D. Server hygiene (SV-4, SV-5, SV-6, SV-7, SV-8, SV-9, SV-10)

### SV-4 — `live_entitlements` JSON never read
- **First-principles:** FAIL (dead state persisted every write).
- **Long-term:** FAIL (bloat + latent divergence).
- **Decision: APPROVE.** Delete the JSON mirror; keep SQL as the single source.

### SV-5 — Recovery builds expired session
- **First-principles:** PASS intent (silent session model sound) but FAIL (dead/confusing `expiresAt:now`).
- **Decision: APPROVE NARROW.** Remove `recoveredSession`; document that sessions are stateless/re-issued.

### SV-6 — Broadcast drop on hibernation
- **First-principles:** PASS as eventual-consistent-by-resync design, but FAIL documentation (undocumented in `OPEN_DECISIONS`).
- **Long-term:** Neutral (state self-heals via `/world`).
- **Decision: DEFER + document.** Record the contract explicitly in `OPEN_DECISIONS`; optionally flush `broadcastBuffer` on `webSocketClose`.

### SV-7 — Defense price config split-brain (tier 0)
- **First-principles:** FAIL (two manually-synced price sources).
- **Long-term:** FAIL (typo breaks all defense grants; no alerting).
- **Decision: APPROVE (folds into SV-1).** Single pricing authority; add a startup assertion that `defensePriceForTier(0) === Dodo product price` (or remove the dependency entirely).

### SV-8 — God-file `index.ts`
- **First-principles:** PARTIAL (works, but ~1231 lines mixing money/security/routing/render is a change-safety risk).
- **Long-term:** FAIL for the money/security paths (defect clustering, broad blast radius).
- **Decision: APPROVE NARROW (strangler).** Extract `payments.ts`, `webhooks.ts`, `realtime.ts`, `sharecard.ts`, `moderation.ts` behind the existing `index.ts` routing; do **not** big-bang rewrite. Preserve `/internal/*` secret gating (`AUTHORITY_INTERNAL_SECRET` never to client).

### SV-9 / SV-10 — Redundant prune + magic baseUrl
- **First-principles:** FAIL (redundant logic; undocumented magic constant).
- **Decision: APPROVE NARROW / REJECT.** SV-9 collapse the two pruners; SV-10 replace magic string with `env` or a no-op constant + comment.

## E. Governance / doctrine (GO-1 … GO-7)

### GO-1 — Commit hooks claimed but absent
- **First-principles:** FAIL. A documented gate that does not exist is worse than no gate (false assurance).
- **Long-term:** FAIL. Nothing enforces doctrine trailers/attestation; complacency.
- **Doctrine:** FAIL (direct conflict with `/Users/pranay/Projects/AGENTS.md:81`).
- **Decision: APPROVE (PRECONDITIONS).** Either (a) install a `pre-commit` running `lint`+`typecheck`+trailer check and a `commit-msg` trailer linter, or (b) **retract the claim** in `AGENT_KICKOFF_PROMPT.txt` and state CI is the only enforced gate. Recommended: (a) lightweight husky/pre-commit + a trailer lint, since the doctrine explicitly wants trailers.

### GO-2 / GO-7 — Browser gate not in CI; evidence non-reproducible
- **First-principles:** PARTIAL — the repo honestly admits browser evidence is local-only (`OPEN_DECISIONS:107`), satisfying "no silent done." But the evidence tier is unenforced.
- **Long-term:** FAIL for launch-readiness (Tier-4 rests on stale artifacts).
- **Doctrine:** PARTIAL (gap openly recorded) but the canonical evidence tiers want hosted/real-device/prod proof that does not exist.
- **Decision: APPROVE (PRECONDITIONS: hosted fixture).** (a) Add a `verify.yml` `cron` job that boots wrangler+Next and runs `test:browser:isolated`/`test:browser:smoke`; (b) add `test:browser:all` with server orchestration; (c) keep committed artifacts as *illustrative*, not authoritative, until a hosted fixture exists. Do **not** claim Tier-4 readiness until hosted evidence lands.

### GO-3 — Repo `AGENTS.md` not chained to canonical doctrine
- **First-principles:** FAIL (single instruction source broken; repo-local tooling blind to approval gates).
- **Long-term:** FAIL (future agents miss stop/approval conditions).
- **Doctrine:** FAIL (canonical model wants `AGENTS.md` to reference the higher stack).
- **Decision: APPROVE NARROW.** Add a one-line pointer in repo `AGENTS.md` to `/Users/pranay/Projects/AGENTS.md` + `OPERATING_DOCTRINE.md`, preserving the auto-managed Next.js block verbatim.

### GO-4 / GO-5 / GO-6 — gitignore comment, vitest comment, doctrine provenance
- **First-principles:** Minor accuracy gaps.
- **Decision: APPROVE NARROW.** Fix `.gitignore` comment; `git rm --cached artifacts/authority-debug.png` + force-ignore; correct `vitest.config.mjs` comment to `test:harness`; add SHA-256+timestamp to `OPERATING_DOCTRINE.md` header.

---

## Cross-cutting verdict

- **First-principles:** The repo has a sound *core* (authoritative snapshot, atomic entitlement+damage, server-derived identity, real integration harness). But the *edges* — payment pricing, realtime reconnect, the authoritative attack reducer, and the documented-governance layer — rest on unverified assumptions and duplication. Highest-value first-principles work: SV-1/2/3 (money truth), DM-7/8 (simulation truth), FE-3/7 (client truth).
- **Long-term:** Stop-ship payment defects (SV-1/2/3) and the untested attack reducer (DM-7/8) are the only items that *block* a healthy long-term; everything else is leverage or hygiene. The duplicate-state and dead-mechanic findings (FE-12, SV-4, DM-1/4/5/12) are interest-bearing debt that should be retired opportunistically.
- **Doctrine alignment:** Strong on *documentation honesty* (backlog/decisions separate local vs external gates; audits carry provenance) but weak on *enforcement* (GO-1 hooks absent; GO-2 browser gate absent; GO-3 broken instruction chain; GO-6 missing provenance). The single most important doctrine fix is GO-1 (install or retract the commit gate) because everything else depends on it.

**Sequencing principle (persona):** establish behavior + tests before restructuring; prefer strangle/extract over big-bang; protect invariants (core integrity monotonic, worldVersion ordering, entitlement atomicity, server-derived identity) explicitly. Full execution order is in `04-IMPLEMENTATION-PLAN.md`.
