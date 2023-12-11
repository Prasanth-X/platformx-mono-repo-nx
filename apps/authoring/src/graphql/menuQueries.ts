import { gql } from '@apollo/client';

export const CREATE_MENUITEM = gql`
  mutation authoring_navigationItems($input: authoring_JSON) {
    authoring_navigationItems(Content: $input) {
      path
      Message
      name
    }
  }
`;
