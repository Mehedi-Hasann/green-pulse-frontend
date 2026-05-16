export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
  };
}

export interface AuthState {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isHydrated: boolean;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  setHydrated: () => void;
  logout: () => void;
}
