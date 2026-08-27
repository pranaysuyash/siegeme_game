# Three.js Fundamentals Codebase Audit: `siegeme_game`

**Audit Standard:** `~/Projects/skills/3d-web/threejs-fundamentals/SKILL.md`
**Date:** August 27, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)
- [`src/game/simulation/ballistics.ts`](../src/game/simulation/ballistics.ts)
- [`src/game/world/generator.ts`](../src/game/world/generator.ts)
- [`package.json`](../package.json)

---

## 1. WebGL Renderer & Pipeline Configuration

| Configuration Property | Current Value | Standard Target | Assessment |
| :--- | :--- | :--- | :--- |
| **Color Space Pipeline** | `gl.outputColorSpace = THREE.SRGBColorSpace` | `THREE.SRGBColorSpace` (Three.js r152+) | ✅ **Pass** — Modern gamma/sRGB handling is active. |
| **Tone Mapping** | `THREE.ACESFilmicToneMapping`, exposure: `1.05` | ACES Filmic or Cineon with exposure | ✅ **Pass** — Film-grade high-dynamic-range curve applied. |
| **Shadow Map Mode** | `THREE.PCFShadowMap` | Supported PCF filtering | ✅ **Pass** — The renderer uses the supported r185 shadow enum without emitting a deprecation warning. |
| **Power Preference & Antialias** | `gl={{ antialias: true, powerPreference: "high-performance" }}` | High-performance with antialiasing | ✅ **Pass** — Explicit GPU prioritization. |
| **Clear / Background Color** | Canvas color attachment with fog match (`#07121f`) | Clear color synchronized with fog | ✅ **Pass** — Atmospheric depth blending is cohesive. |

---

## 2. Scene Graph & Transform Hierarchies

### A. Coordinate System Alignment (Right-Hand Rule)
- **World Frame Convention:**
  - `+X` = Right (launcher / fortress width)
  - `+Y` = Up (fortress vertical elevation, gravity at `-9.81 m/s²`)
  - `+Z` = Front (launcher at `+8.2`, fortress center at `~0.0`, throne at `-1.58`)
- **Assessment:** ✅ **Pass** — 100% compliant with standard Three.js right-handed Cartesian coordinates. Launcher rotation math and ballistic trajectory velocity vector calculations (`launchVelocity`: `+X` yaw sin, `+Y` elevation sin, `-Z` horizontal cos) conform perfectly to the world frame.

### B. Object3D Hierarchies & Nested Rotations
1. **Launcher Gimbal Hierarchy (`GameCanvas.tsx#L195-L213`):**
   ```tsx
   <group position={position} rotation={[0, aim.yaw * 0.45, 0]}>
     <mesh position={[0, -0.45, 0]} ... /> {/* Turret Base */}
     <mesh position={[0, -0.08, -0.15]} rotation={[aim.elevation - 0.65, 0, 0]} ... /> {/* Barrel Pivot */}
   </group>
   ```
   - **Assessment:** Clean parent-child transform decomposition: base handles azimuth (yaw) around Y-axis, child handles pitch (elevation) around X-axis.

2. **Core Pulse & Banner Animations:**
   - Banner flag uses local sinusoidal rotation around Y: `flagRef.current.rotation.y = Math.sin(...)`.
   - Core scale pulsing uses `.scale.setScalar(pulse)` on the inner mesh while maintaining rigid body bounds in the parent group.

---

## 3. Math & Vector Optimization Audit

### A. Hot-Path Vector Allocations in Render Loops
- **Finding:** In [`GameCanvas.tsx#L215-L229`](../src/components/GameCanvas.tsx#L215-L229) (`Projectile`), `new THREE.Vector3()` is instantiated 3 times per frame during projectile flight:
  ```typescript
  const from = new THREE.Vector3(...definition.launcherPosition);
  const target = definition.components.find((component) => component.id === projectile.targetId);
  const to = target ? new THREE.Vector3(...target.position) : new THREE.Vector3(0, 1, 0);
  const position = from.lerp(to, projectile.progress);
  ```
- **Correction:** Allocate reusable scratch vectors outside the render loop (`_vFrom`, `_vTo`, `_vPos`) and use `.set()` and `.lerpVectors()` to eliminate per-frame GC allocations.

### B. Server/Client Ballistics Parity
- **Finding:** [`ballistics.ts`](../src/game/simulation/ballistics.ts) implements analytical point-in-box ray/swept-AABB tests using pure numerical tuples `[number, number, number]` without importing `three` or allocating `THREE.Vector3` objects on the Cloudflare Worker runtime.
- **Assessment:** ✅ **Pass** — Zero memory leaks, ultra-fast deterministic physics resolution on edge workers.

---

## 4. Materials, Geometries & Disposal

1. **BufferGeometry Sharing:**
   - Geometries (`cylinderGeometry`, `boxGeometry`, `icosahedronGeometry`) are generated inline per JSX element.
   - **Recommendation:** Share box geometries for crenellations and rubble via `<Instances>` or shared `BufferGeometry` instances.
2. **Material Setup & PBR Properties:**
   - Materials consistently utilize `meshStandardMaterial` with tuned `roughness` and `metalness` parameters suitable for PBR.
   - Emissive pulsing on the Core (`emissiveIntensity: 2.4` intact, `5.0` critical) leverages standard physical properties effectively.

---

## 5. Implementation Status

The audited code has now incorporated the load-bearing recommendations:

- `Projectile` uses memoized/ref-scoped vectors and mutates a single position in `useFrame`; it no longer allocates `THREE.Vector3` objects per frame.
- Projectile flight is local to the render loop. Zustand is updated at the attack-start and impact milestones, while `advanceTime` remains available for deterministic test control.
- Repeated crenellations and destroyed-structure rubble use Drei `Instances`/`Instance` batches.
- The fixed spectator camera is targeted once, with a short conditional shake only during an active projectile flight.
- The renderer uses supported `THREE.PCFShadowMap` filtering. Three.js r185
  deprecates the older `PCFSoftShadowMap` enum, so the implementation avoids a
  browser warning while retaining stable shadow filtering.

The audit's optional environment/reflection recommendation remains deliberately deferred. A remote HDR preset would add a runtime asset dependency and could make the world less deterministic on a low-cost Cloudflare/Vercel deployment. The current scene uses explicit local lights and fog instead.

## 6. Prioritized Action Summary

1. **Resolved:** Hot-path GC, local projectile interpolation, and cached vector math.
2. **Resolved:** Supported PCF shadow filtering without the r185 deprecation warning.
3. **Resolved:** Repeated crenellation and rubble geometry batching through Drei instances.
