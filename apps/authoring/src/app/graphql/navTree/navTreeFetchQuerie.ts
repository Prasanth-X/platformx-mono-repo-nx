import { gql } from '@apollo/client';

// export const FETCH_MENU_LIST_ALL = gql`
//   query FETCH_MENU_LIST_ALL(
//     $searchTerm: String!
//     $sort: authoring_sortOption!
//   ) {
//     authoring_getMenuList(menuSearch: $searchTerm, sort: $sort) {
//       Title
//       Tagging
//       Description
//       Menu_Id
//       ParentId
//       Menu_State
//       URL
//       Label
//       Internal
//       Status
//       Score
//       IsHidden
//       LastModificationDate
//       LastModifiedBy
//       Menu_PublishedBy
//       Author
//       Menu_PublishedDate
//       LastPublishedDate
//       createdBy
//       UserActionInfo
//       HomePage
//       isCurrentTab
//       menuicon
//       content_type_value
//     }
//   }
// `;
export const FETCH_MENU_LIST_ALL = gql`
  query FETCH_MENU_LIST_ALL($pagePath: String!) {
    authoring_getNavigation(pagePath: $pagePath)
  }
`;
