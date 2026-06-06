'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { siteConfig } from '@/config/site'

const TerminalBackground = dynamic(() => import('@/components/3d/TerminalBackground').then(mod => ({ default: mod.TerminalBackground })), { ssr: false })

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-14 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="pointer-events-none fixed inset-0 z-0" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 45%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 45%)' }}>
        <div className="absolute right-0 top-0 h-full w-[45%] overflow-hidden">
          <TerminalBackground />
        </div>
      </div>
      <div className="relative z-10">
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <header className="mb-12 border-b border-[var(--border-color)] pb-10 pt-12 sm:mb-14 sm:pb-12 sm:pt-14 lg:mb-16 lg:pb-14 lg:pt-20">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)] sm:mb-5 sm:text-[11px]" style={{ fontFamily: "'DM Mono', monospace" }}>
              <span className="block h-px w-5 bg-[var(--divider-line)] sm:w-6" /> Contact
            </div>
            <h1 className="text-[clamp(36px,9vw,76px)] font-extrabold leading-[0.95] tracking-[-0.03em] text-[var(--text-primary)]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Get in Touch
            </h1>
            <p className="mt-5 max-w-[580px] text-sm font-light leading-7 text-[var(--text-secondary)] sm:mt-6 sm:text-[15px] sm:leading-8 md:text-base md:leading-[1.75]">
              Available for senior engineering roles &amp; freelance projects
            </p>
          </div>
        </header>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center rounded-2xl border p-12 text-center"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <CheckCircle size={48} className="mb-4" style={{ color: '#22c55e' }} />
                <h3 className="font-syne text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Message sent!</h3>
                <p className="mt-2 text-sm font-light" style={{ color: 'var(--text-secondary)' }}>I&apos;ll reply within 24h.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-dm-mono mb-1.5 block text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full h-10 px-3 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '0.5px solid var(--border-color)',
                        borderRadius: '6px',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#00F5FF'; e.target.style.boxShadow = '0 0 0 2px rgba(0,245,255,0.15)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-dm-mono mb-1.5 block text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="w-full h-10 px-3 text-sm outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        border: '0.5px solid var(--border-color)',
                        borderRadius: '6px',
                      }}
                      onFocus={(e) => { e.target.style.borderColor = '#00F5FF'; e.target.style.boxShadow = '0 0 0 2px rgba(0,245,255,0.15)' }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none' }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="font-dm-mono mb-1.5 block text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-3 py-2.5 text-sm outline-none resize-y transition-all"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '0.5px solid var(--border-color)',
                      borderRadius: '6px',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#00F5FF'; e.target.style.boxShadow = '0 0 0 2px rgba(0,245,255,0.15)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={11} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={11} /> Send Message</>
                  )}
                </motion.button>
                {status === 'error' && (
                  <p className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#ef4444' }}>Failed to send. Try again or email directly.</p>
                )}
              </form>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="section-header mb-4">
                  <span className="section-header-text">Connect</span>
                  <div className="section-header-line" />
                </div>
                <div className="space-y-3">
                  {[
                    { icon: MdEmail, label: 'Email', href: `mailto:${siteConfig.links.email}`, text: siteConfig.links.email },
                    { icon: FaGithub, label: 'GitHub', href: siteConfig.links.github, text: 'VishalDevx' },
                    { icon: FaLinkedin, label: 'LinkedIn', href: siteConfig.links.linkedin, text: 'vishalcsx' },
                    { icon: FaTwitter, label: 'Twitter', href: siteConfig.links.twitter, text: '@vishalcsx' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank" rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-lg p-2 transition-all hover:translate-x-[4px]"
                      style={{ textDecoration: 'none' }}
                    >
                      <s.icon size={16} style={{ color: 'var(--accent-text)' }} />
                      <div>
                        <span className="font-dm-mono block text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--text-muted)' }}>{s.label}</span>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{s.text}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="section-header mb-2">
                  <span className="section-header-text">Location</span>
                  <div className="section-header-line" />
                </div>
                <div className="flex items-center gap-2 text-sm font-light" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin size={14} style={{ color: 'var(--accent-text)' }} /> Muzaffarnagar, IN
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="section-header mb-2">
                  <span className="section-header-text">Availability</span>
                  <div className="section-header-line" />
                </div>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Open to freelance projects, full-time roles, and consulting opportunities. Available for remote work worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
