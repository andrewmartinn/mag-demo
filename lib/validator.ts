import { z } from "zod";

export const leadFormSchema = z.object({
  fullName: z.string().min(3, "Full name must be atleast 3 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters"),
  consent: z.boolean(),
});
