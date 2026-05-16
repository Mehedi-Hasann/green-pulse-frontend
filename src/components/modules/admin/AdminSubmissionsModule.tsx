'use client';

import { toast } from 'sonner';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, X, Eye, Filter, Loader2 } from 'lucide-react';
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
import { updateSubmission } from '@/actions/submission.actions';
import { useRouter } from 'next/navigation';

export function AdminSubmissionsModule({ submissions }: { submissions: any }) {
  const router = useRouter();
  const [isReviewing, setIsReviewing] = useState(false);
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  // Normalize nested API response: { data: { data: [] } } or { data: [] }
  const submissionList = Array.isArray(submissions?.data?.data)
    ? submissions.data.data
    : (Array.isArray(submissions?.data) ? submissions.data : []);

  const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    setIsReviewing(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/submissions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        toast.success(`Submission ${status.toLowerCase()} successfully.`);
        setOpenDialogId(null);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to review submission.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsReviewing(false);
    }
  };

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
              {submissionList.length > 0 ? (
                submissionList.map((sub: any) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{sub.member?.name || 'Unknown Member'}</span>
                        <span className="text-xs text-muted-foreground">Member ID: {sub.memberId}</span>
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
                      <div className="flex items-center justify-end gap-2">
                        {sub.status === 'PENDING' && (
                          <div className="flex items-center gap-1.5 mr-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 backdrop-blur-md text-green-600 hover:bg-green-500/20 hover:text-green-700 hover:scale-110 hover:shadow-md transition-all duration-300 ease-out"
                              onClick={() => handleReview(sub.id, 'APPROVED')}
                              disabled={isReviewing}
                              title="Quick Approve"
                            >
                              <Check className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md text-red-600 hover:bg-red-500/20 hover:text-red-700 hover:scale-110 hover:shadow-md hover:-rotate-90 transition-all duration-300 ease-out"
                              onClick={() => handleReview(sub.id, 'REJECTED')}
                              disabled={isReviewing}
                              title="Quick Reject"
                            >
                              <X className="h-4 w-4 stroke-[2.5]" />
                            </Button>
                          </div>
                        )}
                        <Dialog open={openDialogId === sub.id} onOpenChange={(open) => setOpenDialogId(open ? sub.id : null)}>
                          <DialogTrigger className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }))}>
                            <Eye className="h-4 w-4 mr-1" /> View Proof
                          </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Review Submission</DialogTitle>
                            <DialogDescription>
                              Submitted by {sub.member?.name || 'Unknown'} for {sub.challenge?.title}
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
                                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border bg-slate-100">
                                    <img src={url} alt={`Proof ${idx + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <DialogFooter className="mt-6 flex gap-2">
                            <Button 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                              onClick={() => handleReview(sub.id, 'REJECTED')}
                              disabled={isReviewing || sub.status !== 'PENDING'}
                            >
                              {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <X className="mr-2 h-4 w-4" />}
                              Reject
                            </Button>
                            <Button 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleReview(sub.id, 'APPROVED')}
                              disabled={isReviewing || sub.status !== 'PENDING'}
                            >
                              {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                              Approve & Award Points
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      </div>
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
