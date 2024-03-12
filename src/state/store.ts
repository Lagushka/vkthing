import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './ListSlice';
import modalReducer from './ModalSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
