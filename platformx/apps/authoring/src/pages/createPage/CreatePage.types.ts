export type DialogList = {
  isDialogOpen: boolean;
  title?: string;
  pageNameInitial?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  isDuplicate: boolean;
  confirmButtonHandle: (
    pageName: string,
    pageUrl: string,
    isDuplicate: boolean
  ) => void;
  closeButtonHandle: () => void;
  language?: string[];
  setLanguage?: any;
};

export type DialogContentProps = {
  language: string;
  setLanguage: () => void;
  isDuplicate: boolean;
  showPageUrlError: boolean;
  pageName: string;
  handlePgNameChange: (event: any) => void;
  showPageNameError: boolean;
  handleUrlChange: (event: any) => void;
  pageUrl: string;
};
