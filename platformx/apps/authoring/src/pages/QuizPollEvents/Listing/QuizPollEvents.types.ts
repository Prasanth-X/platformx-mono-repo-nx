import { ListItem } from '../../../Common/Listing/Utils/List.types';

export type QuizPollEventProps = {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  contentType: 'Quiz' | 'Poll' | 'Event';
  onDuplicatePage: () => void;
  handleDelete: () => void;
  handleUnpublishedPage: () => void;
  listItemDetails: ListItem;
  handlePublishedPageView: (contentPayload: ListItem) => void;
  handleCopy: (pageUrl: string) => void;
  openItemSettingsPanel: (path: string) => void;
  handleSocialShare: () => void;
  handleEmbed: () => void;
  handleEditContentType: (path: string) => void;
  handleMenuActions: (type: string) => void;
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
  SETTINGS = 'settings',
  SELECTED_DATA = 'selected_data',
  APPROVAL_STATUS = 'approval_status',
  SHARE_WITH_SITES = 'share_with_sites',
  INVITE_USER = 'inviteuser',
  COURSE_REPORT = 'courseReport',
}
