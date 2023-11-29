import { useApolloClient } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import useGraphQL from './useGraphQL';

jest.mock('@apollo/client', () => ({
  useApolloClient: jest.fn(),
  ApolloClient: jest.fn(),
  ApolloError: jest.fn(),
}));
const useApolloClientMock = useApolloClient as jest.MockedFunction<
  typeof useApolloClient
>;
describe('useGraphQL', () => {
  let client;
  let query;
  let mutation;
  let executeQuery;
  let executeMutation;

  beforeEach(() => {
    client = {
      query: jest.fn(),
      mutate: jest.fn(),
    };
    useApolloClientMock.mockReturnValue(client);
    query = {};
    mutation = {};
    executeQuery = jest.fn();
    executeMutation = jest.fn();
  });

  it('should execute a query', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGraphQL());
    client.query.mockResolvedValue({ data: { test: true } });
    executeQuery = result.current.executeQuery;
    const response = await executeQuery(query);
    await waitForNextUpdate();
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ test: true });
  });

  it('should execute a mutation', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGraphQL());
    client.mutate.mockResolvedValue({ data: { test: true } });
    executeMutation = result.current.executeMutation;
    const response = await executeMutation(mutation);
    await waitForNextUpdate();
    expect(client.mutate).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ test: true });
  });

  it('should handle errors', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGraphQL());
    client.query.mockRejectedValue(new Error('Test error'));
    executeQuery = result.current.executeQuery;
    try {
      await executeQuery(query);
    } catch (err) {
      // Error is expected
    }
    await waitForNextUpdate();
    expect(client.query).toHaveBeenCalledTimes(1);
    expect(result.current.error).toEqual(new Error('Test error'));
  });
});
