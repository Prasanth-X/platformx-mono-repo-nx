import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { ApiResponse } from '../utils/common.types';

import {
  CREATE_CONTENT_TYPE,
  DELETE_CONTENT_TYPE,
  PUBLISH_CONTENT_TYPE,
  UPDATE_CONTENT_TYPE,
} from '../../graphql/contentTypeMutateQueries';
import {
  FETCH_CONTENT_BY_PATH,
  FETCH_CONTENT_TYPE_LIST_ALL,
} from '../../graphql/contentTypesFetchQueries';
import { SearchContentListQueries } from '../../graphql/searchContentList/searchContentListQueries';

// FetchQueries
export const fetchContentByPath = FETCH_CONTENT_BY_PATH;
export const fetchContentTypeList = FETCH_CONTENT_TYPE_LIST_ALL;

// MutateQueries
export const createContentType = CREATE_CONTENT_TYPE;
export const updateContentType = UPDATE_CONTENT_TYPE;
export const publishContentType = PUBLISH_CONTENT_TYPE;
export const deleteContentType = DELETE_CONTENT_TYPE;

const fetchContentByPathAPI = {
  fetchContent: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_CONTENT_BY_PATH,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  fetchContentAll: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
};

export default fetchContentByPathAPI;
