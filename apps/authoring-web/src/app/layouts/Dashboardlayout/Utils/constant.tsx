import AllIcon from '../../../assets/svg/allIcon.svg';
import ArticleIcon from '../../../assets/svg/articleIcon.svg';
import EventsIcon from '../../../assets/svg/EventsIcon.svg';
import MyDashboardIcon from '../../../assets/svg/myDashboardIcon.svg';
import PagesIcon from '../../../assets/svg/pagesIcon.svg';
import PollIcon from '../../../assets/svg/PollIcon.svg';
import PostsIcon from '../../../assets/svg/PostsIcon.svg';
import QuizIcon from '../../../assets/svg/QuizIcon.svg';
import UsersIcon from '../../../assets/svg/UserIcon.svg';
import VODIcon from '../../../assets/svg/VODIcon.svg';

export const contentPaths = [
  {
    Title: 'Pages',
    Url: '/page-list',
    ContentType: 'Sitepage',
  },
  {
    Title: 'Article',
    Url: '/content/article',
    ContentType: 'Article',
  },
  {
    Title: 'Vod',
    Url: '/content/vod',
    ContentType: 'Vod',
  },
  {
    Title: 'Quiz',
    Url: '/content/quiz',
    ContentType: 'Quiz',
  },
  {
    Title: 'Poll',
    Url: '/content/poll',
    ContentType: 'Poll',
  },
  {
    Title: 'Events',
    Url: '/content/event',
    ContentType: 'Event',
  },
  {
    Title: 'All',
    Url: '/search-results',
    ContentType: 'ALL',
  },
];

export const MenuData = [
  {
    Title: 'Dashboard',
    Menu: [
      {
        MenuName: 'My Dashboard',
        Icon: MyDashboardIcon,
        url: '/dashboard',
      },
    ],
  },
  {
    Title: 'Pages',
    Menu: [
      {
        MenuName: 'Pages',
        Icon: PagesIcon,
        // url: '/page-list',
        url: '/page-list',
      },
    ],
  },
  {
    Title: 'Content',
    Menu: [
      {
        MenuName: 'Article',
        Icon: ArticleIcon,
        // url: '/content/article',
        url: '/content/article',
      },
      {
        MenuName: 'VOD',
        Icon: VODIcon,
        url: '/content/vod',
      },
      {
        MenuName: 'Quiz',
        Icon: QuizIcon,
        url: '/content/quiz',
      },
      {
        MenuName: 'Poll',
        Icon: PollIcon,
        url: '/content/poll',
      },
      {
        MenuName: 'Events',
        Icon: EventsIcon,
        url: '/content/event',
      },
    ],
  },
  {
    Title: 'Post',
    Menu: [
      {
        MenuName: 'All Posts',
        Icon: PostsIcon,
        url: '/post/social-share-list',
      },
    ],
  },
  {
    Title: 'User Management',
    Menu: [
      {
        MenuName: 'Users',
        Icon: UsersIcon,
        url: '/user-management/user-list',
      },
    ],
  },
];

export const tagData = [
  { title: 'Fifa' },
  { title: 'Cricket' },
  { title: 'Australia' },
  { title: 'Fifa' },
  { title: 'Cricket' },
  { title: 'Australia' },
];

export const categoryData = [
  { title: 'All', icon: AllIcon, category: 'ALL', id: 'all' },
  { title: 'Pages', icon: PagesIcon, category: 'Sitepage', id: 'pages' },
  { title: 'Article', icon: ArticleIcon, category: 'Article', id: 'article' },
  // {
  //   title: 'VOD (Video on Demand)',
  //   icon: VODIcon,
  //   category: 'Vod',
  //   id: 'vod_demand',
  // }, #TODO For X-live
  { title: 'Quiz', icon: QuizIcon, category: 'Quiz', id: 'quiz' },
  { title: 'Poll', icon: PollIcon, category: 'Poll', id: 'poll' },
  { title: 'Events', icon: EventsIcon, category: 'Event', id: 'event' },
];
export const DrawerWidth = 250;
export const iconMap = {
  SitePage: PagesIcon,
  Article: ArticleIcon,
  Poll: PollIcon,
  Quiz: QuizIcon,
  Vod: VODIcon,
};
export const AutoCompleteData = [
  {
    Title:
      'Most Expensive Car Just Sold for an All-Time Record of $142 Million',
    ContentType: 'Pages',
  },
  {
    Title: 'Ma​rico: A pioneer in giving back to society',
    ContentType: 'SitePage',
  },
  {
    Title: 'Mutual Funds raise cash holdings amid uncertainties',
    ContentType: 'SitePage',
  },
  {
    Title:
      'Most Expensive Car Just Sold for an All-Time Record of $142 Million',
    ContentType: 'SitePage',
  },
  {
    Title: 'Ma​rico: A pioneer in giving back to society',
    ContentType: 'SitePage',
  },
  {
    Title: 'Mutual Funds raise cash holdings amid uncertainties',
    ContentType: 'SitePage',
  },
  {
    Title:
      'Most Expensive Car Just Sold for an All-Time Record of $142 Million',
    ContentType: 'Poll',
  },
  {
    Title: 'Ma​rico: A pioneer in giving back to society',
    ContentType: 'Poll',
  },
  {
    Title: 'Mutual Funds raise cash holdings amid uncertainties',
    ContentType: 'Poll',
  },
];
