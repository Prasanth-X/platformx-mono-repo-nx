import {
  AllIcon,
  ArticleIcon,
  EventsIcon,
  MyDashboardIcon,
  PagesIcon,
  PollIcon,
  PostsIcon,
  QuizIcon,
  UsersIcon,
  VODIcon,
} from '@platformx/utilities';

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
