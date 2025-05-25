import endPoints from '@/services/api/endPoints';
import apiClient from '@/services/api/apiClient';

export const loginService = async (loginData) => {
  try {
    const response = await apiClient.post(endPoints.auth.login, loginData);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await apiClient.delete(endPoints.auth.logout);
    return response.data.message;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.post(endPoints.auth.me);
    return response.data;
  } catch (error) {
    console.error('Get current user failed', error);
    throw error;
  }
};