import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import graphqlInstance from '../../config/graphqlConfig';
import { SearchContentListQueries } from '../../graphql/searchContentList/searchContentListQueries';
import { mapFetchALL } from '../useContentListing/mapper';
import { ROW_SIZE } from '../usePage/mapper';
import { mapFetchAll } from './mapper';

const useContentSearch = (filter = 'ALL') => {
  const location = useLocation();
  const [contents, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ start: 0, rows: ROW_SIZE });
  const sortedData = (data) => {
    return data?.sort(
      (a, b) => b?.last_modification_date - a.last_modification_date
    );
  };

  const fetchContent = async () => {
    setLoading(true);
    try {
      const newPagination = {
        start: 0,
        rows: ROW_SIZE,
      };
      const variables = mapFetchAll(
        location.state,
        filter,
        'ALL',
        newPagination
      );
      const { data } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: variables,
        fetchPolicy: 'no-cache',
      });
      const sortedContent = sortedData(
        data?.authoring_getContentTypeItems || []
      );
      setContent(() => JSON.parse(JSON.stringify(sortedContent)));
      setPagination(newPagination);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  const fetchMore = async () => {
    setLoading(true);
    try {
      const newPagination = {
        start: (pagination.start == 0 ? 1 : pagination.start) + ROW_SIZE,
        rows: ROW_SIZE,
      };
      const variables = mapFetchALL(
        location.state,
        filter,
        'ALL',
        newPagination
      );
      const { data } = await graphqlInstance.query({
        query: SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        variables: variables,
        fetchPolicy: 'no-cache',
      });

      setContent((prevItems) => [
        ...prevItems,
        ...data.authoring_getContentTypeItems,
      ]);

      setPagination(newPagination);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [filter]);

  // /** fetch all the content */
  // const variables = mapFetchContents(0, location.state, filter);
  // const { data, loading, error, fetchMore } = useQuery<any>(
  //   SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
  //   {
  //     variables,
  //     fetchPolicy: 'network-only',
  //   }
  // );

  // const contents = useMemo(() => {
  //   return data?.authoring_getContentTypeItems?.sort(
  //     (a, b) => b?.last_modification_date - a.last_modification_date
  //   );
  // }, [data]);

  // /** fetch more for infintie scroll */
  // const handleFetchMore = useCallback(() => {
  //   const variables = mapFetchContents(
  //     contents.length + 1,
  //     location.state,
  //     filter
  //   );

  //   fetchMore({
  //     variables: variables,
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       return {
  //         authoring_getContentTypeItems:
  //           prev.authoring_getContentTypeItems?.concat(
  //             fetchMoreResult.authoring_getContentTypeItems || []
  //           ),
  //       };
  //     },
  //   });
  // }, [fetchMore, contents?.length]);
  return {
    fetchMore,
    loading,
    contents,
    error,
    fetchContent,
  };
};

export default useContentSearch;
