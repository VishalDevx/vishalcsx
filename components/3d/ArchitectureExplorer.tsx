'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface ArchNode {
  label: string
  position: [number, number, number]
  color: string
}

const defaultNodes: ArchNode[] = [
  { label: 'Frontend', position: [0, 2, 0], color: '#3b82f6' },
  { label: 'API Layer', position: [0, 1, 0], color: '#06b6d4' },
  { label: 'Services', position: [0, 0, 0], color: '#6366f1' },
  { label: 'Database', position: [0, -1, 0], color: '#8b5cf6' },
]

const edges: [number, number][] = [[0, 1], [1, 2], [2, 3]]

function PacketStream() {
  const packets = useMemo(() => {
    const p: { edgeIdx: number; offset: number }[] = []
    for (let i = 0; i < 6; i++) {
      p.push({ edgeIdx: i % edges.length, offset: i * 0.15 })
    }
    return p
  }, [])

  return (
    <>
      {packets.map((pkt, i) => {
        const e = edges[pkt.edgeIdx]
        const from = new THREE.Vector3(...defaultNodes[e[0]].position)
        const to = new THREE.Vector3(...defaultNodes[e[1]].position)
        return <Packet key={i} from={from} to={to} offset={pkt.offset} />
      })}
    </>
  )
}

function Packet({ from, to, offset }: { from: THREE.Vector3; to: THREE.Vector3; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.5 + offset) % 1)
    if (ref.current) {
      ref.current.position.lerpVectors(from, to, t)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.7} />
    </mesh>
  )
}

function ArchNodeMesh({ data }: { data: ArchNode }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime + data.position[1]) * 0.05
      ref.current.scale.setScalar(s)
    }
  })
  return (
    <group>
      <mesh ref={ref} position={data.position}>
        <boxGeometry args={[0.5, 0.3, 0.3]} />
        <meshPhysicalMaterial color={data.color} emissive={data.color} emissiveIntensity={0.15} metalness={0.4} roughness={0.3} transparent opacity={0.85} />
      </mesh>
      <Text position={[data.position[0], data.position[1] - 0.4, data.position[2]]} fontSize={0.08} color="#666" anchorX="center" anchorY="top">
        {data.label}
      </Text>
    </group>
  )
}

function Edges() {
  return (
    <>
      {edges.map(([f, t], i) => {
        const from = new THREE.Vector3(...defaultNodes[f].position)
        const to = new THREE.Vector3(...defaultNodes[t].position)
        const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
        const dir = new THREE.Vector3().subVectors(to, from)
        const len = dir.length()
        dir.normalize()
        return (
          <mesh key={i} position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}>
            <cylinderGeometry args={[0.008, 0.008, len, 4]} />
            <meshBasicMaterial color="#222" transparent opacity={0.3} />
          </mesh>
        )
      })}
    </>
  )
}

export function ArchitectureExplorer() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 50 }} dpr={[1, 2]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 3]} intensity={0.5} />
      {defaultNodes.map((n) => (
        <ArchNodeMesh key={n.label} data={n} />
      ))}
      <Edges />
      <PacketStream />
    </Canvas>
  )
}
