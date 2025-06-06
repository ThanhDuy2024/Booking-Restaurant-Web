import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  branches: [],
  selectedBranch: null,
  loading: false,
  error: null,
}

const clientBranchSlice = createSlice ({
  name: 'client_branch',
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
      state.error = null;
    },

    getBranchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  getBranchRequest,
  getBranchSuccess,
  getBranchFailed,
} = clientBranchSlice.actions;

export default clientBranchSlice.reducer;