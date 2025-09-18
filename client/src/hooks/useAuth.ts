import { useState } from "react";
import api from "../utils/axiosInterceptor";

interface UseAuthReturn<TResponse, TBody> {
  data: TResponse | null;
  error: string | null;
  loading: boolean;
  AuthExecution: (body: TBody) => Promise<TResponse>;
  clearError: () => void;
}

export function UseAuth<TResponse = any, TBody = any>(url: string): UseAuthReturn<TResponse, TBody> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const AuthExecution = async (body: TBody): Promise<TResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<TResponse>(url, body, { withCredentials: true });
      
      // Handle backend errors even if status is 200
      if ((response.data as any).success === false || (response.data as any).error) {
        const message = (response.data as any).message || "Something went wrong";
        setError(message);
        throw new Error(message);
      }

      setData(response.data);
      return response.data;
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || "Something went wrong";
      setError(message);
      throw new Error(message); // Re-throw for the calling component
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return { data, error, loading, AuthExecution, clearError };
}