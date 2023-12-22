import { SORT_ORDER } from "./Constants";


export const mapFetchALL = (
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
    contentType: contentType,
    pageFilter: filter,
    sort: SORT_ORDER,
    pagination: pagination,
    isSuggestive: false,
  };
};
