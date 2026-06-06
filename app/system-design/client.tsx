'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { SystemDesignSection } from '@/components/sections/SystemDesignSection'

const DistributedSystemSim = dynamic(() => import('@/components/3d/DistributedSystemSim').then(mod => ({ default: mod.DistributedSystemSim })), { ssr: false })

export function SystemDesignPageClient() {
  return (
    <div className="relative pt-14 pb-20">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] dark:opacity-[0.04]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}>
        <DistributedSystemSim />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:pb-14 lg:pt-20"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> System Design
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Architecture<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>& System Design</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              Interactive visualizations and deep dives into system design concepts. Explore architecture patterns, data flow, deployment strategies, and design decisions.
            </p>
          </div>
        </motion.header>
      </div>
      <SystemDesignSection />
    </div>
  )
}
