'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useMemo } from 'react'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const blogPosts = [
    {
      id: 'understanding-lab-results',
      title: 'Understanding Your Lab Results',
      excerpt: 'Learn how to interpret your blood work and make informed health decisions based on evidence-based medicine.',
      content: 'Learn how to interpret your blood work and make informed health decisions based on evidence-based medicine.',
      author: 'FXMed Team',
      date: '2024-03-15',
      readTime: '5 min read',
      category: 'Health Education',
      emoji: '🩺'
    },
    {
      id: 'preventive-care-strategies',
      title: 'Preventive Care Strategies',
      excerpt: 'Discover proactive approaches to maintain optimal health and prevent chronic conditions before they develop.',
      content: 'Discover proactive approaches to maintain optimal health and prevent chronic conditions before they develop.',
      author: 'FXMed Team',
      date: '2024-03-10',
      readTime: '8 min read',
      category: 'Preventive Medicine',
      emoji: '💊'
    },
    {
      id: 'nutrition-mental-wellness',
      title: 'Nutrition for Mental Wellness',
      excerpt: 'Explore the connection between diet and mental health, with practical tips for improving both through functional nutrition.',
      content: 'Explore the connection between diet and mental health, with practical tips for improving both through functional nutrition.',
      author: 'FXMed Team',
      date: '2024-03-05',
      readTime: '6 min read',
      category: 'Nutrition',
      emoji: '🧠'
    },
    {
      id: 'functional-medicine-basics',
      title: 'Functional Medicine Basics',
      excerpt: 'Understanding the core principles of functional medicine and how it differs from conventional medicine.',
      content: 'Understanding the core principles of functional medicine and how it differs from conventional medicine.',
      author: 'Dr. Kike Oduba',
      date: '2024-02-28',
      readTime: '10 min read',
      category: 'Functional Medicine',
      emoji: '🌿'
    },
    {
      id: 'mobile-healthcare-benefits',
      title: 'Mobile Healthcare Benefits',
      excerpt: 'How mobile healthcare services are revolutionizing patient care and improving health outcomes.',
      content: 'How mobile healthcare services are revolutionizing patient care and improving health outcomes.',
      author: 'FXMed Team',
      date: '2024-02-20',
      readTime: '7 min read',
      category: 'Mobile Health',
      emoji: '🚑'
    },
    {
      id: 'hormonal-balance-tips',
      title: 'Achieving Hormonal Balance',
      excerpt: 'Natural approaches to balancing hormones for better health, energy, and wellbeing.',
      content: 'Natural approaches to balancing hormones for better health, energy, and wellbeing.',
      author: 'Dr. Oladele Isaac',
      date: '2024-02-15',
      readTime: '9 min read',
      category: 'Hormonal Health',
      emoji: '⚖️'
    }
  ]

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(blogPosts.map(post => post.category))]
    return cats
  }, [blogPosts])

  // Filter posts based on search term and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, blogPosts])

  return (
    <main className="min-h-screen bg-[#FCFFF0]">
      <Navigation />
      
      {/* Blog Header */}
      <section className="py-[90px] px-[5%]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-4">
            Fresh Perspectives
          </div>
          <h1 className="font-dm-sans font-bold text-green-deep text-[clamp(2.5rem,5vw,4rem)] leading-[1.1] mb-6">
            Health insights you<br/>can act on today
          </h1>
          <p className="font-dm-sans text-text-mid text-[1.2rem] leading-[1.7] max-w-[600px] mx-auto">
            Evidence-based articles from the FXMed team — because informed patients heal faster.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-[40px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[20px] p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search Bar */}
              <div>
                <label htmlFor="search" className="block font-dm-sans font-semibold text-green-deep mb-2">
                  Search Articles
                </label>
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Search by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-mid" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label htmlFor="category" className="block font-dm-sans font-semibold text-green-deep mb-2">
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-[12px] font-dm-sans text-[1rem] border-2 border-green-deep/20 focus:outline-none focus:border-gold transition-colors"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="mt-4 flex flex-wrap gap-2">
                {searchTerm && (
                  <div className="inline-flex items-center gap-2 bg-gold/20 text-green-deep px-3 py-1 rounded-full text-sm font-medium">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-green-deep hover:text-green-mid transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                {selectedCategory !== 'all' && (
                  <div className="inline-flex items-center gap-2 bg-gold/20 text-green-deep px-3 py-1 rounded-full text-sm font-medium">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-green-deep hover:text-green-mid transition-colors"
                    >
                      ×
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('all')
                  }}
                  className="text-green-mid hover:text-green-deep text-sm font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Results Count */}
            <div className="mt-4 text-text-mid font-dm-sans">
              Showing {filteredPosts.length} of {blogPosts.length} articles
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-[60px] px-[5%]">
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-[20px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Post Header */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="text-3xl mr-3">{post.emoji}</div>
                      <div>
                        <span className="inline-block text-green-mid text-[0.8rem] font-medium mb-1">
                          {post.category}
                        </span>
                        <div className="text-text-mid text-[0.85rem]">
                          {post.date} • {post.readTime}
                        </div>
                      </div>
                    </div>
                    
                    <h2 className="font-dm-sans font-bold text-green-deep text-[1.3rem] leading-[1.3] mb-3">
                      {post.title}
                    </h2>
                    
                    <p className="font-dm-sans text-text-mid text-[1rem] leading-[1.6] mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-text-mid text-[0.9rem] font-medium">
                        By {post.author}
                      </span>
                      <Link 
                        href={`/blog/${post.id}`}
                        className="font-dm-sans text-gold text-green-deep font-semibold text-[0.95rem] no-underline hover:text-green-mid transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-dm-sans font-bold text-green-deep text-[1.5rem] mb-2">
                No articles found
              </h3>
              <p className="font-dm-sans text-text-mid text-[1.1rem] mb-6">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                }}
                className="font-dm-sans bg-gold text-green-deep px-6 py-3 rounded-[50px] font-semibold text-[0.95rem] transition-all hover:bg-gold-light"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-green-deep py-[80px] px-[5%]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-dm-sans font-bold text-white text-[clamp(1.8rem,4vw,2.5rem)] leading-[1.2] mb-4">
            Stay Updated with Health Insights
          </h2>
          <p className="font-dm-sans text-cream/80 text-[1.1rem] leading-[1.7] mb-8">
            Get the latest articles and health tips delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-[50px] font-dm-sans text-[1rem] border-2 border-gold focus:outline-none focus:border-gold-light"
            />
            <button className="font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px]">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
