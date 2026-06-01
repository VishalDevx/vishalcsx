'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Search, FolderKanban, BookOpen, Network, Code2, Cpu, Activity, Mail, Home, FileDown } from 'lucide-react'
import { useCommandPalette } from '@/hooks/useCommandPalette'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  description?: string
  href?: string
  action?: () => void
  icon: React.ReactNode
  shortcut?: string
  keywords: string[]
}

const defaultCommands: CommandItem[] = [
  { id: 'home', label: 'Home', href: '/', icon: <Home className="h-4 w-4" />, shortcut: 'G H', keywords: ['home', 'index', 'start'] },
  { id: 'projects', label: 'Projects', href: '/projects', icon: <FolderKanban className="h-4 w-4" />, shortcut: 'G P', keywords: ['projects', 'work', 'portfolio', 'case studies'] },
  { id: 'blog', label: 'Blog', href: '/blog', icon: <BookOpen className="h-4 w-4" />, shortcut: 'G B', keywords: ['blog', 'articles', 'posts', 'writing'] },
  { id: 'system-design', label: 'System Design', href: '/system-design', icon: <Network className="h-4 w-4" />, shortcut: 'G S', keywords: ['system design', 'architecture', 'diagrams'] },
  { id: 'open-source', label: 'Open Source', href: '/open-source', icon: <Code2 className="h-4 w-4" />, shortcut: 'G O', keywords: ['open source', 'oss', 'contributions', 'github'] },
  { id: 'skills', label: 'Skills', href: '/skills', icon: <Cpu className="h-4 w-4" />, shortcut: 'G K', keywords: ['skills', 'tech stack', 'technologies', 'tools'] },
  { id: 'activity', label: 'Activity', href: '/activity', icon: <Activity className="h-4 w-4" />, shortcut: 'G A', keywords: ['activity', 'timeline', 'updates', 'feed'] },
  { id: 'contact', label: 'Contact', href: '/contact', icon: <Mail className="h-4 w-4" />, shortcut: 'G C', keywords: ['contact', 'email', 'message', 'hire'] },
  { id: 'resume', label: 'Download Resume', action: () => { const a = document.createElement('a'); a.href = '/cv/Vishal-Resume.pdf'; a.download = ''; a.click(); }, icon: <FileDown className="h-4 w-4" />, shortcut: 'R', keywords: ['resume', 'cv', 'download', 'pdf'] },
]

export function CommandPalette() {
  const { isOpen, close } = useCommandPalette()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = query
    ? defaultCommands.filter((cmd) =>
        cmd.keywords.some((k) => k.includes(query.toLowerCase())) ||
        cmd.label.toLowerCase().includes(query.toLowerCase()),
      )
    : defaultCommands

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
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered[activeIndex]) {
      execute(filtered[activeIndex])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) close() }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-lg mx-4"
          >
            <div className="rounded-xl border border-border bg-bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
                <Search className="h-4 w-4 text-text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, projects, commands..."
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
                />
                <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border-subtle bg-bg-tertiary px-1.5 text-[10px] font-mono text-text-muted">
                  ESC
                </kbd>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-sm text-text-muted">No results found</div>
                ) : (
                  filtered.map((cmd, i) => (
                    <button
                      key={cmd.id}
                      onClick={() => execute(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors text-left',
                        i === activeIndex
                          ? 'bg-accent-bg text-accent'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary',
                      )}
                    >
                      <span className={cn('shrink-0', i === activeIndex ? 'text-accent' : 'text-text-muted')}>
                        {cmd.icon}
                      </span>
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="shrink-0 text-[10px] font-mono text-text-muted">{cmd.shortcut}</kbd>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
