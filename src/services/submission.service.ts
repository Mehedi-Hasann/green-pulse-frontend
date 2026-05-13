import axiosInstance from '@/lib/axios';

const submitProof = async (data: FormData): Promise<any> => {
  const response = await axiosInstance.post('/submissions', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const getMySubmissions = async (memberId: string): Promise<any> => {
  const response = await axiosInstance.get(`/submissions/member/${memberId}`);
  return response.data;
};

const getAllSubmissions = async (params?: any): Promise<any> => {
  const response = await axiosInstance.get('/submissions', { params });
  return response.data;
};

const updateSubmissionStatus = async (id: string, status: 'APPROVED' | 'REJECTED'): Promise<any> => {
  const response = await axiosInstance.patch(`/super-admin/submissions/${id}/status`, { status });
  return response.data;
};

export const submissionService = {
  submitProof,
  getMySubmissions,
  getAllSubmissions,
  updateSubmissionStatus,
};
