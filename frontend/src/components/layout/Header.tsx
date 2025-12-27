'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, MapPin, User, Info , Mail, UserPlus } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
       <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-semibold text-blue-700 tracking-tight">
             DriveLink
       </span>
      </Link>

{/* Navigation Desktop */}
<nav className="hidden md:flex items-center space-x-8">
  <Link
    href="/search"
    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
  >
   <MapPin size={16} strokeWidth={1.6}  />
    <span>Auto-écoles</span>
  </Link>

  <Link
    href="/about"
    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
  >
    <Info size={16} strokeWidth={1.8} />
    <span>À propos</span>
  </Link>

  <Link
    href="/contact"
    className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
  >
    <Mail size={16} strokeWidth={1.8} />
    <span>Contact</span>
  </Link>
</nav>



          {/* CTA Buttons */}
          <button className="min-w-[300px] flex items-center justify-center gap-3 px-6 py-2 rounded-full border border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition">
             <Search className="h-4 w-4" />
             <span className="text-sm font-medium">Rechercher</span>
         </button>

         <Link href="/login" className="flex items-center justify-center gap-2 bg-blue-600 text-white min-w-[200px] px-5 py-2 rounded-full hover:bg-blue-700 transition">
              <User className="h-4 w-4" />
              <span className="text-sm font-medium">Connexion</span>
            </Link>
            <Link href="/register" className="flex items-center justify-center gap-2 bg-green-600 text-white min-w-[200px] px-5 py-2 rounded-full hover:bg-green-700 transition">
              <UserPlus className="h-4 w-4" />
              <span className="text-sm font-medium">Inscription</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/search" className="text-gray-600 hover:text-blue-600">
                Auto-écoles
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">
                 À propos
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <div className="pt-4 space-y-2">
                <Link href="/login" className="block text-center bg-blue-600 text-white px-4 py-2 rounded-full">
                  Connexion
                </Link>
                <Link href="/register/school" className="block text-center bg-green-600 text-white px-4 py-2 rounded-full">
                  Inscrire mon auto-école
                </Link>
              </div>
            </div>
          </div>
        )}
    </header>
  )
}

export default Header