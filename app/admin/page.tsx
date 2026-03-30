'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  thumbnail: string
}

export default function AdminPanel() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'blog' | 'crm'>('blog')
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'FXMed Team',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    category: 'Health Education',
    thumbnail: ''
  })

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem('blogPosts')
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts))
      }
    } catch (error) {
      console.error('Error loading posts:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string
        setFormData(prev => ({ ...prev, thumbnail: dataUrl }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newPost: BlogPost = {
      id: formData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now().toString(),
      title: formData.title || '',
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      author: formData.author || 'FXMed Team',
      date: formData.date || new Date().toISOString().split('T')[0],
      readTime: formData.readTime || '5 min read',
      category: formData.category || 'Health Education',
      thumbnail: formData.thumbnail || ''
    }

    const updatedPosts = [...posts, newPost]
    setPosts(updatedPosts)
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
    
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'FXMed Team',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      category: 'Health Education',
      thumbnail: ''
    })

    alert('Blog post created successfully!')
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(post => post.id !== id)
      setPosts(updatedPosts)
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
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
      <header className="bg-white shadow-sm border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-[5%] py-[18px]">
          <div className="flex items-center justify-between">
            <h1 className="font-dm-sans font-bold text-green-deep text-[clamp(1.5rem,4vw,2.5rem)]">Admin Panel</h1>
            <Link 
              href="/blog" 
              className="font-dm-sans bg-gold text-green-deep px-6 py-[10px] rounded-[30px] font-semibold text-[0.88rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px]"
            >
              View Blog
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-[5%] py-[40px]">
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
                </div>
              
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
                        Date
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dm-sans font-semibold text-green-deep mb-2">
                        Read Time
                      </label>
                      <input
                        type="text"
                        value={formData.readTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                        className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                        placeholder="5 min read"
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
                      {formData.thumbnail && (
                        <div className="mt-3">
                          <img 
                            src={formData.thumbnail} 
                            alt="Thumbnail preview" 
                            className="h-20 w-20 object-cover rounded-[12px]"
                          />
                        </div>
                      )}
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

                  <div>
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-gold text-green-deep px-8 py-[12px] rounded-[30px] font-dm-sans font-semibold text-[0.95rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-1px] shadow-md"
                    >
                      Create Blog Post
                    </button>
                  </div>
                </form>

                <div className="mt-10 pt-6 border-t border-green-deep/10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-dm-sans font-semibold text-green-deep">
                        Existing Posts ({posts.length})
                      </h3>
                      <p className="text-sm text-text-mid mt-1">
                        Manage your published content
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
                            <p><span className="font-semibold">Date:</span> {post.date}</p>
                            <p><span className="font-semibold">Author:</span> {post.author}</p>
                            <p><span className="font-semibold">Read Time:</span> {post.readTime}</p>
                          </div>
                          
                          {post.thumbnail && (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title} 
                              className="w-full h-24 object-cover rounded-[12px] mt-3"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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
                      Manage patients and appointments
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-green-deep/10 rounded-[16px] p-6">
                    <h4 className="font-dm-sans font-semibold text-green-deep mb-4">Quick Stats</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center bg-white rounded-lg p-3">
                        <span className="text-text-mid font-dm-sans">Total Patients</span>
                        <span className="text-green-deep font-bold text-xl font-dm-sans">248</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded-lg p-3">
                        <span className="text-text-mid font-dm-sans">Active Appointments</span>
                        <span className="text-green-deep font-bold text-xl font-dm-sans">12</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded-lg p-3">
                        <span className="text-text-mid font-dm-sans">This Month</span>
                        <span className="text-green-deep font-bold text-xl font-dm-sans">8</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-[16px] p-6 border border-green-deep/20 shadow-sm">
                    <h4 className="font-dm-sans font-semibold text-green-deep mb-4">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-text-mid font-dm-sans text-sm">New patient: John Doe</span>
                        <span className="text-xs text-gray-500 font-dm-sans">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-text-mid font-dm-sans text-sm">Appointment: Lab Results</span>
                        <span className="text-xs text-gray-500 font-dm-sans">Today</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-text-mid font-dm-sans text-sm">Payment: $250</span>
                        <span className="text-xs text-green-deep font-semibold font-dm-sans">Completed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-[16px] p-6 border border-green-deep/20 shadow-sm md:col-span-2 lg:col-span-1">
                    <h4 className="font-dm-sans font-semibold text-green-deep mb-4">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full bg-gold text-green-deep px-4 py-3 rounded-[12px] font-dm-sans font-semibold text-[0.9rem] hover:bg-gold-light transition-colors shadow-sm">
                        Schedule Appointment
                      </button>
                      <button className="w-full bg-white border-2 border-green-deep text-green-deep px-4 py-3 rounded-[12px] font-dm-sans font-semibold text-[0.9rem] hover:bg-green-deep/10 transition-colors">
                        Add Patient
                      </button>
                      <button className="w-full bg-white border-2 border-green-deep text-green-deep px-4 py-3 rounded-[12px] font-dm-sans font-semibold text-[0.9rem] hover:bg-green-deep/10 transition-colors">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
