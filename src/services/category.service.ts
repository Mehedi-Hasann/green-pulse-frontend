/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getAllCategories: async function (queryParams?: string, cookieString?: string) {
    try {
      const queryString = queryParams ? `?${queryParams}` : '';
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/category`, {
        method: "GET",
        credentials: "include",
        headers,
        next: {
          tags: ["categories"],
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getCategoryById: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "GET",
        credentials: "include",
        headers,
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  createCategory: async function (payload: any, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/category`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  updateCategory: async function (id: string, payload: any, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteCategory: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/category/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers,
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
};
