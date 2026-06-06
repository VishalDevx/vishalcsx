'use client'

import { motion } from 'framer-motion'
import { fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight } from '@/lib/animations'
import { useEffect, useState } from 'react'

const variants = { fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight }

type VariantName = keyof typeof variants

interface AnimateInProps {
  children: React.ReactNode
  variant?: VariantName
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'span'
}

export function AnimateIn({ children, variant = 'fadeUp', delay = 0, className, as: Tag = 'div' }: AnimateInProps) {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (prefersReduced) return <Tag className={className}>{children}</Tag>

  const v = variants[variant]
  return (
    <motion.div
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={delay ? { ...v.show.transition, delay } : undefined}
      style={Tag !== 'div' ? { display: 'inherit' } : undefined}
    >
      {children}
    </motion.div>
  )
}
