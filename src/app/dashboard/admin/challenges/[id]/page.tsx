import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Trophy, Calendar, Coins, Tag, Clock, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChallengeEditDialog } from '@/components/modules/admin/ChallengeEditDialog';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

async function getChallengeDetails(id: string) {
  const cookieStore = await cookies();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const res = await fetch(`${API_URL}/super-admin/challenges/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
    },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return null;
  }
  
  const json = await res.json();
  return json.data || json;
}

export default async function AdminChallengeDetailsPage({ params }: Props) {
  const { id } = await params;
  const challenge = await getChallengeDetails(id);
  
  if (!challenge) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Challenge Details</h1>
          <p className="text-slate-500">Details for challenge ID: {id}</p>
        </div>
        <Link href="/dashboard/admin/challenges" className="text-sm font-medium text-green-600 hover:underline">
          Back to challenges
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Details Card */}
        <Card className="md:col-span-2 border-none shadow-md bg-white overflow-hidden">
          {/* Demo Image Banner */}
          <div className="w-full h-64 relative bg-slate-100">
            {/* Using a standard img tag to avoid next.config.js domain restrictions for demo purposes */}
            <img 
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200" 
              alt="Challenge Demo" 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-green-600" />
                  {challenge.title}
                </CardTitle>
                <CardDescription className="mt-2 text-base text-slate-600">
                  {challenge.description}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                {(() => {
                  switch (challenge.status) {
                    case 'UPCOMING':
                      return <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 text-blue-700 border-blue-200">Upcoming</Badge>;
                    case 'ACTIVE':
                      return <Badge variant="default" className="text-sm px-3 py-1 bg-green-600 hover:bg-green-700">Active</Badge>;
                    case 'COMPLETED':
                      return <Badge variant="secondary" className="text-sm px-3 py-1 bg-purple-100 text-purple-800">Completed</Badge>;
                    case 'CANCELLED':
                      return <Badge variant="destructive" className="text-sm px-3 py-1">Cancelled</Badge>;
                    default:
                      return <Badge variant="secondary" className="text-sm px-3 py-1">{challenge.status}</Badge>;
                  }
                })()}
                <ChallengeEditDialog challenge={challenge} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
               <div className="space-y-1">
                 <p className="text-sm text-slate-500 flex items-center gap-1"><Calendar className="h-4 w-4"/> Duration</p>
                 <p className="font-semibold text-slate-900">{challenge.duration} Days</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-slate-500 flex items-center gap-1"><Coins className="h-4 w-4"/> Points/Day</p>
                 <p className="font-semibold text-green-600">{challenge.pointsPerDay} pts</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-slate-500 flex items-center gap-1"><Tag className="h-4 w-4"/> Type</p>
                 <p className="font-semibold text-slate-900">{challenge.isPaid ? `Paid ($${challenge.price})` : 'Free'}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-slate-500 flex items-center gap-1"><Users className="h-4 w-4"/> Participants</p>
                 <p className="font-semibold text-slate-900">{challenge.activeParticipantCount || 0}</p>
               </div>
             </div>
          </CardContent>
        </Card>

        {/* Sidebar Information Card */}
        <Card className="border-none shadow-md bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Category Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {challenge.category ? (
              <>
                <div>
                  <p className="text-sm text-slate-500">Name</p>
                  <p className="font-medium text-slate-900">{challenge.category.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Description</p>
                  <p className="text-sm text-slate-700">{challenge.category.description}</p>
                </div>
                <div>
                  <Badge variant="outline" className={challenge.category.isActive ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                    {challenge.category.isActive ? 'Active Category' : 'Inactive Category'}
                  </Badge>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">No category assigned</p>
            )}
            
            <div className="pt-6 border-t border-slate-100">
               <p className="text-sm text-slate-500 flex items-center gap-1 mb-3"><Clock className="h-4 w-4"/> Timestamps</p>
               <div className="space-y-3 text-sm">
                 <div className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                   <span className="text-slate-500">Created</span>
                   <span className="text-slate-900 font-medium">{new Date(challenge.createdAt).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center bg-slate-50 p-2 rounded-md">
                   <span className="text-slate-500">Updated</span>
                   <span className="text-slate-900 font-medium">{new Date(challenge.updatedAt).toLocaleString()}</span>
                 </div>
               </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
