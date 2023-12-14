import { gql } from '@apollo/client';

export const CREATE_NEW_CHATGPT_REQUEST = gql`
  mutation ($input: authoring_openaiRequest) {
    authoring_getContentOpenai(input: $input)
  }
`;