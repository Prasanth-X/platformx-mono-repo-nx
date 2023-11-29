import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { FETCH_SITE_LISTING } from '../../graphql/sitecreation/siteCreationFetchQueries';
import { ApiResponse } from '../utils/common.types';
import {
  CREATE_NEW_SITE_CONFIG,
  PUBLISH_MULTISITE_INFO,
  SITE_TITLE_VALIDATION,
  SUBDOMAIN_VALIDATION,
  UPDATE_SITE_CONFIG,
} from '../../graphql/sitecreation/siteCreationMutateQueries';
import { showToastError } from '../../components/toastNotification/toastNotificationReactTostify';

export const fetchSites = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.query({
      query: FETCH_SITE_LISTING,
      variables: input,
      fetchPolicy: 'no-cache',
    });
    return data;
  } catch (err: any) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const createSiteConfig = async <T>(input: T): Promise<any> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: CREATE_NEW_SITE_CONFIG,
      variables: input,
    });
    return data;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.log(error.graphQLErrors);
      showToastError(`${error.graphQLErrors[0].message}`);
    }
    throw error;
  }
};

export const updateSiteConfig = async <T>(
  input: T
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: UPDATE_SITE_CONFIG,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const publishMultisiteInfo = async <T>(
  input: T
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: PUBLISH_MULTISITE_INFO,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const siteTitleValidation = async <T>(
  input: T
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: SITE_TITLE_VALIDATION,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};

export const subdomainValidation = async <T>(
  input: T
): Promise<ApiResponse<T>> => {
  try {
    const { data } = await graphqlInstance.mutate({
      mutation: SUBDOMAIN_VALIDATION,
      variables: input,
    });
    return data;
  } catch (err) {
    if (err instanceof ApolloError) console.log(err.graphQLErrors);
    throw err;
  }
};
