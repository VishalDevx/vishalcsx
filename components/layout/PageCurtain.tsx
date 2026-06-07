'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

const NUM_PAGES = 10

const pageColors = [
  '#f5f0e8',
  '#f0ebe3',
  '#ede6dc',
  '#f2ece2',
  '#efe8de',
  '#f4eee4',
  '#eae3d9',
  '#f1ebe1',
  '#ede6dc',
  '#f0ebe3',
]

function RifflePages({ onDone }: { onDone: () => void }) {
  const [riffled, setRiffled] = useState<number[]>([])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let cancelled = false

    const flip = (i: number) => {
      if (cancelled) return
      if (i >= NUM_PAGES) {
        timeout = setTimeout(() => { if (!cancelled) onDone() }, 100)
        return
      }
      setRiffled((prev) => [...prev, i])
      timeout = setTimeout(() => flip(i + 1), 55)
    }

    timeout = setTimeout(() => flip(0), 30)
    return () => {
      cancelled = true
      clearTimeout(timeout)
    }
  }, [onDone])

  return (
    <div className="absolute inset-0" style={{ perspective: '2000px' }}>
      {Array.from({ length: NUM_PAGES }).map((_, i) => {
        const isRiffled = riffled.includes(i)
        const isActive = riffled.length > 0 && riffled[riffled.length - 1] === i

        return (
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={false}
            animate={
              isRiffled
                ? {
                    rotateY: -180,
                    x: '-110%',
                    opacity: 0,
                  }
                : {
                    rotateY: 0,
                    x: 0,
                    opacity: 1,
                  }
            }
            transition={{
              duration: 0.18,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              transformOrigin: 'left center',
              background: `linear-gradient(135deg, ${pageColors[i % pageColors.length]} 0%, ${pageColors[i % pageColors.length]} 50%, ${i % 2 === 0 ? '#e8e0d5' : '#ede6dc'} 100%)`,
              boxShadow: isActive
                ? '8px 0 32px rgba(0,0,0,0.15), -4px 0 16px rgba(0,0,0,0.05)'
                : '1px 0 4px rgba(0,0,0,0.06)',
              backfaceVisibility: 'hidden',
              zIndex: NUM_PAGES - i,
              willChange: 'transform',
            }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 4px)',
              }}
            />
            {/* Fold curl shadow */}
            <div
              className="absolute right-0 top-0 bottom-0 w-12"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.06), transparent)',
              }}
            />
          </motion.div>
        )
      })}

      {/* Right edge page stack peeking */}
      <div
        className="absolute right-4 top-0 bottom-0 flex flex-col justify-center"
        style={{ width: '12px', zIndex: 999 }}
      >
        {Array.from({ length: NUM_PAGES }).map((_, i) => {
          const isRiffled = riffled.includes(i)
          return (
            <div
              key={i}
              className="absolute right-0 rounded-l-[1px]"
              style={{
                top: `${6 + i * 1.5}%`,
                bottom: `${88 - i * 1.5}%`,
                width: `${12 - i * 0.5}px`,
                background: pageColors[i % pageColors.length],
                opacity: isRiffled ? 0 : 0.25 + i * 0.03,
                transition: 'opacity 0.15s ease',
                boxShadow: '-1px 0 2px rgba(0,0,0,0.04)',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export function PageCurtain() {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)
  const [showRiffle, setShowRiffle] = useState(false)
  const prevPathRef = useRef(pathname)
  const [key, setKey] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname
      setKey((k) => k + 1)
      doneRef.current = false
      setIsActive(true)
      const showTimer = setTimeout(() => setShowRiffle(true), 40)
      return () => clearTimeout(showTimer)
    }
  }, [pathname])

  const handleDone = () => {
    if (doneRef.current) return
    doneRef.current = true
    setShowRiffle(false)
    setTimeout(() => setIsActive(false), 120)
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={key}
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {/* Dark overlay with vignette */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
            }}
          />

          {/* Riffle pages spanning full screen */}
          <div className="absolute inset-0 overflow-hidden">
            {showRiffle && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                <RifflePages onDone={handleDone} />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
