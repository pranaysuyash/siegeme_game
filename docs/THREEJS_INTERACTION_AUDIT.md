# Three.js Interaction & Controls Codebase Audit: `siegeme_game`

**Audit Standard:** `~/Projects/skills/threejs-interaction/SKILL.md`
**Date:** August 27, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](../src/components/SiegeApp.tsx)
- [`src/game/client/store.ts`](../src/game/client/store.ts)

---

## 1. Pointer Events, Drag & Slingshot Interaction

### A. Slingshot Drag Handling (`GameCanvas.tsx#L360-L396`)
```typescript
function updateAim(clientX: number, clientY: number) {
  if (!shellRef.current) return;
  const rect = shellRef.current.getBoundingClientRect();
  const horizontal = clamp((clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
  const vertical = clamp((clientY - rect.top) / rect.height, 0, 1);
  setAim({
    yaw: horizontal * 0.72,
    elevation: clamp(0.86 - vertical * 0.34, 0.5, 0.86),
    power: clamp(0.35 + Math.abs(horizontal) * 0.32 + (1 - vertical) * 0.28, 0.25, 1),
  });
}
```

| Interaction Aspect | Current Implementation | Standard Requirement | Audit Evaluation |
| :--- | :--- | :--- | :--- |
| **Pointer Capture** | `setPointerCapture(event.pointerId)` & `releasePointerCapture` | Robust pointer tracking outside canvas bounds | ✅ **Pass** — User can drag past canvas edges without losing touch/mouse tracking. |
| **Touch Cancellation & Lost Capture** | `onPointerCancel`, `onLostPointerCapture` reset `isDragging: false` | Prevent sticky/stuck drag state on OS gesture interruption | ✅ **Pass** — Safe recovery when incoming notifications or system gestures occur. |
| **UI Hit Exclusion** | `(event.target as HTMLElement).closest("button")` check | Prevent accidental aim triggering when tapping UI buttons/HUD | ✅ **Pass** — Clean separation of HTML HUD clicks vs. 3D slingshot dragging. |
| **Coordinate Normalization** | Uses bounding rect dimensions `(clientX - (left + width/2)) / (width/2)` | Aspect-ratio and screen-space invariant input scaling | ✅ **Pass** — Consistent aim sensitivity across desktop, tablet, and mobile displays. |

---

## 2. Raycasting & Scene Event Propagation

### A. R3F Raycaster vs. DOM Shell Input
- **Architecture Pattern:**
  - The app adopts a **hybrid interaction model**:
    - **Global Slingshot Gesture:** Handled at the DOM shell container level (`.canvas-shell`) using standard Pointer Events API with PointerCapture.
    - **HUD & UI Overlays:** Handled via HTML/DOM button events (`PrimaryActions`, `AttackControls`, `ContextSheet`).
- **3D Object Raycasting Overhead:**
  - In standard R3F, raycasting executes against all scene meshes on pointer move.
  - Adding `<AdaptiveEvents />` ensures R3F throttles internal pointer raycasting when frame rate dips.
  - **Recommendation:** If future gameplay requires direct clicking on specific fortress blocks (e.g. inspecting HP), use Drei's `onPointerOver` / `onClick` with `e.stopPropagation()` and layer masks to avoid raycasting against hundreds of crenellation boxes.

---

## 3. Camera Controls & Viewport Rigging

### A. Current Spectator Camera Rig (`GameCanvas.tsx#L24-L28`)
- **Current Setup:** Fixed angled 3/4 camera at `[10.8, 7.1, 11.6]` with `camera.lookAt(0, 2.1, 0)`.
- **Finding:** The view is locked to maintain deterministic server-authoritative firing angles and uniform visual perspective across all players.
- **Drei Controls Enhancement (Future Exploration):**
  - If a "Scout / Free-Cam" spectator mode is introduced, integrating `OrbitControls` with constrained azimuth and polar limits (`minPolarAngle: Math.PI / 6`, `maxPolarAngle: Math.PI / 2.2`, `maxDistance: 30`) will provide seamless touch rotation while preventing clipping through the ground plane.

---

## 4. Implementation Status

The interaction boundary is now implemented and documented as follows:

- Pointer capture, cancellation, lost-capture cleanup, UI hit exclusion, and normalized coordinates remain the active aim contract.
- `.canvas-shell` and its canvas explicitly use `touch-action: none`.
- The launcher barrel and tension ring now provide a direct visual pullback response while aiming.
- A short best-effort vibration is triggered on release when the device exposes the browser vibration API. It is non-authoritative and safely absent on unsupported devices.
- Drei adaptive events are enabled, and no direct fortress raycast is used for authoritative targeting. Aim is still resolved by the Worker ballistic solver.

Free-camera controls and direct fortress inspection are sequenced exploration for the fixed-perspective siege contract. The fixed camera remains the launch default, while a prototype must preserve that path, keep pointer ownership explicit, and use a separate mode or capability gate until usability and performance evidence justify changing the product decision.

## 5. Prioritized Recommendations

1. **Resolved:** Pointer capture and cancel listeners prevent stuck dragging on mobile touch cancellation.
2. **Resolved:** Launcher tension feedback and best-effort haptics are active during release.
3. **Resolved:** Touch-action CSS is explicitly declared on `.canvas-shell` and its canvas.
