import { ApolloError, GraphQLRequest, useApolloClient } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { useState } from 'react';
import { GraphQLHookResult } from './useGraphQL.types';

const useGraphQL = <T>(): GraphQLHookResult<T> => {
  const client = useApolloClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApolloError | null>(null);

  const executeQuery = async <T>(
    query: DocumentNode,
    options = {},
    variables?: Record<string, any>
  ): Promise<T> => {
    setLoading(true);
    try {
      const graphQLRequest: GraphQLRequest = {
        query: query,
        variables: variables,
      };
      const { data } = await client.query<T>({
        query: graphQLRequest.query,
        variables: graphQLRequest.variables,
        ...options,
      });
      return data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const executeMutation = async (
    mutation: DocumentNode,
    options = {}
  ): Promise<T> => {
    setLoading(true);
    try {
      const { data } = await client.mutate<T>({ mutation, ...options });
      return data!;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const executeDelete = async (
    mutation: DocumentNode,
    options = {}
  ): Promise<T> => {
    setLoading(true);
    try {
      const { data } = await client.mutate<T>({ mutation, ...options });
      return data!;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => setError(null);

  return {
    executeQuery,
    executeMutation,
    executeDelete,
    loading,
    error,
    resetError,
  };
};

export default useGraphQL;
