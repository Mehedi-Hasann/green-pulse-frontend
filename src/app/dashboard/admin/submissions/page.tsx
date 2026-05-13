'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, Loader2, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from 'next/image';

export default function AdminSubmissions() {
  const queryClient = useQueryClient();
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['admin-all-submissions'],
    queryFn: async () => {
      const response = await axiosInstance.get('/submissions');
      return response.data;
    },
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'APPROVED' | 'REJECTED' }) => 
      axiosInstance.patch(`/submissions/${id}/review`, { status }),
    onSuccess: () => {
      toast.success('Submission reviewed successfully.');
      setSelectedSubmission(null);
      queryClient.invalidateQueries({ queryKey: ['admin-all-submissions'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to review submission.');
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Submissions</h1>
          <p className="text-muted-foreground">Verify member proofs and award points.</p>
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Challenge</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={5}><div className="h-12 w-full animate-pulse bg-slate-100 rounded" /></TableCell>
                  </TableRow>
                ))
              ) : submissions?.data?.length > 0 ? (
                submissions.data.map((sub: any) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{sub.user.name}</span>
                        <span className="text-xs text-muted-foreground">{sub.user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>{sub.challenge.title}</TableCell>
                    <TableCell>{new Date(sub.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          sub.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                          sub.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedSubmission(sub)}>
                            <Eye className="h-4 w-4 mr-1" /> View Proof
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission</DialogTitle>
                            <DialogDescription>
                              Submitted by {sub.user.name} for {sub.challenge.title}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="mt-4 space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg">
                              <h4 className="text-sm font-semibold mb-2">Member Description:</h4>
                              <p className="text-sm">{sub.description || "No description provided."}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Attached Proofs:</h4>
                              <div className="grid grid-cols-2 gap-4">
                                {sub.proofs?.map((url: string, idx: number) => (
                                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border">
                                    <Image src={url} alt={`Proof ${idx + 1}`} fill className="object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="mt-6 flex gap-2">
                            <Button 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                              onClick={() => reviewMutation.mutate({ id: sub.id, status: 'REJECTED' })}
                              disabled={reviewMutation.isPending || sub.status !== 'PENDING'}
                            >
                              <X className="mr-2 h-4 w-4" /> Reject
                            </Button>
                            <Button 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => reviewMutation.mutate({ id: sub.id, status: 'APPROVED' })}
                              disabled={reviewMutation.isPending || sub.status !== 'PENDING'}
                            >
                              <Check className="mr-2 h-4 w-4" /> Approve & Award Points
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No submissions found.
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
