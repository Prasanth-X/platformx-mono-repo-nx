import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';

import { FETCH_VOD_BY_ID } from '../../graphQL/queries/vodQueries';
import { ApiResponse } from '../../utils/types';

const fetchVodByIdAPI = {
  fetchContent: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_VOD_BY_ID,
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

export default fetchVodByIdAPI;
