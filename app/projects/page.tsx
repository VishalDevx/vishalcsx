import { getProjects, getProjectCategories } from '@/lib/projects'
import { ProjectsPageClient } from './client'

export const metadata = {
  title: 'Projects',
  description: 'Featured projects and case studies — full-stack applications, backend systems, and architecture designs.',
  openGraph: {
    title: 'Projects — Vishal Singh',
    description: 'Featured projects and case studies — full-stack applications, backend systems, and architecture designs.',
  },
}

export default function ProjectsPage() {
  const projects = getProjects()
  const categories = getProjectCategories()

  return <ProjectsPageClient projects={projects} categories={categories} />
}
