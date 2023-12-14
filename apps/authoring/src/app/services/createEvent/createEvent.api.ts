import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { FETCH_CONTENT_BY_PATH } from '../../graphql/fetchQueries';
import {
  CREATE_CONTENT_TYPE,
  PUBLISH_CONTENT_TYPE,
  UPDATE_CONTENT_TYPE,
} from '../../graphql/mutateQueries';
import { ApiResponse } from '../utils/common.types';

const createEventAPI = {
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
  createContentType: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: CREATE_CONTENT_TYPE,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  updateContentType: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: UPDATE_CONTENT_TYPE,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  publishContentType: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: PUBLISH_CONTENT_TYPE,
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

export default createEventAPI;
