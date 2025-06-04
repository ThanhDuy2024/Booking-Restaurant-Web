import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foods: [],
  selectedFood: null,
  pagination: {
    pages: 1,
  },
  query: {
    search: null,
    page: null,
    categoryId: null,
  },
  loading: false,
  error: null,
}

const clientFoodSlice = createSlice ({
  name: 'client_food',
  initialState,
  reducers: {
    // ========== GET ==========
    getFoodRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getFoodSuccess(state, action) {
      state.loading = false;
      state.foods = action.payload.foods;
      state.pagination.pages = action.payload.pages;
      state.error = null;
    },

    getFoodFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== QUERY CHANGE ==========
    updateQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    }
  }
});

export const {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailed,

  updateQuery,
} = clientFoodSlice.actions;

export default clientFoodSlice.reducer;