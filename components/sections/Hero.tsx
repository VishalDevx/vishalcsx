'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile } from '@/config/site'
import { heroContainer, heroItem, heroImage } from '@/lib/animations'
import dynamic from 'next/dynamic'

const HeroBackground = dynamic(() => import('@/components/3d/HeroBackground').then(mod => ({ default: mod.HeroBackground })), { ssr: false })

const ROLES = ['BACKEND ARCHITECT', 'SYSTEM DESIGNER', 'DEVOPS ENGINEER', 'SAAS BUILDER']
const STATS = [
  { value: 12, suffix: '+', label: 'Projects Built' },
  { value: 45, suffix: '+', label: 'OSS Contributions' },
  { value: 3, suffix: '+', label: 'Years Experience' },
]

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const rounded = useTransform(motionValue, (v) => Math.round(v))
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = value / steps
    let current = 0
    let step = 0
    const timer = setInterval(() => {
      step++
      current = Math.min(current + increment, value)
      setDisplay(Math.round(current))
      motionValue.set(current)
      if (step >= steps) {
        setDisplay(value)
        clearInterval(timer)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, motionValue])

  return (
    <div ref={ref} className={`px-5 py-4 transition-colors hover:bg-[var(--card-hover)] sm:px-6 md:px-7`} style={{ backgroundColor: 'var(--card-bg)' }}>
      <p className="font-syne text-2xl font-bold leading-none sm:text-[28px] md:text-3xl" style={{ color: 'var(--text-primary)' }}>
        {display}{suffix}
      </p>
      <p className="font-dm-mono mt-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{label}</p>
    </div>
  )
}

function MagneticButton({ children, className, href, download }: { children: React.ReactNode; className: string; href: string; download?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 100, damping: 20 })
  const springY = useSpring(y, { stiffness: 100, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - rect.left - rect.width / 2
    const dy = e.clientY - rect.top - rect.height / 2
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 60) {
      const maxOffset = 8
      const angle = Math.atan2(dy, dx)
      const offset = Math.min(dist, maxOffset)
      x.set(Math.cos(angle) * offset)
      y.set(Math.sin(angle) * offset)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Tag = href.startsWith('/') ? Link : 'a'
  const linkProps = href.startsWith('/') ? { href } : { href, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <a
      ref={ref}
      {...linkProps}
      download={download}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transform: `translate(${springX.get()}px, ${springY.get()}px)` }}
    >
      {children}
    </a>
  ) as any
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const imageX = useMotionValue(0)
  const imageY = useMotionValue(0)
  const springImageX = useSpring(imageX, { stiffness: 100, damping: 20 })
  const springImageY = useSpring(imageY, { stiffness: 100, damping: 20 })

  useEffect(() => {
    if (!profile?.roles?.length) return
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const xPct = (e.clientX - rect.left) / rect.width - 0.5
      const yPct = (e.clientY - rect.top) / rect.height - 0.5
      imageX.set(-xPct * 24)
      imageY.set(-yPct * 16)
    }
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [imageX, imageY])

  const firstName = (profile.name?.split(' ')[0] || 'Vishal').split('')
  const lastName = (profile.name?.split(' ').slice(1).join(' ') || 'Singh').split('')

  return (
    <section ref={heroRef} className="relative overflow-hidden pt-14" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="glow-blob" style={{ left: '-80px', top: '-60px', width: 260, height: 260, background: 'var(--glow)' }} />
        <div className="glow-blob" style={{ right: '-40px', bottom: '-40px', width: 240, height: 240, background: 'var(--glow)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" animate="show" variants={heroContainer} className="flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <motion.span variants={heroItem} className="font-dm-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>vishal.dev</motion.span>
          <motion.div variants={heroItem} className="flex items-center gap-2 self-start sm:self-auto">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-emerald-500" />
            </span>
            <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-secondary)' }}>Open to work</span>
          </motion.div>
        </motion.div>

        <div className="grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 lg:pb-16 lg:pt-10">
          <motion.div initial="hidden" animate="show" variants={heroContainer} className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:gap-8">
            <motion.div variants={heroItem} className="lg:hidden">
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                  <Image src="https://avatars.githubusercontent.com/VishalDevx" alt={profile.name} fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(161,161,170,0.8)' }}>{profile.name} — {profile.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={heroItem}>
              <div className="inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 sm:gap-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Role</span>
                <span className="h-3 w-px" style={{ backgroundColor: 'var(--border-color)' }} />
                <div className="relative h-[18px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roleIndex}
                      className="block truncate font-dm-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px]"
                      style={{ color: 'var(--accent-text)' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {ROLES[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            <motion.h1 variants={heroItem} className="text-[clamp(40px,15vw,96px)] leading-[0.92] tracking-[-0.05em] font-extrabold font-syne" style={{ color: 'var(--text-primary)' }}>
              {firstName.map((char, i) => (
                <motion.span key={`fn-${i}`} variants={heroItem} className="inline-block">{char === ' ' ? '\u00A0' : char}</motion.span>
              ))}
              <br />
              {lastName.map((char, i) => (
                <motion.span
                  key={`ln-${i}`}
                  className="inline-block text-stroke"
                  variants={heroItem}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.04 }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p variants={heroItem} className="max-w-[620px] text-lg font-light leading-relaxed sm:text-xl md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
              I design & build scalable systems and tackle complex backend challenges
            </motion.p>

            <motion.p variants={heroItem} className="max-w-[560px] text-sm font-light leading-7 sm:text-[15px] md:text-base md:leading-8" style={{ color: 'var(--text-muted)' }}>
              {profile.bio}
            </motion.p>

            <motion.div variants={heroItem} className="grid w-full max-w-[640px] grid-cols-3 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--card-border)' }}>
              {STATS.map((s, i) => (
                <div key={s.label} className={`${i < 2 ? 'border-b sm:border-b-0 sm:border-r' : ''}`} style={{ borderColor: 'var(--card-border)' }}>
                  <AnimatedStat value={s.value} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/projects" className="btn-primary min-h-[46px]">
                View Work <ArrowUpRight size={13} />
              </Link>
              <a href={profile.resume} download="Vishal-Singh-Resume.pdf" className="btn-secondary min-h-[46px]">
                <Download size={12} /> Resume
              </a>
            </motion.div>

            <motion.div variants={heroItem} className="flex flex-wrap items-center gap-2">
              {[
                { icon: FaGithub, label: 'GitHub', url: 'https://github.com/VishalDevx' },
                { icon: FaLinkedin, label: 'LinkedIn', url: 'https://linkedin.com/in/vishalcsx' },
                { icon: FaTwitter, label: 'Twitter', url: 'https://x.com/vishalcsx' },
                { icon: MdEmail, label: 'Email', url: 'mailto:vishalcsx@gmail.com' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group relative flex h-10 w-10 items-center justify-center rounded-md border transition-all hover:text-[var(--text-primary)]"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--icon-color)' }}
                >
                  <s.icon size={15} />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-1 text-[9px] uppercase tracking-[0.12em] opacity-0 transition-opacity group-hover:opacity-100" style={{ fontFamily: "'DM Mono', monospace", color: 'var(--text-muted)' }}>
                    {s.label}
                  </span>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" animate="show" variants={heroContainer} className="hidden flex-col gap-4 lg:flex">
            <motion.div
              variants={heroImage}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="overflow-hidden rounded-2xl border"
              style={{
                borderColor: 'var(--card-border)',
                backgroundColor: 'var(--bg-secondary)',
                transform: `translate(${springImageX.get()}px, ${springImageY.get()}px)`,
              }}
            >
              <div className="relative aspect-square w-full">
                <Image src="https://avatars.githubusercontent.com/VishalDevx" alt={profile.name} fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(161,161,170,0.8)' }}>{profile.name} — {profile.location}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={heroItem} className="rounded-xl border p-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
              <p className="font-dm-mono mb-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Core Stack</p>
              <div className="flex flex-wrap gap-[6px]">
                {profile.coreStack?.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={heroItem} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
              <div>
                <p className="font-dm-mono mb-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Availability</p>
                <p className="text-sm font-light" style={{ color: 'var(--text-primary)' }}>Open to full-time & freelance</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em] text-emerald-600">Now</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
