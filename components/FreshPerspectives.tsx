'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type BlogPost = {
  id: string
  title: string
  excerpt: string | null
  content: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
  slug: string
}

const defaultPosts = [
  {
    id: '1',
    title: 'Understanding Your Lab Results',
    excerpt: 'Learn how to interpret your blood work and make informed health decisions based on evidence-based medicine.',
    icon: '🩺',
    readTime: '5 min read',
    slug: 'understanding-lab-results'
  },
  {
    id: '2',
    title: 'Preventive Care Strategies',
    excerpt: 'Discover proactive approaches to maintain optimal health and prevent chronic conditions before they develop.',
    icon: '💊',
    readTime: '8 min read',
    slug: 'preventive-care-strategies'
  },
  {
    id: '3',
    title: 'Nutrition for Mental Wellness',
    excerpt: 'Explore the connection between diet and mental health, with practical tips for improving both through functional nutrition.',
    icon: '🧠',
    readTime: '6 min read',
    slug: 'nutrition-mental-wellness'
  }
]

export default function FreshPerspectives() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?limit=3&status=published')
        if (!response.ok) throw new Error('Failed to fetch posts')
        
        const data = await response.json()
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 3))
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('Failed to load latest articles')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  const getExcerpt = (post: BlogPost) => {
    if (post.excerpt) return post.excerpt
    // Strip HTML tags and get first 150 characters
    const text = post.content.replace(/<[^>]*>/g, '')
    return text.substring(0, 150) + (text.length > 150 ? '...' : '')
  }

  const getIcon = (index: number) => {
    const icons = ['🩺', '💊', '🧠', '🌿', '💪', '🥗']
    return icons[index % icons.length]
  }

  const displayPosts = posts.length > 0 ? posts : defaultPosts

  return (
    <section id="fresh-perspectives" className="bg-[#FCFFF0] py-[90px] px-[5%]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block text-green-mid bg-green-mid/10 px-4 py-1.5 rounded-[20px] text-[0.75rem] font-dm-sans font-semibold tracking-[0.14em] uppercase mb-4">
              Fresh Perspectives
            </div>
            <h2 className="font-dm-sans font-bold text-green-deep text-[clamp(2rem,4vw,3rem)] leading-[1.15] mb-4">
              Health insights you<br/>can act on today
            </h2>
            <p className="font-dm-sans text-text-mid text-[1.05rem] leading-[1.7] mb-8">
              Evidence-based articles from the FXMed team — because informed patients heal faster.
            </p>

            {/* Blog Posts */}
            <div className="space-y-6 mb-8">
              {loading ? (
                // Loading state
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm animate-pulse">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-gray-200 rounded mr-4"></div>
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : posts.length > 0 ? (
                // Real posts from API
                posts.map((post, index) => (
                  <Link 
                    key={post.id} 
                    href={`/blog/${post.slug}`}
                    className="block bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="text-2xl mr-4">{getIcon(index)}</div>
                      <div>
                        <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2 hover:text-green-mid transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-dm-sans text-text-mid text-[0.9rem] leading-[1.6] mb-2">
                          {getExcerpt(post)}
                        </p>
                        <div className="text-green-mid text-[0.85rem] font-medium">
                          {getReadTime(post.content)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                // Default fallback posts
                defaultPosts.map((post, index) => (
                  <Link 
                    key={post.id} 
                    href="/blog"
                    className="block bg-white rounded-[16px] p-6 border border-green-deep/8 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="text-2xl mr-4">{post.icon}</div>
                      <div>
                        <h3 className="font-dm-sans font-semibold text-green-deep text-[1.1rem] mb-2 hover:text-green-mid transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-dm-sans text-text-mid text-[0.9rem] leading-[1.6] mb-2">
                          {post.excerpt}
                        </p>
                        <div className="text-green-mid text-[0.85rem] font-medium">
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* CTA Button */}
            <Link href="/blog" className="font-dm-sans bg-gold text-green-deep px-8 py-4 rounded-[50px] font-semibold text-[1rem] no-underline transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg inline-block">
              Read All Articles →
            </Link>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="order-first lg:order-last">
            <div className="relative rounded-[20px] overflow-hidden shadow-2xl bg-white min-h-[500px] flex items-center justify-center">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🌿</div>
                <h3 className="font-dm-sans font-bold text-green-deep text-[1.5rem] mb-2">
                  Health Articles
                </h3>
                <p className="font-dm-sans text-text-mid text-[1rem]">
                  Expert insights and evidence-based content
                </p>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-deep/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
