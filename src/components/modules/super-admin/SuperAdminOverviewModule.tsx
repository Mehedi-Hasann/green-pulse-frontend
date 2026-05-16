'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ShieldCheck, UserPlus, Settings, ShieldAlert, 
  TrendingUp, Users, DollarSign, Target, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

import { useEffect, useState } from 'react';

const dummyChartData = [
  { name: 'Jan', users: 400, revenue: 2400 },
  { name: 'Feb', users: 300, revenue: 1398 },
  { name: 'Mar', users: 200, revenue: 9800 },
  { name: 'Apr', users: 278, revenue: 3908 },
  { name: 'May', users: 189, revenue: 4800 },
  { name: 'Jun', users: 239, revenue: 3800 },
  { name: 'Jul', users: 349, revenue: 4300 },
];

export function SuperAdminOverviewModule({ stats }: { stats: any }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">System Overview</h1>
        <p className="text-slate-500">Global system oversight, financial tracking, and management.</p>
      </div>

      {/* 1. Quick Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.data?.totalEarnings?.toLocaleString() || '12,450'}</div>
            <p className="text-xs text-green-600 mt-1 font-medium">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalUsers?.toLocaleString() || '10,242'}</div>
            <p className="text-xs text-blue-600 mt-1 font-medium">+842 new today</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Challenges</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.totalChallenges || '48'}</div>
            <p className="text-xs text-purple-600 mt-1 font-medium">{stats?.data?.activeChallenges || '12'} currently active</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Tasks</CardTitle>
            <Activity className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.pendingSubmissions || '156'}</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">Require moderation</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Main Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Growth Analytics</CardTitle>
            <CardDescription>User registration trends over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={3} 
                      dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Revenue Insights</CardTitle>
            <CardDescription>Monthly revenue generated from paid challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                    />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. System Management & Health */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader>
            <CardTitle>Quick Management</CardTitle>
            <CardDescription>Commonly accessed system control actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-red-50">
                  <ShieldAlert className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Admins</p>
                  <p className="text-xs text-slate-500">System permissions</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/super-admin/admins"><TrendingUp className="h-4 w-4" /></Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-blue-50">
                  <UserPlus className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">New Admin</p>
                  <p className="text-xs text-slate-500">Onboard staff</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><TrendingUp className="h-4 w-4" /></Button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-amber-50">
                  <Settings className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Settings</p>
                  <p className="text-xs text-slate-500">Global config</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><TrendingUp className="h-4 w-4" /></Button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-slate-50 p-5 hover:bg-white hover:shadow-sm transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-green-50">
                  <ShieldCheck className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Security</p>
                  <p className="text-xs text-slate-500">Logs & Audit</p>
                </div>
              </div>
              <Button variant="ghost" size="icon"><TrendingUp className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Real-time infrastructure health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: 'API Gateway', status: 'Healthy', color: 'bg-green-500' },
                { name: 'Main DB', status: 'Healthy', color: 'bg-green-500' },
                { name: 'S3 Storage', status: 'Healthy', color: 'bg-green-500' },
                { name: 'Redis Cache', status: 'Degraded', color: 'bg-amber-500' },
                { name: 'Mail Server', status: 'Healthy', color: 'bg-green-500' },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">{s.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">{s.status}</span>
                    <div className={`h-2 w-2 rounded-full ${s.color}`} />
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 bg-slate-900 hover:bg-slate-800" variant="secondary">
              View Detailed Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
