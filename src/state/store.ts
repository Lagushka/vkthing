import { configureStore } from '@reduxjs/toolkit';
import groupsReducer from './ListSlice';
import modalReducer from './ModalSlice';
import filterReducer from './FilterSlice';

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    modal: modalReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
