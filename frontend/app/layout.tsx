import './globals.css'

import {SpeedInsights} from '@vercel/speed-insights/next'
import type {Metadata} from 'next'
import {Inter, IBM_Plex_Mono} from 'next/font/google'
import {draftMode} from 'next/headers'
import {toPlainText} from 'next-sanity'
import {VisualEditing} from 'next-sanity/visual-editing'
import {Toaster} from 'sonner'

import DraftModeToast from '@/app/components/DraftModeToast'
import BusinessLayout from '@/app/components/BusinessLayout'
import ScrollAnimations from '@/app/components/ScrollAnimations'
import * as demo from '@/sanity/lib/demo'
import {sanityFetch, SanityLive} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import {resolveOpenGraphImage} from '@/sanity/lib/utils'
import {handleError} from '@/app/client-utils'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL

  const ogImage = resolveOpenGraphImage(settings?.ogImage)
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = envSiteUrl
      ? new URL(envSiteUrl)
      : settings?.ogImage?.metadataBase
        ? new URL(settings.ogImage.metadataBase)
        : undefined
  } catch {
    // ignore
  }
  const plainDescription = toPlainText(description)

  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: plainDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description: plainDescription,
      type: 'website',
      locale: 'fr_FR',
      siteName: title,
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: plainDescription,
      images: ogImage ? [ogImage.url] : [],
    },
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
})

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const {isEnabled: isDraftMode} = await draftMode()

  return (
    <html lang="fr" className={`${inter.variable} ${ibmPlexMono.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen">
          <ScrollAnimations />
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {isDraftMode && (
            <>
              <DraftModeToast />
              {/*  Enable Visual Editing, only to be rendered when Draft Mode is enabled */}
              <VisualEditing />
              {/* Enable Sanity Live only in Draft Mode to avoid public-site CORS toasts */}
              <SanityLive onError={handleError} />
            </>
          )}
          <BusinessLayout>{children}</BusinessLayout>
        </section>
        <SpeedInsights />
      </body>
    </html>
  )
}
