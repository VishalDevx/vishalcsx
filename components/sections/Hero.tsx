'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '@/config/site'

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!profile?.roles?.length) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % profile.roles.length)
        setVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden pt-14" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="glow-blob" style={{ left: '-80px', top: '-60px', width: 260, height: 260, background: 'var(--glow)' }} />
        <div className="glow-blob" style={{ right: '-40px', bottom: '-40px', width: 240, height: 240, background: 'var(--glow)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 border-b py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <span className="font-dm-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>vishal.dev</span>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="h-[6px] w-[6px] rounded-full bg-emerald-500" />
            <span className="font-dm-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--text-secondary)' }}>Open to work</span>
          </div>
        </div>

        <div className="grid gap-10 pb-14 pt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-14 lg:pb-16 lg:pt-10">
          <div className="flex min-w-0 flex-col gap-6 sm:gap-7 lg:gap-8">
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
                  <Image src="https://avatars.githubusercontent.com/VishalDevx" alt={profile.name} fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(161,161,170,0.8)' }}>{profile.name} — {profile.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 sm:gap-3" style={{ borderColor: 'var(--border-color)' }}>
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Role</span>
                <span className="h-3 w-px" style={{ backgroundColor: 'var(--border-color)' }} />
                {profile.roles?.length > 0 && (
                  <span key={roleIndex} className={`truncate font-dm-mono text-[10px] uppercase tracking-[0.14em] sm:text-[11px] ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ color: 'var(--accent-text)', transition: 'opacity 0.3s ease' }}>
                    {profile.roles[roleIndex]}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-[clamp(40px,15vw,96px)] leading-[0.92] tracking-[-0.05em] font-extrabold font-syne" style={{ color: 'var(--text-primary)' }}>
              {profile.name?.split(' ')[0] || 'Vishal'}<br />
              <span className="text-stroke">{profile.name?.split(' ').slice(1).join(' ') || 'Singh'}</span>
            </h1>

            <p className="max-w-[620px] text-lg font-light leading-relaxed sm:text-xl md:text-2xl" style={{ color: 'var(--text-secondary)' }}>
              I design & build scalable systems and tackle complex backend challenges
            </p>

            <p className="max-w-[560px] text-sm font-light leading-7 sm:text-[15px] md:text-base md:leading-8" style={{ color: 'var(--text-muted)' }}>
              {profile.bio}
            </p>

            <div className="grid w-full max-w-[640px] grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-3" style={{ borderColor: 'var(--card-border)' }}>
              {[
                { value: '12+', label: 'Projects Built' },
                { value: '45+', label: 'OSS Contributions' },
                { value: '3+', label: 'Years Experience' },
              ].map((s, i) => (
                <div key={s.label} className={`px-5 py-4 transition-colors hover:bg-[var(--card-hover)] sm:px-6 md:px-7 ${i < 2 ? 'border-b sm:border-b-0 sm:border-r' : ''}`} style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
                  <p className="font-syne text-2xl font-bold leading-none sm:text-[28px] md:text-3xl" style={{ color: 'var(--text-primary)' }}>{s.value}</p>
                  <p className="font-dm-mono mt-1 text-[10px] uppercase tracking-[0.14em]" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/projects" className="btn-primary min-h-[46px]">
                View Work <ArrowUpRight size={13} />
              </Link>
              <a href={profile.resume} download="Vishal-Singh-Resume.pdf" className="btn-secondary min-h-[46px]">
                <Download size={12} /> Resume
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { icon: 'BsGithub', label: 'GitHub', url: 'https://github.com/VishalDevx' },
                { icon: 'BsLinkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/vishalcsx' },
                { icon: 'BsTwitter', label: 'Twitter', url: 'https://x.com/vishalcsx' },
                { icon: 'SiGmail', label: 'Email', url: 'mailto:vishalcsx@gmail.com' },
              ].map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-md border transition-all hover:text-[var(--text-primary)]" style={{ borderColor: 'var(--border-color)', color: 'var(--icon-color)' }}>
                  <span className="text-[10px] uppercase font-dm-mono">{s.label.slice(0, 2)}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden flex-col gap-4 lg:flex">
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-secondary)' }}>
              <div className="relative aspect-square w-full">
                <Image src="https://avatars.githubusercontent.com/VishalDevx" alt={profile.name} fill className="object-cover grayscale transition-all duration-500 hover:grayscale-0" priority />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="font-dm-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgba(161,161,170,0.8)' }}>{profile.name} — {profile.location}</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
              <p className="font-dm-mono mb-3 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Core Stack</p>
              <div className="flex flex-wrap gap-[6px]">
                {profile.coreStack?.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--card-bg)' }}>
              <div>
                <p className="font-dm-mono mb-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'var(--text-muted)' }}>Availability</p>
                <p className="text-sm font-light" style={{ color: 'var(--text-primary)' }}>Open to full-time & freelance</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="font-dm-mono text-[10px] uppercase tracking-[0.12em] text-emerald-600">Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
