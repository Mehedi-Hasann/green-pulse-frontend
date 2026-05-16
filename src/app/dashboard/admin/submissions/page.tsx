import { getAllSubmissions } from "@/actions/submission.actions";
import { AdminSubmissionsModule } from "@/components/modules/admin/AdminSubmissionsModule";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const submissions = await getAllSubmissions();

  return (
    <div>
      <AdminSubmissionsModule submissions={submissions} />
    </div>
  );
}
