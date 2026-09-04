import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

type RetryableRequest = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshRequest: Promise<unknown> | null = null;

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined;
    const requestUrl = request?.url ?? '';
    const isAuthRequest = ['/auth/login', '/auth/register', '/auth/refresh-token'].some((path) =>
      requestUrl.includes(path)
    );

    if (error.response?.status !== 401 || !request || request._retry || isAuthRequest) {
      return Promise.reject(error);
    }

    request._retry = true;
    refreshRequest ??= apiClient.post('/auth/refresh-token').finally(() => {
      refreshRequest = null;
    });

    try {
      await refreshRequest;
      return apiClient(request);
    } catch (refreshError) {
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        const callbackUrl = encodeURIComponent(`${window.location.pathname}${window.location.search}`);
        window.location.assign(`/login?callbackUrl=${callbackUrl}`);
      }
      return Promise.reject(refreshError);
    }
  }
);

type ApiErrorData = {
  message?: string;
  errorSources?: Array<{ message?: string }>;
};

export const extractErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<ApiErrorData>(error) && error.response?.data) {
    const data = error.response.data;
    if (data.errorSources?.length) {
      return data.errorSources.map((item) => item.message).filter(Boolean).join(' | ');
    }
    if (data.message) return data.message;
  }
  return error instanceof Error ? error.message : fallback;
};
