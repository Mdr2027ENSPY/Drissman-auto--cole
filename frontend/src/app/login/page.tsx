'use client'

import Link from 'next/link'
import { User, Building, ArrowRight, Car, Shield, Users } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const LoginSelectorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Section principale avec option image de fond */}
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        
        {/* OPTION IMAGE DE FOND : Décommente la ligne ci-dessous et ajoute ton image */}
        {/* <div className="absolute inset-0 bg-[url('/votre-image-fond.jpg')] bg-cover bg-center opacity-40"></div> */}
        
        {/* Overlays décoratifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-5xl relative z-10 py-12">
          <div className="text-center mb-16 text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Espace de Connexion
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              Sélectionnez votre profil pour accéder à vos services personnalisés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte Élève */}
            <Link href="/login/student" className="group">
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 shadow-2xl hover:shadow-green-500/20 hover:-translate-y-2 transition-all duration-300 h-full border-t-8 border-green-500">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <User className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Je suis un Élève</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Suivez vos cours de code, gérez vos heures de conduite et consultez votre progression.
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-bold group-hover:bg-green-700 transition-colors shadow-lg shadow-green-600/30">
                    Se connecter <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Carte Auto-école */}
            <Link href="/login/school" className="group">
              <div className="bg-white/95 backdrop-blur-sm rounded-[2rem] p-8 md:p-10 shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 transition-all duration-300 h-full border-t-8 border-blue-600">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Espace Partenaire</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Gérez vos moniteurs, vos plannings de leçons et le suivi administratif de vos élèves.
                  </p>
                  <div className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold group-hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
                    Accéder à l'interface <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LoginSelectorPage