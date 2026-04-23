'use client'

import { useState } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  consultationType: 'telemedicine' | 'home-visit'
}

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredDate: string
  preferredTime: string
  symptoms: string
  consultationType: 'telemedicine' | 'home-visit'
}

export default function BookingModal({ isOpen, onClose, consultationType }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    symptoms: '',
    consultationType
  })

  if (!isOpen) return null

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the booking data to your backend
    console.log('Booking data:', bookingData)
    
    // Redirect to appropriate Paystack payment link based on consultation type
    const paymentLink = consultationType === 'telemedicine' 
      ? 'https://paystack.shop/pay/x1ui5e7uw3'
      : 'https://paystack.shop/pay/pxog7uys-t'
    
    window.open(paymentLink, '_blank')
    
    // Close the modal and reset form
    onClose()
    setCurrentStep(1)
    setBookingData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredDate: '',
      preferredTime: '',
      symptoms: '',
      consultationType
    })
  }

  const updateBookingData = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({ ...prev, [field]: value }))
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone
      case 2:
        return bookingData.preferredDate && bookingData.preferredTime
      case 3:
        return bookingData.symptoms
      default:
        return true
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-dm-sans font-bold text-green-deep text-[1.5rem]">
              Book {consultationType === 'telemedicine' ? 'Telemedicine' : 'Home Visit'} Consultation
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-green-mid text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-full h-1 mx-2 ${
                    step < currentStep ? 'bg-green-mid' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>Personal Info</span>
            <span>Schedule</span>
            <span>Symptoms</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-4">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.firstName}
                    onChange={(e) => updateBookingData('firstName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={bookingData.lastName}
                    onChange={(e) => updateBookingData('lastName', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => updateBookingData('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                  placeholder="john.doe@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => updateBookingData('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                  placeholder="+234 800 000 0000"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-4">
                Schedule Your Consultation
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date *
                </label>
                <input
                  type="date"
                  value={bookingData.preferredDate}
                  onChange={(e) => updateBookingData('preferredDate', e.target.value)}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Bookings must be made at least 24 hours in advance
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time *
                </label>
                <select
                  value={bookingData.preferredTime}
                  onChange={(e) => updateBookingData('preferredTime', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                >
                  <option value="">Select a time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                </select>
              </div>
              
              <div className="bg-green-deep/10 border border-green-mid/20 rounded-lg p-4">
                <p className="text-sm text-green-deep">
                  <strong>Consultation Type:</strong> {consultationType === 'telemedicine' ? 'Telemedicine' : 'Home Visit'}
                </p>
                <p className="text-sm text-green-deep mt-1">
                  <strong>Duration:</strong> 45 minutes
                </p>
                <p className="text-sm text-green-deep mt-1">
                  <strong>Price:</strong> ₦{consultationType === 'telemedicine' ? '25,000' : '85,000'}
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-4">
                Health Concerns
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Please describe your symptoms or health concerns *
                </label>
                <textarea
                  value={bookingData.symptoms}
                  onChange={(e) => updateBookingData('symptoms', e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-mid focus:border-transparent"
                  placeholder="Please describe your symptoms, how long you've been experiencing them, and any treatments you've tried..."
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This information helps our functional medicine experts prepare for your consultation and provide the most effective care.
                </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-4">
                Confirm Your Booking
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{bookingData.firstName} {bookingData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{bookingData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{bookingData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{bookingData.preferredDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{consultationType === 'telemedicine' ? 'Telemedicine' : 'Home Visit'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium text-green-deep">₦{consultationType === 'telemedicine' ? '25,000' : '85,000'}</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> After confirming your booking, you will be redirected to complete payment. We will send a confirmation email and WhatsApp message within 24 hours to confirm your appointment time.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-2 bg-green-mid text-white rounded-lg font-medium hover:bg-green-deep disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-gold text-green-deep rounded-lg font-semibold hover:bg-gold-light"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
