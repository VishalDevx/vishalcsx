'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { pageTransitionVariants } from '@/lib/animations'

const EXCLUDED_PATHS = ['/admin']

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isExcluded = EXCLUDED_PATHS.some((p) => pathname.startsWith(p))

  if (isExcluded) return <>{children}</>

  return (
    <motion.div
      key={pathname}
      className="book-spine"
      variants={pageTransitionVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
