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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-deep mx-auto mb-4"></div>
          <p className="text-gray-600 font-dm-sans">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-dm-sans font-bold text-green-deep">
              FXMED Admin Panel
            </h1>
            <p className="text-text-mid mt-2">
              Manage your blog, CRM, and SEO analytics
            </p>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-3 rounded-lg font-dm-sans text-[0.9rem] font-medium transition-colors text-left ${
              activeTab === 'blog'
                ? 'bg-green-deep text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📝 Blog Management
          </button>
          <button
            onClick={() => setActiveTab('crm')}
            className={`px-4 py-3 rounded-lg font-dm-sans text-[0.9rem] font-medium transition-colors text-left ${
              activeTab === 'crm'
                ? 'bg-green-deep text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            👥 CRM
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-3 rounded-lg font-dm-sans text-[0.9rem] font-medium transition-colors text-left ${
              activeTab === 'seo'
                ? 'bg-green-deep text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📈 SEO Analytics
          </button>
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
  )
}
