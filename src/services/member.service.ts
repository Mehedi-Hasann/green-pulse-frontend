import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const memberService = {
  getMemberStats: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/member/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
      const result = await res.json();
      
      return { 
        success: res.ok && result.success, 
        data: result.data || result, 
        error: !res.ok ? result : (result.success ? null : result) 
      };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getMyChallenges: async function (memberId: string, queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/member/${memberId}/challenges`, {
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

  getMemberChallenges: async function (memberId: string, queryParams?: string) {
    return this.getMyChallenges(memberId, queryParams);
  },

  getMemberSubmissions: async function (memberId: string, queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/member/${memberId}/submissions${queryString}`, {
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

  getMemberPayments: async function (memberId: string, queryParams?: string) {
    try {
      const cookieStore = await cookies();
      const queryString = queryParams ? `?${queryParams}` : '';
      const res = await fetch(`${API_URL}/member/${memberId}/payments${queryString}`, {
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

  getMemberById: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/member/${id}`, {
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
      const res = await fetch(`${API_URL}/member/${id}`, {
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
      const res = await fetch(`${API_URL}/member/${id}`, {
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
