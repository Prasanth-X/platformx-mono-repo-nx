import { gql } from '@apollo/client';
//mutate queries

export const PageQueries = {
  SAVE_PAGE_MODEL: gql`
    mutation updatePage($input: authoring_UpdatePageModelRequest) {
      authoring_updatePage(input: $input) {
        message
      }
    }
  `,
  CREATE_PAGE_MODEL: gql`
    mutation createPage($input: authoring_PageModelRequest) {
      authoring_createPage(input: $input) {
        id
        message
        path
      }
    }
  `,
  PUBLISH_PAGE_MODEL: gql`
    mutation publishPage(
      $input: authoring_PublishRequestDto
      $pageModelRequest: authoring_UpdatePageModelRequest
      $timeZone: String!
    ) {
      authoring_publishPage(
        publishrequestdto: $input
        pageModelRequest: $pageModelRequest
        timeZone: $timeZone
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  UPDATE_PRELEM_CONTENT: gql`
    mutation createOrUpdatePrelemContent(
      $input: authoring_JSON
      $docPath: String!
      $docCreationPath: String!
      $docType: String!
      $instanceId: String!
    ) {
      authoring_createOrUpdatePrelemContent(
        DocumentPath: $docPath
        DocumentCreationPath: $docCreationPath
        DocumentType: $docType
        InstanceId: $instanceId
        Content: $input
      ) {
        InstanceId
        path
      }
    }
  `,
  SCHEDULE_PUBLISH: gql`
    mutation authoring_schedulePublish(
      $publishrequestdto: authoring_PublishRequestDto
      $pageModelRequest: authoring_UpdatePageModelRequest
      $scheduleTime: String!
      $timeZone: String!
    ) {
      authoring_schedulePublish(
        publishrequestdto: $publishrequestdto
        pageModelRequest: $pageModelRequest
        scheduleTime: $scheduleTime
        timeZone: $timeZone
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  SCHEDULE_UNPUBLISH: gql`
    mutation authoring_scheduleUnPublish(
      $publishrequestdto: authoring_PublishRequestDto
      $scheduleTime: String!
      $timeZone: String!
    ) {
      authoring_scheduleUnPublish(
        unPublishrequestdto: $publishrequestdto
        scheduleTime: $scheduleTime
        timeZone: $timeZone
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  FETCH_ALL_PAGE_LIST: gql`
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
  `,
  FETCH_PAGE_LIST_ALL: gql`
    query FETCH_PAGE_LIST_ALL(
      $obj: authoring_Paginate!
      $type: authoring_PageFilter!
      $searchTerm: String!
      $sort: authoring_sortOption!
    ) {
      authoring_pageList(
        pagination: $obj
        pageFilter: $type
        pageSearch: $searchTerm
        sort: $sort
      ) {
        Page
        CurrentPageUrl
        ParentPageUrl
        Status
        Title
        Description
        LastModificationDate
        LastModifiedBy
        PublishedBy
        SchduledPublishTriggerDateTime
        SchduledUnPublishTriggerDateTime
        PublishedDate
        LastPublishedDate
        IsPublished
        PageSettings {
          PageName
          PageTags
          PageDescription
        }
        Path
        SchduledPublishTriggerDateTime
        SchduledUnPublishTriggerDateTime
      }
    }
  `,
  DELETE_PAGE: gql`
    mutation authoring_deletePage(
      $page: String!
      $currentpageurl: String!
      $parentpageurl: String!
    ) {
      authoring_deletePage(
        pageInfo: {
          page: $page
          currentpageurl: $currentpageurl
          parentpageurl: $parentpageurl
        }
      ) {
        message
      }
    }
  `,
  UNPUBLISH_PAGE: gql`
    mutation authoring_unPublishPage(
      $page: String!
      $currentpageurl: String!
      $parentpageurl: String!
      $timeZone: String!
    ) {
      authoring_unPublishPage(
        unpublishrequestdto: {
          page: $page
          currentpageurl: $currentpageurl
          parentpageurl: $parentpageurl
        }
        timeZone: $timeZone
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  RESCHEDULE_PUBLISH: gql`
    mutation authoring_reSchedulePublish(
      $requestdto: authoring_PublishRequestDto
      $scheduleTime: String!
    ) {
      authoring_reSchedulePublish(
        publishrequestdto: $requestdto
        scheduleTime: $scheduleTime
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  RESCHEDULE_UNPUBLISH: gql`
    mutation authoring_reScheduleUnPublish(
      $requestdto: authoring_PublishRequestDto
      $scheduleTime: String!
    ) {
      authoring_reScheduleUnPublish(
        unpublishrequestdto: $requestdto
        scheduleTime: $scheduleTime
      ) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  CANCEL_PUBLISH: gql`
    mutation authoring_cancelPublishTrigger(
      $requestdto: authoring_PublishRequestDto
    ) {
      authoring_cancelPublishTrigger(publishrequestdto: $requestdto) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
  CANCEL_UNPUBLISH: gql`
    mutation authoring_cancelUnPublishTrigger(
      $requestdto: authoring_PublishRequestDto
    ) {
      authoring_cancelUnPublishTrigger(unpublishrequestdto: $requestdto) {
        Message
        ParentPageURL
        CurrentPageURL
      }
    }
  `,
};
