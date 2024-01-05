import { gql } from '@apollo/client';

export const FETCH_SOCIAL_SHARE_PROFILE = gql`
  query FETCH_SOCIAL_SHARE_PROFILE(
    $socialShareType: [authoring_socialShareType]!
  ) {
    authoring_socialSharePageProfile(socialShareType: $socialShareType)
  }
`;

export const FETCH_CONTENT_TYPE_SOCIAL_SHARE_LIST_CALL = gql`
  query FETCH_CONTENT_TYPE_SOCIAL_SHARE_LIST_CALL(
    $contentType: authoring_ContentTypes!
    $pagination: authoring_Paginate!
    $pageFilter: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
  ) {
    authoring_getContentTypeItems(
      contentType: $contentType
      pageFilter: $pageFilter
      pagination: $pagination
      sort: $sort
      searchTerm: $searchTerm
    )
  }
`;

