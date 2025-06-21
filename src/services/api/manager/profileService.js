import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchProfile = async () => {
  try {
    console.log('[DEBUG] URL gọi API:', endPoints.admin.getProfile);
    const response = await apiClient.get(endPoints.admin.getProfile);
    return response.data;
  } catch (error) {
    console.log('Fetch data failed:', error);
    throw error;
  }
};

export const editProfile = async (id, editForm) => {
  try {
    const response = await apiClient.patch(endPoints.admin.editProfile(id), editForm);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Edit Profile failed:', error);
    throw error;
  }
};

export const deleteProfile = async (id) => {
  try {
    const response = await apiClient.delete(endPoints.admin.deleteProfile(id));
    return response.data;
  } catch (error) {
    console.error('Delete Profile failed:', error);
    throw error;
  }
}