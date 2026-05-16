"use server";

import { cookies } from "next/headers";
import { submissionService } from "@/services/submission.service";

export const getAllSubmissions = async (queryParams?: string) => {
  const cookieStore = await cookies();
  return await submissionService.getAllSubmissions(queryParams, cookieStore.toString());
};

export const getSubmissionById = async (id: string) => {
  const cookieStore = await cookies();
  return await submissionService.getSubmissionById(id, cookieStore.toString());
};

export const getSubmissionsByMemberId = async (memberId: string) => {
  const cookieStore = await cookies();
  return await submissionService.getSubmissionsByMemberId(memberId, cookieStore.toString());
};

export const getSubmissionsByChallengeId = async (challengeId: string) => {
  const cookieStore = await cookies();
  return await submissionService.getSubmissionsByChallengeId(challengeId, cookieStore.toString());
};

export const createSubmission = async (formData: FormData) => {
  const cookieStore = await cookies();
  return await submissionService.createSubmission(formData, cookieStore.toString());
};

export const updateSubmission = async (id: string, payload: any) => {
  const cookieStore = await cookies();
  return await submissionService.updateSubmission(id, payload, cookieStore.toString());
};

export const deleteSubmission = async (id: string) => {
  const cookieStore = await cookies();
  return await submissionService.deleteSubmission(id, cookieStore.toString());
};
