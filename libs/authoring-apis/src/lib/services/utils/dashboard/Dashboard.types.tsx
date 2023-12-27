import { CreateCard } from './CardSlider.types';
import { BoostContent } from './HorizontalCard.types';
import { RecentContents } from './RecentContent.types';
import { RecentPage } from './RecentPages.types';
import { TaskPage } from './TaskPages.types';

export type DashboardTypes = {
  taskPages: TaskPage[];
  recentPages: RecentPage[];
  recentContent: RecentContents[];
  createContent: CreateCard[];
  colorArray: string[];
  boostContent: BoostContent[];
  scheduled: object[];
  coursesList: object[];
  userCourseList: object[];
};

export const Dashboard_Keys = {
  SITE_PAGE: 'Sitepage',
  DASHBOARD: 'dashboard',
  BOOST_PAGE: 'boostpage',
  SCHEDULED_PUBLISH: 'SCHEDULED_PUBLISH',
  SCHEDULED_UNPUBLISH: 'SCHEDULED_UNPUBLISH',
  DESC: 'DESC',
  ALL: 'ALL',
  ZERO: 0,
};
