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
    handleCallback: () => {},
  } as DialogState,
  reducers: {
    handleDialog: (state, action: PayloadAction<any>) => {
      const {
        title,
        subTitle,
        isOpen,
        leftButtonText,
        rightButtonText,
        imageIcon,
        handleCallback,
      } = action.payload;
      state.isOpen = isOpen;
      state.dialogProps.title = title;
      state.dialogProps.subTitle = subTitle;
      state.dialogProps.leftButtonText = leftButtonText;
      state.dialogProps.rightButtonText = rightButtonText;
      state.dialogProps.imageIcon = imageIcon;
      state.handleCallback = handleCallback;
      // state.dialogProps = action.payload;
    },
    handleConfirm: (state) => {
      state.handleCallback();
      // conformState?.onConfirm();
      // setIsPopupVisible(false);
    },
    handleCancel: (state) => {
      state.isOpen = false;
      state.dialogProps.title = '';
      state.dialogProps.subTitle = '';
      state.dialogProps.leftButtonText = '';
      state.dialogProps.rightButtonText = '';
      state.dialogProps.imageIcon = '';
      // cancelState?.onCancel();
      // setContent({ Title: '' });
      // setIsPopupVisible(false);
    },
  },
});

export const { handleDialog, handleConfirm, handleCancel } =
  dialogSlice.actions;
export default dialogSlice.reducer;
