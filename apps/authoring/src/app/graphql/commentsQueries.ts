import { gql } from '@apollo/client';
export const CommentQueries = {
  CREATE_OR_UPDATE_COMMENT: gql`
    mutation ($input: authoring_ReviewRequest) {
      authoring_createOrUpdateReviewComments(input: $input) {
        message
      }
    }
  `,
  GET_COMMENT: gql`
    query authoring_getReviewComments($document_path: String!) {
      authoring_getReviewComments(document_path: $document_path)
    }
  `,
};
