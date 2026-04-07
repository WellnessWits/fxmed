'use client'

import { useState } from 'react'

export default function Pricing() {
  const [activeTab, setActiveTab] = useState('concierge')

  return (
    <>
      <section id="pricing" className="bg-cream py-[100px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-semibold tracking-[0.14em] uppercase mb-4">
            Pricing
          </div>
          <h2 className="font-dm-sans font-extrabold text-green-deep text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.15] mb-4">
            Flexible plans for<br/>every health journey
          </h2>
          <p className="font-dm-sans text-text-mid text-[1.1rem] leading-[1.7] max-w-[600px] mx-auto">
            Choose from subscription packages or à la carte services. Transparent pricing, no surprise bills.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white rounded-[50px] p-1 shadow-sm">
            <button 
              onClick={() => setActiveTab('concierge')}
              className={`font-dm-sans px-6 py-3 rounded-[50px] text-[1rem] font-medium transition-all ${
                activeTab === 'concierge' 
                  ? 'bg-gold text-green-deep' 
                  : 'text-green-deep hover:bg-green-deep/10'
              }`}
            >
              Concierge Packages
            </button>
            <button 
              onClick={() => setActiveTab('pregnancy')}
              className={`font-dm-sans px-6 py-3 rounded-[50px] text-[1rem] font-medium transition-all ${
                activeTab === 'pregnancy' 
                  ? 'bg-gold text-green-deep' 
                  : 'text-green-deep hover:bg-green-deep/10'
              }`}
            >
              Pregnancy Wellness
            </button>
            <button 
              onClick={() => setActiveTab('corporate')}
              className={`font-dm-sans px-6 py-3 rounded-[50px] text-[1rem] font-medium transition-all ${
                activeTab === 'corporate' 
                  ? 'bg-gold text-green-deep' 
                  : 'text-green-deep hover:bg-green-deep/10'
              }`}
            >
              Corporate / Outreach
            </button>
          </div>
        </div>

        {/* Concierge Packages Content */}
        {activeTab === 'concierge' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Standard Plan */}
            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <div className="mb-6">
                <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Standard</h3>
                <div className="mb-4">
                  <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦65,000</span>
                </div>
                <div className="mb-4">
                  <span className="font-dm-sans text-text-mid text-[0.9rem]">per month</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Quarterly house call / visit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">2 tele-consults per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Open-slot booking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Personalized care plan</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-green-deep text-cream px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-green-mid hover:transform hover:translate-y-[-2px]">
                Get Started
              </a>
            </div>

            {/* Gold Plan - Most Popular */}
            <div className="bg-white rounded-[24px] p-8 border-2 border-gold shadow-custom-hover relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-green-deep px-4 py-1 rounded-full text-[0.75rem] font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-6 mt-2">
                <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Gold</h3>
                <div className="mb-4">
                  <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦450,000</span>
                </div>
                <div className="mb-4">
                  <span className="font-dm-sans text-text-mid text-[0.9rem]">per month · up to 3 family members</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Monthly house call (vitals + physical)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">4 tele-consults per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Basic labs (CBC, Lipid, KFT, LFT, HbA1c)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">1 massage or premium facial</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">1 IV therapy infusion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Priority booking · 10% off add-ons</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px]">
                Get Started
              </a>
            </div>

            {/* Platinum Plan */}
            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <div className="mb-6">
                <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Platinum</h3>
                <div className="mb-4">
                  <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦700,000</span>
                </div>
                <div className="mb-4">
                  <span className="font-dm-sans text-text-mid text-[0.9rem]">per month · up to 5 family members</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Monthly house call</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">6 tele-consults per month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Comprehensive labs + ECG + Ultrasound</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">2 massage sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">2 IV drip therapy sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Priority specialist access · 15% off</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-green-deep text-cream px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-green-mid hover:transform hover:translate-y-[-2px]">
                Get Started
              </a>
            </div>
          </div>
        )}

        {/* Pregnancy Wellness Content */}
        {activeTab === 'pregnancy' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Pre-Conception</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦295,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">3-month program</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">GP home visit + consultation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Full blood count + hormonal screen</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">HIV, Hepatitis B, Blood Group & Genotype</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">4-week personalized meal plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Aromatherapy massage</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Enquire Now
              </a>
            </div>

            <div className="bg-white rounded-[24px] p-8 border-2 border-gold shadow-custom-hover relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-green-deep px-4 py-1 rounded-full text-[0.75rem] font-semibold">
                  Full Care
                </span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-6">Ante-Natal</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦740,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">per trimester</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Monthly home visits + 24/7 care support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Full labs + Thyroid + Ultrasound</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Labor room concierge support</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Dietetic consultation + prenatal vitamins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">IV vitality therapy + Shiatsu massage</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Enquire Now
              </a>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Post-Natal</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦395,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">recovery program</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">GP home visit + postpartum assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Mental health & newborn screening</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Lactation support + nutrition reset</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Deep-cleansing facial + microdermabrasion</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">IV recovery therapy + deep-tissue massage</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Enquire Now
              </a>
            </div>
          </div>
        )}

        {/* Corporate / Outreach Content */}
        {activeTab === 'corporate' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Executive Core</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦60,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">per person + ₦350,000 base fee</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Vitals & risk screening (BP, BMI)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">GP consult + BMP (CBC, Lipid, KFT)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Brief counselling & care plan</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Return-to-work notes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">10–15 staff/hour throughput</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Request Quote
              </a>
            </div>

            <div className="bg-white rounded-[24px] p-8 border-2 border-gold shadow-custom-hover relative transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gold text-green-deep px-4 -py-1 rounded-full text-[0.75rem] font-semibold">
                  Best Value
                </span>
              </div>
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-6">Executive Plus</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦84,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">per person + ₦350,000 base fee</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Everything in Executive Core</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Resting ECG</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Fasting blood sugar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Best for hypertension & diabetes risk</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">8–12 staff/hour throughput</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Request Quote
              </a>
            </div>

            <div className="bg-white rounded-[24px] p-8 border border-green-deep/10 shadow-custom hover:shadow-custom-hover transition-all">
              <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2">Executive Complete</h3>
              <div className="flex items-baseline mb-2">
                <span className="font-dm-sans font-bold text-green-deep text-[3rem]">₦135,000</span>
              </div>
              <p className="font-dm-sans text-text-mid text-[0.9rem] mb-6">per person + ₦350,000 base fee</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Everything in Executive Plus</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">PSA (men 45+) or Pelvic Ultrasound</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Dedicated PA/NP or 2nd GP</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">Ideal for leadership teams</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-mid mr-3 mt-1">✓</span>
                  <span className="font-dm-sans text-text-mid text-[0.95rem]">6–10 staff/hour throughput</span>
                </li>
              </ul>
              
              <a href="#contact" className="w-full block text-center bg-gold text-green-deep px-6 py-3 rounded-[30px] font-semibold text-[0.95rem] no-underline transition-all hover:bg-gold-light">
                Request Quote
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
    </>
  )
}
