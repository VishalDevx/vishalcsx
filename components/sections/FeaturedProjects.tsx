'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Projects</span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          <Link href="/projects" className="tag hidden sm:inline-flex items-center gap-1.5">
            View all <ArrowUpRight size={9} />
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
          {projects.slice(0, 3).map((project, i) => (
            <Link key={project.slug} href={`/projects/${project.slug}`} className={`group block p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6 lg:p-8 ${i < Math.min(projects.length, 3) - 1 ? 'border-b' : ''}`} style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--card-border)' }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <span className="tag-accent">{project.category || 'Project'}</span>
                <ArrowUpRight size={18} className="shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--text-muted)' }} />
              </div>
              <h3 className="text-[22px] font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent)] sm:text-[24px] lg:text-[26px]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>
                {project.title}
              </h3>
              <p className="mt-2 max-w-[640px] text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack?.slice(0, 6).map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden">
          <Link href="/projects" className="tag inline-flex items-center gap-1.5">
            View all projects <ArrowUpRight size={9} />
          </Link>
        </div>
      </div>
    </section>
  )
}
