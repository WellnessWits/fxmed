'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

interface FormData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    age: string
    gender: string
  }
  healthConcerns: {
    primaryConcern: string
    symptoms: string[]
    duration: string
    severity: string
  }
  lifestyle: {
    diet: string
    exercise: string
    sleep: string
    stress: string
  }
  medicalHistory: {
    medications: string
    supplements: string
    conditions: string
    surgeries: string
  }
  goals: {
    primaryGoal: string
    timeline: string
    expectations: string
  }
}

export default function FunctionalHealthAnalysis() {
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: '',
      gender: ''
    },
    healthConcerns: {
      primaryConcern: '',
      symptoms: [],
      duration: '',
      severity: ''
    },
    lifestyle: {
      diet: '',
      exercise: '',
      sleep: '',
      stress: ''
    },
    medicalHistory: {
      medications: '',
      supplements: '',
      conditions: '',
      surgeries: ''
    },
    goals: {
      primaryGoal: '',
      timeline: '',
      expectations: ''
    }
  })

  const sections = [
    { id: 'personal', title: 'Personal Information', description: 'Tell us about yourself' },
    { id: 'concerns', title: 'Health Concerns', description: 'What brings you to us today?' },
    { id: 'lifestyle', title: 'Lifestyle', description: 'Your daily habits and routines' },
    { id: 'history', title: 'Medical History', description: 'Your health background' },
    { id: 'goals', title: 'Health Goals', description: 'What do you want to achieve?' }
  ]

  const symptoms = [
    'Fatigue/Low Energy', 'Digestive Issues', 'Hormonal Imbalance', 'Thyroid Issues',
    'Weight Management', 'Sleep Problems', 'Stress/Anxiety', 'Brain Fog',
    'Hair Loss', 'Skin Issues', 'Joint Pain', 'Headaches/Migraines'
  ]

  const handleInputChange = (section: keyof FormData, field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      healthConcerns: {
        ...prev.healthConcerns,
        symptoms: prev.healthConcerns.symptoms.includes(symptom)
          ? prev.healthConcerns.symptoms.filter(s => s !== symptom)
          : [...prev.healthConcerns.symptoms, symptom]
      }
    }))
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save form data to localStorage for the results page
    localStorage.setItem('healthAnalysisData', JSON.stringify(formData))
    // Redirect to results page
    window.location.href = '/functional-health-analysis/results'
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0: // Personal Information
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={formData.personalInfo.age}
                  onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Gender</label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 1: // Health Concerns
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Primary Health Concern</label>
              <textarea
                value={formData.healthConcerns.primaryConcern}
                onChange={(e) => handleInputChange('healthConcerns', 'primaryConcern', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="Please describe your main health concern..."
                required
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Symptoms (select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {symptoms.map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.healthConcerns.symptoms.includes(symptom)}
                      onChange={() => handleSymptomToggle(symptom)}
                      className="w-4 h-4 text-gold border-cream/30 rounded focus:ring-gold"
                    />
                    <span className="text-sm text-green-deep">{symptom}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Duration of Symptoms</label>
                <select
                  value={formData.healthConcerns.duration}
                  onChange={(e) => handleInputChange('healthConcerns', 'duration', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="few-weeks">A few weeks</option>
                  <option value="few-months">A few months</option>
                  <option value="year">1-2 years</option>
                  <option value="several-years">Several years</option>
                  <option value="chronic">Chronic (5+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-green-deep font-dm-sans font-semibold mb-2">Severity (1-10)</label>
                <select
                  value={formData.healthConcerns.severity}
                  onChange={(e) => handleInputChange('healthConcerns', 'severity', e.target.value)}
                  className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                  required
                >
                  <option value="">Select severity</option>
                  <option value="1-2">1-2 (Mild)</option>
                  <option value="3-4">3-4 (Moderate)</option>
                  <option value="5-6">5-6 (Significant)</option>
                  <option value="7-8">7-8 (Severe)</option>
                  <option value="9-10">9-10 (Very Severe)</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 2: // Lifestyle
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Diet & Nutrition</label>
              <textarea
                value={formData.lifestyle.diet}
                onChange={(e) => handleInputChange('lifestyle', 'diet', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="Describe your typical diet, any restrictions, supplements, etc..."
                required
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Exercise & Physical Activity</label>
              <textarea
                value={formData.lifestyle.exercise}
                onChange={(e) => handleInputChange('lifestyle', 'exercise', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="Describe your exercise routine and activity level..."
                required
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Sleep Patterns</label>
              <textarea
                value={formData.lifestyle.sleep}
                onChange={(e) => handleInputChange('lifestyle', 'sleep', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="Describe your sleep quality, duration, any issues..."
                required
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Stress Levels</label>
              <textarea
                value={formData.lifestyle.stress}
                onChange={(e) => handleInputChange('lifestyle', 'stress', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="Describe your stress levels and sources of stress..."
                required
              />
            </div>
          </div>
        )

      case 3: // Medical History
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Current Medications</label>
              <textarea
                value={formData.medicalHistory.medications}
                onChange={(e) => handleInputChange('medicalHistory', 'medications', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="List any current medications (including dosage)..."
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Supplements & Vitamins</label>
              <textarea
                value={formData.medicalHistory.supplements}
                onChange={(e) => handleInputChange('medicalHistory', 'supplements', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="List any supplements, vitamins, or herbal remedies..."
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Medical Conditions</label>
              <textarea
                value={formData.medicalHistory.conditions}
                onChange={(e) => handleInputChange('medicalHistory', 'conditions', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="List any diagnosed medical conditions..."
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Previous Surgeries</label>
              <textarea
                value={formData.medicalHistory.surgeries}
                onChange={(e) => handleInputChange('medicalHistory', 'surgeries', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="List any previous surgeries with dates..."
              />
            </div>
          </div>
        )

      case 4: // Goals
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Primary Health Goal</label>
              <textarea
                value={formData.goals.primaryGoal}
                onChange={(e) => handleInputChange('goals', 'primaryGoal', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="What is your main health goal you want to achieve?"
                required
              />
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Timeline</label>
              <select
                value={formData.goals.timeline}
                onChange={(e) => handleInputChange('goals', 'timeline', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                required
              >
                <option value="">Select timeline</option>
                <option value="1-month">1 month</option>
                <option value="3-months">3 months</option>
                <option value="6-months">6 months</option>
                <option value="1-year">1 year</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div>
              <label className="block text-green-deep font-dm-sans font-semibold mb-2">Expectations</label>
              <textarea
                value={formData.goals.expectations}
                onChange={(e) => handleInputChange('goals', 'expectations', e.target.value)}
                className="w-full px-4 py-3 border border-cream/30 rounded-lg focus:outline-none focus:border-gold"
                rows={3}
                placeholder="What do you expect from our functional medicine program?"
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      
      <div className="pt-[100px] pb-[90px] px-[5%]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
              Smart Intake Form
            </div>
            <h1 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              Functional Health Analysis
            </h1>
            <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] max-w-[600px] mx-auto">
              This comprehensive form helps us understand your unique health situation and create a personalized wellness plan just for you.
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {sections.map((section, index) => (
                <div key={section.id} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-dm-sans font-semibold ${
                    index < currentSection 
                      ? 'bg-green-light text-white' 
                      : index === currentSection 
                      ? 'bg-gold text-green-deep' 
                      : 'bg-cream/50 text-green-deep/50'
                  }`}>
                    {index < currentSection ? '✓' : index + 1}
                  </div>
                  {index < sections.length - 1 && (
                    <div className={`w-full h-1 mx-2 ${
                      index < currentSection ? 'bg-green-light' : 'bg-cream/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="text-center">
              <h2 className="font-dm-sans font-bold text-green-deep text-xl mb-1">
                {sections[currentSection].title}
              </h2>
              <p className="font-dm-sans text-green-deep/70 text-sm">
                {sections[currentSection].description}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-[24px] border border-green-mid/20 p-8">
            {renderSection()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-cream/30">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentSection === 0}
                className="bg-transparent text-green-deep border border-green-deep/30 px-8 py-3 rounded-[30px] font-semibold text-[0.95rem] font-dm-sans transition-all hover:border-green-deep hover:bg-green-deep/8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Back
              </button>
              
              <span className="font-dm-sans text-green-deep/60 text-[0.85rem]">
                Step {currentSection + 1} of {sections.length}
              </span>
              
              {currentSection === sections.length - 1 ? (
                <button
                  type="submit"
                  className="bg-gold text-green-deep px-8 py-3 rounded-[30px] font-semibold text-[0.95rem] font-dm-sans transition-all hover:bg-gold-light"
                >
                  Submit Form
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-gold text-green-deep px-8 py-3 rounded-[30px] font-semibold text-[0.95rem] font-dm-sans transition-all hover:bg-gold-light"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
