import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { ApiResponse } from '../../utils/types';
import { SearchContentListQueries } from '../../graphQL/queries/searchQueries';
import { ROW_SIZE } from '../../utils/constants';
import { mapFetchALL } from '../contentTypes/mapper';
import { sortedData } from '../../utils/helper';
export const SearchContentApi = {
  fetchContent: async (
    contentType: string,
    location: { state: any; },
    filter: string,
    state: { content: { startIndex: any; contentList: any; }; },
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
  },
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
