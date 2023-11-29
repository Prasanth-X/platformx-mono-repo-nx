import { gql } from '@apollo/client';

export const FETCH_PRELEM_TOP_NAVIGATION = gql`
  query {
    authoring_topnavigation(sort: ASC) {
      title
      tag
      score
    }
  }
`;

export const FETCH_PAGE_MODEL_DRAFT = gql`
  query FETCH_PAGE_MODEL_DRAFT($folder: String!, $path: String!) {
    authoring_getCmsItemByPath(folderPath: $folder, path: $path) {
      Page
      SiteName
      Title
      ParentPageURL
      CurrentPageURL
      Page_CreatedBy
      Page_LastModifiedBy
      Page_LastModificationDate
      Page_PublishedBy
      IsEdit
      SeoEnable
      AnalyticsEnable
      RobotTxt
      SiteMap
      Others
      Analytics
      StructureData
      PageSettings
      children
      content
      stages
      workflow_id
      workflow_status
      is_workflow_enabled
      Path
      task_status
      user_name
      user_id
    }
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

export const FETCH_ALL_PAGE_LIST = gql`
  query FETCH_PAGE_LIST_ALL(
    $obj: authoring_Paginate!
    $type: authoring_PageFilter!
  ) {
    authoring_pageList(pagination: $obj, pageFilter: $type) {
      CurrentPageUrl
      Page
      Title
    }
  }
`;

// Fetch Vod List

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
export const FETCH_VOD_SUGGESTIVE_SEARCH = gql`
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
      Title
    }
  }
`;
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

export const FETCH_TAG_LIST = gql`
  query FETCH_TAG_LIST($start: Int!, $rows: Int!) {
    authoring_getTagsList(
      pagination: { start: $start, rows: $rows }
      sort: DESC
    ) {
      category
      tags
    }
  }
`;

//Article fetch queries

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
      PublishedDate
      LastPublishedDate
      original_image
      published_images
    }
  }
`;
export const FETCH_MENU_LIST_ALL = gql`
  query FETCH_MENU_LIST_ALL(
    $searchTerm: String!
    $sort: authoring_sortOption!
  ) {
    authoring_getMenuList(menuSearch: $searchTerm, sort: $sort) {
      Title
      Tagging
      Description
      Menu_Id
      ParentId
      Menu_State
      URL
      Label
      Internal
      Status
      Score
      IsHidden
      LastModificationDate
      LastModifiedBy
      Menu_PublishedBy
      Author
      Menu_PublishedDate
      LastPublishedDate
      createdBy
      UserActionInfo
      HomePage
      isCurrentTab
      menuicon
      content_type_value
    }
  }
`;

export const FETCH_CONTENT_TYPE_LIST_ALL = gql`
  query FETCH_CONTENT_TYPE_LIST_ALL(
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
export const FETCH_CONTENT_BY_PATH = gql`
  query FETCH_CONTENT_BY_PATH(
    $contentType: authoring_ContentTypes!
    $path: String!
  ) {
    authoring_getCmsContentByPath(contentType: $contentType, path: $path)
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

export const FETCH_SOCIAL_SHARE_PROFILE = gql`
  query FETCH_SOCIAL_SHARE_PROFILE(
    $socialShareType: [authoring_socialShareType]!
  ) {
    authoring_socialSharePageProfile(socialShareType: $socialShareType)
  }
`;

export const FETCH_USER_LIST = gql`
  query FETCH_USER_LIST($start: Int!, $rows: Int!) {
    authoring_userList(pagination: { start: $start, rows: $rows })
  }
`;

export const FETCH_ROLE_LIST = gql`
  query {
    authoring_rolesList(pagePath: "")
  }
`;
export const FETCH_PERMISSION_LIST = gql`
  query {
    authoring_permissionList(pagePath: "")
  }
`;
export const EMAIL_VALIDATION = gql`
  query EMAIL_VALIDATION(
    $userName: String!
    $isAuthoringUser: Boolean
    $isRenderingUser: Boolean
  ) {
    authoring_validateUser(
      userName: $userName
      is_Authoring_User: $isAuthoringUser
      is_Rendering_User: $isRenderingUser
    ) {
      message
    }
  }
`;
