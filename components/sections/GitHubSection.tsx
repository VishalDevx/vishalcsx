'use client'

import { motion } from 'framer-motion'
import { Star, GitFork, GitPullRequest, Users } from 'lucide-react'
import { useGitHubStats } from '@/hooks/useGitHub'
import { formatNumber } from '@/lib/utils'
import { Skeleton } from '@/components/ui/LoadingSkeleton'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function GitHubSection() {
  const { data: stats, isLoading } = useGitHubStats()

  const items = [
    { icon: GitPullRequest, label: 'Pull Requests', value: stats?.totalPRs ?? 32 },
    { icon: Star, label: 'Stars Earned', value: stats?.totalStars ?? 15 },
    { icon: GitFork, label: 'Forks', value: stats?.totalForks ?? 8 },
    { icon: Users, label: 'Followers', value: stats?.followers ?? 12 },
  ]

  return (
    <section className="pb-16 sm:pb-20 lg:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <span className="font-dm-mono whitespace-nowrap text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>GitHub</span>
          <div className="h-px flex-1" style={{ backgroundColor: 'var(--divider-line)' }} />
          <Link href="/open-source" className="tag hidden sm:inline-flex items-center gap-1.5">
            View all <ArrowRight size={9} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border sm:grid-cols-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
          {items.map((item) => (
            <div key={item.label} className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ) : (
                <>
                  <item.icon size={16} style={{ color: 'var(--icon-color)' }} />
                  <div className="mt-2 font-syne text-[26px] font-bold tracking-[-0.02em]" style={{ color: 'var(--text-primary)' }}>{formatNumber(item.value)}</div>
                  <div className="font-dm-mono mt-1 text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{item.label}</div>
                </>
              )}
            </div>
          ))}
        </div>

        {stats?.languages && stats.languages.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
            <div className="bg-[var(--bg-primary)] p-5 sm:p-6 lg:p-7">
              <h3 className="font-dm-mono mb-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Languages</h3>
              <div className="space-y-3">
                {stats.languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span className="text-sm w-24 shrink-0" style={{ color: 'var(--text-secondary)' }}>{lang.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                    <span className="font-dm-mono w-10 text-right text-[10px]" style={{ color: 'var(--text-muted)' }}>{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {stats?.pinnedRepos && stats.pinnedRepos.length > 0 && (
          <div className="mt-8">
            <h3 className="font-dm-mono mb-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Pinned Repositories</h3>
            <div className="grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-border)' }}>
              {stats.pinnedRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[var(--bg-primary)] p-5 transition-colors hover:bg-[var(--card-hover)] sm:p-6"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: repo.language ? undefined : '#6b7280' }} />
                    <span className="font-syne text-sm font-bold tracking-[-0.02em] transition-colors group-hover:text-[var(--accent-text)]">{repo.name}</span>
                  </div>
                  <p className="mb-3 text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{repo.description}</p>
                  <div className="flex items-center gap-3 font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1"><Star size={10} /> {repo.stars}</span>
                    <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
