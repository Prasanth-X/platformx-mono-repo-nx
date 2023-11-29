import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '../types/common/commonTypes';

const createAxiosError = (err: AxiosError): ApiError => {
  return { message: err.message, status: err.response?.status ?? 500 };
};

export const multisiteApi = {
  getPermissions: async (
    sitename: string
  ): Promise<AxiosResponse<any>> => {
    try {
        const res = await axios.get(process.env.REACT_APP_API_URI + `auth/get-site-permissions/${sitename}`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Cache-Control': 'no-cache',
            },
            withCredentials: true,
          });
          return res;
    } catch (e: any) {
      throw createAxiosError(e);
    }
  },
};
