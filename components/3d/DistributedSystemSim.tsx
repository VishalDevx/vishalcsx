'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'

interface SimNode {
  id: string
  label: string
  position: [number, number, number]
  color: string
  desc: string
}

const simNodes: SimNode[] = [
  { id: 'lb', label: 'Load Balancer', position: [0, 2.5, 0], color: '#3b82f6', desc: 'Round-robin distribution' },
  { id: 'app1', label: 'App Server 1', position: [-1.5, 1, 0], color: '#06b6d4', desc: 'Handles read operations' },
  { id: 'app2', label: 'App Server 2', position: [1.5, 1, 0], color: '#06b6d4', desc: 'Handles write operations' },
  { id: 'cache', label: 'Redis Cluster', position: [0, -0.5, 0], color: '#6366f1', desc: 'In-memory cache · TTL' },
  { id: 'db1', label: 'DB Primary', position: [-1, -2, 0], color: '#8b5cf6', desc: 'Write master' },
  { id: 'db2', label: 'DB Replica', position: [1, -2, 0], color: '#8b5cf6', desc: 'Read replica' },
]

const simEdges: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]]

function TrafficPacket({ from, to, offset }: { from: THREE.Vector3; to: THREE.Vector3; offset: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    const t = ((clock.elapsedTime * 0.3 + offset) % 1)
    if (ref.current) {
      ref.current.position.lerpVectors(from, to, t)
    }
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.6} />
    </mesh>
  )
}

function SimNodeMesh({ data, index }: { data: SimNode; index: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 1.5 + index) * 0.05
      ref.current.scale.setScalar(s)
    }
  })
  return (
    <group>
      <mesh ref={ref} position={data.position}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshPhysicalMaterial color={data.color} emissive={data.color} emissiveIntensity={0.1} metalness={0.5} roughness={0.3} transparent opacity={0.85} />
      </mesh>
      <Text position={[data.position[0], data.position[1] - 0.6, data.position[2]]} fontSize={0.08} color="#666" anchorX="center" anchorY="top">
        {data.label}
      </Text>
    </group>
  )
}

function Scene() {
  const nodePositions = useMemo(() => simNodes.map((n) => new THREE.Vector3(...n.position)), [])
  return (
    <>
      {simNodes.map((n, i) => (
        <SimNodeMesh key={n.id} data={n} index={i} />
      ))}
      {simEdges.map(([f, t], i) => {
        const from = nodePositions[f]
        const to = nodePositions[t]
        const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5)
        const dir = new THREE.Vector3().subVectors(to, from)
        const len = dir.length()
        dir.normalize()
        return (
          <group key={`edge-${i}`}>
            <mesh position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)}>
              <cylinderGeometry args={[0.006, 0.006, len, 4]} />
              <meshBasicMaterial color="#222" transparent opacity={0.3} />
            </mesh>
            <TrafficPacket from={from} to={to} offset={i * 0.2} />
            <TrafficPacket from={to} to={from} offset={i * 0.2 + 0.5} />
          </group>
        )
      })}
    </>
  )
}

export function DistributedSystemSim() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
      <Scene />
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 5, 5]} intensity={0.5} />
    </Canvas>
  )
}
