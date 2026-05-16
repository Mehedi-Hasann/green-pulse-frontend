'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Leaf, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Challenges', href: '/challenges' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isHydrated } = useAuthStore();

  const getDashboardHref = () => {
    if (user?.role === 'SUPER_ADMIN') return '/dashboard/super-admin';
    if (user?.role === 'ADMIN') return '/dashboard/admin';
    return '/dashboard/member';
  };

  const getRoleBadge = () => {
    if (!user?.role) return null;
    const roles = {
      SUPER_ADMIN: { label: 'Super Admin', color: 'bg-purple-100 text-purple-700 border-purple-200' },
      ADMIN: { label: 'Admin', color: 'bg-blue-100 text-blue-700 border-blue-200' },
      MEMBER: { label: 'Member', color: 'bg-green-100 text-green-700 border-green-200' },
    };
    const role = roles[user.role as keyof typeof roles];
    return (
      <span className={`hidden lg:inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${role.color}`}>
        {role.label}
      </span>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold tracking-tight text-green-700">Green Pulse</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-green-600 ${
                pathname === link.href ? 'text-green-600' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {!isHydrated ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
          ) : isAuthenticated ? (
            <div className="flex items-center space-x-3">
              {getRoleBadge()}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-green-100 ring-offset-2 transition-all hover:ring-green-300">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user?.profileImage} alt={user?.name} />
                      <AvatarFallback className="bg-green-600 text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                      </div>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href={getDashboardHref()} className="flex w-full items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/dashboard/member/profile" className="flex w-full items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={logout}
                className="hidden md:flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 border-red-100 h-9 px-3 rounded-lg"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="hidden items-center space-x-2 md:flex">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/register">Join Now</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container pb-4 md:hidden"
        >
          <div className="flex flex-col space-y-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === link.href ? 'text-green-600' : 'text-muted-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4 pt-2">
                <div className="flex items-center space-x-3 px-2 py-3 bg-slate-50 rounded-lg">
                  <Avatar className="h-12 w-12 ring-2 ring-green-100">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="bg-green-600 text-white font-bold">{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                    <span className="mt-1 inline-flex w-fit items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                      {user?.role?.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                <Link
                  href={getDashboardHref()}
                  className="flex items-center px-2 text-sm font-medium text-muted-foreground hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/member/profile"
                  className="flex items-center px-2 text-sm font-medium text-muted-foreground hover:text-green-600"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center px-2 text-sm font-medium text-red-600 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/register" onClick={() => setIsOpen(false)}>Join Now</Link>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
