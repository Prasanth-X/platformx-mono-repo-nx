export type CardMenuProps = {
  PageDetails: any;
  Open: boolean;
  AnchorEl: HTMLElement | null;
  handleClose: () => void;
};

export enum MenuActions {
  SOCIAL_SHARE = 'social_share',
  EMBED = 'embed',
  VIEW_PREVIEW = 'view_preview',
  COPY_URL = 'copy_url',
  SETTINGS = 'settings',
  SELECTED_DATA = 'selected_data',
  SHARE_WITH_SITES = 'share_with_sites',
  INVITE_USER = 'inviteuser',
  COURSE_REPORT = 'courseReport',
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
