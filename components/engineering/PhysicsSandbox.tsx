'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import type { Vec3 } from '@/lib/math'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  life: number
}

interface Boid {
  x: number; y: number
  vx: number; vy: number
}

const modes = ['Particles', 'Springs', 'Boids'] as const

export function PhysicsSandbox() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mode, setMode] = useState<typeof modes[number]>('Particles')
  const runningRef = useRef(true)
  const animRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    const W = canvas.width
    const H = canvas.height

    if (mode === 'Particles') {
      const particles: Particle[] = []
      let frame = 0
      const animate = () => {
        if (!runningRef.current) return
        ctx.fillStyle = 'rgba(5,5,5,0.1)'
        ctx.fillRect(0, 0, W, H)

        if (frame % 3 === 0) {
          particles.push({
            x: W / 2 + (Math.random() - 0.5) * 20,
            y: H / 2,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 4 - 1,
            life: 1,
          })
        }

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i]
          p.vy += 0.1
          p.x += p.vx
          p.y += p.vy
          p.life -= 0.008

          if (p.life <= 0) { particles.splice(i, 1); continue }

          ctx.beginPath()
          ctx.arc(p.x, p.y, Math.max(1, p.life * 3), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59, 130, 246, ${p.life * 0.6})`
          ctx.fill()
        }

        frame++
        animRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    if (mode === 'Springs') {
      const nodes = Array.from({ length: 8 }, (_, i) => ({
        x: W * 0.2 + (W * 0.6 / 7) * i + (Math.random() - 0.5) * 30,
        y: H * 0.3 + Math.random() * H * 0.4,
        vx: 0, vy: 0,
        pinned: i === 0 || i === 7,
      }))

      const animate = () => {
        if (!runningRef.current) return
        ctx.fillStyle = 'rgba(5,5,5,0.3)'
        ctx.fillRect(0, 0, W, H)

        for (let i = 0; i < nodes.length; i++) {
          if (!nodes[i].pinned) {
            nodes[i].vy += 0.2
            nodes[i].x += nodes[i].vx
            nodes[i].y += nodes[i].vy
            nodes[i].vx *= 0.98
            nodes[i].vy *= 0.98
          }

          if (i > 0) {
            const prev = nodes[i - 1]
            const dx = prev.x - nodes[i].x
            const dy = prev.y - nodes[i].y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const rest = 80
            const force = (dist - rest) * 0.05
            const nx = dx / dist
            const ny = dy / dist
            if (!nodes[i].pinned) { nodes[i].vx += nx * force; nodes[i].vy += ny * force }
            if (!prev.pinned) { prev.vx -= nx * force; prev.vy -= ny * force }
          }

          ctx.beginPath()
          ctx.arc(nodes[i].x, nodes[i].y, 4, 0, Math.PI * 2)
          ctx.fillStyle = nodes[i].pinned ? '#ef4444' : '#3b82f6'
          ctx.fill()
        }

        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(nodes[0].x, nodes[0].y)
        for (let i = 1; i < nodes.length; i++) ctx.lineTo(nodes[i].x, nodes[i].y)
        ctx.stroke()

        animRef.current = requestAnimationFrame(animate)
      }
      animate()
    }

    if (mode === 'Boids') {
      const boids: Boid[] = Array.from({ length: 50 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
      }))

      const animate = () => {
        if (!runningRef.current) return
        ctx.fillStyle = 'rgba(5,5,5,0.15)'
        ctx.fillRect(0, 0, W, H)

        for (const b of boids) {
          let ax = 0, ay = 0
          let neighbors = 0
          let cx = 0, cy = 0
          let sepX = 0, sepY = 0

          for (const other of boids) {
            if (other === b) continue
            const dx = other.x - b.x
            const dy = other.y - b.y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < 80) {
              neighbors++
              cx += other.x
              cy += other.y
              if (d < 25) { sepX -= dx / d; sepY -= dy / d }
            }
          }

          if (neighbors > 0) {
            cx = cx / neighbors - b.x
            cy = cy / neighbors - b.y
            ax += cx * 0.005
            ay += cy * 0.005
            ax += sepX * 0.02
            ay += sepY * 0.02
          }

          b.vx += ax
          b.vy += ay
          const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy)
          if (speed > 3) { b.vx = (b.vx / speed) * 3; b.vy = (b.vy / speed) * 3 }
          b.x += b.vx
          b.y += b.vy

          if (b.x < 0) b.x = W
          if (b.x > W) b.x = 0
          if (b.y < 0) b.y = H
          if (b.y > H) b.y = 0

          ctx.beginPath()
          ctx.arc(b.x, b.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = '#3b82f6'
          ctx.fill()
        }

        animRef.current = requestAnimationFrame(animate)
      }
      animate()
    }
  }, [mode])

  useEffect(() => {
    runningRef.current = true
    const timeout = setTimeout(() => { draw(); cancelAnimationFrame(animRef.current) }, 50)
    return () => { runningRef.current = false; cancelAnimationFrame(animRef.current); clearTimeout(timeout) }
  }, [draw])

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1 rounded-lg border p-1" style={{ borderColor: 'var(--border-color)' }}>
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="rounded-md px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-all"
              style={{
                fontFamily: "'DM Mono', monospace",
                backgroundColor: mode === m ? 'var(--accent-bg)' : 'transparent',
                color: mode === m ? 'var(--accent-text)' : 'var(--text-secondary)',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        className="w-full rounded-lg border"
        style={{ borderColor: 'var(--border-color)' }}
      />
    </div>
  )
}
