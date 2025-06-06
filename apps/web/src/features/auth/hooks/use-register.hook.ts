import { useMutation } from "@tanstack/react-query";
import { RegisterSchema } from "../../../shared/libs/zod";
import { authApi } from "../api";
import "../interceptors/auth.interceptor";

export const useRegister = () => {
    return useMutation({
        mutationFn: (data: RegisterSchema) => authApi.register(data).then((res) => res.data),
    });
};