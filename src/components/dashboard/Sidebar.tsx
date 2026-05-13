'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Leaf, 
  Trophy, 
  History, 
  Settings, 
  Users, 
  FolderTree, 
  CheckSquare, 
  BarChart3,
  LogOut,
  CreditCard,
  UserPlus
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const memberLinks = [
  { name: 'Overview', href: '/dashboard/member', icon: LayoutDashboard },
  { name: 'My Challenges', href: '/dashboard/member/my-challenges', icon: Trophy },
  { name: 'Daily Submissions', href: '/dashboard/member/submissions', icon: CheckSquare },
  { name: 'Payments', href: '/dashboard/member/payments', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/profile', icon: Settings },
];

const adminLinks = [
  { name: 'Overview', href: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Manage Members', href: '/dashboard/admin/members', icon: Users },
  { name: 'Manage Challenges', href: '/dashboard/admin/challenges', icon: Trophy },
  { name: 'Manage Categories', href: '/dashboard/admin/categories', icon: FolderTree },
  { name: 'Approve Submissions', href: '/dashboard/admin/submissions', icon: CheckSquare },
  { name: 'Payments', href: '/dashboard/admin/payments', icon: CreditCard },
  { name: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
];

const superAdminLinks = [
  { name: 'Overview', href: '/dashboard/super-admin', icon: LayoutDashboard },
  { name: 'Manage Admins', href: '/dashboard/super-admin/admins', icon: UserPlus },
  { name: 'System Analytics', href: '/dashboard/super-admin/analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const getLinks = () => {
    if (user?.role === 'SUPER_ADMIN') return [...superAdminLinks, ...adminLinks, ...memberLinks];
    if (user?.role === 'ADMIN') return [...adminLinks, ...memberLinks];
    return memberLinks;
  };

  const links = getLinks();

  return (
    <div className="flex h-full flex-col border-r bg-slate-950 text-slate-400">
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-green-500" />
          <span className="text-xl font-bold tracking-tight text-white">Green Pulse</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-green-600 text-white' 
                    : 'hover:bg-slate-900 hover:text-white'
                }`}
              >
                <link.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </ScrollArea>

      <div className="border-t border-slate-800 p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-400 hover:bg-slate-900 hover:text-red-400"
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );
}
