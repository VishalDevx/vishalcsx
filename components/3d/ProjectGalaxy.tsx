'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

const planets = [
  { label: 'School ERP', color: '#3b82f6', orbit: 2.5, speed: 0.15, size: 0.3 },
  { label: 'FlowForge', color: '#06b6d4', orbit: 3.2, speed: 0.1, size: 0.25 },
  { label: 'TaskMesh', color: '#6366f1', orbit: 4, speed: 0.08, size: 0.35 },
  { label: 'DAO Framework', color: '#8b5cf6', orbit: 3.8, speed: 0.12, size: 0.2 },
  { label: 'Open Source', color: '#22c55e', orbit: 2.8, speed: 0.18, size: 0.15 },
]

function Planet({ data, index }: { data: typeof planets[0]; index: number }) {
  const groupRef = useRef<THREE.Group>(null!)
  const angleRef = useRef(index * 1.5)

  useFrame((_, delta) => {
    angleRef.current += delta * data.speed
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * data.orbit
      groupRef.current.position.z = Math.sin(angleRef.current) * data.orbit
      groupRef.current.position.y = Math.sin(angleRef.current * 0.7) * 0.5
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[data.size, 16, 16]} />
        <meshPhysicalMaterial color={data.color} emissive={data.color} emissiveIntensity={0.2} metalness={0.4} roughness={0.3} />
      </mesh>
      <Text position={[0, -data.size - 0.2, 0]} fontSize={0.08} color="#666" anchorX="center" anchorY="top">
        {data.label}
      </Text>
    </group>
  )
}

function OrbitRing({ radius }: { radius: number }) {
  const [pts, positions] = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    const positions = new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))
    return [pts, positions] as const
  }, [radius])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={pts.length} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#222" transparent opacity={0.3} />
    </line>
  )
}

export function ProjectGalaxy() {
  return (
    <Canvas camera={{ position: [0, 3, 6], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
      {planets.map((p, i) => (
        <Planet key={p.label} data={p} index={i} />
      ))}
      {planets.map((p) => (
        <OrbitRing key={`ring-${p.label}`} radius={p.orbit} />
      ))}
    </Canvas>
  )
}
