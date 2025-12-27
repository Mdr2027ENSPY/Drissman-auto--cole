'use client'

import Link from 'next/link'
import { User, School, ArrowRight, CheckCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const RegisterSelectorPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Créer un compte</h1>
            <p className="text-gray-600">Choisissez le type de profil qui vous correspond pour commencer.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Carte Élève - VERT */}
            <Link href="/register/student" className="group">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-green-500/10 hover:-translate-y-2 transition-all border-t-8 border-green-500 h-full">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Élève Conducteur</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Réservez vos cours en ligne
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> Suivez votre progression
                  </li>
                </ul>
                <div className="w-full py-3 text-center bg-green-600 text-white rounded-xl font-bold group-hover:bg-green-700 transition-colors">
                  S'inscrire comme élève
                </div>
              </div>
            </Link>

            {/* Carte École - BLEU */}
            <Link href="/register/school" className="group">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all border-t-8 border-blue-600 h-full">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                  <School className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Auto-École / Partenaire</h2>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Gérez vos plannings
                  </li>
                  <li className="flex items-center text-gray-600 text-sm">
                    <CheckCircle className="h-4 w-4 text-blue-500 mr-2" /> Développez votre visibilité
                  </li>
                </ul>
                <div className="w-full py-3 text-center bg-blue-600 text-white rounded-xl font-bold group-hover:bg-blue-700 transition-colors">
                  Inscrire mon établissement
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

export default RegisterSelectorPage