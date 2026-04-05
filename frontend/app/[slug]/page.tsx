import type {Metadata} from 'next'
import Head from 'next/head'
import { FaTools, FaBolt, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWrench, FaFire, FaBath, FaSink, FaExclamationTriangle, FaThermometerHalf, FaSearch, FaUsers, FaStar, FaArrowRight, FaCertificate, FaShieldAlt, FaClock, FaUserCheck, FaCalendarAlt, FaCheck } from 'react-icons/fa'

import PageBuilderPage from '@/app/components/PageBuilder'
import {sanityFetch} from '@/sanity/lib/live'
import {getPageQuery, pagesSlugs} from '@/sanity/lib/queries'
import {GetPageQueryResult} from '@/sanity.types'
import {PageOnboarding} from '@/app/components/Onboarding'
import BusinessLandingClient from './BusinessLandingClient'

type Props = {
  params: Promise<{slug: string}>
}

type BusinessReview = {
  author: string
  rating: string
  text: string
  date: string
}

type Business = {
  name: string
  slug: string
  category: string
  rating: string
  reviews: BusinessReview[]
  phone: string
  website: string
  address: string
  whatsappSent: boolean
}

async function getBusinesses(): Promise<Business[]> {
  const baseUrl = process.env.BUSINESS_API_BASE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(`${baseUrl}/api/businesses`, {
      cache: 'no-store',
    })
    if (!res.ok) return []
    const parsed: unknown = await res.json()
    if (!Array.isArray(parsed)) return []
    return parsed as Business[]
  } catch {
    return []
  }
}

async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const baseUrl = process.env.BUSINESS_API_BASE_URL || 'http://localhost:3001'
  try {
    const res = await fetch(`${baseUrl}/api/business/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    const parsed: unknown = await res.json()
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as Business
  } catch {
    return null
  }
}

function getCityFromAddress(address: string) {
  const match = address.match(/\b\d{5}\s+([^,]+)\b/)
  return match?.[1]?.trim() || ''
}

function formatPhoneForTel(phone: string) {
  return phone.replace(/\s+/g, '')
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    // // Use the published perspective in generateStaticParams
    perspective: 'published',
    stega: false,
  })
  const businesses = await getBusinesses()
  const businessParams = businesses
    .map((b) => ({slug: b.slug}))
    .filter((p) => Boolean(p.slug))
  return [...data, ...businessParams]
}

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params

  const envSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = envSiteUrl ? new URL(envSiteUrl) : undefined
  } catch {
    metadataBase = undefined
  }

  const business = await getBusinessBySlug(params.slug)
  if (business) {
    const city = business.address ? getCityFromAddress(business.address) : ''
    const title = `${business.name}${city ? ` – Plombier à ${city}` : ''}`
    const description = `${business.name}${city ? `, plombier à ${city}` : ''} • ${business.category} • Note ${business.rating}. Dépannage, installation et urgence.`
    return {
      metadataBase,
      title,
      description,
      alternates: {
        canonical: `/${params.slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        locale: 'fr_FR',
        url: `/${params.slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    } satisfies Metadata
  }

  const {data: page} = await sanityFetch({
    query: getPageQuery,
    params,
    // Metadata should never contain stega
    stega: false,
  })

  const title = page?.name
  const description = page?.heading

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: `/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: title || undefined,
      description: description || undefined,
      type: 'website',
      locale: 'fr_FR',
      url: `/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || undefined,
      description: description || undefined,
    },
  } satisfies Metadata
}

export default async function Page(props: Props) {
  const params = await props.params

  const business = await getBusinessBySlug(params.slug)
  if (business) {
    return <BusinessLandingClient business={business} />
  }

  const [{data: page}] = await Promise.all([sanityFetch({query: getPageQuery, params})])

  if (!page?._id) {
    return (
      <div className="py-40">
        <PageOnboarding />
      </div>
    )
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>{page.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-4xl text-gray-900 sm:text-5xl lg:text-7xl">{page.heading}</h1>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {page.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={page as GetPageQueryResult} />
    </div>
  )
}
