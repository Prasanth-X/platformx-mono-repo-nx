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
export const DUPLICATE_PRELEM = gql`
  mutation authoring_createOrUpdatePrelemContent(
    $DocumentPath: String!
    $DocumentCreationPath: String!
    $DocumentType: String!
    $InstanceId: String!
    $Content: authoring_JSON
  ) {
    authoring_createOrUpdatePrelemContent(
      Operation: CREATE
      DocumentPath: $DocumentPath
      DocumentCreationPath: $DocumentCreationPath
      DocumentType: $DocumentType
      InstanceId: $InstanceId
      Content: $Content
    ) {
      InstanceId
      path
    }
  }
`;
export const FETCH_RESET_DATA = gql`
  query FETCH_RESET_DATA($input: String!, $prelemId: String!) {
    authoring_resetContent(docType: $input, prelemId: $prelemId)
  }
`;
export const FETCH_PRELEM_DEFAULT_META = gql`
  query FETCH_PRELEM_DEFAULT_META($prelemId: String!) {
    authoring_prelemById(prelemId: $prelemId) {
      PrelemId
      PrelemName
      Tags
      PreviewThumbnail
      SeoEnabled
      Thumbnails
      Description
      DocumentType
      DocumentPath
      DocumentCreationPath
      DevelopedBy
      DevelopedDate
      SeoEnabled
      AnalyticsEnabled
    }
  }
`;
