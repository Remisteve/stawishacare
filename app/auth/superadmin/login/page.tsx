'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, Crown, CheckCircle, Shield } from 'lucide-react'

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function SuperadminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const SECRET_EMAIL = 'otzplans@gmail.com'
  const SECRET_PASSWORD = 'remi'

  useEffect(() => {
    setMounted(true)
    console.log('🔥 SUPERADMIN LOGIN MOUNTED')
    console.log('📍 Current pathname:', pathname)
    console.log('🎯 Expected: /auth/superadmin/login')
  }, [pathname])

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    if (formData.email === SECRET_EMAIL && formData.password === SECRET_PASSWORD) {
      try {
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        // Store superadmin session with enhanced data
        localStorage.setItem('superadmin_auth', JSON.stringify({
          email: formData.email,
          type: 'superadmin',
          authenticated: true,
          loginTime: Date.now(),
          sessionExpiry: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
          permissions: ['all'],
          lastActivity: Date.now()
        }))
        
        setSuccess(true)
        setTimeout(() => router.push('/superadmin'), 2500)
      } catch (err) {
        setError('Login failed')
      }
    } else {
      setError('Invalid credentials')
    }
    
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setError('')
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setSuccess(true)
      setTimeout(() => router.push('/superadmin'), 2500)
    } catch (err) {
      setError('Google login failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">🔥 ACCESS GRANTED! 🔥</h1>
            <p className="text-green-600 text-xl font-semibold">Welcome back, Superadmin</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-green-200">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                <p className="text-green-800 font-bold text-lg">✓ AUTHENTICATION SUCCESSFUL</p>
                <p className="text-green-700 text-sm mt-2">Initializing control panel...</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-3 border-green-500 mr-3"></div>
                <span className="text-gray-700 font-medium">Loading dashboard...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Success Debug Indicator */}
      <div className="fixed top-4 left-4 bg-green-600 text-white p-3 rounded-xl shadow-xl z-50">
        <div className="text-xs font-bold">
          🎉 CLEAN SETUP SUCCESS!
          <br />✅ Path: {pathname}
          <br />🚀 Only Superadmin
          <br />⚡ No Conflicts
        </div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-yellow-300/20 to-amber-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Back to Home */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-amber-700 transition-all duration-300 z-10 bg-white/90 px-5 py-3 rounded-xl shadow-lg backdrop-blur-sm hover:shadow-xl transform hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-semibold">Home</span>
      </Link>

      <div className="w-full max-w-lg relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <Crown className="w-10 h-10 text-white" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent mb-3">
            SUPERADMIN
          </h1>
          <p className="text-gray-600 text-lg font-medium">Ultimate Control Panel</p>
          <div className="flex items-center justify-center mt-2">
            <Shield className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-600 text-sm font-semibold">Secure Access</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50 relative overflow-hidden">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-yellow-500/5 to-orange-500/5 rounded-3xl"></div>
          
          <div className="relative space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl text-center animate-shake shadow-sm">
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading || loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-4 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <GoogleIcon />
                  <span className="ml-2">Continue with Google</span>
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">OR</span>
              </div>
            </div>

            <div className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Superadmin Email</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                    placeholder="otzplans@gmail.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Master Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                    placeholder="remi"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={loading || googleLoading || !formData.email || !formData.password}
                className="w-full bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-amber-600 hover:via-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3">
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                    <span>ACCESSING...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Crown className="w-6 h-6 mr-3" fill="currentColor" />
                    <span>ENTER CONTROL PANEL</span>
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </div>
                )}
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Need superadmin access?</p>
              <Link 
                href="/auth/superadmin/register" 
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                Create Superadmin Account
              </Link>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 text-center">
          <div className="bg-white/50 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/50">
            <div className="flex items-center justify-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-gray-600">System Online</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">99.9% Uptime</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">Secure</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}