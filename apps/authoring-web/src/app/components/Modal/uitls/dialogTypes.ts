export type DialogList = {
  disableConfirmButton?: boolean;
  isDialogOpen: boolean;
  title?: string;
  subTitle?: string;
  subTitle2?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonHandle?: () => void;
  closeButtonHandle?: () => void;
  crossButtonHandle?: (event?: any, reason?: any) => void;
  closeIcon?: any;
  modalType?: string;
  pageUrl?: string;
  type?: string;
  isCreateUser?: boolean;
};
