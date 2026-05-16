import { getMe } from "@/actions/auth.actions";
import { ProfileModule } from "@/components/modules/ProfileModule";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfileEditPage() {
  const me = await getMe();
  const user = me?.data;

  // console.log(user)

  // if (!user) {
  //   redirect("/login");
  // }

  return (
    <div>
      <ProfileModule initialUser={user} />
    </div>
  );
}
