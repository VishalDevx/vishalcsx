'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BlogPost } from '@/types'

interface LatestArticlesProps {
  posts: BlogPost[]
}

export function LatestArticles({ posts }: LatestArticlesProps) {
  const publishedArticles = posts?.filter((b) => b.published !== false).slice(0, 2) || []

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-6 sm:mb-8">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Latest Articles</span>
          <div className="hidden h-px flex-1 sm:block" style={{ backgroundColor: 'var(--divider-line)' }} />
          <Link href="/blog" className="tag inline-flex w-fit items-center gap-1.5">
            All Posts <ArrowUpRight size={9} />
          </Link>
        </div>

        {publishedArticles.length > 0 ? (
          <div className="grid gap-px overflow-hidden rounded-xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
            {publishedArticles.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group cursor-pointer p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6 md:p-7" style={{ backgroundColor: 'var(--card-bg)' }}>
                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>{post.createdAt?.split('T')[0] || ''}</span>
                  <ArrowUpRight size={14} className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--arrow-color)' }} />
                </div>
                <h4 className="mb-2 text-[17px] font-bold leading-tight tracking-[-0.01em] transition-colors group-hover:text-[var(--accent)] sm:text-[18px]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>{post.title}</h4>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{post.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border p-8 text-center sm:p-10" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No articles yet. Check back soon.</p>
          </div>
        )}
      </div>
    </section>
  )
}
