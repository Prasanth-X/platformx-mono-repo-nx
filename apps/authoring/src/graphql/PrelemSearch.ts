import { gql } from '@apollo/client';
export const FETCH_PRELEM_VALIDATION = gql`
  query FETCH_PRELEM_VALIDATION($input: String!) {
    authoring_getDocValidationSchema(docType: $input) {
      name
      validation
    }
  }
`;
export const FETCH_PRELEM_CONTENT = gql`
  query FETCH_PRELEM_CONTENT(
    $path: String!
    $docType: String!
    $prelemId: String
  ) {
    authoring_getCmsItemContent(
      path: $path
      docType: $docType
      prelemId: $prelemId
    )
  }
`;
export const FETCH_ALL_PRELEM_SEARCH_LIST = gql`
  query FETCH_ALL_PRELEM_SEARCH_LIST(
    $obj: authoring_Paginate!
    $sort: authoring_sortOption!
    $searchText: String!
    $tag: [String]!
    $layout: [String]!
  ) {
    authoring_prelemSearch(
      pagination: $obj
      sort: $sort
      searchText: $searchText
      tag: $tag
      layout: $layout
    ) {
      prelems {
        PrelemId
        PrelemName
        Tags
        PreviewThumbnail
        Thumbnails
        Description
        DocumentType
        DocumentPath
        DevelopedBy
        DevelopedDate
        DocumentCreationPath
        SeoEnabled
        AnalyticsEnabled
      }
      layout {
        title
        mapping
        thumbnail
        id
      }
    }
  }
`;
