import AudioFileIcon from '@mui/icons-material/AudioFile';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

import CourseListIcon from '../../../assets/images/icons/course-icon.svg';
import DraftIcon from '../../../assets/images/icons/draftIcon.svg';
import EventsListIcon from '../../../assets/images/icons/event-fill.svg';
import PollListIcon from '../../../assets/images/icons/polls-fill.svg';
import PublishedIcon from '../../../assets/images/icons/PublishedIcon.svg';
import SchedulePublishIcon from '../../../assets/images/icons/schedulePublishIcon.svg';
import ScheduledUnpublishIcon from '../../../assets/images/icons/scheduleUnpublishIcon.svg';
import ArticleListIcon from '../../../assets/svg/articleListIcon.svg';
import DraftStatusIcon from '../../../assets/svg/draftStatusIcon.svg';
import PagesListIcon from '../../../assets/svg/pagesListIcon.svg';
import PublishedStatusIcon from '../../../assets/svg/publishStatusIcon.svg';
import QuizListIcon from '../../../assets/svg/quizListIcon.svg';
import SchedulePublishStatusIcon from '../../../assets/svg/schedulePublishStatusIcon.svg';
import ScheduleUnpublishStatusIcon from '../../../assets/svg/scheduleUnpublishStatusIcon.svg';
import UnpublishedStatusIcon from '../../../assets/svg/unpublishStatusIcon.svg';
import VodListIcon from '../../../assets/svg/vodListIcon.svg';
import SpaceListIcon from '../../../assets/svg/Space.svg';
import SpacePublicIcon from '../../../assets/svg/public.svg';
import SpacePrivateIcon from '../../../assets/svg/Private.svg';
import Challenge_community from '../../../assets/svg/Challenge_community.svg';
import General_community from '../../../assets/svg/General_community.svg';
import News_community from '../../../assets/svg/News_community.svg';

export const SORT_ORDER = 'DESC';
export const statusColors = {
  draft: '#ffcd41',
  published: '#0fa069',
  unpublished: '#777777',
};
export const statusIcons: any = {
  draft: DraftIcon,
  published: PublishedIcon,
  unpublished: UnpublishedIcon,
  schedulePublish: SchedulePublishIcon,
  scheduleUnpublish: ScheduledUnpublishIcon,
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
  vod: VodListIcon,
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

const gcpUrl = process.env.REACT_APP_GCP_URL;
const BucketName = process.env.REACT_APP_BUCKET_NAME;
const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;

export const DEFAULT_EMBED_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;
export const DEFAULT_SOCIAL_IMAGE = `${gcpUrl}/${BucketName}/${defaultImage}`;
