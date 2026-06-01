'use client'

import { ArrowUpRight, LayoutPanelTop, Server, Database, Braces, Boxes, Cpu } from 'lucide-react'
import Link from 'next/link'

const stackGroups = [
  { title: 'Full-Stack Engineering', icon: LayoutPanelTop, items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'] },
  { title: 'Backend & System Design', icon: Server, items: ['Node.js', 'Express', 'REST APIs', 'Microservices', 'Auth'] },
  { title: 'Database & Data Layer', icon: Database, items: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis', 'Supabase'] },
  { title: 'Frontend & UI Engineering', icon: Braces, items: ['React', 'Next.js', 'Framer Motion', 'Three.js', 'Shadcn UI'] },
  { title: 'DevOps & Infrastructure', icon: Boxes, items: ['Docker', 'CI/CD', 'Linux', 'Nginx', 'GitHub Actions'] },
  { title: 'Architecture & Patterns', icon: Cpu, items: ['Monorepos', 'Event-Driven', 'Caching', 'Rate Limiting', 'System Design'] },
]

export function TechStack() {
  return (
    <section className="pb-16 sm:pb-20 lg:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Stack</span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          <Link href="/skills" className="tag hidden sm:inline-flex items-center gap-1.5">
            All skills <ArrowUpRight size={9} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
          {stackGroups.map((group) => (
            <div key={group.title} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-syne text-[17px] font-bold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{group.title}</h3>
                <group.icon size={16} style={{ color: 'var(--accent-text)' }} />
              </div>
              <div className="flex flex-wrap gap-[6px]">
                {group.items.map((item) => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/skills" className="tag inline-flex items-center gap-1.5">
            All skills <ArrowUpRight size={9} />
          </Link>
        </div>
      </div>
    </section>
  )
}
