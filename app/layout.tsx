import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { ThemeProvider } from 'next-themes'
import { Providers } from './providers'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
              ],
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-bg-primary text-text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CommandPalette />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
