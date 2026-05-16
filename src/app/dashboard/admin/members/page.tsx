import { getAllMembers, getAllUsers } from "@/actions/admin.actions";
import { AdminMembersModule } from "@/components/modules/admin/AdminMembersModule";


export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const usersRes = await getAllMembers();
  
  const users = usersRes?.data?.data?.map((member: any) => ({
    id: member.id,
    name: member.user?.name || "N/A",
    email: member.user?.email || "N/A",
    status: member.user?.status || "PENDING",
    points: member.totalPoints || 0,
    joinedAt: member.createdAt,
    verified: member.user?.emailVerified || false,
    role: member.user?.role || "MEMBER",
    profileImage: member.user?.profileImage || "",
  })) || [];

  return (
    <div>
      <AdminMembersModule users={users} />
    </div>
  );
}