import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { SearchContentListQueries } from '../../graphql/searchContentList/searchContentListQueries';
import { ApiResponse } from '../utils/common.types';
export const searchContentListApi = {
  fetchContentTypeList: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data, loading } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return { data: data, loading: loading };
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  fetchSuggestions: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data, loading } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return { data: data, loading: loading };
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
};
