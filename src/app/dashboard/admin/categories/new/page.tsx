import Link from 'next/link';
import { CreateCategoryForm } from '@/components/modules/admin/CreateCategoryForm';

export const dynamic = "force-dynamic";

export default function AdminCreateCategoryPage() {
  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create Category</h1>
          <p className="text-slate-500">Add a new challenge category to the platform.</p>
        </div>
        <Link href="/dashboard/admin/categories" className="text-sm font-medium text-green-600 hover:underline">
          Back to categories
        </Link>
      </div>

      <CreateCategoryForm />
    </div>
  );
}
