import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchFood = async (search, page) => {
  try {
    // console.log('[DEBUG] URL gọi API:', endPoints.admin.getAllFood(search, page));
    const response = await apiClient.get(endPoints.admin.getAllFood(search, sort));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFood = async (createForm) => {
  try {
    const response = await apiClient.post(endPoints.admin.createFood, createForm);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const editFood = async (id, updateForm) => {
  try {
    const response = await apiClient.patch(endPoints.admin.editFood(id), updateForm);
    return response.data;
  } catch (error) {
    throw  error;
  }
}

export const deleteFood = async (id) => {
  try {
    const response = await apiClient.delete(endPoints.admin.lockFood(id));
    return response.data;
  } catch (error) {
    throw error;
  }
}