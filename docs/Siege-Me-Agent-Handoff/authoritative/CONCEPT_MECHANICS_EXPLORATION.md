# Persistent Public Siege Game — Concept, Mechanics & Economics Exploration

# Purpose and status

This document captures the complete concept exploration before product specification. It is intentionally broader than the eventual build spec. Items are tagged as KEEP, EXPLORE, LATER, PARK, REJECT, or OPEN so brainstorming does not silently become a requirement.

# Working name and domain (provisional)

# 

# Current preferred working name: Siege Me. Preferred domain candidate: siegeme.com. The name is intentionally provisional until registration/trademark checks are completed; architecture, schemas, and internal identifiers should not hard-code the marketing name. "Rule or ruin." is a candidate tagline, not the canonical product name.

# 

# Current working thesis

There is one globally shared public throne/fortress. One public identity rules it and receives the primary public identity surface: display name, identity type, avatar/logo, message, destination link/domain, CTA, reign stats, and visible castle. Everyone else can choose to ATTACK or DEFEND. Payments buy finite opportunities/resources; skill and strategic use determine their effectiveness. The battlefield is persistent: structural damage, placed defenses, siege progress, and reign history survive across visitors. The ruler remains in power until physically dethroned. There is no external product or cash prize required; the throne, traffic, status, history, and shared spectacle are the reward.

# Core design principle

Money buys agency. Skill determines efficiency. Collaboration changes the battlefield. Persistent irreversible damage guarantees eventual turnover.

# Confirmed product identity

# 

# Product name: Siege Me

# Registered domain: siegeme.com

# Status: domain purchased and product name accepted for implementation. Trademark review remains a separate legal check. Core game/domain primitives should still use neutral internal names where practical rather than coupling schema/event architecture to marketing copy.

# 

# Current external references and adjacent wave

# 

# These products are references for mechanics, interaction patterns, visual framing, or market behavior. They are not templates to copy and should not silently become requirements.

# 

# SiliconCity.lol — VERIFIED CURRENT REFERENCE. An interactive isometric city map where businesses purchase a digital plot, generate a branded building, and link to their site. Public pricing currently segments spatial prominence from Outskirts ($29) through Uptown ($79), Midtown ($399), Downtown ($999), and one Ultimate landmark plot ($1,000,000). The creator describes using a fixed isometric template after inconsistent AI-generated building styles made the city visually incoherent. Relevant lessons for Siege Me: the world itself can be the product/status surface; visual ownership should be legible without opening a profile; strict shared art grammar matters more than per-owner visual freedom; public identity can appear physically in the world; spatial prominence can carry intuitive status value; keep the main canvas visually dominant rather than surrounding it with a dashboard. Do not copy its plot-sale economy or AI-building generation directly.

# 

# Outbid-style boards and the current derivative wave — MARKET CONTEXT. Numerous current products are remixing paid public ranking, territorial ownership, maps, niche leaderboards, and other scarce internet surfaces. Useful lesson: the durable primitive is not “a leaderboard clone” but a scarce public object that visibly changes when somebody pays/acts. Siege Me should differentiate through skill, persistent physical world state, collaborative attack/defense, and succession rather than price-only ranking.

# 

# Topfloor.company — PENDING DIRECT INSPECTION. The domain was supplied as a current reference but is not presently resolving/indexing through the available inspection tools. Keep it on the watchlist and do not infer mechanics/design from the name alone. Once directly inspectable, evaluate: core mechanic; payment model; public-status object; visual hierarchy; interaction density; mobile behavior; social/share loop; and any useful anti-patterns.

# 

# Reference-evaluation rule: for any new viral/simple paid internet product, record what the user pays for, what visibly changes, why spectators care, why participants share, what resets or persists, whether skill/attention/money determines status, and what part of the visual design makes the mechanic understandable in five seconds.

# 

# 1\. Concept evolution

| Stage | Concept | Core mechanic | Why it mattered | Current status |  
|---|---|---|---|---|  
| 1 | Own Today | One public page for the current day; pay more than incumbent to control it until midnight | Introduced one scarce public internet surface, visible ownership, archives, and payment-native competition | PARK as separate product |  
| 2 | Play the Price | Buy at full price or play to earn lower prices; optionally risk an earned discount for a better one | Introduced skill, risk/reward, and commerce rather than pure bidding | PARK |  
| 3 | Beat the Maker / Boss | Beat seller/founder score for free/discounted product; alternatively take the throne for bragging rights | Introduced status as an alternative to economic reward | PARK |  
| 4 | Prize or Throne | Winner chooses free reward or sacrifices/delays it to become the person everyone must beat | Strengthened status and identity transition | PARK |  
| 5 | Digital Dunk Tank | Pay for a small number of throws; hit the target and dunk current occupant; winner takes seat | First self-contained carnival game with no external product dependency | KEEP as simpler alternate |  
| 6 | Castle Siege / Knock the King | Pay for projectile opportunities; attack a physical fortress; knock current ruler from throne | Added richer physics, tactical weak points, spectacle, and persistent structure | PRIMARY |  
| 7 | Persistent Siege Economy | Damage persists; king can reinforce; supporters defend; attackers collaborate; both sides alter one shared world | Converts a gimmick into a persistent public multiplayer economy | PRIMARY |

# 2\. Product primitive

| Dimension | Working direction |  
|---|---|  
| Scarce object | One global throne / fortress |  
| Owner reward | Public identity, URL, message, reign status, historical record, fame |  
| Challenger action | Pay for finite attack opportunities and physically attack the shared fortress |  
| Defender action | Pay for finite defensive resources and place/deploy them into the shared fortress |  
| Victory | Current ruler is physically dethroned / core integrity reaches defeat condition |  
| Succession | Player delivering the decisive legitimate defeat becomes next ruler |  
| Persistence | Damage, destroyed components, defenses, side progress, and reign history persist |  
| Reset | No arbitrary daily reset initially; reign continues until defeat |  
| External prize | None required |  
| Cash payout | REJECT |  
| Randomized winner | REJECT; paid outcomes should be skill/state based |  
| Pageviews as combat power | REJECT; pageviews contribute fame only |  
| Money directly equals damage | REJECT |  
| Money buys opportunities/resources | KEEP |

# 3\. Roles

| Role | Pays? | Main interactions | Objective | Status/reward |  
|---|---|---|---|---|  
| Ruler / King | Optional after taking throne | Watch siege, reinforce within limits, deploy defenses, call supporters | Stay in power | Primary page identity, reign time, survival stats, archive |  
| Attacker | Yes for paid attack packs | Aim, fire, target weak points, hit mana/power targets, contribute persistent damage | Dethrone ruler | Conqueror, Siege MVP, damage stats, historical contribution |  
| Defender / Supporter | Yes for defensive packs | Place shields, braces, barricades, decoys, activate defenses | Preserve current ruler | Royal Guard status, absorbed/prevented damage, historical contribution |  
| Spectator | No | Watch live attacks, inspect state/history, share | Entertainment / choose side | Fame/traffic contribution only |  
| Initial claimant | Free or low-cost, OPEN | Occupy empty throne and seed first battle | Create initial target/content | Becomes first ruler |

# 4\. Main gameplay loop

| Step | Event |  
|---|---|  
| 1 | Visitor lands on one shared live battlefield and immediately sees ruler, fortress condition, reign, attack/defend pressure, and current activity |  
| 2 | Visitor chooses ATTACK, DEFEND, or WATCH |  
| 3 | ATTACK or DEFEND opens Dodo payment for a fixed pack/resource |  
| 4 | Successful payment creates server-authorized gameplay resources; no client can mint its own shots/defenses |  
| 5 | Attacker enters active-turn queue or defender receives a placement/deployment action |  
| 6 | Attack uses actual browser physics: aim, power, timing, trajectory, collision, structural consequences |  
| 7 | Defense changes the same canonical world: shield, brace, barricade, decoy, field, etc. |  
| 8 | Server validates and applies state transition atomically |  
| 9 | Result is broadcast to all spectators/players in realtime |  
| 10 | Persistent world remains altered for the next person |  
| 11 | If ruler is defeated, decisive attacker becomes new ruler and a new reign begins |  
| 12 | Previous reign is archived with conqueror, MVPs, spend/activity, duration, survival, and major events |

# 5\. Shared-world persistence

The strongest differentiator is that players do not enter isolated copies. Everyone changes the same canonical object.

| Persistent element | Example |  
|---|---|  
| Structural damage | Sarah cracks the western tower; the crack/damage remains for later visitors |  
| Destroyed components | Rohan removes a support; the missing support stays missing |  
| Defensive placement | Alex buys and places a brace; everyone sees it until destroyed/expired |  
| Shields | A defender adds a shield over the throne; later attackers must remove/bypass it |  
| Siege progress | Attackers collectively fill a siege/mana meter |  
| Royal Guard progress | Defenders collectively fill a defensive meter |  
| Reign stats | Every attack, defense, visitor, survival, and contribution accumulates |  
| Historical provenance | Important structures can later show who built, reinforced, damaged, or destroyed them |

Implementation rule: persist semantic state, not every debris transform. Store component health/state and reconstruct rubble/visual damage on load.

# 6\. Combat durability model

Use separate durability layers so the ruler can defend without being able to buy infinite healing.

| Layer | Meaning | Can recover during reign? | Typical source |  
|---|---|---|---|  
| Core Integrity | Irreversible health of the reign/throne | NO | Initial fortification only |  
| Armor / Structure | Physical walls, braces, components | Limited | Initial setup \+ capped reinforcements |  
| Shield | Temporary protection over structure/core | YES within rules | Ruler/supporters |  
| Temporary buffs | Time/shot-limited mitigation or decoys | YES | Gameplay/support meter |

Attack resolution generally flows Shield \-\> Armor/Structure \-\> Core Integrity, but weapon/weak-point mechanics may bypass or alter this.

Critical rule: Core Integrity never heals during the same reign. Every reign therefore trends toward eventual defeat even if the ruler spends heavily.

# 7\. Fortification and ruler spending

Money may influence initial fortification, but with hard diminishing returns.

| Example initial spend | Illustrative resilience | Visual expression |  
|---:|---:|---|  
| $1 | 100 | Bare wooden throne/platform |  
| $3 | 135 | Braced platform |  
| $5 | 165 | Stone supports/wall |  
| $10 | 205 | Fortified tower |  
| $25 | 255 | Stronghold |  
| $50+ | \~300 | Imposing citadel, strongly diminishing returns |

Numbers are placeholders for balancing, not requirements.

Ruler may return while alive and buy reinforcement/shields, but:  
\- Core Integrity cannot be restored.  
\- Reinforcement has a cap and/or escalating cost.  
\- Defensive spend buys finite defensive agency, not invulnerability.  
\- After a successful takeover, the new ruler gets a short coronation setup window.  
\- Whether the winner's attack spend becomes initial fortification is EXPLORE.

Illustrative escalating reinforcement cost:  
$2 \-\> $3 \-\> $5 \-\> $8 \-\> $13 \-\> $21 \-\> $34 during a single reign, then reset for the next ruler.

# 8\. Attack economy

| Economic mechanic | Direction |  
|---|---|  
| Pay per attack opportunity/pack | KEEP |  
| $1 raw micropayment for every shot | Likely inefficient because fixed processor fees matter |  
| Example pack | 3 attacks for $3; 6 for $5; 15 for $10, subject to balancing |  
| Money directly adds damage | REJECT |  
| Bigger payment automatically grants overpowering weapon | REJECT |  
| Sidegrade weapon/loadout choices | KEEP |  
| Earn powerful weapons through play/mana | KEEP |  
| More money buys more attempts | KEEP, with anti-whale balancing |  
| Dynamic checkout price every minute | Prefer to avoid |  
| Fixed pack price with dynamic bonus/value | EXPLORE |  
| Queue | One active attacker at a time when concurrency exists; others watch/wait |

# 9\. Attack gameplay

Primary control should be immediately understandable on mouse and touch.

| Mechanic | Direction |  
|---|---|  
| Aim | Drag/pull trajectory control |  
| Power | Pull distance / gesture determines force |  
| Release | Pointer/touch release fires |  
| Physics | Real projectile collision and structural response |  
| Weak points | Supports, exposed components, shield generators, etc. |  
| Secondary targets | Mana orb, flying target, explosive barrel, repair unit, supply wagon |  
| Tactical choice | Spend a limited shot on direct damage or on a secondary objective that improves later shots |  
| Weapon examples | Cannonball, heavy ball, scatter shot, spear/penetrator, sticky explosive, bouncer, earned meteor/trebuchet |  
| Randomness | Round/world seeds may vary target patterns, but paid hit/miss should not be arbitrary RNG |  
| Skill | Aim, timing, power, weak-point selection, resource strategy |

# 10\. Shared attacker collaboration

Attackers can work toward global siege objectives rather than only individual damage.

| Shared attacker system | Example |  
|---|---|  
| Siege mana meter | All valid attacker actions contribute |  
| Secondary target contribution | Hitting mana objects or supply units fills shared meter |  
| Team unlock | Meter completion activates trebuchet, critical window, shield-break phase, or similar |  
| Persistent pressure | Earlier attackers weaken defenses for later attackers |  
| Contribution tracking | Damage, structural destruction, shield-breaking, mana contribution |  
| Recognition | Siege MVP, Breaker, Shieldbreaker, largest single hit, etc. |

The final-hit attacker becomes ruler, but prior contributors retain visible/historical recognition to reduce kill-steal frustration.

# 11\. Defender/supporter gameplay

Support must also be gameplay, not "pay $3 and a number increases."

| Defensive action | Interaction |  
|---|---|  
| Shield wall | Buy/earn a shield and place it into a valid defensive slot |  
| Reinforcement brace | Place structural support under a weakened area |  
| Barricade | Add a finite physical obstacle |  
| Decoy | Redirect/complicate a limited number of shots |  
| Repair drone | Repairs only eligible armor/structure, never Core Integrity |  
| Anti-projectile field | Shot-limited or time-limited mitigation |  
| Defensive target/guard | Create a secondary obstacle attackers may choose to destroy |

Placement should be constrained to server-approved slots/zones so defenders cannot create impossible geometry or block all gameplay.

# 12\. Shared defender collaboration

| Shared defender system | Example |  
|---|---|  
| Royal Guard meter | Defender contributions fill a shared meter |  
| Team unlock | Temporary royal shield, reinforced brace, defensive volley, decoy wave |  
| Visible defender identity | Banners, shield crests, small guards, names on placed defenses |  
| Recognition | Royal Guard MVP, most damage absorbed, longest-supporting defender |  
| Social call-to-action | Ruler can share "They are destroying my castle. Help defend me." |

# 13\. Attack vs Defend fork

The primary monetization surface can be two large actions:

ATTACK THE KING  
3 attacks · example $3

DEFEND THE KING  
1 defensive resource · example $3

The page can also show public pressure:  
\- Attack spend / activity  
\- Defense spend / activity  
\- Attacker vs defender participation  
\- Siege momentum  
\- Current live action

This creates two distribution loops:  
\- Attackers recruit others to finish the ruler.  
\- Ruler/defenders recruit others to hold the fortress.

# 14\. Fame, spectatorship, and traffic

| Mechanic | Direction |  
|---|---|  
| Visitors increase combat HP | REJECT due botting and follower-size imbalance |  
| Visitors increase fame/status | KEEP |  
| Live attack viewing | KEEP |  
| Current attacker indicator | KEEP |  
| Attacker queue | KEEP when traffic exists |  
| Event feed | KEEP |  
| Shareable reign cards | KEEP |  
| Under-siege notifications | KEEP |  
| Dethroned notifications | KEEP |  
| Call supporters | KEEP |  
| Hall of Fame | KEEP |  
| Reign archive | KEEP |  
| Daily reset | REJECT for primary mode |  
| Weekly/monthly seasons/stat leaderboards | LATER |

Illustrative public ruler stats:  
\- Reign duration  
\- Spectators  
\- Attackers survived  
\- Projectiles survived  
\- Damage survived  
\- Defenders  
\- Total siege activity/spend  
\- Longest survival streak  
\- Historical throne count

# 15\. Ownership, victory, and recognition

| Outcome/title | Meaning |  
|---|---|  
| Conqueror | Delivered decisive valid defeat and takes throne |  
| Siege MVP | Highest meaningful attack contribution in the reign |  
| Breaker | Destroyed most structural components |  
| Shieldbreaker | Removed most defensive shielding |  
| Royal Guard MVP | Strongest defensive contribution |  
| Longest Reign | Historical status |  
| Most Attacks Survived | Historical status |  
| Fastest Dethroning | Historical status |  
| Most Contested Reign | Historical status |

No cash payout is required. Status and permanent history are the reward.

## 15.1 Public throne identity and coronation contract

The throne belongs to a public identity, not necessarily a human player. A ruler may represent a person, company, product/app/site, project/open-source project, creator, community, campaign/event, or another moderated identity. This keeps the throne useful to founders, companies, products, creators, communities, and individuals without turning the product into a conventional ad marketplace.

Working submission contract:  
| Field | Direction | Notes |  
|---|---|---|  
| Display name | KEEP; required | Main identity shown on the throne and archive |  
| Identity type | KEEP; required | Person / Company / Product or App / Project / Creator / Community / Campaign or Event / Other |  
| Destination URL | KEEP; strongly preferred | Primary traffic/value surface; exact no-link exception is OPEN |  
| Logo or avatar | KEEP; optional but recommended | May be uploaded or suggested from site metadata |  
| One-line message | KEEP; optional | Short constrained public copy, not a miniature landing page |  
| CTA | KEEP; optional | Prefer constrained choices such as Visit, Try it, Follow, Join, Learn more, View project |  
| Social handle | KEEP; optional | Useful for attribution and sharing |

Public identity is separate from legal/payment/account identity. A founder may pay personally while placing a product on the throne; a marketer may pay while promoting a company; an individual may place themselves or a project. Internal payment/customer records must not be treated as the public display identity.

Coronation flow after conquest:  
1\. Winner enters a short protected coronation/setup window.  
2\. Winner chooses or pastes the public identity they want to rule.  
3\. Pasting a URL may EXPLORE auto-suggesting display name, favicon/OG image, domain, and description metadata; user confirms/edits before publication.  
4\. Winner chooses logo/avatar, one-line message, and constrained CTA.  
5\. Public destination domain remains visibly shown near the CTA.  
6\. New identity propagates to throne/banner, castle flags/crest, HUD, archive, and share-card surfaces where appropriate.

The ruler gets the richest identity surface. Attackers and defenders should have substantially lighter identity requirements, initially display name plus optional avatar/link, so firing or defending does not require configuring a mini profile.

Identity safety and verification:  
\- No arbitrary HTML, JavaScript, iframe, form, or redirect control by the ruler.  
\- CTA copy should be constrained to reduce deceptive actions such as fake account verification/download prompts.  
\- Destination URLs require link reputation/phishing checks and moderation rules.  
\- Claimed identity and verified identity should be distinct concepts.  
\- Domain/brand verification is LATER/EXPLORE; potential methods include email-on-domain, DNS TXT, or site meta/file verification.  
\- A verified badge should indicate control of the destination identity/domain, not endorsement by the platform.  
\- Famous-brand impersonation and misleading logo/name/domain combinations require moderation even before a full verification system exists.

Visual identity usage is part of the reward: logo/avatar can appear on the throne banner, flags, shield/crest, HUD, historical reign card, and takeover/dethroning animation. We do not need a full 3D avatar creator.

# 

# 16\. Economic guardrails

1\. Avoid a pure wallet contest. Payment buys attempts/resources; game performance determines effectiveness.  
2\. Use diminishing returns on fortification.  
3\. Do not allow Core Integrity healing during a reign.  
4\. Escalate repeated ruler reinforcement costs and/or cap deployments.  
5\. Prefer sidegrade weapons over "pay more \= guaranteed stronger."  
6\. Powerful attacks should primarily be earned through skill/shared siege systems.  
7\. Do not tie raw pageviews to power.  
8\. Do not give ruler a share of attacker losses in the initial model.  
9\. Do not create cash/redeemable prizes in the initial model.  
10\. Server must be authoritative for paid-resource creation and outcome state.

# 17\. Dodo Payments

Known signal from the discussion: Dodo Payments publicly stated that it supports outbid.lol-type products and can approve such businesses. This materially reduces concern around paid public-status competition.

However, our final product is not identical to an outbid leaderboard. Before launch, send Dodo the exact final description: users pay for finite skill-based attack/defense gameplay whose non-cash prize is control/status of a public throne.

Working integration:  
\- Dodo one-time checkout  
\- Overlay/inline checkout to keep the experience on one page  
\- Payment/webhook creates authoritative attack/defense entitlement  
\- Payment success does not directly set damage or victory  
\- No account required before first interaction if session/email/payment identity is sufficient  
\- Payment packs should account for fixed processor fee economics

# 18\. Single-page experience

The consumer experience should remain one primary route/page.

Above-the-fold live state:  
\- Ruler public identity: display name/type, logo/avatar, visible destination domain, message and CTA  
\- Fortress and 3D battlefield  
\- Reign duration  
\- Core/armor/shield visual condition  
\- Live attacker/current action  
\- Attack vs Defend buttons  
\- Public pressure/activity

Secondary information in drawer/bottom sheet:  
\- Siege event feed  
\- Attack/defense contributors  
\- Reign stats  
\- Queue  
\- History / Hall of Fame

Avoid:  
\- SaaS navbar  
\- feature-marketing homepage  
\- mandatory signup  
\- separate dashboard for basic play  
\- multi-page checkout flow  
\- excessive corporate UI  
18.1 Primary live-screen visual contract

The actual product surface is not the dense infographic/dashboard shown in the exploration boards. Those boards are reference documents for systems and later secondary/observer surfaces.

Primary live-state target:  
\- roughly 90-95% of the perceived screen is the Three.js game world;  
\- roughly 5-10% is persistent HUD/chrome;  
\- persistent HUD shows only the current ruler/public identity, Core condition, reign duration/status, and the two primary actions ATTACK and DEFEND;  
\- Armor, Shield, Siege Mana, Royal Guard, queue, event feed, contributor tables, Hall of Fame, detailed stats, and history are contextual, transient, or placed in a drawer/bottom sheet rather than permanently visible;  
\- the world itself should communicate health/state through visible damage, missing pieces, exposed Core, shields, defenders, fire/smoke, and siege effects;  
\- attack mode becomes a focused near-fullscreen aiming state with shot count, trajectory/power feedback, and only relevant weapon/resource information;  
\- defend mode becomes a focused near-fullscreen placement state with valid defense slots/zones highlighted;  
\- spectator events use short overlays/toasts and live camera action rather than a permanently open event-feed panel;  
\- mobile uses the same visual hierarchy: fullscreen world, compact top ruler/Core HUD, bottom ATTACK/DEFEND actions, and swipe/tap-up detail sheet;  
\- there is no persistent SaaS navbar and no bottom-tab app navigation in the primary experience.

The earlier dense design may evolve into an optional Siege Details/Observer view, expanded live-analysis panel, or historical reign inspection surface later. It is explicitly not a pixel target for the launch product.

# 19\. Mobile-first interaction

| Action | Phone control | Desktop equivalent |  
|---|---|---|  
| Attack | One-thumb pull/drag to aim and set power; release to fire | Pointer drag/release |  
| Defend | Select resource, valid slots glow, tap placement | Click placement |  
| Inspect | Touch drag/pinch only if needed; keep core interaction simple | Pointer orbit/inspect |  
| Watch | Passive realtime camera with clear live action | Same |  
| Payment | Dodo mobile wallet/card overlay | Same overlay |

Do not make gyroscope the core paid control because sensors vary by device. Motion aiming can be a later optional/practice feature.

# 20\. Technology stack

| Layer | Working choice | Reason |  
|---|---|---|  
| Web app | Next.js \+ TypeScript | One application for page, APIs, payment callbacks, admin, SEO |  
| 3D | Three.js via React Three Fiber | Strong React integration and web 3D ecosystem |  
| 3D helpers | @react-three/drei | Cameras/loaders/utilities |  
| Physics | Rapier 3D / @react-three/rapier | Browser/WASM rigid-body physics and deterministic replay path |  
| Game/UI state | Zustand | Low-overhead state outside React render churn |  
| UI | DOM \+ Tailwind | HUD/payment/status should not live in WebGL |  
| Database | Postgres via Supabase | Reigns, components, attacks, defenses, payments, events |  
| Realtime | Supabase Realtime initially | Broadcast canonical state/events |  
| Storage | Supabase Storage | Avatars/logos/assets where needed |  
| Payments | Dodo Payments | One-time packs and webhooks |  
| Hosting | Vercel | Natural Next.js deployment |  
| Analytics | PostHog later | Funnel/behavior analysis |  
| Errors | Sentry later | WebGL/payment/runtime failures |

Architecture principle: React handles UI/product surfaces; refs/Rapier handle hot per-frame simulation. Do not drive 60fps physics through React setState.

# 21\. Server authority and anti-cheat

Paid gameplay cannot trust client-reported damage.

Server creates an authorized attack/defense context containing values such as:  
\- attack\_id / defense\_id  
\- payment entitlement  
\- world\_state\_hash/version  
\- physics/game version  
\- seed  
\- permitted projectile/resource count  
\- expiry/turn ownership

Client submits inputs such as:  
\- projectile/loadout  
\- aim vector  
\- launch force  
\- release timing/input trace  
\- selected target/placement

Authoritative service validates/replays outcome and atomically commits:  
\- component damage  
\- shield state  
\- destroyed components  
\- meters/mana  
\- stats/contributions  
\- ruler transition if defeated

All clients then receive the authoritative event/state.

# 22\. Realtime and concurrency

Preferred shared-world model:  
\- One canonical current reign  
\- One active paid attacker at a time when simultaneous traffic exists  
\- Queue for additional attackers  
\- Defenders may place resources only in valid synchronized windows/rules  
\- Spectators see live attacks and state changes  
\- Atomic world-state versioning prevents two clients claiming the same killing blow  
\- Low traffic: no visible queue; paid attacker starts immediately  
\- High traffic: queue itself becomes social proof/spectacle

# 23\. Art direction and asset strategy

# 

# The live product should be visually game-first, not dashboard-first. The dense concept boards created during exploration are system/reference sheets only. They describe mechanics, information, and possible later observer/history views; agents must not reproduce those boards as the always-visible product UI.

# 

# Primary visual direction: stylized, chunky, readable, toy-like, slightly absurd, and mobile-friendly. The first fortress should be a compact hero composition rather than a sprawling fantasy city. State should be communicated through the world itself: missing wall sections, cracks, lean, smoke/fire, exposed Core glow, visible shields, defenders, and charging siege devices should carry more information than permanent meters.

# 

# Asset strategy is now PROCEDURAL-FIRST. External 3D asset packs are optional accelerators, not dependencies. The world can be built entirely from Three.js primitives, custom BufferGeometry/Shape/Extrude geometry, instancing, procedural materials, CanvasTexture/DOM-supplied ruler branding, shader-driven flags/shields/effects, and Rapier primitive/compound colliders.

# 

# Kenney remains an OPTIONAL fallback/library if a later art pass benefits from specific props or characters. If any external pack is used, retain its license and restyle it into the same procedural material/scale system. The product must not depend on Kenney for its core geometry, gameplay, or persistence model.

# 

# 24\. Procedural-first world generation

# 

# Fully procedural 3D is a viable and preferred first-world path.

# 

# Procedural geometry vocabulary:

# \- Foundation/island: generated low-poly island or stepped platform; simple heightfield/noise only where it improves silhouette.

# \- Walls: box/rounded-box segments with parameterized width, height, thickness, damage zones, battlements, and stable component IDs.

# \- Towers: cylinder/prism/box-derived tower generators with configurable radius, height, crenellations, openings, support points, and destruction chunks.

# \- Crenellations: instanced cuboids arranged from wall/tower perimeter rules.

# \- Gates/arches: Shape \+ ExtrudeGeometry or constructive composition from boxes/cylinders; gameplay collider can remain simpler than render mesh.

# \- Buttresses/braces: cuboids or extruded wedges placed at server-approved support slots.

# \- Throne/Core: a small distinctive procedural centerpiece using primitive geometry, emissive materials, and a stable Core collider.

# \- Cannons/launchers: procedural cylinders/boxes with only the moving parts needed for aiming and recoil.

# \- Projectiles: spheres/capsules/cylinders and simple custom meshes.

# \- Shields: transparent/emissive planes, domes, rings, or low-poly barriers generated from defense state.

# \- Flags/banners: planes or subdivided strips with shader/vertex animation; ruler logo/crest applied as a generated texture.

# \- Ruler identity: logo/avatar applied to banners, crest, HUD, and share surfaces; no custom 3D avatar is required.

# \- Characters/guards: initially abstract/stylized procedural figures built from capsules/spheres/boxes or billboard/icon markers. Authored rigged characters are optional later.

# \- VFX: pooled procedural particles, sparks, dust, smoke, shock rings, debris, flashes, and emissive pulses.

# \- Materials: a small controlled material system for stone, wood, metal, royal accent, attacker accent, shield energy, Core energy, scorch/damage, and neutral terrain. Prefer palette, vertex colors, lightweight noise, and generated textures over large texture packs.

# 

# Persistent-state advantage: procedural generation maps directly to the canonical world model. Every generated component has a deterministic semantic ID, generator version, parameters, transform, health/state, and destruction rules. The server persists semantic state rather than a baked GLB or every debris transform. A client reconstructs the same fortress from the generator version \+ reign/world seed \+ component state.

# 

# Physics mapping:

# \- Most intact structural components are fixed/static bodies.

# \- Primitive-looking pieces should use matching cuboid/cylinder/ball/capsule colliders where possible.

# \- Complex fixed visual geometry may use a simplified trimesh collider when justified.

# \- Dynamic non-convex debris should use multiple convex/primitive colliders or compound shapes rather than dynamic triangle meshes.

# \- When a component crosses its destruction threshold, the semantic component transitions from fixed intact state to a short-lived dynamic fracture/collapse presentation.

# \- After settling, debris is frozen, pooled, or replaced by a simplified procedural rubble state.

# 

# Why procedural-first is attractive here:

# \- stable IDs align with persistent multiplayer state;

# \- deterministic regeneration and replay are easier;

# \- geometry can visibly reflect fortification tiers and damage;

# \- no dependency on third-party 3D art or style mismatch;

# \- easier mobile LOD and instancing because the generator owns complexity;

# \- smaller initial downloads;

# \- ruler branding can be injected dynamically;

# \- the visual language can become distinctive instead of recognizable as an asset pack.

# 

# Risks and mitigations:

# \- Risk: developer-cube look. Mitigation: define an art-direction grammar before content volume: proportions, bevel language, silhouette rules, palette, lighting, edge treatment, VFX, and animation timing.

# \- Risk: repetition. Mitigation: parameterized module variation, seeded asymmetry, controlled damage variation, banners/branding, and fortification-state variation.

# \- Risk: generator complexity. Mitigation: keep the first fortress small and authored-by-code from a finite semantic component graph; do not build a general-purpose medieval city generator.

# \- Risk: collision/render mismatch. Mitigation: explicitly separate render geometry from authoritative gameplay collider geometry and expose debug collider overlays.

# \- Risk: procedural art consumes engineering time. Mitigation: maintain external asset compatibility as an escape hatch, but do not make it the architectural default.

# 

# Working decision: first production world should be able to ship with zero external 3D model packs. Optional external assets may later be added for hero props, richer characters, audio, or themed worlds without changing the world-state contract.

# 

## 24.1 Procedural-art feasibility boundary

# 

# Procedural-first is an architectural and art-direction choice, not a claim that Three.js primitives alone should reproduce the ornate, realistic castle concept art generated during exploration. Those images are mood/concept references. Matching their asset density, sculptural detail, characters, vegetation and architectural ornament entirely procedurally would become a separate procedural-graphics R\&D project.

# 

# The intended launch direction is a deliberately stylized procedural game language: modular, chunky, readable, destructible and distinctive. Quality should come from silhouette, proportions, controlled geometry vocabulary, bevel/edge treatment, material grammar, lighting, generated variation, damage staging, VFX, animation, camera choreography and physics feedback rather than ornate model density.

# 

# The first production world should be capable of shipping with zero external 3D model-pack dependency, but external authored assets are allowed later for characters, signature props, themed worlds or art upgrades. Gameplay semantics, colliders, persistence and authoritative simulation must remain independent of any specific GLB/model pack.

# 

# “Fully procedural” therefore means no required external 3D model dependency, not that the entire product is made by Three.js alone. Three.js/R3F render/generate the visual world; Rapier handles physics; DOM/CSS handles product UI; Next.js handles application/server surfaces; Supabase/Postgres handles canonical persistence/realtime; Dodo handles payments.

# 

# 25\. Persistent world data model

Conceptual state groups:

CURRENT\_REIGN  
\- ruler identity  
\- start time  
\- base fortification  
\- core integrity  
\- reinforcement level  
\- public message/link

PUBLIC\_IDENTITY  
\- display\_name  
\- identity\_type  
\- destination\_url/domain  
\- logo/avatar asset  
\- one-line message  
\- CTA choice  
\- optional social handle  
\- verification status/method  
\- account/payment owner reference kept separate from public identity

STRUCTURES  
\- component id/type  
\- transform  
\- health/state  
\- destroyed flag  
\- reinforcement/support metadata

DEFENSE  
\- shield placements  
\- braces/barricades  
\- supporter ownership  
\- temporary effects

SIEGE  
\- global attacker meter/mana  
\- defender/Royal Guard meter  
\- current attacker  
\- queue  
\- active turn

ECONOMY  
\- attack entitlements/spend  
\- defense entitlements/spend  
\- ruler reinforcement escalation  
\- payment references

STATS  
\- attacks  
\- damage  
\- defenses  
\- damage prevented  
\- visitors  
\- reign records  
\- contribution awards

Persist semantic component state rather than thousands of settled rubble transforms.

# 26\. Physics and mobile performance

| Principle | Direction |  
|---|---|  
| Active rigid bodies | Keep limited |  
| Static castle pieces | Default |  
| Damaged component | Switch static \-\> dynamic when collapse is triggered |  
| Settled debris | Sleep/freeze or replace with simplified rubble representation |  
| Repeated meshes | Instance where useful |  
| Projectiles/debris | Object pooling |  
| Textures | Compressed and limited |  
| Shadows | Restrict shadow casters |  
| Post-processing | Minimal |  
| Device pixel ratio | Adaptive/capped on mobile |  
| Physics timestep | Fixed |  
| Frame target | 60fps where practical; usable around 30fps on weaker phones |

# 27\. Dynamic economy ideas to explore

These are not yet decisions.

| Idea | Benefit | Risk | Status |  
|---|---|---|---|  
| Strong fortress grants attackers extra shots for same pack | Prevents fortress stagnation | Can feel like rubber-banding | EXPLORE |  
| Weak fortress returns attack value to normal | Preserves urgency around kill | Kill-steal complaints | EXPLORE |  
| Defense cost escalates Fibonacci-style | Prevents infinite defense | May create confusing pricing | KEEP concept, tune model |  
| Fixed $3 pack but dynamic ammo/bonus | Cleaner checkout than changing price | Needs clear communication | EXPLORE |  
| Winner's attack spend sets initial fortification | Connects conquest effort to defense | Can reward whales | EXPLORE |  
| Short coronation reinforcement window | Gives new ruler agency | Could slow rapid turnover | KEEP concept |  
| Supporter defensive placements persist until destroyed | Strong collaborative identity | World clutter | KEEP with caps |  
| One free initial claimant | Solves cold start and makes claimant bring audience | Abuse/idle throne | EXPLORE |  
| Low-cost initial claim | Filters abuse | Adds cold-start friction | EXPLORE |  
| Idle/uncontested throne expiry | Prevents dead site | Weakens "rule until defeated" | OPEN |

# 28\. Social and distribution loops

Ruler loop:  
take throne \-\> customize public identity \-\> share "I rule / defend me" \-\> followers arrive \-\> some defend, some attack \-\> siege activity creates content \-\> ruler shares under-siege status.

Attacker loop:  
see weakened/interesting ruler \-\> buy attacks \-\> create visible damage \-\> appear in contributor board \-\> share damage/near-kill \-\> recruit more attackers \-\> final conqueror shares takeover.

Defender loop:  
join ruler's side \-\> buy/place visible defense \-\> defense survives/absorbs damage \-\> visible Royal Guard credit \-\> share defense/status \-\> recruit more supporters.

Spectator loop:  
watch shared physical state \-\> see live attack/near-collapse \-\> choose side \-\> become paid participant.

# 29\. Notifications and return loops

Potential notifications:  
\- Your castle is under siege.  
\- Core Integrity dropped below threshold.  
\- Your shield/brace was destroyed.  
\- Someone is currently attacking you.  
\- You were dethroned.  
\- Your reign archive is ready.  
\- Your defender contribution is now top-ranked.  
\- Your siege contribution is now top-ranked.  
\- The fortress you attacked is close to collapse.

Exact notification channels and frequency are spec-stage decisions.

# 30\. What we explicitly do not want

| Rejected direction | Why |  
|---|---|  
| Pure outbid clone | Money alone determines winner |  
| Pay-to-win weapon ladder | Richest player trivially wins |  
| Infinite ruler healing | Creates permanent whale throne |  
| Core Integrity restoration | Removes guaranteed turnover |  
| Pageviews directly add HP | Botting and follower-size unfairness |  
| Cash payout to ruler | Adds financial/gambling/regulatory complexity |  
| Random paid winner | Weak trust and regulatory risk |  
| External product dependency | We do not need a separate product to create value |  
| Arbitrary HTML/JS controlled by ruler | Security/phishing risk |  
| Ten carnival games at launch | Dilutes one strong mechanic |  
| Full avatar creator | Unnecessary scope |  
| Realistic heavy art | Worse mobile performance and weaker arcade readability |  
| Persist every rubble transform | Expensive and unnecessary state explosion |  
| Separate mobile game controls | Keep one touch/pointer interaction model |

# 31\. Product-family ideas for later

| Later direction | Description |  
|---|---|  
| Digital Dunk Tank | Simpler three-ball physical takeover booth |  
| Can Knockdown | Knock target stack to take public seat |  
| Ring Toss | Precision takeover mechanic |  
| Basketball booth | Skill takeover |  
| Internet Fair | Multiple shared carnival booths, each with its own status object |  
| User-designed fortress | Ruler arranges limited defense pieces after winning |  
| Seasons | Weekly/monthly historical competitions without necessarily resetting live throne |  
| Multiple themed worlds | Same economic primitive with different physics/art |  
| Brand/creator battles | Recognizable communities or creators seed/publicize a siege |

These remain expansions only. The primary product should prove one shared siege first.

# 32\. Current decision ledger

| Item | Status |  
|---|---|  
| One global throne | KEEP |  
| Persistent reign until defeated | KEEP |  
| Castle Siege as primary game | KEEP |  
| Digital Dunk Tank | KEEP as alternate/simpler concept |  
| Persistent structural damage | KEEP |  
| Shared canonical world | KEEP |  
| Paid finite attack opportunities | KEEP |  
| Skill-based effectiveness | KEEP |  
| Smaller targets for mana/power | KEEP |  
| Shared attacker meter | KEEP |  
| King can return and buy defense | KEEP |  
| Core health cannot heal | KEEP |  
| Shield/armor can be replenished within rules | KEEP |  
| Escalating/capped reinforcement | KEEP |  
| Support current ruler | KEEP |  
| Defenders place actual world objects | KEEP |  
| Shared Royal Guard meter | KEEP |  
| Attacker/defender public status | KEEP |  
| Final valid defeat gets throne | KEEP |  
| Siege MVP retained separately | KEEP |  
| Live attacks | KEEP |  
| Sequential active attacker / queue | KEEP |  
| Fame from visitors | KEEP |  
| Combat HP from visitors | REJECT |  
| Direct $ \-\> damage | REJECT |  
| Paid overpowering weapons | REJECT |  
| Earned special weapons | KEEP |  
| Cash prize | REJECT |  
| Daily reset | REJECT initially |  
| Hall of Fame/archive | KEEP |  
| Dodo checkout | KEEP |  
| Single-page product | KEEP |  
| Primary live screen is 90-95% game world with minimal persistent HUD | KEEP |  
| Dense infographic/dashboard boards are reference/secondary surfaces, not launch UI | KEEP |  
| Mobile-first one-thumb attack | KEEP |  
| R3F \+ Rapier | KEEP |  
| Supabase persistent/realtime state | KEEP |  
| External 3D asset packs / Kenney | OPTIONAL accelerator; not a dependency |  
| Fully procedural first 3D world | KEEP / preferred |  
| Internet Fair/multiple booths | LATER |  
| Ruler may represent person/company/product/project/community/etc. | KEEP |  
| Public display name \+ identity type | KEEP; required |  
| Destination URL/domain | KEEP; strongly preferred, exact no-link exception OPEN |  
| Logo/avatar | KEEP; optional but recommended |  
| One-line public message | KEEP; constrained |  
| CTA | KEEP; constrained choices rather than arbitrary deceptive copy |  
| Visible destination domain near CTA | KEEP |  
| Public identity separate from payment/account identity | KEEP |  
| URL metadata auto-fill for coronation | EXPLORE |  
| Rich public identity for ruler; lightweight identity for attackers/defenders | KEEP |  
| Domain/brand verification badge | LATER/EXPLORE |  
| Famous-brand impersonation moderation | KEEP |

# 33\. Open questions before writing the product specification

## Gameplay and fairness

\- What exactly constitutes defeat: Core Integrity zero, king body below threshold, throne destroyed, or a combined condition?  
\- How many projectiles are in one paid attack pack?  
\- Does a player buy a pack once and remain in queue until all shots are used?  
\- How are hit damage and structural collapse scored?  
\- What secondary targets exist in the first game?  
\- Which special weapon is the first shared-mana unlock?  
\- How much skill variance should exist between novice and expert?  
\- Should attackers be allowed to practice for free against a non-persistent training castle?

## Defense

\- Which defensive resource is first: shield, brace, barricade, or choice?  
\- Can the ruler personally place defense or only supporters?  
\- Does defensive placement pause attacks briefly?  
\- How many simultaneous defensive objects can exist?  
\- Exact escalation/cap model for repeated reinforcement?  
\- Should defenders have a free non-mechanical cheer/banner action?

## Economics

\- Free first claimant vs paid claim?  
\- Exact attack/defense pack pricing?  
\- Does a conquering player's spend influence their initial fortification?  
\- Should attack value dynamically increase against over-fortified rulers?  
\- Should attackers/defenders have stored unused entitlements across sessions?  
\- Do we use accounts, magic links, payment email, or anonymous session \+ later claim?  
\- What minimum economics are acceptable after Dodo fees, refunds, and taxes?

## Persistence and turnover

\- How long can an uncontested ruler hold the throne?  
\- Do we preserve "until defeated" absolutely, or expire after extended zero activity?  
\- What happens if the server/world version changes while a reign is active?  
\- How much historical world state should be reconstructable?

## Realtime

\- How long is an attack turn?  
\- How does the queue handle disconnects?  
\- Can defenders act while an attacker is aiming, or only between turns?  
\- Is every paid shot broadcast live, or only authoritative result/replay?  
\- At what traffic level do we need dedicated realtime infrastructure beyond Supabase?

## Art/world

\- Exact initial theme: carnival castle, toy medieval fortress, absurd internet kingdom, or something else?  
\- What exact procedural shape/material grammar defines the first fortress so it looks intentional rather than like developer primitives?  
\- Which procedural modules are required for the first world, and which optional external assets, if any, are worth introducing later?  
\- What material, lighting, silhouette, bevel/edge, VFX, and animation rules make the procedural world distinctive?  
\- Character presentation: 3D avatar, banner/logo, portrait billboard, or stylized generic ruler?

## Identity and coronation

\- Which public identity types ship first: person, company, product/app/site, project/open-source, creator, community, campaign/event, other?  
\- Is destination URL mandatory for every ruler, or can personal/joke identities exist without one?  
\- Exact display-name, one-line-message, CTA, social-handle, logo/avatar, and domain-display limits?  
\- How long is the coronation setup window after conquest, and what fallback identity appears if it expires?  
\- Should pasting a URL auto-suggest name, favicon/OG image, and description metadata?  
\- How should logo/avatar appear in the 3D world: banner, shield, throne crest, portrait billboard, character marker, or a combination?  
\- What domain verification method comes first: email-on-domain, DNS TXT, meta/file proof, or another method?  
\- What does a verified badge guarantee, and when is verification required for high-risk/famous brand identities?  
\- How do we handle impersonation when payment/account identity differs from the public identity being promoted?

## 

## Safety/abuse

\- What ruler identity/message/link moderation is required?  
\- Link reputation/phishing checking?  
\- Chargeback handling for consumed attack packs?  
\- Bot/script detection for paid physics input?  
\- Rate limits and multi-account behavior?  
\- Dodo confirmation for exact final skill-based siege description?

## 33.1 Complete screen, UI, world, and system inventory

# 

# This inventory freezes what agents should design/build before any further visual generation. The product remains primarily one route with contextual states, sheets, overlays, and game modes; this is not a requirement for dozens of separate routes.

# 

# Screen / state inventory

# 

# | ID | Screen / state | Purpose | Type | Launch |

# |---|---|---|---|---|

# | S00 | Boot / World Loading | Load current snapshot, renderer and physics | Temporary | Yes |

# | S01 | Connection Lost / Reconnecting | Freeze unsafe actions and recover canonical state | System | Yes |

# | S02 | Empty Throne | Seed a world when no ruler exists | Main state | Yes |

# | S03 | Live Siege / Spectator Home | Watch world and choose Attack or Defend | Primary state | Yes |

# | S04 | Live Attack Spectator | Watch another player attack | Main variation | Yes |

# | S05 | Critical Siege | Heightened presentation when Core is near defeat | Main variation | Yes |

# | S06 | Ruler Identity Sheet | Inspect ruler identity, URL and reign stats | Sheet | Yes |

# | S07 | Attack Purchase | Buy attack entitlement | Bottom sheet | Yes |

# | S08 | Dodo Checkout | Complete payment | Overlay | Yes |

# | S09 | Payment Processing | Await authoritative payment confirmation | Overlay/system | Yes |

# | S10 | Payment Failed | Retry or exit | Overlay | Yes |

# | S11 | Attack Entitlement Granted | Confirm shots/resources | Transition | Yes |

# | S12 | Attack Queue | Wait for live turn | Sheet/HUD | Yes |

# | S13 | Attack Ready | Short your-turn transition | Transition | Yes |

# | S14 | Attack Mode | Aim, power, trajectory and fire | Fullscreen game mode | Yes |

# | S15 | Projectile In Flight | Follow/observe shot | Game state | Yes |

# | S16 | Impact / Damage Resolution | Show authoritative hit/destruction | Game state | Yes |

# | S17 | Between Shots | Re-arm next shot against updated world | Game state | Yes |

# | S18 | Attack Turn Complete | Summarize contribution | Overlay | Yes |

# | S19 | Defense Purchase | Buy Shield/Brace resource | Bottom sheet | Yes |

# | S20 | Defense Placement | Place resource in valid world slot | Fullscreen game mode | Yes |

# | S21 | Defense Resolution | Confirm world mutation | Transition | Yes |

# | S22 | Ruler Defense Controls | Ruler reinforces/defends within rules | Context sheet | Yes |

# | S23 | Ruler Under Siege Alert | Bring ruler back to battle | Notification/overlay | Yes |

# | S24 | Core Destroyed | Decisive destruction event | Cinematic | Yes |

# | S25 | Victory / Conqueror | Confirm authoritative winner | Transition | Yes |

# | S26 | Coronation Identity Setup | Configure public throne identity | Form sheet | Yes |

# | S27 | Coronation Fortification | Configure allowed initial defense | Setup | Yes |

# | S28 | New Reign Transition | Regenerate/rebuild and apply new identity | Cinematic | Yes |

# | S29 | Dethroned | Show previous ruler result | Overlay/sheet | Yes |

# | S30 | Live Siege Details | Detailed live siege state | Sheet/drawer | Yes |

# | S31 | Reign History | Explore current/past reigns | Secondary | Yes |

# | S32 | Reign Timeline | Meaningful attack/defense/world events | Secondary | Yes |

# | S33 | Hall of Fame | Historical rankings | Secondary | Yes |

# | S34 | Contribution Rankings | Attack/defense contributor recognition | Secondary | Yes |

# | S35 | Queue Details | Current/upcoming attackers | Secondary | Optional launch |

# | S36 | Share Reign / Result | Shareable status/result | Sheet | Yes |

# | S37 | How It Works | Explain mechanic quickly | Sheet | Yes |

# | S38 | Practice Range | Free non-persistent aiming practice | Game mode | Later |

# | S39 | Identity Verification | Verify domain/brand control | Flow | Later |

# | S40 | Identity Moderation Pending | Hold identity while reviewing | System | As needed |

# | S41 | Identity Rejected / Edit | Repair unsafe/misleading identity | System | Yes if moderated |

# | S42 | Purchase Recovery | Restore missing entitlement safely | System | Yes |

# | S43 | Unsupported WebGL / Device | Fallback explanation | System | Yes |

# | S44 | Reduced Graphics Mode | Preserve playability on weak devices | System | Yes |

# 

# Priority screen families to design first: Live Siege; Attack Purchase \+ Checkout; Attack Mode; Defense Purchase \+ Placement; Core Destruction \+ Victory \+ Coronation; Siege Details \+ History.

# 

# DOM/UI component inventory

# 

# Persistent/frequent: product mark; ruler identity chip; visible destination domain; optional verification badge; reign timer; Core Integrity; temporary Shield state; viewer count where useful; Attack CTA; Defend CTA; current-attacker chip; critical-state indicator; details trigger.

# 

# Attack-context components: shots remaining; projectile identity; power meter; aim reticle; trajectory preview; drag/pull guide; cancel shot; turn timer; special-shot indicator; Siege Charge; hit feedback; structural-hit label; Core-hit feedback; turn-result summary.

# 

# Defense-context components: defense entitlement/inventory; Shield card; Brace card; valid placement slot; placement ghost; placement validity; rotate control if needed; confirm placement; Royal Guard Charge; contribution feedback.

# 

# Payment components: attack pack; defense item; exact price; Dodo checkout trigger; pending/success/failure; entitlement balance; purchase recovery.

# 

# Public-identity/coronation components: display name; identity type; logo/avatar; destination URL/domain; one-line message; constrained CTA; optional social handle; verification badge; identity preview; victory banner; defeated-ruler summary; URL metadata suggestion; upload; fortification selector; reinforcement price; publish/start-reign action; protected setup countdown.

# 

# History/social components: reign summary; ruler history; conqueror; Siege MVP; Royal Guard MVP; attack/defense contribution rows; timeline events; duration/survival/spectator/activity stats; Hall of Fame rows; share card/link actions.

# 

# Feedback/system components: incoming attack; component destroyed; Shield destroyed; Core exposed/critical; Siege Charge full; Royal Guard full; defender joined; attacker queued; your turn; payment confirmed; entitlement granted; throne captured; dethroned; reconnecting; stale world state; reduced-performance notice.

# 

# 3D world/game-object inventory

# 

# Environment: terrain/island base; water/void/background; sky/atmosphere; lighting; fog; distant low-cost silhouettes; attacker platform; fortress platform; approach/visual path; camera anchors.

# 

# Fortress: foundation; central keep; Core/throne tower; walls; towers; gate; parapets; battlements; stairs/platforms; arches; supports/braces; buttresses/columns where useful; weak/destructible sections; Core enclosure; throne/crown marker.

# 

# Ruler identity surfaces: central banner; flags; crest; throne crest; logo plaque; shield texture/crest; optional portrait surface. Logos should normally become generated textures applied to stable geometry, not custom 3D models.

# 

# Attack objects: launcher/cannon; barrel; carriage/base; recoil mechanism; standard cannonball; Breaker projectile; future sidegrades; muzzle flash; smoke; trajectory helpers.

# 

# Defense objects: Shield dome/wall; Brace; later barricade; Royal Shield effect; defense placement anchors.

# 

# Secondary targets: Power Orb first; later shield generator, explosive/supply/moving targets only if balancing needs them.

# 

# Damage/destruction: intact, damaged, critical, destroyed, collapse/displaced, rubble, exposed Core, impact/scorch, dust, smoke, fire/sparks, temporary falling fragments.

# 

# Physics: fixed structural colliders; dynamic collapse bodies; projectile rigid bodies; temporary debris bodies; Shield/weak-point/Core colliders; trigger zones; out-of-bounds volumes.

# 

# Non-visual game/system inventory

# 

# Current reign; world-state version; Core Integrity; semantic structural health; active Shields/Braces; attacker queue; active turn; attack entitlement; defense entitlement; projectile definitions; defense-resource definitions; damage resolver; structural dependency/collapse resolver; Siege Charge; Royal Guard Charge; reinforcement-price escalation; succession resolver; contribution scoring; history/event log; Dodo payment record; entitlement issuance/idempotency; public identity; moderation state; realtime event stream; spectator/session state; verification/replay record; anti-cheat/risk signals; balance configuration/version.

# 

# Screen-composition invariant

# 

# The default live product should reduce to ruler identity \+ reign time, Core state, the 3D world, and Attack/Defend. The world should communicate structural condition, Shield presence and damage before a user opens details. Event feed, queue, rankings, history, meters and economics are contextual or secondary unless an active mode specifically requires them.

# 

# 34\. Product specification status

A separate implementation-grade Markdown specification now exists. It must remain downstream of this exploration document: confirmed decisions flow into the spec, while PARK/EXPLORE/LATER ideas remain non-requirements unless explicitly promoted.

The spec phase should explicitly decide:  
1\. Product name/positioning and one-sentence explanation.  
2\. Exact first-game rules and defeat condition.  
3\. Attack and defense economy.  
4\. Claim/takeover rules.  
5\. Reign/idle/reset behavior.  
6\. First set of projectiles, targets, mana, and defenses.  
7\. Mobile and desktop interaction contract.  
8\. Single-page screen/state flow.  
9\. Authoritative backend/realtime state machine.  
10\. Payment entitlement lifecycle and webhook behavior.  
11\. Database/event schemas.  
12\. Anti-cheat/physics verification model.  
13\. Procedural geometry/material system, optional external-asset compatibility, and art-direction treatment.  
14\. Performance budgets.  
15\. Moderation/abuse requirements.  
16\. Analytics/events and balancing metrics.  
17\. Acceptance criteria and test plan.

18\. Public throne identity submission, coronation, CTA, verification, and impersonation rules.  
Only after these decisions should implementation tasks be generated.  
