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
  { id: 'api', label: 'API Gateway', position: [-4, 1, 0], color: '#3b82f6', description: 'Request routing, auth, rate limiting' },
  { id: 'cache', label: 'Cache (Redis)', position: [-1.5, 2.5, 0], color: '#06b6d4', description: 'In-memory caching layer' },
  { id: 'db', label: 'Database Cluster', position: [1.5, -1, 0], color: '#6366f1', description: 'PostgreSQL with read replicas' },
  { id: 'queue', label: 'Message Queue', position: [4, 1.5, 0], color: '#8b5cf6', description: 'Async task processing' },
  { id: 'cdn', label: 'CDN', position: [0, -2.5, 0], color: '#ec4899', description: 'Global edge caching' },
]

const edges: { from: number; to: number }[] = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 0, to: 4 },
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
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshPhysicalMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered === index ? 0.5 : 0.2}
          transparent
          opacity={0.9}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <Text
        position={[data.position[0], data.position[1] - 0.6, data.position[2]]}
        fontSize={0.15}
        color="#a1a1aa"
        anchorX="center"
        anchorY="top"
      >
        {data.label}
      </Text>
      {hovered === index && (
        <Html position={[data.position[0], data.position[1] + 0.7, data.position[2]]} center>
          <div className="bg-bg-primary/90 backdrop-blur-md border border-border rounded-lg px-3 py-2 text-xs text-text-secondary whitespace-nowrap shadow-xl">
            {data.description}
          </div>
        </Html>
      )}
    </group>
  )
}

function NetworkEdge({ from, to, idx }: { from: number; to: number; idx: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const fromPos = new THREE.Vector3(...nodes[from].position)
  const toPos = new THREE.Vector3(...nodes[to].position)
  const mid = new THREE.Vector3().addVectors(fromPos, toPos).multiplyScalar(0.5)
  const direction = new THREE.Vector3().subVectors(toPos, fromPos)
  const length = direction.length()
  direction.normalize()

  const pulseRef = useRef(0)
  useFrame(() => {
    pulseRef.current += 0.03
    if (ref.current) {
      const material = ref.current.material as THREE.MeshBasicMaterial
      material.opacity = 0.2 + Math.sin(pulseRef.current + idx) * 0.15
    }
  })

  return (
    <mesh
      ref={ref}
      position={mid}
      quaternion={new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        direction,
      )}
    >
      <cylinderGeometry args={[0.02, 0.02, length, 4]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
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
        <NetworkEdge key={i} from={edge.from} to={edge.to} idx={i} />
      ))}
    </>
  )
}

export function ArchitectureNetwork() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Scene />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  )
}
