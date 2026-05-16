"use server";

import { cookies } from "next/headers";
import { categoryService } from "@/services/category.service";

export const getAllCategories = async (queryParams?: string) => {
  const cookieStore = await cookies();
  return await categoryService.getAllCategories(queryParams, cookieStore.toString());
};

export const getCategoryById = async (id: string) => {
  const cookieStore = await cookies();
  return await categoryService.getCategoryById(id, cookieStore.toString());
};

export const createCategory = async (payload: any) => {
  const cookieStore = await cookies();
  return await categoryService.createCategory(payload, cookieStore.toString());
};

export const updateCategory = async (id: string, payload: any) => {
  const cookieStore = await cookies();
  return await categoryService.updateCategory(id, payload, cookieStore.toString());
};

export const deleteCategory = async (id: string) => {
  const cookieStore = await cookies();
  return await categoryService.deleteCategory(id, cookieStore.toString());
};
