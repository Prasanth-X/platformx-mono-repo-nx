/* eslint-disable require-await */
/* eslint-disable no-debugger */
import {
  CATEGORY_CONTENT,
  CONTENT_TYPES,
  useContentListing,
  useContentSearch,
} from '@platformx/authoring-apis';
import { RootState } from '@platformx/authoring-state';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentListing from '../ContentListing/ContentListing';
import ContentListingHeader from '../ContentListingHeader/ContentListingHeader';

const ContListingContainer = ({ contentType }: { contentType: string }) => {

  const navigate = useNavigate();
  const startIndex = 0;
  const location = useLocation();
  const [isSpinning, setIsSpinning] = useState(false);

  const [filterValue, setFilterValue] = useState('ALL');
  const { contentArray } = useSelector((state: RootState) => state.content);
  const { loading, refetch, fetchMore } = useContentSearch({
    contentType,
    locationState: location,
    filter: filterValue,
    startIndex,
    reloadContent: false,
  });
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

  useEffect(() => {
    const fetchData = async () => {
      setIsSpinning(true);
      await refetch();
      setIsSpinning(false);
    };

    fetchData();
  }, [contentType]);

  const createContentNew = () => {
    // dispatch(previewArticle({}));
    navigate(`/content/create`, { state: contentType?.trim()?.toLowerCase() });
  };

  const handleFilter = async (filter: string) => {
    setFilterValue(filter);
  };
  const handleRefresh = async () => {
    setIsSpinning(true);
    refetch();
  };

  const handleFetchMore = async () => {
    await fetchMore();
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
        animationState={isSpinning}
      />

      {/* {(!loading && contentList && contentList?.length > 0) && ( */}
      <ContentListing
        contentList={contentArray}
        deleteContent={deleteContent}
        dataList={contentArray}
        fetchMore={handleFetchMore}
        preview={preview}
        unPublish={unPublish}
        view={view}
        edit={edit}
        loading={loading}
        duplicate={duplicate}
        fetchContentDetails={fetchContentDetails}
        duplicateToSite={duplicateToSite}
      />
      {/* )} */}
      {/* {
        !loading && contentList?.length === 0 && <NoSearchResult />
      } */}
    </>
  );
};
export default ContListingContainer;
