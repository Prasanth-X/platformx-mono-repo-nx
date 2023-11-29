export type XDialogProps = {
  handleClose?: () => void;
  handleConfirm?: () => void;
  open: boolean;
  title: string;
  subTitle?: string;
  subTitle2?:string;
  imageIcon?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  leftButtonVariant?: string;
  rightButtonVariant?: string;
};
