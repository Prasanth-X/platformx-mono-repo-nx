/* eslint-disable no-debugger */
import { useQuery } from '@apollo/client';
import { SearchContentListQueries } from '../../graphQL/queries/searchQueries';
import { mapFetchALL } from '../useContentListing/mapper';
import { sortedData } from '../../utils/helper';


const ROW_SIZE = 20;

const useContentSearch = (contentType: string, locationState: any, filter: string, startIndex: number, reloadContent: any) => {
    const newPagination = {
        start: reloadContent ? 0 : startIndex,
        rows: ROW_SIZE,
    };

    const variables: any = mapFetchALL(locationState, filter, contentType, newPagination);

    const { loading, error, data, fetchMore } = useQuery(
        SearchContentListQueries.FETCH_CONTENT_TYPE_LIST,
        {
            variables,
            fetchPolicy: 'no-cache',
        }
    );

    const sortedContent = sortedData(data?.authoring_getContentTypeItems || []);

    const fetchMoreContent = async () => {
        debugger
        await fetchMore({
            variables: {
                ...variables,
                start: variables?.pagination.start + variables?.pagination.rows,
            },
        });
    };

    return { loading, error, contentList: sortedContent, fetchMore: fetchMoreContent };
};

export default useContentSearch;
