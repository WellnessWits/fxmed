'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function FunctionalHealthAnalysis() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-deep via-green-mid to-gold py-40 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-[url('/team-young-nurses-learning-practice-from-doctor-expert-cabinet.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-deep/80 via-green-mid/70 to-gold/60"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block bg-white/20 backdrop-blur px-4 py-2 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-6">
                Advanced Health Diagnostics
              </div>
              <h1 className="font-dm-sans font-bold text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-6">
                Discover Your Body's
                Hidden Health Patterns
              </h1>
              <p className="font-dm-sans text-[1.1rem] leading-[1.7] mb-8 text-white/90 max-w-[600px]">
                Our functional health analysis goes beyond symptoms to identify root causes, predict health risks, and create personalized wellness strategies tailored to your unique biology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/functional-health-analysis/form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-deep rounded-[50px] font-dm-sans font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  Request Analysis
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <button className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-[50px] font-dm-sans font-semibold text-lg hover:bg-white/10 transition-all">
                  Watch Demo
                </button>
              </div>
              
              <div className="mt-8 flex items-center gap-6 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5-Min Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur rounded-[24px] p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🧬</span>
                    </div>
                    <div>
                      <h3 className="font-dm-sans font-semibold text-white">Genetic Markers</h3>
                      <p className="text-sm text-white/70">Analyze your genetic predispositions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="font-dm-sans font-semibold text-white">Lab Analysis</h3>
                      <p className="text-sm text-white/70">Comprehensive blood work interpretation</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-dm-sans font-semibold text-white">Risk Assessment</h3>
                      <p className="text-sm text-white/70">Predict future health challenges</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💊</span>
                    </div>
                    <div>
                      <h3 className="font-dm-sans font-semibold text-white">Personalized Plan</h3>
                      <p className="text-sm text-white/70">Custom wellness strategies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Analyze Section */}
      <section className="py-20 px-[5%] bg-[#FCFFF0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
              Comprehensive Analysis
            </div>
            <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              We Analyze What Others Miss
            </h2>
            <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] max-w-[560px] mx-auto">
              Our advanced assessment evaluates multiple health systems to provide a complete picture of your wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-deep/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Cognitive Health</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6]">
                Brain function, memory, focus, and neurological patterns that impact daily performance.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-deep/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Heart & Metabolism</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6]">
                Cardiovascular health, metabolic efficiency, and energy production at cellular level.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-deep/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Hormonal Balance</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6]">
                Endocrine system function, hormone levels, and reproductive health optimization.
              </p>
            </div>

            <div className="bg-white rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-deep/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Immune Function</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6]">
                Immune system strength, inflammation markers, and disease resistance capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
              Simple Process
            </div>
            <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              Get Your Analysis in 3 Simple Steps
            </h2>
            <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] max-w-[560px] mx-auto">
              Our streamlined process makes it easy to get comprehensive health insights without overwhelming complexity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-green-deep">
                1
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Take Assessment</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6] mb-4">
                Answer our AI-powered questionnaire about your health concerns and lifestyle.
              </p>
              <div className="text-sm text-green-mid font-medium">5 minutes</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-green-deep">
                2
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Get Results</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6] mb-4">
                Receive instant personalized insights with risk levels and recommendations.
              </p>
              <div className="text-sm text-green-mid font-medium">Instant</div>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-green-deep">
                3
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-xl mb-3">Start Your Journey</h3>
              <p className="font-dm-sans text-text-mid leading-[1.6] mb-4">
                Book a consultation with our functional medicine experts to begin your personalized program.
              </p>
              <div className="text-sm text-green-mid font-medium">Optional</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/functional-health-analysis/form"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-deep text-white rounded-[16px] font-dm-sans font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl"
            >
              Request Analysis
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-[5%] bg-gradient-to-br from-green-deep/5 to-gold/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
                Why Choose FXMed
              </div>
              <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-6">
                Beyond Traditional Healthcare
              </h2>
              <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] mb-8">
                Unlike conventional medicine that treats symptoms, our functional health analysis identifies 
                root causes and creates personalized strategies for optimal wellness.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-gold rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep mb-2">Root Cause Analysis</h3>
                    <p className="font-dm-sans text-text-mid leading-[1.6]">
                      We identify underlying imbalances rather than just masking symptoms with medications.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-gold rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep mb-2">Personalized Protocols</h3>
                    <p className="font-dm-sans text-text-mid leading-[1.6]">
                      Your health plan is tailored to your unique biology, lifestyle, and health goals.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-gold rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep mb-2">Preventive Focus</h3>
                    <p className="font-dm-sans text-text-mid leading-[1.6]">
                      We predict and prevent health issues before they become chronic conditions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 bg-gold rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h3 className="font-dm-sans font-semibold text-green-deep mb-2">Scientific Approach</h3>
                    <p className="font-dm-sans text-text-mid leading-[1.6]">
                      Based on cutting-edge research and advanced diagnostic technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[24px] p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="font-dm-sans font-bold text-green-deep text-2xl mb-2">
                  Ready to Transform Your Health?
                </h3>
                <p className="font-dm-sans text-text-mid">
                  Join thousands who have discovered their path to optimal wellness
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-green-deep/5 rounded-lg">
                  <div className="text-3xl font-bold text-green-deep mb-1">10,000+</div>
                  <div className="text-sm text-text-mid">Analyses Completed</div>
                </div>
                <div className="text-center p-4 bg-gold/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-deep mb-1">95%</div>
                  <div className="text-sm text-text-mid">Success Rate</div>
                </div>
              </div>

              <Link 
                href="/functional-health-analysis/form"
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gold text-green-deep rounded-[12px] font-dm-sans font-bold hover:bg-gold-light transition-all"
              >
                Request Analysis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-[5%] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
              Success Stories
            </div>
            <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              Real Results, Real People
            </h2>
            <p className="font-dm-sans text-black text-[1.05rem] leading-[1.7] max-w-[560px] mx-auto">
              Discover how our functional health analysis has transformed lives across Nigeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FCFFF0] rounded-[20px] p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-mid rounded-full flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <h4 className="font-dm-sans font-semibold text-green-deep">Amara O.</h4>
                  <p className="text-sm text-text-mid">Lagos, 45 years</p>
                </div>
              </div>
              <p className="font-dm-sans text-text-mid leading-[1.6] italic">
                "The analysis revealed hormonal imbalances I never knew about. Three months later, 
                I feel like I'm in my twenties again!"
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-[#FCFFF0] rounded-[20px] p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-mid rounded-full flex items-center justify-center text-white font-bold mr-3">
                  C
                </div>
                <div>
                  <h4 className="font-dm-sans font-semibold text-green-deep">Chinedu A.</h4>
                  <p className="text-sm text-text-mid">Abuja, 38 years</p>
                </div>
              </div>
              <p className="font-dm-sans text-text-mid leading-[1.6] italic">
                "Finally understood why I was always tired. The personalized plan changed my life. 
                I have energy to play with my kids again!"
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-[#FCFFF0] rounded-[20px] p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-mid rounded-full flex items-center justify-center text-white font-bold mr-3">
                  F
                </div>
                <div>
                  <h4 className="font-dm-sans font-semibold text-green-deep">Funke L.</h4>
                  <p className="text-sm text-text-mid">Port Harcourt, 52 years</p>
                </div>
              </div>
              <p className="font-dm-sans text-text-mid leading-[1.6] italic">
                "The cancer screening assessment was eye-opening. Early detection saved my life. 
                Grateful for this technology."
              </p>
              <div className="flex mt-4">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-[5%] bg-gradient-to-br from-green-deep to-green-mid">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-dm-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-6">
            Your Health Journey Starts Here
          </h2>
          <p className="font-dm-sans text-[1.1rem] leading-[1.7] mb-8 text-white/90">
            Take the first step towards optimal health with our free, comprehensive functional health analysis. 
            No obligation, just insights that can transform your life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/functional-health-analysis/form"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-deep rounded-[16px] font-dm-sans font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Request Analysis
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a 
              href="tel:+2348123456789"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-[16px] font-dm-sans font-semibold text-lg hover:bg-white/10 transition-all"
            >
              Call Us: +234 812 345 6789
            </a>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Confidential & Secure</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
