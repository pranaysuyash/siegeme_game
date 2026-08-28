# Game Design & Economic Systems Audit: `siegeme_game`

**Audit Standard:** `~/Projects/skills/game-design/SKILL.md`
**Date:** August 29, 2026
**Audited Targets:**
- [`src/game/config.ts`](../src/game/config.ts)
- [`src/game/balance/simulator.ts`](../src/game/balance/simulator.ts)
- [`src/game/simulation/ballistics.ts`](../src/game/simulation/ballistics.ts)
- [`src/game/simulation/attack.ts`](../src/game/simulation/attack.ts)
- [`src/components/SiegeApp.tsx`](../src/components/SiegeApp.tsx)
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)

---

## 1. The 30-Second Core Loop Test

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE SIEGE ME 30-SECOND LOOP                     │
│                                                                        │
│  1. ACTION    → Attacker pulls back the slingshot launcher             │
│                 (aims yaw, elevation, power) and releases to fire.     │
│                                                                        │
│  2. FEEDBACK  → Projectile traces physical ballistic arc with camera   │
│                 shake, strikes wall/core with synthesized audio impact │
│                 and expanding shockwave ring.                          │
│                                                                        │
│  3. REWARD    → Core / Wall HP visibly decrements; damage toast pops;  │
│                 Power Orb charge advances towards Breaker shot;        │
│                 if Core breaches, player is crowned Global Ruler.      │
│                                                                        │
│  4. REPEAT    → Attacker fires next finite shot or queues turn lease.  │
└────────────────────────────────────────────────────────────────────────┘
```

### Evaluation against Game Design Principles:
- **Immediate Sensory Feedback:** ✅ **Pass** — Muzzle flash, camera shake envelope, sound pitch ramp, and expanding shockwave ring provide instant confirmation.
- **Clear Cause and Effect:** ✅ **Pass** — Projectile trajectory is deterministic; server-side swept-AABB collision eliminates hit-registration ambiguity.

---

## 2. Player Psychology & Role Taxonomy

`siegeme_game` creates a 4-role asymmetric social dynamic catering to all 4 Bartle player types:

| Player Type | In-Game Role | Primary Motivations | Friction Risks & Design Mitigation |
| :--- | :--- | :--- | :--- |
| **Killer** (Dominance) | **Attacker** | Dethroning the current ruler, landing the final breach shot, seizing public attention for $3. | *Risk:* Missed shots feeling wasted.<br>*Mitigation:* Every shot contributes to the `PowerOrb` charge (`+25%`), guaranteeing a devastating **Breaker Shot** (1.5x damage, pierces outer walls) after 4 shots. |
| **Achiever** (Status) | **Ruler** | Maximize reign duration, display verified domain link, broadcast custom message to global audience. | *Risk:* Dethroned while sleeping/offline.<br>*Mitigation:* 120s coronation protection setup window, finite defense shields/braces, and non-linear defense price ladder preventing immediate rush-downs. |
| **Socializer** (Community) | **Defender** | Shielding favored rulers, building Royal Guard reputation, outbidding hostile attackers. | *Risk:* Feeling like spending money for someone else's billboard.<br>*Mitigation:* Royal Guard charge meter (`+25%` per placement) and permanent on-chain/ledger contribution record. |
| **Explorer** (Discovery) | **Spectator** | Analyzing fortress weak points, watching real-time collapses, timing snipes. | *Risk:* Passive spectator boredom during turn transitions.<br>*Mitigation:* Live destruction ticker, animated 3D diorama hold, and trajectory previews. |

---

## 3. Pacing, Difficulty Balancing & Economic Invariants

### A. The Golden Invariant: Irreversible Core Decay
- **Rule:** `Core Integrity` cannot be healed during an active reign.
- **Game Design Rationale:** In digital "king-of-the-hill" games, the fatal flaw is entrenched incumbency where wealthy players create permanent stalemates. Because Core HP only moves downward ($100 \rightarrow 0$), **every reign has a mathematical lifespan**, ensuring constant turnover, continuous hope for challengers, and recurring economic activity.

### B. Progression & Difficulty Curves
1. **Geometric Fortress Layers:**
   - Outer Foundation & Towers ($180\text{ HP}$) absorb initial hits.
   - Front Wall segments ($115\text{ HP}$) protect the Gatehouse ($85\text{ HP}$).
   - Central Keep ($220\text{ HP}$) and Core Enclosure ($110\text{ HP}$) must be breached or lobbed over before the Core ($100\text{ HP}$) is vulnerable to direct ballistic strikes.
2. **Defensive Price Escalation Ladder:**
   - Defense price scales non-linearly: `$3.00` $\rightarrow$ `$6.00` $\rightarrow$ `$12.00` $\rightarrow$ `$22.00` $\rightarrow$ `$34.00`.
   - Prevents infinite defense spamming and creates dynamic cost-to-hold tension as reigns age.

---

## 4. Player Friction Reduction & Monetization Alignment

### A. Finite Shot Packs vs. Microtransaction Predation
- **Attack Pack:** `$3.00` for 3 skill-based shots.
- **Fairness Contract:** Payment buys the *opportunity* to execute 3 physical shots; outcome depends entirely on player aim and live fortress defense state.
- **Fail-Closed Server Validation:** Dodo Payments confirms entitlement on server before shots can be queued; checkout return tokens never grant shots client-side.

### B. Single-Active-Attacker Turn Leasing
- During high-traffic moments (e.g. Core at $<15\%$ critical HP), allowing 100 simultaneous shots would result in 99 wasted transactions arriving milliseconds late.
- **Turn Lease Invariant:** Exactly one attacker holds a `turnDurationMs: 20,000` exclusive firing lease. Unused turns expire cleanly back to the queue.

---

## 5. Master Game Design Task Matrix

| Task ID | Type | Game Design Domain | Task Summary |
| :--- | :---: | :--- | :--- |
| **GD-R1** | Research | Reward Schedules | Model variable loot drop probabilities (e.g. cosmetic title shards) on structure breach. |
| **GD-R2** | Research | Spectator Retention | Research spectator mini-games (e.g. predicting hit/miss with free daily tokens). |
| **GD-R3** | Research | Reign Duration Pacing | Simulate impact of varying `baseDamage: 8` vs `powerDamage: 12` on median reign lifetime. |
| **GD-I1** | Implementation | Friction Reduction | Add visual "Under Siege" flashing pulse on UI when fortress is taking rapid fire. |
| **GD-I2** | Implementation | Game Feel / Juice | Implement floating damage numbers (`-12`, `-20 CRIT`) rising from impacted structures. |
| **GD-I3** | Implementation | Ruler Vanity | Add a shareable "Reign Victory Card" image generator for newly crowned rulers. |
| **GD-I4** | Implementation | Defender Incentives | Implement "Royal Defender of the Reign" leaderboard accolade in the live metadata sheet. |
