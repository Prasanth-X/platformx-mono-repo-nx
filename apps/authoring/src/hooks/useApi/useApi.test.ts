import { renderHook } from '@testing-library/react-hooks';
import useApi from './useApi';

jest.mock('axios');

describe('useApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should make a successful API request', async () => {
    const responseData = { foo: 'bar' };
    // const mockAxios = jest.fn(() => Promise.resolve({ data: responseData }));
    // const mockAxios = jest
    //   .fn()
    //   .mockImplementation(() => Promise.resolve({ data: responseData }));

    const mockAxios = jest.fn().mockResolvedValue({ data: responseData });
    // axios.create.mockReturnValue({ request: mockAxios }); Uncomment this line to fix the test

    const { result, waitForNextUpdate } = renderHook(() => useApi('/test'));

    expect(result.current).toEqual({
      data: null,
      loading: true,
      error: null,
    });

    await waitForNextUpdate();

    expect(mockAxios).toHaveBeenCalledWith({
      url: '/test',
      method: 'get',
      data: null,
      params: null,
    });

    expect(result.current).toEqual({
      data: responseData,
      loading: false,
      error: null,
    });
  });
});
