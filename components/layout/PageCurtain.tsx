'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export function PageCurtain() {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const prevPathRef = useRef(pathname)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      setKey((k) => k + 1)
      setIsActive(true)
      const timer = setTimeout(() => setIsActive(false), 900)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={key}
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ clipPath: 'circle(150% at 50% 50%)' }}
          exit={{ clipPath: 'circle(0% at 50% 50%)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #7B2FFF)',
          }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            style={{
              background:
                'radial-gradient(circle at 30% 50%, rgba(0,245,255,0.3), transparent 50%), radial-gradient(circle at 70% 50%, rgba(123,47,255,0.3), transparent 50%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
