export type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers: Record<string, any>;
};
export type Error = {
  type: string;
  message: string;
  code: number;
};
export type UseApiResponse<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};
export type ApiError = {
  message: string;
  status: number;
};
