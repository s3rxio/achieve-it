import dayjs, { Dayjs } from "dayjs";
import { Task } from "../task.types";

/* Mappers */
export const mapTask = (task: Task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  dueDate: task.dueDate ? dayjs(task.dueDate) : null,
  createdAt: dayjs(task.createdAt),
  updatedAt: dayjs(task.updatedAt)
});

/* Utils */
export const filterTasksByDate = (tasks: Task[], date: Dayjs) =>
  tasks.filter(
    task =>
      task.dueDate?.isSame(date, "date") ||
      (!task.dueDate && task.createdAt.isSame(date, "date"))
  );
