import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUserFromStorage(state) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');
      if (user && token) {
        state.user = user;
        state.token = token;
      }
    },
    loginRequest(state, action) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state, action) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
