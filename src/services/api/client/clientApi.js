import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const getCategory = async (search, page) => {
  try {
    const response = await apiClient.get(endPoints.common.getCategory(search, page));
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getFood = async (search, page, categoryId) => {
  try {
    const response = await apiClient.get(endPoints.common.getFood(search, page, categoryId));
    return response.data
  } catch (error) {
    throw error;
  }
}