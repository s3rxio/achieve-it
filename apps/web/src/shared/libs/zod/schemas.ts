import { z } from 'zod';

const usernameSchema = z.string().min(1);
const passwordSchema = z.string().min(5);
// const emailSchema = z.string().email();

export const loginSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    username: usernameSchema,
    // email: emailSchema, // TODO: Добавить email
    password: passwordSchema,
});

export type RegisterSchema = z.infer<typeof registerSchema>;