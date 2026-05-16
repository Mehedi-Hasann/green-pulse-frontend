"use server";

import { cookies } from "next/headers";
import { leaderboardService } from "@/services/leaderboard.service";

export const getLeaderboard = async () => {
  const cookieStore = await cookies();
  return await leaderboardService.getLeaderboard(cookieStore.toString());
};
