import { User, UserType, LoginCredentials, ValidationError } from '@/types/auth'

// Storage utilities
export const authStorage = {
  setUser: (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prepguard_user', JSON.stringify(user))
    }
  },
  
  getUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('prepguard_user')
      return stored ? JSON.parse(stored) : null
    }
    return null
  },
  
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('prepguard_token', token)
    }
  },
  
  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('prepguard_token')
    }
    return null
  },
  
  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('prepguard_user')
      localStorage.removeItem('prepguard_token')
      localStorage.removeItem('prepguard_remember')
    }
  }
}

// Validation utilities
export const authValidation = {
  validateEmail: (email: string): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (!email) {
      errors.push({ field: 'email', message: 'Email is required' })
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Please enter a valid email address' })
    }
    
    return errors
  },
  
  validatePassword: (password: string): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (!password) {
      errors.push({ field: 'password', message: 'Password is required' })
    } else if (password.length < 8) {
      errors.push({ field: 'password', message: 'Password must be at least 8 characters long' })
    } else if (!/(?=.*[a-z])/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one lowercase letter' })
    } else if (!/(?=.*[A-Z])/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one uppercase letter' })
    } else if (!/(?=.*\d)/.test(password)) {
      errors.push({ field: 'password', message: 'Password must contain at least one number' })
    }
    
    return errors
  },
  
  validatePhone: (phone: string): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (!phone) {
      errors.push({ field: 'phone', message: 'Phone number is required' })
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' })
    }
    
    return errors
  },
  
  validateName: (name: string, fieldName: string): ValidationError[] => {
    const errors: ValidationError[] = []
    
    if (!name) {
      errors.push({ field: fieldName, message: `${fieldName} is required` })
    } else if (name.length < 2) {
      errors.push({ field: fieldName, message: `${fieldName} must be at least 2 characters long` })
    } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
      errors.push({ field: fieldName, message: `${fieldName} contains invalid characters` })
    }
    
    return errors
  },
  
  validateSuperadminCode: (code: string): ValidationError[] => {
    const errors: ValidationError[] = []
    const MASTER_ADMIN_CODE = 'PREPGUARD_SUPREME_ADMIN_2024_CROWN'
    
    if (!code) {
      errors.push({ field: 'adminCode', message: 'Master Admin Authorization Code is required' })
    } else if (code !== MASTER_ADMIN_CODE) {
      errors.push({ field: 'adminCode', message: 'Invalid Master Admin Authorization Code' })
    }
    
    return errors
  },
  
  validateSecurityClearance: (clearance: string): ValidationError[] => {
    const errors: ValidationError[] = []
    const SECURITY_CLEARANCE_CODE = 'LEVEL_OMEGA_CLEARANCE'
    
    if (!clearance) {
      errors.push({ field: 'securityClearance', message: 'Security Clearance Level is required' })
    } else if (clearance !== SECURITY_CLEARANCE_CODE) {
      errors.push({ field: 'securityClearance', message: 'Invalid Security Clearance Level' })
    }
    
    return errors
  }
}

// Role-based utilities
export const roleUtils = {
  getDisplayName: (userType: UserType): string => {
    switch (userType) {
      case 'patient':
        return 'Patient'
      case 'doctor':
        return 'Healthcare Provider'
      case 'admin':
        return 'Administrator'
      case 'prep_champion':
        return 'PrEP Champion'
      case 'superadmin':
        return 'Super Administrator'
      default:
        return 'User'
    }
  },
  
  getPermissions: (userType: UserType): string[] => {
    switch (userType) {
      case 'superadmin':
        return ['*']
      case 'admin':
        return ['users:read', 'users:write', 'analytics:read', 'facilities:write']
      case 'doctor':
        return ['patients:read', 'patients:write', 'appointments:write', 'medications:write']
      case 'prep_champion':
        return ['patients:read', 'appointments:read', 'education:write', 'community:write']
      case 'patient':
        return ['profile:write', 'appointments:read', 'medications:read', 'education:read']
      default:
        return []
    }
  },
  
  canAccess: (userType: UserType, resource: string, action: string): boolean => {
    const permissions = roleUtils.getPermissions(userType)
    
    if (permissions.includes('*')) return true
    
    const requiredPermission = `${resource}:${action}`
    return permissions.includes(requiredPermission)
  },
  
  getDefaultRedirect: (userType: UserType): string => {
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
        return '/patient'
      default:
        return '/auth/login'
    }
  }
}

// Session utilities
export const sessionUtils = {
  isValidSession: (): boolean => {
    const user = authStorage.getUser()
    const token = authStorage.getToken()
    
    return !!(user && token)
  },
  
  getSessionInfo: () => {
    const user = authStorage.getUser()
    const token = authStorage.getToken()
    
    return {
      user,
      token,
      isValid: !!(user && token)
    }
  },
  
  extendSession: () => {
    // In a real app, you'd refresh the token here
    // For demo purposes, we'll just update the timestamp
    const user = authStorage.getUser()
    if (user) {
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      }
      authStorage.setUser(updatedUser)
    }
  }
}

// Form utilities
export const formUtils = {
  formatPhoneNumber: (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '')
    
    // Add country code if not present
    if (cleaned.length === 9 && !cleaned.startsWith('254')) {
      return `+254${cleaned}`
    } else if (cleaned.length === 12 && cleaned.startsWith('254')) {
      return `+${cleaned}`
    }
    
    return phone
  },
  
  formatName: (name: string): string => {
    return name
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  },
  
  generateUsername: (firstName: string, lastName: string): string => {
    const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, '')
    const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, '')
    const timestamp = Date.now().toString().slice(-4)
    
    return `${cleanFirst}.${cleanLast}${timestamp}`
  }
}

// Security utilities
export const securityUtils = {
  generateSecurePassword: (): string => {
    const length = 12
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let password = ''
    
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    return password
  },
  
  maskEmail: (email: string): string => {
    const [username, domain] = email.split('@')
    if (username.length <= 2) return email
    
    const maskedUsername = username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  },
  
  maskPhone: (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length < 4) return phone
    
    const lastFour = cleaned.slice(-4)
    const masked = '*'.repeat(cleaned.length - 4) + lastFour
    
    return phone.replace(cleaned, masked)
  }
}

// Demo data utilities
export const demoUtils = {
  getDemoCredentials: () => ({
    patient: { email: 'patient@demo.com', password: 'Patient123!' },
    doctor: { email: 'doctor@demo.com', password: 'Doctor123!' },
    admin: { email: 'admin@demo.com', password: 'Admin123!' },
    prep_champion: { email: 'champion@demo.com', password: 'Champion123!' },
    superadmin: { email: 'superadmin@prepguard.com', password: 'SuperAdmin2024!' }
  }),
  
  getSuperadminCodes: () => ({
    adminCode: 'PREPGUARD_SUPREME_ADMIN_2024_CROWN',
    securityClearance: 'LEVEL_OMEGA_CLEARANCE'
  }),
  
  fillDemoData: (userType: UserType) => {
    const credentials = demoUtils.getDemoCredentials()
    return credentials[userType] || credentials.patient
  }
}

// Export all utilities
export default {
  authStorage,
  authValidation,
  roleUtils,
  sessionUtils,
  formUtils,
  securityUtils,
  demoUtils
}