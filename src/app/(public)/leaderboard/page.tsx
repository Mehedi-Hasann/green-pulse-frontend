import { leaderboardService } from "@/services/leaderboard.service";
import { LeaderboardModule } from "@/components/modules/LeaderboardModule";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const leaderboard = await leaderboardService.getLeaderboard();

  return (
    <div>
      <LeaderboardModule leaderboard={leaderboard} />
    </div>
  );
}
