import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import {
  FETCH_ARTICLE_LIST_ALL,
  FETCH_ARTICLE_MODEL,
} from '../../graphql/article/articleFetchQuerie';
import {
  CREATE_ARTICLE,
  DELETE_ARTICLE,
  PUBLISH_ARTICLE,
  UPDATE_ARTICLE,
} from '../../graphql/article/articleMutateQueries';
import { articleQueries } from '../../graphql/articleQueries';
import { FETCH_TAG_LIST } from '../../graphql/common/tagsFetchQueries';
import { ApiResponse } from '../utils/common.types';


//FetchQueries
export const fetchArticleModel = FETCH_ARTICLE_MODEL;
export const fetchArticleList = FETCH_ARTICLE_LIST_ALL;

//MutateQueries
export const create_article = CREATE_ARTICLE;
export const update_article = UPDATE_ARTICLE;
export const publish_article = PUBLISH_ARTICLE;
export const delete_article = DELETE_ARTICLE;
const articleApi = {
  getList: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: articleQueries.FETCH_CONTENT_LIST_ALL,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  createArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: articleQueries.CREATE_CONTENT,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  publishArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: articleQueries.PUBLISH_CONTENT,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  fetchArticleDetails: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: articleQueries.FETCH_CONTENT_BY_PATH,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  updateArticle: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: articleQueries.UPDATE_CONTENT,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  getTags: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_TAG_LIST,
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
export default articleApi;
