import { gql } from '@apollo/client';

export const FETCH_VOD_BY_ID = gql`
  query FETCH_VOD_MODEL_DRAFT($folder: String!, $path: String!) {
    authoring_getCmsVodByPath(folderPath: $folder, path: $path) {
      Page
      Description
      Title
      Author
      DsapceVideoUrl
      Thumbnail
      CurrentPageURL
      ParentPageURL
      Tags
      Page_State
      IsSoftDelete
      SeoEnable
      AnalyticsEnable
      SiteMap
      Others
      Analytics
      StructureData
      PageSettings
      lastModifiedDate
    }
  }
`;

export const FETCH_VOD_LIST_ALL = gql`
  query FETCH_VOD_LIST_ALL(
    $obj: authoring_Paginate!
    $type: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
    $dateFilter: authoring_dateFilter!
  ) {
    authoring_getvodList(
      pagination: $obj
      pageFilter: $type
      pageSearch: $searchTerm
      sort: $sort
      dateFilter: $dateFilter
    ) {
      Page
      Description
      Title
      CurrentPageURL
      ParentPageURL
      Page_State
      lastModifiedDate
      LastModifiedBy
      LastPublishedDate
      Author
      Path
      Thumbnail
    }
  }
`;
