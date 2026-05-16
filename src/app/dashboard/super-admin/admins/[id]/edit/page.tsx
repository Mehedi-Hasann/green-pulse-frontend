import { getAdminById } from "@/actions/super-admin.actions";
import { EditAdminForm } from "@/components/modules/super-admin/EditAdminForm";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface EditAdminPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAdminPage({ params }: EditAdminPageProps) {
  const { id } = await params;
  const adminRes = await getAdminById(id);

  if (!adminRes.success || !adminRes.data) {
    redirect("/dashboard/super-admin/admins");
  }

  return (
    <div className="py-8 px-4">
      <EditAdminForm admin={adminRes.data} />
    </div>
  );
}
