import { getAllUsers } from "@/actions/admin.actions";
import { AdminMembersModule } from "@/components/modules/admin/AdminMembersModule";


export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const usersRes = await getAllUsers();
  const users = usersRes?.data?.data || [];

  return (
    <div>
      <AdminMembersModule users={users} />
    </div>
  );
}