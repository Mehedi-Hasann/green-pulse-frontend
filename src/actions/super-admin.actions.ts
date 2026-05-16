"use server";

import { superAdminService } from "@/services/super-admin.service";

export const getDashboardSummary = async () => {
  return await superAdminService.getDashboardSummary();
};

// --- Admin Management ---
export const getAllAdmins = async (queryParams?: string) => {
  return await superAdminService.getAllAdmins(queryParams);
};

export const getAdminById = async (id: string) => {
  return await superAdminService.getAdminById(id);
};

export const updateAdmin = async (id: string, payload: any) => {
  return await superAdminService.updateAdmin(id, payload);
};

export const deleteAdmin = async (id: string) => {
  return await superAdminService.deleteAdmin(id);
};

// --- Member Management ---
export const getAllMembers = async (queryParams?: string) => {
  return await superAdminService.getAllMembers(queryParams);
};

export const getMemberById = async (id: string) => {
  return await superAdminService.getMemberById(id);
};

export const updateMember = async (id: string, payload: any) => {
  return await superAdminService.updateMember(id, payload);
};

export const deleteMember = async (id: string) => {
  return await superAdminService.deleteMember(id);
};

// --- User Control ---
export const updateUserStatus = async (id: string, status: string) => {
  return await superAdminService.updateUserStatus(id, status);
};

export const updateUserRole = async (id: string, role: string) => {
  return await superAdminService.updateUserRole(id, role);
};

// --- Challenge Management ---
export const getAllChallenges = async (queryParams?: string) => {
  return await superAdminService.getAllChallenges(queryParams);
};

export const createChallenge = async (payload: any) => {
  return await superAdminService.createChallenge(payload);
};

export const getChallengeById = async (id: string) => {
  return await superAdminService.getChallengeById(id);
};

export const updateChallenge = async (id: string, payload: any) => {
  return await superAdminService.updateChallenge(id, payload);
};

export const deleteChallenge = async (id: string) => {
  return await superAdminService.deleteChallenge(id);
};

// --- Category Management ---
export const getAllCategories = async (queryParams?: string) => {
  return await superAdminService.getAllCategories(queryParams);
};

export const createCategory = async (payload: any) => {
  return await superAdminService.createCategory(payload);
};

export const updateCategory = async (id: string, payload: any) => {
  return await superAdminService.updateCategory(id, payload);
};

export const deleteCategory = async (id: string) => {
  return await superAdminService.deleteCategory(id);
};

// --- Payment Management ---
export const getAllPayments = async (queryParams?: string) => {
  return await superAdminService.getAllPayments(queryParams);
};

export const getPaymentById = async (id: string) => {
  return await superAdminService.getPaymentById(id);
};

// --- Submission Management ---
export const getAllSubmissions = async (queryParams?: string) => {
  return await superAdminService.getAllSubmissions(queryParams);
};

export const getSubmissionById = async (id: string) => {
  return await superAdminService.getSubmissionById(id);
};

export const updateSubmissionStatus = async (id: string, status: string) => {
  return await superAdminService.updateSubmissionStatus(id, status);
};

// --- Analytics & Leaderboard ---
export const getAnalytics = async () => {
  return await superAdminService.getAnalytics();
};

export const getPendingSubmissions = async () => {
  return await superAdminService.getPendingSubmissions();
};

export const getLeaderboard = async () => {
  return await superAdminService.getLeaderboard();
};
