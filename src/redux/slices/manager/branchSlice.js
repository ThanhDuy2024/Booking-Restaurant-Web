import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  selectedBranch: null,
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

const branchSlice = createSlice({
  name: 'admin_branch',
  initialState,
  reducers: {
    // ========== GET ==========
    getBranchRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getBranchSuccess(state, action) {
      state.loading = false;
      state.branches = action.payload.branches;
      state.pagination.pages = action.payload.pages;
      state.error = null;
    },

    getBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== CREATE ==========
    createBranchRequest(state) {
      state.loading = true;
      state.error = null;
    },

    createBranchSuccess(state, action) {
      state.loading = false;
      state.items.unshift(action.payload);
    },

    createBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateBranchRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateBranchSuccess(state, action){
      state.loading = false;
      state.error = null;
    },

    updateBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteBranchRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteBranchSuccess(state, action){
      state.loading = false;
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },

    deleteBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectBranch(state, action) {
      const id = action.payload;
      state.selectedItem = state.items.find(item => item._id === id) || null;
    },

    clearSelectedBranch(state) {
      state.selectedItem = null;
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
  getBranchRequest,
  getBranchSuccess,
  getBranchFailed,

  createBranchRequest,
  createBranchSuccess,
  createBranchFailed,

  updateBranchRequest,
  updateBranchSuccess,
  updateBranchFailed,

  deleteBranchRequest,
  deleteBranchSuccess,
  deleteBranchFailed,

  selectBranch,
  clearSelectedBranch,

  updateQuery
} = branchSlice.actions;

export default branchSlice.reducer;