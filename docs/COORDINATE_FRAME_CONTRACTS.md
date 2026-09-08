# Coordinate Frame Contracts — AUTH vs PRESENT (R2.2) + Launch Rotation Analysis (R2.3)

**Date:** 2026-09-08
**Status:** Closed deliverables for `docs/THREEJS_MASTER_TASK_CATALOG.md` Tasks R2.2 and R2.3 (Domain 2: `threejs-fundamentals`).
**Evidence tier:** Tier 1 (static source inspection) with derivation proofs; no runtime claims made.

---

## 1. The two frames

| Frame | Definition | Representation | Owner |
| :--- | :--- | :--- | :--- |
| **AUTH** | Server-authoritative ballistic space. Right-handed, Y-up, meters. Origin = island center. `+Z` faces the launcher (launcher at `z=8.2`, fortress near `0`, throne at `z=-1.58`). | `Vector3Tuple` — JS float64 tuples | `src/game/simulation/ballistics.ts`, `src/game/world/generator.ts` |
| **PRESENT** | The three.js scene graph. Same axes and origin as AUTH; the root transform is **identity**. float64 in JS, float32 once uploaded to GPU matrices. | three.js objects | `src/components/GameCanvas.tsx`, `src/components/BattlefieldScenery.tsx` |

**Contract:** PRESENT consumes AUTH coordinates verbatim. There is no scale, rotation, or offset between the frames at the scene root. Any client-local offset is presentation-only and must never feed back into hit or damage resolution (`src/game/presentation/flight.ts:4` — "Replay a confirmed shot; presentation must not determine its hit or damage").

## 2. Element mapping table

| Element | AUTH source | PRESENT consumption | Transform |
| :--- | :--- | :--- | :--- |
| Launcher | `generator.ts:16` → `[0, 0.78, 8.2]` | `GameCanvas.tsx:333` `<group position={position} …>` | identity |
| Fortress components | `generator.ts` components (immutable per seed + `generatorVersion`) | `presentationTargetPosition` (`src/game/presentation/targets.ts:17-31`) — direct id lookup | identity |
| Power orb | `powerOrbPosition(definition, worldVersion)` (`ballistics.ts:30-33`), deterministic phase `(worldVersion-1)·0.72` | same function called client-side (`targets.ts:25`) | shared function, identity axes |
| Throne | `generator.ts:30` → `[0, 1.1, -1.58]` | `ThroneMarker` hardcoded `[0, 1.3, -1.88]` (`GameCanvas.tsx:282`) | **⚠️ hardcoded offset `(+0.2 Y, −0.3 Z)` — duplicated constant, drifts from AUTH (see §4)** |
| Camera | `src/game/camera.ts:27-31` presets (positions/targets in AUTH space); fit-scaling about target (`camera.ts:40`) | camera rig only | view-only |
| Island terrain | decorative; cylinders centered on origin (`BattlefieldScenery.tsx:23-31`), rock ring `r ≈ 6.7–7.4` (`:13-17`) | visual grounding only | identity, art-driven heights |
| Floating labels | world anchors | drei `Html distanceFactor={14 \| 16}` (`GameCanvas.tsx:296,530`) | screen projection at render time only |

## 3. Rotation contract — sim ↔ visual gimbal (supersedes stale audit text)

The old audits claim the gimbal used `aim.yaw * 0.45` and `aim.elevation - 0.65`. It does not. Current contract:

- **Sim:** `launchVelocity` (`ballistics.ts:97-105`):
  `X = sin(yaw)·cos(el)·speed`, `Y = sin(el)·speed`, `Z = −cos(yaw)·cos(el)·speed`.
- **Visual:** parent group rotates `−yaw` about Y (`GameCanvas.tsx:333`); child group rotates `+elevation` about X (`:340`); barrel forward is `−Z` (`:343`).
- **Proof of equality:** `R_y(−yaw)·(0,0,−1) = (sin yaw, 0, −cos yaw)`; applying `R_x(+el)` gives `(sin yaw·cos el, sin el, −cos yaw·cos el)` — exactly `launchVelocity` normalized. The negative JSX yaw is what makes the right-handed convention produce `+X` for positive yaw.

**Rules:**
1. Never re-introduce fudge factors (scale/offset) between sim and visual aim. The frames must agree exactly.
2. If art needs a visual deviation (recoil, sway), apply it **outside** the gimbal group or in a presentation-only child (see §4).

## 4. Presentation-only offsets inventory (allowed, client-local)

| Offset | Location | Value | Notes |
| :--- | :--- | :--- | :--- |
| Barrel recoil | `GameCanvas.tsx:328-329` | gimbal-local `z += pulse · 0.28` | cosmetic; decays over `PRESENTATION_TIMING.launcherRecoilMs` |
| Muzzle flash | `GameCanvas.tsx:330-331` | scale/visibility only | no transform authority |
| Banner wave | `GameCanvas.tsx:186-188` | launcher-local `rotation.y` amplitude `0.08` | cosmetic |
| Impact ring | `GameCanvas.tsx:514-515` | scale/opacity animation | cosmetic |
| **Throne marker** | `GameCanvas.tsx:282` | hardcoded `[0, 1.3, -1.88]` | **contract violation risk:** duplicates the AUTH throne position with a silent offset. If the generator moves the throne, the marker drifts. Follow-up: derive the marker position from `definition.components` (throne id) like every other target. |

## 5. Precision and determinism bounds

- Sim math is JS float64; scene magnitudes are ≤ ~21 m. float32 GPU epsilon at 16 m ≈ 1.9e-6 m — invisible at game scale. No precision mitigation needed.
- Replay determinism holds per JS engine only (DM-15 note, `ballistics.ts:7-9`) with fixed-step integration at `STEP_SECONDS = 1/120` (`ballistics.ts:11`). The GPU never participates in authority.
- The only AUTH-space animation is the power-orb drift, keyed on shared `worldVersion` (`ballistics.ts:30-33`); everything else is static per `seed + generatorVersion` (world fingerprint, `generator.ts:54`).

## 6. R2.3 — Gimbal lock analysis (yaw-then-pitch decomposition)

**Construction.** The launcher uses two nested single-axis groups — Y rotation on the parent, X rotation on the child (`GameCanvas.tsx:333,340`). This is equivalent to an intrinsic yaw→pitch chain, but because each joint is its own group there is **no multi-axis `THREE.Euler` parse** and therefore no Euler-order ambiguity to manage.

**Lock condition.** For a yaw→pitch chain, gimbal lock requires the inner (pitch) joint at ±90°, where the yaw axis degenerates (barrel vertical; yaw no longer produces a distinct direction).

**Actual domain.** The authority clamps every shot through `sanitizeBallisticInput` (`ballistics.ts:86-92`) to the configured bounds (`src/game/config.ts:9-14`): elevation ∈ `[0.28, 0.86]` rad = 16.1°–49.3°, yaw ∈ `[−0.72, 0.72]` rad = ±41.3°. The lock posture (90° pitch) is unreachable with a margin of ≥ 40.7°, and yaw range is irrelevant to lock in this construction.

**Sim side.** The simulation uses raw trigonometry on scalars (`ballistics.ts:97-105`) — no Euler or quaternion objects exist, so gimbal lock is inapplicable to hit resolution by construction.

**Verdict.** No Matrix4/Quaternion migration is warranted today; adding it would be complexity without behavioral change. Revisit triggers:
1. elevation range extended toward vertical (mortar-style) fire,
2. camera-linked aiming that introduces roll,
3. multi-joint animation blending on the launcher (needs slerp — use `Quaternion.slerp` on the barrel group only).

---

**Supersedes:** the stale gimbal, ballistics-mechanism, and throne-position claims in `docs/THREEJS_FUNDAMENTALS_AUDIT.md` §2–3 and its `docs/agent-artifacts/` mirror (reconciliation of those files is tracked as the pending doc-reconciliation unit, not part of this research closure).
