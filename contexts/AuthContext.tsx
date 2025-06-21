'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define user roles in our hierarchy
export type UserRole = 'superadmin' | 'admin' | 'doctor' | 'prep_champion' | 'patient';

export interface UserData {
  uid: string;
  email: string;
  role: UserRole;
  createdBy?: string; // UID of who created this user
  createdAt: Date;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  hospitalId?: string; // For admins, doctors, prep_champions
  isActive: boolean;
  lastLogin?: Date;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkAuthState = () => {
      try {
        const savedUser = localStorage.getItem('prep_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        localStorage.removeItem('prep_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Demo authentication logic
      let mockUser: UserData;

      if (email === 'admin@prepcare.ke' && password === 'superadmin123') {
        mockUser = {
          uid: 'super-admin-1',
          email,
          role: 'superadmin',
          createdAt: new Date(),
          firstName: 'Super',
          lastName: 'Admin',
          isActive: true,
          lastLogin: new Date()
        };
      } else if (email === 'admin@hospital1.ke' && password === 'admin123') {
        mockUser = {
          uid: 'admin-1',
          email,
          role: 'admin',
          createdBy: 'super-admin-1',
          createdAt: new Date(),
          firstName: 'Hospital',
          lastName: 'Admin',
          hospitalId: 'hospital-1',
          isActive: true,
          lastLogin: new Date()
        };
      } else if (email === 'doctor@hospital1.ke' && password === 'doctor123') {
        mockUser = {
          uid: 'doctor-1',
          email,
          role: 'doctor',
          createdBy: 'admin-1',
          createdAt: new Date(),
          firstName: 'Dr. John',
          lastName: 'Doe',
          hospitalId: 'hospital-1',
          isActive: true,
          lastLogin: new Date()
        };
      } else if (email === 'champion@hospital1.ke' && password === 'champion123') {
        mockUser = {
          uid: 'champion-1',
          email,
          role: 'prep_champion',
          createdBy: 'admin-1',
          createdAt: new Date(),
          firstName: 'Sarah',
          lastName: 'Champion',
          hospitalId: 'hospital-1',
          isActive: true,
          lastLogin: new Date()
        };
      } else if (email === 'patient@example.com' && password === 'patient123') {
        mockUser = {
          uid: 'patient-1',
          email,
          role: 'patient',
          createdBy: 'doctor-1',
          createdAt: new Date(),
          firstName: 'Patient',
          lastName: 'User',
          isActive: true,
          lastLogin: new Date()
        };
      } else {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem('prep_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('prep_user');
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Export default for easier importing
export default AuthProvider;