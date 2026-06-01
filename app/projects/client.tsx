'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

interface ProjectsPageClientProps {
  projects: Project[]
  categories: string[]
}

export function ProjectsPageClient({ projects, categories }: ProjectsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="pt-32 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <div className="section-header">
            <span className="section-header-text">Projects</span>
            <div className="section-header-line" />
          </div>
          <h1 className="font-syne text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
            Featured Work & Case Studies
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            A selection of projects spanning full-stack applications, backend systems, and architectural designs.
          </p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveCategory('all')}
              className="tag"
              style={activeCategory === 'all' ? { background: 'var(--accent-bg)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : {}}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="tag"
                style={activeCategory === cat ? { background: 'var(--accent-bg)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-dm-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
            {filtered.map((project, i) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6 lg:p-7"
                style={i < filtered.length - 1 && filtered.length > 2 && i % 2 === 0 && i < filtered.length - (filtered.length % 2 || 2) ? {} : {}}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="tag-accent">{project.category || 'Project'}</span>
                  <ArrowUpRight size={18} className="shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--text-muted)' }} />
                </div>
                <h3 className="font-syne text-[22px] font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)] sm:text-[24px]" style={{ color: 'var(--text-primary)' }}>
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
        )}
      </div>
    </div>
  )
}
