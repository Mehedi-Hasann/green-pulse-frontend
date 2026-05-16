import { AdminPaymentsModule } from "@/components/modules/admin/AdminPaymentsModule";

export const dynamic = "force-dynamic";

export default async function AdminPaymentsPage() {
  return (
    <div>
      <AdminPaymentsModule payments={{ data: [] }} />
    </div>
  );
}
