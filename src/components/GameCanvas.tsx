"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { AdaptiveDpr, AdaptiveEvents, ContactShadows, Environment, Html, Instance, Instances, Lightformer } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import type { ComponentState, PublicWorldSnapshot, Vector3Tuple, WorldComponentDefinition } from "@/game/domain/types";
import { generateFortress } from "@/game/world/generator";
import { useSiegeStore } from "@/game/client/store";
import { powerOrbPosition, trajectoryPreview } from "@/game/simulation/ballistics";
import { GameConfig } from "@/game/config";
import { cameraPresetFor, easeOutHandoff, flightShakeOffset, type CameraPresentationMode } from "@/game/camera";
import { presentationTargetKind, presentationTargetPosition } from "@/game/presentation/targets";
import { flightPosition } from "@/game/presentation/flight";
import { PRESENTATION_TIMING } from "@/game/presentation/timing";
import { playBattleSound } from "@/game/client/audio";
import { debrisTransform } from "@/game/presentation/debris";
import { graphicsPolicyFor } from "@/game/client/graphics-policy";
import { BLOOM_CONFIG, postProcessingPolicyFor } from "@/game/client/postprocessing";

import { battlePalette as palette, BattlefieldTerrain, MasonryDetails, GateDetails } from "./BattlefieldScenery";

function CameraRig({ motionReduced }: { motionReduced: boolean }) {
  const { camera } = useThree();
  const mode = useSiegeStore((state) => state.mode);
  const phase = useSiegeStore((state) => state.snapshot?.phase ?? "ACTIVE");
  const projectileKey = useSiegeStore((state) => state.projectile?.commandKey ?? null);
  const [{ width: viewportWidth, height: viewportHeight }, setViewport] = useState({ width: 1280, height: 800 });
  const transitionStartedAt = useRef(0);
  const startPosition = useRef(new THREE.Vector3());
  const startQuaternion = useRef(new THREE.Quaternion());
  const targetPosition = useRef(new THREE.Vector3());
  const targetQuaternion = useRef(new THREE.Quaternion());
  const targetLookAt = useRef(new THREE.Vector3());
  const transitionDuration = useRef(420);
  const previousProjectileKey = useRef<string | null>(null);
  const perspectiveRef = useRef(camera as THREE.PerspectiveCamera);

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const presentationMode = (mode === "empty" ? "spectator" : mode) as CameraPresentationMode;
    const preset = cameraPresetFor({ mode: presentationMode, phase, viewportWidth, viewportHeight });
    startPosition.current.copy(camera.position);
    startQuaternion.current.copy(camera.quaternion);
    targetPosition.current.fromArray(preset.position);
    targetLookAt.current.fromArray(preset.target);
    const orientation = new THREE.PerspectiveCamera();
    orientation.position.copy(targetPosition.current);
    orientation.lookAt(targetLookAt.current);
    targetQuaternion.current.copy(orientation.quaternion);
    transitionDuration.current = motionReduced ? 0 : preset.transitionMs;
    transitionStartedAt.current = performance.now();
    previousProjectileKey.current = projectileKey;
  }, [camera, mode, motionReduced, phase, projectileKey, viewportWidth, viewportHeight]);

  useFrame(() => {
    const perspective = perspectiveRef.current;
    const elapsed = Math.max(0, performance.now() - transitionStartedAt.current);
    const progress = transitionDuration.current === 0 ? 1 : easeOutHandoff(elapsed / transitionDuration.current);
    perspective.position.lerpVectors(startPosition.current, targetPosition.current, progress);
    perspective.quaternion.slerpQuaternions(startQuaternion.current, targetQuaternion.current, progress);
    perspective.fov += (cameraPresetFor({ mode: (mode === "empty" ? "spectator" : mode) as CameraPresentationMode, phase, viewportWidth, viewportHeight }).fov - perspective.fov) * Math.min(1, progress * 0.22 + 0.04);
    perspective.updateProjectionMatrix();

    if (projectileKey && previousProjectileKey.current === projectileKey && mode === "attack-flight" && !motionReduced) {
      const flightElapsed = Math.max(0, performance.now() - transitionStartedAt.current);
      const [x, y, z] = flightShakeOffset(flightElapsed, true);
      perspective.position.x += x;
      perspective.position.y += y;
      perspective.position.z += z;
    }
  });
  return null;
}

function Atmosphere({ reducedGraphics, motionReduced }: { reducedGraphics: boolean; motionReduced: boolean }) {
  return (
    <>
      <color attach="background" args={[palette.sky]} />
      <fog attach="fog" args={[palette.sky, 25, 85]} />
      <hemisphereLight intensity={1.3} color="#b2c9d0" groundColor="#343629" />
      <directionalLight position={[-8, 14, 9]} intensity={3.2} color="#ffe1b2" castShadow={!reducedGraphics} shadow-mapSize={[2048, 2048]} shadow-camera-left={-11} shadow-camera-right={11} shadow-camera-top={11} shadow-camera-bottom={-11} shadow-normalBias={0.04} shadow-bias={-0.0001} />
      <directionalLight position={[6, 6, -8]} intensity={2.1} color="#70bfcf" />
      {!reducedGraphics && !motionReduced && (
        <Environment frames={1} resolution={256} environmentIntensity={0.34}>
          <Lightformer form="rect" intensity={1.6} color="#ffd7a6" position={[-4, 6, 4]} scale={[5, 3, 1]} />
          <Lightformer form="rect" intensity={0.9} color="#61c6c7" position={[4, 3, -4]} scale={[4, 2, 1]} />
          <Lightformer form="ring" intensity={0.55} color="#b9f3e8" position={[0, 5, 0]} scale={2.5} />
        </Environment>
      )}
    </>
  );
}

function GraphicsPolish({ reducedGraphics, motionReduced }: { reducedGraphics: boolean; motionReduced: boolean }) {
  const [fpsDegraded, setFpsDegraded] = useState(false);
  const slowSeconds = useRef(0);
  const impactEffect = useSiegeStore((state) => state.impactEffect);
  const isCoreHit = impactEffect?.targetId === "core:main";

  useFrame((_, delta) => {
    if (reducedGraphics || motionReduced || fpsDegraded || document.hidden) return;
    const currentFps = 1 / Math.max(0.001, delta);
    if (currentFps < 42) {
      slowSeconds.current += Math.min(delta, 0.1);
      if (slowSeconds.current > 3) { // Elapsed time, independent of the slow frame rate.
        setFpsDegraded(true);
      }
    } else {
      slowSeconds.current = Math.max(0, slowSeconds.current - delta);
    }
  });

  const postProcessing = useMemo(() => postProcessingPolicyFor(reducedGraphics || fpsDegraded, motionReduced), [reducedGraphics, fpsDegraded, motionReduced]);
  useEffect(() => {
    if (window.__THREE_GAME_DIAGNOSTICS__) {
      window.__THREE_GAME_DIAGNOSTICS__.postProcessing = { ...postProcessing, bloomThreshold: BLOOM_CONFIG.luminanceThreshold, bloomIntensity: BLOOM_CONFIG.intensity, normalPass: BLOOM_CONFIG.enableNormalPass };
    }
  }, [postProcessing]);
  if (!postProcessing.enabled) return null;
  return (
    <>
      <ContactShadows position={[0, 0.04, 0]} opacity={0.3} scale={15} blur={2.4} far={5.5} resolution={256} frames={1} />
      <EffectComposer enableNormalPass={BLOOM_CONFIG.enableNormalPass} multisampling={BLOOM_CONFIG.multisampling}>
        <Bloom luminanceThreshold={isCoreHit ? 0.6 : BLOOM_CONFIG.luminanceThreshold} luminanceSmoothing={BLOOM_CONFIG.luminanceSmoothing} intensity={isCoreHit ? 0.9 : BLOOM_CONFIG.intensity} mipmapBlur={BLOOM_CONFIG.mipmapBlur} />
      </EffectComposer>
    </>
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

function RubbleFragments({ width, depth, motionReduced }: { width: number; depth: number; motionReduced: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentRefs = useRef<Array<THREE.Object3D | null>>([]);
  const startedAt = useRef(0);
  const fragments = useMemo(() => [
    { position: [-width * 0.25, 0.22, -depth * 0.1] as Vector3Tuple, rotation: [0.3, 0.2, -0.22] as Vector3Tuple, velocity: [-0.7, 1.3, -0.25] as Vector3Tuple, scale: [0.55, 0.22, 0.48] as Vector3Tuple },
    { position: [width * 0.08, 0.38, depth * 0.08] as Vector3Tuple, rotation: [-0.1, 0.4, 0.3] as Vector3Tuple, velocity: [0.25, 1.65, 0.5] as Vector3Tuple, scale: [0.35, 0.28, 0.32] as Vector3Tuple },
    { position: [width * 0.3, 0.18, -depth * 0.18] as Vector3Tuple, rotation: [0.16, -0.5, 0.15] as Vector3Tuple, velocity: [0.8, 1.05, -0.35] as Vector3Tuple, scale: [0.28, 0.18, 0.25] as Vector3Tuple },
  ], [depth, width]);

  useEffect(() => { startedAt.current = performance.now(); }, []);
  useFrame(() => {
    if (!groupRef.current || motionReduced) return;
    const elapsedSeconds = Math.min(1, Math.max(0, performance.now() - startedAt.current) / PRESENTATION_TIMING.rubbleMs);
    for (const [index, fragment] of fragments.entries()) {
      const object = fragmentRefs.current[index];
      if (!object) continue;
      const transform = debrisTransform({ ...fragment, angularVelocity: [1.8, 2.2, 1.5] }, elapsedSeconds);
      object.position.fromArray(transform.position);
      object.rotation.fromArray(transform.rotation);
    }
  });

  return (
    <group ref={groupRef}>
      <Instances limit={fragments.length} range={fragments.length}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.stoneDark} roughness={1} />
        {fragments.map((fragment, index) => <Instance key={index} ref={(node) => { fragmentRefs.current[index] = node as THREE.Object3D | null; }} position={fragment.position} rotation={fragment.rotation} scale={fragment.scale} castShadow />)}
      </Instances>
    </group>
  );
}

function Banner({ position, accent, motionReduced }: { position: Vector3Tuple; accent: string; motionReduced: boolean }) {
  const flagRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (flagRef.current && !motionReduced) flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.08;
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

function Core({ state, position, motionReduced }: { state: ComponentState; position: Vector3Tuple; motionReduced: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shieldRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (coreRef.current) {
      const pulse = motionReduced ? 1 : state === "CRITICAL" || state === "DAMAGED" ? 1 + Math.sin(clock.elapsedTime * 5) * 0.08 : 1 + Math.sin(clock.elapsedTime * 2) * 0.04;
      coreRef.current.scale.setScalar(pulse);
    }
    if (shieldRef.current && !motionReduced) {
      shieldRef.current.rotation.y = clock.elapsedTime * 0.4;
      shieldRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.6) * 0.12;
      const shieldScale = 1.65 + Math.sin(clock.elapsedTime * 3) * 0.03;
      shieldRef.current.scale.setScalar(shieldScale);
    }
  });
  if (state === "DESTROYED") return null;
  return (
    <group position={position}>
      <mesh ref={coreRef} castShadow>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color={palette.core} emissive={palette.core} emissiveIntensity={state === "CRITICAL" ? 2.4 : 1.1} roughness={0.18} metalness={0.12} />
      </mesh>
      <mesh ref={shieldRef} scale={1.65}>
        <sphereGeometry args={[0.55, 16, 16]} />
        <meshStandardMaterial color={palette.core} emissive={palette.core} emissiveIntensity={0.8} transparent opacity={0.16} roughness={0.1} metalness={0.8} wireframe={state === "CRITICAL"} />
      </mesh>
    </group>
  );
}

function FortressComponent({ definition, state, motionReduced }: { definition: WorldComponentDefinition; state: ComponentState; motionReduced: boolean }) {
  const [width, height, depth] = definition.size;
  const isDestroyed = state === "DESTROYED";
  const isMetal = definition.materialClass === "METAL" || definition.type === "THRONE";
  const isWood = definition.materialClass === "WOOD" || definition.type === "GATE";
  const materialColor = isWood ? palette.wood : isMetal ? palette.metal : state === "CRITICAL" ? palette.stoneDark : state === "DAMAGED" ? "#68736d" : palette.stone;
  const position: Vector3Tuple = [definition.position[0], definition.position[1], definition.position[2]];

  if (definition.type === "CORE") {
    return (
      <RigidBody type="fixed" colliders="ball" position={position}>
      <Core state={state} position={[0, 0, 0]} motionReduced={motionReduced} />
      </RigidBody>
    );
  }

  if (isDestroyed) return (
    <group position={[position[0], 0.68, position[2]]}>
      <RubbleFragments width={width} depth={depth} motionReduced={motionReduced} />
    </group>
  );

  return (
    <RigidBody type="fixed" colliders="cuboid" position={position}>
      <mesh castShadow receiveShadow matrixAutoUpdate={false} onUpdate={(self) => self.updateMatrix()}>
        {definition.type === "TOWER" ? <cylinderGeometry args={[width / 1.65, width / 1.7, height, 8]} /> : <boxGeometry args={[width, height, depth]} />}
        <meshStandardMaterial color={materialColor} roughness={isMetal ? 0.38 : 0.9} metalness={isMetal ? 0.75 : 0.05} />
      </mesh>
      {(definition.type === "WALL" || definition.type === "KEEP") && <Crenellations width={width * 0.92} y={height / 2 + 0.2} z={0} color={materialColor} />}
      <MasonryDetails definition={definition} state={state} />
      {definition.type === "GATE" && <GateDetails size={definition.size} />}
      {definition.type === "CORE_ENCLOSURE" && (
        <mesh position={[0, 0, depth / 2 + 0.05]} matrixAutoUpdate={false} onUpdate={(self) => self.updateMatrix()}>
          <boxGeometry args={[width * 0.68, height * 0.72, 0.05]} />
          <meshStandardMaterial color={palette.stoneDark} roughness={1} />
        </mesh>
      )}
    </RigidBody>
  );
}

function ThroneMarker() {
  const ruler = useSiegeStore((state) => state.snapshot?.ruler);
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
      {ruler && (
        <Html position={[0, 1.6, 0]} center distanceFactor={16} style={{ pointerEvents: "none" }}>
          <div style={{
            background: "rgba(7, 18, 28, 0.72)",
            border: "1px solid rgba(239, 155, 85, 0.4)",
            borderRadius: "999px",
            padding: "2px 8px",
            color: "#ef9b55",
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
            userSelect: "none"
          }}>
            👑 {ruler.displayName}
          </div>
        </Html>
      )}
    </group>
  );
}

function Launcher({ position, motionReduced }: { position: Vector3Tuple; motionReduced: boolean }) {
  const aim = useSiegeStore((state) => state.attackAim);
  const projectileKey = useSiegeStore((state) => state.projectile?.commandKey ?? null);
  const barrelRef = useRef<THREE.Group>(null);
  const muzzleRef = useRef<THREE.Mesh>(null);
  const firedAt = useRef(0);
  useEffect(() => { if (projectileKey) { firedAt.current = performance.now(); playBattleSound("launch"); } }, [projectileKey]);
  useFrame(() => {
    if (!barrelRef.current || !muzzleRef.current) return;
    const pulse = !projectileKey || motionReduced ? 0 : Math.max(0, 1 - (performance.now() - firedAt.current) / PRESENTATION_TIMING.launcherRecoilMs);
    barrelRef.current.position.z = pulse * 0.28;
    muzzleRef.current.visible = pulse > 0;
    muzzleRef.current.scale.setScalar(0.8 + pulse * 0.7);
  });
  return <group position={position} rotation={[0, -aim.yaw, 0]}>
    <mesh position={[0, -0.25, 0.18]} castShadow><boxGeometry args={[1.15, 0.27, 1.65]} /><meshStandardMaterial color="#504337" roughness={0.85} /></mesh>
    {[-0.64, 0.64].map((x) => <group key={x} position={[x, -0.15, 0.22]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow><cylinderGeometry args={[0.42, 0.42, 0.19, 12]} /><meshStandardMaterial color="#382e28" roughness={0.9} /></mesh>
      <mesh><cylinderGeometry args={[0.33, 0.33, 0.2, 12]} /><meshStandardMaterial color={palette.metal} metalness={0.6} roughness={0.55} /></mesh>
      <mesh><cylinderGeometry args={[0.12, 0.12, 0.23, 8]} /><meshStandardMaterial color="#293239" metalness={0.8} roughness={0.4} /></mesh>
    </group>)}
    <group rotation={[aim.elevation, 0, 0]}>
      <group ref={barrelRef}>
        <mesh position={[0, 0, 0.4]} castShadow><sphereGeometry args={[0.32, 16, 12]} /><meshStandardMaterial color="#29383e" metalness={0.8} roughness={0.32} /></mesh>
        <mesh position={[0, 0, -0.28]} rotation={[Math.PI / 2, 0, 0]} castShadow><cylinderGeometry args={[0.25, 0.32, 1.6, 16]} /><meshStandardMaterial color="#35464a" metalness={0.8} roughness={0.28} /></mesh>
        {[-1.07, -0.65, 0.23].map((z) => <mesh key={z} position={[0, 0, z]}><torusGeometry args={[z === 0.23 ? 0.32 : 0.265, 0.045, 8, 20]} /><meshStandardMaterial color={palette.metal} metalness={0.75} roughness={0.35} /></mesh>)}
        <mesh position={[0, 0, -1.085]}><circleGeometry args={[0.22, 20]} /><meshBasicMaterial color="#081014" side={THREE.DoubleSide} /></mesh>
        <mesh ref={muzzleRef} position={[0, 0, -1.3]} visible={false}><sphereGeometry args={[0.27, 8, 8]} /><meshBasicMaterial color="#ffe1a3" transparent opacity={0.9} /></mesh>
      </group>
    </group>
  </group>;
}

function TrajectoryPreview({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const mode = useSiegeStore((state) => state.mode);
  const aim = useSiegeStore((state) => state.attackAim);
  const points = useMemo(() => trajectoryPreview(aim).map(([x, y, z]) => [x + definition.launcherPosition[0], y + definition.launcherPosition[1], z + definition.launcherPosition[2]] as Vector3Tuple), [aim, definition.launcherPosition]);
  if (mode !== "attack-aim") return null;
  return <group>{points.map((point, index) => <mesh key={index} position={point}><sphereGeometry args={[0.045 + index * 0.002, 8, 8]} /><meshBasicMaterial color={palette.accent} transparent opacity={0.52 - index * 0.025} /></mesh>)}</group>;
}

function DefensePlacementPreview({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const mode = useSiegeStore((state) => state.mode);
  const placement = useSiegeStore((state) => state.defensePlacement);
  const activeDefenseSlots = useSiegeStore((state) => state.snapshot?.activeDefenses ?? []);
  if (mode !== "defense-placement" || !placement) return null;
  return <group>
    {definition.defenseSlots.map((slot) => {
      const active = activeDefenseSlots.some((defense) => defense.slotId === slot.id);
      const selected = slot.id === placement.slotId;
      return <mesh key={slot.id} position={slot.position}>
        <boxGeometry args={[slot.size[0], slot.size[1], Math.max(0.06, slot.size[2])]} />
        <meshBasicMaterial color={active ? "#40535b" : selected ? palette.accent : palette.core} transparent opacity={active ? 0.08 : selected ? 0.28 : 0.1} wireframe={!selected} />
      </mesh>;
    })}
  </group>;
}

function PowerOrb({ definition, worldVersion, siegeCharge, motionReduced }: { definition: ReturnType<typeof generateFortress>; worldVersion: number; siegeCharge: number; motionReduced: boolean }) {
  const orbRef = useRef<THREE.Group>(null);
  const position = powerOrbPosition(definition, worldVersion);
  const charge = Math.min(100, Math.max(0, siegeCharge)) / 100;
  useFrame(({ clock }) => {
    if (!orbRef.current) return;
    if (!motionReduced) {
      orbRef.current.rotation.y = clock.elapsedTime * 1.7;
      orbRef.current.rotation.x = Math.sin(clock.elapsedTime * 1.1) * 0.18;
      orbRef.current.scale.setScalar(0.92 + charge * 0.16 + Math.sin(clock.elapsedTime * 3.2) * (0.012 + charge * 0.02));
    }
  });
  return <group ref={orbRef} position={position}>
    <mesh>
      <icosahedronGeometry args={[0.32, 1]} />
      <meshStandardMaterial color={palette.accent} emissive={palette.accent} emissiveIntensity={1.1 + charge * 1.8} roughness={0.22} metalness={0.2} />
    </mesh>
    <mesh rotation={[Math.PI / 3, 0, 0]}>
      <torusGeometry args={[0.54, 0.025, 6, 32]} />
      <meshBasicMaterial color={palette.accent} />
    </mesh>
    <mesh scale={1.7 + charge * 0.45}>
      <sphereGeometry args={[0.32, 12, 12]} />
      <meshBasicMaterial color={palette.accent} transparent opacity={0.1 + charge * 0.1} />
    </mesh>
  </group>;
}

function DefenseCues({ definition, defenses }: { definition: ReturnType<typeof generateFortress>; defenses: PublicWorldSnapshot["activeDefenses"] }) {
  return <group>
    {defenses.map((defense) => {
      const slot = definition.defenseSlots.find((candidate) => candidate.id === defense.slotId);
      if (!slot) return null;
      const [width, height] = slot.size;
      const shield = defense.type === "SHIELD";
      const strength = defense.hp / Math.max(1, defense.maxHp);
      return <group key={defense.id} position={slot.position}>
        {shield ? <>
          <mesh><planeGeometry args={[width, height]} /><meshBasicMaterial color="#8dd6e8" transparent opacity={0.08 + strength * 0.1} side={THREE.DoubleSide} depthWrite={false} /></mesh>
          {[-1, 1].map((side) => <group key={side}>
            <mesh position={[side * width / 2, 0, 0]}><boxGeometry args={[0.035, height, 0.035]} /><meshBasicMaterial color="#8dd6e8" /></mesh>
            <mesh position={[0, side * height / 2, 0]}><boxGeometry args={[width, 0.035, 0.035]} /><meshBasicMaterial color="#8dd6e8" /></mesh>
          </group>)}
          <mesh rotation={[0, 0, Math.PI / 4]}><ringGeometry args={[0.18, 0.21, 4]} /><meshBasicMaterial color="#b4f5f0" side={THREE.DoubleSide} /></mesh>
        </> : <>
          {[-1, 1].map((side) => <mesh key={side} rotation={[0, 0, side * Math.atan2(width, height)]} castShadow>
            <boxGeometry args={[0.14, Math.hypot(width, height), 0.18]} /><meshStandardMaterial color={palette.metal} metalness={0.6} roughness={0.45} />
          </mesh>)}
          <mesh><sphereGeometry args={[0.12, 8, 6]} /><meshStandardMaterial color="#ffe1a3" emissive={palette.accent} emissiveIntensity={0.5} /></mesh>
        </>}
      </group>;
    })}
  </group>;
}

function Projectile({ definition }: { definition: ReturnType<typeof generateFortress> }) {
  const projectile = useSiegeStore((state) => state.projectile);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const meshRef = useRef<THREE.Group>(null);
  const startedAt = useRef(0);
  const from = useMemo(() => new THREE.Vector3(...definition.launcherPosition), [definition.launcherPosition]);
  const visualTarget = useMemo(() => {
    if (projectile?.impactPoint) return new THREE.Vector3(...projectile.impactPoint);
    const targetPosition = presentationTargetPosition(definition, snapshot, projectile?.targetId);
    if (targetPosition) return new THREE.Vector3(...targetPosition);
    if (projectile?.targetId === "miss") {
      const preview = trajectoryPreview(projectile.aim, 12, 0.8).at(-1);
      return preview ? new THREE.Vector3(preview[0] + from.x, preview[1] + from.y, preview[2] + from.z) : null;
    }
    return null;
  }, [definition, from, projectile, snapshot]);
  const completeProjectile = useSiegeStore((state) => state.completeProjectile);

  useEffect(() => { startedAt.current = performance.now(); }, [projectile?.commandKey]);
  useEffect(() => {
    if (!projectile) return;
    const timer = window.setTimeout(completeProjectile, projectile.flightSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [completeProjectile, projectile]);
  useFrame(() => {
    if (!projectile || !visualTarget || !meshRef.current) return;
    const progress = Math.min(1, (performance.now() - startedAt.current) / (projectile.flightSeconds * 1000));
    meshRef.current.position.fromArray(flightPosition(definition.launcherPosition, visualTarget.toArray(), projectile.aim, progress));
  });

  if (!projectile || !visualTarget) return null;
  const isBreaker = projectile.projectileType === "BREAKER";
  return (
    <group ref={meshRef} position={from}>
      <mesh castShadow>
        <sphereGeometry args={[isBreaker ? 0.28 : 0.22, 12, 12]} />
        <meshStandardMaterial color={isBreaker ? palette.accent : "#c6a377"} emissive={isBreaker ? palette.accent : "#5b321e"} emissiveIntensity={isBreaker ? 2.4 : 0.5} roughness={0.7} />
      </mesh>
      {isBreaker && (
        <mesh scale={1.45}>
          <sphereGeometry args={[0.26, 8, 8]} />
          <meshBasicMaterial color={palette.accent} transparent opacity={0.25} wireframe />
        </mesh>
      )}
    </group>
  );
}

function ImpactBurst({ definition, motionReduced }: { definition: ReturnType<typeof generateFortress>; motionReduced: boolean }) {
  const effect = useSiegeStore((state) => state.impactEffect);
  const snapshot = useSiegeStore((state) => state.snapshot);
  const clear = useSiegeStore((state) => state.clearImpactEffect);
  const ringRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const startedAt = useRef(0);
  const targetPosition = useMemo(() => {
    if (effect?.impactPoint) return new THREE.Vector3(...effect.impactPoint);
    const position = presentationTargetPosition(definition, snapshot, effect?.targetId);
    return position ? new THREE.Vector3(...position) : null;
  }, [definition, effect, snapshot]);

  useEffect(() => {
    if (!effect) return;
    startedAt.current = performance.now();
    playBattleSound(effect.targetId === "core:main" ? "core" : effect.targetId === "power-orb" || effect.targetId.startsWith("defense:") ? "energy" : "stone");
  }, [effect]);

  useFrame(() => {
    if (!effect) return;
    if (motionReduced) {
      clear(effect.key);
      return;
    }
    if (!startedAt.current) {
      startedAt.current = performance.now();
      return;
    }
    const progress = Math.min(1, (performance.now() - startedAt.current) / PRESENTATION_TIMING.impactMs);
    if (!ringRef.current || !materialRef.current) {
      if (progress >= 1) clear(effect.key);
      return;
    }
    ringRef.current.scale.setScalar(0.4 + progress * 2.2);
    materialRef.current.opacity = (1 - progress) * 0.75;
    if (progress >= 1) clear(effect.key);
  });

  if (!effect || !targetPosition) return null;
  const targetKind = presentationTargetKind(effect.targetId);
  const impactColor = effect.projectileType === "BREAKER" ? palette.accent : targetKind === "power-orb" ? palette.accent : targetKind === "defense" ? "#8dd6e8" : targetKind === "miss" ? palette.stoneLight : palette.accent;
  const damageText = effect.defenseType === "SHIELD" ? "SHIELDED" : effect.defenseType === "BRACE" ? `BRACED −${effect.damage}` : effect.targetId === "core:main" ? `CRIT −${effect.damage}` : targetKind === "miss" ? "MISS" : `−${effect.damage}`;

  return (
    <group position={targetPosition}>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.34, 24]} />
        <meshStandardMaterial ref={materialRef} color={impactColor} emissive={impactColor} emissiveIntensity={4} transparent opacity={0.75} side={THREE.DoubleSide} roughness={0.35} metalness={0.1} />
      </mesh>
      <Html position={[0, 0.65, 0]} center distanceFactor={14} style={{ pointerEvents: "none" }}>
        <div style={{
          color: effect.targetId === "core:main" ? "#ff765b" : effect.projectileType === "BREAKER" ? "#ef9b55" : "#eff4f2",
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "0.06em",
          textShadow: "0 2px 10px rgba(0,0,0,0.8), 0 0 16px rgba(239, 155, 85, 0.6)",
          whiteSpace: "nowrap",
          userSelect: "none"
        }}>
          {damageText}
        </div>
      </Html>
    </group>
  );
}

function WorldScene({ snapshot, motionReduced, reducedGraphics }: { snapshot: PublicWorldSnapshot; motionReduced: boolean; reducedGraphics: boolean }) {
  const definition = useMemo(() => generateFortress(snapshot.worldSeed, snapshot.generatorVersion), [snapshot.worldSeed, snapshot.generatorVersion]);
  const states = new Map(snapshot.components.map((component) => [component.componentId, component.state]));
  return (
    <>
      <Atmosphere reducedGraphics={reducedGraphics} motionReduced={motionReduced} />
      <CameraRig motionReduced={motionReduced} />
      <Physics gravity={[0, -9.81, 0]} timeStep={1 / 60} interpolate={false}>
        <BattlefieldTerrain reducedGraphics={reducedGraphics} motionReduced={motionReduced} />
        {definition.components.map((component) => <FortressComponent key={component.id} definition={component} state={states.get(component.id) ?? "INTACT"} motionReduced={motionReduced} />)}
        <ThroneMarker />
        {states.get("tower:left") !== "DESTROYED" && <Banner position={[-4.1, 7, -0.25]} accent={palette.accent} motionReduced={motionReduced} />}
        {states.get("tower:right") !== "DESTROYED" && <Banner position={[4.1, 7, -0.25]} accent={palette.accent} motionReduced={motionReduced} />}
        <Launcher position={definition.launcherPosition} motionReduced={motionReduced} />
        <PowerOrb definition={definition} worldVersion={snapshot.worldVersion} siegeCharge={snapshot.reign?.siegeCharge ?? 0} motionReduced={motionReduced} />
        <DefenseCues definition={definition} defenses={snapshot.activeDefenses} />
        <TrajectoryPreview definition={definition} />
        <DefensePlacementPreview definition={definition} />
        <Projectile definition={definition} />
      <ImpactBurst definition={definition} motionReduced={motionReduced} />
      </Physics>
      <GraphicsPolish reducedGraphics={reducedGraphics} motionReduced={motionReduced} />
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
  const rendererCleanupRef = useRef<(() => void) | null>(null);
  const [motionReduced, setMotionReduced] = useState(false);
  const [graphicsPolicy, setGraphicsPolicy] = useState(() => graphicsPolicyFor(1280, null));
  const [contextLost, setContextLost] = useState(false);
  const [benchmarkMode] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("benchmark") === "1");
  const effectiveReducedGraphics = graphicsPolicy.reduced || benchmarkMode;
  const postProcessing = postProcessingPolicyFor(effectiveReducedGraphics, motionReduced);

  useEffect(() => {
    const cancelAim = () => setAim({ isDragging: false });
    window.addEventListener("blur", cancelAim);
    document.addEventListener("visibilitychange", cancelAim);
    return () => {
      window.removeEventListener("blur", cancelAim);
      document.removeEventListener("visibilitychange", cancelAim);
    };
  }, [setAim]);

  useEffect(() => {
    const localHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (!localHost) return;
    window.__SIEGE_TEST_SET_AIM__ = (aim) => setAim(aim);
    window.__SIEGE_TEST_FIRE_ATTACK__ = () => { void fireAttack(); };
    return () => {
      delete window.__SIEGE_TEST_SET_AIM__;
      delete window.__SIEGE_TEST_FIRE_ATTACK__;
    };
  }, [fireAttack, setAim]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const device = navigator as Navigator & { deviceMemory?: number };
    const update = () => setGraphicsPolicy(graphicsPolicyFor(window.innerWidth, device.deviceMemory));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (window.__THREE_GAME_DIAGNOSTICS__) {
      window.__THREE_GAME_DIAGNOSTICS__.graphics = { ...graphicsPolicy, reduced: effectiveReducedGraphics, reason: benchmarkMode ? "benchmark" : graphicsPolicy.reason };
    }
  }, [benchmarkMode, effectiveReducedGraphics, graphicsPolicy]);

  useEffect(() => () => rendererCleanupRef.current?.(), []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (mode !== "attack-aim" || useSiegeStore.getState().activeSheet) return;
      const state = useSiegeStore.getState();
      if (event.key === "Escape" && state.attackAim.isDragging) {
        event.preventDefault(); setAim({ isDragging: false }); return;
      }
      if ((event.target as HTMLElement).closest("input, textarea, select, button, [contenteditable]")) return;
      const step = event.shiftKey ? 0.08 : 0.035;
      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") { event.preventDefault(); setAim({ yaw: clamp(state.attackAim.yaw - step, GameConfig.attack.minYaw, GameConfig.attack.maxYaw) }); }
      else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") { event.preventDefault(); setAim({ yaw: clamp(state.attackAim.yaw + step, GameConfig.attack.minYaw, GameConfig.attack.maxYaw) }); }
      else if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") { event.preventDefault(); setAim({ elevation: clamp(state.attackAim.elevation + step * 0.5, GameConfig.attack.minElevation, GameConfig.attack.maxElevation) }); }
      else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") { event.preventDefault(); setAim({ elevation: clamp(state.attackAim.elevation - step * 0.5, GameConfig.attack.minElevation, GameConfig.attack.maxElevation) }); }
      else if (event.key === "+" || event.key === "=") { event.preventDefault(); setAim({ power: clamp(state.attackAim.power + step, GameConfig.attack.minPower, GameConfig.attack.maxPower) }); }
      else if (event.key === "-" || event.key === "_") { event.preventDefault(); setAim({ power: clamp(state.attackAim.power - step, GameConfig.attack.minPower, GameConfig.attack.maxPower) }); }
      else if (event.key === "Escape") { event.preventDefault(); setAim({ isDragging: false }); }
      else if ((event.key === " " || event.key === "Enter") && !event.repeat) { event.preventDefault(); void fireAttack(); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [fireAttack, mode, setAim]);

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
      style={{ touchAction: "none", userSelect: "none", WebkitUserSelect: "none" }}
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
        const wasDragging = useSiegeStore.getState().attackAim.isDragging;
        setAim({ isDragging: false });
        if (!wasDragging) return;
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(8);
        void fireAttack();
      }}
      onPointerCancel={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        setAim({ isDragging: false });
      }}
      onLostPointerCapture={() => setAim({ isDragging: false })}
    >
      <Canvas
        shadows={!effectiveReducedGraphics}
        dpr={graphicsPolicy.reduced ? [0.75, 1] : [1, 1.6]}
        camera={{ position: [10.8, 7.1, 11.6], fov: 37, near: 0.1, far: 180 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl, camera }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.05;
          gl.shadowMap.type = THREE.PCFShadowMap;
          rendererCleanupRef.current?.();
          const canvas = gl.domElement;
          const onContextLost = (event: Event) => {
            event.preventDefault();
            setAim({ isDragging: false });
            setContextLost(true);
            if (window.__THREE_GAME_DIAGNOSTICS__) window.__THREE_GAME_DIAGNOSTICS__.contextLost = true;
          };
          const onContextRestored = () => {
            setContextLost(false);
            if (window.__THREE_GAME_DIAGNOSTICS__) window.__THREE_GAME_DIAGNOSTICS__.contextLost = false;
          };
          canvas.addEventListener("webglcontextlost", onContextLost, false);
          canvas.addEventListener("webglcontextrestored", onContextRestored, false);
          rendererCleanupRef.current = () => {
            canvas.removeEventListener("webglcontextlost", onContextLost);
            canvas.removeEventListener("webglcontextrestored", onContextRestored);
          };
          window.__THREE_GAME_DIAGNOSTICS__ = {
            renderer: gl.info,
            engine: "@react-three/rapier",
            fixedTimestep: 1 / 60,
            graphics: { ...graphicsPolicy, reduced: effectiveReducedGraphics, reason: benchmarkMode ? "benchmark" : graphicsPolicy.reason },
            postProcessing: { ...postProcessing, bloomThreshold: BLOOM_CONFIG.luminanceThreshold, bloomIntensity: BLOOM_CONFIG.intensity, normalPass: BLOOM_CONFIG.enableNormalPass },
            contextLost: false,
            camera: camera as unknown as { position: { x: number; y: number; z: number }; quaternion: { x: number; y: number; z: number; w: number }; fov: number },
          };
        }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
          <WorldScene snapshot={snapshot} motionReduced={motionReduced} reducedGraphics={effectiveReducedGraphics} />
      </Canvas>
      {contextLost && <div className="graphics-warning" role="alert"><strong>Graphics paused</strong><span>The browser interrupted the 3D context. Restore the tab or reload the siege to reconnect the scene.</span><button onClick={() => window.location.reload()}>Reload scene ↻</button></div>}
    </div>
  );
}
