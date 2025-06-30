// types/user.ts
export interface BaseUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'pending' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  location: {
    city: string;
    county: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
}

// Superadmin - System owner with full access
export interface Superadmin extends BaseUser {
  role: 'superadmin';
  permissions: 'all';
  secretKey: string;
  systemAccess: {
    canManageAdmins: true;
    canAccessAllFacilities: true;
    canModifySystemSettings: true;
    canViewAllData: true;
  };
}

// Admin - Regional/facility administrators
export interface Admin extends BaseUser {
  role: 'admin';
  adminType: 'regional' | 'facility' | 'data' | 'system';
  region?: string;
  facilities: string[]; // Array of facility IDs
  permissions: AdminPermission[];
  accessLevel: 'high' | 'medium' | 'low';
  managedUsers: number;
  managedFacilities: number;
  supervisor?: string; // Superadmin or higher-level admin ID
}

export type AdminPermission = 
  | 'user_management'
  | 'facility_management' 
  | 'reports'
  | 'data_export'
  | 'system_config'
  | 'patient_records'
  | 'doctor_verification'
  | 'appointment_management';

// Doctor - Healthcare providers
export interface Doctor extends BaseUser {
  role: 'doctor';
  licenseNumber: string;
  specialization: string[];
  facility: {
    id: string;
    name: string;
    type: 'hospital' | 'clinic' | 'health_center' | 'dispensary';
  };
  experience: number; // years
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
  }[];
  certifications: {
    name: string;
    issuedBy: string;
    issuedDate: string;
    expiryDate?: string;
  }[];
  statistics: {
    totalPatients: number;
    totalConsultations: number;
    successRate: number;
    rating: number;
    reviewCount: number;
  };
  availability: {
    workingHours: {
      [key: string]: { // day of week
        start: string;
        end: string;
        isAvailable: boolean;
      };
    };
    vacationMode: boolean;
    consultationTypes: ('in_person' | 'virtual' | 'phone')[];
  };
  verificationStatus: 'verified' | 'pending' | 'rejected';
  verifiedBy?: string; // Admin ID who verified
  verifiedAt?: string;
}

// PrEP Champion - Community health advocates
export interface PrepChampion extends BaseUser {
  role: 'prep_champion';
  community: string;
  level: 'beginner' | 'intermediate' | 'senior' | 'master';
  specialization: string[];
  languages: string[];
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  training: {
    completed: string[]; // Training module IDs
    inProgress: string[];
    certifications: {
      name: string;
      completedAt: string;
      expiryDate?: string;
    }[];
  };
  outreach: {
    clientsReached: number;
    successfulReferrals: number;
    eventsOrganized: number;
    communityFeedback: number; // rating 1-5
  };
  achievements: {
    title: string;
    description: string;
    earnedAt: string;
    category: 'performance' | 'community' | 'training' | 'leadership';
  }[];
  mentorId?: string; // Senior champion or admin ID
}

// Patient - People receiving care
export interface Patient extends BaseUser {
  role: 'patient';
  patientId: string; // Unique patient identifier
  demographics: {
    age: number;
    gender: 'male' | 'female' | 'other' | 'prefer_not_to_say';
    maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
    occupation?: string;
    education?: 'none' | 'primary' | 'secondary' | 'tertiary' | 'postgraduate';
  };
  medicalInfo: {
    bloodType?: string;
    allergies: string[];
    chronicConditions: string[];
    currentMedications: {
      name: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate?: string;
    }[];
  };
  hivStatus: {
    status: 'negative' | 'positive' | 'unknown' | 'pending';
    lastTested: string;
    testType: 'rapid' | 'elisa' | 'pcr' | 'other';
    testLocation: string;
  };
  riskAssessment: {
    level: 'low' | 'medium' | 'high';
    factors: string[];
    assessedBy: string; // Doctor/Champion ID
    assessedAt: string;
    nextAssessment: string;
  };
  programs: {
    prep?: {
      enrolled: boolean;
      startDate?: string;
      medication: string;
      adherenceRate: number; // percentage
      sideEffects: string[];
      nextRefill?: string;
    };
    pep?: {
      enrolled: boolean;
      startDate?: string;
      reason: string;
      completionRate: number;
      followUpRequired: boolean;
    };
  };
  care: {
    primaryDoctor: string; // Doctor ID
    assignedChampion?: string; // Champion ID
    facility: string; // Facility ID
    nextAppointment?: string;
    careCoordinator?: string;
  };
  consent: {
    dataSharing: boolean;
    researchParticipation: boolean;
    communicationPreferences: {
      sms: boolean;
      email: boolean;
      phone: boolean;
      whatsapp: boolean;
    };
  };
}

// App User - Mobile app users (subset of patients)
export interface AppUser extends BaseUser {
  role: 'app_user';
  patientId?: string; // Link to patient record if enrolled
  deviceInfo: {
    platform: 'ios' | 'android';
    version: string;
    deviceId: string;
    pushToken?: string;
    notificationsEnabled: boolean;
  };
  appActivity: {
    firstLaunch: string;
    lastActive: string;
    sessionsCount: number;
    averageSessionDuration: number; // minutes
    featuresUsed: string[];
    feedbackRating?: number;
  };
  preferences: {
    language: string;
    notifications: {
      appointments: boolean;
      medication: boolean;
      health_tips: boolean;
      system_updates: boolean;
    };
    privacy: {
      shareDataForResearch: boolean;
      allowLocationTracking: boolean;
      shareWithCareTeam: boolean;
    };
  };
}

// Facility - Healthcare facilities
export interface Facility {
  id: string;
  name: string;
  type: 'hospital' | 'clinic' | 'health_center' | 'dispensary' | 'laboratory';
  level: 'level_1' | 'level_2' | 'level_3' | 'level_4' | 'level_5' | 'level_6';
  status: 'active' | 'inactive' | 'under_renovation' | 'closed';
  location: {
    address: string;
    city: string;
    county: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email?: string;
    website?: string;
    emergencyNumber?: string;
  };
  services: {
    hivTesting: boolean;
    prepServices: boolean;
    pepServices: boolean;
    artServices: boolean;
    counseling: boolean;
    familyPlanning: boolean;
    gbvSupport: boolean;
    youthFriendly: boolean;
    twentyFourSeven: boolean;
  };
  capacity: {
    totalBeds?: number;
    icu?: number;
    maternity?: number;
    pediatric?: number;
    isolation?: number;
  };
  staff: {
    doctors: number;
    nurses: number;
    counselors: number;
    labTechnicians: number;
    admin: number;
  };
  operatingHours: {
    [key: string]: { // day of week
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  managedBy: string[]; // Admin IDs
  createdAt: string;
  updatedAt: string;
}

// Appointment - Medical appointments
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  facilityId: string;
  type: 'consultation' | 'screening' | 'follow_up' | 'counseling' | 'testing' | 'therapy';
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // minutes
  isVirtual: boolean;
  virtualDetails?: {
    platform: 'zoom' | 'teams' | 'whatsapp' | 'phone';
    meetingId?: string;
    meetingUrl?: string;
  };
  location?: {
    room: string;
    floor?: string;
    building?: string;
  };
  reason: string;
  notes?: string;
  reminders: {
    sent: boolean;
    sentAt?: string;
    method: 'sms' | 'email' | 'phone' | 'whatsapp';
  }[];
  outcome?: {
    attended: boolean;
    diagnosis?: string;
    prescriptions?: string[];
    nextAppointment?: string;
    referrals?: string[];
    notes: string;
  };
  createdBy: string; // User ID who created
  createdAt: string;
  updatedAt: string;
}

// Enrollment - Program enrollments
export interface Enrollment {
  id: string;
  patientId: string;
  program: 'prep' | 'pep' | 'art' | 'pmtct' | 'prevention' | 'support_group';
  status: 'active' | 'completed' | 'discontinued' | 'transferred' | 'pending';
  enrollmentDate: string;
  completionDate?: string;
  discontinuationReason?: string;
  facility: string;
  enrolledBy: string; // Doctor/Champion ID
  eligibilityCriteria: {
    age: boolean;
    hivStatus: boolean;
    riskFactors: boolean;
    medicalHistory: boolean;
    consent: boolean;
  };
  baseline: {
    weight: number;
    bloodPressure?: string;
    laboratoryResults?: {
      [test: string]: {
        value: string;
        unit: string;
        reference: string;
        date: string;
      };
    };
  };
  monitoring: {
    adherenceTracking: boolean;
    sideEffectMonitoring: boolean;
    regularCheckups: boolean;
    laboratoryMonitoring: boolean;
  };
  support: {
    peerSupport: boolean;
    familySupport: boolean;
    counselingServices: boolean;
    reminderSystem: boolean;
  };
  outcomes: {
    adherenceRate?: number;
    viralLoad?: number;
    cd4Count?: number;
    qualityOfLife?: number;
    satisfaction?: number;
  };
}

// Union type for all user types
export type User = Superadmin | Admin | Doctor | PrepChampion | Patient | AppUser;

// User role type
export type UserRole = 'superadmin' | 'admin' | 'doctor' | 'prep_champion' | 'patient' | 'app_user';

// Auth user type (for authentication context)
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions?: string[];
  accessLevel?: string;
  facilities?: string[];
  lastLogin?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
}

// Filter and pagination types
export interface UserFilters {
  role?: UserRole;
  status?: string;
  location?: string;
  facility?: string;
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Form types for user creation/editing
export interface CreateUserForm {
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  password: string;
  confirmPassword: string;
  location: {
    city: string;
    county: string;
    country: string;
  };
  // Role-specific fields will be added dynamically
  [key: string]: any;
}

export interface UpdateUserForm extends Partial<CreateUserForm> {
  id: string;
}

// Statistics types
export interface UserStatistics {
  total: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<string, number>;
  byLocation: Record<string, number>;
  growth: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  engagement: {
    activeUsers: number;
    averageSessionTime: number;
    retentionRate: number;
  };
}