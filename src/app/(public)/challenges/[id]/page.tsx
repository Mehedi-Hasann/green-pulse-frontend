import { challengeService } from "@/services/challenge.service";
import { getMe } from "@/actions/auth.actions";
import { ChallengeDetailsModule } from "@/components/modules/ChallengeDetailsModule";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ChallengeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Fetch data in parallel
  const [challengeRes, meRes] = await Promise.all([
    challengeService.getChallengeById(id),
    getMe()
  ]);

  if (!challengeRes.success || !challengeRes.data) {
    return (
      <div className="container flex flex-col items-center justify-center py-32 text-center">
        <div className="bg-red-50 p-6 rounded-full mb-6">
          <AlertCircle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Challenge not found</h1>
        <p className="text-slate-500 mt-2 max-w-md">The challenge you are looking for does not exist or has been removed.</p>
        <Button className="mt-8 bg-slate-900 h-12 px-8" asChild>
          <Link href="/challenges">Back to Explore</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ChallengeDetailsModule 
        challenge={challengeRes} 
        isAuthenticated={!!meRes.data} 
        user={meRes.data} 
      />
    </div>
  );
}
