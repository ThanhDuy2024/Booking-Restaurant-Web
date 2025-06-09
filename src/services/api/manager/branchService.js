import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchBranch = async (search, page, size, sort) => {
  try {
    console.log('[DEBUG] URL gọi API:', endPoints.admin.getAllBranch(search, page, size, sort));
    const response = await apiClient.get(endPoints.admin.getAllBranch(
      search, page, size, sort,
    ));
    return response.data;
  } catch (error) {
    console.log('Fetch data failed:', error);
    throw error;
  }
};

export const createBranch = async (createForm) => {
  try {
    const response = await apiClient.post(endPoints.admin.createBranch, createForm);
    return response.data;
  } catch (error) {
    console.error('Create failed:', error);
    throw error;
  }
};

export const editBranch = async (id, editForm) => {
  try {
    const response = await apiClient.patch(endPoints.admin.editBranch(id), editForm);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Edit Branch failed:', error);
    throw error;
  }
};

export const deleteBranch = async (id) => {
  try {
    const response = await apiClient.delete(endPoints.admin.deleteBranch(id));
    return response.data;
  } catch (error) {
    console.error('Delete Branch failed:', error);
    throw error;
  }
}