import Link from 'next/link';
import { getAllCategories } from '@/actions/admin.actions';
import { CreateChallengeForm } from '@/components/modules/admin/CreateChallengeForm';

export const dynamic = "force-dynamic";

export default async function AdminCreateChallengePage() {
  const categoriesRes = await getAllCategories();
  
  // Extract categories from nested response structure
  const categories = categoriesRes?.data?.data || (Array.isArray(categoriesRes?.data) ? categoriesRes.data : []);

  return (
    <div className="space-y-4 pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create Challenge</h1>
          <p className="text-slate-500">Create a new challenge using the admin dashboard.</p>
        </div>
        <Link href="/dashboard/admin/challenges" className="text-sm font-medium text-green-600 hover:underline">
          Back to challenges
        </Link>
      </div>

      <CreateChallengeForm categories={categories} />
    </div>
  );
}
