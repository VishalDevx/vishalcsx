import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

interface SEOProps {
  title?: string
  description?: string
  path?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  tags?: string[]
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  publishedTime,
  tags,
}: SEOProps): Metadata {
  const fullTitle = title
    ? `${title} — ${siteConfig.name}`
    : siteConfig.title
  const fullDescription = description || siteConfig.description
  const url = `${siteConfig.url}${path || ''}`
  const image = ogImage || siteConfig.ogImage

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: siteConfig.name,
      type: ogType,
      ...(publishedTime && {
        article: { published_time: publishedTime, tags: tags || [] },
      }),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [image],
      creator: '@vishalcsx',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export function jsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}/og/default.png`,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
      siteConfig.links.twitter,
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
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  }
}
