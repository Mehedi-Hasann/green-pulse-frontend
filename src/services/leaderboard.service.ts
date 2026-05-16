const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const leaderboardService = {
  getLeaderboard: async function (cookieString?: string) {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (cookieString) headers.Cookie = cookieString;

      const res = await fetch(`${API_URL}/super-admin/leaderboard`, {
        method: "GET",
        credentials: "include",
        headers,
        next: {
          tags: ["leaderboard"],
        },
      });
      const data = await res.json();
      return { success: res.ok, data, error: !res.ok ? data : null };
    } catch (error) {
      return { success: false, data: null, error: { message: "Internal Server Error" } };
    }
  },
};
