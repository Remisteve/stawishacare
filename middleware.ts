// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't need authentication
  const publicRoutes = [
    '/', 
    '/auth/login', 
    '/auth/register', 
    '/patient-register',
    '/auth/superadmin/login',
    '/auth/superadmin/register',
    '/superadmin',                    // Main superadmin dashboard
    '/superadmin/module',             // Superadmin module page
    '/superadmin/admins',             // All superadmin sub-routes
    '/superadmin/doctors',
    '/superadmin/prep-champions',
    '/superadmin/patients',
    '/superadmin/app-users',
    '/superadmin/appointments',
    '/superadmin/enrollments',
    '/superadmin/facilities',
    '/superadmin/joined-online',
    '/superadmin/test-videos',
    '/superadmin/condoms',
    '/superadmin/prep-pep',
    '/superadmin/locations',
    '/superadmin/live-downloads',
    '/superadmin/blocked',
    '/superadmin/notifications',
    '/superadmin/reports',
    '/superadmin/ai'
  ];

  // Alternative: Allow all superadmin routes with wildcard
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/superadmin');
  
  if (isPublicRoute) {
    return NextResponse.next();
  }
  
  // Check for authentication token (adjust based on your auth system)
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};