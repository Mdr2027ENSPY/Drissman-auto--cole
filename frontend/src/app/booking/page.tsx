'use client'

import { useState } from 'react'
import { 
  Calendar, Clock, User, Car, CreditCard, 
  CheckCircle, ChevronLeft, ChevronRight, AlertCircle
} from 'lucide-react'

const BookingSystem = () => {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')

  // Données mock
  const schoolInfo = {
    name: 'Auto-École Excellence Yaoundé',
    address: 'Rue 1234, Quartier Bastos, Yaoundé',
    pricePerHour: 15000
  }

  const availableDates = [
    '2024-02-15',
    '2024-02-16', 
    '2024-02-17',
    '2024-02-19',
    '2024-02-20',
    '2024-02-21'
  ]

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00'
  ]

  const instructors = [
    { id: '1', name: 'M. Kamga', rating: 4.8, available: true },
    { id: '2', name: 'Mme. Ngo', rating: 4.9, available: true },
    { id: '3', name: 'M. Mbappe', rating: 4.7, available: false }
  ]

  const paymentMethods = [
    { id: 'mom', name: 'MTN MoMo', icon: '📱' },
    { id: 'om', name: 'Orange Money', icon: '🍊' },
    { id: 'cash', name: 'Espèces', icon: '💵' },
    { id: 'card', name: 'Carte bancaire', icon: '💳' }
  ]

  const handleSubmit = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Soumission finale
      console.log('Réservation confirmée:', {
        date: selectedDate,
        time: selectedTime,
        instructor: selectedInstructor,
        paymentMethod
      })
      // Ici, tu ferais l'appel API
    }
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="text-center">
            <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Choisissez une date</h2>
            <p className="text-gray-600 mb-8">
              Sélectionnez une date pour votre leçon de conduite
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {availableDates.map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-xl border-2 text-center ${selectedDate === date ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
                >
                  <div className="text-lg font-bold">
                    {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                  </div>
                  <div className="text-2xl font-bold my-2">
                    {new Date(date).getDate()}
                  </div>
                  <div className="text-gray-600">
                    {new Date(date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-3" />
                <p className="text-sm text-gray-700">
                  Les leçons durent 1 heure. Choisissez un créneau disponible.
                </p>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="text-center">
            <Clock className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Choisissez un horaire</h2>
            <p className="text-gray-600 mb-8">
              Sélectionnez un créneau horaire disponible
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {timeSlots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-4 rounded-xl border-2 ${selectedTime === time ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
                >
                  <div className="text-xl font-bold">{time}</div>
                  <div className="text-sm text-gray-600 mt-1">Disponible</div>
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span>Disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                <span>Indisponible</span>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="text-center">
            <User className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Choisissez votre moniteur</h2>
            <p className="text-gray-600 mb-8">
              Sélectionnez le moniteur avec lequel vous souhaitez conduire
            </p>
            
            <div className="space-y-4 mb-8">
              {instructors.map(instructor => (
                <button
                  key={instructor.id}
                  onClick={() => instructor.available && setSelectedInstructor(instructor.id)}
                  disabled={!instructor.available}
                  className={`w-full p-6 rounded-xl border-2 text-left ${selectedInstructor === instructor.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400'} ${!instructor.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-bold text-lg">{instructor.name}</div>
                        <div className="flex items-center text-gray-600">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-4 h-4 ${i < Math.floor(instructor.rating) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="ml-2">{instructor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      {instructor.available ? (
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          Disponible
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm">
                          Indisponible
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Vous pouvez changer de moniteur à tout moment avant le début de la leçon.
              </p>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center">
            <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Méthode de paiement</h2>
            <p className="text-gray-600 mb-8">
              Choisissez comment vous souhaitez payer
            </p>
            
            <div className="space-y-4 mb-8">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full p-6 rounded-xl border-2 text-left ${paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400'}`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{method.icon}</span>
                    <div className="font-bold text-lg">{method.name}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                Le paiement sera effectué après confirmation de la réservation.
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="text-center py-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Réservation confirmée !</h2>
            <p className="text-gray-600 mb-8">
              Votre leçon de conduite a été réservée avec succès
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-md mx-auto">
              <h3 className="font-bold mb-4 text-lg">Récapitulatif</h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Auto-école:</span>
                  <span className="font-bold">{schoolInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-bold">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horaire:</span>
                  <span className="font-bold">{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Moniteur:</span>
                  <span className="font-bold">
                    {instructors.find(i => i.id === selectedInstructor)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix:</span>
                  <span className="font-bold text-green-600">{schoolInfo.pricePerHour.toLocaleString()} FCFA</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 max-w-md mx-auto">
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700">
                Ajouter au calendrier
              </button>
              <button className="w-full border border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50">
                Retour au tableau de bord
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* En-tête avec étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => step > 1 && setStep(step - 1)}
              className={`flex items-center ${step > 1 ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 cursor-not-allowed'}`}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Retour
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold">Réservation</h1>
              <p className="text-gray-600">Auto-École Excellence Yaoundé</p>
            </div>
            
            <div className="w-20"></div> {/* Pour l'équilibrage */}
          </div>

          {/* Indicateur de progression */}
          <div className="mb-8">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                    {stepNum}
                  </div>
                  {stepNum < 5 && (
                    <div className={`w-16 h-1 ${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>Date</span>
              <span>Horaire</span>
              <span>Moniteur</span>
              <span>Paiement</span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Contenu de l'étape */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
          
          {/* Boutons de navigation (sauf pour la dernière étape) */}
          {step < 5 && (
            <div className="mt-8 pt-8 border-t">
              <button
                onClick={handleSubmit}
                disabled={!selectedDate || !selectedTime || !selectedInstructor || !paymentMethod}
                className={`w-full py-4 rounded-xl font-bold text-lg ${selectedDate && selectedTime && selectedInstructor && paymentMethod ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
              >
                {step < 4 ? 'Continuer' : 'Confirmer la réservation'}
                <ChevronRight className="h-5 w-5 inline ml-2" />
              </button>
              
              <p className="text-center text-gray-600 text-sm mt-4">
                Étape {step} sur 4
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookingSystem