// import { useState } from 'react';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { Box, Typography, Grid } from '@mui/material';
import NoResultsFound from '../../Common/NoResultsFound';
import { nullToArray } from '../../utils/helperFunctions';
import NoResults from '../../assets/images/no-results.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import ContentTypeCard from 'platform-x-prelems/prelems/ContentTypeCard';
import { authInfo } from '../../utils/authConstants';

const EcommerceCard = ({ cardObj, fetchMoreData, isLazyLoad, isLoading }) => {
  const isError = false;
  const secondaryArgs = {
    gcpUrl: authInfo.gcpUri,
    bucketName: authInfo.gcpBucketName,
  };
  const getContentType = (item, index) => {
    return (
      <Grid
        container
        item
        xs={6}
        sm={4}
        md={4}
        lg={3}
        sx={{
          // cursor: 'pointer',
          position: 'relative',
          // height: { xs: 'auto', md: '240px', borderRadius: '5px' },
          float: 'left',
          width: '100%',
          height: 'auto',
          aspectRatio: '1/1',
        }}
        onClick={() => {}}
        key={index}
        p={1}
      >
        <ContentTypeCard
          content={item}
          isLoading={isLoading}
          secondaryArgs={secondaryArgs}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            m: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          p={1}
        ></Box>
      </Grid>
    );
  };

  return (
    <>
      {isError ? (
        <Box
          sx={{
            marginTop: '200px',
            marginBottom: '100px',
            textAlign: 'center',
          }}
        >
          <img src={NoResults} />
          <Typography
            variant="h3"
            sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
          >
            Failed to fetch results
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              height: 'calc(100vh - 160px)',
              overflowY: 'scroll',
            }}
            id="scrollablegallerydiv"
          >
            {!isLoading && nullToArray(cardObj)?.length === 0 ? (
              <NoResultsFound />
            ) : (
              <Grid
                container
                sx={{
                  backgroundColor: '#ffffff',
                  borderRadius: '5px',
                  '.infinite-scroll-component__outerdiv': {
                    width: 'inherit',
                  },
                }}
              >
                <InfiniteScroll
                  loader={null}
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  dataLength={cardObj.length}
                  scrollableTarget="scrollablegallerydiv"
                >
                  {/* {console.log("shadow", cardObj, isLoading)} */}
                  {isLoading
                    ? Array.from(Array(8)).map((element, index) =>
                        getContentType(element, index)
                      )
                    : cardObj?.map((item, index) => {
                        return getContentType(item, index);
                      })}
                </InfiniteScroll>
              </Grid>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default EcommerceCard;
