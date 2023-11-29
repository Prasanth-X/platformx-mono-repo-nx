import { CreateCard } from './Components/CardSlider/CardSlider.types';
import { BoostContent } from './HorizontalCardList/HorizontalCard.types';
import { RecentContents } from './RecentContent/RecentContent.types';
import { RecentPage } from './RecentPages/RecentPages.types';
import { TaskPage } from './Tasks/TaskPages/TaskPages.type';

export type Dashboard = {
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
