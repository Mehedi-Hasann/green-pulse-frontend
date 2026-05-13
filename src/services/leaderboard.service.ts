import axiosInstance from '@/lib/axios';

const getLeaderboard = async (): Promise<any> => {
  // Using the super-admin endpoint as it's the only one available
  // Note: This might require Super Admin privileges in the current backend implementation
  const response = await axiosInstance.get('/super-admin/leaderboard');
  return response.data;
};

export const leaderboardService = {
  getLeaderboard,
};
