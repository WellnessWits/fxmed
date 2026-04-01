'use client'

import { useState, useEffect } from 'react'
import BlogManagement from '@/components/admin/BlogManagement'
import CrmDashboard from '@/components/admin/CrmDashboard'
import SeoAnalytics from '@/components/admin/SeoAnalytics'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  thumbnail_url: string
  status: 'draft' | 'published'
  read_time: string
  created_at: string
  updated_at: string
}

type Stage = "Outreach" | "Enrollment" | "Onboarding" | "Follow-Up" | "Active"
type Risk = "High" | "Medium" | "Low"

type Patient = {
  id: string
  name: string
  age: number
  program: string
  risk: Risk
  stage: Stage
  source: string
  owner: string
  phone: string
  email: string
  lastTouch: string
  nextStep: string
  nextDate: string
  progress: number
  tags: string[]
  preferred: string
  appointment: string
  consentStatus: string
  documentCount: number
  reminderStatus: string
}

const patientsSeed: Patient[] = [
  {
    id: "FX001",
    name: "Amara Okafor",
    age: 52,
    program: "Cardiometabolic Care",
    risk: "High",
    stage: "Outreach",
    source: "Physician Referral",
    owner: "Tola",
    phone: "(713) 555-0189",
    email: "amara@sample.com",
    lastTouch: "Today",
    nextStep: "Call to discuss enrollment",
    nextDate: "Mar 24",
    progress: 15,
    tags: ["Hypertension", "Prediabetes"],
    preferred: "Phone",
    appointment: "Mar 24 • 10:30 AM",
    consentStatus: "Pending",
    documentCount: 2,
    reminderStatus: "Urgent",
  },
  {
    id: "FX002",
    name: "Chinedu Adeyemi",
    age: 46,
    program: "Executive Concierge",
    risk: "Medium",
    stage: "Enrollment",
    source: "Website Lead",
    owner: "Maya",
    phone: "(832) 555-0127",
    email: "chinedu@sample.com",
    lastTouch: "Yesterday",
    nextStep: "Send consent forms",
    nextDate: "Mar 25",
    progress: 35,
    tags: ["Busy executive", "Needs labs"],
    preferred: "Email",
    appointment: "Mar 25 • 1:00 PM",
    consentStatus: "Sent",
    documentCount: 4,
    reminderStatus: "Scheduled",
  },
  {
    id: "FX003",
    name: "Nneka Johnson",
    age: 39,
    program: "Weight & Metabolic Reset",
    risk: "Low",
    stage: "Onboarding",
    source: "Community Event",
    owner: "Tola",
    phone: "(281) 555-0110",
    email: "nneka@sample.com",
    lastTouch: "2 days ago",
    nextStep: "Complete intake questionnaire",
    nextDate: "Mar 26",
    progress: 60,
    tags: ["Postpartum", "Nutrition"],
    preferred: "Text",
    appointment: "Mar 26 • 11:15 AM",
    consentStatus: "Signed",
    documentCount: 6,
    reminderStatus: "Scheduled",
  },
  {
    id: "FX004",
    name: "Kemi Brown",
    age: 58,
    program: "Cardiometabolic Care",
    risk: "High",
    stage: "Follow-Up",
    source: "Hospital Partner",
    owner: "Ade",
    phone: "(346) 555-0141",
    email: "kemi@sample.com",
    lastTouch: "Today",
    nextStep: "Review BP logs and refill needs",
    nextDate: "Mar 24",
    progress: 85,
    tags: ["Diabetes", "RPM"],
    preferred: "Phone",
    appointment: "Mar 24 • 3:45 PM",
    consentStatus: "Signed",
    documentCount: 8,
    reminderStatus: "Sent",
  },
  {
    id: "FX005",
    name: "Tunde Ellis",
    age: 50,
    program: "Executive Concierge",
    risk: "Medium",
    stage: "Active",
    source: "Employer Partnership",
    owner: "Maya",
    phone: "(713) 555-0172",
    email: "tunde@sample.com",
    lastTouch: "3 days ago",
    nextStep: "Schedule quarterly check-in",
    nextDate: "Mar 29",
    progress: 100,
    tags: ["Travel-heavy", "Preventive"],
    preferred: "Email",
    appointment: "Mar 29 • 9:00 AM",
    consentStatus: "Signed",
    documentCount: 10,
    reminderStatus: "Scheduled",
  },
  {
    id: "FX006",
    name: "Folake Mensah",
    age: 61,
    program: "Weight & Metabolic Reset",
    risk: "High",
    stage: "Enrollment",
    source: "Past Patient Referral",
    owner: "Ade",
    phone: "(832) 555-0193",
    email: "folake@sample.com",
    lastTouch: "Yesterday",
    nextStep: "Verify insurance and payment option",
    nextDate: "Mar 24",
    progress: 40,
    tags: ["Obesity", "Sleep issues"],
    preferred: "Phone",
    appointment: "Mar 24 • 4:30 PM",
    consentStatus: "Sent",
    documentCount: 3,
    reminderStatus: "Urgent",
  },
]

export default function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'blog' | 'crm' | 'seo'>('blog')

  // CRM state
  const [patients, setPatients] = useState<Patient[]>(patientsSeed)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website Lead",
    program: "Cardiometabolic Care",
    owner: "Tola",
    risk: "Medium" as Risk,
    consent: false
  })

  // Fetch posts on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (!response.ok) throw new Error('Failed to fetch posts')

        const { posts: data } = await response.json()
        setPosts(data || [])
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // Fetch CRM patients on mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/crm')
        if (!response.ok) throw new Error('Failed to fetch patients')

        const { patients: data } = await response.json()
        setPatients(data || patientsSeed) // Fallback to seed data if API fails
      } catch (error) {
        console.error('Error fetching patients:', error)
        // Keep seed data as fallback
      }
    }

    fetchPatients()
  }, [])

  const createLead = async () => {
    if (!leadForm.name.trim()) return

    try {
      const response = await fetch('/api/crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone || null,
          email: leadForm.email || null,
          source: leadForm.source,
          program: leadForm.program,
          owner: leadForm.owner,
          risk: leadForm.risk,
          stage: "Outreach",
          last_touch: new Date().toISOString(),
          next_step: "Initial outreach and qualification",
          next_date: "Mar 24",
          progress: 10,
          tags: ["New lead"],
          preferred: leadForm.phone ? "Phone" : "Email",
          appointment: "Not scheduled",
          consent_status: leadForm.consent ? "Sent" : "Pending",
          document_count: 0,
          reminder_status: "Queued",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error:', errorData)
        throw new Error(errorData.error || 'Failed to create lead')
      }

      const { patient: newPatient } = await response.json()
      
      // Refresh patients list to get the new data from database
      const fetchResponse = await fetch('/api/crm')
      if (fetchResponse.ok) {
        const { patients: updatedPatients } = await fetchResponse.json()
        setPatients(updatedPatients || patientsSeed)
      }
      
      setShowLeadModal(false)
      setLeadForm({ name: "", phone: "", email: "", source: "Website Lead", program: "Cardiometabolic Care", owner: "Tola", risk: "Medium", consent: false })
      
      alert('Lead created successfully!')
    } catch (error) {
      console.error('Error creating lead:', error)
      alert('Error creating lead. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-deep mx-auto mb-4"></div>
          <p className="text-text-mid font-dm-sans">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top Header */}
      <header className="bg-green-deep shadow-custom border-b border-green-deep/20">
        <div className="flex items-center justify-between px-[5%] py-[18px]">
          <div className="flex items-center space-x-4">
            <img 
              src="/logo.png" 
              alt="FXMed" 
              className="h-[120px] w-auto"
            />
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-dm-sans font-bold text-cream">
              Admin Panel
            </h1>
            <p className="text-sm text-cream/70">
              Management Dashboard
            </p>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Left Sidebar Navigation */}
        <div className="w-64 bg-green-deep/95 border-r border-green-deep/20">
          {/* Admin Dashboard Title */}
          <div className="px-4 pt-6 pb-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 px-4 py-3">
              <h3 className="text-center font-dm-sans font-bold text-cream text-sm tracking-wider">
                ADMIN DASHBOARD
              </h3>
            </div>
          </div>
          
          {/* Main Navigation */}
          <nav className="px-4 pb-6">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full px-4 py-3 rounded-lg font-dm-sans text-sm font-medium transition-all text-left flex items-center space-x-3 ${
                  activeTab === 'blog'
                    ? 'bg-gold text-green-deep shadow-md'
                    : 'text-cream/85 hover:bg-green-deep/20 hover:text-cream'
                }`}
              >
                <span>📝</span>
                <span>Blog Management</span>
              </button>
              <button
                onClick={() => setActiveTab('crm')}
                className={`w-full px-4 py-3 rounded-lg font-dm-sans text-sm font-medium transition-all text-left flex items-center space-x-3 ${
                  activeTab === 'crm'
                    ? 'bg-gold text-green-deep shadow-md'
                    : 'text-cream/85 hover:bg-green-deep/20 hover:text-cream'
                }`}
              >
                <span>👥</span>
                <span>CRM</span>
              </button>
              <button
                onClick={() => setActiveTab('seo')}
                className={`w-full px-4 py-3 rounded-lg font-dm-sans text-sm font-medium transition-all text-left flex items-center space-x-3 ${
                  activeTab === 'seo'
                    ? 'bg-gold text-green-deep shadow-md'
                    : 'text-cream/85 hover:bg-green-deep/20 hover:text-cream'
                }`}
              >
                <span>📈</span>
                <span>SEO Analytics</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-8 py-8">
            {/* Content Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-dm-sans font-bold text-green-deep mb-2">
                {activeTab === 'blog' && 'Blog Management'}
                {activeTab === 'crm' && 'CRM Dashboard'}
                {activeTab === 'seo' && 'SEO Analytics'}
              </h2>
              <p className="text-text-mid">
                {activeTab === 'blog' && 'Manage your blog posts, drafts, and content'}
                {activeTab === 'crm' && 'Track patients, manage pipeline, and optimize outreach'}
                {activeTab === 'seo' && 'Monitor search performance and optimize content'}
              </p>
            </div>

            {/* Content Area */}
            {activeTab === 'blog' && (
              <BlogManagement posts={posts} setPosts={setPosts} />
            )}

            {activeTab === 'crm' && (
              <CrmDashboard
                patients={patients}
                setPatients={setPatients}
                showLeadModal={showLeadModal}
                setShowLeadModal={setShowLeadModal}
                leadForm={leadForm}
                setLeadForm={setLeadForm}
                createLead={createLead}
              />
            )}

            {activeTab === 'seo' && <SeoAnalytics />}
          </div>
        </div>
      </div>
    </div>
  )
}
