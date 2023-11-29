import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import ContentListing from '../../Common/Listing/Components/ContentListing';
import { fetchContent } from '../../Common/Listing/Utils/Helper';
import NoResultsFound from '../../Common/NoResultsFound';
import ContentListingHeader from '../../components/Common/ContentListingHeader/ContentListingHeader';
import usePage from '../../hooks/usePage/usePage';
import { setDefaultPageModel } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import { CATEGORY_PAGE } from '../../utils/constants';
import CreatePage from '../createPage';
export default function PageList() {
  const location = useLocation();
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);

  const [openCreatePage, setOpenCreatePage] = useState(false);
  const [isDuplicate, setIsDuplicate] = React.useState(false);
  const [language, setLanguage] = React.useState<string[]>([]);
  const [filter, setFilterMenu] = useState<string>('ALL');
  const [refreshState, setRefreshState] = useState(false);
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
  } = usePage(filter);
  const contents = state.content.contentList;
  useEffect(() => {
    localStorage.removeItem('pageTimerState');
    dispatch(setDefaultPageModel(state));
    if (state.content.contentList.length == 0) {
      fetchContentSync();
    }
  }, []);

  useEffect(() => {
    fetchContentSync();
  },[location]);

  const fetchContentSync = async () => {
    dispatch(await fetchContent('Sitepage', location, filter, state));
  };

  const onDuplicatePage = (duplicate) => {
    setIsDuplicate(duplicate);
    setOpenCreatePage(true);
  };
  const closeButtonHandle = () => {
    setOpenCreatePage(false);
  };
  const confirmButtonHandle = (pageName, pageUrl) => {
    duplicatePage(false, pageName, pageUrl, language);
    closeButtonHandle();
  };

  const handleFilter = React.useCallback(
    async (filter) => {
      setFilterMenu(filter);
      dispatch(await fetchContent('Sitepage', location, filter, state, true));
    },
    [filter]
  );

  const handleRefresh = async () => {
    setRefreshState(true);
    dispatch({type: 'UPDATE_API_STATE'});
    dispatch(await fetchContent('Sitepage', location, filter, state, true));
  };

  const handleFetchMore = async () => {
    dispatch(await fetchContent('Sitepage', location, filter, state));
  };
  return (
    <>
      {/* {refreshState && !state.content.apiState && <div>..Loading</div>} */}
      {openCreatePage && (
        <CreatePage
          isDialogOpen={openCreatePage}
          title={
            isDuplicate ? t('page_duplicate_title') : t('page_create_title')
          }
          pageNameInitial=''
          isDuplicate={isDuplicate}
          confirmButtonHandle={confirmButtonHandle}
          closeButtonHandle={closeButtonHandle}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: { xs: 'block', md: 'none', lg: 'none' },
            position: 'fixed',
            bottom: '0',
            right: '0',
            zIndex: 99,
          }}
        >
          <Box
            sx={{
              margin: '0 15px 24px 0',
            }}
          >
            <Fab size='large' color='primary' aria-label='add'>
              <AddIcon onClick={() => onDuplicatePage(false)} />
            </Fab>
          </Box>
        </Box>
        <ContentListingHeader
          handleFilter={handleFilter}
          title='Pages'
          handleAddNew={() => setOpenCreatePage(true)}
          category={CATEGORY_PAGE}
          subCategory={''}
          handleRefresh={handleRefresh}
          animationState={refreshState && !state.content.apiState}
        ></ContentListingHeader>
        {state.content.loading || (contents && contents.length > 0) ? (
          <ContentListing
            dataList={contents}
            fetchMore={handleFetchMore}
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
    </>
  );
}
