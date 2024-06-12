import { getUser, getUsers } from './userService';
import apiClient from './api';  // Import the apiClient instance
import { AxiosResponse, AxiosHeaders } from 'axios';

jest.mock('./api');  // Mock the apiClient module

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('API calls', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    it('should fetch a user by ID', async () => {
      const mockUser = {
        id: 1,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      };

      const mockResponse: AxiosResponse = {
        data: { data: mockUser },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
        config: {
          url: 'https://reqres.in/api/users/2',
          method: 'get',
          headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
          baseURL: 'https://reqres.in/api',
          timeout: 0,
          transformRequest: [],
          transformResponse: [],
          params: {},
          data: {},
        },
      };
      
      mockedApiClient.get.mockResolvedValue(mockResponse);

      const user = await getUser(2);

      expect(mockedApiClient.get).toHaveBeenCalledWith('/users/2');
      expect(user).toEqual(mockUser);
    });

    it('should handle errors when fetching a user', async () => {
      mockedApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(getUser(2)).rejects.toThrow('Network error');
    });
  });

  describe('getUsers', () => {
    it('should fetch users with default page number', async () => {
      const mockUsers = [
        {
          id: 1,
          email: 'test1@example.com',
          first_name: 'John',
          last_name: 'Doe',
          avatar: 'https://example.com/avatar1.jpg',
        },
        {
          id: 2,
          email: 'test2@example.com',
          first_name: 'Jane',
          last_name: 'Doe',
          avatar: 'https://example.com/avatar2.jpg',
        },
      ];

      const mockResponse: AxiosResponse = {
        data: { data: mockUsers },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
        config: {
          url: 'https://reqres.in/api/users',
          method: 'get',
          headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
          baseURL: 'https://reqres.in/api',
          timeout: 0,
          transformRequest: [],
          transformResponse: [],
          params: { page: 1 },
          data: {},
        },
      };

      mockedApiClient.get.mockResolvedValue(mockResponse);

      const users = await getUsers();

      expect(mockedApiClient.get).toHaveBeenCalledWith('/users', { params: { page: 1 } });
      expect(users).toEqual(mockUsers);
    });

    it('should fetch users with specified page number', async () => {
      const mockUsers = [
        {
          id: 3,
          email: 'test3@example.com',
          first_name: 'Jim',
          last_name: 'Beam',
          avatar: 'https://example.com/avatar3.jpg',
        },
        {
          id: 4,
          email: 'test4@example.com',
          first_name: 'Jack',
          last_name: 'Daniels',
          avatar: 'https://example.com/avatar4.jpg',
        },
      ];

      const mockResponse: AxiosResponse = {
        data: { data: mockUsers },
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
        config: {
          url: 'https://reqres.in/api/users',
          method: 'get',
          headers: new AxiosHeaders({ 'Content-Type': 'application/json' }),
          baseURL: 'https://reqres.in/api',
          timeout: 0,
          transformRequest: [],
          transformResponse: [],
          params: { page: 2 },
          data: {},
        },
      };

      mockedApiClient.get.mockResolvedValue(mockResponse);

      const users = await getUsers(2);

      expect(mockedApiClient.get).toHaveBeenCalledWith('/users', { params: { page: 2 } });
      expect(users).toEqual(mockUsers);
    });

    it('should handle errors when fetching users', async () => {
      mockedApiClient.get.mockRejectedValue(new Error('Network error'));

      await expect(getUsers()).rejects.toThrow('Network error');
    });
  });
});
