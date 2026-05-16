import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export default function AdminEditCategoryPage({ params }: Props) {
  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Edit Category</h1>
          <p className="text-slate-500">Edit category ID: {params.id}</p>
        </div>
        <Link href="/dashboard/admin/categories" className="text-sm font-medium text-green-600 hover:underline">
          Back to categories
        </Link>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">This page is a placeholder for category editing. Connect it to the backend update endpoint later.</p>
      </div>
    </div>
  );
}
