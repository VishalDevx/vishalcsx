'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TechItem } from '@/types'

interface TechCardProps {
  item: TechItem
  index?: number
}

export function TechCard({ item, index = 0 }: TechCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          'w-full text-left rounded-xl border transition-all duration-200 overflow-hidden',
          expanded
            ? 'border-accent/30 bg-accent-bg'
            : 'border-border-subtle bg-bg-card hover:border-border hover:bg-bg-tertiary/50',
        )}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 text-text-muted transition-transform duration-200',
              expanded && 'rotate-90',
            )}
          />
          <span className="text-sm font-medium">{item.name}</span>
          {item.category && (
            <span className="ml-auto text-[10px] font-mono uppercase tracking-wider text-text-muted">
              {item.category}
            </span>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-border-subtle">
                {item.experienceSummary && (
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {item.experienceSummary}
                  </p>
                )}

                {item.keyConcepts && item.keyConcepts.length > 0 && (
                  <div className="mb-3">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5">
                      Key Concepts
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.keyConcepts.map((concept) => (
                        <span
                          key={concept}
                          className="px-2 py-0.5 text-[11px] rounded-md bg-bg-tertiary text-text-secondary border border-border-subtle"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.projectsUsing && item.projectsUsing.length > 0 && (
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1.5">
                      Used In
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.projectsUsing.map((project) => (
                        <span
                          key={project}
                          className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-md bg-accent-bg text-accent"
                        >
                          <ExternalLink className="h-2.5 w-2.5" />
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  )
}
