'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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

export default function FunctionalHealthInvestigations() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState<FormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'complete' | 'bring-own'>('complete')

  useEffect(() => {
    // In a real app, you would fetch this data from your backend
    // For now, we'll simulate the data based on URL params
    const formDataParam = searchParams.get('data')
    if (formDataParam) {
      try {
        setFormData(JSON.parse(atob(formDataParam)))
      } catch (error) {
        console.error('Error parsing form data:', error)
      }
    }
    setIsLoading(false)
  }, [searchParams])

  const investigations = [
    {
      category: "Complete Blood Count (CBC)",
      description: "Comprehensive blood analysis to assess overall health, detect infections, anemia, and immune system status",
      importance: "Essential",
      price: 6300
    },
    {
      category: "Comprehensive Metabolic Panel (CMP)",
      description: "Evaluates kidney function, liver function, blood sugar levels, and electrolyte balance for metabolic health assessment",
      importance: "Essential",
      price: 45000
    },
    {
      category: "Lipid Profile (Total Cholesterol, LDL, HDL, Triglycerides)",
      description: "Complete cholesterol analysis including HDL, LDL, and triglycerides to assess cardiovascular risk and metabolic function",
      importance: "Essential",
      price: 20500
    },
    {
      category: "Thyroid (TSH, free T3, free T4)",
      description: "Comprehensive thyroid evaluation to assess metabolic rate, energy production, and hormonal balance",
      importance: "Essential",
      price: 35000
    },
    {
      category: "HbA1c (Glycated Hemoglobin)",
      description: "Measures average blood sugar levels over 2-3 months to assess glucose control and metabolic health",
      importance: "Essential",
      price: 25000
    },
    {
      category: "High Sensitivity CRP",
      description: "Detects low levels of inflammation that may indicate chronic disease risk and cardiovascular issues",
      importance: "Essential",
      price: 21000
    },
    {
      category: "Vitamin D (25-OH Vitamin D)",
      description: "Measures vitamin D status critical for immune function, bone health, hormone balance, and disease prevention",
      importance: "Essential",
      price: 80000
    },
    {
      category: "ESR (Erythrocyte Sedimentation Rate)",
      description: "Measures the rate at which red blood cells settle in a test tube, indicating inflammation levels in the body",
      importance: "Essential",
      price: 6000
    },
  ]

  const essentialTests = investigations

  // Calculate total price for Complete Health Package
  const labTestsTotal = investigations.reduce((sum, test) => sum + (test.price || 0), 0)
  const functionalAnalysisPrice = 235000
  const logisticsFee = 20000
  const totalPrice = labTestsTotal + functionalAnalysisPrice + logisticsFee

  const handlePayment = () => {
    // Redirect to payment page or payment gateway
    const paymentUrl = "https://paystack.shop/pay/fxmed"
    window.open(paymentUrl, '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCFFF0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-deep mx-auto mb-4"></div>
          <p className="font-dm-sans text-green-deep">Loading your personalized investigations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FCFFF0]">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-[5%] py-40">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-6">
            Health Investigations
          </div>
          <h1 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-6">
            Required Investigations for Analysis
          </h1>
          <p className="font-dm-sans text-text-mid text-[1.1rem] leading-[1.7] max-w-3xl mx-auto">
            Please complete the following lab tests to provide deep insights into your health status and help us create your personalized wellness plan.
            <br /><br />
            As we proceed, you may be required to do some more investigations depending on the results of these.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-[50px] p-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('complete')}
              className={`font-dm-sans px-6 py-3 rounded-[50px] text-[1rem] font-medium transition-all ${
                activeTab === 'complete' 
                  ? 'bg-gold text-green-deep' 
                  : 'text-green-deep hover:bg-green-deep/10'
              }`}
            >
              Complete Health Package
            </button>
            <button 
              onClick={() => setActiveTab('bring-own')}
              className={`font-dm-sans px-6 py-3 rounded-[50px] text-[1rem] font-medium transition-all ${
                activeTab === 'bring-own' 
                  ? 'bg-gold text-green-deep' 
                  : 'text-green-deep hover:bg-green-deep/10'
              }`}
            >
              Bring My Own Results
            </button>
          </div>
        </div>

        {/* Price Display for Complete Health Package */}
        {activeTab === 'complete' && (
          <div className="bg-gradient-to-br from-green-deep to-green-mid rounded-[24px] p-8 text-white mb-8">
            <div className="text-center">
              <h2 className="font-dm-sans font-bold text-2xl mb-4">Complete Health Package</h2>
              <p className="font-dm-sans text-white/90 text-[1.1rem] mb-6">
                All recommended tests for comprehensive health analysis
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <div className="text-center">
                  <span className="font-dm-sans text-xl text-white/90">Complete Functional Health Analysis Package</span>
                  <div className="font-dm-sans font-bold text-3xl mt-2">NGN {totalPrice.toLocaleString()}</div>
                </div>
              </div>

              <p className="font-dm-sans text-white/80 text-sm">
                Includes all 8 essential laboratory investigations ({labTestsTotal.toLocaleString()} NGN) + Functional Health Analysis ({functionalAnalysisPrice.toLocaleString()} NGN) + Logistics Fee ({logisticsFee.toLocaleString()} NGN)
              </p>
            </div>
          </div>
        )}

        {/* Price Display for Bring My Own Results */}
        {activeTab === 'bring-own' && (
          <div className="bg-gradient-to-br from-green-deep to-green-mid rounded-[24px] p-8 text-white mb-8">
            <div className="text-center">
              <h2 className="font-dm-sans font-bold text-2xl mb-4">Bring Your Own Results</h2>
              <p className="font-dm-sans text-white/90 text-[1.1rem] mb-6">
                Functional health analysis of your existing lab results
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
                <div className="text-center">
                  <span className="font-dm-sans text-xl text-white/90">Functional Health Analysis Only</span>
                  <div className="font-dm-sans font-bold text-3xl mt-2">NGN {functionalAnalysisPrice.toLocaleString()}</div>
                </div>
              </div>

              <p className="font-dm-sans text-white/80 text-sm">
                Analysis and interpretation of your existing laboratory test results
              </p>
            </div>
          </div>
        )}

        {/* Patient Information */}
        {formData && (
          <div className="bg-white rounded-[24px] p-8 shadow-lg mb-8">
            <h2 className="font-dm-sans font-bold text-green-deep text-xl mb-4">Patient Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-gray-600">Name:</span>
                <span className="ml-2 font-medium">{formData.personalInfo.firstName} {formData.personalInfo.lastName}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium">{formData.personalInfo.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium">{formData.personalInfo.phone}</span>
              </div>
              <div>
                <span className="text-gray-600">Age:</span>
                <span className="ml-2 font-medium">{formData.personalInfo.age} years</span>
              </div>
            </div>
          </div>
        )}

        {/* Essential Tests */}
        <div className="bg-white rounded-[24px] p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-dm-sans font-bold text-green-deep text-xl">Core Functional Medicine Panel</h2>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">Required</span>
          </div>
          <div className="space-y-4">
            {essentialTests.map((test, index) => (
              <div key={index} className="border-l-4 border-red-500 bg-red-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-2">{test.category}</h3>
                    <p className="font-dm-sans text-text-mid text-sm leading-[1.6]">{test.description}</p>
                  </div>
                  {test.price && activeTab === 'complete' && (
                    <div className="ml-4 text-right">
                      <span className="font-dm-sans font-bold text-green-deep text-lg">
                        ₦{test.price.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Investigation Form - Only for Bring My Own Results */}
        {activeTab === 'bring-own' && (
          <div className="bg-white rounded-[24px] p-8 shadow-lg mb-8 text-center">
            <h3 className="font-dm-sans font-semibold text-green-deep text-lg mb-4">
              Need to take these tests to a lab?
            </h3>
            <p className="font-dm-sans text-text-mid text-sm mb-6 max-w-lg mx-auto">
              Download the investigation form to present at your preferred laboratory or bring to your FXMed appointment.
            </p>
          <button
            onClick={() => {
              // Create styled HTML content for PDF
              const printWindow = window.open('', '_blank');
              if (printWindow) {
                printWindow.document.write(`
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <title>FXMed Investigation Form</title>
                    <style>
                      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
                      
                      * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                      }
                      
                      body {
                        font-family: 'DM Sans', sans-serif;
                        background: linear-gradient(135deg, #0F2419 0%, #1A3D2E 100%);
                        color: #333;
                        padding: 40px 20px;
                        min-height: 100vh;
                      }
                      
                      .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 24px;
                        padding: 48px;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                      }
                      
                      .header {
                        text-align: center;
                        margin-bottom: 40px;
                        padding-bottom: 30px;
                        border-bottom: 2px solid #CADE68;
                      }
                      
                      .logo {
                        font-size: 28px;
                        font-weight: 700;
                        color: #0F2419;
                        margin-bottom: 8px;
                      }
                      
                      .subtitle {
                        font-size: 12px;
                        font-weight: 600;
                        color: #6B8E23;
                        text-transform: uppercase;
                        letter-spacing: 0.14em;
                        background: rgba(107, 142, 35, 0.1);
                        display: inline-block;
                        padding: 8px 16px;
                        border-radius: 20px;
                        margin-bottom: 16px;
                      }
                      
                      .title {
                        font-size: 32px;
                        font-weight: 700;
                        color: #0F2419;
                        margin-bottom: 8px;
                      }
                      
                      .form-type {
                        font-size: 14px;
                        color: #666;
                        font-weight: 500;
                      }
                      
                      .section {
                        margin-bottom: 32px;
                      }
                      
                      .section-title {
                        font-size: 18px;
                        font-weight: 700;
                        color: #0F2419;
                        margin-bottom: 16px;
                        padding-bottom: 8px;
                        border-bottom: 2px solid #e5e7eb;
                      }
                      
                      .patient-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 16px;
                      }
                      
                      .info-item {
                        margin-bottom: 12px;
                      }
                      
                      .info-label {
                        font-size: 12px;
                        font-weight: 600;
                        color: #6B7280;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-bottom: 4px;
                      }
                      
                      .info-value {
                        font-size: 16px;
                        font-weight: 600;
                        color: #0F2419;
                      }
                      
                      .tests-list {
                        list-style: none;
                      }
                      
                      .test-item {
                        background: #FEF2F2;
                        border-left: 4px solid #DC2626;
                        border-radius: 8px;
                        padding: 16px;
                        margin-bottom: 12px;
                      }
                      
                      .test-name {
                        font-size: 16px;
                        font-weight: 700;
                        color: #0F2419;
                        margin-bottom: 8px;
                      }
                      
                      .test-description {
                        font-size: 14px;
                        color: #4B5563;
                        line-height: 1.5;
                      }
                      
                      .required-badge {
                        display: inline-block;
                        background: #FEE2E2;
                        color: #DC2626;
                        font-size: 11px;
                        font-weight: 700;
                        padding: 4px 10px;
                        border-radius: 20px;
                        margin-bottom: 12px;
                        text-transform: uppercase;
                      }
                      
                      .total-section {
                        background: linear-gradient(135deg, #0F2419 0%, #1A3D2E 100%);
                        border-radius: 16px;
                        padding: 32px;
                        text-align: center;
                        color: white;
                        margin-top: 32px;
                      }
                      
                      .total-label {
                        font-size: 14px;
                        color: rgba(255, 255, 255, 0.8);
                        margin-bottom: 8px;
                      }
                      
                      .total-amount {
                        font-size: 40px;
                        font-weight: 700;
                        color: #CADE68;
                      }
                      
                      .footer {
                        margin-top: 40px;
                        padding-top: 24px;
                        border-top: 1px solid #e5e7eb;
                        text-align: center;
                      }
                      
                      .footer-title {
                        font-size: 14px;
                        font-weight: 700;
                        color: #0F2419;
                        margin-bottom: 12px;
                      }
                      
                      .footer-info {
                        font-size: 13px;
                        color: #6B7280;
                        line-height: 1.6;
                      }
                      
                      .generated-date {
                        margin-top: 24px;
                        font-size: 12px;
                        color: #9CA3AF;
                        font-style: italic;
                      }
                      
                      @media print {
                        body {
                          background: white;
                          padding: 0;
                        }
                        .container {
                          box-shadow: none;
                          max-width: 100%;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                        <div class="subtitle">Functional Health Analysis</div>
                        <div class="logo">FXMed</div>
                        <h1 class="title">Investigation Request Form</h1>
                        <p class="form-type">Core Functional Medicine Panel</p>
                      </div>
                      
                      <div class="section">
                        <h2 class="section-title">Patient Information</h2>
                        <div class="patient-grid">
                          <div class="info-item">
                            <div class="info-label">Full Name</div>
                            <div class="info-value">${formData?.personalInfo.firstName || ''} ${formData?.personalInfo.lastName || ''}</div>
                          </div>
                          <div class="info-item">
                            <div class="info-label">Email Address</div>
                            <div class="info-value">${formData?.personalInfo.email || ''}</div>
                          </div>
                          <div class="info-item">
                            <div class="info-label">Phone Number</div>
                            <div class="info-value">${formData?.personalInfo.phone || ''}</div>
                          </div>
                          <div class="info-item">
                            <div class="info-label">Age / Gender</div>
                            <div class="info-value">${formData?.personalInfo.age || ''} years / ${formData?.personalInfo.gender || ''}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="section">
                        <span class="required-badge">Required Tests</span>
                        <h2 class="section-title">Core Functional Medicine Panel</h2>
                        <ul class="tests-list">
                          <li class="test-item">
                            <div class="test-name">1. Complete Blood Count (CBC)</div>
                            <div class="test-description">Comprehensive blood analysis to assess overall health, detect infections, anemia, and immune system status</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">2. Comprehensive Metabolic Panel (CMP)</div>
                            <div class="test-description">Evaluates kidney function, liver function, blood sugar levels, and electrolyte balance for metabolic health assessment</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">3. Lipid Profile (Total Cholesterol, LDL, HDL, Triglycerides)</div>
                            <div class="test-description">Complete cholesterol analysis including HDL, LDL, and triglycerides to assess cardiovascular risk and metabolic function</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">4. Thyroid (TSH, free T3, free T4)</div>
                            <div class="test-description">Comprehensive thyroid evaluation to assess metabolic rate, energy production, and hormonal balance</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">5. HbA1c (Glycated Hemoglobin)</div>
                            <div class="test-description">Measures average blood sugar levels over 2-3 months to assess glucose control and metabolic health</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">6. High Sensitivity CRP</div>
                            <div class="test-description">Detects low levels of inflammation that may indicate chronic disease risk and cardiovascular issues</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">7. Vitamin D (25-OH Vitamin D)</div>
                            <div class="test-description">Measures vitamin D status critical for immune function, bone health, hormone balance, and disease prevention</div>
                          </li>
                          <li class="test-item">
                            <div class="test-name">8. ESR (Erythrocyte Sedimentation Rate)</div>
                            <div class="test-description">Measures the rate at which red blood cells settle in a test tube, indicating inflammation levels in the body</div>
                          </li>
                        </ul>
                      </div>
                      
                      <div class="total-section">
                        <div class="total-label">Complete Functional Health Analysis Package</div>
                        <div class="total-amount">₦235,000</div>
                      </div>
                      
                      <div class="footer">
                        <div class="footer-title">FXMed Functional Medicine</div>
                        <div class="footer-info">
                          For questions about this investigation form, please contact us:<br>
                          Phone: +234 XXX XXX XXXX | Email: info@fxmed.com<br>
                          Treating the root cause — not just the symptoms
                        </div>
                        <div class="generated-date">Generated on: ${new Date().toLocaleDateString()} | Confidential Medical Document</div>
                      </div>
                    </div>
                  </body>
                  </html>
                `);
                printWindow.document.close();
                
                // Wait for styles to load then print
                setTimeout(() => {
                  printWindow.print();
                }, 500);
              }
            }}
            className="inline-flex items-center gap-2 font-dm-sans bg-green-deep text-white px-6 py-3 rounded-[50px] font-semibold text-sm hover:bg-green-700 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Investigation Form
          </button>
        </div>
        )}

        {/* Summary and Payment */}
        <div className="bg-gradient-to-br from-green-deep to-green-mid rounded-[24px] p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="font-dm-sans font-bold text-2xl mb-4">Complete Health Investigation Package</h2>
            <p className="font-dm-sans text-white/90 text-[1.1rem] mb-6">
              All recommended tests for comprehensive health analysis
            </p>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <div className="text-center">
                <span className="font-dm-sans text-xl text-white/90">Complete Functional Health Analysis Package</span>
                <div className="font-dm-sans font-bold text-3xl mt-2">₦235,000</div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handlePayment}
                className="w-full font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-bold text-lg hover:bg-gold-light transition-all transform hover:scale-105 shadow-xl"
              >
                Make Payment
              </button>
              
              <div className="flex items-center justify-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Secure payment via Paystack</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
