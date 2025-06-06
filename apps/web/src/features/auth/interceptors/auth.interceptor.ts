/* KILLME */

import { apiInstance } from "../../../shared/api";
import { authApi } from "../api";
import { TokenService } from "../lib";

/* TODO: Придумать что то нормальное */
apiInstance.interceptors.request.use((config) => {
    const token = TokenService.getAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = TokenService.getRefreshToken();
                if (!refreshToken) {
                    TokenService.clearTokens();
                    // window.location.href = '/login';
                    return;
                }
                const { accessToken, refreshToken: newRefreshToken } = await authApi.refreshAuth({ refreshToken }).then((res) => res.data);
                TokenService.setTokens({ accessToken, refreshToken: newRefreshToken });

                originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                return apiInstance(originalRequest);
            } catch (e) {
                TokenService.clearTokens();
                // window.location.href = '/login';
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);