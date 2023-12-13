import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { ApiError, ApiResponse } from '../../services/utils/common.types';

function useApi<T>(path: string, options?: AxiosRequestConfig): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);

  const [error, setError] = useState<ApiError | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios(
          `${process.env.NX_API_URI}${path}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            ...options,
          }
        );

        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path, options]);

  return { data, error, loading };
}

export default useApi;
