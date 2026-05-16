import { getChallengeById } from "@/actions/challenge.actions";
import { ChallengeDetailModule } from "@/components/modules/ChallengeDetailModule";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";

export default async function ChallengeDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const result = await getChallengeById(id);
  
  if (!result.success || !result.data) {
    notFound();
  }

  const challenge = result.data.data || result.data;

  return (
    <div>
      <ChallengeDetailModule challenge={challenge} />
    </div>
  );
}
