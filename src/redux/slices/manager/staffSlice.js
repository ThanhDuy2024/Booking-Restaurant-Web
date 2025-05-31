import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  staffs: [],
  selectedStaff: null,
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

const staffSlice = createSlice({
  name: 'admin_staff',
  initialState,
  reducers: {
    // ========== GET ==========
    getStaffRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getStaffSuccess(state, action) {
      state.loading = false;
      state.staffs = action.payload.staffs;
      state.pagination.pages = action.payload.pages;
      state.error = null;
    },

    getStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== CREATE ==========
    createStaffRequest(state) {
      state.loading = true;
      state.error = null;
    },

    createStaffSuccess(state, action) {
      state.loading = false;
      state.staffs.unshift(action.payload);
    },

    createStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateStaffRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateStaffSuccess(state, action){
      state.loading = false;
      state.error = null;
    },

    updateStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteStaffRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteStaffSuccess(state, action){
      state.loading = false;
      const id = action.payload;
      state.staffs = state.staffs.filter(item => item.id !== id);
    },

    deleteStaffFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectStaff(state, action) {
      const id = action.payload;
      state.selectedStaff = state.staffs.find(item => item._id === id) || null;
    },

    clearSelectedStaff(state) {
      state.selectedStaff = null;
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
  getStaffRequest,
  getStaffSuccess,
  getStaffFailed,

  createStaffRequest,
  createStaffSuccess,
  createStaffFailed,

  updateStaffRequest,
  updateStaffSuccess,
  updateStaffFailed,

  deleteStaffRequest,
  deleteStaffSuccess,
  deleteStaffFailed,

  selectStaff,
  clearSelectedStaff,

  updateQuery
} = staffSlice.actions;

export default staffSlice.reducer;