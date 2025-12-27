import { Search, School, Calendar, Car, CreditCard, GraduationCap } from 'lucide-react'

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8" />,
      title: 'Recherchez',
      description: 'Trouvez l\'auto-école idéale selon la ville, le prix et les avis.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: <School className="h-8 w-8" />,
      title: 'Comparez',
      description: 'Consultez les détails, les avis et les prix de chaque auto-école.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: 'Réservez',
      description: 'Choisissez votre créneau et effectuez votre pré-inscription en ligne.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Payez',
      description: 'Effectuez le paiement via  Orange Money ou MTN MoMo.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: <Car className="h-8 w-8" />,
      title: 'Formez-vous',
      description: 'Commencez votre formation avec des moniteurs certifiés.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: 'Obtenez votre permis',
      description: 'Passez l\'examen et obtenez votre permis de conduire.',
      color: 'bg-indigo-100 text-indigo-600'
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Comment obtenir votre permis en 6 étapes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suivez notre processus simplifié pour obtenir votre permis de conduire rapidement et en toute sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Numéro d'étape */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-full hover:shadow-lg transition-shadow">
                <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="/register/student" className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg">
            Commencez maintenant, c'est gratuit !
          </a>
          <p className="text-gray-600 mt-4">
            Aucun frais d'inscription. Vous ne payez que lorsque vous réservez votre formation.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks