import type {Metadata} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { FaTools, FaBolt, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWrench, FaFire, FaBath, FaSink, FaExclamationTriangle, FaThermometerHalf, FaSearch, FaUsers, FaStar, FaArrowRight } from 'react-icons/fa'

import {AllPosts} from '@/app/components/Posts'
import GetStartedCode from '@/app/components/GetStartedCode'
import SideBySideIcons from '@/app/components/SideBySideIcons'
import {settingsQuery} from '@/sanity/lib/queries'
import {sanityFetch} from '@/sanity/lib/live'
import {dataAttr} from '@/sanity/lib/utils'
import SectionDotsBackground from '@/app/components/SectionDotsBackground'

export const metadata: Metadata = {
  title: 'Services de Plomberie',
  description:
    'Trouvez des plombiers professionnels près de chez vous. Dépannage, installation et intervention rapide.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Services de Plomberie',
    description:
      'Trouvez des plombiers professionnels près de chez vous. Dépannage, installation et intervention rapide.',
    locale: 'fr_FR',
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services de Plomberie',
    description:
      'Trouvez des plombiers professionnels près de chez vous. Dépannage, installation et intervention rapide.',
  },
}

type Business = {
  name: string
  slug: string
  category: string
  rating: string
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
    if (Array.isArray(parsed)) return parsed as Business[]
    if (parsed && typeof parsed === 'object') {
      const maybeBusinesses = (parsed as any).businesses
      if (Array.isArray(maybeBusinesses)) return maybeBusinesses as Business[]
    }
    return []
  } catch {
    return []
  }
}

export default async function Page() {
  const businesses = (await getBusinesses()).slice(0, 6)
  const missingPhoneValues = new Set(['Not found', 'Non trouvé', 'Introuvable'])

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="container">
          <div className="relative min-h-[60vh] mx-auto max-w-4xl pt-20 pb-20 flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 mb-6">
                Services de Plomberie
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Trouvez des plombiers professionnels près de chez vous. Services de qualité, intervention rapide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#businesses" className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Voir les plombiers
                </a>
                <a href="#contact" className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition-colors">
                  Contactez-nous
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaTools className="text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Services Professionnels</h3>
              <p className="text-gray-600">Plombiers certifiés et expérimentés</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaBolt className="text-4xl text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Intervention Rapide</h3>
              <p className="text-gray-600">Disponibilité 24/7 pour les urgences</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Garantie Qualité</h3>
              <p className="text-gray-600">Travail garanti et satisfaction client</p>
            </div>
          </div>
        </div>
      </div>
      {/* Businesses Section */}
      <div id="businesses" className="bg-gray-50 py-16 relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Plombiers Disponibles
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos plombiers professionnels dans votre région
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businesses.map((b) => (
              <Link
                key={b.name}
                href={`/${b.slug}`}
                className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-blue-600 uppercase tracking-wide">{b.category}</div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{b.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{b.name}</h3>
                {b.phone && !missingPhoneValues.has(b.phone) ? (
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <FaPhone className="text-blue-500" />
                    <span className="text-sm">{b.phone}</span>
                  </div>
                ) : null}
                {b.address ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span className="text-sm truncate">{b.address}</span>
                  </div>
                ) : null}
                <div className="mt-4 text-blue-600 font-medium text-sm group-hover:text-blue-700 transition-colors flex items-center gap-1">
                  Voir les détails <FaArrowRight className="text-xs" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 text-white py-16 relative">
        <SectionDotsBackground />
        <div className="container text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Besoin d'un plombier ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour une intervention rapide et professionnelle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#businesses" className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Trouver un plombier
            </a>
            <a href="tel:0612345678" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              Appeler maintenant
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold mb-4">Services de Plomberie</h3>
              <p className="text-gray-400">
                Le réseau de plombiers professionnels de confiance
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Dépannage</li>
                <li>Installation</li>
                <li>Rénovation</li>
                <li>Maintenance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#businesses" className="hover:text-white transition-colors">Plombiers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2"><FaPhone className="text-blue-400" /> 06 12 34 56 78</p>
                <p className="flex items-center gap-2"><FaEnvelope className="text-green-400" /> contact@plombier-services.fr</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Services de Plomberie. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
