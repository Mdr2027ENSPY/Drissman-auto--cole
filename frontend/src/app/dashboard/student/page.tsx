'use client'

import { useState, useEffect } from 'react'
import {
  User, Calendar, Car, CreditCard, BookOpen,
  Star, Clock, CheckCircle, AlertCircle, Download,
  Search, Filter, ChevronRight, Settings, Bell
} from 'lucide-react'

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) setUser(JSON.parse(saved))
  }, [])

  // Données mock
  const studentData = {
    name: user?.name || 'Étudiant',
    progress: 65,
    hoursCompleted: 15,
    totalHours: 20,
    nextLesson: '2024-02-15 14:00',
    school: 'Auto-École Excellence Yaoundé',
    licenseType: 'Permis B',
    remainingBalance: 125000,
    recentBookings: [
      { id: 1, date: '2024-02-10', time: '10:00', instructor: 'M. Kamga', status: 'completed' },
      { id: 2, date: '2024-02-12', time: '14:30', instructor: 'Mme. Ngo', status: 'completed' },
      { id: 3, date: '2024-02-15', time: '14:00', instructor: 'M. Kamga', status: 'upcoming' },
      { id: 4, date: '2024-02-17', time: '09:00', instructor: 'Mme. Ngo', status: 'scheduled' },
    ],
    payments: [
      { id: 1, date: '2024-01-15', amount: 100000, method: 'MTN MoMo', status: 'paid' },
      { id: 2, date: '2024-02-01', amount: 75000, method: 'Orange Money', status: 'paid' },
      { id: 3, date: '2024-02-15', amount: 125000, method: 'Espèces', status: 'pending' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Bonjour, {studentData.name} 👋</h1>
                <p className="text-gray-600">Élève - {studentData.licenseType}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
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
                  { id: 'overview', label: 'Vue d\'ensemble', icon: User },
                  { id: 'bookings', label: 'Mes réservations', icon: Calendar },
                  { id: 'progress', label: 'Ma progression', icon: BookOpen },
                  { id: 'payments', label: 'Paiements', icon: CreditCard },
                  { id: 'documents', label: 'Documents', icon: Download },
                  { id: 'school', label: 'Mon auto-école', icon: Car },
                  { id: 'reviews', label: 'Mes avis', icon: Star },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center w-full p-3 rounded-lg transition-all ${activeTab === item.id
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

            {/* Info auto-école */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold mb-4 flex items-center">
                <Car className="h-5 w-5 mr-2" />
                Mon auto-école
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Nom:</span>
                  <span className="font-semibold">{studentData.school}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Type permis:</span>
                  <span className="font-semibold">{studentData.licenseType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Heures:</span>
                  <span className="font-semibold">{studentData.hoursCompleted}/{studentData.totalHours}h</span>
                </div>
                <button className="w-full mt-4 text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-50">
                  Contacter mon auto-école
                </button>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:w-3/4">
            {activeTab === 'overview' && (
              <div>
                {/* Progression */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Ma progression</h2>
                    <div className="text-3xl font-bold text-blue-600">{studentData.progress}%</div>
                  </div>

                  <div className="mb-6">
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                        style={{ width: `${studentData.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Début</span>
                      <span>Examen théorique</span>
                      <span>Examen pratique</span>
                      <span>Permis obtenu</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-bold">Prochaine leçon</span>
                      </div>
                      <div className="text-lg font-bold">{studentData.nextLesson}</div>
                      <div className="text-gray-600">Avec M. Kamga</div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-bold">Heures effectuées</span>
                      </div>
                      <div className="text-lg font-bold">{studentData.hoursCompleted}h/{studentData.totalHours}h</div>
                      <div className="text-gray-600">Code: ✓ | Conduite: {studentData.hoursCompleted}h</div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <CreditCard className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-bold">Solde restant</span>
                      </div>
                      <div className="text-lg font-bold">{studentData.remainingBalance.toLocaleString()} FCFA</div>
                      <button className="text-purple-600 text-sm font-semibold mt-2">
                        Payer maintenant →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Prochaines réservations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Prochaines réservations
                    </h3>
                    <div className="space-y-4">
                      {studentData.recentBookings
                        .filter(b => b.status === 'upcoming' || b.status === 'scheduled')
                        .map(booking => (
                          <div key={booking.id} className="border-l-4 border-blue-500 pl-4 py-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bold">Leçon de conduite</div>
                                <div className="text-gray-600">{booking.date} à {booking.time}</div>
                                <div className="text-sm text-gray-500">Moniteur: {booking.instructor}</div>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-sm ${booking.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                {booking.status === 'upcoming' ? 'À venir' : 'Programmée'}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 text-center text-blue-600 font-semibold py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Voir toutes les réservations
                    </button>
                  </div>

                  {/* Paiements récents */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Paiements récents
                    </h3>
                    <div className="space-y-4">
                      {studentData.payments.map(payment => (
                        <div key={payment.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <div className="font-bold">{payment.date}</div>
                            <div className="text-sm text-gray-600">{payment.method}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{payment.amount.toLocaleString()} FCFA</div>
                            <div className={`text-sm ${payment.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                              {payment.status === 'paid' ? 'Payé' : 'En attente'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 text-center text-blue-600 font-semibold py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Voir tous les paiements
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-6">Actions rapides</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                      <span>Réserver une leçon</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <CreditCard className="h-8 w-8 text-green-600 mb-2" />
                      <span>Effectuer un paiement</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
                      <span>Réviser le code</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <Star className="h-8 w-8 text-yellow-600 mb-2" />
                      <span>Noter mon auto-école</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Mes réservations</h2>
                {/* Contenu des réservations */}
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Gestion des réservations</h3>
                  <p className="text-gray-600 mb-6">
                    Gérez vos leçons de conduite et vos créneaux horaires
                  </p>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                    Réserver une nouvelle leçon
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Mes paiements</h2>
                {/* Contenu des paiements */}
                <div className="text-center py-12">
                  <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Historique des paiements</h3>
                  <p className="text-gray-600 mb-6">
                    Consultez vos transactions et téléchargez vos reçus
                  </p>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
                    Effectuer un paiement
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

export default StudentDashboard