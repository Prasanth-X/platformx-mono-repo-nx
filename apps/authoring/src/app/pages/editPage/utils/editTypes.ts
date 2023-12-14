export type AnalyticsInfo = {
  PageAnalytics: boolean;
  EventBasedAnalytics: boolean;
};
export type PageInformation = {
  PageName: string;
  PageDescription: string;
  PageTags: string[];
  PageURL: string;
  PageViewer: string;
  PageCaching: boolean;
  PageMobileFriendly: boolean;
};
export type PageSeoInformation = {
  SeoTitle: string;
  SeoDescription: string;
  SeoKeywords: string[];
  SeoURL: string;
  SeoBlockIndexing: boolean;
};
export type PageSocialShareInformation = {
  SocialOgTitle: string;
  SocialOgDescription: string;
  SocialOgSiteName: string;
  SocialOgType: string;
  SocialOgURL: string;
  SocialOgLocale: string;
  SocialOgImage: string;
};
export type PageTwitterInformation = {
  SocialOgTwitterTitle: string;
  SocialOgTwitterDescription: string;
  SocialOgTwitterImage: string;
  SocialOgTwitterURL: string;
  SocialTwitterCardSize: string;
};
export type BrightCoveProps = {
  index: string;
  videoObj: {
    AccountID: string;
    PlayerID: string;
    VideoID: string;
  };
  handleSave(
    sectionToUpdate: string,
    data: {
      AccountID: string;
      PlayerID: string;
      VideoID: string;
    },
    index: string
  ): void;
  sectionToUpdate?: string;
};
type AddSectionDisplay = {
  showAtTop: boolean;
  showAtBottom: boolean;
};
type ShowIconsStateObjectType = {
  showCreate: boolean;
  showVisible: boolean | undefined;
  showCopy: boolean;
  showUp: boolean;
  showDown: boolean;
  showReset: boolean | undefined;
  showDelete: boolean;
  showSettings: boolean;
};
type ContentProps = {
  id: string;
  valdation: {
    maxlength: string;
    required: string;
  };
};
export type PrelemCardProps = {
  keyIndex: string;
  prelemInfo: string;
  showIconsState: ShowIconsStateObjectType;
  handleClick(
    prelemIndex?: string,
    operation?: string,
    prelemRef?: React.Ref<HTMLDivElement>,
    schemaArray?: ContentProps[]
  ): void;
  showAddSection: AddSectionDisplay;
  addSectionTouchPointClick(prelemPosition: string, position: string): void;
  prelemEditState: boolean;
  handlePrelemEditSubmit: (
    editStateValue: string,
    obj: object,
    schemaArray?: ContentProps[],
    prelemRef?: React.Ref<HTMLDivElement>,
    index?: string,
    buttonsKeysPopulatedObj?: object
  ) => void;
  documentPath: string;
  prelemDataReset: boolean;
  onToggleContentGallery(
    activeTab?: string,
    imageVideoContentGallery?: boolean,
    slotNumber?: number
  ): void;
  selectedContentForButton: string;
};
type ImageDetails = {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
};
type ImageProps = {
  Thumbnail: string;
  Title: string;
  Description: string;
};
export type PrelemImagesProps = {
  index: string;
  imageInstance;
  handleSave(sectionToUpdate: string, data: any, index: string): void;
  sectionToUpdate: string;
  handleGallery(
    toggleState: boolean,
    galleryType: string,
    imageIndex: string,
    type: string
  );
  selectedImage: ImageProps;
  selectedIndex;
  published_images:ImageCrop[];
};
export type ImageCrop = {
  aspect_ratio: string;
  bucket_path: string;
  ext: string;
  folder_path: string;
  visibility: string;
};
export type SeoInfo = {
  showContent: boolean;
  share: boolean;
  structureData: any;
};
export type PrelemSeoProps = {
  handleSave(sectionToUpdate: string, data: any, index?: number): void;
  seoEnabled: boolean;
  structureData: any;
};
type TestimonialData = {
  TestimonialText?: string;
  AuthorName?: string;
  AuthorDesignation?: string;
};
export type TestimonialProps = {
  handleSave(sectionToUpdate: string, data: any, index?: string): void;
  sectionToUpdate: string;
  data: TestimonialData[];
};
export type TwitterProps = {
  index: string;
  twitterHandle: string;
  handleSave(sectionToUpdate: string, data: string, index: string): void;
  sectionToUpdate?: string;
};
type VideoDetails = {
  Name: string;
  Url: string;
  Title: string;
  Description: string;
  Attribution: boolean;
  Transcript: boolean;
  CC: boolean;
};
type VideoProps = {
  Url: string;
  Thumbnail?: string;
  Title: string;
  Description: string;
};
export type PrelemVideoProps = {
  index: string;
  playerFlow: string;
  videoInstance;
  handleSave(sectionToUpdate: string, data: VideoDetails, index?: string): void;
  sectionToUpdate: string;
  handleGallery(
    toggleState: boolean,
    galleryType: string,
    videoIndex: string,
    type: string
  );
  selectedVideo: VideoProps;
  selectedIndex;
};
export type PrelemInstance = {
  PrelemId: string;
  Tags: [];
  PreviewThumbnail: string;
  Description: string;
  DocumentType: string;
  DocumentPath: string;
  DocumentCreationPath: null;
  DevelopedBy: string;
  DevelopedDate: string;
  SeoEnabled: boolean;
  AnalyticsEnabled: boolean;
  IsHidden: boolean;
  IsModified?: boolean;
};
