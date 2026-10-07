import axios, { AxiosInstance } from "axios";

export interface ApiClientConfig {
  baseURL: string;
  getAccessToken: () => string | null;
  onUnauthorized?: () => void;
}

export function createApiClient(config: ApiClientConfig): AxiosInstance {
  const client = axios.create({ baseURL: config.baseURL });

  client.interceptors.request.use((request) => {
    const token = config.getAccessToken();
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        config.onUnauthorized?.();
      }
      return Promise.reject(error);
    }
  );

  return client;
}

export * from "@mon-ecole/shared-types";
