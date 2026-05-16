/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  getAllUsers: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/users${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
  getAllMembers: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/member${queryString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getSingleUser: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
  getMe: async function () {
    try {
      // console.log("Profile for")
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  updateUser: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const isFormData = payload instanceof FormData;


      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Cookie: cookieStore.toString(),
        },
        body: isFormData ? payload : JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
  UpdateSuperAdminBySuperAdmin: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const isFormData = payload instanceof FormData;

      console.log("FormData of super admin",isFormData)


      const res = await fetch(`${API_URL}/super-admin/${id}`, {
        method: "PATCH",
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          Cookie: cookieStore.toString(),
        },
        body: isFormData ? payload : JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteUser: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
};
