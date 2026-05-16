'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Crown, Leaf, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export function LeaderboardModule({ leaderboard }: { leaderboard: any }) {
  const leaderboardData = leaderboard?.data?.data || (Array.isArray(leaderboard?.data) ? leaderboard.data : []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="h-8 w-8 text-yellow-500 fill-yellow-500/20" />;
      case 1:
        return <Medal className="h-8 w-8 text-slate-400 fill-slate-400/20" />;
      case 2:
        return <Medal className="h-8 w-8 text-amber-600 fill-amber-600/20" />;
      default:
        return <span className="text-lg font-black text-slate-300">#{index + 1}</span>;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="container py-16 max-w-6xl mx-auto">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-4"
          >
            <Trophy className="h-3.5 w-3.5" /> Hall of Fame
          </motion.div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4 italic">
            Eco <span className="text-green-600">Warriors</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Honoring the individuals making the biggest impact on our planet. 
            Join the movement and climb the ranks.
          </p>
        </div>

        {/* Podium Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-end">
          {/* 2nd Place */}
          {leaderboardData[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="order-2 md:order-1"
            >
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden text-center pb-8 pt-12">
                <div className="absolute top-6 left-6">
                  <Medal className="h-8 w-8 text-slate-400" />
                </div>
                <div className="relative inline-block mb-6">
                  <Avatar className="h-24 w-24 border-4 border-slate-100 shadow-lg">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${leaderboardData[1].id}`} />
                    <AvatarFallback className="text-2xl font-black">{leaderboardData[1].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white h-8 w-8 rounded-full flex items-center justify-center font-black border-4 border-white">2</div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{leaderboardData[1].name}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Silver Warrior</p>
                <div className="bg-slate-50 mx-8 py-3 rounded-2xl">
                  <p className="text-2xl font-black text-slate-900">{leaderboardData[1].points.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Points</p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* 1st Place */}
          {leaderboardData[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-1 md:order-2"
            >
              <Card className="border-none shadow-2xl rounded-[3rem] bg-slate-900 text-white overflow-hidden text-center pb-12 pt-16 scale-110 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-transparent opacity-50" />
                <div className="absolute top-8 right-8">
                  <Crown className="h-10 w-10 text-yellow-400" />
                </div>
                <div className="relative inline-block mb-8">
                  <Avatar className="h-32 w-32 border-4 border-yellow-400 shadow-2xl shadow-yellow-400/20">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${leaderboardData[0].id}`} />
                    <AvatarFallback className="text-4xl font-black">{leaderboardData[0].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-slate-900 h-10 w-10 rounded-full flex items-center justify-center font-black border-4 border-slate-900">1</div>
                </div>
                <h3 className="text-2xl font-black mb-1 relative z-10">{leaderboardData[0].name}</h3>
                <p className="text-sm font-bold text-green-400 uppercase tracking-widest mb-6 relative z-10">Grand Champion</p>
                <div className="bg-white/10 mx-10 py-4 rounded-3xl backdrop-blur relative z-10 border border-white/10">
                  <p className="text-3xl font-black">{leaderboardData[0].points.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Total Points</p>
                </div>
              </Card>
            </motion.div>
          )}

          {/* 3rd Place */}
          {leaderboardData[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="order-3"
            >
              <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden text-center pb-8 pt-12">
                <div className="absolute top-6 right-6">
                  <Medal className="h-8 w-8 text-amber-600" />
                </div>
                <div className="relative inline-block mb-6">
                  <Avatar className="h-24 w-24 border-4 border-amber-100 shadow-lg">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=${leaderboardData[2].id}`} />
                    <AvatarFallback className="text-2xl font-black">{leaderboardData[2].name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-amber-600 text-white h-8 w-8 rounded-full flex items-center justify-center font-black border-4 border-white">3</div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{leaderboardData[2].name}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Bronze Warrior</p>
                <div className="bg-amber-50 mx-8 py-3 rounded-2xl">
                  <p className="text-2xl font-black text-slate-900">{leaderboardData[2].points.toLocaleString()}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Points</p>
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Full Rankings Table */}
        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
          <CardHeader className="p-10 pb-6 border-b border-slate-50 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-black text-slate-900 tracking-tight">Global Rankings</CardTitle>
              <CardDescription className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mt-1">Live updates every 15 minutes</CardDescription>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-black italic">Active Community</span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="w-[100px] font-black text-slate-900 p-6 uppercase tracking-widest text-[10px]">Rank</TableHead>
                  <TableHead className="font-black text-slate-900 p-6 uppercase tracking-widest text-[10px]">Member</TableHead>
                  <TableHead className="font-black text-slate-900 p-6 uppercase tracking-widest text-[10px]">Role</TableHead>
                  <TableHead className="text-right font-black text-slate-900 p-6 uppercase tracking-widest text-[10px]">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((user: any, index: number) => (
                  <TableRow key={user.id} className="border-slate-50 hover:bg-slate-50/80 transition-colors group">
                    <TableCell className="p-6">
                      <div className="flex items-center justify-center">
                        {getRankIcon(index)}
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm ring-2 ring-slate-100">
                          <AvatarImage src={`https://i.pravatar.cc/100?u=${user.id}`} />
                          <AvatarFallback className="font-bold">{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-slate-900 group-hover:text-green-600 transition-colors">{user.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Joined 2024</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-6">
                      <Badge variant="outline" className="rounded-lg border-slate-200 text-slate-500 font-bold px-3 py-1 text-[10px] uppercase tracking-wider">{user.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right p-6">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xl font-black text-slate-900">{user.points.toLocaleString()}</span>
                        <Leaf className="h-4 w-4 text-green-500" />
                      </div>
                    </TableCell>
                  </TableRow>
                )) }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
