import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must contain at least 2 characters."),

  lastName: z
    .string()
    .min(1, "Last name is required."),

  email: z.email("Please enter a valid email."),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters."),

  role: z.enum(["CANDIDATE", "EMPLOYER"]),
});

export type SignupSchema = z.infer<typeof signupSchema>;
