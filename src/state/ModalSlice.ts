import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ModalId = string | null;

export interface ModalState {
  activeModal: ModalId;
}

const initialState: ModalState = {
  activeModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    changeModal: (state, action: PayloadAction<ModalId>) => {
      state.activeModal = action.payload;
    },
  },
});

export const { changeModal } = modalSlice.actions;

export default modalSlice.reducer;
