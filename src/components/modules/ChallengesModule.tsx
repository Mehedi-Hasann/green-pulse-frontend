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
    <div className="container py-12 min-h-screen">
      {/* Header & Description */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
          Eco <span className="text-green-600">Challenges</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Join thousands of eco-warriors in actionable challenges that protect our planet. 
          Every small step counts towards a greener future.
        </p>
      </div>

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
                  <div className="absolute left-3 top-3 flex gap-2">
                    <Badge className={`${challenge.type === 'PAID' ? 'bg-blue-600' : 'bg-green-600'} border-none shadow-sm`}>
                      {challenge.type}
                    </Badge>
                    {challenge.price && (
                      <Badge variant="secondary" className="bg-white/90 backdrop-blur text-slate-900 border-none">
                        ${challenge.price}
                      </Badge>
                    )}
                  </div>
                </div>
                <CardHeader className="p-5 pb-0">
                  <div className="mb-3 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-green-600 border-green-100 bg-green-50">
                      {challenge.category.name}
                    </Badge>
                    <div className="flex items-center text-sm font-bold text-amber-500">
                      <Trophy className="mr-1 h-4 w-4 fill-current" />
                      {challenge.points}
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-1 group-hover:text-green-600 transition-colors">
                    {challenge.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-2 text-slate-500">
                    {challenge.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-sm text-slate-500 bg-slate-50 p-3 rounded-xl">
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-slate-400" />
                      <span>{challenge.duration} Days</span>
                    </div>
                    <div className="h-4 w-[1px] bg-slate-200" />
                    <div className="flex items-center">
                      <Leaf className="mr-2 h-4 w-4 text-green-500" />
                      <span>Verified</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button className="w-full h-11 bg-slate-900 hover:bg-green-600 text-white transition-colors rounded-xl font-bold" asChild>
                    <Link href={`/challenges/${challenge.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
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
