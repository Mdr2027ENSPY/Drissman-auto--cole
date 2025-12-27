'use client'

import { useState } from 'react'
import {
  School, Users, Calendar, CreditCard, TrendingUp,
  Star, MessageSquare, Settings, Bell, Download,
  Filter, Search, ChevronRight, BarChart, CheckCircle
} from 'lucide-react'

const SchoolDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  // Données mock
  const schoolData = {
    name: 'Auto-École Excellence Yaoundé',
    rating: 4.8,
    totalStudents: 156,
    activeStudents: 42,
    revenue: 12500000,
    bookingsThisWeek: 28,
    recentEnrollments: [
      { id: 1, name: 'Jean Dupont', date: '2024-02-14', license: 'B', status: 'active' },
      { id: 2, name: 'Marie Kamga', date: '2024-02-13', license: 'A', status: 'pending' },
      { id: 3, name: 'Paul Biya', date: '2024-02-12', license: 'B', status: 'active' },
      { id: 4, name: 'Sophie Ngo', date: '2024-02-11', license: 'C', status: 'completed' },
    ],
    recentPayments: [
      { id: 1, student: 'Jean Dupont', amount: 75000, date: '2024-02-14', method: 'MTN MoMo' },
      { id: 2, student: 'Marie Kamga', amount: 100000, date: '2024-02-13', method: 'Orange Money' },
      { id: 3, student: 'Paul Biya', amount: 50000, date: '2024-02-12', method: 'Espèces' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
                <School className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{schoolData.name}</h1>
                <p className="text-gray-600">Espace auto-école</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
                <Star className="h-4 w-4 mr-2 fill-current" />
                <span className="font-bold">{schoolData.rating}</span>
                <span className="ml-1">/5</span>
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-blue-600">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Tableau de bord', icon: BarChart },
                  { id: 'students', label: 'Élèves', icon: Users },
                  { id: 'schedule', label: 'Planning', icon: Calendar },
                  { id: 'payments', label: 'Paiements', icon: CreditCard },
                  { id: 'bookings', label: 'Réservations', icon: Calendar },
                  { id: 'reviews', label: 'Avis', icon: Star },
                  { id: 'messages', label: 'Messages', icon: MessageSquare },
                  { id: 'reports', label: 'Rapports', icon: Download },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Statistiques rapides */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4">Statistiques rapides</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-blue-600 mr-2" />
                    <span>Élèves actifs</span>
                  </div>
                  <span className="font-bold text-blue-600">{schoolData.activeStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-2" />
                    <span>Réservations/sem.</span>
                  </div>
                  <span className="font-bold text-green-600">{schoolData.bookingsThisWeek}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Revenus totaux</span>
                  </div>
                  <span className="font-bold text-purple-600">{schoolData.revenue.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:w-3/4">
            {activeTab === 'overview' && (
              <div>
                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{schoolData.totalStudents}</div>
                        <div className="text-gray-600">Élèves totaux</div>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      +12% ce mois-ci
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{schoolData.bookingsThisWeek}</div>
                        <div className="text-gray-600">Réservations/sem.</div>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      +8% cette semaine
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <CreditCard className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{(schoolData.revenue / 1000000).toFixed(1)}M</div>
                        <div className="text-gray-600">Revenus totaux</div>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      +15% ce mois-ci
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                        <Star className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{schoolData.rating}</div>
                        <div className="text-gray-600">Note moyenne</div>
                      </div>
                    </div>
                    <div className="text-sm text-green-600 font-semibold">
                      156 avis
                    </div>
                  </div>
                </div>

                {/* Graphique et liste des élèves */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  {/* Graphique (placeholder) */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Activité récente</h3>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Graphique d'activité</p>
                        <p className="text-sm text-gray-500">Évolution des inscriptions</p>
                      </div>
                    </div>
                  </div>

                  {/* Nouveaux élèves */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Nouvelles inscriptions</h3>
                      <button className="text-blue-600 text-sm font-semibold">
                        Voir tout →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {schoolData.recentEnrollments.map(student => (
                        <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-bold">{student.name}</div>
                              <div className="text-sm text-gray-600">Permis {student.license}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">{student.date}</div>
                            <div className={`text-sm font-semibold ${student.status === 'active' ? 'text-green-600' : student.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'}`}>
                              {student.status === 'active' ? 'Actif' : student.status === 'pending' ? 'En attente' : 'Terminé'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Paiements récents et actions rapides */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Paiements récents */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Paiements récents</h3>
                    <div className="space-y-4">
                      {schoolData.recentPayments.map(payment => (
                        <div key={payment.id} className="flex justify-between items-center p-3 border-b">
                          <div>
                            <div className="font-bold">{payment.student}</div>
                            <div className="text-sm text-gray-600">{payment.method}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{payment.amount.toLocaleString()} FCFA</div>
                            <div className="text-sm text-gray-600">{payment.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 text-center text-blue-600 font-semibold py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Voir tous les paiements
                    </button>
                  </div>

                  {/* Actions rapides */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6">Actions rapides</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                        <span className="text-sm text-center">Gérer le planning</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Users className="h-8 w-8 text-green-600 mb-2" />
                        <span className="text-sm text-center">Ajouter un élève</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
                        <span className="text-sm text-center">Enregistrer paiement</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <MessageSquare className="h-8 w-8 text-yellow-600 mb-2" />
                        <span className="text-sm text-center">Voir messages</span>
                      </button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-bold mb-2">Conseil du jour</h4>
                      <p className="text-sm text-gray-700">
                        Publiez vos disponibilités pour la semaine prochaine pour augmenter vos réservations de 25%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Gestion des élèves</h2>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Liste de vos élèves</h3>
                  <p className="text-gray-600 mb-6">
                    Gérez les informations, la progression et les paiements de vos élèves
                  </p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Ajouter un nouvel élève
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Gestion des paiements</h2>
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Suivi des paiements</h3>
                  <p className="text-gray-600 mb-6">
                    Consultez les transactions, générez des reçus et gérez les relances
                  </p>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700">
                    Générer un rapport
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolDashboard