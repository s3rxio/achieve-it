import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import "../interceptors/auth.interceptor";

export const useFetchMe = (enabled: boolean) => {
    return useQuery({
        queryKey: ['auth', 'me'],
        queryFn: () => authApi.fetchMe().then(res => res.data),
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        enabled
    })
};