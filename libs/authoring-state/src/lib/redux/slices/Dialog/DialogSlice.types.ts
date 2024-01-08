type DialogInstance = {
  imageIcon: any;
  title: string;
  leftButtonText: string;
  rightButtonText: string;
  subTitle: string;
  subTitle2: string;
};
export type DialogState = {
  isOpen: boolean;
  dialogProps: DialogInstance;
  handleCallback: () => void;
};
