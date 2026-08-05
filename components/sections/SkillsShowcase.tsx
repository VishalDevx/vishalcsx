'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, LayoutPanelTop, Server, Database, Braces, Boxes, Cpu } from 'lucide-react'
import { useData } from '@/lib/use-data'
import { ScrollReveal } from '@/components/global/ScrollReveal'

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  LayoutPanelTop, Server, Database, Braces, Boxes, Cpu,
}

const CORE_TOOLS = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL',
  'Prisma', 'Redis', 'Docker', 'Tailwind CSS', 'REST APIs', 'System Design',
  'CI/CD', 'MongoDB', 'Git', 'Framer Motion',
]

export function SkillsShowcase() {
  const { data: skills, loading } = useData<any[]>('skills')

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle at 15% 20%, rgba(0,245,255,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(123,47,255,0.35), transparent 45%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-4 sm:mb-12">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Skills</span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          <Link href="/skills" className="font-dm-mono hidden items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] sm:flex" style={{ color: 'var(--text-muted)' }}>
            All skills <ArrowUpRight size={9} />
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-14">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="mb-5 text-[clamp(32px,5vw,56px)] font-extrabold leading-[0.95] tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Skills that ship<br />
              <span className="text-gradient-cyber">real systems</span>
            </h2>
            <p className="mb-8 max-w-[480px] text-sm font-light leading-7 sm:text-[15px] sm:leading-8" style={{ color: 'var(--text-secondary)' }}>
              Backend-first engineering across the full stack — multi-tenant architecture, APIs, databases, infrastructure, and clean UI systems built for production, not demos.
            </p>

            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
              {[
                { value: skills?.length ? String(skills.length) : '6', label: 'Skill Areas' },
                { value: '15+', label: 'Core Tools' },
                { value: '3+', label: 'Years Coding' },
              ].map((s) => (
                <div key={s.label} className="bg-[var(--bg-primary)] p-4 sm:p-5">
                  <p className="font-syne text-[22px] font-bold leading-none sm:text-2xl" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                  <p className="font-dm-mono mt-2 text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/skills" className="btn-primary">
                Explore skills <ArrowUpRight size={12} />
              </Link>
              <Link href="/contact" className="btn-secondary">
                Hire me
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(loading ? [] : (skills ?? [])).map((skill: any, i: number) => {
              const Icon = iconMap[skill.icon] || Cpu
              return (
                <motion.div
                  key={skill.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: (i % 2) * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300 hover:border-[rgba(0,245,255,0.18)] hover:shadow-[0_0_40px_rgba(0,245,255,0.05)] sm:p-6"
                  style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.04), transparent)' }}
                  />
                  <div className="relative z-[1]">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
                        <Icon size={17} style={{ color: 'var(--accent-text)' }} />
                      </div>
                      <span className="font-dm-mono text-[9px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{skill.label}</span>
                    </div>
                    <h3 className="mb-2 text-[16px] font-bold tracking-[-0.01em] transition-colors group-hover:text-[var(--accent-text)]" style={{ fontFamily: "'Syne', sans-serif" }}>{skill.title}</h3>
                    <p className="mb-4 text-[13px] font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{skill.description}</p>
                    <div className="flex flex-wrap gap-[6px]">
                      {(skill.stack ?? []).slice(0, 5).map((tech: string) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <ScrollReveal direction="up" duration={0.6}>
          <div className="mt-12 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-5 sm:px-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
              {CORE_TOOLS.map((tool) => (
                <span key={tool} className="tag">{tool}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
