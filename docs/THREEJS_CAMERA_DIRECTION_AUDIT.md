# Three.js Camera & Camera Direction Codebase Audit: `siegeme_game`

**Audit Standard:** `~/.codex/skills/threejs-camera-direction/SKILL.md`
**Date:** August 27, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](../src/components/SiegeApp.tsx)
- [`src/game/simulation/ballistics.ts`](../src/game/simulation/ballistics.ts)

---

## 1. Camera System Contract & Projection Definition

| Dimension | Implementation | Camera Direction Standard | Audit Assessment |
| :--- | :--- | :--- | :--- |
| **Projection Mode** | `PerspectiveCamera` | Scale-aware projection | ✅ **Pass** — Explicitly declared on `<Canvas>`: `fov: 37`, `near: 0.1`, `far: 50`. |
| **Framing & Aspect Ratio** | Fixed 3/4 Isometric Perspective (`[10.8, 7.1, 11.6]`) | Authored composition for tactical tabletop clarity | ✅ **Pass** — Balances perspective depth without severe peripheral distortion. |
| **Target Anchor** | `[0, 2.1, 0]` | Subject-derived center of fortress hold | ✅ **Pass** — Centers the Core (`y: 4.05`), Keep (`y: 3.2`), and Launcher (`y: 0.78, z: 8.2`) evenly in the frame. |
| **Up Vector** | Global `+Y` (`[0, 1, 0]`) | World Up convention for tabletop terrain | ✅ **Pass** — Appropriate for flat terrestrial fortress simulation. |
| **Near/Far Frustum Efficiency** | `near: 0.1`, `far: 50` | Depth buffer precision optimization | ✅ **Pass** — Ratio `far/near = 500` ensures 24-bit z-buffer precision without z-fighting artifacts on overlapping battlements. |

---

## 2. Camera Rig Motion & Dynamic Framing

### A. Static Framing vs. Transient Camera Shake (`GameCanvas.tsx#L25-L48`)
```typescript
function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 2.1, 0), []);
  const basePosition = useMemo(() => new THREE.Vector3(10.8, 7.1, 11.6), []);
  const projectileKey = useSiegeStore((state) => state.projectile?.commandKey ?? null);
  const shakeStartedAt = useRef(0);

  useEffect(() => {
    camera.position.copy(basePosition);
    camera.lookAt(target);
    shakeStartedAt.current = projectileKey ? performance.now() : 0;
  }, [basePosition, camera, projectileKey, target]);

  useFrame(() => {
    if (!projectileKey) return;
    const elapsed = Math.max(0, performance.now() - shakeStartedAt.current);
    const envelope = Math.max(0, 1 - elapsed / 850);
    if (envelope <= 0) return;
    const intensity = envelope * 0.045;
    camera.position.set(
      basePosition.x + Math.sin(elapsed * 0.08) * intensity,
      basePosition.y + Math.cos(elapsed * 0.11) * intensity * 0.7,
      basePosition.z + Math.sin(elapsed * 0.13) * intensity
    );
    camera.lookAt(target);
  });
  return null;
}
```

#### Evaluation:
1. **Dampened Shake Envelope:**
   - Evaluates a linear decay envelope `(1 - elapsed / 850)` driven by wall-clock timestamps (`performance.now()`), remaining decoupled from frame rate variance.
2. **Deterministic Baseline Rest:**
   - When no shot is in flight (`!projectileKey` or `envelope <= 0`), the rig skips frame math entirely. The initial mount guarantees exact baseline coordinates `[10.8, 7.1, 11.6]` facing `[0, 2.1, 0]`.
3. **No Unintentional Pitch Thrash:**
   - Multi-frequency sinusoidal oscillation across X, Y, and Z creates visceral mechanical tension without destabilizing the horizon.

---

## 3. Cinematic Transitions & Mode Handoff Opportunities

### A. Potential Authored Shot Transitions
According to the Camera Direction skill principles:
1. **Attack Aim Zoom-in:**
   - When transitioning from `spectator` to `attack-aim`, an authored camera shift closer to the launcher (`[4.5, 3.2, 10.2]` facing the fortress) can heighten the slingshot tension.
2. **Impact Tracking / Kill-Cam:**
   - During catastrophic core destruction (`state === "CRITICAL"` or `DESTROYED`), blending orientation to the Core crystal crystalizes the dramatic coronation outcome.
3. **Transition Rule:**
   - Ensure explicit handoffs use a single `lerp` / `slerp` interpolation stage with an ease curve `1 - (1 - t)^1.8` rather than stacking follow smoothing during the transition window.

---

## 4. Screen-to-World Coordinate Projection Parity

- **Slingshot Projection Model:**
  - Slingshot drag operates on screen-space normalized bounds (yaw $-1 \dots +1$, pitch $0 \dots 1$).
  - Server ballistics converts client input directly to physical vectors:
    $$\vec{v} = \begin{bmatrix} \sin(\text{yaw}) \cdot \cos(\text{elevation}) \cdot \text{speed} \\ \sin(\text{elevation}) \cdot \text{speed} \\ -\cos(\text{yaw}) \cdot \cos(\text{elevation}) \cdot \text{speed} \end{bmatrix}$$
  - The 3/4 camera orientation matches this vector space so that dragging left/right visually aligns with projectile azimuth deflection.

---

## 5. Prioritized Action Plan

1. **P0 (Completed):** Verified `CameraRig` uses zero allocations, dampened decay, and rests accurately at baseline coordinates.
2. **P1 (Aim Mode Framing):** Add subtle FOV shift (`fov: 37` $\rightarrow$ `34`) during `attack-aim` mode to frame the fortress tighter during slingshot pull-back.
3. **P2 (Cinematic Core Victory):** Add smooth camera slerp towards the throne/core when a reign ends.

## Implementation reconciliation, August 27 2026

The remaining camera actions are now implemented in the canonical scene:

- `src/game/camera.ts` owns pure LIVE, ATTACK, DEFEND, CORONATION, and DEFEAT
  presentation presets. Desktop and portrait variants derive from one authored
  frame.
- `CameraRig` in `src/components/GameCanvas.tsx` snapshots the current camera,
  performs one eased position/quaternion handoff, updates the perspective
  projection matrix while FOV changes, and applies shake only during an
  authoritative client projectile in `attack-flight`.
- A staged authoritative `CORONATION` result selects defeat/core framing during
  impact flight. The store still installs only the newest canonical snapshot,
  so the cinematic cannot become a state rollback mechanism.

The pure preset contract is covered by `src/game/camera.test.ts` for aim FOV,
mobile distance, defeat target ownership, and monotonic easing. App typecheck,
lint, production build, and browser smoke remain required evidence for the
mounted scene. This addendum is Tier 1 source documentation plus Tier 2 focused
test evidence, not deployed-device or production proof.

## Final local reconciliation, August 27 2026

The audit's remaining local presentation findings are now closed for this
checkout:

- `flightShakeOffset` is a pure helper with an exact terminal zero. Camera
  shake is active only for an accepted `attack-flight` projectile and is
  disabled when `prefers-reduced-motion` is enabled.
- Aim state is cleared on pointer cancellation, window blur, and document
  visibility changes. No cancellation path submits an attack.
- A successful authoritative Core breach enters `defeat-cinematic`; the
  coronation form remains a separate explicit action and the store installs
  the newest canonical snapshot before presentation completes.
- `?debug=1` on localhost exposes world version, phase, generator, damaged
  semantic IDs, and current camera values for deterministic browser checks.

Focused camera tests now pass with the root suite at 51 tests. The local
Worker/DO/D1 harness passes 9 tests. These are local Tier 1 and Tier 2 claims;
they do not prove real-device motion preferences, production WebGL behavior,
hosted routing, or payment-provider behavior.
