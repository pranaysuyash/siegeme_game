# Siege Me — Complete Work Universe / Backlog

Open decisions and external gates are consolidated in
`docs/OPEN_DECISIONS_AND_EXTERNAL_GATES.md`. This backlog remains the task
index; the decision record is the boundary document for work that cannot be
closed by local implementation alone.

**Created:** 2026-08-27 · **Source basis:** authoritative spec (`FULL_PRODUCT_TECHNICAL_SPEC.md`), `IMPLEMENTATION_ORDER.md` Phases A–G, `ACCEPTANCE_GATES.md`, screen inventory S00–S44, ADR-0001/0002, prior Gemini design review (F-01…F-06), `progress.md` gated follow-ups, and 2026-08-27 code audit (`docs/status-and-gap-audit-2026-08-27.md`) including items **implicitly** required by code reality but never written down anywhere.

**Legend**
- Type: **I** = implement now (knowledge complete) · **E** = explore/research/document before building · **D** = decision required before building · **V** = verify/confirm current behavior
- Priority: **P0** = do first (tree health / money integrity) · **P1** = core playable product · **P2** = hardening & pre-launch gates · **P3** = later polish / explicitly deferred

---

## 1. Immediate repairs (P0)

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-001 | **Resolved:** fix typecheck break in coronation state migration | I | P0 | Audit issue 1 |
| W-002 | **Resolved:** branch Dodo grants by `ATTACK_PACK` / `DEFENSE_PACK` and test the matching balance path | I | P0 | Audit issue 2 |
| W-003 | **Resolved:** re-green lint and React render-loop purity rules | I | P0 | Lint run 2026-08-27 |
| W-004 | **Resolved for the current authority slice:** wire turn claim, aim, fire, resolution, impact, and protected-state UX | I | P0 | Audit issue 3 |
| W-005 | **Resolved locally:** post-checkout entitlement status panel polls player-visible entitlement; live Dodo confirmation remains external | I | P0 | Spec §23.2/§34.5 |
| W-006 | **Resolved locally:** public-safe queue endpoint exposes position and queue length without player IDs | I | P0 | Spec §12.4/§23.3 |
| W-007 | **Resolved locally:** queued clients poll the idempotent turn claim until promotion; dedicated private WS event remains an optimization | I | P0 | Implicit (protocol gap) |
| W-008 | **Resolved:** claim turn through `/turn/claim` with real `turnId`; stop sending `"turn:none"` | I | P0 | Audit issue 3 |
| W-009 | **Resolved locally:** fire → resolve → impact/result, server-confirmed re-arm, per-shot record, and exhausted-pack summary are covered by the Worker-backed attack browser flow | I | P0 | Spec §23.4–§23.5, S17–S18 |
| W-010 | Decide commit/PR strategy for the large uncommitted cluster (succession/defense/recovery + audits) once tree is green | D (user gate) | P0 | Git policy |

## 2. Realtime & state-sync correctness

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-011 | **Resolved:** apply `defense_placed` deltas client-side with version guards | I | P1 | Audit issue 4 |
| W-012 | **Resolved locally:** spectator attacker attribution chip (S04) uses ephemeral labels for anonymous attackers | D+I | P1 | Implicit |
| W-013 | **Resolved locally:** 100 ms trailing broadcast batching now flushes at the shared 32-event or 64 KB envelope limits; client batches are bounded before sequence processing | I | P3 | Review F-05, §32.5 |
| W-014 | **Resolved locally:** bounded `world_events` retention with configured pruning; D1 remains the long-term archive boundary | E+I | P2 | Implicit (unbounded append-only store) |
| W-015 | **Resolved locally:** server-authoritative time projection drives reign durations, protection, and turn countdowns | V+I | P2 | Implicit |
| W-016 | **Resolved locally:** one authority snapshot path, store-owned sequence recovery, and timer-owned projectile completion prevent stale rollback | I | P2 | Implicit |

## 3. Defense & shared attacker economy

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-017 | **Resolved locally:** escalating defense price ladder ($3→$34) is authoritative in config, reign state, checkout intent, webhook match, and UI | I | P1 | Spec §16.2, Seq 5 |
| W-018 | **Resolved locally:** Royal Guard accrues +25 per placement and arms a one-hit direct-Core pulse at 100 | I | P1 | Spec §18 |
| W-019 | **Resolved locally:** tunable rules are centralized in versioned `GameConfig` and recorded in state | I | P1 | Spec §49 |
| W-020 | **Resolved locally:** shields retain finite hits; braces attach to a damaged component and apply the versioned 65% damage multiplier once | D | P1 | Deviation list |
| W-021 | **Resolved locally:** defense placement rejects an active attack turn | V+I | P1 | Spec §17.3 |
| W-022 | **Resolved locally:** generator-owned version-driven Power Orb collider/mesh with +25 Siege Charge on hit | I | P2 | Spec §15, Seq 6 |
| W-023 | **Resolved locally:** reign-scoped Breaker Shot arms at full Siege Charge, consumes once after the pack, and applies explicit structure/Core caps | I | P2 | Spec §15.3–15.4 |
| W-024 | **Resolved locally:** reign-scoped anonymous contribution counters and deterministic Conqueror, Siege MVP, Breaker, and Royal Guard MVP titles persist at reign close | I | P2 | Spec §21 |
| W-025 | **Resolved locally:** Power Orb charge and active defense cues communicate shared meters in the world | I | P3 | Spec §6.4 |

## 4. Succession / coronation completion

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-026 | **Resolved locally:** protected window, authority timeout fallback, and countdown UI | I | P1 | Spec §20.2, Audit issue 5 |
| W-027 | **Resolved locally:** selected the 120-second protected setup value in versioned GameConfig | D | P1 | Deviation |
| W-028 | Logo/avatar upload pipeline: signed upload, MIME sniff/decode/strip-metadata/resize/re-encode, moderation step, serve normalized only (note: Worker image processing library must be researched — no native Canvas on Workers) | E→I | P2 | Spec §35.3 |
| W-029 | **Partially resolved locally:** bounded CTA and social-handle fields are persisted; server-side metadata autofill remains a deliberate network/SSRF hardening boundary | I | P2 | Spec §23.8 |
| W-030 | **Resolved locally for the current slice:** S24 Core Destroyed cinematic and S29 throne-open overlay; S28 new-reign transition remains the protected camera handoff | I | P2 | Screens |
| W-031 | **Resolved locally:** no mid-reign identity edit route; moderator-gated disable updates the D1 identity ledger and active public projection through a versioned authority event | V+I | P2 | Spec §5.6 |
| W-032 | **Resolved locally for the safe transition:** one-time authenticated `/internal/bootstrap` initializes only an untouched first world; production ownership decision/runbook remains | I | P2 | Spec §48 |

## 5. Missing screen states & API surfaces

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-033 | **Resolved locally:** reconnecting overlay pauses commands and explains resync state | I | P1 | Screen |
| W-034 | **Resolved locally:** critical Core notice and visual pulse threshold | I | P1 | Screen |
| W-035 | **Resolved locally for the current status contract:** payment checking, confirmed, failed, and still-confirming states render with retry guidance; real provider confirmation remains external | I | P1 | Spec Seq 3 |
| W-036 | **Resolved locally:** active turn countdown readout with authority lease expiry | I | P1 | Screen |
| W-037 | **Resolved locally:** S20 defense-placement mode has HUD recede, camera framing, valid-slot glow, ghost preview, confirm/cancel, and versioned submit | I | P1 | Spec §17.4 |
| W-038 | **Resolved locally for the current slice:** ruler defense controls context sheet with shield/brace options and eligibility copy | I | P2 | Screen |
| W-039 | **Resolved locally for the current spectator slice:** active incoming-shot notice and privacy-safe latest-impact ticker; push notifications remain external | I | P3 | Screen |
| W-040 | **Resolved locally for the current slice:** details sheet reads recent events, recent reigns, and privacy-safe archived contributors | I | P2 | Spec §23.9 |
| W-041 | **Resolved locally:** public read-only history and individual reign routes read sanitized `reign_archive` data | I | P2 | Spec §52 |
| W-042 | **Resolved locally for the current read-only slice:** `/history` timeline and Hall of Fame ranking plus `/reigns/[id]` contribution detail are wired to sanitized public APIs | I | P2 | Screens |
| W-043 | S35 queue details (optional launch) | I | P3 | Screen |
| W-044 | **Resolved locally for the dependency-free boundary:** share sheet, reign URLs, and deterministic SVG share-card routes exist; raster/card asset policy remains | E+I | P2 | Spec §42 |
| W-045 | **Resolved locally:** S37 How It Works explainer sheet | I | P2 | Screen |
| W-046 | **Resolved locally for the current slice:** recovery entry outside coronation, code copy/error states, and Worker-harness create/claim/replay flow | V+I | P2 | Screen |
| W-047 | **Resolved locally:** S43 unsupported-WebGL screen with capability detection | I | P2 | Screen |
| W-048 | **Partially resolved locally:** reduced-motion gates presentation loops; separate DPR/shadow graphics policy exists, but browser/device verification remains | I | P2 | Spec §38.5, Phase A item 14 |

## 6. Input, rendering & feel

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-049 | **Resolved locally:** deterministic early-arc dotted preview only | I | P1 | Spec §13.3 |
| W-050 | **Resolved locally:** camera presets per state/device with explicit eased handoffs and defeat framing | I | P1 | Spec §39 |
| W-051 | **Resolved locally:** pointer-capture cancellation plus window blur and visibility-change aim cancellation | V+I | P1 | Spec §24.5 |
| W-052 | **Resolved locally:** keyboard arrows/WASD, +/- power, Space/Enter fire through bounded aim state | I | P3 | Spec §41.3 |
| W-053 | **Resolved locally:** localhost `?debug=1` semantic/camera diagnostics overlay | I | P3 | Spec §29.4 |
| W-054 | **Partially resolved locally:** shared unsupported-WebAudio-safe impact path now has persisted bounded effects volume and mute controls; browser autoplay and real-device audio verification remain | I | P3 | Spec §40 |
| W-055 | **Resolved locally for the current slice:** bounded impulse-driven cosmetic rubble fragments | I | P3 | Review F-06 |
| W-056 | **Partially resolved locally:** prefers-reduced-motion gates major 3D motion, browser preference smoke covers normal/reduced desktop/mobile, and critical DOM states use live regions; high-contrast and assistive-tech verification remain | I | P2 | Spec §41 |

## 7. Payments, business & legal gates

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-057 | Dodo written approval of exact final mechanic (launch gate) | E external | P2 | Spec §34.8, §55.12 |
| W-058 | Refund policy: revoke unused entitlements webhook branch; consumed-shots dispute workflow doc | D→I | P2 | Spec §34.6 |
| W-059 | Chargeback handling: dispute flagging, account risk scoring, operator restrict/ban | E+I | P2 | Spec §34.7 |
| W-060 | Terms of Service + Privacy Policy pages and pre-purchase acknowledgment (consumer-rights jurisdiction review) | E draft→I | P2 | Business gate |
| W-061 | Trademark clearance for "Siege Me" | E legal | P2 | Spec §59.1 |
| W-062 | Launch-strategy decision: operator-seeded ruler vs public first-claim event | D | P2 | Spec §59.8 |
| W-063 | Multi-currency / FX posture doc (currently USD-minor hardcoded in intents) | E | P3 | Implicit |
| W-064 | Email-channel infrastructure decision for magic-link recovery vs shipped recovery-code scheme — document chosen divergence | D+doc | P2 | Spec §33.3 divergence |

## 8. Moderation, abuse & privacy

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-065 | URL reputation provider selection behind `UrlSafetyProvider` interface; default-deny suspicious domains meanwhile | E→I | P2 | Spec §35.2 |
| W-066 | Text/logo content moderation provider (identity message + avatar images) | E→I | P2 | Spec §35.1/35.3 |
| W-067 | Public identity pipeline: replace auto-APPROVED insert with PENDING→review flow + rejection/edit state S40/S41 | I | P2 | Screens |
| W-068 | Impersonation guardrails + S39 domain-control verification badge (spec: "Later") | E+I | P3 | Spec §35.4/35.5, S39 |
| W-069 | **Partially resolved locally:** report endpoint, moderation case persistence, audit trail, and secret-gated list/resolve routes exist; operator workflow and deployment secret remain | I | P2 | Spec §35.5 |
| W-070 | **Partially resolved locally:** scheduled purge now covers expired/used recovery tokens, old attack commands, and webhook payloads; identity/player deletion policy and consent workflow remain | E+I | P2 | ADR-0002 requirement |
| W-071 | **Partially resolved locally:** Worker edge mutation throttle is present; durable/WAF deployment policy remains | E→I | P2 | Acceptance gates |

## 9. Deployment, ops & observability

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-072 | Production cutover runbook executed: real D1 database + remote migrations, `wrangler secret put` set, worker deploy, `api.siegeme.com` DNS/route/TLS, host deploy with env vars, R2 bucket creation, Dodo live product IDs, hosted smoke verification (Tier 4–5) | I (runbook) | P2 | progress.md gated follow-ups |
| W-073 | Cloudflare spend alerts, usage limits, budget guards (ADR cost boundary) | E account ops | P2 | ADR-0002 |
| W-074 | Error monitoring selection + integration (Sentry-equivalent) for client + worker | E→I | P2 | Spec §26.12 |
| W-075 | Analytics: PostHog-style event map covering §44 funnel/game/economy/virality lists; consent-aware | E-lite→I | P2 | Spec §44, §26.11 |
| W-076 | Notifications: email provider selection, in-app channel, aggressive rate limiting (ruler/attacker/defender triggers) | E+I | P3 | Spec §43 |
| W-077 | Verify/dev-workflow doc: CORS allow-list uses `localhost:5188` ports while Next defaults differ; document intended local topology or fix origins | V+I/doc | P2 | Hygiene |
| W-078 | Align `/api/siege/turn/claim` proxy's hardcoded authority fallback with the env-required pattern used by every other route | I | P2 | Inventory §10 |
| W-079 | Secrets rotation procedure + `.dev.vars` gitignore verification runbook | I/doc | P2 | Spec §47.1 |
| W-080 | **Resolved locally/documented:** GameConfig versioning, stale-command rejection, in-flight-turn behavior, migration compatibility, and verification checklist | I/doc | P2 | Spec §49, `docs/CONFIG_CHANGE_POLICY.md` |

## 10. Testing & CI (biggest structural gap: the DO layer has zero tests)

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-081 | **Resolved locally:** dedicated Wrangler real Worker/DO/D1 Vitest harness | I infra | P1 | Test-plan gap |
| W-082 | **Resolved locally for current authority slice:** transaction ordering, replay, queue, grant, recovery, defense, Breaker, succession, and archive scenarios | I | P1 | Coverage gaps |
| W-083 | **Partially resolved locally:** deterministic ballistic matrix, bounded finite impacts, Core monotonicity, generator determinism, finite component stages, realtime version guards, 128 sequential delta projections, and forced sequence-gap churn are tested; full state-machine/property matrix remains, including BRACE reachability under the current legal aim range | I | P2 | Spec §54.2 |
| W-084 | **Partially resolved locally:** real Worker/DO/D1 coverage includes duplicate defense replay, stale attack version rejection with inventory preservation, refund compensation, Durable Object eviction/reconstruction, concurrent coronation protection, and owner-bound payment/grant readiness; broader reconnect churn remains | I | P2 | Spec §54.3 |
| W-085 | **Partially resolved locally:** isolated browser fixture covers fresh migrations, defense placement/persistence, WebSocket reconnect/resync, Power Orb and SHIELD target-specific metadata/VFX with original-detail flight/impact captures, active turn, queued turn, first-shot resolution, promotion, and browser cancellation; BRACE-specific VFX remains gated on the I-15 aim-range/geometry decision, while conquest race remains an authority/runtime proof boundary | I | P2 | Spec §54.4 |
| W-086 | Mobile E2E matrix: iPhone/Android viewports, portrait/landscape, pointer-cancel, background/resume, checkout return, context-loss where testable | I | P2 | Spec §54.5 |
| W-087 | **Partially resolved locally:** browser performance smoke samples render calls, triangles, elapsed interval, and optional JS heap on desktop/mobile; deterministic debris collapse cycles are covered in `src/game/presentation/debris.test.ts`, while 100+ rendered sequential events, FPS, and WS churn remain | I | P3 | Spec §54.6 |
| W-088 | **Resolved locally as an exploratory model:** deterministic parameterized simulator and tests exist; richer live-rule terms and reviewed tuning scenarios remain | E math→I tool | P2 | Spec §45.1 |
| W-089 | **Resolved locally:** CI gates lint, dual typecheck, Vitest, build, and Wrangler dry-run; browser smoke needs a hosted fixture | I | P2 | Implicit |
| W-090 | **Resolved locally:** shared command fingerprint canonicalizes standard projectile defaults, tolerates sub-micro-unit float noise, and rejects meaningful aim/projectile changes; unit tests cover the boundary | V+I | P2 | Implicit |

## 11. Documentation & knowledge-state fixes

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-091 | **Resolved:** canonical architecture corrections record created | D+doc | P1 | Multiple deviations |
| W-092 | **Resolved locally:** three.js/R3F audit findings reconciled into source, tests, and this backlog | I meta | P1 | Untracked docs |
| W-093 | **Resolved locally:** current reconciliation addendum added to the design review | I/doc | P2 | Audit issue 6 |
| W-094 | **Resolved locally:** `.env.example` includes `DODO_DEFENSE_PRODUCT_ID` | I | P2 | Inventory §9 |
| W-095 | **Resolved:** removed the obsolete `isDodoConfigured()` helper finding from the active implementation | I | P3 | Inventory §10 |
| W-096 | **Resolved locally for the portable boundary:** R2 binding, owner-scoped upload/delete, signature/dimension checks, byte limit, metadata stripping, D1 asset metadata, compensating delete, and gated delivery are active; decoder resize/re-encode remains W-028 hardening | D | P3 | Inventory §9 |
| W-097 | Legacy resolver decision record is correct; keep label synchronized in any refactor | V/doc | P3 | progress.md |
| W-098 | **Resolved locally:** authoritative impact point and flight duration flow from ballistic resolver through Worker response, client state, projectile, impact ring, and semantic result | I | P1 | Three.js animation audit A-01/A-03 |
| W-099 | **Resolved locally:** validate BRACE attachment eligibility before consuming defense entitlement, with dedicated authority regression | I | P1 | Implicit transaction invariant |
| W-100 | **Partially resolved locally:** shared WebAudio context, persisted effects mixer, target-aware impact labels, release recoil, muzzle flash, world cues, reduced-motion gating, and client rejection cleanup; autoplay and device verification remain | I | P2 | Three.js animation audit A-02/A-03 |

## 12. Explicitly deferred (spec §57 — do NOT build now)

Richer dense observer view · user-arranged fortress layouts · extra projectile sidegrades · additional secondary targets · themed worlds · seasonal competitions · creator-seeded battles · Dunk Tank / Can Knockdown / Ring Toss / Internet Fair booths. Non-goals from §2.2 remain standing (no chat, guilds, cash prizes, NFTs, subscriptions, arbitrary HTML, etc.).

## Standing launch-gate summary (from ACCEPTANCE_GATES.md + §55)

A release candidate is NOT shippable until: payment gate (real Dodo webhook and product verification), realtime/concurrency gate (DO integration and load tests), physics gate (local foundation verified), product-surface gate (post-payment UX remains), procedural-world gate (verified), mobile gate (browser smoke verified, hosted/device follow-up remains), safety gate (moderation, rate limits, retention), visual gate (polish), plus §55.12 provider approval (W-057).
