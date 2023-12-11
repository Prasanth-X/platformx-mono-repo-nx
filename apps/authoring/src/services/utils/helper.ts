import { GraphQLError } from "graphql";
import { ApiError } from "./common.types";

export const createApiError = (error: any): ApiError => {
  if (error instanceof GraphQLError) {
    return {
      type: "graphql",
      code: 500,
      message: `GraphQL Error ${error.message}}`,
    } as ApiError;
  } else {
    return {
      type: "network",
      code: error?.code,
      message: `Network Error ${error?.message}}`,
    } as ApiError;
  }
};
