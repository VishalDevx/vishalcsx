'use client'

import { motion, useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, Activity, Cpu, GitBranch } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { useGitHubStats } from '@/hooks/useGitHub'
import { ScrollReveal } from '@/components/global/ScrollReveal'
import type { Project, BlogPost } from '@/types'

const FeaturedProjects = dynamic(() => import('@/components/sections/FeaturedProjects').then(mod => ({ default: mod.FeaturedProjects })), { ssr: false })
const TechStack = dynamic(() => import('@/components/sections/TechStack').then(mod => ({ default: mod.TechStack })), { ssr: false })
const LatestArticles = dynamic(() => import('@/components/sections/LatestArticles').then(mod => ({ default: mod.LatestArticles })), { ssr: false })
const MetricCounter = dynamic(() => import('@/components/ui/MetricCounter').then(mod => ({ default: mod.MetricCounter })), { ssr: false })
const InfraViz = dynamic(() => import('@/components/3d/InfraViz').then(mod => ({ default: mod.InfraViz })), { ssr: false })

interface HomeClientProps {
  projects: Project[]
  posts: BlogPost[]
}

function LazySection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '200px', once: true })
  return (
    <div ref={ref} className={className} style={style}>
      {inView ? children : null}
    </div>
  )
}

function SectionHeader({ label, href, icon: Icon, linkText = 'View all' }: { label: string; href?: string; icon?: React.ComponentType<{ size?: number; style?: React.CSSProperties }>; linkText?: string }) {
  return (
    <div className="mb-6 flex items-center gap-4 sm:mb-8">
      {Icon && <Icon size={14} style={{ color: 'var(--text-muted)' }} />}
      <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{label}</span>
      <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
      {href && (
        <Link href={href} className="font-dm-mono hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] sm:flex" style={{ color: 'var(--text-muted)' }}>
          {linkText} <ArrowUpRight size={9} />
        </Link>
      )}
    </div>
  )
}

export function HomeClient({ projects, posts }: HomeClientProps) {
  const [ghEnabled, setGhEnabled] = useState(false)
  const { data: github } = useGitHubStats(ghEnabled)

  useEffect(() => {
    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(() => setGhEnabled(true), { timeout: 3000 })
      return () => cancelIdleCallback(id)
    } else {
      const id = setTimeout(() => setGhEnabled(true), 2000)
      return () => clearTimeout(id)
    }
  }, [])

  return (
    <>
      <Hero />

      {/* Now — Current Status */}
      <ScrollReveal direction="up" duration={0.7}>
        <section className="relative overflow-hidden border-y py-14 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              background: 'radial-gradient(circle at 20% 50%, rgba(0,245,255,0.3), transparent 50%), radial-gradient(circle at 80% 50%, rgba(123,47,255,0.3), transparent 50%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Now" />
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { color: 'bg-emerald-500', title: 'Distributed Systems & APIs', desc: 'Multi-tenant platforms, caching layers, and event-driven backend services.' },
                { color: 'bg-blue-500', title: 'Learning AI, LLMs & ML', desc: 'Studying LLM integration, RAG pipelines, AI agents, and ML system concepts.' },
                { color: 'bg-amber-500', title: 'AI Engineering & Graphics', desc: 'GPU shaders, 3D visualization, and practical LLM integration patterns.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-xl border p-5 sm:p-6 transition-all duration-300 hover:border-[rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(0,245,255,0.04)]"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.03), transparent)',
                    }}
                  />
                  <div className="relative z-[1]">
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`flex h-2 w-2 rounded-full ${item.color}`} />
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
                        {['Building', 'Learning', 'Exploring'][i]}
                      </span>
                    </div>
                    <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>{item.title}</h3>
                    <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Metrics */}
      <ScrollReveal direction="up" duration={0.7}>
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Metrics" />
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
              {[
                { value: 12, label: 'Projects Built' },
                { value: github?.totalPRs ?? 32, label: 'Pull Requests' },
                { value: github?.totalStars ?? 15, label: 'Stars Earned' },
                { value: 3, suffix: '+', label: 'Years Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7"
                >
                  <MetricCounter value={stat.value as number} suffix={stat.suffix} label={stat.label} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* InfraViz Architecture */}
      <LazySection>
        <ScrollReveal direction="up" duration={0.7}>
          <section className="relative overflow-hidden border-y py-14 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}>
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.12]">
              <InfraViz />
            </div>
            <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                background: 'radial-gradient(circle at 30% 70%, rgba(123,47,255,0.4), transparent 50%)',
              }}
            />
            <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <SectionHeader label="Architecture" icon={Cpu} href="/system-design" linkText="View Systems" />
              <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
                <div>
                  <h2 className="mb-4 text-[clamp(28px,5vw,48px)] font-extrabold leading-[0.95] tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>
                    Infrastructure<br />
                    <span className="text-gradient-cyber">at a glance</span>
                  </h2>
                  <p className="mb-6 max-w-[520px] text-sm font-light leading-7 sm:text-[15px] sm:leading-8" style={{ color: 'var(--text-secondary)' }}>
                    Full-stack architecture from CDN edge to database replicas — designed for latency, resilience, and horizontal scale. Hover any node to see its role.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]" />
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>8-layer stack</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Redis caching</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#00F5FF]" />
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>Async job queue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7]" />
                      <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>DB replicas</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="relative overflow-hidden rounded-xl border p-5" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-surface)' }} />
                    <div className="relative z-[1]">
                      <div className="mb-3 flex items-center gap-2">
                        <GitBranch size={12} style={{ color: 'var(--text-muted)' }} />
                        <span className="font-dm-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>System Design Highlights</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'API Latency', value: '<50ms p99' },
                          { label: 'Cache Hit Rate', value: '92%' },
                          { label: 'DB Throughput', value: '2.5k qps' },
                        ].map((m) => (
                          <div key={m.label} className="flex items-center justify-between border-b py-2 text-sm" style={{ borderColor: 'var(--border-subtle)' }}>
                            <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                      <Link href="/system-design" className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] group" style={{ fontFamily: "'DM Mono', monospace", color: 'var(--accent-text)' }}>
                        View full architecture <ArrowUpRight size={9} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </LazySection>

      {/* Activity Snapshot */}
      <ScrollReveal direction="up" duration={0.7}>
        <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Activity" icon={Activity} href="/activity" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Commits (2026)', value: github?.totalCommits ?? '—' },
                { label: 'Pull Requests', value: github?.totalPRs ?? '—' },
                { label: 'Repositories', value: github?.repos?.length ?? '—' },
                { label: 'Followers', value: github?.followers ?? '—' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:border-[rgba(0,245,255,0.1)]"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.03), transparent)',
                    }}
                  />
                  <div className="relative z-[1]">
                    <div className="font-syne text-[28px] font-bold leading-none tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>
                      {stat.value}
                    </div>
                    <div className="font-dm-mono mt-2 text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <LazySection>
        <ScrollReveal direction="up" duration={0.7}>
          <FeaturedProjects projects={projects} />
        </ScrollReveal>
      </LazySection>

      {/* Currently Building */}
      <LazySection>
        <ScrollReveal direction="up" duration={0.7}>
          <section className="relative overflow-hidden border-y py-14 sm:py-16 lg:py-20" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-subtle)' }}>
            <div className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                background: 'radial-gradient(circle at 70% 30%, rgba(0,245,255,0.3), transparent 50%)',
              }}
            />
            <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center gap-4 sm:mb-10">
                <span className="font-dm-mono whitespace-nowrap text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>CHAPTER // NOW</span>
                <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
              </div>
              <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-12">
                <div>
                  <h2 className="font-syne text-[clamp(28px,5vw,42px)] font-bold leading-[0.95] tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
                    Currently in<br />motion.
                  </h2>
                </div>
                <div className="space-y-px overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
                  {[
                    { color: 'bg-emerald-500', status: 'ACTIVE', label: 'Product System', title: 'Expanding the School Management System', desc: 'Multi-tenant school platform with stronger module structure, workflow clarity, and production-focused backend decisions.', tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'] },
                    { color: 'bg-[#A855F7]', status: 'LEARNING', label: 'AI Engineering', title: 'Studying LLM Integration & AI Concepts', desc: 'Learning LLM APIs, RAG concepts, AI agent architecture, and ML system fundamentals.', tags: ['AI', 'LLMs', 'RAG', 'Python'] },
                    { color: 'bg-[#00F5FF]', status: 'BUILDING', label: 'Brand + Frontend', title: 'Turning the Portfolio into a Structured Product', desc: 'Building the portfolio like an actual system — with reusable sections and stronger frontend structure.', tags: ['Next.js', 'Tailwind', 'Framer Motion', 'UI Systems'] },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="group bg-[var(--bg-primary)] p-5 transition-all duration-300 hover:bg-[var(--bg-secondary)] sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 h-10 w-1 flex-shrink-0 rounded-full ${item.color}`} />
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="tag-accent">{item.label}</span>
                            <span className="font-dm-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{item.status}</span>
                          </div>
                          <h3 className="mb-2 text-[17px] font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>{item.title}</h3>
                          <p className="mb-3 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                          <div className="flex flex-wrap gap-[6px]">
                            {item.tags.map((tag) => (
                              <span key={tag} className="tag">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </LazySection>

      <LazySection>
        <ScrollReveal direction="up" duration={0.7}>
          <TechStack />
        </ScrollReveal>
      </LazySection>

      <LazySection>
        <ScrollReveal direction="up" duration={0.7}>
          <LatestArticles posts={posts} />
        </ScrollReveal>
      </LazySection>
    </>
  )
}
