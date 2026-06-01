'use client'

import { useState } from 'react'
import { ArrowUpRight, Server, Database, Shield, GitBranch, Layers, Workflow, RefreshCw, Globe } from 'lucide-react'

const concepts = [
  { icon: Server, title: 'Load Balancing', description: 'Round-robin, least connections, and IP hash strategies for distributing traffic across servers.' },
  { icon: Database, title: 'Caching Layers', description: 'Multi-level caching with L1 (in-memory), L2 (Redis), and CDN edge caching for optimal performance.' },
  { icon: Shield, title: 'Rate Limiting', description: 'Token bucket and leaky bucket algorithms to protect APIs from abuse and ensure fair usage.' },
  { icon: Workflow, title: 'Event-Driven Architecture', description: 'Message queue based decoupled systems for async processing, event sourcing, and CQRS patterns.' },
  { icon: GitBranch, title: 'Database Sharding', description: 'Horizontal partitioning strategies for scaling databases beyond single node limits.' },
  { icon: Layers, title: 'Microservices', description: 'Service decomposition patterns, inter-service communication, and distributed data management.' },
  { icon: RefreshCw, title: 'CI/CD Pipelines', description: 'Automated build, test, and deployment pipelines ensuring reliable and rapid software delivery.' },
  { icon: Globe, title: 'Global Deployment', description: 'Multi-region deployment strategies with CDN edge caching and DNS-based traffic routing.' },
]

export function SystemDesignSection() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>System Design</span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
          {concepts.map((concept) => (
            <button
              key={concept.title}
              onClick={() => setExpanded(expanded === concept.title ? null : concept.title)}
              className="group bg-[var(--bg-primary)] p-5 text-left transition-colors hover:bg-[var(--card-hover)] sm:p-6 lg:p-7"
            >
              <div className="mb-3 flex items-center justify-between">
                <concept.icon size={16} style={{ color: 'var(--accent-text)' }} />
                <ArrowUpRight
                  size={14}
                  className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  style={{ color: 'var(--arrow-color)' }}
                />
              </div>
              <h3 className="font-syne text-[17px] font-bold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{concept.title}</h3>
              <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {expanded === concept.title ? concept.description : concept.description.split('.')[0] + '.'}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
