import {MetadataRoute} from 'next'
import {sanityFetch} from '@/sanity/lib/live'
import {sitemapData} from '@/sanity/lib/queries'
import {headers} from 'next/headers'

/**
 * This file creates a sitemap (sitemap.xml) for the application. Learn more about sitemaps in Next.js here: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 * Be sure to update the `changeFrequency` and `priority` values to match your application's content.
 */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPostsAndPages = await sanityFetch({
    query: sitemapData,
  })
  const headersList = await headers()
  const sitemap: MetadataRoute.Sitemap = []
  const host = headersList.get('host') || ''
  const protocol = headersList.get('x-forwarded-proto') || 'https'
  const baseUrl = host ? `${protocol}://${host}` : ''

  let businessSlugs: string[] = []
  const businessApiBaseUrl = process.env.BUSINESS_API_BASE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(`${businessApiBaseUrl}/api/businesses`, {
      cache: 'no-store',
    })
    if (res.ok) {
      const parsed: unknown = await res.json()
      if (Array.isArray(parsed)) {
        businessSlugs = parsed
          .map((b: any) => (typeof b?.slug === 'string' ? b.slug : ''))
          .filter(Boolean)
      }
    }
  } catch {
    businessSlugs = []
  }

  const seen = new Set<string>()
  if (baseUrl) {
    sitemap.push({
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      changeFrequency: 'monthly',
    })
    seen.add(baseUrl)
  }

  if (allPostsAndPages != null && allPostsAndPages.data.length != 0) {
    let priority: number
    let changeFrequency:
      | 'monthly'
      | 'always'
      | 'hourly'
      | 'daily'
      | 'weekly'
      | 'yearly'
      | 'never'
      | undefined
    let url: string

    for (const p of allPostsAndPages.data) {
      switch (p._type) {
        case 'page':
          priority = 0.8
          changeFrequency = 'monthly'
          url = `${baseUrl}/${p.slug}`
          break
        case 'post':
          priority = 0.5
          changeFrequency = 'never'
          url = `${baseUrl}/posts/${p.slug}`
          break
      }
      if (!url || seen.has(url)) continue
      seen.add(url)
      sitemap.push({
        lastModified: p._updatedAt || new Date(),
        priority,
        changeFrequency,
        url,
      })
    }
  }

  for (const slug of businessSlugs) {
    const url = `${baseUrl}/${slug}`
    if (!url || seen.has(url)) continue
    seen.add(url)
    sitemap.push({
      url,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'weekly',
    })
  }

  return sitemap
}
