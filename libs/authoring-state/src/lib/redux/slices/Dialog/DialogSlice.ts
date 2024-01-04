import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DialogState } from './DialogSlice.types';
export const dialogSlice = createSlice({
  name: 'Dialog',
  initialState: {
    isOpen: false,
    dialogProps: {
      imageIcon: '',
      title: '',
      leftButtonText: '',
      rightButtonText: '',
      subTitle: '',
      subTitle2: '',
    },
  } as DialogState,
  reducers: {
    handleDialog: (state, action: PayloadAction<any>) => {
      state.isOpen = action.payload;
      // state.dialogProps = action.payload;
    },
    handleConfirm: () => {
      // conformState?.onConfirm();
      // setIsPopupVisible(false);
    },
    handleCancel: () => {
      // cancelState?.onCancel();
      // setContent({ Title: '' });
      // setIsPopupVisible(false);
    },
  },
});

export const { handleDialog, handleConfirm, handleCancel } =
  dialogSlice.actions;
export default dialogSlice.reducer;
