import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogState } from './DialogSlice.types';
export const contentSlice = createSlice({
  name: 'Dialog',
  initialState: {
    isOpen: false,
  } as DialogState,
  reducers: {
    updateContentInitialState: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload;
      state.dialogProps = action.payload;
    },
  },
});

export const { updateContentInitialState } = contentSlice.actions;

export default contentSlice.reducer;
