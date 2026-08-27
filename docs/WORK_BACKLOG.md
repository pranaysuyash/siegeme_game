# Siege Me — Complete Work Universe / Backlog

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
| W-009 | **Partially resolved locally:** fire → resolve → impact/result flow exists; richer between-shot and turn summary remains | I | P0 | Spec §23.4–§23.5, S17–S18 |
| W-010 | Decide commit/PR strategy for the large uncommitted cluster (succession/defense/recovery + audits) once tree is green | D (user gate) | P0 | Git policy |

## 2. Realtime & state-sync correctness

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-011 | **Resolved:** apply `defense_placed` deltas client-side with version guards | I | P1 | Audit issue 4 |
| W-012 | Spectator attacker attribution chip (S04) + ephemeral display-name scheme for anonymous attackers (they have no public identity) | D+I | P1 | Implicit |
| W-013 | Broadcast batching window (~100 ms) residual from F-05; payload size cap under load | I | P3 | Review F-05, §32.5 |
| W-014 | `world_events` growth strategy in DO SQLite storage: prune/move old events to D1; quota policy | E+I | P2 | Implicit (unbounded append-only store) |
| W-015 | Server-authoritative time source for reign durations/countdowns (client Date.now drift) | V+I | P2 | Implicit |
| W-016 | Guard client `pendingSnapshot` swap against firing during resync (desync edge) + test | I | P2 | Implicit |

## 3. Defense & shared attacker economy

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-017 | **Resolved locally:** escalating defense price ladder ($3→$34) is authoritative in config, reign state, checkout intent, webhook match, and UI | I | P1 | Spec §16.2, Seq 5 |
| W-018 | **Resolved locally:** Royal Guard accrues +25 per placement and arms a one-hit direct-Core pulse at 100 | I | P1 | Spec §18 |
| W-019 | **Resolved locally:** tunable rules are centralized in versioned `GameConfig` and recorded in state | I | P1 | Spec §49 |
| W-020 | Shield/brace model decision: current hit-count objects (SHIELD=2, BRACE=1) vs spec §17.2 brace-attaches-to-damaged-component (−35% reduction); unify or record deviation canonically | D | P1 | Deviation list |
| W-021 | **Resolved locally:** defense placement rejects an active attack turn | V+I | P1 | Spec §17.3 |
| W-022 | Power Orb: moving secondary target object, generator defn, ballistics target type, hit charge +25 | I | P2 | Spec §15, Seq 6 |
| W-023 | Breaker Shot: Siege Charge threshold arming, grant to crossing attacker, fourth bonus-shot model when pack consumed, 1.5× structure / 25% penetration caps | I | P2 | Spec §15.3–15.4 |
| W-024 | Contribution scoring + titles (Conqueror, Siege MVP, Breaker, Shieldbreaker, Royal Guard MVP) persisted at reign close | I | P2 | Spec §21 |
| W-025 | World cues for meters (attack crystal charging, defensive aura) per "state communication" section | I | P3 | Spec §6.4 |

## 4. Succession / coronation completion

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-026 | Coronation protected-window timeout → fallback identity → ACTIVE (no-stall guarantee); + countdown UI | I | P1 | Spec §20.2, Audit issue 5 |
| W-027 | Coronation window value: current 60 s vs spec recommended 120 s — set in config | D | P1 | Deviation |
| W-028 | Logo/avatar upload pipeline: signed upload, MIME sniff/decode/strip-metadata/resize/re-encode, moderation step, serve normalized only (note: Worker image processing library must be researched — no native Canvas on Workers) | E→I | P2 | Spec §35.3 |
| W-029 | CTA selector, social handle field, URL metadata autofill (server-side OG fetch + sanitize) in coronation form | I | P2 | Spec §23.8 |
| W-030 | S24 Core Destroyed cinematic, S28 new-reign transition, S29 dethroned overlay | I | P2 | Screens |
| W-031 | Identity-lock enforcement verify: no silent URL/display swap mid-reign; admin disable path | V+I | P2 | Spec §5.6 |
| W-032 | First-world seeding story: operator bootstrap/reseed admin endpoint or wrangler script replacing today's hardcoded founder reign | I | P2 | Spec §48 |

## 5. Missing screen states & API surfaces

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-033 | S01 proper reconnecting overlay (copy/steps/failure escalation) | I | P1 | Screen |
| W-034 | S05 critical-siege presentation + HUD warning threshold | I | P1 | Screen |
| W-035 | S10 payment-failed retry overlay + S11 granted confirmation transition | I | P1 | Spec Seq 3 |
| W-036 | S13 your-turn ready countdown transition | I | P1 | Screen |
| W-037 | S20 full defense-placement mode: HUD recede, camera framing, valid-slot glow, ghost preview, confirm/cancel | I | P1 | Spec §17.4 |
| W-038 | S22 ruler defense controls context sheet | I | P2 | Screen |
| W-039 | S23 under-siege alert (depends on notifications W-06x) | I | P3 | Screen |
| W-040 | S30 details-sheet enrichment: queue length, recent events, contributors | I | P2 | Spec §23.9 |
| W-041 | **Resolved locally:** public read-only history and individual reign routes read sanitized `reign_archive` data | I | P2 | Spec §52 |
| W-042 | S31 history sheet/route, S32 timeline, S33 Hall of Fame, S34 contribution rankings | I | P2 | Screens |
| W-043 | S35 queue details (optional launch) | I | P3 | Screen |
| W-044 | S36 share sheet + share URLs + share-card image generation (approach research static vs runtime render) | E+I | P2 | Spec §42 |
| W-045 | **Resolved locally:** S37 How It Works explainer sheet | I | P2 | Screen |
| W-046 | S42 recovery UX polish: entry outside coronation sheet, error/copy states (recover button exists in LiveMeta — verify full flow) | V+I | P2 | Screen |
| W-047 | **Resolved locally:** S43 unsupported-WebGL screen with capability detection | I | P2 | Screen |
| W-048 | **Resolved locally:** S44 reduced-motion/graphics behavior lowers DPR and disables shadows; device-class heuristics remain future hardening | I | P2 | Spec §38.5, Phase A item 14 |

## 6. Input, rendering & feel

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-049 | **Resolved locally:** deterministic early-arc dotted preview only | I | P1 | Spec §13.3 |
| W-050 | Camera preset system per state/device derived from world bounds (LIVE/ATTACK/DEFEND × desktop/mobile, CORONATION, DEFEAT_CINEMATIC); replace single fixed camera | I | P1 | Spec §39 |
| W-051 | Pointer-capture cancellation/background-resume edge cases on touch (audit gesture path) | V+I | P1 | Spec §24.5 |
| W-052 | Keyboard alternative input (aim/elevation/power/fire) | I | P3 | Spec §41.3 |
| W-053 | Collider/component-ID debug overlay mode | I | P3 | Spec §29.4 |
| W-054 | Audio category set (release/stone/shield/core/shield-break/collapse/conquest/coronation), mute + persisted volume + autoplay unlock | I | P3 | Spec §40 |
| W-055 | Destruction debris physics upgrade (F-06 residue: impulse-driven cosmetic fragments beyond hop-once rubble) | I | P3 | Review F-06 |
| W-056 | prefers-reduced-motion handling, high-contrast HUD, DOM-text duplicates of critical state (a11y baseline) | I | P2 | Spec §41 |

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
| W-069 | Report-ruler endpoint + admin case surface | I | P2 | Spec §35.5 |
| W-070 | Data retention/deletion + consent paths for stored identity/player records; purge job | E+I | P2 | ADR-0002 requirement |
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
| W-080 | Config-change discipline: how GameConfig changes apply to future turns/reigns without touching in-flight shots | I/doc | P2 | Spec §49 |

## 10. Testing & CI (biggest structural gap: the DO layer has zero tests)

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-081 | Stand up a Durable Object test harness (miniflare / vitest-pool-workers, or extract handlers toward pure logic) — prerequisite for all below | I infra | P1 | Test-plan gap |
| W-082 | DO handler tests: attack transaction ordering, replay idempotency (incl. fingerprint mismatch 409), queue promotion/expiry, coronation transitions, grants idempotency, recovery eligibility | I | P1 | Coverage gaps |
| W-083 | Property tests (§54.2): core ≤ max; core never rises during ACTIVE; shots ≥ 0; ≤1 active turn; monotonic stateVersion/eventSequence; one active reign; single conqueror; invalid slots impossible; determinism | I | P2 | Spec §54.2 |
| W-084 | Integration tests (§54.3): duplicate webhooks, closed-browser payment, shot retry/network loss, commit-response loss, version conflict, queue disconnect, reconnect, conquest race, defense-vs-active-shot | I | P2 | Spec §54.3 |
| W-085 | Scripted multiplayer E2E extending browser-smoke: two-context watch/pay/shoot/persist + defense visibility + conquest race | I | P2 | Spec §54.4 |
| W-086 | Mobile E2E matrix: iPhone/Android viewports, portrait/landscape, pointer-cancel, background/resume, checkout return, context-loss where testable | I | P2 | Spec §54.5 |
| W-087 | Performance test harness: collapse cycles, 100+ sequential events, memory/FPS sampling, WS reconnect churn | I | P3 | Spec §54.6 |
| W-088 | Offline balance simulator (headless): aim distributions, attack/defense volume vs ladder, reign-length & revenue outcomes before live tuning | E math→I tool | P2 | Spec §45.1 |
| W-089 | **Resolved locally:** CI gates lint, dual typecheck, Vitest, build, and Wrangler dry-run; browser smoke needs a hosted fixture | I | P2 | Implicit |
| W-090 | Idempotency robustness: verify command fingerprint tolerance for float serialization differences across retries | V+I | P2 | Implicit |

## 11. Documentation & knowledge-state fixes

| ID | Task | Type | Pri | Source |
|---|---|---|---|---|
| W-091 | **Resolved:** canonical architecture corrections record created | D+doc | P1 | Multiple deviations |
| W-092 | Triage the four new three.js/R3F audit docs (`THREEJS_*_AUDIT.md`, `R3F_DREI_AUDIT.md`) — extract actionable findings into concrete backlog items; bodies not yet synthesized | I meta | P1 | Untracked docs |
| W-093 | Refresh stale claims in `SYSTEM_AND_GAME_DESIGN_REVIEW.md` (F-01/F-02 implemented; matrix section outdated) | I/doc | P2 | Audit issue 6 |
| W-094 | `.env.example`: add missing `DODO_DEFENSE_PRODUCT_ID` | I | P2 | Inventory §9 |
| W-095 | `isDodoConfigured()` dead helper: wire into UI disabled states or remove | I | P3 | Inventory §10 |
| W-096 | **Partially resolved locally:** R2 binding, owned upload, signature checks, D1 asset metadata, and gated delivery are active; full normalization remains W-028 hardening | D | P3 | Inventory §9 |
| W-097 | Legacy resolver decision record is correct; keep label synchronized in any refactor | V/doc | P3 | progress.md |

## 12. Explicitly deferred (spec §57 — do NOT build now)

Richer dense observer view · user-arranged fortress layouts · extra projectile sidegrades · additional secondary targets · themed worlds · seasonal competitions · creator-seeded battles · Dunk Tank / Can Knockdown / Ring Toss / Internet Fair booths. Non-goals from §2.2 remain standing (no chat, guilds, cash prizes, NFTs, subscriptions, arbitrary HTML, etc.).

## Standing launch-gate summary (from ACCEPTANCE_GATES.md + §55)

A release candidate is NOT shippable until: payment gate (real Dodo webhook and product verification), realtime/concurrency gate (DO integration and load tests), physics gate (local foundation verified), product-surface gate (post-payment UX remains), procedural-world gate (verified), mobile gate (browser smoke verified, hosted/device follow-up remains), safety gate (moderation, rate limits, retention), visual gate (polish), plus §55.12 provider approval (W-057).
