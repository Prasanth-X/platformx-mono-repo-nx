import { Box, Grid, Typography } from '@mui/material';
import ContentTypeCard from 'platform-x-prelems/prelems/ContentTypeCard';
import { useState } from 'react';
import ThemeConstants from '../../../../theme/variable';
import NoResults from '../../assets/images/no-results.png';

import InfiniteScroll from 'react-infinite-scroll-component';
import NoResultsFound from '../../../../Common/NoResultsFound';

import { ContentProps } from './utils/contentGalleryTypes';
import { authInfo } from '../../../../utils/authConstants';

const GalleryItems = ({
  galleryObj,
  error,
  loading,
  fetchMoreData,
  isLazyLoad,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedItem, setSelectedItem] = useState<ContentProps>({});
  const secondaryArgs = { 
    gcpUrl: authInfo.gcpUri,
    bucketName: authInfo.gcpBucketName
  };

  const isError = false;
  const handleSelectedItem = (item, index) => {
    if (selectedItem == item) {
      setSelectedItem({});
      setSelectedIndex(-1);
    } else {
      setSelectedItem(item);
      setSelectedIndex(index);
    }
  };
  const getContentType = (item, index) => {
    return (
      <Grid
        container
        xs={6}
        sm={4}
        md={4}
        lg={3}
        sx={{
          position: 'relative',

          float: 'left',
          width: '100%',
          height: 'auto',
          aspectRatio: '1/1',
        }}
        onClick={(e) => handleSelectedItem(item, index)}
        key={index}
        p={1}
      >
        <ContentTypeCard content={item} secondaryArgs={secondaryArgs} />
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
            variant='h3'
            sx={{ color: ThemeConstants.LIGHT_GREY_COLOR }}
          >
            Failed to fetch results
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: 'calc(100vh - 160px)',
            overflowY: 'scroll',
          }}
          id='scrollablegallerydiv'
        >
          {galleryObj && galleryObj?.length === 0 && !loading ? (
            <NoResultsFound />
          ) : (
            <Grid
              container
              sx={{
                backgroundColor: ThemeConstants.WHITE_COLOR,
                borderRadius: '5px',
                '.infinite-scroll-component__outerdiv': {
                  width: 'inherit',
                },
              }}
            >
              <InfiniteScroll
                dataLength={galleryObj.length}
                next={fetchMoreData}
                hasMore={isLazyLoad}
                loader={null}
                scrollableTarget='scrollablegallerydiv'
              >
                {galleryObj?.map((item, index) => {
                  return getContentType(item, index);
                })}
              </InfiniteScroll>
            </Grid>
          )}
        </Box>
      )}
    </>
  );
};

export default GalleryItems;
