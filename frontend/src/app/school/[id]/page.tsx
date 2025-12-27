'use client'

import { useState, useEffect } from 'react'
import { 
  Star, MapPin, Phone, Mail, Globe, Clock, Users, 
  Shield, Award, Calendar, Car, CheckCircle, ChevronRight,
  Facebook, Twitter, Instagram, Share2, Heart, ChevronLeft,
  ChevronRight as ChevronRightIcon, X, Navigation,
  PhoneCall, Mail as MailIcon, Globe as GlobeIcon,
  Award as AwardIcon, Check as CheckIcon, ExternalLink,
  MessageCircle, FileText, Download, Printer, Copy
} from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Import dynamique de la carte Leaflet
const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600 text-sm">Chargement de la carte...</p>
      </div>
    </div>
  )
})

// Données mock pour une auto-école
const schoolData = {
  id: '1',
  name: 'Auto-École Excellence Yaoundé',
  city: 'Yaoundé',
  address: 'Rue 1234, Quartier Bastos, Yaoundé',
  rating: 4.8,
  reviewCount: 124,
  totalStudents: 1500,
  yearsExperience: 15,
  phone: '+237 670 00 00 00',
  email: 'contact@excellence-yaounde.cm',
  website: 'www.excellence-yaounde.cm',
  description: 'Auto-école leader à Yaoundé avec plus de 15 ans d\'expérience. Nous offrons des formations de qualité pour les permis A, B, C et D avec des moniteurs certifiés et des véhicules modernes.',
  features: [
    'Moniteurs certifiés',
    'Véhicules récents',
    'Horaires flexibles',
    'Paiement échelonné',
    'Cours théoriques en salle',
    'Simulateur de conduite',
    'Préparation à l\'examen',
    'Parking gratuit',
    'Salle d\'attente climatisée',
    'Wi-Fi gratuit'
  ],
  licenseTypes: [
    { type: 'A', name: 'Permis Moto', price: 250000, icon: '🛵' },
    { type: 'B', name: 'Permis Voiture', price: 280000, icon: '🚗' },
    { type: 'C', name: 'Permis Poids lourd', price: 350000, icon: '🚚' },
    { type: 'D', name: 'Permis Bus', price: 400000, icon: '🚌' }
  ],
  packages: [
    {
      name: 'Forfait Standard',
      price: 280000,
      duration: '3 mois',
      popular: false,
      includes: ['20h de conduite', 'Cours théorique', 'Livre de code', '1 examen blanc']
    },
    {
      name: 'Forfait Accéléré',
      price: 350000,
      duration: '6 semaines',
      popular: true,
      includes: ['30h de conduite', 'Cours théorique', 'Livre de code', '2 examens blancs', 'Accès illimité simulateur']
    },
    {
      name: 'Forfait VIP',
      price: 450000,
      duration: '2 mois',
      popular: false,
      includes: ['40h de conduite', 'Cours particulier', 'Livre de code premium', '3 examens blancs', 'Accès illimité simulateur', 'Transport inclus']
    }
  ],
  reviews: [
    {
      id: 1,
      author: 'Jean Dupont',
      rating: 5,
      date: '15 Jan 2024',
      comment: 'Excellente auto-école ! Les moniteurs sont très patients et professionnels. J\'ai obtenu mon permis du premier coup.',
      verified: true
    },
    {
      id: 2,
      author: 'Marie Kamga',
      rating: 4,
      date: '10 Jan 2024',
      comment: 'Très bonne formation, matériel moderne. Le seul bémol : parfois un peu d\'attente pour les heures de conduite.',
      verified: true
    },
    {
      id: 3,
      author: 'Atagana Jean',
      rating: 5,
      date: '05 Jan 2024',
      comment: 'Je recommande vivement ! J\'ai fait mon permis B ici et tout s\'est très bien passé. Prix correct pour la qualité.',
      verified: false
    },
    {
      id: 4,
      author: 'Sarah Mballa',
      rating: 5,
      date: '28 Dec 2023',
      comment: 'Super expérience ! Les véhicules sont récents et bien entretenus. Monitrice très pédagogue.',
      verified: true
    }
  ],
  images: [
    'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop'
  ],
  schedule: {
    lundi: '8h-18h',
    mardi: '8h-18h',
    mercredi: '8h-18h',
    jeudi: '8h-18h',
    vendredi: '8h-17h',
    samedi: '9h-14h',
    dimanche: 'Fermé'
  },
  coordinates: {
    lat: 3.8689867,
    lng: 11.5213344
  }
}

const SchoolDetailPage = ({ params }: { params: { id: string } }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [isFavorite, setIsFavorite] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [showQuickContact, setShowQuickContact] = useState(false)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % schoolData.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + schoolData.images.length) % schoolData.images.length)
  }

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: '🏢' },
    { id: 'packages', label: 'Forfaits', icon: '💰' },
    { id: 'reviews', label: 'Avis', icon: '⭐' },
    { id: 'schedule', label: 'Horaires', icon: '🕐' },
    { id: 'photos', label: 'Photos', icon: '📸' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
         <Header />
      {/* Héros amélioré avec carrousel */}
      <div className="relative">
        {/* Image principale */}
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url('${schoolData.images[selectedImage]}')` }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          
          {/* Navigation images */}
          <button 
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full text-white transition-colors"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
          
          {/* Points indicateurs */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {schoolData.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  selectedImage === index ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Contenu du héros */}
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                <MapPin className="h-4 w-4 text-white mr-2" />
                <span className="text-sm text-white font-medium">{schoolData.city}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                {schoolData.name}
              </h1>
              
              <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
                  <span className="text-white font-bold text-lg">{schoolData.rating.toFixed(1)}</span>
                  <span className="text-white/80 ml-1">({schoolData.reviewCount} avis)</span>
                </div>
                
                <div className="flex items-center text-white/90">
                  <AwardIcon className="h-4 w-4 mr-1" />
                  <span className="text-sm">{schoolData.yearsExperience} ans d'expérience</span>
                </div>
                
                <div className="flex items-center text-white/90">
                  <Users className="h-4 w-4 mr-1" />
                  <span className="text-sm">{schoolData.totalStudents.toLocaleString()} élèves formés</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets de navigation sticky */}
        <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id 
                      ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50/50' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2 text-lg">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contenu principal */}
          <div className="lg:w-2/3">
            {/* Section Aperçu */}
            <section id="overview" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">À propos de l'auto-école</h2>
                    <p className="text-gray-600">Leader de la formation à la conduite à {schoolData.city}</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-700 text-lg leading-relaxed">{schoolData.description}</p>
                  
                  {/* Statistiques */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{schoolData.yearsExperience}+</div>
                      <div className="text-gray-600">Années d'expérience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{schoolData.totalStudents.toLocaleString()}+</div>
                      <div className="text-gray-600">Élèves formés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                      <div className="text-gray-600">Taux de réussite</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{schoolData.rating.toFixed(1)}</div>
                      <div className="text-gray-600">Note moyenne</div>
                    </div>
                  </div>
                  
                  {/* Services */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      Nos services inclus
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {schoolData.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Types de permis */}
                  <div>
                    <h3 className="text-xl font-bold mb-4">Types de permis proposés</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {schoolData.licenseTypes.map((license) => (
                        <div key={license.type} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl text-center hover:from-blue-100 hover:to-blue-200 transition-all">
                          <div className="text-4xl mb-2">{license.icon}</div>
                          <div className="text-lg font-bold text-gray-900 mb-1">Permis {license.type}</div>
                          <div className="text-gray-600 text-sm mb-2">{license.name}</div>
                          <div className="text-xl font-bold text-green-600">{license.price.toLocaleString()} FCFA</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section Forfaits */}
            <section id="packages" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">💰</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Forfaits disponibles</h2>
                      <p className="text-gray-600">Choisissez la formule qui vous convient</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {schoolData.packages.map((pkg, index) => (
                    <div 
                      key={index}
                      className={`relative rounded-2xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 ${
                        selectedPackage === index 
                          ? 'ring-2 ring-blue-600 bg-blue-50' 
                          : pkg.popular
                          ? 'ring-2 ring-green-500 bg-gradient-to-b from-white to-green-50'
                          : 'border border-gray-200 hover:border-blue-400'
                      }`}
                      onClick={() => setSelectedPackage(index)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Populaire
                          </div>
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{pkg.name}</h3>
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {pkg.price.toLocaleString()} FCFA
                        </div>
                        <div className="text-gray-600">{pkg.duration}</div>
                      </div>
                      
                      <ul className="space-y-3 mb-8">
                        {pkg.includes.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                        selectedPackage === index
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}>
                        {selectedPackage === index ? 'Sélectionné ✓' : 'Choisir ce forfait'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Avis */}
            <section id="reviews" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-2xl">⭐</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Avis des élèves</h2>
                      <p className="text-gray-600">{schoolData.reviewCount} avis vérifiés</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Laisser un avis
                  </button>
                </div>
                
                <div className="space-y-6">
                  {schoolData.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-bold text-gray-900">{review.author}</span>
                            {review.verified && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Vérifié
                              </span>
                            )}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                        <div className="text-gray-500 text-sm whitespace-nowrap">{review.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Horaires */}
            <section id="schedule" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">🕐</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Horaires d'ouverture</h2>
                    <p className="text-gray-600">Planifiez votre visite ou vos cours</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(schoolData.schedule).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-500 mr-3" />
                        <span className="font-medium capitalize text-gray-900">{day}</span>
                      </div>
                      <span className={`font-semibold ${hours === 'Fermé' ? 'text-red-600' : 'text-green-600'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section Photos */}
            <section id="photos" className="scroll-mt-24">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-2xl">📸</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Photos</h2>
                    <p className="text-gray-600">Découvrez nos installations</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {schoolData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index)
                        setShowImageModal(true)
                      }}
                      className="aspect-square rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${image}?w=400&h=400&fit=crop')` }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Barre latérale - Sticky avec carte en bas */}
          <div className="lg:w-1/3">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Carte de contact et réservation */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center">
                    <PhoneCall className="h-5 w-5 text-blue-500 mr-2" />
                    Réservation Rapide
                  </h3>
                  <button
                    onClick={() => setShowQuickContact(!showQuickContact)}
                    className="text-blue-600 hover:text-blue-800 p-1"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
                
                {showQuickContact && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-xl animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-blue-700">Contact rapide</h4>
                      <div className="flex space-x-2">
                        <button className="p-1 hover:bg-blue-100 rounded">
                          <Copy className="h-4 w-4 text-blue-600" />
                        </button>
                        <button className="p-1 hover:bg-blue-100 rounded">
                          <Printer className="h-4 w-4 text-blue-600" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Téléphone:</span>
                        <span className="font-medium">{schoolData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{schoolData.email}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex items-start p-3 bg-blue-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Adresse</div>
                      <div className="font-medium">{schoolData.address}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-green-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Téléphone</div>
                      <a href={`tel:${schoolData.phone}`} className="font-medium text-green-700 hover:underline">
                        {schoolData.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-3 bg-purple-50 rounded-lg">
                    <MailIcon className="h-5 w-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Email</div>
                      <a href={`mailto:${schoolData.email}`} className="font-medium text-purple-700 hover:underline">
                        {schoolData.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Boutons d'action principaux */}
                <div className="space-y-3 mb-6">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Réserver une formation
                  </button>
                  
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Demander un devis
                  </button>
                </div>

                {/* Actions secondaires */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    <span className="text-sm">Brochure</span>
                  </button>
                  <button className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Printer className="h-4 w-4 mr-2" />
                    <span className="text-sm">Imprimer</span>
                  </button>
                </div>
              </div>

              {/* Carte interactive - Positionnée en bas de la sidebar */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center">
                    <Navigation className="h-5 w-5 text-red-500 mr-2" />
                    Localisation
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">Bastos</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  <p className="mb-2">📍 {schoolData.address}</p>
                  <p className="text-xs text-gray-500">Zone: Quartier diplomatique - Proche Ambassade de France</p>
                </div>
                
                <div className="h-64 rounded-xl overflow-hidden mb-4 border border-gray-200">
                  <MapComponent 
                    center={[schoolData.coordinates.lat, schoolData.coordinates.lng]}
                    zoom={15}
                    markers={[
                      {
                        position: [schoolData.coordinates.lat, schoolData.coordinates.lng],
                        title: schoolData.name,
                        description: schoolData.address
                      }
                    ]}
                  />
                </div>
                
                <div className="space-y-3">
                  <a
                    href={`https://www.google.com/maps/dir//${schoolData.coordinates.lat},${schoolData.coordinates.lng}/@${schoolData.coordinates.lat},${schoolData.coordinates.lng},15z`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Obtenir l'itinéraire
                  </a>
                  <div className="flex justify-center space-x-4 text-sm">
                    <a 
                      href={`https://www.openstreetmap.org/#map=15/${schoolData.coordinates.lat}/${schoolData.coordinates.lng}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      OpenStreetMap
                    </a>
                    <span className="text-gray-400">|</span>
                    <a 
                      href={`https://maps.google.com/?q=${schoolData.coordinates.lat},${schoolData.coordinates.lng}`}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Google Maps
                    </a>
                  </div>
                </div>

                {/* Informations d'accès */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-sm mb-2 text-gray-700">Accès et stationnement</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Parking sécurisé gratuit</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Accessible en taxi et moto-taxi</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Proche arrêt de bus Bastos</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Section Réseaux sociaux */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-bold mb-4 text-gray-900">Suivez cette auto-école</h4>
                <div className="grid grid-cols-4 gap-3">
                  <a href="#" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex flex-col items-center">
                    <Facebook className="h-5 w-5" />
                    <span className="text-xs mt-1">Facebook</span>
                  </a>
                  <a href="#" className="p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-xl transition-colors flex flex-col items-center">
                    <Twitter className="h-5 w-5" />
                    <span className="text-xs mt-1">Twitter</span>
                  </a>
                  <a href="#" className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-colors flex flex-col items-center">
                    <Instagram className="h-5 w-5" />
                    <span className="text-xs mt-1">Instagram</span>
                  </a>
                  <a href="#" className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors flex flex-col items-center">
                    <span className="text-sm font-bold">WA</span>
                    <span className="text-xs mt-1">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal d'image */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative max-w-6xl w-full">
            <div 
              className="w-full h-96 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('${schoolData.images[selectedImage]}')` }}
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {schoolData.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedImage === index ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
     
      <Footer />
    </div>
  )
}

export default SchoolDetailPage