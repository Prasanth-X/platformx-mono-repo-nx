export type ActionType = {
  show: (
    content: DialogBoxContentProps,
    onConfirm?: () => void,
    onCancel?: () => void
  ) => void;
  hide: () => void;
};

export type DialogBoxContentProps = {
  Title: string;
  Subtitle?: string;
  SubTitle2?: string;
  Image?: string;
  LeftButtonText?: string;
  RightButtonText?: string;
};
