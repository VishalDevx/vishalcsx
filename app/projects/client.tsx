'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'

const ProjectGalaxy = dynamic(() => import('@/components/3d/ProjectGalaxy').then(mod => ({ default: mod.ProjectGalaxy })), { ssr: false })

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
    <div className="relative min-h-screen overflow-hidden pt-14 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
        <ProjectGalaxy />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Projects
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Featured Work<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>& Case Studies</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              A selection of projects spanning full-stack applications, backend systems, and architectural designs.
            </p>
          </div>
        </header>

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
    </div>
  )
}
