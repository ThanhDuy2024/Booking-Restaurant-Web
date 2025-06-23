import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: [],
  selectedProfile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'admin_profile',
  initialState,
  reducers: {
    // ========== GET ==========
    getProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },

    getProfileSuccess(state, action) {
      state.loading = false;
      state.profile = action.payload.profile;
      state.error = null;
      console.log(state.profile);
    },

    getProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== UPDATE ==========
    updateProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },

    updateProfileSuccess(state, action){
      state.loading = false;
      const {id, update} = action.payload;
      const index = state.profile.findIndex(item => item.id === id);
      if(index !== -1) {
        state.profile[index] = {
          ...state.profile[index],
          ...update
        };
      }
    },

    updateProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== DELETE ==========
    deleteProfileRequest(state) {
      state.loading = true;
      state.error = null;
    },

    deleteProfileSuccess(state, action){
      state.loading = false;
      const id = action.payload;
      state.profile = state.profile.filter(item => item._id !== id);
    },

    deleteProfileFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // ========== SELECT ==========
    selectProfile(state, action) {
      const id = action.payload;
      const profileCopy = JSON.parse(JSON.stringify(state.profile)); // deep clone tránh Proxy
      const selected = profileCopy.find(item => item._id === id) || 'a';
      state.selectedProfile = selected;

      console.log('profile:', profileCopy);
      console.log('selected Profile:', selected);
    },


    clearSelectedProfile(state) {
      state.selectedItem = null;
    },
  }
});

export const {
  getProfileRequest,
  getProfileSuccess,
  getProfileFailed,

  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailed,

  deleteProfileRequest,
  deleteProfileSuccess,
  deleteProfileFailed,

} = profileSlice.actions;

export default profileSlice.reducer;