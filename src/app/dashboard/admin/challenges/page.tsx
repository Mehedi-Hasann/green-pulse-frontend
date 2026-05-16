import { getAllChallenges } from "@/actions/admin.actions";
import { AdminChallengesModule } from "@/components/modules/admin/AdminChallengesModule";

export const dynamic = "force-dynamic";

export default async function AdminChallengesPage() {
  const challengesRes = await getAllChallenges();

  // console.log(challengesRes.data.data)

  return (
    <div>
      <AdminChallengesModule challenges={challengesRes.data.data.data} />
    </div>
  );
}