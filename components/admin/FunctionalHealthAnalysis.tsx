'use client'

import { useState, useEffect } from 'react'

interface HealthAnalysisSubmission {
  id: string
  patientName: string
  email: string
  phone: string
  age: string
  gender: string
  primaryConcern: string
  symptoms: string[]
  duration: string
  severity: string
  submittedAt: string
  testRecommendations: {
    category: string
    tests: {
      name: string
      description: string
      whyImportant: string
    }[]
  }[]
  status: 'new' | 'reviewed' | 'contacted' | 'completed'
}

const mockSubmissions: HealthAnalysisSubmission[] = [
  {
    id: "FHA001",
    patientName: "Amara Okafor",
    email: "amara@sample.com",
    phone: "+234 801 234 5678",
    age: "32",
    gender: "Female",
    primaryConcern: "Chronic fatigue and digestive issues",
    symptoms: ["Fatigue", "Bloating", "Irregular periods", "Hair loss"],
    duration: "6 months",
    severity: "Moderate",
    submittedAt: "2024-03-15T10:30:00Z",
    testRecommendations: [
      {
        category: "Core Panel",
        tests: [
          {
            name: "Complete Blood Count",
            description: "Measures red cells, white cells, and platelets",
            whyImportant: "Identifies anemia, infection, and inflammation"
          },
          {
            name: "Comprehensive Metabolic Panel",
            description: "Assesses kidney function, liver function, and electrolytes",
            whyImportant: "Evaluates overall metabolic health"
          }
        ]
      },
      {
        category: "Hormone Panel",
        tests: [
          {
            name: "Thyroid Panel",
            description: "TSH, Free T3, Free T4",
            whyImportant: "Assesses thyroid function affecting energy and metabolism"
          }
        ]
      }
    ],
    status: "new"
  },
  {
    id: "FHA002",
    patientName: "Chinedu Adeyemi",
    email: "chinedu@sample.com",
    phone: "+234 802 345 6789",
    age: "45",
    gender: "Male",
    primaryConcern: "Weight gain and low energy",
    symptoms: ["Weight gain", "Low energy", "Brain fog", "Sleep issues"],
    duration: "1 year",
    severity: "Mild",
    submittedAt: "2024-03-14T14:20:00Z",
    testRecommendations: [
      {
        category: "Metabolic Panel",
        tests: [
          {
            name: "Lipid Profile",
            description: "Cholesterol, triglycerides, HDL, LDL",
            whyImportant: "Assesses cardiovascular risk"
          },
          {
            name: "HbA1c",
            description: "3-month average blood sugar",
            whyImportant: "Screens for diabetes and insulin resistance"
          }
        ]
      }
    ],
    status: "reviewed"
  },
  {
    id: "FHA003",
    patientName: "Nneka Johnson",
    email: "nneka@sample.com",
    phone: "+234 803 456 7890",
    age: "28",
    gender: "Female",
    primaryConcern: "Hormonal imbalances",
    symptoms: ["Irregular cycles", "Acne", "Mood swings", "Cravings"],
    duration: "8 months",
    severity: "Moderate",
    submittedAt: "2024-03-13T09:15:00Z",
    testRecommendations: [
      {
        category: "Hormone Panel",
        tests: [
          {
            name: "Female Hormone Panel",
            description: "Estrogen, progesterone, FSH, LH",
            whyImportant: "Evaluates reproductive hormone balance"
          }
        ]
      }
    ],
    status: "contacted"
  }
]

interface FunctionalHealthAnalysisProps {
  submissions?: HealthAnalysisSubmission[]
}

export default function FunctionalHealthAnalysis({ submissions = mockSubmissions }: FunctionalHealthAnalysisProps) {
  const [submissionsList, setSubmissionsList] = useState<HealthAnalysisSubmission[]>(submissions)
  const [selectedSubmission, setSelectedSubmission] = useState<HealthAnalysisSubmission | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'reviewed' | 'contacted' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Filter submissions based on status and search term
  const filteredSubmissions = submissionsList.filter(submission => {
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus
    const matchesSearch = searchTerm === '' || 
      submission.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.primaryConcern.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-green-100 text-green-deep'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const updateSubmissionStatus = (id: string, newStatus: HealthAnalysisSubmission['status']) => {
    setSubmissionsList(prev => 
      prev.map(sub => 
        sub.id === id ? { ...sub, status: newStatus } : sub
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-green-deep/8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-mid font-dm-sans">Total Submissions</p>
              <p className="text-2xl font-bold text-green-deep font-dm-sans">{submissionsList.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-deep/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">📋</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-green-deep/8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-mid font-dm-sans">New</p>
              <p className="text-2xl font-bold text-green-deep font-dm-sans">
                {submissionsList.filter(s => s.status === 'new').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">🆕</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-green-deep/8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-mid font-dm-sans">Reviewed</p>
              <p className="text-2xl font-bold text-green-deep font-dm-sans">
                {submissionsList.filter(s => s.status === 'reviewed').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">👁️</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-green-deep/8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-mid font-dm-sans">Contacted</p>
              <p className="text-2xl font-bold text-green-deep font-dm-sans">
                {submissionsList.filter(s => s.status === 'contacted').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📞</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-4 border border-green-deep/8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or concern..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-green-deep/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-mid focus:border-transparent font-dm-sans"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'new', 'reviewed', 'contacted', 'completed'] as const).map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-dm-sans text-sm font-medium transition-all ${
                  filterStatus === status
                    ? 'bg-green-deep text-white'
                    : 'bg-gray-100 text-text-mid hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg border border-green-deep/8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-green-deep/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Primary Concern
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-green-deep uppercase tracking-wider font-dm-sans">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 font-dm-sans">
                        {submission.patientName}
                      </div>
                      <div className="text-sm text-gray-500 font-dm-sans">
                        {submission.age} • {submission.gender}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-dm-sans">{submission.email}</div>
                    <div className="text-sm text-gray-500 font-dm-sans">{submission.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-dm-sans max-w-xs truncate">
                      {submission.primaryConcern}
                    </div>
                    <div className="text-xs text-gray-500 font-dm-sans">
                      {submission.symptoms.length} symptoms
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-dm-sans">
                    {formatDate(submission.submittedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full font-dm-sans ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-green-mid hover:text-green-deep font-dm-sans mr-3"
                    >
                      View Details
                    </button>
                    <select
                      value={submission.status}
                      onChange={(e) => updateSubmissionStatus(submission.id, e.target.value as HealthAnalysisSubmission['status'])}
                      className="text-sm border border-gray-300 rounded px-2 py-1 font-dm-sans"
                    >
                      <option value="new">New</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedSubmission(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-green-deep to-green-mid p-8 rounded-t-[24px]">
              <h2 className="font-dm-sans font-bold text-white text-2xl mb-2">
                Functional Health Analysis Details
              </h2>
              <p className="font-dm-sans text-cream/90">
                Submission ID: {selectedSubmission.id}
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              {/* Patient Information */}
              <div className="mb-8">
                <h3 className="font-dm-sans font-bold text-green-deep text-lg mb-4">Patient Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-cream rounded-lg p-4">
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Name</p>
                    <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Age/Gender</p>
                    <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.age} • {selectedSubmission.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Email</p>
                    <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Phone</p>
                    <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.phone}</p>
                  </div>
                </div>
              </div>

              {/* Health Concerns */}
              <div className="mb-8">
                <h3 className="font-dm-sans font-bold text-green-deep text-lg mb-4">Health Concerns</h3>
                <div className="bg-cream rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Primary Concern</p>
                    <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.primaryConcern}</p>
                  </div>
                  <div>
                    <p className="text-sm text-text-mid font-dm-sans">Symptoms</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSubmission.symptoms.map((symptom, index) => (
                        <span key={index} className="bg-white px-3 py-1 rounded-full text-sm font-dm-sans border border-green-deep/20">
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-text-mid font-dm-sans">Duration</p>
                      <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-mid font-dm-sans">Severity</p>
                      <p className="font-medium text-gray-900 font-dm-sans">{selectedSubmission.severity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Test Recommendations */}
              <div className="mb-8">
                <h3 className="font-dm-sans font-bold text-green-deep text-lg mb-4">Test Recommendations</h3>
                <div className="space-y-4">
                  {selectedSubmission.testRecommendations.map((category, index) => (
                    <div key={index} className="bg-cream rounded-lg p-4">
                      <h4 className="font-semibold text-green-deep mb-3 font-dm-sans">{category.category}</h4>
                      <div className="space-y-3">
                        {category.tests.map((test, testIndex) => (
                          <div key={testIndex} className="bg-white rounded-lg p-3 border border-green-deep/10">
                            <h5 className="font-medium text-gray-900 font-dm-sans mb-1">{test.name}</h5>
                            <p className="text-sm text-gray-600 font-dm-sans mb-2">{test.description}</p>
                            <p className="text-sm text-text-mid font-dm-sans italic">Why important: {test.whyImportant}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    updateSubmissionStatus(selectedSubmission.id, 'contacted')
                    setSelectedSubmission(null)
                  }}
                  className="font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg inline-block text-center flex-1"
                >
                  Mark as Contacted
                </button>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="font-dm-sans bg-transparent text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] border border-green-deep/40 transition-all hover:border-green-deep hover:bg-green-deep/8 inline-block text-center flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
