export type PageType = {
  type: string;
  name: string;
  icon?: any;
};

export type PageLeftSidebar = {
  handleSelectedType: (data: PageType) => void;
};

export type CardProps = {
  Page: string;
  Status?: string;
  CurrentPageUrl: string;
  Title?: string;
  Description?: string;
  LastModificationDate: string;
  LastModifiedBy?: string;
  PublishedBy?: string;
  Path: string;
  SchduledPublishTriggerDateTime?: string;
  SchduledUnPublishTriggerDateTime?: string;
  LastPublishedDate?: string;
  PublishedDate?: string;
};

export type PageProps = {
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

export type PageStatusList = {
  pageType?: string;
  colorType?: string;
  bgColorType?: string;
  gridView?: boolean;
};

export enum MenuActions {
  VIEW = 'view',
  PREVIEW = 'preview',
  EDIT = 'edit',
  DUPLICATE = 'duplicate',
  DELETE = 'delete',
  UNPUBLISH = 'unpublish',
  RESCHEDULE_PUBLISH = 'reschedule_publish',
  CANCEL_PUBLISH = 'cancel_publish',
  RESCHEDULE_UNPUBLISH = 'reschedule_unpublish',
  CANCEL_UNPUBLISH = 'cancel_unpublish',
  APPROVAL_STATUS = 'approval_status',
}
