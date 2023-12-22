import { ApolloError } from "@apollo/client";
import graphqlInstance from "../../config/graphqlConfig";
import { schemaQueries } from "../../graphQL/queries/contentTypeQueries";
import { CREATE_CONTENT_TYPE, PUBLISH_CONTENT_TYPE } from "../../graphQL/mutations/contentTypeMutations";
import { ApiResponse } from "../../utils/types";

const contentTypeSchemaApi = {
  getSchema: async <T>(): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: schemaQueries.CONTENT_TYPE_SCHEMA,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  createContent: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: CREATE_CONTENT_TYPE,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
  publishContent: async <T>(input: any): Promise<ApiResponse<T>> => {
    try {
      const { data } = await graphqlInstance.query({
        query: PUBLISH_CONTENT_TYPE,
        variables: input,
        fetchPolicy: "no-cache",
      });
      return data;
    } catch (err: any) {
      if (err instanceof ApolloError) console.log(err.graphQLErrors);
      throw err;
    }
  },
};
export default contentTypeSchemaApi;
