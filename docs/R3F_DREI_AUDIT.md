# R3F & Drei Codebase Audit: `siegeme_game`

**Audit Standard:** `~/Projects/skills/r3f-drei/SKILL.md`
**Date:** August 27, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](../src/components/SiegeApp.tsx)
- [`src/game/client/store.ts`](../src/game/client/store.ts)
- [`package.json`](../package.json)

---

## 1. Stack & Lifecycle Assessment

| Area | Current Implementation | Audit Assessment |
| :--- | :--- | :--- |
| **Dependency Stack** | `react: 19.2.8`, `@react-three/fiber: 9.7.0`, `@react-three/drei: 10.7.8`, `three: 0.185.1`, `@react-three/rapier: 2.2.0` | **Pass (Modern & Compatible)** — Aligned with React 19 and R3F v9 standards. |
| **Canvas & SSR Boundary** | `<Canvas shadows dpr={[1, 1.6]} gl={{ antialias: true, powerPreference: "high-performance" }}>` inside `"use client"` component. | **Pass** — Safe mounting, clean server-component boundary, WebGL context initialized properly. |
| **Testing & Diagnostics Hooks** | `window.__THREE_GAME_DIAGNOSTICS__` and `window.render_game_to_text` | **Pass** — Excellent headless smoke testing and deterministic inspection capabilities. |

---

## 2. Key Findings & Recommendations

### A. Hot-Path Garbage Collection & `useFrame` Optimization
1. **Per-Frame Vector Allocations in `Projectile` (`GameCanvas.tsx`)**
   - **Current:** Creates new `THREE.Vector3` instances per frame during flight interpolation.
   - **Risk:** Heap churn and GC pauses during visual impacts.
   - **Fix:** Use static/ref-scoped scratch vectors (`_from`, `_to`, `_pos`) and mutate via `.set()` / `.lerpVectors()`.

2. **Zustand React Re-renders at 60 FPS (`SimulationClock` & `store.ts`)**
   - **Current:** `SimulationClock` calls `advanceTime(delta)` every frame in `useFrame`, triggering state updates in Zustand when a projectile is in flight.
   - **Risk:** Components subscribing to `projectile` re-render in React on every animation frame.
   - **Fix:** Handle flight interpolation locally in `useFrame` using a `meshRef` and trigger Zustand actions only on milestone transitions (`flight-started`, `impact-resolved`).

3. **Per-Frame `camera.lookAt` (`CameraRig`)**
   - **Current:** Calls `camera.lookAt(0, 2.1, 0)` every frame despite having a fixed camera angle in spectator mode.
   - **Fix:** Set the camera target once on mount or integrate Drei's `<OrbitControls makeDefault />` / smoothed rig.

---

### B. Geometry Batching & Instancing
1. **Crenellations & Repetitive Fortress Blocks (`GameCanvas.tsx`)**
   - **Current:** Rendered as individual `<mesh>` elements inside loops (`Crenellations` and `FortressComponent`).
   - **Opportunity:** Convert crenellation battlements and repeated structural blocks to `@react-three/drei` `<Instances>` / `<Instance>`, reducing 100+ separate draw calls to single-digit batches.

---

### C. Drei Helpers & Performance Upgrades
1. **Adaptive Performance:**
   - Incorporate `<AdaptiveDpr />` and `<AdaptiveEvents />` from `@react-three/drei` to automatically scale pixel ratio and throttle event raycasting during heavy action on lower-end devices.
2. **Environment & Reflections:**
   - Leverage Drei's `<Environment>` presets for ambient lighting and reflections on metallic throne and fortress components.

---

## 3. Prioritized Optimization Roadmap

1. **P0:** Refactor `Projectile` to eliminate `new THREE.Vector3()` allocations per frame.
2. **P1:** Decouple continuous frame-by-frame animation from global Zustand state.
3. **P2:** Adopt Drei `<Instances>` for crenellations and debris meshes.
4. **P3:** Add Drei `<AdaptiveDpr>` and `<AdaptiveEvents>` to `<Canvas>`.
