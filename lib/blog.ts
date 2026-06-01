import fs from 'fs'
import path from 'path'
import type { BlogPost } from '@/types'

const DATA_DIR = path.join(process.cwd(), 'data')
const BLOGS_FILE = path.join(DATA_DIR, 'blogs.json')

export function getBlogPosts(): BlogPost[] {
  const raw = fs.readFileSync(BLOGS_FILE, 'utf-8')
  const data = JSON.parse(raw)
  return (data.blogs || data || [])
    .filter((p: BlogPost) => p.published !== false)
    .sort(
      (a: BlogPost, b: BlogPost) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((p) => p.slug === slug) || null
}

export function getBlogCategories(): string[] {
  const posts = getBlogPosts()
  return [...new Set(posts.map((p) => p.category).filter(Boolean))] as string[]
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getBlogPostBySlug(slug)
  if (!post) return []
  const posts = getBlogPosts().filter((p) => p.slug !== slug)
  return posts
    .sort((a, b) => {
      const aScore = a.tags.filter((t) => post.tags.includes(t)).length
      const bScore = b.tags.filter((t) => post.tags.includes(t)).length
      return bScore - aScore
    })
    .slice(0, limit)
}
