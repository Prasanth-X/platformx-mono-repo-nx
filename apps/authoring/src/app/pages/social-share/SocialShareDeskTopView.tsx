import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoResults from '../../assets/images/no-results.png';
import {
  convertToLowerCase,
  nullToArray,
  nullToObject,
} from '../../utils/helperFunctions';
import DesktopListingBody from './DesktopListingBody';
import DesktopLoaderSocialShare from './DesktopLoaderSocialShare';

export const SocialShareDeskTopView = (props: any = {}) => {
  const { t } = useTranslation();
  const {
    isMoreLoad = false,
    isLazyLoad = false,
    listApiCalledOrNot = false,
    listResponseArray = [], //response
    fetchMoreData,
    handleUserSelectDataDeskTop,
  } = nullToObject(props);
  const handelCancelPost = (listDataArr) => {
    props.handleUserSelectDataDeskTop(listDataArr);
  };

  return (
    <>
      <Box>
        <Box sx={{ display: { xs: 'none', em: 'block' }, margin: '10px 0' }}>
          <Grid
            container
            sx={{
              alignItems: 'center',
              padding: '0 15px',
              marginBottom: '10px',
              marginTop: { md: '20px', em: '20px' },
            }}
          >
            <Grid item xs={2.4} sx={{ marginRight: '5%' }}>
              <Typography
                variant='h6medium'
                sx={{ color: '#89909a', textTransform: 'capitalize' }}
              >
                {t('title')}
              </Typography>
            </Grid>
            <Grid item xs={1.5}>
              <Typography
                variant='h6medium'
                sx={{ color: '#89909a', textTransform: 'capitalize' }}
              >
                {t('type')}
              </Typography>
            </Grid>

            <Grid item xs={2} sx={{ marginRight: '1%' }}>
              <Typography
                variant='h6medium'
                sx={{ color: '#89909a', textTransform: 'capitalize' }}
              >
                {t('shared_by')}
              </Typography>
            </Grid>
            <Grid item xs={2} sx={{ marginRight: '4%', paddingLeft: '10px' }}>
              <Typography
                variant='h6medium'
                sx={{ color: '#89909a', textTransform: 'capitalize' }}
              >
                {t('share')}
              </Typography>
            </Grid>

            <Grid
              item
              xs={1.5}
              sx={{
                paddingLeft: '50px',
                marginRight: '4%',
                textAlign: 'center',
              }}
            >
              <Typography
                variant='h6medium'
                sx={{ color: '#89909a', textTransform: 'capitalize' }}
              >
                {t('platform')}
              </Typography>
            </Grid>

            <Grid
              item
              xs={0.5}
              sx={{
                marginLeft: '20px',
              }}
            >
              <Typography
                variant='h6medium'
                sx={{
                  paddingLeft: '10px',
                  color: '#89909a',
                  textTransform: 'capitalize',
                }}
              >
                {t('action')}
              </Typography>
            </Grid>
          </Grid>

          {/* loader */}
          {isLazyLoad && !listApiCalledOrNot ?
            <>
              <DesktopLoaderSocialShare />
            </>
           : null}

          {/* nodata */}
          {nullToArray(listResponseArray).length === 0 && listApiCalledOrNot ?
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
              {/* <Typography
                variant="h5"
                sx={{
                  color: "#c3c3c3",
                }}
              >
                Please try again
              </Typography> */}
            </Box>
           : null}
          {nullToArray(listResponseArray).length !== 0 ?
            <>
              <InfiniteScroll
                dataLength={
                  nullToArray(listResponseArray).length > 0
                    ? nullToArray(listResponseArray).length
                    : 0
                }
                hasMore={isMoreLoad}
                next={fetchMoreData}
                loader={isLazyLoad ? <DesktopLoaderSocialShare /> : null}
                scrollableTarget='scrollableDiv'
              >
                <Box sx={{ display: 'Grid' }}>
                  {nullToArray(listResponseArray).map((item, index) =>
                    <DesktopListingBody
                      listItem={item}
                      index={index}
                      handleUserSelectDataDeskTop={handleUserSelectDataDeskTop}
                      key={convertToLowerCase(
                        index + 'authoring_getContentTypeItems-deskTop'
                      )}
                      handelCancelPost={handelCancelPost}
                      reloadAPI={props.reloadAPI}
                    />
                  )}
                </Box>
              </InfiniteScroll>
            </>
           : null}
        </Box>
      </Box>
    </>
  );
};
export default React.memo(SocialShareDeskTopView);
