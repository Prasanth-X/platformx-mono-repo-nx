import { getSelectedSite, getSubDomain } from '@platformx/utilities';
import axios from 'axios';
import { useState } from 'react';

export const usePostImageCrop = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const postData = async (path: string, payload: any) => {
        try {
            setIsLoading(true);
            const res = await axios.post(process.env.REACT_APP_API_URI + path, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Cache-Control": "no-cache",
                    sitename: getSelectedSite(),
                    site_host: getSubDomain(),
                },
                withCredentials: true,
            });

            setData(res.data.result || res.data);
        } catch (err: any) {
            setError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, postData };
};
