# Siege Me — Comprehensive Architectural, Game Design & First-Principles Review

> **Project:** Siege Me (`siegeme.com`)
> **Status:** Canonical Multi-Dimensional System Review
> **Evaluation Frameworks:** Game Design Principles, Long-Term 1st Principles, Operating Doctrine v8.0, Review Doctrine v1.1, Architecture & Security Doctrines
> **Date:** 2026-08-27

---

## 1. Executive Summary & Verdict

### 1.1 The System at a Glance
**Siege Me** is a persistent, single-world browser siege game centered around a single scarce public object: **The Throne**. At any given moment, exactly one ruler controls the throne and commands the primary attention surface (avatar, name, message, link, and fortress aesthetics). Everyone else acts as Spectators, Attackers (paying for finite, skill-based ballistic attempts), or Defenders (paying for finite shields/braces).

### 1.2 Strategic Verdict
- **Concept & Product Thesis:** **Exceptionally Strong.** Converting speculative internet real estate (e.g., Million Dollar Homepage, SiliconCity, outbid boards) into a skill-based, physical, destructible 3D spectacle solves the classic stagnation problem of static boards.
- **Architectural Foundation:** **Sound & Modern.** The Cloudflare-first topology (Durable Object as live authority + D1 as immutable ledger + R2 for blobs + Dodo Payments) is the correct zero-maintenance, low-latency stack for a single global room.
- **Current Maturity:** **Phase 1 Complete / Phase 2 Gated.** The UI/canvas shell, S00/S03 rendering, session issuance, D1 ledger migrations, and fail-closed Dodo checkout/webhook pipeline are intact. However, **authoritative ballistic simulation, active-turn queue leasing, and the succession transaction are intentionally gated** and remain the primary technical hurdles before taking live payments.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER                                │
│   React 19 / Three.js / R3F / Rapier (Visuals & Client-Side Prediction)│
│   • S00 Boot -> S03 Live Spectator World                                │
│   • Drag/Aim Gesture UI -> Optimistic Trajectory Arc                    │
└───────────────────┬─────────────────────────────────▲───────────────────┘
                    │ HTTPS / Session Cookie          │ WebSocket Events
                    ▼                                 │ (/ws snapshot/delta)
┌─────────────────────────────────────────────────────┴───────────────────┐
│                    CLOUDFLARE EDGE WORKER                               │
│   • Silent HttpOnly Session Issuance (crypto.randomUUID)                │
│   • Dodo Checkout Creation & Purchase Intent Logging                    │
│   • Webhook Signature Verification (StandardWebhooks)                   │
└───────────┬─────────────────────────┬───────────────────────────────────┘
            │ Internal Secret RPC     │ SQL Batch
            ▼                         ▼
┌─────────────────────────┐ ┌─────────────────────────────────────────────┐
│ DURABLE OBJECT          │ │ CLOUDFLARE D1 (SQLite Ledger)               │
│ `global-throne-v1`      │ │ • `players`, `purchase_intents`             │
│ • Canonical World State │ │ • `webhook_events`, `payments`              │
│ • Turn Queue & Leases   │ │ • `entitlement_ledger`, `reign_archive`     │
│ • Ballistic Simulation  │ └─────────────────────────────────────────────┘
│ • Realtime WS Broadcast │
└─────────────────────────┘
```

---

## 2. Game Design Principles Review

### 2.1 The Core Play Loop & Role Dynamics
The four-role model (**Ruler**, **Attacker**, **Defender**, **Spectator**) creates an asymmetric social ecosystem:

| Role | Motivations & Rewards | Friction Points & Risks | Design Verdict |
| :--- | :--- | :--- | :--- |
| **Ruler** | Massive vanity, outbound traffic, historical record, bragging rights. | Can be dethroned while offline; potential feeling of powerlessness if overwhelmed. | **Strong.** Must ensure coronation provides a fair setup window and under-siege alerts. |
| **Attacker** | Skill expression, destruction satisfaction, claiming the crown for $3-$10. | Missed shots feel wasted if aim feedback is ambiguous or physics feel random. | **High Potential.** Requires immediate, visceral visual/audio hit confirmations. |
| **Defender** | Loyalty to ruler, community defense, griefing aggressive attackers, leaderboard glory. | Paying to defend an unresponsive or inactive ruler might feel thankless. | **Viable.** Royal Guard meter and contribution badges mitigate this. |
| **Spectator** | Free entertainment, anticipation of collapse, schadenfreude, scouting. | Passive experience can become boring if turns take too long or no one is attacking. | **Critical.** Live destruction ticker, ambient particle fx, and spectator chat/reactions needed. |

### 2.2 Core Invariant: Irreversible Core Decay
- **The Rule:** `Core Integrity` cannot be healed during an active reign.
- **Game Design Impact:** This is the single most vital economic and pacing rule in the game. Without it, wealthy incumbents could create permanent stalemates ("pay-to-immortality"). Because Core Integrity only moves down, **every reign is mathematically guaranteed to end**, ensuring turnover, constant hope for challengers, and continuous spectacle.

### 2.3 Game Feel, Ergonomics & "Juice"
1. **Aiming Mechanics (Slingshot vs Viewport Drag):**
   - *Current State:* Pointer dragging across the canvas maps client coordinates directly to `yaw` (-0.72 to +0.72), `elevation` (0.5 to 0.86), and `power` (0.25 to 1.0).
   - *Critique:* Dragging over the 3D canvas can conflict with mobile scroll/pinch behaviors if touch-actions are not explicitly locked (`touch-action: none`). Furthermore, mapping raw screen delta to 3-axis launch variables lacks the tactile elasticity of an arc-and-pull slingshot UI.
   - *Recommendation:* Provide an explicit visual trajectory arc with a clear pull-back launcher anchor at the bottom of the screen.
2. **Impact Satisfaction & Destruction Feedback:**
   - When a stone block or wooden gate is struck, the player must experience camera shake, block fracture particles, floating damage numbers, and sound design (heavy stone thud, splintering wood, resonant crystalline core chime).
   - Current 3D meshes switch statically between `INTACT`, `DAMAGED`, `CRITICAL`, and `DESTROYED` states. Adding dynamic Rapier debris impulses on destruction will dramatically elevate production value.

---

## 3. Long-Term 1st Principles Review

### 3.1 Incentive Alignment & Organic Viral Loops
1. **The Economic Engine:**
   - Attackers spend $3 to purchase a chance at owning a billboard that would otherwise cost hundreds in CPM value.
   - The Ruler is heavily incentivized to tweet/post: *"I rule the throne at siegeme.com — come try to knock me down!"*
   - Every challenge broadcasted by the ruler brings organic attackers and spectators to the platform with **zero customer acquisition cost (CAC)**.
2. **Succession Thrill (The "Snipe" Dynamic):**
   - When Core Integrity drops to `< 15%` (`CRITICAL`), tension peaks. Spectators rush to buy Attack Packs to land the final blow.
   - *Anti-Frustration Requirement:* A strict **one-active-attacker turn lease** (e.g., 20-second shot window) prevents 50 players from firing simultaneously and feeling cheated that someone else's packet arrived 2ms earlier.

### 3.2 Physics Determinism vs Server Authority
- **The Problem:** Running a full physics engine on the client (Rapier/Three.js) while maintaining zero-trust server validation requires exact deterministic agreement.
- **The Anti-Pattern:** Client reporting `I hit core:main for 50 damage` is completely vulnerable to memory modification or forged payloads.
- **The Solution (Dual-Tier Simulation):**
  1. **Client:** Renders high-framerate visual trajectories, Rapier collision prediction, and cosmetic particle debris.
  2. **Server (Durable Object):** Executes a deterministic analytical ballistic trajectory solver:
     $$\vec{r}(t) = \vec{r}_0 + \vec{v}_0 t + \frac{1}{2}\vec{g}t^2$$
     Testing ray-box and ray-sphere intersections against the deterministic component bounding boxes generated from `seed` + `generatorVersion`. The server's math is canonical, fast (<1ms CPU time), and immune to client tampering.

### 3.3 Scalability & Edge Concurrency
- **Durable Object Single-Threaded Bottleneck:** A single Cloudflare Durable Object handles the global throne. While DOs easily handle thousands of requests per second, broadcasting uncompressed JSON snapshots over 10,000 active WebSockets every frame will exhaust DO CPU limits.
- **Mitigation:**
  - Leverage **Durable Object WebSocket Hibernation API**.
  - Broadcast **delta events** (`component_damaged`, `core_hit`, `reign_ended`) rather than full 10KB world snapshots on every shot.
  - Implement a 100ms broadcast batching window for spectator feeds.

---

## 4. Doctrines & Architectural Standards Compliance

### 4.1 Operating Doctrine (v8.0) Compliance
- **Authority Boundary:** Verified. The Cloudflare Durable Object is the sole master of mutable world state. Next.js API routes act solely as transparent proxies/presentation layers.
- **Fail-Closed Security:** Verified. In `cloudflare/src/index.ts`, if secrets are missing, if Dodo webhook signatures fail, or if turn IDs/reign IDs do not match the live snapshot, the system fails closed with explicit error codes (401, 403, 409, 503).
- **Truth Taxonomy & Live State:** Code adheres to live-truth inspection without relying on unverified assumptions.

### 4.2 Security, Privacy & Safety Doctrine Compliance
1. **Silent Session Architecture:**
   - Uses cryptographically signed tokens (`crypto.subtle.sign` HMAC-SHA256) stored in `HttpOnly; Secure; SameSite=Lax` cookies.
   - Eliminates friction: Users do not have to fill out registration forms before playing.
2. **Moderation Boundary for Public Ruler Identity:**
   - *Critical Invariant:* The ruler can post a `displayName`, `message`, and `destinationUrl`.
   - *Hard Requirement:* Domains and messages must pass automated sanitization (blocking XSS payloads, phishing domains, NSFW links, and URL scheme exploits such as `javascript:` or `data:`).

---

## 5. Concrete Actionable Findings Matrix

| ID | Category | Severity | Description | Remediation Plan |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | Architecture | **P0** | Server ballistic resolver is currently stubbed (returns 503). | Implement deterministic bounding-box ray-intersection solver inside Durable Object. |
| **F-02** | Gameplay | **P0** | Turn queue lease is not yet active in DO. | Add FIFO turn lease with 20s timeout to prevent race-condition shot overlap. |
| **F-03** | Security | **P1** | Ruler destination URL lack strict moderation / domain validation. | Implement regex allowlist (http/https only, disallow redirects/punycode phishing). |
| **F-04** | UX / Ergonomics | **P1** | Canvas drag gestures can trigger mobile browser viewport pull-to-refresh. | Add `touch-action: none` and explicit pointer capture bounds on the interaction overlay. |
| **F-05** | Performance | **P2** | WebSockets broadcast full JSON snapshots on every event. | Shift to delta-event broadcasting (`{ type: "DAMAGE", id, hp }`) to reduce egress bandwidth. |
| **F-06** | Game Feel | **P2** | Destruction lacks audio cues and dynamic physics debris. | Integrate Web Audio synthesized sound fx and spawn impulse-driven cosmetic debris blocks. |

---

## 6. Verification & Hardening Roadmap

```
  Phase 1 (Complete)       Phase 2 (Current Focus)        Phase 3 (Pre-Launch)
┌──────────────────────┐  ┌─────────────────────────┐  ┌──────────────────────┐
│ • S00/S03 R3F Shell  │  │ • Deterministic Solver  │  │ • Dodo Live Products │
│ • D1 Migrations      │─►│ • Turn Queue Leasing    │─►│ • Custom Domain DNS  │
│ • Webhook Ingestion  │  │ • Succession Transaction│  │ • Load/Chaos Testing │
│ • Silent Sessions    │  │ • Delta WS Broadcasting │  │ • Content Moderation │
└──────────────────────┘  └─────────────────────────┘  └──────────────────────┘
```

1. **Step 1:** Implement the 3D analytical ballistic trajectory and bounding-box intersection algorithm in `src/game/simulation/ballistics.ts`.
2. **Step 2:** Wire the deterministic solver into `SiegeWorld.handleAttack` in `cloudflare/src/index.ts` within a storage transaction.
3. **Step 3:** Implement turn lease acquisition (`POST /turn/claim`) backed by verified attack entitlements.
4. **Step 4:** Implement succession state transition: Core reaching 0 HP locks world, sets decisive attacker as new ruler, generates new seed, and persists prior reign to D1 `reign_archive`.
5. **Step 5:** Final end-to-end webhook-to-shot live verification.
