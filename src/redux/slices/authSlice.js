import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isAuthenticated: false,
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logoutRequest(state) {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    logoutFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    checkAuthRequest(state) {
      state.loading = true;
      state.error = null;
    }
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  checkAuthRequest,
} = authSlice.actions;

export default authSlice.reducer;
