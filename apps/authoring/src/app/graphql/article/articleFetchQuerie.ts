import { gql } from '@apollo/client';

export const FETCH_ARTICLE_MODEL = gql`
  query FETCH_ARTICLE_MODEL($folder: String!, $path: String!) {
    authoring_getCmsArticleByPath(folderPath: $folder, path: $path) {
      Page
      SiteName
      Title
      SubTitle
      Banner
      Description
      ContentType
      Category
      ParentPageURL
      CurrentPageURL
      Page_CreatedBy
      Page_LastModifiedBy
      Page_PublishedBy
      IsEdit
      SeoEnable
      AnalyticsEnable
      RobotTxt
      SiteMap
      Others
      Analytics
      StructureData
      DevelopedBy
      DevelopedDate
      Page_State
      Analytics
      creationDate
      modificationDate
      articleContent
      ArticleSettings
      Tag
      original_image
      published_images
      PublishedDate
      LastPublishedDate
    }
  }
`;

export const SEARCH_ARTICLE_BY_NAME = gql`
  query FETCH_ARTICLE_LIST_ALL(
    $obj: authoring_Paginate!
    $type: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
    $dateFilter: authoring_DateFilter!
  ) {
    authoring_articleList(
      pagination: $obj
      pageFilter: $type
      pageSearch: $searchTerm
      sort: $sort
      dateFilter: $dateFilter
    ) {
      Title
    }
  }
`;

export const FETCH_ARTICLE_LIST_ALL = gql`
  query FETCH_ARTICLE_LIST_ALL(
    $obj: authoring_Paginate!
    $type: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
    $dateFilter: authoring_DateFilter!
  ) {
    authoring_articleList(
      pagination: $obj
      pageFilter: $type
      pageSearch: $searchTerm
      sort: $sort
      dateFilter: $dateFilter
    ) {
      CurrentPageUrl
      ParentPageUrl
      Name
      Status
      Title
      Description
      LastModificationDate
      LastModifiedBy
      PublishedBy
      Author
      ArticleSettings {
        Name
        PageTags
        PageDescription
      }
      Path
      LastPublishedDate
      PublishedDate
      AnalyticsEnable
      SeoEnable
      StructuredData
    }
  }
`;
