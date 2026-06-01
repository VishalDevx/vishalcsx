'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCommandPalette } from './useCommandPalette'

const shortcuts: Record<string, string> = {
  'g h': '/',
  'g p': '/projects',
  'g b': '/blog',
  'g s': '/system-design',
  'g o': '/open-source',
  'g k': '/skills',
  'g a': '/activity',
  'g c': '/contact',
}

export function useKeyboardShortcuts() {
  const router = useRouter()
  const { open, toggle } = useCommandPalette()

  useEffect(() => {
    let buffer = ''

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
        return
      }

      if (e.key === 'Escape') {
        const { close, isOpen } = useCommandPalette.getState()
        if (isOpen) close()
        return
      }

      if (e.key === 'r' && !e.metaKey && !e.ctrlKey && !e.target) {
        const link = document.querySelector('a[href="/cv/Vishal-Resume.pdf"]') as HTMLAnchorElement
        link?.click()
        return
      }

      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.target) {
        e.preventDefault()
        open()
        return
      }

      if (e.key === 'Escape') {
        buffer = ''
        return
      }

      if (e.key.length === 1) {
        buffer = (buffer + e.key).toLowerCase()
        for (const [shortcut, path] of Object.entries(shortcuts)) {
          if (buffer.endsWith(shortcut.replace(' ', ''))) {
            router.push(path)
            buffer = ''
            return
          }
        }
        if (buffer.length > 3) buffer = buffer.slice(-3)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router, open, toggle])
}
