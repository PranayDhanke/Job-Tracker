import { api } from './api';

export const authService = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    const response = await api.register(data);
    return response;
  },

  login: async (data: { email: string; password: string }) => {
    const response = await api.login(data);
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    if (response.refresh_token) {
      localStorage.setItem('refresh_token', response.refresh_token);
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  getCurrentUser: async () => {
    try {
      const response = await api.me();
      return response;
    } catch (error) {
      authService.logout();
      throw error;
    }
  },
};
