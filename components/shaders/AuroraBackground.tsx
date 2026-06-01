'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

#define PI 3.14159265359

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = vUv;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect * 2.0;

  float t = uTime * 0.05;

  float n1 = fbm(p * 1.5 + t * 0.5);
  float n2 = fbm(p * 2.0 - t * 0.3 + vec2(1.2, 0.8));
  float n3 = fbm(p * 3.0 + t * 0.7 + vec2(2.5, 1.3));

  vec3 col1 = vec3(0.02, 0.05, 0.12);
  vec3 col2 = vec3(0.05, 0.15, 0.35);
  vec3 col3 = vec3(0.1, 0.3, 0.6);
  vec3 col4 = vec3(0.05, 0.2, 0.4);

  float mask = smoothstep(-0.3, 0.7, p.y + 0.6 * n1 + 0.3 * n2 - 0.5);

  float stripe1 = sin(p.x * 3.0 + t + n2 * 0.5) * 0.5 + 0.5;
  float stripe2 = cos(p.y * 2.0 - t * 0.7 + n1) * 0.5 + 0.5;
  float pattern = (stripe1 * 0.4 + stripe2 * 0.3 + n3 * 0.3);

  float edge = 1.0 - abs(p.y + 0.5 * n1 + 0.3 * n2);
  edge = smoothstep(0.0, 0.8, edge);

  vec3 color = mix(col1, col2, mask);
  color = mix(color, col3, pattern * edge * 0.5);
  color = mix(color, col4, n3 * edge * 0.3);

  float glow = exp(-abs(p.y + 0.5 * n1) * 4.0);
  color += vec3(0.1, 0.2, 0.5) * glow * 0.2;

  float horizon = smoothstep(0.0, 0.1, p.y + 0.5);
  color *= horizon;

  gl_FragColor = vec4(color, 1.0);
}
`

function AuroraScene() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    }),
    [],
  )

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <AuroraScene />
      </Canvas>
    </div>
  )
}
