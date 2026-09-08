# First-Principles Research & Exploration Dossier: `siegeme_game`
## Evaluated Under Operating Doctrine v8.0 & Exploration / Research Doctrines

**Document Version:** 1.0.0  
**Date:** September 3, 2026  
**Audited Domains:**
1. Engine Architecture & 3D Web Graphics (`r3f-drei`, `threejs-performance`, `threejs-shaders`)
2. Game Design, Pacing & Economic Feedback Loops (`game-design`, `pricing-strategy`)
3. Media Processing & Ingestion Safeguards (`media-use`, `SECURITY_PRIVACY_SAFETY_DOCTRINE`)

---

## 1. Research Spike R1.1: Spectator Demand Render Loop (`frameloop="demand"`)

### Problem Statement
In `siegeme_game`, spectators spend an average of 3 to 15 minutes observing the live fortress without firing shots. Currently, the R3F canvas runs on continuous loop (`frameloop="always"`), rendering 60/120 FPS regardless of whether the scene geometry changed. On mobile browsers (iOS Safari, Android Chrome), this results in elevated GPU wattage, device thermal throttling, and battery drain.

### First-Principles Analysis
- A Three.js scene only requires a new frame when:
  1. Camera coordinates mutate (user pan/orbit or cinematic ease).
  2. A projectile or particle is actively flying/interpolating.
  3. A new authoritative snapshot arrives over WebSocket (`worldVersion` increment).
  4. Ambient procedural elements (e.g. banner cloth wave) animate.
- In `frameloop="demand"`, Three.js only calls `renderer.render()` when `invalidate()` is explicitly invoked.
- **The Tradeoff:** Ambient cloth waving on the banner currently runs via `useFrame` (`Math.sin(clock.elapsedTime)`). Running a continuous `invalidate()` for the banner negates the power-saving benefit of demand rendering.
- **Architectural Solution:**
  - Decouple spectator idle mode into an "Adaptive Quiescence" model.
  - When no projectile is in flight and no user camera interaction occurs, clamp the cloth wave animation to a discrete step (10–15 Hz) or pause cloth motion after 30 seconds of user inactivity.
  - Call `invalidate()` strictly on:
    - Incoming WebSocket delta/snapshot envelopes.
    - Active camera rig transitions (`useSiegeStore.mode` change).
    - Projectile flight frames (`state.projectile !== null`).
    - Pointer drag gestures.

### Expected Impact
- Mobile GPU active time reduced by $>70\%$ during idle spectator sessions.
- Zero perceptible drop in responsiveness during active firing turns.

---

## 2. Research Spike R1.2: Physics Engine Decoupling (`@react-three/rapier`)

### Problem Statement
`@react-three/rapier` loads a WebAssembly (WASM) physics binary (approx. 450 KB gzipped) and orchestrates rigid body simulations. However, in `siegeme_game`, all authoritative ballistics and collision detection are executed server-side on Cloudflare Workers via deterministic swept-AABB analytical algebra in `src/game/simulation/ballistics.ts`.

### First-Principles Analysis
- **What is Rapier actually doing client-side?**
  - In `GameCanvas.tsx`, `Physics` is configured with `gravity={[0, -9.81, 0]}`, `timeStep={1 / 60}`, and `interpolate={false}`.
  - All fortress components and terrain are declared as `type="fixed"`.
  - Projectile flight does *not* use Rapier rigid bodies — it imperatively lerps along a ballistic parabola in `useFrame` (`position.lerpVectors(...)`).
  - Rubble debris uses analytical deterministic kinematics (`debrisTransform(...)` in `debris.ts`), not Rapier dynamic rigid bodies.
- **Conclusion:** The client currently incurs the memory footprint, WASM initialization latency, and frame overhead of `@react-three/rapier` without utilizing its dynamic solver for gameplay resolution.
- **Migration Path:**
  - Remove `@react-three/rapier` from the client bundle entirely in a future major cleanup.
  - Replace `<RigidBody>` wrappers with lightweight `<group>` tags.
  - Bundle size reduction: **~450 KB WASM payload completely eliminated**, improving Largest Contentful Paint (LCP) and initial time-to-interactive.

---

## 3. Research Spike R3.1: Procedural 2D Voronoi Fracture Extrusion vs. Instanced Primitives

### Problem Statement
When fortress walls transition to `DESTROYED`, `RubbleFragments` currently spawns an instanced set of 12 box primitives that translate and tumble outward. While lightweight, repetitive cubic debris lacks the visceral visual satisfaction of jagged stone masonry ruins.

### First-Principles Analysis
- **Technique:** Generate a pre-calculated 2D Voronoi diagram on a normalized unit plane $[0, 1]^2$.
- Extrude each cell polygon into a 3D prism with randomized bevels using `THREE.ExtrudeGeometry`.
- To avoid runtime CPU triangulation overhead during destruction events, pre-bake 4 archetype rubble sets (Corner, Block, Pillar, Slab) during asset initialization.
- **GPU Memory vs. CPU Triangulation:**
  - Pre-baking 4 sets of 8 Voronoi stones costs $<150\text{ KB}$ of buffer memory.
  - Instancing the pre-baked geometries via `<Instances>` preserves zero-allocation per-frame transformation while drastically elevating visual fidelity.

---

## 4. Research Spike GD-R1: Reward Schedules & Title Shards

### Problem Statement
In digital king-of-the-hill economies, non-winning participants often feel disincentivized if only the final Core-destroying shot receives public recognition.

### First-Principles Analysis
- **Psychological Anchor:** Variable ratio reward schedules (Skinner box principles) combined with deterministic mastery milestones.
- **Proposed Mechanic:**
  - **Structure Breach Accolades:** When an attacker breaches a Keep or Tower, award an immutable cryptographic "Breach Token" recorded in the reign ledger (`reign_archive`).
  - **Title Shards:** Collecting 3 Breach Tokens unlocks cosmetic prefix titles (e.g. *The Gatebreaker*, *Iron Siege*, *Crownsplitter*) visible in the public Hall of Fame and on-canvas tooltips.
  - **Zero Pay-to-Win Invariant:** Title shards must remain purely cosmetic and vanity-oriented; they never grant projectile damage multipliers or economic discounts.

---

## 5. Research Spike GD-R2: Passive Spectator Retention & Prediction Tokens

### Problem Statement
Spectators waiting in queue or observing high-stakes Core snipe races may disengage during the 20-second lease windows between turns.

### First-Principles Analysis
- **Mechanic:** Non-monetary "Siege Forecaster" prediction loop.
- Spectators receive 5 free daily prediction tokens.
- While an attacker's aim is locked in (`mode === "attack-flight"`), spectators can tap "Hit" or "Defended".
- Accurate predictions contribute to a global "Master Tactician" seasonal observer leaderboard.
- **Regulatory Safety Boundary:** Prediction tokens cannot be purchased with real money, cannot be redeemed for fiat currency or goods, and carry zero monetary value, avoiding gambling classification under international consumer laws.

---

## 6. Research Spike W-028: Worker-Safe Image Normalization Pipeline

### Problem Statement
When a ruler publishes an identity with a custom brand logo or avatar, the platform must sanitize, strip EXIF metadata, resize, and normalize the image to prevent stored XSS, polyglot payloads, and bandwidth exhaustion on R2.

### First-Principles Evaluation of Architectural Options
1. **Option A: Cloudflare Workers Images API**
   - *Pros:* Native binding, zero WASM overhead, automatic AVIF/WebP transcoding.
   - *Cons:* Requires paid Cloudflare Images subscription ($5/mo base + per-image costs); violates zero-cost local developer reproducibility.
2. **Option B: WebAssembly Rust Decoder (Photon / Image-rs)**
   - *Pros:* Fully self-contained, runs inside standard Cloudflare Workers (within the 128 MB RAM / 30ms CPU budget for low-resolution 256x256 avatars), zero recurring SaaS cost.
   - *Cons:* WASM binary adds ~800 KB to worker script bundle size.
3. **Option C: Client-Side `<canvas>` Pre-Rasterization**
   - *Pros:* Zero server CPU cost.
   - *Cons:* Untrusted client environment; server still must validate byte envelopes to prevent malicious file uploads.
- **Recommended Architecture:** Implement strict SVG/PNG signature checking + dimension limits locally (already active in `cloudflare/src/assets.ts`), pairing with WASM photon normalization before long-term R2 persistence.
