import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { userApi } from "../../../entitites/user";

export const useUsers = (
  date: string = dayjs().endOf("month").format("YYYY-MM")
) =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => userApi.fetchUsers(),
    initialData: [],
    refetchInterval: 60 * 1000
  });
