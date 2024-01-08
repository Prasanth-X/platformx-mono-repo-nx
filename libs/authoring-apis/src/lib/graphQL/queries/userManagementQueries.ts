import { gql } from '@apollo/client';
export const UserManagementQueries = {
  FETCH_USER_LIST: gql`
    query FETCH_USER_LIST(
      $start: Int!
      $rows: Int!
      $isAuthoringUser: Boolean!
      $isRenderingUser: Boolean!
      $isCommunityUser: Boolean!
    ) {
      authoring_userList(
        pagination: { start: $start, rows: $rows }
        is_Authoring_User: $isAuthoringUser
        is_Rendering_User: $isRenderingUser
        is_Community_User: $isCommunityUser
      )
    }
  `,
  EMAIL_VALIDATION: gql`
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
  `,
  FETCH_ROLE_LIST: gql`
    query {
      authoring_rolesList(pagePath: "")
    }
  `,
  FETCH_PERMISSION_LIST: gql`
    query {
      authoring_permissionList(pagePath: "")
    }
  `,
  FETCH_ROLE: gql`
    query FETCH_ROLE($pagePath: String!) {
      authoring_rolesList(pagePath: $pagePath)
    }
  `,
  CREATE_USER: gql`
    mutation authoring_createUser($input: authoring_userInputRequest) {
      authoring_createUser(input: $input) {
        message
      }
    }
  `,
  EDIT_USER: gql`
    mutation authoring_updateUser($input: authoring_updateRequest) {
      authoring_updateUser(input: $input) {
        message
      }
    }
  `,
  GET_USER_DETAILED_LIST: gql`
    query GET_USER_DETAILED_LIST(
      $user_id: String!
      $isAuthoringUser: Boolean
      $isRenderingUser: Boolean
    ) {
      authoring_getUser(
        user_id: $user_id
        is_Authoring_User: $isAuthoringUser
        is_Rendering_User: $isRenderingUser
      ) {
        id
        username
        enabled
        first_name
        last_name
        email
        timezone
        image
        phone
        role
        default_site
        preferred_sites_languages
        preferred_sites_urls
        accessible_sites
        dob
        gender
        is_Community_User
      }
    }
  `,
  INVITE_END_USER: gql`
    mutation authoring_inviteUsers($input: authoring_inviteUserRequest) {
      authoring_inviteUsers(input: $input) {
        message
        __typename
      }
    }
  `,
  APPROVE_REJECT_USER: gql`
    mutation authoring_approveRejectEndUser(
      $input: authoring_approveRejectRequest
    ) {
      authoring_approveRejectEndUser(input: $input) {
        message
      }
    }
  `,
  RESEND_EMAIL_TO_USERS: gql`
    mutation authoring_reinviteUser($input: authoring_InviteRequest) {
      authoring_reinviteUser(input: $input) {
        message
        __typename
      }
    }
  `,
  ACTIVATE_DEACTIVATE_USERS: gql`
    mutation ($input: authoring_updateRequest) {
      authoring_updateUser(input: $input) {
        message
      }
    }
  `,
};
