# Audit Reconciliation: September 3, 2026

This note updates the August 31 audit package against the live checkout. It is
an additive reconciliation, not a replacement for `05` through `08`.

## Live-state change

The checkout now contains concurrent modifications to `cloudflare/src/index.ts`,
`src/components/GameCanvas.tsx`, `src/components/SiegeApp.tsx`,
`src/app/globals.css`, browser evidence artifacts, `docs/GAME_DESIGN_AUDIT.md`,
`docs/THREEJS_MASTER_TASK_CATALOG.md`, and generated context. New untracked
surfaces include `.mimosa/`, `.wrangler-play-state/`, `artifacts/play-session/`,
`docs/MULTI_DOMAIN_SYSTEMS_AUDIT.md`, and
`docs/RESEARCH_AND_EXPLORATION_RECORD.md`. These changes are not attributed to
this audit and were not overwritten.

The earlier package remains the canonical task inventory, but this note adds the
new September proposals below so they are not lost or mistaken for verified
requirements.

## Newly surfaced proposed or research tasks

| ID | Source | Task | Current truth status | Required next step |
|---|---|---|---|---|
| MP-1 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Measure and, if needed, implement Durable Object WebSocket hibernation and delta payloads for spectator scale. | Proposed; the document's 10,000-socket/10 KB/CPU claims are not current Tier 3-5 evidence. | Load model, regional soak test, payload trace, then architecture decision. |
| PERF-1 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Merge static foundation geometry with `BufferGeometryUtils.mergeGeometries`. | Proposed optimization; current draw-call and triangle figures are not reproduced in this session. | Profile before/after on supported devices; reject if iteration or memory worsens. |
| SH-1 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Prototype a Core aura/Fresnel shield shader. | Proposed visual enhancement, not a defect. | Visual prototype plus reduced-motion, fallback, and GPU compatibility review. |
| SH-2 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Prototype noise/Voronoi masonry dissolve and pre-baked rubble archetypes. | Proposed; no player-value or performance evidence yet. | Compare against current instanced debris with a bounded visual/perf test. |
| PERF-2 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Add runtime frame-drop degradation that can disable bloom. | Adjacent to existing graphics policy; threshold and UX are unspecified. | Define device-class budgets and hysteresis before implementation. |
| PERF-3 | `RESEARCH_AND_EXPLORATION_RECORD.md` | Evaluate `frameloop="demand"` or adaptive quiescence for idle spectators. | Research hypothesis; idle-session duration and “greater than 70%” power reduction are unverified. | Browser/device energy and responsiveness experiment; preserve active-flight quality. |
| PERF-4 | `RESEARCH_AND_EXPLORATION_RECORD.md` | Remove `@react-three/rapier` if it is unused by the client. | Research hypothesis; dependency is present, but removal impact and all call sites need a fresh check. | Bundle analysis, call-site inventory, cold-start benchmark, and rollback plan. |
| GD-R1 | `RESEARCH_AND_EXPLORATION_RECORD.md`, `GAME_DESIGN_AUDIT.md` | Investigate breach accolades/title shards. | Product hypothesis; variable-ratio reward framing creates safety/retention questions. | Research player motivation and abuse risk; enforce cosmetic-only invariant if adopted. |
| GD-R2 | `RESEARCH_AND_EXPLORATION_RECORD.md`, `GAME_DESIGN_AUDIT.md` | Investigate free spectator predictions/leaderboard. | Product hypothesis; “no monetary value” is not a legal conclusion. | Product/legal review, age/region analysis, anti-bot design, and playtest. |
| GD-R3 | `GAME_DESIGN_AUDIT.md` | Simulate reign-duration pacing under damage/config variants. | Research task; current balance simulator representativeness remains a known concern. | Rebuild from the live resolver and compare against observed playtest data. |
| GD-I1 | `GAME_DESIGN_AUDIT.md` | Add an “under siege” urgency/pulse state. | Proposed presentation change. | Comprehension and reduced-motion test; avoid manipulative pressure around payment. |
| GD-I2 | `GAME_DESIGN_AUDIT.md` | Add floating damage numbers or equivalent impact feedback. | Proposed presentation change. | Test readability, occlusion, mobile composition, and accessibility. |
| GROW-1 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md`, `GAME_DESIGN_AUDIT.md` | Generate a shareable reign-victory card. | Adjacent product/growth hypothesis; current share-card route exists but viral impact is unknown. | Verify asset privacy, attribution, abuse reporting, and conversion with a bounded experiment. |
| GROW-2 | `MULTI_DOMAIN_SYSTEMS_AUDIT.md` | Evaluate waitlist/community/public-launch channels and pricing experiments. | Proposed go-to-market plan; no demand, channel, or unit-economics evidence. | Research audience, region, age, provider, support, and cost assumptions before launch claims. |
| MEDIA-1 | `RESEARCH_AND_EXPLORATION_RECORD.md` | Select an image normalization path: Workers Images, WASM decoder, or client preprocessing plus server validation. | Decision space is real; cost, limits, decoder support, and privacy claims are not verified here. | Primary provider/runtime research, adversarial corpus, size/CPU benchmark, and fallback decision. |
| MEDIA-2 | `RESEARCH_AND_EXPLORATION_RECORD.md` | Enforce normalized avatar/logo output, EXIF removal, dimensions, MIME, and R2 storage policy. | Partially implemented container checks; complete decoder-backed normalization remains open. | Security test matrix and operator/deletion retention plan. |

## Claims that must be downgraded until verified

The September documents contain useful hypotheses but also state precise values
or outcomes that are not established by the current evidence ledger:

- “less than 1 ms” authority collision time;
- support for 10,000 concurrent spectators;
- 10 KB snapshot size and Cloudflare CPU exhaustion risk;
- exact draw calls, triangles, allocations, GPU memory, and energy savings;
- a 450 KB Rapier payload and an 800 KB WASM decoder payload;
- “zero CAC” viral growth and any conversion outcome;
- “avoiding gambling classification” for prediction tokens;
- exact Cloudflare memory/CPU limits and provider pricing;
- a guaranteed “100% physically simulated” fairness interpretation.

Each is `Proposed`, `Unknown`, or a research input until reproduced with the
appropriate Tier 2-5 evidence and, where relevant, provider, legal, or human
review. No implementation should use these numbers as acceptance thresholds
without a dated benchmark.

## Consolidated current universe

The complete task universe is therefore:

1. The 63 findings/tasks and 12 research questions in
   `06-FINDINGS-AND-TASK-CATALOG.md`.
2. The decision gates and phased implementation work in
   `07-RESEARCH-AND-IMPLEMENTATION-PLAN.md`.
3. The 15 newly surfaced September proposals in this reconciliation.
4. Historical `FE-*`, `SV-*`, `DM-*`, and `GO-*` items in
   `01-FINDINGS-REGISTER.md`, retained for provenance and only actionable after
   current-source revalidation.
5. Existing game-design and Three.js catalog tasks, which remain candidates
   until their status, evidence, and ownership are reconciled against this
   package.

These groups intentionally overlap. The canonical resolution rule is to keep
one task when two records name the same primitive, link the historical ID, and
record whether it is confirmed, resolved, superseded, deferred, or rejected.
Do not implement duplicate shader, networking, pricing, growth, or evidence
systems from parallel documents.

