import { useState } from "react";
import api from "../utils/axiosInterceptor";

interface CheckStatusResponse {
    isLoggedIn: boolean;
    message: string;
}

export function useCheckLoggedIn(url:string) { 
    const [data, setData] = useState<CheckStatusResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const checkStatus = async (): Promise<CheckStatusResponse> => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await api.get<CheckStatusResponse>(url, { withCredentials: true });
            const responseData = response.data;
            setData(responseData);
            return responseData;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message 
                || error?.message 
                || "Something went wrong";
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return { 
        data, 
        error, 
        loading, 
        checkStatus 
    };
}