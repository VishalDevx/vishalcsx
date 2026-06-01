'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { siteConfig, navItems } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <span className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </span>
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed max-w-xs">
              Senior Full Stack & Backend Engineer. Building scalable products, systems, and developer experiences.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-icon-color hover:text-icon-hover hover:bg-bg-tertiary/80 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-icon-color hover:text-icon-hover hover:bg-bg-tertiary/80 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-icon-color hover:text-icon-hover hover:bg-bg-tertiary/80 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href={`mailto:${siteConfig.links.email}`} className="h-9 w-9 rounded-lg bg-bg-tertiary flex items-center justify-center text-icon-color hover:text-icon-hover hover:bg-bg-tertiary/80 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Navigation</h3>
            <ul className="space-y-2">
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">More</h3>
            <ul className="space-y-2">
              {navItems.slice(5).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href={`mailto:${siteConfig.links.email}`} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  {siteConfig.links.email}
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                  Send a message
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-red-500" /> using Next.js & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
