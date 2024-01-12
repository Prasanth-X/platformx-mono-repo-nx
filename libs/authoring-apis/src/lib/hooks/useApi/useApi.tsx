import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
    data: any;
    loading: boolean;
    error: Error | null;
}

const useApi = (url: string) => {
    const [apiResponse, setApiResponse] = useState<ApiResponse>({
        data: null as unknown as any,
        loading: false,
        error: null,
    });

    const fetchData = async () => {
        try {
            setApiResponse((prev) => ({ ...prev, loading: true }));
            const response = await axios.get(url);
            setApiResponse({ data: response.data, loading: false, error: null });
        } catch (error) {
            setApiResponse((prev) => ({ ...prev, error: error as Error })); // Explicit cast to Error
        } finally {
            setApiResponse((prev) => ({ ...prev, loading: false }));
        }
    };

    const createData = async (newData: any) => {
        try {
            setApiResponse((prev) => ({ ...prev, loading: true }));
            const response: AxiosResponse<any> = await axios.post(url, newData);
            setApiResponse({ data: response.data, loading: false, error: null });
        } catch (error) {
            setApiResponse((prev) => ({ ...prev, error: error as Error })); // Explicit cast to Error
        } finally {
            setApiResponse((prev) => ({ ...prev, loading: false }));
        }
    };

    const updateData = async (id: string, updatedData: any) => {
        try {
            setApiResponse((prev) => ({ ...prev, loading: true }));
            const response: AxiosResponse<any> = await axios.put(`${url}/${id}`, updatedData);
            setApiResponse({ data: response.data, loading: false, error: null });
        } catch (error) {
            setApiResponse((prev) => ({ ...prev, error: error as Error })); // Explicit cast to Error
        } finally {
            setApiResponse((prev) => ({ ...prev, loading: false }));
        }
    };

    const deleteData = async (id: string) => {
        try {
            setApiResponse((prev) => ({ ...prev, loading: true }));
            await axios.delete(`${url}/${id}`);
            fetchData(); // Refresh data after deletion
        } catch (error) {
            setApiResponse((prev) => ({ ...prev, error: error as Error })); // Explicit cast to Error
        } finally {
            setApiResponse((prev) => ({ ...prev, loading: false }));
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, [url]);

    return {
        ...apiResponse,
        createData,
        updateData,
        deleteData,
    };
};

export default useApi;
