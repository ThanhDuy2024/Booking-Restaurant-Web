import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedItem: null,
  pagination: {
    pages: 1,
  },
  query: {
    search: null,
    page: null,
  },
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: 'admin_category',
  initialState,
  reducers: {
    // ========== GET ==========
    getCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getCategorySuccess(state, action) {
      state.loading = false;
      state.items = action.payload.items;
      state.pagination.pages = action.payload.pages;
      state.error = null;
    },

    getCategoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== CREATE ==========
    createCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },

    createCategorySuccess(state, action) {
      state.loading = false;
      state.items.unshift(action.payload);
    },

    createCategoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateCategorySuccess(state, action){
      state.loading = false;
      const {id, update} = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if(index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...update
        };
      }
    },

    updateCategoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteCategorySuccess(state, action){
      state.loading = false;
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },

    deleteCategoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectCategory(state, action) {
      const id = action.payload;
      state.selectedItem = state.items.find(item => item.id === id) || null;
    },

    clearSelectedCategory(state) {
      state.selectedItem = null;
    },

    // ========== QUERY CHANGE ==========
    updateQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
        page: 1
      };
    }
  }
});

export const {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailed,

  createCategoryRequest,
  createCategorySuccess,
  createCategoryFailed,

  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailed,

  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailed,

  selectCategory,
  clearSelectedCategory,

  updateQuery
} = categorySlice.actions;

export default categorySlice.reducer;