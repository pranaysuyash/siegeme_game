"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Two analytic waves own both height and derivatives. This is a stylized
// surface, not a fluid simulation or screen-space reflection pipeline.
const waves = `
  uniform float time;
  vec3 waveField(vec2 p) {
    float a = dot(p, vec2(0.42, 0.23)) + time * 0.55;
    float b = dot(p, vec2(-0.18, 0.61)) + time * 0.38;
    return vec3(0.09 * sin(a) + 0.05 * sin(b),
      0.09 * 0.42 * cos(a) - 0.05 * 0.18 * cos(b),
      0.09 * 0.23 * cos(a) + 0.05 * 0.61 * cos(b));
  }
`;

export function CoastalWater({ reducedGraphics, motionReduced }: { reducedGraphics: boolean; motionReduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    fogColor: { value: new THREE.Color("#101f2b") },
    // Local inspection only; no production UI or gameplay state is involved.
    diagnostic: { value: typeof window !== "undefined" && window.location.hostname === "127.0.0.1" && new URLSearchParams(window.location.search).get("waterNormals") === "1" ? 1 : 0 },
  }), []);
  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.time.value = motionReduced ? 0 : clock.elapsedTime;
  });
  return <mesh position={[0, -2.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[400, 400, reducedGraphics ? 48 : 96, reducedGraphics ? 48 : 96]} />
    <shaderMaterial ref={material} uniforms={uniforms} side={THREE.DoubleSide}
      vertexShader={`${waves}
        varying vec3 worldPoint;
        void main() {
          vec3 p = position;
          p.z += waveField(vec2(p.x, -p.y)).x;
          worldPoint = (modelMatrix * vec4(p, 1.0)).xyz;
          gl_Position = projectionMatrix * viewMatrix * vec4(worldPoint, 1.0);
        }`}
      fragmentShader={`${waves}
        uniform float diagnostic;
        uniform vec3 fogColor;
        varying vec3 worldPoint;
        void main() {
          vec3 field = waveField(worldPoint.xz);
          vec3 n = normalize(vec3(-field.y, 1.0, -field.z));
          vec3 viewDir = normalize(cameraPosition - worldPoint);
          float fresnel = pow(1.0 - max(dot(n, viewDir), 0.0), 3.0);
          float light = pow(max(dot(reflect(-normalize(vec3(-0.4, 0.8, 0.25)), n), viewDir), 0.0), 40.0);
          float shallows = 1.0 - smoothstep(7.0, 16.0, length(worldPoint.xz));
          vec3 color = mix(vec3(0.012, 0.037, 0.057), vec3(0.035, 0.12, 0.13), shallows);
          color += fresnel * vec3(0.06, 0.12, 0.16) + light * vec3(0.22, 0.21, 0.15);
          float crest = smoothstep(0.09, 0.14, field.x);
          color += crest * 0.025 * vec3(0.5, 0.85, 0.85);
          float distanceFog = smoothstep(22.0, 85.0, distance(cameraPosition, worldPoint));
          if (diagnostic > 0.5) color = n * 0.5 + 0.5;
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          if (diagnostic < 0.5) gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, distanceFog);
          #include <colorspace_fragment>
        }`} />
  </mesh>;
}
