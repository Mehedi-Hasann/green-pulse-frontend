"use server";

import { userService } from "@/services/user.service";

export const getAllUsers = async (queryParams?: string) => {
  return await userService.getAllUsers(queryParams);
};

export const getSingleUser = async (id: string) => {
  return await userService.getSingleUser(id);
};

export const updateUser = async (id: string, payload: any) => {
  return await userService.updateUser(id, payload);
};

export const UpdateSuperAdminBySuperAdmin = async (id: string, payload: any) => {
  return await userService.UpdateSuperAdminBySuperAdmin(id, payload);
};

export const deleteUser = async (id: string) => {
  return await userService.deleteUser(id);
};
