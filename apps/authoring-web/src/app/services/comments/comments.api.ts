import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { CommentQueries } from '../../graphql/commentsQueries';
import { ApiResponse } from '../utils/common.types';

const commentsApi = {
  createOrUpdateComment: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: CommentQueries.CREATE_OR_UPDATE_COMMENT,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  getComment: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: CommentQueries.GET_COMMENT,
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
export default commentsApi;
