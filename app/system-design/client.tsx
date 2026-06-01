'use client'

import { motion } from 'framer-motion'
import { SystemDesignSection } from '@/components/sections/SystemDesignSection'

export function SystemDesignPageClient() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="section-label mb-4">System Design</div>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
            Architecture & System Design
          </h1>
          <p className="mt-4 max-w-2xl text-text-secondary">
            Interactive visualizations and deep dives into system design concepts.
            Explore architecture patterns, data flow, deployment strategies, and design decisions.
          </p>
        </motion.div>
      </div>
      <SystemDesignSection />
    </div>
  )
}
