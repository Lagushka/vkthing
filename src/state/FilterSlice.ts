import { Group } from '@/api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type SelectValue = {
  label: string;
  value: boolean | null;
};

export interface FilterState {
  closed: {
    values: SelectValue[];
    currentValue: boolean | null;
  };
  avatarColor: {
    values: string[];
    currentValue: string | null;
  };
  hasFriends: {
    values: SelectValue[];
    currentValue: boolean | null;
  };
}

const initialState: FilterState = {
  closed: {
    values: [
      {
        label: 'Закрытые',
        value: true,
      },
      {
        label: 'Открытые',
        value: false,
      },
      {
        label: 'Неважно',
        value: null,
      },
    ],
    currentValue: null,
  },
  avatarColor: {
    values: [],
    currentValue: null,
  },
  hasFriends: {
    values: [
      {
        label: 'Есть друзья',
        value: true,
      },
      {
        label: 'Нет друзей',
        value: false,
      },
      {
        label: 'Неважно',
        value: null,
      },
    ],
    currentValue: null,
  },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    getColorsByGroups: (state, action: PayloadAction<Group[]>) => {
      const color: Record<string, boolean> = {};
      for (const group of action.payload) {
        if (group.avatar_color) {
          color[group.avatar_color] = true;
        }
      }
      state.avatarColor.values = Object.keys(color);
    },
    changeClosedValue: (state, action: PayloadAction<boolean | null>) => {
      state.closed.currentValue = action.payload;
    },
    changeAvatarColor: (state, action: PayloadAction<string | null>) => {
      state.avatarColor.currentValue = action.payload;
    },
    changeHasFriends: (state, action: PayloadAction<boolean | null>) => {
      state.hasFriends.currentValue = action.payload;
    },
  },
});

export const {
  getColorsByGroups,
  changeAvatarColor,
  changeClosedValue,
  changeHasFriends,
} = filterSlice.actions;

export default filterSlice.reducer;
