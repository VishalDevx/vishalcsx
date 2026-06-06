'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface NodeData {
  id: string
  label: string
  position: [number, number, number]
  color: string
  description?: string
}

const nodes: NodeData[] = [
  { id: 'api', label: 'API Gateway', position: [2, 1.5, 0], color: '#00F5FF', description: 'Request routing, auth, rate limiting' },
  { id: 'cache', label: 'Cache (Redis)', position: [3.5, 0, 0], color: '#00F5FF', description: 'In-memory caching layer' },
  { id: 'db', label: 'Database Cluster', position: [5, 1.5, 0], color: '#00F5FF', description: 'PostgreSQL with read replicas' },
]

const edges: { from: number; to: number }[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 },
]

function NetworkNode({ data, index, hovered, setHovered }: { data: NodeData; index: number; hovered: number | null; setHovered: (i: number | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const pulseRef = useRef(0)

  useFrame(() => {
    pulseRef.current += 0.02
    if (meshRef.current) {
      const scale = hovered === index ? 1.3 : 1 + Math.sin(pulseRef.current) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      <mesh
        ref={meshRef}
        position={data.position}
        onPointerOver={() => setHovered(index)}
        onPointerOut={() => setHovered(null)}
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshPhysicalMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered === index ? 0.5 : 0.2}
          transparent
          opacity={0.7}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <Text
        position={[data.position[0], data.position[1] - 0.5, data.position[2]]}
        fontSize={0.12}
        color="#a1a1aa"
        anchorX="center"
        anchorY="top"
      >
        {data.label}
      </Text>
    </group>
  )
}

function NetworkEdge({ from, to }: { from: number; to: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const fromPos = new THREE.Vector3(...nodes[from].position)
  const toPos = new THREE.Vector3(...nodes[to].position)
  const mid = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5)
  const direction = new THREE.Vector3().subVectors(toPos, fromPos)
  const length = direction.length()
  direction.normalize()

  return (
    <mesh
      ref={ref}
      position={mid}
      quaternion={new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction,
      )}
    >
      <cylinderGeometry args={[0.015, 0.015, length, 4]} />
      <meshBasicMaterial color="#00F5FF" transparent opacity={0.15} />
    </mesh>
  )
}

function Scene() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      {nodes.map((node, i) => (
        <NetworkNode key={node.id} data={node} index={i} hovered={hovered} setHovered={setHovered} />
      ))}
      {edges.map((edge, i) => (
        <NetworkEdge key={i} from={edge.from} to={edge.to} />
      ))}
    </>
  )
}

export function ArchitectureNetwork() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [3.5, 0, 5], fov: 45 }} gl={{ alpha: true }}>
        <Scene />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}
