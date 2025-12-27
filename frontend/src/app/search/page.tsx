'use client'

import { useState, useEffect, useRef } from 'react'
import { Filter, MapPin, Star, Grid, List, Sliders, X, DollarSign, Car } from 'lucide-react'
import SchoolCard from '@/components/school/SchoolCard'
import SearchFilters from '@/components/search/SearchFilters'
import Header from '@/components/layout/Header' // Ajustez le chemin selon votre structure
import Footer from '@/components/layout/Footer' // Ajustez le chemin selon votre structure

// Données mock avec services pour le filtrage
const mockSchools = [
  {
    id: '1',
    name: 'Auto-École Excellence Yaoundé',
    city: 'Yaoundé',
    rating: 4.8,
    reviewCount: 124,
    price: 280000,
    image: {
      url: '/images/schools/excellence-yaounde.jpg',
      alt: 'Auto-École Excellence Yaoundé'
    },
    licenseTypes: ['A', 'B'],
    featured: true,
    verified: true,
    distance: '2.5 km',
    packages: ['Forfait Standard', 'Forfait Accéléré'],
    availableServices: ['payment-plan', 'simulator', 'theory-class', 'modern-cars']
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
    featured: true,
    verified: true,
    distance: '3.1 km',
    packages: ['Forfait Standard', 'Forfait VIP'],
    availableServices: ['evening-classes', 'weekend-classes', 'transport', 'flexible-hours']
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
    featured: false,
    verified: true,
    distance: '1.8 km',
    packages: ['Forfait Économique'],
    availableServices: ['payment-plan', 'theory-class']
  },
  {
    id: '4',
    name: 'École de Conduite Garoua',
    city: 'Garoua',
    rating: 4.5,
    reviewCount: 45,
    price: 275000,
    image: {
      url: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop',
      alt: 'École de Conduite Garoua'
    },
    licenseTypes: ['B'],
    featured: false,
    verified: true,
    distance: '4.2 km',
    packages: ['Forfait Standard', 'Forfait Weekend'],
    availableServices: ['weekend-classes', 'transport', 'modern-cars']
  },
  {
    id: '5',
    name: 'Permis Expert Yaoundé',
    city: 'Yaoundé',
    rating: 4.9,
    reviewCount: 156,
    price: 320000,
    image: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      alt: 'Permis Expert Yaoundé'
    },
    licenseTypes: ['A', 'B', 'D'],
    featured: true,
    verified: true,
    distance: '0.5 km',
    packages: ['Forfait Standard', 'Forfait Accéléré', 'Forfait VIP'],
    availableServices: ['payment-plan', 'evening-classes', 'weekend-classes', 'simulator', 'transport', 'theory-class', 'flexible-hours', 'modern-cars']
  },
  {
    id: '6',
    name: 'Auto-École Maroua Sécurité',
    city: 'Maroua',
    rating: 4.4,
    reviewCount: 38,
    price: 260000,
    image: {
      url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&h=300&fit=crop',
      alt: 'Auto-École Maroua Sécurité'
    },
    licenseTypes: ['B'],
    featured: false,
    verified: true,
    distance: '2.3 km',
    packages: ['Forfait Standard'],
    availableServices: ['theory-class', 'modern-cars']
  },
]

// Liste des services disponibles
const servicesList = [
  { id: 'payment-plan', label: 'Paiement échelonné' },
  { id: 'evening-classes', label: 'Cours du soir' },
  { id: 'weekend-classes', label: 'Cours du weekend' },
  { id: 'simulator', label: 'Simulateur de conduite' },
  { id: 'transport', label: 'Transport inclus' },
  { id: 'theory-class', label: 'Cours théorique inclus' },
  { id: 'flexible-hours', label: 'Horaires flexibles' },
  { id: 'modern-cars', label: 'Véhicules récents' }
]

const SearchPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('rating')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredSchools, setFilteredSchools] = useState(mockSchools)
  const [activeFilters, setActiveFilters] = useState({
    city: '',
    minRating: 0,
    maxPrice: 500000,
    licenseType: '',
    services: [] as string[]
  })

  const filterRef = useRef<HTMLDivElement>(null)

  // Fonction pour réinitialiser tous les filtres
  const resetAllFilters = () => {
    setActiveFilters({
      city: '',
      minRating: 0,
      maxPrice: 500000,
      licenseType: '',
      services: []
    })
  }

  // Fonction pour obtenir le label d'un service par son ID
  const getServiceLabel = (serviceId: string) => {
    const service = servicesList.find(s => s.id === serviceId)
    return service ? service.label : serviceId
  }

  // Fonction pour supprimer un filtre spécifique
  const removeFilter = (filterType: keyof typeof activeFilters, value?: any) => {
    if (filterType === 'services' && value) {
      // Supprimer un service spécifique
      setActiveFilters(prev => ({
        ...prev,
        services: prev.services.filter(service => service !== value)
      }))
    } else {
      // Réinitialiser un filtre entier
      if (filterType === 'city') {
        setActiveFilters(prev => ({ ...prev, city: '' }))
      } else if (filterType === 'minRating') {
        setActiveFilters(prev => ({ ...prev, minRating: 0 }))
      } else if (filterType === 'maxPrice') {
        setActiveFilters(prev => ({ ...prev, maxPrice: 500000 }))
      } else if (filterType === 'licenseType') {
        setActiveFilters(prev => ({ ...prev, licenseType: '' }))
      } else if (filterType === 'services') {
        setActiveFilters(prev => ({ ...prev, services: [] }))
      }
    }
  }

  // Logique de filtrage
  useEffect(() => {
    let result = [...mockSchools]
    
    // Filtre par ville
    if (activeFilters.city) {
      result = result.filter(school => 
        school.city.toLowerCase().includes(activeFilters.city.toLowerCase())
      )
    }
    
    // Filtre par note minimum
    if (activeFilters.minRating > 0) {
      result = result.filter(school => school.rating >= activeFilters.minRating)
    }
    
    // Filtre par prix maximum
    if (activeFilters.maxPrice < 500000) {
      result = result.filter(school => school.price <= activeFilters.maxPrice)
    }
    
    // Filtre par type de permis
    if (activeFilters.licenseType) {
      result = result.filter(school => 
        school.licenseTypes.includes(activeFilters.licenseType)
      )
    }
    
    // Filtre par services
    if (activeFilters.services.length > 0) {
      result = result.filter(school => {
        // Vérifie si l'école a TOUS les services sélectionnés
        return activeFilters.services.every(service => 
          school.availableServices.includes(service)
        )
      })
    }
    
    // Tri des résultats
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => b.reviewCount - a.reviewCount)
    }
    
    setFilteredSchools(result)
  }, [activeFilters, sortBy])

  // Gestion du click outside pour fermer les filtres mobiles
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters)
  }

  const totalResults = filteredSchools.length

  return (
    <><div className="min-h-screen bg-gray-50">
          {/* Header simplifié sans bande bleue */}
          <Header />
          <div className="bg-white border-b shadow-sm">
              <div className="container mx-auto px-4 py-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                      Recherche d'auto-écoles
                  </h1>
                  <p className="text-gray-600">
                      {totalResults} auto-école{totalResults > 1 ? 's' : ''} disponible{totalResults > 1 ? 's' : ''}
                  </p>
              </div>
          </div>

          <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-6">
                  {/* Barre latérale des filtres - FIXE sur desktop */}
                  <div
                      ref={filterRef}
                      className={`
              lg:w-1/4 
              ${isFilterOpen ? 'fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:relative' : 'hidden lg:block'}
            `}
                  >
                      <div className={`
              bg-white h-full lg:h-auto lg:rounded-xl lg:shadow-lg p-6 lg:sticky lg:top-6
              ${isFilterOpen ? 'absolute left-0 top-0 w-80 max-w-full overflow-y-auto h-full z-50' : ''}
            `}>
                          {/* En-tête des filtres (mobile) */}
                          <div className="flex items-center justify-between mb-6 lg:hidden">
                              <h2 className="text-xl font-bold flex items-center">
                                  <Sliders className="h-5 w-5 mr-2" />
                                  Filtres
                              </h2>
                              <button
                                  onClick={() => setIsFilterOpen(false)}
                                  className="p-2 hover:bg-gray-100 rounded-lg"
                              >
                                  <X className="h-5 w-5" />
                              </button>
                          </div>

                          {/* Section "Filtrer par" */}
                          <div className="pb-4 border-b mb-6">
                              <h2 className="text-lg font-bold text-gray-900">Filtrer par</h2>
                              <p className="text-sm text-gray-500 mt-1">
                                  Affinez votre recherche selon vos préférences
                              </p>
                          </div>

                          {/* Composant des filtres */}
                          <SearchFilters
                              activeFilters={activeFilters}
                              onFilterChange={handleFilterChange} />

                          {/* Boutons d'action */}
                          <div className="space-y-3 mt-8 pt-6 border-t">
                              <button
                                  onClick={resetAllFilters}
                                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                              >
                                  Réinitialiser tous les filtres
                              </button>
                              <button
                                  onClick={() => setIsFilterOpen(false)}
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors lg:hidden"
                              >
                                  Appliquer les filtres
                              </button>
                          </div>
                      </div>
                  </div>

                  {/* Contenu principal */}
                  <div className="lg:w-3/4">
                      {/* Barre d'outils */}
                      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                              {/* Info résultats */}
                              <div>
                                  <div className="flex items-center">
                                      <span className="font-semibold text-gray-900">{totalResults} résultat{totalResults > 1 ? 's' : ''}</span>
                                      {activeFilters.city && (
                                          <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                              à {activeFilters.city}
                                          </span>
                                      )}
                                  </div>
                                  <p className="text-gray-600 text-sm mt-1">
                                      Triés par {sortBy === 'rating' ? 'note' : sortBy === 'price-low' ? 'prix croissant' : sortBy === 'price-high' ? 'prix décroissant' : 'nombre d\'avis'}
                                  </p>
                              </div>

                              {/* Contrôles */}
                              <div className="flex items-center gap-4">
                                  {/* Bouton filtre mobile */}
                                  <button
                                      onClick={() => setIsFilterOpen(true)}
                                      className="lg:hidden flex items-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700"
                                  >
                                      <Filter className="h-4 w-4 mr-2" />
                                      Filtres
                                  </button>

                                  {/* Trier par */}
                                  <div className="hidden md:block">
                                      <select
                                          className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white"
                                          value={sortBy}
                                          onChange={(e) => setSortBy(e.target.value)}
                                      >
                                          <option value="rating">Trier par note</option>
                                          <option value="reviews">Trier par avis</option>
                                          <option value="price-low">Prix croissant</option>
                                          <option value="price-high">Prix décroissant</option>
                                      </select>
                                  </div>

                                  {/* Mode d'affichage */}
                                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                      <button
                                          onClick={() => setViewMode('grid')}
                                          className={`p-2.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600 border-r border-gray-300' : 'text-gray-600 hover:bg-gray-50'}`}
                                          title="Vue grille"
                                      >
                                          <Grid className="h-5 w-5" />
                                      </button>
                                      <button
                                          onClick={() => setViewMode('list')}
                                          className={`p-2.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                                          title="Vue liste"
                                      >
                                          <List className="h-5 w-5" />
                                      </button>
                                  </div>
                              </div>
                          </div>

                          {/* Filtres actifs (badges cliquables) */}
                          <div className="flex flex-wrap gap-2 mt-4">
                              {activeFilters.city && (
                                  <button
                                      onClick={() => removeFilter('city')}
                                      className="flex items-center bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm hover:bg-blue-100"
                                  >
                                      <MapPin className="h-3 w-3 mr-1" />
                                      Ville : {activeFilters.city}
                                      <X className="h-3 w-3 ml-2" />
                                  </button>
                              )}

                              {activeFilters.minRating > 0 && (
                                  <button
                                      onClick={() => removeFilter('minRating')}
                                      className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-sm hover:bg-yellow-100"
                                  >
                                      <Star className="h-3 w-3 mr-1" />
                                      Note min : {activeFilters.minRating}+
                                      <X className="h-3 w-3 ml-2" />
                                  </button>
                              )}

                              {activeFilters.maxPrice < 500000 && (
                                  <button
                                      onClick={() => removeFilter('maxPrice')}
                                      className="flex items-center bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm hover:bg-green-100"
                                  >
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      Budget max : {activeFilters.maxPrice.toLocaleString()} FCFA
                                      <X className="h-3 w-3 ml-2" />
                                  </button>
                              )}

                              {activeFilters.licenseType && (
                                  <button
                                      onClick={() => removeFilter('licenseType')}
                                      className="flex items-center bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-sm hover:bg-purple-100"
                                  >
                                      <Car className="h-3 w-3 mr-1" />
                                      Permis : {activeFilters.licenseType}
                                      <X className="h-3 w-3 ml-2" />
                                  </button>
                              )}

                              {activeFilters.services.map(serviceId => (
                                  <button
                                      key={serviceId}
                                      onClick={() => removeFilter('services', serviceId)}
                                      className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm hover:bg-indigo-100"
                                  >
                                      {getServiceLabel(serviceId)}
                                      <X className="h-3 w-3 ml-2" />
                                  </button>
                              ))}
                          </div>
                      </div>

                      {/* Résultats */}
                      {viewMode === 'grid' ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {filteredSchools.map((school) => (
                                  <SchoolCard key={school.id} {...school} />
                              ))}
                          </div>
                      ) : (
                          <div className="space-y-6">
                              {filteredSchools.map((school) => (
                                  <div key={school.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                                      <div className="flex flex-col md:flex-row gap-6">
                                          <div className="md:w-1/4">
                                              <div className="relative h-48 rounded-lg overflow-hidden">
                                                  <img
                                                      src={school.image.url}
                                                      alt={school.image.alt}
                                                      className="w-full h-full object-cover" />
                                              </div>
                                          </div>

                                          <div className="md:w-3/4">
                                              <div className="flex justify-between items-start mb-4">
                                                  <div>
                                                      <h3 className="text-xl font-bold">{school.name}</h3>
                                                      <div className="flex items-center text-gray-600 mt-1">
                                                          <MapPin className="h-4 w-4 mr-1" />
                                                          <span>{school.city} • {school.distance}</span>
                                                      </div>
                                                  </div>
                                                  <div className="text-2xl font-bold text-green-600">
                                                      {school.price.toLocaleString()} FCFA
                                                  </div>
                                              </div>

                                              <div className="flex items-center mb-4">
                                                  <div className="flex items-center mr-4">
                                                      {[...Array(5)].map((_, i) => (
                                                          <Star
                                                              key={i}
                                                              className={`h-4 w-4 ${i < Math.floor(school.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                                      ))}
                                                      <span className="ml-2 font-bold">{school.rating.toFixed(1)}</span>
                                                  </div>
                                                  <span className="text-gray-600">({school.reviewCount} avis)</span>
                                              </div>

                                              <div className="flex flex-wrap gap-2 mb-4">
                                                  {school.licenseTypes.map((type) => (
                                                      <span key={type} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                                          Permis {type}
                                                      </span>
                                                  ))}
                                              </div>

                                              <div className="text-gray-600 mb-4">
                                                  {school.packages.join(', ')}
                                              </div>

                                              <div className="flex space-x-4">
                                                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                                                      Voir les détails
                                                  </button>
                                                  <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                                                      Contacter
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}

                      {/* Pagination */}
                      {totalResults > 0 && (
                          <div className="mt-8 flex justify-center">
                              <nav className="flex items-center space-x-2">
                                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                      Précédent
                                  </button>
                                  {[1, 2, 3].map((page) => (
                                      <button
                                          key={page}
                                          className={`px-4 py-2 rounded-lg ${page === 1 ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'}`}
                                      >
                                          {page}
                                      </button>
                                  ))}
                                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                                      Suivant
                                  </button>
                              </nav>
                          </div>
                      )}

                      {/* Aucun résultat */}
                      {totalResults === 0 && (
                          <div className="text-center py-12">
                              <div className="text-6xl mb-4">😕</div>
                              <h3 className="text-2xl font-bold mb-4">Aucune auto-école trouvée</h3>
                              <p className="text-gray-600 mb-6">
                                  Essayez de modifier vos critères de recherche
                              </p>
                              <button
                                  onClick={resetAllFilters}
                                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                              >
                                  Réinitialiser tous les filtres
                              </button>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </div><Footer /></>
  )
}

export default SearchPage