'use client'

import { useState } from 'react'
import { FaBars, FaTimes, FaTools, FaBolt, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWrench, FaFire, FaBath, FaSink, FaExclamationTriangle, FaThermometerHalf, FaSearch, FaUsers, FaStar, FaArrowRight, FaCertificate, FaShieldAlt, FaClock, FaUserCheck, FaCalendarAlt, FaCheck } from 'react-icons/fa'
import SectionDotsBackground from '@/app/components/SectionDotsBackground'
import {dataAttr} from '@/sanity/lib/utils'

type BusinessReview = {
  author: string
  rating: string
  text: string
  date: string
}

type Business = {
  name: string
  category: string
  rating: string
  reviews: BusinessReview[]
  phone: string
  website: string
  address: string
  whatsappSent: boolean

  overrideId?: string

  primaryColor?: string
  accentColor?: string

  heroTitle?: string
  heroSubtitle?: string
  heroImageUrl?: string

  aboutTitle?: string
  aboutParagraph1?: string
  aboutParagraph2?: string
  aboutImageUrls?: {src: string; alt?: string}[]

  servicesTitle?: string
  servicesSubtitle?: string

  ctaTitle?: string
  ctaSubtitle?: string

  portfolioTitle?: string
  portfolioSubtitle?: string
  portfolioItemsOverride?: {title?: string; category?: string; image?: string; alt?: string}[]

  contactTitle?: string
  contactSubtitle?: string

  testimonialsTitle?: string
  testimonialsSubtitle?: string
}

function getCityFromAddress(address: string) {
  const match = address.match(/\b\d{5}\s+([^,]+)\b/)
  return match?.[1]?.trim() || ''
}

function formatPhoneForTel(phone: string) {
  return phone.replace(/\s+/g, '')
}

export default function BusinessLandingClient({business}: {business: Business}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPortfolioCategory, setSelectedPortfolioCategory] = useState('Tous')
  const reviews = (business.reviews || []).slice(0, 8)
  const hasPhone = Boolean(business.phone && business.phone !== 'Not found')
  const hasAddress = Boolean(business.address)
  const city = business.address ? getCityFromAddress(business.address) : ''
  const mapHref = business.address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`
    : ''
  const telHref = hasPhone ? `tel:${formatPhoneForTel(business.phone)}` : ''

  const services = [
    { icon: <FaFire className="text-3xl" />, title: 'Chauffe-eau', desc: 'Installation et réparation de chauffe-eau' },
    { icon: <FaWrench className="text-3xl" />, title: 'Débouchage', desc: 'Canalisation bouchée ? Nous intervenons rapidement' },
    { icon: <FaTools className="text-3xl" />, title: 'Réparation Tuyaux', desc: 'Fuites et réparations de toutes types' },
    { icon: <FaBath className="text-3xl" />, title: 'Salle de bain', desc: 'Installation et rénovation complète' },
    { icon: <FaSink className="text-3xl" />, title: 'Cuisine', desc: 'Éviers, robinets et plomberie de cuisine' },
    { icon: <FaExclamationTriangle className="text-3xl" />, title: 'Urgence', desc: 'Intervention 24/7 pour les urgences' },
    { icon: <FaThermometerHalf className="text-3xl" />, title: 'Chauffage', desc: 'Installation et maintenance de chauffage' },
    { icon: <FaSearch className="text-3xl" />, title: 'Inspection', desc: 'Diagnostic et inspection de plomberie' },
  ]

  const whyChooseUs = [
    { icon: <FaCertificate className="text-3xl text-[var(--brand-accent)]" />, title: 'Licencié & Assuré', desc: 'Tous nos techniciens sont certifiés' },
    { icon: <FaShieldAlt className="text-3xl text-[var(--brand-accent)]" />, title: 'Professionnels certifiés', desc: 'Experts avec des années d\'expérience' },
    { icon: <FaClock className="text-3xl text-[var(--brand-accent)]" />, title: 'Service d\'urgence disponible', desc: 'Disponible 24/7 pour les urgences' },
    { icon: <FaUserCheck className="text-3xl text-[var(--brand-accent)]" />, title: 'Équipe expérimentée', desc: 'Années d\'expertise en plomberie' },
  ]

  const portfolioItems = [
    { title: 'Rénovation Salle de Bain', category: 'Plomberie', image: '/images/portfolio/project-1.jpg' },
    { title: 'Installation Chauffe-eau', category: 'Plomberie', image: '/images/portfolio/project-2.jpg' },
    { title: 'Réparation Fuite', category: 'Réparation', image: '/images/portfolio/project-3.jpg' },
    { title: 'Débouchage Canalisation', category: 'Nettoyage', image: '/images/portfolio/project-4.jpg' },
  ]

  const effectivePortfolioItems =
    Array.isArray(business.portfolioItemsOverride) && business.portfolioItemsOverride.length > 0
      ? business.portfolioItemsOverride
          .map((i, idx) => ({
            title: i.title || '',
            category: i.category || 'Plomberie',
            image: i.image || '/images/portfolio/project-1.jpg',
            alt: i.alt,
            __sanityIndex: idx,
          }))
          .filter((i) => Boolean(i.title))
      : portfolioItems

  const filteredPortfolioItems =
    selectedPortfolioCategory === 'Tous'
      ? effectivePortfolioItems
      : effectivePortfolioItems.filter((item) => item.category === selectedPortfolioCategory)

  const partners = ['Certifié', 'Assuré', 'Professionnel', 'Garanti']

  const defaultAboutImages = [
    {src: '/images/about/about-1.jpg', alt: 'Plumbing work'},
    {src: '/images/about/about-2.jpg', alt: 'Professional team'},
    {src: '/images/about/about-3.jpg', alt: 'Quality work'},
    {src: '/images/about/about-4.jpg', alt: 'Guaranteed service'},
  ]

  const rawAboutImages =
    Array.isArray(business.aboutImageUrls) && business.aboutImageUrls.length > 0
      ? business.aboutImageUrls.slice(0, 4)
      : []

  const aboutImages = defaultAboutImages.map((fallback, idx) => {
    const override = rawAboutImages[idx]
    return {
      src: override?.src || fallback.src,
      alt: override?.alt || fallback.alt,
    }
  })

  const sanity = (path: string) =>
    business.overrideId
      ? dataAttr({
          id: business.overrideId,
          type: 'businessOverride',
          path,
        }).toString()
      : undefined

  const primaryColor = business.primaryColor || '#1e3a8a'
  const accentColor = business.accentColor || '#facc15'

  return (
    <div style={{['--brand-primary' as any]: primaryColor, ['--brand-accent' as any]: accentColor}}>
      {/* Header */}
      <header className="bg-[var(--brand-primary)] text-white sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="text-xl md:text-2xl font-bold">{business.name}</div>

            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                aria-label="Edit primary color"
                className="h-5 w-5 rounded border border-white/30"
                style={{backgroundColor: 'var(--brand-primary)'}}
                data-sanity={sanity('primaryColor')}
              />
              <button
                type="button"
                aria-label="Edit accent color"
                className="h-5 w-5 rounded border border-white/30"
                style={{backgroundColor: 'var(--brand-accent)'}}
                data-sanity={sanity('accentColor')}
              />
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="hover:text-[var(--brand-accent)] transition-colors">À Propos</a>
              <a href="#services" className="hover:text-[var(--brand-accent)] transition-colors">Services</a>
              <a href="#contact" className="hover:text-[var(--brand-accent)] transition-colors">Contact</a>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
            
            {/* Desktop CTA Button */}
            <a href="#contact" className="hidden md:block bg-[var(--brand-accent)] text-[var(--brand-primary)] px-6 py-2 rounded font-bold hover:opacity-90 transition-colors">
              Obtenir un Devis
            </a>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-[color-mix(in_oklab,var(--brand-primary)_85%,black)]">
              <div className="flex flex-col gap-4">
                <a href="#about" className="hover:text-[var(--brand-accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>À Propos</a>
                <a href="#services" className="hover:text-[var(--brand-accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#contact" className="hover:text-[var(--brand-accent)] transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <a href="#contact" className="bg-[var(--brand-accent)] text-[var(--brand-primary)] px-6 py-2 rounded font-bold hover:opacity-90 transition-colors inline-block text-center" onClick={() => setMobileMenuOpen(false)}>
                  Obtenir un Devis
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[var(--brand-primary)] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={business.heroImageUrl || "/images/hero/hero.jpg"}
            alt="Plumber working"
            className="w-full h-full object-cover opacity-20"
            fetchPriority="high"
            decoding="async"
            data-sanity={sanity('heroImage')}
          />
        </div>
        <div className="relative container">
          <div className="grid gap-12 lg:grid-cols-2 items-center py-16 lg:py-24">
            <div data-aos="fade-up">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span data-sanity={sanity('heroTitle')}>
                  {business.heroTitle || 'Votre Prestataire de Services de Confiance'}
                </span>
              </h1>
              <p className="text-xl mb-8 text-[color-mix(in_oklab,var(--brand-primary)_15%,white)]">
                <span data-sanity={sanity('heroSubtitle')}>
                  {business.heroSubtitle ||
                    'Services de plomberie et de bricolage professionnels sur lesquels vous pouvez compter. Travail de qualité, prix équitables et service fiable.'}
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="bg-[var(--brand-accent)] text-[var(--brand-primary)] px-8 py-3 rounded font-bold hover:opacity-90 transition-colors text-center">
                  Obtenir un Devis
                </a>
                <a href={telHref} className="border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-[var(--brand-primary)] transition-colors text-center">
                  Appeler Maintenant
                </a>
              </div>
              {hasPhone && (
                <div className="flex items-center gap-2 text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
                  <FaPhone className="text-[var(--brand-accent)]" />
                  <span>{business.phone}</span>
                </div>
              )}
            </div>
            <div data-aos="fade-left">
              <div className="bg-[color-mix(in_oklab,var(--brand-primary)_85%,black)] bg-opacity-90 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Contact Rapide</h2>
                <form className="space-y-4">
                  <label htmlFor="quick-contact-name" className="sr-only">Nom</label>
                  <input id="quick-contact-name" type="text" placeholder="Nom" className="w-full px-4 py-3 rounded bg-[color-mix(in_oklab,var(--brand-primary)_75%,black)] text-white placeholder-[color-mix(in_oklab,var(--brand-primary)_30%,white)] border border-[color-mix(in_oklab,var(--brand-primary)_65%,black)] focus:border-[var(--brand-accent)] focus:outline-none" />

                  <label htmlFor="quick-contact-email" className="sr-only">Email</label>
                  <input id="quick-contact-email" type="email" placeholder="Email" className="w-full px-4 py-3 rounded bg-[color-mix(in_oklab,var(--brand-primary)_75%,black)] text-white placeholder-[color-mix(in_oklab,var(--brand-primary)_30%,white)] border border-[color-mix(in_oklab,var(--brand-primary)_65%,black)] focus:border-[var(--brand-accent)] focus:outline-none" />

                  <label htmlFor="quick-contact-phone" className="sr-only">Téléphone</label>
                  <input id="quick-contact-phone" type="tel" placeholder="Téléphone" className="w-full px-4 py-3 rounded bg-[color-mix(in_oklab,var(--brand-primary)_75%,black)] text-white placeholder-[color-mix(in_oklab,var(--brand-primary)_30%,white)] border border-[color-mix(in_oklab,var(--brand-primary)_65%,black)] focus:border-[var(--brand-accent)] focus:outline-none" />

                  <label htmlFor="quick-contact-message" className="sr-only">Décrivez votre besoin</label>
                  <textarea id="quick-contact-message" placeholder="Décrivez votre besoin..." rows={3} className="w-full px-4 py-3 rounded bg-[color-mix(in_oklab,var(--brand-primary)_75%,black)] text-white placeholder-[color-mix(in_oklab,var(--brand-primary)_30%,white)] border border-[color-mix(in_oklab,var(--brand-primary)_65%,black)] focus:border-[var(--brand-accent)] focus:outline-none resize-none" />
                  <button type="submit" className="w-full bg-[var(--brand-accent)] text-[var(--brand-primary)] px-6 py-3 rounded font-bold hover:opacity-90 transition-colors cursor-pointer">
                    Envoyer la Demande
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4">Pourquoi Nous Choisir</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à fournir des services de plomberie exceptionnels avec professionnalisme et fiabilité
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="text-center" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[var(--brand-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div data-aos="fade-up">
              <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-6">
                <span data-sanity={sanity('aboutTitle')}>
                  {business.aboutTitle || 'Leader Mondial en Plomberie & Maintenance'}
                </span>
              </h2>
              <p className="text-gray-600 mb-6">
                <span data-sanity={sanity('aboutParagraph1')}>
                  {business.aboutParagraph1 ||
                    "Avec plus d'une décennie d'expérience dans l'industrie de la plomberie, nous sommes devenus le leader mondial en fournissant des solutions complètes pour tous vos besoins de plomberie et de maintenance."}
                </span>
              </p>
              <p className="text-gray-600 mb-6">
                <span data-sanity={sanity('aboutParagraph2')}>
                  {business.aboutParagraph2 ||
                    "Notre équipe d'experts est dédiée à fournir des services de la plus haute qualité, en utilisant les dernières technologies et les meilleures pratiques pour garantir votre satisfaction."}
                </span>
              </p>
              <div className="bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)] p-6 rounded-lg">
                <p className="text-[var(--brand-primary)] font-medium mb-2">"Service excellent! Très professionnel et a résolu notre problème de plomberie rapidement."</p>
                <p className="text-sm text-gray-600">- Client satisfait</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
              <div className="relative group">
                <img src={aboutImages[0]?.src} alt={aboutImages[0]?.alt || 'Plumbing work'} className="rounded-lg w-full h-48 object-cover" loading="lazy" decoding="async" data-sanity={sanity('aboutImages[0]')} />
                <div className="absolute top-2 right-2 bg-[var(--brand-accent)] text-[var(--brand-primary)] px-2 py-1 rounded text-xs font-bold">
                  Certifié
                </div>
              </div>
              <div className="relative group">
                <img src={aboutImages[1]?.src} alt={aboutImages[1]?.alt || 'Professional team'} className="rounded-lg w-full h-48 object-cover" loading="lazy" decoding="async" data-sanity={sanity('aboutImages[1]')} />
                <div className="absolute top-2 right-2 bg-green-400 text-white px-2 py-1 rounded text-xs font-bold">
                  Expert
                </div>
              </div>
              <div className="relative group">
                <img src={aboutImages[2]?.src} alt={aboutImages[2]?.alt || 'Quality work'} className="rounded-lg w-full h-48 object-cover" loading="lazy" decoding="async" data-sanity={sanity('aboutImages[2]')} />
                <div className="absolute top-2 right-2 bg-[var(--brand-primary)] text-white px-2 py-1 rounded text-xs font-bold">
                  Professionnel
                </div>
              </div>
              <div className="relative group">
                <img src={aboutImages[3]?.src} alt={aboutImages[3]?.alt || 'Guaranteed service'} className="rounded-lg w-full h-48 object-cover" loading="lazy" decoding="async" data-sanity={sanity('aboutImages[3]')} />
                <div className="absolute top-2 right-2 bg-red-400 text-white px-2 py-1 rounded text-xs font-bold">
                  Garanti
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4">
              <span data-sanity={sanity('servicesTitle')}>
                {business.servicesTitle || 'Nos Services'}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              <span data-sanity={sanity('servicesSubtitle')}>
                {business.servicesSubtitle || 'Services complets de plomberie et de bromberie pour répondre à tous vos besoins'}
              </span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={service.title} className="bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)] rounded-lg p-6 hover:shadow-lg transition-shadow" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                <div className="flex justify-center mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{service.icon}</div>
                </div>
                <h3 className="font-bold text-[var(--brand-primary)] mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-center mt-10">
            <a href="#contact" className="bg-[var(--brand-accent)] text-[var(--brand-primary)] px-6 sm:px-8 py-3 rounded font-bold hover:opacity-90 transition-colors">
              Voir Tous les Services
            </a>
            <a href="#contact" className="bg-[var(--brand-primary)] text-white px-6 sm:px-8 py-3 rounded font-bold hover:opacity-90 transition-colors">
              Obtenir un Devis
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--brand-primary)] text-white py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">
            <span data-sanity={sanity('ctaTitle')}>
              {business.ctaTitle || 'Étapes Simples pour Faire le Travail'}
            </span>
          </h2>
          <p className="text-xl mb-8 text-[color-mix(in_oklab,var(--brand-primary)_15%,white)]">
            <span data-sanity={sanity('ctaSubtitle')}>
              {business.ctaSubtitle || 'Contactez-nous, décrivez vos besoins, et nous fournirons une solution'}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#contact" className="bg-[var(--brand-accent)] text-[var(--brand-primary)] px-8 py-3 rounded font-bold hover:opacity-90 transition-colors">
              Réserver Maintenant
            </a>
            <a href={telHref} className="border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-[var(--brand-primary)] transition-colors">
              Chat en Direct
            </a>
          </div>
          
          {/* Partner Logos */}
          <div className="flex justify-center gap-8 text-[color-mix(in_oklab,var(--brand-primary)_35%,white)]">
            {partners.map((partner) => (
              <div key={partner} className="text-center" data-aos="fade-up">
                <div className="flex justify-center mb-2">
                  <FaCheckCircle className="text-2xl text-green-400" />
                </div>
                <p className="text-sm">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-white py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4">
              <span data-sanity={sanity('portfolioTitle')}>
                {business.portfolioTitle || 'Nos Travaux Récents & Portfolio'}
              </span>
            </h2>
            <p className="text-gray-600">
              <span data-sanity={sanity('portfolioSubtitle')}>
                {business.portfolioSubtitle || 'Découvrez nos réalisations récentes et projets de plomberie'}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
            {['Tous', 'Plomberie', 'Réparation', 'Nettoyage', 'Urgence'].map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedPortfolioCategory(category)}
                className={`px-3 py-2 rounded text-sm transition-colors whitespace-nowrap ${
                  selectedPortfolioCategory === category
                    ? 'bg-[var(--brand-primary)] text-white'
                    : 'hover:bg-[color-mix(in_oklab,var(--brand-primary)_12%,white)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {filteredPortfolioItems.map((item, index) => (
              <div key={item.title} className="bg-[color-mix(in_oklab,var(--brand-primary)_8%,white)] rounded-lg overflow-hidden group" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={(item as any).alt || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    data-sanity={
                      (item as any).__sanityIndex != null
                        ? sanity(`portfolioItems[${(item as any).__sanityIndex}].image`)
                        : undefined
                    }
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-[var(--brand-primary)]">
                      <span
                        data-sanity={
                          (item as any).__sanityIndex != null
                            ? sanity(`portfolioItems[${(item as any).__sanityIndex}].title`)
                            : undefined
                        }
                      >
                        {item.title}
                      </span>
                    </h3>
                    <span className="bg-[var(--brand-primary)] text-white text-xs px-2 py-1 rounded">
                      <span
                        data-sanity={
                          (item as any).__sanityIndex != null
                            ? sanity(`portfolioItems[${(item as any).__sanityIndex}].category`)
                            : undefined
                        }
                      >
                        {item.category}
                      </span>
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Projet réalisé avec attention aux détails et selon les normes les plus élevées.</p>
                  <a href="#contact" className="text-[var(--brand-primary)] font-semibold hover:opacity-80 transition-colors inline-flex items-center gap-1">
                    Voir les détails <FaArrowRight className="text-xs" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#contact"
              className="inline-block mt-10 bg-[var(--brand-primary)] text-white px-8 py-3 rounded font-bold hover:opacity-90 transition-colors"
            >
              Voir Tous les Projets
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16 relative" data-aos="fade-up">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4">
              <span data-sanity={sanity('contactTitle')}>
                {business.contactTitle || 'Demander un Devis'}
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              <span data-sanity={sanity('contactSubtitle')}>
                {business.contactSubtitle || "Contactez-nous dès aujourd'hui pour un devis gratuit et sans obligation"}
              </span>
            </p>
          </div>
          <div className="grid gap-12 lg:grid-cols-2">
            <div data-aos="fade-up">
              <h3 className="text-2xl font-bold text-[var(--brand-primary)] mb-6">Informations de Contact</h3>
              <div className="space-y-4">
                {hasPhone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-[var(--brand-primary)] text-xl" />
                    <div>
                      <p className="font-semibold">Nous Appeler</p>
                      <p className="text-gray-600">{business.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-[var(--brand-primary)] text-xl" />
                  <div>
                    <p className="font-semibold">Nous Envoyer un Email</p>
                    <p className="text-gray-600">info@example.com</p>
                  </div>
                </div>
                {hasAddress && (
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[var(--brand-primary)] text-xl" />
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p className="text-gray-600">{business.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div data-aos="fade-left">
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid">
                    <label htmlFor="contact-name" className="sr-only">Nom</label>
                    <input id="contact-name" type="text" placeholder="Nom" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none" />
                  </div>
                  <div className="grid">
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input id="contact-email" type="email" placeholder="Email" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none" />
                  </div>
                </div>
                <label htmlFor="contact-phone" className="sr-only">Téléphone</label>
                <input id="contact-phone" type="tel" placeholder="Téléphone" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none" />

                <label htmlFor="contact-service" className="sr-only">Service</label>
                <select id="contact-service" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none">
                  <option>Sélectionner un Service</option>
                  <option>Dépannage d'urgence</option>
                  <option>Installation</option>
                  <option>Maintenance</option>
                </select>

                <label htmlFor="contact-date" className="sr-only">Date</label>
                <input id="contact-date" type="date" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none" />

                <label htmlFor="contact-time" className="sr-only">Heure</label>
                <input id="contact-time" type="time" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-[var(--brand-primary)] focus:outline-none" />
                <button type="submit" className="w-full bg-[var(--brand-accent)] text-[var(--brand-primary)] px-6 py-3 rounded font-bold hover:opacity-90 transition-colors cursor-pointer">
                  Soumettre la Demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {reviews.length > 0 && (
        <section className="bg-white py-16 relative" data-aos="fade-up">
          <SectionDotsBackground />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[var(--brand-primary)] mb-4">
                <span data-sanity={sanity('testimonialsTitle')}>
                  {business.testimonialsTitle || 'Ce que Disent Nos Clients'}
                </span>
              </h2>
              <p className="text-gray-600">
                <span data-sanity={sanity('testimonialsSubtitle')}>
                  {business.testimonialsSubtitle || 'Retours authentiques de clients satisfaits'}
                </span>
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => {
                      const parsed = Number.parseInt(String(review.rating), 10)
                      const safeRating = Number.isFinite(parsed) ? Math.max(0, Math.min(5, parsed)) : 0
                      const filled = i < safeRating
                      return (
                        <FaStar
                          key={i}
                          className={filled ? 'text-[var(--brand-accent)]' : 'text-gray-300'}
                        />
                      )
                    })}
                  </div>
                  <p className="text-gray-700 mb-4">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{review.author}</p>
                      <p className="text-sm text-gray-600">{review.date}</p>
                    </div>
                    <div className="w-10 h-10 bg-[color-mix(in_oklab,var(--brand-primary)_12%,white)] rounded-full flex items-center justify-center">
                      <FaUsers className="text-[var(--brand-primary)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer - Mezon Style */}
      <footer className="bg-[var(--brand-primary)] text-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold mb-4">{business.name}</h3>
              <p className="text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
                Services de plomberie professionnels sur lesquels vous pouvez faire confiance
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
                <li><a href="#about" className="hover:text-white transition-colors">À Propos</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
                <li>Dépannage d'urgence</li>
                <li>Installation</li>
                <li>Maintenance</li>
                <li>Inspection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Informations de Contact</h4>
              <div className="space-y-2 text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
                {hasPhone && <p className="flex items-center gap-2"><FaPhone className="text-[color-mix(in_oklab,var(--brand-primary)_35%,white)]" /> {business.phone}</p>}
                {hasAddress && <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" /> {business.address}</p>}
                <p className="flex items-center gap-2"><FaEnvelope className="text-green-400" /> info@example.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[color-mix(in_oklab,var(--brand-primary)_85%,black)] mt-8 pt-8 text-center text-[color-mix(in_oklab,var(--brand-primary)_25%,white)]">
            <p>&copy; 2024 {business.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
