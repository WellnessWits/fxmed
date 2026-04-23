'use client'

import { useState } from 'react'

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSubmitStatus('success')
      // Reset form after successful submission
      setFormData({ name: '', email: '', message: '' })
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({ name: '', email: '', message: '' })
    setSubmitStatus('idle')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[24px] max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-[24px]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-dm-sans font-bold text-green-deep text-[2rem] mb-2">
                Contact Us
              </h2>
              <p className="font-dm-sans text-text-mid text-[1.1rem] leading-[1.7]">
                We'd love to hear from you. Send us a message and we'll get back to you soon.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-dm-sans font-bold text-green-deep text-xl mb-2">
                Message Sent!
              </h3>
              <p className="font-dm-sans text-text-mid">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-dm-sans font-semibold text-green-deep mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-[12px] font-dm-sans focus:outline-none focus:ring-2 focus:ring-green-deep focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block font-dm-sans font-semibold text-green-deep mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-[12px] font-dm-sans focus:outline-none focus:ring-2 focus:ring-green-deep focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block font-dm-sans font-semibold text-green-deep mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-[12px] font-dm-sans focus:outline-none focus:ring-2 focus:ring-green-deep focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-[12px] p-4">
                  <p className="font-dm-sans text-red-600 text-sm">
                    Something went wrong. Please try again later.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-green-deep px-6 py-4 rounded-[50px] font-dm-sans font-semibold text-[1rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
