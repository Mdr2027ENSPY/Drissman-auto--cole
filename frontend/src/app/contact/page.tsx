'use client'

import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react'
import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header' // Ajustez le chemin
import Footer from '@/components/layout/Footer' // Ajustez le chemin
import dynamic from 'next/dynamic'

// Import dynamique de la carte Leaflet pour éviter les problèmes SSR
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement de la carte...</p>
      </div>
    </div>
  )
})

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })

  const [submitted, setSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Coordonnées de Yaoundé (Bastos)
  const defaultLocation = {
    lat: 3.8689867,
    lng: 11.5213344,
    zoom: 15
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simuler l'envoi
    setTimeout(() => {
      setSubmitted(true)
    }, 1000)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Téléphone',
      details: ['+237 670 00 00 00', '+237 651 00 00 00'],
      description: 'Disponible du lundi au vendredi, 8h-18h'
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'Email',
      details: ['contact@drissman.cm', 'support@drissman.cm'],
      description: 'Réponse sous 24h'
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: 'Adresse',
      details: ['Rue 1234, Quartier Bastos', 'Yaoundé, Cameroun'],
      description: 'Bureau principal'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Horaires',
      details: ['Lundi - Vendredi: 8h-18h', 'Samedi: 9h-14h'],
      description: 'Fermé le dimanche'
    }
  ]

  return (
    <>
      {/* Intégration du Header */}
      <Header />

      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-40 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Nous sommes là pour vous aider. N'hésitez pas à nous contacter pour toute question.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Informations de contact */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Nos Coordonnées</h2>

              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-600 p-3 rounded-lg mr-4">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-700">{detail}</p>
                      ))}
                      <p className="text-gray-500 text-sm mt-2">{info.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carte Interactive Leaflet */}
              <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex items-center">
                    <Navigation className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="font-bold text-lg">Carte interactive - Yaoundé</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Notre bureau à Bastos, Yaoundé</p>
                </div>

                <div className="h-64 relative">
                  {isClient && (
                    <MapComponent
                      center={[defaultLocation.lat, defaultLocation.lng]}
                      zoom={defaultLocation.zoom}
                      markers={[
                        {
                          position: [defaultLocation.lat, defaultLocation.lng],
                          title: "DrivingSchool.cm",
                          description: "Bureau principal - Rue 1234, Bastos"
                        }
                      ]}
                    />
                  )}

                  {/* Overlay avec bouton d'action */}
                  <div className="absolute bottom-4 right-4 z-[1000]">
                    <a
                      href={`https://www.openstreetmap.org/directions?from=&to=${defaultLocation.lat}%2C${defaultLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-blue-600 font-semibold px-4 py-2 rounded-lg shadow-lg flex items-center transition-all duration-200 hover:shadow-xl"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Itinéraire
                    </a>
                  </div>
                </div>

                <div className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">DrivingSchool.cm - Bureau</p>
                      <p className="text-sm text-gray-600">Rue 1234, Bastos, Yaoundé</p>
                    </div>
                    <button
                      onClick={() => window.open(`https://www.openstreetmap.org/#map=${defaultLocation.zoom}/${defaultLocation.lat}/${defaultLocation.lng}`, '_blank')}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      Voir en grand
                    </button>
                  </div>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-bold text-blue-700 mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Nous trouver facilement
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Situé à Bastos, quartier diplomatique</li>
                  <li>• Parking disponible sur place</li>
                  <li>• Accessible en taxi et moto-taxi</li>
                  <li>• Proche de l'Ambassade de France</li>
                </ul>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold mb-4">Message envoyé !</h2>
                    <p className="text-gray-600 mb-8">
                      Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      Envoyer un nouveau message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2">Envoyez-nous un message</h2>
                    <p className="text-gray-600 mb-8">
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2">Nom complet *</label>
                          <input
                            type="text"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Votre nom et prénom"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Email *</label>
                          <input
                            type="email"
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 mb-2">Téléphone</label>
                          <input
                            type="tel"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+237 6XX XX XX XX"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 mb-2">Sujet *</label>
                          <select
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          >
                            <option value="">Sélectionnez un sujet</option>
                            <option value="inscription">Inscription élève</option>
                            <option value="auto-ecole">Inscription auto-école</option>
                            <option value="support">Support technique</option>
                            <option value="partenariat">Proposition de partenariat</option>
                            <option value="autre">Autre</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Type de demande</label>
                        <div className="flex flex-wrap gap-3 mb-6">
                          {[
                            { value: 'general', label: 'Général' },
                            { value: 'technical', label: 'Technique' },
                            { value: 'billing', label: 'Facturation' },
                            { value: 'partnership', label: 'Partenariat' }
                          ].map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, type: type.value })}
                              className={`px-4 py-2 rounded-lg transition-all duration-200 ${formData.type === type.value
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                                }`}
                            >
                              {type.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Message *</label>
                        <textarea
                          required
                          rows={6}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Décrivez votre demande en détail..."
                        ></textarea>
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          * Champs obligatoires
                        </p>
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-4 px-8 rounded-xl font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <Send className="h-5 w-5 mr-2" />
                          Envoyer le message
                        </button>
                      </div>
                    </form>
                  </>
                )}

                {/* FAQ rapide */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-bold mb-4">Questions fréquentes</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-blue-700 mb-1">Combien de temps pour obtenir une réponse ?</div>
                      <div className="text-gray-600 text-sm">Nous répondons sous 24h pendant les jours ouvrables.</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-blue-700 mb-1">Comment inscrire mon auto-école ?</div>
                      <div className="text-gray-600 text-sm">Rendez-vous sur la page d'inscription auto-école ou contactez-nous directement.</div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-blue-700 mb-1">Quels moyens de paiement acceptez-vous ?</div>
                      <div className="text-gray-600 text-sm">MTN MoMo, Orange Money, espèces, carte bancaire.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Réseaux Sociaux */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-8">Suivez-nous sur les réseaux</h2>
            <div className="flex justify-center space-x-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'WhatsApp'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="bg-white hover:bg-blue-50 text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Intégration du Footer */}
      <Footer />
    </>
  )
}

export default ContactPage