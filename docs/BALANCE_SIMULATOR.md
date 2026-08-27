# Siege Me offline balance simulator

**Status:** local exploratory tool, not production or live-balance evidence
**Canonical implementation:** `src/game/balance/simulator.ts`
**Tests:** `src/game/balance/simulator.test.ts`

## Purpose

The simulator gives the team a deterministic way to explore the relationship
between aim success, damage, finite attack packs, defense volume, turn lease
duration, reign length, and modeled revenue before changing live `GameConfig`.
It is intentionally a pure module so a scenario can be reproduced from its
inputs and seed.

## Model and assumptions

Each simulated reign begins with Core Integrity 100. A shot either misses or
hits according to `hitRate`. A hit samples bounded power between the configured
minimum and maximum and applies:

```text
damage = round((baseDamage + sampledPower * powerDamage)
               * defenseDamageMultiplier ^ defensePlacementCount)
```

The multiplier is capped to eight modeled placements to keep the exploratory
model numerically bounded. Attack revenue is the number of finite packs needed
for the simulated shots, multiplied by `attackPackPriceMinor`. Defense revenue
is the sum of `defensePriceForTier()` for the planned placements in each reign.
Reign duration is modeled as `shots * turnDurationMs`.

These are deliberate abstractions, not claims about the live resolver. The live
authority has structural collisions, Power Orb charge, Breaker Shots, Royal
Shield Pulse, queue waits, misses, coronation protection, and player behavior.
Those behaviors must be added as separate scenario terms before using the tool
for a launch decision.

## Outputs

The result reports completed, breached, and capped reigns; average shots,
hits, and duration; attack and defense revenue separately; and total modeled
revenue in minor currency units. A capped reign means the configured shot cap
was reached without Core breach. This prevents an unrealistic infinite loop in
low-hit-rate scenarios and makes the cap visible to reviewers.

## How to use it

Import `simulateBalance()` from the canonical module in a Vitest scenario or
an internal analysis harness. Always preserve the full scenario object and
seed with any result. Do not copy its placeholder defaults into live checkout,
Worker, or UI code. Before live tuning, decide and document the missing model
terms, especially defense placement timing, Power Orb/Breaker behavior, queue
waits, and whether revenue should include only completed packs or refunds and
disputes.

## Evidence boundary

The current tests establish determinism, termination, and directional behavior
for the pure model. They do not establish player conversion, reign length in
production, payment revenue, fairness, or a recommended price. Real-world
balance still requires reviewed scenarios, playtesting, and approved provider,
business, and legal decisions.
