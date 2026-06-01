import { getProjects } from '@/lib/projects'
import { getBlogPosts } from '@/lib/blog'
import { siteConfig } from '@/config/site'

export async function GET() {
  const projects = getProjects()
  const posts = getBlogPosts()

  const urls: Array<{ loc: string; priority: string; changefreq: string; lastmod?: string }> = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/projects', priority: '0.9', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    { loc: '/system-design', priority: '0.7', changefreq: 'monthly' },
    { loc: '/open-source', priority: '0.7', changefreq: 'monthly' },
    { loc: '/skills', priority: '0.6', changefreq: 'monthly' },
    { loc: '/activity', priority: '0.5', changefreq: 'weekly' },
    { loc: '/contact', priority: '0.5', changefreq: 'monthly' },
    ...projects.map((p) => ({
      loc: `/projects/${p.slug}`,
      priority: '0.8' as const,
      changefreq: 'monthly' as const,
    })),
    ...posts.map((p) => ({
      loc: `/blog/${p.slug}`,
      priority: '0.7' as const,
      changefreq: 'monthly' as const,
      lastmod: p.updatedAt,
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (url) => `
  <url>
    <loc>${siteConfig.url}${url.loc}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
    ${url.lastmod ? `<lastmod>${new Date(url.lastmod).toISOString()}</lastmod>` : ''}
  </url>`,
    )
    .join('')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
