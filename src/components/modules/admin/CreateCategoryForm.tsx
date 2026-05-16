'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export function CreateCategoryForm() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      name,
      description,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Failed to create category');
        return;
      }

      router.push('/dashboard/admin/categories');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('An error occurred while creating the category.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-md bg-white max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Category Details</CardTitle>
        <CardDescription>Enter the details for the new category.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-sm">Category Name</Label>
              <Input
                id="name"
                placeholder="e.g. Tree Plantation"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-sm">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this category is about..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              asChild
              disabled={loading}
            >
              <Link href="/dashboard/admin/categories">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading || !name || !description}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Create Category
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
