import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTokens } from "@mon-ecole/shared-types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      setTokens: (tokens) =>
        set({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken }),
      logout: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: "mon-ecole-auth" }
  )
);
