import AudioFileIcon from '@mui/icons-material/AudioFile';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { PageType } from '../Components/LeftSidebar/LeftSidebar.types';
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
