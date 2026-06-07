'use client'

import dynamic from 'next/dynamic'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { KeyboardShortcuts } from '@/components/layout/KeyboardShortcuts'
import { PageCurtain } from '@/components/layout/PageCurtain'

const CustomCursor = dynamic(() => import('@/components/global/CustomCursor').then(mod => ({ default: mod.CustomCursor })), { ssr: false })

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 2,
          },
        },
      }),
  )

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <PageCurtain />
        <CustomCursor />
        <KeyboardShortcuts />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  )
}
