import { getDashboardSummary, getPendingSubmissions } from "@/actions/super-admin.actions";
import { AdminOverviewModule } from "@/components/modules/admin/AdminOverviewModule";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [summaryRes, submissionsRes] = await Promise.all([
    getDashboardSummary(),
    getPendingSubmissions()
  ]);

  return (
    <div>
      <AdminOverviewModule 
        summaryData={summaryRes?.data?.data || summaryRes?.data} 
        pendingSubmissions={submissionsRes?.data} 
      />
    </div>
  );
}
