import { getProjects } from '@/lib/projects'
import { getBlogPosts } from '@/lib/blog'
import { Hero } from '@/components/sections/Hero'
import { LatestArticles } from '@/components/sections/LatestArticles'
import { FeaturedProjects } from '@/components/sections/FeaturedProjects'
import { TechStack } from '@/components/sections/TechStack'

export default function HomePage() {
  const projects = getProjects()
  const posts = getBlogPosts()

  return (
    <>
      <Hero />
      <FeaturedProjects projects={projects} />
      <TechStack />
      <LatestArticles posts={posts} />
    </>
  )
}
