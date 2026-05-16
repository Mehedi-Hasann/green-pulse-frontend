'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Calendar, Target, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function MyChallengesModule({ challenges }: { challenges: any }) {
  const challengesList = Array.isArray(challenges?.data?.data) 
    ? challenges.data.data 
    : (Array.isArray(challenges?.data) ? challenges.data : []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Challenges</h1>
          <p className="text-muted-foreground">Manage and track your active eco-challenges.</p>
        </div>
        <Button asChild className="bg-green-600 hover:bg-green-700">
          <Link href="/challenges">Find More Challenges</Link>
        </Button>
      </div>

      {challengesList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challengesList.map((mc: any) => (
            <Card key={mc.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="h-2 bg-green-500" />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-wider">
                    {mc.challenge.category?.name || 'Challenge'}
                  </Badge>
                  <Trophy className="h-4 w-4 text-yellow-500" />
                </div>
                <CardTitle className="text-lg font-bold">{mc.challenge.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">
                  {mc.challenge.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-xs font-medium text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    {mc.challenge.duration} Days
                  </span>
                  <span className="flex items-center">
                    <Target className="mr-1 h-3 w-3" />
                    {mc.challenge.points} Points
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                    <span>Progress</span>
                    <span>{Math.round((mc.submissionCount / mc.challenge.duration) * 100)}%</span>
                  </div>
                  <Progress value={(mc.submissionCount / mc.challenge.duration) * 100} className="h-1.5" />
                </div>

                <Button variant="outline" size="sm" className="w-full mt-2 text-green-600 border-green-200 hover:bg-green-50" asChild>
                  <Link href={`/dashboard/member/submissions?challengeId=${mc.challengeId}`}>
                    Submit Proof <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 bg-slate-50">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-slate-200 p-4 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold">No active challenges</h3>
            <p className="text-muted-foreground max-w-sm mt-2">
              You haven&apos;t joined any challenges yet. Start your eco-journey today!
            </p>
            <Button className="mt-6 bg-slate-900" asChild>
              <Link href="/challenges">Browse Challenges</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
