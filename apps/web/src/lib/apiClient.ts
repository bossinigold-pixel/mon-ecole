import { createApiClient } from "@mon-ecole/api-client";
import { useAuthStore } from "./authStore";

export const apiClient = createApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
  getAccessToken: () => useAuthStore.getState().accessToken,
  onUnauthorized: () => useAuthStore.getState().logout(),
});
