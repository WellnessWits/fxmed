'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // For now, use a simple hardcoded check
      // In production, this should use Supabase Auth or similar
      const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@fxmed.com'
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'fxmed123'

      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set session in localStorage
        localStorage.setItem('admin_session', 'true')
        localStorage.setItem('admin_login_time', new Date().toISOString())
        
        // Redirect to admin dashboard
        router.push('/admin')
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src="/logo.png" 
            alt="FXMed" 
            className="h-[100px] w-auto mx-auto mb-4"
          />
          <h1 className="font-dm-sans font-bold text-green-deep text-[2rem] mb-2">
            Admin Login
          </h1>
          <p className="font-dm-sans text-text-mid text-[1rem]">
            Access the FXMed management dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-[24px] p-8 shadow-custom">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-[12px] p-4 mb-6">
              <p className="font-dm-sans text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-dm-sans font-semibold text-green-deep mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[12px] font-dm-sans focus:outline-none focus:ring-2 focus:ring-green-mid focus:border-transparent"
                placeholder="admin@fxmed.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-dm-sans font-semibold text-green-deep mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-[12px] font-dm-sans focus:outline-none focus:ring-2 focus:ring-green-mid focus:border-transparent"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-green-deep px-6 py-4 rounded-[50px] font-dm-sans font-bold text-[1rem] transition-all hover:bg-gold-light hover:transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="font-dm-sans text-text-mid text-sm">
              Forgot your password? Contact the system administrator.
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <a 
            href="/"
            className="font-dm-sans text-green-deep font-medium text-sm hover:text-green-mid transition-colors no-underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
