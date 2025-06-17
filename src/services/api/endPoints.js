import { buildUrlWithParams } from '@/lib/utils';

const endPoints = {
  auth: {
    login: `/api/admin/auth/login`,
    logout: `/api/admin/auth/logout`,
    getProfile: `/api/admin/profile/me`,
  },

  admin: {
    //category
    createCategory: `/api/admin/category/create`,
    editCategory: (id) => `/api/admin/category/edit/${id}`,
    disabledCategory: (id) => `/api/admin/category/delete/${id}`,
    getAllCategory: (search, page, size, sort) => buildUrlWithParams(`/api/admin/category/list`, {
      search, page, size, sort,
    }),


    //food
    createFood: `/api/admin/food/create`,
    editFood: (id) => `/api/admin/food/edit/${id}`,
    lockFood: (id) => `/api/admin/food/delete/${id}`,
    getAllFood: (search, page) => buildUrlWithParams(`/api/admin/food/list`, {
      search, page,
    }),

    //branch
    createBranch: `/api/admin/branch/create`,
    editBranch: (id) => `/api/admin/branch/edit/${id}`,
    deleteBranch: (id) => `/api/admin/branch/delete/${id}`,
    getAllBranch: (search, page) => buildUrlWithParams(`/api/admin/branch/list`, {
      search, page,
    }),

    //staff
    createStaff: `/api/admin/account-staff/create`,
    editStaff: (id) => `/api/admin/account-staff/edit/${id}`,
    lockAccountStaff: (id) => `/api/admin/account-staff/${id}`,
    getAllStaffAccount: (search, page) => buildUrlWithParams(`/api/admin/account-staff/list`, {
      search, page,
    }),

  },

  staff: {
    getBookingList: (search, page, phone) => buildUrlWithParams(`/api/admin/booking/list`, {
      search, page, phone,
    }),
    getOrderList: (search, page, date, priceSort, status) => buildUrlWithParams(`/api/admin/order/list`, {
      search, page, date, priceSort, status,
    }),
    createOrder: `/api/admin/order/create`,
    updateOrder: (id) => `/api/admin/order/edit/${id}`,
    deleteOrder: (id) => `/api/admin/order/delete/${id}`,
  },
  common: {
    getCategory: (search, page) => buildUrlWithParams(`/api/client/category/list`, {
      search, page,
    }),
    getFood: (search, page, categoryId) => buildUrlWithParams(`/api/client/food/list`, {
      search, page, categoryId,
    }),
    getBranch: `/api/client/branch/list`,
    booking: `/api/client/booking/create`,
  },
};

export default endPoints;