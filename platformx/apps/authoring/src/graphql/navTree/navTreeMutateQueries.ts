import { gql } from '@apollo/client';

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
  mutation authoring_publishNavigation($input: authoring_publishNavigation) {
    authoring_publishNavigation(input: $input) {
      message
      path
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
export const MENU_CREATE_UPDATE_DELETE_REORDER = gql`
  mutation authoring_createOrUpdateNavigation($input: authoring_Navigation) {
    authoring_createOrUpdateNavigation(input: $input) {
      message
    }
  }
`;
