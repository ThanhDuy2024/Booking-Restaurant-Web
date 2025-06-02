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