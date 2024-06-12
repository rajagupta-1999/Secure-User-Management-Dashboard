import apiClient from './api';

interface LoginResponse {
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/login', data);
  return response.data;
};

interface RegisterResponse {
  id: number;
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>('/register', data);
  return response.data;
};
