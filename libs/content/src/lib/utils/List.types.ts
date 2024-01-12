export type ListItem = {
  url: string;
  tagName: string;
  pageName: string;
  title: string;
  description: string;
  author: string;
  lastModifiedDate: string;
  status: string;
  path?: string;
  page?: string;
  scheduledPublishTriggerDateTime?: string;
  scheduledUnPublishTriggerDateTime?: string;
  lastPublishedDate?: string;
  lastModifiedBy?: string;
  publishedBy?: string;
  publishedDate?: string;
  currentPageUrl?: string;
  parentPageUrl?: string;
  name?: string;
  page_state?: 'published' | 'draft' | 'unpublished';
  is_published?: boolean;
  current_page_url?: string;
  thumbnail?: string;
  settings?: string;
  banner?: string;
  published_images?: object[];
  original_image?: object;
  eventStartDate: string;
  eventEndDate: string;
};
export type ListViewProps = {
  listItemDetails: ListItem;
  contentType: string;
};
export type CardClickProps = {
  parameter: string;
  status: string;
  pathForSelectedPage: string;
  actionType?: string;
  deviceType?: string;
  editOption?: string;
  searchCatURL?: string;
  searchTermURL?: string;
  sortByURL?: string;
};

export type ContentListingProps = {
  contentType?: string;
  contentList?: any;
  dataList?: any;
  loading: boolean;
  fetchMore: () => void;
  deleteContent?: (content: any) => void;

  duplicate: (isDuplicate: boolean, title: string, language: any, selectedContent: any) => void;
  preview?: (content: any) => void;
  unPublish?: (content: any) => void;
  view?: (content: any) => void;
  edit?: (content: any) => void;
  fetchContentDetails?: (content: any) => void;
  editPage?: any;
  viewPage?: any;
  previewPage?: any;
  handleDeleteData?: any;
  handlePageDelete?: any;
  duplicateToSite?: any;
};

export type CardProps = {
  contentType?: string;
  dataList: any;
  deleteContent?: (content: any) => void;
  duplicate?: (
    content: any,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
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
  sitelist: any;
  duplicateToSite?: any;
};
