# Siege Me Findings and Task Catalog

**Rebaseline:** 2026-08-31  
**Current index:** `05-CURRENT-AUDIT-INDEX.md`  
**Status vocabulary:** Observed, Verified, Inferred, Proposed, Unknown, Contested.  
**Disposition:** Implement, Research, Decide, Verify, Document, Monitor, or Retire.

Severity describes consequence. Confidence describes evidence. A candidate is
not an implementation commitment until its decision gate in `07` is closed.

## Product, player value, and economy

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| PROD-01 | Implicit | Validate the smallest repeatable fun loop for spectator, attacker, defender, and victor. | The repo proves mechanics, not retention or comprehension. No real-user evidence was found. | First-principles required | Research + playtest |
| PROD-02 | Explicit | Decide the actual launch audience, supported regions, age posture, devices, and accessibility envelope. | `OPEN_DECISIONS...` keeps legal/device/provider gates open. | Not closed | Decide + document |
| PROD-03 | Implicit | Define what a paid attack or defense guarantees and what remains skill, chance, queueing, or latency. | Terms call the game skill-based; simulation is deterministic, but user research and legal/provider interpretation are absent. | Partial | Research + legal/provider review |
| PROD-04 | Implicit | Measure whether free spectators have enough agency and novelty to return without paying. | Spectating is the dominant free surface; telemetry and retention evidence are absent. | Unknown | Instrument + research |
| PROD-05 | Explicit | Reconcile the escalating defense ladder with affordability, fairness, and repeat-player concentration. | `GameConfig` advances defense tiers; checkout uses one Dodo defense product ID. | Fails today | Decide with PAY-01 |
| PROD-06 | Implicit | Define loss, timeout, disconnect, refund, duplicate, stale-world, and sold-out messaging as one trust journey. | Local error states exist across store and checkout, but no end-to-end content contract or user test exists. | Partial | UX research + consolidate |
| PROD-07 | Adjacent | Decide whether reign history, contribution, and public identity create meaningful status without incentivizing abuse. | History, contributors, links, messages, and public identities exist. | Unknown | Research + safety review |
| PROD-08 | Scale-derived | Define economy budgets and anti-whale/anti-griefing constraints before adding monetized mechanics. | Finite entitlements and public shared state create concentrated-impact risk. | Missing | Model + policy |
| PROD-09 | Failure-derived | Decide what happens when the global world is unavailable or corrupted: read-only replay, maintenance state, or reset. | Client has unavailable/reconnecting modes; operator recovery contract is not end-to-end documented. | Partial | ADR + runbook |
| PROD-10 | Temporal | Define seasons, content freshness, fortress variety, and balance-change governance. | One persistent loop exists; long-term content and live balancing ownership are not established. | Missing | Product research |

## Payments, entitlements, and commercial trust

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| PAY-01 | Explicit, P0 | Dynamic defense price and a single fixed provider product are competing pricing authorities. | `cloudflare/src/index.ts` imports `defensePriceForTier`, stores expected dynamic amount, and checks out with `DODO_DEFENSE_PRODUCT_ID`; provider checkout is product-ID based. | First-principles fail | Decide, implement, provider-verify |
| PAY-02 | Explicit | Real Dodo request/response, webhook schema, retry, refund, dispute, and test/live product behavior remain external. | Local Dodo helpers and harness are not provider proof; docs state this gate is open. | Honest but incomplete | Provider sandbox + contract tests |
| PAY-03 | Implicit | Define entitlement expiry, transferability, regional currency/tax display, abandoned checkout, and stale price behavior. | Purchase intent schema captures expected amount/currency/quantity; user-facing policy is not complete. | Missing product contract | Research + decide |
| PAY-04 | Explicit | Add reconciliation metrics, age thresholds, alerts, operator queue, and repair actions. | Scheduled reconciliation exists; production alerting and ownership remain open. | Partial | Implement + runbook |
| PAY-05 | Failure-derived | Prove every ordering: intent first/event first, duplicate, delayed, malformed, refunded, disputed, partial provider outage, and scheduler outage. | Harness covers important cases but not provider delivery or production scheduling. | Partial | Failure-injection matrix |
| PAY-06 | Security | Confirm purchase intent and entitlement ownership under cross-device recovery and deletion. | Owner binding is harness-covered locally; lifecycle policies are unresolved. | Partial | Threat model + tests |
| PAY-07 | Documentation | Replace general terms language about unused entitlements/disputes with approved, region-aware policy before launch. | `src/app/terms/page.tsx` defers to unspecified provider and consumer-rights rules. | Not launch-ready | Legal/product review |

## Identity, recovery, privacy, and moderation

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| IDENT-01 | Explicit | Validate silent anonymous identity as the durable account model. | `/session` creates a signed identity; recovery code is the continuity primitive. | Elegant but unproven | User research + ADR |
| IDENT-02 | Implicit | Define lost-code, stolen-code, shared-device, device migration, multi-device, and support recovery. | Recovery tokens are hashed, expiring, and single-use; no stronger recovery channel exists. | Partial | Threat model + UX decision |
| IDENT-03 | Security | Rate-limit and abuse-test recovery creation/claim across distributed edges, not only an isolate-local throttle. | Edge mutation throttling is documented as requiring durable/WAF policy. | Incomplete | Implement external policy + tests |
| PRIV-01 | Explicit, P0 | Approve a real data inventory, purposes, retention schedule, deletion behavior, consent, access, and support contact. | Privacy page says schedules/support are applied/configured before launch; docs keep them open. | First-principles fail for launch | Decide + implement + legal review |
| PRIV-02 | Explicit | Complete identity/player deletion semantics across D1, DO, R2, archives, payment references, moderation, and public history. | Internal deletion removes selected live state; backlog says identity/player policy remains. | Partial | Data-flow design + migration tests |
| PRIV-03 | Implicit | Define how public history changes after identity disablement, deletion, or moderation without corrupting game history. | Reign archives and public identity are separate surfaces; fallback/disable flows exist. | Unknown | Product/privacy ADR |
| SAFE-01 | Explicit, P0 | Establish human moderation queue, SLA, roles, escalation, appeals, and audit review. | Case/audit tables and secret-gated routes exist; operator workflow remains open. | Partial | Implement operator workflow |
| SAFE-02 | Explicit | Select and validate text, URL-reputation, and image-moderation providers with default-deny/fallback behavior. | Backlog W-065/W-066 and open decisions retain this gate. | Incomplete | Research + provider spike |
| SAFE-03 | Security | Threat-model SSRF, malicious URLs, Unicode confusables, image bombs, EXIF/privacy, MIME confusion, and stored content. | Local validation and container sanitation exist; decoder and reputation choices remain. | Partial | Adversarial test matrix |
| SAFE-04 | Implicit | Prevent report spam, moderator secret leakage, and audit-log tampering; define moderator identity rather than a shared secret. | `MODERATOR_SECRET` gates operations; schema stores `resolved_by`. | Not durable at scale | AuthN/AuthZ design |

## Architecture and code ownership

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| ARCH-01 | Explicit, P1 | `cloudflare/src/index.ts` is a 1,362-line change hotspot spanning routing, DO state, payments, moderation, recovery, archival, realtime, and assets. | Current line count and symbol inventory. | Long-term fail | Characterize, then strangler extraction |
| ARCH-02 | Explicit | `SiegeApp.tsx` (647 lines) and `GameCanvas.tsx` (736 lines) combine several UI/scene responsibilities. | Current line counts and component inventories. | Partial | Extract only along state/feature ownership |
| ARCH-03 | Implicit | `AppMode` combines connection, world phase, interaction, request, and cinematic axes. | `src/game/client/store.ts:10`; mode checks gate unrelated concerns. | Change amplification | Model orthogonal state after characterization |
| ARCH-04 | Explicit | Client API response shapes are repeated inline casts and thin Next proxy routes duplicate forwarding behavior. | Store/SiegeApp fetch casts and 20+ API route files. | Partial | Shared contract/schema and proxy helper |
| ARCH-05 | Implicit | Queue polling recursively schedules `claimTurn` every two seconds without an explicit cancellable poll owner/backoff policy. | `src/game/client/store.ts:199-201`. | Fragile lifecycle | Add cancellable scheduler or server event |
| ARCH-06 | Implicit | Request timeout, cancellation, retry, and idempotency policy is inconsistent across client calls. | Many direct `fetch` calls; command idempotency exists server-side but client transport policy is local. | Partial | One typed request policy |
| ARCH-07 | Explicit | World version and event sequence are both load-bearing but their coupling and reset semantics need an ADR. | Domain types, store guards, DO state, realtime messages. | Works, underdocumented | Document invariants + state-machine tests |
| ARCH-08 | Implicit | D1, DO SQLite, archival outbox, and public projections form a distributed ownership model whose restore/replay contract is not fully proven. | Authority state, D1 migrations, outbox, history projection. | Directionally sound | Recovery design + disaster exercise |
| ARCH-09 | Explicit | Environment/config validation is distributed and production secrets/resources are not startup-validated as one contract. | `.env.example`, Wrangler vars/bindings, runtime conditionals. | Partial | Typed env validation, fail closed |
| ARCH-10 | Scale-derived | One global Durable Object is product-aligned now but creates a geographic latency, throughput, and availability ceiling. | `GLOBAL_SIEGE` singleton binding and single-world concept. | Good until measured | Load/latency research before sharding |
| ARCH-11 | Implicit | State migrations need forward, backward, partial-deploy, and rollback compatibility tests. | DO schema migration plus D1 migrations; dry-run does not apply production migration. | Partial | Migration matrix + runbook |
| ARCH-12 | Positive | Authoritative snapshot, deterministic resolver, server-derived identity, transactional mutations, and monotonic guards are canonical foundations to preserve. | Current source and passing focused/harness tests. | Strong | Protect with S2/S3 tests |

## Realtime, reliability, and operations

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| OPS-01 | Explicit, P0 | Structured metrics, traces, dashboards, error budgets, spend alerts, and incident ownership are absent or open. | `progress.md` and open decisions list observability as remaining. | Launch blocker | Design + implement |
| OPS-02 | Implicit | Broadcast coalescing and hibernation rely on snapshot resync; measure recovery time and dropped-event behavior. | Historical SV-6; current resync path exists. | Acceptable if bounded | Chaos test + SLO |
| OPS-03 | Explicit | Create operator runbooks for payment reconciliation, moderation, deletion, bootstrap, migration, rollback, backup/restore, and world corruption. | Actions exist; cohesive runbooks were not found. | Missing operational value | Document + drill |
| OPS-04 | Scale-derived | Load-test turn queue fairness, attack contention, websocket churn, reconnect storms, and scheduled jobs. | Local harness is bounded; production-load evidence is open. | Unknown | Research + load test |
| OPS-05 | Failure-derived | Define maintenance/read-only mode and player communication for partial authority/provider outages. | Unavailable/reconnecting UI exists, but operational activation is not defined. | Partial | Implement feature flag/state |
| OPS-06 | Explicit | Verify backup, point-in-time recovery, D1/R2/DO restore, archival replay, and reconciliation after restore. | No live restore evidence in this audit. | Unknown | Disaster-recovery exercise |
| OPS-07 | Integration | Pin and monitor upstream dependencies and GitHub Actions; define update cadence and rollback. | Actions use tags; dependencies are exact in lockfile but current supply-chain policy is not documented. | Partial | Security maintenance policy |

## Testing, performance, accessibility, and release evidence

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| TEST-01 | Observed | Full unit suite is contention-sensitive: 136/137 passed, one 5s timeout; focused file passed 7/7 in 1.60s. | Commands in `08`. | Gate is currently red | Profile and stabilize, do not only raise timeout |
| TEST-02 | Explicit | Add model-based/state-machine tests across phase, turn, entitlement, projectile, reconnect, recovery, and succession transitions. | Backlog W-083/W-084 retain broader matrices. | Partial | Implement incrementally |
| TEST-03 | Explicit | Add S2/S3 falsification for load-bearing money, authority, and ordering invariants. | Most current evidence is S1; test presence/count is not sensitivity. | Doctrine gap | Mutation/failure injection |
| TEST-04 | Explicit | Run isolated browser proof on pull requests or define a bounded PR subset; schedule-only detection is late. | `verify-browser.yml` is manual + cron, not PR. | Partial | CI design |
| TEST-05 | Explicit | Execute hosted browser, real iPhone/Android, GPU/context loss, touch, audio, screen reader, forced colors, and reduced motion evidence. | Open decisions list these gates. | Unknown | Device matrix |
| TEST-06 | Explicit | Define FPS/frame-time, memory, draw-call, network, and battery budgets by supported device class. | Local renderer counters exist; real budgets and devices do not. | Missing | Performance research + CI thresholds |
| TEST-07 | Implicit | Add contract tests between Next proxies and authority endpoints to catch path/header/cookie drift. | Many thin proxy routes; build does not execute forwarding semantics. | Partial | Contract suite |
| TEST-08 | Implicit | Add accessibility semantics and keyboard focus tests for sheets, live regions, canvas alternatives, and transaction flows. | Some ARIA/live regions exist; assistive-tech proof is open. | Partial | Automated + human audit |
| REL-01 | Explicit, P0 | Execute real deployment, migration, DNS/TLS, hosted smoke, provider webhook, rollback, and production observation gates. | W-072 and open decisions. | Not ready | Release runbook |

## Documentation and governance

| ID | Kind | Finding or task | Evidence / rationale | Alignment | Disposition |
|---|---|---|---|---|---|
| DOC-01 | Observed | Prior audit mixes historical findings and later resolutions, and cites removed paths/persona source. | `docs/audit/01-04`. | Truth drift | Superseded by `05-08` |
| DOC-02 | Contested | Open-decisions evidence says 27 files/137 tests passed, while this live audit observed a full-suite timeout. | `OPEN_DECISIONS...:135` vs `08`. | Doctrine fail until dated | Add evidence timestamp/freshness |
| DOC-03 | Explicit | Add one current architecture map covering client, Next proxy, Worker, DO, D1, R2, Dodo, event flow, and recovery. | Knowledge is spread across audits/ADRs/handoff. | Missing canonical view | Document |
| DOC-04 | Explicit | Create a document manifest with owner, canonicality, last verified date, evidence tier, and supersession link. | Many overlapping game/Three.js audits exist. | Long-term need | Implement docs index/check |
| DOC-05 | Explicit | Keep conversation evidence as a structured decision/evidence ledger, not a claim of hidden reasoning or a raw secret-bearing transcript. | `03-SESSION-EVIDENCE.md` records an old chat and Git actions. | Doctrine aligned | Use `08` format |
| DOC-06 | Explicit | Refresh generated context after major doc changes, but preserve the currently dirty generated file and resolve ownership first. | `SESSION_CONTEXT.md` is already modified. | Contested ownership | Defer generator run |
| GOV-01 | Positive | Canonical instruction chain and Git hooks now exist; old GO-1/GO-3 are resolved in current source. | `AGENTS.md`, `.githooks`, CI. | Strong | Preserve and re-verify before Git mutation |
| GOV-02 | Explicit | Define evidence expiry and automatically flag stale “current checkout” claims. | Evidence is currently prose without expiry. | Missing | Docs lint/tooling |

## Research frontier

These are questions to research and document before they harden into product or
architecture assumptions:

| ID | Research question | Required evidence | Downstream decision |
|---|---|---|---|
| R-01 | Do first-time spectators understand the goal, live state, and why they should return? | Moderated tests, comprehension/return intent | PROD-01/04 |
| R-02 | Does paying for finite attacks/defenses feel fair and skill-based across wins and losses? | Playtests, outcome distribution, copy comprehension | PROD-03/05, PAY-01 |
| R-03 | Which defense pricing model is provider-compatible and healthy: fixed pack, tier products, or dynamic price? | Dodo primary docs/sandbox, unit economics, legal review | PAY-01 |
| R-04 | Is silent identity plus a recovery code sufficient for paid cross-device continuity? | Usability tests, support scenarios, threat model | IDENT-01/02 |
| R-05 | Which regions, ages, and consumer rules are compatible with the mechanic and provider? | Legal/provider review, region matrix | PROD-02, PAY-07 |
| R-06 | What is the minimum moderation stack and human workload for public names, links, text, and images? | Provider bake-off, abuse corpus, queue simulation | SAFE-01/02 |
| R-07 | What privacy/retention/deletion model preserves public game history without retaining unnecessary identity data? | Data map, legal/product review, deletion prototype | PRIV-01/03 |
| R-08 | What concurrency and latency can one global Durable Object sustain for the expected launch? | Load model, regional latency, soak test | ARCH-10, OPS-04 |
| R-09 | What supported-device performance budgets preserve spectacle without excluding users? | Real-device matrix, frame/memory/battery traces | TEST-05/06 |
| R-10 | Which telemetry is essential for balance and operations without creating unnecessary personal data? | Event taxonomy, privacy review, dashboard prototype | PROD-04/10, OPS-01 |
| R-11 | How should world corruption, rollback, or provider outage appear to players while preserving trust? | Incident tabletop, UX prototype | PROD-09, OPS-05/06 |
| R-12 | Which existing visual/game-design audit recommendations remain valid after the current architecture? | Reproduce each against live browser and code | DOC-04, later polish |

