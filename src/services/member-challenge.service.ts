const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const memberChallengeService = {
  joinChallenge: async function (challengeId: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge`, {
        method: "POST",
        credentials: "include",
        headers,
        body: JSON.stringify({ challengeId }),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getAllMemberChallenges: async function (queryParams?: string, cookieString?: string) {
    try {
      const queryString = queryParams ? `?${queryParams}` : '';
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge${queryString}`, {
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

  getMyMemberChallenge: async function (cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge`, {
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

  getSingleMemberChallenge: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge/${id}`, {
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

  getMyChallengesByMemberId: async function (cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge/my-challenge`, {
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

  updateMemberChallenge: async function (id: string, payload: any, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge/${id}`, {
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

  deleteMemberChallenge: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/member-challenge/${id}`, {
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
