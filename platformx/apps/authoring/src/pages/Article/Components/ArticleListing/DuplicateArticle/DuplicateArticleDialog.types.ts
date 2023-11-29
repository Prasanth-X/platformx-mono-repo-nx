export type ArticleDialog=  {
    title : string;
    isDialogOpen: boolean;
    closeButtonHandle: () => void;
    doneButtonHandle: (pageExist: boolean, currTitle: string) => void;
    contentType?: string;
    language?: any;
    setLanguage?: any;
  }