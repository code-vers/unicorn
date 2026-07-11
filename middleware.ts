import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard', '/manage-bookings'];
// Auth routes that should not be accessible when already logged in
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-reset'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check for token in cookies
  const token = request.cookies.get('token')?.value;

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // 1. Unauthenticated users trying to access protected routes -> Redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  // 2. Authenticated users trying to access auth routes (login/register) -> Redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // 3. Strict Role-Based Protection within /dashboard
  if (pathname.startsWith('/dashboard') && token) {
    const userCookie = request.cookies.get('user')?.value;
    let role = null;
    
    try {
      if (userCookie) {
        const user = JSON.parse(userCookie);
        role = user.role;
      }
    } catch (e) {
      console.error('Failed to parse user cookie in middleware');
    }

    // Define the specific routes that clients are allowed to access
    const clientAllowedRoutes = [
      '/dashboard/client',
      '/dashboard/my-bookings',
      '/dashboard/my-payments',
      '/dashboard/my-documents',
      '/dashboard/trip-management',
      '/dashboard/profile',
      '/dashboard/support'
    ];

    const isClientAllowedRoute = clientAllowedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));

    // If user is a regular USER (client), restrict them from admin routes
    if (role === 'USER') {
      if (!isClientAllowedRoute) {
        // Redirect unauthorized client access back to their own dashboard home
        return NextResponse.redirect(new URL('/dashboard/client', request.url));
      }
    }
    // If user is an ADMIN, optionally keep them out of client routes to enforce separation
    else if (role === 'ADMIN') {
      if (isClientAllowedRoute) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
