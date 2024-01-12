import { Skeleton } from '@mui/material';
import ContentRow from '../contentRow/ContentRow';
import '../../Dashboard.css';
import { memo } from 'react';

const RecentContent = ({
  recentContent,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  fetchContentDetails,
}: any) => {
  if (!recentContent || recentContent.length === 0) {
    <Skeleton animation='wave' height={10} width='80%' />;
  }
  return (
    <div>
      {recentContent?.length > 0 &&
        recentContent.map((item: any) => (
          <ContentRow
            key={item.Id}
            item={item}
            deleteContent={deleteContent}
            duplicate={duplicate}
            preview={preview}
            unPublish={unPublish}
            view={view}
            edit={edit}
            fetchContentDetails={fetchContentDetails}
          />
        ))}
    </div>
  );
};

export default memo(RecentContent);
