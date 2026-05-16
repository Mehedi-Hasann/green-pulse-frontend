import { getAnalytics } from "@/actions/super-admin.actions";
import { AdminAnalyticsModule } from "@/components/modules/admin/AdminAnalyticsModule";

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
  const analyticsRes = await getAnalytics();

  console.log(analyticsRes.data)

  return (
    <div className="min-h-screen bg-slate-50/30">
      <AdminAnalyticsModule analytics={analyticsRes.data} />
    </div>
  );
}