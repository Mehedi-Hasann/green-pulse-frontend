import { challengeService } from "@/services/challenge.service";
import { categoryService } from "@/services/category.service";
import { ChallengesModule } from "@/components/modules/ChallengesModule";

export const dynamic = "force-dynamic";

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const categoryId = params.categoryId as string | undefined;
  const type = params.type as string | undefined;
  const searchTerm = params.searchTerm as string | undefined;
  const sortByParam = params.sortBy as string | undefined;

  const sortBy = 
    sortByParam === 'newest' ? '-createdAt' : 
    sortByParam === 'oldest' ? 'createdAt' : 
    sortByParam === 'points-high' ? '-points' : 
    sortByParam === 'points-low' ? 'points' : 
    '-createdAt';

  // Fetch data in parallel
  const [challenges, categories] = await Promise.all([
    challengeService.getAllChallenges({
      categoryId: categoryId === 'all' ? undefined : categoryId,
      type: type === 'all' ? undefined : type,
      searchTerm: searchTerm || undefined,
      sortBy: sortBy,
    }),
    categoryService.getAllCategories()
  ]);

  return (
    <div>
      <ChallengesModule challenges={challenges} categories={categories} />
    </div>
  );
}
