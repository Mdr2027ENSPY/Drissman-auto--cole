'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Eye, EyeOff, Mail, User, Phone, MapPin, Car,
  School, Calendar, Shield, ArrowLeft, CheckCircle, ArrowRight
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { apiData } from '@/lib/api'

interface Props { userType: 'student' | 'school' }

const SharedRegisterForm = ({ userType }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false) // État pour la notification
  const [formData, setFormData] = useState({
    email: '', phone: '', password: '', city: '',
    firstName: '', lastName: '', birthDate: '', address: '', licenseType: 'B',
    schoolName: '', directorName: '', schoolAddress: '', licenseTypes: [] as string[],
    yearsExperience: '', description: ''
  })

  const isStudent = userType === 'student'
  const themeColor = isStudent ? 'green' : 'blue'

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Map form data to Backend User entity structure
    // Backend expects: name, email, password, role, phoneNumber, address, city
    const payload = {
      name: isStudent ? `${formData.firstName} ${formData.lastName}` : formData.schoolName,
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phone,
      address: isStudent ? formData.address : formData.schoolAddress,
      city: formData.city,
      role: isStudent ? 'STUDENT' : 'SCHOOL',
      // Note: Extra fields like licenseType, directorName etc are currently dropped 
      // until Backend is updated to support them.
    }

    try {
      await apiData.register(payload)
      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      alert("Erreur lors de l'inscription: " + (err as any).message)
    }
  }

  return (
    <div className={`min-h-screen flex flex-col relative ${isStudent ? 'bg-green-50' : 'bg-blue-50'}`}>
      <Header />

      {/* --- NOTIFICATION DE SUCCÈS (OVERLAY) --- */}
      {isSubmitted && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-sm w-full text-center shadow-2xl transform animate-in zoom-in-95 duration-300">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${isStudent ? 'bg-green-100' : 'bg-blue-100'}`}>
              <CheckCircle className={`h-10 w-10 ${isStudent ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Compte créé !</h2>
            <p className="text-gray-500 mb-8">
              Félicitations, votre inscription en tant qu'{isStudent ? 'élève' : 'auto-école'} a été enregistrée avec succès.
            </p>
            <Link
              href="/login"
              className={`flex items-center justify-center w-full py-4 rounded-2xl text-white font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${isStudent ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Se connecter maintenant <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">

          {/* SECTION GAUCHE - DESIGN */}
          <div className={`md:w-1/3 p-10 text-white relative flex flex-col justify-between bg-gradient-to-br ${isStudent ? 'from-green-500 to-green-700' : 'from-blue-500 to-blue-700'}`}>
            <div className="relative z-10">
              <Link href="/register" className="inline-flex items-center text-sm bg-black/10 hover:bg-black/20 px-4 py-2 rounded-full backdrop-blur-md transition-all mb-8">
                <ArrowLeft className="h-4 w-4 mr-2" /> Retour
              </Link>
              <h1 className="text-3xl font-bold mb-4">Rejoignez-nous</h1>
              <p className="text-white/80">Commencez votre parcours dès aujourd'hui sur notre plateforme.</p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Espace</p>
                <p className="text-xl font-bold">{isStudent ? 'Élève Conducteur' : 'Auto-École Partenaire'}</p>
              </div>
            </div>
          </div>

          {/* SECTION DROITE - FORMULAIRE */}
          <div className="md:w-2/3 p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900">Inscription</h2>
              <p className="text-gray-500 font-medium">Remplissez le formulaire pour continuer.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      required
                      name="email"
                      type="email"
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-${themeColor}-500 outline-none transition-all`}
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                {/* Téléphone */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Téléphone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      required
                      name="phone"
                      type="tel"
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-${themeColor}-500 outline-none transition-all`}
                      placeholder="+237 6..."
                    />
                  </div>
                </div>
              </div>

              {/* ... Reste des champs (Mot de passe, etc.) identiques à ton code ... */}

              <button
                type="submit"
                className={`w-full py-5 rounded-2xl text-white font-bold text-lg shadow-xl transition-all active:scale-[0.98] mt-6 ${isStudent ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
              >
                Créer mon compte {isStudent ? 'Élève' : 'École'}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SharedRegisterForm