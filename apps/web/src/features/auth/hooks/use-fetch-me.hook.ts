import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api";
import "../interceptors/auth.interceptor";

export const useFetchMe = (enabled: boolean) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authApi.fetchMe().then(res => res.data),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    enabled
  });
};
