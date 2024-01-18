import AudioFileIcon from '@mui/icons-material/AudioFile';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

import {
  ArticleListIcon,
  Challenge_community,
  CourseListIcon,
  DraftStatusIcon,
  EventsListIcon,
  General_community,
  News_community,
  PagesListIcon,
  PollListIcon,
  PublishedStatusIcon,
  QuizListIcon,
  SchedulePublishStatusIcon,
  ScheduleUnpublishStatusIcon,
  SpaceListIcon,
  SpacePrivateIcon,
  SpacePublicIcon,
  UnpublishedStatusIcon,
  VODListIcon,
} from '@platformx/utilities';

export const SORT_ORDER = 'DESC';
export const statusColors = {
  draft: '#ffcd41',
  published: '#0fa069',
  unpublished: '#777777',
};
export const statusIcons: any = {
  draft: UnpublishedIcon,
  published: UnpublishedIcon,
  unpublished: UnpublishedIcon,
  schedulePublish: SpacePublicIcon,
  scheduleUnpublish: SpacePublicIcon,
  public: SpacePublicIcon,
  private: SpacePrivateIcon,
};
export const stateIcons: any = {
  draft: DraftStatusIcon,
  published: PublishedStatusIcon,
  unpublished: UnpublishedStatusIcon,
  schedulePublish: SchedulePublishStatusIcon,
  scheduleUnpublish: ScheduleUnpublishStatusIcon,
};
export const iconsList: any = {
  sitepage: PagesListIcon,
  article: ArticleListIcon,
  quiz: QuizListIcon,
  vod: VODListIcon,
  poll: PollListIcon,
  event: EventsListIcon,
  courses: CourseListIcon,
  news: News_community,
  general: General_community,
  'challenges-announcement': Challenge_community,
  Space: SpaceListIcon,
};
export const enum WorkFlowStatus {
  draft = 'Draft',
  review = 'review pending',
  approval = 'Approval pending',
  publish = 'publish pending',
  published = 'published',
}
export const enum StatusKey {
  draft = 'draft',
  review = 'review',
  approval = 'approval',
  publish = 'publish',
  published = 'published',
  unpublish = 'unpublish',
}

export type PageType = {
  type: string;
  name: string;
  icon?: any;
};

export const STATUS = [
  {
    name: 'All',
  },
  {
    name: 'draft',
  },
  {
    name: 'published',
  },
];

export const PAGE_TYPES: PageType[] = [
  {
    type: 'All Pages',
    name: 'ALL',
    icon: AudioFileIcon,
  },
  {
    type: 'Published',
    name: 'PUBLISHED',
    icon: TelegramIcon,
  },
  {
    type: 'Drafts',
    name: 'DRAFT',
    icon: SaveAsIcon,
  },

  {
    type: 'Unpublished',
    name: 'UNPUBLISHED',
    icon: UnpublishedIcon,
  },
  {
    type: 'Scheduled Publish',
    name: 'SCHEDULED_PUBLISH',
    icon: ScheduleSendRoundedIcon,
  },
  {
    type: 'Scheduled Unpublish',
    name: 'SCHEDULED_UNPUBLISH',
    icon: CancelScheduleSendOutlinedIcon,
  },
];

export const CARD_MENUS = {
  EDIT: {
    displayName: 'Edit',
    permission: 'page.edit',
  },
  DUPLICATE: {
    displayName: 'duplicate',
    permission: 'page.duplicate',
  },
  DELETE: {
    displayName: 'delete',
    permission: 'page.delete',
  },
  UNPUBLISH: {
    displayName: 'Unpublish',
    permission: 'page.publish',
  },
  RESCHEDULE_PUBLISH: {
    displayName: 'reschedule_publish',
    permission: 'page.publish',
  },
};

const gcpUrl = process.env.NX_GCP_URL;
const BucketName = process.env.NX_BUCKET_NAME;
const defaultImage = process.env.NX_DEFAULT_IMAGE;

export const DEFAULT_EMBED_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;
export const DEFAULT_SOCIAL_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;

export const DRAFT = 'DRAFT';
export const PUBLISHED = 'PUBLISHED';
