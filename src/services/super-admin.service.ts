import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const superAdminService = {
  getDashboardSummary: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/dashboard`, {
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

  // --- Admin Management ---
  getAllAdmins: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/admins${queryString}`, {
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

  getAdminById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/admins/${id}`, {
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

  updateAdmin: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/admins/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteAdmin: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/admins/${id}`, {
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

  // --- Member Management ---
  getAllMembers: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/members${queryString}`, {
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

  getMemberById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/members/${id}`, {
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

  updateMember: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/members/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteMember: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/members/${id}`, {
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

  // --- User Control ---
  updateUserStatus: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/users/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  updateUserRole: async function (id: string, role: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  // --- Challenge Management ---
  getAllChallenges: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/challenges${queryString}`, {
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

  createChallenge: async function (payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getChallengeById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/challenges/${id}`, {
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

  updateChallenge: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/challenges/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteChallenge: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/challenges/${id}`, {
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

  // --- Category Management ---
  getAllCategories: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/categories${queryString}`, {
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

  createCategory: async function (payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  updateCategory: async function (id: string, payload: any) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/categories/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteCategory: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/categories/${id}`, {
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

  // --- Payment Management ---
  getAllPayments: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/payments${queryString}`, {
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

  getPaymentById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/payments/${id}`, {
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

  // --- Submission Management ---
  getAllSubmissions: async function (queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/super-admin/submissions${queryString}`, {
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

  getPendingSubmissions: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/submissions/pending`, {
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

  getSubmissionById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/submissions/${id}`, {
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

  updateSubmissionStatus: async function (id: string, status: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/submissions/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  // --- Analytics & Leaderboard ---
  getAnalytics: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/analytics`, {
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

  getLeaderboard: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/super-admin/leaderboard`, {
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
};
