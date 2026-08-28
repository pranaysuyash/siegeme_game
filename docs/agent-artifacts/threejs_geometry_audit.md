# Three.js Geometry & Geometries Codebase Audit: `siegeme_game`

**Audit Standards:**
- Primary: [threejs-geometry](file:///Users/pranay/Projects/skills/threejs-geometry/SKILL.md)
- Secondary: [threejs-geometries](file:///Users/pranay/Projects/external-skills/full-stack-skills__threejs-skills/skills/threejs-geometries/SKILL.md)

**Date:** August 27, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/GameCanvas.tsx)
- [`src/game/simulation/ballistics.ts`](file:///Users/pranay/Projects/siegeme_game/src/game/simulation/ballistics.ts)
- [`src/game/world/generator.ts`](file:///Users/pranay/Projects/siegeme_game/src/game/world/generator.ts)

---

## 1. Geometry Inventory & Triangle/Vertex Efficiency

The procedural world rendering in [`GameCanvas.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/GameCanvas.tsx) utilizes declarative built-in Three.js primitives:

| Component | Geometry Primitive | Arguments / Resolution | Geometry Evaluation |
| :--- | :--- | :--- | :--- |
| **Terrain Islands** | `<cylinderGeometry>` | `[7.3, 8.1, 0.42, 8]`, `[5.9, 6.4, 0.18, 8]` | ✅ **Optimal (Low-poly 8 segments)** — Stylized low-poly aesthetic with minimal vertex count. |
| **Terrain Ramp / Approach** | `<planeGeometry>` | `[2.6, 7]` | ✅ **Optimal** (2 triangles). |
| **Terrain Ring Marker** | `<ringGeometry>` | `[1.2, 1.24, 32]` | ✅ **Good** (64 triangles). |
| **Crenellations** | `<boxGeometry>` | `[0.32, 0.42, 0.34]` per tooth | ⚠️ **High allocation volume** (see Instancing audit below). |
| **Flagpole** | `<cylinderGeometry>` | `[0.035, 0.035, 2.1, 8]` | ✅ **Optimal (8 radial segments)**. |
| **Flag Cloth** | `<planeGeometry>` | `[0.76, 0.52, 3, 1]` | ✅ **Optimal** — 3 segments along horizontal axis allow smooth wave bending without excess vertices. |
| **Banner Sigil** | `<circleGeometry>` | `[0.12, 16]` | ✅ **Optimal** (16 segments). |
| **Core (Inner Crystal)** | `<icosahedronGeometry>` | `[0.55, 1]` | ✅ **Optimal** (80 triangles) — Excellent faceted crystal appearance. |
| **Core (Glow Shell)** | `<sphereGeometry>` | `[0.55, 16, 16]` | ✅ **Optimal** (512 triangles). |
| **Fortress Towers** | `<cylinderGeometry>` | `[w/1.65, w/1.7, h, 8]` | ✅ **Optimal** (Octagonal tower geometry matches fortress style). |
| **Fortress Walls / Keeps** | `<boxGeometry>` | `[w, h, d]` | ✅ **Optimal** (12 triangles per block). |
| **Throne Crown** | `<octahedronGeometry>` | `[0.22, 0]` | ✅ **Optimal** (8 triangles). |
| **Launcher Base & Turret** | `<boxGeometry>`, `<cylinderGeometry>`, `<torusGeometry>` | `args={[0.78, 0.035, 8, 32]}` | ✅ **Optimal** — Balanced angular precision. |
| **Projectile** | `<sphereGeometry>` | `[0.22, 12, 12]` | ✅ **Optimal** (288 triangles). |

---

## 2. Geometry Lifecycle, Buffer Attributes & Memory Audit

### A. Inline JSX Geometry Declarations vs. Shared `BufferGeometry`
- **Current Pattern:** Geometries are declared as inline JSX tags (`<boxGeometry args={[...]} />`, `<cylinderGeometry ... />`).
- **Behavior:** R3F instantiates new `THREE.BufferGeometry` instances for each component and disposes of them on unmount.
- **Finding:** While R3F properly manages GPU memory disposal during mount/unmount lifecycles, declaring identical box geometries in loops (e.g. crenellations) allocates dozens of distinct `BufferGeometry` objects on the GPU rather than sharing vertex buffer memory.

### B. Instancing & `InstancedMesh` / `InstancedBufferGeometry` Opportunities
- **Audited Target:** `Crenellations` (`GameCanvas.tsx#L65-L77`):
  - In a standard fortress generation, crenellations generate between 60 to 140 identical box meshes (`0.32, 0.42, 0.34`).
  - **Audit Standard Recommendation:**
    1. Replace multiple `<mesh><boxGeometry ... /></mesh>` instances with a single `THREE.InstancedMesh` or `@react-three/drei` `<Instances>` container.
    2. Share a single `BoxGeometry(0.32, 0.42, 0.34)` and single `meshStandardMaterial`, passing transforms via `instanceMatrix`.
    3. Reduces GPU buffer memory footprint and collapses draw calls down to 1.

### C. Procedural Extrusion & Custom Buffer Opportunities
- **Audited Target:** `Terrain` & `FortressComponent` destructible ruins:
  - Destructible ruins currently use tilted boxes (`rotation={[0.3, 0.2, -0.22]}`).
  - Using `ExtrudeGeometry` with a randomized 2D `THREE.Shape` profile or `EdgesGeometry` with `LineSegments` would provide realistic fractured stone edges without requiring custom external GLB assets.

---

## 3. Vertex Attributes, Normals & Lighting

- **Normal Computation:**
  - All procedural primitives (`boxGeometry`, `cylinderGeometry`, `icosahedronGeometry`, `sphereGeometry`) provide pre-computed analytic vertex normals and UVs out of the box.
  - Directional lighting and shadow mapping (`castShadow`, `receiveShadow`) calculate shading without missing normal artifacts.
- **Winding Order & Backface Culling:**
  - The banner flag plane geometry explicitly sets `side={THREE.DoubleSide}` (`GameCanvas.tsx#L92`), ensuring wind wave distortion renders correctly from both front and back angles.

---

## 4. Prioritized Optimization Roadmap

1. **P0 (Buffer Reuse via Instancing):**
   - Refactor `Crenellations` to use an `InstancedMesh` with a single cached `boxGeometry(0.32, 0.42, 0.34)`.
2. **P1 (Geometry Cache for Fortress Blocks):**
   - Memoize shared primitives for standard component sizes or use `<Instances>` for identical wall segments.
3. **P2 (Visual Enhancement):**
   - Implement `THREE.EdgesGeometry` for stylized cel/edge outlines on fortress walls and keeps to amplify the tactical tabletop look.
