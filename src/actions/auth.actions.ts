"use server";

import { cookies } from "next/headers";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

export const login = async (data: any) => {
  const result = await authService.login(data);
  if (result.success && result.data?.data) {
    const cookieStore = await cookies();
    const { accessToken, token, user } = result.data.data;
    
    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    
    if (token) {
      cookieStore.set("better-auth.session_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (user?.role) {
      cookieStore.set("role", user.role, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (user?.member?.id) cookieStore.set("memberId", user.member.id, { path: "/" });
    if (user?.admin?.id) cookieStore.set("adminId", user.admin.id, { path: "/" });
    if (user?.superAdmin?.id) cookieStore.set("superAdminId", user.superAdmin.id, { path: "/" });
  }
  return result;
};

export const register = async (formData: FormData) => {
  const result = await authService.register(formData);
  if (result.success && result.data?.data) {
    const cookieStore = await cookies();
    const { accessToken, token, user, member } = result.data.data;
    const finalUser = user || result.data.data;
    
    if (accessToken) {
      cookieStore.set("accessToken", accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    
    if (token) {
      cookieStore.set("better-auth.session_token", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    if (finalUser?.role) {
      cookieStore.set("role", finalUser.role, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    const memberData = member || finalUser?.member;
    if (memberData?.id) cookieStore.set("memberId", memberData.id, { path: "/" });
  }
  return result;
};

export const getMe = async () => {
  const cookieStore = await cookies();
  const sessionRes = await authService.getSession(cookieStore.toString());
  // console.log("getMe -> sessionRes:", JSON.stringify(sessionRes, null, 2));
  
  // Try both data structures depending on how the backend formats it
  const sessionData = sessionRes.data?.data || sessionRes.data;
  const userId = sessionData?.user?.id;
  
  // console.log("getMe -> extracted userId:", userId);

  if (sessionRes.success && userId) {
    const { userService } = await import("@/services/user.service");
    const userRes = await userService.getMe();
    // console.log("getMe -> userRes:", JSON.stringify(userRes, null, 2));
    
    if (userRes.success) {
      const userData = userRes.data?.data || userRes.data;
      
      return { success: true, data: userData };
    }
  }
  
  return { success: false, data: null, error: sessionRes.error || { message: "Failed to retrieve session" } };
};

export const logout = async () => {
  const cookieStore = await cookies();
  const res = await authService.logout(cookieStore.toString());
  
  // Always clear cookies locally, even if backend logout fails
  cookieStore.delete("accessToken");
  cookieStore.delete("better-auth.session_token");
  cookieStore.delete("role");
  cookieStore.delete("memberId");
  cookieStore.delete("adminId");
  cookieStore.delete("superAdminId");
  
  return res;
};

export const changePassword = async (data: any) => {
  const cookieStore = await cookies();
  return await authService.changePassword(data, cookieStore.toString());
};

export const verifyEmail = async (data: any) => {
  return await authService.verifyEmail(data);
};

export const forgetPassword = async (data: any) => {
  return await authService.forgetPassword(data);
};

export const resetPassword = async (data: any) => {
  return await authService.resetPassword(data);
};
