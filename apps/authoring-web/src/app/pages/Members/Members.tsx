import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
// import ListingHeader from './Components/ListingHeader';
// import { mockData } from './mockDtat';
import ArticleListDesktopLoader from '../../components/contentList/contentListLoaderDesktop';
import {
  capitalizeWords,
  formatContentTitle,
} from '../../Common/Listing/Utils/Helper';
import { handleHtmlTags } from '../../utils/helperFunctions';
import SpaceListingHeader from '../SpaceManagement/Components/SpaceListingHeader';
import SpaceListingCard from '../SpaceManagement/Components/SpaceListingCard';
import { mockData } from '../SpaceManagement/mockDtat';

export default function Members() {
  const makeContentData = (item) => {
    const listItemDetails = {
      title: capitalizeWords(formatContentTitle(item.title)),
      description: handleHtmlTags(item.description),
      author: item.author,
      lastModifiedDate: item.last_modification_date || item?.modificationDate,
      status: item.status,
      lastModifiedBy: capitalizeWords(
        formatContentTitle(item?.last_modified_by?.replace('undefined', ''))
      ),
      currentPageUrl: item?.current_page_url,
      parentPageUrl: item?.parent_page_url,
      name: capitalizeWords(
        formatContentTitle(item?.name?.replace('undefined', ''))
      ),
      page_state: item?.page_state,
      is_published: item?.is_published,
    };
    return listItemDetails;
  };

  const getUsers = () => {};
  useEffect(() => {
    getUsers();
  }, []);

  const handleSearch = () => {};

  return (
    <>
      <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
        <SpaceListingHeader handleSearch={handleSearch} title='members' />
      </Box>
      <Box
        id='scrollableDiv'
        sx={{ height: 'calc(100vh - 140px)', overflowY: 'auto' }}
      >
        <InfiniteScroll
          dataLength={mockData ? mockData?.length : 0}
          next={getUsers}
          loader={<ArticleListDesktopLoader />}
          scrollableTarget='scrollableDiv'
          style={{ overflowX: 'hidden' }}
          hasMore={false}
        >
          {mockData?.length > 0 && (
            <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
              <Box>
                {/* {mockData?.map((item, index) => (
                  <SpaceListingCard
                    key={`${item.title} ${index.toString()}`}
                    dataList={makeContentData(item)}
                    dataType='Member'
                    deleteSpace={() => {}}
                  />
                ))} */}
              </Box>
            </Box>
          )}
        </InfiniteScroll>
      </Box>
    </>
  );
}
