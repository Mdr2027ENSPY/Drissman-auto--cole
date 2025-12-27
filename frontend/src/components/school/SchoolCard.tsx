import Link from 'next/link'
import { Star, MapPin } from 'lucide-react'

interface SchoolCardProps {
  id: string
  name: string
  city: string
  rating: number
  reviewCount: number
  price: number
  image: {
    url: string
    alt: string
  }
  licenseTypes: string[]
  featured: boolean
}

const SchoolCard = ({ id, name, city, rating, reviewCount, price, image, licenseTypes, featured }: SchoolCardProps) => {
  return (
    <Link href={`/school/${id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="h-48 bg-gray-200 relative">
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Recommandée
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{city}</span>
          </div>
          
          {/* Note et avis */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold mr-2">{rating.toFixed(1)}</span>
            <span className="text-gray-600">({reviewCount} avis)</span>
          </div>
          
          {/* Types de permis */}
          <div className="flex flex-wrap gap-2 mb-4">
            {licenseTypes.map((type) => (
              <span
                key={type}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium"
              >
                Permis {type}
              </span>
            ))}
          </div>
          
          {/* Prix */}
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-gray-600">À partir de</div>
              <div className="text-2xl font-bold text-green-600">
                {price.toLocaleString()} FCFA
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Voir détails
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SchoolCard