'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Clock, Trophy, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';

export function ChallengesModule({ challenges, categories }: { challenges: any, categories: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('categoryId') || 'all');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateFilters({ searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries({
      searchTerm,
      categoryId: categoryFilter,
      type: typeFilter,
      sortBy,
      ...newFilters
    }).forEach(([key, value]) => {
      if (value && value !== 'all') {
        params.set(key, value as string);
      } else {
        params.delete(key);
      }
    });

    router.push(`/challenges?${params.toString()}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setTypeFilter('all');
    setSortBy('newest');
    router.push('/challenges');
  };

  const challengeList = challenges?.data?.data || (Array.isArray(challenges?.data) ? challenges.data : []);
  const categoryList = categories?.data?.data || (Array.isArray(categories?.data) ? categories.data : []);

  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 py-12 min-h-screen">
      {/* Header & Description
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Eco <span className="text-green-600">Challenges</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Join thousands of eco-warriors in actionable challenges that protect our planet. 
          Every small step counts towards a greener future.
        </p>
      </div> */}

      {/* Filters Bar */}
      <div className="mb-10 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or description..."
            className="pl-10 h-11 bg-slate-50 border-none focus-visible:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">Category:</span>
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => {
                setCategoryFilter(value || '');
                updateFilters({ categoryId: value === 'all' ? undefined : value || undefined });
              }}
            >
              <SelectTrigger className="w-[140px] h-11 bg-slate-50 border-none">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryList.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">Type:</span>
            <Select 
              value={typeFilter} 
              onValueChange={(value) => {
                setTypeFilter(value || '');
                updateFilters({ type: value === 'all' ? undefined : value || undefined });
              }}
            >
              <SelectTrigger className="w-[120px] h-11 bg-slate-50 border-none">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="FREE">Free</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500 hidden sm:inline">Sort:</span>
            <Select 
              value={sortBy} 
              onValueChange={(value) => {
                setSortBy(value || '');
                updateFilters({ sortBy: value === 'default' ? undefined : value || undefined });
              }}
            >
              <SelectTrigger className="w-[140px] h-11 bg-slate-50 border-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="points-high">Highest Points</SelectItem>
                <SelectItem value="points-low">Lowest Points</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" className="text-slate-500 hover:text-green-600" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </div>

      {/* Content Grid */}
      {challengeList.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {challengeList.map((challenge: any) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Card className="group flex flex-col h-full overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl bg-white">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={challenge.image || '/placeholder-challenge.jpg'}
                    alt={challenge.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute left-3 top-3 flex flex-col gap-2">
                    <Badge className={`${challenge.isPaid ? 'bg-blue-600' : 'bg-green-600'} border-none shadow-sm font-bold`}>
                      {challenge.isPaid ? 'Premium' : 'Free'}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 backdrop-blur text-slate-900 border-none font-bold uppercase text-[10px] tracking-widest">
                      {challenge.status}
                    </Badge>
                  </div>
                  <div className="absolute right-3 top-3">
                    <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                      <Trophy className="h-4 w-4 text-amber-500 fill-current" />
                      <span className="text-sm font-black text-slate-900">{challenge.points}</span>
                    </div>
                  </div>
                </div>
                <CardHeader className="p-5 pb-0">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-[10px] font-black uppercase tracking-[0.15em] text-green-600 border-green-200 bg-green-50/50 px-2 py-0.5">
                      {challenge.category?.name || 'Uncategorized'}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-green-600 transition-colors">
                    {challenge.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-slate-500 text-sm leading-relaxed">
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-4 mt-auto">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Duration</span>
                      <div className="flex items-center mt-0.5">
                        <Clock className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                        <span className="text-sm font-bold text-slate-700">{challenge.duration} Days</span>
                      </div>
                    </div>
                    <div className="flex flex-col p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rewards</span>
                      <div className="flex items-center mt-0.5">
                        <Leaf className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                        <span className="text-sm font-bold text-slate-700">{challenge.pointsPerDay} Pts/Day</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white">
                    <div className="flex flex-col">
                      {challenge.isPaid ? (
                        <>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Challenge Price</span>
                          <span className="text-sm font-black text-white">${challenge.price || 0}</span>
                        </>
                      ) : (
                        <span className="text-sm font-black text-green-400 uppercase tracking-widest">Free</span>
                      )}
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg h-8 px-4 text-xs" asChild>
                      <Link href={`/challenges/${challenge.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="bg-slate-200 p-4 rounded-full mb-4">
            <Search className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">No challenges found</h3>
          <p className="text-slate-500 mt-2 text-center max-w-sm">
            We could not find any challenges matching your current filters. 
            Try resetting them or searching for something else.
          </p>
          <Button variant="outline" className="mt-8 h-12 px-8 border-2" onClick={resetFilters}>
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
