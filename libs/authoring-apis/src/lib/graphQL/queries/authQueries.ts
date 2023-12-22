import { gql } from '@apollo/client';
export const AuthQueries = {
  FETCH_PERMISSIONS: gql`
    query {
      authoring_permissionList(pagePath: "")
    }
  `,
};
