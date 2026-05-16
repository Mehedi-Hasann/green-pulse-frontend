import { getAllAdmins } from "@/actions/super-admin.actions";
import { SuperAdminAdminsModule } from "@/components/modules/super-admin/SuperAdminAdminsModule";

export const dynamic = "force-dynamic";

export default async function SuperAdminAdminsPage() {
  const adminsRes = await getAllAdmins();

  return (
    <div>
      <SuperAdminAdminsModule admins={adminsRes} />
    </div>
  );
}