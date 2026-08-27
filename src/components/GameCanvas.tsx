"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { AdaptiveDpr, AdaptiveEvents, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import type { ComponentState, PublicWorldSnapshot, Vector3Tuple, WorldComponentDefinition } from "@/game/domain/types";
import { generateFortress } from "@/game/world/generator";
import { useSiegeStore } from "@/game/client/store";
import { trajectoryPreview } from "@/game/simulation/ballistics";
import { GameConfig } from "@/game/config";

const palette = {
  sky: "#07121f",
  stone: "#4d5a68",
  stoneLight: "#718090",
  stoneDark: "#293541",
  stoneCrack: "#17232c",
  wood: "#8f4d2a",
  metal: "#b6a16f",
  core: "#62e7d5",
  accent: "#ef9b55",
  terrain: "#203b42",
};

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
    camera.position.set(basePosition.x + Math.sin(elapsed * 0.08) * intensity, basePosition.y + Math.cos(elapsed * 0.11) * intensity * 0.7, basePosition.z + Math.sin(elapsed * 0.13) * intensity);
    camera.lookAt(target);
  });
  return null;
}

function Atmosphere() {
  return (
    <>
      <color attach="background" args={[palette.sky]} />
      <fog attach="fog" args={[palette.sky, 12, 28]} />
      <ambientLight intensity={1.5} color="#9bb3c5" />
      <directionalLight position={[-5, 10, 7]} intensity={3.4} color="#fff0d3" castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[7, 4, -5]} intensity={1.5} color="#4a8ca0" />
    </>
  );
}

function Terrain() {
  return (
    <group>
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[7.3, 8.1, 0.42, 8]} />
        <meshStandardMaterial color={palette.terrain} roughness={0.95} />
      </mesh>
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <cylinderGeometry args={[5.9, 6.4, 0.18, 8]} />
        <meshStandardMaterial color="#2d5155" roughness={0.86} />
      </mesh>
      <mesh position={[0, 0.1, 5.2]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.6, 7]} />
        <meshStandardMaterial color="#3f5d58" roughness={1} />
      </mesh>
      <mesh position={[0, 0.22, 5.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.24, 32]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Crenellations({ width, y, z, color }: { width: number; y: number; z: number; color: string }) {
  const count = Math.max(2, Math.round(width / 0.55));
  const positions = useMemo(() => Array.from({ length: count }, (_, index): Vector3Tuple => [(index / (count - 1) - 0.5) * width, y, z]), [count, width, y, z]);
  return (
    <Instances limit={count} range={count}>
      <boxGeometry args={[0.32, 0.42, 0.34]} />
      <meshStandardMaterial color={color} roughness={0.86} />
      {positions.map((position, index) => <Instance key={index} position={position} castShadow />)}
    </Instances>
  );
}

function RubbleFragments({ width, depth }: { width: number; depth: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const startedAt = useRef(0);
  const fragments = useMemo(() => [
    { position: [-width * 0.25, 0.22, -depth * 0.1] as Vector3Tuple, rotation: [0.3, 0.2, -0.22] as Vector3Tuple, scale: [0.55, 0.22, 0.48] as Vector3Tuple },
    { position: [width * 0.08, 0.38, depth * 0.08] as Vector3Tuple, rotation: [-0.1, 0.4, 0.3] as Vector3Tuple, scale: [0.35, 0.28, 0.32] as Vector3Tuple },
    { position: [width * 0.3, 0.18, -depth * 0.18] as Vector3Tuple, rotation: [0.16, -0.5, 0.15] as Vector3Tuple, scale: [0.28, 0.18, 0.25] as Vector3Tuple },
  ], [depth, width]);

  useEffect(() => { startedAt.current = performance.now(); }, []);
  useFrame(() => {
    if (!groupRef.current) return;
    const elapsed = performance.now() - startedAt.current;
    const impulse = Math.min(1, elapsed / 650);
    groupRef.current.position.y = Math.sin(impulse * Math.PI) * 0.14;
    groupRef.current.rotation.y = impulse * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Instances limit={fragments.length} range={fragments.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.stoneDark} roughness={1} />
        {fragments.map((fragment, index) => <Instance key={index} position={fragment.position} rotation={fragment.rotation} scale={fragment.scale} castShadow />)}
      </Instances>
    </group>
  );
}

function Banner({ position, accent }: { position: Vector3Tuple; accent: string }) {
  const flagRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (flagRef.current) flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.08;
  });
  return (
    <group position={position}>
      <mesh position={[0, -0.85, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 2.1, 8]} />
        <meshStandardMaterial color={palette.metal} metalness={0.75} roughness={0.3} />
      </mesh>
      <mesh ref={flagRef} position={[0.38, -0.3, 0]} castShadow>
        <planeGeometry args={[0.76, 0.52, 3, 1]} />
        <meshStandardMaterial color={accent} side={THREE.DoubleSide} roughness={0.72} />
      </mesh>
      <mesh position={[0.38, -0.3, 0.015]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#f8d6a3" />
      </mesh>
    </group>
  );
}

function Core({ state, position }: { state: ComponentState; position: Vector3Tuple }) {
  const coreRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (coreRef.current) {
      const pulse = state === "CRITICAL" || state === "DAMAGED" ? 1 + Math.sin(clock.elapsedTime * 5) * 0.08 : 1 + Math.sin(clock.elapsedTime * 2) * 0.04;
      coreRef.current.scale.setScalar(pulse);
    }
  });
  if (state === "DESTROYED") return null;
  return (
    <group position={position}>
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={palette.core} emissive={palette.core} emissiveIntensity={state === "CRITICAL" ? 5 : 2.4} roughness={0.18} metalness={0.12} />
      </mesh>
      <mesh scale={1.65}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshBasicMaterial color={palette.core} transparent opacity={0.09} />
      </mesh>
    </group>
  );
}

function FortressComponent({ definition, state }: { definition: WorldComponentDefinition; state: ComponentState }) {
  const [width, height, depth] = definition.size;
  const isDestroyed = state === "DESTROYED";
  const materialColor = definition.materialClass === "WOOD" ? palette.wood : definition.materialClass === "METAL" ? palette.metal : state === "CRITICAL" ? palette.stoneDark : state === "DAMAGED" ? palette.stoneLight : palette.stone;
  const position: Vector3Tuple = [definition.position[0], definition.position[1], definition.position[2]];

  if (definition.type === "CORE") {
    return (
      <RigidBody type="fixed" colliders="ball" position={position}>
        <Core state={state} position={[0, 0, 0]} />
      </RigidBody>
    );
  }

  if (isDestroyed) return (
    <group position={position}>
      <RubbleFragments width={width} depth={depth} />
    </group>
  );

  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <mesh castShadow receiveShadow>
        {definition.type === "TOWER" ? <cylinderGeometry args={[width / 1.65, width / 1.7, height, 8]} /> : <boxGeometry args={[width, height, depth]} />}
        <meshStandardMaterial color={materialColor} roughness={definition.materialClass === "METAL" ? 0.38 : 0.9} metalness={definition.materialClass === "METAL" ? 0.75 : 0.05} />
      </mesh>
      {(definition.type === "WALL" || definition.type === "KEEP") && <Crenellations width={width * 0.92} y={height / 2 + 0.2} z={0} color={materialColor} />}
      {definition.type === "TOWER" && <Crenellations width={width * 0.9} y={height / 2 + 0.2} z={0} color={materialColor} />}
      {definition.type === "GATE" && (
        <mesh position={[0, 0.18, depth / 2 + 0.03]}>
          <boxGeometry args={[width * 0.55, height * 0.62, 0.04]} />
          <meshStandardMaterial color="#3b2117" roughness={1} />
        </mesh>
      )}
      {definition.type === "CORE_ENCLOSURE" && (
        <mesh position={[0, 0, depth / 2 + 0.05]}>
          <boxGeometry args={[width * 0.68, height * 0.72, 0.05]} />
          <meshStandardMaterial color={palette.stoneDark} roughness={1} />
        </mesh>
      )}
    </RigidBody>
  );
}

function ThroneMarker() {
  return (
    <group position={[0, 1.3, -1.88]}>
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.12, 0.5]} />
        <meshStandardMaterial color={palette.metal} metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[0.65, 0.85, 0.12]} />
        <meshStandardMaterial color={palette.metal} metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.12, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function Launcher({ position }: { position: Vector3Tuple }) {
  const aim = useSiegeStore((state) => state.attackAim);
  return (
    <group position={position} rotation={[0, aim.yaw * 0.45, 0]}>
      <mesh position={[0, -0.45, 0]} castShadow>
        <boxGeometry args={[2.25, 0.32, 1.25]} />
        <meshStandardMaterial color="#26313d" metalness={0.55} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.08, -0.15]} rotation={[aim.elevation - 0.65 - (aim.isDragging ? aim.power * 0.08 : 0), 0, 0]} scale={aim.isDragging ? 1 + aim.power * 0.04 : 1} castShadow>
        <cylinderGeometry args={[0.23, 0.3, 2.55, 12]} />
        <meshStandardMaterial color="#9b6947" metalness={0.35} roughness={0.52} />
      </mesh>
      <mesh position={[0, -0.46, 0]} scale={aim.isDragging ? 1 + aim.power * 0.12 : 1}>
        <torusGeometry args={[0.78, 0.035, 8, 32]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function TrajectoryPreview({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const mode = useSiegeStore((state) => state.mode);
  const aim = useSiegeStore((state) => state.attackAim);
  const points = useMemo(() => trajectoryPreview(aim).map(([x, y, z]) => [x + definition.launcherPosition[0], y + definition.launcherPosition[1], z + definition.launcherPosition[2]] as Vector3Tuple), [aim, definition.launcherPosition]);
  if (mode !== "attack-aim") return null;
  return <group>{points.map((point, index) => <mesh key={index} position={point}><sphereGeometry args={[0.045 + index * 0.002, 8, 8]} /><meshBasicMaterial color={palette.accent} transparent opacity={0.52 - index * 0.025} /></mesh>)}</group>;
}

function playImpactSound() {
  if (typeof window === "undefined") return;
  const AudioContextConstructor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextConstructor) return;
  const context = new AudioContextConstructor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(120, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(48, context.currentTime + 0.18);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.2);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.21);
  oscillator.addEventListener("ended", () => { void context.close(); }, { once: true });
}

function Projectile({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const projectile = useSiegeStore((state) => state.projectile);
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const from = useMemo(() => new THREE.Vector3(...definition.launcherPosition), [definition.launcherPosition]);
  const target = useMemo(() => definition.components.find((component) => component.id === projectile?.targetId), [definition, projectile?.targetId]);
  const to = useMemo(() => target ? new THREE.Vector3(...target.position) : new THREE.Vector3(0, 1, 0), [target]);
  const position = useRef(new THREE.Vector3());
  const completeProjectile = useSiegeStore((state) => state.completeProjectile);

  useEffect(() => { progress.current = 0; }, [projectile?.commandKey]);
  useFrame((_, delta) => {
    if (!projectile || !meshRef.current) return;
    progress.current = Math.min(1, progress.current + Math.min(delta, 0.05) / 0.85);
    position.current.lerpVectors(from, to, progress.current);
    position.current.y += Math.sin(progress.current * Math.PI) * 2.1;
    meshRef.current.position.copy(position.current);
    if (progress.current >= 1) completeProjectile();
  });

  if (!projectile) return null;
  return (
    <mesh ref={meshRef} position={from} castShadow>
      <sphereGeometry args={[0.22, 12, 12]} />
      <meshStandardMaterial color="#c6a377" emissive="#5b321e" emissiveIntensity={0.5} roughness={0.7} />
    </mesh>
  );
}

function ImpactBurst({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const effect = useSiegeStore((state) => state.impactEffect);
  const clear = useSiegeStore((state) => state.clearImpactEffect);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const startedAt = useRef(0);
  const target = useMemo(() => definition.components.find((component) => component.id === effect?.targetId), [definition, effect?.targetId]);
  const targetPosition = useMemo(() => target ? new THREE.Vector3(...target.position) : new THREE.Vector3(0, 1, 0), [target]);

  useEffect(() => {
    if (!effect) return;
    startedAt.current = performance.now();
    playImpactSound();
  }, [effect]);

  useFrame(() => {
    if (!effect || !ringRef.current || !materialRef.current) return;
    const progress = Math.min(1, (performance.now() - startedAt.current) / 700);
    ringRef.current.scale.setScalar(0.4 + progress * 2.2);
    materialRef.current.opacity = (1 - progress) * 0.75;
    if (progress >= 1) clear(effect.key);
  });

  if (!effect) return null;
  return (
    <mesh ref={ringRef} position={targetPosition} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.22, 0.34, 24]} />
      <meshBasicMaterial ref={materialRef} color={palette.accent} transparent opacity={0.75} side={THREE.DoubleSide} />
    </mesh>
  );
}

function WorldScene({ snapshot }: { snapshot: PublicWorldSnapshot }) {
  const definition = useMemo(() => generateFortress(snapshot.worldSeed, snapshot.generatorVersion), [snapshot.worldSeed, snapshot.generatorVersion]);
  const states = new Map(snapshot.components.map((component) => [component.componentId, component.state]));
  return (
    <>
      <Atmosphere />
      <CameraRig />
      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} interpolate={false}>
        <Terrain />
        {definition.components.map((component) => <FortressComponent key={component.id} definition={component} state={states.get(component.id) ?? "INTACT"} />)}
        <ThroneMarker />
        <Banner position={[-2.25, 6.15, -0.75]} accent={palette.accent} />
        <Banner position={[2.25, 6.15, -0.75]} accent={palette.accent} />
        <Launcher position={definition.launcherPosition} />
        <TrajectoryPreview definition={definition} />
        <Projectile definition={definition} />
        <ImpactBurst definition={definition} />
      </Physics>
    </>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function GameCanvas() {
  const snapshot = useSiegeStore((state) => state.snapshot);
  const mode = useSiegeStore((state) => state.mode);
  const setAim = useSiegeStore((state) => state.setAim);
  const fireAttack = useSiegeStore((state) => state.fireAttack);
  const shellRef = useRef<HTMLDivElement>(null);
  const [reducedGraphics, setReducedGraphics] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedGraphics(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!snapshot) return null;

  function updateAim(clientX: number, clientY: number) {
    if (!shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    const horizontal = clamp((clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
    const vertical = clamp((clientY - rect.top) / rect.height, 0, 1);
    setAim({ yaw: horizontal * GameConfig.attack.maxYaw, elevation: clamp(GameConfig.attack.maxElevation - vertical * 0.34, GameConfig.attack.minElevation, GameConfig.attack.maxElevation), power: clamp(0.35 + Math.abs(horizontal) * 0.32 + (1 - vertical) * 0.28, GameConfig.attack.minPower, GameConfig.attack.maxPower) });
  }

  return (
    <div
      ref={shellRef}
      className="canvas-shell"
      onPointerDown={(event) => {
        if (mode !== "attack-aim" || (event.target as HTMLElement).closest("button")) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        setAim({ isDragging: true });
        updateAim(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => { if (mode === "attack-aim" && event.currentTarget.hasPointerCapture(event.pointerId)) updateAim(event.clientX, event.clientY); }}
      onPointerUp={(event) => {
        if (mode !== "attack-aim" || !event.currentTarget.hasPointerCapture(event.pointerId)) return;
        event.currentTarget.releasePointerCapture(event.pointerId);
        setAim({ isDragging: false });
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8);
        void fireAttack();
      }}
      onPointerCancel={() => setAim({ isDragging: false })}
      onLostPointerCapture={() => setAim({ isDragging: false })}
    >
      <Canvas
        shadows={!reducedGraphics}
        dpr={reducedGraphics ? [0.75, 1] : [1, 1.6]}
        camera={{ position: [10.8, 7.1, 11.6], fov: 37, near: 0.1, far: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.shadowMap.type = THREE.PCFShadowMap;
          window.__THREE_GAME_DIAGNOSTICS__ = {
            renderer: gl.info,
            engine: "@react-three/rapier",
            fixedTimestep: 1 / 60,
          };
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <WorldScene snapshot={snapshot} />
      </Canvas>
    </div>
  );
}
