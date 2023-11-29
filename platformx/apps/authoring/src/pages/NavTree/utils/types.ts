export type ContentProps = {
  Image: string;
  Title: string;
  Description?: string;
  RedirectionUrl?: string;
  ContentType: string;
  Internal: boolean;
  CreatedDate: string;
  Author: string;
};

export type ItemlistProps = {
  Page: string;
  Status?: string;
  CurrentPageUrl: string;
  Title?: string;
  Description?: string;
  LastModificationDate: string;
  LastModifiedBy?: string;
  PublishedBy?: string;
  Path: string;
  SchduledPublishTriggerDateTime: string;
  SchduledUnPublishTriggerDateTime: string;
};

export type MenulistProps = {
  Title?: any;
  Tagging?: any;
  Text?: any;
  Menu_Id?: any;
  ParentId?: any;
  Menu_State?: any;
  URL?: any;
  Label?: any;
  Internal?: any;
  Status?: any;
  Score?: any;
  IsHidden?: any;
  LastModificationDate?: any;
  LastModifiedBy?: any;
  Menu_PublishedBy?: any;
  Author?: any;
  Menu_PublishedDate?: any;
  LastPublishedDate?: any;
  createdBy?: any;
  UserActionInfo?: any;
  HomePage?: any;
};
