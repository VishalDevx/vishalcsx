'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, FolderKanban, BookOpen, Network, Code2, Cpu, Activity, Mail, Home, FileDown, Github, Linkedin, Terminal, Beaker, BarChart3, Globe } from 'lucide-react'
import { useCommandPalette } from '@/hooks/useCommandPalette'

interface CommandItem {
  id: string
  label: string
  description?: string
  href?: string
  action?: () => void
  icon: React.ReactNode
  shortcut?: string
  keywords: string[]
  section?: string
}

const commands: CommandItem[] = [
  { id: 'home', label: 'Home', description: 'Go to homepage', href: '/', icon: <Home className="h-4 w-4" />, shortcut: 'G H', keywords: ['home', 'index', 'start'], section: 'Navigation' },
  { id: 'projects', label: 'Projects', description: 'View case studies & architecture', href: '/projects', icon: <FolderKanban className="h-4 w-4" />, shortcut: 'G P', keywords: ['projects', 'work', 'portfolio', 'case studies'], section: 'Navigation' },
  { id: 'blog', label: 'Blog', description: 'Read technical articles', href: '/blog', icon: <BookOpen className="h-4 w-4" />, shortcut: 'G B', keywords: ['blog', 'articles', 'posts', 'writing', 'technical'], section: 'Navigation' },
  { id: 'system-design', label: 'System Design', description: 'Explore architecture patterns', href: '/system-design', icon: <Network className="h-4 w-4" />, shortcut: 'G S', keywords: ['system design', 'architecture', 'diagrams', 'patterns'], section: 'Navigation' },
  { id: 'system', label: 'Engineering Systems', description: 'Deep dive into system architecture', href: '/system', icon: <Globe className="h-4 w-4" />, shortcut: 'G E', keywords: ['systems', 'engineering', 'architecture', 'deep dive'], section: 'Navigation' },
  { id: 'open-source', label: 'Open Source', description: 'GitHub contributions & repos', href: '/open-source', icon: <Code2 className="h-4 w-4" />, shortcut: 'G O', keywords: ['open source', 'oss', 'contributions', 'github'], section: 'Navigation' },
  { id: 'skills', label: 'Skills', description: 'Tech stack & capabilities', href: '/skills', icon: <Cpu className="h-4 w-4" />, shortcut: 'G K', keywords: ['skills', 'tech stack', 'technologies', 'tools'], section: 'Navigation' },
  { id: 'activity', label: 'Activity', description: 'Engineering timeline & updates', href: '/activity', icon: <Activity className="h-4 w-4" />, shortcut: 'G A', keywords: ['activity', 'timeline', 'updates', 'feed'], section: 'Navigation' },
  { id: 'contact', label: 'Contact', description: 'Get in touch', href: '/contact', icon: <Mail className="h-4 w-4" />, shortcut: 'G C', keywords: ['contact', 'email', 'message', 'hire'], section: 'Navigation' },
  { id: 'engine', label: 'Engineering Playground', description: 'Pathfinding, sorting, physics demos', href: '/engine', icon: <Beaker className="h-4 w-4" />, shortcut: 'G X', keywords: ['playground', 'experiments', 'algorithms', 'physics', 'demos'], section: 'Navigation' },
  { id: 'resume', label: 'Download Resume', description: 'Download Vishal\'s CV (PDF)', action: () => { const a = document.createElement('a'); a.href = '/cv/Vishal-Resume.pdf'; a.download = ''; a.click(); }, icon: <FileDown className="h-4 w-4" />, shortcut: 'R', keywords: ['resume', 'cv', 'download', 'pdf'], section: 'Actions' },
  { id: 'github-link', label: 'Open GitHub Profile', description: 'github.com/VishalDevx', action: () => window.open('https://github.com/VishalDevx', '_blank'), icon: <Github className="h-4 w-4" />, keywords: ['github', 'profile', 'repos'], section: 'Actions' },
  { id: 'linkedin-link', label: 'Open LinkedIn Profile', description: 'linkedin.com/in/vishalcsx', action: () => window.open('https://linkedin.com/in/vishalcsx', '_blank'), icon: <Linkedin className="h-4 w-4" />, keywords: ['linkedin', 'profile', 'connect'], section: 'Actions' },
  { id: 'terminal', label: 'Terminal Contact', description: 'Interactive terminal interface', href: '/contact', icon: <Terminal className="h-4 w-4" />, keywords: ['terminal', 'contact', 'cli', 'command'], section: 'Actions' },
]

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const filtered = query
    ? commands.filter((cmd) =>
        cmd.keywords.some((k) => k.includes(query.toLowerCase())) ||
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : commands

  const sections = [...new Set(filtered.map((c) => c.section).filter(Boolean))]

  const execute = useCallback(
    (cmd: CommandItem) => {
      close()
      if (cmd.href) router.push(cmd.href)
      if (cmd.action) cmd.action()
    },
    [close, router],
  )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setActiveIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    setActiveIndex(0)
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [query])

  useEffect(() => {
    const el = scrollRef.current?.children[activeIndex] as HTMLElement
    el?.scrollIntoView?.({ block: 'nearest' })
  }, [activeIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((prev) => (prev + 1) % filtered.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length) }
    else if (e.key === 'Enter' && filtered[activeIndex]) { execute(filtered[activeIndex]) }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh]"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            className="w-full max-w-xl mx-4"
          >
            <div
              style={{
                borderRadius: 12,
                border: '1px solid var(--border-color)',
                background: 'var(--surface)',
                overflow: 'hidden',
                boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
              }}
            >
              <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <Search className="h-4 w-4 shrink-0" style={{ color: 'var(--text-muted)' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, projects, commands..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    fontSize: 14, color: 'var(--text-primary)',
                  }}
                />
                <kbd style={{
                  display: 'none', height: 20, alignItems: 'center', gap: 2,
                  borderRadius: 4, border: '1px solid var(--border-subtle)',
                  padding: '0 6px', fontSize: 10, fontFamily: "'DM Mono', monospace",
                  color: 'var(--text-muted)', background: 'var(--bg-tertiary)',
                }} className="sm:inline-flex">ESC</kbd>
              </div>
              <div ref={scrollRef} style={{ maxHeight: 340, overflow: 'auto', padding: 6 }}>
                {filtered.length === 0 ? (
                  <div style={{ padding: 32, textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  sections.map((section) => (
                    <div key={section}>
                      <div style={{
                        padding: '6px 10px 4px', fontSize: 10, fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)',
                      }}>
                        {section}
                      </div>
                      {filtered.filter((c) => c.section === section).map((cmd, i) => {
                        const globalIdx = filtered.indexOf(cmd)
                        const isActive = globalIdx === activeIndex
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => execute(cmd)}
                            onMouseEnter={() => setActiveIndex(globalIdx)}
                            style={{
                              display: 'flex', width: '100%', alignItems: 'center', gap: 10,
                              padding: '8px 10px', borderRadius: 8, fontSize: 13, textAlign: 'left',
                              border: 'none', cursor: 'pointer',
                              background: isActive ? 'var(--accent-bg)' : 'transparent',
                              color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                              transition: 'background 0.1s, color 0.1s',
                            }}
                          >
                            <span style={{ flexShrink: 0, color: isActive ? 'var(--accent-text)' : 'var(--text-muted)' }}>
                              {cmd.icon}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 13, fontWeight: 500, color: isActive ? 'var(--accent-text)' : 'var(--text-primary)' }}>
                                {cmd.label}
                              </div>
                              {cmd.description && (
                                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {cmd.description}
                                </div>
                              )}
                            </div>
                            {cmd.shortcut && (
                              <kbd style={{
                                flexShrink: 0, fontSize: 10, fontFamily: "'DM Mono', monospace",
                                color: 'var(--text-muted)', padding: '1px 5px', borderRadius: 3,
                                border: '1px solid var(--border-subtle)',
                              }}>
                                {cmd.shortcut}
                              </kbd>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
                borderTop: '1px solid var(--border-subtle)', fontSize: 10, color: 'var(--text-muted)',
                fontFamily: "'DM Mono', monospace",
              }}>
                <span>↑↓ navigate</span>
                <span>↵ open</span>
                <span>esc close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
