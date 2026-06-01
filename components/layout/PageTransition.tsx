'use client'

import { motion } from 'framer-motion'

const pageVariants = {
  initial: { opacity: 0, y: -10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const, delay: 0.1 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeOut' as const } },
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.div>
  )
}
