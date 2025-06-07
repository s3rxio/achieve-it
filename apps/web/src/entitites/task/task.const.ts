import { TaskStatus } from "./task.types";

export const taskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.Created]: "blue",
  [TaskStatus.InProgress]: "orange",
  [TaskStatus.Completed]: "green",
  [TaskStatus.Archived]: "gray"
};
