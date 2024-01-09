

export type CardProps = {
  CustomComponent?: any;
  contentType?: string;
  siteList: any;
  dataList: any;
  deleteContent?: (content: any) => void;
  duplicate?: (
    content: any,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
  // duplicate: (isDuplicate: boolean, title: string, language: any, selectedContent: any) => void;

  preview?: (content: any) => void;
  unPublish?: (content: any) => void;
  view?: (content: any) => void;
  edit?: (content: any) => void;
  fetchContentDetails?: (content: any) => void;
  editPage?: any;
  viewPage?: any;
  previewPage?: any;
  handleDuplicatePopup?: any;
  duplicatePage?: any;
  unPublishPage?: any;
  handleReschedulePopup?: any;
  reschedulePublishPage?: any;
  rescheduleUnPublishPage?: any;
  handleCancelTriggerPopup?: any;
  cancelPublishUnpublishTrigger?: any;
  handleDeleteData?: any;
  handlePageDelete?: any;
  duplicateToSite?: any;
};
