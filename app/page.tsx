import { getProjects } from '@/lib/projects'
import { getBlogPosts } from '@/lib/blog'
import { HomeClient } from './home-client'

export default function HomePage() {
  const projects = getProjects()
  const posts = getBlogPosts()

  return <HomeClient projects={projects} posts={posts} />
}
