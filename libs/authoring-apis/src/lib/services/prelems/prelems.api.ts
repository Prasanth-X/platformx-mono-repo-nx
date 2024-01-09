// import { AxiosError, AxiosResponse } from 'axios';
// import axiosInstance from '../../config/restApiConfig';
import {
  // DUPLICATE_PRELEM,
  // FETCH_ALL_PRELEM_SEARCH_LIST,
  // FETCH_PRELEM_CONTENT,
  // FETCH_PRELEM_DEFAULT_META,
   FETCH_PRELEM_VALIDATION,
 // FETCH_RESET_DATA,
} from '../../graphQL/queries/prelemQueries';
// import { ApiError } from '../types/common/commonTypes';
// const createAxiosError = (err: AxiosError): ApiError => {
//   return { message: err.message, status: err.response?.status ?? 500 };
// };
export const fetchPrelemValidation = FETCH_PRELEM_VALIDATION;
// export const fetchPrelemContent = FETCH_PRELEM_CONTENT;
// export const fetchAllPrelemSearchList = FETCH_ALL_PRELEM_SEARCH_LIST;
// export const deplicatePrelem = DUPLICATE_PRELEM;
// export const fetchResetData = FETCH_RESET_DATA;
// export const fetchPrelemDefaultMeta = FETCH_PRELEM_DEFAULT_META;
// export const prelemsApi = {
//   getPrelemsLayoutsList: async (
//     searchValue: string,
//     categoryValue: string
//   ): Promise<AxiosResponse<any>> => {
//     try {
//       return await axiosInstance.get(
//         `api/v1/web/en/authoring/layouts/0/2147483647/asc?prelemSearchText=${searchValue}&prelemTag=${categoryValue}`
//       );
//     } catch (e: any) {
//       throw createAxiosError(e);
//     }
//   },
//   getTopNavigations: async (): Promise<AxiosResponse<any>> => {
//     try {
//       return await axiosInstance.get('api/v1/web/en/authoring/top-navigations');
//     } catch (e: any) {
//       throw createAxiosError(e);
//     }
//   },
//   getPrelemSuggestions: async (
//     inputValue: string
//   ): Promise<AxiosResponse<any>> => {
//     try {
//       return await axiosInstance.get(
//         `api/v1/web/en/authoring/prelem-suggestions?searchText=${inputValue}`
//       );
//     } catch (e: any) {
//       throw createAxiosError(e);
//     }
//   },
// };
