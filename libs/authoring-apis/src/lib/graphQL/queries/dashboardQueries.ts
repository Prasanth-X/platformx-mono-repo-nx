/* eslint-disable template-tag-spacing */
import { gql } from "@apollo/client";

export const FETCH_DASHBOARD_CONTENT_ALL = gql`
  query FETCH_DASHBOARD_CONTENT_ALL(
    $contentType: authoring_ContentTypes!
    $pagePagination: authoring_Paginate!
    $contentPagination: authoring_Paginate!
    $scheduledPagination: authoring_Paginate!
    $all: authoring_PageFilter!
    $unPublish: authoring_PageFilter!
    $publish: authoring_PageFilter!
    $searchTerm: String!
    $sort: authoring_sortOption!
    $dashboardPage: String!
    $boostPage: String!
    $contentFilter: authoring_CONTENT_FILTER!
  ) {
    recentPages: authoring_getContentTypeItems(
      contentType: $contentType
      pageFilter: $all
      pagination: $pagePagination
      sort: $sort
      searchTerm: $searchTerm
    )

    unPublish: authoring_getContentTypeItems(
      contentType: $contentType
      pageFilter: $unPublish
      pagination: $scheduledPagination
      sort: $sort
      searchTerm: $searchTerm
    )

    publish: authoring_getContentTypeItems(
      contentType: $contentType
      pageFilter: $publish
      pagination: $scheduledPagination
      sort: $sort
      searchTerm: $searchTerm
    )

    createContent: authoring_getDashboardContent(pagePath: $dashboardPage) {
      title
      lastModifiedBy
      lastModificationDate
      createdBy
      creationDate
      compoundData
    }

    boostContent: authoring_getDashboardContent(pagePath: $boostPage) {
      title
      lastModifiedBy
      lastModificationDate
      createdBy
      creationDate
      compoundData
    }

    recentContent: authoring_recentContents(
      pagination: $contentPagination
      searchTerm: $searchTerm
      tags: []
      filter: $contentFilter
    )

    taskPages: authoring_getUserAssignedTaskList(sort: DESC) {
      title
      approval_status
      description
      document_path
      document_title
      document_type
      stage
      task_status
      user_id
      user_name
      workflow_id
      workflow_name
      last_modified_by
      creation_date
      last_modification_date
      created_by
      due_date
    }

    coursesList: authoring_getDynamicContentSearch(
      pagination: { start: 0, rows: 500 }
      searchTerm: ""
      tags: []
      filter: Course
    )

    userCourseList: authoring_getCourseUsers(course_id: "")
  }
`;
export const FETCH_DASHBOARD_CHARTS = gql`
  query FETCH_DASHBOARD_CHARTS($dashboardId: String!) {
    authoring_getDashboardDetailById(dashboardId: $dashboardId)
  }
`;

export const UPDATE_TASK_STATUS = gql`
mutation ($input: authoring_taskRequest) {
  authoring_updateTask(input: $input) {
    message
    path
    __typename
  }
}
`;