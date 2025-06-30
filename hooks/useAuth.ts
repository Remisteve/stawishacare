'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LoginCredentials, 
  RegisterData, 
  SuperadminRegisterData,
  User, 
  AuthState,
  DEMO_CREDENTIALS,
  DEMO_USERS,
  UserType 
} from '@/types/auth'

// Storage keys
const STORAGE_KEYS = {
  USER: 'prepguard_user',
  TOKEN: 'prepguard_token',
  REMEMBER: 'prepguard_remember'
} as const

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  })
  
  const router = useRouter()

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
      const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN)
      
      if (storedUser && storedToken) {
        const user = JSON.parse(storedUser)
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }))
      }
    } catch (error) {
      console.error('Error loading auth state:', error)
      setAuthState(prev => ({ ...prev, isLoading: false }))
    }
  }, [])

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Check credentials against demo users
      let authenticatedUser: User | null = null
      let userType: UserType | null = null

      Object.entries(DEMO_CREDENTIALS).forEach(([type, creds]) => {
        if (credentials.email === creds.email && credentials.password === creds.password) {
          userType = type as UserType
          authenticatedUser = DEMO_USERS[userType]
        }
      })

      if (authenticatedUser && userType) {
        // Generate mock token
        const token = `mock_token_${Date.now()}_${userType}`

        // Update auth state
        setAuthState({
          user: authenticatedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
        })

        // Store in localStorage
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authenticatedUser))
        localStorage.setItem(STORAGE_KEYS.TOKEN, token)
        
        if (credentials.rememberMe) {
          localStorage.setItem(STORAGE_KEYS.REMEMBER, 'true')
        }

        // Redirect based on user type
        const redirectPath = getRedirectPath(userType)
        router.push(redirectPath)
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      }))
    }
  }, [router])

  // Register function
  const register = useCallback(async (data: RegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      // Validate password strength
      if (data.password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }

      // Check if email already exists
      const existingUser = Object.values(DEMO_USERS).find(user => user.email === data.email)
      if (existingUser) {
        throw new Error('Email already registered')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        fullName: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        userType: data.userType,
        organization: data.organization,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'pending_verification'
      }

      setAuthState(prev => ({ ...prev, isLoading: false, error: null }))

      // In a real app, you'd redirect to email verification
      // For demo, we'll just redirect to login
      router.push('/auth/login?registered=true')
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }))
    }
  }, [router])

  // Superadmin register function
  const superadminRegister = useCallback(async (data: SuperadminRegisterData) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Validate superadmin codes
      const MASTER_ADMIN_CODE = 'PREPGUARD_SUPREME_ADMIN_2024_CROWN'
      const SECURITY_CLEARANCE_CODE = 'LEVEL_OMEGA_CLEARANCE'

      if (data.adminCode !== MASTER_ADMIN_CODE) {
        throw new Error('Invalid Master Admin Authorization Code')
      }

      if (data.securityClearance !== SECURITY_CLEARANCE_CODE) {
        throw new Error('Invalid Security Clearance Level')
      }

      if (data.password !== data.confirmPassword) {
        throw new Error('Master passwords do not match')
      }

      if (data.password.length < 12) {
        throw new Error('Master password must be at least 12 characters')
      }

      if (!data.email.includes('prepguard.com')) {
        throw new Error('Only authorized PrepGuard domain emails permitted')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000))

      setAuthState(prev => ({ ...prev, isLoading: false, error: null }))
      router.push('/auth/superadmin/login?registered=true')
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed'
      }))
    }
  }, [router])

  // Logout function
  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    })

    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REMEMBER)

    router.push('/auth/login')
  }, [router])

  // Forgot password function
  const forgotPassword = useCallback(async (email: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Check if email exists
      const userExists = Object.values(DEMO_USERS).some(user => user.email === email)
      
      if (!userExists) {
        // Don't reveal if email exists for security
        // Just pretend we sent the email
      }

      setAuthState(prev => ({ ...prev, isLoading: false, error: null }))
      return Promise.resolve()
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to send reset email'
      }))
      return Promise.reject(error)
    }
  }, [])

  // Reset password function
  const resetPassword = useCallback(async (token: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // In a real app, you'd validate the token here
      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long')
      }

      setAuthState(prev => ({ ...prev, isLoading: false, error: null }))
      router.push('/auth/login?reset=true')
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Password reset failed'
      }))
    }
  }, [router])

  // Clear error function
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }))
  }, [])

  // Update profile function
  const updateProfile = useCallback(async (data: Partial<User>) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      if (!authState.user) {
        throw new Error('No authenticated user')
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const updatedUser = {
        ...authState.user,
        ...data,
        updatedAt: new Date().toISOString()
      }

      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
        error: null
      }))

      // Update localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Profile update failed'
      }))
    }
  }, [authState.user])

  // Check if user has permission
  const hasPermission = useCallback((resource: string, action: string): boolean => {
    if (!authState.user) return false
    
    // Superadmin has all permissions
    if (authState.user.userType === 'superadmin') return true
    
    // Add more permission logic here based on USER_PERMISSIONS
    return true // Simplified for demo
  }, [authState.user])

  return {
    ...authState,
    login,
    register,
    superadminRegister,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
    updateProfile,
    hasPermission
  }
}

// Helper function to determine redirect path based on user type
function getRedirectPath(userType: UserType): string {
  switch (userType) {
    case 'superadmin':
      return '/superadmin'
    case 'admin':
      return '/admin'
    case 'doctor':
      return '/doctor'
    case 'prep_champion':
      return '/prep-champion'
    case 'patient':
    default:
      return '/patient'
  }
}