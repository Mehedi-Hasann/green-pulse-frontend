const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const submissionService = {
  getAllSubmissions: async function (queryParams?: string, cookieString?: string) {
    try {
      const queryString = queryParams ? `?${queryParams}` : '';
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions`, {
        method: "GET",
        credentials: "include",
        headers,
        next: {
          tags: ["submissions"],
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getSubmissionById: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions/${id}`, {
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

  getSubmissionsByMemberId: async function (memberId: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions/member/${memberId}`, {
        method: "GET",
        credentials: "include",
        headers,
      });
      const data = await res.json();
      console.log(data)
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  getSubmissionsByChallengeId: async function (challengeId: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions/challenge/${challengeId}`, {
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

  createSubmission: async function (formData: FormData, cookieString?: string) {
    try {
      const headers: Record<string, string> = {};
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions`, {
        method: "POST",
        credentials: "include",
        headers,
        body: formData,
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  updateSubmission: async function (id: string, payload: any, cookieString?: string) {
    try {
      const headers: Record<string, string> = {};
      if (cookieString) headers.Cookie = cookieString;

      const isFormData = payload instanceof FormData;
      if (!isFormData) {
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(`${API_URL}/submissions/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body: isFormData ? payload : JSON.stringify(payload),
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },

  deleteSubmission: async function (id: string, cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/submissions/${id}`, {
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
