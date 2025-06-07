import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../entitites/task";
import { CreateTaskFormData } from "../schemas/create-task.schema";

export const useCreateTask = () => {
  return useMutation({
    mutationFn: (data: CreateTaskFormData) => taskApi.create(data)
  });
};
