import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiError } from '../services/types/common/commonTypes';
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NX_API_URI,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache',
  },
});
export const createAxiosError = (err: AxiosError): ApiError => {
  return { message: err.message, status: err.response?.status ?? 500 };
};
export default axiosInstance;
