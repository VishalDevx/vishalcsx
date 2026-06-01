'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Twitter, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react'
import { siteConfig } from '@/config/site'

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
    <div className="pt-32 pb-20 sm:pb-24" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="mx-auto max-w-[840px] px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <div className="section-header">
            <span className="section-header-text">Contact</span>
            <div className="section-header-line" />
          </div>
          <h1 className="font-syne text-[clamp(2rem,5vw,4rem)] font-bold tracking-[-0.03em]" style={{ color: 'var(--text-primary)' }}>
            Get in Touch
          </h1>
          <p className="mt-3 max-w-xl text-sm font-light leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind or want to discuss engineering opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
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
                    className="w-full h-10 px-3 text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '0.5px solid var(--border-color)',
                      borderRadius: '6px',
                    }}
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
                    className="w-full h-10 px-3 text-sm outline-none"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '0.5px solid var(--border-color)',
                      borderRadius: '6px',
                    }}
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
                  className="w-full px-3 py-2.5 text-sm outline-none resize-y"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '0.5px solid var(--border-color)',
                    borderRadius: '6px',
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="btn-primary"
              >
                {status === 'sending' ? (
                  <><Loader2 size={11} className="animate-spin" /> Sending...</>
                ) : status === 'sent' ? (
                  <><CheckCircle size={11} /> Sent!</>
                ) : (
                  <><Send size={11} /> Send Message</>
                )}
              </button>
              {status === 'error' && (
                <p className="font-dm-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: '#ef4444' }}>Failed to send. Try again or email directly.</p>
              )}
            </form>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--card-border)' }}>
              <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
                <div className="section-header mb-4">
                  <span className="section-header-text">Connect</span>
                  <div className="section-header-line" />
                </div>
                <div className="space-y-3">
                  <a href={`mailto:${siteConfig.links.email}`} className="tag inline-flex items-center gap-2 w-full" style={{ border: 'none', background: 'transparent', padding: '4px 0', justifyContent: 'flex-start' }}>
                    <Mail size={11} style={{ color: 'var(--accent-text)' }} /> {siteConfig.links.email}
                  </a>
                  <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="tag inline-flex items-center gap-2 w-full" style={{ border: 'none', background: 'transparent', padding: '4px 0', justifyContent: 'flex-start' }}>
                    <Github size={11} style={{ color: 'var(--accent-text)' }} /> GitHub
                  </a>
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="tag inline-flex items-center gap-2 w-full" style={{ border: 'none', background: 'transparent', padding: '4px 0', justifyContent: 'flex-start' }}>
                    <Linkedin size={11} style={{ color: 'var(--accent-text)' }} /> LinkedIn
                  </a>
                  <a href={siteConfig.links.twitter} target="_blank" rel="noopener noreferrer" className="tag inline-flex items-center gap-2 w-full" style={{ border: 'none', background: 'transparent', padding: '4px 0', justifyContent: 'flex-start' }}>
                    <Twitter size={11} style={{ color: 'var(--accent-text)' }} /> Twitter / X
                  </a>
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
  )
}
