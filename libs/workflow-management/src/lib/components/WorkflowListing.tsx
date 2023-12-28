import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { workflowApi } from '@platformx/authoring-apis';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ContentGridLoader from '../../components/Common/ContentGridLoader';
// import ArticleListDesktopLoader from '../../components/contentList/contentListLoaderDesktop';
// import '../UserManagement/UserManagement.css';
// import '../UserManagement/Users/User.css';
// import ListView from './Component/WorkFlowListing/ListView';
// import TopHeader from './Component/WorkFlowListing/TopHeader';

export const WorkflowListing = () => {
  const [list, setList] = useState([]);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);

  const gridListViewLoaderDesktop = (viewType = '') => {
    // if (viewType === 'List') {
    //   return <ArticleListDesktopLoader />;
    // }
    // return <ContentGridLoader />;
  };

  const getList = async () => {
    console.log(workflowApi);
    // try {
    //   const response: any = await workflowApi.getWorkflowList();
    //   if (
    //     response?.authoring_getWorkFlowListing &&
    //     response?.authoring_getWorkFlowListing?.length > 0
    //   ) {
    //     const getWorkFlowListing = [
    //       ...(response?.authoring_getWorkFlowListing || []),
    //     ];
    //     console.log('list', getWorkFlowListing);
    //     // setList(getWorkFlowListing);
    //   }
    //   setIsLazyLoad(false);
    //   //   setLoading(false);
    // } catch (err) {
    //   setIsLazyLoad(false);
    //   //   setLoading(false);
    //   console.log('error', err);
    // }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
          {/* {t('workflow')} */}
          workflow
        </Typography>
      </Box>
      <Box
        id="scrollableDiv"
        sx={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
      >
        <InfiniteScroll
          dataLength={getList ? getList?.length : 0}
          next={getList}
          hasMore={isLazyLoad}
          loader={'Loading...'}
          scrollableTarget="scrollableDiv"
          style={{ overflowX: 'hidden' }}
        >
          {/* {list?.length > 0 && ( */}
          {/* <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
            <Box>
              {[0, 1, 2, 4, 5]?.map((item) => (
                <WorkflowCard
                  key={'s'}
                  name={'ad'}
                  id={'dsdsa'}
                  creation_date={''}
                  steps={'fdsfsd'}
                  status={true}
                  content_type={'fdfs'}
                  title={'fdfd'}
                  handleReload={getList}
                  //   key={item.id}
                  //   name={item.name}
                  //   id={item.id}
                  //   creation_date={item.creation_date}
                  //   steps={item.stages}
                  //   status={item.status}
                  //   content_type={item.content_type}
                  //   title={item.title}
                  //   handleReload={getList}
                />
              ))}
            </Box>
          </Box> */}
          {/* )} */}
        </InfiniteScroll>
      </Box>
    </>
  );
};
