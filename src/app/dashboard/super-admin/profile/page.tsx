import { getMe } from "@/actions/auth.actions";
import { SuperAdminProfile } from "@/components/modules/SuperAdminProfile";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SuperAdminProfilePage() {
  const me = await getMe();
  const user = me?.data;

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <SuperAdminProfile initialUser={user} />
    </div>
  );
}
