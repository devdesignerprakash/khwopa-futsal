import { useState } from "react";
import api from "../utils/axiosInterceptor";
import type { AxiosError } from "axios";

interface ValidationErrorResponse {
  errors: Record<string, string>;
  message?: string;
}

interface UseAuthReturn<TResponse, TBody> {
  data: TResponse | null;
  error: string | null;
  loading: boolean;
  validationErrors: Record<string, string> | null;
  AuthExecution: (body: TBody) => Promise<TResponse>;
  clearError: () => void;
}

export function UseAuth<TResponse = any, TBody = any>(
  url: string
): UseAuthReturn<TResponse, TBody> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const [validationErrors, setValidationErrors] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
 

  const AuthExecution = async (body: TBody): Promise<TResponse> => {
    setLoading(true);
    setError(null);
    setValidationErrors(null);

    try {
      const response = await api.post<TResponse>(url, body, { withCredentials: true });

      // Handle backend "soft errors" (success=false but still 200)
      if ((response.data as any).success === false || (response.data as any).error) {
        const message = (response.data as any).message || "Something went wrong";
        setError(message);
        throw new Error(message);
      }

      setData(response.data);
      return response.data;
    } catch (err: unknown) {
      const axiosErr = err as AxiosError<ValidationErrorResponse>;

      // Handle validation errors (400 with field errors)
      if (
        axiosErr.response &&
        axiosErr.response.status === 400 &&
        axiosErr.response.data?.errors
      ) {
        const validationErrs = axiosErr.response.data.errors;
        setValidationErrors(validationErrs);
        const message =
          axiosErr.response.data.message ||
          "Validation failed. Please check the form fields.";
        setError(message);
        throw new Error(message);
      }

      // Handle general errors
      const message =
        (axiosErr.response?.data as any)?.message ||
        axiosErr.message ||
        "Something went wrong";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
    setValidationErrors(null);
  };

  return { data, error, loading, AuthExecution, clearError, validationErrors}
}
