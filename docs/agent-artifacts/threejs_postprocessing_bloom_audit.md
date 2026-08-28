# Three.js Post-Processing & HDR Bloom Codebase Audit: `siegeme_game`

**Audit Standards:**
- Primary: [threejs-postprocessing](file:///Users/pranay/Projects/skills/3d-web/threejs-postprocessing/SKILL.md)
- Specialized: [threejs-bloom](file:///Users/pranay/.codex/skills/threejs-bloom/SKILL.md)
- Reference Document: [hdr-bloom-system.md](file:///Users/pranay/.codex/skills/threejs-bloom/references/hdr-bloom-system.md)

**Date:** August 28, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](file:///Users/pranay/Projects/siegeme_game/src/components/SiegeApp.tsx)
- [`src/game/client/store.ts`](file:///Users/pranay/Projects/siegeme_game/src/game/client/store.ts)
- [`src/game/config.ts`](file:///Users/pranay/Projects/siegeme_game/src/game/config.ts)

---

## 1. Post-Processing & Optical Effect Architecture

| Pipeline Stage | Current Implementation | Audit Standard | Assessment |
| :--- | :--- | :--- | :--- |
| **Render Output & Color Pipeline** | Direct Forward Pipeline with `ACESFilmicToneMapping` & `SRGBColorSpace` | Full HDR pre-tonemap signal ordering | ✅ **Pass (Intentional Minimalist Architecture)** — Avoids full-screen composite overhead on mobile/edge clients while maintaining filmic dynamic range. |
| **Luminance & Emissive Hierarchy** | Core crystal (`emissiveIntensity: 2.4` intact $\rightarrow$ `5.0` critical), Projectile (`emissiveIntensity: 0.5`), Impact Ring (`opacity: 0.75`). | Layered HDR Signal Ordering | ✅ **Pass** — Clear hierarchy where critical Core > intact Core > projectile > lit stone surfaces. |
| **Vignette / Peripheral Framing** | Authored CSS radial vignette overlay (`.vignette` in DOM layer) | Low-cost screen-space focus | ✅ **Pass (Optimal Zero-GPU Cost)** — Accomplishes atmospheric tabletop framing without an extra full-screen ShaderPass. |
| **Screen-Space Ambient Occlusion (SSAO)** | Directional key/fill lighting + PCF Shadow Maps | Depth-buffer contact grounding | ⚠️ **Architectural Observation** — Tabletop diorama relies on real-time PCF shadow maps and contrasting material roughness rather than SSAO pass. |
| **Chromatic Aberration / Camera Jitter** | Authored 3-axis sinusoidal camera shake with linear decay envelope | Event-driven impact feedback | ✅ **Pass** — Optical perturbation is driven geometrically via camera matrix shake rather than texture distortion passes. |

---

## 2. HDR Bloom Evaluation & Emissive Ownership

### A. Non-Negotiable Bloom Invariants (from `threejs-bloom` skill)
1. **"Do not make bloom responsible for the underlying form."**
   - **Audit Assessment: Passed.** The Core is a faceted icosahedron with geometric bevels, faceted crystal faces, and an outer transparent aura shell (`<sphereGeometry args={[0.55, 16, 16]} />` with `opacity: 0.09`). It maintains distinct silhouette readability and depth regardless of whether glow/bloom is active.
2. **"Establish scene exposure and emissive luminance before tuning blur."**
   - **Audit Assessment: Passed.** Baseline exposure is locked at `1.05` (`ACESFilmicToneMapping`), key light at `3.4`, and ambient light at `1.5`. Emissive values are calibrated directly against these lighting levels.
3. **"Material Substitution Invariant (Selective Passes)":**
   - In the event `@react-three/postprocessing` / `UnrealBloomPass` is introduced, it must use a threshold $\ge 0.85$ (or selective layer filtering) so that rough stone surfaces (`stoneDark`, `stoneLight`, `wood`) do not accidentally bloom.

---

## 3. High-Fidelity Post-Processing Integration Plan (Optional Enhancement)

If post-processing passes are integrated into the Canvas tree in future updates, the recommended signal chain and package configuration are:

```tsx
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

<EffectComposer disableNormalPass multisampling={0}>
  {/* 1. Selective HDR Bloom on Core and Ballistic Impacts */}
  <Bloom
    luminanceThreshold={0.88}
    luminanceSmoothing={0.05}
    intensity={1.2}
    mipmapBlur
  />
  {/* 2. Subtle Tabletop Vignette */}
  <Vignette eskil={false} offset={0.15} darkness={0.6} />
  {/* 3. Transient Impact Aberration */}
  {isImpact && <ChromaticAberration offset={[0.002, 0.002]} blendFunction={BlendFunction.NORMAL} />}
</EffectComposer>
```

### Mobile & Reduced Graphics Guardrail:
- Ensure the `EffectComposer` is bypassed when `graphicsPolicy.reduced` or `motionReduced` is active to maintain 60 FPS on low-power devices.

---

## 4. Prioritized Recommendations Summary

1. **P0 (Completed):** Verified emissive hierarchy ensures high contrast on gameplay-critical targets without relying on post-processing passes for form.
2. **P1 (Zero-Cost Vignette):** Retain DOM CSS vignette `.vignette` for mobile/spectator performance.
3. **P2 (Selective Bloom Path):** If hardware post-processing is enabled for high-tier desktop GPUs, enforce `luminanceThreshold >= 0.88` with `mipmapBlur` to prevent muddy stone haloing.
