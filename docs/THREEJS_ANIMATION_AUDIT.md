# Siege Me Three.js Animation and Game Audit

**Status:** current review with bounded local remediation applied; external and product decisions remain open
**Date:** 2026-08-27
**Owner:** Siege Me game team
**Canonical path:** `docs/THREEJS_ANIMATION_AUDIT.md`
**Audit method:** `threejs-animation` skill at `/Users/pranay/Projects/skills/threejs-animation/SKILL.md`, plus the project review, testing, and documentation doctrines
**Scope:** current live checkout, procedural Three.js/R3F scene, animation loop, client presentation state, authoritative attack path, existing tests, current local runtime, and related project documentation

This is an evidence-bounded audit, not a claim that the game is launch-ready.
The original findings below are retained for provenance. The reconciliation
addendum at the end is the current status after the local implementation pass.

## 1. Executive outcome

Siege Me currently uses a procedural R3F scene rather than a GLTF or skeletal
animation pipeline. The architecture remains appropriate for the project
boundary: the world generator owns stable semantic geometry, the Worker owns
collision and damage, and the client owns input plus responsive presentation.
The local remediation pass now routes Power Orb and defense impacts through a
canonical presentation resolver, carries the authoritative impact point and
flight duration, gates the major procedural loops under reduced motion, and
adds release recoil and target-aware feedback.

The animation system is still not a complete launch game-feel system. It has a
responsive projectile arc, camera presets and handoffs, core/banner/orb motion,
rubble impulse, trajectory dots, release recoil, a muzzle flash, and an impact
ring. The product's 3 to 5 second choreography target, richer particles,
material-specific effects, and staged collapse remain a product-tuning and
implementation decision. The local harness is green in its dedicated isolated
configuration, but this is not hosted or production evidence.

## 2. Truth and evidence basis

### Observed, Tier 1 static inspection

- `src/components/GameCanvas.tsx` contains the only current R3F scene and uses
  `useFrame` for procedural motion. No `AnimationMixer`, `AnimationClip`,
  `GLTFLoader`, `SkinnedMesh`, or morph-target animation path was found in
  `src/` or `scripts/`.
- `src/game/world/generator.ts` supplies deterministic semantic components,
  defense slots, launcher position, and a Power Orb anchor. It is the shared
  geometry input for the resolver and renderer.
- `src/game/simulation/ballistics.ts` resolves first swept intersections against
  destructible components, the moving Power Orb, and active defense slots.
- `cloudflare/src/index.ts` applies the authoritative result, updates the world
  version, and returns an impact identity and damage summary to the client.
- `src/game/client/store.ts` keeps the authority result in `pendingSnapshot`
  while the local projectile is in flight, then commits the newest acceptable
  snapshot at completion.

### Verified, Tier 2 focused checks

- `npm run typecheck:app` passed.
- `npm run lint` passed.
- `npx vitest run cloudflare/test/authority.harness.test.ts -t "runs succession" --reporter=verbose`
  passed in isolation. Its log showed the expected transition from
  `core:enclosure` to `core:main` and then coronation.
- `npm test` ran 12 files and 53 tests, with 52 passing and the succession
  harness failing in the full suite because it did not reach `CORONATION` within
  180 iterations. This is recorded as a failure, not retried into a green claim.

### Verified, Tier 4 local runtime observation

- The existing local frontend on `http://127.0.0.1:5188/` mounted the current
  page in `spectator` mode with `World ready`, a WebGL context, and the local
  Worker snapshot `reign:001`, world version 1, Core 100.
- The desktop ephemeral Playwright observation saw a 1280 by 720 canvas, a
  PerspectiveCamera at the authored live preset, and no console or page errors
  during initial load.
- A second ephemeral mobile observation saw a 390 by 844 canvas, WebGL, stable
  spectator mode, and 35 rendered frames after 500 ms with 1,926 triangles.
- The preserved artifacts
  [`artifacts/browser-smoke/desktop.png`](../artifacts/browser-smoke/desktop.png)
  and [`artifacts/browser-smoke/mobile.png`](../artifacts/browser-smoke/mobile.png)
  were visually inspected. They show a rendered fortress and readable HUD. The
  mobile spectator framing crops the attacker platform and launcher almost
  entirely; attack-mode framing was not directly exercised in this observation.

### Unknown or not established

- No real paid attack was executed in the browser, so release-to-impact behavior
  and secondary-target presentation remain statically inferred.
- No long-running frame-time, GPU-memory, device matrix, or performance budget
  measurement was performed.
- No device-level screen reader, reduced-motion, or touch attack completion was
  performed.
- The occupied ports are existing shared local processes. The observations above
  establish the served page and Worker response, not hosted or production proof.

## 3. Reconstructed presentation chain

The current attack chain is:

`pointer/keyboard intent`
→ `useSiegeStore.attackAim`
→ `POST /attack` with turn, reign, world version, and ballistic inputs
→ `resolveBallisticShot` in the Worker
→ `impact.targetId`, damage, and a newer snapshot
→ local `attack-flight` projectile interpolation
→ `completeProjectile()` at approximately 850 ms
→ newest acceptable snapshot plus a 700 ms impact ring
→ spectator result and optional entitlement refresh

This separation is structurally sound. It prevents the renderer from becoming
the authority and makes a local visual prediction possible. The weak link is
that the result contract carries a target identity but the renderer only resolves
component identities. The chain therefore breaks at the target-to-scene mapping
boundary for Power Orb and defense hits.

## 4. Current animation inventory

| Surface | Current implementation | Evidence status | Assessment |
|---|---|---|---|
| Camera handoff | Pure presets in `src/game/camera.ts`; position/quaternion easing in `CameraRig` | Tier 1 plus local runtime mount | Present and reasonably isolated |
| Camera shake | Flight-only positional perturbation in `CameraRig` | Tier 1 | Present, but tied to wall-clock time and not independently runtime-tested during an attack |
| Launcher | Aim yaw/elevation, pullback scale, tension ring | Tier 1 | Responsive aim feedback; no release recoil |
| Projectile | Local `useFrame` arc using R3F `delta` and reusable refs | Tier 1 | Present for component targets; endpoint mapping has a secondary-target defect |
| Trajectory preview | Twelve declarative dots derived from shared ballistic input | Tier 1 | Present; no runtime attack observation |
| Core pulse | State-sensitive procedural scale pulse | Tier 1 | Present; continues under reduced-motion preference |
| Flags | Sinusoidal Y rotation on subdivided planes | Tier 1 | Present; no vertex-wave or crest texture |
| Power Orb | Continuous rotation and vertical tilt | Tier 1 | Present; projectile endpoint is not mapped to it |
| Destruction | State replacement with a short rubble group impulse | Tier 1 | Present but minimal; no dust, smoke, fragments, or staged collapse |
| Impact feedback | Expanding ring, fading opacity, one synthesized thump | Tier 1 | Present; target position defect applies to non-component hits |
| GLTF/skeletal/morph animation | None found | Tier 1 | Not a gap by itself because procedural-first is the current product boundary |

## 5. Findings

### A-01: Secondary authoritative targets animate to the fallback origin

**Priority:** P1  
**Truth status:** Observed  
**Confidence:** High  
**Evidence:** `src/components/GameCanvas.tsx:371-374` and `:402-403`,
`src/game/simulation/ballistics.ts:111-126`,
`cloudflare/src/index.ts:478-517`

The Worker can return `power-orb` or `defense:<id>` as the authoritative
`impact.targetId`. Both `Projectile` and `ImpactBurst` search only
`definition.components`. When that lookup fails, both use
`new THREE.Vector3(0, 1, 0)`. The projectile can therefore visibly land at
the fallback location while the server records a Power Orb or defense hit
elsewhere. The impact ring has the same defect.

**User consequence:** a player can successfully choose a secondary target and
see a misleading impact location. This is especially harmful for the newly
introduced Power Orb because its visual position is part of the skill loop.

**Why this is a boundary issue:** the response preserves semantic identity, but
there is no single client-side visual target resolver that understands all
authoritative target kinds. Adding ad hoc lookups in two effects would repeat
the same mapping logic.

**Recommended next action, proposed:** create one presentation-only resolver
that maps component IDs, `power-orb`, and active defense IDs to scene positions,
or extend the response with an authoritative impact point if that point is the
canonical presentation contract. Add focused tests for all target classes and a
browser attack observation for one Power Orb or defense hit.

**Falsifier:** a runtime attack observation that proves both projectile and ring
resolve to the actual Power Orb or defense slot under the current code, or a
different current renderer path that owns this mapping.

### A-02: Reduced-motion preference is conflated with reduced graphics, and
procedural motion is not fully reduced

**Priority:** P1  
**Truth status:** Observed  
**Confidence:** High  
**Evidence:** `src/components/GameCanvas.tsx:34-35`, `:46-52`,
`:462-470`, `:521-539`; `src/app/globals.css:172-174`; product contract
`docs/Siege-Me-Agent-Handoff/authoritative/FULL_PRODUCT_TECHNICAL_SPEC.md:2945-2951`

`CameraRig` reads `prefers-reduced-motion` and uses it to remove camera
handoff duration. `GameCanvas` independently reads the same preference into a
variable named `reducedGraphics`, then lowers DPR and disables shadows. The
CSS disables CSS keyframe animations, but the procedural `useFrame` loops for
the core, flags, Power Orb, and rubble continue to update. Camera shake is also
not explicitly gated by the preference.

**User consequence:** a user requesting less motion may still receive
continuous 3D motion, while a user requesting motion reduction also receives a
quality downgrade that was not part of the preference. The behavior is not
consistent with the contract to reduce shake and debris while keeping the
outcome understandable.

**Recommended next action, proposed:** separate motion policy from graphics
quality policy. Pass a motion-reduced flag to the procedural animation owners,
disable or clamp idle motion and rubble, explicitly remove flight shake, and
shorten cinematic handoffs. Keep DPR/shadow degradation behind a distinct
device or graphics policy with an observable reason.

**Falsifier:** a device/browser test showing that all material 3D motion is
suppressed or reduced under the preference and that the graphics downgrade is an
intentional, documented product choice.

### A-03: Attack choreography is shorter and less expressive than the product
contract

**Priority:** P1  
**Truth status:** Observed, with visual consequence inferred  
**Confidence:** High for timing, medium for game-feel consequence  
**Evidence:** `src/components/GameCanvas.tsx:378-385` uses an approximately
850 ms flight; `:411-417` uses a 700 ms impact ring; the product contract calls
for a typical 3 to 5 second impact animation at
`docs/Siege-Me-Agent-Handoff/authoritative/FULL_PRODUCT_TECHNICAL_SPEC.md:989-997`
and calls for recoil, impact particles, damage staging, camera choreography,
and collapse timing at `:822-839`.

The implementation gives the player a quick local arc and a small ring, but no
release recoil, muzzle flash, smoke, impact particles, material-specific impact
feedback, or staged collapse. This may be an intentional early-slice tuning
choice, but it is a material deviation from the intended spectacle contract and
should not be described as complete game-feel coverage.

**Recommended next action, proposed:** decide whether the launch slice keeps the
short 850 ms response for responsiveness or adopts a longer staged sequence.
Whichever choice is made, centralize the timing constants and cover the sequence
as a state machine: aim → release → flight → authoritative impact → readable
result → destruction/collapse.

**Falsifier:** a current product decision that explicitly supersedes the 3 to 5
second target and accepts the present minimal choreography for launch.

### A-04: Full authority test suite is order/state dependent

**Priority:** P0 for evidence reliability  
**Truth status:** Verified failure, Tier 2; S2 is not applicable because no fix
was made  
**Confidence:** High  
**Evidence:** `npm test` ran 53 tests with one failure in
`cloudflare/test/authority.harness.test.ts:241-253`; the failing assertion was
that succession did not reach `CORONATION` within 180 iterations. The isolated
command `npx vitest run cloudflare/test/authority.harness.test.ts -t "runs
succession" --reporter=verbose` passed and logged the intended
enclosure-to-Core sequence.

The succession fixture assumes a suitable initial world, but the full suite
executes other attack tests before it. The difference between full-suite and
isolated behavior is consistent with shared mutable Durable Object or fixture
state, test-order dependence, or a timing-sensitive harness setup. The exact
cause is not yet isolated.

**User/team consequence:** a future game or authority change can appear green
under focused execution while the complete evidence gate is red. This blocks a
reliable claim about atomic conquest and coronation.

**Recommended next action, proposed:** make each authority test own a fresh
isolated world or explicitly reset the fixture between tests. Then run the full
suite in multiple orders or with deliberate state perturbation. Keep the
succession assertion and add a failure trace containing world version, phase,
Core HP, enclosure state, and the last accepted impact.

**Falsifier:** a fresh-run investigation showing the failure is solely external
resource contention and that the harness creates a fresh isolated Durable Object
and D1 state per test.

### A-05: Mobile spectator framing does not expose the attacker affordance

**Priority:** P2  
**Truth status:** Observed, Tier 4 artifact inspection  
**Confidence:** High for the preserved spectator artifact, unknown for attack mode  
**Evidence:** preserved `artifacts/browser-smoke/mobile.png`; camera presets in
`src/game/camera.ts:31-38`; mobile CSS in `src/app/globals.css:149-170`.

The portrait spectator composition keeps the fortress readable, but the launcher
and attacker platform are cropped or hidden at the lower-left edge. This is
acceptable only if spectator mode intentionally prioritizes the fortress and
attack mode reliably reframes the launcher. The latter has not been observed in
this audit.

**Recommended next action, proposed:** run a real mobile attack-mode browser
flow, record the camera preset and screenshot before release, and verify that
the launcher, trajectory preview, HUD, and release gesture are all visible
together without blocking the fortress target.

**Falsifier:** a Tier 4 attack-mode observation showing the ATTACK preset exposes
the launcher and aiming path on a 390 by 844 viewport.

### A-06: Existing Three.js audit documents disagree with current source

**Priority:** P1 documentation debt  
**Truth status:** Contested, because current source and older audit text disagree  
**Confidence:** High  
**Evidence:** `docs/R3F_DREI_AUDIT.md` still describes per-frame projectile
`Vector3` allocation, per-frame Zustand clock updates, per-frame camera
`lookAt`, uninstanced crenellations, and missing adaptive helpers. Current
`src/components/GameCanvas.tsx:133-170`, `:371-385`, `:428-447`, and
`:538-539` show instancing, ref-scoped projectile vectors, local frame
progression, and adaptive helpers. `docs/status-and-gap-audit-2026-08-27.md`
also retains historical rows saying camera presets, trajectory preview, keyboard
input, and reduced graphics are missing even though its reconciliation addendum
records some of those as implemented.

The docs contain valuable historical reasoning, so deletion is not the right
correction. They need an explicit current-status boundary or a supersession link
to this audit and the current backlog.

**Recommended next action, proposed:** after source review, update the older
audit docs with a dated reconciliation or mark their historical sections as
superseded. Extract only still-valid actions into `docs/WORK_BACKLOG.md`. Do
not use the older “P0” claims as current implementation status.

**Falsifier:** a documented alternate source version or generated artifact that
shows the older audit was intentionally scoped to an earlier commit and is
already clearly marked historical for all consumers.

## 6. What is working and worth preserving

- Procedural-first geometry matches the product boundary and avoids a required
  external model-pack dependency.
- The render layer does not own damage or succession. The Worker resolves the
  shot and the client uses a version-aware pending snapshot.
- R3F `useFrame` owns continuous visual interpolation instead of writing
  projectile progress to Zustand on every frame.
- The projectile uses memoized start/end vectors and a ref-scoped scratch
  position, so the old per-frame allocation finding is not current.
- Repeated crenellations and rubble use Drei instancing.
- Camera presentation is factored into pure presets and has focused tests for
  aim FOV, mobile distance, defeat framing, and easing behavior.
- The page exposes `render_game_to_text` and Three.js diagnostics, which create a
  useful bridge between visual runtime evidence and deterministic inspection.

## 7. Recommended sequencing before implementation

1. Repair authority test isolation and rerun the full suite. This is the first
   evidence gate because it protects the game’s shared-world invariants.
2. Resolve the canonical visual-target contract for components, Power Orb, and
   defenses. Add focused unit tests and one browser-observed target flow.
3. Decide the launch choreography budget and document the decision. Then add
   release recoil, target-specific impact feedback, and destruction staging only
   within that agreed budget.
4. Split motion and graphics policies, then verify reduced-motion behavior in a
   browser with the preference enabled.
5. Run the mobile attack-mode observation and reconcile stale Three.js status
   docs before claiming the animation surface is complete.

## 8. Completeness statement

### Reviewed

- Current Git status and dirty-work ownership boundary.
- R3F scene, camera, procedural animation, projectile, impact, input, and
  diagnostics paths.
- Client Zustand presentation state and authority snapshot handoff.
- Ballistic resolver and Worker attack transaction target types.
- Existing Three.js audit documents, product animation/accessibility contract,
  acceptance gates, and work backlog.
- App typecheck, lint, full test result, isolated succession result, ephemeral
  desktop runtime observation, ephemeral mobile runtime observation, and
  preserved desktop/mobile screenshots.

### Not reviewed or not proven

- Production deployment, hosted CDN, Dodo payments, real customer traffic,
  real-device GPU performance, audio policy across browsers, screen readers,
  and full touch attack completion.
- A real browser attack with a paid entitlement, Power Orb hit, defense hit,
  Core destruction, coronation, or new-reign cinematic.
- Long-running animation memory behavior, frame-time budgets, and context-loss
  recovery.

### Remaining uncertainties

- Whether the full-suite succession failure is test fixture contamination,
  Durable Object lifecycle reuse, or a timing/resource race.
- Whether the mobile ATTACK preset is sufficient even though the S03 spectator
  artifact crops the launcher.
- Whether the short animation timings are a deliberate launch decision or an
  unfinished first slice.

### Evidence tier achieved

Tier 4 for initial local page mounting and preserved visual artifacts; Tier 2
for static-focused checks and test execution. No Tier 3 end-to-end paid attack
or Tier 5 hosted/production evidence was achieved.

### Revisit trigger

Revisit this document before changing projectile target contracts, adding
secondary targets or new projectile types, changing camera or motion policy,
claiming launch-ready animation/game feel, or after the authority test harness
is isolated.

## 9. Current remediation reconciliation

**Reconciliation date:** 2026-08-29

This section supersedes the implementation-status language in Sections 1, 3,
4, and 7 where it conflicts with the current checkout. The original findings
remain above because they preserve the input, source, representation,
transformation, evaluation, and result chain that led to each action.

### Explicit findings from this audit

| Finding | Current status | Evidence and boundary |
|---|---|---|
| A-01 secondary target fallback origin | **Resolved locally** | `src/game/presentation/targets.ts` is the single presentation resolver; the Worker now returns `impact.point`, and both `Projectile` and `ImpactBurst` prefer that exact point before resolving a component, Power Orb, or active defense. Focused target tests pass. |
| A-02 motion preference conflated with graphics quality | **Partially resolved locally** | `GameCanvas` now passes one motion policy to camera, launcher, banners, core, orb, rubble, and impact feedback. Graphics heuristics remain a separate local device policy. The Tier 4 normal/reduced-motion desktop and mobile smoke passes; real-device and assistive-technology verification remain open. |
| A-03 short and minimal choreography | **Partially resolved, decision open** | Release recoil, muzzle flash, target-aware impact color, shared timing constants, and authoritative flight duration are implemented. The product's 3 to 5 second typical choreography, particles, audio categories, and staged collapse still require a product-tuning decision and further implementation. |
| A-04 order/state-dependent authority evidence | **Resolved locally for the dedicated authority gate** | The authority harness owns `harness.reset()` and applies split migration statements in `beforeEach`; `npm run test:harness` passed 11/11. The normal app suite intentionally excludes Cloudflare harness tests and must not be described as the full authority gate. |
| A-05 mobile attacker affordance | **Resolved locally for the active attack surface** | `scripts/browser-attack-flow.mjs` now claims a real Worker-backed turn at 390×844 and asserts the canvas, attack HUD, readout, and release control remain visible within the viewport. The fixture captures `artifacts/browser-attack-flow/attack-mobile-aim.png` and records the measured rectangles in `attack-flow.json`. This is local Tier 4 browser evidence, not real-device proof. |
| A-06 stale Three.js documentation | **Partially resolved** | This addendum is the current animation status owner. Older docs and historical matrices are retained as historical evidence and must not be read as current source status. Backlog reconciliation is required before launch claims. |

### Implicit findings derived from the same chain

These were not all named as separate defects in the original audit, but they
were necessary to make the explicit findings safe to implement.

| ID | Finding | Current status |
|---|---|---|
| I-01 | Authority validation must precede entitlement mutation. Invalid BRACE placement previously consumed a defense pack before returning the missing-damaged-target error. | **Resolved and harness-tested.** Slot validity and BRACE attachment eligibility are checked before `consumeDefenseEntitlement`. |
| I-02 | Target identity alone is insufficient for a moving or non-component visual target. | **Resolved locally.** The response carries `point` and `timeSeconds`; the client stores both and uses the exact point for flight and impact. Misses carry null values and do not invent an endpoint. |
| I-03 | Flight timing was duplicated as a visual constant and could diverge from the authority's ballistic duration. | **Resolved locally with a bounded policy.** `src/game/presentation/timing.ts` centralizes the default, clamp, impact, recoil, rubble, and shake durations. The 0.85 second minimum remains a deliberate prototype baseline, not a claim of spec compliance. |
| I-04 | Retained event presentation used raw target IDs and could disagree with the immediate result copy. | **Resolved locally.** Details events use `impactLabel`, the same semantic vocabulary used by the local shot result, and the public event projection now retains safe projectile type, point, and authority time metadata. |
| I-05 | Opening and closing one WebAudio context per impact is a lifecycle and mobile-policy risk. | **Partially resolved locally.** Impact audio reuses one context, resumes it after a user gesture when possible, and persists bounded effects volume/mute settings. Category mixing, autoplay behavior across browsers, and device verification remain open. |
| I-06 | Keyboard controls existed but were not discoverable in the attack surface. | **Resolved locally.** The attack HUD now states the arrow/WASD, power, and Space/Enter controls. Screen-reader and focus-order verification remain open. |
| I-07 | The legacy threshold resolver could be mistaken for live authority. | **Resolved as a documentation boundary.** `resolveAttackIntent` is explicitly marked as a test/design scaffold; the Worker live path remains `resolveBallisticShot`. Removing the scaffold would require rewriting its focused tests and is not necessary for this slice. |
| I-08 | UI could offer BRACE when no damaged structure existed, creating a predictable rejected command. | **Resolved locally.** The sheet explains the eligibility rule and only exposes preview slots when a damaged or critical component exists. The Worker remains the final authority. |
| I-09 | A green focused test does not establish browser or hosted proof. | **Documented invariant.** Current evidence is split into static, focused, authority-harness, and local browser tiers. No local result is being promoted to production, provider, real-device, or real-customer evidence. |
| I-10 | Existing dirty changes may belong to parallel work and cannot be attributed to this pass without provenance. | **Preserved.** No Git mutation was performed. The final report identifies files touched by this pass separately from the pre-existing dirty cluster where practical, and unresolved attribution remains an ownership risk. |
| I-11 | A claim response can carry a newer authority version than the client snapshot while WebSocket delivery is still pending, causing a fast first shot to submit a stale version. | **Resolved locally and tested.** `claimTurn()` commits a newer response snapshot atomically with the active turn and refuses to replace a newer realtime snapshot; focused store tests and the isolated browser fixture cover the boundary. |
| I-12 | `mode: attack-aim` is a presentation state, not proof that the authority granted a live turn; queued claims can leave the UI in that mode with no usable turn id. | **Resolved locally and in the audit fixture.** The client now requires `turnStatus: active` plus a real turn object before firing and returns queued claims to spectator presentation; the isolated browser path independently waits for the same active-turn predicate. The server-side 409 remains the defense-in-depth stale/unauthorized-command guard. |
| I-13 | Browser accessibility/name locators and post-hydration navigation waits can fail while the rendered action or sheet is visibly present. | **Resolved in the isolated fixture.** Initial action mount uses stable action selectors, exact slot selection uses a text-filtered button after rendered-label diagnostics, and click synchronization waits on the resulting UI/state boundary. This is harness evidence, not an accessibility conformance claim. |
| I-14 | A valid impact screenshot can be visually unhelpful when the one-shot entitlement immediately opens the spent-summary sheet over the effect. | **Resolved for the current capture path.** Target-specific players receive two local fixture shots and fire one, leaving the impact ring and semantic result visible; screenshot evidence remains local Tier 4 only. |
| I-15 | BRACE slots were outside the intersection of generated slot geometry and the UI/legal aim range. | **Resolved locally.** `game-config-0.1.1` sets the legal floor to `0.28`; the ballistic unit test and isolated browser fixture prove direct BRACE reachability and target-specific semantic presentation. |

### Tasks explicitly requested or directly required by the findings

#### Implemented in this local pass

- Establish one target-to-scene resolver for components, Power Orb, defenses,
  misses, and unknown targets, with focused classification and position tests.
- Carry authoritative ballistic impact point and flight time from resolver to
  Worker response, Zustand presentation state, projectile interpolation, and
  impact feedback.
- Add Breaker-aware projectile metadata and semantic impact labels without
  moving damage authority into the renderer.
- Centralize presentation timing and derive bounded flight duration from the
  authoritative duration while preserving the short prototype minimum.
- Add release recoil and a short muzzle flash, with reduced-motion suppression.
- Gate camera shake, banners, core pulse, Power Orb idle motion, rubble motion,
  launcher recoil, and impact-ring animation under reduced motion. Keep device
  graphics degradation separate from the preference.
- Reuse one WebAudio context for synthesized impact feedback.
- Make invalid BRACE validation non-consuming and add a real Worker harness
  regression for the transaction invariant.
- Add queue position, semantic HUD readouts, event loading/error/empty states,
  keyboard help, and BRACE eligibility copy where the existing local contracts
  already support them.
- Add a fresh isolated browser fixture that applies D1 migrations and exercises
  defense persistence plus active/queued/promotion flows through real Next and
  Worker routes.
- Add Durable Object eviction/reconstruction coverage for a persisted active
  turn, including post-eviction shot resolution.
- Mark the legacy threshold resolver as a test scaffold and reconcile this
  audit with the current code path.

#### Local implementation tasks still available without external authority

- **Resolved locally:** added a dedicated client store test for the complete
  Breaker response-to-presentation contract: exact point, bounded duration,
  pending snapshot adoption, semantic result, and impact cleanup. Miss/null
  coverage remains in the focused target and timing tests.
- **Resolved locally for Power Orb and SHIELD defense:** the isolated browser
  fixture deliberately resolves post-defense Power Orb and active-shield hits
  through real Next/Worker routes, recording authority target identity, exact
  in-flight/impact points, semantic results, and original-detail flight/impact
  screenshots. BRACE-specific targeting/VFX is now covered by a fixture that
  damages a generated structure, places the brace, and preserves the consumed
  defense type in the semantic impact result.
- **Resolved locally for synthetic coverage:** the browser preference matrix
  covers normal/reduced-motion desktop and mobile surfaces, keyboard copy, and
  persisted audio controls. Portrait attack composition and real-device
  accessibility remain open.
- Complete contribution/event semantics once the public event contract retains
  attacker attribution and projectile type without exposing private identity.
- **Partially resolved locally:** deterministic property samples now cover 256
  repeated world/event sequences, monotonic Core integrity, finite component
  states, and duplicate/gap realtime decisions. The dedicated harness covers
  stale versions, defense replay, queue promotion, Breaker consumption, and
  Durable Object reconstruction; the full product-spec state machine and
  reconnect/race matrix remain open.
- **Resolved locally for policy diagnostics:** `graphicsPolicyFor()` now
  reports the reduction reason separately from motion preference and the
  benchmark override.
- **Partially resolved locally:** canvas context-loss/restoration listeners are
  lifecycle-cleaned, diagnostics expose `contextLost`, and the UI offers a
  reload path. Measure frame time, GPU memory, draw calls, and reduced-graphics
  behavior on real devices.
- Decide whether destruction stays as instanced rubble or grows into pooled
  impulse fragments, dust, smoke, and staged collapse. Implement only after the
  timing state machine is accepted.

#### Decisions that must be made and documented before implementation expands

- **Choreography budget:** retain the responsive 0.85 to 2.4 second bounded
  presentation, or adopt the product's typical 3 to 5 second sequence. This
  affects turn throughput, queue perception, camera handoff, and mobile motion.
- **Impact contract:** keep server-authoritative world-space points as the
  canonical target presentation data, or version a richer target anchor
  contract for future geometry and secondary objects.
- **Brace semantics:** the current implementation attaches a brace to the
  first damaged or critical component and consumes it on a brace hit. Confirm
  whether it must instead protect a selected structural component before
  exposing a richer placement UI.
- **Audio policy:** choose categories, volume persistence, mute behavior,
  browser gesture recovery, and whether reduced motion also changes audio.
- **Mobile composition:** decide whether spectator mode may crop the launcher,
  or whether every mode must keep the attacker affordance visible.
- **Queue protocol:** authoritative active/queued cancellation is implemented;
  decide whether polling is sufficient for launch or whether a private ready
  event is required.
- **First-world ownership:** choose operator-seeded launch versus public
  first-claim, and document the bootstrap/reseed authority.
- **Asset pipeline:** decide whether procedural geometry remains the launch
  source or whether authored GLTF assets justify the additional loader, rig,
  collision, licensing, and performance contracts.

#### External or human-gated work intentionally left open

The following are documented tasks, not completed by this audit or local code:

- Dodo written approval of the final paid attack/defense mechanic, live product
  configuration, refunds, chargebacks, and dispute operations.
- Production Cloudflare account, D1/R2 deployment, secrets, DNS, CDN, WAF,
  observability, rollback, and hosted frontend cutover.
- Legal review of Terms, Privacy, consumer rights, trademark clearance,
  multi-currency posture, and public identity claims.
- Selection and approval of URL, text, and image moderation providers,
  retention policy, human review workflow, impersonation handling, and operator
  access controls.
- Real-device GPU, touch, audio, screen-reader, and assistive-technology
  validation across the supported browser matrix.
- Real payment checkout, customer traffic, refunds, and production data
  retention verification.

### Current evidence ledger

| Evidence | Result | Sensitivity and limitation |
|---|---|---|
| `npm test` | Historical baseline: 16 files, 65 tests passed in 2.08 seconds | Historical Tier 2 record; the current 23-file, 92-test result is recorded in the current verification ledger below |
| `npm test -- --run src/game/presentation src/game/simulation/attack.test.ts src/game/simulation/ballistics.test.ts` | 5 files, 18 tests passed | Tier 2, S2 focused logic; no browser proof |
| `npm run test:harness` | Historical harness baseline: 1 authority file, 9 tests passed in 22.35 seconds | Historical Tier 2 plus local Worker/DO/D1 integration; the current 11-test result is recorded below |
| `npm run typecheck:app` | Passed in final gate | Static contract evidence; no runtime proof |
| `npm run typecheck:worker` | Passed in final gate | Static Worker contract evidence; no deployment proof |
| `npm run lint` | Passed in final gate | Rule compliance evidence; no behavioral proof |
| `npm run build` | Next.js production build compiled, typechecked, generated 9 static pages, and finalized routes | Local production-build evidence; not hosted deployment proof |
| Existing desktop/mobile browser artifacts | Desktop and mobile spectator renders exist; mobile launcher crop remains visible | Tier 4 preserved artifact evidence; not attack-mode or real-device proof |
| Existing `artifacts/browser-attack-flow/attack-flow.json` | Three-shot browser flow completed with final `miss −0` and no script failures | Tier 4 local browser mechanics; does not prove a target-specific hit or VFX endpoint |
| `SIEGE_TEST_OUTPUT_DIR=/private/tmp/... npm run test:browser` | Desktop and mobile Worker-backed smoke passed; secure session flags and matching WebSocket snapshots observed | Tier 4 local browser evidence; output was intentionally kept outside the dirty repository artifacts |

### Open risks and revisit triggers

- Do not close A-03 until the timing decision is recorded and the chosen
  choreography is covered as aim → release → flight → impact → readable result
  → destruction/collapse.
- Do not close A-05 until portrait attack-mode evidence proves the launcher,
  trajectory, HUD, and target are simultaneously usable.
- Do not describe the dedicated authority harness as production readiness. Add
  property, restart, load, and deployment evidence before launch claims.
- Revisit target mapping whenever a new authoritative target kind or geometry
  anchor is introduced. The resolver and its tests are the canonical extension
  point.
- Revisit reduced-motion behavior after a real browser preference run. Static
  gating is not proof that all motion, audio, and DOM transitions meet the
  accessibility contract.

## 10. Ongoing remediation update, August 28 2026

The follow-on first-principles pass made these additional local changes:

- Added shared realtime limits to `GameConfig`: a 100 ms trailing window, a
  32-event maximum batch, and a 64 KB estimated envelope. The Worker flushes
  early at either ceiling and the client bounds untrusted batch input.
- Fixed the client batch loop so an ignored stale event does not discard later
  valid events in the same message.
- Added deterministic property-style ballistic coverage and a real
  Worker/DO/D1 regression for defense replay and stale attack rejection without
  inventory consumption.
- Added a shared, tested command fingerprint for retry equivalence and
  meaningful input divergence.
- Added Power Orb charge cues, active-defense aura cues, and `role=status` or
  `role=alert` semantics for key protection and shot-result state.
- Added the parameterized offline balance simulator and its assumptions doc.
- Upgraded destroyed-structure rubble from a single hop to a tested bounded
  impulse transform with gravity, one damped floor bounce, angular velocity,
  and instanced rendering preserved.

Current evidence for this update is Tier 2 static/unit evidence, the local
Tier 2 Worker/DO/D1 harness, and the Tier 4 browser fixtures described below.
It does not close mobile attack composition, real-device accessibility,
performance/load, provider, legal, moderation, production, or human-review
gates.

The follow-on browser evidence now includes a repeatable preference matrix at
`scripts/browser-preference-smoke.mjs` and a renderer baseline at
`scripts/browser-performance-smoke.mjs`. The current headless run passed
normal/reduced-motion desktop and mobile surfaces plus the persisted audio
control. The latest run recorded 2,630 desktop triangles and 1,536 mobile
triangles.
These are Tier 4 local synthetic observations only, not FPS, GPU-memory,
real-device, or production-load proof.

A two-context multiplayer fixture is also preserved at
`scripts/browser-multiplayer-smoke.mjs`. It is intentionally fail-closed when
the shared runtime is protected or otherwise not attackable, because a queued
turn cannot be proven by clicking a disabled surface. Its current scope is
active-turn acquisition, queue visibility, first-shot resolution, and queue
  promotion; defense visibility, BRACE-specific target VFX, conquest race,
  reconnect, and browser cancellation remain open. The fresh resettable browser
  fixture is now implemented at `scripts/browser-isolated-smoke.mjs`.

## 11. Current verification ledger, August 28 2026

The following supersedes the older evidence counts above for the current
checkout while retaining those historical records:

| Evidence | Current result | Boundary |
|---|---|---|
| `npm test` | 23 files, 94 tests passed | Tier 2 unit/property evidence; not browser, hosted, or production proof |
| `npm run typecheck` | App and Worker typechecks passed | Static contract evidence only |
| `npm run lint` | Passed after the audio lazy-initialization correction | Rule compliance only |
| `npm run build` | Passed and includes `/history` and `/reigns/[id]` routes | Local build evidence; not deployment proof |
| `npm run test:harness` | 1 file, 13 Worker/DO/D1 tests passed, including bootstrap, identity disable, recovery create/claim/replay, active-reign identity rejection, turn cancellation, and Durable Object eviction/reconstruction | Local authority integration; no restart/load/production evidence |
| `npm run test:browser` | Desktop and mobile Worker-backed smoke passed after fresh local Worker/Next restart | Tier 4 local browser evidence |
| `npm run test:browser:preferences` | Normal/reduced-motion desktop and mobile passed, including keyboard-copy and audio-control checks | Tier 4 synthetic preference evidence; no real-device assistive-tech proof |
| `npm run test:browser:performance` | Desktop/mobile renderer baselines passed; latest run observed 2,630 and 1,536 triangles | Tier 4 synthetic baseline; not FPS, GPU-memory, or production-load proof |
| `npm run test:browser:multiplayer` | Two-context active/queued/promotion flow passed when run serially | Shared-runtime local fixture; concurrent runs can contend for the live turn, and defense visibility, conquest race, and reconnect remain open; authority and browser cancellation are covered by the current local fixtures |
| `npm run test:browser:isolated` | Fresh Wrangler/D1/Next fixture passed defense persistence, Power Orb, SHIELD, and BRACE target-specific metadata/VFX paths, active/queued/promotion, browser cancellation, and original-detail flight/impact captures through real routes | Tier 4 isolated local browser evidence; conquest race browser capture, reconnect churn beyond the exercised path, real-device, hosted, and production evidence remain open |

## Current checkout reconciliation, August 29 2026

The current checkout supersedes the older counts and browser-cancellation
wording above:

- `npm test -- --run`: 27 files, 137 tests passed.
- `npm run test:harness`: 19 real Worker/DO/D1 tests passed, including refund
  compensation and owner-scoped asset deletion.
- `npm run test:browser:isolated`: fresh migrations, defense persistence,
  WebSocket reconnect/resync, target-specific Power Orb, SHIELD, and BRACE
  flight/impact presentation, active and queued turns, promotion, and browser
  turn cancellation passed. The runner now bounds Playwright teardown and
  removes its temporary persistence.
- Rejected attack lease cleanup and newer-realtime-over-delayed-projectile
  ordering are covered by focused client tests.
- Core damage now increments the Core component version through the central
  reducer, and the authority harness covers concurrent public coronation
  attempts with one serialized winner.

These are local Tier 1 through Tier 4 results. Reconnect churn beyond the
single forced-close/resync path, real-device
behavior, hosted deployment, and provider evidence remain open boundaries.

### Continuation reconciliation, August 29 2026

The current checkout has advanced the evidence behind this audit:

- `npm test -- --run`: 137 root application tests pass.
- `npm run test:harness`: 19 real Worker/DO/D1 authority tests pass, including
  late-intent Dodo reconciliation, recovery, entitlement idempotency, and
  persistence-boundary state validation.
- The queue sheet now exposes active lease and waiting-position state through a
  Worker-backed polling read model; it does not create a client-side queue
  authority.
- The shared local browser matrix passes desktop/mobile smoke,
  normal/reduced-motion preferences, renderer performance, multiplayer queue,
  isolated authority, and paid attack flow after repairing historical
  `worldVersion`/`eventSequence` drift in persisted local state.
- Local asset validation now rejects PNG trailing bytes and reads JPEG SOF
  dimensions correctly while preserving the explicit boundary that pixel
  decode and re-encode require a separately configured image service.

These remain local evidence. Browser reconnect churn beyond the exercised
  resync path, real-device GPU/audio/input
behavior, hosted routing, live Dodo delivery, and production load remain open.
| `git diff --check` | Passed | Whitespace hygiene only; Git status remains intentionally dirty |
