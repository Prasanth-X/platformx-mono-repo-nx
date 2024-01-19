import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';

import {
  CREATE_CONTENT_TYPE,
  DELETE_CONTENT_TYPE,
  PUBLISH_CONTENT_TYPE,
  UPDATE_CONTENT_TYPE,
} from '../../graphQL/mutations/contentTypeMutations';
import {
  FETCH_CONTENT_BY_PATH,
  FETCH_CONTENT_TYPE_LIST_ALL,
} from '../../graphQL/queries/contentTypesQueries';
import { SearchContentListQueries } from '../../graphQL/queries/searchQueries';
import { ROW_SIZE } from '../../utils/constants';
import { sortedData } from '../../utils/helper';
import { mapFetchALL } from './mapper';

// FetchQueries
export const fetchContentByPath = FETCH_CONTENT_BY_PATH;
export const fetchContentTypeList = FETCH_CONTENT_TYPE_LIST_ALL;

// MutateQueries
export const createContentType = CREATE_CONTENT_TYPE;
export const updateContentType = UPDATE_CONTENT_TYPE;
export const publishContentType = PUBLISH_CONTENT_TYPE;
export const deleteContentType = DELETE_CONTENT_TYPE;

const contentTypeAPIs = {
  createContentType: CREATE_CONTENT_TYPE,
  updateContentType: UPDATE_CONTENT_TYPE,
  publishContentType: PUBLISH_CONTENT_TYPE,
  deleteContentType: DELETE_CONTENT_TYPE,
  fetchContentByPath: FETCH_CONTENT_BY_PATH,
  fetchContentTypeListAll: FETCH_CONTENT_TYPE_LIST_ALL,
  fetchContent: async (input: any) => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_CONTENT_BY_PATH,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError)
        throw err;
    }
  },
  fetchContentAll: async (input: any) => {
    try {
      const { data } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError)
        throw err;
    }
  },

  fetchSearchContent: async (
    contentType: string,
    location: { state: any },
    filter: string,
    startIndex: number,
    contentList: any,
    reloadContent = false,
  ) => {
    const newPagination = {
      start: reloadContent ? 0 : startIndex,
      rows: ROW_SIZE,
    };
    const variables = mapFetchALL(
      location.state,
      filter,
      contentType,
      newPagination,
    );
    const { data } = await graphqlInstance.query({
      query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
      variables: variables,
      fetchPolicy: 'no-cache',
    });
    const sortedContent = sortedData(data?.authoring_getContentTypeItems || []);

    return sortedContent;
    // return {
    //   type: 'UPDATE_CONTENT',
    //   content: reloadContent
    //     ? [...JSON.parse(JSON.stringify(sortedContent))]
    //     : [...contentList, ...JSON.parse(JSON.stringify(sortedContent))],
    //   loading: false,
    //   newDataSize: [...JSON.parse(JSON.stringify(sortedContent))].length,
    //   contentType: contentType,
    // };
  },

  fetchContentTypeList: async (input: any) => {
    try {
      const { data, loading } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return { data: data, loading: loading };
    } catch (err: any) {
      if (err instanceof ApolloError)
        throw err;
    }
  },
  fetchSuggestions: async (input: any) => {
    try {
      const { data, loading } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return { data: data, loading: loading };
    } catch (err: any) {
      if (err instanceof ApolloError)
        throw err;
    }
  },

  fetchCourseContent: async (
    contentType: any,
    location: any,
    filter: any,
    startIndex: any,
    contentList: any,
    reloadContent = false,
  ) => {
    // const { startIndex, contentList } = state.content;
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
  },
};

export default contentTypeAPIs;
