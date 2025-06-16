// app.tsx
// Main entry point with comprehensive routing and authentication logic
'use client'
import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingScreen from '@/components/LoadingScreen';

// Public Pages
import LandingPage from '@/pages/public/LandingPage';
import PatientSelfRegister from '@/pages/public/PatientSelfRegister';

// Auth Pages
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import SuperAdminAuth from '@/components/auth/SuperAdminAuth';

// Dashboard Pages
import SuperAdminDashboard from '@/pages/superadmin/SuperAdminDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import DoctorDashboard from '@/pages/doctor/DoctorDashboard';
import PrepChampionDashboard from '@/pages/prep-champion/PrepChampionDashboard';
import PatientDashboard from '@/pages/patient/PatientDashboard';

export default function AppRouter() {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Helper function to get default redirect based on user role
  const getDefaultRedirect = () => {
    if (!currentUser || !userData) return '/';
        
    switch (userData.role) {
      case 'superadmin':
        return '/superadmin/dashboard';
      case 'admin':
        return '/admin/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'prep_champion':
        return '/prep-champion/dashboard';
      case 'patient':
        return '/patient/dashboard';
      default:
        return '/';
    }
  };

  // Auto-redirect logic for authenticated users on auth pages
  useEffect(() => {
    if (!loading && currentUser && userData) {
      if (pathname === '/auth/login' || pathname === '/auth/register' || pathname === '/login' || pathname === '/register') {
        const redirectPath = getDefaultRedirect();
        router.push(redirectPath);
      }
    }
  }, [currentUser, userData, loading, router, pathname]);

  // Legacy route redirects
  useEffect(() => {
    if (pathname === '/login') {
      router.push('/auth/login');
    } else if (pathname === '/register') {
      router.push('/auth/register');
    }
  }, [pathname, router]);

  // Show loading screen while auth is being determined - AFTER all hooks
  if (loading) {
    return <LoadingScreen />;
  }

  // Route rendering logic
  const renderCurrentRoute = () => {
    switch (pathname) {
      // Public Routes
      case '/':
        return <LandingPage />;
      case '/patient-register':
        return <PatientSelfRegister />;

      // Auth Routes
      case '/auth/login':
        return currentUser ? null : <LoginPage />;
      case '/auth/register':
        return currentUser ? null : <RegisterPage />;
      case '/superadmin':
        return <SuperAdminAuth />;

      // Protected Dashboard Routes
      case '/superadmin/dashboard':
        return (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        );
      case '/admin/dashboard':
        return (
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        );
      case '/doctor/dashboard':
        return (
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboard />
          </ProtectedRoute>
        );
      case '/prep-champion/dashboard':
        return (
          <ProtectedRoute allowedRoles={['prep_champion']}>
            <PrepChampionDashboard />
          </ProtectedRoute>
        );
      case '/patient/dashboard':
        return (
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        );

      // Catch all - redirect to home
      default:
        router.push('/');
        return <LandingPage />;
    }
  };

  return renderCurrentRoute();
}