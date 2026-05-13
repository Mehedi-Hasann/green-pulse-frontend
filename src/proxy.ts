import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't need auth
  const publicPaths = ['/login', '/register', '/', '/challenges', '/leaderboard', '/about'];
  const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith('/challenges/'));

  // Dashboard paths that need auth
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Role-based access control (simplified for client-side state, 
    // but better to decode JWT here if possible)
    // For now, we trust the dashboard layouts to handle fine-grained checks 
    // while the middleware handles the basic auth check.
  }

  // Redirect authenticated users away from login/register
  if ((pathname === '/login' || pathname === '/register') && token) {
    return NextResponse.redirect(new URL('/dashboard/member', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
