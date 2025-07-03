'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, CheckCircle, Crown } from 'lucide-react'

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

export default function SuperadminRegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['bg-red-500', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-500']

  const handleEmailRegister = async () => {
    setLoading(true)
    setError('')

    // Enhanced validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields')
      setLoading(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    // Password validation
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.')
      setLoading(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // Store registration data temporarily (simulate API call)
      const registrationData = {
        email: formData.email,
        type: 'superadmin',
        registeredAt: Date.now(),
        status: 'pending_verification'
      }
      
      localStorage.setItem('superadmin_registration', JSON.stringify(registrationData))
      
      setSuccess(true)
      // Redirect to login instead of dashboard (better flow)
      setTimeout(() => router.push('/auth/superadmin/login'), 3000)
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleRegister = async () => {
    setGoogleLoading(true)
    setError('')
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setSuccess(true)
      setTimeout(() => router.push('/auth/superadmin/login'), 3000)
    } catch {
      setError('Google registration failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('') // Clear error when user starts typing
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEmailRegister()
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Created!</h1>
            <p className="text-amber-600 text-lg">Welcome to PrepGuard</p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800 font-bold">✓ Registration Complete</p>
                <p className="text-green-700 text-sm mt-1">You can now sign in to your account</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-500 mr-3"></div>
                <span className="text-gray-600">Redirecting to login...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-6 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-yellow-200/30 rounded-full blur-2xl"></div>
      </div>

      {/* Back to Home Button */}
      <Link 
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-amber-600 transition-colors z-10 bg-white/80 px-4 py-2 rounded-lg shadow-sm backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to Home</span>
      </Link>

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <Crown className="w-7 h-7 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Superadmin Register</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center animate-shake">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleRegister}
              disabled={googleLoading || loading}
              className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all shadow-sm flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-2">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <GoogleIcon />
                  <span className="ml-2">Continue with Google</span>
                </div>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Create password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex space-x-1 mb-1">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-1 w-full rounded ${
                            i < passwordStrength ? strengthColors[Math.min(passwordStrength - 1, 5)] : 'bg-gray-200'
                          } transition-colors`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600">
                      Password strength: <span className={`font-medium ${
                        passwordStrength >= 4 ? 'text-green-600' : 
                        passwordStrength >= 3 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {strengthLabels[Math.min(passwordStrength, 5)]}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    placeholder="Confirm password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-1">
                    {formData.password === formData.confirmPassword ? (
                      <p className="text-xs text-green-600 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Passwords match
                      </p>
                    ) : (
                      <p className="text-xs text-red-600">
                        Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Password Requirements */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Password requirements:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                    <span className={`w-3 h-3 rounded-full mr-2 ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className={`w-3 h-3 rounded-full mr-2 ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    One uppercase letter
                  </li>
                  <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                    <span className={`w-3 h-3 rounded-full mr-2 ${/[0-9]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    One number
                  </li>
                </ul>
              </div>

              <button
                onClick={handleEmailRegister}
                disabled={loading || googleLoading || !formData.email || !formData.password || !formData.confirmPassword || passwordStrength < 3}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-3 px-4 rounded-xl font-medium hover:from-amber-600 hover:to-yellow-600 hover:shadow-lg transition-all shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 mr-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Crown className="w-5 h-5 mr-2" fill="currentColor" />
                    <span>Create Account</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                )}
              </button>
            </div>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-2">Already have an account?</p>
              <Link 
                href="/auth/superadmin/login" 
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 Superadmin Portal • Secure Registration
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}