import { SORT_ORDER } from '../../Common/Listing/Utils/Constants';

export const mapFetchAll = (
  state: any,
  filter: string,
  contentType: string,
  pagination: { start: number; rows: number }
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: 'ALL',
    pageFilter: filter,
    sort: SORT_ORDER,
    pagination: pagination,
    isSuggestive: false,
  };
};
