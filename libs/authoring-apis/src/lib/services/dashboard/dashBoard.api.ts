import graphqlInstance from '../../config/graphqlConfig';
import { FETCH_DASHBOARD_CONTENT_ALL, FETCH_DASHBOARD_CHARTS } from '../../graphQL/queries/dashboardQueries';
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
      return {
        data: null,
        error: err,
        loading: false
      };
    }
  },
  fetchDashboardGraphs: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: FETCH_DASHBOARD_CHARTS,
        variables: input,
        fetchPolicy: 'no-cache',
      });
      return data;
    } catch (err: any) {
      return {
        data: null,
        error: err,
        loading: false
      };
    }
  },
};
export default dashboardApi;
