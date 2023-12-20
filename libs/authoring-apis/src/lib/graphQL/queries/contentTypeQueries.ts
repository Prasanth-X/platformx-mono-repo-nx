import { gql } from "@apollo/client";
export const schemaQueries = {
  CONTENT_TYPE_SCHEMA: gql`
    query {
      authoring_getDocument(type: "document")
    }
  `,
};
