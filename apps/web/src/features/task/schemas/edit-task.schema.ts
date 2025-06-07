import z from "zod";
import { TaskStatus } from "../../../entitites/task";

/* TASK */
export const editTaskSchema = z.object({
  title: z.string().min(1).max(52).optional(),
  description: z.string().max(10000).optional(),
  dueDate: z.any().nullable().default(null).optional(),
  status: z.nativeEnum(TaskStatus).optional()
});

export type EditTaskFormData = z.infer<typeof editTaskSchema>;
