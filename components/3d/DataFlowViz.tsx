'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Timer, BarChart3, Activity } from 'lucide-react'

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
    <div className="w-full" onClick={() => setIsPaused(!isPaused)} style={{ cursor: 'pointer' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4" style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
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
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  padding: 12,
                  borderRadius: 12,
                  border: '1px solid',
                  minWidth: 100,
                  background: activeStep === i ? 'var(--accent-bg)' : 'var(--card-bg)',
                  borderColor: activeStep === i ? 'var(--accent)' : 'var(--border-subtle)',
                  boxShadow: activeStep === i ? '0 0 20px var(--glow)' : 'none',
                  transition: 'background 0.3s, border-color 0.3s',
                }}
              >
                <div
                  style={{
                    height: 32, width: 32, borderRadius: 8,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700,
                    background: activeStep === i ? 'var(--accent)' : 'var(--bg-tertiary)',
                    color: activeStep === i ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  {i + 1}
                </div>
                <span
                  style={{
                    fontSize: 12, fontWeight: 500,
                    color: activeStep === i ? 'var(--accent)' : 'var(--text-secondary)',
                  }}
                >
                  {step.label}
                </span>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <motion.div animate={{ opacity: activeStep === i ? 1 : 0.2 }} className="flex items-center px-1">
                  <ArrowRight className="h-4 w-4" style={{ color: activeStep === i ? 'var(--accent)' : 'var(--text-muted)' }} />
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
            style={{
              marginTop: 16, padding: 16, borderRadius: 12,
              border: '1px solid var(--border-color)',
              background: 'var(--card-bg)',
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Step</div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{flowSteps[activeStep].label}</div>
                <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{flowSteps[activeStep].description}</div>
              </div>
              <div>
                <div className="text-xs mb-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <Timer className="h-3 w-3" /> Latency
                </div>
                <div className="text-sm font-mono" style={{ color: 'var(--accent)' }}>{flowSteps[activeStep].latency}</div>
              </div>
              <div>
                <div className="text-xs mb-1 flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                  <BarChart3 className="h-3 w-3" /> Throughput
                </div>
                <div className="text-sm font-mono" style={{ color: 'var(--accent)' }}>{flowSteps[activeStep].throughput}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
