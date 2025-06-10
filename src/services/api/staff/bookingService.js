import apiClient from '@/services/api/apiClient';
import endPoints from '@/services/api/endPoints';

export const fetchBookingList = async (search, page, phone) => {
  try {
    const response = await apiClient.get(endPoints.staff.getBookingList(
      search, page, phone
    ));
    return response.data;
  } catch (error) {
    throw error;
  }
}