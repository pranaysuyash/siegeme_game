"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { CoastalWater } from "./CoastalWater";
import type { ComponentState, Vector3Tuple, WorldComponentDefinition } from "@/game/domain/types";

/** A shared art vocabulary, downstream of the immutable gameplay geometry. */
export const battlePalette = {
  sky: "#101f2b", stone: "#89918c", stoneLight: "#aab1a3",
  stoneDark: "#424c50", stoneCrack: "#263236", wood: "#704730",
  metal: "#bd9561", core: "#62e7d5", accent: "#e8a45d", terrain: "#344944",
};

function noise(index: number, seed = 1) {
  const n = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function BattlefieldTerrain({ reducedGraphics, motionReduced }: { reducedGraphics: boolean; motionReduced: boolean }) {
  const rocks = useMemo(() => Array.from({ length: 44 }, (_, i) => {
    const angle = i / 44 * Math.PI * 2;
    const radius = 6.7 + noise(i) * 0.7;
    return { position: [Math.cos(angle) * radius, -0.95 - noise(i, 2) * 0.7, Math.sin(angle) * radius * 0.91] as Vector3Tuple,
      scale: [1 + noise(i, 3), 1.6 + noise(i, 4) * 1.4, 1.2] as Vector3Tuple, rotation: [noise(i) * 0.3, angle, 0.1] as Vector3Tuple,
      color: i % 3 === 0 ? "#4c5e5d" : i % 3 === 1 ? "#34454d" : "#293b45" };
  }), []);
  const stones = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    position: [(i % 3 - 1) * 0.68, 0.14, 3.3 + Math.floor(i / 3) * 0.47] as Vector3Tuple,
    color: i % 4 === 0 ? "#a19374" : "#65726a",
  })), []);
  return <group>
    <mesh position={[0, -0.7, 0]} receiveShadow>
      <cylinderGeometry args={[7.3, 6.7, 1.6, 12]} />
      <meshStandardMaterial color="#334750" roughness={1} flatShading />
    </mesh>
    <mesh position={[0, -0.05, 0]} receiveShadow>
      <cylinderGeometry args={[7.45, 7.25, 0.22, 12]} />
      <meshStandardMaterial color={battlePalette.terrain} roughness={0.95} flatShading />
    </mesh>
    <Instances limit={44} range={reducedGraphics ? 22 : 44} castShadow receiveShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial roughness={0.92} flatShading />
      {(reducedGraphics ? rocks.filter((_, i) => i % 2 === 0) : rocks).map((rock, i) => <Instance key={i} {...rock} />)}
    </Instances>
    <Instances limit={30} range={30} receiveShadow>
      <boxGeometry args={[0.62, 0.12, 0.41]} />
      <meshStandardMaterial roughness={0.95} />
      {stones.map((stone, i) => <Instance key={i} {...stone} />)}
    </Instances>
    <mesh position={[0, -0.1, 8.1]} receiveShadow>
      <cylinderGeometry args={[1.75, 2.1, 0.65, 8]} />
      <meshStandardMaterial color="#4b5755" roughness={0.95} />
    </mesh>
    <mesh position={[0, 0.24, 8.1]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.37, 1.4, 48]} />
      <meshBasicMaterial color={battlePalette.metal} transparent opacity={0.5} />
    </mesh>
    <CoastalWater reducedGraphics={reducedGraphics} motionReduced={motionReduced} />
    <Instances limit={16} range={reducedGraphics ? 8 : 16}>
      <coneGeometry args={[1, 1, 5]} />
      <meshStandardMaterial color="#263d49" roughness={1} flatShading />
      {Array.from({ length: 16 }, (_, i) => <Instance key={i} position={[-50 + i * 7, -3.3, -38 - noise(i) * 10]} scale={[6 + noise(i) * 7, 3 + noise(i, 2) * 5, 5]} rotation={[0, noise(i) * 3, 0]} />)}
    </Instances>
    <Brazier position={[-1.6, 0.1, 4.9]} motionReduced={motionReduced} />
    <Brazier position={[1.6, 0.1, 4.9]} motionReduced={motionReduced} />
  </group>;
}

function Brazier({ position, motionReduced }: { position: Vector3Tuple; motionReduced: boolean }) {
  const flame = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (flame.current && !motionReduced) flame.current.scale.y = 1 + Math.sin(clock.elapsedTime * 9 + position[0]) * 0.15;
  });
  return <group position={position}>
    <mesh position={[0, 0.32, 0]} castShadow><cylinderGeometry args={[0.07, 0.15, 0.65, 6]} /><meshStandardMaterial color="#292d30" metalness={0.75} roughness={0.5} /></mesh>
    <mesh position={[0, 0.68, 0]}><cylinderGeometry args={[0.25, 0.1, 0.18, 8]} /><meshStandardMaterial color={battlePalette.metal} metalness={0.7} roughness={0.5} /></mesh>
    <mesh ref={flame} position={[0, 0.9, 0]}><octahedronGeometry args={[0.19, 0]} /><meshStandardMaterial color="#ffdf9d" emissive="#ffb251" emissiveIntensity={3} toneMapped={false} /></mesh>
    <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><circleGeometry args={[0.65, 24]} /><meshBasicMaterial color="#ef9b55" transparent opacity={0.07} depthWrite={false} /></mesh>
  </group>;
}

/** Geometry is attached to its owning component so destruction removes it. */
export function MasonryDetails({ definition, state }: { definition: WorldComponentDefinition; state: ComponentState }) {
  const [width, height, depth] = definition.size;
  const tower = definition.type === "TOWER";
  const masonry = ["WALL", "KEEP", "TOWER", "CORE_ENCLOSURE", "FOUNDATION"].includes(definition.type);
  const trim = state === "CRITICAL" ? "#59605a" : "#a6aa97";
  const seams = useMemo(() => {
    const parts: Array<{ position: Vector3Tuple; scale: Vector3Tuple }> = [];
    if (!masonry || tower) return parts;
    const rows = Math.floor(height / 0.46);
    for (let row = 1; row <= rows; row++) {
      const y = -height / 2 + row * 0.46;
      parts.push({ position: [0, y, depth / 2 + 0.007], scale: [width, 0.018, 0.014] });
      parts.push({ position: [width / 2 + 0.007, y, 0], scale: [0.014, 0.018, depth] });
      for (let col = 0; col < Math.floor(width / 0.8); col++) {
        const x = -width / 2 + col * 0.8 + (row % 2 ? 0.4 : 0.8);
        if (x < width / 2) parts.push({ position: [x, y - 0.23, depth / 2 + 0.008], scale: [0.015, 0.44, 0.015] });
      }
    }
    return parts;
  }, [depth, height, masonry, tower, width]);
  if (!masonry) return null;
  return <group>
    {seams.length > 0 && <Instances limit={seams.length} range={seams.length}>
      <boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#4b5754" roughness={1} />
      {seams.map((seam, i) => <Instance key={i} {...seam} />)}
    </Instances>}
    {tower ? <>
      {[-height / 2 + 0.22, height / 2 - 0.12, height / 2 - 0.45].map((y, i) => <mesh key={i} position={[0, y, 0]} castShadow><cylinderGeometry args={[width / 1.58, width / 1.6, i === 0 ? 0.32 : 0.14, 8]} /><meshStandardMaterial color={trim} roughness={0.9} /></mesh>)}
      {Array.from({ length: 8 }, (_, i) => { const a = i / 8 * Math.PI * 2; return <mesh key={i} position={[Math.sin(a) * width * 0.51, height / 2 + 0.2, Math.cos(a) * width * 0.51]} rotation={[0, a, 0]} castShadow><boxGeometry args={[0.38, 0.48, 0.32]} /><meshStandardMaterial color={trim} roughness={0.9} /></mesh>; })}
      {[-0.6, 0.95].map((y) => <group key={y}>
        <mesh position={[0, y, width / 1.65 + 0.012]}><boxGeometry args={[0.16, 0.56, 0.035]} /><meshStandardMaterial color="#172b32" /></mesh>
        <mesh position={[width / 1.65 + 0.012, y, 0]}><boxGeometry args={[0.035, 0.56, 0.16]} /><meshStandardMaterial color="#172b32" /></mesh>
      </group>)}
    </> : <>
      <mesh position={[0, height / 2 + 0.025, 0]} castShadow><boxGeometry args={[width + 0.13, 0.18, depth + 0.12]} /><meshStandardMaterial color={trim} roughness={0.9} /></mesh>
      <mesh position={[0, -height / 2 + 0.12, 0]}><boxGeometry args={[width + 0.09, 0.24, depth + 0.09]} /><meshStandardMaterial color={battlePalette.stoneDark} roughness={1} /></mesh>
    </>}
    {definition.type === "KEEP" && [-1.7, 1.7].map((x) => <group key={x}>
      <mesh position={[x, -0.12, depth / 2 + 0.05]} castShadow><boxGeometry args={[0.22, height - 0.3, 0.2]} /><meshStandardMaterial color={trim} roughness={0.9} /></mesh>
      <mesh position={[x * 0.68, 1.42, depth / 2 + 0.01]}><boxGeometry args={[0.2, 0.7, 0.03]} /><meshStandardMaterial color="#263738" /></mesh>
    </group>)}
    {(state === "DAMAGED" || state === "CRITICAL") && <group position={[0, 0, depth / 2 + 0.032]}>
      {[-0.18, 0.16, -0.08].map((x, i) => <mesh key={i} position={[x, 0.55 - i * 0.45, 0]} rotation={[0, 0, i % 2 ? -0.65 : 0.45]}><boxGeometry args={[state === "CRITICAL" ? 0.065 : 0.04, 0.62, 0.022]} /><meshBasicMaterial color={battlePalette.stoneCrack} /></mesh>)}
    </group>}
  </group>;
}

export function GateDetails({ size }: { size: Vector3Tuple }) {
  const [w, h, d] = size;
  return <group position={[0, 0, d / 2 + 0.035]}>
    {Array.from({ length: 7 }, (_, i) => <mesh key={i} position={[(i - 3) * w * 0.12, 0, 0]}><boxGeometry args={[w * 0.105, h * 0.88, 0.06]} /><meshStandardMaterial color={i % 2 ? "#644831" : "#795139"} roughness={0.95} /></mesh>)}
    {[-0.43, 0.43].map((y) => <mesh key={y} position={[0, y, 0.05]}><boxGeometry args={[w * 0.91, 0.075, 0.06]} /><meshStandardMaterial color="#303b3e" metalness={0.7} roughness={0.4} /></mesh>)}
    <mesh position={[0, 0, 0.1]}><torusGeometry args={[0.105, 0.024, 6, 12]} /><meshStandardMaterial color={battlePalette.metal} metalness={0.8} roughness={0.35} /></mesh>
  </group>;
}
