import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Public routes that don't need authentication
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/patient-register'];
  
  if (publicRoutes.includes(pathname)) {
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