# Screen / State Inventory

The product is primarily one route. These are **states, modes, sheets and overlays**, not a requirement for 45 separate pages.

| ID | Screen / state | Purpose | Type | Launch |
|---|---|---|---|---|
| S00 | Boot / World Loading | Load current snapshot, renderer and physics | Temporary | Yes |
| S01 | Connection Lost / Reconnecting | Freeze unsafe actions and recover canonical state | System | Yes |
| S02 | Empty Throne | Seed a world when no ruler exists | Main state | Yes |
| S03 | Live Siege / Spectator Home | Watch world and choose Attack or Defend | Primary state | Yes |
| S04 | Live Attack Spectator | Watch another player attack | Main variation | Yes |
| S05 | Critical Siege | Heightened presentation when Core is near defeat | Main variation | Yes |
| S06 | Ruler Identity Sheet | Inspect ruler identity, URL and reign stats | Sheet | Yes |
| S07 | Attack Purchase | Buy attack entitlement | Bottom sheet | Yes |
| S08 | Dodo Checkout | Complete payment | Overlay | Yes |
| S09 | Payment Processing | Await authoritative payment confirmation | Overlay/system | Yes |
| S10 | Payment Failed | Retry or exit | Overlay | Yes |
| S11 | Attack Entitlement Granted | Confirm shots/resources | Transition | Yes |
| S12 | Attack Queue | Wait for live turn | Sheet/HUD | Yes |
| S13 | Attack Ready | Short your-turn transition | Transition | Yes |
| S14 | Attack Mode | Aim, power, trajectory and fire | Fullscreen game mode | Yes |
| S15 | Projectile In Flight | Follow/observe shot | Game state | Yes |
| S16 | Impact / Damage Resolution | Show authoritative hit/destruction | Game state | Yes |
| S17 | Between Shots | Re-arm next shot against updated world | Game state | Yes |
| S18 | Attack Turn Complete | Summarize contribution | Overlay | Yes |
| S19 | Defense Purchase | Buy Shield/Brace resource | Bottom sheet | Yes |
| S20 | Defense Placement | Place resource in valid world slot | Fullscreen game mode | Yes |
| S21 | Defense Resolution | Confirm world mutation | Transition | Yes |
| S22 | Ruler Defense Controls | Ruler reinforces/defends within rules | Context sheet | Yes |
| S23 | Ruler Under Siege Alert | Bring ruler back to battle | Notification/overlay | Yes |
| S24 | Core Destroyed | Decisive destruction event | Cinematic | Yes |
| S25 | Victory / Conqueror | Confirm authoritative winner | Transition | Yes |
| S26 | Coronation Identity Setup | Configure public throne identity | Form sheet | Yes |
| S27 | Coronation Fortification | Configure allowed initial defense | Setup | Yes |
| S28 | New Reign Transition | Regenerate/rebuild and apply new identity | Cinematic | Yes |
| S29 | Dethroned | Show previous ruler result | Overlay/sheet | Yes |
| S30 | Live Siege Details | Detailed live siege state | Sheet/drawer | Yes |
| S31 | Reign History | Explore current/past reigns | Secondary | Yes |
| S32 | Reign Timeline | Meaningful attack/defense/world events | Secondary | Yes |
| S33 | Hall of Fame | Historical rankings | Secondary | Yes |
| S34 | Contribution Rankings | Attack/defense contributor recognition | Secondary | Yes |
| S35 | Queue Details | Current/upcoming attackers | Secondary | Optional launch |
| S36 | Share Reign / Result | Shareable status/result | Sheet | Yes |
| S37 | How It Works | Explain mechanic quickly | Sheet | Yes |
| S38 | Practice Range | Free non-persistent aiming practice | Game mode | Later |
| S39 | Identity Verification | Verify domain/brand control | Flow | Later |
| S40 | Identity Moderation Pending | Hold identity while reviewing | System | As needed |
| S41 | Identity Rejected / Edit | Repair unsafe/misleading identity | System | Yes if moderated |
| S42 | Purchase Recovery | Restore missing entitlement safely | System | Yes |
| S43 | Unsupported WebGL / Device | Fallback explanation | System | Yes |
| S44 | Reduced Graphics Mode | Preserve playability on weak devices | System | Yes |

## Priority design/implementation families

1. Live Siege family: S00–S06
2. Attack payment/turn family: S07–S18
3. Defense family: S19–S23
4. Takeover/coronation family: S24–S29
5. Details/history/social family: S30–S37
6. Resilience/edge-state family: S38–S44

## State-design rule

Each visual or component reference must declare:
- exact screen/state ID;
- trigger/entry condition;
- components visible;
- 3D world objects visible;
- permitted user actions;
- exit conditions;
- components that must **not** appear.

Never merge states for convenience if doing so creates ambiguous implementation behavior.
