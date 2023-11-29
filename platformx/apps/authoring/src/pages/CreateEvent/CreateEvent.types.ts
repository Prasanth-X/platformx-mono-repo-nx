export type EventWhole = {
  imagevideoURL?: string;
  title: string;
  description: string;
  short_title: string;
  short_description: string;
  tags: any[];
  page?: string;
  imageUrl: string;
  socialShareImgURL: string;
  short_titleSocialShare: string;
  short_descriptionSocialShare: string;
  tagsSocialShare: string | any[];
};

export type State = {
  title: string;
  short_title: string;
  short_description: string;
  description: string;
  imageUrl: string;
  socialShareImgURL: string;
  short_titleSocialShare: string;
  short_descriptionSocialShare: string;
  tagsSocialShare: any[];
  analytics_enable: boolean;
  impression: boolean;
  contentInsight: boolean;
  seo_enable: boolean;
  seoShared: boolean;
  tags: any[];
  is_schedule_publish: boolean;
  schedule_publish_datetime: string;
  is_schedule_unpublish: boolean;
  schedule_unpublish_datetime: string;
  event_start_date?: any;
  event_end_date?: any;
  webLink: string;
  address: string;
  locality: string;
  postalCode: string;
  regionState: string;
  country: string;
  original_image?: string;
  published_images?: string;
  structure_data?: string;
};

export type SetState = React.Dispatch<React.SetStateAction<State>>;

export type AnalyticsRef = {
  analyticsInput: {
    eventAnalytics: boolean;
    eventContentInsight: boolean;
  };
};

export type SeoRef = {
  seoInput: {
    seoEnabled: boolean;
    seoShared: boolean;
  };
};
export type SeoInfoType = {
  showContent: boolean;
  share: boolean;
  structureData: any;
};

export type EventDataType = {
  title: string;
  short_title: string;
  short_description: string;
  description: string;
  imageUrl: string;
  socialShareImgURL: string;
  short_titleSocialShare: string;
  short_descriptionSocialShare: string;
  tagsSocialShare: any[];
  analytics_enable: boolean;
  impression: boolean;
  contentInsight: boolean;
  seo_enable: boolean;
  seoShared: boolean;
  tags: any[];
  is_schedule_publish: boolean;
  schedule_publish_datetime: string;
  is_schedule_unpublish: boolean;
  schedule_unpublish_datetime: string;
  event_start_date?: any;
  event_end_date?: any;
  webLink: string;
  address: string;
  locality: string;
  postalCode: string;
  regionState: string;
  country: string;
};

export type SelectedImage = {
  Thumbnail: string;
  title: string;
  description: string;
};

export type ContentInstance = {
  name?: string;
  page?: string;
  parent_page_url?: string;
  page_state?: string;
  current_page_url?: string;
  title?: string;
  tags?: [];
  description?: string;
  modificationDate?: string;
  lastModifiedBy?: string;
  page_publishedby?: string;
  path?: string;
  questions?: [];
  display_scores?: string;
  background_content?: {
    Url?: string;
    Thumbnail?: string;
  };
  result_range_1?: string;
  result_range_2?: string;
  result_range_3?: string;
  result_range_4?: string;
  analytics_enable?: boolean;
  category?: string;
  createdBy?: string;
  creationDate?: string;
  is_edit?: boolean;
  others?: string;
  page_lastmodifiedby?: string;
  robot_txt?: string;
  seo_enable?: boolean;
  settingsProperties?: string;
  short_description?: string;
  site_name?: string;
  sitemap?: string;
  structure_data?: string;
  banner_image?: string;
  thumbnail_image?: string;
};

export type InitialStateInstance = {
  contentArray: ContentInstance[] | null;
  currentContent?: ContentInstance | null;
  isUnsavedVod: boolean;
  contentProp: string;
};

export const contentInitialState: InitialStateInstance = {
  contentArray: [],
  currentContent: {},
  isUnsavedVod: false,
  contentProp: '',
};

export type EventInstance = {
  CommonFields: {
    page: string;
    title: string;
    tag_name: string;
    category: string;
    site_name: string;
    page_state: string;
    description: string;
    short_description: string;
    is_edit: boolean;
    seo_enable: boolean;
    analytics_enable: boolean;
    robot_txt: boolean;
    sitemap: boolean;
    analytics: string;
    short_title: string;
    others: string;
    structure_data: string;
    creationDate: string;
    modificationDate: string;
    tags: undefined[];
    createdBy: string;
    parent_page_url: string;
    current_page_url: string;
    page_lastmodifiedby: string;
    settings: object;
    IsConfirm: boolean;
  };
  ObjectFields: {
    thumbnail_image: string;
    banner_image: string;
    actual_address: string;
    event_end_date?: string;
    event_start_date?: string;
    virtual_address: string;
    google_api_address: string;
  };
};
