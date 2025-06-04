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
      console.log(state.branches);
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
      state.branches.unshift(action.payload);
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
      const {id, update} = action.payload;
      const index = state.branches.findIndex(item => item.id === id);
      if(index !== -1) {
        state.branches[index] = {
          ...state.branches[index],
          ...update
        };
      }
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
      state.branches = state.branches.filter(item => item._id !== id);
    },

    deleteBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectBranch(state, action) {
      const id = action.payload;
      const branchesCopy = JSON.parse(JSON.stringify(state.branches)); // deep clone tránh Proxy
      const selected = branchesCopy.find(item => item._id === id) || 'a';
      state.selectedBranch = selected;

      console.log('branches:', branchesCopy);
      console.log('selected branch:', selected);
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