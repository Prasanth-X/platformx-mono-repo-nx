export type VodListProps = {
  Name?: string;
  Page: string;
  ParentPageURL?: string;
  Page_State?: string;
  CurrentPageURL: string;
  DspaceVideoUrl?: string;
  Title?: string;
  Tags?: [''];
  Description?: string;
  LastModificationDate: string;
  LastModifiedBy?: string;
  PublishedBy?: string;
  Path: string;
};
export type VodInstance = {
  Page: string;
  Description: string;
  ShortDescription: string;
  AccountId: string;
  PlayerID: string;
  VideoId: string;
  PlayerType: string;
  Title: string;
  CurrentPageURL: string;
  ParentPageURL: string;
  Page_State: string;
  Thumbnail?: string;
  DsapceVideoUrl?: string;
  Author?: string;
  Poster: string;
  Tags: [];
  IsEdit: boolean;
  SeoEnable: boolean; //lastModifiedDate,Path,LastModifiedBy,LastPublishedDate
  AnalyticsEnable: boolean;
  RobotTxt: boolean;
  SiteMap: boolean;
  Page_CreatedBy: string;
  Page_LastModifiedBy: string;
  Page_PublishedBy: string;
  Analytics: string;
  Others: string;
  StructureData: string;
  PageSettings: any;
  IsConfirm: boolean;
};

export enum MenuActions {
  EDIT = 'edit',
  DUPLICATE = 'duplicate',
  DELETE = 'delete',
  SOCIAL_SHARE = 'social_share',
  EMBED = 'embed',
  UNPUBLISH = 'unpublish',
  VIEW_PREVIEW = 'view_preview',
  COPY_URL = 'copy_url',
  SETTINGS = 'settings'
}
