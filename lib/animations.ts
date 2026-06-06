export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
}

export const staggerContainer = (stagger = 0.1, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
}

export const heroImage = {
  hidden: { opacity: 0, scale: 0.92, x: 20 },
  show: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
}
