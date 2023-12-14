import { gql } from '@apollo/client';

export const SearchContentListQueries = {
  FETCH_CONTENT_TYPE_LIST: gql`
    query FETCH_CONTENT_TYPE_LIST(
      $contentType: authoring_ContentTypes!
      $pageFilter: authoring_PageFilter!
      $sort: authoring_sortOption
      $pagination: authoring_Paginate!
      $isSuggestive: Boolean
      $searchTerm: String
      $dateFilter: authoring_DateFilter
      $tags: [String]
      $created_by: String
    ) {
      authoring_getContentTypeItems(
        contentType: $contentType
        pageFilter: $pageFilter
        pagination: $pagination
        sort: $sort
        isSuggestive: $isSuggestive
        searchTerm: $searchTerm
        dateFilter: $dateFilter
        tags: $tags
        created_by: $created_by
      )
    }
  `,
  FETCH_COURSE_LIST: gql`
    query FETCH_COURSE_LIST(
      $pagination: authoring_Paginate!
      $filter: authoring_CONTENT_FILTER!
      $isListing: Boolean
    ) {
      authoring_recentContents(
        pagination: $pagination

        searchTerm: ""

        filter: $filter

        isListing: $isListing
      )
    }
  `,
};
