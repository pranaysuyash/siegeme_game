# Siege Me — Full Product & Technical Specification

> **Product name:** Siege Me  
> **Registered domain:** `siegeme.com`  
> **Tagline candidate:** “Rule or ruin.”  
> **Naming status:** Product name/domain confirmed for implementation. Trademark review remains a separate legal check. Product code, schemas, routes, events, and package names should still keep domain/game primitives decoupled from marketing copy where practical.  
> **Document status:** Implementation-grade specification  
> **Primary product form:** Single-page, mobile-first, persistent public browser siege game  
> **Core visual rule:** The product is a game first. The live surface should feel approximately 90–95% game world and 5–10% persistent HUD.

---

## 0. Executive Summary

Siege Me is a globally shared, persistent browser game built around one scarce public object: **the throne**.

At any moment there is exactly one current ruler. The ruler may represent a person, company, product, project, creator, community, campaign, or other moderated public identity. That identity receives the primary status/attention surface of the game: logo/avatar, display name, short message, visible destination domain, CTA, reign duration, history, and visual ownership of the fortress.

Everyone else arriving at the page may:

1. **Watch** the same live world.
2. **Attack** the current fortress by buying a finite pack of skill-based projectile attempts.
3. **Defend** the current ruler by buying a finite defensive placement/action.
4. Share the battle to recruit more attackers or defenders.

Payments buy **agency**, not guaranteed outcomes. An attacker pays for attempts; aim, timing, power, target choice, and shared attacker progress determine how effective those attempts are. Defenders pay to place finite shields/braces and contribute to a shared defensive meter, but they can never restore lost Core Integrity. The Core therefore trends irreversibly toward destruction and every reign eventually becomes defeatable.

The world is shared and persistent during a reign. Damage done by one visitor remains for the next. A brace placed by a supporter remains until destroyed or the reign ends. A wall destroyed by an attacker stays destroyed. When the Core reaches zero, the decisive attacker becomes the next ruler, the prior reign is archived, and a new fortress is generated for the new reign.

There is no cash prize, redeemable token, revenue share, or external product required. The primary prize is **control of the public throne surface and the status/history associated with it**.

The first production world is designed to be **procedural-first 3D and capable of shipping with zero external model-pack dependency**. This does not mean reproducing ornate concept-art castles entirely from primitives. Three.js/React Three Fiber render a deliberately stylized modular world; Rapier supplies physics; a deterministic semantic world generator maps directly to persistent server state. Authored 3D assets remain optional later upgrades.

---

# 1. Product Thesis

## 1.1 One-sentence explanation

> **One person or brand rules the throne. Pay for three shots and try to destroy their fortress. Miss and your shots are gone. Break the Core and the throne becomes yours. Or pay to defend the ruler instead. Every action changes the same world for everyone.**

## 1.2 Product primitive

The product is not:

- a conventional multiplayer game with many rooms;
- an auction;
- an outbid leaderboard;
- a casino;
- a sweepstake;
- an ad marketplace;
- an ecommerce discount widget;
- a metaverse;
- a medieval strategy game;
- a social network;
- a SaaS dashboard.

The product **is one persistent internet object whose current owner can be physically attacked by everyone else**.

The scarcity comes from:

- one global throne;
- one active reign;
- one canonical fortress state;
- one public ruler identity;
- one decisive succession event.

## 1.3 Core design principle

> **Money buys agency. Skill determines efficiency. Collaboration changes the battlefield. Persistent irreversible damage guarantees turnover.**

Every product and implementation decision should be tested against this principle.

## 1.4 Why the product can monetize without an external product

The game sells:

- attack attempts;
- defensive actions;
- public status;
- social conflict;
- visible contribution;
- spectacle;
- historical recognition;
- temporary public identity exposure.

It does not need a separate SaaS product, physical prize, discount catalog, marketplace, or inventory source.

---

# 2. Product Goals and Non-Goals

## 2.1 Goals

The product must:

1. Be understandable within seconds of landing.
2. Expose the live game before requiring signup.
3. Make payment part of gameplay rather than a detached upgrade screen.
4. Let skill materially affect paid-attempt outcomes.
5. Ensure that every paid action changes visible state or provides a meaningful attempt.
6. Preserve a single canonical persistent world during a reign.
7. Create reasons for the current ruler to bring traffic.
8. Create reasons for attackers to recruit other attackers.
9. Create reasons for defenders to recruit other defenders.
10. Make the decisive takeover visually and socially meaningful.
11. Work well on modern mobile browsers with one-thumb interaction.
12. Remain playable on desktop with the same input grammar.
13. Keep the live screen visually dominated by the world, not panels.
14. Be server-authoritative for paid entitlements and game outcomes.
15. Be reconstructable from event history and semantic state.
16. Be capable of launching with zero external 3D model packs.
17. Avoid direct cash/redeemable prizes in the primary model.
18. Avoid raw pay-to-win mechanics.
19. Avoid indefinite ruler healing.
20. Produce public artifacts worth sharing.

## 2.2 Explicit non-goals

Do not build the following as part of the first complete product:

- multiple simultaneous worlds;
- regional shards;
- guild systems;
- chat;
- user-to-user money transfers;
- NFT/token mechanics;
- cash rewards;
- ruler revenue sharing;
- subscriptions;
- random paid loot;
- paid chance multipliers;
- arbitrary HTML controlled by rulers;
- arbitrary JavaScript/iframes;
- full 3D avatar creation;
- custom castle construction from unlimited pieces;
- a conventional inventory system;
- dozens of weapons;
- ten carnival mini-games;
- realistic medieval simulation;
- open-world navigation;
- complex RPG progression;
- separate native mobile applications;
- Unity/WebGL export;
- a persistent SaaS-style dashboard on the homepage.

---

# 3. Working Name and Brand Architecture

## 3.1 Confirmed product brand

**Siege Me**

Reasons:

- direct invitation;
- inherently social;
- current ruler can share “Siege me”;
- short;
- works as verb + brand;
- matches the core mechanic rather than a generic fantasy theme;
- supports attacker and ruler narratives;
- does not imply an external prize.

## 3.2 Domain

Confirmed registered product domain:

`https://siegeme.com`

The domain has been purchased. DNS, hosting, email, security headers, and production routing remain deployment concerns.

## 3.3 Tagline

Candidate:

**Rule or ruin.**

Alternative product copy:

- One throne. One world.
- Hold it until they break you.
- Take the throne. Defend it.
- Everyone can attack.
- Your castle is public.
- How long can you hold?

## 3.4 Internal naming

Even though the product name/domain are confirmed, code should continue using neutral domain terminology for core game primitives:

- `world`
- `reign`
- `ruler`
- `public_identity`
- `siege`
- `attack`
- `defense`
- `core`
- `component`
- `entitlement`

Avoid:

- package names containing `siegeme`;
- database enums containing marketing copy;
- hard-coded title strings outside a single configuration layer.


## 3.5 Current external references and design lessons

These are references, not product requirements or templates to copy.

### SiliconCity.lol

Current verified behavior: SiliconCity.lol presents one interactive isometric city as the primary product surface. Businesses purchase a digital plot, receive/generate a branded building, and link visitors to their site. Public spatial tiers currently range from Outskirts to a singular landmark plot.

Relevant lessons for Siege Me:

- the world itself can be the public status/directory surface;
- brand identity should be visible physically in the scene without opening a profile;
- spatial prominence is intuitively legible status;
- visual cohesion is more important than giving every owner unrestricted art direction;
- its creator specifically reports using a fixed isometric template after unconstrained generated buildings became stylistically incoherent;
- the main canvas should remain dominant and self-explanatory;
- identity customization should operate inside a constrained visual grammar;
- ownership/status objects are more compelling when spectators can browse them visually.

Do **not** copy its plot-sale economy, zone pricing, AI-building generation, or static ownership model. Siege Me differentiates through a single contested object, actual skill input, persistent physical damage, collaborative attack/defense, and succession.

Reference: `https://siliconcity.lol/about`

### Topfloor.company

Status: pending direct inspection. The domain was supplied as a current reference but could not be reliably resolved/indexed by the available inspection tools. Do not infer its mechanic from the domain name. Once inspectable, evaluate it against the standard reference checklist below.

### Reference checklist for future viral/simple paid internet products

For each reference, record:

1. What does the user actually pay for?
2. What visibly changes immediately after payment/action?
3. What is scarce?
4. What persists and what resets?
5. Is status determined by money, skill, attention, time, collaboration, or a combination?
6. Why would a spectator visit without paying?
7. Why would a participant share the page?
8. What does the page communicate in the first five seconds?
9. How much UI is persistent versus contextual?
10. What spatial/visual metaphor makes value legible?
11. What creates repeat visits?
12. Which mechanics would become exploitative, bot-prone, pay-to-win, or operationally expensive if copied?

---

# 4. Roles

## 4.1 Spectator

### Pays
No.

### Can
- load current world;
- watch attacks;
- observe state transitions;
- open ruler details;
- inspect compact siege details;
- view history/Hall of Fame;
- share current battle;
- choose Attack;
- choose Defend.

### Cannot
- change authoritative world state;
- broadcast arbitrary realtime messages;
- submit damage;
- place defenses;
- claim throne.

### Product objective
Convert curiosity into participation without making payment mandatory to understand the game.

---

## 4.2 Attacker

### Pays
Yes, for attack entitlements.

### Primary action
Buy a pack of shots and use them in a server-authorized attack turn.

### Objective
Expose and destroy the Core.

### Skill dimensions
- aim;
- elevation;
- power;
- timing;
- weak-point selection;
- secondary-target decision;
- knowledge of current structural state;
- use of earned special shot.

### Recognition
- Conqueror;
- Siege MVP;
- Breaker;
- Shieldbreaker;
- largest single structural hit;
- Core damage;
- total contribution during reign.

---

## 4.3 Defender / Supporter

### Pays
Yes, for defensive placements/actions.

### Primary action
Purchase a finite defensive action, then place it in a valid synchronized slot.

### Objective
Delay Core destruction.

### Can
- place shield;
- place brace;
- contribute to Royal Guard meter;
- share defense call-to-action;
- earn defender recognition.

### Cannot
- restore lost Core Integrity;
- freely edit castle geometry;
- place objects outside server-approved slots;
- place defenses while a projectile is in authoritative flight;
- make the fortress invulnerable.

### Recognition
- Royal Guard MVP;
- most damage prevented;
- longest surviving defense placement;
- shields destroyed by attackers;
- contribution to shared defensive meter.

---

## 4.4 Ruler

The ruler is both a role and a public identity owner.

### Can
- control the current public identity surface;
- share the reign;
- buy the same legal defensive actions available to supporters;
- receive under-siege notifications;
- view detailed reign statistics;
- call supporters.

### Cannot
- heal Core;
- directly alter base physics;
- remove existing attacker damage;
- block attackers with arbitrary geometry;
- change public identity continuously during the reign;
- pay to directly increase Core.

### Reward
- primary public identity placement;
- reign duration;
- traffic;
- status;
- archive entry;
- share card;
- historical throne count.

---

# 5. Public Throne Identity

## 5.1 What may rule

A ruler may represent:

- Person
- Company
- Product / App / Site
- Project / Open Source
- Creator
- Community
- Campaign / Event
- Other moderated identity

## 5.2 Public identity fields

### Required
- `display_name`
- `identity_type`

### Strongly preferred
- `destination_url`

### Optional
- `logo_or_avatar`
- `one_line_message`
- `cta_choice`
- `social_handle`

## 5.3 Initial limits

Recommended launch limits:

- Display name: 1–40 Unicode characters.
- Message: 0–100 Unicode characters.
- Social handle: 0–40 characters.
- URL: HTTPS only, maximum 2,048 characters.
- Logo/avatar: raster only initially, PNG/JPEG/WebP, max 2 MB before server normalization.
- No SVG uploads initially.
- No animated images initially.
- No video.
- No rich text.
- No markdown in message.
- No arbitrary button copy.

## 5.4 CTA choices

Initial safe CTA vocabulary:

- Visit
- Try it
- Follow
- Join
- Learn more
- View project
- Shop
- Read

CTA renders only when a destination URL exists.

The destination domain must remain visibly shown near the CTA.

## 5.5 Public identity vs payment identity

Public identity is not the same as:

- payment customer;
- legal person paying;
- authenticated account;
- cardholder;
- Dodo customer record.

A founder may pay personally and place their product on the throne.

## 5.6 Reign identity lock

After coronation is published:

- public identity is locked for that reign;
- destination URL cannot be silently swapped;
- display identity cannot be bait-and-switched;
- admin moderation may disable/remove fields;
- a ruler can prepare a different identity for a future reign.

This makes historical archives stable and reduces abuse.

---

# 6. Primary Live Product Surface

## 6.1 Visual rule

The live product must not reproduce the dense concept boards.

Target:

- 90–95% perceived game world;
- 5–10% persistent HUD/chrome.

The world should communicate state visually.

## 6.2 Persistent HUD

### Top-left
Compact ruler chip:

- logo/avatar;
- display name;
- visible domain when available.

Tap opens ruler detail sheet.

### Top-right
Only critical authoritative state:

- Core Integrity percentage or compact bar;
- optional Shield indicator only if an active Core shield exists.

### Secondary small label
- reign duration.

### Bottom
Two dominant actions:

- ATTACK
- DEFEND

Show price/value directly in or below each action.

## 6.3 Information that must not be permanently visible

Keep these contextual:

- structure HP list;
- full Armor meter;
- Siege Mana detail;
- Royal Guard meter;
- attacker queue;
- detailed event feed;
- contributor rankings;
- historical stats;
- Hall of Fame;
- purchase history;
- profile configuration.

## 6.4 Game-world state communication

### Healthy fortress
- clean silhouette;
- intact battlements;
- no smoke;
- Core mostly hidden.

### Damaged fortress
- missing sections;
- darkened/scorched material;
- cracks;
- leaning/deformed decorative pieces;
- small smoke/dust;
- exposed interior.

### Active shield
- translucent energy surface;
- clear hit ripple;
- short UI indicator.

### Critical Core
- visible emissive pulse;
- cracks;
- warning animation;
- more exposed geometry;
- low-health audio cue;
- compact HUD warning.

### Shared Siege Charge
Prefer world cue first:
- attack-side device/crystal charges;
- meter shown only when it matters or in details sheet.

### Royal Guard
Prefer world cue:
- guards/crest/defensive aura;
- meter in details sheet or when near unlock.

---

# 7. Core Game State

## 7.1 Global singleton

There is exactly one active canonical world.

Conceptually:

```ts
type GlobalWorldState = {
  worldId: string;
  worldVersion: number;
  generatorVersion: string;
  worldSeed: string;
  currentReignId: string;
  phase: WorldPhase;
};
```

## 7.2 Reign

A reign begins when a new ruler is crowned and ends when Core Integrity reaches zero.

```ts
type Reign = {
  id: string;
  ordinal: number;
  rulerPlayerId: string;
  publicIdentityId: string | null;
  startedAt: string;
  endedAt: string | null;
  status: "CORONATION" | "ACTIVE" | "DEFEATED" | "ARCHIVED";
  coreIntegrity: number;
  coreMaxIntegrity: number;
  siegeCharge: number;
  royalGuardCharge: number;
  defensePriceTier: number;
  worldSeed: string;
  generatorVersion: string;
  stateVersion: number;
};
```

## 7.3 Reign reset semantics

Persistent world means persistence **inside the active reign and across visitors**, not that rubble from every previous king remains forever.

On conquest:

1. previous state freezes;
2. previous reign is archived;
3. prior damaged fortress remains reproducible from archive/events;
4. new reign receives a newly generated intact base fortress;
5. old shields/defenses do not carry over;
6. Siege Charge resets;
7. Royal Guard resets;
8. Core resets to full;
9. defense escalation resets;
10. new ruler enters coronation.

---

# 8. Authoritative Defeat Condition

## 8.1 Decision

The only authoritative defeat condition is:

> **Core Integrity <= 0**

Visual collapse, crown fall, character fall, and throne destruction are presentation triggered by the authoritative defeat.

## 8.2 Why

This avoids ambiguous outcomes caused by client physics.

The system must never have:

- one client believing ruler fell;
- another client seeing ruler standing;
- server uncertain whether “enough” geometry collapsed.

## 8.3 Core rules

Initial defaults:

- `core_max_integrity = 100`
- Core starts at 100.
- Core cannot heal during a reign.
- Shield can prevent Core hits.
- Structure can physically block Core.
- Brace can protect structure.
- Normal projectile must physically reach Core collider to damage Core.
- A special shot may have limited penetration rules but cannot bypass all structure arbitrarily.

---

# 9. Procedural Fortress

## 9.1 No external 3D asset requirement

The first complete world must be capable of shipping with zero external 3D model packs. This is an architectural capability, not a mandate that all future art remain procedural.

### Procedural-art boundary

“Procedural-first” does **not** mean attempting to reproduce the highly detailed, ornate, realistic castles shown in early concept-art generations using only a handful of Three.js primitives. Those images are mood/concept references, not feasible direct procedural targets without turning the project into a large procedural-graphics R&D effort.

The launch visual target should instead be a purpose-designed procedural game language: modular, chunky, stylized, readable, destructible, and visually distinctive. The visual system should derive quality from silhouette, proportions, bevel/edge treatment, material grammar, lighting, shadows, generated variation, animation, VFX, damage staging, camera choreography, and satisfying physics rather than from ornate asset density.

External authored 3D assets remain an optional escape hatch for later characters, signature props, themed worlds, or art upgrades. Gameplay semantics, colliders, persistence, and authoritative simulation must never depend on a particular GLB/model pack.

Allowed inputs:

- code;
- generated geometry;
- generated textures;
- user-supplied normalized ruler logo/avatar;
- small authored audio assets if desired.

Kenney or other packs may be added later but are not part of the architecture.

## 9.2 World generator contract

```ts
type WorldDefinition = {
  generatorVersion: string;
  seed: string;
  components: WorldComponentDefinition[];
  defenseSlots: DefenseSlotDefinition[];
  launchers: LauncherDefinition[];
  secondaryTargets: SecondaryTargetDefinition[];
  cameraPresets: CameraPresetDefinition[];
  coreComponentId: string;
};
```

The generator must be pure with respect to:

- `generatorVersion`;
- `seed`;
- game configuration.

Same inputs produce same semantic world definition.

## 9.3 Stable component IDs

Examples:

- `foundation:main`
- `wall:front:left`
- `wall:front:center`
- `wall:front:right`
- `tower:left`
- `tower:right`
- `gate:main`
- `core:main`
- `throne:main`
- `brace_slot:left_01`
- `shield_slot:core_front`

IDs are semantic, not random scene-node UUIDs.

## 9.4 Geometry vocabulary

### Foundation
- low-poly stepped island/platform;
- BoxGeometry / CylinderGeometry / custom low-poly BufferGeometry;
- optional deterministic noise only for silhouette.

### Walls
- parameterized boxes/rounded boxes;
- crenellation pattern generated from wall width;
- limited bevel language;
- render segments aligned to gameplay components.

### Towers
- cylinder, octagonal prism, or box-derived;
- crenellations instanced around perimeter;
- simple openings decorative only unless gameplay-relevant.

### Gate
- boxes + arch profile;
- visual arch may use Shape + ExtrudeGeometry;
- collider can remain compound cuboids.

### Throne
- primitive composition;
- distinct silhouette;
- no need for detailed model.

### Core
- procedural emissive crystal/orb/reactor;
- clear hit target once exposed.

### Cannon / siege launcher
- cylinder barrel;
- box carriage;
- simple recoil transform;
- visual only except launch origin.

### Shields
- plane/dome/ring;
- transparent/emissive shader;
- authoritative collider represented by simple shape.

### Flags
- subdivided PlaneGeometry;
- lightweight vertex shader/wave;
- crest texture composed from normalized logo/avatar.

### Guards
Launch path:
- procedural capsule/sphere/box figures;
- minimal idle animation;
- later authored rigs optional.

## 9.5 Material system

Define a small material grammar:

- Stone
- Wood
- Metal
- Royal Accent
- Attacker Accent
- Shield Energy
- Core Energy
- Damage/Scorch
- Terrain
- Neutral UI-linked highlight

Avoid dozens of unique textures.

Prefer:

- vertex colors;
- procedural noise;
- roughness variation;
- gradients;
- lightweight normal-like procedural effects;
- CanvasTexture for crests/banners.

## 9.6 Art direction requirements

Procedural does not mean unstyled.

Define:

- consistent edge/bevel language;
- chunky proportions;
- exaggerated silhouette;
- controlled palette;
- readable material differences;
- strong light direction;
- limited shadow casters;
- exaggerated impact particles;
- clear damage staging;
- smooth camera choreography;
- satisfying recoil;
- satisfying collapse timing.

## 9.7 Damage visual stages

Each structural component supports:

- `INTACT`
- `DAMAGED`
- `CRITICAL`
- `DESTROYED`

These are semantic states.

Visual differences may include:

- color darkening;
- crack decal/generation;
- missing decorative chunks;
- smoke;
- instability;
- rubble replacement.

## 9.8 Destruction

Do not simulate every brick permanently.

Flow:

1. component fixed/static;
2. authoritative hit reduces component HP;
3. component crosses destruction threshold;
4. server commits `DESTROYED`;
5. clients play deterministic-ish collapse presentation;
6. temporary fragments become dynamic;
7. after timeout/sleep, replace them with stable procedural rubble;
8. persist only semantic destroyed/rubble state.

---

# 10. Structural Model

## 10.1 Structure is physical protection, not a global abstract Armor bar

The first production design should not require a giant persistent Armor meter.

The Core is protected by literal geometry.

## 10.2 Component fields

```ts
type WorldComponentState = {
  componentId: string;
  componentType: string;
  hp: number;
  maxHp: number;
  state: "INTACT" | "DAMAGED" | "CRITICAL" | "DESTROYED";
  materialClass: "STONE" | "WOOD" | "METAL" | "CORE";
  supportGroup?: string;
  destroyedAtEventId?: string;
  version: number;
};
```

## 10.3 Suggested initial fortress components

- Foundation: indestructible gameplay base.
- Front-left wall.
- Front-center wall.
- Front-right wall.
- Left tower.
- Right tower.
- Gate lintel/upper structure.
- Core enclosure.
- Core.
- Decorative throne/crown: non-authoritative.

Keep semantic destructible component count low, roughly 8–16 meaningful components.

---

# 11. Attack Economy

## 11.1 Launch pricing

Initial default:

> **$3 = 3 shots**

One product, one primary attack price.

Do not launch with volume discounts.

## 11.2 Why fixed attack price

Benefits:

- understandable;
- easy checkout;
- fairer than weapon tiers;
- reduces decision clutter;
- clean analytics;
- easier balancing.

## 11.3 More spend

A player may buy another pack.

More money therefore buys:

- more attempts;
- more chances to learn;
- more opportunities to contribute.

It does not automatically buy:

- more per-shot damage;
- guaranteed hit;
- guaranteed special weapon;
- Core health reduction.

## 11.4 Entitlement

A successful paid attack purchase creates:

```ts
type AttackEntitlement = {
  id: string;
  playerId: string;
  paymentId: string;
  shotsPurchased: number;
  shotsRemaining: number;
  status: "PENDING" | "AVAILABLE" | "QUEUED" | "ACTIVE" | "CONSUMED" | "REVOKED";
  createdAt: string;
  expiresAt: string | null;
};
```

Initial recommendation:
- unused paid entitlements do not expire quickly;
- they may be used in a later reign;
- however, an entitlement queued into a turn is bound to current world state when the turn starts.

---

# 12. Attack Turn

## 12.1 Turn unit

One $3 pack creates one attack turn containing three normal shots.

## 12.2 Timing

Recommended defaults:

- 20 seconds maximum aim time per shot.
- 3–5 seconds typical impact animation.
- 5 seconds maximum resolve/intermission.
- Total normal turn budget approximately 75 seconds.
- Special bonus shot may extend turn.

## 12.3 One active attacker

There is only one authoritative attack turn active at once.

Benefits:

- no conflicting kill shots;
- spectators can watch one clear event;
- state is stable while aiming;
- easier server verification;
- queue becomes social proof.

## 12.4 Queue behavior

Low traffic:
- turn starts immediately after entitlement confirmation.

High traffic:
- entitlement joins FIFO queue.

A queued player may leave the page.

When their turn reaches front:
- notify active client if connected;
- start a 30-second claim window;
- if not claimed, move entitlement to AVAILABLE rather than consuming;
- do not burn paid shots merely because user disconnected;
- queue continues to next player.

A player may requeue later.

## 12.5 Turn lock

When attack turn starts:

- bind `reign_id`;
- bind `world_version`;
- bind current `world_snapshot_hash`;
- bind simulation/game version;
- create turn lease;
- prevent defensive placement until shot resolves/intermission.

---

# 13. Attack Input

## 13.1 Input model

Use the same basic model on desktop and mobile.

### Mobile
One-thumb drag/pull and release.

### Desktop
Pointer drag/pull and release.

## 13.2 Proposed mapping

Player interacts with a projectile/launcher handle.

Input maps to:

```ts
type ShotIntent = {
  yaw: number;
  elevation: number;
  power: number;
  projectileType: "STONE" | "BREAKER";
  clientInputDurationMs: number;
};
```

Ranges:

- yaw constrained by camera/world;
- elevation constrained to useful arc;
- power normalized 0–1 with enforced minimum.

## 13.3 Trajectory preview

Client may show a dotted preview of only the early portion of the arc.

Do not reveal an exact full collision prediction.

This preserves skill.

## 13.4 Server input

Client does not submit:

- damage;
- hit target;
- collision point as authority;
- Core HP;
- component HP.

Client submits only intent.

---

# 14. Projectile and Damage Model

## 14.1 First projectile

Normal stone/cannonball.

One projectile type is enough for base paid play.

## 14.2 Special projectile

Breaker Shot.

Earned through shared attacker play, not purchased directly.

## 14.3 Damage inputs

Authoritative simulation considers:

- projectile mass;
- impact velocity;
- impact angle;
- material resistance;
- active shield interaction;
- component state;
- projectile modifier.

## 14.4 Damage formula

Exact tuning belongs in config, but the implementation should use deterministic functions.

Conceptual:

```ts
impactEnergy = 0.5 * mass * speed * speed

rawDamage = max(
  0,
  (impactEnergy - materialResistance) * materialDamageScale
)

damage = clamp(rawDamage, 0, perHitDamageCap)
```

Core damage uses Core-specific scale/cap.

## 14.5 Hard caps

Even a very strong normal shot should not delete a full healthy Core in one hit.

Recommended initial Core direct-hit range after tuning:
- approximately 8–25 damage per valid normal Core impact.

The product must be balanced by simulation/playtesting, not these placeholder numbers alone.

---

# 15. Secondary Target and Shared Attacker Collaboration

## 15.1 First secondary target

**Power Orb**

One moving Power Orb may be active during an attack turn.

It is intentionally smaller/harder than the fortress.

## 15.2 Trade-off

A paid shot may target:

- fortress/Core;
- Power Orb.

A shot spent on Power Orb deals no direct fortress damage.

## 15.3 Shared Siege Charge

Initial:

- global Siege Charge range 0–100;
- valid Power Orb hit grants +25;
- charge persists across attackers in same reign.

At 100:
- grant one Breaker Shot;
- assign it to the attacker whose shot crossed the threshold;
- if their three normal shots are already consumed, add a fourth bonus shot;
- reset Siege Charge to 0 after Breaker Shot is armed.

## 15.4 Breaker Shot

Initial effect:
- increased structural damage multiplier;
- partial shield penetration;
- no large multiplier to direct Core damage.

Recommended:
- 1.5x structure damage;
- 25% shield damage penetration;
- Core damage cap same as normal projectile.

This prevents the shared meter from becoming a direct pay-to-nuke system.

---

# 16. Defense Economy

## 16.1 Defense is paid but finite

One defense purchase creates one placement entitlement.

Initial player chooses:

- Shield
- Brace

## 16.2 Escalating price

Defense cost escalates globally within the current reign.

Recommended price ladder:

1. $3
2. $3
3. $5
4. $8
5. $13
6. $21
7. $34

After the configured maximum tier:
- remain at final tier or use an operator-configurable cap;
- do not create unlimited unbounded arbitrary prices without review.

Reset ladder on new reign.

## 16.3 Why global escalation

If only the ruler escalates, supporters can bypass the anti-stagnation rule.

Therefore the price tier belongs to the reign, not the individual payer.

## 16.4 What a defense purchase does not do

It does not:
- heal Core;
- automatically increase a number;
- rebuild destroyed walls;
- guarantee survival.

It grants one legal defensive gameplay action.

---

# 17. Defensive Actions

## 17.1 Shield

A shield is placed into a server-defined shield slot.

Possible launch slots:
- Core-front
- left approach
- right approach

Initial behavior:
- absorbs projectile interactions;
- finite damage capacity and/or hit count;
- does not restore anything beneath it.

Recommended initial:
- 25 shield HP;
- maximum 2 normal projectile impacts, whichever threshold occurs first.

## 17.2 Brace

Brace attaches to an eligible damaged but not destroyed structural component.

Effect:
- reduces subsequent impact damage to that component;
- does not restore HP;
- disappears if attached component is destroyed.

Recommended initial:
- 35% structure damage reduction;
- one brace per eligible component;
- no brace on Core.

## 17.3 Placement timing

Defenses can be placed:
- between attack turns;
- during queue idle time;
- during coronation once ruler is published.

Defenses cannot be placed:
- while an authoritative shot is armed;
- while projectile is in flight;
- while current shot is resolving.

## 17.4 Placement UI

On Defend:
1. regular HUD recedes;
2. camera frames fortress;
3. valid slots glow;
4. user chooses Shield/Brace;
5. user taps valid slot;
6. placement preview appears;
7. confirm;
8. server validates entitlement and slot;
9. state commits;
10. object appears for everyone.

---

# 18. Shared Defender Collaboration

## 18.1 Royal Guard Charge

Range: 0–100.

Each valid paid defense placement:
- +25 Royal Guard Charge.

At 100:
- trigger one free Royal Shield Pulse;
- reset meter to 0.

## 18.2 Royal Shield Pulse

Launch behavior:
- blocks the next valid direct Core hit;
- expires after a configured maximum time if never triggered;
- does not block structure hits;
- cannot stack.

This provides visible collaboration without repairing Core.

---

# 19. Ruler Defense

The ruler has no unique pay-to-win defense API.

They may buy defense entitlements using the same rules as anyone else.

The ruler advantage is:
- public attention;
- ability to call supporters;
- awareness/notifications;
- ownership status.

The ruler does not receive:
- cheaper defenses;
- stronger shields;
- free Core heal;
- hidden buffs.

---

# 20. Reign Lifecycle

## 20.1 States

```ts
type ReignStatus =
  | "CORONATION"
  | "ACTIVE"
  | "DEFEAT_PENDING"
  | "DEFEATED"
  | "ARCHIVED";
```

## 20.2 CORONATION

Triggered after a successful conquest.

Duration:
- up to 120 seconds protected.

During coronation:
- no shots may be fired;
- attack entitlements may be purchased and queued;
- winner configures public identity;
- ruler may buy/place a defense only after identity publish;
- new fortress generates.

If winner does nothing:
- use fallback public identity from their lightweight player profile;
- no outbound CTA;
- activate reign after timeout.

Do not block the game indefinitely.

## 20.3 ACTIVE

Normal state.

Attack and defense allowed under turn rules.

## 20.4 DEFEAT_PENDING

Internal transactional state.

Entered when authoritative simulation would reduce Core <= 0.

During commit:
- lock current world row;
- verify state version;
- apply shot;
- mark Core zero;
- identify decisive attacker;
- close current turn;
- close current reign;
- prevent further defensive commits;
- create next reign;
- publish defeat event.

This should be one atomic server transaction.

## 20.5 DEFEATED / ARCHIVED

Previous reign becomes immutable historical data.

---

# 21. Conqueror and Recognition

## 21.1 Conqueror

Player whose valid authoritative shot reduces Core to zero.

They get next throne.

## 21.2 Siege MVP

Highest weighted attacker contribution.

Suggested scoring:
- Core damage weighted highest;
- structural damage;
- shield damage;
- Siege Charge contribution.

Exact formula is configurable.

## 21.3 Other attack titles

- Breaker: most destroyed structural components.
- Shieldbreaker: most shield damage.
- Heavy Hit: largest valid single structure hit.

## 21.4 Defender titles

- Royal Guard MVP.
- Most damage prevented.
- Longest surviving defense placement.

## 21.5 Kill-steal handling

Final hit still gets throne.

Historical archive prominently records:
- Conqueror;
- Siege MVP;
- top contributors.

Do not attempt complicated proportional ownership.

---

# 22. History and Hall of Fame

## 22.1 Archive per reign

Archive:
- ruler public identity;
- start/end;
- duration;
- conqueror;
- Siege MVP;
- Royal Guard MVP;
- attack count;
- defense count;
- projectiles fired;
- Core hits;
- visitors/spectators;
- total attack gross revenue;
- total defense gross revenue;
- major world events;
- generator version;
- world seed;
- final component states.

## 22.2 Hall of Fame

Secondary surface.

Possible rankings:
- longest reign;
- most attacks survived;
- most projectiles survived;
- most contested reign;
- most times ruler;
- fastest conquest;
- top Siege MVP contributions;
- top defender contributions.

Do not show this permanently on the primary game screen.

---

# 23. UI State Specification

## 23.1 LIVE_SPECTATOR

Visible:
- world;
- ruler chip;
- Core;
- reign duration;
- Attack;
- Defend;
- transient live attacker label.

Hidden by default:
- queue details;
- event feed;
- history.

## 23.2 ATTACK_PURCHASE

Open Dodo overlay or payment surface.

World remains visible/dimmed behind.

After checkout:
- show “Confirming payment…”;
- do not mint shots from client return;
- wait for webhook-authorized entitlement.

## 23.3 ATTACK_QUEUED

Show:
- queue position;
- current active attacker;
- option to leave page;
- entitlement remains valid.

## 23.4 ATTACK_ACTIVE

World dominates screen.

Show only:
- attacker identity;
- shot X/3;
- aim/power UI;
- Power Orb if active;
- compact Siege Charge;
- cancel only before shot begins, subject to turn rules.

## 23.5 SHOT_RESOLVING

Disable input.

Camera follows projectile/impact.

Short result overlays:
- Wall -18
- Shield broken
- Core -12
- Power +25

## 23.6 DEFEND_PURCHASE

Dodo overlay.

## 23.7 DEFEND_PLACEMENT

World dominates screen.

Show:
- available item;
- valid slots;
- compact current defense price;
- confirm.

## 23.8 CORONATION

Focused modal/sheet over rebuilt world.

Fields:
- identity type;
- display name;
- URL;
- logo/avatar;
- message;
- CTA;
- social.

Show countdown.

## 23.9 SIEGE_DETAILS

Secondary drawer/bottom sheet.

Contains:
- attacker/defender activity;
- Siege Charge;
- Royal Guard;
- queue;
- recent events;
- contributors;
- detailed ruler stats.

## 23.10 HISTORY

Separate route or deep secondary sheet is acceptable.

Primary route remains `/`.

## 23.11 Complete screen and product-state inventory

These are states, modes, sheets, overlays, and secondary surfaces of a primarily single-page product. They are **not** a requirement for dozens of separate routes.

| ID | Screen / state | Primary purpose | Surface type | Launch |
|---|---|---|---|---|
| S00 | Boot / World Loading | Load app, current snapshot, renderer and physics | Temporary | Yes |
| S01 | Connection Lost / Reconnecting | Freeze unsafe actions and recover canonical state | System | Yes |
| S02 | Empty Throne | Seed a world when no ruler exists | Main state | Yes |
| S03 | Live Siege / Spectator Home | Watch world and choose Attack or Defend | Primary state | Yes |
| S04 | Live Attack Spectator | Watch another player's active attack | Main variation | Yes |
| S05 | Critical Siege | Heightened presentation when Core is near defeat | Main variation | Yes |
| S06 | Ruler Identity Sheet | Inspect ruler identity, URL and reign stats | Sheet | Yes |
| S07 | Attack Purchase | Select/buy attack entitlement | Bottom sheet | Yes |
| S08 | Dodo Checkout | Complete payment | Overlay | Yes |
| S09 | Payment Processing | Await authoritative provider/webhook confirmation | Overlay/system | Yes |
| S10 | Payment Failed | Retry or exit | Overlay | Yes |
| S11 | Attack Entitlement Granted | Confirm shots/resources received | Transition | Yes |
| S12 | Attack Queue | Wait safely for active turn | Sheet/HUD | Yes |
| S13 | Attack Ready | Short “your turn” transition/countdown | Transition | Yes |
| S14 | Attack Mode | Aim, power, trajectory and fire | Fullscreen game mode | Yes |
| S15 | Projectile In Flight | Follow/observe shot | Game state | Yes |
| S16 | Impact / Damage Resolution | Show authoritative hit/destruction result | Game state | Yes |
| S17 | Between Shots | Re-arm next shot on updated canonical world | Game state | Yes |
| S18 | Attack Turn Complete | Summarize contribution and remaining entitlement | Overlay | Yes |
| S19 | Defense Purchase | Select/buy defense resource | Bottom sheet | Yes |
| S20 | Defense Placement | Place resource in valid world slot | Fullscreen game mode | Yes |
| S21 | Defense Resolution | Confirm accepted defense/world mutation | Transition | Yes |
| S22 | Ruler Defense Controls | Let ruler reinforce/defend within rules | Context sheet | Yes |
| S23 | Ruler Under Siege Alert | Bring ruler back to an active siege | Notification/overlay | Yes |
| S24 | Core Destroyed | Cinematic decisive world event | Cinematic state | Yes |
| S25 | Victory / Conqueror | Confirm authoritative conqueror | Transition | Yes |
| S26 | Coronation Identity Setup | Configure public identity | Form sheet | Yes |
| S27 | Coronation Fortification | Configure allowed initial defense/fortification | Sheet/game setup | Yes |
| S28 | New Reign Transition | Rebuild/regenerate world and apply new identity | Cinematic state | Yes |
| S29 | Dethroned | Inform previous ruler and show reign result | Overlay/sheet | Yes |
| S30 | Live Siege Details | Show detailed current siege state | Bottom sheet/drawer | Yes |
| S31 | Reign History | Explore current/past reigns | Secondary | Yes |
| S32 | Reign Timeline | View meaningful attack/defense/world events | Secondary | Yes |
| S33 | Hall of Fame | Historical rankings | Secondary | Yes |
| S34 | Contribution Rankings | Siege/defense contributor recognition | Secondary | Yes |
| S35 | Queue Details | Inspect current/upcoming attackers | Secondary | Optional launch |
| S36 | Share Reign / Result | Generate/copy shareable status | Sheet | Yes |
| S37 | How It Works | Explain mechanic in a few steps | Sheet | Yes |
| S38 | Practice Range | Free non-persistent aiming practice | Game mode | Later |
| S39 | Identity Verification | Verify domain/brand control | Flow | Later |
| S40 | Identity Moderation Pending | Hold public identity while reviewing | System | As needed |
| S41 | Identity Rejected / Edit | Repair unsafe or misleading identity data | System | Yes if moderated |
| S42 | Purchase Recovery | Restore entitlement after partial client/payment failure | System | Yes |
| S43 | Unsupported WebGL / Device | Explain unsupported rendering environment | System | Yes |
| S44 | Reduced Graphics Mode | Preserve playability under low capability | System | Yes |

### Priority design surfaces

Before designing every state, agents should fully define these six families:

1. Live Siege / Spectator Home.
2. Attack Purchase + Checkout.
3. Attack Mode and shot-resolution states.
4. Defense Purchase + Placement.
5. Core Destruction + Victory + Coronation.
6. Siege Details + History.

## 23.12 DOM/UI component inventory

These are product/UI components rendered primarily in DOM/CSS. They must not all appear simultaneously.

### Persistent or frequent live-state components

- product mark;
- ruler identity chip;
- destination domain;
- optional verification badge;
- reign timer;
- Core Integrity indicator;
- temporary Shield indicator only when relevant;
- viewer count/social proof where useful;
- Attack CTA;
- Defend CTA;
- current attacker chip;
- critical-state indicator;
- details/drawer trigger.

### Contextual attack components

- shots remaining;
- projectile identity/icon;
- power meter;
- aim reticle;
- trajectory preview;
- pull/drag interaction guide;
- cancel-shot action;
- attack-turn timer;
- special-shot indicator;
- Siege Charge indicator;
- hit feedback;
- structural-hit label;
- Core-hit feedback;
- turn-result summary.

### Contextual defense components

- defense entitlement/inventory;
- defense resource card;
- Shield item;
- Brace item;
- valid placement slot;
- placement ghost/preview;
- placement validity state;
- rotate control if required;
- confirm placement;
- Royal Guard Charge indicator;
- defense contribution feedback.

### Purchase/payment components

- attack pack card;
- defense resource card;
- exact price;
- Dodo checkout trigger;
- payment pending state;
- payment success state;
- payment failure state;
- entitlement balance;
- purchase recovery action.

### Public-identity components

- display name;
- identity type chip;
- logo/avatar;
- destination URL/domain;
- one-line message;
- constrained CTA;
- optional social handle;
- verification badge;
- public-identity preview.

### Coronation components

- victory banner;
- defeated-ruler summary;
- identity form;
- URL metadata autofill/suggestion;
- logo/avatar uploader;
- CTA selector;
- one-line message field and character counter;
- public preview;
- initial fortification selector;
- current reinforcement price;
- publish/start-reign action;
- protected coronation countdown.

### History/social components

- reign summary;
- ruler history card;
- conqueror card;
- Siege MVP card;
- Royal Guard MVP card;
- attack contribution row;
- defense contribution row;
- timeline/event row;
- reign duration stat;
- attacks survived stat;
- projectiles survived stat;
- spectator stat;
- attack/defense activity totals;
- Hall of Fame rows;
- share-card generator;
- copy-link/share action.

### Feedback/system components

- incoming attack toast;
- wall/component destroyed toast;
- Shield destroyed toast;
- Core exposed warning;
- Core critical warning;
- Siege Charge full;
- Royal Guard Charge full;
- defender joined;
- attacker queued;
- your-turn transition;
- payment confirmed;
- attack entitlement granted;
- defense entitlement granted;
- throne captured;
- dethroned;
- reconnecting;
- stale world-state warning;
- reduced-performance notice.

## 23.13 3D world/game-object inventory

The world should communicate state visually so DOM HUD remains minimal.

### Environment

- island/terrain base;
- water/void/background plane;
- sky/atmosphere;
- main directional light;
- ambient/fill light;
- fog/atmospheric depth;
- distant low-cost silhouettes;
- attacker platform;
- fortress platform;
- approach/visual path;
- camera anchors/presets.

### Fortress architecture

- foundation;
- central keep;
- Core/throne tower;
- outer walls;
- inner walls where needed;
- towers;
- gate;
- parapets;
- battlements/crenellations;
- stairs/platforms;
- arches;
- supports/braces;
- buttresses/columns where stylistically useful;
- destructible weak sections;
- Core enclosure;
- throne/crown marker.

### Ruler-identity surfaces

- central banner;
- flags;
- crest;
- throne crest;
- logo plaque;
- shield texture/crest;
- optional portrait surface.

Ruler logos should generally become generated textures applied to stable procedural geometry rather than custom 3D models.

### Attack hardware/projectiles

- launcher/cannon;
- barrel;
- carriage/base;
- firing/recoil mechanism;
- standard cannonball;
- Breaker projectile;
- later sidegrade projectile forms;
- muzzle flash;
- smoke;
- trajectory markers/aim helpers.

### Defense objects

- Shield dome/wall;
- Brace;
- barricade later;
- Royal Shield effect;
- defense placement anchor/slot.

### Secondary targets

- Power Orb;
- later shield generator;
- later explosive/supply/moving targets as balance requires.

### Damage/destruction presentation

- intact state;
- damaged state;
- critical state;
- destroyed state;
- displaced/collapse state;
- rubble representation;
- exposed Core state;
- impact/scorch mark;
- dust;
- smoke;
- fire/sparks where appropriate;
- falling temporary fragments.

### Physics objects/colliders

- fixed structural collider;
- dynamic collapse body;
- projectile rigid body;
- temporary debris body;
- Shield collider;
- weak-point collider;
- Core collider;
- trigger zones;
- out-of-bounds volumes.

## 23.14 Non-visual game/system component inventory

These systems must exist independently of how the UI renders them:

- current reign;
- world-state version;
- Core Integrity;
- semantic structural-health state;
- active Shields;
- active Braces;
- attacker queue;
- active attack turn;
- attack entitlement;
- defense entitlement;
- projectile definition;
- defense-resource definition;
- damage resolver;
- structural dependency/collapse resolver;
- Siege Charge;
- Royal Guard Charge;
- reinforcement-price escalation;
- succession resolver;
- contribution scoring;
- reign-history/event log;
- Dodo payment record;
- entitlement issuance/idempotency;
- public-identity state;
- moderation state;
- realtime event stream;
- spectator/session state;
- verification/replay record;
- anti-cheat/risk signals;
- balance configuration/version.

## 23.15 Screen-composition invariant

The default live product should be reducible to approximately:

```text
[Ruler identity]                              [Core]
[Reign time]


                     3D WORLD


               [ATTACK]   [DEFEND]
```

The scene should communicate structural condition, Shield presence, shared pressure, and damage before a user opens detail UI. Event feed, queue, history, meters, rankings and economics must remain contextual or secondary unless an active mode requires them.

---

# 24. Mobile Specification

## 24.1 Orientation

Primary design: portrait-first responsive.

Landscape still supported.

Do not require orientation lock.

## 24.2 Persistent layout

Portrait:

Top:
- ruler chip left;
- Core right.

Middle:
- fullscreen WebGL world.

Bottom:
- Attack;
- Defend.

## 24.3 Bottom sheet

Swipe/tap details:
- live siege details;
- queue;
- contributors;
- history.

No five-tab mobile navigation.

## 24.4 Touch targets

Minimum interactive target approximately 44 CSS px.

## 24.5 Input

Attack drag must:
- not scroll page while active;
- use pointer events;
- capture pointer;
- handle cancellation.

## 24.6 Gyroscope

Not authoritative input.

Optional later for camera inspection only.

---

# 25. Desktop Specification

Desktop is not a dashboard.

Use the same hierarchy:
- world;
- ruler;
- Core;
- Attack/Defend.

Secondary details may appear as a floating drawer because screen is larger, but must not permanently consume large columns.

---

# 26. Technology Stack

## 26.1 Web app
- Next.js
- TypeScript
- React

Use current stable compatible versions at implementation time and commit lockfile.

## 26.2 3D
- Three.js
- React Three Fiber
- Drei where useful

## 26.3 Physics
- Rapier JavaScript/WASM
- `@react-three/rapier` for client integration

## 26.4 Client state
- Zustand

Use it for:
- UI state;
- local snapshot;
- ephemeral action state.

Do not put per-frame transforms in React state.

## 26.5 Database
- PostgreSQL via Supabase

## 26.6 Realtime
- Supabase Realtime Broadcast

Use Broadcast rather than relying on Postgres Changes for the primary world event fan-out.

Current Supabase guidance recommends Broadcast for scalability/security over Postgres Changes.

## 26.7 Authentication
- Supabase Auth
- automatic anonymous session for spectators/players;
- email/magic-link recovery/upgrade after payment or when needed.

## 26.8 Storage
Supabase Storage for:
- normalized logo/avatar;
- share-card renders if persisted;
- moderation evidence if needed.

No required 3D asset storage for first world.

## 26.9 Payments
- Dodo Payments
- one-time products/checkouts
- webhook authority
- overlay checkout preferred
- redirect fallback supported

## 26.10 Hosting
- Vercel for Next.js product/API layer

## 26.11 Analytics
- PostHog later/at launch depending effort

## 26.12 Error monitoring
- Sentry or equivalent

---

# 27. Architecture

## 27.1 Logical modules

```text
apps/web
  /app
  /api
  /components
  /game
    /renderer
    /input
    /hud
  /features
    /attack
    /defense
    /coronation
    /identity
    /history

packages/domain
  reign.ts
  identity.ts
  economy.ts
  events.ts
  schemas.ts

packages/world
  generator.ts
  components.ts
  materials.ts
  damage-visuals.ts
  seeds.ts

packages/sim
  world-definition.ts
  colliders.ts
  projectile.ts
  damage.ts
  shot-sim.ts
  deterministic.ts

packages/server
  db.ts
  payments.ts
  entitlements.ts
  turn-service.ts
  world-service.ts
  moderation.ts
```

Exact monorepo structure may differ, but renderer, domain, generator, and authoritative simulation must be separable.

## 27.2 Critical separation

### Domain
Knows game rules.

### World generator
Knows semantic geometry/colliders.

### Renderer
Knows Three/R3F.

### Simulation
Knows authoritative projectile/collision logic.

### Payment
Knows entitlements, not damage.

### Database
Stores state and events, not rendered meshes.

---

# 28. Server Authority

## 28.1 The server owns

- paid entitlement creation;
- remaining shots;
- active turn;
- queue;
- current reign;
- world version;
- Core;
- component HP;
- shield/brace state;
- Siege Charge;
- Royal Guard;
- succession.

## 28.2 Client owns only presentation/input intent

Client may:
- render predictive trajectory;
- locally animate aim;
- locally animate provisional projectile for responsiveness.

But authoritative result comes from server.

## 28.3 Shot request

Example:

```json
{
  "turnId": "turn_...",
  "shotOrdinal": 2,
  "expectedWorldVersion": 1843,
  "input": {
    "yaw": 0.18,
    "elevation": 0.71,
    "power": 0.83,
    "projectileType": "STONE",
    "clientInputDurationMs": 2871
  }
}
```

## 28.4 Shot response

```json
{
  "accepted": true,
  "eventId": "evt_...",
  "worldVersion": 1844,
  "result": {
    "collisions": [],
    "componentChanges": [],
    "coreDelta": -12,
    "siegeChargeDelta": 0,
    "victory": false
  }
}
```

---

# 29. Simulation

## 29.1 Shared simulation package

Use one simulation package imported by:
- client for preview/replay;
- server for authoritative simulation.

Pin Rapier version.

## 29.2 Fixed timestep

Use fixed simulation timestep.

Do not make authoritative results depend on browser frame rate.

## 29.3 Collision geometry

Prefer simple authoritative colliders:

- cuboid;
- ball;
- capsule;
- cylinder;
- convex/compound.

Use trimesh mainly for fixed environment when necessary.

Dynamic non-convex debris should not depend on dynamic triangle-mesh colliders.

## 29.4 Render vs gameplay geometry

They may differ.

Rule:
- visual mesh may be richer;
- gameplay collider must remain predictable and inspectable.

Build a debug mode that overlays colliders and component IDs.

---

# 30. Database Design

Authoritative mutable tables should not be broadly exposed to client Data API.

Prefer server-side access and sanitized API/broadcast output.

## 30.1 `players`

Fields:
- `id uuid pk`
- `auth_user_id uuid unique`
- `created_at timestamptz`
- `display_name text nullable`
- `avatar_path text nullable`
- `primary_email_hash text nullable`
- `status text`
- `last_seen_at timestamptz`

Do not store raw payment secrets.

## 30.2 `public_identities`

Fields:
- `id uuid pk`
- `owner_player_id uuid`
- `identity_type text`
- `display_name text`
- `destination_url text nullable`
- `destination_domain text nullable`
- `logo_path text nullable`
- `message text nullable`
- `cta_choice text nullable`
- `social_handle text nullable`
- `verification_status text`
- `moderation_status text`
- `created_at`
- `updated_at`

## 30.3 `reigns`

Fields:
- `id uuid pk`
- `ordinal bigint unique`
- `ruler_player_id uuid`
- `public_identity_id uuid nullable`
- `status text`
- `started_at`
- `ended_at`
- `world_seed text`
- `generator_version text`
- `state_version bigint`
- `core_integrity numeric`
- `core_max_integrity numeric`
- `siege_charge integer`
- `royal_guard_charge integer`
- `defense_price_tier integer`
- `conqueror_player_id uuid nullable`
- `archive_summary jsonb nullable`

## 30.4 `world_components`

Fields:
- `reign_id`
- `component_id text`
- `component_type text`
- `hp numeric`
- `max_hp numeric`
- `state text`
- `generator_params jsonb`
- `version bigint`
- `destroyed_event_id uuid nullable`

Primary key:
- `(reign_id, component_id)`

## 30.5 `defense_placements`

Fields:
- `id uuid`
- `reign_id`
- `player_id`
- `entitlement_id`
- `type`
- `slot_id`
- `hp`
- `max_hp`
- `state`
- `created_at`
- `destroyed_at`
- `version`

## 30.6 `attack_entitlements`

Fields:
- `id`
- `player_id`
- `payment_id`
- `shots_purchased`
- `shots_remaining`
- `status`
- `created_at`
- `consumed_at nullable`

## 30.7 `defense_entitlements`

Fields:
- `id`
- `player_id`
- `payment_id`
- `defense_type nullable until selection`
- `price_tier`
- `status`
- `created_at`
- `consumed_at`

## 30.8 `attack_turns`

Fields:
- `id`
- `reign_id`
- `entitlement_id`
- `player_id`
- `queue_position_seq`
- `status`
- `shots_total`
- `shots_used`
- `lease_started_at`
- `lease_expires_at`
- `bound_world_version`
- `bound_world_hash`
- `created_at`
- `completed_at`

## 30.9 `shots`

Fields:
- `id`
- `turn_id`
- `reign_id`
- `player_id`
- `ordinal`
- `world_version_before`
- `world_version_after`
- `input jsonb`
- `simulation_version`
- `simulation_result jsonb`
- `created_at`
- `resolved_at`

## 30.10 `world_events`

Append-only.

Fields:
- `id`
- `reign_id`
- `world_version`
- `event_type`
- `actor_player_id nullable`
- `payload jsonb`
- `created_at`

Examples:
- `REIGN_STARTED`
- `IDENTITY_PUBLISHED`
- `ATTACK_PURCHASED`
- `TURN_QUEUED`
- `TURN_STARTED`
- `SHOT_RESOLVED`
- `COMPONENT_DAMAGED`
- `COMPONENT_DESTROYED`
- `CORE_DAMAGED`
- `POWER_ORB_HIT`
- `BREAKER_ARMED`
- `DEFENSE_PLACED`
- `DEFENSE_DESTROYED`
- `ROYAL_GUARD_TRIGGERED`
- `RULER_DEFEATED`
- `REIGN_ARCHIVED`

## 30.11 `payments`

Fields:
- `id`
- `provider`
- `provider_payment_id unique`
- `provider_customer_id nullable`
- `player_id nullable`
- `purchase_kind`
- `amount_minor`
- `currency`
- `status`
- `webhook_event_id`
- `created_at`
- `updated_at`

## 30.12 `moderation_cases`

Fields:
- `id`
- `public_identity_id`
- `reason`
- `status`
- `evidence jsonb`
- `created_at`
- `resolved_at`

---

# 31. Transactional World Commit

## 31.1 Need

A shot can change:
- component HP;
- shield;
- Core;
- shared meter;
- entitlement remaining;
- turn status;
- reign status;
- ruler.

These must commit atomically.

## 31.2 Recommended approach

Use a database transaction behind a server-only function/RPC.

If using `SECURITY DEFINER`:
- keep function out of exposed `public` schema;
- revoke execute from PUBLIC/anon/authenticated;
- grant only trusted server role;
- use fixed `search_path`;
- run Supabase database advisors.

## 31.3 Optimistic state check

Commit requires:
- expected reign;
- expected state version;
- expected active turn.

If mismatch:
- reject;
- client refreshes canonical state;
- do not consume shot until transaction accepts.

---

# 32. Realtime

## 32.1 Transport

Supabase Realtime Broadcast.

Use a channel conceptually like:

`world:<worldId>`

## 32.2 Broadcast direction

Clients:
- receive canonical events.

Clients must not:
- broadcast game-authoritative events.

Server/database:
- emits sanitized events.

## 32.3 Why Broadcast

Use Broadcast for scalable fan-out.

Do not use Postgres Changes as the primary shared-world transport when audience grows.

## 32.4 Private channel

Recommended:
- automatic anonymous Supabase Auth session;
- private Realtime channel;
- RLS allows receive for valid authenticated sessions including anonymous;
- no policy granting clients arbitrary send.

## 32.5 Broadcast payload

Keep small:

```ts
type WorldBroadcast =
  | { type: "SHOT_RESOLVED"; version: number; eventId: string; summary: ... }
  | { type: "DEFENSE_PLACED"; version: number; ... }
  | { type: "REIGN_DEFEATED"; version: number; ... }
  | { type: "REIGN_STARTED"; version: number; ... };
```

Do not broadcast entire world snapshot on every event.

## 32.6 Recovery

On:
- reconnect;
- version gap;
- missed event;
- app resume;

client fetches latest authoritative snapshot.

---

# 33. Authentication and Session Model

## 33.1 Spectator

Automatically create anonymous session.

No signup UI.

## 33.2 Paid player

Payment associates purchase with:
- session player;
- Dodo customer/payment identity.

## 33.3 Recovery

If player wants to recover entitlements on another device:
- email/magic-link flow;
- link existing player/account where safe.

## 33.4 Conqueror

Because the conqueror must control a public identity:
- use the paid player's established session;
- if needed require email verification before publishing outbound URL;
- fallback identity may be display-name-only until verification.

---

# 34. Dodo Payments Integration

## 34.1 Business model

One-time purchases.

Initial products/prices:

### Attack Pack
- $3
- 3 shots

### Defense tiers
Create or configure supported one-time products for:
- $3
- $5
- $8
- $13
- $21
- $34

Exact provider implementation must match current Dodo API capabilities.

## 34.2 Checkout

Preferred:
- overlay checkout.

Fallback:
- redirect checkout with return URL.

## 34.3 Authority

Never grant entitlement solely from:
- client checkout callback;
- URL query parameter;
- client “success” state.

Grant only after verified provider webhook / server-confirmed payment.

## 34.4 Webhook idempotency

Store provider event ID.

Processing must be idempotent.

Pseudo:

```text
receive event
verify signature
if event_id already processed -> 200 no-op
lookup/create payment
if payment succeeded:
  create entitlement exactly once
commit
return 200
```

## 34.5 Checkout waiting state

After checkout UI returns:
- show “Confirming payment…”
- poll or subscribe for entitlement;
- start/queue only after entitlement exists.

## 34.6 Refund

If entitlement unused:
- revoke.

If partially/fully consumed:
- do not rewrite historical world automatically;
- flag payment/account for operator review;
- maintain immutable game event log;
- future access may be restricted according to policy.

## 34.7 Chargeback

Same principle:
- preserve historical game state;
- mark payment dispute;
- risk-score account;
- operator controls bans/restrictions.

## 34.8 Provider approval

Before live paid launch, send Dodo the exact product description:
- users pay for finite skill-based attack or defense actions;
- outcomes are skill/state based;
- no cash prize;
- prize is public throne control/status.

Obtain written confirmation for the exact final mechanic.

---

# 35. Moderation and Abuse

## 35.1 Public identity moderation

Check:
- prohibited content;
- explicit sexual content;
- malware/phishing;
- impersonation;
- deceptive branding;
- dangerous URLs;
- unlawful content;
- hateful/extremist material;
- scam copy.

## 35.2 URL safety

Create provider abstraction:

```ts
interface UrlSafetyProvider {
  check(url: string): Promise<{
    safe: boolean;
    categories: string[];
    reason?: string;
  }>;
}
```

If unavailable:
- default-deny suspicious domains;
- allow manual review;
- never skip validation silently.

## 35.3 Logo normalization

Upload pipeline:
1. MIME sniff;
2. decode;
3. reject unsupported formats;
4. strip metadata;
5. resize;
6. re-encode raster;
7. content moderation;
8. store normalized derivative;
9. serve only normalized file.

## 35.4 Impersonation

Famous/regulated brands:
- may require manual verification;
- may be blocked from unverified claim;
- verified badge means domain/handle control, not endorsement.

## 35.5 Reporting

Add “Report ruler” in ruler detail sheet.

---

# 36. Anti-Cheat

## 36.1 Threats

- forged shot results;
- edited JS;
- replayed requests;
- forged payment success;
- speed hacks;
- impossible input;
- multi-tab queue abuse;
- automated perfect aiming;
- replay of old world intent against new world;
- race to claim same kill.

## 36.2 Controls

- server-authoritative simulation;
- signed/authenticated session;
- entitlement bound to player;
- active turn lease;
- world version check;
- request nonce;
- idempotent shot ID;
- fixed allowed input bounds;
- rate limit;
- no client-supplied damage;
- atomic victory transition.

## 36.3 Bot detection

Do not attempt invasive anti-cheat initially.

Log:
- input duration;
- exact repeated vectors;
- impossible reaction times;
- excessive perfect-hit pattern;
- device/session/payment clustering;
- request timing.

Flag suspicious players for review/rate limiting.

## 36.4 Practice vs live

Practice may use same client physics but must not grant world effects or authoritative rewards.

---

# 37. Practice Mode

## 37.1 Purpose

Users should understand controls before paying.

## 37.2 Behavior

- isolated non-persistent castle;
- no real Core/history;
- no rewards;
- no Siege Charge contribution;
- may be unlimited.

## 37.3 Access

From Attack sheet:
- “Practice”
- “Buy 3 shots”

This reduces paid confusion without giving free attacks on the live world.

---

# 38. Performance Budgets

These are engineering targets, not absolute promises.

## 38.1 Initial load

Aim:
- minimal JS outside game;
- lazy-load secondary history/admin;
- procedural geometry avoids multi-megabyte GLBs.

## 38.2 Draw calls

Use:
- InstancedMesh for repeated crenellations/guards/debris where feasible;
- shared materials;
- low count of unique shadow casters.

## 38.3 Triangles

Keep first fortress intentionally modest.

The product does not need millions of triangles.

## 38.4 Physics

- most structure static;
- limited active dynamic bodies;
- projectile pool;
- debris pool;
- sleep bodies quickly;
- simplify rubble.

## 38.5 DPR

Adaptive device pixel ratio.

On mobile:
- cap DPR according to GPU/performance;
- reduce shadow resolution;
- reduce particles;
- disable expensive post effects.

## 38.6 Frame targets

- target 60 fps on capable devices;
- remain usable around 30 fps on weaker supported phones;
- paid input must not change authoritative result with render FPS.

## 38.7 Memory

Monitor:
- texture count;
- render targets;
- geometry disposal;
- pooled object lifecycle;
- WebGL context loss.

Add context-loss recovery.

---

# 39. Responsive Camera

Define camera presets by state:

- `LIVE_DESKTOP`
- `LIVE_MOBILE`
- `ATTACK_DESKTOP`
- `ATTACK_MOBILE`
- `DEFEND_DESKTOP`
- `DEFEND_MOBILE`
- `CORONATION`
- `DEFEAT_CINEMATIC`

Camera positions derive from procedural world bounds.

Do not hard-code one resolution.

---

# 40. Audio

Audio is important but not required to use 3D model assets.

Initial sound categories:
- projectile release;
- impact stone;
- impact shield;
- Core hit;
- shield break;
- structure collapse;
- conquest sting;
- coronation sting.

Provide:
- mute;
- persisted volume;
- respect autoplay restrictions.

Audio may use small authored files or Web Audio synthesis. It is independent of the procedural 3D requirement.

---

# 41. Accessibility

## 41.1 Visual

- do not communicate health only by color;
- combine icon/text/animation;
- reduced-motion option;
- high-contrast HUD;
- readable text sizing.

## 41.2 Motion

If `prefers-reduced-motion`:
- reduce camera shake;
- reduce debris;
- shorten cinematic camera transitions;
- keep outcome understandable.

## 41.3 Input

Support pointer/touch.

Desktop may also offer keyboard adjustments:
- arrows/A-D for aim;
- W-S for elevation/power;
- space to fire.

Not required to duplicate every gesture but provide reasonable alternative.

## 41.4 Spectator alternative

Important state must exist in DOM text, not only 3D.

---

# 42. SEO and Sharing

## 42.1 Homepage metadata

Dynamic:
- current ruler;
- reign duration;
- battle state.

Avoid indexing unsafe user message as raw page title without sanitization.

## 42.2 Share card

Generate social image with:
- current ruler/logo;
- fortress;
- reign;
- Core condition;
- “Siege me” CTA.

Examples:
- “FieldCanvas has held the throne for 7h 42m.”
- “Only 18 Core left. Finish them.”
- “I took the throne.”
- “I survived 231 shots.”

## 42.3 Share URLs

Canonical homepage plus optional tracking parameters.

No per-user invite logic required initially.

---

# 43. Notifications

Initial channels:
- email where available;
- in-app live notifications.

Ruler:
- castle under siege;
- Core threshold;
- dethroned.

Attacker:
- turn ready;
- fortress near collapse if they contributed materially;
- conquest result.

Defender:
- placed defense destroyed;
- defense contribution rank.

Rate-limit aggressively.

---

# 44. Analytics

## 44.1 Product funnel

Track:
- page view;
- game loaded;
- Attack opened;
- Practice used;
- attack checkout opened;
- attack payment succeeded;
- entitlement created;
- queued;
- turn started;
- shot fired;
- turn completed;
- Defend opened;
- defense checkout success;
- defense placed;
- share clicked;
- outbound ruler CTA clicked.

## 44.2 Game metrics

- damage per shot;
- hit rate;
- Core hit rate;
- structure hit rate;
- Power Orb hit rate;
- Breaker Shot frequency;
- shield lifetime;
- brace effectiveness;
- Core damage velocity;
- reign duration;
- attack turns per reign;
- defenses per reign;
- attacker/defender ratio;
- repeat payer rate;
- queue wait;
- queue abandonment.

## 44.3 Economy metrics

- attack gross per reign;
- defense gross per reign;
- gross revenue per visitor;
- gross revenue per payer;
- processor fees;
- refund/chargeback rate;
- defense price tier reached;
- revenue concentration by payer.

## 44.4 Virality

- ruler shares;
- attacker shares;
- defender shares;
- share-to-visit conversion;
- visit-to-payer conversion from share.

---

# 45. Balance Guardrails

The product is failing if:

- richest player almost always wins;
- defenders can keep Core alive forever;
- novice has effectively zero chance to matter;
- expert always hits Core perfectly;
- Power Orb is always optimal;
- Power Orb is never optimal;
- queue becomes longer than willingness to wait;
- defense spending dwarfs attack spending and stagnates world;
- final-hit frustration overwhelms contribution recognition;
- most paid shots feel visually meaningless.

## 45.1 Offline balance simulator

Build a non-UI simulator for:
- novice/average/expert aim distributions;
- attack volume;
- defense volume;
- defense price ladder;
- Core survival;
- expected reign length;
- revenue distribution.

Use it before tuning by feel.

---

# 46. Failure and Recovery

## 46.1 Payment succeeds but client closes

Webhook creates entitlement.

Player recovers later.

## 46.2 Client returns before webhook

Show confirming state.

Do not grant provisional shots.

## 46.3 Client disconnects while queued

Entitlement remains.

## 46.4 Client disconnects during active turn

Short reconnect grace.

Recommended:
- 30 seconds.

If not restored:
- end lease;
- unconsumed shots return to AVAILABLE entitlement;
- already resolved shots remain consumed.

## 46.5 Server errors during shot before commit

Shot not consumed unless authoritative transaction committed.

Client retries with same idempotency key.

## 46.6 Server commits but response lost

Retry returns committed result by shot ID.

## 46.7 Realtime event lost

Client detects version gap and refetches snapshot.

## 46.8 WebGL context lost

Pause interaction.

Restore renderer and canonical snapshot.

Do not consume shot due only to renderer loss.

---

# 47. Security

## 47.1 Secrets

Never expose:
- Supabase secret/service role;
- Dodo secret;
- webhook signing secret.

## 47.2 Supabase keys

Frontend uses current publishable/public key scheme supported at implementation time.

Do not put server secrets in `NEXT_PUBLIC_*`.

## 47.3 RLS

If any table is exposed to Data API:
- enable RLS;
- explicit policies;
- no `TO authenticated` without actual ownership/intent where relevant.

Authoritative game tables should preferably be server-only.

## 47.4 Views

If exposed Postgres views are used:
- use security-invoker behavior where supported;
- otherwise protect/revoke appropriately.

## 47.5 Uploads

Normalize all images.

## 47.6 URLs

HTTPS only initially.

---

# 48. Operator/Admin Surface

Not part of public homepage.

Operator must be able to:

- inspect current reign;
- pause attacks;
- pause defenses;
- end stuck active turn;
- revoke unused entitlement;
- inspect payment/webhook state;
- moderate/remove public identity;
- disable outbound link;
- seed/replace ruler in emergency;
- archive corrupted reign;
- regenerate canonical world snapshot;
- inspect event log;
- inspect version drift;
- change game config;
- see FPS/client-error aggregates;
- see chargebacks/refunds.

All admin actions generate audit events.

---

# 49. Configuration

Keep tunable game constants server-controlled.

Example:

```ts
type GameConfig = {
  attackPackPriceMinor: number;
  attackPackShots: number;
  aimTimeoutMs: number;
  turnClaimTimeoutMs: number;
  reconnectGraceMs: number;
  coreMaxIntegrity: number;
  siegeChargeMax: number;
  powerOrbCharge: number;
  royalGuardMax: number;
  royalGuardPerDefense: number;
  shieldHp: number;
  shieldMaxHits: number;
  braceReductionPct: number;
  defensePriceTiersMinor: number[];
  coronationTimeoutMs: number;
  breakerStructureMultiplier: number;
  breakerShieldPenetrationPct: number;
};
```

Config changes:
- versioned;
- apply to future turns/reigns according to policy;
- never silently alter an in-flight shot.

---

# 50. Event Schemas

## 50.1 SHOT_RESOLVED

```ts
type ShotResolvedEvent = {
  type: "SHOT_RESOLVED";
  eventId: string;
  reignId: string;
  worldVersion: number;
  actorPlayerId: string;
  turnId: string;
  shotId: string;
  projectileType: "STONE" | "BREAKER";
  impactSummaries: Array<{
    targetType: "SHIELD" | "STRUCTURE" | "CORE" | "POWER_ORB" | "TERRAIN";
    targetId: string;
    damage: number;
    destroyed?: boolean;
  }>;
  coreIntegrityAfter: number;
  siegeChargeAfter: number;
  victory: boolean;
  occurredAt: string;
};
```

## 50.2 DEFENSE_PLACED

```ts
type DefensePlacedEvent = {
  type: "DEFENSE_PLACED";
  eventId: string;
  reignId: string;
  worldVersion: number;
  actorPlayerId: string;
  placementId: string;
  defenseType: "SHIELD" | "BRACE";
  slotId: string;
  royalGuardAfter: number;
  nextDefensePriceTier: number;
};
```

## 50.3 REIGN_DEFEATED

```ts
type ReignDefeatedEvent = {
  type: "REIGN_DEFEATED";
  eventId: string;
  reignId: string;
  worldVersion: number;
  conquerorPlayerId: string;
  finalShotId: string;
  durationMs: number;
  siegeMvpPlayerId?: string;
  royalGuardMvpPlayerId?: string;
};
```

---

# 51. Public Snapshot API

Conceptual endpoint:

`GET /api/world`

Returns sanitized:

```ts
type PublicWorldSnapshot = {
  worldVersion: number;
  phase: "CORONATION" | "ACTIVE";
  reign: {
    id: string;
    ordinal: number;
    startedAt: string;
    coreIntegrity: number;
    coreMaxIntegrity: number;
    siegeCharge: number;
    royalGuardCharge: number;
    nextDefensePriceMinor: number;
  };
  ruler: PublicIdentityView;
  components: PublicComponentState[];
  defenses: PublicDefenseState[];
  activeTurn?: PublicActiveTurn;
  queueSummary: {
    length: number;
  };
};
```

Do not expose:
- payment identifiers;
- emails;
- internal fraud signals;
- hidden moderation state;
- service-role fields.

---

# 52. Suggested API Surface

Public/server routes conceptually:

- `GET /api/world`
- `GET /api/history`
- `GET /api/reigns/:id`
- `POST /api/payments/attack-checkout`
- `POST /api/payments/defense-checkout`
- `POST /api/webhooks/dodo`
- `POST /api/attack/queue`
- `POST /api/attack/claim-turn`
- `POST /api/attack/shot`
- `POST /api/attack/release-turn`
- `POST /api/defense/place`
- `POST /api/coronation/publish`
- `POST /api/identity/logo-upload-url`
- `POST /api/report`

Exact method names may change, but responsibilities should remain separated.

---

# 53. Implementation Sequence

This is a build sequence, not a deliberately crippled “MVP”.

## Sequence 1 — Deterministic local game core

Build:
- procedural fortress;
- semantic component graph;
- Rapier colliders;
- launcher;
- drag/release input;
- projectile simulation;
- structure damage;
- Core damage;
- collapse presentation;
- mobile camera;
- practice mode.

Acceptance:
- fun locally before payments.

## Sequence 2 — Authoritative persistent state

Build:
- Supabase schema;
- singleton reign;
- server shot simulation;
- versioned commit;
- event log;
- world snapshot;
- realtime Broadcast.

Acceptance:
- two browsers see same state;
- one browser damages wall;
- second browser loads damaged wall.

## Sequence 3 — Attack economy

Build:
- Dodo attack checkout;
- webhook;
- entitlement;
- queue;
- active turn;
- 3-shot consumption;
- reconnect/idempotency.

Acceptance:
- payment creates exact paid rights;
- no client can mint shots.

## Sequence 4 — Conquest and coronation

Build:
- Core zero;
- atomic succession;
- archive;
- new reign generation;
- public identity setup;
- ruler visual branding.

Acceptance:
- decisive attacker becomes ruler without race.

## Sequence 5 — Defense economy

Build:
- dynamic defense price tier;
- Shield;
- Brace;
- defense entitlement;
- synchronized placement;
- Royal Guard.

Acceptance:
- defense delays but cannot heal Core.

## Sequence 6 — Shared attacker objective

Build:
- Power Orb;
- Siege Charge;
- Breaker Shot.

Acceptance:
- prior attacker contribution can benefit later attack;
- no direct cash nuke.

## Sequence 7 — Social/history/polish

Build:
- share cards;
- notifications;
- history;
- Hall of Fame;
- moderation;
- operator panel;
- analytics;
- performance adaptation;
- VFX/audio polish.

---

# 54. Test Plan

## 54.1 Unit

Test:
- price tier progression;
- damage calculations;
- Core cannot heal;
- brace reduction;
- shield depletion;
- Siege Charge;
- Royal Guard;
- entitlement decrement;
- victory selection;
- contribution scoring;
- generator determinism;
- world hash determinism.

## 54.2 Property tests

Properties:
- Core never exceeds max;
- Core never increases during active reign;
- shotsRemaining never negative;
- one active turn maximum;
- stateVersion monotonically increases;
- no two reigns active;
- no two conquerors for one reign;
- defense placement cannot occupy invalid slot;
- same simulation input/state -> same authoritative result.

## 54.3 Integration

- Dodo webhook idempotency;
- duplicate webhook;
- payment success + closed browser;
- shot retry after network loss;
- commit response loss;
- world-version conflict;
- queue disconnect;
- reconnect;
- conquest race;
- defense placement vs active shot.

## 54.4 Multiplayer E2E

At least:
1. browser A watches;
2. browser B pays/gets mocked entitlement;
3. B shoots;
4. A sees event;
5. refresh A;
6. damage persists.

Defense:
1. C places shield;
2. A sees shield;
3. B hits shield;
4. all clients see shield damage.

Conquest:
1. Core low;
2. B fires;
3. Core reaches zero;
4. B becomes ruler;
5. C cannot fire old-state shot;
6. new reign appears.

## 54.5 Mobile E2E

Test:
- iPhone Safari-class viewport;
- Android Chrome-class viewport;
- portrait;
- landscape;
- pointer cancel;
- background/resume;
- checkout return;
- WebGL context loss where testable.

## 54.6 Performance test

Automated or scripted:
- repeated collapse cycles;
- 100+ sequential events;
- long session;
- memory snapshots;
- FPS sampling;
- realtime reconnect.

---

# 55. Acceptance Criteria

The product is ready for public paid operation only when all of the following are true.

## 55.1 Comprehension

A new visitor can identify:
- who rules;
- fortress condition;
- Attack;
- Defend;
- cost;

without opening documentation.

## 55.2 Live surface

- world dominates screen;
- no dense dashboard by default;
- no permanent Hall of Fame;
- no permanent event feed;
- no persistent multi-panel sidebar.

## 55.3 Attack

- paid entitlement only from verified payment;
- three shots;
- same mobile/desktop control grammar;
- server calculates outcome;
- client cannot forge damage.

## 55.4 Persistence

- damage survives reload;
- damage appears in another client;
- destroyed component remains destroyed until reign ends.

## 55.5 Defense

- paid defense is an actual placement;
- no Core healing;
- defense price escalates;
- defenses are finite.

## 55.6 Collaboration

- Power Orb can advance global attacker charge;
- defender action advances Royal Guard;
- shared meter results are visible.

## 55.7 Victory

- only authoritative Core zero ends reign;
- one conqueror;
- atomic transition;
- prior contributions archived;
- new fortress generated.

## 55.8 Identity

- conqueror can publish public identity;
- domain visible;
- CTA constrained;
- unsafe identity can be moderated;
- identity locked for reign.

## 55.9 Payments

- webhook idempotent;
- closed-client payment recoverable;
- unused entitlement recoverable;
- retries do not duplicate rights.

## 55.10 Performance

- acceptable mobile gameplay;
- no unbounded dynamic bodies;
- no long-term debris leak;
- renderer can recover/refetch state.

## 55.11 Security

- no service secret in client;
- no arbitrary client broadcast changing world;
- no arbitrary HTML/JS public identity;
- uploads normalized;
- URL checked.

## 55.12 Provider/business

- exact final mechanic acknowledged by payment provider before public launch.

---

# 56. Procedural-Only Decision

## 56.1 Can the product launch without Kenney?

**Yes.**

The first production world should be intentionally designed to do so.

## 56.2 Why this is not merely a compromise

Procedural-first is architecturally aligned with:

- persistent semantic state;
- stable IDs;
- damage stages;
- deterministic reconstruction;
- mobile LOD;
- configurable fortification;
- dynamic ruler branding;
- small download size.

## 56.3 What must be designed well

Procedural-first fails if it means “boxes with default materials”.

We need a coded art system:

- proportions;
- silhouette;
- bevels;
- palette;
- material response;
- lighting;
- damage grammar;
- particles;
- camera motion;
- animation timing.

## 56.4 Escape hatch

The renderer/world definition must permit optional authored assets later.

A component definition may eventually support:

```ts
renderSource:
  | { kind: "PROCEDURAL"; generator: string; params: ... }
  | { kind: "ASSET"; assetId: string; params: ... }
```

Authoritative collision/gameplay remains semantic and does not depend on the external render asset.

---

# 57. Evolution Paths — Explicitly Later

Only after the one-world siege is working and monetizing:

- richer observer/details view similar to dense concept boards;
- user-arranged limited fortress layout;
- new projectile sidegrades;
- more secondary targets;
- themed worlds;
- seasonal historical competitions;
- creator/brand seeded battles;
- Dunk Tank booth;
- Can Knockdown;
- Ring Toss;
- Internet Fair of multiple scarce status booths.

Do not implement these simply because the architecture can support them.

---

# 58. Risks

## 58.1 Fun risk
The product may be economically clever but not fun to shoot.

Mitigation:
- build local physics/feel first;
- tune camera, impact, VFX, audio.

## 58.2 Cold-start
Empty audience means little spectator value.

Mitigation:
- one world;
- seed initial ruler;
- ruler share loop;
- under-siege CTA;
- visible activity.

## 58.3 Pay-to-win perception
More attempts still correlate with spend.

Mitigation:
- fixed per-shot power;
- no paid weapon tiers;
- skill matters;
- free practice;
- contribution recognition;
- irreversible Core.

## 58.4 Whale defense
Supporters may spend heavily.

Mitigation:
- global escalating defense price;
- no Core heal;
- finite shield/brace;
- attack price remains stable.

## 58.5 Kill-steal frustration
Final hitter gets throne.

Mitigation:
- Siege MVP prominent;
- contribution archive;
- attacker share/status.

## 58.6 Procedural polish
Could look cheap.

Mitigation:
- art grammar;
- limited scene;
- strong materials/VFX;
- reference visuals;
- optional asset escape hatch.

## 58.7 Server simulation cost
Authoritative Rapier per shot has compute cost.

Mitigation:
- small collider set;
- one active turn;
- fixed short simulation;
- simplified colliders;
- profile server route.

## 58.8 Realtime scale
Large spectator audience can increase message cost.

Mitigation:
- Broadcast;
- compact messages;
- no per-frame network sync;
- clients animate locally from events;
- snapshot on gap.

## 58.9 Abuse
Public identity can become scam surface.

Mitigation:
- constrained fields;
- visible domain;
- URL safety;
- moderation;
- no arbitrary code.

## 58.10 Payment disputes
Consumed digital attempts can be disputed.

Mitigation:
- clear terms;
- payment/event ledger;
- exact timestamps;
- idempotency;
- risk controls;
- provider consultation.

---

# 59. Open Items That Remain Outside This Spec

These are intentionally not architecture blockers:

1. Trademark clearance if desired before broader commercial promotion.
2. Final Dodo written approval for exact live mechanic.
3. Exact art palette/visual identity.
4. Exact tuned HP/damage constants after playtesting.
5. Final chargeback/refund policy wording.
6. Selected URL reputation provider.
7. Selected moderation provider.
8. Whether early public launch uses operator-seeded ruler or a special public first-claim event.

Everything else required to begin implementation is specified above.

---

# Appendix A — Recommended First World Layout

Conceptual:

```text
                 [ FLAG ]            [ FLAG ]

             ┌────────────── CORE TOWER ───────────────┐
             │                  CORE                    │
             └──────────────────────────────────────────┘

        [ LEFT TOWER ]     [ FRONT WALL ]      [ RIGHT TOWER ]

                [ SHIELD SLOT ] [ SHIELD SLOT ]

                   [ GATE / CORE APPROACH ]

---------------------------------------------------------------
                 destructible fortress platform
---------------------------------------------------------------

             Power Orb path / secondary target zone


      ATTACKER LAUNCHER / CAMERA IN FOREGROUND
```

The scene should be compact enough that:
- weak points are readable;
- Core can become visibly exposed;
- mobile camera can frame all important gameplay.

---

# Appendix B — Ruler Public Surface Example

```text
[logo] FIELDCANVAS
Product
fieldcanvas.ai

Spatial planning without the CAD headache.

[ VISIT ]

Reigning 07h 42m
231 shots survived
```

In the live HUD, show only a compact subset.

The rest belongs in ruler details.

---

# Appendix C — First Defense Slots

Suggested fixed slots:

```text
shield_slot:core_front
shield_slot:left_approach
shield_slot:right_approach

brace_slot:front_left
brace_slot:front_center
brace_slot:front_right
brace_slot:left_tower
brace_slot:right_tower
```

Server determines eligibility from current state.

---

# Appendix D — Recommended State Invariants

1. `active_reigns == 1`
2. `active_attack_turns <= 1`
3. `core_integrity >= 0`
4. During ACTIVE reign, `core_integrity_next <= core_integrity_prev`
5. `state_version` strictly increases on authoritative world mutation.
6. `shots_remaining >= 0`
7. A payment creates at most one entitlement for one purchase kind.
8. An entitlement is consumed at most once per action.
9. One defense slot has at most one active placement.
10. A destroyed component cannot receive a brace.
11. A conquered reign cannot accept new shot commits.
12. One reign has exactly one conqueror once defeated.
13. Public identity displayed for archive is immutable after reign archive.

---

# Appendix E — Current External Technical Assumptions

The implementation should re-verify current documentation before coding.

- Three.js supports primitives, BufferGeometry, ExtrudeGeometry, instancing, CanvasTexture, WebGL/WebGPU render paths, and the geometry/material building blocks needed for a procedural world.
- Rapier JavaScript supports primitive, convex, triangle-mesh, heightfield, and compound collider approaches; triangle meshes are more appropriate for fixed environment than dynamic non-convex bodies.
- Supabase Realtime Broadcast is currently recommended by Supabase for scalable/security-conscious fan-out compared with Postgres Changes for large subscriber counts.
- Supabase current guidance favors new publishable/secret key conventions over older anon/service naming where available; implementation must use the current project’s key model.
- Dodo currently demonstrates redirect, overlay, inline, one-time, and credit-style checkout patterns, but exact production API contracts and merchant approval must be verified at implementation time.

---

# Appendix F — Reference Visual Interpretation

The generated visual boards are **not pixel targets for the live game unless a later screen-specific design explicitly says so**. Most are concept art, mechanics references, or systems boards.

Use them as follows:

### Dense persistent siege board
Use for:
- mechanics inventory;
- observer/history inspiration;
- visual language only.

Do not reproduce as homepage.

### Single-page product board
Use for:
- conceptual flow;
- mobile/desktop relationship.

But simplify live UI substantially.

### Gameplay / Roles / Economy board
Use for:
- mechanic definitions;
- terminology;
- balancing concepts.

Not product layout.

### Architecture board
Use for:
- engineering discussion only.

### Public Identity / Coronation board
Use for:
- field set;
- surface propagation;
- moderation concepts.

Live coronation UI should be much simpler than the board.

The primary implementation visual contract is:

> **World first. Ruler + Core + Attack + Defend. Everything else appears only when context requires it.**
