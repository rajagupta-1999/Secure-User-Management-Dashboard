import apiClient from './api';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserResponse {
  data: User;
}

export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get<UserResponse>(`/users/${id}`);
  return response.data.data;
};

interface UsersResponse {
  data: User[];
}

export const getUsers = async (page: number = 1): Promise<User[]> => {
  const response = await apiClient.get<UsersResponse>('/users', {
    params: { page },
  });
  return response.data.data;
};
