'use client';

import { useQuery } from '@tanstack/react-query';
import { challengeService, IChallenge } from '@/services/challenge.service';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Leaf, Clock, Trophy, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ChallengesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => challengeService.getAllChallenges(),
  });

  const filteredChallenges = challenges?.data?.filter((challenge: IChallenge) =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Eco Challenges</h1>
          <p className="text-muted-foreground">Choose a challenge and start making a difference today.</p>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-2 h-4 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredChallenges?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge: IChallenge) => (
            <Card key={challenge.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={challenge.image || '/placeholder-challenge.jpg'}
                  alt={challenge.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge className={challenge.type === 'PAID' ? 'bg-blue-600' : 'bg-green-600'}>
                    {challenge.type}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-xs font-normal">
                    {challenge.category.name}
                  </Badge>
                  <div className="flex items-center text-sm font-medium text-amber-600">
                    <Trophy className="mr-1 h-4 w-4" />
                    {challenge.points} pts
                  </div>
                </div>
                <CardTitle className="line-clamp-1">{challenge.title}</CardTitle>
                <CardDescription className="line-clamp-2">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{challenge.duration} Days Duration</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href={`/challenges/${challenge.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <Leaf className="h-12 w-12 text-muted-foreground opacity-20" />
          <h3 className="mt-4 text-lg font-medium">No challenges found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
