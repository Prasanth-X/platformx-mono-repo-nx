import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentListing from '../../../Common/Listing/Components/ContentListing';
import {
  fetchContent,
  fetchCourseContent,
} from '../../../Common/Listing/Utils/Helper';
import NoResultsFound from '../../../Common/NoResultsFound';
import { previewArticle } from '../../../articles/Actions';
import ContentListingHeader from '../../../components/Common/ContentListingHeader/ContentListingHeader';
import useContentListing from '../../../hooks/useContentListing/useContentListing';
import { Store } from '../../../store/ContextStore';
import { CATEGORY_CONTENT, CONTENT_TYPES } from '../../../utils/constants';

const QuizPollEventsList = ({ contentType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filterValue, setFilterValue] = useState('ALL');
  const { state, dispatch } = useContext(Store);
  const [refreshState, setRefreshState] = useState(false);

  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    fetchContentDetails,
    duplicateToSite
  } = useContentListing('ALL');
  const contents = state.content.contentList;

  const createContentNew = () => {
    dispatch(previewArticle({}));
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  useEffect(() => {
    localStorage.removeItem('articleTimerState');
    localStorage.removeItem('contentTypeTimerState');

    // Clears content when navigation changed to diff content
    if (state.content.contentList.length == 0) {
      fetchContentSync();
    }
  }, [contentType]);

  useEffect(() => {
    fetchContentSync();
  }, [location]);

  const fetchContentSync = async () => {
    if (contentType === 'Course') {
      dispatch(
        await fetchCourseContent(contentType, location, filterValue, state)
      );
    } else {
      dispatch(await fetchContent(contentType, location, filterValue, state));
    }
  };

  const handleFilter = async (filter) => {
    setFilterValue(filter);
    if (contentType === 'Course') {
      dispatch(
        await fetchCourseContent(contentType, location, filter, state, true)
      );
    } else {
      dispatch(await fetchContent(contentType, location, filter, state, true));
    }
  };

  const handleRefresh = async () => {
    setRefreshState(true);
    dispatch({ type: 'UPDATE_API_STATE' });
    if (contentType === 'Course') {
      dispatch(
        await fetchCourseContent(
          contentType,
          location,
          filterValue,
          state,
          true
        )
      );
    } else {
      dispatch(
        await fetchContent(contentType, location, filterValue, state, true)
      );
    }
  };

  const handleFetchMore = async () => {
    if (contentType === 'Course') {
      dispatch(
        await fetchCourseContent(contentType, location, filterValue, state)
      );
    } else {
      dispatch(await fetchContent(contentType, location, filterValue, state));
    }
  };

  return (
    <>
      <ContentListingHeader
        handleFilter={handleFilter}
        title={contentType}
        category={CATEGORY_CONTENT}
        subCategory={CONTENT_TYPES}
        handleAddNew={createContentNew}
        handleRefresh={handleRefresh}
        animationState={refreshState && !state.content.apiState}
      />
      {state.content.loading || (contents && contents.length > 0) ? (
        <ContentListing
          deleteContent={deleteContent}
          dataList={contents}
          fetchMore={handleFetchMore}
          preview={preview}
          unPublish={unPublish}
          view={view}
          edit={edit}
          duplicate={duplicate}
          fetchContentDetails={fetchContentDetails}
          duplicateToSite={duplicateToSite}
        />
      ) : (
        contents.length == 0 && <NoResultsFound />
      )}
    </>
  );
};
export default QuizPollEventsList;
