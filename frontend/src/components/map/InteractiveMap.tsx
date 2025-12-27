'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { MapPin } from 'lucide-react'

// Fix for default icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
})

interface SchoolMarker {
  id: string
  name: string
  position: [number, number]
  city: string
  rating: number
}

const defaultCenter: [number, number] = [3.8480, 11.5021] // Yaoundé

const mockMarkers: SchoolMarker[] = [
  { id: '1', name: 'Auto-École Excellence', position: [3.8480, 11.5021], city: 'Yaoundé', rating: 4.8 },
  { id: '2', name: 'Permis Plus', position: [4.0511, 9.7679], city: 'Douala', rating: 4.6 },
  { id: '3', name: 'Bafoussam Pro', position: [5.4786, 10.4176], city: 'Bafoussam', rating: 4.7 },
  { id: '4', name: 'Garoua Driving', position: [9.3014, 13.3937], city: 'Garoua', rating: 4.5 },
  { id: '5', name: 'Maroua Sécurité', position: [10.5924, 14.3157], city: 'Maroua', rating: 4.4 },
  { id: '6', name: 'Kribi Coastal', position: [2.9375, 9.9102], city: 'Kribi', rating: 4.3 },
]

const InteractiveMap = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  // Custom icon
  const customIcon = L.divIcon({
    html: `<div class="bg-green-600 text-white p-2 rounded-full border-2 border-white shadow-lg">
             <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
               <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
             </svg>
           </div>`,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trouvez une auto-école près de chez vous
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Utilisez notre carte interactive pour localiser les auto-écoles dans votre région.
            Cliquez sur un marqueur pour voir les détails.
          </p>
        </div>

        <div className="relative h-[500px] rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
          <MapContainer
            center={defaultCenter}
            zoom={7}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mockMarkers.map((marker) => (
              <Marker key={marker.id} position={marker.position} icon={customIcon}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-lg">{marker.name}</h3>
                    <p className="text-gray-600">{marker.city}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="font-semibold">{marker.rating.toFixed(1)}</span>
                    </div>
                    <a
                      href={`/school/${marker.id}`}
                      className="inline-block mt-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Voir détails →
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Légende */}
          <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg z-[1000]">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
                <span className="text-sm">Auto-école vérifiée</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <MapPin className="h-4 w-4 mr-2" />
            <span>Activer la géolocalisation pour trouver les auto-écoles les plus proches</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap