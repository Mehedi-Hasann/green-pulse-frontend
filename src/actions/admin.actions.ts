/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminService } from "@/services/admin.service";
import { userService } from "@/services/user.service";
import { challengeService } from "@/services/challenge.service";
import { categoryService } from "@/services/category.service";

export const getAllAdmins = async (queryParams?: string) => {
  return await adminService.getAllAdmins(queryParams);
};

export const getAdminById = async (id: string) => {
  return await adminService.getAdminById(id);
};

export const updateAdmin = async (id: string, payload: any) => {
  return await adminService.updateAdmin(id, payload);
};

export const deleteAdmin = async (id: string) => {
  return await adminService.deleteAdmin(id);
};

export const getAllUsers = async () => {
  return await userService.getAllUsers();
};

export const getAllChallenges = async (params?: { categoryId?: string; type?: string; searchTerm?: string; sortBy?: string }) => {
  const cookieStore = await import("next/headers").then(m => m.cookies());
  return await challengeService.getAllChallenges(params, cookieStore.toString());
};

export const getAllCategories = async (queryParams?: string) => {
  const cookieStore = await import("next/headers").then(m => m.cookies());
  return await categoryService.getAllCategories(queryParams, cookieStore.toString());
};
