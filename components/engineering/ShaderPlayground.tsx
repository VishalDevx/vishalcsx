'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const shaderPresets = [
  {
    name: 'Plasma',
    frag: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv;
        float t = uTime * 0.3;
        float c1 = sin(uv.x * 10.0 + t) * cos(uv.y * 8.0 + t * 0.7);
        float c2 = sin((uv.x + uv.y) * 6.0 + t * 0.5);
        float c3 = cos(uv.y * 12.0 - t * 0.9) * sin(uv.x * 10.0 + t);
        vec3 col = vec3(
          0.5 + 0.5 * sin(c1 + t),
          0.5 + 0.5 * sin(c2 + t * 1.3),
          0.5 + 0.5 * cos(c3 + t * 0.8)
        );
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
  {
    name: 'Ripples',
    frag: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 uv = vUv * 3.0;
        float d = length(uv - 1.5);
        float wave = sin(d * 15.0 - uTime * 2.0) * 0.5 + 0.5;
        float ripple = sin(d * 30.0 - uTime * 3.0) * 0.25;
        vec3 col = mix(
          vec3(0.05, 0.05, 0.1),
          vec3(0.23, 0.5, 0.96),
          wave + ripple
        );
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
  {
    name: 'Mandelbrot',
    frag: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec2 uv = (vUv - 0.5) * 3.0;
        vec2 z = vec2(0.0);
        vec2 c = uv + vec2(sin(uTime * 0.1) * 0.1, cos(uTime * 0.1) * 0.1);
        int iter = 0;
        for (int i = 0; i < 64; i++) {
          z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
          if (length(z) > 2.0) break;
          iter = i;
        }
        float t = float(iter) / 64.0;
        vec3 col = mix(vec3(0.0), vec3(0.23, 0.5, 0.96), t);
        col += vec3(0.2, 0.1, 0.3) * (1.0 - t);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
]

function ShaderPlane({ frag }: { frag: string }) {
  const ref = useRef<THREE.Mesh>(null!)
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={frag}
      />
    </mesh>
  )
}

export function ShaderPlayground() {
  const [active, setActive] = useState(0)

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border p-1" style={{ borderColor: 'var(--border-color)' }}>
          {shaderPresets.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setActive(i)}
              className="rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all"
              style={{
                fontFamily: "'DM Mono', monospace",
                backgroundColor: active === i ? 'var(--accent-bg)' : 'transparent',
                color: active === i ? 'var(--accent-text)' : 'var(--text-secondary)',
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <div className="overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border-color)', height: 500 }}>
        <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} gl={{ alpha: true }}>
          <ShaderPlane frag={shaderPresets[active].frag} />
        </Canvas>
      </div>
    </div>
  )
}
