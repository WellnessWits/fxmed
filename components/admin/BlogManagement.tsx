'use client'

import { useState, useEffect } from 'react'

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

type BlogNavItem = "new-blog" | "drafts" | "posted"

interface BlogManagementProps {
  posts: BlogPost[]
  setPosts: (posts: BlogPost[]) => void
}

export default function BlogManagement({ posts, setPosts }: BlogManagementProps) {
  const [activeBlogSection, setActiveBlogSection] = useState<BlogNavItem>("new-blog")
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'FXMed Team',
    category: 'Health Education',
    thumbnail_url: ''
  })
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const blogNavItems = [
    { id: "new-blog", label: "New Blog" },
    { id: "drafts", label: "Drafts" },
    { id: "posted", label: "Posted Blogs" },
  ]

  const calculateReadTime = (content: string): string => {
    // Remove HTML tags if any
    const plainText = content.replace(/<[^>]*>/g, '')
    const words = plainText.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
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
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error:', errorData)
        throw new Error(errorData.error || 'Failed to create post')
      }

      const { post: data } = await response.json()

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

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault()

    const slug = formData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || Date.now().toString()

    const draftPost = {
      title: formData.title || '',
      slug: slug,
      excerpt: formData.excerpt || '',
      content: formData.content || '',
      author: formData.author || 'FXMed Team',
      category: formData.category || 'Health Education',
      thumbnail_url: formData.thumbnail_url || '',
      status: 'draft' as const,
      read_time: calculateReadTime(formData.content || '')
    }

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draftPost),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error:', errorData)
        throw new Error(errorData.error || 'Failed to save draft')
      }

      const { post: data } = await response.json()

      setPosts([data, ...posts])

      setFormData({
        title: '',
        excerpt: '',
        content: '',
        author: 'FXMed Team',
        category: 'Health Education',
        thumbnail_url: ''
      })

      alert('Draft saved successfully!')
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Error saving draft. Please try again.')
    }
  }

  const handleEditDraft = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      thumbnail_url: post.thumbnail_url
    })
    setActiveBlogSection("new-blog")
  }

  const handlePublishDraft = async (post: BlogPost) => {
    try {
      const response = await fetch('/api/blog', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post.id, status: 'published' }),
      })

      if (!response.ok) throw new Error('Failed to publish draft')

      const { post: updatedPost } = await response.json()
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p))
      alert('Draft published successfully!')
    } catch (error) {
      console.error('Error publishing draft:', error)
      alert('Error publishing draft. Please try again.')
    }
  }

  const handleDelete = async (post: BlogPost) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/blog?id=${post.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete post')

      setPosts(posts.filter(p => p.id !== post.id))
      alert('Post deleted successfully!')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post. Please try again.')
    }
  }

  const drafts = posts.filter(post => post.status === 'draft')
  const publishedPosts = posts.filter(post => post.status === 'published')

  return (
    <div className="space-y-6">
      {/* Blog Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {blogNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveBlogSection(item.id as BlogNavItem)}
            className={`px-4 py-2 rounded-lg font-dm-sans text-sm font-medium transition-colors ${
              activeBlogSection === item.id
                ? 'bg-green-deep text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeBlogSection === "new-blog" && (
        <div className="bg-white rounded-[20px] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-dm-sans font-bold text-green-deep">
                {editingPost ? 'Edit Draft' : 'Create New Blog Post'}
              </h2>
              <p className="text-text-mid mt-1">
                {editingPost ? 'Update your draft post' : 'Write and publish engaging health education content'}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 bg-gold text-green-deep rounded-[12px] font-dm-sans font-semibold text-sm hover:bg-gold-light transition-colors shadow-sm"
              >
                Save to Drafts
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-deep text-white rounded-[12px] font-dm-sans font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm"
              >
                {editingPost ? 'Update Draft' : 'Publish Now'}
              </button>
            </div>
          </div>

          <form onSubmit={editingPost ? handleSaveDraft : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                    placeholder="Enter blog post title"
                    required
                  />
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Author</label>
                  <input
                    type="text"
                    value={formData.author || ''}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Category</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                  >
                    <option>Health Education</option>
                    <option>Preventive Care</option>
                    <option>Nutrition</option>
                    <option>Mental Health</option>
                    <option>Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={formData.thumbnail_url || ''}
                    onChange={(e) => setFormData({...formData, thumbnail_url: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Excerpt</label>
                  <textarea
                    value={formData.excerpt || ''}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                    placeholder="Brief description of the post"
                  />
                </div>

                <div>
                  <label className="block font-dm-sans font-medium text-green-deep mb-2">Content</label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={10}
                    className="w-full px-3 py-2 rounded-lg border border-green-deep/20 focus:outline-none focus:border-gold"
                    placeholder="Write your blog post content here..."
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {activeBlogSection === "drafts" && (
        <div className="bg-white rounded-[20px] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-dm-sans font-bold text-green-deep">
                Draft Posts
              </h2>
              <p className="text-text-mid mt-1">
                Manage your saved drafts
              </p>
            </div>
            <button
              onClick={() => setActiveBlogSection("new-blog")}
              className="px-4 py-2 bg-green-deep text-white rounded-[12px] font-dm-sans font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm"
            >
              + New Post
            </button>
          </div>

          {drafts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-dm-sans">No drafts yet. Start writing!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {drafts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-gold/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-dm-sans font-semibold text-green-deep mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 font-dm-sans mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{post.category}</span>
                        <span>{post.read_time}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditDraft(post)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded font-dm-sans hover:bg-blue-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handlePublishDraft(post)}
                        className="px-3 py-1 bg-green-deep text-white text-sm rounded font-dm-sans hover:bg-green-700 transition-colors"
                      >
                        Publish
                      </button>
                      <button
                        onClick={() => handleDelete(post)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded font-dm-sans hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeBlogSection === "posted" && (
        <div className="bg-white rounded-[20px] p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-dm-sans font-bold text-green-deep">
                Published Posts
              </h2>
              <p className="text-text-mid mt-1">
                Manage your live blog posts
              </p>
            </div>
          </div>

          {publishedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-dm-sans">No published posts yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {publishedPosts.map((post) => (
                <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:border-gold/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-dm-sans font-semibold text-green-deep mb-1">{post.title}</h3>
                      <p className="text-sm text-gray-600 font-dm-sans mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{post.category}</span>
                        <span>{post.read_time}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(post)}
                        className="px-3 py-1 bg-red-500 text-white text-sm rounded font-dm-sans hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
