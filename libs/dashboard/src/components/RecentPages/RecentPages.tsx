import { Skeleton } from '@mui/material';
import '../Dashboard.css';
import PageRow from '../PageRow/PageRow';
import { RecentPagesProps } from './RecentPages.types';

const RecentPages = ({ recentPages }: RecentPagesProps) => {
  if (!recentPages || recentPages.length === 0) {
    <Skeleton animation='wave' height={10} width='80%' />;
  }
  return (
    <>
      {recentPages?.length > 0 &&
        recentPages.map((item, index) => <PageRow key={index} {...item} />)}
    </>
  );
};

export default RecentPages;
