# Three.js Post-Processing & HDR Bloom Codebase Audit: `siegeme_game`

**Audit Standards:**
- Primary: `~/Projects/skills/3d-web/threejs-postprocessing/SKILL.md`
- Specialized: `~/.codex/skills/threejs-bloom/SKILL.md`
- Reference Document: `~/.codex/skills/threejs-bloom/references/hdr-bloom-system.md`

**Date:** August 29, 2026
**Audited Targets:**
- [`src/components/GameCanvas.tsx`](../src/components/GameCanvas.tsx)
- [`src/components/SiegeApp.tsx`](../src/components/SiegeApp.tsx)
- [`src/game/client/store.ts`](../src/game/client/store.ts)
- [`src/game/config.ts`](../src/game/config.ts)

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

## 3. Historical enhancement plan and current implementation

The following configuration was the audit-time recommendation before the
selective bloom path was integrated. It remains useful as provenance, but the
canonical implementation is the `BLOOM_CONFIG` section below and uses the
installed package API (`enableNormalPass`) rather than the older
`disableNormalPass` spelling.

At audit time, if post-processing passes were integrated into the Canvas tree,
the recommended signal chain and package configuration were:

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

## Current local implementation status

The optional selective bloom path is now implemented in the canonical scene
with explicit policy ownership and no change to world authority, collision,
or procedural geometry.

- `src/game/client/postprocessing.ts` owns the calibrated bloom constants and
  the full-versus-reduced presentation policy.
- `GameCanvas` uses the installed `@react-three/postprocessing` API with
  `enableNormalPass={false}`, zero multisampling, `mipmapBlur`, and a `0.9`
  luminance threshold. Core, Power Orb, Breaker, and impact materials remain
  the emissive signal owners; bloom does not supply their underlying form.
- Bloom and contact shadows are bypassed for reduced graphics, reduced motion,
  and benchmark mode. The authored CSS vignette remains the low-cost framing
  layer on every path.
- Local renderer diagnostics expose bloom enablement, disable reason, threshold,
  intensity, and normal-pass state. The preference fixture asserts the expected
  policy for normal desktop, reduced-motion desktop, and reduced-motion mobile.
- Focused policy tests cover the threshold invariant and all reduction paths.
- Current verification is green: `npm test -- --run` reports 27 files and 137
  tests, the Worker harness reports 19/19, the preference and desktop/mobile
  browser fixtures pass with zero page/console errors, the isolated fresh
  runtime passes the target-specific impact path, and the scene-only baseline
  is 2,630 desktop triangles and 1,536 mobile triangles.

This closes the repository-local post-processing recommendation. It does not
establish real-device GPU frame time, thermal behavior, accessibility of visual
effects, hosted deployment behavior, or production observability. Those remain
release-boundary verification work.
