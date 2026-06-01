'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

interface Region {
  lat: number
  lng: number
  label: string
  color?: string
}

const regions: Region[] = [
  { lat: 40.7128, lng: -74.006, label: 'New York', color: '#3b82f6' },
  { lat: 51.5074, lng: -0.1278, label: 'London', color: '#06b6d4' },
  { lat: 35.6762, lng: 139.6503, label: 'Tokyo', color: '#6366f1' },
  { lat: -33.8688, lng: 151.2093, label: 'Sydney', color: '#8b5cf6' },
  { lat: 1.3521, lng: 103.8198, label: 'Singapore', color: '#3b82f6' },
  { lat: 19.076, lng: 72.8777, label: 'Mumbai', color: '#06b6d4' },
  { lat: 48.8566, lng: 2.3522, label: 'Paris', color: '#6366f1' },
  { lat: 52.52, lng: 13.405, label: 'Berlin', color: '#8b5cf6' },
]

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function GlobeEarth() {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
    }
  })

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= 32; i++) {
      const lat = -90 + (180 * i) / 32
      pts.push(latLngToVector3(lat, 0, 2))
    }
    return pts
  }, [])

  const meridianPoints = useMemo(() => {
    const meridians: THREE.Vector3[][] = []
    for (let m = 0; m < 12; m++) {
      const pts: THREE.Vector3[] = []
      for (let i = 0; i <= 32; i++) {
        const lat = -90 + (180 * i) / 32
        pts.push(latLngToVector3(lat, m * 30, 2))
      }
      meridians.push(pts)
    }
    return meridians
  }, [])

  return (
    <group ref={groupRef}>
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#0a0a2e"
          transparent
          opacity={0.9}
          roughness={0.5}
          metalness={0.1}
        />
      </Sphere>
      <Line points={points} color="#1a1a4e" lineWidth={0.5} />
      {meridianPoints.map((pts, i) => (
        <Line key={i} points={pts} color="#1a1a4e" lineWidth={0.5} />
      ))}
      {regions.map((region, i) => {
        const pos = latLngToVector3(region.lat, region.lng, 2.05)
        return (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color={region.color || '#3b82f6'} />
          </mesh>
        )
      })}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
    </group>
  )
}

function ArcLines() {
  const arcs = useMemo(() => {
    const pairs = [
      [0, 2], [1, 3], [4, 5], [6, 7], [0, 4], [1, 5],
    ] as [number, number][]
    return pairs.map(([i, j]) => {
      const start = latLngToVector3(regions[i].lat, regions[i].lng, 2)
      const end = latLngToVector3(regions[j].lat, regions[j].lng, 2)
      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
      mid.normalize().multiplyScalar(3.5)
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
      return curve.getPoints(50)
    })
  }, [])

  return (
    <>
      {arcs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#3b82f6"
          transparent
          opacity={0.15}
          lineWidth={0.5}
        />
      ))}
    </>
  )
}

export function Globe() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <GlobeEarth />
        <ArcLines />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
