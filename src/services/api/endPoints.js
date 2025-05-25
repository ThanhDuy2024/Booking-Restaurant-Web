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
    getALlCategory: (search ,page, size, sort) => buildUrlWithParams(`/api/admin/category/list`, {
      search,page, size, sort
    }),

    //food
    createFood: `/api/admin/food/create`,
    eidtFood: (id) => `/api/admin/food/edit/${id}`,
    lockFood: (id) => `/api/admin/food/delete/${id}`,
    getAllFood: (search, page, size) => buildUrlWithParams(`/api/admin/food/list`, {
      search, page, size
    })
  },

  staff: {},
  common: {},
};

export default endPoints;