'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Filter } from 'lucide-react'
import SchoolCard from '@/components/school/SchoolCard'

const mockSchools = [
  {
    id: '1',
    name: 'Auto-École Excellence',
    city: 'Yaoundé',
    rating: 4.8,
    reviewCount: 124,
    price: 280000,
    image: {
      url: '/images/schools/Auto Ecole.jpeg',
      alt: 'Auto-École Excellence à Yaoundé'
    },
    licenseTypes: ['A', 'B'],
    featured: true
  },
  {
    id: '2',
    name: 'Permis Plus Douala',
    city: 'Douala',
    rating: 4.6,
    reviewCount: 89,
    price: 300000,
    image: {
      url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
      alt: 'Permis Plus Douala'
    },
    licenseTypes: ['B', 'C'],
    featured: true
  },
  {
    id: '3',
    name: 'Auto-École Bafoussam Pro',
    city: 'Bafoussam',
    rating: 4.7,
    reviewCount: 67,
    price: 250000,
    image: {
      url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
      alt: 'Auto-École Bafoussam Pro'
    },
    licenseTypes: ['A', 'B'],
    featured: false
  },
  {
    id: '4',
    name: 'École de Conduite Garoua',
    city: 'Garoua',
    rating: 4.5,
    reviewCount: 45,
    price: 275000,
    image: {
      url: '/images/schools/Auto Ecole 2.jpeg',
      alt: 'École de Conduite Garoua'
    },
    licenseTypes: ['B'],
    featured: false
  },
  {
    id: '5',
    name: 'Permis Expert Yaoundé',
    city: 'Yaoundé',
    rating: 4.9,
    reviewCount: 156,
    price: 320000,
    image: {
      url: '/images/schools/Auto Ecole 3.jpeg',
      alt: 'Permis Expert Yaoundé'
    },
    licenseTypes: ['A', 'B', 'D'],
    featured: true
  },
  {
    id: '6',
    name: 'Auto-École Maroua Sécurité',
    city: 'Maroua',
    rating: 4.4,
    reviewCount: 38,
    price: 260000,
    image: {
      url: '/images/schools/Auto Ecole 4.jpeg',
      alt: 'Auto-École Maroua Sécurité'
    },
    licenseTypes: ['B'],
    featured: false
  },
]

const FeaturedSchools = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3) % mockSchools.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 + mockSchools.length) % mockSchools.length)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête avec filtres */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Les meilleures auto-écoles
            </h2>
            <p className="text-gray-600">
              Sélectionnées selon leurs notes, nombre d'avis et qualité de service
            </p>
          </div>
        </div>

        {/* Grille des auto-écoles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSchools.map((school) => (
            <SchoolCard key={school.id} {...school} />
          ))}
        </div>


        {/* Voir toutes les auto-écoles */}
        <div className="text-center mt-10">
          <a
            href="/search"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
          >
            Voir toutes les auto-écoles
            <ChevronRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSchools