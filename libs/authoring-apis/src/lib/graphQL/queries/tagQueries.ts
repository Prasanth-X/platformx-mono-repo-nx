import { gql } from '@apollo/client';

export const FETCH_TAG_LIST = gql`
  query FETCH_TAG_LIST($start: Int!, $rows: Int!) {
    authoring_getTagsList(
      pagination: { start: $start, rows: $rows }
      sort: DESC
    ) {
      category
      tags
    }
  }
`;
