import { getMe } from "@/actions/auth.actions";
import { getMyChallengesByMemberId } from "@/actions/member-challenge.actions";
import { MyChallengesModule } from "@/components/modules/member/MyChallengesModule";

export const dynamic = "force-dynamic";

export default async function MyChallengesPage() {
  const me = await getMe();
  const memberId = me?.data?.member?.id;

  const response = await getMyChallengesByMemberId();
  console.log(response)

  return (
    <div>
      <MyChallengesModule challenges={response} />
    </div>
  );
}
