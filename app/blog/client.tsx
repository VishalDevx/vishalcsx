'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react'
import { staggerContainer, scaleIn } from '@/lib/animations'
import { formatDate, calculateReadingTime } from '@/lib/utils'
import type { BlogPost } from '@/types'

const ArchitectureNetwork = dynamic(() => import('@/components/3d/ArchitectureNetwork').then(mod => ({ default: mod.ArchitectureNetwork })), { ssr: false })

const PLACEHOLDERS = ['Search articles...', 'Try: multi-tenant...', 'Try: Redis caching...']

interface BlogPageClientProps {
  posts: BlogPost[]
  categories: string[]
}

export function BlogPageClient({ posts, categories }: BlogPageClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [focused, setFocused] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.07] dark:opacity-[0.04]" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)' }}>
        <ArchitectureNetwork />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Blog
            </div>
            <h1 className="text-[clamp(36px,11vw,88px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Technical<br /><span className="text-transparent" style={{ WebkitTextStroke: "1px var(--stroke)" }}>Articles</span>
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
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              className="w-full h-9 pl-9 pr-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: `0.5px solid ${focused ? '#00F5FF' : 'var(--border-color)'}`,
                borderRadius: '6px',
                boxShadow: focused ? '0 0 0 2px rgba(0,245,255,0.1)' : 'none',
              }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCategory('all')}
              className="tag transition-all duration-200"
              style={activeCategory === 'all' ? { background: '#00F5FF', color: '#050505', borderColor: '#00F5FF' } : {}}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="tag transition-all duration-200"
                style={activeCategory === cat ? { background: '#00F5FF', color: '#050505', borderColor: '#00F5FF' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <div className="mb-10 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <Link href={`/blog/${featured.slug}`} className="group relative block bg-[var(--bg-primary)] p-5 transition-all hover:shadow-[0_0_20px_rgba(0,245,255,0.06)] sm:p-6 lg:p-7">
              <div className="absolute left-0 top-0 h-full w-[4px] bg-[#00F5FF]" />
              <div className="flex items-center gap-3 mb-3">
                <span className="tag-accent">Featured</span>
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{featured.category}</span>
                <span className="ml-auto font-dm-mono flex items-center gap-1 rounded border border-[var(--border-color)] px-2 py-[2px] text-[9px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                  <Clock size={9} /> {calculateReadingTime(featured.content)} min
                </span>
              </div>
              <h2 className="font-syne text-xl font-bold tracking-[-0.02em] transition-colors group-hover:text-[#00F5FF] sm:text-2xl" style={{ color: 'var(--text-primary)' }}>
                {featured.title}
              </h2>
              <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{featured.excerpt}</p>
              <div className="mt-3 flex items-center gap-4 font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1"><Calendar size={10} /> {formatDate(featured.createdAt)}</span>
                <span className="flex items-center gap-1 ml-auto transition-all group-hover:translate-x-[4px]">
                  Read <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          </div>
        )}

        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <p className="font-dm-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>No articles found.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + search}
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="show"
              className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2"
              style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}
            >
              {filtered
                .filter((p) => !p.featured || p.slug !== featured?.slug)
                .map((post) => (
                  <motion.div key={post.slug} variants={scaleIn}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group block bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6"
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
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </div>
  )
}
