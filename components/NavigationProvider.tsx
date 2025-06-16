"use client"
import { useRouter, usePathname } from 'next/navigation' // ✅ Next.js routing
import { useAuth } from '@/contexts/AuthContext'
import { useEffect, ReactNode } from 'react'
import { toast } from 'sonner'

interface NavigationProviderProps {
  children: ReactNode
}

export default function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter() // ✅ Next.js router
  const pathname = usePathname() // ✅ Current path
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return // Wait for auth to load

    // Authentication and role-based navigation logic
    const handleNavigation = () => {
      // Protected routes that require authentication
      const protectedRoutes = ['/admin', '/doctor', '/patient', '/superadmin']
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

      // Public routes that authenticated users shouldn't access
      const publicOnlyRoutes = ['/auth/login', '/auth/register']
      const isPublicOnlyRoute = publicOnlyRoutes.some(route => pathname.startsWith(route))

      if (!user && isProtectedRoute) {
        // Redirect unauthenticated users to login
        toast.error("Authentication required", {
          description: "Please login to access this area"
        })
        router.push('/auth/login')
        return
      }

      if (user && isPublicOnlyRoute) {
        // Redirect authenticated users away from login/register
        redirectToUserDashboard(user.role)
        return
      }

      if (user && pathname === '/') {
        // Redirect authenticated users from home to their dashboard
        redirectToUserDashboard(user.role)
        return
      }

      // Role-based access control
      if (user && isProtectedRoute) {
        const hasAccess = checkRoleAccess(user.role, pathname)
        if (!hasAccess) {
          toast.error("Access denied", {
            description: "You don't have permission to access this area"
          })
          redirectToUserDashboard(user.role)
          return
        }
      }
    }

    handleNavigation()
  }, [user, loading, pathname, router])

  // Redirect user to their appropriate dashboard
  const redirectToUserDashboard = (role: string) => {
    switch (role) {
      case 'superadmin':
        router.push('/superadmin')
        break
      case 'admin':
        router.push('/admin')
        break
      case 'doctor':
        router.push('/doctor')
        break
      case 'patient':
        router.push('/patient')
        break
      case 'prep-champion':
        router.push('/prep-champion')
        break
      default:
        router.push('/dashboard')
    }
  }

  // Check if user role has access to the route
  const checkRoleAccess = (role: string, path: string): boolean => {
    const rolePermissions = {
      superadmin: ['/superadmin', '/admin', '/doctor', '/patient', '/prep-champion'], // Can access everything
      admin: ['/admin', '/doctor', '/patient', '/prep-champion'], // Can't access superadmin
      doctor: ['/doctor', '/patient'], // Can access doctor and patient areas
      patient: ['/patient'], // Only patient area
      'prep-champion': ['/prep-champion', '/patient'] // Can access prep-champion and patient areas
    }

    const allowedPaths = rolePermissions[role as keyof typeof rolePermissions] || []
    return allowedPaths.some(allowedPath => path.startsWith(allowedPath))
  }

  // Show loading spinner while auth is determining
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Export alternative names for flexibility
export { NavigationProvider as RouteGuard }
export { NavigationProvider as AuthGuard }
export { NavigationProvider as AppNavigator }