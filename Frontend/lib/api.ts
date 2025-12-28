import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export interface ApiResponse<T = any> {
    succeeded: boolean;
    message: string;
    data: T;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response; 
    },
    
    (error: AxiosError<ApiResponse>) => {
        if (error.response && error.response.data) {
            const backendError = error.response.data;
            if (backendError.message) {
                error.message = backendError.message;
            }
        } else if (error.request) {
            error.message = '無法連線到伺服器，請檢查網路狀態';
        }
        return Promise.reject(error);
    }
);

export default api;