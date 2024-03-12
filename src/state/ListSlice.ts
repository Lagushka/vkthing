import { Group } from '@/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type FetchingStatus = 'loading' | 'error' | 'done';

export interface GroupsState {
  groups: Group[];
  status: FetchingStatus;
}

const initialState: GroupsState = {
  groups: [],
  status: 'loading',
};

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    setStatus: (state, action: PayloadAction<FetchingStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { getAll, setStatus } = groupsSlice.actions;

export default groupsSlice.reducer;
