'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function CreateChallengeForm({ categories }: { categories: any[] }) {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [duration, setDuration] = useState('');
  const [pointsPerDay, setPointsPerDay] = useState('');
  const [isPaid, setIsPaid] = useState('Free');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('UPCOMING');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title,
      description,
      categoryId,
      duration: Number(duration),
      pointsPerDay: Number(pointsPerDay),
      isPaid: isPaid === 'Paid',
      price: isPaid === 'Paid' ? Number(price) : undefined,
      status,
    };
    

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/challenges`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Failed to create challenge');
        return;
      }

      router.push('/dashboard/admin/challenges');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the challenge.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl">Challenge Details</CardTitle>
        <CardDescription>Fill out the form below to create a new challenge.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="title" className="text-sm">Challenge Title</Label>
              <Input
                id="title"
                placeholder="e.g. 30 Days No Plastic"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what the challenge is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[60px] resize-none"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="category" className="text-sm">Category</Label>
              <Select value={categoryId} onValueChange={(val) => val && setCategoryId(val)} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="status" className="text-sm">Status</Label>
              <Select value={status} onValueChange={(val) => val && setStatus(val)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UPCOMING">Upcoming</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="duration" className="text-sm">Duration (Days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                placeholder="e.g. 30"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="points" className="text-sm">Points per Day</Label>
              <Input
                id="points"
                type="number"
                min="0"
                placeholder="e.g. 15"
                value={pointsPerDay}
                onChange={(e) => setPointsPerDay(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="type" className="text-sm">Challenge Type</Label>
              <Select value={isPaid} onValueChange={(val) => val && setIsPaid(val)}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Free">Free</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isPaid === 'Paid' && (
              <div className="space-y-1">
                <Label htmlFor="price" className="text-sm">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 9.99"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              asChild
              disabled={loading}
            >
              <Link href="/dashboard/admin/challenges">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading || !categoryId}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Challenge
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
