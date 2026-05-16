import { getSingleUser, updateUser } from "@/actions/user.actions";
import { redirect } from "next/navigation";
import { EditUserForm } from "@/components/modules/admin/EditUserForm";

export const dynamic = "force-dynamic";

interface EditUserPageProps {
  params: Promise<{ id: string }>;
}

async function updateUserAction(formData: FormData) {
  'use server';

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const role = formData.get('role') as string;
  const status = formData.get('status') as string;

  const payload = { name, email, role, status };

  const result = await updateUser(id, payload);

  if (!result.success) {
    throw new Error(result.error?.message || 'Failed to update user');
  }

  redirect('/dashboard/admin/members');
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const userRes = await getSingleUser(id);

  if (!userRes.success || !userRes.data) {
    redirect("/dashboard/admin/members");
  }

  const user = userRes.data;

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Edit Member</h1>
        <p className="text-slate-500">Update member details and permissions.</p>
      </div>

      <EditUserForm user={user}  />
    </div>
  );
}