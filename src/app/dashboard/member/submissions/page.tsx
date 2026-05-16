import { getMe } from "@/actions/auth.actions";
import { getMyChallengesByMemberId } from "@/actions/member-challenge.actions";
import { getSubmissionsByMemberId } from "@/actions/submission.actions";
import { SubmissionsModule } from "@/components/modules/member/SubmissionsModule";

export const dynamic = "force-dynamic";

export default async function MemberSubmissionsPage() {
  const me = await getMe();
  // console.log("My profile", me);
  const memberId = me?.data?.member?.id;
  // console.log(memberId)



  // Fetch data in parallel
  const [myChallengesRes, submissionsRes] = await Promise.all([
    getMyChallengesByMemberId(),
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
