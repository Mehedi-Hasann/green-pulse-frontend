import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const role = request.cookies.get('role')?.value;

  const { pathname } = request.nextUrl;

  // 1. Handle Protected Dashboard Routes
  if (pathname.startsWith('/dashboard')) {
    // If no token, redirect to login with redirect param
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Role-based route protection
    if (pathname.startsWith('/dashboard/super-admin') && role !== 'SUPER_ADMIN') {
      // Redirect unauthorized users to their appropriate dashboard
      const target = role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member';
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (pathname.startsWith('/dashboard/admin') && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard/member', request.url));
    }
    
    // Redirect root /dashboard to appropriate role dashboard
    if (pathname === '/dashboard') {
      const target = role === 'SUPER_ADMIN' 
        ? '/dashboard/super-admin' 
        : (role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member');
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  // 2. Redirect authenticated users away from public auth pages
  if ((pathname === '/login' || pathname === '/register') && token) {
    const target = role === 'SUPER_ADMIN' 
      ? '/dashboard/super-admin' 
      : (role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member');
    return NextResponse.redirect(new URL(target, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/login', 
    '/register'
  ],
};
