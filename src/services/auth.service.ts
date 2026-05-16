const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  login: async function (data: any) {
    try {
      
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Login failed. Internal Server Error" } };
    }
  },

  register: async function (formData: FormData) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Registration failed. Internal Server Error" } };
    }
  },

  logout: async function (cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) {
        headers.Cookie = cookieString;
      }

      const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers,
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Logout failed. Internal Server Error" } };
    }
  },

  getSession: async function (cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/get-session`, {
        method: "GET",
        credentials: "include",
        headers,
      });
      const data = await res.json();
      // console.log('session i s ',data)
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  changePassword: async function (data: any, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) {
        headers.Cookie = cookieString;
      }

      const res = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Password change failed." } };
    }
  },

  verifyEmail: async function (data: any) {
    try {
      const res = await fetch(`${API_URL}/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Verification failed." } };
    }
  },

  forgetPassword: async function (data: any) {
    try {
      const res = await fetch(`${API_URL}/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Request failed." } };
    }
  },

  resetPassword: async function (data: any) {
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return { success: res.ok, data: result, error: !res.ok ? result : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Reset failed." } };
    }
  },
};
