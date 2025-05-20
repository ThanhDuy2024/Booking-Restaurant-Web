import { buildUrlWithParams } from '@/lib/utils';

const endPoints = {
  auth: {
    login: `/api/admin/auth/login`,
    logout: `/api/admin/auth/logout`,
  },

  admin: {
    createCategory: `/api/admin/category/create`,
    editCategory: (id) => `/api/admin/category/edit/${id}`,
    disabledCategory: (id) => `/api/admin/category/delete/${id}`,
  },

  staff: {},

  common: {
    getALlCategory: (page, size) => buildUrlWithParams(`/api/common/category/list`, {
      page, size,
    }),
  },
};