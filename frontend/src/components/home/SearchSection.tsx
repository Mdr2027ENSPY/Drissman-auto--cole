'use client'

import { useState } from 'react'
import { Search, MapPin, Filter, Car } from 'lucide-react'

const SearchSection = () => {
  const [city, setCity] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Logique de recherche à implémenter
    console.log({ city, licenseType, maxPrice })
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Recherchez l'auto-école parfaite
          </h2>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ville */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <MapPin className="h-4 w-4 mr-2" />
                  Où ?
                </label>
                <input
                  type="text"
                  placeholder="Yaoundé, Douala, Bafoussam..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              {/* Type de permis */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Type de permis
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value)}
                >
                  <option value="">Tous les permis</option>
                  <option value="A">Permis A (Moto)</option>
                  <option value="B">Permis B (Voiture)</option>
                  <option value="C">Permis C (Poids lourd)</option>
                  <option value="D">Permis D (Bus)</option>
                </select>
              </div>

              {/* Prix max */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Budget maximum (FCFA)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Ex: 300000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <span className="absolute left-3 top-3 text-gray-500">FCFA</span>
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 font-semibold text-lg"
              >
                <Search className="h-5 w-5 mr-2" />
                Rechercher
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center border border-gray-300 text-gray-700 p-4 rounded-lg hover:bg-gray-50"
              >
                <Filter className="h-5 w-5 mr-2" />
                Plus de filtres
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SearchSection