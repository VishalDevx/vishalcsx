'use client'

import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Calendar, Clock, Search } from 'lucide-react'
import { formatDate, calculateReadingTime } from '@/lib/utils'
import type { BlogPost } from '@/types'

const AuroraBackground = dynamic(() => import('@/components/shaders/AuroraBackground').then(mod => ({ default: mod.AuroraBackground })), { ssr: false })

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: string[]
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filtered = posts.filter((post) => {
    const matchesSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const featured = posts.find((p) => p.featured)

  return (
    <div className="relative min-h-screen overflow-hidden pt-14 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10">
        <AuroraBackground />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Blog
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Technical<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)" }}>Articles</span>
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              Engineering deep-dives, system design concepts, and architectural patterns.
            </p>
          </div>
        </header>

        <div className="flex flex-col gap-3 mb-8 sm:flex-row">
          <div className="relative flex-1">
            <Search size={11} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full h-9 pl-9 pr-3 text-sm outline-none"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '0.5px solid var(--border-color)',
                borderRadius: '6px',
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
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
        </div>

        {featured && (
          <div className="mb-10 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <Link href={`/blog/${featured.slug}`} className="group block bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6 lg:p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="tag-accent">Featured</span>
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{featured.category}</span>
              </div>
              <h2 className="font-syne text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)] sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
                {featured.title}
              </h2>
              <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{featured.excerpt}</p>
              <div className="mt-3 flex items-center gap-4 font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(featured.createdAt)}</span>
                <span className="flex items-center gap-1"><Clock size={10} /> {calculateReadingTime(featured.content)} min read</span>
              </div>
            </Link>
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-dm-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>No articles found.</p>
          </div>
        ) : (
          <div className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
            {filtered
              .filter((p) => !p.featured || p.slug !== featured?.slug)
              .map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6"
                >
                  <div className="font-dm-mono mb-3 text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{post.category}</div>
                  <h3 className="font-syne text-sm font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]" style={{ color: 'var(--text-primary)' }}>
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-light leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                  <div className="mt-3 flex items-center gap-4 font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(post.createdAt)}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {calculateReadingTime(post.content)} min read</span>
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
