import endPoints from '@/services/api/endPoints';
import apiClient from '@/services/api/apiClient';
import Cookies from 'js-cookie';

const token = Cookies.get('authToken');

export const loginService = async (loginData) => {
  try {
    const response = await apiClient.post(endPoints.auth.login, loginData);
    //console.log('response: ',response);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const authService = async () => {
  try {
    const response = await apiClient.delete(endPoints.auth.logout);
    console.log(response);
    return response.data.message;
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get(endPoints.auth.getProfile, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('Get current user failed', error);
    // throw error;
  }
};

export const updateMe = async ({ data }) => {
  try {
    const response = await apiClient.put(endPoints.auth.updateProfile);
    console.log(response);
  } catch (e) {
    console.error('Update failed:', e);
    throw e;
  }
};