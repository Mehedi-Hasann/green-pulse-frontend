'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, user, isHydrated } = useAuthStore();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isHydrated && !isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (user) {
        const pathname = window.location.pathname;
        // Strict role-based protection
        if (pathname.startsWith('/dashboard/admin') && user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
          router.push('/dashboard/member');
        } else if (pathname.startsWith('/dashboard/super-admin') && user.role !== 'SUPER_ADMIN') {
          router.push(user.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/member');
        } else if (pathname === '/dashboard') {
           // Default redirect if exactly on /dashboard
           if (user.role === 'SUPER_ADMIN') router.push('/dashboard/super-admin');
           else if (user.role === 'ADMIN') router.push('/dashboard/admin');
           else router.push('/dashboard/member');
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router, isHydrated]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-green-600" />
          <p className="text-sm font-medium text-slate-500">Securing your session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 md:flex md:flex-col">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:hidden">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-green-700">Green Pulse</span>
          </div>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
