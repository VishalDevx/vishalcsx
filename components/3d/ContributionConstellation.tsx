'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const repos = [
  { name: 'taskmesh', stars: 12, color: '#3b82f6' },
  { name: 'flowforge', stars: 8, color: '#06b6d4' },
  { name: 'rgd-school', stars: 15, color: '#6366f1' },
  { name: 'portfolio', stars: 5, color: '#8b5cf6' },
  { name: 'dao-framework', stars: 10, color: '#22c55e' },
  { name: 'cli-tools', stars: 7, color: '#f59e0b' },
  { name: 'api-boilerplate', stars: 6, color: '#ef4444' },
  { name: 'learning-rust', stars: 9, color: '#ec4899' },
]

function Star({ position, color, size }: { position: [number, number, number]; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.1
      ref.current.rotation.y = clock.elapsedTime * 0.2
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.3} metalness={0.6} roughness={0.2} transparent opacity={0.8} />
    </mesh>
  )
}

function ConstellationLines() {
  const linePositions = useMemo(() => {
    const pts: number[] = []
    for (let i = 0; i < repos.length; i++) {
      for (let j = i + 1; j < repos.length; j++) {
        if (Math.random() > 0.6) continue
        const angle1 = (i / repos.length) * Math.PI * 2
        const angle2 = (j / repos.length) * Math.PI * 2
        const r1 = 2 + repos[i].stars * 0.1
        const r2 = 2 + repos[j].stars * 0.1
        pts.push(Math.cos(angle1) * r1, Math.sin(angle1) * r1 * 0.6, Math.sin(angle1) * 0.5)
        pts.push(Math.cos(angle2) * r2, Math.sin(angle2) * r2 * 0.6, Math.sin(angle2) * 0.5)
      }
    }
    return new Float32Array(pts)
  }, [])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} args={[linePositions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#222" transparent opacity={0.3} />
    </line>
  )
}

export function ContributionConstellation() {
  const starData = useMemo(
    () =>
      repos.map((r, i) => {
        const angle = (i / repos.length) * Math.PI * 2
        const radius = 2 + r.stars * 0.1
        return {
          position: [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.6, Math.sin(angle) * 0.5] as [number, number, number],
          color: r.color,
          size: 0.08 + r.stars * 0.01,
        }
      }),
    [],
  )

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 2]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.3} />
      {starData.map((s, i) => (
        <Star key={i} {...s} />
      ))}
      <ConstellationLines />
    </Canvas>
  )
}
