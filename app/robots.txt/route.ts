import { siteConfig } from '@/config/site'

export async function GET() {
  const text = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: ${siteConfig.url}/sitemap.xml`

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
