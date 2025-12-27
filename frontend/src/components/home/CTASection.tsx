import { Users, Shield, Clock, Award } from 'lucide-react'
import Link from 'next/link'

const CTASection = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Sécurité garantie',
      description: 'Toutes les auto-écoles sont vérifiées et certifiées'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: 'Gain de temps',
      description: 'Tout se fait en ligne sans déplacement inutile'
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Meilleur prix',
      description: 'Comparez et choisissez l\'offre la plus avantageuse'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Communauté active',
      description: 'Plus de 10 000 élèves nous font confiance'
    },
  ]

  return (
    <section className="py-12 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4">
        
        {/* Titre */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">
            Prêt à obtenir votre permis ?
          </h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Rejoignez des milliers d'élèves qui ont obtenu leur permis grâce à DriveLink
          </p>
        </div>

        {/* Benefits + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Avantages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-500 p-3 rounded-lg">
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                  <p className="text-blue-200 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-blue-800/30 p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Auto-écoles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">15k+</div>
                <div className="text-blue-200 text-sm">Élèves formés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-blue-200 text-sm">Taux de réussite</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Support client</div>
              </div>
            </div>
          </div>

        </div>

        {/* CTA auto-écoles */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm px-8 py-6 rounded-2xl">
            <h3 className="text-2xl font-bold mb-3">
              Vous êtes une auto-école ?
            </h3>
            <p className="text-blue-200 mb-5">
              Augmentez votre visibilité et gérez vos élèves plus facilement
            </p>
            <Link
              href="/register/school"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition"
            >
              Inscrire mon auto-école
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTASection
