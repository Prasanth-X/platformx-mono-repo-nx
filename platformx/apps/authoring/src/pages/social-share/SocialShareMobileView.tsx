import { Box, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/images/no-results.png';
import {
  convertToLowerCase,
  nullToArray,
  nullToObject,
} from '../../utils/helperFunctions';
import MobileListingBody from './MobileListingBody';
import MobileLoaderSocialShare from './MobileLoaderSocialShare';

export const SocialShareMobileView = (props: any = {}) => {
  const { t } = useTranslation();
  const {
    isMoreLoad = false,
    isLazyLoad = false,
    listApiCalledOrNot = false,
    listResponseArray = [], //response
    fetchMoreData,
    handleUserSelectData,
  } = nullToObject(props);

  return (
    <>
      <Box sx={{ display: { em: 'none' } }}>
        {/* loader */}
        {isLazyLoad && !listApiCalledOrNot ? (
          <>
            <MobileLoaderSocialShare />
          </>
        ) : null}

        {nullToArray(listResponseArray).length === 0 && listApiCalledOrNot ? (
          <Box sx={{ textAlign: 'center', marginTop: '10%' }}>
            <img src={NoResults} />
            <Typography
              variant='h5'
              sx={{
                color: '#c3c3c3',
              }}
            >
              {t('no_results')}
            </Typography>
          </Box>
        ) : null}

        {nullToArray(listResponseArray).length !== 0 ? (
          <InfiniteScroll
            dataLength={
              nullToArray(listResponseArray).length > 0
                ? nullToArray(listResponseArray).length
                : 0
            }
            next={fetchMoreData}
            hasMore={isMoreLoad}
            loader={isLazyLoad ? <MobileLoaderSocialShare /> : null}
            scrollableTarget='scrollableDiv'
          >
            <Box>
              {nullToArray(listResponseArray).map((item, index) => (
                <MobileListingBody
                  listItem={item}
                  handleUserSelectData={handleUserSelectData}
                  key={convertToLowerCase(index + 'mobile-listResponseArray')}
                />
              ))}
            </Box>
          </InfiniteScroll>
        ) : null}
      </Box>
    </>
  );
};
export default React.memo(SocialShareMobileView);
