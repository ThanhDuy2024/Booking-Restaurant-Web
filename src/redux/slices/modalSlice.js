import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals:{
    booking: {isOpen: false, data : null},
  },
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      const {type, data} = action.payload;
      state.modals[type] = {isOpen: true, data:data || null};
    },

    closeModal: (state, action) => {
      const type = action.payload;
      if(state.modals[type]) {
        state.modals[type].isOpen = false;
        state.modals[type].data = null;
      }
    }
  }
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;