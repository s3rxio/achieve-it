import z from "zod";

/* TASK */
export const createTaskSchema = z.object({
  title: z.string().min(1).max(52),
  description: z.string().max(10000).default(""),
  dueDate: z.any().nullable().default(null).optional()
});

export type CreateTaskFormData = z.infer<typeof createTaskSchema>;
