import { getProjects } from '@/lib/projects'
import { HomeClient } from './home-client'

export default function HomePage() {
  const projects = getProjects()

  return <HomeClient projects={projects} />
}
