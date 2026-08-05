'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { ScrollReveal } from '@/components/global/ScrollReveal'
import type { Project } from '@/types'

const SkillsShowcase = dynamic(() => import('@/components/sections/SkillsShowcase').then(mod => ({ default: mod.SkillsShowcase })), { ssr: false })
const FeaturedProjects = dynamic(() => import('@/components/sections/FeaturedProjects').then(mod => ({ default: mod.FeaturedProjects })), { ssr: false })

interface HomeClientProps {
  projects: Project[]
}

export function HomeClient({ projects }: HomeClientProps) {
  return (
    <>
      <Hero />

      <SkillsShowcase />

      <ScrollReveal direction="up" duration={0.7}>
        <FeaturedProjects projects={projects} />
      </ScrollReveal>

      {/* Contact CTA */}
      <ScrollReveal direction="up" duration={0.7}>
        <section className="relative overflow-hidden border-y py-16 sm:py-20 lg:py-28" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(0,245,255,0.4), transparent 55%)',
            }}
          />
          <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center sm:px-6 lg:px-8">
            <p className="font-dm-mono mb-4 text-[10px] uppercase tracking-[0.25em]" style={{ color: 'var(--accent-text)' }}>
              Open to full-time & freelance
            </p>
            <h2 className="mx-auto mb-6 max-w-[720px] text-[clamp(30px,6vw,56px)] font-extrabold leading-[0.98] tracking-[-0.03em]" style={{ fontFamily: "'Syne', sans-serif", color: 'var(--text-primary)' }}>
              Have a system to build? <span className="text-gradient-cyber">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-[560px] text-sm font-light leading-7 sm:text-[15px] sm:leading-8" style={{ color: 'var(--text-secondary)' }}>
              I ship backend-heavy platforms, multi-tenant SaaS, and full-stack products. Clear communication, production-grade code, real results.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary min-h-[48px] px-8">
                Start a conversation <ArrowUpRight size={13} />
              </Link>
              <a href="mailto:vishalcsx@gmail.com" className="btn-secondary min-h-[48px] px-8">
                <Mail size={12} /> vishalcsx@gmail.com
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  )
}
