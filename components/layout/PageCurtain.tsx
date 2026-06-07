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
      const timer = setTimeout(() => setIsActive(false), 400)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={key}
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: 'rgba(0,0,0,0.4)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />
      )}
    </AnimatePresence>
  )
}
