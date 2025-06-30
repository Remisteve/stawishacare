export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  phone: string
  userType: UserType
  organization?: string
  avatar?: string
  verified: boolean
  createdAt: string
  updatedAt: string
  lastLogin?: string
  status: UserStatus
}

export type UserType = 
  | 'patient' 
  | 'doctor' 
  | 'admin' 
  | 'prep_champion' 
  | 'superadmin'

export type UserStatus = 
  | 'active' 
  | 'inactive' 
  | 'suspended' 
  | 'pending_verification'

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  userType: UserType
  organization?: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

export interface SuperadminRegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  password: string
  confirmPassword: string
  adminCode: string
  securityClearance: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  superadminRegister: (data: SuperadminRegisterData) => Promise<void>
  logout: () => void
  forgotPassword: (email: string) => Promise<void>
  resetPassword: (token: string, password: string) => Promise<void>
  clearError: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

export interface DemoCredentials {
  patient: LoginCredentials
  doctor: LoginCredentials
  admin: LoginCredentials
  prep_champion: LoginCredentials
  superadmin: LoginCredentials
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
  error?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  password: string
  confirmPassword: string
}

export interface ProfileUpdateData {
  firstName?: string
  lastName?: string
  phone?: string
  organization?: string
  avatar?: string
}

// Role-based permissions
export interface Permission {
  resource: string
  actions: string[]
}

export interface RolePermissions {
  [key: string]: Permission[]
}

export const USER_PERMISSIONS: RolePermissions = {
  superadmin: [
    { resource: '*', actions: ['*'] }
  ],
  admin: [
    { resource: 'users', actions: ['read', 'create', 'update'] },
    { resource: 'appointments', actions: ['read', 'create', 'update', 'delete'] },
    { resource: 'facilities', actions: ['read', 'create', 'update'] },
    { resource: 'analytics', actions: ['read'] }
  ],
  doctor: [
    { resource: 'patients', actions: ['read', 'update'] },
    { resource: 'appointments', actions: ['read', 'create', 'update'] },
    { resource: 'medications', actions: ['read', 'create', 'update'] },
    { resource: 'analytics', actions: ['read'] }
  ],
  prep_champion: [
    { resource: 'patients', actions: ['read'] },
    { resource: 'appointments', actions: ['read', 'create'] },
    { resource: 'education', actions: ['read', 'create', 'update'] },
    { resource: 'community', actions: ['read', 'create', 'update'] }
  ],
  patient: [
    { resource: 'profile', actions: ['read', 'update'] },
    { resource: 'appointments', actions: ['read', 'create'] },
    { resource: 'medications', actions: ['read'] },
    { resource: 'education', actions: ['read'] }
  ]
}

// Validation schemas
export interface ValidationError {
  field: string
  message: string
}

export interface FormValidation {
  isValid: boolean
  errors: ValidationError[]
}

// Demo/Development constants
export const DEMO_USERS: Record<UserType, User> = {
  patient: {
    id: 'patient-demo-1',
    email: 'patient@demo.com',
    firstName: 'John',
    lastName: 'Patient',
    fullName: 'John Patient',
    phone: '+254700000001',
    userType: 'patient',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  doctor: {
    id: 'doctor-demo-1',
    email: 'doctor@demo.com',
    firstName: 'Dr. Sarah',
    lastName: 'Wilson',
    fullName: 'Dr. Sarah Wilson',
    phone: '+254700000002',
    userType: 'doctor',
    organization: 'Nairobi General Hospital',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  admin: {
    id: 'admin-demo-1',
    email: 'admin@demo.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    phone: '+254700000003',
    userType: 'admin',
    organization: 'PrepGuard Health',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  prep_champion: {
    id: 'champion-demo-1',
    email: 'champion@demo.com',
    firstName: 'Mary',
    lastName: 'Champion',
    fullName: 'Mary Champion',
    phone: '+254700000004',
    userType: 'prep_champion',
    organization: 'Community Health Network',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  },
  superadmin: {
    id: 'superadmin-demo-1',
    email: 'superadmin@prepguard.com',
    firstName: 'Super',
    lastName: 'Admin',
    fullName: 'Super Admin',
    phone: '+254700000000',
    userType: 'superadmin',
    organization: 'PrepGuard Supreme Command',
    verified: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    status: 'active'
  }
}

export const DEMO_CREDENTIALS: DemoCredentials = {
  patient: { email: 'patient@demo.com', password: 'Patient123!' },
  doctor: { email: 'doctor@demo.com', password: 'Doctor123!' },
  admin: { email: 'admin@demo.com', password: 'Admin123!' },
  prep_champion: { email: 'champion@demo.com', password: 'Champion123!' },
  superadmin: { email: 'superadmin@prepguard.com', password: 'SuperAdmin2024!' }
}