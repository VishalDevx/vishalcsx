'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export function RouteProgress() {
  const pathname = usePathname()
  const barRef = useRef<HTMLDivElement>(null)
  const prevPathRef = useRef(pathname)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      const bar = barRef.current
      if (!bar) return

      bar.style.width = '0%'
      bar.style.opacity = '1'
      setVisible(true)

      requestAnimationFrame(() => {
        bar.style.transition = 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
        bar.style.width = '85%'
      })

      const complete = () => {
        bar.style.transition = 'width 0.2s ease'
        bar.style.width = '100%'
        setTimeout(() => {
          bar.style.transition = 'opacity 0.3s ease'
          bar.style.opacity = '0'
          setTimeout(() => setVisible(false), 300)
        }, 200)
      }

      if (document.readyState === 'complete') {
        complete()
      } else {
        window.addEventListener('load', complete, { once: true })
        return () => window.removeEventListener('load', complete)
      }
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: '0%',
        background: 'linear-gradient(90deg, #00F5FF, #7B2FFF)',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
