# Siege Me Research and Implementation Plan

**Date:** 2026-08-31  
**Inputs:** `05-CURRENT-AUDIT-INDEX.md`, `06-FINDINGS-AND-TASK-CATALOG.md`  
**Planning rule:** prove product and operational truths before multiplying
mechanics; characterize invariants before restructuring; preserve one canonical
route, authority, schema, and state owner.

## Protected invariants

Every phase must preserve:

- The authority, never the browser, owns world mutation and player identity.
- `worldVersion` and `eventSequence` never move backward; gaps become visible
  and recover through an authoritative snapshot.
- Entitlement grant/consume, damage, defense, refund, and replay behavior are
  idempotent and atomic at their ownership boundary.
- Core integrity is finite, clamped, and monotonic within a reign.
- Public identity is bounded, attributable to its owner, moderatable,
  disableable, and never a source of authority.
- Payment return URLs do not grant entitlement; verified provider evidence and
  reconciliation do.
- Local proof is never relabeled as hosted, provider, device, legal, real-user,
  or production proof.
- Migration and rollback preserve money, identity, history, and recoverability.

## Decision Gate A: beta product contract

**Owner:** product/operator.  
**Questions:** target audience/regions/age posture; spectator value; what a paid
action guarantees; fairness and anti-griefing; supported devices; launch versus
private beta.

**Work:** execute R-01, R-02, R-05, and a small rules-comprehension playtest.
Document the chosen promise, exclusions, falsifier, and revisit trigger.

**Stop condition:** do not expand paid mechanics or write final legal/marketing
copy until this contract is chosen. Safe local reliability work may continue.

## Decision Gate B: pricing and provider authority

**Owner:** product/operator plus provider/legal review where required.  
**Question:** fixed-price pack, provider-defined tier products, or genuinely
dynamic-price checkout.

**Recommended staged choice:** start beta with fixed provider products and fixed
quantities. Keep the defense ladder out of the money contract until evidence
shows it improves the game and Dodo explicitly supports the chosen mechanics.
This minimizes refund, mismatch, tax/display, stale-price, and reconciliation
risk while preserving an upgrade path.

**Required evidence:** primary provider contract, test-mode checkout/webhooks,
amount/currency/product matching, duplicate and out-of-order delivery, refund
and dispute events, reconciliation after scheduler outage.

**Stop condition:** no real-money cutover while two sources can disagree about
price or while a successful payment can lack an observable repair path.

## Decision Gate C: identity, privacy, and safety

**Owner:** product/operator plus legal/privacy and moderation owners.  
**Questions:** anonymous continuity model, support recovery, public-history
retention, deletion/anonymization, moderation providers, human queue, appeals,
and support channel.

**Work:** R-04, R-06, R-07; complete a data-flow diagram and threat model; run
lost/stolen recovery scenarios; define moderation and deletion SLAs; replace
future-tense policy copy only after operations exist.

**Stop condition:** no public identity/image/link launch without a staffed or
explicitly bounded moderation path, enforceable default behavior, and tested
deletion/disablement semantics.

## Phase 0: restore a truthful green baseline

**Findings:** TEST-01, DOC-02, GOV-02.  
**Goal:** the ordinary gate is deterministic and evidence claims are dated.

1. Profile `src/game/world/invariants.test.ts` under full-suite concurrency.
2. Remove expensive assertion-loop overhead or split property scenarios into a
   bounded deterministic test; change timeout only with measured justification.
3. Run the full suite repeatedly on a clean process and CI-equivalent hardware.
4. Add a dated evidence block rather than overwriting historical results.
5. Define expiry rules for “current checkout” evidence.

**Acceptance:** full suite passes repeatedly; targeted test still falsifies a
deliberate sequence bug (S3); docs record command, date, commit, tier, and
sensitivity.  
**Rollback:** test-only and docs-only changes are independently revertible.

## Phase 1: close money truth

**Findings:** PAY-01 through PAY-07, PROD-03/05.  
**Goal:** a successful charge always has one explainable entitlement outcome.

1. Close Decision Gate B and record an ADR.
2. Make provider catalog or an explicitly supported dynamic-price request the
   sole price authority. Remove the other price from grant validation.
3. Validate environment/product/currency configuration before accepting checkout.
4. Extend the harness for tier/mismatch, duplicates, ordering, refund/dispute,
   reconciliation delay, scheduler outage, and recovery/deletion ownership.
5. Add structured reconciliation states, metrics, alert thresholds, operator
   queue, repair action, and an immutable audit trail.
6. Test against Dodo test mode, then record provider schema and screenshots/log
   references without secrets.
7. Update terms and support operations after legal/provider review.

**Acceptance:** Tier 3 local failure matrix, Tier 4 provider test-mode checkout
and webhook, S2 for each prior defect, S3 for amount/product/owner/idempotency
guards, documented operator recovery.  
**Rollback:** disable real checkout, preserve intents/events/ledger, reconcile
before re-enabling. Never roll back by deleting evidence.

## Phase 2: close privacy, moderation, and recovery operations

**Findings:** IDENT-01/02/03, PRIV-01/02/03, SAFE-01/02/03/04.  
**Goal:** public identity and paid continuity remain useful without creating an
unrecoverable trust burden.

1. Close Decision Gate C and publish the data-flow/threat-model ADR.
2. Replace shared moderator-secret operations with accountable operator identity
   if the beta has more than one trusted operator or requires audit attribution.
3. Implement moderation-provider adapters only after a bake-off; default-deny
   when the provider is unavailable for new public content.
4. Build the minimal operator queue for report, review, disable, appeal, and audit.
5. Implement deletion/anonymization across D1, DO, R2, archives, entitlements,
   moderation, and history according to the approved policy.
6. Add durable/WAF recovery and mutation controls and abuse tests.
7. Exercise lost/stolen/reused/expired codes and cross-device restoration.

**Acceptance:** abuse corpus, S2/S3 authorization tests, deletion reconciliation
report with no orphaned unintended data, human tabletop, and policy copy that
matches actual operations.  
**Rollback:** disable publication/upload while retaining reports/audit; do not
silently restore disabled public content.

## Phase 3: reduce authority blast radius

**Findings:** ARCH-01, ARCH-04/07/08/09/11, OPS-03.  
**Goal:** improve change safety without changing public routes or state semantics.

1. Create characterization tests for every route family and transaction boundary.
2. Extract pure/request-level modules behind the current `index.ts`: environment
   contract, payment/webhook orchestration, moderation, recovery/privacy,
   archival/reconciliation, HTTP routing, and realtime serialization.
3. Keep `SiegeWorld` as the sole DO state owner; extracted modules receive
   explicit dependencies rather than importing hidden globals.
4. Document the ownership map and state/event invariants in one architecture doc.
5. Add forward/backward/partial migration and restore tests.

**Acceptance:** no route/schema/event behavior changes unless separately
approved; all characterization tests pass; deliberately swapping owner/price/
version fails; module dependency graph has no new cycle or shadow store.  
**Rollback:** each extraction is a small semantic move with its own revert;
avoid a big-bang file split.

## Phase 4: make client workflows explicit and cancellable

**Findings:** ARCH-02/03/04/05/06, TEST-07/08.  
**Goal:** keep one client snapshot while separating connection, phase,
interaction, transaction, and presentation state.

1. Characterize every existing `AppMode` transition and visible screen.
2. Introduce orthogonal state only if it reduces invalid combinations in tests.
3. Replace recursive queue polling with a cancellable owner, bounded backoff,
   visibility handling, and a realtime promotion path where valuable.
4. Add one typed authority client and shared response validation; keep the Next
   proxies as the canonical same-origin boundary.
5. Standardize request cancellation, timeout, retry, and idempotency behavior.
6. Test keyboard/focus/live-region/canvas-alternative behavior through complete
   payment, attack, defense, recovery, and moderation-report flows.

**Acceptance:** transition/property tests reject invalid states; navigation and
unmount leave no polling; stale world never submits a command; accessible flows
pass automated checks plus human assistive-technology review.  
**Rollback:** retain adapters from old selectors until all consumers migrate,
then remove the old mode representation in one bounded change.

## Phase 5: production operations and release proof

**Findings:** OPS-01 through OPS-07, TEST-04/05/06, REL-01, ARCH-10.  
**Goal:** prove the system can be operated, not merely built.

1. Define SLOs for checkout/grant latency, authority availability, websocket
   recovery, queue latency/fairness, command rejection, moderation age, and
   deletion completion.
2. Add metrics, traces, redacted structured logs, dashboards, alerts, and cost
   budgets with named response ownership.
3. Run load, reconnect-storm, scheduler-outage, provider-outage, and restore tests.
4. Execute remote migrations, R2/D1/DO policies, secrets, DNS/TLS, hosted Next
   and Worker deploys, provider webhook, and rollback rehearsal.
5. Run the supported real-device/accessibility/performance matrix.
6. Observe a bounded private beta and compare real behavior against Decision
   Gate A before expanding audience, regions, or monetization.

**Acceptance:** Tier 4 hosted/device/operator evidence and Tier 5 provider-like
or bounded production evidence for the exact launch slice; rollback and restore
drills; no P0 open without a named, explicitly accepted residual risk.  
**Stop condition:** any unexplained money, identity, history, or authority drift
pauses exposure and triggers reconciliation before further rollout.

## Phase 6: validated product evolution

**Findings:** PROD-04/07/08/10, R-10/R-12.  
**Goal:** add spectacle, content, social value, and economy depth only where
observed player value justifies lifecycle cost.

1. Add privacy-approved telemetry and balance dashboards.
2. Re-test the visual/game-design audit backlog against the current browser.
3. Prioritize improvements by player value, reversibility, operating cost, and
   evidence, not by document age or visual novelty.
4. Treat seasons, notifications, richer defenses, social features, and content
   pipelines as separate product hypotheses with kill criteria.

## Dependency map

```text
Gate A: beta promise -----------+
Gate B: pricing/provider -------+--> Phase 1 money truth ----+
Gate C: identity/privacy/safety +--> Phase 2 trust ops ------+--> Phase 5 release proof
Phase 0 truthful gate ---------------------------------------+
Phase 3 authority boundaries --> Phase 4 client workflows ---+
                                                            +--> Phase 6 evolution
```

Phases 1 and 2 can proceed in parallel after their decisions. Phase 3 can begin
with characterization work at any time, but it must not obscure unresolved
money/trust behavior. Phase 5 requires all P0 outcomes. Phase 6 follows a
bounded beta rather than preceding it.

## Recommended next coherent implementation slice

The safest next code slice is **Phase 0: stabilize the invariant test and date
the evidence record**. It is bounded, local, reversible, and improves every
later decision. In parallel at the product level, close Decision Gate B because
PAY-01 blocks any honest real-money launch and materially determines the payment
implementation.

