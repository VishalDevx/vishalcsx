'use client'

import { motion } from 'framer-motion'
import { GitHubSection } from '@/components/sections/GitHubSection'

export default function OpenSourcePage() {
  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="section-label mb-4">Open Source</div>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-bold tracking-tight">
            Open Source Contributions
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Active contributor to open source projects. Committed to building tools and
            libraries that help the developer community.
          </p>
        </motion.div>
      </div>
      <GitHubSection />
    </div>
  )
}
