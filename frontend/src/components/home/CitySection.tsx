import { MapPin } from 'lucide-react'
import Link from 'next/link'

const cities = [
  { name: 'Yaoundé', count: 120, slug: 'yaounde' },
  { name: 'Douala', count: 95, slug: 'douala' },
  { name: 'Bafoussam', count: 45, slug: 'bafoussam' },
  { name: 'Garoua', count: 38, slug: 'garoua' },
]

const CitySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trouvez une auto-école dans votre ville
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/search?city=${city.slug}`}
              className="group bg-gray-50 hover:bg-blue-50 rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300"
            >
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700">
                {city.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {city.count} auto-écoles
              </p>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            href="/cities" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Voir toutes les villes
            <MapPin className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CitySection