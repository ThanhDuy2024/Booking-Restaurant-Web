import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingList: [],
  pagination: {
    pages: 1,
  },
  query: {
    page: null,
    search: null,
    phone: null,
  },
  error: null,
  loading: false,
};

const staffBookingSlice = createSlice({
  name: 'staff_booking',
  initialState,
  reducers: {
    // ========== GET ==========
    getBookingListRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getBookingListSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.booking = action.payload.bookingList;
      state.pagination.pages = action.payload.pages;
    },

    getBookingListFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE QUERY ==========
    updateQuery(state, action) {
      state.query = {
        ...state.query,
        ...action.payload,
      };
    },
  },
});

export const {
  getBookingListRequest,
  getBookingListSuccess,
  getBookingListFailed,

  updateQuery,
} = staffBookingSlice.actions;

export default staffBookingSlice.reducer;