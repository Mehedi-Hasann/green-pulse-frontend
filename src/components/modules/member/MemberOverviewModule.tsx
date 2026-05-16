'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, CheckSquare, Leaf, Star, TrendingUp, Award, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useEffect, useState } from 'react';



export function MemberOverviewModule({ 
  user, 
  stats, 
  activeChallenges, 
  leaderboard,
  pointDetails
}: { 
  user: any, 
  stats: any, 
  activeChallenges: any, 
  leaderboard: any,
  pointDetails : any
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = Array.isArray(pointDetails) && pointDetails.length > 0

    ? (() => {
        const grouped = pointDetails.reduce((acc: any, item: any) => {
          const dateObj = new Date(item.updatedAt || item.createdAt);
          const dateKey = dateObj.toISOString().split('T')[0];
          if (!acc[dateKey]) {
            acc[dateKey] = { label: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), points: 0, timestamp: dateObj.getDate() };
          }
          acc[dateKey].points += (item.pointsAchieved || 0);
          return acc;
        }, {});

        return Object.values(grouped)
          .sort((a: any, b: any) => a.timestamp - b.timestamp)
          .map((item: any) => ({
            day: item.label,
            points: item.points
          }));
      })()
    : [];

  const activeChallengesList = Array.isArray(activeChallenges) 
    ? activeChallenges 
    : (Array.isArray(activeChallenges?.data?.data) 
        ? activeChallenges.data.data 
        : (Array.isArray(activeChallenges?.data) ? activeChallenges.data : []));
    
  const leaderboardList = Array.isArray(leaderboard?.data?.data)
    ? leaderboard.data.data
    : (Array.isArray(leaderboard?.data) ? leaderboard.data : []);

  // Use a simpler fallback for stats if they come in nested or failed
  const safeStats = stats?.data?.data || stats?.data || { totalPoints: 0, currentRank: 'Beginner', joinedChallenges: 0, completedChallenges: 0 };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Welcome back, {user?.name}! 👋</h1>
          <p className="text-slate-500">You&apos;re doing great! You saved approximately 12kg of CO2 this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-green-600 hover:bg-green-700 h-11 px-6 rounded-xl font-bold" asChild>
            <Link href="/challenges">Start New Challenge</Link>
          </Button>
        </div>
      </div>

      {/* 1. Impact Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-md bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <Star className="h-12 w-12 text-yellow-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{stats?.data?.totalPoints ?? 0}</div>
            <div className="flex items-center text-xs text-green-600 mt-2 font-bold">
              <TrendingUp className="mr-1 h-3 w-3" />
              Keep earning points!
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <Zap className="h-12 w-12 text-blue-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{stats?.data?.activeStreak ?? 0} Days</div>
            <div className="flex items-center text-xs text-blue-600 mt-2 font-bold">
              {stats?.data?.activeStreak > 0 ? "Keep it up! ⚡" : "Start your streak today! ⚡"}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <Trophy className="h-12 w-12 text-green-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Active Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{stats?.data?.activeChallengesCount ?? 0}</div>
            <div className="flex items-center text-xs text-green-600 mt-2 font-bold">
              Current eco-tasks
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform">
            <Award className="h-12 w-12 text-purple-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">{stats?.data?.rank ?? 'N/A'}</div>
            <div className="flex items-center text-xs text-purple-600 mt-2 font-bold">
              Global Leaderboard
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* 2. Points Progression Chart */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Points Progression</CardTitle>
            <CardDescription>Your eco-impact points over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full min-h-[300px]">
              {mounted ? (
                <div style={{ width: '100%', height: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
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
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="points" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorPoints)" 
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="w-full h-full bg-slate-50 animate-pulse rounded-xl" />
              )}
            </div>
          </CardContent>
        </Card>

        {/* 3. Leaderboard Preview */}
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Leaderboard</CardTitle>
            <CardDescription>Top performers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {Array.isArray(leaderboard?.data) && leaderboard.data.map((entry: any, index: number) => (
                <div key={entry.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                      index === 1 ? 'bg-slate-100 text-slate-700' : 
                      index === 2 ? 'bg-amber-100 text-amber-700' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-green-600 transition-colors">
                        {entry.name} {entry.id === user?.member?.id && '(You)'}
                      </p>
                      <p className="text-xs text-slate-500">{entry.points} pts</p>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-400">
                    <Leaf className="h-3 w-3 inline mr-1 text-green-500" />
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-green-600 font-bold mt-4" asChild>
                <Link href="/leaderboard">View Full Board</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 4. Active Challenges Progress */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Active Challenges</CardTitle>
            <CardDescription>Track your ongoing eco-activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeChallengesList && activeChallengesList.length > 0 ? (
                activeChallengesList.slice(0, 4).map((challenge: any) => {
                  const submissionCount = challenge.submissionCount || challenge.submission?.length || 0;
                  const progress = Math.min(Math.round((submissionCount / challenge.challenge.duration) * 100), 100);
                  
                  return (
                    <div key={challenge.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-900 line-clamp-1">{challenge.challenge.title}</h4>
                        <Badge variant="outline" className="bg-white text-[10px] uppercase font-black tracking-tighter">
                          {challenge.challenge.category?.name || 'Challenge'}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mb-2">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2 bg-slate-200" />
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{submissionCount}/{challenge.challenge.duration} Days Done</span>
                        <Button size="sm" variant="ghost" className="h-7 text-xs font-bold text-green-600" asChild>
                          <Link href="/dashboard/member/submissions">Submit Proof</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <Trophy className="h-8 w-8 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">No active challenges</h4>
                  <p className="text-slate-500 text-sm max-w-xs mt-2">
                    Join a challenge to start earning points and making a difference.
                  </p>
                  <Button className="mt-6 bg-slate-900" asChild>
                    <Link href="/challenges">Browse All Challenges</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 5. Quick Actions */}
        <Card className="border-none shadow-md bg-green-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-green-100">Make an impact today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="secondary" className="w-full h-14 justify-start gap-3 rounded-xl bg-white/10 hover:bg-white/20 border-none text-white font-bold group" asChild>
              <Link href="/dashboard/member/submissions">
                <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <CheckSquare className="h-5 w-5" />
                </div>
                Submit Daily Proof
              </Link>
            </Button>
            <Button variant="secondary" className="w-full h-14 justify-start gap-3 rounded-xl bg-white/10 hover:bg-white/20 border-none text-white font-bold group" asChild>
              <Link href="/challenges">
                <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <Leaf className="h-5 w-5" />
                </div>
                New Challenge
              </Link>
            </Button>
            <Button variant="secondary" className="w-full h-14 justify-start gap-3 rounded-xl bg-white/10 hover:bg-white/20 border-none text-white font-bold group" asChild>
              <Link href="/dashboard/member/profile">
                <div className="bg-white/20 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-5 w-5" />
                </div>
                View Performance
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
