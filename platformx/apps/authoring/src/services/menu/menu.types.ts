import { ApiResponse } from '../utils/common.types';

export type MenuApiResponse = {
  data: any;
  error: ApiError;
  loading: boolean;
  getMenus: (
    query: string,
    variables?: Record<string, any>
  ) => ApiResponse<any[]>;
};
export type ApiError = { messgae: string };
export type Menu = {
  Title?: string;
  Tagging?: string;
  Text?: string;
  Menu_Id?: string;
  ParentId?: string;
  Menu_State?: string;
  URL?: string;
  Label?: string;
  Internal?: string;
  Status?: string;
  Score?: string;
  IsHidden?: string;
  LastModificationDate?: string;
  LastModifiedBy?: string;
  Menu_PublishedBy?: string;
  Author?: string;
  Menu_PublishedDate?: string;
  LastPublishedDate?: string;
  createdBy?: string;
  UserActionInfo?: string;
  HomePage?: string;
};
