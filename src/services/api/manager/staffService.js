import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchStaffAccount = async (search, page) => {
  try {
    const response = await apiClient.post(endPoints.admin.getAllStaffAccount(
      search, page,
    ));
    return response.data;
  } catch (error) {
    // console.log('Fetch data failed', error);
    throw error;
  }
};

export const createStaffAccount = async (createForm) => {
  try {
    const response = await apiClient.post(endPoints.admin.createStaff, createForm);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const editStaffAccount = async (id, editForm) => {
  try {
    const response = await apiClient.patch(endPoints.admin.editStaff(id), editForm);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const deleteStaffAccount = async (id) => {
  try {
    const response = await apiClient.delete(endPoints.admin.lockAccountStaff(id));
    return response.data;
  } catch (error) {
    throw error;
  }
}