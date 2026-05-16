import { getMe } from "@/actions/auth.actions";
import { getMemberChallengesByMemberId } from "@/actions/member-challenge.actions";
import { getSubmissionsByMemberId } from "@/actions/submission.actions";
import { SubmissionsModule } from "@/components/modules/member/SubmissionsModule";

export const dynamic = "force-dynamic";

export default async function MemberSubmissionsPage() {
  const me = await getMe();
  // console.log("My profile", me);
  const memberId = me?.data?.member?.id;
  // console.log(memberId)

  if (!memberId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold">Session Error</h3>
        <p className="text-muted-foreground mt-2">Could not retrieve member information.</p>
      </div>
    );
  }

  // Fetch data in parallel
  const [myChallengesRes, submissionsRes] = await Promise.all([
    getMemberChallengesByMemberId(memberId),
    getSubmissionsByMemberId(memberId)
  ]);

  const myChallengesList = Array.isArray(myChallengesRes.data?.data) 
    ? myChallengesRes.data.data 
    : (Array.isArray(myChallengesRes.data) ? myChallengesRes.data : []);

  return (
    <div>
      <SubmissionsModule 
        myChallenges={myChallengesList} 
        submissions={submissionsRes} 
        memberId={memberId}
      />
    </div>
  );
}
