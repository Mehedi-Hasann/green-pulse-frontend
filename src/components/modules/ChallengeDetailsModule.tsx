'use client';

import { toast } from 'sonner';
import { 
  Leaf, Clock, Trophy, ChevronLeft, CheckCircle2, 
  AlertCircle, ShieldCheck, 
  Users, Star, Share2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { joinChallenge } from '@/actions/member-challenge.actions';

export function ChallengeDetailsModule({ challenge, isAuthenticated, user }: { challenge: any, isAuthenticated: boolean, user: any }) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const data = challenge.data;

  const handleJoin = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to join this challenge.');
      router.push(`/login?redirect=/challenges/${data.id}`);
      return;
    }

    setIsJoining(true);
    try {
      const result = await joinChallenge(data.id);
      if (result.success) {
        toast.success('Successfully joined the challenge!');
        router.push('/dashboard/member/my-challenges');
      } else {
        toast.error(result.error?.message || 'Failed to join challenge. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container py-12 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <Button variant="ghost" className="mb-8 hover:bg-white text-slate-500 hover:text-green-600 font-bold" asChild>
          <Link href="/challenges">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Challenges
          </Link>
        </Button>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Image & Media */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/3] md:aspect-video lg:aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white"
            >
              <Image
                src={data.image || '/placeholder-challenge.jpg'}
                alt={data.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
              <div className="absolute top-6 right-6">
                <Button size="icon" variant="secondary" className="bg-white/80 backdrop-blur hover:bg-white rounded-full shadow-lg">
                  <Share2 className="h-5 w-5 text-slate-700" />
                </Button>
              </div>
            </motion.div>

            {/* Content Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="bg-slate-200/50 p-1 rounded-2xl mb-8">
                <TabsTrigger value="details" className="rounded-xl px-8 py-3 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                <TabsTrigger value="how-to" className="rounded-xl px-8 py-3 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">How it works</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl px-8 py-3 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-8 mt-0">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">About the Challenge</h3>
                  <p className="text-lg leading-relaxed text-slate-600 mb-8 whitespace-pre-wrap">
                    {data.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="border-none bg-green-50 rounded-2xl overflow-hidden">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-green-600">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Verified Impact</p>
                          <p className="text-xs text-slate-500">Every submission is manually reviewed.</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-none bg-blue-50 rounded-2xl overflow-hidden">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">Community Support</p>
                          <p className="text-xs text-slate-500">Join 1,200+ others taking this action.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="how-to" className="mt-0">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">How to complete this challenge</h3>
                  <div className="space-y-8">
                    {[
                      { step: '01', title: 'Join the Challenge', desc: 'Click the join button and confirm your participation. You can join multiple challenges at once.' },
                      { step: '02', title: 'Perform Daily Action', desc: `Each day for ${data.duration} days, perform the specific eco-friendly action described in the challenge.` },
                      { step: '03', title: 'Submit Photo Evidence', desc: 'Take a clear photo of your action and upload it via your dashboard as daily proof.' },
                      { step: '04', title: 'Earn Points & Badges', desc: `Once your proofs are verified, you'll receive ${data.points} points and a permanent badge on your profile.` },
                    ].map((step) => (
                      <div key={step.step} className="flex gap-6">
                        <div className="flex-shrink-0 text-4xl font-black text-green-100">{step.step}</div>
                        <div>
                          <h4 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h4>
                          <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-0">
                <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-slate-900">Member Reviews</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-current" />)}
                      <span className="ml-2 font-bold text-slate-900">4.9 / 5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { name: 'Marcus Chen', date: '2 days ago', text: 'This challenge changed my daily routine! Really easy to follow and the points system is super motivating.' },
                      { name: 'Sarah Wilson', date: '1 week ago', text: 'Great for beginners. I never thought about how much energy I was wasting until I started this.' },
                    ].map((rev, i) => (
                      <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-4">
                          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={`https://i.pravatar.cc/100?u=${i}`} />
                            <AvatarFallback>{rev.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{rev.name}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase">{rev.date}</p>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full h-12 rounded-xl font-bold">Write a Review</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Sticky Stats & Action */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white overflow-hidden">
              <CardContent className="p-10">
                <div className="mb-6 flex items-center justify-between">
                  <Badge className="bg-green-600 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border-none shadow-md shadow-green-200">
                    {data.category.name}
                  </Badge>
                  {data.type === 'PAID' && (
                    <div className="text-2xl font-black text-blue-600">${data.price}</div>
                  )}
                </div>

                <h2 className="text-3xl font-black text-slate-900 leading-tight mb-8">
                  {data.title}
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Trophy className="h-6 w-6 text-amber-500 mb-2" />
                    <span className="text-xl font-black text-slate-900">{data.points}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Points</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Clock className="h-6 w-6 text-blue-500 mb-2" />
                    <span className="text-xl font-black text-slate-900">{data.duration}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Days</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShieldCheck className="h-6 w-6 text-green-500 mb-2" />
                    <span className="text-xl font-black text-slate-900">Pro</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-green-100 p-1 rounded-md"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                    Guaranteed impact verification
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-green-100 p-1 rounded-md"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                    Exclusive community access
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-green-100 p-1 rounded-md"><CheckCircle2 className="h-4 w-4 text-green-600" /></div>
                    Digital certificate upon completion
                  </div>
                </div>

                <div className="space-y-4">
                  {data.isJoined ? (
                    <Button size="lg" className="h-16 w-full bg-green-50 text-green-600 border-2 border-green-200 hover:bg-green-100 cursor-default rounded-2xl font-black text-lg" disabled>
                      Challenge Joined
                    </Button>
                  ) : (
                    <Button 
                      size="lg" 
                      className="h-16 w-full bg-slate-900 hover:bg-green-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 transition-all duration-300"
                      onClick={handleJoin}
                      disabled={isJoining}
                    >
                      {isJoining ? 'Joining...' : data.type === 'PAID' ? `Enroll for $${data.price}` : 'Start For Free'}
                    </Button>
                  )}
                  <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Safe & Secure Enrollment
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Author/Organizer Card */}
            <Card className="border-none shadow-sm rounded-3xl bg-white p-6">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Organized by</p>
                  <p className="text-sm font-bold text-slate-900">Green Pulse Foundation</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
