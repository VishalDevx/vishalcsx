'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import { formatNumber } from '@/lib/utils'

interface MetricCounterProps {
  value: number
  suffix?: string
  label: string
  prefix?: string
}

export function MetricCounter({ value, suffix = '', label, prefix = '' }: MetricCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, value)
      setCount(Math.round(current))

      if (step >= steps) {
        setCount(value)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="text-center p-4">
      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient">
        {prefix}{formatNumber(count)}{suffix}
      </div>
      <div className="mt-1 text-xs text-text-muted font-medium uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}
