'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet avec Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
})

interface MapComponentProps {
  center: [number, number]
  zoom: number
  markers?: {
    position: [number, number]
    title: string
    description: string
  }[]
}

const MapComponent = ({ center, zoom, markers = [] }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    // Initialiser la carte
    mapInstance.current = L.map(mapRef.current).setView(center, zoom)

    // Ajouter la couche OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(mapInstance.current)

    // Ajouter les marqueurs
    markers.forEach(marker => {
      const customIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600"></div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })

      const markerInstance = L.marker(marker.position, { icon: customIcon })
        .addTo(mapInstance.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-lg">${marker.title}</h3>
            <p class="text-gray-600">${marker.description}</p>
            <button onclick="window.open('https://www.openstreetmap.org/directions?from=&to=${marker.position[0]},${marker.position[1]}', '_blank')" 
                    class="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
              Itinéraire
            </button>
          </div>
        `)

      // Ouvrir le popup au clic
      markerInstance.on('click', () => {
        markerInstance.openPopup()
      })
    })

    // Contrôles de zoom
    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapInstance.current)

    // Nettoyage
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [center, zoom, markers])

  return (
    <>
      <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content {
          margin: 13px 19px !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;
        }
      `}</style>
      <div ref={mapRef} className="h-full w-full" />
    </>
  )
}

export default MapComponent