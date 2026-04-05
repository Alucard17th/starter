import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrlRaw = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || ''
  let siteUrl: string | undefined = undefined
  try {
    siteUrl = siteUrlRaw ? new URL(siteUrlRaw).toString().replace(/\/$/, '') : undefined
  } catch {
    siteUrl = undefined
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: siteUrl ? `${siteUrl}/sitemap.xml` : undefined,
  }
}
