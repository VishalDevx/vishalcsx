'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react'
import type { BlogPost } from '@/types'
import { formatDate, calculateReadingTime } from '@/lib/utils'

const AuroraBackground = dynamic(() => import('@/components/shaders/AuroraBackground').then(mod => ({ default: mod.AuroraBackground })), { ssr: false })

interface BlogDetailClientProps {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export function BlogDetailClient({ post, relatedPosts }: BlogDetailClientProps) {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10">
        <AuroraBackground />
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="tag inline-flex items-center gap-1.5 mb-8">
          <ArrowLeft size={9} /> Back
        </Link>

        <div className="mb-4">
          <div className="font-dm-mono mb-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>{post.category || 'Article'}</div>
          <h1 className="font-syne text-[clamp(1.75rem,4vw,3rem)] font-bold tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8 font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1.5"><Calendar size={11} /> {formatDate(post.createdAt)}</span>
          <span className="flex items-center gap-1.5"><Clock size={11} /> {calculateReadingTime(post.content)} min read</span>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag size={11} />
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {post.imageUrl && (
          <div className="mb-10 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <img src={post.imageUrl} alt={post.title} className="w-full object-cover" />
          </div>
        )}

        <div
          className="text-sm font-light leading-relaxed [&_h2]:font-syne [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-syne [&_h3]:text-lg [&_h3]:font-bold [&_h3]:tracking-[-0.02em] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_code]:font-dm-mono [&_code]:text-[10px] [&_code]:bg-[var(--bg-tertiary)] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-[var(--bg-tertiary)] [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-4 [&_blockquote]:text-[var(--text-muted)] [&_blockquote]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_a]:text-[var(--accent-text)] [&_a]:underline [&_img]:rounded-xl [&_img]:border [&_img]:border-[var(--card-border)]"
          style={{ color: 'var(--text-secondary)' }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10" style={{ borderTop: '0.5px solid var(--border-color)' }}>
            <div className="section-header mb-6">
              <span className="section-header-text">Related Articles</span>
              <div className="section-header-line" />
            </div>
            <div className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group bg-[var(--bg-primary)] p-4 transition-colors hover:bg-[var(--card-hover)] sm:p-5"
                >
                  <h3 className="font-syne text-sm font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]" style={{ color: 'var(--text-primary)' }}>
                    {related.title}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{related.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  )
}
