'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderTree, Edit, Trash2, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function AdminCategoriesModule({ categories }: { categories: any }) {
  // console.log("Categories is => ",categories)
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    
    try {
      setDeletingId(id);
      // console.log("ID is => ",id)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete category');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while deleting the category.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Categories</h1>
          <p className="text-slate-500">Organize challenges into categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-slate-900 hover:bg-slate-800 h-11 px-6 rounded-xl font-bold" asChild>
            <Link href="/dashboard/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Category
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Challenges Count</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(categories?.data?.data || (Array.isArray(categories?.data) ? categories.data : []))?.map((category: any) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <FolderTree className="h-5 w-5 text-blue-600" />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell className='ml-5'>{category.challengesCount || 0}</TableCell>
             
                  <TableCell>
                    {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/admin/categories/${category.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        disabled={deletingId === category.id}
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        {deletingId === category.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}