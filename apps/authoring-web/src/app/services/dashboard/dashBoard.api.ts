import graphqlInstance from '../../config/graphqlConfig';
import { FETCH_DASHBOARD_CONTENT_ALL } from '../../graphql/dashboard/dashBoardFetchQueries';
import { ApiResponse } from '../utils/common.types';

const dashboardApi = {
  fetchDashboardData: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_DASHBOARD_CONTENT_ALL,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      return null;
    }
  },
};
export default dashboardApi;
