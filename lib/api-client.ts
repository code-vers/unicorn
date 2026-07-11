import axios from 'axios';
import Cookies from 'js-cookie';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling 401 Unauthorized could be added here

export const extractErrorMessage = (err: any, fallback: string) => {
  if (err.response?.data) {
    const data = err.response.data;
    if (data.errorSources && data.errorSources.length > 0) {
      return data.errorSources.map((e: any) => e.message).join(' | ');
    }
    if (data.message) return data.message;
  }
  return err.message || fallback;
};
