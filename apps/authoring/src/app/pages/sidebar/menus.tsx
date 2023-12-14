import AudioFileIcon from '@mui/icons-material/AudioFile';
import BarChartIcon from '@mui/icons-material/BarChart';
import CampaignIcon from '@mui/icons-material/Campaign';
import CancelScheduleSendOutlinedIcon from '@mui/icons-material/CancelScheduleSendOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import LanguageIcon from '@mui/icons-material/Language';
import LaptopIcon from '@mui/icons-material/Laptop';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import QuizIcon from '@mui/icons-material/Quiz';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ScheduleSendRoundedIcon from '@mui/icons-material/ScheduleSendRounded';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import NewIcon from '../../assets/svg/newIcon.svg';
import {
  ContentType,
  CreateEventType,
  PageType,
  PostTypesType,
  SiteSettingTypesType,
  UserManagementTypesType,
} from './types';

export const pageMenus: PageType[] = [
  {
    type: 'all_pages',
    name: 'ALL',
    icon: AudioFileIcon,
  },
  {
    type: 'published',
    name: 'PUBLISHED',
    icon: TelegramIcon,
  },
  {
    type: 'drafts',
    name: 'DRAFT',
    icon: SaveAsIcon,
  },
  {
    type: 'unpublished',
    name: 'UNPUBLISHED',
    icon: UnpublishedIcon,
  },
  {
    type: 'scheduled_publish',
    name: 'SCHEDULED_PUBLISH',
    icon: ScheduleSendRoundedIcon,
  },
  {
    type: 'scheduled_unpublish',
    name: 'SCHEDULED_UNPUBLISH',
    icon: CancelScheduleSendOutlinedIcon,
  },
];

export const contentMenus: ContentType[] = [
  {
    name: 'article',
    url: '/content/article',
    icon: DescriptionIcon,
    chevronArray: ['/content/article'],
    id: 'article',
  },
  {
    name: 'vod',
    url: '/content/vod',
    icon: PlayCircleOutlineIcon,
    chevronArray: ['/content/vod', '/content/create-vod'],
    id: 'vod',
  },
  {
    name: 'quiz',
    url: '/content/quiz',
    icon: QuizIcon,
    chevronArray: ['/content/quiz', '/content/create-quiz'],
    id: 'quiz',
  },
  {
    name: 'polls',
    url: '/content/poll',
    icon: BarChartIcon,
    chevronArray: ['/content/poll', '/content/create-poll'],
    id: 'polls',
  },
  {
    name: 'events',
    url: '/content/event',
    icon: CampaignIcon,
    chevronArray: ['/content/event', '/content/create-event'],
    id: 'events',
  },
];
export const postMenus: PostTypesType[] = [
  {
    name: 'all_posts',
    url: '/post/social-share-list',
    icon: EventAvailableIcon,
    chevronArray: ['/post/social-share-list'],
  },
];
export const userMenus: UserManagementTypesType[] = [
  {
    name: 'Users',
    url: '/user-management/user-list',
    icon: PeopleOutlineIcon,
    chevronArray: ['/user-management/user-list'],
  },
];
export const siteMenus: SiteSettingTypesType[] = [
  {
    name: 'Footer Setting',
    url: '/site-setting/footer-setting',
    icon: LaptopIcon,
    chevronArray: ['/site-setting/footer-setting'],
    id: 'footer setting',
  },

  {
    name: 'Media Handle',
    url: '/site-setting/media-handle',
    icon: <img src={NewIcon} alt='NewIcon' />,
    chevronArray: ['/site-setting/media-handle'],
    id: 'media handle',
  },

  {
    name: 'Cookie Policy',
    url: '/site-setting/cookie-setting',
    icon: PaletteOutlinedIcon,
    chevronArray: ['/site-setting/cookie-setting'],
    id: 'cookie setting',
  },
];

export const createEvent: CreateEventType[] = [
  {
    name: 'Events',
    url: '/events/events',
    icon: EventAvailableIcon,
    chevronArray: ['/events/events'],
  },
];
export const dashboardMenus: any[] = [
  {
    name: 'My Dashboard',
    url: '/dashboard/my-dashboard',
    icon: SpeedOutlinedIcon,
    chevronArray: ['/dashboard/my-dashboard'],
  },
];

export const leftSideBarContent: any = [
  {
    name: 'Pages',
    url: '/page-list',
    icon: LanguageIcon,
    id: 'pages',
    subMenus: [],
    roles: [
      'admin',
      'author',
      'editor',
      'reviewer',
      'content-manager',
      'publisher',
      'gust',
    ],
  },
];
