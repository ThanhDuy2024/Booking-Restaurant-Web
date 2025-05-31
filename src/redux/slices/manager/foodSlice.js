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
  },
  loading: false,
  error: null,
};

const foodSlice = createSlice({
  name: 'admin_food',
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

    // ========== CREATE ==========
    createFoodRequest(state) {
      state.loading = true;
      state.error = null;
    },

    createFoodSuccess(state, action) {
      state.loading = false;
      state.foods.unshift(action.payload);
    },

    createFoodFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateFoodRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateFoodSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },

    updateFoodFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteFoodRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteFoodSuccess(state, action) {
      state.loading = false;
      const id = action.payload;
      state.foods = state.foods.filter(food => food._id !== id);
    },

    deleteFoodFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectFood(state, action) {
      const id = action.payload;
      state.selectedFood = state.foods.find(food => food._id === id) || null;
    },

    clearSelectedFood(state) {
      state.selectedFood = null;
    },

    // ========== QUERY CHANGE ==========
    updateQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
  },
});

export const {
  getFoodRequest,
  getFoodSuccess,
  getFoodFailed,

  createFoodRequest,
  createFoodSuccess,
  createFoodFailed,

  updateFoodRequest,
  updateFoodSuccess,
  updateFoodFailed,

  deleteFoodRequest,
  deleteFoodSuccess,
  deleteFoodFailed,

  selectFood,
  clearSelectedFood,

  updateQuery,
} = foodSlice.actions;

export default foodSlice.reducer;