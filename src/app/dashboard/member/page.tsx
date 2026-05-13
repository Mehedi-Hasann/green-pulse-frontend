'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';
import { Trophy, CheckSquare, Leaf, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function MemberOverview() {
  const { user } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ['member-stats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/member/stats');
      return response.data;
    },
  });

  const { data: activeChallenges } = useQuery({
    queryKey: ['active-challenges'],
    queryFn: async () => {
      const response = await axiosInstance.get('/member/my-challenges?status=ACTIVE');
      return response.data;
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your eco-journey.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.points || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Trophy className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.activeCount || 0}</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proofs</CardTitle>
            <CheckSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.data?.submissionCount || 0}</div>
            <p className="text-xs text-muted-foreground">Verified by community</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rank</CardTitle>
            <Leaf className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#42</div>
            <p className="text-xs text-muted-foreground">Top 5% of members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Active Challenges */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Challenges</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/member/my-challenges">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {activeChallenges?.data?.length > 0 ? (
                activeChallenges.data.slice(0, 3).map((challenge: any) => (
                  <div key={challenge.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{challenge.title}</span>
                      <span className="text-xs text-muted-foreground">Day {challenge.currentDay}/{challenge.duration}</span>
                    </div>
                    <Progress value={(challenge.currentDay / challenge.duration) * 100} className="h-2" />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">No active challenges found.</p>
                  <Button size="sm" asChild>
                    <Link href="/challenges">Browse Challenges</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Recent Activity */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="h-auto flex-col items-start p-4 hover:bg-green-50" asChild>
              <Link href="/dashboard/member/submissions">
                <div className="flex w-full items-center justify-between font-bold">
                  <span>Submit Daily Proof</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <span className="text-xs font-normal text-muted-foreground">Upload photos of your eco-friendly actions today.</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col items-start p-4 hover:bg-blue-50" asChild>
              <Link href="/challenges">
                <div className="flex w-full items-center justify-between font-bold">
                  <span>Explore New Challenges</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
                <span className="text-xs font-normal text-muted-foreground">Find more ways to help the planet.</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
