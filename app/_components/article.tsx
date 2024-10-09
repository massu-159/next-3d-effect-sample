"use client";

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, state.pointer.y * 3.5, 15 + Math.cos(state.pointer.x) * 10],
      0.2,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null
}

// export const Drop = (props) => (
//   <mesh>
//     <sphereGeometry args={[1, 64, 64]} />
//     <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
//   </mesh>
// );

export const Torus = () => (
  <mesh receiveShadow castShadow >
    <torusGeometry args={[4, 1.2, 128, 64]} />
    <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
  </mesh>
);

export const Knot = () => (
  <mesh receiveShadow castShadow >
    <torusKnotGeometry args={[3, 1, 256, 32]} />
    <MeshTransmissionMaterial backside backsideThickness={5} thickness={2} />
  </mesh>
);

export function Bomb({ scale }: { scale: number }) {
  const { nodes } = useGLTF("/bomb-gp.glb");
  const geometry = (nodes.Little_Boy_Little_Boy_Material_0 as THREE.Mesh).geometry;

  return (
    <mesh receiveShadow castShadow geometry={geometry} scale={scale} >
      <MeshTransmissionMaterial backside backsideThickness={10} thickness={5} />
    </mesh>
  );
}
