import graphqlInstance from '../../../config/graphqlConfig';
import { SearchContentListQueries } from '../../../graphql/searchContentList/searchContentListQueries';
import { ROW_SIZE } from '../../../hooks/usePage/mapper';
import { searchContentListApi } from '../../../services/search/searchContentList.api';
import { mapFetchALL } from './mapper';

export const getContentListItems = async (reqObj) => {
  try {
    const response: any = await searchContentListApi.fetchContentTypeList(
      reqObj
    );
    return response;
  } catch (err: any) {}
};

const sortedData = (data) => {
  return data?.sort(
    (a, b) => b?.last_modification_date - a.last_modification_date
  );
};

export const fetchContent = async (
  contentType,
  location,
  filter,
  state,
  reloadContent = false
) => {
  const { startIndex, contentList } = state.content;
  const newPagination = {
    start: reloadContent ? 0 : startIndex,
    rows: ROW_SIZE,
  };
  const variables = mapFetchALL(
    location.state,
    filter,
    contentType,
    newPagination
  );
  const { data } = await graphqlInstance.query({
    query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
    variables: variables,
    fetchPolicy: 'no-cache',
  });
  const sortedContent = sortedData(data?.authoring_getContentTypeItems || []);

  return {
    type: 'UPDATE_CONTENT',
    content: reloadContent
      ? [...JSON.parse(JSON.stringify(sortedContent))]
      : [...contentList, ...JSON.parse(JSON.stringify(sortedContent))],
    loading: false,
    newDataSize: [...JSON.parse(JSON.stringify(sortedContent))].length,
    contentType: contentType,
  };
};
export const fetchCourseContent = async (
  contentType,
  location,
  filter,
  state,
  reloadContent = false
) => {
  const { startIndex, contentList } = state.content;
  const pagination = {
    start: reloadContent ? 0 : startIndex,
    rows: ROW_SIZE,
  };
  const variables = {
    pagination,
    filter: contentType,
    isListing: true,
  };
  const { data } = await graphqlInstance.query({
    query: SearchContentListQueries.FETCH_COURSE_LIST,
    variables: variables,
    fetchPolicy: 'no-cache',
  });
  console.log('courseList', data);
  const sortedContent = sortedData(data?.authoring_recentContents || []);

  return {
    type: 'UPDATE_CONTENT',
    content: reloadContent
      ? [...JSON.parse(JSON.stringify(sortedContent))]
      : [...contentList, ...JSON.parse(JSON.stringify(sortedContent))],
    loading: false,
    newDataSize: [...JSON.parse(JSON.stringify(sortedContent))].length,
    contentType: contentType,
  };
};
export const formatContentTitle = (title = '') => {
  return title
    ?.replace(/[_-]/g, ' ')
    ?.replace(/([a-z])([0-9])/gi, '$1 $2')
    ?.replace(/([0-9])([a-z])/gi, '$1 $2')
    ?.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const capitalizeWords = (title = '') => {
  return title
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
};
