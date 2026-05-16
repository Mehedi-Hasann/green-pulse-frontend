'use client';

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
import { Trophy, Edit, Trash2, Eye, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export function AdminChallengesModule({ challenges }: { challenges: any }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this challenge?')) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/challenges/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Failed to delete challenge');
      }
    } catch (error) {
      console.error('Failed to delete challenge:', error);
      alert('An error occurred while deleting');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Manage Challenges</h1>
          <p className="text-slate-500">Create, edit, and manage all platform challenges.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-slate-900 hover:bg-slate-800 h-11 px-6 rounded-xl font-bold" asChild>
            <Link href="/dashboard/admin/challenges/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Challenge
            </Link>
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">All Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Points/Day</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(Array.isArray(challenges) ? challenges : [])?.map((challenge: any) => (
                <TableRow key={challenge.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Trophy className="h-5 w-5 text-green-600" />
                      {challenge.title}
                    </div>
                  </TableCell>
                  <TableCell>{challenge.category?.name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {challenge.pointsPerDay} pts
                    </Badge>
                  </TableCell>
                  <TableCell>{challenge.duration} Days</TableCell>
                  <TableCell>
                    {(() => {
                      switch (challenge.status) {
                        case 'UPCOMING':
                          return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
                        case 'ACTIVE':
                          return <Badge variant="default" className="bg-green-600 hover:bg-green-700">Active</Badge>;
                        case 'COMPLETED':
                          return <Badge variant="secondary" className="bg-purple-100 text-purple-800">Completed</Badge>;
                        case 'CANCELLED':
                          return <Badge variant="destructive">Cancelled</Badge>;
                        default:
                          return <Badge variant="secondary">{challenge.status}</Badge>;
                      }
                    })()}
                  </TableCell>
                  <TableCell>{challenge._count?.memberChallenges || 0}</TableCell>
                  <TableCell>
                    {challenge.createdAt ? new Date(challenge.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/admin/challenges/${challenge.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(challenge.id)}
                        disabled={deletingId === challenge.id}
                      >
                        {deletingId === challenge.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              
              {(!Array.isArray(challenges) || challenges.length === 0) && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-slate-500">
                    No challenges found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}