'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Leaf, 
  Clock, 
  Trophy, 
  ChevronLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap,
  ArrowRight,
  Info,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { joinChallenge } from '@/actions/member-challenge.actions';

export function ChallengeDetailModule({ challenge }: { challenge: any }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);

  const handleStartChallenge = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to join the challenge.');
      router.push('/login');
      return;
    }

    if (user?.role !== 'MEMBER') {
      toast.error('Only members can participate in challenges.');
      return;
    }

    setIsJoining(true);
    toast.loading('Joining challenge...', { id: 'join-challenge' });
    try {
      const result = await joinChallenge(challenge.id);
      if (result.success) {
        toast.success('Successfully joined the challenge!', { id: 'join-challenge' });
        router.push('/dashboard/member/my-challenges');
      } else {
        toast.error(result.error?.message || 'Failed to join challenge.', { id: 'join-challenge' });
      }
    } catch (error) {
      toast.error('An unexpected error occurred.', { id: 'join-challenge' });
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-30">
        <div className="container h-16 flex items-center justify-between">
          <Link 
            href="/challenges" 
            className="flex items-center text-sm font-medium text-slate-500 hover:text-green-600 transition-colors group"
          >
            <ChevronLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Challenges
          </Link>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="hidden sm:flex border-green-100 bg-green-50 text-green-700">
              {challenge.category?.name}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image & Header */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100"
            >
              <div className="relative h-[400px] w-full">
                <Image
                  src={challenge.image || '/placeholder-challenge.jpg'}
                  alt={challenge.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={`${challenge.isPaid ? 'bg-blue-600' : 'bg-green-600'} border-none shadow-lg px-4 py-1`}>
                      {challenge.isPaid ? 'Premium' : 'Free'}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 backdrop-blur-md text-white border-white/20 px-4 py-1 uppercase tracking-widest text-[10px]">
                      {challenge.status}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                    {challenge.title}
                  </h1>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-green-600" />
                  About this Challenge
                </h3>
                <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {challenge.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                  <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center shrink-0">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">How it works</h4>
                      <p className="text-sm text-slate-500 mt-1">Complete daily tasks for {challenge.duration} days to earn your eco-badges.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Verified Proof</h4>
                      <p className="text-sm text-slate-500 mt-1">Upload photos or logs daily to verify your impact and claim rewards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            {/* Join Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-none shadow-xl bg-white rounded-[2rem] overflow-hidden sticky top-24">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Reward Potential</span>
                      <div className="flex items-center mt-2">
                        <Trophy className="h-8 w-8 text-amber-500 mr-3" />
                        <div>
                          <p className="text-3xl font-black text-slate-900">{challenge.points} <span className="text-lg font-bold text-slate-400">Pts</span></p>
                          <p className="text-xs font-bold text-green-600 uppercase tracking-wider">{challenge.pointsPerDay} Points / Day</p>
                        </div>
                      </div>
                    </div>

                    <div className="h-px bg-slate-100 w-full" />

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 rounded-2xl bg-slate-50">
                        <Clock className="h-5 w-5 text-slate-400 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-400 uppercase">Duration</p>
                        <p className="text-lg font-black text-slate-900">{challenge.duration} Days</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-50">
                        <Leaf className="h-5 w-5 text-green-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-400 uppercase">Impact</p>
                        <p className="text-lg font-black text-slate-900">High</p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="mb-6 flex items-center justify-between">
                        <span className="text-lg font-bold text-slate-900">Participation Fee</span>
                        <span className={`text-2xl font-black ${challenge.isPaid ? 'text-blue-600' : 'text-green-600 uppercase'}`}>
                          {challenge.isPaid ? `$${challenge.price}` : 'Free'}
                        </span>
                      </div>
                      <Button 
                        size="lg" 
                        className="w-full h-16 rounded-2xl bg-slate-900 hover:bg-green-600 text-lg font-black shadow-xl shadow-slate-200 transition-all hover:scale-[1.02]"
                        disabled={isJoining}
                        onClick={handleStartChallenge}
                      >
                        {isJoining ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          <>
                            Start Challenge Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      <p className="text-center text-[10px] text-slate-400 mt-4 px-6 uppercase tracking-widest font-bold">
                        By joining, you agree to the challenge rules and verification guidelines.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Verification Stats */}
            <div className="p-8 bg-green-900 rounded-[2rem] text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="h-40 w-40" />
              </div>
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-4">Challenge Goals</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm font-medium text-green-100">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                    Daily impact verification
                  </li>
                  <li className="flex items-center text-sm font-medium text-green-100">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                    Community photo sharing
                  </li>
                  <li className="flex items-center text-sm font-medium text-green-100">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-400" />
                    Eco-badge certification
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
