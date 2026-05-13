'use client';

import { useQuery } from '@tanstack/react-query';
import { leaderboardService } from '@/services/leaderboard.service';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LeaderboardPage() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: () => leaderboardService.getLeaderboard(),
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 1:
        return <Medal className="h-6 w-6 text-slate-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">{index + 1}</span>;
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Leaderboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">The most dedicated eco-warriors in our community.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Top 3 highlights */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {isLoading ? (
            [1, 2, 3].map((i) => <Skeleton key={i} className="h-64 rounded-2xl" />)
          ) : (
            leaderboard?.data?.slice(0, 3).map((user: any, index: number) => (
              <Card key={user.id} className={`relative overflow-hidden border-none shadow-xl ${
                index === 0 ? 'bg-gradient-to-br from-yellow-50 to-amber-100 scale-105 z-10' : 'bg-white'
              }`}>
                <div className="absolute top-4 right-4">
                  {getRankIcon(index)}
                </div>
                <CardHeader className="flex flex-col items-center pb-2">
                  <Avatar className={`h-24 w-24 border-4 ${
                    index === 0 ? 'border-yellow-400' : index === 1 ? 'border-slate-300' : 'border-amber-500'
                  }`}>
                    <AvatarImage src={user.profileImage} />
                    <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-xl">{user.name}</CardTitle>
                  <Badge variant="outline" className="mt-1">{user.role}</Badge>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <div className="flex items-center text-2xl font-bold text-slate-900">
                    <Star className="mr-2 h-6 w-6 text-yellow-500 fill-yellow-500" />
                    {user.points}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Total Points</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Full Ranking Table */}
        <Card className="lg:col-span-3 border-none shadow-lg">
          <CardHeader>
            <CardTitle>Global Rankings</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard?.data?.map((user: any, index: number) => (
                    <TableRow key={user.id} className={index < 3 ? 'bg-slate-50/50' : ''}>
                      <TableCell className="font-medium">
                        <div className="flex items-center justify-center">
                          {getRankIcon(index)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.profileImage} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">{user.role}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-700">
                        {user.points.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
