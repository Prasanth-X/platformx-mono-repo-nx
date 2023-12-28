export const mapFetchPages = (
  startIndex: number,
  state: any,
  filter: string
) => {
  return {
    searchTerm: state?.searchTerm,
    tags: state?.tags,
    dateFilter: {
      from: state?.fromDate,
      to: state?.toDate,
    },
    created_by: state?.author,
    contentType: 'Sitepage',
    pageFilter: filter,
    sort: 'DESC',
    pagination: { start: startIndex, rows: 20 },
    isSuggestive: false,
  };
};

export const ROW_SIZE = 20;
