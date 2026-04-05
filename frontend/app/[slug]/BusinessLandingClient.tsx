'use client'

import { useState } from 'react'
import { FaBars, FaTimes, FaTools, FaBolt, FaCheckCircle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaWrench, FaFire, FaBath, FaSink, FaExclamationTriangle, FaThermometerHalf, FaSearch, FaUsers, FaStar, FaArrowRight, FaCertificate, FaShieldAlt, FaClock, FaUserCheck, FaCalendarAlt, FaCheck } from 'react-icons/fa'
import SectionDotsBackground from '@/app/components/SectionDotsBackground'

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
    { icon: <FaCertificate className="text-3xl text-yellow-400" />, title: 'Licencié & Assuré', desc: 'Tous nos techniciens sont certifiés' },
    { icon: <FaShieldAlt className="text-3xl text-yellow-400" />, title: 'Professionnels certifiés', desc: 'Experts avec des années d\'expérience' },
    { icon: <FaClock className="text-3xl text-yellow-400" />, title: 'Service d\'urgence disponible', desc: 'Disponible 24/7 pour les urgences' },
    { icon: <FaUserCheck className="text-3xl text-yellow-400" />, title: 'Équipe expérimentée', desc: 'Années d\'expertise en plomberie' },
  ]

  const portfolioItems = [
    { title: 'Rénovation Salle de Bain', category: 'Plomberie', image: '/images/portfolio/project-1.jpg' },
    { title: 'Installation Chauffe-eau', category: 'Plomberie', image: '/images/portfolio/project-2.jpg' },
    { title: 'Réparation Fuite', category: 'Réparation', image: '/images/portfolio/project-3.jpg' },
    { title: 'Débouchage Canalisation', category: 'Nettoyage', image: '/images/portfolio/project-4.jpg' },
  ]

  const filteredPortfolioItems =
    selectedPortfolioCategory === 'Tous'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedPortfolioCategory)

  const partners = ['Certifié', 'Assuré', 'Professionnel', 'Garanti']

  return (
    <>
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="text-xl md:text-2xl font-bold">{business.name}</div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#about" className="hover:text-yellow-400 transition-colors">À Propos</a>
              <a href="#services" className="hover:text-yellow-400 transition-colors">Services</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
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
            <a href="#contact" className="hidden md:block bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold hover:bg-yellow-300 transition-colors">
              Obtenir un Devis
            </a>
          </div>
          
          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-blue-800">
              <div className="flex flex-col gap-4">
                <a href="#about" className="hover:text-yellow-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>À Propos</a>
                <a href="#services" className="hover:text-yellow-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
                <a href="#contact" className="hover:text-yellow-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
                <a href="#contact" className="bg-yellow-400 text-blue-900 px-6 py-2 rounded font-bold hover:bg-yellow-300 transition-colors inline-block text-center" onClick={() => setMobileMenuOpen(false)}>
                  Obtenir un Devis
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero/hero.jpg" alt="Plumber working" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative container">
          <div className="grid gap-12 lg:grid-cols-2 items-center py-16 lg:py-24">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Votre Prestataire de Services de Confiance
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Services de plomberie et de bricolage professionnels sur lesquels vous pouvez compter. Travail de qualité, prix équitables et service fiable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="bg-yellow-400 text-blue-900 px-8 py-3 rounded font-bold hover:bg-yellow-300 transition-colors text-center">
                  Obtenir un Devis
                </a>
                <a href={telHref} className="border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-blue-900 transition-colors text-center">
                  Appeler Maintenant
                </a>
              </div>
              {hasPhone && (
                <div className="flex items-center gap-2 text-blue-200">
                  <FaPhone className="text-yellow-400" />
                  <span>{business.phone}</span>
                </div>
              )}
            </div>
            <div className="animate-slide-in">
              <div className="bg-blue-800 bg-opacity-90 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">Contact Rapide</h3>
                <form className="space-y-4">
                  <input type="text" placeholder="Nom" className="w-full px-4 py-3 rounded bg-blue-700 text-white placeholder-blue-300 border border-blue-600 focus:border-yellow-400 focus:outline-none" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded bg-blue-700 text-white placeholder-blue-300 border border-blue-600 focus:border-yellow-400 focus:outline-none" />
                  <input type="tel" placeholder="Téléphone" className="w-full px-4 py-3 rounded bg-blue-700 text-white placeholder-blue-300 border border-blue-600 focus:border-yellow-400 focus:outline-none" />
                  <textarea placeholder="Décrivez votre besoin..." rows={3} className="w-full px-4 py-3 rounded bg-blue-700 text-white placeholder-blue-300 border border-blue-600 focus:border-yellow-400 focus:outline-none resize-none" />
                  <button type="submit" className="w-full bg-yellow-400 text-blue-900 px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors cursor-pointer">
                    Envoyer la Demande
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Pourquoi Nous Choisir</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à fournir des services de plomberie exceptionnels avec professionnalisme et fiabilité
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, index) => (
              <div key={item.title} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Leader Mondial en Plomberie & Maintenance</h2>
              <p className="text-gray-600 mb-6">
                Avec plus d'une décennie d'expérience dans l'industrie de la plomberie, nous sommes devenus le leader mondial en fournissant des solutions complètes pour tous vos besoins de plomberie et de maintenance.
              </p>
              <p className="text-gray-600 mb-6">
                Notre équipe d'experts est dédiée à fournir des services de la plus haute qualité, en utilisant les dernières technologies et les meilleures pratiques pour garantir votre satisfaction.
              </p>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-blue-900 font-medium mb-2">"Service excellent! Très professionnel et a résolu notre problème de plomberie rapidement."</p>
                <p className="text-sm text-gray-600">- Client satisfait</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-slide-in">
              <div className="relative group">
                <img src="/images/about/about-1.jpg" alt="Plumbing work" className="rounded-lg w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-yellow-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                  Certifié
                </div>
              </div>
              <div className="relative group">
                <img src="/images/about/about-2.jpg" alt="Professional team" className="rounded-lg w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-green-400 text-white px-2 py-1 rounded text-xs font-bold">
                  Expert
                </div>
              </div>
              <div className="relative group">
                <img src="/images/about/about-3.jpg" alt="Quality work" className="rounded-lg w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-blue-400 text-white px-2 py-1 rounded text-xs font-bold">
                  Professionnel
                </div>
              </div>
              <div className="relative group">
                <img src="/images/about/about-4.jpg" alt="Guaranteed service" className="rounded-lg w-full h-48 object-cover" />
                <div className="absolute top-2 right-2 bg-red-400 text-white px-2 py-1 rounded text-xs font-bold">
                  Garanti
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Nos Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Services complets de plomberie et de bromberie pour répondre à tous vos besoins
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={service.title} className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="flex justify-center mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{service.icon}</div>
                </div>
                <h3 className="font-bold text-blue-900 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
            <a href="#contact" className="bg-yellow-400 text-blue-900 px-6 sm:px-8 py-3 rounded font-bold hover:bg-yellow-300 transition-colors">
              Voir Tous les Services
            </a>
            <a href="#contact" className="bg-blue-900 text-white px-6 sm:px-8 py-3 rounded font-bold hover:bg-blue-800 transition-colors">
              Obtenir un Devis
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Étapes Simples pour Faire le Travail</h2>
          <p className="text-xl mb-8 text-blue-100">
            Contactez-nous, décrivez vos besoins, et nous fournirons une solution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#contact" className="bg-yellow-400 text-blue-900 px-8 py-3 rounded font-bold hover:bg-yellow-300 transition-colors">
              Réserver Maintenant
            </a>
            <a href={telHref} className="border-2 border-white px-8 py-3 rounded font-bold hover:bg-white hover:text-blue-900 transition-colors">
              Chat en Direct
            </a>
          </div>
          
          {/* Partner Logos */}
          <div className="flex justify-center gap-8 text-blue-300">
            {partners.map((partner) => (
              <div key={partner} className="text-center animate-fade-in">
                <div className="flex justify-center mb-2">
                  <FaCheckCircle className="text-2xl text-green-400" />
                </div>
                <div className="text-sm">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-white py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Nos Travaux Récents & Portfolio</h2>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8">
              {['Tous', 'Plomberie', 'Réparation', 'Nettoyage', 'Urgence'].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedPortfolioCategory(category)}
                  className={`px-3 py-2 rounded text-sm transition-colors whitespace-nowrap ${
                    selectedPortfolioCategory === category
                      ? 'bg-blue-900 text-white'
                      : 'hover:bg-blue-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              {filteredPortfolioItems.map((item, index) => (
                <div key={item.title} className="bg-blue-50 rounded-lg overflow-hidden group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="h-48 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                      <span className="bg-blue-900 text-white text-xs px-2 py-1 rounded">{item.category}</span>
                    </div>
                    <p className="text-gray-600 mb-4">Projet réalisé avec attention aux détails et selon les normes les plus élevées.</p>
                    <a href="#contact" className="text-blue-900 font-semibold hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                      Voir les détails <FaArrowRight className="text-xs" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <a href="#contact" className="bg-blue-900 text-white px-8 py-3 rounded font-bold hover:bg-blue-800 transition-colors">
                Voir Tous les Projets
              </a>
            </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16 animate-on-scroll relative">
        <SectionDotsBackground />
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Demander un Devis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour un devis gratuit et sans obligation
            </p>
          </div>
          
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Informations de Contact</h3>
              <div className="space-y-4">
                {hasPhone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-blue-600 text-xl" />
                    <div>
                      <p className="font-semibold">Nous Appeler</p>
                      <p className="text-gray-600">{business.phone}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-semibold">Nous Envoyer un Email</p>
                    <p className="text-gray-600">info@example.com</p>
                  </div>
                </div>
                {hasAddress && (
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-600 text-xl" />
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p className="text-gray-600">{business.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="animate-slide-in">
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input type="text" placeholder="Nom" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none" />
                  <input type="email" placeholder="Email" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none" />
                </div>
                <input type="tel" placeholder="Téléphone" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none" />
                <select className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Sélectionner un Service</option>
                  <option>Dépannage d'urgence</option>
                  <option>Installation</option>
                  <option>Maintenance</option>
                </select>
                <input type="date" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none" />
                <input type="time" className="px-4 py-3 rounded bg-white border border-gray-300 focus:border-blue-500 focus:outline-none" />
                <button type="submit" className="w-full bg-yellow-400 text-blue-900 px-6 py-3 rounded font-bold hover:bg-yellow-300 transition-colors cursor-pointer">
                  Soumettre la Demande
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {reviews.length > 0 && (
        <section className="bg-white py-16 animate-on-scroll relative">
          <SectionDotsBackground />
          <div className="container relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-900 mb-4">Ce que Disent Nos Clients</h2>
              <p className="text-gray-600">Retours authentiques de clients satisfaits</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => {
                      const parsed = Number.parseInt(String(review.rating), 10)
                      const safeRating = Number.isFinite(parsed) ? Math.max(0, Math.min(5, parsed)) : 0
                      const filled = i < safeRating
                      return (
                        <FaStar
                          key={i}
                          className={filled ? 'text-yellow-400' : 'text-gray-300'}
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
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUsers className="text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer - Mezon Style */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-bold mb-4">{business.name}</h3>
              <p className="text-blue-200">
                Services de plomberie professionnels sur lesquels vous pouvez faire confiance
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#about" className="hover:text-white transition-colors">À Propos</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Dépannage d'urgence</li>
                <li>Installation</li>
                <li>Maintenance</li>
                <li>Inspection</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Informations de Contact</h4>
              <div className="space-y-2 text-blue-200">
                {hasPhone && <p className="flex items-center gap-2"><FaPhone className="text-blue-400" /> {business.phone}</p>}
                {hasAddress && <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-400" /> {business.address}</p>}
                <p className="flex items-center gap-2"><FaEnvelope className="text-green-400" /> info@example.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2024 {business.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
