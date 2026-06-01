import fs from 'fs'
import path from 'path'
import type { Project } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json')

export function getProjects(): Project[] {
  const raw = fs.readFileSync(PROJECTS_FILE, 'utf-8')
  const data = JSON.parse(raw)
  return (data.projects || data || []).filter((p: Project) => p.published !== false)
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getProjects()
  return projects.find((p) => p.slug === slug) || null
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured)
}

export function getProjectCategories(): string[] {
  const projects = getProjects()
  return [...new Set(projects.map((p) => p.category).filter(Boolean))] as string[]
}
