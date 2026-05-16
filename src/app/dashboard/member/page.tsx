import { getMe } from "@/actions/auth.actions";
import { getMemberStats } from "@/actions/member.actions";
import { getMemberChallengesByMemberId } from "@/actions/member-challenge.actions";
import { getLeaderboard } from "@/actions/leaderboard.actions";
import { MemberOverviewModule } from "@/components/modules/member/MemberOverviewModule";

export const dynamic = "force-dynamic";

export default async function MemberOverviewPage() {
  const me = await getMe();
  const user = me?.data;
  const memberId = user?.member?.id;

  // Fetch data in parallel
  const [statsRes, activeChallengesRes, leaderboardRes] = await Promise.all([
    getMemberStats(),
    memberId ? getMemberChallengesByMemberId(memberId) : Promise.resolve({ success: false, data: [] }),
    getLeaderboard()
  ]);

  // console.log('challenges ',activeChallengesRes.data.data)


  return (
    <div>
      <MemberOverviewModule 
        user={user} 
        stats={statsRes}
        pointDetails={statsRes?.data?.memberChallengeStatus || []}
        activeChallenges={activeChallengesRes.data.data} 
        leaderboard={leaderboardRes} 
      />
    </div>
  );
}
