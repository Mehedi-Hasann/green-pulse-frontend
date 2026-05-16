import { getMe } from "@/actions/auth.actions";
import DashboardClientLayout from "./DashboardClientLayout";

export default async function DashboardServerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = await getMe();
  const user = me?.data;

  return (
    <DashboardClientLayout serverUser={user}>
      {children}
    </DashboardClientLayout>
  );
}
