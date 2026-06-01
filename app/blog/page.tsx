import { getBlogPosts, getBlogCategories } from '@/lib/blog'
import { BlogPageClient } from './client'

export const metadata = {
  title: 'Blog',
  description: 'Technical articles on system design, backend engineering, full-stack development, and software architecture.',
  openGraph: {
    title: 'Blog — Vishal Singh',
    description: 'Technical articles on system design, backend engineering, full-stack development, and software architecture.',
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()
  const categories = getBlogCategories()

  return <BlogPageClient posts={posts} categories={categories} />
}
