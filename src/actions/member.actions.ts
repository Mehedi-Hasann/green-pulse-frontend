"use server";

import { memberService } from "@/services/member.service";

export const getMemberStats = async () => {
  return await memberService.getMemberStats();
};

export const getMyChallenges = async (memberId: string, queryParams?: string) => {
  return await memberService.getMyChallenges(memberId, queryParams);
};

export const getMemberChallenges = async (memberId: string, queryParams?: string) => {
  return await memberService.getMemberChallenges(memberId, queryParams);
};

export const getMemberSubmissions = async (memberId: string, queryParams?: string) => {
  return await memberService.getMemberSubmissions(memberId, queryParams);
};

export const getMemberPayments = async (memberId: string, queryParams?: string) => {
  return await memberService.getMemberPayments(memberId, queryParams);
};


export const getAllMembers = async (queryParams?: string) => {
  return await memberService.getAllMembers(queryParams);
};

export const getMemberById = async (id: string) => {
  return await memberService.getMemberById(id);
};

export const updateMember = async (id: string, payload: any) => {
  return await memberService.updateMember(id, payload);
};

export const deleteMember = async (id: string) => {
  return await memberService.deleteMember(id);
};
