import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

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

  // Redirect to login if not authenticated
  if (!currentUser || !userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
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
              onClick={() => window.location.href = '/login'}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user has required role
  if (!allowedRoles.includes(userData.role)) {
    // Redirect based on user role
    const redirectPath = getRoleBasedRedirect(userData.role);
    return <Navigate to={redirectPath} replace />;
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
      return '/login';
  }
}