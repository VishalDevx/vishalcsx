'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const ringPosRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let isPointer = false
    let isText = false

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`

      const target = e.target as HTMLElement
      const tag = target.closest('a, button, [data-cursor]')
      isPointer = !!tag
      isText = tag?.getAttribute('data-cursor') === 'text' || false
    }

    const onMouseDown = () => {
      dot.style.transform = `translate(${posRef.current.x - 2.1}px, ${posRef.current.y - 2.1}px) scale(0.7)`
      ring.style.transform = `translate(${ringPosRef.current.x - 14}px, ${ringPosRef.current.y - 14}px) scale(0.7)`
    }

    const onMouseUp = () => {
      dot.style.transform = `translate(${posRef.current.x - 3}px, ${posRef.current.y - 3}px)`
      ring.style.transform = `translate(${ringPosRef.current.x - 14}px, ${ringPosRef.current.y - 14}px)`
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      ringPosRef.current = {
        x: lerp(ringPosRef.current.x, posRef.current.x, 0.12),
        y: lerp(ringPosRef.current.y, posRef.current.y, 0.12),
      }

      if (isPointer) {
        ring.style.width = '48px'
        ring.style.height = '48px'
        ring.style.background = 'rgba(0,245,255,0.08)'
        dot.style.width = '3px'
        dot.style.height = '3px'
      } else if (isText) {
        ring.style.width = '2px'
        ring.style.height = '24px'
        ring.style.background = 'transparent'
        dot.style.width = '6px'
        dot.style.height = '6px'
      } else {
        ring.style.width = '28px'
        ring.style.height = '28px'
        ring.style.background = 'transparent'
        dot.style.width = '6px'
        dot.style.height = '6px'
      }

      ring.style.transform = `translate(${ringPosRef.current.x - parseInt(ring.style.width) / 2}px, ${ringPosRef.current.y - parseInt(ring.style.height) / 2}px)`

      rafRef.current = requestAnimationFrame(loop)
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    rafRef.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          background: '#00F5FF',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '1.5px solid rgba(0,245,255,0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.15s, height 0.15s, background 0.15s',
        }}
      />
    </>
  )
}
