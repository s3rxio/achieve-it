import dayjs from "dayjs";
import { apiInstance } from "../../../shared/api";
import { mapTask } from "../lib";
import { Task, TaskFormData } from "../task.types";

export const taskApi = {
  fetchTasks: (date: string = dayjs().format("YYYY-MM")) =>
    apiInstance
      .get<Task[]>(`/tasks?date=${date}`)
      .then(res => res.data.map(mapTask)),

  create: (data: TaskFormData) => apiInstance.post<Task>("/tasks", data),

  update: ({ id, ...data }: { id: number } & Partial<TaskFormData>) =>
    apiInstance.patch<Task>(`/tasks/${id}`, data)
};
