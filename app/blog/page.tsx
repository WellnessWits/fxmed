'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState, useMemo, useEffect } from 'react'
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
  read_time: string
  created_at: string
}

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setBlogPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Health Education': 'bg-blue-500 text-white',
      'Preventive Medicine': 'bg-purple-500 text-white',
      'Nutrition': 'bg-orange-500 text-white',
      'Functional Medicine': 'bg-green-500 text-white',
      'Mobile Health': 'bg-red-500 text-white',
      'Hormonal Health': 'bg-pink-500 text-white'
    }
    return colors[category] || 'bg-gray-500 text-white'
  }

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(blogPosts.map(post => post.category)))
    const cats = ['all', ...uniqueCategories]
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
      <section className="pt-[180px] px-[5%]">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search Bar */}
              <div className="lg:col-span-2">
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
              <div className="lg:col-span-1">
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
                  {/* Thumbnail Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.thumbnail_url || '/blog/default.jpg'} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.currentTarget
                        const parent = target.parentElement
                        if (parent) {
                          target.style.display = 'none'
                          parent.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-green-deep/10 to-green-mid/10 flex items-center justify-center">
                              <div class="text-6xl">📝</div>
                            </div>
                          `
                        }
                      }}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                    
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
