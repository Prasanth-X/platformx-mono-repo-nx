import { gql } from '@apollo/client';

export const PUBLISH_VOD = gql`
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
