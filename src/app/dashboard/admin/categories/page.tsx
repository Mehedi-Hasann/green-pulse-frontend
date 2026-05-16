import { getAllCategories } from "@/actions/admin.actions";
import { AdminCategoriesModule } from "@/components/modules/admin/AdminCategoriesModule";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categoriesRes = await getAllCategories();

  return (
    <div>
      <AdminCategoriesModule categories={categoriesRes} />
    </div>
  );
}