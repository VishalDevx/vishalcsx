'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/types'
import { ProjectCard3D } from '@/components/3d/ProjectCard3D'

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((project, i) => (
            <ProjectCard3D key={project.slug} project={project} index={i} />
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
