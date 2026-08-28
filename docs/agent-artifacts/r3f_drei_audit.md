# R3F & Drei Codebase Audit Report: `siegeme_game`

**Audit Standard:** [r3f-drei Skill](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md)
**Date:** August 27, 2026
**Target Files:**
- [`src/components/GameCanvas.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/SiegeApp.tsx)
- [`src/game/client/store.ts`](file:///Users/pranay/Projects/siegeme_game/src/game/client/store.ts)
- [`package.json`](file:///Users/pranay/Projects/siegeme_game/package.json)

---

## 1. Executive Summary & Stack Verification

| Dimension | Current Implementation | Audit Assessment |
| :--- | :--- | :--- |
| **Framework Versions** | `react: 19.2.8`, `@react-three/fiber: 9.7.0`, `@react-three/drei: 10.7.8`, `three: 0.185.1`, `@react-three/rapier: 2.2.0` | **Fully compatible** with React 19 & modern R3F v9 ecosystem. |
| **Canvas Setup** | `<Canvas shadows dpr={[1, 1.6]} camera={{...}} gl={{ antialias: true, powerPreference: "high-performance" }}>` | **Solid Baseline**, but missing tone mapping color management setup via canvas props and missing frameloop/adaptive perf controls. |
| **`useFrame` Loop & GC** | Matrix/Vector allocations inside frame loops; per-frame Zustand dispatch (`advanceTime`) and camera lookAt. | **Critical Performance & GC Opportunities** identified. |
| **Instanced Meshes** | Walls, Towers, Crenellations rendered as individual `mesh` + `<RigidBody type="fixed">` elements in JSX loops. | **High-Value Optimization Path** via `@react-three/drei` `<Instances>` or merged geometry. |
| **Drei Helpers & Primitives** | Minimal usage (none of Drei's camera controls, environment presets, materials, or text helpers). | **Opportunities for Visual & DX Uplift**. |
| **React 19 / R3F Lifecycle** | Clean declarative mounting, server-safe `"use client"` boundary, diagnostics hook for testing. | **Compliant**. |

---

## 2. Detailed Audit by Category

### A. Canvas Setup & Renderer Configuration
**Audit Reference:** [SKILL.md Section 1 (Canvas & Scene)](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L25-L87)

#### Current State:
In [`GameCanvas.tsx#L299-L317`](file:///Users/pranay/Projects/siegeme_game/src/components/GameCanvas.tsx#L299-L317):
- Shadow map enabled with `shadows`.
- DPR clamped between `[1, 1.6]`.
- WebGL config sets `powerPreference: "high-performance"`.
- `onCreated` imperatively sets `gl.outputColorSpace`, `gl.toneMapping`, and `gl.toneMappingExposure`.

#### Findings & Recommendations:
1. **Missing Adaptive DPR & Performance Controls:**
   - Instead of static `dpr={[1, 1.6]}`, introducing `<AdaptiveDpr />` and `<AdaptiveEvents />` from `@react-three/drei` dynamically maintains 60 FPS on mobile devices or lower-tier GPUs during intense attacks.
2. **Event Bubble & Pointer Optimization:**
   - The outer DOM `<div className="canvas-shell">` handles pointer capture for aiming. Inside the canvas, pointer raycasting runs by default on all meshes. Adding `onPointerMissed` or setting `events` configuration can prevent unwanted raycast overhead for non-interactive static fortress geometry.

---

### B. `useFrame` Optimization & Hot-Path Garbage Collection
**Audit Reference:** [SKILL.md Section 2 (useFrame)](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L92-L120) & [Section 9 (Anti-Patterns)](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L674-L688)

#### Issues Identified:

1. **Vector Allocation Per Frame in `Projectile` Component (`GameCanvas.tsx#L215-L229`):**
   ```tsx
   // CURRENT ANTI-PATTERN: creates 3 Vector3 instances every single frame
   const from = new THREE.Vector3(...definition.launcherPosition);
   const target = definition.components.find((component) => component.id === projectile.targetId);
   const to = target ? new THREE.Vector3(...target.position) : new THREE.Vector3(0, 1, 0);
   const position = from.lerp(to, projectile.progress);
   ```
   *Impact:* Generates steady heap allocations in the hot render path during projectile flight, causing micro-stutters during garbage collection.
   *Fix:* Pre-allocate scratch vectors (`const _from = new THREE.Vector3()`, `const _to = new THREE.Vector3()`, `const _pos = new THREE.Vector3()`) in a ref or module-level scope and mutate via `_from.set(...)`.

2. **Zustand State Invalidation Loop in `SimulationClock` (`GameCanvas.tsx#L251-L256`):**
   ```tsx
   function SimulationClock() {
     useFrame((_, delta) => {
       useSiegeStore.getState().advanceTime(Math.min(delta, 0.05) * 1000);
     });
     return null;
   }
   ```
   *Impact:* Every frame, `advanceTime` executes and triggers Zustand store state updates when a projectile is in flight. While `useSiegeStore.getState()` avoids React re-render of `SimulationClock`, subscribers to `projectile` (`Projectile`, `SiegeApp`, HUD) re-render every frame at 60Hz.
   *Fix:* Animate the projectile imperatively in `useFrame` using a `meshRef` rather than storing per-frame floating `progress` in the global Zustand state. Zustand should only receive milestone events (`flight-started`, `impact-resolved`).

3. **Per-Frame `camera.lookAt` in `CameraRig` (`GameCanvas.tsx#L24-L28`):**
   ```tsx
   function CameraRig() {
     const { camera } = useThree();
     useFrame(() => camera.lookAt(0, 2.1, 0));
     return null;
   }
   ```
   *Recommendation:* Since the camera is static in spectator mode, calculating `lookAt` every frame is redundant unless camera tracking/easing is happening. Either initialize camera target once in `onCreated`/`useEffect` or use Drei's `<OrbitControls makeDefault />` or a smoothed `useFrame` lerp camera rig.

---

### C. Instanced Meshes & Geometry Batching
**Audit Reference:** [SKILL.md Section 4 (Instancing & Merged Geometries)](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L357-L400)

#### Issues Identified:

1. **Crenellations & Wall Elements Create Excessive Draw Calls (`GameCanvas.tsx#L65-L77`, `L158-L159`):**
   - Each fortress component maps to multiple sub-meshes (boxes, cylinders, crenellation teeth).
   - In a full fortress (dozens of walls, 4 towers, gates, crenellations), there are over 100-200 individual draw calls and separate geometry allocations.

2. **Instancing Opportunity with Drei `<Instances>` / `<Instance>`:**
   - All crenellation battlements share the exact same box dimensions (`0.32, 0.42, 0.34`) and stone material.
   - Using Drei's `<Instances>` for crenellations and debris reduces ~120 draw calls down to **1 single instanced draw call**.

---

### D. Drei Primitives & Helper Adoption
**Audit Reference:** [SKILL.md Section 3 (Essential Drei Components)](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L169-L352)

#### Potential Enhancements:

1. **Environment & Lighting:**
   - Currently uses flat ambient + 2 directional lights in `Atmosphere()`.
   - Utilizing Drei `<Environment preset="night" />` or `<Environment resolution={256}>` provides physically-based ambient reflection and metallic shine on metal components, throne, and weapons without increasing CPU overhead.
2. **Text / Bilboards for 3D In-World Annotations:**
   - Throne status, Core health floating numbers, or target reticles can leverage Drei `<Billboard>` and `<Text>` / `<Html>` for clean in-world overlays.
3. **OrbitControls / Presentation Camera Rig:**
   - Incorporating smooth camera damping with `@react-three/drei` `<OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} minDistance={8} maxDistance={25} />` allows players to inspect the 3D fortress while maintaining fixed server-authoritative firing coordinates.

---

### E. React 19 & R3F Lifecycle Best Practices
**Audit Reference:** [SKILL.md Section 6 & 9](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md#L522-L560)

| Pattern | Codebase Status | Status Detail |
| :--- | :--- | :--- |
| **Material/Geometry Garbage Collection** | ✅ **Pass** | Standard JSX elements (`<boxGeometry>`, `<meshStandardMaterial>`) are managed and disposed automatically by R3F's declarative reconciliation. |
| **Server Components Boundary** | ✅ **Pass** | `"use client"` is properly placed at the root of `GameCanvas.tsx` and `SiegeApp.tsx`. |
| **Diagnostics & Headless Smoke Testing** | ✅ **Pass** | `window.__THREE_GAME_DIAGNOSTICS__` and `window.render_game_to_text` provide rock-solid deterministic playtesting hooks without breaking canvas encapsulation. |

---

## 3. Prioritized Action Plan

1. **P0: Eliminate Per-Frame Allocations in Projectile Simulation**
   - Refactor `Projectile` in `GameCanvas.tsx` to use module/ref-scoped scratch `THREE.Vector3` objects and animate position via ref.
2. **P1: Move High-Frequency Projectile Animation out of Zustand State**
   - Keep projectile translation in R3F `useFrame`, notifying Zustand only upon impact (`progress >= 1.0`).
3. **P2: Adopt Drei `<Instances>` for Crenellations & Debris**
   - Group identical repetitive geometries into instanced rendering batches.
4. **P3: Add Drei Performance Optimizers**
   - Add `<AdaptiveDpr />` and `<AdaptiveEvents />` to the `<Canvas>` tree.
