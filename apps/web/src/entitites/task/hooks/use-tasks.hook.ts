import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { taskApi } from "../api";

export const useTasks = (
  date: string = dayjs().endOf("month").format("YYYY-MM")
) =>
  useQuery({
    queryKey: ["tasks", date],
    queryFn: () => taskApi.fetchTasks(date),
    initialData: [],
    refetchInterval: 1000
  });
