/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionService } from '@/services/submission.service';
import { challengeService } from '@/services/challenge.service';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Upload, CheckCircle2, History, Loader2, Image as ImageIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function MemberSubmissions() {
  const queryClient = useQueryClient();
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);

  const { user } = useAuthStore();
  const memberId = (user as any)?.member?.id || (user as any)?.admin?.id || (user as any)?.superAdmin?.id;

  const { data: myChallenges } = useQuery({
    queryKey: ['my-active-challenges', memberId],
    queryFn: async () => {
      if (!memberId) return [];
      const response = await challengeService.getMyJoinedChallenges(memberId);
      return response.data; // This returns MemberChallenge array
    },
    enabled: !!memberId,
  });

  const { data: submissions, isLoading: submissionsLoading } = useQuery({
    queryKey: ['my-submissions', memberId],
    queryFn: () => submissionService.getMySubmissions(memberId),
    enabled: !!memberId,
  });

  const submitMutation = useMutation({
    mutationFn: (formData: FormData) => submissionService.submitProof(formData),
    onSuccess: () => {
      toast.success('Proof submitted successfully! Awaiting verification.');
      setSelectedChallenge('');
      setDescription('');
      setFiles(null);
      queryClient.invalidateQueries({ queryKey: ['my-submissions'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit proof.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge || !files || files.length === 0) {
      toast.error('Please select a challenge and upload at least one image.');
      return;
    }

    // Find the memberChallengeId from our fetched list
    const memberChallenge = myChallenges?.find((mc: any) => mc.id === selectedChallenge);
    const memberId = (user as any)?.member?.id;

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      memberChallengeId: selectedChallenge, // In MemberSubmissions, the selected value is mc.id
      memberId: memberId,
      challengeId: memberChallenge?.challengeId,
      description: description
    }));

    for (let i = 0; i < files.length; i++) {
      formData.append('proofs', files[i]);
    }

    submitMutation.mutate(formData);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Submissions</h1>
        <p className="text-muted-foreground">Upload your progress and earn points.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Submission Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5 text-green-600" />
              New Submission
            </CardTitle>
            <CardDescription>Submit your daily proof of action.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenge">Select Challenge</Label>
                <Select
                  value={selectedChallenge}
                  onValueChange={(value) => setSelectedChallenge(value || '')}
                >
                  <SelectTrigger id="challenge">
                    <SelectValue placeholder="Choose a challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {myChallenges?.map((mc: any) => (
                      <SelectItem key={mc.id} value={mc.id}>
                        {mc.challenge.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">What did you do? (Optional)</Label>
                <Textarea 
                  id="description" 
                  placeholder="Tell us about your action today..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="proofs">Upload Proof (Images)</Label>
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 transition-colors hover:border-green-400">
                  <Input 
                    id="proofs" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => setFiles(e.target.files)}
                  />
                  <Label htmlFor="proofs" className="flex cursor-pointer flex-col items-center">
                    <ImageIcon className="mb-2 h-8 w-8 text-slate-400" />
                    <span className="text-sm font-medium text-slate-600">
                      {files ? `${files.length} file(s) selected` : 'Click to select or drag and drop'}
                    </span>
                    <span className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</span>
                  </Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700" 
                disabled={submitMutation.isPending}
              >
                {submitMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  'Submit Proof'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Submission History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="mr-2 h-5 w-5 text-blue-600" />
              Submission History
            </CardTitle>
            <CardDescription>Track the status of your recent submissions.</CardDescription>
          </CardHeader>
          <CardContent>
            {submissionsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Challenge</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions?.data?.length > 0 ? (
                    submissions.data.map((sub: any) => (
                      <TableRow key={sub.id}>
                        <TableCell className="font-medium">{sub.challenge.title}</TableCell>
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
                        <TableCell className="text-right font-bold">
                          {sub.status === 'APPROVED' ? `+${sub.challenge.points}` : '0'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                        <CheckCircle2 className="mx-auto h-8 w-8 opacity-20 mb-2" />
                        No submissions yet. Start a challenge and earn points!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
