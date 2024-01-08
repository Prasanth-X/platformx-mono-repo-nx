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
  { title: 'All', icon: <img alt='settings' src={AllIcon} />, category: 'ALL', id: 'all' },
  { title: 'Pages', icon: <img alt='settings' src={PagesIcon} />, category: 'Sitepage', id: 'pages' },
  { title: 'Article', icon: <img alt='settings' src={ArticleIcon} />, category: 'Article', id: 'article' },
  // {
  //   title: 'VOD (Video on Demand)',
  //   icon: <img alt='settings' src={ VODIcon,
  //   category: 'Vod',
  //   id: 'vod_demand',
  // }, #TODO For X-live
  { title: 'Quiz', icon: <img alt='settings' src={QuizIcon} />, category: 'Quiz', id: 'quiz' },
  { title: 'Poll', icon: <img alt='settings' src={PollIcon} />, category: 'Poll', id: 'poll' },
  { title: 'Events', icon: <img alt='settings' src={EventsIcon} />, category: 'Event', id: 'event' },
];
export const iconMap = {
  SitePage: <img alt='settings' src={PagesIcon} />,
  Article: <img alt='settings' src={ArticleIcon} />,
  Poll: <img alt='settings' src={PollIcon} />,
  Quiz: <img alt='settings' src={QuizIcon} />,
  Vod: <img alt='settings' src={VODIcon} />,
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
