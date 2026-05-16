"use server";

import { cookies } from "next/headers";
import { challengeService } from "@/services/challenge.service";

export const getAllChallenges = async (params?: { categoryId?: string; type?: string; searchTerm?: string; sortBy?: string }) => {
  const cookieStore = await cookies();
  return await challengeService.getAllChallenges(params, cookieStore.toString());
};

export const getChallengeById = async (id: string) => {
  const cookieStore = await cookies();
  return await challengeService.getChallengeById(id, cookieStore.toString());
};

export const createChallenge = async (payload: any) => {
  const cookieStore = await cookies();
  return await challengeService.createChallenge(payload, cookieStore.toString());
};

export const updateChallenge = async (id: string, payload: any) => {
  const cookieStore = await cookies();
  return await challengeService.updateChallenge(id, payload, cookieStore.toString());
};

export const deleteChallenge = async (id: string) => {
  const cookieStore = await cookies();
  return await challengeService.deleteChallenge(id, cookieStore.toString());
};
