import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchOrderList = async (search, page, date, priceSort, status) => {
  try {
    const response = await apiClient.get(endPoints.staff.getOrderList(search, page, date, priceSort, status));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (formData) => {
  try {
    const response = await apiClient.post(endPoints.staff.createOrder, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (id, formData) => {
  try {
    const response = await apiClient.patch(endPoints.staff.updateOrder(id), formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id) => {
  try {
    const response = await apiClient.delete(endPoints.staff.deleteOrder(id));
    return response.data;
  } catch (error) {
    throw error;
  }
};