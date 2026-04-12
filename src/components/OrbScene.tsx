"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Group } from "three";

type RingProps = {
  count?: number;
};

function OrbitingRings({ count = 3 }: RingProps) {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) {
      return;
    }

    group.current.rotation.z = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.22;
  });

  const rings = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        radius: 1.35 + index * 0.4,
        y: -0.2 + index * 0.26,
        speed: 0.15 + index * 0.08
      })),
    [count]
  );

  return (
    <group ref={group}>
      {rings.map((ring, index) => (
        <mesh
          key={`${ring.radius}-${index}`}
          rotation={[Math.PI / 2, 0, index * 0.2]}
          position={[0, ring.y, 0]}
        >
          <torusGeometry args={[ring.radius, 0.026, 16, 120]} />
          <meshStandardMaterial color="#0E6F6A" roughness={0.35} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}

function CoreOrb() {
  const orb = useRef<Group>(null);

  useFrame((state) => {
    if (!orb.current) {
      return;
    }

    orb.current.rotation.y = state.clock.elapsedTime * 0.22;
    orb.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.08;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.9}>
      <group ref={orb}>
        <mesh>
          <icosahedronGeometry args={[1.22, 11]} />
          <MeshDistortMaterial
            color="#C56B32"
            roughness={0.18}
            metalness={0.25}
            distort={0.35}
            speed={2.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.6], fov: 48 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} color="#fce8cf" />
      <directionalLight position={[-3, -3, -2]} intensity={0.8} color="#7fe4de" />
      <CoreOrb />
      <OrbitingRings count={4} />
    </Canvas>
  );
}
