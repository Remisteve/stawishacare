"use client"
import React, { ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // ✅ Next.js routing
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // ✅ Next.js compatible toast

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter(); // ✅ Next.js router
  const pathname = usePathname(); // ✅ Next.js pathname

  // Handle redirects in useEffect
  useEffect(() => {
    if (loading) return; // Wait for auth to load

    // Redirect to login if not authenticated
    if (!currentUser || !userData) {
      toast.error("Please login to access this area");
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname ?? "")}`); // ✅ Next.js navigation
      return;
    }

    // Check if user has required role
    if (!allowedRoles.includes(userData.role)) {
      toast.warning("Access denied - insufficient permissions");
      // Redirect based on user role
      const redirectPath = getRoleBasedRedirect(userData.role);
      router.replace(redirectPath); // ✅ Next.js navigation
      return;
    }
  }, [currentUser, userData, loading, allowedRoles, router, pathname]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading while redirecting (prevents flash of content)
  if (!currentUser || !userData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Check if user is approved
  if (!userData.isApproved) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Account Pending Approval
            </h2>
            <p className="text-yellow-700 mb-4">
              Your account is currently pending approval. Please contact your administrator
              or wait for approval to access the system.
            </p>
            <button
              onClick={() => router.push('/auth/login')} // ✅ Next.js navigation
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking role (prevents flash)
  if (!allowedRoles.includes(userData.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, approved, and has the right role
  return <>{children}</>;
}

// Helper function to get redirect path based on role
function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case 'superadmin':
      return '/superadmin';
    case 'admin':
      return '/admin';
    case 'doctor':
      return '/doctor';
    case 'prep_champion':
      return '/prep-champion';
    case 'patient':
      return '/patient';
    default:
      return '/auth/login';
  }
}