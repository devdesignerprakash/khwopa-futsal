import axios, { AxiosError, type AxiosResponse, } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response:AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
    
    return Promise.reject(error);
  }
}
);

export default api;
