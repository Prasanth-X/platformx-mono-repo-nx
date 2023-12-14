import { gql } from '@apollo/client';

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
