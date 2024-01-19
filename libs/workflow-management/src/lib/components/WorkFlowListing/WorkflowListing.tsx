import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

import { workflowApi } from '@platformx/authoring-apis';
import { ContentListDesktopLoader } from '@platformx/utilities';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListView from '../ListView/ListView';
import TopHeader from '../TopBackHeader/TopHeader';
import './WorkflowListing.css';

export const WorkflowListing = () => {
  const [list, setList] = useState<any>([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);

  const getList = async () => {
    try {
      const response: any = await workflowApi.getWorkflowList();
      if (
        response?.authoring_getWorkFlowListing &&
        response?.authoring_getWorkFlowListing?.length > 0
      ) {
        const getWorkFlowListing = [
          ...(response?.authoring_getWorkFlowListing || []),
        ];
        setList(getWorkFlowListing);
      }
      setIsLazyLoad(false);
    } catch (err: any) {
      setIsLazyLoad(false);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
        <TopHeader />
      </Box>
      <Box
        id="scrollableDiv"
        sx={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
      >
        <InfiniteScroll
          dataLength={getList ? getList?.length : 0}
          next={getList}
          hasMore={isLazyLoad}
          loader={<ContentListDesktopLoader />}
          scrollableTarget="scrollableDiv"
          style={{ overflowX: 'hidden' }}
        >
          {list?.length > 0 && (
            <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
              <Box>
                {list?.map((item: any) => (
                  <ListView
                    key={item.id}
                    name={item.name}
                    id={item.id}
                    creation_date={item.creation_date}
                    steps={item.stages}
                    status={item.status}
                    content_type={item.content_type}
                    title={item.title}
                    handleReload={getList}
                  />
                ))}
              </Box>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </>
  );
};
