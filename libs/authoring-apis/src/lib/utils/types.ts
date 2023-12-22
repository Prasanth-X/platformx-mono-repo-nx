export type ApiResponse<T> = {
    data?: T | null;
    error?: ApiError | null;
    loading: boolean;
};

export type ApiError = { message: string; status: number };

export type ApiConfig = {
    baseURL: string;
    headers: {
        "Content-Type": string;
        "Cache-Control": string;
    };
};
