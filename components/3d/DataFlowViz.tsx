'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Timer, BarChart3, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlowStep {
  id: string
  label: string
  description: string
  latency: string
  throughput: string
  icon?: string
}

const flowSteps: FlowStep[] = [
  { id: 'client', label: 'Client', description: 'HTTP/2 request initiated', latency: '0ms', throughput: 'N/A', icon: 'Monitor' },
  { id: 'gateway', label: 'API Gateway', description: 'Auth, rate limiting, routing', latency: '5ms', throughput: '10K req/s', icon: 'Shield' },
  { id: 'cache', label: 'Cache', description: 'Redis — L1 lookup', latency: '2ms', throughput: '50K req/s', icon: 'Database' },
  { id: 'db', label: 'Database', description: 'PostgreSQL query execution', latency: '20ms', throughput: '5K req/s', icon: 'Database' },
  { id: 'queue', label: 'Message Queue', description: 'Async job dispatch', latency: '15ms', throughput: '8K msg/s', icon: 'Workflow' },
  { id: 'response', label: 'Response', description: 'Data returned to client', latency: '<1ms', throughput: 'N/A', icon: 'CheckCircle' },
]

export function DataFlowViz() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev + 1) % flowSteps.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(nextStep, 2000)
    return () => clearInterval(interval)
  }, [isPaused, nextStep])

  return (
    <div className="w-full" onClick={() => setIsPaused(!isPaused)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          <span className="text-xs font-mono text-text-muted">
            {isPaused ? 'PAUSED — Click to resume' : 'LIVE — Click to pause'}
          </span>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center gap-0 overflow-x-auto pb-4">
          {flowSteps.map((step, i) => (
            <div key={step.id} className="flex items-center shrink-0">
              <motion.div
                animate={{
                  scale: activeStep === i ? 1 : 0.95,
                  opacity: activeStep === i ? 1 : i < activeStep ? 0.6 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors min-w-[100px]',
                  activeStep === i
                    ? 'border-accent/50 bg-accent-bg shadow-lg shadow-accent-glow/20'
                    : 'border-border-subtle bg-bg-card',
                )}
              >
                <div
                  className={cn(
                    'h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold',
                    activeStep === i ? 'bg-accent text-white' : 'bg-bg-tertiary text-text-muted',
                  )}
                >
                  {i + 1}
                </div>
                <span
                  className={cn(
                    'text-xs font-medium',
                    activeStep === i ? 'text-accent' : 'text-text-secondary',
                  )}
                >
                  {step.label}
                </span>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div
                  animate={{
                    opacity: activeStep === i ? 1 : 0.2,
                  }}
                  className="flex items-center px-1"
                >
                  <ArrowRight
                    className={cn(
                      'h-4 w-4 transition-colors',
                      activeStep === i ? 'text-accent' : 'text-text-muted',
                    )}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-4 rounded-xl border border-border bg-bg-card"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-text-muted mb-1">Step</div>
                <div className="text-sm font-medium">{flowSteps[activeStep].label}</div>
                <div className="text-xs text-text-secondary mt-0.5">{flowSteps[activeStep].description}</div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <Timer className="h-3 w-3" /> Latency
                </div>
                <div className="text-sm font-mono text-accent">{flowSteps[activeStep].latency}</div>
              </div>
              <div>
                <div className="text-xs text-text-muted mb-1 flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" /> Throughput
                </div>
                <div className="text-sm font-mono text-accent">{flowSteps[activeStep].throughput}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
