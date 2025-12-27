'use client'

import { DollarSign, Star, MapPin, Car, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState } from 'react'

type SearchFiltersProps = {
  activeFilters: {
    city: string
    minRating: number
    maxPrice: number
    licenseType: string
    services: string[]
  }
  onFilterChange: (filters: any) => void
}

const cities = [
  'Yaoundé', 'Douala', 'Bafoussam', 'Garoua', 'Maroua', 
  'Kribi', 'Ebolowa', 'Ngaoundéré', 'Bamenda', 'Bertoua'
]

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

const SearchFilters = ({ activeFilters, onFilterChange }: SearchFiltersProps) => {
  const [expandedSections, setExpandedSections] = useState({
    city: true,
    rating: true,
    price: true,
    license: true,
    services: true
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleServiceToggle = (serviceId: string) => {
    const currentServices = [...activeFilters.services]
    
    if (currentServices.includes(serviceId)) {
      // Retirer le service
      const updatedServices = currentServices.filter(id => id !== serviceId)
      onFilterChange({ ...activeFilters, services: updatedServices })
    } else {
      // Ajouter le service
      const updatedServices = [...currentServices, serviceId]
      onFilterChange({ ...activeFilters, services: updatedServices })
    }
  }

  return (
    <div className="space-y-6">
      {/* Ville */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('city')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            Ville
          </h3>
          {expandedSections.city ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.city && (
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher une ville..."
                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                value={activeFilters.city}
                onChange={(e) => onFilterChange({...activeFilters, city: e.target.value})}
              />
            </div>
            <div className="max-h-40 overflow-y-auto pr-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => onFilterChange({...activeFilters, city})}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                    activeFilters.city === city 
                      ? 'bg-blue-100 text-blue-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Type de permis */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('license')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold flex items-center">
            <Car className="h-4 w-4 mr-2" />
            Type de permis
          </h3>
          {expandedSections.license ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.license && (
          <div className="space-y-2">
            <button
              onClick={() => onFilterChange({...activeFilters, licenseType: ''})}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                activeFilters.licenseType === '' 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Tous les permis
            </button>
            {[
              { value: 'A', label: 'Permis A (Moto)' },
              { value: 'B', label: 'Permis B (Voiture)' },
              { value: 'C', label: 'Permis C (Poids lourd)' },
              { value: 'D', label: 'Permis D (Bus)' }
            ].map((permis) => (
              <button
                key={permis.value}
                onClick={() => onFilterChange({...activeFilters, licenseType: permis.value})}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                  activeFilters.licenseType === permis.value 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {permis.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Note minimum */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Note minimum
          </h3>
          {expandedSections.rating ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-2">
            {[0, 3.5, 4, 4.5].map((rating) => (
              <button
                key={rating}
                onClick={() => onFilterChange({...activeFilters, minRating: rating})}
                className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm ${
                  activeFilters.minRating === rating 
                    ? 'bg-blue-100 text-blue-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span>{rating === 0 ? 'Toutes notes' : `${rating}+`}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prix maximum */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget maximum
          </h3>
          {expandedSections.price ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <div className="px-2">
              <input
                type="range"
                min="100000"
                max="500000"
                step="50000"
                value={activeFilters.maxPrice}
                onChange={(e) => onFilterChange({...activeFilters, maxPrice: parseInt(e.target.value)})}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-4">
                <span className="text-xs text-gray-500">100K FCFA</span>
                <span className="font-medium text-green-600">
                  {activeFilters.maxPrice.toLocaleString()} FCFA
                </span>
                <span className="text-xs text-gray-500">500K FCFA</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 200000, label: '200K' },
                { value: 300000, label: '300K' },
                { value: 400000, label: '400K' },
                { value: 500000, label: 'Illimité' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => onFilterChange({...activeFilters, maxPrice: option.value})}
                  className={`px-3 py-2 rounded-lg text-sm ${
                    activeFilters.maxPrice === option.value 
                      ? 'bg-blue-100 text-blue-700 font-medium border border-blue-300' 
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Services supplémentaires */}
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection('services')}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="font-semibold">Services inclus</h3>
          {expandedSections.services ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.services && (
          <div className="space-y-2">
            {servicesList.map((service) => (
              <label key={service.id} className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg group">
                <div className={`relative mr-3 h-5 w-5 rounded border ${activeFilters.services.includes(service.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}>
                  {activeFilters.services.includes(service.id) && (
                    <Check className="h-3 w-3 text-white absolute inset-0 m-auto" />
                  )}
                </div>
                <input 
                  type="checkbox" 
                  checked={activeFilters.services.includes(service.id)}
                  onChange={() => handleServiceToggle(service.id)}
                  className="sr-only"
                />
                <span className={`text-sm ${activeFilters.services.includes(service.id) ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                  {service.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Compteur de services sélectionnés */}
      {activeFilters.services.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-700 font-medium">
            {activeFilters.services.length} service{activeFilters.services.length > 1 ? 's' : ''} sélectionné{activeFilters.services.length > 1 ? 's' : ''}
          </p>
          <button
            onClick={() => onFilterChange({...activeFilters, services: []})}
            className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
          >
            Tout désélectionner
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchFilters