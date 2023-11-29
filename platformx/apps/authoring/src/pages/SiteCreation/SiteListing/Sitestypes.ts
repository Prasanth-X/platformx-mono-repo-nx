export type DialogList = {
    disableConfirmButton?: boolean;
    isDialogOpen: boolean;
    title?: string;
    subTitle?: string;
    closeButtonText?: string;
    confirmButtonText?: string;
    confirmButtonHandle?: () => void;
    closeEmbedButtonHandle?: () => void;
    crossButtonHandle?: () => void;
    modalType?: string;
    pageUrl?: string;
    type?: string;
    setSelectedItem?: any;
    contentType?: string;
  };
  
  