import type { Metadata, Viewport } from 'next'
import { Syne, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Providers } from './providers'

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Vishal Singh — Senior Full Stack & Backend Engineer',
    template: '%s — Vishal Singh',
  },
  description:
    'Senior Full Stack & Backend Engineer building scalable products, systems, and developer experiences. OSS contributor, system design enthusiast.',
  metadataBase: new URL('https://vishalcsx.dev'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Vishal Singh — Senior Full Stack & Backend Engineer',
    description:
      'Senior Full Stack & Backend Engineer building scalable products, systems, and developer experiences.',
    url: 'https://vishalcsx.dev',
    siteName: 'Vishal Singh',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishal Singh — Senior Full Stack & Backend Engineer',
    description:
      'Senior Full Stack & Backend Engineer building scalable products, systems, and developer experiences.',
    creator: '@vishalcsx',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: { google: 'google4aba8522528b17ba.html' },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en" className="dark" suppressHydrationWarning>
        <head>
          <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/rss.xml" />
          <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Vishal Singh',
                url: 'https://vishalcsx.dev',
                sameAs: [
                  'https://github.com/VishalDevx',
                  'https://linkedin.com/in/vishalcsx',
                  'https://x.com/vishalcsx',
                ],
                jobTitle: 'Senior Full Stack & Backend Engineer',
                knowsAbout: [
                  'Full Stack Development',
                  'Backend Engineering',
                  'System Design',
                  'Cloud Architecture',
                  'DevOps',
                  'Distributed Systems',
                  'Distributed Systems',
                  'AI Engineering',
                  'Graphics Programming',
                ],
              }),
            }}
          />
        </head>
        <body className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased min-h-screen`} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif" }}>
          <Providers>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CommandPalette />
          </Providers>
        </body>
      </html>
  )
}
