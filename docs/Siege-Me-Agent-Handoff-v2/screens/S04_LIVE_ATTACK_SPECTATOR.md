# S04 — Live Attack Spectator

## Purpose
Let everyone watch the same paid live attack without turning the screen into a broadcast dashboard.

## Entry
Another player owns the active attack turn.

## Base
Same world/camera family as S03, optionally shifted slightly to emphasize the attack path.

## DOM additions
- compact current attacker chip: display name/avatar
- shot number: e.g. `Shot 2 of 3`
- small 'LIVE ATTACK' indicator
- optional 'queue to attack next' secondary action

S03 ruler/Core/reign context remains compact.

## 3D presentation
- cannon/launcher firing;
- projectile in actual/predicted flight;
- smoke/muzzle flash;
- impact/destruction when authoritative result resolves;
- no fake cinematic city destruction beyond actual state.

## Interaction constraints
Spectators cannot:
- change projectile;
- change target;
- submit damage.

Defend actions must obey synchronization rules and may be disabled until the current authoritative shot/turn allows placement.

## Exit
- back to S03 after turn/shot state settles;
- S05 if Core becomes critical;
- S24 if Core is authoritatively destroyed.
