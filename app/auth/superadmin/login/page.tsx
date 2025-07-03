'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
// Removed unused Badge import
import { 
  Crown,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Shield,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })

  // Dummy user database
  const dummyUsers = [
    { email: 'otzplans@gmail.com', password: 'root', name: 'OTZ Plans Admin', role: 'admin' },
    { email: 'demo@example.com', password: 'demo123', name: 'Demo User', role: 'user' },
    { email: 'health@prep.ke', password: 'health123', name: 'Health Provider', role: 'provider' },
    { email: 'admin@chap.ke', password: 'admin123', name: 'CHAP Admin', role: 'admin' }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Check credentials
    const user = dummyUsers.find(
      u => u.email.toLowerCase() === loginForm.email.toLowerCase() && 
           u.password === loginForm.password
    )

    if (user) {
      setSuccess('Login successful! Redirecting...')
      localStorage.setItem('user_token', JSON.stringify(user))
      
      setTimeout(() => {
        if (user.role === 'admin') {
          router.push('/auth/superadmin/dashboard')
        } else {
          router.push('/dashboard')
        }
      }, 1000)
    } else {
      setError('Invalid email or password. Try: otzplans@gmail.com / root')
    }
    
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)
    setError('')
    
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Auto-login with otzplans account for demo
    const user = dummyUsers[0] // otzplans@gmail.com
    setSuccess('✅ Google login successful! Redirecting to SUPERADMIN...')
    localStorage.setItem('user_token', JSON.stringify(user))
    
    // IMMEDIATE REDIRECT - NO DELAY
    console.log('🚀 GOOGLE SUPERADMIN LOGIN - REDIRECTING TO: /superadmin')
    console.log('🔍 Current URL:', window.location.href)
    console.log('👑 Superadmin authenticated via Google:', user.email)
    
    setIsGoogleLoading(false)
    
    // Immediate redirect to superadmin dashboard
    window.location.replace('/superadmin')
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-emerald-200/20 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Demo Credentials Helper */}
      <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-200 shadow-lg z-20 max-w-xs">
        <h4 className="text-xs font-bold text-gray-800 mb-1">Demo:</h4>
        <div className="text-xs space-y-1 text-gray-600">
          <div>otzplans@gmail.com / root</div>
        </div>
      </div>

      {/* Main Auth Card */}
      <Card className="w-full max-w-lg relative z-10 bg-white shadow-2xl border border-gray-200">
        <CardHeader className="text-center space-y-4 pb-6">
          {/* Golden Crown Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl">
            <Crown className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-gray-600">
              Access your portal
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r-lg">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                <p className="text-emerald-700 text-sm">{success}</p>
              </div>
            </div>
          )}

          {/* Google Login Button */}
          <Button 
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div className="flex items-center justify-center">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </div>
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  placeholder="Enter your email"
                  className="h-10 pl-10"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Enter your password"
                  className="h-10 pl-10 pr-10"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-10 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Shield className="mr-2 h-4 w-4" />
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600 mb-3 text-sm">
              Don't have an account?
            </p>
            <Button
              onClick={() => {
                // Redirect to sign up page
                window.location.href = '/auth/register'
              }}
              variant="outline"
              className="px-6 py-2 text-sm font-medium hover:bg-gray-50 transition-all duration-300"
            >
              Create New Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}