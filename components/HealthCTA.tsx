'use client'

import { useState } from 'react'
import AppointmentModal from '@/components/AppointmentModal'

export default function HealthCTA() {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  return (
    <section id="health-cta" className="bg-green-deep py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block text-gold bg-gold/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-6">
          Ready to transform your health?
        </div>
        
        {/* Heading */}
        <h2 className="font-dm-sans font-bold text-white text-[clamp(2.5rem,5vw,4rem)] leading-[1.15] mb-6">
          Take the first step toward a life free from chronic illness, fatigue, and guesswork.
        </h2>
        
        {/* Description */}
        <p className="font-dm-sans text-cream/90 text-[1.2rem] leading-[1.7] max-w-[600px] mx-auto mb-12">
          Our team is ready to build your personalized wellness plan.
        </p>
        
        {/* CTA Button */}
        <button 
          onClick={() => setShowAppointmentModal(true)}
          className="font-dm-sans bg-gold text-green-deep px-10 py-5 rounded-[50px] font-semibold text-[1.1rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg inline-block"
        >
          Book Your Appointment Today →
        </button>
      </div>

      {showAppointmentModal && (
        <AppointmentModal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} />
      )}
    </section>
  )
}
