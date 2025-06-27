import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const getDailyRevenue = async () => {
  try {
    const response = await apiClient.get(endPoints.staff.dailyRevenue);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMonthlyRevenue = async () => {
  try {
    const response = await apiClient.get(endPoints.staff.monthlyRevenue);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getYearlyRevenue = async () => {
  try {
    const response = await apiClient.get(endPoints.staff.yearlyRevenue);
    return response.data;
  } catch (error) {
    throw error ;
  }
};

export const getOrderStatus = async () => {
  try {
    const response = await apiClient.get(endPoints.staff.getOrderByStatus);
    return response.data;
  } catch (error)  {
    throw error;
  }
};

export const getTotalRevenue = async () => {
  try {
    const response = await apiClient.get(endPoints.staff.totalRevenue);
    return response.data;
  } catch (error) {
    throw error;
  }
};