"use client";

import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  Float,
  Lightformer,
  Text,
  Html,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { Bloom, EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import { Route, Link, useLocation } from "wouter";
import { Bomb, Knot, Rig, Torus } from "./article";

useGLTF.preload("/bomb-gp.glb");

export const Content = () => (
  <>
    <Canvas
      eventSource={document.getElementById("root") as HTMLElement}
      eventPrefix='client'
      shadows
      camera={{ position: [0, 0, 20], fov: 50 }}
    >
      <color attach='background' args={["#e0e0e0"]} />
      <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
      <Status />
      <Float floatIntensity={2}>
        <Route path='/'>
          <Knot />
        </Route>
        <Route path='/torus'>
          <Torus />
        </Route>
        <Route path='/bomb'>
          <Bomb scale={0.7} />
        </Route>
      </Float>
      <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
      <Environment preset='city'>
        <Lightformer
          intensity={8}
          position={[10, 5, 0]}
          scale={[10, 50, 1]}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </Environment>
      <EffectComposer enableNormalPass={false} >
        <N8AO aoRadius={1} intensity={2} />
        <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
        <TiltShift2 blur={0.2} />
      </EffectComposer>
      <Rig />
    </Canvas>
    <div className='nav'>
      <Link to='/'>knot</Link>
      <Link to='/torus'>torus</Link>
      <Link to='/bomb'>bomb</Link>
    </div>
  </>
);

function Status() {
  const [loc] = useLocation();
  const text = loc === "/" ? "/knot" : loc;
  return (
    <Text fontSize={14} letterSpacing={-0.025} color='black' position={[0, 0, -10]}>
      {text}
      <Html style={{ color: "transparent", fontSize: "33.5em" }} transform>
        {text}
      </Html>
    </Text>
  );
}
