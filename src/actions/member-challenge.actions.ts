"use server";

import { cookies } from "next/headers";
import { memberChallengeService } from "@/services/member-challenge.service";

export const joinChallenge = async (challengeId: string) => {
  const cookieStore = await cookies();
  return await memberChallengeService.joinChallenge(challengeId, cookieStore.toString());
};

export const getAllMemberChallenges = async (queryParams?: string) => {
  const cookieStore = await cookies();
  return await memberChallengeService.getAllMemberChallenges(queryParams, cookieStore.toString());
};

export const getSingleMemberChallenge = async (id: string) => {
  const cookieStore = await cookies();
  return await memberChallengeService.getSingleMemberChallenge(id, cookieStore.toString());
};

export const getMyChallengesByMemberId = async () => {
  const cookieStore = await cookies();
  return await memberChallengeService.getMyChallengesByMemberId(cookieStore.toString());
};

export const updateMemberChallenge = async (id: string, payload: any) => {
  const cookieStore = await cookies();
  return await memberChallengeService.updateMemberChallenge(id, payload, cookieStore.toString());
};

export const deleteMemberChallenge = async (id: string) => {
  const cookieStore = await cookies();
  return await memberChallengeService.deleteMemberChallenge(id, cookieStore.toString());
};
