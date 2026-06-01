'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const NAV_LINKS = [
  { label: 'Work', href: '/projects' },
  { label: 'System', href: '/system' },
  { label: 'Blog', href: '/blog' },
  { label: 'Skills', href: '/skills' },
  { label: 'About', href: '/about' },
  { label: 'Activity', href: '/activity' },
  { label: 'Lab', href: '/engineering-lab' },
  { label: 'Contact', href: '/contact' },
]

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/VishalDevx', label: 'GitHub' },
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vishal-singh-779054260/', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://www.x.com/VishalCsx', label: 'X' },
  { icon: SiGmail, href: 'mailto:vishalcsx@gmail.com', label: 'Email' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: scrolled ? 'var(--bg-secondary)' : 'var(--bg-primary)',
        borderBottom: `0.5px solid ${scrolled ? 'var(--border-color)' : 'var(--border-subtle)'}`,
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-baseline gap-[3px] no-underline" aria-label="Go to homepage">
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
            Vishal
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            .dev
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ label, href }) =>
            label === 'Contact' ? (
              <span key={href} className="flex items-center gap-1">
                <Link
                  href={href}
                  className={`nav-link${isActive(href) ? ' active' : ''}`}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
                <div className="mx-1 h-3 w-px" style={{ background: 'var(--divider-line)' }} />
                {SOCIALS.map(({ icon: Icon, href: socialHref, label: socialLabel }) => (
                  <a
                    key={socialLabel}
                    href={socialHref}
                    target={socialHref.startsWith('mailto:') ? undefined : '_blank'}
                    rel={socialHref.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={socialLabel}
                    className="social-btn-inline flex items-center justify-center"
                  >
                    <Icon size={12} />
                  </a>
                ))}
              </span>
            ) : (
              <Link
                key={href}
                href={href}
                className={`nav-link${isActive(href) ? ' active' : ''}`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="mailto:vishalcsx@gmail.com" className="hire-btn hidden items-center justify-center sm:inline-flex">
            Hire me <ArrowUpRight size={10} />
          </a>
          <button type="button" className="hamburger-btn flex items-center justify-center lg:hidden" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="mobile-navigation" style={{ borderTop: '0.5px solid var(--border-subtle)', backgroundColor: 'var(--bg-primary)' }} className="px-4 pb-5 pt-3 lg:hidden">
          <div className="mb-4 flex flex-wrap items-center gap-2 pb-4" style={{ borderBottom: '0.5px solid var(--border-subtle)' }}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'} aria-label={label} className="social-btn flex items-center justify-center">
                <Icon size={13} />
              </a>
            ))}
            <a href="mailto:vishalcsx@gmail.com" className="hire-btn ml-auto inline-flex items-center justify-center">
              Hire me <ArrowUpRight size={10} />
            </a>
          </div>
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} href={href} className={`mobile-nav-link${isActive(href) ? ' active' : ''}`} aria-current={isActive(href) ? 'page' : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 6px;
          border: 0.5px solid transparent;
          color: var(--text-muted);
          transition: color 0.15s, background 0.15s, border-color 0.15s;
          white-space: nowrap; text-decoration: none;
        }
        .nav-link:hover { color: var(--text-primary); background: var(--bg-secondary); }
        .nav-link.active { color: var(--text-primary); border-color: var(--border-color); background: var(--bg-secondary); }
        .mobile-nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--text-secondary); text-decoration: none;
          padding: 12px 14px; border-radius: 8px; display: block;
          border: 0.5px solid transparent;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-nav-link:hover { color: var(--text-primary); background: var(--bg-secondary); }
        .mobile-nav-link.active { color: var(--text-primary); background: var(--bg-secondary); border-color: var(--border-color); }
        .social-btn {
          width: 34px; height: 34px; border-radius: 8px;
          border: 0.5px solid var(--border-color);
          color: var(--icon-color); text-decoration: none;
          transition: color 0.15s, background 0.15s, border-color 0.15s;
          background: transparent; flex-shrink: 0;
        }
        .social-btn:hover { color: var(--icon-hover); border-color: var(--border-hover); background: var(--bg-secondary); }
        .social-btn-inline {
          width: 28px; height: 28px; border-radius: 6px;
          color: var(--text-muted); text-decoration: none;
          transition: color 0.15s, background 0.15s;
          background: transparent;
        }
        .social-btn-inline:hover { color: var(--text-primary); background: var(--bg-secondary); }
        .hire-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--btn-text); background: var(--btn-bg);
          border: 0.5px solid var(--border-color); border-radius: 8px;
          padding: 8px 14px; text-decoration: none; gap: 6px;
          transition: background 0.15s, border-color 0.15s;
          white-space: nowrap;
        }
        .hire-btn:hover { background: var(--btn-hover); }
        .hamburger-btn {
          background: transparent; border: 0.5px solid var(--border-color);
          border-radius: 8px; color: var(--text-secondary); cursor: pointer;
          width: 36px; height: 36px;
          transition: color 0.15s, background 0.15s, border-color 0.15s;
        }
        .hamburger-btn:hover { border-color: var(--border-hover); color: var(--text-primary); background: var(--bg-secondary); }
      `}</style>
    </header>
  )
}
