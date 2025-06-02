import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
  selectedCategory: null,
  pagination: {
    pages: 1,
  },
  query: {
    search: null,
    page: null,
  },
  loading: false,
  error: null,
}

const clientCategorySlice = createSlice ({
  name: 'client_category',
  initialState,
  reducers: {
    // ========== GET ==========
    getCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getCategorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload.category;
      state.pagination.pages = action.payload.pages;
      state.error = null;
    },

    getCategoryFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  getCategoryRequest,
  getCategorySuccess,
  getCategoryFailed,
} = clientCategorySlice.actions;

export default clientCategorySlice.reducer;