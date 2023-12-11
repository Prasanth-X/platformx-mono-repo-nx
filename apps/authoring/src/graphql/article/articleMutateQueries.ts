import { gql } from '@apollo/client';

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

export const PUBLISH_ARTICLE = gql`
  mutation authoring_publishArticle($input: authoring_PublishRequest) {
    authoring_publishArticle(input: $input) {
      parentPageURL
      message
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
