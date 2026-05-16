import { getMe } from "@/actions/auth.actions";
import { getMemberChallengesByMemberId } from "@/actions/member-challenge.actions";
import { MyChallengesModule } from "@/components/modules/member/MyChallengesModule";

export const dynamic = "force-dynamic";

export default async function MyChallengesPage() {
  const me = await getMe();
  const memberId = me?.data?.member?.id;

  if (!memberId) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-bold">Session Error</h3>
        <p className="text-muted-foreground mt-2">Could not retrieve member information.</p>
      </div>
    );
  }

  const response = await getMemberChallengesByMemberId(memberId);

  return (
    <div>
      <MyChallengesModule challenges={response} />
    </div>
  );
}
