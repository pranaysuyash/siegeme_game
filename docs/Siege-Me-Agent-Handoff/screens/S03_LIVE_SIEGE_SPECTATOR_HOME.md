# S03 — Live Siege / Spectator Home

## Purpose
The canonical product surface. A stranger should understand within seconds:
1. who rules;
2. the fortress is under public siege;
3. the Core is the irreversible objective;
4. they can Attack or Defend.

## Entry
Active reign, no special interrupt/active personal mode.

## 3D world
Actual procedural world reconstructed from canonical snapshot.

Canonical initial visual vocabulary:
- central keep;
- two major towers;
- several wall modules;
- gate;
- visible/partially protected Core chamber;
- limited braces;
- ruler banners/crest;
- active shields only where state says they exist;
- visible real damage state;
- attacker platform in composition if it helps the metaphor.

Do not add decorative structures just to fill the frame.

## Camera
- stable 3/4 spectator camera;
- fortress 60–70% of usable width;
- Core/front facade readable;
- minimal camera drift;
- no free-orbit by default.

## Persistent DOM components
Top/edge:
- product mark, subtle;
- ruler identity chip;
- visible destination domain;
- Core Integrity;
- temporary Shield only when relevant;
- reign duration.

Bottom:
- ATTACK
- DEFEND

Optional subtle:
- viewer count
- details trigger

## UI invariant
No persistent:
- event feed;
- full queue;
- Hall of Fame;
- attack/defense contributor tables;
- five health bars;
- giant profile panel.

## Actions
- tap ruler -> S06
- Attack -> S07
- Defend -> S19
- details -> S30
- history -> S31 via secondary action
- if another turn becomes visually important -> S04 variation
- if Core crosses critical threshold -> S05 variation

## World-state communication
Damage should be visible through missing/damaged modules, cracks/darkening, smoke/dust and Core exposure. HUD confirms rather than replaces the visual state.
