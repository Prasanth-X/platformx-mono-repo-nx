import { gql } from '@apollo/client';

export const FETCH_CONTENT_BY_PATH = gql`
  query FETCH_CONTENT_BY_PATH(
    $contentType: authoring_ContentTypes!
    $path: String!
  ) {
    authoring_getCmsContentByPath(contentType: $contentType, path: $path)
  }
`;

export const FETCH_CONTENT_TYPE_LIST_ALL = gql`
  query FETCH_CONTENT_TYPE_LIST_ALL(
    $contentType: authoring_ContentTypes!
    $pagination: authoring_Paginate!
    $pageFilter: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
    $isSuggestive: Boolean
  ) {
    authoring_getContentTypeItems(
      contentType: $contentType
      pageFilter: $pageFilter
      pagination: $pagination
      sort: $sort
      searchTerm: $searchTerm
      isSuggestive: $isSuggestive
    )
  }
`;
