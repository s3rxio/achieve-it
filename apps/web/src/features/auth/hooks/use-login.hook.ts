import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../../../shared/libs/zod";
import { authApi } from "../api";
import "../interceptors/auth.interceptor";
import { useAuthStore } from "../model/auth.store";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginSchema) =>
      authApi.login(data).then(res => res.data),
    onSuccess: data => {
      useAuthStore.getState().setTokens(data.accessToken, data.refreshToken);
    }
  });
};
