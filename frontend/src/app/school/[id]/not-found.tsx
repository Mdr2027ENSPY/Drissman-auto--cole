import Link from 'next/link'
import { Car, Home, Search } from 'lucide-react'

export default function SchoolNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Car className="h-10 w-10 text-blue-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Auto-école non trouvée
        </h1>
        
        <p className="text-gray-600 mb-8">
          L'auto-école que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/"
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <Link
            href="/search"
            className="flex items-center justify-center border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            Rechercher une auto-école
          </Link>
        </div>
      </div>
    </div>
  )
}