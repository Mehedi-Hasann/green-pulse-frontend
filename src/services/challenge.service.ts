/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '@/lib/axios';

export interface IChallenge {
  id: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  points: number;
  duration: number;
  type: 'FREE' | 'PAID';
  price?: number;
  image?: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  isJoined?: boolean;
}

const getAllChallenges = async (params?: any): Promise<any> => {
  const response = await axiosInstance.get('/challenge', { params });
  return response.data;
};

const getChallengeById = async (id: string): Promise<any> => {
  const response = await axiosInstance.get(`/challenge/${id}`);
  return response.data;
};

const joinChallenge = async (challengeId: string): Promise<any> => {
  const response = await axiosInstance.post('/member-challenge', { challengeId });
  return response.data;
};

const getMyJoinedChallenges = async (memberId: string): Promise<any> => {
  const response = await axiosInstance.get(`/member-challenge/member/${memberId}`);
  return response.data;
};

export const challengeService = {
  getAllChallenges,
  getChallengeById,
  joinChallenge,
  getMyJoinedChallenges,
};
