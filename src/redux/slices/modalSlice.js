import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals:{
    booking: {isOpen: false, data : null},
    createOrder: {isOpen: false, data: null},
    updateOrder: {isOpen: false, data: null},
  },
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      console.log('[MODAL] Open:', action.payload);
      const {name, data} = action.payload;
      state.modals[name] = {isOpen: true, data:data || null};
    },

    closeModal: (state, action) => {
      const name = action.payload;
      if(state.modals[name]) {
        state.modals[name].isOpen = false;
        state.modals[name].data = null;
      }
    }
  }
});

export const { openModal, closeModal } = ModalSlice.actions;
export default ModalSlice.reducer;