'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Car, Facebook, Twitter, Instagram, ArrowLeft } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { apiData } from '@/lib/api'

interface SharedLoginFormProps {
  userType: 'student' | 'school';
}

const SharedLoginForm = ({ userType }: SharedLoginFormProps) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const theme = {
    student: {
      primary: 'bg-green-600',
      gradient: 'from-green-500 to-green-700',
      bgPage: 'bg-green-50',
      text: 'text-green-600',
      hover: 'hover:bg-green-700',
      focus: 'focus:border-green-500',
      label: 'Élève'
    },
    school: {
      primary: 'bg-blue-600',
      gradient: 'from-blue-500 to-blue-700',
      bgPage: 'bg-blue-50',
      text: 'text-blue-600',
      hover: 'hover:bg-blue-700',
      focus: 'focus:border-blue-500',
      label: 'Partenaire'
    }
  }

  const currentTheme = theme[userType]

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.bgPage}`}>
      <Header />

      <main className="flex-grow flex items-center justify-center p-4 py-12 md:py-20 relative overflow-hidden">
        {/* Option Image de fond pour le login spécifique */}
        {/* <div className="absolute inset-0 bg-[url('/fond-discret.jpg')] opacity-10 pointer-events-none"></div> */}

        <div className="w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] relative z-10 border border-gray-100">


          {/* SECTION GAUCHE - BRANDING (Couleur dynamique) */}
          <div className={`md:w-1/2 p-12 text-white relative overflow-hidden flex flex-col justify-between bg-gradient-to-br ${currentTheme.gradient}`}>

            {/* Possibilité de mettre une image de fond ici */}
            <div className="absolute inset-0 opacity-20 bg-[url('/images/route.jpeg')] bg-cover bg-center"></div>
            {/* Formes abstraites en fond */}
            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-80 h-80 bg-black/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 mt-10 md:mt-0">
              <div className="flex items-center space-x-2 mb-12">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                  <Car className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">Driss<span className="opacity-70">man</span></span>
              </div>

              <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/20 text-sm font-medium backdrop-blur-md">
                Espace {currentTheme.label}
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Hello, <br />
                <span className="opacity-90 underline decoration-white/30">welcome back!</span>
              </h1>
              <p className="text-lg text-white/80 max-w-sm leading-relaxed">
                {userType === 'student'
                  ? "Connectez-vous pour accéder à votre tableau de bord d'apprentissage et vos prochaines leçons."
                  : "Accédez à votre espace de gestion pour suivre vos élèves, moniteurs et plannings."}
              </p>
            </div>

            {/* Indicateur simple en bas */}
            <div className="relative z-10 text-sm opacity-60">
              © 2024 Drive.cm - Sécurisé
            </div>
          </div>


          {/* SECTION DROITE - FORMULAIRE */}
          <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white">
            <div className="max-w-sm mx-auto w-full">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h2>
                <p className="text-gray-500">Veuillez entrer vos identifiants.</p>
              </div>

              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setError('')
                try {
                  const user = await apiData.login(email, password)
                  console.log('Login success:', user)
                  localStorage.setItem('user', JSON.stringify(user));
                  if (user.role === 'SCHOOL') {
                    router.push('/dashboard/school')
                  } else {
                    router.push('/dashboard/student')
                  }
                } catch (err: any) {
                  setError(err.message || 'Login failed')
                } finally {
                  setLoading(false)
                }
              }}>
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                    {error}
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@mail.com"
                    className={`w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 transition-all outline-none focus:bg-white ${currentTheme.focus}`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mot de passe</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className={`w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 transition-all outline-none focus:bg-white ${currentTheme.focus}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded-md border-gray-300" />
                    <span className="text-gray-500 font-medium">Rester connecté</span>
                  </label>
                  <Link href="#" className={`font-bold hover:underline ${currentTheme.text}`}>
                    Oublié ?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 rounded-2xl text-white font-bold shadow-xl shadow-gray-200 transition-all active:scale-[0.98] mt-4 ${currentTheme.primary} ${currentTheme.hover} disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-gray-500 text-sm">
                  Pas encore inscrit ? <Link href="/register" className={`font-bold ${currentTheme.text}`}>Créer un compte</Link>
                </p>
                <div className="flex justify-center space-x-5 mt-6 text-gray-300">
                  <Facebook className="h-5 w-5 hover:text-blue-600 cursor-pointer transition-colors" />
                  <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer transition-colors" />
                  <Instagram className="h-5 w-5 hover:text-pink-600 cursor-pointer transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default SharedLoginForm




















