'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, Activity, Cpu, GitBranch } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { TechStack } from '@/components/sections/TechStack'
import { LatestArticles } from '@/components/sections/LatestArticles'
import { MetricCounter } from '@/components/ui/MetricCounter'
import { useGitHubStats } from '@/hooks/useGitHub'
import type { Project, BlogPost } from '@/types'

const InfraViz = dynamic(() => import('@/components/3d/InfraViz').then(mod => ({ default: mod.InfraViz })), { ssr: false })

interface HomeClientProps {
  projects: Project[]
  posts: BlogPost[]
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
}

export function HomeClient({ projects, posts }: HomeClientProps) {
  const { data: github } = useGitHubStats()

  return (
    <>
      <Hero />

      {/* Now — Current Status */}
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden border-y py-14 sm:py-16 lg:py-20"
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Now</span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Building</span>
              </div>
              <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>Distributed Systems & APIs</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Multi-tenant platforms, caching layers, and event-driven backend services.</p>
            </div>
            <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Learning</span>
              </div>
              <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>Rust, Solana & Protocol Design</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>Systems-level engineering and blockchain-adjacent architecture patterns.</p>
            </div>
            <div className="rounded-xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-amber-500" />
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Exploring</span>
              </div>
              <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>AI Engineering & Graphics</h3>
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>GPU shaders, 3D visualization, and practical LLM integration patterns.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Metrics */}
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Metrics</span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
            <div className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <MetricCounter value={12} label="Projects Built" />
            </div>
            <div className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <MetricCounter value={github?.totalPRs ?? 32} label="Pull Requests" />
            </div>
            <div className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <MetricCounter value={github?.totalStars ?? 15} label="Stars Earned" />
            </div>
            <div className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <MetricCounter value={3} suffix="+" label="Years Experience" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* InfraViz Architecture */}
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden border-y py-14 sm:py-16 lg:py-20"
        style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
          <InfraViz />
        </div>
        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <Cpu size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Architecture</span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
            <Link href="/system-design" className="font-dm-mono hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] sm:flex" style={{ color: 'var(--text-muted)' }}>
              View Systems <ArrowUpRight size={9} />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            <div>
              <h2 className="mb-4 text-[clamp(28px,5vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>
                Infrastructure<br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--stroke)' }}>at a glance</span>
              </h2>
              <p className="mb-6 max-w-[520px] text-sm font-light leading-7 sm:text-[15px] sm:leading-8" style={{ color: 'var(--text-secondary)' }}>
                Full-stack architecture from CDN edge to database replicas — designed for latency, resilience, and horizontal scale. Hover any node to see its role.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>8-layer stack</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Redis caching</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Async job queue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>DB replicas</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="mb-3 flex items-center gap-2">
                  <GitBranch size={12} style={{ color: 'var(--text-muted)' }} />
                  <span className="font-dm-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>System Design Highlights</span>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'API Latency', value: '&lt;50ms p99' },
                    { label: 'Cache Hit Rate', value: '92%' },
                    { label: 'DB Throughput', value: '2.5k qps' },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center justify-between border-b py-2 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                      <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{m.value}</span>
                    </div>
                  ))}
                </div>
                <Link href="/system-design" className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em]" style={{ fontFamily: "'DM Mono', monospace", color: 'var(--accent-text)' }}>
                  View full architecture <ArrowUpRight size={9} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Activity Snapshot */}
      <motion.section
        {...fadeUp}
        className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4 sm:mb-8">
            <Activity size={14} style={{ color: 'var(--text-muted)' }} />
            <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Activity</span>
            <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
            <Link href="/activity" className="font-dm-mono hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] sm:flex" style={{ color: 'var(--text-muted)' }}>
              View all <ArrowUpRight size={9} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Commits (2026)', value: github?.totalCommits ?? '—' },
              { label: 'Pull Requests', value: github?.totalPRs ?? '—' },
              { label: 'Repositories', value: github?.repos?.length ?? '—' },
              { label: 'Followers', value: github?.followers ?? '—' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="font-syne text-[28px] font-bold leading-none tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </div>
                <div className="font-dm-mono mt-2 text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <FeaturedProjects projects={projects} />
      </motion.div>

      <motion.div {...fadeUp}>
        <TechStack />
      </motion.div>

      <motion.div {...fadeUp}>
        <LatestArticles posts={posts} />
      </motion.div>
    </>
  )
}
