import { Box, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { TransitionGroup } from "react-transition-group";
import { useTranslation } from 'react-i18next';
import NoResults from '../../../assets/images/no-results.png';
import ContentListing from '../../../Common/Listing/Components/ContentListing';
import ContentListingHeader from '../../../components/Common/ContentListingHeader/ContentListingHeader';
import useFetchContentList from '../../../hooks/useContentList/useContentList';
import { CATEGORY_CONTENT } from '../../../utils/constants';
import { ContentType } from '../../../utils/Enums/ContentType';
import { getCurrentLang } from '../../../utils/helperFunctions';
import { useStyles, VodContainer } from './vodListing.styles';

export const VodListing = ({ fromSearch = false }) => {
  const classes = useStyles();
  localStorage.setItem('lang', getCurrentLang());
  const { t } = useTranslation();
  const [filter, setFilterMenu] = useState<string>('ALL');
  const navigate = useNavigate();

  // const { contents, handleFetchMore, loading } = useVod(filter);

  const handleFilter = useCallback(
    async (filter) => {
      setFilterMenu(filter);
    },
    [filter]
  );
  const { data, fetchContent, loading } = useFetchContentList('Vod');
  useEffect(() => {
    const isiPhone = /iPhone/i.test(navigator.userAgent);

    if (isiPhone) {
      const viewportMeta = document.querySelector('meta[name="viewport"]');
      if (viewportMeta) {
        viewportMeta.setAttribute(
          'content',
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    }
  }, []);
  const handleRefresh = () => {};
  const handleFetchMore = useCallback(() => {
    fetchContent(data.length);
  }, [data]);
  return (
    <VodContainer>
      <ContentListingHeader
        handleFilter={handleFilter}
        title={ContentType.Vod}
        category={CATEGORY_CONTENT}
        subCategory={ContentType.Vod}
        handleAddNew={() => {
          navigate('/content/create-vod');
        }}
        handleRefresh={handleRefresh}
      ></ContentListingHeader>
      <Box className={classes.desktopContainer}>
        {!data && data?.length === 0 && (
          <Box className={classes.noResultsContainer}>
            <img src={NoResults} />
            <Typography
              variant='h5'
              sx={{
                color: '#c3c3c3',
              }}
            >
              {fromSearch ? t('no_match_results') : t('vod_search_toast')}
            </Typography>
          </Box>
        )}

        {/* {data && data.length !== 0 && ( */}
        <ContentListing
          dataList={data}
          fetchMore={handleFetchMore}
          loading={loading}
        />
        {/* )} */}
      </Box>
    </VodContainer>
  );
};
