'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface SkillNode {
  id: string
  label: string
  category: string
  radius: number
  color: string
}

const skillData: SkillNode[] = [
  { id: 'ts', label: 'TypeScript', category: 'Language', radius: 0.4, color: '#3178c6' },
  { id: 'node', label: 'Node.js', category: 'Runtime', radius: 0.35, color: '#339933' },
  { id: 'react', label: 'React', category: 'Frontend', radius: 0.35, color: '#61dafb' },
  { id: 'next', label: 'Next.js', category: 'Frontend', radius: 0.35, color: '#000000' },
  { id: 'pg', label: 'PostgreSQL', category: 'Database', radius: 0.3, color: '#4169e1' },
  { id: 'redis', label: 'Redis', category: 'Database', radius: 0.25, color: '#dc382d' },
  { id: 'docker', label: 'Docker', category: 'DevOps', radius: 0.25, color: '#2496ed' },
  { id: 'rust', label: 'Rust', category: 'Language', radius: 0.3, color: '#dea584' },
  { id: 'ai-ml', label: 'AI/ML', category: 'AI/ML', radius: 0.25, color: '#06b6d4' },
  { id: 'prisma', label: 'Prisma', category: 'Database', radius: 0.2, color: '#2d3748' },
  { id: 'express', label: 'Express', category: 'Backend', radius: 0.2, color: '#68a063' },
  { id: 'redis-cache', label: 'Redis Cache', category: 'Backend', radius: 0.2, color: '#dc382d' },
]

const edges: [string, string][] = [
  ['ts', 'node'], ['ts', 'react'], ['react', 'next'],
  ['node', 'express'], ['node', 'pg'], ['pg', 'prisma'],
  ['node', 'redis'], ['redis', 'redis-cache'], ['node', 'docker'],
  ['ts', 'rust'],
]

function SkillsGraphScene() {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState<string | null>(null)
  const timeRef = useRef(0)

  const positions = useMemo(() => {
    const pos: Record<string, [number, number, number]> = {}
    const angleStep = (Math.PI * 2) / skillData.length
    skillData.forEach((s, i) => {
      pos[s.id] = [Math.cos(angleStep * i) * 3, Math.sin(angleStep * i * 0.7) * 2, Math.sin(angleStep * i) * 1.5]
    })
    return pos
  }, [])

  useFrame((state, delta) => {
    timeRef.current += delta * 0.3
    if (groupRef.current) {
      groupRef.current.rotation.y = timeRef.current * 0.1
      groupRef.current.rotation.x = Math.sin(timeRef.current * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {edges.map(([from, to], i) => {
        const f = positions[from]
        const t = positions[to]
        if (!f || !t) return null
        const fromVec = new THREE.Vector3(...f)
        const toVec = new THREE.Vector3(...t)
        const mid = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5)
        const dir = new THREE.Vector3().subVectors(toVec, fromVec)
        const len = dir.length()
        dir.normalize()
        return (
          <mesh
            key={`edge-${i}`}
            position={mid}
            quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}
          >
            <cylinderGeometry args={[0.01, 0.01, len, 4]} />
            <meshBasicMaterial color="#222" transparent opacity={0.4} />
          </mesh>
        )
      })}
      {skillData.map((skill) => {
        const pos = positions[skill.id]
        if (!pos) return null
        const isHovered = hovered === skill.id
        return (
          <group key={skill.id}>
            <mesh
              position={pos}
              onPointerOver={() => setHovered(skill.id)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[isHovered ? skill.radius * 1.5 : skill.radius, 16, 16]} />
              <meshPhysicalMaterial
                color={skill.color}
                emissive={skill.color}
                emissiveIntensity={isHovered ? 0.5 : 0.1}
                metalness={0.3}
                roughness={0.4}
                transparent
                opacity={0.85}
              />
            </mesh>
            <Text
              position={[pos[0], pos[1] - skill.radius - 0.3, pos[2]]}
              fontSize={0.1}
              color="#666"
              anchorX="center"
              anchorY="top"
            >
              {skill.label}
            </Text>
            {isHovered && (
              <Html position={[pos[0], pos[1] + skill.radius + 0.3, pos[2]]} center>
                <div
                  style={{
                    background: '#0d0d0d',
                    border: '1px solid #222',
                    borderRadius: 8,
                    padding: '4px 10px',
                    fontSize: 10,
                    color: '#a0a0a0',
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: 'nowrap',
                  }}
                >
                  {skill.category}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

export function SkillsGraph() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <SkillsGraphScene />
      <ambientLight intensity={0.5} />
    </Canvas>
  )
}
