# Procedural World & Art Direction

## Definition

“Procedural-first” means the production game can ship without a required external 3D model pack.

It does **not** mean:
- Three.js should recreate ornate AI-generated castle concept art;
- every surface must be mathematically generated;
- no authored texture, sound, icon or future 3D asset can ever be used.

The launch visual direction must be intentionally designed for procedural construction.

## Production visual target

A stylized architectural toy / siege machine:
- chunky;
- modular;
- readable;
- compact;
- visually distinctive;
- physically destructible;
- mobile-legible.

Avoid:
- photoreal medieval simulation;
- fantasy-city scale;
- dozens of unique towers;
- bespoke sculptures;
- detailed medieval prop clutter;
- complex vegetation;
- realistic character crowds;
- texture-heavy PBR environments.

## Canonical fortress silhouette

Start with approximately:
- 1 central keep
- 2 major side towers
- 0–2 small corner towers
- 4–8 wall sections
- 1 front gate
- 1 explicit Core chamber/enclosure
- 1 throne/crown marker
- 2–4 brace/support locations
- repeated crenellation modules
- 2–4 banners
- one compact terrain/platform base
- one attacker cannon/platform

The fortress must remain recognizable after several modules are destroyed.

## Geometry vocabulary

Use Three.js/R3F primitives and small custom geometries:
- `BoxGeometry`
- `CylinderGeometry`
- `PlaneGeometry`
- `ShapeGeometry` / `ExtrudeGeometry`
- small custom `BufferGeometry`
- instancing for repeated blocks/crenellations/rocks
- generated simple bevel-like/chamfered forms where performance permits

Do not model every brick as a persistent rigid body.

## Material grammar

Start with a small palette:
1. Stone
2. Dark/damaged stone
3. Wood
4. Ruler accent
5. Core emissive
6. Shield translucent/energy
7. Optional terrain/grass

Quality comes from controlled variation:
- per-instance/vertex color variation;
- roughness variation;
- AO/baked-looking gradients where practical;
- restrained edge darkening;
- scorch/damage overlays;
- emissive Core/shield accents.

## Camera grammar

### Spectator/live
- fixed or gently breathing 3/4 view;
- castle occupies roughly 60–70% of usable visual width;
- Core/front facade is clearly readable;
- attacker platform may be visible but must not dominate;
- enough negative space for compact HUD;
- no free-orbit camera by default.

### Attack
- transition to attacker/cannon perspective;
- same world and geometry;
- clear target visibility;
- minimal UI;
- trajectory preview overlays the same scene.

### Defense
- camera moves closer/higher for placement;
- only valid placement slots highlight;
- same geometry/state, no alternate decorative world.

## Damage visual stages

Each structural component should map server state to a small set of deterministic visual stages:
- healthy
- damaged
- critical
- destroyed

Possible effects:
- color/roughness darkening;
- cracks or simple decals/line overlays;
- missing submodule pieces;
- small transform tilt/offset;
- exposed interior;
- limited smoke/dust;
- dynamic collapse fragments only when destruction triggers.

Persist semantic state, not thousands of rubble transforms.

## Physics strategy

Most intact architecture:
- fixed/static.

On destruction:
- spawn or convert only a limited set of representative fragments to dynamic rigid bodies;
- simulate briefly;
- allow sleep/freeze;
- replace with a deterministic rubble representation for persistence.

Projectile physics must use Rapier/fixed timestep and be authoritative or replay-verifiable.

## Identity rendering

A ruler logo/avatar should be transformed into:
- banner texture;
- crest texture;
- plaque;
- shield emblem;
- UI identity chip.

Do not require custom 3D avatar/brand geometry.

## External assets later

External authored assets may be introduced later for:
- hero props;
- richer character animation;
- themed worlds;
- special event sets;
- audio;
- cinematic accents.

They must not change the persistence schema or authoritative world semantics.
