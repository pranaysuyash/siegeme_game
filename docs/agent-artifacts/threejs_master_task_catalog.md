# Complete 3D Web Graphics, Engine & VFX Master Task Catalog (Exhaustive V2)
## All Explicit & Implicit Findings, Research Spikes, Architectural Blueprints & Implementation Tasks for `siegeme_game`

This catalog gathers every finding, architectural standard, failure condition, and optimization pathway across the 7 foundation skills:
1. [r3f-drei](file:///Users/pranay/Projects/skills/r3f-drei/SKILL.md)
2. [threejs-fundamentals](file:///Users/pranay/Projects/skills/3d-web/threejs-fundamentals/SKILL.md)
3. [threejs-geometry](file:///Users/pranay/Projects/skills/threejs-geometry/SKILL.md) / [threejs-geometries](file:///Users/pranay/Projects/external-skills/full-stack-skills__threejs-skills/skills/threejs-geometries/SKILL.md)
4. [threejs-interaction](file:///Users/pranay/Projects/skills/threejs-interaction/SKILL.md)
5. [threejs-camera-direction](file:///Users/pranay/.codex/skills/threejs-camera-direction/SKILL.md)
6. [threejs-aaa-graphics-builder](file:///Users/pranay/.agents/skills/threejs-aaa-graphics-builder/SKILL.md)
7. [threejs-postprocessing](file:///Users/pranay/Projects/skills/3d-web/threejs-postprocessing/SKILL.md) / [threejs-bloom](file:///Users/pranay/.codex/skills/threejs-bloom/SKILL.md)

---

## 1. Domain 1: R3F & Drei Ecosystem (`r3f-drei`)

### A. Core Architecture & Implemented Baseline
- [x] **Declarative-Imperative Separation:** Declarative component tree (`<WorldScene>`, `<Terrain>`, `<Launcher>`, `<FortressComponent>`) with imperative hot-path animations in `useFrame`.
- [x] **Hot-Path Decoupling:** Flight interpolation (`Projectile`) runs via `useFrame` mutating mesh position refs without per-frame Zustand or React state churn.
- [x] **Drei Performance Priming:** Mounted `<AdaptiveDpr pixelated />` and `<AdaptiveEvents />` at the Canvas root.
- [x] **Instanced Mesh Batching:** `<Instances>` used for `Crenellations` and `RubbleFragments`.
- [x] **Pre-baked Lighting:** Pre-baked `<Environment>` lightformers (`resolution={256}`, `frames={1}`).

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R1.1 — Spectator Demand Render Loop (`frameloop="demand"`):**
  - *Research Goal:* Evaluate switching the Canvas to `frameloop="demand"` during idle spectator mode, triggering `invalidate()` exclusively on WebSocket snapshot events, user camera interactions, or banner wind timers to minimize idle mobile GPU wattage.
  - *Deliverable:* Battery consumption and thermal benchmark on mobile Safari/Chrome.
- [ ] **Task R1.2 — Physics Engine Decoupling (`@react-three/rapier`):**
  - *Research Goal:* Investigate conditionally loading `@react-three/rapier` or executing physics purely in server/client analytical math during spectator mode, stripping rigid body overhead when no local player interaction is active.
  - *Deliverable:* Memory footprint and CPU frame time profiling report comparing Rapier vs. pure analytical collision.
- [ ] **Task R1.3 — Tunnel-Rat DOM-to-Canvas Portal Architecture:**
  - *Research Goal:* Explore portaling 3D HUD elements and diegetic in-world labels between DOM and R3F using `tunnel-rat` or Drei's `<Html>` component.
  - *Deliverable:* Technical design doc for responsive diegetic nameplates.
- [ ] **Task R1.4 — WebGL Context Loss Stress & Automated Recovery:**
  - *Research Goal:* Research simulated GPU context loss scenarios (`WEBGL_lose_context` extension) across different mobile browsers and document automated scene re-initialization protocols.
  - *Deliverable:* Automated stress-test script in `scripts/`.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I1.1 — Shared Material Singleton Pools for Fortress Walls:**
  - Refactor all stone and wood fortress components to share a singleton `MeshStandardMaterial` instance created once in a material library rather than allocating separate JSX material nodes per wall mesh.
- [ ] **Task I1.2 — Drei `<Html>` Occlusion Tooltips for Ruler Identity & Wall HP:**
  - Add 3D-projected HTML badge overlays (`<Html distanceFactor={12} occlude center>`) above the Keep and Throne showing ruler reign metadata on hover.
- [ ] **Task I1.3 — Dynamic Lightformer Pulsing on Power Orb Resonance:**
  - Animate the `<Lightformer>` intensity in `<Environment>` proportionally to `siegeCharge` during live reign overcharge events.
- [ ] **Task I1.4 — Context Loss Visual Fallback Overlay:**
  - Implement a graceful DOM fallback banner alerting the user when WebGL context is lost with a single-click context restoration button.

---

## 2. Domain 2: Three.js Fundamentals & Scene Graph (`threejs-fundamentals`)

### A. Core Architecture & Implemented Baseline
- [x] **Color Pipeline:** Explicit `THREE.SRGBColorSpace` output and `THREE.ACESFilmicToneMapping` (`exposure: 1.05`).
- [x] **Gimbal Hierarchy:** 2-axis launcher pivot hierarchy (azimuth base $\rightarrow$ pitch barrel).
- [x] **Shadow Mapping:** `THREE.PCFShadowMap` activated on WebGLRenderer.
- [x] **Test Automation Bridge:** `window.__THREE_GAME_DIAGNOSTICS__` exposing renderer draw calls, memory geometries, fixed timestep, and camera transforms.

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R2.1 — Low-End Mobile GPU Texture Unit & Uniform Buffer Limits:**
  - *Research Goal:* Document hardware limits (Max Texture Image Units, Max Vertex Uniform Vectors) across WebKit iOS and Android Adreno GPUs to prevent shader compilation crashes when multiple shadow maps, lightformers, and textures are bound.
  - *Deliverable:* Specification table of hard GPU constraints for `graphicsPolicyFor`.
- [ ] **Task R2.2 — Dual Coordinate Frame Mapping (Local Island Space vs. Server Ballistic Space):**
  - *Research Goal:* Document the mathematical transformations and precision bounds between server-authoritative Cartesian space (`[x, y, z]`) and client-side presentation offsets (e.g. wobble offsets, launcher recoil, island tilt).
  - *Deliverable:* Architectural doc on coordinate system contracts.
- [ ] **Task R2.3 — Matrix4 Decomposition vs. Euler Gimbal Lock Prevention:**
  - *Research Goal:* Analyze potential gimbal lock edge cases when aiming at extreme elevation angles and document Quaternion-based trajectory resolution.
  - *Deliverable:* Mathematical analysis of launch vector rotations.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I2.1 — Static Matrix Auto-Update Culling (`matrixAutoUpdate = false`):**
  - Set `matrixAutoUpdate = false` and call `updateMatrix()` once on all static foundation, terrain, and indestructible wall meshes to eliminate redundant matrix recalculations every frame.
- [ ] **Task I2.2 — Renderer Memory Leak Assertion in Headless QA:**
  - Add automated test assertions in `scripts/browser-smoke.mjs` verifying that `renderer.info.memory.geometries` and `textures` do not increase after 20 consecutive shot/reset cycles.
- [ ] **Task I2.3 — Viewport Frustum Culling Tuning on Micro-Props:**
  - Ensure all decorative sub-meshes (`flagRef`, `muzzleRef`, `torusGeometry`) have accurate bounding boxes to leverage GPU frustum culling.

---

## 3. Domain 3: Geometry Topology, Buffers & Instancing (`threejs-geometry` / `threejs-geometries`)

### A. Core Architecture & Implemented Baseline
- [x] **Segment Budget:** Low-poly octagonal cylinder primitives (8 segments) for terrain and towers; faceted icosahedron (80 tris) for Core crystal.
- [x] **Cloth Simulation Plane:** 3-segment plane geometry for banner cloth wave distortion.
- [x] **Instanced Arrays:** `Crenellations` and `RubbleFragments` batched into instanced memory layouts.
- [x] **Zero Hot-Path Allocations:** Reusable scratch vectors and quaternions used across frame loops.

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R3.1 — Procedural 2D Voronoi Fracture Extrusions (`ExtrudeGeometry`):**
  - *Research Goal:* Explore generating procedural 2D fracture polygons extruded into 3D jagged stones (`THREE.ExtrudeGeometry`) rather than rotated cubes for destroyed walls.
  - *Deliverable:* Memory and performance benchmark comparing Voronoi extruded shards vs. instanced box primitives.
- [ ] **Task R3.2 — Vertex Color Tinting via `InstancedBufferAttribute`:**
  - *Research Goal:* Research adding an `instanceColor` buffer attribute to fortress wall instances to shade damaged sections darker without swapping material objects.
  - *Deliverable:* Prototype script demonstrating per-instance color blending on damage.
- [ ] **Task R3.3 — Interleaved Buffer Geometry Layouts for High-Density Debris:**
  - *Research Goal:* Investigate `InterleavedBuffer` layouts (packing position, normal, UV, and instance transform into single contiguous typed arrays) for large-scale structural collapse events.
  - *Deliverable:* Technical spec on GPU cache locality for particle debris.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I3.1 — Merged Static Terrain Buffer Geometry (`BufferGeometryUtils`):**
  - Merge the static terrain cylinder islands and approach ramp into a single multi-material `BufferGeometry` using `BufferGeometryUtils.mergeGeometries`, reducing draw calls.
- [ ] **Task I3.2 — Stylized `EdgesGeometry` Cel-Outlines on Keeps and Towers:**
  - Add stylized dark edge lines (`EdgesGeometry` with threshold angle 24°) to fortress battlements for an enhanced tabletop tactical silhouette.
- [ ] **Task I3.3 — Procedural Stone Brick Displacement via Custom Vertex Attributes:**
  - Add subtle vertex-level procedural offsets on tower cylinders to simulate ancient uneven masonry without adding texture maps.

---

## 4. Domain 4: Interaction, Gestures & Raycasting (`threejs-interaction`)

### A. Core Architecture & Implemented Baseline
- [x] **PointerCapture Lifecycle:** Full pointer capture lifecycle (`onPointerDown`, `setPointerCapture`, `onPointerUp`).
- [x] **Interrupt Recovery:** Touch cancellation and blur safety listeners (`blur`, `visibilitychange`, `onPointerCancel`, `onLostPointerCapture`).
- [x] **UI Hit Filtering:** DOM button exclusion via `closest("button")`.
- [x] **Coordinate Invariance:** Viewport-normalized drag calculations.
- [x] **A11y Keyboard Controls:** Full keyboard navigation (`WASD`, arrow keys, `+`/`-`, `Space`/`Enter`).

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R4.1 — Multi-Touch Two-Finger Pullback Pinch Gesture Dynamics:**
  - *Research Goal:* Research 2-finger pinch/pullback gestures for mobile tablets to simulate physical catapult cord tension.
  - *Deliverable:* UX specification and mathematical formula for two-point multi-touch aiming.
- [ ] **Task R4.2 — Ray-Plane Ground Target Reticle vs. Polar Slingshot Input:**
  - *Research Goal:* Research alternative direct-tap targeting (raycasting directly onto fortress components) vs. slingshot drag aiming, documenting tactical trade-offs and mobile usability.
  - *Deliverable:* UX comparative study and trade-off document.
- [ ] **Task R4.3 — Spatial Audio Haptic Synchronization (Web Audio + Vibration API):**
  - *Research Goal:* Research multi-tier tactile feedback combining localized Web Audio frequency sweeps and device vibration patterns during slingshot pullback and firing.
  - *Deliverable:* Comprehensive haptic & audio interaction matrix.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I4.1 — CSS `touch-action: none` Enforcement & Viewport Overscroll Prevention:**
  - Ensure `.canvas-shell` has explicit `touch-action: none` and `user-select: none` CSS rules applied to prevent iOS Safari bounce and pull-to-refresh during drag gestures.
- [ ] **Task I4.2 — Mechanical Slingshot Cord Tension Audio Feedback:**
  - Add low-frequency pitch bend audio modulation during drag pullback proportional to `aim.power`.
- [ ] **Task I4.3 — Visual Slingshot Pullback Arc Distortion:**
  - Add elastic procedural deformation to the launcher base ring mesh during dragging to provide visceral mechanical tension feedback.

---

## 5. Domain 5: Camera Systems & Cinematic Handoffs (`threejs-camera-direction`)

### A. Core Architecture & Implemented Baseline
- [x] **Multi-Mode Presets:** 5 authored camera presentation presets (`spectator`, `attack-aim`, `defense-placement`, `coronation`, `defeat-cinematic`).
- [x] **Single-Stage Eased Handoffs:** `easeOutHandoff` (`1 - (1-t)^1.8`) with position lerp, quaternion slerp, and FOV interpolation.
- [x] **Bounded Camera Shake:** Multi-frequency sinusoidal camera shake with linear decay envelope.
- [x] **Mobile Aspect Compensation:** `mobilePreset` FOV and distance adjustments.
- [x] **Reduced Motion Compliance:** Full `prefers-reduced-motion` support.

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R5.1 — Free-Cam Scout Inspection Orbit Rig (`OrbitControls` with Bounded Polar Clamps):**
  - *Research Goal:* Research adding an optional "Inspect Fortress" touch orbit camera for spectators with strict azimuth/polar limits (`minPolarAngle: Math.PI / 6`, `maxPolarAngle: Math.PI / 2.2`, `maxDistance: 25`).
  - *Deliverable:* Technical spec detailing how free-cam state transitions back into fixed authoritative firing angles.
- [ ] **Task R5.2 — Dynamic Projectile Chase Cam (Follow Rig):**
  - *Research Goal:* Explore an authored "Action Cam" option that tracks behind the projectile during flight before snapping back to spectator view upon impact.
  - *Deliverable:* Camera rig math specification with inertia damping and horizon locking.
- [ ] **Task R5.3 — Screen-to-World Unprojection & In-World Target Reticles:**
  - *Research Goal:* Document exact unprojection formulas (`Vector3.unproject(camera)`) for projecting 2D pointer coordinates directly onto 3D defense slot planes.
  - *Deliverable:* Mathematical proof and test suite for screen-to-plane projection.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I5.1 — Coronation Dramatic Core Zoom-in Cinematic:**
  - Trigger camera transition to `CORONATION` preset (`[7.3, 5.3, 8.5]`, `fov: 32`) over `780ms` whenever a new ruler is crowned in the live world.
- [ ] **Task I5.2 — Defeat Slow-Motion Core Collapse Camera Drift:**
  - Add subtle camera dolly drift along the hold axis when Core integrity hits 0%.
- [ ] **Task I5.3 — Smooth Viewport Resize FOV Compensation:**
  - Recalculate camera aspect ratio and vertical FOV dynamically on window resize events to maintain constant horizontal subject framing across all display sizes.

---

## 6. Domain 6: AAA Visual Graphics Builder (`threejs-aaa-graphics-builder`)

### A. Core Architecture & Implemented Baseline
- [x] **Scorecard Score:** **2.60 / 3.0** (Exceeds Premium Stylized threshold).
- [x] **Lighting Stack:** 3-point directional lighting stack (Warm key @ 3.4 with PCF shadows + Cool teal fill @ 1.5 + Slate ambient @ 1.5).
- [x] **Reflections & Environment:** Pre-baked `<Environment>` lightformers for metallic reflections.
- [x] **Contact Grounding:** Contact shadows beneath island hold.
- [x] **Emissive Layering:** State-reactive emissive hierarchy on Core crystal and power orb.
- [x] **Sound Synthesis:** Web Audio impact synth pulses.

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R6.1 — Weather & Atmospheric Particle Fields (Floating Embers / Rain / Snow):**
  - *Research Goal:* Research seasonal or reign-dependent weather particle systems (e.g. glowing embers around damaged holds, storm rain on critical holds).
  - *Deliverable:* Performance and draw-call budget for GPU-instanced particle fields.
- [ ] **Task R6.2 — Decal Placement on Damaged Stone Walls (`DecalGeometry`):**
  - *Research Goal:* Explore procedural decal projection (`DecalGeometry`) for scorch marks and impact craters on fortress blocks.
  - *Deliverable:* Feasibility analysis comparing decal meshes vs. texture atlas blending.
- [ ] **Task R6.3 — Hybrid 2D/3D Asset Pipeline Evaluation:**
  - *Research Goal:* Document the decision framework for integrating external 3D generated assets (e.g. signature ruler throne props, gargoyle statues) vs. procedural geometry factories.
  - *Deliverable:* External asset sourcing ledger and pipeline guide.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I6.1 — Stylized Projectile Smoke Ribbon Trail:**
  - Implement a low-poly ribbon geometry trail behind breaker projectiles during flight.
- [ ] **Task I6.2 — Reign Banner Heraldry Customization:**
  - Support rendering custom ruler heraldry crests and color accents onto the banner mesh material based on `RulerIdentity`.
- [ ] **Task I6.3 — Core Shield Energy Lattice Shader:**
  - Implement a custom Fresnel / energy lattice shader on the Core's outer aura shell (`sphereGeometry`) that ripples when incoming projectile impacts are absorbed.
- [ ] **Task I6.4 — Dynamic Destruction Ruin Dust Cloud:**
  - Emit an expanding low-poly dust ring when a wall component transitions to `DESTROYED` state.

---

## 7. Domain 7: Post-Processing & HDR Bloom (`threejs-postprocessing` / `threejs-bloom`)

### A. Core Architecture & Implemented Baseline
- [x] **HDR Hierarchy:** Layered HDR emissive hierarchy (`Core critical 5.0` > `Core intact 2.4` > `Impact ring 4.0` > `Breaker projectile 1.8`).
- [x] **Selective Bloom:** Selective `@react-three/postprocessing` `<Bloom>` (`threshold: 0.90`, `smoothing: 0.12`, `intensity: 0.42`, `mipmapBlur`).
- [x] **Vignette:** Low-cost DOM `.vignette` framing.
- [x] **Mobile Gating:** Automatic mobile/low-memory bypass via `graphicsPolicyFor` and `motionReduced`.

### B. Tasks for Exploration & Research (`R`)
- [ ] **Task R7.1 — WebGPU `postProcessing` Node Architecture Migration Path:**
  - *Research Goal:* Research migration from `@react-three/postprocessing` to Three.js r170+ WebGPU Node postprocessing (`THREE.PostProcessing`).
  - *Deliverable:* Evaluation of browser WebGPU support timelines and fallback strategies.
- [ ] **Task R7.2 — Depth of Field (DOF) Bokeh for Tabletop Tilt-Shift Aesthetic:**
  - *Research Goal:* Research adding a subtle Tilt-Shift Bokeh pass on high-end desktop GPUs to accentuate the miniature diorama look.
  - *Deliverable:* Shader specification and performance profile of Gaussian vs. Bokeh DOF on mobile.
- [ ] **Task R7.3 — Screen-Space Ambient Occlusion (SSAO / GTAO) Feasibility:**
  - *Research Goal:* Benchmark SSAO/GTAO passes against contact shadow disks for tabletop geometry depth separation.
  - *Deliverable:* Frame-time comparison report across desktop GPUs.

### C. Actionable Implementation Tasks (`I`)
- [ ] **Task I7.1 — Transient Chromatic Aberration Pulse on Critical Core Hit:**
  - Trigger a micro-duration (120ms) Chromatic Aberration pulse (`offset: [0.002, 0.002]`) exclusively during direct Core impacts.
- [ ] **Task I7.2 — Runtime FPS Monitor Auto-Downgrade:**
  - Connect runtime FPS monitoring to `useSiegeStore` to dynamically disable post-processing passes if frame rates dip below 45 FPS for $>3$ consecutive seconds.
- [ ] **Task I7.3 — Film Grain / Analog Noise Toggle:**
  - Add a subtle, high-performance noise overlay shader on desktop high-fidelity mode to emulate analog tabletop photography.
