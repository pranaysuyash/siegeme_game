# 3D World / Game Object Inventory

## Environment
- Terrain/island base
- Background/void/sky
- Atmosphere/fog
- Main directional light / environment light
- Low-cost distant silhouettes
- Attacker platform
- Fortress platform
- Camera anchors
- Optional simple water plane/background layer

## Fortress architecture
- Foundation
- Central keep
- Core/throne tower
- Outer wall modules
- Inner/protection wall modules where needed
- Two major towers
- Small corner towers where needed
- Gate
- Parapets
- Crenellations/battlements
- Stairs/platforms
- Simple arches
- Supports/braces
- Buttress/column modules only where they help silhouette or gameplay
- Explicit weak/destructible sections
- Core enclosure
- Throne/crown marker

## Ruler identity surfaces
- Main banner
- Secondary flags
- Crest
- Throne crest
- Logo plaque
- Shield/defense crest texture
- Optional portrait surface

Ruler logos should normally be converted into textures applied to stable generated geometry. Do not generate custom 3D brand models.

## Attack hardware
- Cannon/launcher
- Barrel
- Carriage/base
- Recoil mechanism
- Standard cannonball
- Breaker projectile
- Future sidegrade projectile hooks
- Muzzle flash
- Smoke
- Trajectory markers/helpers

## Defense objects
- Shield dome/wall
- Brace
- Barricade hook for future expansion
- Royal Shield effect
- Defense placement anchors/slots

## Secondary targets
- Power Orb
- Shield generator hook
- Siege-charge target hook
- Future moving target hook
- Future explosive/supply target hook

## Damage/destruction presentation
- Intact
- Chipped
- Cracked
- Heavily damaged
- Destroyed
- Displaced
- Rubble
- Exposed Core
- Scorch/impact mark
- Dust
- Smoke
- Sparks
- Limited fire
- Falling fragments

## Physics objects
- Fixed structural collider
- Dynamic collapse body
- Projectile rigid body
- Limited debris bodies
- Shield collider
- Weak-point collider
- Core collider
- Trigger zones
- Out-of-bounds volume

## Semantic-ID rule

Every meaningful persistent/destructible object must have a deterministic semantic ID, for example:
- `foundation.main`
- `wall.front.01`
- `wall.front.02`
- `tower.left.major`
- `tower.right.major`
- `keep.central`
- `core.enclosure`
- `core.main`
- `brace.slot.left.01`
- `shield.slot.core.01`
- `banner.main`

Visual meshes, colliders, persistence records and event history should all be traceable to these semantic identities.
