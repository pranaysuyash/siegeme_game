# Implementation Reference Rules

## Three classes of visual material

### 1. CONCEPT
Purpose: mood, tone, thematic exploration.

Can contain impossible/overbuilt geometry.

**Never use as a pixel-fidelity implementation target.**

### 2. IMPLEMENTATION REFERENCE
Purpose: tell an agent what to actually build.

Must obey:
- production stack;
- procedural-world constraints;
- canonical camera;
- component inventory;
- realistic mobile/WebGL complexity;
- DOM/WebGL separation;
- actual state behavior.

### 3. FINAL CAPTURE
Screenshot/video from the running implementation.

This becomes the only true pixel-level reference after implementation exists.

## Rules for future implementation-reference images

Every image prompt/reference must declare:

**Screen/state ID**  
Example: `S03 — Live Siege / Spectator Home`

**Purpose**  
Why this state exists.

**Entry condition**  
What causes it to appear.

**Components shown**  
Exact DOM components.

**3D/world components shown**  
Exact generated geometry/effects.

**Actions available**  
What the player may do.

**Must not contain**  
Other-state UI or decorative complexity.

**Production constraints**
- no ornate fantasy city;
- no dozens of bespoke towers;
- no realistic crowd;
- no heavy vegetation;
- no photoreal material library;
- no UI dashboard;
- no undefined mechanics;
- no asset complexity the spec does not support.

## Generic implementation-reference image prompt template

> Create an implementation-reference screen for the web game **Siege Me**, not concept art. This must be realistically reproducible in a Next.js + React Three Fiber + Three.js + Rapier browser implementation without required external 3D model packs. Use a compact stylized procedural fortress made from a small modular geometry vocabulary: one central keep, two major towers, several wall modules, one gate, one visible glowing Core chamber, limited stairs/platforms, repeated crenellations, 2–4 banners, simple terrain/platform, and only a few reusable props. Use restrained low/medium-poly geometry, simple coherent PBR materials, strong silhouette, good lighting, subtle generated variation, and limited particles. Do not create a giant fantasy city, ornate architecture, realistic crowds, complex vegetation, photoreal medieval textures, or dozens of unique assets. The world should occupy 90–95% of visual attention in live game states. UI must be minimal HTML-like overlay components only. Follow the specified screen state exactly and do not include controls from other states.

Then append the exact screen specification.
