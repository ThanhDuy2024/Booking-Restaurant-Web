import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderList: [],
  pagination : {
    pages: 1
  },
  query: {
    search: null ,
    date: null,
    priceSort: null,
    page: null,
    status: null,
  },
  loading: false,
  error: null,
}

const staffOrderSlice = createSlice({
  name: 'staff_order',
  initialState,
  reducers: {
    // ========== GET ==========
    getOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getOrderSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.orderList = action.payload.orderList;
      state.pagination.pages = action.payload.pages;
    },

    getOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== CREATE ==========
    createOrderRequest (state) {
      state.loading = true;
      state.error = null;
    },

    createOrderSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.orderList.unshift(action.payload)
    },

    createOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateOrderSuccess(state, action) {
      state.loading = false;
      state.orderList = state.orderList.filter(order => order._id != action.payload.id);
      state.error = null;
    },

    updateOrderFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteOrderSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },

    deleteOrderFailed(state ,action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE QUERY ==========
    updateQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
      }
    },
  }
});

export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailed,

  createOrderRequest,
  createOrderSuccess,
  createOrderFailed,

  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFailed,

  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,

  updateQuery,
} = staffOrderSlice.actions;

export default staffOrderSlice.reducer;