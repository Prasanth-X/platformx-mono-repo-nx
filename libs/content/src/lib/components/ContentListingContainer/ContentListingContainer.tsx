/* eslint-disable no-debugger */
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  useContentSearch
} from '@platformx/authoring-apis';
import {
  ContentState,
  previewArticle
} from '@platformx/authoring-state';
import { NoSearchResult } from '@platformx/utilities';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentListing from '../ContentListing/ContentListing';
import ContentListingHeader from '../ContentListingHeader/ContentListingHeader';
const ContListingContainer = ({ contentType }: { contentType: string }) => {
  const navigate = useNavigate();
  const startIndex = 0;
  const dispatch = useDispatch();
  const location = useLocation();


  const [filterValue, setFilterValue] = useState('ALL');

  const [refreshState, setRefreshState] = useState(false);
  const { loading, error, contentList, fetchMore } = useContentSearch(contentType, location, filterValue, startIndex, true);

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

  const { apiState } = useSelector(
    (state: ContentState) => state
  );
  const createContentNew = () => {
    dispatch(previewArticle({}));
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };

  const handleFilter = async (filter: any) => {
    setFilterValue(filter);
    // fetchContentSync();
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
    // fetchContentSync();
  };

  const handleFetchMore = async () => {
    // if (contentType === 'Course') {
    //   dispatch(
    //     await fetchCourseContent(contentType, location, filterValue, state)
    //   );
    // } else {
    //   dispatch(await fetchContent(contentType, location, filterValue, state));
    // }
    // fetchContentSync();
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
      {(!loading && contentList && contentList?.length > 0) ? (
        <ContentListing
          contentList={contentList}
          deleteContent={deleteContent}
          dataList={contentList}
          fetchMore={fetchMore}
          preview={preview}
          unPublish={unPublish}
          view={view}
          edit={edit}
          loading={loading}
          duplicate={duplicate}
          fetchContentDetails={fetchContentDetails}
          duplicateToSite={duplicateToSite}
        />
      ) : (
        contentList?.length === 0 && <NoSearchResult />
      )}
    </>
  );
};
export default ContListingContainer;
