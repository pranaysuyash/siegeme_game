# SiegeMe — Implementation Plan (Refactor Decision Architect)

Derived from `01-FINDINGS-REGISTER.md` and `02-ASSESSMENT.md`. Sequenced per the persona's principle: **establish behavior + tests before restructuring; strangle/extract, never big-bang; protect invariants explicitly.**

## Current-checkout execution status, August 28 2026

Phases 0 through 4 have been executed for the current authority slice. The
repository now has the commit gate and CI surfaces, signed progressive
identity, payment-intent reconciliation, versioned authoritative state,
realtime sequence guards, deterministic ballistic collision, typed target
parsing, centralized Core damage, recovery, defense, succession, asset
ownership, and local browser evidence. The phase text below is retained as the
implementation provenance and acceptance checklist; it is not a statement
that every provider, hosted, real-device, or human-operations gate is closed.

## Protected invariants (must hold through every phase)
- Core integrity monotonic-non-increasing, clamped `[0, coreMaxIntegrity]`.
- `worldVersion` (and `eventSequence`) strictly monotonic; client rejects stale/duplicate.
- Entitlement consumption + damage application atomic (single transaction).
- Player identity always re-derived server-side; client cannot spoof.
- Silent HttpOnly Secure SameSite=Lax session model preserved.
- All changes keep `lint` + dual `typecheck` + `test` + `test:harness` green.

---

## Phase 0 — Preconditions: make the gate real (doctrine + CI)
**Goal:** nothing ships un-gateable; evidence tiers enforced.
1. **GO-1** — Install `pre-commit` (lint + `typecheck:app` + `typecheck:worker` + doctrine-trailer lint) and `commit-msg` trailer linter, OR retract the claim in `AGENT_KICKOFF_PROMPT.txt`. *Decision: APPROVE.* 
2. **GO-3** — Chain repo `AGENTS.md` → `/Users/pranay/Projects/AGENTS.md` + `OPERATING_DOCTRINE.md` (preserve Next.js block verbatim).
3. **GO-6** — Add SHA-256 + generation timestamp to `OPERATING_DOCTRINE.md` header.
4. **GO-2 / GO-7** — Add `verify.yml` `cron` job: boot wrangler+Next, run `test:browser:isolated` + `test:browser:smoke`; add `test:browser:all` with server orchestration. Keep committed artifacts illustrative until hosted.
5. **GO-4 / GO-5** — Fix `.gitignore` comment; `git rm --cached artifacts/authority-debug.png`; correct `vitest.config.mjs` comment → `test:harness`.
- **Exit:** CI + commit gate green; doctrine chain intact.

## Phase 1 — Stop-ship payment truth (SV-1, SV-2, SV-3, SV-7)
**Goal:** paid defenses never silently fail.
1. **SV-3** — Add a harness test that runs against a DB **without** migration 0009 to prove graceful degradation; document required deploy order in `OPEN_DECISIONS`. (PRECONDITIONS)
2. **SV-1 / SV-7** — Choose one pricing authority: charge fixed Dodo product + grant fixed quantity (ladder = display-only), OR pass `amount`+`currency` to checkout so the product is price-less. Remove ladder-from-payment-path. Single source of pricing truth. (APPROVE / RECLASSIFY)
3. **SV-2** — On intent-missing webhook: return `202`, enqueue `PENDING_WEBHOOK`; extend `reconcileEntitlements` to pair unmatched `webhook_events` to later intents. (APPROVE)
4. Add harness tests: webhook at tier>0; webhook-arrives-before-intent; migration-not-yet-applied.
- **Exit:** All paid-defense paths provably grant; reconciliation covers the missing-intent case. *This phase blocks any production payment cutover.*

## Phase 2 — Simulation truth (DM-7, DM-8, DM-6, DM-9, DM-10)
**Goal:** the authoritative attack reducer is visible, tested, single-source.
1. **DM-7 / DM-8** — Lift apply-shot reducer into `world/applyAttackResult.ts` (pure, exported). `invariants.test.ts` replays deterministic event sequences through it (no hand-set state). (PRECONDITIONS: characterization tests)
2. **DM-6** — `reign.coreIntegrity` is the only core HP; add `applyCoreDamage` helper; remove shadowed component-hp write.
3. **DM-10 / DM-9** — Unify on `worldVersion` as sole ordering key; wire `realtimeSequenceAction` into the client or delete it + its test.
- **Exit:** Reducer unit-covered end-to-end; one core-HP field; one ordering counter.

## Phase 3 — Enforce config truth in resolver (DM-1, DM-2, DM-3, DM-12, DM-14)
**Goal:** paid mechanics work; bounds/caps enforced server-side.
1. **DM-3** — Validate/clamp yaw/elevation/power against `GameConfig`; reject out-of-envelope with `422`.
2. **DM-2** — Explicit `Math.min(damage, maxCoreDamage)` on live path.
3. **DM-1 / DM-12** — Implement breaker multiplier + core-damage cap and Royal Shield Pulse absorption in `resolveBallisticShot`; config-driven tests proving each changes outcomes.
4. **DM-14** — Add `parseBallisticTarget(componentId)` helper (orb/defense/component) to remove stringly-typed prefixes.
- **Exit:** No paid mechanic is a no-op; malicious aim rejected; orb/defense handled via helper.

## Phase 4 — Client truth (FE-3, FE-2, FE-4, FE-7, FE-8, FE-10, FE-11, FE-12, FE-21, FE-22)
**Goal:** single snapshot-apply path; robust reconnect; symmetric UX.
1. **FE-3 / FE-2 / FE-4** — Extract `applyAuthoritySnapshot(snapshot, {realtime, reconnecting})`: one phase→mode table (incl. `CORONATION → defeat-cinematic`), one `serverClockSkewMs`. All setters + completion call it. Fixes FE-21 (spectator cinematic) too.
2. **FE-7 / FE-10 / FE-22** — Seed `lastEventSequence` from first authoritative snapshot on connect + `resync`; collapse `resyncing`+`reconnecting` into one `stale` flag; gate `fireAttack`/`submitDefensePlacement` on it; set `mode="reconnecting"` on `onclose` for all modes.
3. **FE-11** — Drive projectile completion from a clock/timer decoupled from rAF.
4. **FE-12** — Completion reads WS `attack_resolved` world as sole post-attack source; drop `pendingSnapshot`.
- **Exit:** One apply path; attackers/spectators recover from blips; defeat cinematic for all.

## Phase 5 — Retire interest-bearing debt (SV-4, SV-5, SV-8, SV-9, SV-10, DM-4, DM-5, DM-11, DM-13, DM-16, DM-17, DM-18, FE-1, FE-6, FE-14, FE-15, FE-16, FE-17, FE-18, FE-19, FE-20)
**Goal:** remove dead state/code; document deferred mechanics.
- **Delete/dead:** SV-4 (`live_entitlements` JSON), SV-9 (redundant prune), SV-10 (magic baseUrl), DM-11 (legacy `resolveAttackIntent`), DM-17 (`version` field), FE-1 (`beginAttack`), FE-13 (redundant double-apply), FE-15 (dup preset).
- **Document-or-implement:** DM-4 (material), DM-5 (supportGroup) — implement effects or drop fields; DM-13 (`simulateBalance`) rebuild on real model or label non-representative.
- **Small fixes:** SV-5 (drop `recoveredSession`), SV-8 (strangle `payments/webhooks/realtime/sharecard/moderation` out of `index.ts`, preserving `/internal/*` secret), DM-16 (share threshold constants), DM-18 (non-identifying attacker label), FE-6 (derive avatar from `ruler.displayName`), FE-14 (resolve `turn:none` vs backlog), FE-17 (defense submit error path), FE-18 (memoize `generateFortress` in sheet), FE-19/FE-20 (audio slice + attack-requesting timeout — optional).

## Sequencing map (dependency order)
```
Phase 0 (gate/doctrine)
   └─> Phase 1 (payment truth)      [BLOCKS prod payments]
        └─> Phase 2 (sim truth)     [BLOCKS safe long-term]
             └─> Phase 3 (resolver enforcement)
                  └─> Phase 4 (client truth)
                       └─> Phase 5 (debt retirement, opportunistic)
```
Phases 2–5 may run in parallel tracks per owner, but each must keep the gate green and not touch protected invariants without a test.

## Acceptance evidence (per phase)
- `verify.yml` green (lint, dual typecheck, `test`, `test:harness`, build, wrangler dry-run, browser `cron`).
- New characterization tests for: attack reducer (Phase 2), breaker/shield/bounds/cap (Phase 3), reconnect-after-gap (Phase 4), payment tier>0 + intent-race + migration-absent (Phase 1).
- Doc updates: `WORK_BACKLOG.md` / `OPEN_DECISIONS_AND_EXTERNAL_GATES.md` reflect resolved claims (esp. W-017, W-008, W-030) with **explicit** evidence tier, not silent "done".

## Kill criteria (persona stop conditions)
- If payment redesign (Phase 1) cannot remove the ladder/product contradiction without a provider change beyond repo authority → RECLASSIFY as external gate, document, and stop.
- If Phase 2 reducer extraction reveals the external reducer already diverges from projection in production → PRECONDITIONS: freeze writes, reconcile before restructuring.
- If any phase expands beyond its invariants → narrow scope; do not bundle into architectural rewrite.
