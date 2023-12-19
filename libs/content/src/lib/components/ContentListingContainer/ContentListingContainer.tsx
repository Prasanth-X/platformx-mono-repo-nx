import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  contentTypeAPIs,
  useContentListing,
} from '@platformx/authoring-apis';
import {
  ContentState,
  previewArticle,
  updateContentList,
} from '@platformx/authoring-state';
import { NoSearchResult } from '@platformx/utilities';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentListing from '../ContentListing/ContentListing';
import ContentListingHeader from '../ContentListingHeader/ContentListingHeader';
const ContListingContainer = ({ contentType }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [filterValue, setFilterValue] = useState('ALL');
  const [refreshState, setRefreshState] = useState(false);

  const {
    deleteContent,
    duplicate,
    preview,
    unPublish,
    view,
    edit,
    fetchContentDetails,
    duplicateToSite,
  } = useContentListing('ALL');
  const { contentList, startIndex, apiState, loading } = useSelector(
    (state: ContentState) => state
  );
  const createContentNew = () => {
    dispatch(previewArticle({}));
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  useEffect(() => {
    localStorage.removeItem('articleTimerState');
    localStorage.removeItem('contentTypeTimerState');

    // Clears content when navigation changed to diff content
    if (contentList.length == 0) {
      fetchContentSync();
    }
  }, [contentType]);

  useEffect(() => {
    fetchContentSync();
  }, [location]);

  const fetchContentSync = async () => {
    if (contentType === 'Course') {
      const response = await contentTypeAPIs.fetchCourseContent(
        contentType,
        location,
        filterValue,
        startIndex,
        contentList,
        true
      );
      updateContentList(response);
    } else {
      const response = await contentTypeAPIs.fetchSearchContent(
        contentType,
        location,
        filterValue,
        startIndex,
        contentList,
        true
      );
      updateContentList(response);
    }
  };

  const handleFilter = async (filter: any) => {
    setFilterValue(filter);
    fetchContentSync();
    // if (contentType === 'Course') {
    //   dispatch(
    //     await fetchCourseContent(contentType, location, filter, state, true)
    //   );
    // } else {
    //   dispatch(await fetchContent(contentType, location, filter, state, true));
    // }
  };

  const handleRefresh = async () => {
    setRefreshState(true);
    dispatch({ type: 'UPDATE_API_STATE' }); // To update the api state to false
    // if (contentType === 'Course') {
    //   dispatch(
    //     await fetchCourseContent(
    //       contentType,
    //       location,
    //       filterValue,
    //       state,
    //       true
    //     )
    //   );
    // } else {
    //   dispatch(
    //     await fetchContent(contentType, location, filterValue, state, true)
    //   );
    // }
    fetchContentSync();
  };

  const handleFetchMore = async () => {
    // if (contentType === 'Course') {
    //   dispatch(
    //     await fetchCourseContent(contentType, location, filterValue, state)
    //   );
    // } else {
    //   dispatch(await fetchContent(contentType, location, filterValue, state));
    // }
    fetchContentSync();
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
        animationState={refreshState && !apiState}
      />
      {loading || (contentList && contentList.length > 0) ? (
        <ContentListing
          deleteContent={deleteContent}
          dataList={contentList}
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
        contentList?.length == 0 && <NoSearchResult />
      )}
    </>
  );
};
export default ContListingContainer;
