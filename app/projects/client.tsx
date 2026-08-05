'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowUpRight, ExternalLink, Github, Search, X } from 'lucide-react'
import type { Project } from '@/types'
import { ProjectVisual } from '@/lib/project-visuals'

const ProjectGalaxy = dynamic(() => import('@/components/3d/ProjectGalaxy').then(mod => ({ default: mod.ProjectGalaxy })), { ssr: false })

interface ProjectsPageClientProps {
  projects: Project[]
  categories: string[]
}

export function ProjectsPageClient({ projects, categories }: ProjectsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const inCategory = activeCategory === 'all' || p.category === activeCategory
      if (!inCategory) return false
      if (!q) return true
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some((t) => t.toLowerCase().includes(q)) ||
        p.seniorTopics?.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [projects, activeCategory, query])

  return (
    <div className="relative min-h-screen overflow-hidden pt-14 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20">
        <ProjectGalaxy />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-12 sm:pb-12 sm:pt-14 lg:mb-14 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Projects
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Featured Work<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>& Case Studies</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              {projects.length} systems shipped across full-stack applications, backend infrastructure, and real-time products — each documented as a case study with architecture, trade-offs, and lessons learned.
            </p>
          </div>
        </header>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className="tag"
              style={activeCategory === 'all' ? { background: 'var(--accent-bg)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : {}}
            >
              All ({projects.length})
            </button>
            {categories.map((cat) => {
              const count = projects.filter((p) => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="tag"
                  style={activeCategory === cat ? { background: 'var(--accent-bg)', color: 'var(--accent-text)', borderColor: 'var(--accent)' } : {}}
                >
                  {cat} ({count})
                </button>
              )
            })}
          </div>

          <div className="relative w-full max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--text-muted)' }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, topics…"
              className="w-full rounded-lg border py-2 pl-9 pr-9 text-sm outline-none transition-colors focus:border-[var(--accent)]"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', fontFamily: "'DM Mono', monospace" }}
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-dm-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>No projects match your filters.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>
              Showing {filtered.length} of {projects.length} projects
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border transition-all hover:border-[var(--accent)]/40 hover:shadow-[0_0_30px_rgba(0,245,255,0.05)]"
      style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="relative h-44 overflow-hidden border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={`${project.title} — live site preview`}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <ProjectVisual project={project} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-transparent to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="tag-accent">{project.category}</span>
          <span className="font-dm-mono rounded px-2 py-0.5 text-[9px] uppercase tracking-[0.12em]" style={{ background: 'rgba(5,5,5,0.55)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-1.5">
          {project.liveUrl && (
            <span
              onClick={(e) => { e.preventDefault(); window.open(project.liveUrl, '_blank', 'noopener,noreferrer') }}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[var(--accent-bg)]"
              style={{ background: 'rgba(5,5,5,0.55)', color: 'var(--text-secondary)', backdropFilter: 'blur(6px)' }}
              title="Live demo"
            >
              <ExternalLink size={12} />
            </span>
          )}
          {project.githubUrl && (
            <span
              onClick={(e) => { e.preventDefault(); window.open(project.githubUrl, '_blank', 'noopener,noreferrer') }}
              className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-[var(--accent-bg)]"
              style={{ background: 'rgba(5,5,5,0.55)', color: 'var(--text-secondary)', backdropFilter: 'blur(6px)' }}
              title="Source code"
            >
              <Github size={12} />
            </span>
          )}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-syne text-[18px] font-bold leading-snug tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]" style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h3>
          <ArrowUpRight size={16} className="mt-1 shrink-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--text-muted)' }} />
        </div>
        <p className="mt-2 text-sm font-light leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-4 gap-px overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label} className="px-2 py-1.5" style={{ background: 'var(--bg-tertiary)' }}>
                <div className="font-syne text-[13px] font-bold leading-none" style={{ color: 'var(--accent-text)' }}>{m.val}</div>
                <div className="mt-1 truncate font-dm-mono text-[7px] uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 4).map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
          {(project.techStack?.length || 0) > 4 && (
            <span className="tag">+{project.techStack!.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  )
}
