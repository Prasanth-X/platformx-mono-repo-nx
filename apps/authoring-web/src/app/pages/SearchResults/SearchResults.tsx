import { Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import ContentListing from '../../Common/Listing/Components/ContentListing';
import { fetchContent } from '../../Common/Listing/Utils/Helper';
import NoResultsFound from '../../Common/NoResultsFound';
import useContentListing from '../../hooks/useContentListing/useContentListing';
import usePage from '../../hooks/usePage/usePage';
import { Store } from '../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';

export default function SearchResults() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const location = useLocation();
  const {
    editPage,
    viewPage,
    previewPage,
    handleDuplicatePopup,
    duplicatePage,
    unPublishPage,
    handleReschedulePopup,
    reschedulePublishPage,
    rescheduleUnPublishPage,
    handleCancelTriggerPopup,
    cancelPublishUnpublishTrigger,
    handleDeleteData,
    handlePageDelete,
  } = usePage();
  const contents = state.content.contentList;

  const { deleteContent, duplicate, preview, unPublish, view } =
    useContentListing('ALL');

  useEffect(() => {
    if (state.content.contentList.length == 0) {
      fetchContentSync();
    }
  }, []);

  useEffect(() => {
    fetchContentSync();
  }, [location]);

  const fetchContentSync = async () => {
    dispatch(await fetchContent('ALL', location, 'ALL', state));
  };

  const handleFetchMore = async () => {
    dispatch(await fetchContent('ALL', location, 'ALL', state));
  };

  return (
    <Box mt={2}>
      <Typography variant="h4bold" sx={{ padding: '10px 15px' }}>
        {t('results')}
      </Typography>
      <Box
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
        }}
      >
        {state.content.loading || (contents && contents.length > 0) ? (
          <ContentListing
            dataList={contents}
            fetchMore={handleFetchMore}
            deleteContent={deleteContent}
            preview={preview}
            unPublish={unPublish}
            view={view}
            duplicate={duplicate}
            editPage={editPage}
            viewPage={viewPage}
            previewPage={previewPage}
            handleDuplicatePopup={handleDuplicatePopup}
            duplicatePage={duplicatePage}
            unPublishPage={unPublishPage}
            handleReschedulePopup={handleReschedulePopup}
            reschedulePublishPage={reschedulePublishPage}
            rescheduleUnPublishPage={rescheduleUnPublishPage}
            handleCancelTriggerPopup={handleCancelTriggerPopup}
            cancelPublishUnpublishTrigger={cancelPublishUnpublishTrigger}
            handleDeleteData={handleDeleteData}
            handlePageDelete={handlePageDelete}
          />
        ) : (
          contents.length == 0 && <NoResultsFound />
        )}
      </Box>
    </Box>
  );
}
