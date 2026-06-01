'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface InfraNode {
  id: string
  label: string
  icon: string
  desc: string
}

const nodes: (InfraNode & { position: [number, number, number] })[] = [
  { id: 'user', label: 'User', icon: '→', desc: 'HTTP/2 request', position: [0, 4, 0] },
  { id: 'cdn', label: 'CDN', icon: '◎', desc: 'Edge caching · 50ms TTFB', position: [0, 3, 0] },
  { id: 'lb', label: 'Load Balancer', icon: '⇄', desc: 'Round-robin · Health checks', position: [0, 2, 0] },
  { id: 'gateway', label: 'API Gateway', icon: '▤', desc: 'Auth · Rate limiting · Routing', position: [0, 1, 0] },
  { id: 'services', label: 'Services', icon: '◈', desc: 'Next.js · Node.js · Express', position: [0, 0, 0] },
  { id: 'cache', label: 'Redis', icon: '⚡', desc: 'In-memory · TTL · 2ms reads', position: [-1.5, -1, 0] },
  { id: 'db', label: 'PostgreSQL', icon: '⛁', desc: 'Schema-per-tenant · Replicas', position: [1.5, -1, 0] },
  { id: 'queue', label: 'Queue', icon: '≡', desc: 'BullMQ · Async jobs', position: [0, -2, 0] },
]

const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7],
]

function Packet({ start, end, progress }: { start: THREE.Vector3; end: THREE.Vector3; progress: number }) {
  const pos = new THREE.Vector3().lerpVectors(start, end, progress)
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.04, 6, 6]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.8} />
    </mesh>
  )
}

function InfraNodeMesh({
  data,
  index,
  hovered,
  setHovered,
}: {
  data: (typeof nodes)[0]
  index: number
  hovered: number | null
  setHovered: (i: number | null) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const pulseRef = useRef(0)

  useFrame((_, delta) => {
    pulseRef.current += delta * 2
    if (meshRef.current) {
      const s = hovered === index ? 1.2 : 1 + Math.sin(pulseRef.current) * 0.04
      meshRef.current.scale.setScalar(s)
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
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial
          color={hovered === index ? '#3b82f6' : '#1a1a1a'}
          emissive={hovered === index ? '#3b82f6' : '#000000'}
          emissiveIntensity={hovered === index ? 0.3 : 0}
          metalness={0.6}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Text
        position={[data.position[0], data.position[1] - 0.8, data.position[2]]}
        fontSize={0.12}
        color="#666666"
        anchorX="center"
        anchorY="top"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {data.label}
      </Text>
      {hovered === index && (
        <Html position={[data.position[0], data.position[1] + 0.6, data.position[2]]} center>
          <div
            style={{
              background: '#0d0d0d',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 11,
              color: '#a0a0a0',
              whiteSpace: 'nowrap',
              fontFamily: "'DM Mono', monospace",
              pointerEvents: 'none',
            }}
          >
            {data.desc}
          </div>
        </Html>
      )}
    </group>
  )
}

function InfraEdge({ from, to, index: edgeIdx }: { from: [number, number, number]; to: [number, number, number]; index: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  const fromVec = new THREE.Vector3(...from)
  const toVec = new THREE.Vector3(...to)
  const mid = new THREE.Vector3().addVectors(fromVec, toVec).multiplyScalar(0.5)
  const dir = new THREE.Vector3().subVectors(toVec, fromVec)
  const len = dir.length()
  dir.normalize()

  useFrame(({ clock }) => {
    if (ref.current) {
      const m = ref.current.material as THREE.MeshBasicMaterial
      m.opacity = 0.15 + Math.sin(clock.elapsedTime * 1.5 + edgeIdx) * 0.1
    }
  })

  return (
    <mesh
      ref={ref}
      position={mid}
      quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}
    >
      <cylinderGeometry args={[0.008, 0.008, len, 4]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
    </mesh>
  )
}

function PacketStreams() {
  const packetRef = useRef(0)
  const [packets, setPackets] = useState<{ edgeIdx: number; progress: number }[]>([])

  useFrame((_, delta) => {
    packetRef.current += delta
    if (packetRef.current > 0.8) {
      packetRef.current = 0
      setPackets((prev) => [
        ...prev.slice(-8),
        { edgeIdx: Math.floor(Math.random() * edges.length), progress: 0 },
      ])
    }
    setPackets((prev) =>
      prev
        .map((p) => ({ ...p, progress: p.progress + delta * 0.4 }))
        .filter((p) => p.progress < 1),
    )
  })

  return (
    <>
      {packets.map((p, i) => {
        const edge = edges[p.edgeIdx]
        const from = new THREE.Vector3(...nodes[edge[0]].position)
        const to = new THREE.Vector3(...nodes[edge[1]].position)
        return <Packet key={i} start={from} end={to} progress={p.progress} />
      })}
    </>
  )
}

function Scene() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <>
      {nodes.map((node, i) => (
        <InfraNodeMesh key={node.id} data={node} index={i} hovered={hovered} setHovered={setHovered} />
      ))}
      {edges.map((edge, i) => (
        <InfraEdge key={i} from={nodes[edge[0]].position} to={nodes[edge[1]].position} index={i} />
      ))}
      <PacketStreams />
    </>
  )
}

export function InfraViz() {
  return (
    <Canvas camera={{ position: [0, 0.5, 5], fov: 50 }} dpr={[1, 2]}>
      <Scene />
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
    </Canvas>
  )
}
