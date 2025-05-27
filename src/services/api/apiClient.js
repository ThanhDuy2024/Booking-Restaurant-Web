import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
  withCredentials: true
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (typeof window !== 'undefined') {
        if (status === 401) {
          console.warn('[Auth] Phiên đăng nhập hết hạn hoặc không hợp lệ.');
          localStorage.removeItem('authToken');

          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
        } else if (status >= 500) {
          console.error('[Server Error]', error.response.data?.message || 'Lỗi hệ thống!');
        }
      }
    } else if (error.request) {
      console.error('[Network] Không có phản hồi từ server.');
    } else {
      console.error('[Error]', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
