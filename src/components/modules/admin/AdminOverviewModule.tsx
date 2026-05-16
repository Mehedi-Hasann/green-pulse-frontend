'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Users, 
  Trophy, 
  CheckSquare, 
  BarChart3, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  Check,
  X,
  Eye,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell
} from 'recharts';
import { useEffect, useState } from 'react';


export function AdminOverviewModule({ summaryData, pendingSubmissions }: { summaryData: any, pendingSubmissions: any }) {
  const { topMetrics, submissionActivity = [], quickActions, summary } = summaryData || {};
  const [mounted, setMounted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const router = useRouter();

  const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setIsReviewing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/submissions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Submission ${status.toLowerCase()} successfully.`);
        setOpenDialogId(null);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to review submission.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsReviewing(false);
    }
  };

  useEffect(() => { setMounted(true); }, []);

  // Normalize nested API response for pending submissions
  console.log(pendingSubmissions)
  const pendingList = Array.isArray(pendingSubmissions?.data?.data)
    ? pendingSubmissions.data.data
    : (Array.isArray(pendingSubmissions?.data) ? pendingSubmissions.data : []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Control Center</h1>
          <p className="text-slate-500">Oversee platform activity, verify community impact, and manage resources.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-slate-900 hover:bg-slate-800 h-11 px-6 rounded-xl font-bold" asChild>
            <Link href="/dashboard/admin/challenges/new">Create Challenge</Link>
          </Button>
        </div>
      </div>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{topMetrics?.totalMembers?.value || 0}</div>
            <p className="text-xs text-blue-600 mt-1 font-bold">{topMetrics?.totalMembers?.changeLabel || '+0 this week'}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{topMetrics?.activeChallenges?.value || 0}</div>
            <p className="text-xs text-green-600 mt-1 font-bold">{topMetrics?.activeChallenges?.label || 'Live on platform'}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Pending Proofs</CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{topMetrics?.pendingProofs?.value || 0}</div>
            <p className="text-xs text-amber-600 mt-1 font-bold">{topMetrics?.pendingProofs?.label || 'Require review'}</p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">${(topMetrics?.monthlyRevenue?.value || 0).toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1 font-bold">{topMetrics?.monthlyRevenue?.growthLabel || '+0% growth'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 2. Submission Trends Chart */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Submission Activity</CardTitle>
            <CardDescription>Daily proof submissions across all challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full min-h-[300px]">
              {mounted ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <BarChart data={submissionActivity}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="day" 
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
                      <Bar dataKey="submissions" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40}>
                        {submissionActivity.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.submissions > 0 ? '#059669' : '#10b981'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Operational Health */}
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
            <CardDescription>Common admin operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full h-14 justify-start gap-3 rounded-2xl border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all group" asChild>
              <Link href="/dashboard/admin/submissions">
                <div className="bg-white p-2 rounded-xl shadow-sm group-hover:bg-amber-50">
                  <CheckSquare className="h-5 w-5 text-amber-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{quickActions?.reviewSubmissions?.label || 'Review Submissions'}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{quickActions?.reviewSubmissions?.countLabel || '0 PENDING'}</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="w-full h-14 justify-start gap-3 rounded-2xl border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all group" asChild>
              <Link href="/dashboard/admin/challenges">
                <div className="bg-white p-2 rounded-xl shadow-sm group-hover:bg-green-50">
                  <Trophy className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{quickActions?.manageChallenges?.label || 'Manage Challenges'}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{quickActions?.manageChallenges?.countLabel || '0 ACTIVE'}</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="w-full h-14 justify-start gap-3 rounded-2xl border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all group" asChild>
              <Link href="/dashboard/admin/members">
                <div className="bg-white p-2 rounded-xl shadow-sm group-hover:bg-blue-50">
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{quickActions?.userDirectory?.label || 'User Directory'}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{quickActions?.userDirectory?.countLabel || '0 TOTAL'}</p>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="w-full h-14 justify-start gap-3 rounded-2xl border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all group" asChild>
              <Link href="/dashboard/admin/analytics">
                <div className="bg-white p-2 rounded-xl shadow-sm group-hover:bg-purple-50">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-900 text-sm">{quickActions?.detailedAnalytics?.label || 'Detailed Analytics'}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">{quickActions?.detailedAnalytics?.countLabel || 'VIEW REPORTS'}</p>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* 4. Recent Pending Submissions Table */}
        <Card className="lg:col-span-3 border-none shadow-md bg-white overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">Recent Pending Submissions</CardTitle>
                <CardDescription>Proofs waiting for verification from members</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-green-600" asChild>
                <Link href="/dashboard/admin/submissions">View All Submissions</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="font-bold text-slate-900 py-4">User</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Challenge</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Submitted</TableHead>
                  <TableHead className="font-bold text-slate-900 py-4">Status</TableHead>
                  <TableHead className="text-right font-bold text-slate-900 py-4 px-6">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingList.length > 0 ? (
                  pendingList.slice(0, 5).map((sub: any) => (
                    <TableRow key={sub.id} className="hover:bg-slate-50 transition-colors border-slate-100">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-xs">
                            {sub.member?.name?.[0] || 'M'}
                          </div>
                          <span className="font-bold text-slate-900">{sub.member?.name || 'Unknown'}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-medium text-slate-600">{sub.challenge.title}</TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center text-slate-500 text-xs">
                          <Clock className="mr-1.5 h-3.5 w-3.5" />
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-bold px-2.5 py-0.5 rounded-full text-[10px]">
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-4 px-6">
                        <Dialog open={openDialogId === sub.id} onOpenChange={(open) => setOpenDialogId(open ? sub.id : null)}>
                          <DialogTrigger className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), "rounded-lg font-bold border-slate-200 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all")}>
                            Verify Proof
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Verify Submission</DialogTitle>
                              <DialogDescription>
                                Submitted by {sub.member?.name || 'Unknown'} for {sub.challenge?.title}
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="mt-4 space-y-4">
                              <div className="bg-slate-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold mb-2 text-slate-900">Member Description:</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{sub.description || "No description provided."}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold mb-2 text-slate-900">Attached Proofs:</h4>
                                <div className="grid grid-cols-2 gap-3">
                                  {sub.proofs?.map((url: string, idx: number) => (
                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border bg-slate-100">
                                      <img src={url} alt={`Proof ${idx + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <DialogFooter className="mt-6 flex gap-2">
                              <Button 
                                variant="outline" 
                                className="flex-1 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50 rounded-xl h-11 font-bold"
                                onClick={() => handleReview(sub.id, 'REJECTED')}
                                disabled={isReviewing}
                              >
                                {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                                Reject
                              </Button>
                              <Button 
                                className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl h-11 font-bold"
                                onClick={() => handleReview(sub.id, 'APPROVED')}
                                disabled={isReviewing}
                              >
                                {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                                Approve & Award Points
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 mb-2 opacity-20" />
                        <p className="font-medium text-lg">All caught up!</p>
                        <p className="text-sm">No pending submissions to review.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
