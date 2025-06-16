// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from "firebase/analytics";

// Firebase configuration with your actual project details
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD2-zCxF_miDtnVEMDnNVcj_7Mxyp6Te1w",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "otz-system.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "otz-system",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "otz-system.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "586862655167",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:586862655167:web:8d2dce33d91de19539780a",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-7RNMK2D257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// Initialize Analytics only on client side
export let analytics: any = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Connect to emulators in development (client-side only)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_USE_EMULATORS === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    console.log('🔥 Connected to Firebase emulators');
  } catch (error) {
    // Emulators might already be connected, which is fine
    console.log('⚠️ Emulators connection note:', error);
  }
}

export default app;

// Firestore collections structure for PrEP/PEP Care System
export const COLLECTIONS = {
  // User Management
  USERS: 'users',
  ADMINS: 'admins',
  SUPERADMINS: 'superadmins',
  
  // Healthcare Network
  HOSPITALS: 'hospitals',
  DOCTORS: 'doctors',
  PREP_CHAMPIONS: 'prep_champions',
  
  // Patient Care
  PATIENTS: 'patients',
  APPOINTMENTS: 'appointments',
  MEDICATIONS: 'medications',
  PREP_SCHEDULES: 'prep_schedules',
  PEP_TREATMENTS: 'pep_treatments',
  
  // Support Services
  CONDOM_REQUESTS: 'condom_requests',
  VIOLENCE_SUPPORT: 'violence_support',
  COUNSELING_SESSIONS: 'counseling_sessions',
  
  // Communication
  CHATS: 'chats',
  NOTIFICATIONS: 'notifications',
  VIDEO_CALLS: 'video_calls',
  
  // Content & Resources
  VIDEO_UPLOADS: 'video_uploads',
  EDUCATIONAL_CONTENT: 'educational_content',
  SUPPORT_GROUPS: 'support_groups',
  
  // System Management
  REQUESTS: 'requests',
  ACTIVITIES: 'activities',
  ANALYTICS: 'analytics',
  AUDIT_LOGS: 'audit_logs'
} as const;

// Helper functions for collection references
export const getCollection = (collectionName: keyof typeof COLLECTIONS) => {
  return COLLECTIONS[collectionName];
};

// Firebase connection status
export const isFirebaseConnected = () => {
  return !!app;
};

// Client-side only console logs
if (typeof window !== 'undefined') {
  console.log('🚀 Firebase initialized for PrEP/PEP Care System');
  console.log('📊 Project:', firebaseConfig.projectId);
}