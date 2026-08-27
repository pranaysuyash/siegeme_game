You are the primary implementation agent for **Siege Me** (`siegeme.com`).

Your job is to build the specified product, not reinterpret it into a generic game, dashboard, demo, prototype, MVP, fantasy environment, or SaaS application.

FIRST:
1. Read `00_START_HERE.md`.
2. Read `authoritative/FULL_PRODUCT_TECHNICAL_SPEC.md` completely.
3. Read all four files in `inventories/`.
4. Read `implementation/PROCEDURAL_WORLD_ART_DIRECTION.md`.
5. Read `implementation/IMPLEMENTATION_REFERENCE_RULES.md`.
6. Read `implementation/IMPLEMENTATION_ORDER.md`.
7. Read the relevant `screens/*.md` before implementing each screen.

SOURCE OF TRUTH:
- The full technical specification is authoritative.
- The exploration doc is supporting context.
- The generated visual references are mood/layout aids only where explicitly included.
- Do not infer missing mechanics from old concept art.
- Do not silently add systems that are not in the specification.

CORE PRODUCT:
Siege Me is one globally shared persistent public siege. One public identity rules one throne/fortress. Spectators watch the same canonical world. Attackers buy finite shots; skill determines effectiveness. Defenders buy finite defensive actions. Damage and defense mutate the same persistent world. Core Integrity never heals within a reign. The decisive authoritative Core-destruction event transfers the throne.

NON-NEGOTIABLE UX:
- Game first.
- S03/S04/S05 should feel roughly 90–95% game world and 5–10% persistent UI.
- No dashboard-style permanent sidebars, event feeds, health matrices, queues or leaderboards on the live screen.
- Secondary information belongs in drawers/sheets.
- The 3D world should visually communicate damage/shield/Core state before the HUD explains it.
- Mobile is first-class, not a shrunken desktop dashboard.

NON-NEGOTIABLE ART/3D:
- Procedural-first.
- The first product must be able to ship with zero required external 3D model packs.
- Do NOT attempt to reproduce ornate AI concept-art castles.
- Build a compact, stylized, modular fortress using a small geometry/material vocabulary.
- Canonical silhouette: central keep + two major towers + several wall modules + gate + Core chamber + limited supports + banners + simple terrain + attacker platform.
- Quality comes from silhouette, materials, lighting, damage staging, VFX, camera and physics.
- Every persistent/destructible piece must map to a semantic ID.
- Most architecture is fixed/static until a destruction event activates limited dynamic fragments.
- Do not persist thousands of rubble transforms.

ARCHITECTURE:
- Keep domain/game rules independent from React/R3F.
- The renderer is not the source of truth.
- Next.js/TypeScript application.
- R3F/Three for rendering.
- Rapier for fixed-step physics.
- Zustand for ephemeral UI/session state.
- Supabase/Postgres for canonical persistence.
- Supabase Realtime initially for event fanout.
- Dodo for payment checkout/webhooks.
- Vercel hosting.
- Current stable package versions should be verified before installation and lockfiles committed.

SERVER AUTHORITY:
- Client never mints shots/defenses.
- Client never submits trusted final damage.
- Dodo webhook grants entitlements idempotently.
- Server-authorized turns include world-state version and allowed resources.
- Stale turn/world mutations must fail.
- Succession must be atomic.
- Duplicate payment/webhook/event processing must not duplicate state.

WORKING STYLE:
- Do not create a parallel duplicate implementation if the project already has a path for the same concern.
- Re-read current files before editing because parallel work may exist.
- Preserve production-grade architecture while implementing in the specified order.
- Test each layer as it is introduced.
- Add concise architecture notes when a decision materially affects later screens/systems.
- Keep placeholders/TODOs explicit rather than inventing unapproved rules.
- Do not make mutating git operations unless explicitly instructed by the user.

IMPLEMENTATION START:
Follow `implementation/IMPLEMENTATION_ORDER.md`, beginning with the production foundation and procedural world contract. The first visual target is not a static generated castle. It is a real procedural fortress rendered by R3F from a semantic world snapshot.

Before claiming a phase is complete, run the acceptance gates in `implementation/ACCEPTANCE_GATES.md` relevant to that phase and report concrete evidence.
