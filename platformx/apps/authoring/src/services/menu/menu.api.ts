import { ApolloError } from '@apollo/client';
import graphqlInstance from '../../config/graphqlConfig';
import { CREATE_MENUITEM } from '../../graphql/menuQueries';
import { fetch_menu_list } from '../navTree/navTree.api';
import { ApiResponse } from '../utils/common.types';
export const createMenuItem = CREATE_MENUITEM;
const menuApi = {
  getMenu: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: fetch_menu_list,
        variables: input,
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
};
export default menuApi;
