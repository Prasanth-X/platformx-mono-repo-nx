import { DocumentNode } from 'graphql';

export type GraphQLHookResult<T> = {
  loading: boolean;
  error: Error | null;
  executeQuery: (query: any, options?: any) => Promise<T>;
  executeMutation: (mutation: any, options?: any) => Promise<T>;
  executeDelete: (mutation: any, options?: any) => Promise<T>;
  resetError: () => void;
};

export type UseGraphQL = {
  loading: boolean;
  error: Error | null;
  executeQuery: <T = any>(
    query: DocumentNode,
    options?: Record<string, any>
  ) => Promise<T>;
  executeMutation: <T = any>(
    mutation: DocumentNode,
    options?: Record<string, any>
  ) => Promise<T>;
  executeDelete: <T = any>(
    mutation: DocumentNode,
    options?: Record<string, any>
  ) => Promise<T>;
};