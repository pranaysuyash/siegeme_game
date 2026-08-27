# Siege Me — Agent Handoff Kit

**Product:** Siege Me  
**Domain:** `siegeme.com`  
**Product form:** single-page, mobile-first, persistent public browser siege game  
**Primary stack:** Next.js/React + TypeScript + React Three Fiber/Three.js + Rapier + Zustand + Cloudflare Workers + one global Durable Object + D1 + R2 + Dodo Payments. Vercel or Cloudflare may host the UI shell.

## Read order

1. `authoritative/FULL_PRODUCT_TECHNICAL_SPEC.md`
2. `inventories/SCREEN_STATE_INVENTORY.md`
3. `inventories/UI_COMPONENT_INVENTORY.md`
4. `inventories/WORLD_COMPONENT_INVENTORY.md`
5. `implementation/PROCEDURAL_WORLD_ART_DIRECTION.md`
6. `implementation/IMPLEMENTATION_REFERENCE_RULES.md`
7. `screens/S00_BOOT_WORLD_LOADING.md` through `screens/S06_RULER_IDENTITY_SHEET.md`
8. `implementation/IMPLEMENTATION_ORDER.md`
9. `prompts/AGENT_MASTER_PROMPT.md`

The exploration document is supporting context. The **full product technical specification is authoritative** when exploration and implementation wording differ.

## Non-negotiable product truths

- There is **one global throne, one current reign, and one canonical world state**.
- The live experience must feel like a **game, not a dashboard**.
- In the main live states, target roughly **90–95% perceived game world and 5–10% persistent UI**.
- Money buys **finite agency/opportunities**, not guaranteed damage or victory.
- Skill and strategic target selection determine effectiveness.
- Core Integrity is irreversible during a reign. It **never heals**.
- Attack and defense actions mutate the same persistent shared world.
- The decisive authoritative Core-destruction event determines succession.
- The current public ruler may represent a person, company, product, project, creator, community, campaign, or another moderated identity.
- `siegeme.com` is the confirmed product domain.
- Dodo payment confirmation creates entitlements. A client must never mint shots, defenses, damage, or victory.
- The first production world is **procedural-first** and must be able to ship with **zero required external 3D model packs**.

## Critical visual warning

Do **not** reproduce the ornate AI concept-art castles as a pixel target.

Those images overstate the intended geometric and asset complexity. The production art direction is a deliberately stylized procedural fortress built from a small reusable geometry/material vocabulary.

Implementation quality should come from:
- silhouette;
- proportion;
- restrained modular geometry;
- good materials;
- lighting;
- camera composition;
- damage staging;
- particles/VFX;
- satisfying physics;
- animation timing;
- strong UI typography.

Not from building dozens of bespoke towers, realistic medieval props, or a fantasy city.

## Visual reference classification

`visual_refs/S00_boot_world_loading.png` and `visual_refs/S01_connection_lost_reconnecting.png` are useful mood/layout references, but still not pixel-fidelity contracts.

No S02+ generated concept-art screens are included in this handoff deliberately. Build S02+ from the written implementation specifications and the procedural-world rules.

## First engineering objective

Create the production architecture and one coherent vertical implementation path:

`S00 Boot -> S02 Empty Throne or S03 Live Siege -> Attack/Defend entry`

The architecture must already support:
- canonical server state;
- semantic procedural world generation;
- world versioning;
- deterministic/fixed-step simulation;
- realtime state updates;
- payment entitlements;
- mobile/desktop input parity;
- future S14 attack and S20 defense modes.

Do not build a throwaway alternate architecture for early screens.


## Player identity rule

Stable server-side player identity is required for paid mutations and throne control, but conventional signup/login is not. Use silent signed session identity first, then progressive recovery when the player has value to protect, especially after conquest.
