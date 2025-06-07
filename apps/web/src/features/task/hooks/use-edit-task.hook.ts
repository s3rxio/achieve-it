import { useMutation } from "@tanstack/react-query";
import { taskApi } from "../../../entitites/task";
import { EditTaskFormData } from "../schemas/edit-task.schema";

export const useEditTask = () => {
  return useMutation({
    mutationFn: (data: { id: number } & EditTaskFormData) =>
      taskApi.update(data)
  });
};
