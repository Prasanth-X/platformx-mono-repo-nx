import { gql } from '@apollo/client';

export const PUBLISH_CONTENT_TYPE = gql`
  mutation authoring_publishContent(
    $input: authoring_PublishInfo
    $contentType: authoring_ContentTypes!
  ) {
    authoring_publishContent(contentType: $contentType, input: $input) {
      parent_page_url
      message
      current_page_url
      __typename
    }
  }
`;

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

export const DELETE_CONTENT_TYPE = gql`
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
