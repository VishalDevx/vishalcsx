'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const commands = ['> hire', '> contact', '> github', '> resume', '> collaborate']

function FloatingCommand({ text, index }: { text: string; index: number }) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 0.5 + index * 1.2) * 0.3
      ref.current.position.x = Math.cos(clock.elapsedTime * 0.3 + index * 0.8) * 0.2
    }
  })

  const geometry = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 48
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#050505'
    ctx.fillRect(0, 0, 256, 48)
    ctx.fillStyle = '#3b82f6'
    ctx.font = '20px "DM Mono", monospace'
    ctx.fillText(text, 16, 32)
    const tex = new THREE.CanvasTexture(canvas)
    return new THREE.PlaneGeometry(1.2, 0.2)
  }, [text])

  return (
    <mesh ref={ref} position={[0, 1.5 - index * 0.6, 0]} geometry={geometry}>
      <meshBasicMaterial transparent opacity={0.15 + index * 0.05} />
    </mesh>
  )
}

function CursorParticles() {
  const count = 30
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.3
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.3
    }
    return pos
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.2 - 1.5
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#60a5fa" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

export function TerminalBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 2]} gl={{ alpha: true }}>
      <ambientLight intensity={0.3} />
      {commands.map((cmd, i) => (
        <FloatingCommand key={cmd} text={cmd} index={i} />
      ))}
      <CursorParticles />
    </Canvas>
  )
}
