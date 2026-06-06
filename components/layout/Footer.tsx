'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { AnimateIn } from '@/components/ui/AnimateIn'
import { siteConfig } from '@/config/site'

const NAV_LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'System', href: '/system' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const SOCIALS = [
  { icon: FaGithub, href: siteConfig.links.github, label: 'GitHub' },
  { icon: FaLinkedin, href: siteConfig.links.linkedin, label: 'LinkedIn' },
  { icon: FaTwitter, href: siteConfig.links.twitter, label: 'Twitter' },
  { icon: MdEmail, href: `mailto:${siteConfig.links.email}`, label: 'Email' },
]

export function Footer() {
  return (
    <AnimateIn variant="fadeUp">
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link href="/" className="font-syne text-lg font-bold tracking-[-0.04em]" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                VISHAL.DEV
              </Link>
              <p className="mt-2 text-sm font-light" style={{ color: 'var(--text-secondary)' }}>
                Building systems that scale.
              </p>
              <p className="mt-4 text-xs" style={{ color: 'var(--text-muted)' }}>
                &copy; {new Date().getFullYear()} Vishal Singh
              </p>
            </div>

            <div className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-[0.12em] transition-colors hover:text-[var(--text-primary)]"
                  style={{ fontFamily: "'Space Mono', 'DM Mono', monospace", color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center rounded-full border transition-all hover:scale-110"
                  style={{
                    width: 32, height: 32,
                    borderColor: 'rgba(255,255,255,0.1)',
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00F5FF'; e.currentTarget.style.color = '#00F5FF' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 text-center" style={{ borderTop: '0.5px solid var(--border-subtle)' }}>
            <p className="text-[11px] tracking-[0.05em]" style={{ fontFamily: "'Space Mono', 'DM Mono', monospace", color: 'var(--text-muted)' }}>
              Designed &amp; engineered by Vishal Singh &middot; Next.js &middot; Framer Motion &middot; Three.js
            </p>
          </div>
        </div>
      </footer>
    </AnimateIn>
  )
}
