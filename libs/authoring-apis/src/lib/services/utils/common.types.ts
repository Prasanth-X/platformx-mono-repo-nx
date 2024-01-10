export type ApiResponse<T> = {
  data?: T | null;
  error?: ApiError | null;
  loading: boolean;
};

export type ApiError = { type: string; message: string; code: number };

export type ApiConfig = {
  baseURL: string;
  headers: {
    "Content-Type": string;
    "Cache-Control": string;
  };
};
