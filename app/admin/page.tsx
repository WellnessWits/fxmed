'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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
type NavItem = "overview" | "pipeline" | "coordinator" | "calendar" | "documents" | "reporting" | "ai-agent"
type BlogNavItem = "new-blog" | "drafts" | "posted"
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

type Task = {
  id: number
  title: string
  priority: "High" | "Medium" | "Low"
  due: string
  owner: string
}

type Appointment = {
  id: number
  patientId: string
  title: string
  date: string
  time: string
  mode: string
  owner: string
}

type DocumentItem = {
  name: string
  category: string
  status: string
}

type Reminder = {
  id: number
  type: string
  patientId: string
  channel: string
  status: string
  sendAt: string
}

type AgentMessage = {
  role: "assistant" | "user"
  text: string
}

type AgentSuggestion = {
  title: string
  detail: string
  action: string
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'blog' | 'crm'>('blog')
  const [activeBlogSection, setActiveBlogSection] = useState<BlogNavItem>("new-blog")
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'FXMed Team',
    category: 'Health Education',
    thumbnail_url: ''
  })

  // CRM Constants and Data
  const pipelineStages: Stage[] = ["Outreach", "Enrollment", "Onboarding", "Follow-Up", "Active"]
  const navItems: { id: NavItem; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "pipeline", label: "Pipeline" },
    { id: "coordinator", label: "Coordinator" },
    { id: "calendar", label: "Calendar" },
    { id: "documents", label: "Documents" },
    { id: "reporting", label: "Reporting" },
    { id: "ai-agent", label: "AI Agent" },
  ]

  // Blog Navigation Items
  const blogNavItems: { id: BlogNavItem; label: string }[] = [
    { id: "new-blog", label: "New Blog" },
    { id: "drafts", label: "Drafts" },
    { id: "posted", label: "Posted Blogs" },
  ]

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

  const tasksSeed: Task[] = [
    { id: 1, title: "Call 6 high-risk outreach leads", priority: "High", due: "Today", owner: "Tola" },
    { id: 2, title: "Review incomplete onboarding forms", priority: "Medium", due: "Today", owner: "Ade" },
    { id: 3, title: "Send welcome packet to new enrollees", priority: "Medium", due: "Tomorrow", owner: "Maya" },
    { id: 4, title: "Prepare follow-up list for RPM patients", priority: "High", due: "Tomorrow", owner: "Ade" },
  ]

  const appointmentsSeed: Appointment[] = [
    { id: 1, patientId: "FX001", title: "Enrollment Call", date: "Mar 24", time: "10:30 AM", mode: "Phone", owner: "Tola" },
    { id: 2, patientId: "FX004", title: "Follow-Up Review", date: "Mar 24", time: "3:45 PM", mode: "Virtual", owner: "Ade" },
    { id: 3, patientId: "FX006", title: "Benefits Verification", date: "Mar 24", time: "4:30 PM", mode: "Phone", owner: "Ade" },
    { id: 4, patientId: "FX002", title: "Consent Walkthrough", date: "Mar 25", time: "1:00 PM", mode: "Virtual", owner: "Maya" },
    { id: 5, patientId: "FX003", title: "Onboarding Session", date: "Mar 26", time: "11:15 AM", mode: "In Person", owner: "Tola" },
    { id: 6, patientId: "FX005", title: "Quarterly Concierge Check-In", date: "Mar 29", time: "9:00 AM", mode: "Virtual", owner: "Maya" },
  ]

  const documentsSeed: Record<string, DocumentItem[]> = {
    FX001: [
      { name: "Referral Summary.pdf", category: "Referral", status: "Received" },
      { name: "Consent Packet.pdf", category: "Consent", status: "Pending Signature" },
    ],
    FX002: [
      { name: "Membership Agreement.pdf", category: "Consent", status: "Sent" },
      { name: "Insurance Intake.pdf", category: "Enrollment", status: "Received" },
      { name: "Executive Labs Order.pdf", category: "Clinical", status: "Ready" },
    ],
    FX003: [
      { name: "Onboarding Questionnaire.pdf", category: "Onboarding", status: "Completed" },
      { name: "Nutrition Starter Guide.pdf", category: "Education", status: "Shared" },
    ],
    FX004: [
      { name: "RPM Device Consent.pdf", category: "Consent", status: "Signed" },
      { name: "BP Log March.pdf", category: "Monitoring", status: "Updated" },
    ],
    FX005: [{ name: "Quarterly Review.pdf", category: "Follow-Up", status: "Ready" }],
    FX006: [{ name: "Benefits Verification.pdf", category: "Enrollment", status: "Pending" }],
  }

  const remindersSeed: Reminder[] = [
    { id: 1, type: "Consent Reminder", patientId: "FX001", channel: "SMS", status: "Queued", sendAt: "Today • 5:00 PM" },
    { id: 2, type: "Appointment Reminder", patientId: "FX004", channel: "Call", status: "Sent", sendAt: "Today • 2:00 PM" },
    { id: 3, type: "Lab Completion Reminder", patientId: "FX002", channel: "Email", status: "Scheduled", sendAt: "Tomorrow • 8:00 AM" },
    { id: 4, type: "Follow-up Check-in", patientId: "FX006", channel: "SMS", status: "Queued", sendAt: "Tomorrow • 9:30 AM" },
  ]

  // Smart Read Time Calculator
  const calculateReadTime = (content: string): string => {
    // Remove HTML tags if any
    const plainText = content.replace(/<[^>]*>/g, '')
    
    // Count words (more accurate than simple split)
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0).length
    
    // Reading speed varies by content length
    const wordsPerMinute = words < 100 ? 180 : words < 300 ? 200 : 220
    
    const readTime = Math.ceil(words / wordsPerMinute)
    
    // Round to nearest minute for display
    return `${readTime} min read`
  }

  // CRM State
  const [patients, setPatients] = useState<Patient[]>(patientsSeed)
  const [selectedId, setSelectedId] = useState<string>(patientsSeed[0].id)
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState<string>("All")
  const [riskFilter, setRiskFilter] = useState<string>("All")
  const [activeSection, setActiveSection] = useState<NavItem>("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showPatientModal, setShowPatientModal] = useState(false)
  const [showAgentPanel, setShowAgentPanel] = useState(true)
  const [agentInput, setAgentInput] = useState("")
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([
    {
      role: "assistant",
      text: "I'm the FXMED AI Operations Agent. I can summarize patients, recommend next steps, draft outreach, flag document gaps, optimize scheduling, and explain KPI movement.",
    },
  ])
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website Lead",
    program: "Cardiometabolic Care",
    owner: "Tola",
    risk: "Medium" as Risk,
    consent: false,
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // CRM Helper Functions
  function initials(name: string) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  }

  function stageClass(stage: string) {
    const map: Record<string, string> = {
      Outreach: "bg-[#EEF8F0] text-[#0B5E2B]",
      Enrollment: "bg-[#EAF4C8] text-[#476117]",
      Onboarding: "bg-[#F2F7E3] text-[#5A6E1B]",
      "Follow-Up": "bg-[#E6F4EC] text-[#007A33]",
      Active: "bg-[#DDF2E3] text-[#0B5E2B]",
    };
    return map[stage] ?? map.Outreach;
  }

  function riskClass(risk: string) {
    if (risk === "High") return "bg-red-50 text-red-700 border-red-200";
    if (risk === "Medium") return "bg-[#FFF7E8] text-[#8A5A00] border-[#F3D38A]";
    return "bg-[#EEF8F0] text-[#0B5E2B] border-[#B9DEC2]";
  }

  function statusClass(status: string) {
    const map: Record<string, string> = {
      Pending: "bg-[#FFF7E8] text-[#8A5A00] border-[#F3D38A]",
      Sent: "bg-[#EEF8F0] text-[#007A33] border-[#B9DEC2]",
      Signed: "bg-[#DDF2E3] text-[#0B5E2B] border-[#B9DEC2]",
      Received: "bg-[#DDF2E3] text-[#0B5E2B] border-[#B9DEC2]",
      Completed: "bg-[#DDF2E3] text-[#0B5E2B] border-[#B9DEC2]",
      Queued: "bg-[#FFF7E8] text-[#8A5A00] border-[#F3D38A]",
      Scheduled: "bg-[#F2F7E3] text-[#5A6E1B] border-[#DCE8A8]",
      Urgent: "bg-red-50 text-red-700 border-red-200",
      Ready: "bg-[#F5F7F2] text-[#111111] border-[#D9DED1]",
      Shared: "bg-[#EEF8F0] text-[#007A33] border-[#B9DEC2]",
      Reviewed: "bg-[#DDF2E3] text-[#0B5E2B] border-[#B9DEC2]",
      Updated: "bg-[#EEF8F0] text-[#007A33] border-[#B9DEC2]",
      Upcoming: "bg-[#F5F7F2] text-[#111111] border-[#D9DED1]",
      "Pending Signature": "bg-[#FFF7E8] text-[#8A5A00] border-[#F3D38A]",
    };
    return map[status] ?? "bg-[#F5F7F2] text-[#111111] border-[#D9DED1]";
  }

  function movePatientStage(patient: Patient, direction: -1 | 1): Patient {
    const currentIndex = pipelineStages.indexOf(patient.stage);
    const nextIndex = Math.min(pipelineStages.length - 1, Math.max(0, currentIndex + direction));
    const nextStage = pipelineStages[nextIndex];
    const nextProgress: Record<Stage, number> = {
      Outreach: 15,
      Enrollment: 35,
      Onboarding: 60,
      "Follow-Up": 85,
      Active: 100,
    };
    return { ...patient, stage: nextStage, progress: nextProgress[nextStage] };
  }

  function buildAgentSuggestions(patient: Patient, section: NavItem): AgentSuggestion[] {
    const suggestions: AgentSuggestion[] = [
      {
        title: "Summarize patient status",
        detail: `Create a quick briefing for ${patient.owner} with current stage, risks, and pending actions.`,
        action: `Brief ${patient.owner} on ${patient.name}`,
      },
      {
        title: "Draft next outreach",
        detail: `Generate a personalized ${patient.preferred.toLowerCase()} message for ${patient.name} based on ${patient.nextStep.toLowerCase()}.`,
        action: `Draft outreach for ${patient.name}`,
      },
    ];

    if (patient.consentStatus !== "Signed") {
      suggestions.push({
        title: "Recover missing consent",
        detail: `Draft a consent follow-up and queue a reminder because consent is ${patient.consentStatus.toLowerCase()}.`,
        action: `Queue consent recovery for ${patient.name}`,
      });
    }

    if (section === "calendar") {
      suggestions.push({
        title: "Optimize schedule",
        detail: `Review ${patient.name}'s appointments and recommend the best next follow-up slot.`,
        action: `Optimize ${patient.name} calendar`,
      });
    }

    if (section === "documents") {
      suggestions.push({
        title: "Audit missing documents",
        detail: `Review document completeness and flag anything missing before onboarding progresses.`,
        action: `Audit ${patient.name} documents`,
      });
    }

    if (section === "reporting") {
      suggestions.push({
        title: "Explain KPI movement",
        detail: "Summarize what is driving the current conversion, consent, and backlog metrics.",
        action: "Explain current KPI movement",
      });
    }

    return suggestions;
  }

  function Card({ title, children, subtitle }: { title: string; children: React.ReactNode; subtitle?: string }) {
    return (
      <div className="rounded-3xl border border-[#E3E9D8] bg-white shadow-sm">
        <div className="p-6">
          <h2 className="text-lg font-semibold">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    );
  }

  // CRM Computed Values
  const filteredPatients = useMemo(() => {
    const q = search.toLowerCase();
    return patients.filter((p) => {
      const matchesQuery = p.name.toLowerCase().includes(q) || p.program.toLowerCase().includes(q) || p.tags.join(" ").toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
      const matchesStage = stageFilter === "All" || p.stage === stageFilter;
      const matchesRisk = riskFilter === "All" || p.risk === riskFilter;
      return matchesQuery && matchesStage && matchesRisk;
    });
  }, [patients, riskFilter, search, stageFilter]);

  const selectedPatient = filteredPatients.find((p) => p.id === selectedId) ?? filteredPatients[0] ?? patients[0];
  const selectedDocuments = documentsSeed[selectedPatient.id] ?? [];
  const selectedAppointments = appointmentsSeed.filter((appt) => appt.patientId === selectedPatient.id);
  const coordinatorPatients = patients.filter((p) => p.owner === selectedPatient.owner);

  const dashboard = useMemo(() => {
    const total = patients.length;
    const dueToday = patients.filter((p) => p.nextDate === "Mar 24").length;
    const signedConsents = patients.filter((p) => p.consentStatus === "Signed").length;
    const highRisk = patients.filter((p) => p.risk === "High").length;
    const active = patients.filter((p) => p.stage === "Active").length;
    const enrollment = patients.filter((p) => p.stage === "Enrollment").length;
    const onboarding = patients.filter((p) => p.stage === "Onboarding").length;
    return {
      total,
      dueToday,
      signedConsents,
      highRisk,
      active,
      enrollment,
      onboarding,
      consentRate: Math.round((signedConsents / total) * 100),
      conversionRate: Math.round((active / total) * 100),
      outreachBacklog: patients.filter((p) => p.stage === "Outreach").length,
    };
  }, [patients]);

  const coordinatorStats = useMemo(() => {
    return ["Tola", "Maya", "Ade"].map((owner) => {
      const assigned = patients.filter((p) => p.owner === owner);
      return {
        owner,
        total: assigned.length,
        highRisk: assigned.filter((p) => p.risk === "High").length,
        dueToday: assigned.filter((p) => p.nextDate === "Mar 24").length,
      };
    });
  }, [patients]);

  const agentSuggestions = useMemo(() => buildAgentSuggestions(selectedPatient, activeSection), [selectedPatient, activeSection]);

  // CRM Action Handlers
  const runAgentAction = (prompt: string) => {
    const lower = prompt.toLowerCase();
    let response = `${selectedPatient.name} is currently in ${selectedPatient.stage} with ${selectedPatient.risk.toLowerCase()} risk and next action: ${selectedPatient.nextStep}.`;

    if (lower.includes("brief") || lower.includes("summarize")) {
      response = `${selectedPatient.name} summary: ${selectedPatient.program}, ${selectedPatient.risk.toLowerCase()} risk, owned by ${selectedPatient.owner}. Main blocker: ${selectedPatient.nextStep}. Consent status is ${selectedPatient.consentStatus.toLowerCase()} and next touchpoint is ${selectedPatient.appointment}.`;
    } else if (lower.includes("outreach") || lower.includes("draft")) {
      response = `Draft message: Hi ${selectedPatient.name.split(" ")[0]}, this is ${selectedPatient.owner} from FXMED. I'm reaching out to help with your next step: ${selectedPatient.nextStep}. Please reply with a good time today so we can keep your care plan moving.`;
    } else if (lower.includes("consent")) {
      response = `Recommended consent recovery workflow: send reminder via ${selectedPatient.preferred.toLowerCase()}, follow with a same-day coordinator call, and escalate if consent remains ${selectedPatient.consentStatus.toLowerCase()} after 24 hours.`;
    } else if (lower.includes("calendar") || lower.includes("schedule")) {
      response = `Best schedule recommendation: keep the next appointment on ${selectedPatient.appointment}, then queue a follow-up reminder 24 hours before and a coordinator task for same-day confirmation.`;
    } else if (lower.includes("document") || lower.includes("audit")) {
      response = `${selectedPatient.name} currently has ${selectedPatient.documentCount} documents on file. Priority review items should focus on consent status (${selectedPatient.consentStatus}) and any onboarding or clinical packets still missing.`;
    } else if (lower.includes("kpi") || lower.includes("metric") || lower.includes("report")) {
      response = `Current KPI view: consent completion is ${dashboard.consentRate}%, conversion is ${dashboard.conversionRate}%, and outreach backlog is ${dashboard.outreachBacklog}. Biggest improvement opportunity is moving enrollment patients into onboarding faster.`;
    }

    setAgentMessages((prev) => [...prev, { role: "user", text: prompt }, { role: "assistant", text: response }]);
  };

  const createLead = () => {
    if (!leadForm.name.trim()) return;
    const id = `FX${String(patients.length + 1).padStart(3, "0")}`;
    const newPatient: Patient = {
      id,
      name: leadForm.name,
      age: 45,
      program: leadForm.program,
      risk: leadForm.risk,
      stage: "Outreach",
      source: leadForm.source,
      owner: leadForm.owner,
      phone: leadForm.phone || "Not added",
      email: leadForm.email || "Not added",
      lastTouch: "Just now",
      nextStep: "Initial outreach and qualification",
      nextDate: "Mar 24",
      progress: 10,
      tags: ["New lead"],
      preferred: leadForm.phone ? "Phone" : "Email",
      appointment: "Not scheduled",
      consentStatus: leadForm.consent ? "Sent" : "Pending",
      documentCount: 0,
      reminderStatus: "Queued",
    };
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedId(id);
    setShowLeadModal(false);
    setLeadForm({ name: "", phone: "", email: "", source: "Website Lead", program: "Cardiometabolic Care", owner: "Tola", risk: "Medium", consent: false });
    setAgentMessages((prev) => [...prev, { role: "assistant", text: `New lead ${leadForm.name} created. I recommend immediate outreach, consent packet dispatch, and coordinator assignment review.` }]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        setFormData(prev => ({ ...prev, thumbnail_url: dataUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const slug = formData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now().toString()
    
    const newPost = {
      title: formData.title || '',
      slug: slug,
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      author: formData.author || 'FXMed Team',
      category: formData.category || 'Health Education',
      thumbnail_url: formData.thumbnail_url || '',
      status: 'published' as const,
      read_time: calculateReadTime(formData.content || '')
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert(newPost)
        .select()
        .single()
      
      if (error) throw error
      
      setPosts([data, ...posts])
      
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'FXMed Team',
        category: 'Health Education',
        thumbnail_url: ''
      })

      alert('Blog post created successfully!')
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating blog post. Please try again.')
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id)
        
        if (error) throw error
        
        const updatedPosts = posts.filter(post => post.id !== id)
        setPosts(updatedPosts)
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Error deleting post. Please try again.')
      }
    }
  }

  const categories = [
    'Health Education',
    'Preventive Medicine', 
    'Nutrition',
    'Functional Medicine',
    'Mobile Health',
    'Hormonal Health'
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFFF0] flex items-center justify-center">
        <div className="text-2xl font-dm-sans text-green-deep">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FCFFF0]">
      <header className="bg-green-deep/95 backdrop-blur-md shadow-sm border-b border-gold/20">
        <div className="flex items-center justify-between px-[5%] py-[18px]">
          <a href="/" className="flex items-center no-underline">
            <img 
              src="/logo.png" 
              alt="FXMed" 
              className="h-[120px] w-auto"
            />
          </a>
          <h1 className="font-dm-sans font-bold text-cream/85 text-[clamp(1.5rem,4vw,2.5rem)]">Admin Panel</h1>
        </div>
      </header>

      <div className="mx-auto px-[100px] py-[40px]">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Sidebar - Tab Navigation Only */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <div className="bg-white rounded-[20px] p-6 shadow-lg">
              <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-6">
                Admin Dashboard
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`px-4 py-3 rounded-lg font-dm-sans text-[0.9rem] font-medium transition-colors text-left ${
                    activeTab === 'blog' 
                      ? 'bg-green-deep text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Blog Management
                </button>
                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-4 py-3 rounded-lg font-dm-sans text-[0.9rem] font-medium transition-colors text-left ${
                    activeTab === 'crm' 
                      ? 'bg-green-deep text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  CRM
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area - Dynamic Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10">
            {activeTab === 'blog' && (
              <div className="bg-white rounded-[20px] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-dm-sans font-semibold text-green-deep">
                      Blog Management
                    </h3>
                    <p className="text-sm text-text-mid mt-1">
                      Create and manage blog content
                    </p>
                  </div>
                  <Link 
                    href="/blog" 
                    className="font-dm-sans bg-gold text-green-deep px-6 py-[10px] rounded-[30px] font-semibold text-[0.88rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px]"
                  >
                    View Blog
                  </Link>
                </div>
              
                {/* Blog Navigation Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                  {blogNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveBlogSection(item.id)}
                      className={`px-4 py-2 rounded-md font-dm-sans text-[0.85rem] font-medium transition-colors ${
                        activeBlogSection === item.id
                          ? 'bg-white text-green-deep shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* Blog Content Based on Active Section */}
                {activeBlogSection === 'new-blog' && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Enter blog post title..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                        Thumbnail Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                      />
                      {formData.thumbnail_url && (
                        <div className="mt-3">
                          <img 
                            src={formData.thumbnail_url} 
                            alt="Thumbnail preview" 
                            className="h-48 w-full object-cover rounded-[12px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                        placeholder="Author name..."
                      />
                    </div>

                    <div>
                      <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                      Excerpt
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                      className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                      rows={3}
                      placeholder="Brief description of post..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                      Content
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                      rows={15}
                      placeholder="Full blog post content..."
                      required
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-gold text-green-deep px-8 py-[12px] rounded-[30px] font-dm-sans font-semibold text-[0.95rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px] shadow-md"
                    >
                      Create Blog Post
                    </button>
                    <button
                      type="button"
                      className="w-full md:w-auto bg-white border-2 border-green-deep text-green-deep px-8 py-[12px] rounded-[30px] font-dm-sans font-semibold text-[0.95rem] transition-all hover:bg-green-deep/10"
                    >
                      Save to drafts
                    </button>
                  </div>
                </form>
                )}

                {/* Drafts Section */}
                {activeBlogSection === 'drafts' && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-dm-sans font-semibold text-green-deep mb-2">
                      Draft Posts
                    </h3>
                    <p className="text-text-mid">
                      Save drafts here before publishing
                    </p>
                  </div>
                )}

                {/* Posted Blogs Section */}
                {activeBlogSection === 'posted' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-dm-sans font-semibold text-green-deep">
                          Published Posts ({posts.length})
                        </h3>
                        <p className="text-sm text-text-mid mt-1">
                          View and manage your published content
                        </p>
                      </div>
                    </div>
                  
                    {posts.length === 0 ? (
                      <div className="bg-gray-50 rounded-[16px] p-8 text-center">
                        <p className="font-dm-sans text-text-mid">
                          No posts yet. Create your first post above!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {posts.map(post => (
                          <div key={post.id} className="bg-gray-50 border border-green-deep/8 rounded-[16px] p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-dm-sans font-medium text-green-deep truncate flex-1 pr-2">{post.title}</h4>
                              <button
                                onClick={() => handleDelete(post.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-dm-sans flex-shrink-0 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                            
                            <div className="text-sm font-dm-sans text-text-mid space-y-1">
                              <p><span className="font-semibold">Category:</span> {post.category}</p>
                              <p><span className="font-semibold">Date:</span> {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                              <p><span className="font-semibold">Author:</span> {post.author}</p>
                              <p><span className="font-semibold">Read Time:</span> {post.read_time}</p>
                            </div>
                            
                            {post.thumbnail_url && (
                              <img 
                                src={post.thumbnail_url} 
                                alt={post.title} 
                                className="w-full h-24 object-cover rounded-[12px] mt-3"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'crm' && (
              <div className="bg-white rounded-[20px] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-dm-sans font-semibold text-green-deep">
                      Customer Relationship Management
                    </h3>
                    <p className="text-sm text-text-mid mt-1">
                      Manage patients, appointments, and care coordination
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-gold text-green-deep px-4 py-2 rounded-[12px] font-dm-sans font-semibold text-[0.9rem] hover:bg-gold-light transition-colors shadow-sm" onClick={() => setShowLeadModal(true)}>
                      + New Lead
                    </button>
                  </div>
                </div>

                {/* CRM Navigation Tabs */}
                <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`px-4 py-2 rounded-md font-dm-sans text-[0.85rem] font-medium transition-colors ${
                        activeSection === item.id
                          ? 'bg-white text-green-deep shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {/* CRM Content Area */}
                <div className="space-y-6">
                  {/* Dashboard Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Patients", value: dashboard.total, note: "+18 this month" },
                      { label: "Due Today", value: dashboard.dueToday, note: "reminders + appointments" },
                      { label: "Signed Consents", value: `${dashboard.consentRate}%`, note: `${dashboard.signedConsents} of ${dashboard.total}` },
                      { label: "Conversion Rate", value: `${dashboard.conversionRate}%`, note: `${dashboard.active} active patients` },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-green-deep/10 rounded-[16px] p-4">
                        <p className="text-sm font-dm-sans text-green-deep font-medium">{stat.label}</p>
                        <h3 className="mt-1 text-2xl font-bold font-dm-sans text-green-deep">{stat.value}</h3>
                        <p className="mt-1 text-xs text-gray-600 font-dm-sans">{stat.note}</p>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Content Based on Active Section */}
                  {activeSection === "overview" && (
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                      {/* Patient Queue */}
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Patient Queue</h4>
                        <div className="grid gap-3 mb-4">
                          <input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            className="w-full px-4 py-3 rounded-lg border border-green-deep/20 font-dm-sans focus:outline-none focus:border-gold transition-colors" 
                            placeholder="Search patients..." 
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className="px-4 py-3 rounded-lg border border-green-deep/20 font-dm-sans focus:outline-none focus:border-gold transition-colors">
                              <option value="All">All stages</option>
                              {pipelineStages.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                            </select>
                            <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-4 py-3 rounded-lg border border-green-deep/20 font-dm-sans focus:outline-none focus:border-gold transition-colors">
                              <option value="All">All risks</option>
                              <option value="High">High</option>
                              <option value="Medium">Medium</option>
                              <option value="Low">Low</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {filteredPatients.map((patient) => (
                            <div key={patient.id} className="bg-white rounded-lg p-4 border border-green-deep/10 hover:border-gold/50 transition-colors cursor-pointer" onClick={() => setSelectedId(patient.id)}>
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-green-deep/20 flex items-center justify-center text-green-deep font-semibold font-dm-sans">
                                    {initials(patient.name)}
                                  </div>
                                  <div>
                                    <p className="font-semibold font-dm-sans text-gray-900">{patient.name}</p>
                                    <p className="text-sm text-gray-600 font-dm-sans">{patient.program} • {patient.id}</p>
                                  </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium font-dm-sans ${stageClass(patient.stage)}`}>
                                  {patient.stage}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Selected Patient Details */}
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">{selectedPatient.name}</h4>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-600 font-dm-sans">Contact</p>
                              <p className="font-medium font-dm-sans text-sm">{selectedPatient.phone}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-600 font-dm-sans">Owner</p>
                              <p className="font-medium font-dm-sans text-sm">{selectedPatient.owner}</p>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-600 font-dm-sans">Progress</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div className="bg-green-deep h-2 rounded-full" style={{ width: `${selectedPatient.progress}%` }}></div>
                                </div>
                                <span className="text-xs font-medium font-dm-sans">{selectedPatient.progress}%</span>
                              </div>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <p className="text-xs text-gray-600 font-dm-sans">Risk</p>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-medium font-dm-sans ${riskClass(selectedPatient.risk)}`}>
                                {selectedPatient.risk}
                              </span>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm font-medium font-dm-sans text-gray-700 mb-2">Next Step</p>
                            <p className="text-sm font-dm-sans">{selectedPatient.nextStep}</p>
                            <p className="text-xs text-gray-500 font-dm-sans mt-1">Due: {selectedPatient.nextDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "pipeline" && (
                    <div className="bg-gray-50 rounded-[16px] p-6">
                      <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Patient Pipeline</h4>
                      <div className="grid gap-4 lg:grid-cols-5">
                        {pipelineStages.map((stage) => {
                          const stagePatients = patients.filter((p) => p.stage === stage);
                          return (
                            <div key={stage} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium font-dm-sans text-gray-900">{stage}</h5>
                                <span className={`px-2 py-1 rounded text-xs font-medium font-dm-sans ${stageClass(stage)}`}>
                                  {stagePatients.length}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {stagePatients.map((patient) => (
                                  <div key={patient.id} className="border border-gray-200 rounded-lg p-3">
                                    <p className="font-medium font-dm-sans text-sm">{patient.name}</p>
                                    <p className="text-xs text-gray-600 font-dm-sans">{patient.program}</p>
                                    <div className="flex gap-2 mt-2">
                                      <button className="text-xs bg-gray-100 px-2 py-1 rounded font-dm-sans" disabled={patient.stage === pipelineStages[0]} onClick={() => setPatients((prev) => prev.map((p) => (p.id === patient.id ? movePatientStage(p, -1) : p)))}>←</button>
                                      <button className="text-xs bg-green-deep text-white px-2 py-1 rounded font-dm-sans" disabled={patient.stage === pipelineStages[pipelineStages.length - 1]} onClick={() => setPatients((prev) => prev.map((p) => (p.id === patient.id ? movePatientStage(p, 1) : p)))}>→</button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {activeSection === "coordinator" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Coordinator Workload</h4>
                        <div className="space-y-3">
                          {coordinatorStats.map((item) => (
                            <div key={item.owner} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-medium font-dm-sans">{item.owner}</p>
                                <span className="text-sm text-gray-600 font-dm-sans">{item.total} patients</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-red-50 rounded p-2 text-center">
                                  <p className="text-red-700 font-medium font-dm-sans">{item.highRisk}</p>
                                  <p className="text-xs text-red-600 font-dm-sans">High Risk</p>
                                </div>
                                <div className="bg-yellow-50 rounded p-2 text-center">
                                  <p className="text-yellow-700 font-medium font-dm-sans">{item.dueToday}</p>
                                  <p className="text-xs text-yellow-600 font-dm-sans">Due Today</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">{selectedPatient.owner} Worklist</h4>
                        <div className="space-y-3">
                          {coordinatorPatients.map((patient) => (
                            <div key={patient.id} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium font-dm-sans">{patient.name}</p>
                                  <p className="text-sm text-gray-600 font-dm-sans">{patient.program}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium font-dm-sans ${statusClass(patient.reminderStatus)}`}>
                                  {patient.reminderStatus}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "calendar" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Upcoming Appointments</h4>
                        <div className="space-y-3">
                          {appointmentsSeed.map((appt) => (
                            <div key={appt.id} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium font-dm-sans">{appt.title}</p>
                                  <p className="text-sm text-gray-600 font-dm-sans">{appt.date} • {appt.time}</p>
                                  <p className="text-xs text-gray-500 font-dm-sans">{appt.mode} • {appt.owner}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">{selectedPatient.name} Schedule</h4>
                        <div className="space-y-3">
                          {selectedAppointments.length ? selectedAppointments.map((appt) => (
                            <div key={appt.id} className="bg-white rounded-lg p-4">
                              <p className="font-medium font-dm-sans">{appt.title}</p>
                              <p className="text-sm text-gray-600 font-dm-sans">{appt.date} • {appt.time}</p>
                              <p className="text-xs text-gray-500 font-dm-sans">Mode: {appt.mode}</p>
                            </div>
                          )) : <p className="text-sm text-gray-600 font-dm-sans text-center py-8">No appointments scheduled</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "documents" && (
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Document Center</h4>
                        <div className="space-y-3">
                          {selectedDocuments.map((doc) => (
                            <div key={doc.name} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium font-dm-sans">{doc.name}</p>
                                  <p className="text-sm text-gray-600 font-dm-sans">{doc.category}</p>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium font-dm-sans ${statusClass(doc.status)}`}>
                                  {doc.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">{selectedPatient.name} Documents</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600 font-dm-sans">Consent Status</p>
                            <p className="font-medium font-dm-sans">{selectedPatient.consentStatus}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm text-gray-600 font-dm-sans">Files on record</p>
                            <p className="font-medium font-dm-sans">{selectedPatient.documentCount}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "reporting" && (
                    <div className="grid gap-6 lg:grid-cols-3">
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Pipeline Metrics</h4>
                        <div className="space-y-3">
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-sm font-medium font-dm-sans">Outreach</p>
                            <p className="text-xl font-bold font-dm-sans text-green-deep">{dashboard.outreachBacklog}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-sm font-medium font-dm-sans">Enrollment</p>
                            <p className="text-xl font-bold font-dm-sans text-green-deep">{dashboard.enrollment}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-sm font-medium font-dm-sans">Onboarding</p>
                            <p className="text-xl font-bold font-dm-sans text-green-deep">{dashboard.onboarding}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3">
                            <p className="text-sm font-medium font-dm-sans">Active</p>
                            <p className="text-xl font-bold font-dm-sans text-green-deep">{dashboard.active}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Coordinator Performance</h4>
                        <div className="space-y-3">
                          {coordinatorStats.map((item) => (
                            <div key={item.owner} className="bg-white rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <p className="font-medium font-dm-sans">{item.owner}</p>
                                <p className="text-sm text-gray-600 font-dm-sans">{item.total} assigned</p>
                              </div>
                              <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-dm-sans">{item.highRisk} high</span>
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-dm-sans">{item.dueToday} due</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-[16px] p-6">
                        <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">Reminder Queue</h4>
                        <div className="space-y-3">
                          {remindersSeed.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg p-3">
                              <p className="font-medium font-dm-sans text-sm">{item.type}</p>
                              <p className="text-xs text-gray-600 font-dm-sans">{item.channel} • {item.sendAt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === "ai-agent" && (
                    <div className="bg-gray-50 rounded-[16px] p-6">
                      <h4 className="text-lg font-dm-sans font-semibold text-green-deep mb-4">AI Operations Assistant</h4>
                      <div className="grid gap-6 lg:grid-cols-2">
                        <div>
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-600 font-dm-sans mb-2">Current Focus</p>
                            <p className="font-medium font-dm-sans">{selectedPatient.name} • {selectedPatient.stage}</p>
                            <p className="text-sm text-gray-600 font-dm-sans">{selectedPatient.nextStep}</p>
                          </div>
                          <div className="space-y-3">
                            {agentSuggestions.slice(0, 3).map((item) => (
                              <button key={item.title} onClick={() => runAgentAction(item.action)} className="w-full bg-white rounded-lg p-4 text-left hover:border-gold/50 border border-gray-200 transition-colors">
                                <p className="font-medium font-dm-sans text-sm">{item.title}</p>
                                <p className="text-xs text-gray-600 font-dm-sans mt-1">{item.detail}</p>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg border border-gray-200">
                          <div className="border-b border-gray-200 p-4">
                            <p className="font-medium font-dm-sans">AI Agent Console</p>
                          </div>
                          <div className="max-h-80 overflow-y-auto p-4 space-y-3">
                            {agentMessages.map((message, idx) => (
                              <div key={idx} className={`rounded-lg p-3 text-sm ${message.role === "assistant" ? "bg-gray-50" : "bg-green-deep text-white"}`}>
                                {message.text}
                              </div>
                            ))}
                          </div>
                          <div className="border-t border-gray-200 p-4">
                            <div className="flex gap-2">
                              <input value={agentInput} onChange={(e) => setAgentInput(e.target.value)} className="flex-1 px-3 py-2 border border-gray-200 rounded-lg font-dm-sans text-sm focus:outline-none focus:border-gold transition-colors" placeholder="Ask AI agent..." />
                              <button className="bg-green-deep text-white px-4 py-2 rounded-lg font-dm-sans text-sm hover:bg-green-700 transition-colors" onClick={() => { if (!agentInput.trim()) return; runAgentAction(agentInput.trim()); setAgentInput(""); }}>Send</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
