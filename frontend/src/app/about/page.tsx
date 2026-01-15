'use client'

import {
  Target, Users, Shield, Award, MapPin, Heart,
  CheckCircle, TrendingUp, Globe, Star, Car, School
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/layout/Header' // Ajustez le chemin selon votre structure
import Footer from '@/components/layout/Footer' // Ajustez le chemin selon votre structure

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'David Mvogo',
      role: 'Développeur frontend',
      bio: 'Expert en design d\'application web',
      image: '/images/team/MDR.jpeg'
    },
    {
      name: 'Driss Moussa',
      role: 'Responsable Marketing',
      bio: 'Spécialiste en acquisition digitale',
      image: '/images/team/driss.jpg'
    },
    {
      name: 'Amina Ngo',
      role: 'Responsable Partenariats',
      bio: 'Ancienne directrice d\'auto-école',
      image: '/images/team/amina.jpg'
    },
    {
      name: 'Jean Kana',
      role: 'Lead Développeur',
      bio: 'Expert en microservices et DevOps',
      image: '/images/team/jean.jpg'
    }
  ]

  const milestones = [
    { year: '2023', event: 'Idéation du projet', description: 'Analyse du marché camerounais' },
    { year: '2024 Q1', event: 'Développement MVP', description: 'Version beta avec 50 auto-écoles' },
    { year: '2024 Q2', event: 'Lancement officiel', description: 'Ouverture au public' },
    { year: '2024 Q3', event: 'Expansion', description: 'Couverture de 10 villes' },
    { year: '2025', event: 'Objectif', description: '500 auto-écoles, 10 000 élèves' }
  ]

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Transparence',
      description: 'Tous les prix et avis sont vérifiés et authentiques'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion',
      description: 'Nous croyons en la mobilité comme droit fondamental'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Excellence',
      description: 'Nous sélectionnons uniquement les meilleures auto-écoles'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Communauté',
      description: 'Nous construisons une communauté de conducteurs responsables'
    }
  ]

  // Section Notre Mission avec contenu équilibré
  const missionItems = [
    {
      icon: <Target className="h-10 w-10 text-blue-600" />,
      title: 'Notre Mission',
      description: 'Digitaliser et simplifier l\'accès à la formation au permis de conduire au Cameroun.'
    },
    {
      icon: <Globe className="h-10 w-10 text-green-600" />,
      title: 'Notre Vision',
      description: 'Devenir la plateforme de référence pour la mobilité en Afrique francophone.'
    },
    {
      icon: <Star className="h-10 w-10 text-yellow-600" />,
      title: 'Nos Valeurs',
      description: 'Transparence, excellence et engagement envers notre communauté.'
    }
  ]

  return (
    <>
      {/* Intégration du Header */}
      <Header />

      <div className="min-h-screen pt-16"> {/* pt-16 pour compenser le header fixe si nécessaire */}

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-600 to-blue-900 text-white pt-40 pb-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Notre Mission : Révolutionner l'apprentissage de la conduite au Cameroun
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Drissman est la première marketplace dédiée à la formation à la conduite.
              Nous connectons élèves et auto-écoles dans un environnement transparent et sécurisé.
            </p>
          </div>
        </section>

        {/* Section Notre Mission - Équilibrée horizontalement */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Engagement</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {missionItems.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                  <div className="flex justify-center mb-6">
                    <div className="p-3 bg-gray-100 rounded-full">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Notre Histoire</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-gray-700 text-lg mb-6">
                    Tout a commencé en 2023 lorsque notre fondateur,a constaté les difficultés
                    que rencontraient ses proches pour obtenir leur permis de conduire au Cameroun.
                  </p>
                  <p className="text-gray-700 text-lg mb-6">
                    Entre les prix opaques, la qualité variable des formations et le manque de transparence,
                    l'expérience était souvent frustrante pour les élèves comme pour les auto-écoles.
                  </p>
                  <p className="text-gray-700 text-lg">
                    C'est ainsi qu'est née l'idée de <span className="font-bold text-blue-600">Drissman</span> :
                    une plateforme qui digitalise et simplifie tout le processus, de la recherche d'auto-école
                    à l'obtention du permis.
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="space-y-8">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg mr-4">
                          {milestone.year}
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{milestone.event}</h4>
                          <p className="text-gray-600">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Nos Valeurs</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Ces principes guident chacune de nos décisions et actions
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                  <div className="text-blue-600 mb-6 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Notre Équipe - AVEC IMAGES */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Notre Équipe</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Une équipe passionnée réunissant expertise technique et connaissance du secteur
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw, 128px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact & Statistiques */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Impact</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-200">Auto-écoles partenaires</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15k+</div>
                <div className="text-blue-200">Élèves satisfaits</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-200">Taux de satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-200">Villes couvertes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Pourquoi Nous Choisir */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Choisir DrivingSchool.cm ?</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  {[
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Auto-écoles vérifiées et certifiées'
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Prix transparents sans surprise'
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Avis authentiques d\'anciens élèves'
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Paiements sécurisés Mobile Money'
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Support client 7j/7'
                    },
                    {
                      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
                      text: 'Réservation en ligne simplifiée'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      {item.icon}
                      <span className="ml-4 text-lg">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Notre Engagement</h3>
                <p className="text-gray-700 mb-6">
                  Devenir la plateforme de référence pour la mobilité en Afrique francophone,
                  en digitalisant l'ensemble de l'écosystème de la formation à la conduite.
                </p>
                <p className="text-gray-700 mb-6">
                  Nous aspirons à un Cameroun où chaque citoyen peut accéder facilement
                  à une formation de qualité pour obtenir son permis de conduire,
                  contribuant ainsi à une mobilité plus sûre et plus responsable.
                </p>
                <div className="flex items-center text-blue-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Basé à Yaoundé, au service de tout le Cameroun</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez Notre Aventure</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Que vous soyez élève conducteur ou auto-école, participez à la révolution
              de la formation à la conduite au Cameroun.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Trouver une auto-école
              </Link>
              <Link
                href="/register/school"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors duration-300"
              >
                Inscrire mon auto-école
              </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-white/30">
              <p className="text-lg">
                Des questions ? Contactez-nous à{' '}
                <a href="mailto:contact@drivingschool.cm" className="font-bold underline">
                  contact@drivelink.cm
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Intégration du Footer */}
      <Footer />
    </>
  )
}

export default AboutPage