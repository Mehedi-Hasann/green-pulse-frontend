/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { challengeService, IChallenge } from '@/services/challenge.service';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { 
  Leaf, 
  Clock, 
  Trophy, 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  Layers
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

export default function ChallengeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuthStore();

  const { data: challenge, isLoading, error } = useQuery({
    queryKey: ['challenge', id],
    queryFn: () => challengeService.getChallengeById(id as string),
    enabled: !!id,
  });

  const joinMutation = useMutation({
    mutationFn: () => challengeService.joinChallenge(id as string),
    onSuccess: () => {
      toast.success('Successfully joined the challenge!');
      queryClient.invalidateQueries({ queryKey: ['challenge', id] });
      router.push('/dashboard/member/my-challenges');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to join challenge. Please try again.');
    },
  });

  const handleJoin = () => {
    if (!isAuthenticated) {
      toast.error('Please login to join this challenge.');
      router.push(`/login?redirect=/challenges/${id}`);
      return;
    }
    joinMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="container py-12">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !challenge?.data) {
    return (
      <div className="container flex flex-col items-center justify-center py-24 text-center">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold">Challenge not found</h1>
        <p className="text-muted-foreground mt-2">The challenge you are looking for does not exist or has been removed.</p>
        <Button className="mt-6" asChild>
          <Link href="/challenges">Back to Challenges</Link>
        </Button>
      </div>
    );
  }

  const data: IChallenge = challenge.data;

  return (
    <div className="container py-12">
      <Button variant="ghost" className="mb-8" asChild>
        <Link href="/challenges">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Challenges
        </Link>
      </Button>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg lg:aspect-square">
          <Image
            src={data.image || '/placeholder-challenge.jpg'}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-4 flex items-center gap-2">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1">
              {data.category.name}
            </Badge>
            <Badge variant="outline" className={data.type === 'PAID' ? 'text-blue-600 border-blue-200' : 'text-green-600 border-green-200'}>
              {data.type}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            {data.title}
          </h1>
          
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <div className="flex flex-col space-y-1">
              <span className="flex items-center text-sm text-muted-foreground">
                <Trophy className="mr-2 h-4 w-4 text-amber-500" /> Points
              </span>
              <span className="text-xl font-bold">{data.points} pts</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4 text-blue-500" /> Duration
              </span>
              <span className="text-xl font-bold">{data.duration} Days</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4 text-purple-500" /> Tasks
              </span>
              <span className="text-xl font-bold">Daily Proofs</span>
            </div>
          </div>

          <div className="mt-10 border-t pt-10">
            <h3 className="text-lg font-semibold mb-4">About this challenge</h3>
            <p className="text-lg leading-relaxed text-slate-600">
              {data.description}
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <h4 className="font-semibold text-slate-900">What you will get:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-slate-600">
                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" /> Personal growth and satisfaction
              </li>
              <li className="flex items-center text-slate-600">
                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" /> Achievement badge on your profile
              </li>
              <li className="flex items-center text-slate-600">
                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" /> Community recognition
              </li>
            </ul>
          </div>

          <div className="mt-12">
            {data.isJoined ? (
              <Button size="lg" className="h-14 w-full bg-green-100 text-green-700 hover:bg-green-200 cursor-default" disabled>
                Already Joined
              </Button>
            ) : (
              <Button 
                size="lg" 
                className="h-14 w-full bg-green-600 px-8 hover:bg-green-700 text-lg font-bold"
                onClick={handleJoin}
                disabled={joinMutation.isPending}
              >
                {joinMutation.isPending ? 'Joining...' : data.type === 'PAID' ? `Join for $${data.price}` : 'Join for Free'}
              </Button>
            )}
            <p className="mt-4 text-center text-xs text-muted-foreground">
              By joining, you agree to our terms of service and community guidelines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
