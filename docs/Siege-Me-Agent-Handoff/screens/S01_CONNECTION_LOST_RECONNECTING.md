# S01 — Connection Lost / Reconnecting

## Purpose
Prevent unsafe paid or state-mutating interactions while the client may be stale.

## Entry
- realtime channel lost;
- server connectivity lost;
- world version invalid/stale;
- active-turn connection interrupted.

## Visual implementation
Freeze or visually hold the last safe rendered world frame/state.
Dim/desaturate slightly.
Use a DOM reconnect overlay.
Do not load an unrelated fantasy background.

## DOM components
- Siege Me mark
- 'Reconnecting to the siege'
- status
- retry action after threshold
- optional last-safe-state confirmation

## Safety
While disconnected:
- Attack/Defend purchase triggers disabled unless checkout can safely proceed independently and entitlement use is blocked;
- shot submission disabled;
- defense placement disabled;
- no local speculative world mutation becomes canonical.

## Recovery
On reconnect:
1. fetch authoritative snapshot/version;
2. reconcile outstanding entitlement/turn state;
3. discard stale local predictions;
4. rebuild/apply authoritative world state;
5. resume correct screen.

## Must not show
- fake queue position
- fake live attacks
- stale CTA enabled as though authoritative
