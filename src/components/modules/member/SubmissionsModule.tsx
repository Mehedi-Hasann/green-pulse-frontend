'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { createSubmission } from '@/actions/submission.actions';
import { useRouter } from 'next/navigation';

export function SubmissionsModule({ 
  myChallenges, 
  submissions, 
  memberId 
}: { 
  myChallenges: any[], 
  submissions: any, 
  memberId: string 
}) {
  const router = useRouter();
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge || !files || files.length === 0) {
      toast.error('Please select a challenge and upload at least one image.');
      return;
    }

    setIsSubmitting(true);
    const memberChallenge = myChallenges?.find((mc: any) => mc.id === selectedChallenge);

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      memberChallengeId: selectedChallenge,
      challengeId: memberChallenge?.challengeId
    }));

    for (let i = 0; i < files.length; i++) {
      formData.append('proofs', files[i]);
    }

    try {
      const result = await createSubmission(formData);
      if (result.success) {
        toast.success('Proof submitted successfully! Awaiting verification.');
        setSelectedChallenge('');
        setDescription('');
        setFiles(null);
        router.refresh();
      } else {
        toast.error(result.error?.message || 'Failed to submit proof.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submissionsList = Array.isArray(submissions?.data?.data) 
    ? submissions.data.data 
    : (Array.isArray(submissions?.data) ? submissions.data : []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Submissions</h1>
          <p className="text-muted-foreground">Submit proof and track your challenge progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submit Form */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>New Submission</CardTitle>
            <CardDescription>Upload proof for your daily action.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="challenge">Select Challenge</Label>
                <Select 
                  value={selectedChallenge} 
                  onValueChange={(value) => setSelectedChallenge(value || '')}
                >
                  <SelectTrigger id="challenge">
                    <SelectValue placeholder="Select active challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {myChallenges && myChallenges.length > 0 ? (
                      myChallenges.map((mc: any) => (
                        <SelectItem key={mc.id} value={mc.id}>
                          {mc.challenge?.title || 'Unknown Challenge'}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No active challenges</SelectItem>
                    )}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
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
                {submissionsList.length > 0 ? (
                  submissionsList.map((sub: any) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">{sub.ChallengeName || sub.challenge?.title || 'Unknown'}</TableCell>
                      <TableCell>{new Date(sub.SubmissionDate || sub.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            (sub.Status || sub.status) === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                            (sub.Status || sub.status) === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {sub.Status || sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {(sub.Status || sub.status) === 'APPROVED' ? `+ ${sub.PointsAchieved}` : '0'}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
