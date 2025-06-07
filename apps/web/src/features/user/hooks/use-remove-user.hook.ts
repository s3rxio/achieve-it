import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../../entitites/user";

export const useRemoveUser = () => {
  return useMutation({
    mutationFn: (id: number) => userApi.delete(id)
  });
};
