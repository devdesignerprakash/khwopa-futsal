// hooks/useFetch.ts
import { useState, useEffect, useCallback } from "react";
import api from "../utils/axiosInterceptor";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T = unknown>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async (controller: AbortController) => {
    try {
      const res = await api.get<T>(url, {
        signal: controller.signal, // abort support
      });
      setState({ data: res.data, loading: false, error: null });
    } catch (err: any) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        // ignore canceled requests
        return;
      }
      setState({
        data: null,
        loading: false,
        error: err.response?.data?.message || err.message,
      });
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    setState(prev => ({ ...prev, loading: true, error: null }));

    fetchData(controller);

    return () => {
      controller.abort(); // cancel request on unmount or URL change
    };
  }, [url, fetchData]);

  return { ...state };
}
