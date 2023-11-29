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
  dataList?: any;
  loading?: boolean;
  fetchMore: () => void;
  deleteContent?: (content) => void;
  duplicate?: (
    content,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
  preview?: (content) => void;
  unPublish?: (content) => void;
  view?: (content) => void;
  edit?: (content) => void;
  fetchContentDetails?: (content) => void;
  editPage?;
  viewPage?;
  previewPage?;
  handleDuplicatePopup?;
  duplicatePage?;
  unPublishPage?;
  handleReschedulePopup?;
  reschedulePublishPage?;
  rescheduleUnPublishPage?;
  handleCancelTriggerPopup?;
  cancelPublishUnpublishTrigger?;
  handleDeleteData?;
  handlePageDelete?;
  duplicateToSite?;
};

export type CardProps = {
  contentType?: string;
  dataList: any;
  deleteContent: (content) => void;
  duplicate?: (
    content,
    isDuplicate: boolean,
    title: string,
    language: string
  ) => void;
  preview?: (content) => void;
  unPublish?: (content) => void;
  view?: (content) => void;
  edit?: (content) => void;
  fetchContentDetails?: (content) => void;
  editPage?;
  viewPage?;
  previewPage?;
  handleDuplicatePopup?;
  duplicatePage?;
  unPublishPage?;
  handleReschedulePopup?;
  reschedulePublishPage?;
  rescheduleUnPublishPage?;
  handleCancelTriggerPopup?;
  cancelPublishUnpublishTrigger?;
  handleDeleteData?;
  handlePageDelete?;
  sitelist: any;
  duplicateToSite?;
};
