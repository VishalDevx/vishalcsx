'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  duration?: number
  margin?: string
}

const directionVariants = {
  up: { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -40 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  margin = '-80px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: margin as unknown as `${number}px` })
  const variant = directionVariants[direction]

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{
          hidden: variant.hidden,
          show: {
            ...variant.show,
            transition: {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
