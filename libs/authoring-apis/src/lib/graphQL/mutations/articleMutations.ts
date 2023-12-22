import { gql } from '@apollo/client';
export const ArticleMutations = {
  FETCH_CONTENT_LIST_ALL: gql`
    query FETCH_CONTENT_LIST_ALL(
      $contentType: authoring_ContentTypes!
      $pageFilter: authoring_PageFilter!
      $pagination: authoring_Paginate!
      $sort: authoring_sortOption!
      $searchTerm: String!
    ) {
      authoring_getContentTypeItems(
        contentType: $contentType
        pageFilter: $pageFilter
        pagination: $pagination
        sort: $sort
        searchTerm: $searchTerm
      )
    }
  `,
  CREATE_CONTENT: gql`
    mutation authoring_createContent(
      $contentType: authoring_ContentTypes!
      $input: authoring_ContentInputRequest
    ) {
      authoring_createContent(contentType: $contentType, input: $input) {
        message
        path
        __typename
      }
    }
  `,
  PUBLISH_CONTENT: gql`
    mutation authoring_publishContent(
      $contentType: authoring_ContentTypes!
      $input: authoring_PublishInfo
    ) {
      authoring_publishContent(contentType: $contentType, input: $input) {
        parent_page_url
        message
        current_page_url
        __typename
      }
    }
  `,
  FETCH_CONTENT_BY_PATH: gql`
    query authoring_getCmsContentByPath(
      $contentType: authoring_ContentTypes!
      $path: String!
    ) {
      authoring_getCmsContentByPath(contentType: $contentType, path: $path)
    }
  `,
  UPDATE_CONTENT: gql`
    mutation authoring_updateContent(
      $contentType: authoring_ContentTypes!
      $input: authoring_ContentInputRequest
    ) {
      authoring_updateContent(contentType: $contentType, input: $input) {
        message
        path
        __typename
      }
    }
  `,
  CREATE: gql`
    mutation authoring_createArticle($input: authoring_ArticleModelRequest) {
      authoring_createArticle(input: $input) {
        message
        path
        parentPageURL
        currentPageURL
        __typename
      }
    }
  `,

  UPDATE: gql`
    mutation authoring_updateArticle($input: authoring_UpdateArticleModelRequest) {
      authoring_updateArticle(input: $input) {
        id
        message
        path
        __typename
      }
    }
  `,

  PUBLISH: gql`
    mutation authoring_publishArticle($input: authoring_PublishRequest) {
      authoring_publishArticle(input: $input) {
        parentPageURL
        message
        currentPageURL
        __typename
      }
    }
  `,

  DELETE: gql`
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
  `,
};
