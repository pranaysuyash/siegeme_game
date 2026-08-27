"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { ComponentState, PublicWorldSnapshot, Vector3Tuple, WorldComponentDefinition } from "@/game/domain/types";
import { generateFortress } from "@/game/world/generator";
import { useSiegeStore } from "@/game/client/store";

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
  useFrame(() => camera.lookAt(0, 2.1, 0));
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
  return (
    <group>
      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index} position={[(index / (count - 1) - 0.5) * width, y, z]} castShadow>
          <boxGeometry args={[0.32, 0.42, 0.34]} />
          <meshStandardMaterial color={color} roughness={0.86} />
        </mesh>
      ))}
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
      <mesh position={[0, 0.2, 0]} rotation={[0.3, 0.2, -0.22]} castShadow>
        <boxGeometry args={[width * 0.8, 0.22, depth * 0.7]} />
        <meshStandardMaterial color={palette.stoneCrack} roughness={1} />
      </mesh>
      <mesh position={[0.25, 0.38, 0.05]} rotation={[-0.1, 0.4, 0.3]} castShadow>
        <boxGeometry args={[0.35, 0.28, 0.32]} />
        <meshStandardMaterial color={palette.stoneDark} roughness={1} />
      </mesh>
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
      <mesh position={[0, -0.08, -0.15]} rotation={[aim.elevation - 0.65, 0, 0]} castShadow>
        <cylinderGeometry args={[0.23, 0.3, 2.55, 12]} />
        <meshStandardMaterial color="#9b6947" metalness={0.35} roughness={0.52} />
      </mesh>
      <mesh position={[0, -0.46, 0]}>
        <torusGeometry args={[0.78, 0.035, 8, 32]} />
        <meshBasicMaterial color={palette.accent} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Projectile({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const projectile = useSiegeStore((state) => state.projectile);
  if (!projectile) return null;
  const from = new THREE.Vector3(...definition.launcherPosition);
  const target = definition.components.find((component) => component.id === projectile.targetId);
  const to = target ? new THREE.Vector3(...target.position) : new THREE.Vector3(0, 1, 0);
  const position = from.lerp(to, projectile.progress);
  position.y += Math.sin(projectile.progress * Math.PI) * 2.1;
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[0.22, 12, 12]} />
      <meshStandardMaterial color="#c6a377" emissive="#5b321e" emissiveIntensity={0.5} roughness={0.7} />
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
        <Projectile definition={definition} />
      </Physics>
    </>
  );
}

function SimulationClock() {
  useFrame((_, delta) => {
    useSiegeStore.getState().advanceTime(Math.min(delta, 0.05) * 1000);
  });
  return null;
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

  if (!snapshot) return null;

  function updateAim(clientX: number, clientY: number) {
    if (!shellRef.current) return;
    const rect = shellRef.current.getBoundingClientRect();
    const horizontal = clamp((clientX - (rect.left + rect.width / 2)) / (rect.width / 2), -1, 1);
    const vertical = clamp((clientY - rect.top) / rect.height, 0, 1);
    setAim({ yaw: horizontal * 0.72, elevation: clamp(0.86 - vertical * 0.34, 0.5, 0.86), power: clamp(0.35 + Math.abs(horizontal) * 0.32 + (1 - vertical) * 0.28, 0.25, 1) });
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
        void fireAttack();
      }}
      onPointerCancel={() => setAim({ isDragging: false })}
      onLostPointerCapture={() => setAim({ isDragging: false })}
    >
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [10.8, 7.1, 11.6], fov: 37, near: 0.1, far: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          window.__THREE_GAME_DIAGNOSTICS__ = {
            renderer: gl.info,
            engine: "@react-three/rapier",
            fixedTimestep: 1 / 60,
          };
        }}
      >
        <SimulationClock />
        <WorldScene snapshot={snapshot} />
      </Canvas>
    </div>
  );
}
