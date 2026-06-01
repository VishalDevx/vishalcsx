'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const milestones = [
  { year: '2022', label: 'Started Engineering', y: 2.5 },
  { year: '2023', label: 'First Production System', y: 1.5 },
  { year: '2024', label: 'Open Source Contributions', y: 0.5 },
  { year: '2025', label: 'System Design Deep Dive', y: -0.5 },
  { year: '2026', label: 'Distributed Systems & AI', y: -1.5 },
]

function River() {
  const [points, positions] = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 4
      pts.push(new THREE.Vector3(Math.sin(t) * 0.3, 2.5 - (i / 100) * 4, Math.cos(t * 0.5) * 0.2))
    }
    const positions = new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))
    return [pts, positions] as const
  }, [])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </line>
  )
}

function Milestone({ data }: { data: typeof milestones[0] }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.5 + data.y) * 0.1
      ref.current.scale.setScalar(s)
    }
  })
  return (
    <group position={[0, data.y, 0]}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
    </group>
  )
}

function Particles() {
  const count = 40
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      const arr = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] -= 0.003
        if (arr[i * 3 + 1] < -2.5) arr[i * 3 + 1] = 2.5
      }
      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#3b82f6" transparent opacity={0.3} sizeAttenuation />
    </points>
  )
}

export function TimelineRiver() {
  return (
    <Canvas camera={{ position: [1.5, 0, 3], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <River />
      {milestones.map((m) => (
        <Milestone key={m.year} data={m} />
      ))}
      <Particles />
    </Canvas>
  )
}
