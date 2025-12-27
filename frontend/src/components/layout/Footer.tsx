'use client'

import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Car, Users, Info } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
          
          {/* Colonne 1: Logo et description */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                <Car className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">DriveLink</span>
                <p className="text-xs text-gray-400">Plateforme N°1 au Cameroun</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La première marketplace dédiée à la formation à la conduite au Cameroun.
              Trouvez, comparez et réservez votre formation en ligne facilement.
            </p>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-blue-400" />
              <h3 className="text-md font-semibold">Pour les élèves</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/search" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  Trouver une auto-école
                </Link>
              </li>
              <li>
                <Link 
                  href="/register" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  S'inscrire comme élève
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  Comment ça marche
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Pour les auto-écoles */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Car className="h-4 w-4 text-blue-400" />
              <h3 className="text-md font-semibold">Pour les auto-écoles</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/register/school" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  Inscrire mon auto-école
                </Link>
              </li>
              <li>
                <Link 
                  href="/login/school" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  Espace auto-école
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-gray-400 hover:text-white text-sm transition-all duration-300 block"
                >
                  Support technique
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-4 w-4 text-blue-400" />
              <h3 className="text-md font-semibold">Contact & Informations</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2 group">
                <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-blue-600 transition-colors">
                  <MapPin className="h-3 w-3 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors block">Adresse</span>
                  <span className="text-xs">Yaoundé, Cameroun</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 group">
                <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-3 w-3 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors block">Téléphone</span>
                  <span className="text-xs">+237 6XX XX XX XX</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 group">
                <div className="p-1.5 bg-gray-800 rounded-md group-hover:bg-blue-600 transition-colors">
                  <Mail className="h-3 w-3 text-gray-400 group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-400 text-xs group-hover:text-white transition-colors block">Email</span>
                  <span className="text-xs">contact@drivingschool.gmail</span>
                </div>
              </div>
            </div>
            
            {/* Réseaux sociaux */}
            <div className="pt-3">
              <p className="text-sm font-medium mb-3">Suivez-nous</p>
              <div className="flex space-x-3">
                {[
                  { icon: <Facebook className="h-5 w-5" />, label: 'Facebook' },
                  { icon: <Twitter className="h-5 w-5" />, label: 'Twitter' },
                  { icon: <Instagram className="h-5 w-5" />, label: 'Instagram' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="p-2 bg-gray-800 hover:bg-blue-600 rounded-md transition-all duration-300 group relative"
                    aria-label={social.label}
                  >
                    {social.icon}
                    <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>

        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-500 text-xs">
            <p>© {new Date().getFullYear()} <span className="text-blue-400">DriveLink</span> - Tous droits réservés.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/privacy" 
              className="text-gray-400 hover:text-white text-xs transition-colors hover:underline"
            >
              Politique de confidentialité
            </Link>
            <Link 
              href="/terms" 
              className="text-gray-400 hover:text-white text-xs transition-colors hover:underline"
            >
              Conditions d'utilisation
            </Link>
            <Link 
              href="/cookies" 
              className="text-gray-400 hover:text-white text-xs transition-colors hover:underline"
            >
              Cookies
            </Link>
          </div>
          
          <div className="text-gray-500 text-xs flex items-center">
            <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
            Service disponible 24h/24
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer