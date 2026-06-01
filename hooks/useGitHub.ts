'use client'

import { useQuery } from '@tanstack/react-query'
import type { GitHubStats } from '@/types'

export function useGitHubStats(enabled = true) {
  return useQuery<GitHubStats>({
    queryKey: ['github-stats'],
    queryFn: async () => {
      const res = await fetch('/api/github/stats')
      if (!res.ok) throw new Error('Failed to fetch GitHub stats')
      return res.json()
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
    enabled,
  })
}

export function useGitHubPinned() {
  return useQuery({
    queryKey: ['github-pinned'],
    queryFn: async () => {
      const res = await fetch('/api/github/pinned')
      if (!res.ok) throw new Error('Failed to fetch pinned repos')
      return res.json()
    },
    staleTime: 1000 * 60 * 60,
    retry: 2,
  })
}
