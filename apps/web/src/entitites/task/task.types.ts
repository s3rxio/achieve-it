/* Cross-module imports @User */
// import { User } from "../user";

import { Dayjs } from "dayjs";

export enum TaskStatus {
  Created = "created",
  InProgress = "inProgress",
  Completed = "completed",
  Archived = "archived"
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: Dayjs | null;
  // user: User; @x
  createdAt: Dayjs;
  updatedAt: Dayjs;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate?: Date | null;
}
