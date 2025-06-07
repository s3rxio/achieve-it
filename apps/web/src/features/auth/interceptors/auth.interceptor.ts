/* KILLME */

import { apiInstance } from "../../../shared/api";
import { authApi } from "../api";
import { useAuthStore } from "../model/auth.store";

/* TODO: Придумать что то нормальное */
apiInstance.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.conifg.url !== "/auth/refresh" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const authStore = useAuthStore.getState();
      try {
        const refreshToken = authStore.refreshToken;
        if (!refreshToken) {
          authStore.clear();
          window.location.href = "/login";
          return;
        }
        const { accessToken, refreshToken: newRefreshToken } = await authApi
          .refreshAuth({ refreshToken })
          .then(res => res.data);
        authStore.setTokens(accessToken, newRefreshToken);

        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return apiInstance(originalRequest);
      } catch (e) {
        authStore.clear();
        console.log("error", e);
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
