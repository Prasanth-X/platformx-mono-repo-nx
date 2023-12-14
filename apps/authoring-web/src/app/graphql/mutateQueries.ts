import { gql } from '@apollo/client';

export const CREATE_MENUITEM = gql`
  mutation authoring_navigationItems($input: authoring_JSON) {
    authoring_navigationItems(Content: $input) {
      path
    }
  }
`;
//mutation for Articles
export const CREATE_ARTICLE = gql`
  mutation authoring_createArticle($input: authoring_ArticleModelRequest) {
    authoring_createArticle(input: $input) {
      message
      path
      parentPageURL
      currentPageURL
      __typename
    }
  }
`;
export const DELETE_ARTICLE = gql`
  mutation authoring_deleteArticle(
    $page: String!
    $currentpageurl: String!
    $parentpageurl: String!
  ) {
    authoring_deleteArticle(
      articleInfo: {
        Page: $page
        currentpageurl: $currentpageurl
        parentpageurl: $parentpageurl
      }
    ) {
      message
    }
  }
`;
export const UPDATE_ARTICLE = gql`
  mutation authoring_updateArticle(
    $input: authoring_UpdateArticleModelRequest
  ) {
    authoring_updateArticle(input: $input) {
      id
      message
      path
      __typename
    }
  }
`;
export const PUBLISH_SAVED_ARTICLE = gql`
  mutation authoring_publishArticle($input: authoring_PublishRequest) {
    authoring_publishArticle(input: $input) {
      parentPageURL
      message
      currentPageURL
      __typename
    }
  }
`;
export const SAVE_MENU = gql`
  mutation authoring_createNavigation($input: authoring_Menu) {
    authoring_createNavigation(input: $input) {
      message
      path
      name
    }
  }
`;
export const DELETE_MENU = gql`
  mutation authoring_deleteMenu($input: authoring_MenuInfo) {
    authoring_deleteMenu(input: $input) {
      path
      message
      __typename
    }
  }
`;
export const UPDATE_MENU = gql`
  mutation authoring_updateNavigation($input: authoring_UpdateMenu) {
    authoring_updateNavigation(input: $input) {
      message
      path
      name
    }
  }
`;
export const PUBLISH_MENU = gql`
  mutation authoring_publishNavigation($input: authoring_PublishNavRequest) {
    authoring_publishNavigation(input: $input) {
      name
      message
      path
    }
  }
`;

export const DELETE_VOD = gql`
  mutation authoring_deleteVod($input: authoring_VodPageInfo) {
    authoring_deleteVod(vodInfo: $input) {
      message
      __typename
    }
  }
`;
export const UNPUBLISH_VOD = gql`
  mutation authoring_unPublishVod(
    $page: String!
    $parentpageurl: String!
    $currentpageurl: String!
  ) {
    authoring_unPublishVod(
      input: {
        page: $page
        parentpageurl: $parentpageurl
        currentpageurl: $currentpageurl
        status: "depublish"
      }
    ) {
      Message
      ParentPageURL
      CurrentPageURL
    }
  }
`;
export const CREATE_VOD = gql`
  mutation authoring_createVod($input: authoring_VODRequest) {
    authoring_createVod(input: $input) {
      message
      path
      parentPageURL
      isExist
    }
  }
`;
export const UPDATE_VOD = gql`
  mutation authoring_updateVod($input: authoring_VODRequest) {
    authoring_updateVod(input: $input) {
      message
      path
      parentPageURL
    }
  }
`;

export const SAVE_VOD_DRAFT_PAGE = gql`
  mutation authoring_createVod(
    $page: String!
    $title: String!
    $description: String!
    $thumbnail: String!
    $dsapcevideourl: String!
    $tags: [String]!
    $author: String!
    $currentpageurl: String!
  ) {
    authoring_createVod(
      input: {
        Page: $page
        Title: $title
        Description: $description
        ShortDescription: ""
        AccountId: ""
        PlayerID: ""
        VideoId: ""
        PlayerType: "brightcove"
        Thumbnail: $thumbnail
        DsapceVideoUrl: $dsapcevideourl
        Poster: ""
        Author: $author
        Tags: $tags
        ParentPageURL: "/"
        CurrentPageURL: $currentpageurl
        IsEdit: false
        SeoEnable: true
        AnalyticsEnable: true
        RobotTxt: false
        SiteMap: false
        Page_State: "draft"
        Page_CreatedBy: ""
        Page_LastModifiedBy: ""
        Page_PublishedBy: ""
        Analytics: ""
        Others: ""
        StructureData: ""
        PageSettings: {
          PageName: $title
          PageDescription: $description
          PageTags: $tags
          PageURL: "String"
          PageViewer: "JSON"
          PageCaching: true
          PageMobileFriendly: true
          IsSchedulePublish: false
          SchedulePublishDateTime: "String"
          IsScheduleUnpublish: false
          ScheduleUnpublishDateTime: "String"
          SeoTitle: $title
          SeoDescription: $description
          SeoKeywords: $tags
          SeoBlockIndexing: false
          SocialOgTitle: $title
          SocialOgDescription: $description
          SocialOgSiteName: "String"
          SocialOgType: "String"
          SocialOgURL: $thumbnail
          SocialOgLocale: "String"
          SocialOgImage: $thumbnail
          SocialOgTwitterTitle: $title
          SocialOgTwitterDescription: $description
          SocialOgTwitterImage: $thumbnail
          SocialOgTwitterURL: "String"
          SocialTwitterCardSize: "String"
          Page_State: "String"
        }
      }
    ) {
      message
      path
    }
  }
`;
export const PUBLISH_VOD_MODEL = gql`
  mutation publishVod(
    $input: authoring_PublishRequestDto
    $vodRequest: authoring_VODRequest
    $timeZone: String!
  ) {
    authoring_publishVod(
      publishrequestdto: $input
      vodModelRequest: $vodRequest
      timeZone: $timeZone
    ) {
      Message
      ParentPageURL
      CurrentPageURL
      Status
    }
  }
`;
export const MENU_LIST_REORDER = gql`
  mutation authoring_reorderNavigation($input: authoring_ReorderNavRequest) {
    authoring_reorderNavigation(input: $input) {
      message
    }
  }
`;
export const CREATE_QUIZ = gql`
  mutation authoring_createContent($input: authoring_ContentInputRequest) {
    authoring_createContent(contentType: Quiz, input: $input) {
      message
      path
      __typename
    }
  }
`;
export const UPDATE_QUIZ = gql`
  mutation authoring_updateContent($input: authoring_ContentInputRequest) {
    authoring_updateContent(contentType: Quiz, input: $input) {
      message
      path
      __typename
    }
  }
`;
export const PUBLISH_QUIZ = gql`
  mutation authoring_publishContent($input: authoring_PublishInfo) {
    authoring_publishContent(contentType: Quiz, input: $input) {
      parent_page_url
      message
      current_page_url
      __typename
    }
  }
`;
//create quiz & create question
export const CREATE_CONTENT_TYPE = gql`
  mutation authoring_createContent(
    $input: authoring_ContentInputRequest
    $contenttype: authoring_ContentTypes!
  ) {
    authoring_createContent(contentType: $contenttype, input: $input) {
      message
      isExist
      path
      __typename
    }
  }
`;

// export const UPDATE_CONTENT_TYPE = gql`
// mutation authoring_updateContent($input: authoring_ContentInputRequest, $contenttype: authoring_ContentTypes!){
//   authoring_updateContent(contentType: $contenttype, input: $input) {
//      message,
//      path
//       __typename
//     }
//   }`;

export const PUBLISH_CONTENT_TYPE = gql`
  mutation authoring_publishContent(
    $input: authoring_PublishInfo
    $contenttype: authoring_ContentTypes!
  ) {
    authoring_publishContent(contentType: $contenttype, input: $input) {
      parent_page_url
      message
      current_page_url
      __typename
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation authoring_deleteContent(
    $contentType: authoring_ContentTypes!
    $contentInfo: authoring_ContentInfo
  ) {
    authoring_deleteContent(
      contentType: $contentType
      contentInfo: $contentInfo
    ) {
      path
      message
      __typename
    }
  }
`;
export const UPDATE_CONTENT_TYPE = gql`
  mutation authoring_updateContent(
    $input: authoring_ContentInputRequest
    $contenttype: authoring_ContentTypes!
  ) {
    authoring_updateContent(contentType: $contenttype, input: $input) {
      message
      path
      __typename
    }
  }
`;

export const SOCIAL_SHARE_SCHEDULE = gql`
  mutation authoring_socialShareFeedRequest(
    $input: authoring_postShareFeedRequest!
    $shareType: [authoring_socialShareType]!
    $contentType: String!
  ) {
    authoring_socialShareFeedRequest(
      input: $input
      shareType: $shareType
      contentType: $contentType
    )
  }
`;

export const SOCIAL_SHARE_RESCHEDULE = gql`
  mutation authoring_reSchedulePublish(
    $requestdto: authoring_PublishRequestDto
    $scheduleTime: String!
    $type: String
  ) {
    authoring_reSchedulePublish(
      publishrequestdto: $requestdto
      scheduleTime: $scheduleTime
      type: $type
    ) {
      Message
      ParentPageURL
      CurrentPageURL
    }
  }
`;

export const SOCIAL_SHARE_CANCEL_POST = gql`
  mutation authoring_socialShareCancelPost(
    $input: authoring_postInfo!
    $shareType: [authoring_socialShareType]!
    $contentType: String!
  ) {
    authoring_socialShareCancelPost(
      input: $input
      shareType: $shareType
      contentType: $contentType
    )
  }
`;

// export const ACTIVATE_DEACTIVATE_USERS= gql `
// mutation ($input: authoring_userRequest){
//   authoring_userAccess(input: $input) {
//   message
//   }

// }`;
export const ACTIVATE_DEACTIVATE_USERS = gql`
  mutation ($input: authoring_updateRequest) {
    authoring_updateUser(input: $input) {
      message
    }
  }
`;

export const CREATE_USER = gql`
  mutation authoring_createUser($input: authoring_userInputRequest) {
    authoring_createUser(input: $input) {
      message
    }
  }
`;
export const RESEND_EMAIL_TO_USERS = gql`
  mutation authoring_reinviteUser($input: authoring_InviteRequest) {
    authoring_reinviteUser(input: $input) {
      message
      __typename
    }
  }
`;

export const APPROVE_REJECT_USER = gql`
  mutation authoring_approveRejectEndUser(
    $input: authoring_approveRejectRequest
  ) {
    authoring_approveRejectEndUser(input: $input) {
      message
    }
  }
`;
