import { User } from "../../../entitites/user";
import { apiInstance } from "../../../shared/api";
import { LoginSchema, RegisterSchema } from "../../../shared/libs/zod";
import { AuthResponse } from "../types";

export const authApi = {
    login: (data: LoginSchema) =>
        apiInstance.post<AuthResponse>('/auth/login', data),

    register: (data: RegisterSchema) =>
        apiInstance.post<AuthResponse>('/auth/register', data),

    refreshAuth: (data: Pick<AuthResponse, 'refreshToken'>) =>
        apiInstance.post<AuthResponse>('/auth/refresh', data),

    logout: () => apiInstance.post('/auth/logout'),

    /* TODO: Перенести в user entity */
    fetchMe: () => apiInstance.get<User>('/users/me'),
};