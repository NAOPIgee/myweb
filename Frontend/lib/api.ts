import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000, // 超時設定 10 秒
    headers: {
        'Content-Type': 'application/json',
    },
});

// (選用) 請求攔截器：可以在這裡自動帶入 Token
api.interceptors.request.use((config) => {
    // 之後如果有做登入，token 會存在 localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;