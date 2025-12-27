'use client'

import { ArrowRight, Star, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.jpeg" // Chemin vers ton image
          alt="Élèves apprenant à conduire au Cameroun"
          fill
          priority
          className="object-cover object-center"
          quality={90}
          sizes="100vw"
        />
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
          Trouvez votre <span className="text-blue-300">auto-école idéale</span>
        </h1>
        
        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md">
          Comparez les prix, les avis et les services de centaines d'auto-écoles.
          Réservez votre formation en ligne en toute confiance.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
            <div className="text-gray-300">Auto-écoles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">10k+</div>
            <div className="text-gray-300">Élèves satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white drop-shadow-lg">10+</div>
            <div className="text-gray-300">Villes couvertes</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/search" 
            className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            Trouver une auto-école
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            href="/login/school" 
            className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition backdrop-blur-sm"
          >
            Je suis une auto-école
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-gray-300">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span>Avis vérifiés</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Star className="h-5 w-5 text-yellow-400 mr-2 fill-yellow-400" />
            <span>Notation transparente</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <span>Paiement sécurisé</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection